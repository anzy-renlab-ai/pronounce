#!/usr/bin/env bash
# say-it installer — drops the CLI on $PATH and the Claude Code skill in place.
set -e

PREFIX="${PREFIX:-$HOME/.local}"
SKILLS_DIR="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"

REPO_ROOT="$(cd "$(dirname "$0")" && pwd)"

# CLI
mkdir -p "$PREFIX/bin"
cp "$REPO_ROOT/bin/say-it" "$PREFIX/bin/say-it"
chmod +x "$PREFIX/bin/say-it"
echo "[1/2] CLI installed → $PREFIX/bin/say-it"

# Claude Code skill (optional — only if dir exists)
if [[ -d "$SKILLS_DIR" ]]; then
  mkdir -p "$SKILLS_DIR/pronounce-word"
  cp "$REPO_ROOT/skills/pronounce-word/SKILL.md" "$SKILLS_DIR/pronounce-word/SKILL.md"
  echo "[2/2] Claude skill installed → $SKILLS_DIR/pronounce-word/SKILL.md"
else
  echo "[2/2] Claude skills dir not found at $SKILLS_DIR — skipping skill install."
  echo "      (Set CLAUDE_SKILLS_DIR to override.)"
fi

echo
echo "Done."
if ! echo ":$PATH:" | grep -q ":$PREFIX/bin:"; then
  echo "Note: $PREFIX/bin is NOT on your \$PATH. Add it to use \`say-it\` directly."
fi
