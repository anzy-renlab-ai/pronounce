# Codex CLI integration

Drop this file into your Codex CLI agent profile (typically `~/.codex/AGENTS.md`
or a project-level `AGENTS.md`) so Codex knows to speak project-name
pronunciations out loud via the `say-it` CLI instead of guessing.

## Trigger

When the user asks a pronunciation question — single-word target, dev-context name — call out to `say-it`.

Match patterns:

- English: "how do you pronounce X", "pronounce X", "how to say X"
- Chinese: "X 怎么读", "X 怎么发音", "读一下 X"

`X` must be a single token (project name, product name, programmer jargon, acronym). Skip if the user wants a full paragraph narrated — that's TTS, not pronunciation.

## What to do

1. **Run the CLI**:

   ```bash
   say-it "$WORD"
   ```

   This plays audio through the detected OS TTS backend: macOS `say`, Linux `espeak-ng`/`espeak`, or Windows PowerShell `System.Speech`. The CLI looks the word up in a community-maintained dictionary and feeds its English-like `respelling_us` to the detected OS TTS engine so project names come out the way engineers actually pronounce them.

2. **Get the metadata** so you can cite it:

   ```bash
   say-it --json "$WORD"
   ```

   Returns a JSON object with `respelling_us`, `ipa`, `alt_*`, `source_url`, `source_label`, `category`, `confidence`, and `notes`.

3. **Reply with one short line** alongside the audio. Always include:
   - The IPA reading.
   - The respelling form (e.g. "KOOB-control").
   - **Source** of the pronunciation when present (creator interview, project FAQ).
   - For *contested* readings, mention the alternative and how to play it (`say-it --alt <word>`).

## Examples

User: "how do you pronounce kubectl?"

```bash
say-it kubectl
say-it --json kubectl
```

Reply:

> 🔊 /ˈkuːb kənˌtroʊl/ — "KOOB-control". Kelsey Hightower and many K8s maintainers say it this way. "Cube-cuddle" and letter-by-letter "K-U-B-E-C-T-L" are alternates — `say-it --alt kubectl` to hear the first.

## Useful flags

| Flag | Effect |
|------|--------|
| `--solo` | Primary × 3 only — silence the audible "or: <alt>" tail. |
| `--alt [N]` | Focus on the Nth alternate. |
| `--all` | Primary AND every alternate, each repeated. |
| `--why` | Print dict entry (colored, with source URL). |
| `--md` | Markdown card for inclusion in your reply. |
| `--copy` | Copy the respelling to the user's clipboard. |

## Notes

- **Tech context only.** Pronounce skill is for project / product / jargon names. Don't invoke for general English vocabulary.
- The dictionary is American English (GenAm) only.
- If the word isn't in the dictionary, the CLI sends the raw spelling to TTS and prints "did you mean: ..." suggestions. Use those to refine.
- Source repo: <https://github.com/anzy-renlab-ai/pronounce> (MIT).
