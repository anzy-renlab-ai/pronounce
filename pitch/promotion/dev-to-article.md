# dev.to / Hashnode / Medium article draft

Doubles as the Hacker News first-comment and the Reddit r/programming body. Keep the voice builder-to-builder, numbers load-bearing, no hype.

## Title

**We settled the developer pronunciation wars - here are the receipts**

(alt: "147 dev words you're still arguing about, 66 the creators already settled")

## Cover image

`pitch/say-it-cli-demo.gif` - already in the repo. The 8-second CLI clip is the most screenshot-able asset.

## Tags

`#showdev` `#cli` `#devops` `#webdev` (4 tags, dev.to max).

---

## The article

Someone on a Loom said "kub-cuttle" with total confidence, and three other engineers nodded. Nobody corrected anyone, because nobody actually knew. Then a sales call where the AE said "my-squeal" for MySQL and I had to mute myself.

This happens constantly. We read these words for years before we ever hear them out loud, so we each invent a private pronunciation and then defend it in standup. Most of the time there is no right answer and we just argue. But sometimes there is a right answer, the creator literally told us, and we are still arguing anyway.

So I built a dictionary of how engineers actually say developer jargon. Not how a dictionary thinks they should, how the community does, with a citation for every reading. Here is the current scoreboard:

- **1,702 entries** total
- **147 still contested** - devs genuinely argue, and we tag both readings
- **66 creator-settled** - the person who made the thing told us, on the record
- the remaining **1,499** are community-consensus, the boring ones we agree on

The interesting work is the 203 at the top of that list. Let me show you the receipts.

## Settled by the creator (stop arguing about these)

These are not opinions. Each one has a source you can click. If you are still saying these the other way, you are overruling the person who named the thing.

- **GIF -> "jif"**. Steve Wilhite, who created the format, said it flatly: "It's pronounced JIF, end of story." He said it again accepting a Webby in 2013, the year the NYT wrote it up. Source: NYT, May 2013. Tag: creator-clarified. (Yes, the White House and the dictionary both disagree with him. He made it. He wins.)
- **YAML -> "yam-ul"**, rhymes with camel. Straight from yaml.org. Tag: creator-clarified.
- **nginx -> "engine X"**. Documented on nginx.org itself. Not "en-jinks," not "n-jinx." Tag: creator-clarified.
- **GNU -> "guh-new"**. One syllable, hard G, rhymes with "new." The GNU Project maintains a dedicated pronunciation page for exactly this argument. Tag: creator-clarified.
- **TOML -> rhymes with "knoll"**. Tom Preston-Werner, who created it (and co-founded GitHub), said it rhymes with knoll, troll, roll. So "tohml," not "tahml" and definitely not "T-O-M-L." Tag: creator-clarified.
- **Tcl -> "tickle"**. John Ousterhout, the creator. Confirmed on the official Tcl Developer Xchange. Tag: creator-clarified.
- **awk -> "auk"**, like the seabird, rhymes with hawk. Named after Aho, Weinberger, and Kernighan, the three people who wrote it. Tag: creator-clarified.

A few more from the 66, because they come up: **LaTeX -> "lay-tek"** (the X is a Greek chi /k/, never "lay-teks"), **Dijkstra -> "DIKE-strah,"** **QUIC -> "quick"** (per the IETF RFC, never letter-by-letter), **Ghostty -> "ghost-ee"** (Mitchell Hashimoto).

## Still contested (we tag both, you pick your side)

These are the 147 where there is no creator ruling, or the creator's ruling lost to practice. We do not pretend there is a winner. We store both readings and the source for the debate.

- **kubectl** - "koob-control" (heard from Kelsey Hightower) vs "cube-cuttle" vs spelling it out "kube-C-T-L." The K8s community genuinely splits on this. No official ruling. Contested.
- **SQL** - "sequel" (it descends from IBM's SEQUEL) vs "S-Q-L" letter by letter (what ANSI uses). Both are correct depending on who trained you. Contested.
- **JSON** - "jay-son" (Douglas Crockford says it this way) vs "jay-sawn" / "jee-son." Crockford's own line is that he does not care, both are fine, which is itself the most contested possible answer. Contested.
- **GUI** - "gooey" (mainstream) vs "G-U-I" letter by letter. Contested.
- **JWT** - "jot" (the RFC 7519 authors actually specify "jot") vs "J-W-T" letter by letter, which dominates in practice. This is the rare case where the spec settled it and the community ignored the spec. Contested.

Honorable mentions still in the contested pile: **char** (care / car / char), **regex** (hard G vs soft G), **sudo** ("soo-doo" vs "soo-doh").

## How the dictionary actually works

It is deliberately boring infrastructure. The entire thing is one TSV file, `data/pronunciations.tsv`, one row per word. Each row carries the IPA, a plain-English respelling, alternate readings, the source URL, and a confidence tag (`creator-clarified`, `contested`, or community consensus). The citation is the whole point, that is the part that took months, not minutes.

Everything else rebuilds from that one file:

- **CLI** - a zero-dependency Bash script wrapping macOS `say` (and `espeak-ng` on Linux). `say-it kubectl` and you hear it. No npm, no install ceremony.
- **Web** - pronounce.renlab.ai, every word has a page with audio that plays in the browser plus the citation.
- **Editor extension** - VS Code, Cursor, and VSCodium, on Open VSX and the MS Marketplace. Highlight a word, hear it.
- **MCP server** - so your AI agent can pronounce things correctly instead of confidently making it up.
- **Claude Code skill + Homebrew tap** - for the people who live in the terminal.

MIT licensed, zero runtime dependencies. The whole stack exists to serve that one TSV.

## The honest part

This is small. About 26 GitHub stars as I write this. It is a side project that solves a real but minor annoyance, and I am not going to pretend it is changing the industry. What I think is actually good here is the sourcing discipline: 66 entries where I tracked down the creator on the record, and 147 where I resisted the urge to declare a winner and just showed both sides with a link.

If your team has a word you have quietly been arguing about for years, it is probably already in here, with a receipt.

## Soft CTA

If this saved you one standup argument, a GitHub star genuinely helps it get found: [github.com/anzy-renlab-ai/pronounce](https://github.com/anzy-renlab-ai/pronounce).

And if your favorite mispronounced tool is missing, the contribution is one line in `data/pronunciations.tsv` plus a source URL. PRs welcome, especially ones that move a word from "contested" to "creator-clarified" with a real citation.

[Star on GitHub](https://github.com/anzy-renlab-ai/pronounce) · [Try the web app](https://pronounce.renlab.ai/) · [Install the extension](https://open-vsx.org/extension/sayit/pronounce)

---

## Distribution notes

- dev.to original. Set canonical URL to pronounce.renlab.ai if you publish there first.
- Hashnode cross-post 24h later with the dev.to canonical.
- Reddit r/programming: paste the article body (drop the front-matter and distribution notes), lead with the scoreboard stat, link the repo at the bottom not the top.
- Hacker News: submit the GitHub repo or the site, then post the "Settled by the creator" + "Still contested" sections as the first comment so the thread has something to chew on immediately. The GIF/jif receipt is the reliable thread-starter.
- LinkedIn personal share with the CLI gif embedded.