#!/usr/bin/env bash
# Remote installer — the target of:
#   curl -fsSL https://pronounce.renlab.ai/install.sh | bash
#
# Downloads the repository tarball and runs the real ./install.sh from it,
# forwarding every argument, so the one-liner stays equivalent to
#   git clone … && cd pronounce && ./install.sh
set -euo pipefail

REPO="anzy-renlab-ai/pronounce"
TARBALL="https://codeload.github.com/${REPO}/tar.gz/refs/heads/main"

if ! command -v curl >/dev/null 2>&1; then
  echo "install: curl is required (or use git clone directly)" >&2
  exit 1
fi

tmp="$(mktemp -d "${TMPDIR:-/tmp}/say-it-install.XXXXXX")"
trap 'rm -rf "$tmp"' EXIT

echo "say-it: downloading latest ${REPO} …"
curl -fsSL "$TARBALL" | tar xz -C "$tmp"

# codeload tarballs extract to <repo>-<ref>/
src="$tmp/pronounce-main"
if [[ ! -d "$src" ]]; then
  src="$(find "$tmp" -maxdepth 1 -type d -name 'pronounce*' | head -1)"
fi
if [[ -z "${src:-}" || ! -f "$src/install.sh" ]]; then
  echo "install: could not find install.sh in the downloaded tarball" >&2
  exit 1
fi

bash "$src/install.sh" "$@"
