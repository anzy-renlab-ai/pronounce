#!/usr/bin/env bash
# IndexNow URL submission for Bing + Yandex.
#
# Reads the sitemap, extracts every URL, and pushes them in batches of 10000
# to api.indexnow.org (Bing) and yandex.com (Yandex). Idempotent — safe to
# re-run on every build. Set INDEXNOW_DRY_RUN=1 to print the payload only.
#
# Usage:
#   bash tools/indexnow-submit.sh
#   bash tools/indexnow-submit.sh --only-new   # only URLs added since last run
#   INDEXNOW_DRY_RUN=1 bash tools/indexnow-submit.sh
#
# Schedule: add to GitHub Actions on push to main, or a daily cron.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SITE_URL="${SITE_URL:-https://pronounce.renlab.ai}"
HOST="${SITE_URL#https://}"
HOST="${HOST#http://}"
HOST="${HOST%%/*}"

KEY_FILE="$ROOT/docs/.indexnow-key"
if [[ ! -f "$KEY_FILE" ]]; then
  echo "ERROR: $KEY_FILE missing — run tools/build-site.sh first." >&2
  exit 2
fi
KEY="$(tr -d '[:space:]' < "$KEY_FILE")"
KEY_URL="$SITE_URL/$KEY.txt"

SITEMAP="$ROOT/docs/sitemap.xml"
[[ -f "$SITEMAP" ]] || { echo "ERROR: $SITEMAP missing." >&2; exit 2; }

STATE_DIR="$ROOT/.indexnow"
mkdir -p "$STATE_DIR"
LAST_SUBMITTED="$STATE_DIR/last-submitted.txt"

# Extract all <loc>…</loc> URLs
ALL_URLS="$(grep -oE '<loc>[^<]+</loc>' "$SITEMAP" | sed -e 's|<loc>||g' -e 's|</loc>||g')"

# Filter to "only new" if asked
if [[ "${1:-}" == "--only-new" && -f "$LAST_SUBMITTED" ]]; then
  URLS="$(comm -23 <(echo "$ALL_URLS" | sort -u) <(sort -u "$LAST_SUBMITTED"))"
else
  URLS="$ALL_URLS"
fi

COUNT="$(echo "$URLS" | grep -c . || true)"
if (( COUNT == 0 )); then
  echo "No URLs to submit."; exit 0
fi
echo "Submitting $COUNT URLs to IndexNow (host=$HOST, key=${KEY:0:8}…)"

# Build JSON payload
PAYLOAD_FILE="$(mktemp)"
trap 'rm -f "$PAYLOAD_FILE"' EXIT
{
  printf '{'
  printf '"host":"%s","key":"%s","keyLocation":"%s","urlList":[' "$HOST" "$KEY" "$KEY_URL"
  first=1
  while read -r u; do
    [[ -z "$u" ]] && continue
    if (( first )); then first=0; else printf ','; fi
    printf '"%s"' "$u"
  done <<< "$URLS"
  printf ']}'
} > "$PAYLOAD_FILE"

if [[ "${INDEXNOW_DRY_RUN:-0}" == "1" ]]; then
  echo "Dry run — payload:"
  cat "$PAYLOAD_FILE" | head -c 2048
  echo "..."
  exit 0
fi

# Submit to Bing + Yandex IndexNow endpoints
for endpoint in "https://api.indexnow.org/indexnow" "https://yandex.com/indexnow"; do
  echo "→ POST $endpoint"
  http_code="$(curl -s -o /tmp/indexnow-resp.txt -w '%{http_code}' \
    -X POST "$endpoint" \
    -H "Content-Type: application/json; charset=utf-8" \
    --data-binary "@$PAYLOAD_FILE" || echo "000")"
  echo "  HTTP $http_code"
  if [[ "$http_code" != "200" && "$http_code" != "202" ]]; then
    echo "  body: $(head -c 200 /tmp/indexnow-resp.txt)"
  fi
done

echo "$URLS" >> "$LAST_SUBMITTED"
sort -u "$LAST_SUBMITTED" -o "$LAST_SUBMITTED"
echo "✓ Done. Submission cached in $LAST_SUBMITTED"
