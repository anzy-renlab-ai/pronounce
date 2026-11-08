# Growth trio — design spec

Date: 2026-11-08 · Status: approved (user picked 三件全建; designs presented 2026-11-08, "行, 你自己别等我")
Goal: three independent star-growth paths for pronounce.renlab.ai.

This spec records the design as **updated after code recon**. Recon found existing
infrastructure that makes every feature cheaper than the originally presented
sketch; deviations are marked **[changed]** with the reason.

---

## Feature 3 — Correction short-links `/say/<word>` (ship first)

Purpose: the moment someone mispronounces a word in chat/PR review, one short
link corrects them. Shorter, purpose-named URL is the share artifact.

**[changed]** Original sketch: rewrite `/say/:slug` → param-driven JS page.
Recon: `/word/<slug>` pages already exist (1,927, each with its own OG card,
audio, citations). A purpose-built second page per word adds 1,927 files and
duplicates data plumbing for zero new unfurl quality — social unfurlers follow
rewrites and use the final page's per-word OG card. So:

- `vercel.json`: add rewrite `{ "source": "/say/:slug", "destination": "/word/:slug" }`.
  Public short URL `pronounce.renlab.ai/say/nginx` serves the full word page.
- Word pages (build-site.sh word-page template, beside the README-badge
  section): **「🔗 Correct someone」** button → copies
  `https://pronounce.renlab.ai/say/<slug>` + toast. Same button added to the
  ZH word page template (build-seo.py `emit_zh_word`) — 「复制纠音链接」.
- Chrome extension context-menu item: **deferred** (extension release cycle +
  store review is its own track; tracked in LAUNCH-READY.md as follow-up).

Non-goals: no new pages, no data changes.

## Feature 1 — Daily Jargon 5 (`/daily`)

Purpose: daily recurring-visit + share loop. Same 5 words for everyone each
day; Wordle-style emoji grid share text ends in `pronounce.renlab.ai/daily`.

**[changed]** Original sketch: build-time `build-daily.py` bakes
`docs/daily/<date>.json` + per-day OG card. Recon: (a) `script.js` already
ships the full dictionary client-side as `ENTRIES` (quiz.js uses it);
(b) `/daily/<date>.html` already exists as a 233-page word-of-the-day SEO
archive — must not be clobbered. So the game is client-side deterministic:

- `docs/daily/index.html` becomes the game (was: archive index). Archive index
  moves to `docs/daily/archive.html`; every dated page keeps its
  "← Browse the daily archive" link pointed at `/daily/archive`.
- Selection: 5 entries per date, deterministic = rank all entries by
  `sha256(slug + "|" + date)` and take the 5 smallest hashes (dedup by slug).
  Same for every visitor on the same deploy. A mid-day dictionary deploy can
  swap at most a marginal pick (documented, acceptable — this is a game, not a
  lottery). Filter: entries with non-empty `r`; prefer visible categories
  (no internal/meta entries).
- Question UI (reuses quiz.html styles + `playEntry`): play audio → pick the
  correct respelling among 3 (2 distractor respellings from other entries,
  deterministic seeded, must differ from the answer and each other).
- Result screen: emoji grid `🔊🟩⬛🟩🟩🟩 4/5`, 「Copy score」button →
  ```
  Dev Jargon 5 · 2026-11-08
  🔊🟩⬛🟩🟩🟩 4/5
  how many dev words can you say?
  https://pronounce.renlab.ai/daily
  ```
  plus ⭐ Star CTA (repo link). Wrong answers reveal the right respelling +
  link to the word page.
- Selection code lives in `docs/daily/game.js` as a pure function with a
  CommonJS export guard (`if (typeof module !== 'undefined')`), so
  `tools/test-daily.mjs` can import and pin determinism.
- OG: one static dedicated card `docs/og-daily.png` (PIL, new
  `tools/make-og-daily.py`, brand-styled "Dev Jargon 5"). Per-day cards add
  build cost for near-zero unfurl gain — the share text carries the score.
- Entry points: homepage CTA (v2 sections + `tools/build-v2-bundle.sh`
  rebuild), README, and the dated archive pages get a "Play today's 5 →" link.
- ZH version: deferred until traction (EN first; zh homepage links EN game).

## Feature 2 — Remote MCP endpoint + one-click installs

Purpose: new acquisition channel — MCP registries/directories list remote
servers; every listing is a durable referral.

- `api/mcp.js` (repo root — Vercel functions dir; `docs/api/*` static JSON
  stays untouched, no route collision): Node streamable-HTTP MCP server,
  single-JSON-response mode (spec-compliant: server may answer POST with
  `application/json` instead of SSE).
  - JSON-RPC 2.0 methods: `initialize` (echo client protocolVersion if in
    supported set, else `2025-06-18`), `notifications/*` → 202 empty,
    `ping` → `{}`, `tools/list`, `tools/call`. `GET` → 405, `DELETE` → 200.
    CORS headers on all responses.
  - Tools mirror `mcp-server/server.py` exactly: `pronounce(word)`,
    `search_pronunciations(query, limit=20)`,
    `list_pronunciations(category?, limit=100)` — same names, args, and
    response shapes (tool result = single text block containing the JSON).
  - Logic in pure `api/mcp-lib.js` (parse TSV text → entries; handle
    request objects) so `tools/test-mcp.mjs` tests it without Vercel.
    `api/mcp.js` is a thin request wrapper.
  - Data: `data/pronunciations.tsv` bundled via vercel.json function config
    `includeFiles`; parse once per cold start.
- `vercel.json`: rewrite `/mcp` → `/api/mcp` (public URL
  `https://pronounce.renlab.ai/mcp`).
- `mcp-server/server.json`: add a `remote` package entry
  (`transport: { type: "http", url: ... }`) alongside pypi/oci; bump server
  version to 0.2.0 (release workflows publish pypi/oci from this file).
- One-click installs (homepage section + README):
  - Claude Code one-liner (copyable):
    `claude mcp add --transport http pronounce https://pronounce.renlab.ai/mcp`
  - Cursor deeplink button — **verify exact format against current Cursor
    docs during implementation** before baking it in.
  - Generic JSON config copy for everything else.
- Registries/directories:
  - Official MCP Registry: PR adding our server entry (server.json format)
    to `modelcontextprotocol/registry`.
  - `glama.json`: add remote server URL.
  - awesome-mcp-servers: our entry is already merged (#9960); open a small
    update PR noting the hosted endpoint.
  - Smithery: write `smithery.yaml` for future use; submission needs an
    account → LAUNCH-READY.md user-action list.

## Testing

- `tools/test-mcp.mjs` (node --test): TSV parse → entry count > 1,900;
  `initialize` shape; `tools/list` names; `tools/call pronounce nginx` →
  "engine X"; unknown method → JSON-RPC error; notification → empty 202-style.
- `tools/test-daily.mjs` (node --test): selection deterministic across calls;
  exactly 5 unique slugs; every question's answer present, distractors differ;
  same date+same list → same output.
- `tools/test_deploy_config.py` (unittest): vercel.json parses; `/say/:slug`
  → `/word/:slug` rewrite present; `/mcp` → `/api/mcp` rewrite present;
  function `includeFiles` covers the TSV; api/mcp-lib.js exists.
- All three added to `tools/release.sh` guards and CI test invocations.
- Existing guards must stay green: no dictionary-count pins change (no data
  rows added by this trio).

## Release & distribution

- v2.32.0 (features → minor): changelog entry, `.codex-plugin/plugin.json`
  bump, `tools/release.sh`.
- After push (Vercel deploys main automatically): live-verify `/say/nginx`,
  `/daily`, `POST /mcp` initialize + tools/call with curl.
- STAR-DRIVE-STATUS.md: trio section + daily-log line.
- LAUNCH-READY.md: Daily-5 share copy, remote-MCP announcement copy, user
  action list (Smithery account, agarrharr personal PR, Show HN with the
  trio story).

## Explicit non-goals

- No CLI flag changes → no skill/SKILL.md drift.
- No dictionary data changes → no count-pin dance.
- No Chrome extension release in this trio (follow-up).
- No ZH game page, no per-day OG cards, no auth/rate-limiting on /mcp
  (public read-only data; revisit if abuse appears).
