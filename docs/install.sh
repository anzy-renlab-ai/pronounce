#!/usr/bin/env bash
# Remote installer — the target of:
#   curl -fsSL https://pronounce.renlab.ai/install.sh | bash
#
# Fetches the four files the installer needs (under 500 KB) from the main branch
# and runs the real ./install.sh from them, forwarding every argument, so the
# one-liner stays equivalent to
#   git clone … && cd pronounce && ./install.sh
# It used to download the whole repository archive for those four files: 87 MB
# and 26 seconds on 2026-11-26. The archive is now the fallback, for a network
# that cannot reach raw.githubusercontent.com.
set -euo pipefail

REPO="anzy-renlab-ai/pronounce"
RAW="https://raw.githubusercontent.com/${REPO}/main"
TARBALL="https://codeload.github.com/${REPO}/tar.gz/refs/heads/main"

if ! command -v curl >/dev/null 2>&1; then
  echo "install: curl is required (or use git clone directly)" >&2
  exit 1
fi

tmp="$(mktemp -d "${TMPDIR:-/tmp}/say-it-install.XXXXXX")"
trap 'rm -rf "$tmp"' EXIT
src="$tmp/pronounce-main"

# 1) Four files, one request each. The short connect timeout keeps a blocked
#    host from adding its whole timeout before the fallback starts.
fetched=1
for f in install.sh bin/say-it data/pronunciations.tsv skills/pronounce-word/SKILL.md; do
  mkdir -p "$src/$(dirname "$f")"
  curl -fsSL --connect-timeout 8 --max-time 120 "$RAW/$f" -o "$src/$f" || { fetched=0; break; }
done

# 2) Fallback: the whole archive.
if [[ "$fetched" -ne 1 ]]; then
  rm -rf "$src"
  echo "say-it: could not fetch the files one by one, downloading the repository archive instead (larger, slower) …"
  curl -fsSL "$TARBALL" | tar xz -C "$tmp"
  src="$tmp/pronounce-main"
  if [[ ! -d "$src" ]]; then
    src="$(find "$tmp" -maxdepth 1 -type d -name 'pronounce*' | head -1)"
  fi
fi

if [[ -z "${src:-}" || ! -f "$src/install.sh" ]]; then
  echo "install: could not find install.sh in the downloaded files" >&2
  exit 1
fi

bash "$src/install.sh" "$@"
