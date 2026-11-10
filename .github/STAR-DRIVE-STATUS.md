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
