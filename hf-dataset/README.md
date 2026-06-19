---
license: mit
language:
  - en
tags:
  - pronunciation
  - ipa
  - phonetics
  - text
  - dictionary
pretty_name: Dev Jargon Pronunciations
size_categories:
  - n<1K
task_categories:
  - text-classification
configs:
  - config_name: default
    data_files:
      - split: train
        path: pronunciations.jsonl
---

# Dev Jargon Pronunciations

A community dictionary of how engineers actually pronounce developer jargon: project names, products, CLI tools, CS terms, and acronyms. `kubectl`, `nginx`, `GIF`, `JSON`, `YAML`, `LaTeX`, `Tcl`, `awk`, and 1694 more.

The dataset is the data behind [pronounce.renlab.ai](https://pronounce.renlab.ai). Each entry carries IPA, an English-like respelling, alternative readings, a confidence label, a citable source URL where one exists, and a URL to pre-rendered audio.

- **Entries:** 1738
- **Language:** English (General American only)
- **Format:** one JSON object per line (`pronunciations.jsonl`); a flat `pronunciations.csv` is also included
- **License:** MIT

## What it is, honestly

Most pronunciation references tell you the "correct" answer. A lot of developer jargon does not have one. `SQL` is "sequel" to half the room and "S-Q-L" to the other half. `JSON` is "jay-son" to Crockford and "jason" to plenty of people who ship it daily. So this dataset does two things at once:

1. records the reading developers actually use, and
2. labels how settled that reading is.

That second part is the differentiator. The interesting rows are not the ones everybody agrees on. They are the 158 words developers are still arguing about, and the 67 the creators already settled on the record.

## Confidence split

| confidence            | count | meaning                                                                    |
|-----------------------|-------|----------------------------------------------------------------------------|
| `community-consensus` | 1513  | one dominant reading, no live dispute                                      |
| `contested`           | 158   | two or more readings in active use; the debate is real                     |
| `creator-clarified`   | 67    | settled by the creator or an official FAQ, with a source quote on file     |

## Column schema

Every record (JSONL object / CSV row) has these 11 fields. Strings throughout; empty string means "not available", not null.

| column              | description                                                                                      |
|---------------------|--------------------------------------------------------------------------------------------------|
| `word`              | the lookup key (e.g. `kubectl`). Case-insensitive lookup is intended.                             |
| `ipa`               | primary General American IPA with stress marks, e.g. `/dʒɪf/`                                     |
| `respelling_us`     | English-like phonetic respelling, e.g. `jif`. This is the string fed verbatim to a TTS engine.   |
| `alt_ipa`           | `\|`-separated alternative IPAs, or empty                                                          |
| `alt_respelling_us` | `\|`-separated alternative respellings, paired with `alt_ipa` by index, or empty                  |
| `source_url`        | best citation: a documented pronunciation page, official FAQ, Wikipedia anchor, etc. Empty if unverified. |
| `source_label`      | human-readable source label, e.g. `GNU Project official`, `Wikipedia § Pronunciation`            |
| `category`          | one of `project`, `product`, `cli-tool`, `tool`, `cs-term`, `acronym`, `abbreviation`            |
| `confidence`        | one of `creator-clarified`, `community-consensus`, `contested`                                    |
| `notes`             | editorial context: who says what, why it is contested. Never spoken; for humans.                 |
| `audio_url`         | URL to a pre-rendered MP3 of the primary reading, hosted at `pronounce.renlab.ai/audio/<word>.mp3` |

### Why an English respelling and not just IPA

The `respelling_us` column exists because it is the string that actually produces audio today. macOS `say` (2026 era) does not parse IPA, `[[inpt PHON]]` markup, or SSML `<phoneme>` tags; it reads them as literal text. So the project feeds plain English-like spellings that a TTS engine's letter-to-sound rules render acceptably. The `ipa` column is kept for display, for future cloud TTS, and for the Windows SAPI backend (which does honor SSML phoneme tags).

## Provenance and methodology

The data is hand-curated, not scraped. Confidence labels are assigned by this rule:

- **`creator-clarified`** — used only when `source_url` documents a creator quote or an official FAQ entry stating the pronunciation. Example: the GNU Project hosts a dedicated [pronunciation page](https://www.gnu.org/gnu/pronunciation.html); `nginx.org` documents "engine x". A `creator-clarified` row without a real source is a bug.
- **`contested`** — assigned when two or more readings are demonstrably in active use among practitioners and no creator/official ruling settles it (or a ruling exists but the community visibly ignores it, like `GIF`). The `notes` field names the competing camps.
- **`community-consensus`** — the default: one dominant reading with no live dispute. Most of the 1513 such entries are uncontroversial words that just needed an IPA and a respelling.

`source_url` is filled in wherever a citable reference exists (official FAQ, project about-page, Wikipedia pronunciation anchor). Where no source exists, it is left empty rather than faked.

## Famous receipts

The dataset's reason to exist is the citations. A few of the settled ones:

| word    | reading       | who settled it                                              | confidence          |
|---------|---------------|------------------------------------------------------------|---------------------|
| `GIF`   | "jif"         | Steve Wilhite (creator), [NYT 2013](https://www.nytimes.com/2013/05/22/business/media/creator-of-the-gif-says-its-pronounced-jif.html) | `creator-clarified` |
| `nginx` | "engine x"    | [nginx.org](https://nginx.org/en/) official                | `creator-clarified` |
| `YAML`  | "yam-ul"      | [yaml.org](https://yaml.org/) ("rhymes with camel")        | `creator-clarified` |
| `GNU`   | "guh-new"     | [gnu.org pronunciation FAQ](https://www.gnu.org/gnu/pronunciation.html) | `creator-clarified` |
| `LaTeX` | "lay-tek"     | Lamport / [LaTeX project](https://www.latex-project.org/about/) | `creator-clarified` |
| `TOML`  | rhymes with "knoll" | Tom Preston-Werner (creator)                         | `creator-clarified` |
| `Tcl`   | "tickle"      | John Ousterhout (creator)                                  | `creator-clarified` |
| `awk`   | "auk"         | Aho / Weinberger / Kernighan, original AWK book            | `creator-clarified` |

And a few that are still genuinely `contested`:

| word      | the argument                                  |
|-----------|-----------------------------------------------|
| `kubectl` | "koob-control" vs "cube-cuttle" vs letter-by-letter |
| `SQL`     | "sequel" (heir to IBM SEQUEL) vs "S-Q-L" (ANSI) |
| `JSON`    | "jay-son" (Crockford) vs "jason"              |
| `GUI`     | "gooey" vs "G-U-I"                             |
| `JWT`     | "jot" vs "J-W-T"                              |

## Loading

```python
from datasets import load_dataset

ds = load_dataset("<user>/dev-jargon-pronunciations")
print(ds["train"][0])

# just the words still being argued about
contested = ds["train"].filter(lambda r: r["confidence"] == "contested")
print(len(contested), "contested entries")
```

Or read the JSONL directly, no `datasets` dependency needed:

```python
import json

with open("pronunciations.jsonl") as f:
    rows = [json.loads(line) for line in f]
```

## Suggested uses

- A `text-classification` target: predict the `confidence` label (or `category`) from `word` + `notes`.
- A lookup table for a pronunciation tool, IDE extension, or chatbot ("how do you say `kubectl`?").
- A seed for studying how technical communities form and contest pronunciation norms.

## License

MIT. Use it, fork it, ship it. See the repository for the full text.

## Cite as

```bibtex
@misc{pronounce_dev_jargon,
  title        = {Pronounce: a community pronunciation dictionary for developer jargon},
  author       = {Pronounce contributors},
  year         = {2026},
  howpublished = {\url{https://pronounce.renlab.ai}},
  note         = {Dataset; MIT license}
}
```

## Links

- Site: https://pronounce.renlab.ai
- Source repository: https://github.com/anzy-renlab-ai/pronounce
- Contribute a word or fix a reading: open a PR against `data/pronunciations.tsv` in the repo.

---

## How to publish (maintainer)

```bash
pip install huggingface_hub
huggingface-cli login
huggingface-cli upload <user>/dev-jargon-pronunciations ./hf-dataset --repo-type dataset
```

Regenerate `pronunciations.jsonl` and `pronunciations.csv` from the canonical `data/pronunciations.tsv` before uploading so the dataset stays in lockstep with the site and CLI.
