# 🔊 say-it · [pronounce.renlab.ai](https://pronounce.renlab.ai)

[![GitHub stars](https://img.shields.io/github/stars/anzy-renlab-ai/pronounce?style=social)](https://github.com/anzy-renlab-ai/pronounce/stargazers)
[![Live site](https://img.shields.io/badge/live-pronounce.renlab.ai-7adfbb?logo=safari&logoColor=white)](https://pronounce.renlab.ai)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Entries](https://img.shields.io/badge/dictionary-236%20entries-ff6a3d)](https://pronounce.renlab.ai/browse)
[![Platform](https://img.shields.io/badge/platform-macOS-lightgrey?logo=apple)](https://pronounce.renlab.ai)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Pronounce `kubectl` without the cringe.**

🌐 **[pronounce.renlab.ai](https://pronounce.renlab.ai)** · 📖 [Browse the dictionary](https://pronounce.renlab.ai/browse) · 🤝 [Contribute](CONTRIBUTING.md) · 🗺 [Roadmap](IDEAS.md)

![say-it terminal demo](https://pronounce.renlab.ai/demo.svg)

Every developer has been there. You're in a standup, you say "n-jinx" out loud, and someone gently corrects you to "engine-x". Or you spend six months saying "kub-cuttle" before finally hearing "koob-control".

`say-it` is the tiny CLI that fixes this. It speaks project names, product names, and programmer jargon out loud, through your real speakers, three times, so the right reading actually sticks.

```bash
$ say-it kubectl
🔊  koob control. koob control. koob control. or: cube cuddle. or: kube C T L.

$ say-it GIF
🔊  jif. jif. jif. or: gif.

$ say-it --alt GIF        # focus on the alternate
🔊  gif. gif. gif.

$ say-it --solo GIF       # primary only — silence the "or:" tail
🔊  jif. jif. jif.

$ say-it --why JSON
word              JSON
ipa               /ˈdʒeɪsən/
respelling_us     jay son
source            Douglas Crockford (RailsConf 2009)
url               https://www.youtube.com/watch?v=-C-JoyNuQJs
```

When a word is multi-reading, **you hear that too** — `say-it` chains the alternates after the primary with a spoken "or:" so you know the debate exists, no terminal-watching required.

No more squinting at `/ˈkjuːb kənˌtroʊl/`. You just hear it.

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

```bash
git clone https://github.com/anzy-renlab-ai/pronounce.git
cd pronounce && ./install.sh
```

This drops:

- the CLI at `~/.local/bin/say-it`,
- the pronunciation dictionary at `~/.local/share/say-it/pronunciations.tsv`, and
- if you use [Claude Code](https://claude.com/claude-code), a `pronounce-word` skill at `~/.claude/skills/pronounce-word/` so any "how do you say X?" prompt to your AI gets answered with **audio** instead of IPA.

Make sure `~/.local/bin` is on your `$PATH`.

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

## How the dictionary works

`data/pronunciations.tsv` is the single source of truth — tab-separated, 70+ entries at v0.1, covering:

- **Cloud / DevOps:** `kubectl`, `nginx`, `Kubernetes`, `helm`, `Istio`, `Envoy`, `Prometheus`, `Grafana`, `Terraform`, `Argo`, `Knative`, `etcd`, `containerd`, `runc`, `Podman`, ...
- **Languages / Frameworks:** `Django`, `Vue`, `Vite`, `Pydantic`, `Bun`, `Deno`, `Hugo`, `Hono`, `Caddy`, `Svelte`, `Astro`, `Pinia`, ...
- **Databases:** `PostgreSQL`, `Postgres`, `SQLite`, `MySQL`, `MongoDB`, `Cassandra`, `Redis`, `Ceph`, `ScyllaDB`, `ClickHouse`, `DuckDB`, ...
- **CS jargon / acronyms:** `GIF`, `JSON`, `SQL`, `GUI`, `GNU`, `char`, `regex`, `sudo`, `tmux`, `chmod`, `WYSIWYG`, `ASCII`, `enum`, `NaN`, `SaaS`, `PaaS`, ...
- **Distros / tools:** `Linux`, `Debian`, `Ubuntu`, `Arch`, `Nix`, `LaTeX`, `TeX`, `emacs`, `zsh`, ...

Each entry has 10 columns: `word | ipa | phon_us | alt_ipa | alt_phon_us | source_url | source_label | category | confidence | notes`. The `phon_us` column is Apple's Speech Synthesis phoneme set, injected into `say` via `[[inpt PHON]]…[[inpt TEXT]]`. This is what gives the *intended* reading rather than whatever the TTS would have inferred from the letters.

Local override: drop a `~/.config/say-it/pronunciations.local.tsv` and it takes precedence.

## What works today

- ✅ macOS — any word, via the built-in `say` engine. Zero dependencies.
- ✅ 70+ project / product / jargon entries with cited sources.
- ✅ **Audible multi-reading awareness** — contested words audibly chain alternates with "or:".
- ✅ `--alt [N]`, `--all`, `--solo`, `--why`, `--no-dict`, `list`, `search`.
- ✅ Claude Code skill for AI-side pronunciation questions.

## What's coming

See [`DESIGN.md`](DESIGN.md) for the architecture.

- **🪟 Windows support** via PowerShell + `System.Speech.SpeechSynthesizer`, same CLI flags.
- **🌐 Static dictionary site** on GitHub Pages — every word browsable, with a play button and source citation.
- **☁️ Cloud TTS** (opt-in ElevenLabs / OpenAI) for the names native TTS still mangles.
- **🐧 Linux backend** (`espeak-ng`, then cloud).
- **🔄 `say-it update`** to pull the latest dictionary without reinstalling.
- **📚 Anki export** for vocabulary drills.

## Contributing

Two things we want most:

1. **Pronunciation entries.** Open a PR adding a row to `data/pronunciations.tsv`. Required columns: `word`, `ipa`, `phon_us`. Highly preferred: `source_url` (creator interview, conf talk, official FAQ — anything verifiable). Contested readings are welcome; put the rival in `alt_*` columns and we'll wire `--alt` through.
2. **Non-Mac backends.** Windows and Linux are top priority. See `DESIGN.md` §Backends.

Keep it tiny. Keep it dep-free where possible. Keep the defaults opinionated (3 reps, GenAm, Samantha voice).

## License

MIT — see [LICENSE](LICENSE).

---

> *IPA is a reference. Audio is a teacher.*
