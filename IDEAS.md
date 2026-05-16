# Ideas

Brainstormed roadmap of features that would make `say-it` significantly better. Public on purpose — pick anything that looks fun, open a PR (or an issue to discuss first).

The dictionary itself accepts contributions today; see [`CONTRIBUTING.md`](CONTRIBUTING.md). The list below is the *product* side.

## 1. Real creator audio clips

Short (2-3 s) audio clips of creators saying their own product name — Linus saying "Linux", Crockford saying "JAY-son", Wilhite saying "JIF". CLI and site play the clip when available, fall back to TTS otherwise. Authenticity beats TTS for the contested cases. Licensing care needed — prefer linking to public YouTube timestamps over rehosting.

## 2. AI-assisted PR drafting

`say-it propose <word>`: search public docs / podcasts / GitHub for the word, ask an LLM to draft IPA + respelling + source candidates, write a pre-filled PR. 10× lower contribution friction. Could 10× the dictionary.

## 3. Crowdsourced reader submissions

In-browser "record your reading" — 2 seconds of mic input, uploaded as an alternative entry. Build community ownership and authenticity. Moderation pipeline required.

## 4. Spaced-repetition / quiz mode

`say-it quiz` plays a random dict entry and asks you to type the respelling. Builds memory like Anki. Connects to the existing Anki-export roadmap item.

## 5. VS Code / Cursor extension

Hover over a project name in code → see the pronunciation, click ▶ to hear it. Editor-integrated has higher reach than a CLI for most devs.

## 6. Browser extension

Right-click any word on Wikipedia / Stack Overflow / dev.to / Hacker News → "Hear it via say-it". Mass-market acquisition surface.

## 7. Slack / Discord bot

`/sayit kubectl` posts a play button + IPA + source. Useful for casual look-ups in team channels. Probably the lowest-effort, highest-spread channel.

## 8. Open Graph image generation

For every dict entry, generate a 1200×630 social card (word + IPA + respelling + source). When a link to `/word/kubectl` is shared on Twitter or Slack, the unfurl is gorgeous. Major shareability boost. Use Vercel OG image generation if we go Next.js.

## 9. Public JSON API

`https://<domain>/api/word/kubectl` returns the entry as JSON. Useful for chatbots, AI agents, integrations. Trivially built on top of the static site.

## 10. Cloud TTS provider (opt-in)

When `SAY_IT_TTS_PROVIDER=elevenlabs` and `SAY_IT_ELEVENLABS_API_KEY` set, route the playback through ElevenLabs (or OpenAI) with SSML phoneme tags — which DO work on those backends, unlike macOS `say`. Much higher quality, especially for the names native TTS mangles. Cache audio locally at `~/.cache/say-it/`.

## 11. Pronunciation diff

`say-it diff kubectl` records your microphone, compares the audio against the canonical reading, returns a similarity score. Pronunciation coach. Could use cloud STT + phoneme alignment.

## 12. Daily pronunciation Twitter / Mastodon bot

`@say_it_daily` posts one random dictionary entry per day at 9 a.m. PST with a waveform GIF + source link. Passive distribution + slow long-tail star accrual.

## 13. Embed widget

`<iframe src="https://<domain>/embed/kubectl">` — embeddable mini-player for blog posts and docs. Helps the brand spread via inbound links.

## 14. Per-word SEO landing pages

Each dictionary entry gets a real route (`/word/kubectl`, not just `#kubectl`) with rich `<title>` / `<meta description>`, related words, embedded YouTube clip when available, and a comments thread (e.g. via Giscus). Becomes the canonical "how to pronounce X" landing page for that term. Massive long-tail SEO play.

## 15. Stats / leaderboard page

Public dashboard at `/stats`: total entries, most-played words, top contributors, recent additions, contested-vs-settled breakdown. Drives engagement and contributor recognition.

## 16. Light theme + a11y pass

Site is currently dark-only. Add a light theme respecting `prefers-color-scheme`. Audit ARIA labels for the play buttons. Test with VoiceOver / NVDA.

## 17. Mobile share-sheet extension (iOS / Android)

Highlight a word in any app → tap "say-it" in the share sheet → hear it. Mobile reach is large; the CLI doesn't serve it.

## 18. Localized prose, not localized readings

The dictionary stays GenAm-only. But the *site copy* and *Claude skill* prose can localize — zh, ja, es, fr, de. Massively expands TAM without diluting the editorial scope. Start with the existing zh-CN README stub.

## 19. Search-as-you-type with keyboard shortcut

Press <kbd>/</kbd> anywhere on the site → focus the search bar → fuzzy match as you type. Sub-100 ms feedback. Standard dev-tool UX expectation.

## 20. Make the dictionary an installable npm / brew / pip package

`brew install say-it`, `npm install -g say-it`, `pip install say-it`. Lowers install friction from "git clone + run shell script" to "one command". Each ecosystem brings its own SEO + discovery audience.

---

## Notes on prioritization

If a contributor asks "what should I work on first?":

- **Highest leverage right now:** real creator audio clips (#1), per-word SEO pages (#14), OG image generation (#8). All directly attack the credibility-and-shareability bottleneck the project is built to solve.
- **Lowest-effort wins:** Slack bot (#7), search-as-you-type (#19), light theme (#16), Twitter bot (#12).
- **Bigger lifts (multi-week):** VS Code extension (#5), cloud TTS (#10), pronunciation diff (#11), mobile extension (#17).
- **Defer:** crowdsourced audio (#3) until moderation pipeline is real; pronunciation diff (#11) is fun but niche.
