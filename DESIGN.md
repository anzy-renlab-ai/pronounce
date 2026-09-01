# say-it — Design

Status: **v2.28.1 shipped** · Last reviewed: 2026-09-01

This document describes the product that is currently shipped. Future ideas live in
`IDEAS.md`; they are not part of the runtime contract below.

## Goals

1. Answer “how do developers actually say this project, product, or jargon name?”
   with audio, IPA, an English-like respelling, and an honest confidence label.
2. Make contested readings audible: primary three times, then each alternate after
   a spoken “or”.
3. Keep the core portable and inspectable: one Bash CLI, no npm runtime, and one TSV
   source of truth.
4. Use the operating system’s shipped or conventional local TTS rather than requiring
   a hosted speech service.

Non-goals are regional-accent catalogs, sentence narration, and a general-English
dictionary.

## Runtime architecture

```text
say-it <word>
  │
  ├── normalize the lookup key
  ├── read data/pronunciations.tsv (+ optional local overrides)
  ├── choose primary / --solo / --alt N / --all audible body
  └── pass English-like text to the detected backend
        ├── macOS  → say
        ├── Linux → espeak-ng, then espeak
        └── Windows → PowerShell System.Speech
```

`bin/say-it` is the single CLI on all three platforms. Windows users run that Bash
file under Git Bash, MSYS2, or Cygwin; it invokes the built-in PowerShell speech
assembly when detected. The platform dispatch stays behind `tts_speak`, `tts_save`,
and `audio_play` so lookup and flag behavior do not fork by OS.

The default contract is three repetitions at 130 wpm. macOS defaults to Samantha;
Linux and Windows use an available English voice from their backend. File output is
supported where the backend can render it; live speech remains the fallback.

## Dictionary

`data/pronunciations.tsv` has ten columns:

```text
word | ipa | respelling_us | alt_ipa | alt_respelling_us |
source_url | source_label | category | confidence | notes
```

`respelling_us` is English-like input passed to the detected OS TTS backend; it is
not a phoneme payload. IPA is display metadata. Alternate IPA and respelling fields
are pipe-separated and paired by index.

Every row has a confidence value:

- `creator-clarified` — a creator quote, official FAQ, or canonical documentation
  supports the reading.
- `community-consensus` — widespread usage without a single authoritative citation.
- `contested` — multiple readings genuinely compete in developer usage.

Source URLs are optional by design. The v2.28.1 corpus has 1,903 entries and 1,283
with a citable source. Empty source fields stay empty rather than being filled with
weak or fabricated citations.

## Audible body

```text
default   primary × N, then “or: <alternate>” once for each alternate
--solo    primary × N only
--alt N   selected alternate × N
--all     primary × N, then every alternate × N
--no-dict raw input through the detected backend
```

The spoken alternate tail is intentional: users should hear that a word is
contested even when they are not watching terminal output.

## Website audio

The committed `docs/audio/<slug>.mp3` corpus is canonical for website dictionary
playback. The Hero, cards, Famous entries, command palette, type-to-speak, browse,
and word pages request that MP3 first. Web Speech is a fallback only when the asset
cannot play; it reconstructs the same primary-three-times plus all-alternates body.

The v2 homepage’s `SpeechCtx` owns one active request and returns a monotonically
increasing request ID. Completion is asynchronous and settles exactly once as
`ended`, `failed`, or `cancelled`. Late callbacks from superseded playback cannot
start speech or clear newer UI state.

Free-form interactions such as quiz feedback and karaoke phrases intentionally use
direct speech rather than dictionary MP3s.

## Generated site

The TSV remains the source of truth:

- `tools/build-v2-data.py` emits browser entries, canonical slugs, and complete
  alternate arrays into `docs/v2/data.js`.
- `tools/build-v2-bundle.sh` compiles the five v2 JSX sources into
  `docs/v2/bundle.js`.
- `tools/build-site.sh` generates word, browse, Chinese, daily, API, and supporting
  pages.
- `tools/make-audio-all.py` maintains fingerprinted committed MP3s.
- `tools/make-og.py` and `tools/make-og-all.py` maintain global and per-word cards.

Generated `data.js` and `bundle.js` are committed outputs, but workflow triggers
track their sources rather than the generated files.

## Release guards

The dependency-light release checks are:

```bash
node --test tools/test-v2-audio.mjs
python3 -m unittest tools/test_build_v2_data.py tools/test_make_og_all.py tools/test_chrome_dictionary.py
bash tools/lint-dict.sh
bash tools/smoke-test.sh
python3 tools/make-og-all.py --check
```

CI runs the audio, data, and OG tests on Ubuntu with Python 3.12 and Pillow. The
site workflow uses pinned actions and triggers whenever a source, generator, or
guard capable of changing committed site output changes.

## Editorial and implementation constraints

- Lookup is case-insensitive while canonical display spelling is preserved.
- Generated slugs replace each non-`[a-z0-9._-]` character with `-`.
- Leave `source_url` empty when no defensible citation exists.
- Keep the CLI/skill defaults in lockstep: three repetitions and 130 wpm.
- Route TTS and playback through the backend helpers; do not add platform gates to
  individual subcommands.
- New runtime dependencies, hosted TTS, regional dictionaries, and homepage payload
  reduction require separate design work.
