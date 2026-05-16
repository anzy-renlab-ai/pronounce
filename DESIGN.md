# say-it — Design

Status: **v0.1 shipped** · Owner: @alvin · Last touched: 2026-05-16

This doc captures the architecture for say-it after the 2026-05-16 scope clarification, plus the technical surprise discovered during M1 (Apple's documented `[[inpt PHON]]` markup is dead — see §"macOS surprise").

## Goals (revised)

1. **Answer "how do people actually say this English word/name?"** — with audio, not IPA.
2. **First-class on project/product names with community-habitual pronunciations** that diverge from dictionary readings. Examples: `kubectl`, `nginx`, `GUI`, `GNU`, `PostgreSQL`, `JSON`, `char`, `regex`, `sudo`, `Linux`, `Debian`, `Cassandra`, `k8s`, `Ceph`, `YAML`, `GIF`, `SQL`, `cache`, `tmux`, `Kubernetes`, `nginx`, `pwd`.
3. **Cross-platform**: macOS and **Windows** are both must-have. Linux is roadmap.

Non-goals: regional accent showcase (US/UK/AU/IE/ZA voices), sentence-level prosody, language learning curriculum.

## macOS surprise (key finding from M1)

Apple's Speech Synthesis Programming Guide documents two phoneme-injection paths: the legacy `[[inpt PHON]]…[[inpt TEXT]]` bracket commands and SSML `<phoneme alphabet="ipa" ph="…">…</phoneme>`. **Neither is parsed by the modern `say(1)` CLI in macOS 14+.** Both fall through as literal text — `say "[[inpt PHON]]k AE1 t[[inpt TEXT]]"` is read character-by-character (~3.5s of mumbling), not as "cat" (~0.6s). Empirical test in `tools/phon_audit.sh`.

Consequence: the dictionary cannot ship Apple phoneme strings and rely on `say` to honor them. Instead we ship **English-like respellings** (`"koob control"`, `"jif"`, `"engine X"`) and ride the TTS engine's built-in letter-to-sound rules, which produce acceptable output for short English-shaped strings. The trade-off is lossy precision in exchange for reliability.

The IPA column is retained in the dictionary anyway — it's still useful for (a) display in `--why` output, (b) future cloud TTS providers (ElevenLabs, OpenAI) and (c) the Windows SAPI backend, both of which DO parse SSML `<phoneme>`.

## Pipeline

```
say-it <word>
  │
  ├── 1. Normalize (lowercase for lookup, original case preserved for display)
  │
  ├── 2. Lookup in dictionary (data/pronunciations.tsv)
  │      ├── hit → respelling_us string, e.g. "koob control"
  │      └── miss → use the raw word
  │
  ├── 3. Build the audible body
  │      ├── default       → primary × N reps + spoken "or: <alt>" for each alt
  │      ├── --solo        → primary × N reps only
  │      ├── --alt [N]     → Nth alt × N reps only
  │      └── --all         → primary × N + each alt × N, chained with "or:"
  │
  └── 4. Feed to the platform TTS
         ├── macOS   → say -v Samantha -r 200 "<body>"
         ├── Windows → SSML body with <phoneme alphabet="ipa" ph="..."> (M2)
         └── Cloud   → ElevenLabs / OpenAI with SSML phoneme (M3)
```

### Why alternates chain into the audio by default

Multi-reading words (`GIF`, `SQL`, `GUI`, `kubectl`, `char`, ...) carry context: the user needs to know there's debate. Printing "alt = gif" to stdout is invisible if the user isn't watching the terminal. Spoken `"or: <alt>"` makes the multi-reading status perceptible from the audio alone. `--solo` opts out for users who have already grasped this.

## Dictionary

**Format:** TSV at `data/pronunciations.tsv`, 10 columns:

```
word | ipa | respelling_us | alt_ipa | alt_respelling_us | source_url | source_label | category | confidence | notes
```

`alt_*` columns are `|`-separated for multi-reading words (e.g. `char` has 2 alts: `care|car`). Lookup is case-insensitive on `word`.

Example rows (header omitted, TAB-separated in real file):

```
kubectl         koob control           cube cuddle | cube C T L  most common in K8s community
nginx           engine ex                                        official: "engine x"
GUI             gooey                   G U I                     RMS prefers G-U-I
GNU             guh new                                           one syllable; rhymes w/ "new"
PostgreSQL      post gres Q L           post gres sequel
JSON            jay son                 jee son                   Crockford: "jay-son"
SQL             sequel                  S Q L                     ANSI: S-Q-L; informal: sequel
GIF             jiff                    giff
char            char                    care                      C/C++ convention: "char" rhymes with "car"
regex           redj ex                 reg ex
sudo            soo doo                 soo doh
```

- One row per word; case-insensitive lookup on `word`.
- `respelling` is the **primary** community reading, written as ordinary English that `say` / SAPI both pronounce reasonably.
- `alt` is `|`-separated alternates surfaced when `--alt` is passed (or all enumerated when `--all` is passed).
- `notes` is optional editorial context; never spoken.

**Editorial stance:** When there are camps (GIF, SQL, JSON), pick the more common reading in software engineering practice as primary and put the rival in `alt` with a note. Document the tie-breaker rule in this file so contributions don't relitigate.

**Distribution:** dict ships with the repo and installs to `$PREFIX/share/say-it/pronunciations.tsv`. Both bash and PowerShell read this file directly — single source of truth, no codegen.

## Backends

### macOS (`bin/say-it`, existing, bash)

Wraps `say`. After step 2, swaps `WORD` for the respelling if dict had a hit. Keeps current flags.

### Windows (`bin/say-it.ps1`, new, PowerShell)

```powershell
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.Rate = $RateToScale($Rate)        # map 130-200 wpm to -2..0
if ($Voice) { $synth.SelectVoice($Voice) }
1..$Times | % { $synth.Speak($Text) }
```

- PowerShell 5.1 ships with Windows 10/11 by default, has `System.Speech`. PowerShell 7+ may need `System.Speech` shim — installer will check and warn.
- For `-o FILE`: `$synth.SetOutputToWaveFile($Save); $synth.Speak($Text); $synth.SetOutputToDefaultAudioDevice()`.
- Flag surface is 1:1 with the bash CLI so the skill doesn't branch.
- A thin `bin/say-it.cmd` shim invokes `powershell.exe -ExecutionPolicy Bypass -File say-it.ps1 %*` so users get `say-it` on `cmd.exe` PATH.

### Cloud TTS (both platforms)

- Provider: **ElevenLabs** primary (best quality on proper nouns), OpenAI TTS as alternate. Selected by env var `SAY_IT_TTS_PROVIDER=elevenlabs|openai`, default `elevenlabs` if any key is set, else error with install help.
- Auth: `SAY_IT_ELEVENLABS_API_KEY` / `SAY_IT_OPENAI_API_KEY` env vars. No config file in v1.
- Transport: `curl` on both platforms (macOS has it; Windows 10+ ships `curl.exe`).
- Output: mp3 to cache, then play via `afplay` (macOS) / `(New-Object Media.SoundPlayer)` or `Start-Process` (Windows; mp3 needs Windows Media Player CLI or ffplay — pick wav from cloud if provider supports).
- Cache key: `sha1(provider + voice + text)`. Hits skip the API round-trip.

## CLI surface (target)

Existing flags stay. New:

```
--cloud                    force cloud TTS for this call
--alt                      use the first alternate respelling
--all                      enumerate primary + every alt, separated by pauses
--no-dict                  bypass the dictionary, send the word as-is
--why                      print which entry/path was used (debug)
```

## Installer changes

`install.sh` (POSIX) and a new `install.ps1`:

- macOS/Linux: install `bin/say-it` + `data/pronunciations.tsv` + skill (unchanged otherwise).
- Windows: install `bin/say-it.ps1`, `bin/say-it.cmd` shim, and `data/pronunciations.tsv` under `%LOCALAPPDATA%\say-it\`. Skill lands at `%USERPROFILE%\.claude\skills\pronounce-word\`.

## Claude Code skill changes (`skills/pronounce-word/SKILL.md`)

- Reframe purpose: "community-habitual pronunciation of English words and project/product names." Drop the accent-list framing.
- Trigger patterns unchanged.
- Document `--alt` / `--all` so the skill can surface both readings when the word is contested ("GIF 怎么读" → play primary, mention the alt exists, offer `say-it --alt GIF`).
- Document Windows path: the skill should call `say-it` either way; the installed shim handles dispatch.

## Open questions

1. **Editorial process for the dict.** Open PRs only, or accept a `~/.say-it/pronunciations.local.tsv` override that takes precedence over the bundled one? (Lean: yes to local override, since pronunciation preferences are personal.)
2. **Cloud TTS voice selection.** ElevenLabs has many voices; pick one default ("Rachel"? "Adam"?) and let `-v` override.
3. **Windows audio of mp3.** SAPI can't speak mp3 input. Either request wav from the cloud provider (smaller voice catalog, more bandwidth) or bundle a tiny mp3 player. ElevenLabs supports `output_format=pcm_22050` which `System.Media.SoundPlayer` can play after wrapping in a WAV header — that's probably the cleanest path.
4. **Linux.** Out of scope for this iteration. `espeak-ng` is the natural backend but its voice quality is significantly worse — likely a "cloud-only on Linux" stance.
5. **README rewrite scope.** Wait until the dictionary has ~50 entries and Windows is functional, or update aspirationally now? (Lean: aspirational now under a "what's new" section; full rewrite after MVP.)

## Milestones

1. **M0 — design approval** (this doc).
2. **M1 — dictionary** (`data/pronunciations.tsv` + ~30 seed entries, bash reads & uses it).
3. **M2 — Windows MVP** (`bin/say-it.ps1` reaches feature parity with bash CLI minus `--cloud`).
4. **M3 — cloud fallback** (ElevenLabs path on both platforms, cache, `--cloud` flag).
5. **M4 — docs sweep** (README rewrite, skill update, CHANGELOG).
