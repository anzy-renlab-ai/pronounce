# Star growth status

> Maintainer runbook and experiment ledger. Last updated 2026-11-07.
> **Active goal: ≥10 stars/week.**

## Current baseline

| Metric | Value | Window |
|---|---:|---|
| GitHub stars | **47** | lifetime |
| Forks | 1 | lifetime |
| Watchers | 1 | lifetime |
| Largest historical jump | 13 stars (2026-06-10) | distribution release day |

Top referrers have been `pronounce.renlab.ai`, GitHub, Google, and Doubao.
The 2026-06-10 jump landed the same day as the Homebrew/Codex/Kiro/MCP/
awesome-mac distribution release — correlation, but it makes distribution
and reusable project surfaces the strongest experiment class.

## Closed-loop work shipped in v2.29.0 (2026-11-06)

- 17-entry late-2026 AI vocabulary batch (humans& Boba/&Tutor lineage,
  GPT-6 Astra, DeepIn, Jev, NVFP4…), 1,920 entries total.

## Growth trio shipped in v2.32.0 (2026-11-08)

Three referral-loop features, spec + plan + multi-agent adversarially-reviewed:

- **Dev Jargon 5** (`/daily`) — deterministic 5-word daily challenge
  (UTC-rollover, same five for everyone), emoji-grid share text ending in the
  site URL. Recurring-visit loop: the share grid is a daily social artifact.
- **Hosted remote MCP** (`https://pronounce.renlab.ai/mcp`, streamable HTTP,
  no install) + remote transport in server.json 0.2.0 for registry publish.
  New-channel loop: MCP registries/directories list endpoints, each listing a
  durable referral path.
- **`/say/<word>` correction short-links** + one-click 「Correct someone」copy
  button on every EN/ZH word page. Moment-of-need loop: the link gets pasted
  exactly when someone mispronounces — highest-intent referral.

## Closed-loop work shipped in v2.30.0 (2026-11-07)

- **Creator clips (49)** — word pages link the public YouTube moment where
  the name's creator says it (Knuth/TeX, Lamport/LaTeX, Evan You/Vue+Vite,
  Stallman/GNU, Stonebraker/Postgres, Kernighan/awk…). Multi-agent curated,
  adversarially verified (oEmbed liveness, speaker identity, caption-
  corroborated timestamps). Link-only, lazy youtube-nocookie embed. EN + 中文.
- **`say-it propose`** — dictionary miss → draft TSV row + research
  checklist + prefilled GitHub issue (offline, never invents sources).
  Lowers the contribution barrier to one command.
- **One-liner installer** — `curl -fsSL https://pronounce.renlab.ai/install.sh
  | bash` on README, homepage, zh homepage, every word page, and 404.
  (docs/install.sh is a static remote wrapper around ./install.sh.)
- Pronunciation badges (`/badge/<word>.svg`, generated per build, guarded
  by lint check [8/9]) with copy-Markdown embed on word pages — third-party
  README embeds are durable referral paths.
- Review hardening: bash-3.2-safe jsesc (fixed the shipped Cap'n Proto play
  button), generator-side clip validation, CI lint gate in build-site.yml.

## Distribution status

- `jaywcjlove/awesome-mac#2067` — merged.
- `punkpeye/awesome-mcp-servers#9960` — merged.
- `hesreallyhim/awesome-codex-plugins#223` — merged.
- `alebcay/awesome-shell#710` — open and mergeable; do not bump again unless
  a maintainer requests changes.
- `toolleeo/awesome-cli-apps-in-a-csv#614` — open (2026-11-07, `learning`
  category, CSV-only per their CONTRIBUTING).
- `agarrharr/awesome-cli-apps` — NOT submitted: their CONTRIBUTING bans
  AI-generated PRs ("we would like to know why a human thinks the app is
  awesome"). Draft entry for a maintainer to file personally lives in
  `/tmp/awesome-submissions.md` (regenerate: category "Command Line
  Learning", entry `[say-it](repo) - Speaks developer jargon aloud with
  pronunciations from a 1,900-word community dictionary, with sources for
  contested ones like GIF and nginx.`). 47★ clears their 20★ bar.
- PyPI, GHCR, and the official MCP Registry are maintained by release
  workflows. VS Code Marketplace and Open VSX listings are live.

## Maintainer-only amplification (highest star-per-hour — needs a human)

1. **Show HN** v2.30.0 with the creator-clips story ("49 moments the
   inventor says the name — Knuth on TeX, Stallman on GNU"). Copy in
   `LAUNCH-READY.md`; answer replies from a real account.
2. **Submit agarrharr/awesome-cli-apps personally** (20.6k★ list; see
   draft above). One PR, `Add say-it`, one human why-awesome sentence.
3. **Tell the clipped creators** — low-key reply/DM to Evan You, François
   Chollet, John Ousterhout-adjacent communities: "we linked the moment you
   say the name on its pronunciation page." Creators reshare.
4. **V2EX / Juejin / Reddit r/programming** — 中文页 + quiz are ready-made
   hooks; copy in `LAUNCH-READY.md`.

## Measurement plan

Snapshot stars/views/clones/referrers every Monday. Creator clips are
promising if Google + YouTube referrers rise after indexing; the installer
one-liner if unique clones per view improve; badges if external referrers
broaden. Target ≥10 stars/week; if two consecutive weeks fall short, ship
the next experiment class (shareable quiz score card / IDE-extension
co-marketing) before adding another awesome-list submission.

## Daily log

- 2026-11-08 · v2.31.0 · +7 entries (T3Code, claude-mem, stroq, physicl, SpAItial, MaxxBench, benchmaxxing) · 1 rejected (openmausbot — no pronunciation evidence) · 47★
- 2026-11-08 · v2.32.0 · growth trio shipped (Dev Jargon 5 /say short-links + hosted MCP), 8 review findings fixed pre-release · 47★
- 2026-11-09 · v2.33.0 · +5 entries (mitmproxy, Kiri, Toit, Le Chonk, PRQL — 3 creator-ruled) · 4 held in candidate pool (Goethe, e/acc, p(doom), pwn) · 47★
- 2026-11-09 · v2.34.0 · funnel fix: CLI ★ nudge (TTY + once/day, SAY_IT_NO_STAR opt-out), Dev Jargon 5 streaks (🔥 badge + share line), profile README repo, Discussions enabled · 6 adversarial review findings fixed pre-release · aocr.org referrer = spam, not a channel · 47★
- 2026-11-10 · v2.35.0 · +2 entries (GPUI, DMARC — both acronyms off this week's HN front page) · 0 rejected this run; held without evidence: Flide/qev (OmniJev, no stated reading), poki, vork, Firenook, Scrapling · release.sh changelog-pin sync repaired (was silently no-opping) · 48★
- 2026-11-11 · no release · 0 added — every candidate failed the evidence bar; rejected: sshell/sshole (HN #1, crude pun, no stated reading), KetchUp (SketchUp pun, reading obvious), Strands / libghostty / DeepInfer / OpenStick (spelling matches the reading), GrapheneOS + Gestalt (trending this week but the words themselves are old chemistry/German, not new vocabulary), vork / poki / pinky / NX2navi / Satmux (READMEs state no reading) · discovery was GitHub-API + HN only — web fetch / Wiktionary / M-W were network-blocked this run, so no dictionary-verifiable IPA could be sourced · 49★
- 2026-11-12 · v2.36.0 · +2 entries (GrapheneOS, Gestalt — both Wikipedia-cited; GrapheneOS trended twice on HN, GestaltX was the week's top new GitHub repo) · rejected: sshell/sshole (crude pun, no stated reading), Strands / AlphaProof / KetchUp / BUI (spelling matches reading or no evidence), Klad / Firenook / Flide / coldframe (READMEs state no reading), Kagi / Stroq (already in the dictionary) · verification channel came back this run (Wikipedia API reachable; Wiktionary and M-W still blocked), which is what let the two sourced entries land · chrome extension dictionary + HF export resynced, both count pins bumped · 49★
- 2026-11-12 · v2.37.0 · demand audit: measured the dictionary against the 200 most-asked Stack Overflow tags — 39% coverage, and python / java / android / git / jquery / ios / .net / xcode / apache all 404'd on the live site · +36 entries (1,972 total), coverage 59% overall / 68% in-scope · new `tools/coverage.mjs` ranks holes by real question volume and gates the release on a ratchet floor; `data/top-dev-terms.tsv` is the dated snapshot · daily runbook now takes demand gaps before trending words · 49★
- 2026-11-12 · v2.37.1 / v2.37.2 · two site releases, both from testing the artifact instead of the source · (1) sounds-like search: vowel-free sound skeletons of the word and its respelling, so "engine x" → nginx, "kube control" → kubectl, "jason" → JSON, "a patch ee" → Apache; spelling results always win, phonetic pass only runs when nothing matched · (2) the shared `docs/script.js` had shipped a top-level SyntaxError since 2026-11-07 (escJS written in JS-escaped form inside an unquoted heredoc) — /browse, /v1 and /zh had no search, filter, player, or daily card in the browser for five days; the build now runs `node --check` on the emitted file · (3) two more heredoc escapes: `$1` in the collapse rule expanded to empty (doubled letters were deleted, not merged) and a schwa's `h` survived only on one side ("uh patch ee" hit, "a patch ee" missed) · all pinned by `tools/test-site-search.mjs`, which extracts the shipped functions out of `tools/build-site.sh` · verified against the deployed file, not the local one · 49★
- 2026-11-12 · v2.37.3 · the sounds-like search stopped at the door of the page most visitors land on: `/` is the React app and does not load `script.js`, so ⌘K matched spelling only · palette now runs the same two-pass search, and its hint says so ("or how it sounds") · the skeleton function now exists twice, so a parity test compares the React copy against the shared-script copy · distribution audit this run: official MCP registry already serves 0.2.0 with pypi+oci (the two failed workflow runs were stale — a `remote` entry the publisher rejects, then a duplicate version), Glama and mcp.so list the server, **Smithery returns 404** (needs an account login to claim), **npm has no `pronounce-mcp` package** — name free, `npm whoami` unauthenticated, repo has 0 secrets, so `npx -y pronounce-mcp` cannot ship until NPM_TOKEN exists · packed the npm twin by hand instead: `npm pack` → install → initialize + tools/list + tools/call returned kubectl, and `tools/test_npm_twin.py` now pins it against server.json · 49★
- 2026-11-12 · v2.37.4 · CI had been red on nearly every commit for three unrelated reasons · (1) HOL plugin scanner flagged `tools/test-site-search.mjs` as HIGH — the test ran the extracted page code through the `Function` constructor; it now writes the source to a temp module and imports it (score 80 → 93) · (2) `npm.yml` used floating `@v4` action tags; pinned to SHAs · (3) the changelog test hardcoded the current version, so every commit that opened a release section failed until the release script rewrote the line — it now checks the heading agrees with `.codex-plugin/plugin.json` · then completed the codex manifest (author object, longDescription/developerName/category/capabilities, HTTPS website+privacy+terms, logo, screenshots) and added PRIVACY.md → scanner 100/100, **0 open code-scanning alerts** · MCP registry workflow now skips a version already published instead of failing on "duplicate version" · 49★
