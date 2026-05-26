<h1 align="center">🔊 say-it · Pronounce</h1>

<p align="center"><strong>Stop saying "kub-cuttle". One Bash command pronounces 1200+ developer jargon names — with cited sources.</strong></p>

<p align="center">
<a href="https://github.com/anzy-renlab-ai/pronounce/stargazers"><img src="https://img.shields.io/github/stars/anzy-renlab-ai/pronounce?style=social" alt="GitHub stars"></a>
<a href="https://pronounce.renlab.ai"><img src="https://img.shields.io/badge/live-pronounce.renlab.ai-7adfbb?logo=safari&logoColor=white" alt="Live site"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
<a href="https://pronounce.renlab.ai/browse.html"><img src="https://img.shields.io/badge/dictionary-1452%20entries-8fd694" alt="Entries"></a>
<a href="https://marketplace.visualstudio.com/items?itemName=sayit.pronounce"><img src="https://img.shields.io/visual-studio-marketplace/v/sayit.pronounce?label=VS%20Code&color=007ACC&logo=visualstudiocode" alt="VS Code Marketplace"></a>
<a href="https://open-vsx.org/extension/sayit/pronounce"><img src="https://img.shields.io/open-vsx/v/sayit/pronounce?label=Open%20VSX&color=8fd694" alt="Open VSX"></a>
</p>

<p align="center">
🌐 <a href="https://pronounce.renlab.ai"><strong>pronounce.renlab.ai</strong></a> ·
🇨🇳 <a href="https://pronounce.renlab.ai/zh.html" hreflang="zh-Hans">中文</a> ·
📖 <a href="https://pronounce.renlab.ai/browse.html">Browse</a> ·
🎯 <a href="https://pronounce.renlab.ai/quiz.html">Quiz</a> ·
🎤 <a href="https://pronounce.renlab.ai/#hero-search">Voice search</a> ·
🔌 <a href="mcp-server/">MCP server</a>
</p>

<p align="center"><img src="https://pronounce.renlab.ai/demo.gif" alt="say-it kubectl — terminal demo" width="720"></p>

<p align="center">
  <a href="https://github.com/anzy-renlab-ai/pronounce/releases/download/v2.5.0/promo.mp4"><strong>▶ Watch the 47-second promo</strong> (with voice)</a> ·
  <a href="https://pronounce.renlab.ai/quiz.html">🎯 Try the quiz</a> ·
  <a href="https://pronounce.renlab.ai/#hero-search">🎤 Voice search</a>
</p>

---

## 🚀 Try it in 30 seconds

```bash
git clone https://github.com/anzy-renlab-ai/pronounce.git
cd pronounce && ./install.sh
say-it kubectl
```

![say-it CLI demo — kubectl, YAML, TOML, Ghostty](pitch/say-it-cli-demo.gif)

That's it. Now try `say-it GIF`, `say-it nginx`, `say-it Pydantic`, `say-it --why JSON`, or `say-it quiz` for a 10-question challenge. **Linux** users: install `espeak-ng` (`sudo apt install espeak-ng`) and the CLI just works. **Windows**: same CLI under WSL or git-bash + PowerShell. Or skip install and use the browser at **[pronounce.renlab.ai](https://pronounce.renlab.ai)**.

> ⭐ If `say-it kubectl` saves you one cringey standup moment — **[star the repo](https://github.com/anzy-renlab-ai/pronounce)**. It nudges more devs to contribute their favorite mispronounced project name.

<p align="center"><a href="https://star-history.com/#anzy-renlab-ai/pronounce&Date"><img src="https://api.star-history.com/svg?repos=anzy-renlab-ai/pronounce&type=Date" alt="Star history" width="600"></a></p>

---

## What you're actually getting

- **1452 entries, every one sourced.** Confidence-tagged (`creator-clarified` / `community-consensus` / `contested`) with a citable URL where one exists. Wilhite said GIF is "jif" at the 2013 Webby Awards. Crockford says JSON is "JAY-son" (RailsConf 2009). RFC 7519 says JWT is "jot". The dictionary cites them.
- **Multi-reading audio.** For words where the debate is real — GIF, SQL, GUI, char, regex — the CLI chains the alternates after the primary with a spoken "or:" so you *hear* the debate without staring at the terminal. `--solo` skips the tail once you've internalized it.
- **Zero deps. ~250 lines of Bash.** No npm, no sudo, no surprises. Wraps the `say` engine that's already on your Mac. Ships a [Claude Code skill](skills/pronounce-word/SKILL.md) and an [MCP server](mcp-server/) so your AI answers "how do you pronounce X?" with **audio**, not a phonetic guess.

```bash
$ say-it --why JSON
word              JSON
ipa               /ˈdʒeɪsən/
respelling_us     jay son
source            Douglas Crockford (RailsConf 2009)
url               https://www.youtube.com/watch?v=-C-JoyNuQJs
```

---

## Why not just Google?

Because Google gives you 47 Reddit arguments and a YouTube clip you have to unmute. IPA gives you `/ˈkuːb kənˌtroʊl/` — a reference, not a teacher.

You don't need a phonetic transcription. You need to **hear** the word. Twice. Maybe three times. Done.

`say-it` ships a community-maintained dictionary of how engineers actually say the names that trip everyone up — and feeds the *intended* respelling to your OS's text-to-speech engine, so `kubectl` comes out as `koob-control`, not whatever your computer guessed from the letters.

## Famous moments

Some pronunciations aren't opinions — the creators settled them. The dictionary cites every one:

| Word | Reading | Source |
|------|---------|--------|
| `GIF` | "jif" (creator says so) | [Steve Wilhite, Webby Awards 2013](https://www.nytimes.com/2013/05/22/business/media/creator-of-the-gif-says-its-pronounced-jif.html) |
| `JSON` | "jay-son" | [Douglas Crockford, RailsConf 2009](https://www.youtube.com/watch?v=-C-JoyNuQJs) |
| `GNU` | "g-noo" (hard G, one syllable) | [GNU Project official](https://www.gnu.org/gnu/pronunciation.html) |
| `Linux` | "LIN-ux" (short i, schwa) | [Linus Torvalds himself](https://www.youtube.com/watch?v=5IfHm6R5le0) |
| `LaTeX` | "lay-tek" (or "lah-tek") | [Leslie Lamport, official](https://www.latex-project.org/about/) |
| `Django` | "JANG-go" (silent D) | [Django FAQ](https://www.djangoproject.com/foundation/faq/) |
| `Vue` | "view" (one syllable) | [Evan You, Vue docs](https://vuejs.org/) |
| `Vite` | "veet" (French for *quick*) | [Vite docs](https://vitejs.dev/) |
| `Knative` | "KAY-native" (the K is voiced) | [Knative docs](https://knative.dev/) |
| `etcd` | "et-cee-dee" (et-cetera-distributed) | [etcd FAQ](https://etcd.io/docs/v3.5/faq/) |

Every dictionary entry includes a `source_url`. Run `say-it --why <word>` to see it.

## Install (macOS)

The "Try it in 30 seconds" block above has the full install. `./install.sh` drops:

- the CLI at `~/.local/bin/say-it`,
- the pronunciation dictionary at `~/.local/share/say-it/pronunciations.tsv`,
- if you use [Claude Code](https://claude.com/claude-code), a `pronounce-word` skill at `~/.claude/skills/pronounce-word/` so any "how do you say X?" prompt to your AI gets answered with **audio** instead of IPA.

Make sure `~/.local/bin` is on your `$PATH`. **Linux** also works — install `espeak-ng` (`sudo apt install espeak-ng` / `brew install espeak-ng`). **Windows**: WSL or git-bash + PowerShell. Or skip install entirely with the browser version at **[pronounce.renlab.ai](https://pronounce.renlab.ai)**.

## Usage

```bash
say-it kubectl                    # primary × 3, then "or: <alt>" for each alternate
say-it --solo kubectl             # primary only — silence the "or:" tail
say-it --alt GIF                  # focus on the first alternate
say-it --alt 2 GUI                # focus on the Nth alternate (1-indexed)
say-it --all SQL                  # primary AND every alternate, each repeated
say-it --no-dict kubectl          # bypass the dictionary entirely
say-it --why JSON                 # show IPA, source URL, category, confidence
say-it list                       # every word in the dictionary
say-it search redis               # grep the dictionary (case-insensitive)

say-it -n 5 Pydantic              # 5 repetitions instead of 3
say-it -r 130 Knative             # slower (130 wpm; default is 175)
say-it -o /tmp/word.aiff Postgres # save to file instead of playing
say-it --list                     # all macOS voices
```

The default voice is `Samantha` (General American). Pass `-v <voice>` for any other macOS voice — but the dictionary is GenAm-only, by design.

## Claude Code integration

```
You:    kubectl 怎么读？
Claude: 🔊 (plays "koob-control" three times)
        /ˈkuːb kənˌtroʊl/ — "KOOB-control". Kelsey Hightower says it
        this way (KubeCon talk). "Cube-cuddle" is an alternate —
        try `say-it --alt kubectl` to hear it.
```

Once installed, the `pronounce-word` skill auto-triggers on:

- `X 怎么读` / `X 怎么发音` / `读一下 X`
- `how do you pronounce X` / `pronounce X` / `how do you say X`

Your AI replies with **sound**, not just a phonetic guess. Skill file: [`skills/pronounce-word/SKILL.md`](skills/pronounce-word/SKILL.md).

## VS Code extension

[![Open VSX Version](https://img.shields.io/open-vsx/v/sayit/pronounce?label=Open%20VSX&color=8fd694)](https://open-vsx.org/extension/sayit/pronounce) [![Open VSX Downloads](https://img.shields.io/open-vsx/dt/sayit/pronounce?label=installs)](https://open-vsx.org/extension/sayit/pronounce)

![Pronounce demo — kubectl, YAML, Ghostty, wagmi](integrations/vscode/media/demo.gif)

Hover over any tech word in any file — see the IPA, hear the pronunciation. Same 1452-entry dictionary as the CLI, JSON-bundled at build (zero runtime parse cost).

```bash
# Cursor / VSCodium / Zed / Gitpod / Theia / code-server (Open VSX)
code --install-extension sayit.pronounce
# or the listing: https://open-vsx.org/extension/sayit/pronounce
```

**Now live on Microsoft Marketplace too**: `ext install sayit.pronounce` in VS Code. See [marketplace listing](https://marketplace.visualstudio.com/items?itemName=sayit.pronounce).

- **Hover** over `kubectl`, `YAML`, `Ghostty`, `wagmi`… → tooltip with IPA + 🔊 Play + ★ Star link.
- **⌘⇧'** — speak selection.
- **Status bar** `🔊 sayit` — click to speak the current selection.
- **Welcome walkthrough** — 4-step onboarding on first install.
- **`Pronounce: Search dictionary…`** — fuzzy-find all 1452 entries.

Source: [`integrations/vscode/`](integrations/vscode/). **Cross-platform as of v0.3** — macOS `say`, Linux `espeak-ng`, Windows PowerShell.

## Chrome / Edge / Brave extension

Click any tech word on any webpage → popup with IPA + audio. Same 1452-entry dictionary; same Web Speech API as `pronounce.renlab.ai`. **Sideload only for now** (not yet on Chrome Web Store).

Download `pronounce-chrome-0.1.0.zip` from the [latest release](https://github.com/anzy-renlab-ai/pronounce/releases/latest) → unzip → `chrome://extensions/` → Developer mode → Load unpacked.

Source: [`integrations/chrome/`](integrations/chrome/).

## How the dictionary works

`data/pronunciations.tsv` is the single source of truth — tab-separated, 1452 entries, covering:

- **Cloud / DevOps:** `kubectl`, `nginx`, `Kubernetes`, `helm`, `Istio`, `Envoy`, `Prometheus`, `Grafana`, `Terraform`, `Argo`, `Knative`, `etcd`, `containerd`, `runc`, `Podman`, ...
- **Languages / Frameworks:** `Django`, `Vue`, `Vite`, `Pydantic`, `Bun`, `Deno`, `Hugo`, `Hono`, `Caddy`, `Svelte`, `Astro`, `Pinia`, ...
- **Databases:** `PostgreSQL`, `Postgres`, `SQLite`, `MySQL`, `MongoDB`, `Cassandra`, `Redis`, `Ceph`, `ScyllaDB`, `ClickHouse`, `DuckDB`, ...
- **CS jargon / acronyms:** `GIF`, `JSON`, `SQL`, `GUI`, `GNU`, `char`, `regex`, `sudo`, `tmux`, `chmod`, `WYSIWYG`, `ASCII`, `enum`, `NaN`, `SaaS`, `PaaS`, ...
- **Distros / tools:** `Linux`, `Debian`, `Ubuntu`, `Arch`, `Nix`, `LaTeX`, `TeX`, `emacs`, `zsh`, ...

Each entry has 10 columns: `word | ipa | phon_us | alt_ipa | alt_phon_us | source_url | source_label | category | confidence | notes`. The `phon_us` column is Apple's Speech Synthesis phoneme set, injected into `say` via `[[inpt PHON]]…[[inpt TEXT]]`. This is what gives the *intended* reading rather than whatever the TTS would have inferred from the letters.

Local override: drop a `~/.config/say-it/pronunciations.local.tsv` and it takes precedence.

## What works today

- ✅ macOS — any word, via the built-in `say` engine. Zero dependencies.
- ✅ **993** project / product / jargon entries with cited sources.
- ✅ **Audible multi-reading awareness** — contested words audibly chain alternates with "or:".
- ✅ `--alt [N]`, `--all`, `--solo`, `--why`, `--json`, `--md`, `--no-dict`, `list`, `search`, `quiz`, `repl`, `stream`, `doctor`, `export`, `benchmark`, `badge`, `cheatsheet`.
- ✅ Claude Code skill + MCP server for AI-side pronunciation questions.
- ✅ Browser PWA — installable, offline-capable, instant search, voice-mic search, interactive quiz.
- ✅ Editor integrations — Raycast, Alfred, VS Code, Cursor, Codex, Continue.
- ✅ **🌐 Live site** — [pronounce.renlab.ai](https://pronounce.renlab.ai) (every word browsable, audio, source citation) + [/zh.html](https://pronounce.renlab.ai/zh.html) (Chinese landing).

## What's coming

See [`DESIGN.md`](DESIGN.md) for the architecture.

- **🪟 Windows support** via PowerShell + `System.Speech.SpeechSynthesizer`, same CLI flags.
- **☁️ Cloud TTS** (opt-in ElevenLabs / OpenAI) for the names native TTS still mangles.
- **🐧 Linux backend** (`espeak-ng`, then cloud).
- **🔄 `say-it update`** to pull the latest dictionary without reinstalling.
- **📚 Anki export** for vocabulary drills.

## Contributing

Two things we want most:

1. **Pronunciation entries.** Open a PR adding a row to `data/pronunciations.tsv`. Required columns: `word`, `ipa`, `phon_us`. Highly preferred: `source_url` (creator interview, conf talk, official FAQ — anything verifiable). Contested readings are welcome; put the rival in `alt_*` columns and we'll wire `--alt` through.
2. **Non-Mac backends.** Windows and Linux are top priority. See `DESIGN.md` §Backends.

Keep it tiny. Keep it dep-free where possible. Keep the defaults opinionated (3 reps, GenAm, Samantha voice).

## ⭐ Support — start with a star

The dictionary is free and MIT. **The single highest-leverage thing you can do is star the repo** — it's the signal that pulls in more contributors, more PRs, more creator-clarified entries.

- **⭐ [Star on GitHub →](https://github.com/anzy-renlab-ai/pronounce)** — one click, no signup, biggest effect.

Optional, if it's saved you real standup pain:

- ☕ [Coffee on Ko-fi](https://ko-fi.com/alvinanziyan) — pays for one new entry per cup.
- 💚 [Sponsor on GitHub](https://github.com/sponsors/anzy-renlab-ai) — recurring tier (pending Sponsors approval).

Dollars cover hosting (Vercel/Cloudflare/Open VSX), domain renewals, MiniMax narration credits for promo videos, and time to track down creator citations for new entries.

## Contributors

<a href="https://github.com/anzy-renlab-ai/pronounce/graphs/contributors"><img src="https://contrib.rocks/image?repo=anzy-renlab-ai/pronounce" alt="Contributors"></a>

Every entry, source upgrade, and skill fix counts. Open a PR — your face shows up here.

## License

MIT — see [LICENSE](LICENSE).

---

> *IPA is a reference. Audio is a teacher.*
