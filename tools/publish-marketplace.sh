#!/usr/bin/env bash
# Publish the VS Code extension to BOTH Open VSX and Microsoft Marketplace.
#
# Credentials live OUTSIDE the repo at ~/.config/say-it/marketplace.env
# (and OVSX_PAT can live there too). Never commit credentials.
#
# Usage:
#   bash tools/publish-marketplace.sh              # publish the current version as-is
#   bash tools/publish-marketplace.sh patch        # vsce-bump patch, publish
#   bash tools/publish-marketplace.sh minor        # bump minor, publish
#   bash tools/publish-marketplace.sh 0.4.0        # publish specific version
#   bash tools/publish-marketplace.sh --skip-ovsx  # only Microsoft Marketplace
#   bash tools/publish-marketplace.sh --skip-msmp  # only Open VSX
set -euo pipefail

CONFIG="$HOME/.config/say-it/marketplace.env"
if [[ ! -f "$CONFIG" ]]; then
  echo "Missing credentials file: $CONFIG" >&2
  echo "  Create it with:" >&2
  echo "    export VSCE_PAT='...'" >&2
  echo "    export OVSX_PAT='...'" >&2
  echo "  chmod 600 \"$CONFIG\"" >&2
  exit 1
fi
# shellcheck source=/dev/null
. "$CONFIG"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT/integrations/vscode"

SKIP_OVSX=0
SKIP_MSMP=0
BUMP_OR_VERSION=""
for arg in "$@"; do
  case "$arg" in
    --skip-ovsx) SKIP_OVSX=1 ;;
    --skip-msmp) SKIP_MSMP=1 ;;
    *) BUMP_OR_VERSION="$arg" ;;
  esac
done

echo "==> Building dictionary + compiling TypeScript"
npm run build:dict >/dev/null
npm run compile >/dev/null

echo "==> Packaging vsix"
rm -f pronounce-*.vsix
npx vsce package --no-dependencies >/dev/null
VSIX=$(ls -1 pronounce-*.vsix | head -1)
echo "    $VSIX"

if [[ $SKIP_MSMP -eq 0 ]]; then
  if [[ -z "${VSCE_PAT:-}" ]]; then
    echo "VSCE_PAT not set in $CONFIG; skipping MS Marketplace." >&2
  else
    echo "==> Publishing to Microsoft VS Code Marketplace"
    if [[ -n "$BUMP_OR_VERSION" ]]; then
      npx vsce publish "$BUMP_OR_VERSION" -p "$VSCE_PAT"
    else
      npx vsce publish -p "$VSCE_PAT"
    fi
  fi
fi

if [[ $SKIP_OVSX -eq 0 ]]; then
  if [[ -z "${OVSX_PAT:-}" ]]; then
    echo "OVSX_PAT not set in $CONFIG; skipping Open VSX." >&2
  else
    echo "==> Publishing to Open VSX"
    npx ovsx publish "$VSIX" -p "$OVSX_PAT"
  fi
fi

echo "==> Done"
echo "  MS Marketplace: https://marketplace.visualstudio.com/items?itemName=sayit.pronounce"
echo "  Open VSX:       https://open-vsx.org/extension/sayit/pronounce"
