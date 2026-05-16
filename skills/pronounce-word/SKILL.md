---
name: pronounce-word
description: User asks how to pronounce an English word ("X 怎么读" / "怎么发音" / "how to pronounce X" / "pronounce X" / "读一下 X"). Generate audio via the `say-it` CLI (or macOS `say` directly) and play it so the user actually HEARS the word — three times by default — instead of only writing IPA/syllable hints. Triggers on a single-word target or a short phrase the user explicitly wants spoken.
---

# pronounce-word — speak the word out loud

**Purpose**: When the user asks for the pronunciation of an English word, don't just respond in text. Play the audio so they can hear it.

## Trigger patterns

Auto-invoke when the user's message matches any of:
- `X 怎么读` / `X 怎么念` / `X 怎么发音`
- `读一下 X` / `念一下 X`
- `how to pronounce X` / `pronounce X` / `how do you say X`
- `what does X sound like`

`X` is typically a single English word but may be a short phrase. If the target word is ambiguous (multiple words in the message), ask which one. If clearly a single token, proceed.

## What to do

1. **Speak it 3 times.**

   Preferred — use the `say-it` CLI if installed:
   ```bash
   say-it <word>
   ```

   Fallback — use macOS `say` directly:
   ```bash
   say -v Samantha "<word>. <word>. <word>."
   ```

   - Default voice: `Samantha` (en_US, clear). Alternates if user requests: `Daniel` (en_GB), `Karen` (en_AU), `Moira` (en_IE), `Tessa` (en_ZA).
   - **Always 3 repetitions** so the user can lock the pronunciation in.
   - This blocks until the audio finishes; user hears it through the Mac speakers.

2. **Reply with one short line of text** alongside the audio:
   - The IPA (British + US if they differ meaningfully)
   - The syllabified spelling (e.g. "SIM-uh-lee")
   - One-line meaning if the word is uncommon enough to warrant it

   Don't pad. The audio carries the main info; text is the reference.

## Example

User: "Simile 怎么读"

Tool call:
```bash
say-it Simile
```

Reply:
> 英 /ˈsɪməli/ · 美 /ˈsɪməli/ — "SIM-uh-lee"。

## Notes

- `say` is /usr/bin/say, always present on macOS. No install needed for the fallback.
- For longer phrases or sentences, can use `say "a long string"` directly.
- If user wants the audio saved to a file, use `say-it -o /tmp/word.aiff <word>` or `say -o /tmp/word.aiff "X"`.
- If user wants slow / clear pronunciation, use `say-it -r 130 <word>` (default rate ~200 wpm).
- If user switches off audio (e.g. "just tell me, don't play"), skip the speak step for the rest of the conversation.
- On non-macOS environments, this skill currently does not apply — fall back to text-only IPA + syllable explanation. Linux/Windows TTS backends are on the roadmap.
