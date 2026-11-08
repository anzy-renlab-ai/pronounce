# Daily update & release runbook

> Executed once a day by the scheduled agent (or a maintainer). Goal: keep
> the dictionary fresh with late-breaking dev/AI vocabulary and ship it as a
> patch release — WITHOUT lowering the quality bar. Releasing nothing is a
> valid outcome; a junk entry is not.

## 0. Preconditions

```bash
cd /Users/baidu/work/say-it && git checkout main && git pull --ff-only
```

## 1. Discover candidates (≤ 30 min budget)

Find words that are (a) new or trending developer/AI jargon, product, or
project names, (b) genuinely pronounced in a non-obvious way, and (c) NOT
already in the dictionary (check `data/pronunciations.tsv`, case-insensitive,
and remember slug collisions). Sources, in order of yield:

1. Recent GitHub trending / new AI product launches (past 7 days).
2. HN / X launches of dev tools with odd spellings.
3. New entries in adjacent dictionaries' watchlists.

Hard cap: **5 candidates** per day. Fewer is better.

## 2. Admit or reject (quality bar — non-negotiable)

Admit a candidate only with REAL pronunciation evidence:
- a creator quote/interview/post stating the reading, or
- overwhelming community consensus (multiple independent sources), and
- you can write a GenAm IPA with stress marks AND a respelling macOS `say`
  reads correctly.

No evidence → reject, log one line in the changelog draft nothing. NEVER
fabricate `source_url` (empty is acceptable, confidence stays
`community-consensus` at best; `creator-clarified` REQUIRES a source URL —
lint enforces it).

## 3. Add entries

```bash
# batch file format: see tools/batch*.json history
python3 tools/add-batch.mjs tools/batch-daily.json   # validates + dedups + appends
```

## 4. Rebuild assets

```bash
bash tools/build-site.sh          # word pages, badges, sitemaps, clips
python3 tools/make-audio-all.py   # macOS say → mp3 (fills new words only)
python3 tools/make-og.py          # global OG card ("and N more.")
python3 tools/make-og-all.py      # per-word OG cards
bash tools/lint-dict.sh           # MUST pass
```

## 5. Release

1. Bump `.codex-plugin/plugin.json` version: MINOR for ≥1 new entry
   (v2.31.0 → v2.32.0 …), PATCH for data fixes only.
2. Prepend to `CHANGELOG.md`:

   ```
   ## v<version> — <today>

   **<one-line summary>.** N new entries (X total): word1, word2, …
   ```

3. `bash tools/release.sh` — syncs the README/test pins, runs all guards,
   tags, pushes, and opens the GitHub release. It fails loud if the
   changelog top entry doesn't match the version/date.

## 6. Ledger

Append one line to `.github/STAR-DRIVE-STATUS.md` under a `## Daily log`
heading: date, version, entries added, entries rejected (+why), star count
(`gh api repos/anzy-renlab-ai/pronounce --jq .stargazers_count`).

## If nothing qualifies

Skip steps 3–5. Still do step 6 (star count + a "no release" line). A quiet
day is fine; the cadence only matters when there is real vocabulary to add.
