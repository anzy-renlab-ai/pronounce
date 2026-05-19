# Pronounce — VS Code

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/sayit.pronounce?label=VS%20Code&color=007ACC&logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=sayit.pronounce)
[![VS Code Installs](https://img.shields.io/visual-studio-marketplace/i/sayit.pronounce?label=installs&color=007ACC)](https://marketplace.visualstudio.com/items?itemName=sayit.pronounce)
[![Open VSX Version](https://img.shields.io/open-vsx/v/sayit/pronounce?label=Open%20VSX&color=8fd694)](https://open-vsx.org/extension/sayit/pronounce)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/sayit/pronounce?label=installs&color=8fd694)](https://open-vsx.org/extension/sayit/pronounce)
[![GitHub stars](https://img.shields.io/github/stars/anzy-renlab-ai/pronounce?style=flat&logo=github)](https://github.com/anzy-renlab-ai/pronounce)

**Hover any tech word — hear how engineers actually say it.** Backed by the community-curated [Pronounce.ai](https://pronounce.renlab.ai/) dictionary — **892 sourced entries**, every one tagged with confidence (`creator-clarified` · `community-consensus` · `contested`) and a citable URL.

![Pronounce demo — kubectl, YAML, Ghostty, wagmi](https://raw.githubusercontent.com/anzy-renlab-ai/pronounce/main/integrations/vscode/media/demo.gif)

## What you get

- **Hover** over `kubectl`, `nginx`, `GIF`, `YAML`, `TOML`, `Ghostty`, `wagmi`, `JSON`, `Affine`, `Logseq` — popup with IPA, English-style respelling, both readings if contested, the source citation, and a 🔊 Play button.
- **Speak selection** — highlight any word, press `⌘⇧'`, hear it. Works on words not in the dictionary too (lower-quality TTS fallback).
- **Search dictionary** — fuzzy-find any of the 892 entries from the command palette (`⌘⇧P` → "Pronounce").
- **Status bar `🔊 sayit`** — always-visible reminder; click to speak the current selection.
- **Welcome walkthrough** — on first install, a 4-step tour shows the hover, the search, and one-click hear-kubectl.

## Install

```bash
# VS Code (Microsoft Marketplace)
code --install-extension sayit.pronounce
# Cursor / VSCodium / Zed / Gitpod / Theia / code-server (Open VSX — same ID)
code --install-extension sayit.pronounce
```

Or click through:
- VS Code Marketplace: <https://marketplace.visualstudio.com/items?itemName=sayit.pronounce>
- Open VSX: <https://open-vsx.org/extension/sayit/pronounce>

> **Cross-platform as of v0.3.** macOS uses the built-in `say`; Linux uses `espeak-ng` (`sudo apt install espeak-ng` / `brew install espeak-ng`); Windows uses PowerShell's built-in `System.Speech.Synthesis`. macOS quality is best; the others are functional.

## Why

Engineers mispronounce tools all day — `kube-cuddle`, `engine-eks`, `Gee-son`, `yaymul`, `LOG-sek`. Webster doesn't cover them; this does. Creator-clarified where possible (Wilhite on GIF, Crockford on JSON, GNU Project's own FAQ, Tom Preston-Werner on TOML, yaml.org's FAQ on YAML, IETF RFC 9000 on QUIC, Mitchell Hashimoto on Ghostty, EWD archive on Dijkstra) and community-consensus otherwise. The extension surfaces all that inline.

## Settings

| Setting | Default | Purpose |
|---|---|---|
| `pronounce.voice` | `Samantha` | Any macOS `say` voice. List with `say -v '?'`. Recommended: Samantha, Daniel, Karen, Moira, Tessa. |
| `pronounce.rate` | `200` | Words per minute (80–500). |
| `pronounce.repetitions` | `1` | Hover plays once; CLI default is 3 (more annoying on hover). |
| `pronounce.hoverEnabled` | `true` | Master switch for hover popups. |
| `pronounce.hoverOnlyKnownWords` | `true` | Set `false` to also hover unknown words (lower-quality letter-to-sound TTS). |
| `pronounce.statusBar` | `true` | Show 🔊 sayit in the status bar. |

## Companion CLI + web + skill + MCP

The same dictionary powers:

```bash
brew install say-it       # or ./install.sh from the repo
say-it kubernetes         # speaks it 3x with cited pronunciation
```

- **Web**: [pronounce.renlab.ai](https://pronounce.renlab.ai/) — full 892-entry browser with Famous Moments + quiz.
- **Claude Code skill**: triggers on "how do you pronounce X" / "X 怎么读" — the AI plays sound instead of guessing.
- **MCP server**: drop into Cursor / Claude / any MCP client.
- **Raycast / Alfred / Continue**: integrations in [the main repo](https://github.com/anzy-renlab-ai/pronounce/tree/main/integrations).

## Contributing

Wrong pronunciation? Missing word? Open a PR against `data/pronunciations.tsv` in the [main repo](https://github.com/anzy-renlab-ai/pronounce/blob/main/data/pronunciations.tsv). PRs flow into the next extension release — `npm run build:dict` regenerates the bundled JSON.

If this saves you one cringey standup moment — **[star the repo](https://github.com/anzy-renlab-ai/pronounce)**. It's how more devs find it.

## License

MIT.
