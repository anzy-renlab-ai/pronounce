# Star drive — what's been done, what's left

> Living runbook for the maintainer. Update as work progresses.
> Current count: **3 stars** (target: 100+).

## ✅ Done (everything achievable from inside an agent session)

### Content & quality
- Dictionary **310 → 544 entries** in three waves (AI agents, ML/inference, frameworks, data formats, CS concepts, crypto, web protocols, distros, editors).
- 544 pre-rendered MP3s · 544 OG PNGs · 544 SVG badges · 544 per-word HTML pages.
- 61 `/daily/[YYYY-MM-DD].html` long-tail SEO pages with Article JSON-LD.
- 23 CLI subcommands (REPL, stream, doctor, export, benchmark, quiz, playlist, etc.).
- WCAG 2.1 AA pass (skip-link, focus rings, ARIA, `prefers-reduced-motion`).

### SEO infrastructure
- `llms.txt` + `llms-full.txt` (llmstxt.org standard) for AI crawler discovery.
- `robots.txt` explicitly allows **GPTBot**, **ChatGPT-User**, **OAI-SearchBot**, **anthropic-ai**, **ClaudeBot**, **Claude-Web**, **PerplexityBot**, **Google-Extended**, **CCBot**, **Bytespider**, **Amazonbot**, **Applebot-Extended**.
- `sitemap.xml` (610 URLs) + `sitemap-images.xml` (1100 image URLs) + `sitemap-index.xml`.
- `hreflang en` + `x-default` on homepage, /browse, /quiz, /stats, /about, /daily, and every /word/X page.
- Per-word JSON-LD: WebPage + **AudioObject** (qualifies for audio rich result) + **LearningResource** (educationalLevel/learningResourceType=pronunciation) + **BreadcrumbList** + Speakable (Google Assistant / Alexa voice search).
- `<link rel="preload" as="audio">` on each word page for instant playback.
- IndexNow live submission: 611 URLs → Bing **HTTP 200** + Yandex **HTTP 202**.
- `tools/indexnow-submit.sh` + `.github/workflows/indexnow.yml` cron (06:00 UTC daily).

### Site UX
- 🎯 Interactive quiz at `/quiz.html` (10/20/50 q, difficulty filters, confetti on perfect).
- 🔍 Instant landing search with autocomplete typeahead (exact > prefix > substring).
- 🎤 Voice mic search via Web Speech API.
- Copy-IPA button on per-word pages.
- Prev/next alphabetical nav on per-word pages.
- Hero word typewriter cycle (kubectl → nginx → GIF → JSON → …).

### Editor / launcher integrations
- Raycast script command (`integrations/raycast/`).
- Alfred workflow scaffold (`integrations/alfred/`).
- VS Code task + keybind recipe (`integrations/vscode/`).
- Codex, Cursor, Continue (`integrations/`).
- MCP server (`mcp-server/`) so Claude / Cursor can answer pronunciation questions.
- Claude Code skill (`skills/pronounce-word/`) — auto-triggers on `X 怎么读` / `how to pronounce X`.

### GitHub repo metadata
- Description: *"🔊 Pronounce developer jargon out loud. 540+ entries (kubectl, GIF, JSON, JWT, …), sourced with confidence levels. Bash CLI + interactive quiz + voice search + MCP server + Claude Code skill."*
- Homepage: `https://pronounce.renlab.ai`
- 20 topics applied (bash, claude-code, cli, community-driven, developer-experience, developer-tools, devops, dictionary, kubectl, kubernetes, macos, mcp, mcp-server, open-source, pronunciation, pwa, raycast, speech-synthesis, sre, tts).
- Discussions enabled, **2 seeded**:
  - #33 — v2.2 release announcement (Announcements).
  - #34 — *"Which words do you want next?"* (Ideas).
- 9 fulfilled-by-shipped-code issues closed (signals momentum on the repo timeline).

### Distribution PRs to awesome lists (5 open, ~232K★ combined audience)
- jaywcjlove/awesome-mac **#2067** (79K★)
- alebcay/awesome-shell **#710** (37K★)
- agarrharr/awesome-cli-apps **#1069** (19K★)
- awesome-lists/awesome-bash **#171** (9.8K★)
- punkpeye/awesome-mcp-servers (88K★ — opened in prior session)

### Maintainer launch pack
- `LAUNCH-READY.md` — copy-paste ready posts for Hacker News (Show HN), Reddit r/programming + r/devops + r/sysadmin + r/commandline, X/Twitter 5-tweet thread, Dev.to, V2EX (中文), Juejin (中文), LinkedIn, Mastodon, Discord/Slack drops.
- `.github/REPO_TOPICS.md` — settings checklist.
- README hero rewrite with star-history badge for social proof.

---

## ⏳ Left — the actual star-driving levers (maintainer-only)

| Lever | Realistic outcome | Time to act | Where the copy is |
|-------|-------------------|-------------|-------------------|
| **Show HN submission** | 50-500 stars on frontpage hit | Tue/Wed/Thu 7-9 AM PT | [`LAUNCH-READY.md §1`](../LAUNCH-READY.md) |
| **Reddit r/programming + r/devops** | 10-100 stars | Same day as HN | [`LAUNCH-READY.md §2`](../LAUNCH-READY.md) |
| **X/Twitter 5-tweet thread** | 5-50 stars | Same day | [`LAUNCH-READY.md §3`](../LAUNCH-READY.md) |
| **V2EX (创意 / 分享发现)** | 5-30 stars (zh audience) | Evening CN time | [`LAUNCH-READY.md §5`](../LAUNCH-READY.md) |
| **Juejin** | 5-20 stars (zh audience) | 7-9 PM CST | [`LAUNCH-READY.md §6`](../LAUNCH-READY.md) |
| **Wait for awesome-list PRs to merge** | 5-20 stars / week / merged list | Weeks-to-months | Just patience |
| **Pin repo on GitHub profile** | Marginal visibility lift | 30 seconds | Your profile page |
| **Enable GitHub Sponsors** | Star-adjacent — sponsor button on repo page | One-time setup | github.com/sponsors |

**Sequence I'd recommend** (90 min total active maintainer time):
1. Show HN (highest ceiling, ~80% of session traffic).
2. Tweet thread the same morning, referencing the HN link if it gets traction.
3. Reddit posts that afternoon.
4. V2EX / Juejin that evening (CN audience).
5. Reply to comments/questions for 24-48h after — engagement converts visitors → stars.

## ❌ Won't do

- Buy stars or use bot accounts (TOS violation, harms reputation if ever caught, hurts long-term credibility).
- Spam more awesome-list PRs (5 is already at the threshold — more dilutes signal).
- Drop "helpful" links on unrelated issues in other repos (looks like astroturfing).
- Inflate dictionary with low-quality entries (already 544 high-quality; further additions should be selective).
