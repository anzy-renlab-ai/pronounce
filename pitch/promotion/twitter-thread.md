# Twitter / X thread draft

Total: 10 tweets. Attach `pitch/say-it-cli-demo.gif` to tweet 1 and `integrations/vscode/media/demo.gif` to tweet 6.

---

**1/** I got tired of hearing "kub-cuttle" on every standup.

So I built a community pronunciation dictionary for the names engineers actually use. 851 entries, every one with a confidence tag and a citable source.

🔗 https://pronounce.renlab.ai

[ATTACH pitch/say-it-cli-demo.gif]

---

**2/** Three confidence tiers:

✅ **creator-clarified** — the project's own FAQ, a recorded creator interview, an RFC quote.
· **community-consensus** — widely used, no single citable source.
⚖️ **contested** — both readings active. The dict surfaces both.

---

**3/** A few that have actually been settled on the record:

· **GIF** → "jif" (Wilhite, NYT 2013)
· **YAML** → "yam-ul" (yaml.org FAQ — rhymes with camel)
· **TOML** → rhymes with knoll (Tom Preston-Werner)
· **Tcl** → "tickle" (John Ousterhout)
· **awk** → "auk" (the seabird; Aho/Weinberger/Kernighan)
· **GNU** → "guh-new" (gnu.org's own page)

---

**4/** And the contested ones — the dict plays *both* readings with a spoken "or:":

· **kubectl** → "koob control" *or* "cube cuddle"
· **JSON** → "JAY-son" *or* "JEE-son"
· **SQL** → "sequel" *or* S-Q-L
· **char** → "car" *or* "char"
· **NaN** → "nan" *or* N-A-N

---

**5/** It started as a Bash CLI wrapping macOS `say`:

```
$ say-it kubectl
🔊 koob control. koob control. koob control. or: cube cuddle. or: kube C T L.
```

250 lines of Bash. Zero npm deps. The TSV file is the source of truth.

---

**6/** Then I shipped a VS Code / Cursor / VSCodium extension. Hover any tech word, hear how engineers actually say it.

Open VSX: https://open-vsx.org/extension/sayit/pronounce

[ATTACH integrations/vscode/media/demo.gif]

---

**7/** And a Claude Code skill + MCP server. Ask your AI "how do you pronounce kubectl" — it plays the audio + cites the source. No more confabulated phonetic guesses.

---

**8/** Adding a word is a 3-line PR against `data/pronunciations.tsv`. The CLI, web app, extension, MCP server, and Claude skill all rebuild from the same TSV. One source of truth.

---

**9/** What I'd love help with:

· Words you mispronounce → comment them
· Citable creator quotes for entries currently in "consensus"
· Linux/Windows backend (dictionary is platform-agnostic, only `say` is Mac)

---

**10/** Site: https://pronounce.renlab.ai
Repo: https://github.com/anzy-renlab-ai/pronounce (MIT)
Open VSX: https://open-vsx.org/extension/sayit/pronounce

If `say-it kubectl` saves you one cringey standup — ⭐ would mean a lot.

/end

---

## Posting notes

- Best window: Tue–Thu 9–11 am PT.
- Tag 1–2 people in tweets 3 and 6 only if they're directly cited (e.g., @kelseyhightower on tweet 4, @mitchellh on tweet 6 for Ghostty). Don't blanket-tag.
- Reply to your own tweet 1 with a bonus: link to the per-word page for the most surprising entry that week.
- Don't tag @anthropicai / @vercel / @github unless they actually use the project.
