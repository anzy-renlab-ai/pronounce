# Show HN kit — Pronounce

Ready-to-post. Numbers current as of v2.13.0: **1702 entries** (143 contested · 60 creator-clarified · 1499 community-consensus). Be honest about traction: ~26 GitHub stars, ~300 extension installs. Don't inflate either.

---

## Title candidates (pick one)

1. **Show HN: Pronounce — a sourced dictionary of how devs actually say kubectl, GIF, and 1700 more**
2. **Show HN: 143 dev words you're still arguing about, 60 the creators already settled (with citations)**
3. **Show HN: I cited every pronunciation so we'd stop fighting about GIF on standup (1702 dev terms)**

> **Recommendation: #1.** It leads with the contested-debate hook, names the two terms that reliably start fights (kubectl, GIF), carries a concrete number, and the word "sourced" front-loads the only real differentiator. #2 is the sharpest scoreboard framing and is the strongest *first-comment* line — but as a title it buries the word "pronounce" and reads a hair clickbaity for HN. #3 is the most self-effacing and human; keep it as a backup if #1 feels too tidy. Whichever title wins, open the body with the standup story.

---

## Body

I cringed one too many times on standup hearing "kub-cuttle," so I went looking for a definitive answer and there wasn't one. So I built **Pronounce** — a community dictionary of how engineers actually say developer jargon, where the point isn't picking *one* correct reading, it's *showing the receipts* for whatever reading exists.

The differentiator is **sourced citations + the contested-debate angle.** Every entry has a confidence tag and, where one exists, a source URL. Three tiers:

- **creator-clarified (60)** — the person who made the thing said so, on the record:
  - GIF → "jif" (Steve Wilhite, NYT 2013)
  - nginx → "engine X" (nginx.org)
  - YAML → "yam-ul" (yaml.org FAQ)
  - GNU → "guh-new" (gnu.org has a whole pronunciation page)
  - LaTeX → "lay-tek" (Lamport / latex-project.org)
  - TOML → rhymes with knoll (Tom Preston-Werner)
  - Tcl → "tickle" (Ousterhout)
  - awk → "auk," like the seabird (Aho/Weinberger/Kernighan)
- **contested (143)** — both readings are alive and devs still argue. The dict surfaces *both* and plays them back to back:
  - kubectl → "koob-control" vs "cube-cuttle"
  - SQL → "sequel" vs "S-Q-L"
  - JSON → "jay-son" vs "jee-son"
  - GUI → "gooey" vs "G-U-I"
  - JWT → "jot" (per RFC 7519) vs "J-W-T" (what everyone actually says)
  - plus char, regex, sudo, and ~135 more
- **community-consensus (1499)** — widely agreed, no single citable authority. The long tail.

The scoreboard is the fun part: **143 words you're still arguing about, 60 the creators already settled.** That's the screenshot.

It's deliberately a small, boring stack — one TSV and a pile of thin consumers:

- `data/pronunciations.tsv` — the whole dataset, one file, ~80 KB
- a zero-dep Bash CLI wrapping macOS `say` (Linux `espeak-ng`, Windows PowerShell as best-effort fallbacks)
- a static site
- a VS Code / Cursor / VSCodium extension (Open VSX + MS Marketplace, ~300 installs)
- an MCP server (so an agent can look a term up)
- a Claude Code skill (auto-triggers on "how do you say X")
- a Homebrew tap

**MIT, zero npm deps.** The TSV is the product; everything else just reads it.

Being honest about traction: it's ~26 stars and ~300 installs. It's early. What it has that the IPA dictionaries and the Reddit threads don't is the citation column.

### Links

- Site: https://pronounce.renlab.ai/
- Repo: https://github.com/anzy-renlab-ai/pronounce
- The whole dataset, one file (1702 entries): https://github.com/anzy-renlab-ai/pronounce/blob/main/data/pronunciations.tsv
- VS Code / Cursor / VSCodium extension: https://open-vsx.org/extension/sayit/pronounce

### What I'd love feedback on

1. **Words you mispronounce that aren't in here.** Comment the term or open a one-line PR — the dictionary grows from PRs.
2. **Contested → creator-clarified upgrades.** If you have a citable creator quote (a recorded talk, an official FAQ, an RFC) for anything currently tagged `community-consensus` or `contested`, that's one PR away from a receipt. This is the highest-value contribution.
3. **Entries I got wrong.** Especially the 143 contested ones — if your team says it a third way, tell me and I'll add the variant rather than pick a winner.
4. **The playback engine off macOS.** macOS `say` is the gold standard; Linux/Windows are functional best-effort. If the espeak-ng output sounds wrong for a term, I want to know.

---

## Timing + first comment

**Best window:** Tuesday–Thursday, 8–10am ET (the front-page race is least crowded and the US/EU overlap is awake), or Monday 00:00 UTC. Avoid Friday afternoon and weekends.

**Post a substantive first comment immediately** — this is yours to make, not a reply. HN rewards an author comment that adds the data angle the title couldn't fit. Suggested:

> Author here. The thing I actually care about isn't picking winners, it's the scoreboard: of 1702 entries, **143 are contested** (both readings active, dict plays both) and **60 are creator-clarified** with a source URL — GIF/jif (Wilhite, NYT 2013), TOML rhymes-with-knoll (Preston-Werner), Tcl/tickle (Ousterhout), awk/auk. The other 1499 are community-consensus, no single citable authority. I'd love the contested list to get *more* contested — if your team says kubectl a way I don't have, comment it and I'll add the variant instead of overruling you. The whole dataset is one TSV you can grep: [link].

Then go quiet. Don't reply to your own thread for the first ~30 minutes (looks staged), and answer questions with specifics, not thank-yous.

---

## Seed replies (wait for organic threads — don't dump these)

- *(if someone says "but I always say GIF with a hard G")* — Both readings are listed. The primary is the creator's stated reading; the alternate plays right after with a spoken "or." Same pattern for SQL, JSON, char, regex.
- *(if someone asks about non-English / regional accents)* — GenAm only, on purpose. I tried regional accents early and the scope exploded. Per-word zh/ja pages are plausible; regional EN forks aren't.
- *(if someone asks why a dict instead of IPA-only)* — IPA is unreadable to most engineers and macOS `say` doesn't honor SSML phoneme tags. Each entry carries an English-style respelling fed to the TTS verbatim — that's the path that actually plays on macOS today.

---

## Anti-patterns to avoid

- Don't say "AI-powered" — it isn't, and HN penalizes the phrase.
- Don't lead with the VS Code extension — lead with the dictionary + the contested angle; the extension is a downstream consumer.
- Don't inflate the numbers. ~26 stars, ~300 installs. Stating them plainly buys credibility; hiding them loses it the moment someone clicks.
- Don't post a deck or any marketing artifact. The TSV link does more work than a slide ever will.
