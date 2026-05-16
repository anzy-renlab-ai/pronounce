#!/usr/bin/env bash
# audit-listen — batch-generate audio for every dictionary entry so a human
# can listen and flag mispronunciations.
#
# The CLI authors write English-like respellings and hope the TTS engine
# pronounces them correctly. Without a real ear, mistakes go unnoticed.
# This script reads every dict entry, generates an `.aiff` per word, and
# (optionally) opens Finder so you can scrub through them.
#
# Usage:
#   tools/audit-listen.sh                  # generate all
#   tools/audit-listen.sh kubectl GIF      # generate only these
#   tools/audit-listen.sh --open           # generate all, then `open` the folder
#   tools/audit-listen.sh --solo           # don't append the "or: <alt>" tail
#   tools/audit-listen.sh --filter contested   # only confidence=contested
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DICT="$REPO_ROOT/data/pronunciations.tsv"
CLI="$REPO_ROOT/bin/say-it"
OUT_DIR="$REPO_ROOT/.audit-audio"

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "audit-listen: requires macOS \`say\`." >&2; exit 2
fi
if [[ ! -f "$DICT" ]]; then echo "audit-listen: $DICT not found" >&2; exit 1; fi
if [[ ! -x "$CLI" ]]; then echo "audit-listen: $CLI not executable" >&2; exit 1; fi

OPEN=0
SOLO_FLAG=""
FILTER=""
WORDS=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --open) OPEN=1; shift ;;
    --solo) SOLO_FLAG="--solo"; shift ;;
    --filter) FILTER="$2"; shift 2 ;;
    -h|--help)
      sed -n '1,/^set -e$/p' "$0" | sed 's/^# \{0,1\}//'
      exit 0 ;;
    *) WORDS+=("$1"); shift ;;
  esac
done

mkdir -p "$OUT_DIR"
# Clean stale .aiff files so the directory always reflects the latest dict.
find "$OUT_DIR" -name '*.aiff' -delete 2>/dev/null || true

# Collect target words.
if [[ ${#WORDS[@]} -eq 0 ]]; then
  while IFS=$'\t' read -r word _ipa _resp _aipa _aresp _surl _slab _cat conf _notes; do
    [[ "$word" == "" || "$word" == word || "$word" =~ ^# ]] && continue
    if [[ -n "$FILTER" && "$conf" != "$FILTER" ]]; then continue; fi
    WORDS+=("$word")
  done < "$DICT"
fi

echo "Generating ${#WORDS[@]} audio file(s) into $OUT_DIR/ ..."
count=0
for w in "${WORDS[@]}"; do
  # Sanitize filename — keep words like Next.js, k8s, k3s readable.
  safe="$(printf '%s' "$w" | tr -c 'A-Za-z0-9._-' '_')"
  out="$OUT_DIR/${safe}.aiff"
  if ! "$CLI" $SOLO_FLAG -o "$out" "$w" >/dev/null 2>&1; then
    echo "  skip $w (lookup failed)" >&2
    continue
  fi
  count=$((count + 1))
done
echo "Wrote $count file(s)."

# Build a quick playlist for fast scrubbing.
PLAYLIST="$OUT_DIR/_listen-all.sh"
cat > "$PLAYLIST" <<EOF
#!/usr/bin/env bash
# Play every audit file in turn. Press ctrl-C to stop.
cd "\$(dirname "\$0")"
for f in *.aiff; do
  echo ">> \$f"
  afplay "\$f"
done
EOF
chmod +x "$PLAYLIST"
echo "Created $PLAYLIST — run it to play every file sequentially."

if [[ $OPEN -eq 1 ]]; then
  open "$OUT_DIR"
fi
