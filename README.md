# say-it

**Hear the word, don't just read the IPA.**

A tiny tool that speaks an English word out loud — three times, by default — so you can lock in the pronunciation. Ships as both a CLI and a [Claude Code](https://claude.com/claude-code) skill, so any pronunciation question to your AI gets answered with actual audio instead of a text transcription.

```bash
say-it simile
# plays "Simile. Simile. Simile." through your Mac speakers
```

## Why

When you ask "how do you pronounce X?" most tools spit back `/ˈsɪməli/` and call it a day. IPA is a reference, not a teacher. You need to **hear** a word a few times for it to stick. macOS already ships with great TTS voices — this just wires them up to a one-shot CLI and to your AI assistant so the answer is audio, not text.

## Features

- **Zero deps.** Uses the macOS `say` command you already have.
- **Three repetitions by default**, so the word actually sinks in.
- **Five accents built in** — US, British, Australian, Irish, South African.
- **Save-to-file** mode for clips you want to embed elsewhere.
- **Claude Code skill** included — your AI agent will reach for the audio automatically when you ask "X 怎么读" or "how do you pronounce X."

## Install

```bash
git clone https://github.com/YOUR-ORG/say-it.git
cd say-it
./install.sh
```

This installs:
- The `say-it` CLI to `~/.local/bin/say-it` (override with `PREFIX=…`)
- The `pronounce-word` Claude Code skill to `~/.claude/skills/pronounce-word/` (skipped if the dir doesn't exist)

Make sure `~/.local/bin` is on your `$PATH`.

## Usage

```bash
say-it simile                       # speak 3 times with default (Samantha, en_US)
say-it -v Daniel pronunciation      # use a British voice
say-it -n 5 schadenfreude           # five repetitions instead of three
say-it -r 130 ubiquitous            # slower (130 wpm; default is 200)
say-it -o /tmp/word.aiff simile     # save instead of play
say-it --list                       # list every voice available on your Mac
```

### Built-in voice presets

| Voice      | Accent | Locale |
|------------|--------|--------|
| `Samantha` | American (default) | en_US |
| `Daniel`   | British | en_GB |
| `Karen`    | Australian | en_AU |
| `Moira`    | Irish | en_IE |
| `Tessa`    | South African | en_ZA |

Any other voice listed by `say -v "?"` works too — pass it via `-v`.

## Claude Code integration

After install, ask Claude any of:

- `simile 怎么读`
- `how do you pronounce schadenfreude`
- `读一下 ubiquitous`

…and it'll call `say-it` for you, play the audio three times, and follow up with the IPA + a quick syllabified spelling.

The skill is at [`skills/pronounce-word/SKILL.md`](skills/pronounce-word/SKILL.md). If you don't use Claude Code, you can ignore it — the CLI works standalone.

## Roadmap

- [ ] Linux backend (`espeak-ng` / `piper` / `festival`)
- [ ] Windows backend (PowerShell `Add-Type System.Speech`)
- [ ] Cloud TTS opt-in for higher quality (ElevenLabs / OpenAI)
- [ ] `--anki` flag to drop the saved audio + IPA into an Anki deck
- [ ] Phrase mode: pronounce a full sentence with natural prosody

## Contributing

PRs welcome. Keep it tiny, keep it dep-free where possible, and keep the default behavior (3 repetitions, US voice) opinionated. If you have a different language/locale you want first-class, open an issue first.

## License

MIT — see [LICENSE](LICENSE).
