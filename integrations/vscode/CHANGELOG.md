# Changelog

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
