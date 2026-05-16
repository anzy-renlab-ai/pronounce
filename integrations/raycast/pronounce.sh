#!/usr/bin/env bash
# Raycast Script Command: pronounce a word
# @raycast.schemaVersion 1
# @raycast.title Pronounce
# @raycast.mode silent
# @raycast.packageName Pronounce
# @raycast.icon 🔊
# @raycast.argument1 { "type": "text", "placeholder": "word", "optional": false }
# @raycast.description Speak a developer word the way the community says it (uses say-it dictionary)
# @raycast.author pronounce.renlab.ai
# @raycast.authorURL https://pronounce.renlab.ai/
#
# Install:
#   1. Open Raycast → Extensions → "Add Script Directory" → pick this folder.
#   2. Make sure `say-it` is installed (https://github.com/anzy-renlab-ai/pronounce).
#
# Usage: ⌘-space → "Pronounce" → type `kubectl` → Enter.

set -eu
word="${1:?missing word}"

if ! command -v say-it >/dev/null 2>&1; then
  echo "say-it CLI not found. Install: https://github.com/anzy-renlab-ai/pronounce" >&2
  exit 127
fi

say-it "$word"
