# Changelog

## 0.4.3 — 2026-05-23

- **Dictionary 1212 → 1238 (+26).** AI labs & models (GLM, Zhipu, ERNIE, InternLM, Moonshot), AI coding agents (OpenHands / OpenDevin, Goose), the Rust ecosystem's tricky names (`serde` "sir-DEE", `yew` "you", `clap`, `rayon` "RAY-on", `wasmer`), modern JS tooling (Elysia, Effect, Nitro, Valibot, Million, Rolldown), and dev platforms (Convex, Xata "ZAH-tah", Axiom, Quickwit, Reflex, `zstd`, Warp).

## 0.4.2 — 2026-05-22

- **More Chinese marketplace discoverability.** The Marketplace indexes the default `description` for search (not the localized nls), so appended Chinese query terms to it — 程序员单词怎么读 / 英文技术词发音 / 读音词典 — covering far more Chinese searches than the 30-tag keyword cap allows. Also swapped the niche `wagmi` keyword for `英语发音`.

## 0.4.1 — 2026-05-22

- **Discoverability for Chinese-speaking editor users.** v0.4.0 already localized the in-editor display (Chinese `displayName` / description / UI when VS Code's language is `zh-cn`); this makes the extension *findable* by Chinese search too. Added Chinese marketplace keywords (`发音`, `怎么读`, `读音`, `程序员发音`) so a zh-cn user searching the Extensions panel in Chinese hits it, and added a `中文说明` section to the README for conversion. Dropped three redundant English keywords (`say`, `audio`, `phonetics`) to stay within the 30-tag limit.

## 0.4.0 — 2026-05-21

- **Dictionary 993 → 1212 (+219).** Three waves:
  - **+103 commonly-mispronounced & hard-to-read terms**: tuple, daemon, cron, deque, malloc, schema, niche, segue, kernel, queue, char, sed, fsck, chown, chroot, plus genuinely hard names — `quay` ("key"), `guix` ("geeks"), `qt` ("cute"), `fooocus` ("focus"), `slsa` ("salsa"), sphinx, jaeger, cilium, gentoo, suse, vulkan, wayland, mesos, scylla, thanos, and more.
  - **+41 trending projects + tech people**: strapi, kysely, knex, zapier, sequelize, sveltekit, mongoose, bulma, directus — and the surnames devs say wrong: Torvalds, Knuth, Stroustrup, Hejlsberg, Kernighan, Liskov, Cerf, Hykes, de Raadt, Poettering, Bellard, Heinemeier, Matsumoto, Nakamoto.
  - **+75 AI/ML focus** (per request): models & tools — llamafile, safetensors, tokenizers, diffusers, mamba, olmo, pythia, deberta, roberta, einops, ggml/gguf, mlx, kaggle, colab, wandb, xgboost, lightgbm, catboost, spacy, gensim, seaborn, plotly, bokeh, altair, lancedb, pgvector, openvino, coreml — and researchers: Altman, Amodei, Hinton, LeCun, Bengio, Sutskever, Hassabis, Goodfellow, Vaswani, Chollet, Schmidhuber, Hochreiter, Krizhevsky, Szegedy, Uszkoreit, Mikolov, Kingma, Vinyals, Huang, Ng, and more. New `person` category.
- **🌐 Localization (i18n).** Extension UI now speaks **Chinese (`zh-cn`)** when VS Code's display language is Simplified Chinese: command titles, settings descriptions, the 4-step welcome walkthrough, hover labels (`read:` / `or:` / `Play` / `source`), the status-bar tooltip, and the milestone star prompt all switch. English remains the default. Implemented via `package.nls.json` / `package.nls.zh-cn.json` and a `vscode.l10n` bundle.
- **Marketplace SEO pass.** Fixed inconsistent entry counts across the listing (description / walkthrough / search step had drifted to 817 / 851 / 918); the build now auto-syncs every count from the real dictionary so they never drift again. Keywords expanded (`how to pronounce`, `text to speech`, `voice`, `screen reader`, `windsurf`, `zed`, …). README hook front-loads the pain + editor compatibility.

## 0.3.8 — 2026-05-21

- **Source upgrades** for 5 long-standing "find a real creator citation" issues (closes #28–#32):
  - **Vite** → `creator-clarified`. Project README now cited verbatim: 'Vite (French word for "quick", pronounced /viːt/, like "veet")'. README even links an mp3 of the pronunciation. Hover popup now shows the ✅ badge.
  - **Vue** → `creator-clarified`. Vue 2 README cited verbatim: 'Vue (pronounced /vjuː/, like view)'. Hover popup now shows the ✅ badge.
  - **Redis** — source URL upgraded from generic `redis.io` to `en.wikipedia.org/wiki/Redis`, which carries the IPA `/ˈrɛdɪs/` citing the Redis FAQ. Stays `community-consensus` (Wikipedia is editorial, not creator-authored).
  - **Knative** / **Pydantic** — no FAQ entry exists on either project's official docs as of this writing; notes rewritten to be honest about that (instead of saying "needs a citable source TBD") and record where the reading actually comes from (CNCF/KubeCon talks; Talk Python To Me / FastAPI sessions).
- No code, schema, or activation changes.

## 0.3.7 — 2026-05-21

- **Dictionary 918 → 993 (+75).** Two waves:
  - **14 missing tech projects** (closes open GitHub issues): Snowpack, WireMock, Trino, Skopeo, Buildah (creator-clarified — Dan Walsh's Boston-accent "BIL-duh"), cert-manager, Verdaccio, Tika, Vagrant, KEDA, Theia, Plausible, Pinokio, Aviary.
  - **61 cross-functional vocab entries** for the conversations tech folks have with product / marketing / sales / finance / legal: GTM, PLG, SLG, prosumer, TAM, SOM, CAC, LTV, ARR, MRR, NRR, GRR, ICP, NPS, OKR, ROI, DAU, MAU, B2B, B2C, D2C, B2B2C, IaaS, freemium, churn, cohort, funnel, scrum, kanban, sprint, backlog, retro, standup, epic, QBR, PoC, PoV, ABM, moat, flywheel, COGS, CRM, ERP, EBITDA, SOC2, SOX, SEO, SEM, CTR, CPC, CPM, ROAS, MoM, YoY, QoQ, NDA, MSA, SOW, RFP, NLP, PII. Acronyms with a single dominant reading are `community-consensus`; ones with real split (TAM word vs letters, ROAS, CAC, IaaS, ERP, PoC, PII, etc.) are `contested` with both readings shown.
- Marketplace `description` updated to "993-entry" and now mentions the cross-functional vocab explicitly so PMs/marketers searching the marketplace can find it.

## 0.3.6 — 2026-05-20

- **Unknown-word hover now offers `➕ Request entry`.** Hovering a word that isn't in the dictionary already showed Play + Star; now also a one-click link that opens the GitHub `add-pronunciation.yml` issue template pre-filled with the word. Turns "huh, no entry" curiosity into a contribution path.
- **Dictionary count no longer hardcoded.** Engagement milestone prompt and status-bar tooltip now read the live entry count via `dictSize()` instead of the literal string "918", so future dictionary growth never silently drifts these surfaces out of date.

## 0.3.5 — 2026-05-20

- **Star promoted everywhere; Ko-fi demoted to "optional".** The single highest-leverage user action is a GitHub star — donations are downstream. UI changes:
  - **Engagement-gated milestone prompt** (5/30/150 speaks): copy rewritten to lead with the star ask; Ko-fi button relabeled "☕ Coffee (optional)".
  - **Walkthrough step 4**: title `★ Star it · keeps the dictionary growing` (was "Like it? Star · Sponsor"). Description leads with the star CTA; Ko-fi moved to a single trailing "Optional: …" line.
  - **Status bar tooltip**: ★ Star on GitHub is now on its own line in bold; coffee tucked at the end of the secondary row.
  - **Hover popup**: action row reordered to `🔊 Play · ★ Star · source` (was `… source · ★ star`). For unknown words the popup now also includes the Star link.
  - **Root README**: "💚 Support" → "⭐ Support — start with a star"; Star CTA bolded and standalone; Ko-fi/Sponsors are listed as optional follow-ups.
- **walkthrough-star.md** rewritten end-to-end with Star as the headline action and Ko-fi as an optional footer.

## 0.3.4 — 2026-05-20

- **Dictionary 892 → 918 (+26).** Greek letters used in code (alpha, beta, delta, epsilon, mu, sigma, pi, theta, kappa — beta and theta marked contested for US/UK); modern CLI tools (zoxide, bat, hyperfine, tokei, tealdeer, difftastic, jq, yq); L1 blockchains (Cosmos, Polkadot, Cardano, Avalanche, Aptos, Sui, Optimism, Arbitrum — marked contested); Wasmtime.
- Marketplace `description` updated to "918-entry".

## 0.3.3 — 2026-05-20

- **Ko-fi donations** wired through the extension:
  - New command `Pronounce: ☕ Buy me a coffee (Ko-fi)`.
  - `sponsor.url` in `package.json` now points to ko-fi.com/alvinanziyan, so the Marketplace listing's "Sponsor" link goes straight to the tip jar.
  - Status-bar tooltip card adds a `☕ Ko-fi` link beside `★ Star`.
  - Walkthrough step 4 ("Like it? Support") rewritten with two CTAs — Star (free) and Ko-fi (paid).
  - Engagement-gated milestone prompt now offers `★ Star` / `☕ Buy me a coffee` / `Don't ask again` (was Star / Later / Don't ask again).

## 0.3.2 — 2026-05-19

- **Policy: creator-clarified entries no longer surface an "or:" alternate.** Once a project's creator has settled the reading on record, the dictionary teaches *that* reading — not the also-heard ones. Cleared `alt_ipa` + `alt_respelling_us` on 14 rows: GIF, etcd, PostgreSQL, MySQL, LaTeX, Godot, QUIC, YAML, HTTPie, Dijkstra, Tcl, awk, scrypt, io_uring. The hover popup, CLI, and web app all stop offering the alternates for these.
- **Fix: `io_uring` respelling.** Was "I O YOUR ing" — Samantha read "YOUR" as the possessive, producing "eye-oh-yore-ing". Now "I O ring" per Jens Axboe's stated reading: letters I-O then the word "ring".
- **Bump CLI version** to 0.4.0 (was lagging at 0.2.0; out-of-sync with the cross-platform refactor + 268-entry growth).

## 0.3.1 — 2026-05-19

- **Dictionary 851 → 892 (+41).** Distributed systems (Raft, Paxos, Byzantine, gossip, Lamport, Saga, HLC, vector clock, quorum); cryptography primitives (Ed25519, ChaCha20, Poly1305, X25519, OAEP, scrypt, argon2, bcrypt); cloud services (EC2, S3, RDS, IAM, KMS, EKS, ECS, GKE, AKS, Route53); Linux kernel (io_uring, Btrfs, ZFS, cgroups, strace, ltrace, syscall); 2026 LLMs (DeepSeek-R1, o1, o3, Sonnet, Opus, Haiku).
- **Engagement-gated star prompt.** After 5 / 30 / 150 successful speaks the extension shows one non-intrusive info-toast asking for a GitHub star. Three buttons: ★ Star · Maybe later · Don't ask again. Counts persist via `globalState`; "Don't ask again" silences all future prompts.
- **Status bar tooltip now Markdown** with command links: ★ Star · Search dictionary · Open website. No new UI surface, just a hover-discoverable CTA the user has to opt into.
- **Search palette placeholder** mentions "Star to support the dictionary" as a passive nudge.
- Bumped marketplace description to "892-entry sourced dictionary".

## 0.3.0 — 2026-05-19

**Cross-platform — Linux + Windows backends.** No longer macOS-only.

- New TTS backend detection in `src/speak.ts`:
  - macOS: `/usr/bin/say` (unchanged)
  - Linux: `espeak-ng` (install via `sudo apt install espeak-ng` / `brew install espeak-ng` / `pacman -S espeak-ng`)
  - Legacy Linux: `espeak`
  - Windows: PowerShell `System.Speech.Synthesis.SpeechSynthesizer` (built into modern Windows)
- Backend autodetection runs once at first speak; result cached.
- Speech rate is translated for each backend (wpm for `say`/`espeak`/`espeak-ng`; -10..+10 scale for PowerShell).
- Voice setting still applies to `say`; on espeak/PowerShell it falls back to the default English voice.
- Keybinding generalized: `⌘⇧'` on Mac, `Ctrl+Shift+'` on Linux/Windows.
- Error message now lists install commands per OS when no backend is found.

## 0.2.2 — 2026-05-19

- **Dictionary grows 817 → 851 (+34).** New: numeronyms (i18n, l10n, a11y, e2e, m17n, s11n, p13n, g11n), GPU/CPU codenames (Hopper, Blackwell, Lovelace, Ampere, Volta, Pascal, Grace, Turing), security vulns (Heartbleed, Shellshock, Log4Shell, Spectre, Meltdown), more databases (Druid, Pinot, TiDB, YugabyteDB, StarRocks, Doris), web3 tooling (Hardhat, Foundry, Anvil, Solana), and standards bodies (WHATWG, ECMA, IETF).
- Marketplace listing description bumped 817 → 851.

## 0.2.1 — 2026-05-19

- Marketplace listing: 960×540 animated demo GIF at the top of the README — 4 frames cycling kubectl ⇄ YAML ⇄ Ghostty ⇄ wagmi with the full hover popup, status bar item, and source citation visible. Plus a static `screenshot-kubectl.png` for fallbacks.

## 0.2.0 — 2026-05-19

- **Welcome walkthrough** on first install — 4-step tour with one-click "Hear kubectl", search demo, and a Star CTA. Re-open anytime via `Pronounce: Show welcome / how to use`.
- **Status bar item** — `$(unmute) sayit` on the right; click to speak the current selection. Disable via `pronounce.statusBar`.
- **Hover enrichment**:
  - Alternate readings now appear inline as `_or:_` so contested words (GIF, SQL, kubectl) tell the whole story without two hovers.
  - Confidence badges: ✅ creator-clarified · ⚖️ contested · · community-consensus.
  - Each hover ends with a `★ star this dictionary` link → opens the GitHub repo.
- **New commands**:
  - `Pronounce: Open dictionary website` → opens https://pronounce.renlab.ai/
  - `Pronounce: ★ Star on GitHub` → opens the repo
  - `Pronounce: Show welcome / how to use` → re-opens the walkthrough
- **Marketplace metadata polish**: `qna`, `sponsor`, `galleryBanner`, expanded `keywords` (kubernetes, yaml, toml, ghostty, wagmi, cursor, vscodium, ipa, phonetic, speak, speech), refreshed `description`.

## 0.1.1 — 2026-05-18

- Listing polish: Open VSX install badges, marketplace-ready README, install command for Cursor/VSCodium/Zed/Gitpod/Theia/code-server.

## 0.1.0 — 2026-05-18

Initial release.

- Hover provider: tooltip with IPA, English-like respelling, source, and 🔊 Play for ~625 dictionary entries.
- Command `Pronounce: Speak current selection` (`⌘⇧'` on macOS).
- Command `Pronounce: Search dictionary…` — fuzzy-find any entry.
- Settings: voice, rate, repetitions, hover toggle, known-words-only toggle.
- macOS-only (uses `/usr/bin/say`).
