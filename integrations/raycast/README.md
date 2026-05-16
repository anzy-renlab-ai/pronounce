# Raycast — Pronounce script command

Tiny Raycast wrapper around the `say-it` CLI.

## Install

1. Install [`say-it`](https://github.com/anzy-renlab-ai/pronounce) first (`./install.sh`).
2. Open **Raycast → Settings → Extensions → Scripts → Add Script Directory** and point it at `integrations/raycast/` in this repo.
3. Trigger Raycast (⌘-space), type **Pronounce**, hit Enter, type the word (e.g. `kubectl`), Enter again.

The script reuses your installed dictionary (`data/pronunciations.tsv`), so contested words still play the alternates ("…or: gif").

## Why a script command, not a full extension?

Because the dictionary is local — there's no network call, no auth, no config. A 30-line bash script is honest about that. If you want a richer UI (live filter, copy IPA, last-played history), open a PR.
