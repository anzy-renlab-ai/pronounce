# Reddit cross-posts

Stagger by 12 hours. Different angle for each sub. Different image.

---

## r/programming

**Title:** A community pronunciation dictionary for developer jargon — every entry has a cited source

**Body:**

After hearing one too many "kub-cuttle"s, I started a TSV of how engineers actually pronounce the names we use daily — kubectl, YAML, Ghostty, JSON, GIF, Pydantic, Knative, awk, Tcl, Dijkstra. 851 entries, every one tagged `creator-clarified` / `consensus` / `contested` with a citation.

The differentiator is the citations. e.g.:
- GIF → "jif" (Wilhite, NYT 2013)
- YAML → "yam-ul" (yaml.org FAQ)
- TOML → rhymes with knoll (Tom Preston-Werner)
- Tcl → "tickle" (John Ousterhout)
- awk → "auk" (Aho/Weinberger/Kernighan)

For contested words (kubectl, SQL, JSON, char) the CLI plays both readings.

It's MIT, zero npm deps, a Bash CLI wrapping macOS `say`, a static site, an extension for VS Code / Cursor / VSCodium, an MCP server, and a Claude Code skill.

https://github.com/anzy-renlab-ai/pronounce (★ welcome)
https://pronounce.renlab.ai (try in browser)

Words you mispronounce → comment or open a PR.

[ATTACH: pitch/say-it-cli-demo.gif]

---

## r/macos

**Title:** Built a CLI that pronounces developer jargon (kubectl, YAML, Ghostty) using macOS `say` + a sourced dictionary

**Body:**

Pure Bash + `/usr/bin/say` + a TSV. 851 entries with confidence tags and citations. macOS only because it relies on `say`. Free, MIT, zero deps.

```
brew install say-it    # or git clone + ./install.sh
say-it kubectl
🔊 koob control. koob control. koob control. or: cube cuddle.
```

Browser version at pronounce.renlab.ai (Web Speech API), VS Code/Cursor extension on Open VSX.

Repo: https://github.com/anzy-renlab-ai/pronounce

[ATTACH: pitch/say-it-cli-demo.gif]

---

## r/cursor

**Title:** Cursor extension: pronounce any tech word from hover (851 sourced entries, free)

**Body:**

Open VSX listing: https://open-vsx.org/extension/sayit/pronounce

Search for `sayit.pronounce` in Cursor's extension panel. Hover over kubectl / YAML / Ghostty / wagmi / Logseq / TOML / Dijkstra — popup with IPA, English-style respelling, both readings if contested, the source citation, and a 🔊 Play button. ⌘⇧' speaks the current selection.

macOS only for v0.2 (audio uses `say`). Linux/Windows on roadmap.

Source / contribute: https://github.com/anzy-renlab-ai/pronounce

[ATTACH: integrations/vscode/media/demo.gif]

---

## r/devops

**Title:** "kub-cuttle" no more — a sourced pronunciation dictionary for cloud-native tools

**Body:**

I tracked down the recorded pronunciations for the cloud-native vocabulary that's hardest to say without flinching:

- **kubectl** — "koob-control" (Kelsey Hightower, KubeCon 2018) is the maintainer reading. "Cube-cuddle" is the meme. Both are in the dict, tagged *contested*.
- **Kubernetes** — "koo-ber-NET-eez", from Greek κυβερνήτης (helmsman).
- **etcd** — "et-cetera-distributed" per the project FAQ. Letter-by-letter is also fine.
- **Knative** — "kay-native". The K is voiced.
- **Istio** — "ISS-tee-oh". Greek for "to sail".
- **Karpenter** — "carpenter", like the trade.

Plus QUIC ("quick", per IETF RFC 9000), CIDR ("sigh-der"), JWT ("jot", per the RFC), and a few hundred more.

Free, MIT, single TSV file. https://github.com/anzy-renlab-ai/pronounce

[ATTACH: integrations/vscode/media/demo.gif]

---

## r/ClaudeAI

**Title:** Claude Code skill that pronounces developer jargon with real audio (instead of guessing IPA)

**Body:**

Claude (and most LLMs) confabulate when asked "how do you pronounce GIF". I shipped a Claude Code skill that auto-triggers on "how do you pronounce X" / "X 怎么读" and plays the actual `say` audio for 851 community-curated entries. There's also an MCP server.

Skill: `skills/pronounce-word/SKILL.md`
MCP: `mcp-server/`
Both rebuild from the same TSV.

https://github.com/anzy-renlab-ai/pronounce

---

## Etiquette

- Don't repost the same body across subs — Reddit shadow-bans cross-promo.
- Engage in the comment thread for the first 4 hours; don't leave it idle.
- If a sub has a "Self-promo Saturday" rule, respect it.
