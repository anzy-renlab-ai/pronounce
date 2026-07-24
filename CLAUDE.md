# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo ships

The core runtime is one Bash CLI with no npm runtime, paired with an agent skill:

1. **`bin/say-it`** — Bash CLI with no npm runtime. It detects macOS `say`, Linux `espeak-ng`/`espeak`, or Windows PowerShell `System.Speech`, then speaks a word N times (default 3). File output is available on backends that can render it.
2. **`skills/pronounce-word/SKILL.md`** — Claude Code skill that auto-triggers on "X 怎么读" / "how to pronounce X" / etc. and shells out to `say-it` so the user actually hears the audio instead of just reading IPA.

The CLI is the engine; the skill is the AI-side trigger. Both are installed by `install.sh` (CLI → `$PREFIX/bin`, skill → `$CLAUDE_SKILLS_DIR/pronounce-word/`; skill step is skipped if the skills dir doesn't exist).

## Common commands

```bash
./install.sh                              # install CLI + skill
PREFIX=/custom ./install.sh               # override install prefix
CLAUDE_SKILLS_DIR=/path ./install.sh      # override skill target

./bin/say-it simile                       # smoke-test without installing
./bin/say-it -v Daniel -n 1 -r 130 word   # voice / repetitions / rate
./bin/say-it --list                       # list every macOS voice
```

Release guards are dependency-light:

```bash
node --test tools/test-v2-audio.mjs
python3 -m unittest tools/test_build_v2_data.py tools/test_make_og_all.py tools/test_chrome_dictionary.py
bash tools/lint-dict.sh
bash tools/smoke-test.sh
```

## Conventions when editing

- **Cross-platform as of v0.3** (CLI and VS Code extension). macOS → `say`, Linux → `espeak-ng` (preferred) or `espeak`, Windows → PowerShell `System.Speech.Synthesis`. macOS quality stays the gold standard; the rest are functional best-effort. All TTS goes through the `tts_speak` / `tts_save` / `audio_play` helpers in `bin/say-it` — don't reintroduce direct `say` / `afplay` calls or platform gates.
- **Opinionated defaults are load-bearing.** 3 repetitions, voice `Samantha`, rate 130 wpm (`RATE=130` in `bin/say-it`; keep the CLI, its `--help`, and `skills/pronounce-word/SKILL.md` all stating 130). The VS Code extension's `pronounce.rate` default in `integrations/vscode/package.json` is kept in lockstep (also 130). Note the `(rate-175)/25` PowerShell mapping in `bin/say-it` and `speak.ts` is a wpm→SAPI-scale anchor, NOT the default — leave it at 175. README §Contributing calls these out explicitly — change with care.
- **Voice presets** (`Samantha`/`Daniel`/`Karen`/`Moira`/`Tessa`) are documented in README and SKILL.md. If you add/rename one, update both.
- **CLI ↔ skill drift is the main hazard.** Flag changes in `bin/say-it` must be mirrored in `skills/pronounce-word/SKILL.md` (the skill calls `say-it <word>`, `say-it -o`, `say-it -r`).
- **No CLI runtime deps.** Keep the CLI in Bash and route audio through the existing backend helpers. Website build dependencies are separate; do not introduce an npm runtime requirement for `say-it`.
