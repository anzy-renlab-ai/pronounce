# pitch/ — distribution artifacts

Generated with [pitchkit](https://github.com/EricSun0218/pitchkit) (HyperFrames + ffmpeg + pptxgenjs) and [MiniMax T2A v2](https://platform.minimaxi.com/docs/api-reference/speech-t2a-http) for the voiceover.

## Files

| File | What | Use it for |
|---|---|---|
| `promo.mp4` | 47 s, 1920×1080, English narration. Hook → Before/After → 544 → Multi-reading audio → Claude Code skill → CTA. | Twitter/X, Product Hunt, LinkedIn, Hacker News, B站, 抖音 |
| `deck.pptx` | 11-slide VC-style pitch deck (Cover/Problem/Solution/Product/Market/Traction/Business/Competition/Team/Ask/Closing). Editable in PowerPoint / Keynote / Google Slides. | Conference talks, PH submission collateral, sponsor pitches |
| `ctx.json` | ProductContext — single source of truth that drives the deck + landing + voice script. | Edit + re-run `pitchkit pitch-deck` / `landing-page` / `tts-build.py` to refresh the whole kit |
| `storyboard.json` | HyperFrames Storyboard for the promo video. Per-segment frame counts tuned to match aligned voiceover. | Edit + re-run `pitchkit render-storyboard` to re-render visuals |
| `tts-build.py` | Per-segment MiniMax TTS builder. Each line of narration generated separately, padded with silence to its target segment duration, concatenated → one mp3 that lines up with the storyboard beats. | Re-run with `MM_KEY=...` to regenerate aligned voiceover |

## How to regenerate

```bash
# 1. voice
export MM_KEY="<minimax api key>"
python3 pitch/tts-build.py     # writes /tmp/say-it-voice-aligned.mp3

# 2. video (silent)
pitchkit render-storyboard pitch/storyboard.json /tmp/promo-video.mp4

# 3. mux
ffmpeg -y -i /tmp/promo-video.mp4 -i /tmp/say-it-voice-aligned.mp3 \
  -c:v copy -c:a aac -b:a 192k pitch/promo.mp4

# deck + alt landing (anytime)
pitchkit pitch-deck pitch/ctx.json pitch/deck.pptx
pitchkit landing-page pitch/ctx.json /tmp/alt-landing.html  # not committed; site landing lives in docs/
```

## Notes

- BGM was attempted via `pitchkit music` but the bundled ffmpeg's `amix` filter rejects the procedural BGM mix on macOS; voiceover-only ships fine, and a maintainer can layer BGM in Premiere/Resolve if desired.
- The MP4 has English narration. A Chinese version for V2EX / 掘金 / B站 would use the same `tts-build.py` with `voice_id` swapped to a Chinese voice (e.g. `Chinese (Mandarin)_Warm_Bestie`) and the script translated.
