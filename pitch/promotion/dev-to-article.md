# dev.to / Hashnode / Medium article draft

## Title

**20 dev tools you've been saying wrong — with audio, citations, and the receipts**

(alt: "The standup secret: how engineers actually pronounce kubectl, YAML, Ghostty, and 17 more")

## Cover image

`pitch/say-it-cli-demo.gif` — already in the repo.

## Tags

`#beginners` `#devops` `#opensource` `#productivity` (4 tags, dev.to max).

## Opening (the hook)

> The first time I heard someone say "kub-cuttle" with full confidence on a Loom, I had to mute and pace the room. The second time, I built a CLI.

This is a tour of the **20 most-mispronounced developer tools**, with audio you can play in the browser and a citation for every reading. No vibes-based linguistics — every "creator-clarified" entry links to a project FAQ, an interview transcript, or a recorded talk where the maker said the word.

## The list (one entry = one section)

Format per entry: word · IPA · respelling · who said it · ▶ audio link.

Pick the top 20 by audience appeal:

1. **kubectl** — `/ˈkuːb kənˌtroʊl/` — "**koob control**" (Kelsey Hightower, KubeCon) — *or* "cube-cuddle" (the meme) — *contested*
2. **GIF** — `/dʒɪf/` — "**jif**" (Wilhite, Webby Awards 2013) — *or* "gif" — *creator-clarified*
3. **YAML** — `/ˈjæməl/` — "**yam-ul**" (yaml.org FAQ) — rhymes with "camel" — *creator-clarified*
4. **TOML** — `/toʊml/` — "**tohml**" (Tom Preston-Werner) — rhymes with "knoll" — *creator-clarified*
5. **GNU** — `/ɡnuː/` — "**guh-new**" (GNU Project's own pronunciation page) — *creator-clarified*
6. **nginx** — `/ˈɛn dʒɪnˈɛks/` — "**engine X**" (nginx.org) — *creator-clarified*
7. **Ghostty** — `/ˈɡoʊsti/` — "**ghost-ee**" (Mitchell Hashimoto) — *creator-clarified*
8. **wagmi** — `/ˈwæɡ mi/` — "**WAG-mee**" — "we are all gonna make it" — *consensus*
9. **viem** — `/viːm/` — "**veem**" — one syllable (viem docs) — *creator-clarified*
10. **Knative** — `/ˈkeɪnətɪv/` — "**kay-native**" — the K is voiced — *consensus*
11. **JSON** — `/ˈdʒeɪsən/` — "**JAY-son**" (Crockford) — *or* "JEE-son" — *contested*
12. **SQL** — `/ˈsiːkwəl/` — "**sequel**" (IBM heritage) — *or* letter-by-letter — *contested*
13. **Tcl** — `/ˈtɪkəl/` — "**tickle**" (John Ousterhout) — *creator-clarified*
14. **awk** — `/ɔːk/` — "**auk**" (the seabird) — Aho/Weinberger/Kernighan — *creator-clarified*
15. **Dijkstra** — `/ˈdaɪk strɑː/` — "**DIKE-strah**" (Edsger Dijkstra archive) — *creator-clarified*
16. **Pydantic** — `/paɪˈdæntɪk/` — "**pie-dantic**" (Samuel Colvin) — *creator-clarified*
17. **LaTeX** — `/ˈleɪtɛk/` — "**lay-tek**" — the X is /k/ as in Greek χ — *creator-clarified*
18. **QUIC** — `/kwɪk/` — "**quick**" (IETF RFC 9000) — never letter-by-letter — *creator-clarified*
19. **Logseq** — `/lɒɡˈsiːk/` — "**log-seek**" — log + sequence — *creator-clarified*
20. **kubectl** — bonus surprise: include the most-cited 5 readings, including IPA-letter-by-letter as the rare third — show how *contested* really plays out.

For each, embed a `<audio>` tag or link to the pronounce.renlab.ai per-word page so the audio plays in-browser.

## Closing CTA

> The dictionary is a single TSV file with 851 entries and 13 confidence-tagged citations. Every entry took ≤ 3 minutes to write. The work that took **months** was tracking down the creator quotes for the words like YAML, TOML, awk, Tcl, GIF, Dijkstra — where the citation is the whole point. If your favorite mispronounced tool isn't in here, open a PR — `data/pronunciations.tsv` is the source of truth, and the CLI/web/extension/MCP all rebuild from it.

[★ Star on GitHub](https://github.com/anzy-renlab-ai/pronounce) · [▶ Try the web app](https://pronounce.renlab.ai/) · [Install the VS Code extension](https://open-vsx.org/extension/sayit/pronounce)

## Distribution

- dev.to original — set canonical URL to your own domain if you have one
- Hashnode cross-post 24h later with hashnode-canonical
- Medium "Better Programming" submission (if accepted, +5–10× reach)
- LinkedIn personal share with the GIF embedded
