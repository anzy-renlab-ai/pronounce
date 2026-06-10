#!/usr/bin/env bash
# say-it installer — drops the CLI, the pronunciation dictionary,
# and the Claude Code skill into place.
set -e

# --- OS gate -----------------------------------------------------------------
# The current backend uses macOS `say`. Windows + Linux are roadmap.
if [[ "$(uname -s)" != "Darwin" ]]; then
  cat >&2 <<EOF
say-it: this release only works on macOS (uses the built-in \`say\` TTS).
        Detected: $(uname -s).

Windows (PowerShell + System.Speech) and Linux (espeak-ng / cloud TTS)
backends are on the roadmap. Track or contribute:
  https://github.com/anzy-renlab-ai/pronounce

To force install anyway (CLI will exit on first invocation), run:
  SAY_IT_FORCE=1 ./install.sh
EOF
  if [[ "${SAY_IT_FORCE:-0}" != "1" ]]; then exit 2; fi
fi

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

# --- Agent Skills standard (Codex CLI, Kiro) — same SKILL.md, drop-in ---------
for AGENT_SKILLS in "$HOME/.agents/skills" "$HOME/.kiro/skills"; do
  if [[ -d "$AGENT_SKILLS" ]]; then
    mkdir -p "$AGENT_SKILLS/pronounce-word"
    cp "$REPO_ROOT/skills/pronounce-word/SKILL.md" "$AGENT_SKILLS/pronounce-word/SKILL.md"
    echo "[+]   Agent skill installed       → $AGENT_SKILLS/pronounce-word/SKILL.md"
  fi
done

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
echo
echo "Enjoying it? A ★ helps more devs find it → https://github.com/anzy-renlab-ai/pronounce"
