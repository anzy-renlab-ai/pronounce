# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo ships

Two artifacts, deliberately kept in lockstep:

1. **`bin/say-it`** — zero-dep Bash CLI wrapping macOS `say`. Speaks a word N times (default 3) through `say -v <voice> -r <rate>`, or writes to a file with `-o`.
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

No build, no lint config, no test suite — changes are validated by running `./bin/say-it <word>` and listening.

## Conventions when editing

- **macOS-only today.** `say-it` exits 3 with a roadmap message on non-Darwin. Don't add silent no-op fallbacks; the Linux/Windows backends listed in README §Roadmap are unimplemented on purpose.
- **Opinionated defaults are load-bearing.** 3 repetitions, voice `Samantha`, rate 200 wpm. README §Contributing calls these out explicitly — change with care.
- **Voice presets** (`Samantha`/`Daniel`/`Karen`/`Moira`/`Tessa`) are documented in README and SKILL.md. If you add/rename one, update both.
- **CLI ↔ skill drift is the main hazard.** Flag changes in `bin/say-it` must be mirrored in `skills/pronounce-word/SKILL.md` (the skill calls `say-it <word>`, `say-it -o`, `say-it -r`).
- **Zero deps.** Stay in Bash + builtins + `say`/`afplay`. No package managers.
