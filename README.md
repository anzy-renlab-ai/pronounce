# 🔊 say-it

**Pronounce `kubectl` without the cringe.**

Every developer has been there. You're in a standup, you say "n-jinx" out loud, and someone gently corrects you to "engine-x". Or you spend six months saying "kub-cuttle" before finally hearing someone say "koob-control".

`say-it` is the tiny CLI that fixes this. It speaks English words — and the project names we mangle — out loud, through your real speakers, three times, so the right reading actually sticks.

```bash
$ say-it simile
🔊  simile. simile. simile.
```

No more squinting at `/ˈsɪməli/`. You just hear it.

---

## Why not just Google?

Because Google gives you 47 Reddit arguments and a YouTube clip you have to unmute. IPA gives you `/ˈsɪməli/` — a reference, not a teacher.

You don't need a phonetic transcription. You need to **hear** the word. Twice. Maybe three times. Done.

`say-it` wires your OS's built-in text-to-speech into a one-shot CLI — and we're building a community-maintained dictionary of how engineers actually say the names that trip everyone up.

## Install (macOS)

```bash
git clone https://github.com/anzy-renlab-ai/say-it.git
cd say-it && ./install.sh
```

This drops the CLI at `~/.local/bin/say-it` and — if you use [Claude Code](https://claude.com/claude-code) — installs a `pronounce-word` skill so any "how do you say X?" prompt to your AI gets answered with **audio** instead of IPA.

Make sure `~/.local/bin` is on your `$PATH`.

## Usage

```bash
say-it pronunciation              # speaks it 3 times
say-it -n 5 schadenfreude         # 5 repetitions
say-it -r 130 ubiquitous          # slower (130 wpm; default is 200)
say-it -v Daniel pronunciation    # alternate voice
say-it -o /tmp/word.aiff simile   # save instead of play
say-it --list                     # every voice on your Mac
```

## Claude Code integration

```
You:    kubectl 怎么读？
Claude: 🔊 (plays the word three times)
        /ˈkjuːb kənˌtroʊl/ — "KOOB-control", the Kubernetes CLI.
```

Once installed, the `pronounce-word` skill auto-triggers on:

- `X 怎么读` / `X 怎么发音` / `读一下 X`
- `how do you pronounce X` / `pronounce X`

Your AI replies with **sound**, not just a phonetic guess. Skill file: [`skills/pronounce-word/SKILL.md`](skills/pronounce-word/SKILL.md).

## What works today

- ✅ Any English word, spoken via macOS `say` — zero dependencies, no install beyond `./install.sh`.
- ✅ Configurable repetitions, rate, voice, save-to-file.
- ✅ Claude Code skill that turns pronunciation questions into audio.

## What's coming

See [`DESIGN.md`](DESIGN.md) for the architecture.

- **🗂 Project-name pronunciation dictionary** — the headline feature. A community-maintained `pronunciations.tsv` so `say-it kubectl` says "koob-control", `say-it nginx` says "engine-x", `say-it GUI` says "gooey". With `--alt` for the holy wars (`jif` vs `gif`, `sequel` vs `S-Q-L`, `jay-son` vs `jee-son`).
- **🪟 Windows support** via PowerShell + `System.Speech.SpeechSynthesizer`, same CLI flags.
- **☁️ Cloud TTS** (opt-in ElevenLabs / OpenAI) for the names native TTS mangles.
- **🐧 Linux backend** (`espeak-ng`, then cloud).
- **📚 Anki export** for vocabulary drills.

## Contributing

Two things we want most:

1. **Pronunciation entries** — once the dictionary lands, open a PR with `word / respelling / alt / notes`. Community-sourced, opinionated, with room for the rival readings (we'll never settle GIF, and that's fine).
2. **Non-Mac backends** — Windows and Linux are top priority.

Keep it tiny. Keep it dep-free where possible. Keep the defaults opinionated (3 reps, sensible default voice).

## License

MIT — see [LICENSE](LICENSE).

---

> *IPA is a reference. Audio is a teacher.*
