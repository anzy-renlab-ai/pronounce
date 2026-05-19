# Show HN draft

## Title candidates (pick one)

1. **Show HN: Pronounce — a community dictionary of how engineers actually say developer jargon (851 entries, sourced)**
2. **Show HN: I built a CLI + VS Code extension that pronounces kubectl, YAML, Ghostty, and 848 more dev tools**
3. **Show HN: A pronunciation dictionary where every entry has a citation — kubectl, GIF, YAML, Ghostty**

> HN front-page titles work best when they're concrete, slightly self-effacing, and contain a number that makes a quantified claim. #1 is the safest. #2 has the strongest emotional hook ("I built").

## Body

After hearing one too many people say "kub-cuttle" on a standup, I built a community pronunciation dictionary for the names engineers actually use — `kubectl`, `nginx`, `GIF`, `JSON`, `YAML`, `Ghostty`, `wagmi`, `Dijkstra`, `Pydantic`, `Knative`, `LaTeX`, `Postgres`.

The differentiator is **citations**. Every entry has a confidence tag and a source URL:
- **creator-clarified** (the project's own FAQ, a recorded creator interview): GIF → "jif" (Wilhite, NYT 2013) · YAML → "yam-ul" (yaml.org FAQ) · TOML → rhymes with knoll (Tom Preston-Werner) · Tcl → "tickle" (Ousterhout) · awk → "auk" (Aho/Weinberger/Kernighan)
- **community-consensus** (widely used, no single citable source)
- **contested** (both readings active — the dict surfaces both, e.g., kubectl is "koob-control" *or* "cube-cuddle")

The whole thing is a TSV file (`data/pronunciations.tsv`), a 250-line Bash CLI that wraps macOS `say`, a static site, a VS Code / Cursor / VSCodium extension (on Open VSX), an MCP server, and a Claude Code skill. **MIT, zero npm deps.**

### Links

- Site: https://pronounce.renlab.ai/
- Repo: https://github.com/anzy-renlab-ai/pronounce
- VS Code / Cursor / VSCodium extension: https://open-vsx.org/extension/sayit/pronounce
- Single TSV file (851 entries, ~80 KB): https://github.com/anzy-renlab-ai/pronounce/blob/main/data/pronunciations.tsv

### What I want feedback on

1. **Missing words you mispronounce.** Open a PR or comment a word — the dictionary grows from PRs.
2. **Contested entries you have a citable creator quote for.** Anything in `community-consensus` that has a "creator says X" recording is one PR away from `creator-clarified`.
3. **Linux/Windows backend.** macOS only today (uses `say`). The dictionary is platform-agnostic; only the playback engine is Mac-specific.

## Comments to seed

Don't post these immediately — wait for organic threads, then drop these as natural replies:

- *(if someone says "but I always say GIF with hard G")* — Both readings are listed. The primary is the creator's stated reading; the alternate plays right after with a spoken "or:". Same pattern for SQL, JSON, char, regex.
- *(if someone asks about non-English)* — Dictionary is GenAm only on purpose. Originally tried to do regional accents and the scope exploded. Will add per-word zh/ja pages but not regional EN forks.
- *(if someone wonders why a separate dict instead of IPA-only)* — IPA is unreadable to most engineers and macOS `say` doesn't honor SSML phoneme tags. Each entry has an English-style respelling fed to the TTS verbatim — that's the path that actually works on macOS today.

## Anti-patterns to avoid

- Don't say "AI-powered" — it isn't, and HN penalizes the phrase.
- Don't lead with the VS Code extension — lead with the CLI/dictionary; the extension is a downstream consumer.
- Don't post the deck.pptx — HN punishes marketing artifacts.
- Don't reply to your own thread within the first 30 minutes (looks staged).
