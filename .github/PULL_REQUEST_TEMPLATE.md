<!--
Thanks for the PR! Pick the section that matches your change and delete the rest.
-->

## Adding a pronunciation entry

- [ ] **`word`** — the lookup key, canonical capitalization preserved
- [ ] **`respelling_us`** — tested with `./bin/say-it -o /tmp/test.aiff <word> && afplay /tmp/test.aiff`. It sounds right.
- [ ] **`source_url`** — links to a page that actually documents the pronunciation (project FAQ, Wikipedia § Pronunciation, creator interview with timestamp). If no real source exists, this field is **empty** — I have not fabricated one.
- [ ] **`confidence`** — honestly reflects what the source proves:
  - `creator-clarified` only when source documents a creator quote / official FAQ entry
  - `community-consensus` when widely used but no single citable source
  - `contested` when multiple readings genuinely compete

The new entry:

```
<paste the new TSV row here>
```

Why this matters / where I encountered the word:

<!-- 1-2 sentences -->

## Code or skill change

- [ ] Tested locally on macOS.
- [ ] If dictionary changed: regenerated `docs/` with `tools/build-site.sh`.
- [ ] Updated `CHANGELOG.md` under `## Unreleased`.

What it does and why:

<!-- 1-3 sentences -->

## Other

<!-- Open issue first if it's a significant feature or design change. -->
