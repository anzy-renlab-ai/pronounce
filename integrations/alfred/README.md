# Alfred workflow — say

Speak any developer term via Alfred. Wraps the `say-it` CLI.

## Install

1. Install [`say-it`](https://github.com/anzy-renlab-ai/pronounce) (`./install.sh`).
2. In Alfred, **Preferences → Workflows → +** → create a new blank workflow.
3. Add a **Keyword input** with keyword `say`, argument **required**.
4. Connect it to a **Run Script** action: `/bin/bash -lc` with script `say-it "$1"`.

Or import `pronounce.alfredworkflow.json` as a starter (Alfred uses a binary `.alfredworkflow` archive format — the JSON here documents the structure for hand-recreation).

## Usage

Hit Alfred (⌘-space) → type `say kubectl` → Enter. Done.
