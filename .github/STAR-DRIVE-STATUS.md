# Star growth status

> Maintainer runbook and experiment ledger. Last updated 2026-09-01.

## Current baseline

| Metric | Value | Window |
|---|---:|---|
| GitHub stars | **39** | lifetime |
| Forks | 0 | lifetime |
| Watchers | 1 | lifetime |
| Repository views | 66 / 24 unique | trailing 14 days |
| Repository clones | 144 / 59 unique | trailing 14 days |

Top visible referrers in the same traffic snapshot were `pronounce.renlab.ai`
(16 views / 7 unique), GitHub (6 / 5), Google (6 / 4), and Doubao (1 / 1).
The largest historical star jump was 13 stars on 2026-06-10, the same day the
project shipped its Homebrew, Codex, Kiro, MCP-registry, and awesome-mac
distribution release. That is correlation rather than attribution, but it makes
distribution and reusable project surfaces the strongest current experiment.

## Closed-loop work shipped in v2.27.0

- Added `/collection/affective-ai` and `/collection/world-models` as focused,
  indexable entry points for the newest high-interest vocabulary.
- Added a copyable Markdown pronunciation badge to every English word page.
  The badge links back to the canonical audio-and-source page, so adoption in
  third-party READMEs creates durable referral paths.
- Replaced retired VS Code/Open VSX dynamic badge endpoints with stable install
  badges and direct marketplace links.
- Refreshed the MCP PyPI and official-registry package to v0.1.2 and removed the
  misleading unpublished npm install path from the primary instructions.
- Updated GitHub discovery metadata from a stale 1,650+ description to an
  evergreen 1,900+ description and added high-intent `ai-agents` / `devops`
  topics in place of generic topics.

## Distribution status

- `jaywcjlove/awesome-mac#2067` — merged.
- `punkpeye/awesome-mcp-servers#9960` — merged.
- `hesreallyhim/awesome-codex-plugins#223` — merged.
- `alebcay/awesome-shell#710` — open and mergeable; do not bump again unless a
  maintainer requests changes.
- PyPI, GHCR, and the official MCP Registry are maintained by release workflows.
- VS Code Marketplace and Open VSX listings are live. npm remains intentionally
  unpublished until package-publishing credentials exist.

## Measurement plan

Take another GitHub traffic snapshot on 2026-09-08 and 2026-09-15. Compare stars,
unique views, unique clones, site referrals, and search referrals with the baseline
above. A badge experiment is promising if external referrers broaden while the
visitor-to-star ratio holds or improves; a collection experiment is promising if
Google and site-originated repository visits rise after indexing.

## Maintainer-only amplification

Show HN, Reddit, V2EX, Juejin, and personal social posts require a real account
and an author who can answer replies. Ready-to-edit copy remains in
[`LAUNCH-READY.md`](../LAUNCH-READY.md). Avoid automated posting, bought stars,
unrelated issue comments, or additional low-fit awesome-list submissions.
