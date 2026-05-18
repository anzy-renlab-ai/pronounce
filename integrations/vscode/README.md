# Pronounce — VS Code

Hover over `kubectl`, `nginx`, `kubectl`, `GIF`, `Affine`, `Logseq` — see IPA, hear the pronunciation. Backed by the community-curated [Pronounce.ai](https://github.com/alvinhochun/say-it) dictionary (~625 tech terms).

> **macOS only in v0.1.** Uses the built-in `say` voice. Linux/Windows backends are on the roadmap (track issue [#vscode-ext-crossplatform](https://github.com/alvinhochun/say-it/issues)).

## Features

- **Hover** any known tech word → tooltip shows IPA, English-like respelling, source, and a 🔊 Play button.
- **Speak selection** — highlight a word, press `⌘⇧'`, hear it.
- **Search** — `Pronounce: Search dictionary…` from the command palette → fuzzy-find any of the ~625 entries.

## Why

Engineers mispronounce tools all day (`kube-cuddle` / `engine-eks` / `Gee-son`). The Pronounce.ai dictionary collects sourced, opinionated pronunciations — creator-clarified where possible (Wilhite on GIF, Crockford on JSON, GNU Project's own FAQ page) and community-consensus otherwise. This extension surfaces them inline in your editor.

## Settings

| Setting | Default | Purpose |
|---|---|---|
| `pronounce.voice` | `Samantha` | Any macOS `say` voice. List with `say -v '?'`. |
| `pronounce.rate` | `200` | Words per minute (80–500). |
| `pronounce.repetitions` | `1` | Hover plays once; CLI default is 3. |
| `pronounce.hoverEnabled` | `true` | Master switch for hover popups. |
| `pronounce.hoverOnlyKnownWords` | `true` | Set `false` to also hover unknown words (lower-quality TTS letter-to-sound). |

## Companion CLI

The same dictionary powers a zero-dep Bash CLI:

```bash
brew install say-it    # or `./install.sh` from the repo
say-it kubernetes      # speaks it 3x
```

See the [main repo](https://github.com/alvinhochun/say-it) for CLI, MCP server, and Raycast/Alfred integrations.

## Contributing

Wrong pronunciation? Missing word? PRs to `data/pronunciations.tsv` in the main repo flow into the next extension release automatically — `npm run build:dict` regenerates the bundled JSON.

## License

MIT.
