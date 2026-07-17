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
echo "[1/8] checking row column counts..."
bad=$(awk -F'\t' '!/^#/ && NF>=1 && $1 != "" && $1 != "word" && NF != 10 { print NR ": got "NF" cols ("$1")" }' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ rows with != 10 cols:" >&2
  echo "$bad" >&2
  fail=1
else echo "  ✓ all rows have 10 columns"; fi

# Check duplicate slugs
echo "[2/8] checking for duplicate slugs..."
dups=$(awk -F'\t' '!/^#/ && NF>=1 && $1 != "" && $1 != "word" {
  s=tolower($1); gsub(/[^a-z0-9._-]/,"-",s); print s
}' "$DICT" | sort | uniq -d)
if [[ -n "$dups" ]]; then
  echo "  ✗ duplicate slugs:" >&2; echo "$dups" >&2; fail=1
else echo "  ✓ no duplicate slugs"; fi

# Check confidence values
echo "[3/8] checking confidence values..."
bad=$(awk -F'\t' '
  BEGIN { ok["creator-clarified"]=1; ok["community-consensus"]=1; ok["contested"]=1 }
  !/^#/ && NF>=9 && $1 != "" && $1 != "word" && !($9 in ok) { print NR": "$1" has confidence: "$9 }
' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ rows with invalid confidence:" >&2; echo "$bad" >&2; fail=1
else echo "  ✓ all confidence values valid"; fi

# Check creator-clarified entries have a source URL
echo "[4/8] checking creator-clarified rows have source_url..."
bad=$(awk -F'\t' '
  !/^#/ && NF>=9 && $1 != "" && $1 != "word" && $9 == "creator-clarified" && $6 == "" { print NR": "$1 }
' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ creator-clarified rows missing source URL:" >&2
  echo "$bad" >&2
  fail=1
else echo "  ✓ all creator-clarified rows have a source URL"; fi

# Check source URLs start with http(s)://
echo "[5/8] checking source URL formats..."
bad=$(awk -F'\t' '
  !/^#/ && NF>=6 && $1 != "" && $1 != "word" && $6 != "" && $6 !~ /^https?:\/\// { print NR": "$1": "$6 }
' "$DICT")
if [[ -n "$bad" ]]; then
  echo "  ✗ source_url not a URL:" >&2; echo "$bad" >&2; fail=1
else echo "  ✓ all source URLs well-formed"; fi

# Check advertised entry counts outside docs/ match the TSV (build-site.yml only
# regenerates docs/; README/plugin/server.json counts are hand-synced and have
# drifted before — v2.16.0 had to fix a 1738/1702/993 disagreement). Fail loud.
echo "[6/8] checking advertised entry counts match the dict..."
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

# README's three companion statistics (sourced / creator-clarified / contested)
# sit in prose next to the total and are NOT touched by the count-sync — they
# drifted at v2.23.0 (1,229/86/169 shipped against actual 1,260/101/174).
echo "[7/8] checking README companion stats (sourced/creator/contested)..."
read -r SRCD CREATOR CONTESTED <<< "$(awk -F'\t' '
  !/^#/ && NF>=3 && $1 != "" && $1 != "word" {
    if ($6 != "") s++
    if ($9 == "creator-clarified") cc++
    if ($9 == "contested") ct++
  } END { print s+0, cc+0, ct+0 }' "$DICT")"
stat_bad=""
for pair in "$SRCD:citable source" "$CREATOR:settled by the creator" "$CONTESTED:community still argues"; do
  n="${pair%%:*}"; label="${pair#*:}"
  if (( n >= 1000 )); then rx="${n:0:${#n}-3}[,]?${n: -3}"; else rx="$n"; fi
  if ! grep -qE "${rx}[^0-9]*${label}|${label}" <(grep -E "$rx" "$REPO_ROOT/README.md"); then
    stat_bad+="  ✗ README does not state ${n} for \"${label}\""$'\n'
  fi
done
if [[ -n "$stat_bad" ]]; then
  echo "  ✗ companion-stat drift — recompute sourced/creator/contested in README:" >&2
  printf '%s' "$stat_bad" >&2
  fail=1
else echo "  ✓ README states $SRCD sourced / $CREATOR creator-clarified / $CONTESTED contested"; fi

# Every entry must have its OG card and its audio file. Both classes shipped
# broken before: 90 OG 404s at v2.23.0 (make-og-all.py skipped for two batches),
# dead ▶ audio at v2.10.x. Slugify in python to match the JS unicode semantics
# (awk gsub is byte-wise and turns ñ into TWO hyphens).
echo "[8/8] checking per-entry OG cards and audio files exist..."
asset_bad="$(python3 - "$DICT" "$REPO_ROOT" <<'PYEOF'
import re, sys
dict_path, root = sys.argv[1], sys.argv[2]
import os
missing = []
for line in open(dict_path, encoding="utf-8"):
    if line.startswith("#") or not line.strip():
        continue
    w = line.split("\t")[0].strip()
    if not w or w == "word":
        continue
    slug = re.sub(r"[^a-z0-9._-]", "-", w.lower())
    if not os.path.exists(f"{root}/docs/og/{slug}.png"):
        missing.append(f"og/{slug}.png ({w})")
    if not os.path.exists(f"{root}/docs/audio/{slug}.mp3"):
        missing.append(f"audio/{slug}.mp3 ({w})")
print("\n".join(missing[:20]))
if len(missing) > 20:
    print(f"... and {len(missing)-20} more")
PYEOF
)"
if [[ -n "$asset_bad" ]]; then
  echo "  ✗ missing per-entry assets — run make-og-all.py / make-audio-all.py:" >&2
  echo "$asset_bad" >&2
  fail=1
else echo "  ✓ every entry has its OG card and audio file"; fi

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
