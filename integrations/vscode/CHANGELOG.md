# Changelog

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
