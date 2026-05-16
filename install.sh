#!/usr/bin/env bash
# say-it installer — drops the CLI, the pronunciation dictionary,
# and the Claude Code skill into place.
set -e

PREFIX="${PREFIX:-$HOME/.local}"
SKILLS_DIR="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"

# --- CLI + dictionary ---------------------------------------------------------
mkdir -p "$PREFIX/bin" "$PREFIX/share/say-it"
cp "$REPO_ROOT/bin/say-it" "$PREFIX/bin/say-it"
chmod +x "$PREFIX/bin/say-it"
echo "[1/3] CLI installed              → $PREFIX/bin/say-it"

cp "$REPO_ROOT/data/pronunciations.tsv" "$PREFIX/share/say-it/pronunciations.tsv"
echo "[2/3] Pronunciation dict installed → $PREFIX/share/say-it/pronunciations.tsv"

# --- Claude Code skill (optional) --------------------------------------------
if [[ -d "$SKILLS_DIR" ]]; then
  mkdir -p "$SKILLS_DIR/pronounce-word"
  cp "$REPO_ROOT/skills/pronounce-word/SKILL.md" "$SKILLS_DIR/pronounce-word/SKILL.md"
  echo "[3/3] Claude Code skill installed → $SKILLS_DIR/pronounce-word/SKILL.md"
else
  echo "[3/3] Claude skills dir not found at $SKILLS_DIR — skipping skill install."
  echo "      (Set CLAUDE_SKILLS_DIR to override.)"
fi

echo
echo "Done."
if ! echo ":$PATH:" | grep -q ":$PREFIX/bin:"; then
  echo "Note: $PREFIX/bin is NOT on your \$PATH. Add it to use \`say-it\` directly."
fi
echo
echo "Try:"
echo "  say-it kubectl"
echo "  say-it --why GIF"
echo "  say-it list | head"
