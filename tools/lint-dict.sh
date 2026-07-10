#!/usr/bin/env bash
# Lint data/pronunciations.tsv — check format, dup slugs, broken fields,
# obvious problems. Run from repo root.
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DICT="$REPO_ROOT/data/pronunciations.tsv"

if [[ ! -f "$DICT" ]]; then
  echo "lint: dict not found at $DICT" >&2; exit 1
fi

fail=0

# Check column count
echo "[1/6] checking row column counts..."
bad=$(awk -F'\t' '!/^#/ && NF>=1 && $1 != "" && $1 != "word" && NF != 10 { print NR ": got "NF" cols ("$1")" }' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ rows with != 10 cols:" >&2
  echo "$bad" >&2
  fail=1
else echo "  ✓ all rows have 10 columns"; fi

# Check duplicate slugs
echo "[2/6] checking for duplicate slugs..."
dups=$(awk -F'\t' '!/^#/ && NF>=1 && $1 != "" && $1 != "word" {
  s=tolower($1); gsub(/[^a-z0-9._-]/,"-",s); print s
}' "$DICT" | sort | uniq -d)
if [[ -n "$dups" ]]; then
  echo "  ✗ duplicate slugs:" >&2; echo "$dups" >&2; fail=1
else echo "  ✓ no duplicate slugs"; fi

# Check confidence values
echo "[3/6] checking confidence values..."
bad=$(awk -F'\t' '
  BEGIN { ok["creator-clarified"]=1; ok["community-consensus"]=1; ok["contested"]=1 }
  !/^#/ && NF>=9 && $1 != "" && $1 != "word" && !($9 in ok) { print NR": "$1" has confidence: "$9 }
' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ rows with invalid confidence:" >&2; echo "$bad" >&2; fail=1
else echo "  ✓ all confidence values valid"; fi

# Check creator-clarified entries have a source URL
echo "[4/6] checking creator-clarified rows have source_url..."
bad=$(awk -F'\t' '
  !/^#/ && NF>=9 && $1 != "" && $1 != "word" && $9 == "creator-clarified" && $6 == "" { print NR": "$1 }
' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ creator-clarified rows missing source URL:" >&2
  echo "$bad" >&2
  fail=1
else echo "  ✓ all creator-clarified rows have a source URL"; fi

# Check source URLs start with http(s)://
echo "[5/6] checking source URL formats..."
bad=$(awk -F'\t' '
  !/^#/ && NF>=6 && $1 != "" && $1 != "word" && $6 != "" && $6 !~ /^https?:\/\// { print NR": "$1": "$6 }
' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ source_url not a URL:" >&2; echo "$bad" >&2; fail=1
else echo "  ✓ all source URLs well-formed"; fi

# Check advertised entry counts outside docs/ match the TSV (build-site.yml only
# regenerates docs/; README/plugin/server.json counts are hand-synced and have
# drifted before — v2.16.0 had to fix a 1738/1702/993 disagreement). Fail loud.
echo "[6/6] checking advertised entry counts match the dict..."
COUNT=$(awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word"' "$DICT" | wc -l | tr -d ' ')
if (( COUNT >= 1000 )); then
  CNT_RX="${COUNT:0:${#COUNT}-3}[,]?${COUNT: -3}"
else
  CNT_RX="$COUNT"
fi
count_bad=""
for f in "README.md" ".codex-plugin/plugin.json" "mcp-server/server.json"; do
  if [[ -f "$REPO_ROOT/$f" ]] && ! grep -qE "$CNT_RX" "$REPO_ROOT/$f"; then
    count_bad+="  ✗ $f does not advertise the current count ($COUNT)"$'\n'
  fi
done
if [[ -n "$count_bad" ]]; then
  echo "  ✗ entry-count drift — run the release count-sync:" >&2
  printf '%s' "$count_bad" >&2
  fail=1
else echo "  ✓ README / plugin / server.json all advertise $COUNT"; fi

# Source coverage (informational — does NOT fail the lint; we never fabricate URLs)
echo "[coverage] source citations..."
awk -F'\t' '
  !/^#/ && NF>=3 && $1 != "" && $1 != "word" { tot++; if ($6 != "" || $7 != "") srcd++ }
  END {
    pct = tot ? int(srcd*1000/tot + 0.5)/10 : 0
    printf "  %d/%d entries carry a source (%.1f%%); %d uncited\n", srcd, tot, pct, tot-srcd
  }
' "$DICT"

echo ""
if (( fail )); then echo "✗ lint failed"; exit 1
else echo "✓ lint passed"; fi
