# Changelog

## v2.16.0 — 2026-06-24

The **完善 pass** — nine correctness + polish fixes across the CLI, site, and extension, reviewed three ways (Claude + Codex + Kiro). **The CLI and VS Code extension graduate to `1.0.0`** — the public flag surface is stable; the repo release line continues at v2.x.

### Fixed
- **C++ / C# audio 404 (slug collision).** `tools/make-audio-all.py` and `make-og-all.py` collapsed runs of punctuation (`C++` → `c-`), colliding with `C#` and mismatching the canonical `/word/c--` page — so the C++ page pointed at an mp3 that didn't exist. Unified every slug producer on per-char replacement; regenerated the affected audio/OG.
- **Chinese pages leaked English into search snippets.** The zh `<meta>` / `og` / `twitter` descriptions appended the English `notes` field (cut off mid-sentence) — exactly what Google/WeChat surface. Now clean Chinese-only. Also dropped a stray empty `<p></p>`.
- **Entry count disagreed across surfaces** (1738 / 1702 / 993 in README, the badge, and word-page CTAs). Single-sourced to the live count (**1,739**); README stragglers fixed.
- **`/stats` confidence bars were dead `#` links** and the page had no contributors block despite the "community-maintained" pitch. Bars are now plain-labelled; a contributors list (from `git shortlog`, bots excluded) was added.

### Changed
- **zh per-word pages reach audio parity with English** — the primary reading plays 3× (was a single play), alternate readings are now playable (Web Speech), and IPA has a copy button.
- **Honest sourcing.** README no longer claims "all sourced" — it's **1,128 of 1,739** entries with a citable source; the rest are confidence-tagged with *no fabricated URLs*. `lint-dict.sh` now prints source coverage.
- **`say-it update` is now a fast dictionary refresh** — curls the latest TSV (no git, no reinstall); `--full` does the old clone + reinstall. README "What's coming" no longer lists already-shipped Windows/Linux backends.
- **Embed widget** honors `?theme=light|auto` and shows IPA; every word page now offers a copy-paste `<iframe>` snippet (the ~1,739 embed widgets were previously undiscoverable).
- **CLI:** `quiz` accepts alternate respellings as correct; `--help` documents the `show` and `serve` subcommands.
- CLI `VERSION` → **1.0.0**; VS Code extension → **1.0.0**; the extension's `pronounce.rate` fallback default corrected 200 → 130 (lockstep with `package.json`).
- **CI:** the `build-site` workflow gets a `concurrency` guard + rebase-retry push to end the auto-build race.

## v2.15.0 — 2026-06-19

### Added
- **Dictionary +17 — AI labs, infra/format names, and classic math surnames devs trip on.** Generated + adversarially verified by a Workflow (4 finders → dedup → per-candidate skeptic; 23 kept of 24, then 6 dropped here as already-present — Muon/Traefik/Qdrant/Dapr/skopeo/Cilium). Each web-sourced for its General American reading:
  - **AI labs / models:** **Kyutai** (KYOO-tye — Paris lab, romanized Japanese 球体 "sphere"), **Moshi** (MOH-shee — not "MOSH-ee"), **Hymba** (HIM-buh — NVIDIA, hybrid+Mamba), **Pangu** (pahn-GOO — Huawei 盘古, not "PANG-goo").
  - **Infra / formats / protocols:** **CRI-O** (CRY-oh), **Raku** (RAH-koo — the language formerly Perl 6), **Nostr** (NOH-ster), **QOI** (koy), **CBOR** (SEE-bore), **Brotli** (BROHT-lee), **Cap'n Proto** (KAP-uhn PROH-toh).
  - **Classic math / stats surnames:** **Dirichlet** (deer-ick-LAY, silent t), **Galois** (gal-WAH), **Levenshtein** (LEV-en-shtine), **kurtosis** (ker-TOH-sis), **Weibull** (WHY-bull), **Tikhonov** (TEE-khuh-nawf — Tikhonov regularization / ridge).

  Contested readings carry alternate IPA + respelling. Entry count auto-synced 1,721 → 1,738 across README, the site, the extension, `mcp-server/server.json`, and `.codex-plugin/plugin.json`; per-word audio + pages rendered for all 17. Confidence splits now 1,513 community-consensus · 158 contested · 67 creator-clarified.

### Changed
- **Distribution:** added the HOL Plugin Scanner to CI (`hol-plugin-scanner.yml`, passing — no high/critical) and submitted the Codex plugin to [`awesome-codex-plugins`](https://github.com/hashgraph-online/awesome-codex-plugins/pull/223) (the #1 Codex marketplace), per community request in #41.
- CLI `VERSION` → 0.6.6; VS Code extension → 0.6.6.

## v2.14.0 — 2026-06-18

### Added
- **Dictionary +19 — config-language, cloud-native, model, and classic-math names devs stumble on.** Each web-verified for its General American reading with a real source:
  - **Config / data languages** (the "is it a word or do I spell it out?" trap): **Pkl** (PICK-uhl — Apple says "pronounced Pickle"), **CUE** (kyoo, = the letter Q, not C-U-E), **KDL** (CUH-duhl), **Jsonnet** (JAY-son-it), **Dhall** (dawl).
  - **Cloud-native / Kubernetes ecosystem:** **Kuma** (KOO-mah — Japanese "bear", not KYOO-mah), **Karmada** (kar-MAH-duh — "Kubernetes Armada"), **Kustomize** (KUSS-tuh-myze), **Beyla** (BAY-luh — Grafana's eBPF auto-instrumentation).
  - **AI/ML model & method names:** **QwQ** (kwyoo — the Qwen team's stated /kwjuː/, not the kaomoji), **Tulu** (TOO-loo — AllenAI, a Turkish camel breed), **GaLore** (guh-LOR vs GAL-or, contested), **CoCa** (KOH-kuh — "Contrastive Captioner", homograph of coca).
  - **Classic math / CS names developers routinely mangle:** **Cholesky** (shuh-LESS-kee), **Poisson** (PWAH-sawn), **Cauchy** (koh-SHEE), **Bezier** (BEZ-ee-ay, silent r), **Voronoi** (VOR-uh-noy vs vor-uh-NOY, contested), **Erdos** (AIR-dursh — Hungarian Erdős).

  Contested readings carry alternate IPA + respelling; lookup keys are ASCII-typeable (`Tulu`, `Bezier`, `Erdos` — the diacritic spelling is preserved in the notes). Generated and adversarially verified (real? sourced? genuinely non-obvious? IPA defensible?) before inclusion. Entry count auto-synced 1,702 → 1,721 across README, the site, the extension, `mcp-server/server.json`, and `.codex-plugin/plugin.json`; per-word audio + pages rendered for all 19. Confidence splits now 1,508 community-consensus · 147 contested · 66 creator-clarified.

### Fixed
- **`build-dict` count-sync corrupted comma-grouped numbers.** The lockstep entry-count regex matched only the digits *after* a comma (`\b\d{3,4}`), so it rewrote the README scoreboard's "**1,702 entries**" to "**1,1702 entries**". The number pattern now matches the whole comma-grouped form and preserves each doc's own digit style (commas in the README headline, bare digits elsewhere).
- **Stale entry count in `docs/index.html` meta.** The page's `<meta name="description">` / OpenGraph / Twitter-card counts were never synced at v2.13.0 and still read **1665**; the live site now reports the correct count.
- CLI `VERSION` → 0.6.5; VS Code extension → 0.6.5.

## v2.13.0 — 2026-06-15

### Added
- **Dictionary +37 — frontier model names + world-model / diffusion paper jargon.** The high-mispronunciation terms developers hit in world-model, diffusion, SDE, optimal-transport, and stability papers, each web-verified for its General American reading with a real source:
  - Model names: **Fable** (Anthropic), **Lumiere** (Google), **Kosmos** (Microsoft).
  - SDE / diffusion surnames: **Langevin** (lahnzh-VAN), **Ito**, **Wiener** (VEE-ner), **Fokker-Planck**, **Schrodinger**, **Ornstein-Uhlenbeck**, **Radon**.
  - Stability / operators / symmetry: **Lyapunov**, **Noether** (NUR-ter), **Koopman**, **Hamiltonian**, **Helmholtz**, **Planck**.
  - Divergence / transport: **Gumbel**, **Frobenius**, **Kullback-Leibler** (the "KL"), **Bregman**, **Sinkhorn**, **Tsallis**, **Renyi**.
  - Geometry / measure spaces: **Riemannian**, **Mahalanobis**, **Lipschitz**, **Hilbert**, **Lebesgue**, **Minkowski**.
  - Matrix / linear-algebra names: **Chebyshev**, **Hadamard**, **Kronecker**, **Toeplitz**.
  - Contested ML terms: **logit**, **aleatoric**, **epistemic**, **SiLU**.

  Contested readings carry alternate IPA + respelling; lookup keys are ASCII-typeable (`Ito`, `Schrodinger`, `Renyi`, hyphenated pairs like `Kullback-Leibler`). Entry count auto-synced 1,665 → 1,702 across README, `mcp-server/server.json`, and `.codex-plugin/plugin.json`.

### Changed
- **CLI perf — single-pass dictionary reads.** `stats` collects total + per-category + per-confidence + source coverage in one awk pass (was four full scans); `minute` / `quiz` load the dictionary once into parallel arrays instead of re-scanning + `sort -R` over ~1,700 rows every round; `badge` / `explain` parse fields in a single awk pass (`\x1f`-joined so empty trailing columns survive `read`). Behavior-identical for the shipped dictionary; independent Codex review passed. Also fixes a latent `stats` crash on a zero-source dictionary (printed `/N (0%)` and threw a bash arithmetic error — now `0/N`).
- CLI `VERSION` → 0.6.4; VS Code extension → 0.6.4.

## v2.12.0 — 2026-06-11

### Added
- **Dictionary +11 — CLI / agent-command vocabulary**, prompted by a user asking how to say "simplify" (the Claude Code command): **simplify** (SIM-pluh-fye), **compact** (verb kum-PAKT — the `/compact` reading — vs adjective KAHM-pakt), **resume** (rih-ZOOM, not résumé), **init** (ih-NIT vs IN-it, contested), **exec** (ig-ZEK), **sandbox**, **headless**, **deprecate** (DEP-ruh-kayt — not "depreciate"), **review**, **commit**, **rebase**. These are the words non-native devs see daily in Claude Code / Codex / git menus.
- Per-word audio + OG cards rendered for all 11; entry count auto-synced to 1,665 across every doc surface (now including `.codex-plugin/plugin.json` and `mcp-server/server.json`).
- **Build guard:** `build-site.sh` now fails the build if any absolute `.html` URL leaks into built output (the clean-URL invariant from v2.11.0 — a regression appeared within a day, so it's enforced now).
- CLI `VERSION` → 0.6.3; VS Code extension → 0.6.3.

### Fixed
- Remaining `.html` links in README/SUPPORT and the new marketplace badge now use clean URLs.
- `mcp-registry.yml` derives the GHCR image tag from `mcp-server/server.json` (single source of truth) and fails loud on mismatch, instead of hard-coding `0.1.0` twice.
- npm wrapper reads its version from `package.json` instead of duplicating it; UA string derives from it.
- `build-dict.mjs`: one prose regex (with `+`-style preservation) instead of two divergent ones.

## v2.11.1 — 2026-06-10

### Fixed
- CLI `VERSION` → 0.6.2, back in lockstep with the VS Code extension (both 0.6.2).
- `mcp-server/server.json` description trimmed to the official registry's 100-char limit (first publish attempt 422'd on it; the server is now live in the registry as `io.github.anzy-renlab-ai/pronounce`).
- Homebrew formula bumped to the v2.11.1 tarball so `brew install anzy-renlab-ai/tap/say-it` ships the new CLI (`--help` repo footer, Agent-Skills install).

## v2.11.0 — 2026-06-10

A distribution + discoverability release: new install channels, two new AI-agent integrations, and a site-wide SEO overhaul.

### Added
- **Homebrew tap** — `brew install anzy-renlab-ai/tap/say-it` (formula in [`anzy-renlab-ai/homebrew-tap`](https://github.com/anzy-renlab-ai/homebrew-tap); installs CLI + dictionary + bash/zsh completions). Kills the git-clone install step.
- **Codex CLI integration** ([`integrations/codex/`](integrations/codex/)) — the repo now doubles as a Codex plugin (`.codex-plugin/plugin.json` + `.mcp.json`): `codex plugin marketplace add anzy-renlab-ai/pronounce` installs the skill and the MCP server together. The `pronounce-word` SKILL.md is Agent Skills-standard and drops into `~/.agents/skills/` as-is.
- **Kiro integration** ([`integrations/kiro/`](integrations/kiro/)) — one-click "Add to Kiro" button, `mcp.json` snippet, drop-in skill for `~/.kiro/skills/`, and a self-contained custom agent (`agent.json`).
- `install.sh` now also installs the skill into `~/.agents/skills/` (Codex) and `~/.kiro/skills/` (Kiro) when those dirs exist.
- **Official MCP registry pipeline** — `mcp-server/server.json` + a workflow that builds the Docker image to GHCR and publishes to registry.modelcontextprotocol.io via GitHub OIDC (`.github/workflows/mcp-registry.yml`). Plus `glama.json` (maintainer claim) and a `source_repo` field + server instructions in MCP tool responses.
- **VS Code extension 0.6.2** — marketplace listing now renders GitHub-stars + dictionary badges (`badges` in package.json); README fixes: `pronounce.rate` default corrected to 130, real `cursor --install-extension` line, removed the incorrect Zed-VSIX claim (Zed users → MCP server).
- CLI `--help` and the `install.sh` epilogue now link the repo (one tasteful star ask).

### Fixed
- **SEO: clean URLs everywhere.** Vercel `cleanUrls` 308-redirects every `*.html` URL, yet canonicals, og:url, hreflang, JSON-LD, feeds, and all ~1,677 sitemap-seo entries pointed at `.html` variants. Both generators (`tools/build-site.sh`, `tools/build-seo.py`) and all static pages now emit extensionless URLs only.
- **Reciprocal hreflang** — EN word pages now declare `zh-Hans` alternates back to `/zh/word/<slug>` (Google ignores non-reciprocal hreflang; the 1,654 zh pages were unclustered).
- `browse.html` was missing og:title/description/url/type — full social card restored.
- Homepage SPA now has a `<noscript>` fallback (links + blurb) for non-JS crawlers.
- Entry-count drift: README hero said "1200+", `docs/index.html` meta said "1640" — both now auto-synced by `build-dict.mjs` (1,654 today); GitHub repo description updated from "544+".

## v2.10.1 — 2026-06-07

### Added
- **Dictionary +4 — Rust toolchain**, prompted by a community question (Discussion #34, @pinage404 — a non-native speaker — asking how to say "crate"): **crate** (KRAYT, one syllable, rhymes with "great"), **rustc** (RUST-see — the "c" is the letter, for compiler), **clippy** (KLIP-ee, like the Office paperclip), **rustup** (RUST-up). `cargo` was already in the dictionary.
- CLI `VERSION` → 0.6.1; VS Code extension → 0.6.1.

## v2.10.0 — 2026-06-07

A speech-default change plus a small, current dictionary batch.

### Changed
- **Default speech rate 175 → 130 wpm**, across the CLI and the VS Code extension (the extension default was an even faster 200). Pronunciation is the whole use case, and the old default rushed unfamiliar words — slow-and-clear is the right default for *hearing* a name. `-r` (CLI) and the `pronounce.rate` setting (extension) still override; the documented "slower" example is now `-r 110`. The `(rate-175)/25` PowerShell→SAPI mapping is unchanged (it's a scale anchor, not the default).

### Added
- **Dictionary +10** — current AI/ML names whose pronunciation isn't obvious from the spelling: **Muon** (MYOO-on), **Janus** (JAY-nuhs), **Mochi** (MOH-chee), **ColPali** (kol-PAH-lee), **Nunchaku**, **SVDQuant** (S-V-D-quant), **ModernBERT**, **Genie** (JEE-nee), **Medusa** (muh-DOO-suh), **FLUX.1 Kontext** (KON-text).
- CLI `VERSION` → 0.6.0; VS Code extension → 0.6.0.

## v2.9.0 — 2026-06-02

Two deferred product improvements from the v0.5.0 review, plus two slug fixes an adversarial regression pass surfaced.

### Added
- **Light theme on the homepage.** The v2 landing page was dark-only while every other page already honored `prefers-color-scheme`. It now flips to a warm-paper light palette on a light OS (token-driven `@media`, WCAG-AA contrast-checked). Dark mode is unchanged. The terminal mock and karaoke focus overlay stay intentionally dark (their tokens are re-scoped so text doesn't go dark-on-dark).
- **Stats page leaderboard.** `/stats.html` now shows **Recently added** (the 12 newest entries, newest-first) and a **settled vs contested** headline (1512 / 128). Both computed at build time from the TSV — no analytics, no external calls.

### Fixed
- **CLI `--json` URL slug** used Python's Unicode-aware `isalnum()`, so accented entries got a 404 URL (`Fréchet` → `/word/fréchet` instead of the real `/word/fr-chet`). Now uses the same ASCII slug as the site/API/MCP.
- **`--md` / `tweet` URLs** only lowercased the word (no char replacement), producing wrong URLs for names with spaces/symbols (`C++`, `Weights & Biases`). Now slugified consistently.
- CLI `VERSION` → 0.5.1.

## v2.8.0 — 2026-05-31

A correctness + consistency release from a full 6-surface product review (CLI, VS Code extension, website, MCP server, skill, roadmap).

### Fixed
- **CLI works cross-platform on the main path.** `say-it <word>` now speaks on Linux/Windows when `espeak-ng`/PowerShell is present — a stale macOS-`say`-only gate had been blocking the primary command (and even text-only `--json`/`--md`/`--why`) despite the cross-platform backends added back in v0.3. The gate now keys on the detected backend and runs only when audio is actually needed.
- **`say-it --json` no longer crashes** on entries whose fields contain an apostrophe (e.g. source label "Oxford Learner's Dictionaries"). Fields are passed to Python via the environment instead of being interpolated into the program source.
- **MCP server: `pronounce("C++")` returned the C# entry.** The slug regex collapsed `++` into a single `-`; it now matches the site's 1:1 slug scheme exactly, so `C++` resolves correctly.
- **VS Code hover** vanished on sentence-final words (`kubectl.`, `YAML.`); it now trims trailing punctuation (still resolving `next.js` first).
- **Flag-argument validation.** `say-it -v` (flag with no value) and `say-it -n abc` (non-numeric) now error clearly instead of exiting silently / mis-speaking.
- Brittle `say-it import` header copy (`head -27`) replaced with a content-driven copy that survives header changes.

### Changed
- **Killed CLI↔skill drift** (the project's flagged #1 hazard): the skill no longer claims an "Apple Speech Synthesis phoneme" mechanism the CLI explicitly rejects, now states the correct **175 wpm** default, and describes the real auto-detected backends (macOS say / Linux espeak / Windows PowerShell). Documented `--json`/`--md`/`--copy`.
- CLI `-h` now lists previously-undiscoverable subcommands: `doctor`, `export`, `stream`, `playlist`, `minute`, `benchmark`, `cheatsheet`, `repl`.
- **Homepage install command** now shows the real `git clone … && ./install.sh` (it was advertising a non-existent `brew install sayit` while copying a different command).
- Fixed stale hardcoded entry counts: browse-page meta description, homepage meta (1212→live), MCP docstrings/README (918→1,600+). VS Code voice setting now notes it's macOS-only.
- Accessibility: the browse-page search input gained an `aria-label`.
- VS Code extension → **v0.5.0**; CLI `VERSION` → **0.5.0** (was stuck at 0.4.0).

## v2.7.0 — 2026-05-30

### Added
- **Dictionary 1452 → 1640 (+188) across three batches.** arXiv paper vocabulary (batch 9), ML training/alignment/agent basics (batch 10), and agentic-coding & AI-tooling terms (batch 11): FlashAttention, PagedAttention, GQA/MQA/MLA, GPTQ/AWQ/NF4, FSDP, ZeRO, NCCL ("nickel"), CodeAct, Reflexion, Toolformer, subagent, vibe-coding, ultracode, Codestral, Pixtral, Nemotron, EXAONE, mise ("meez"), oxlint, ratatui, chezmoi ("shay-mwa"), and more. Batch 11 was discovered + adversarially source-verified via a multi-agent workflow, then hand-reviewed.
- **VS Code / Cursor extension v0.4.9** ships the full 1640-entry dictionary.

### Changed
- **Site-wide analytics.** Tokenless Vercel Web Analytics beacon on every page so SEO traffic is finally measurable (every word page, category, collection, compare, daily, and root page).

## v2.6.0 — 2026-05-18

### Added
- **VS Code extension** (`integrations/vscode/`, marketplace ID `sayit.pronounce`). Hover over any tech word in any file → tooltip with IPA, English-like respelling, source, and 🔊 Play. ⌘⇧' speaks the selection; `Pronounce: Search dictionary…` is a fuzzy command-palette search over all 817 entries. Mac-only v0.1 (uses `say`); cross-platform on roadmap. Dictionary is JSON-bundled at build (`scripts/build-dict.mjs`) so the extension has zero runtime parse cost.
- **+193 programmer-targeted dictionary entries** (624 → 817):
  - Foundation web acronyms: HTTP, HTTPS, TCP, UDP, SSL, QUIC, CORS, CSRF, XSS, YAML, TOML, SDK, CLI, URL, URI, UUID, GUID, HTML, CSS, XML, WebSocket, NoSQL, Sass, SCSS, Less, OpenID, OAuth2, VPN.
  - Algorithms/CS: Dijkstra, trie, DAG, CRDT, ACID, BASE, CAP, REPL, FIFO, LIFO, LRU, AOT.
  - Networking: NAT, DHCP, BGP, OSPF, MTU, mTLS, ICMP, ARP, WAN, LAN.
  - Security: OWASP, SBOM, CVE, CVSS, MFA, 2FA, SSO, RBAC, WAF, SIEM, HIPAA, GDPR, nonce.
  - Hardware: GPU, CPU, TPU, NPU, ASIC, FPGA, SIMD, DRAM, SRAM, NVMe, RAID, DMA, ECC.
  - Architecture: SOLID, GitOps, DevOps, MLOps, LLMOps, FinOps, SOA, ELT.
  - ML deeper: CNN, RNN, LSTM, GRU, GAN, VAE, ReLU, GeLU, SwiGLU, RoPE, tanh, softmax, DPO, PPO, GRPO, Faiss, Adam, AdamW, Transformer, BERT, T5, PaLM, SAM, CLIP, DINO, ColBERT, HNSW, Karpathy.
  - Languages: C++, C#, TypeScript, JavaScript, Tcl (tickle), awk (auk), Perl, Lisp, Scheme, Prolog, PHP, Bash, Swift, Rust, Go, Ruby.
  - Web architecture: SPA, PWA, SSR, CSR, SSG, ISR, DOM, AST, V8, BFF.
  - Java: JPA, JDBC, POJO, DTO.
  - Web3: EVM, ABI, dApp, ENS.
  - SRE: SLA, SLO, SLI, KPI, MTTR, MTBF.
  - Python: uvicorn, gunicorn, WSGI.
  - High-star repos w/ ambiguous names: Ghostty, viem, wagmi, Logseq, Excalidraw, tldraw, Slidev, Yazi, AppFlowy, Affine, Gitea, Forgejo, Keras, YOLO, Whisper, Streamlit, Gradio, Dify, Hunyuan, Coqui, HTTPie, Bruno, Hoppscotch, TensorFlow, Mermaid, Anytype, Vicuna, LLaVA, LoRA, QLoRA, PEFT.
- **13 new creator-clarified entries** with citations: YAML → yaml.org FAQ, TOML → toml.io, QUIC → IETF RFC 9000, Keras → Chollet, Tcl → Ousterhout, awk → Aho/Weinberger/Kernighan, tldraw → Steve Ruiz, Slidev → Anthony Fu, Ghostty → Mitchell Hashimoto, viem → viem docs, HTTPie → docs, Logseq → creators, Dijkstra → EWD archive.

## v2.5.0 — 2026-05-17

### Added
- **`/zh.html`** — full Chinese landing for V2EX / 掘金 / B站 / 微博 audience. Mirrors the English landing (hero, demo, Famous Moments, features, FAQ, GH CTA) with `lang="zh-Hans"` and matching schema. Dictionary stays GenAm-only; only site copy is localized.
- **Site-wide 中文 nav link** propagated through every nav template (home, browse, per-word, daily archive, category index, about). hreflang `zh-Hans` + `zh-CN` declared on the EN landing for search engines.
- **`pitch/`** — distribution kit for the maintainer to take to socials without leaving the checkout.
  - `promo.mp4` — 47 s, 1920×1080, MiniMax-narrated promo built per-segment so the voiceover lands on each storyboard beat (no audio drift).
  - `deck.pptx` — 11-slide editable VC-style pitch deck.
  - `ctx.json` / `storyboard.json` / `tts-build.py` — sources for regen.
- **Issue templates** (`.github/ISSUE_TEMPLATE/`) — `🔊 Add a pronunciation entry`, `📜 Upgrade a source citation`, `🐛 Bug report`, `💡 Feature / idea` — each opinionated about what info to capture so future PR translation is mechanical.
- **`.github/CODEOWNERS`** — auto-routes review requests for dictionary, build script, skill, and MCP server changes.

## v2.4.0 — 2026-05-17

### Added
- **`/faq.html`** with `FAQPage` JSON-LD targeting "how to pronounce X" queries — the canonical Google snippet for the project.

## v2.3.0 — 2026-05-17

### Added
- **`/receipts.html`** — showcase of 20 creator-clarified pronunciations with direct citation links (Wilhite/GIF, GNU FAQ, etcd FAQ, …).
- **"Top 25"** nav link wired across every page → `/hall-of-shame.html`.

## v2.2.0 — 2026-05-17

### Added
- **SEO push**: `llms.txt` + `llms-full.txt` (llmstxt.org standard), per-word `WebPage` + `AudioObject` + `LearningResource` + `BreadcrumbList` + Speakable JSON-LD, `hreflang en` + `x-default` on top pages, image sitemap (1100 image URLs), `robots.txt` explicitly allowing GPTBot/ClaudeBot/PerplexityBot/Amazonbot/etc.
- **61 `/daily/[YYYY-MM-DD].html`** long-tail pages with Article JSON-LD (deterministic rotation).
- **IndexNow live submission** + `.github/workflows/indexnow.yml` cron — Bing HTTP 200 + Yandex HTTP 202.
- **Dictionary 496 → 544 entries.**

## v2.1.0 — 2026-05-17

### Added
- Hero typewriter cycle (kubectl → nginx → GIF → JSON → …).
- Perfect-score confetti on `/quiz.html`.
- **Dictionary 440 → 496 entries.**

## v2.0.0 — 2026-05-17 (500-round optimization)

Massive feature + content push. 440+ dictionary entries, interactive quiz, voice search, instant landing-page search, accessibility polish.

### Added

- **Dictionary expansion — 310 → 440 entries.** New coverage:
  - AI agent frameworks: Agno, CrewAI, AutoGen, smolagents, Outlines, Instructor, Guardrails, Marvin, Phidata, Haystack, RAGAS, Pydantic AI, Windsurf, Lovable, v0, n8n, Tabnine, Roo.
  - Languages: Crystal, Nim, Lean, Idris, Coq, Agda, F#, ReScript, Dart, Flutter, Pony.
  - Databases: PlanetScale, Neon, Turso, libSQL, Dgraph, FaunaDB, OpenSearch, Spanner, Bigtable, DynamoDB.
  - Build tools: Rollup, Parcel, Tsup, Tsx, Vinxi, Webpack.
  - Mobile: Capacitor, Ionic, Expo, NativeScript.
  - 3D/Graphics: Three.js, Babylon.js, PixiJS, Skia, Manim, p5.js, D3.
  - ML/Data: scikit-learn, Polars, Dask, Ray, Modin, Spark, Flink, Beam.
  - Networking: Tailscale, Wireshark, HAProxy.
  - Frameworks: Alpine.js, Phoenix, Rails, Laravel, Symfony, Sinatra, Flask, Starlette, Litestar, Sanic, Express, Koa, Fastify, Hapi.
  - Go: Echo, Fiber, Gin, Chi, GORM, Cobra, Viper.
  - Concepts: SOLID, TDD, BDD, MVP, MVC, DDD, CQRS, monad, functor, idempotent, lambda, closure, mutex, semaphore, async, coroutine.
  - Crypto: RSA, AES, SHA, TLS, PGP, GPG.
  - Web: WebRTC, WebGPU, WASI, IPFS, Solidity, Ethereum.
  - Editors: Fleet, Lapce, Sublime, VSCode.
  - Distros: Fedora, CentOS, RHEL, Manjaro, FreeBSD.
- **🎯 Interactive quiz** (`/quiz.html`) — 10/20/50-question multiple-choice game. Difficulty filters (all / contested / famous moments). Plays audio after every answer, surfaces the source citation, links wrong answers to the per-word page for review. Tweetable score with title ("Pronunciation laureate" / "Senior speaker" / …).
- **🔍 Instant landing-page search** — autocomplete typeahead on the home page. Exact > prefix > substring ranking. Arrow keys + Enter to navigate. Press `/` to focus.
- **🎤 Voice search** — Web Speech API mic button next to the hero search. Say a word; jumps straight to its page if the dictionary has it.
- **Accessibility (WCAG 2.1 AA pass)** — skip-link, visible focus rings on every interactive element, ARIA labels on search/mic/quiz controls, `prefers-reduced-motion` honored.
- **Animated speaker** in the hero (subtle 4-second wiggle), disabled under reduced-motion.
- **Integrations directory expanded**:
  - `integrations/raycast/pronounce.sh` — one-script Raycast command (⌘-space → "Pronounce" → word).
  - `integrations/alfred/` — Alfred workflow scaffold (`say <word>`).
  - `integrations/vscode/` — `.vscode/tasks.json` + keybind recipe to pronounce the current selection.

### Changed

- Sitemap now includes `/quiz.html`, `/stats.html`, `/about.html`.
- Nav across every page (home, browse, stats, about, per-word, per-category) carries the **Quiz** link.
- Browse + landing entry counts updated to reflect the live `${ENTRY_COUNT}` instead of the stale "130+".

### Performance / SEO

- Pre-generated audio + OG card + SVG badge for every new entry (130 new MP3s, 130 new OG PNGs, 130 new badges).
- Sitemap nudges priority on quiz/stats/about to keep crawlers honest.

---

## v1.0.0 — 2026-05-16 (rounds 51-100)

REST API + PWA + per-word badges + final 1.0 polish. See git log for details.

## v0.6.0 — 2026-05-16 (rounds 26-50)

PWA, theme toggle, /stats, /category pages.

## v0.5.0 — 2026-05-16 (rounds 1-25)

REPL mode, stream mode, doctor, export, benchmark subcommands.

## v0.1.0 — 2026-05-16

First useful release. Pivoted scope from "regional accent showcase" to "community pronunciation of project / product / programmer-jargon names" and shipped the dictionary, CLI, Claude Code skill, and a static browsable site.

### Added

- **Pronunciation dictionary** at `data/pronunciations.tsv` — 130+ entries across cloud / DevOps, frontend & backend frameworks, AI/ML platforms, databases, languages, editors, companies, programmer jargon, and acronyms. Every entry has IPA, GenAm respelling, optional alternate readings, source citation, category, and confidence level.
- **`bin/say-it` CLI** with full flag surface:
  - Dictionary lookup (case-insensitive), fed the respelling to macOS `say`.
  - `--alt [N]` to focus on the Nth alternate reading (1-indexed).
  - `--all` to chain primary plus every alternate, each repeated.
  - `--solo` to silence the "or: \<alt\>" tail for words with alternates.
  - `--why` to print the dict entry (IPA, source URL, category, confidence, notes).
  - `--no-dict` to bypass the dictionary entirely.
  - `list` and `search <pattern>` subcommands.
- **Audible multi-reading awareness.** Words with recorded alternates audibly chain them after the primary with a spoken `"or: <alt>"`, so the user perceives the multi-reading status from the audio alone.
- **Claude Code skill** at `skills/pronounce-word/SKILL.md` — auto-triggers on `how to pronounce X` / `X 怎么读`.
- **Static dictionary site** at `docs/` (GitHub Pages) — generated by `tools/build-site.sh` from the TSV.

### Technical notes

- **macOS `say` does not parse `[[inpt PHON]]` or SSML `<phoneme>` tags.** Both fall through as literal text. Dictionary ships English-like respellings and rides the TTS engine's letter-to-sound rules. IPA is retained for display and future SSML-aware backends.
- **`[[slnc N]]` IS honored** — used to insert deliberate pauses.

### Limitations

- macOS only. Windows / Linux backends on the roadmap.
- Respellings ride macOS Samantha's letter-to-sound rules; alternative voices may pronounce them differently.
