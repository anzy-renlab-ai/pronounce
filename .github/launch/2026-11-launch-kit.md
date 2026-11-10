# Launch kit — November 2026

Copy ready to paste. Everything here is written for a human to post from a
personal account; nothing in this file should be submitted by a bot.

Post order matters: **one place per day**, not all at once. Each audience
rewards a different framing, and a title that works on HN dies on V2EX.

---

## 0. Before firing

- [ ] The daily quiz has today's date and the five words render with audio
- [ ] `curl -fsSL https://pronounce.renlab.ai/install.sh | bash` works on a clean shell
- [ ] The issue your post points at is open and monitored (today: #52, the source-verification sprint)
- [ ] You can sit in the thread for 3 hours. A launch with a silent author reads as abandoned.

Best window: **Tuesday–Thursday, 08:00–10:00 US Eastern** (HN). V2EX:
**09:00–11:00 Beijing**, weekday.

---

## 1. Hacker News — Show HN

**Title** (71 chars, under the 80 limit):

```
Show HN: A sourced dictionary of how engineers pronounce 1,934 dev names
```

**First comment**, post immediately after submitting:

> Author here. The problem I kept hitting: IPA tells you the phonemes and
> nothing else. I'd read `/ˈkuːb kənˌtroʊl/`, nod, and then say "kub-cuttle"
> out loud anyway — and every TTS engine reads the letters, so it can't save
> you either.
>
> So the dictionary stores the *respelling* as data — "koob control" — and
> feeds that to the OS voice. You hear the reading engineers actually use, not
> the spelling.
>
> Two choices inside are worth arguing about:
>
> **Every entry is confidence-tagged.** `creator-clarified` means the person
> who named the thing said it, with a link; `community-consensus` means the
> reading is widespread; `contested` means it genuinely isn't settled. kubectl
> has three live readings and the entry says so. GIF is "jif" by the creator's
> own 2013 statement and people still argue — the entry says that too, and
> keeps the hard-G reading as an alternate.
>
> **Unknown means unknown.** Ask it for a word it doesn't have and it tells you
> it doesn't have it. It does not invent a reading, and it does not invent a
> citation — 1,313 of the 1,934 entries carry a source URL, and the rest are
> labelled as having none.
>
> It runs as a Bash CLI (macOS `say`, Linux `espeak-ng`, Windows SAPI), a VS
> Code extension, an MCP server, and a Claude Code skill. There's also a daily
> five-question quiz, which is the fastest way to discover the words you've
> been saying wrong in meetings for years: https://pronounce.renlab.ai/daily
>
> The reason I'm posting: the interesting part is the entries I have *wrong*.
> The source-verification sprints are open — if you know where a maintainer
> says their own project's name on the record, that's the best kind of
> citation, and every one that lands gets credited in the changelog.

**Do not** put a star ask in the HN post. It reads as marketing and gets
flagged. The repo link and the live site carry it.

**If it lands on the front page:** reply to every substantive comment within
the first two hours, especially the "you got X wrong" ones — those are your
best changelog entries and they convert lurkers into contributors.

---

## 2. V2EX — 分享创造

**标题：**

```
做了个「开发者黑话发音词典」：1934 个词，带 IPA、谐音、读音来源
```

**正文：**

> 起因很蠢：我在会上把 kubectl 念错了三年，直到有人笑出来。
>
> 后来发现查音标没用——`/ˈkuːb kənˌtroʊl/` 我读三遍还是读成 "kub-cuttle"。TTS 也没用，它按字母念。
>
> 所以这个词典存的不是音标，是**谐音**："koob control"。然后把谐音喂给系统语音，你听到的是工程师真在用的读法。
>
> 两个我觉得还算诚实的地方：
>
> - **每条都有置信度**：作者本人说过的（带链接）、社区共识、还是真没定论。kubectl 有三种读法在流通，词条就写三种；GIF 作者 2013 年亲口说是 "jif"，词条照写，同时保留硬 G 的读法。
> - **查不到就说查不到**。不编读音，也不编来源——1934 条里 1313 条有可点开的出处，剩下的明确标着没有。
>
> 形态有点多，挑一个用就行：Bash CLI（macOS `say` / Linux `espeak-ng` / Windows SAPI）、VS Code 插件、MCP server、Claude Code skill。还有个每日五题的小游戏，最快的用法是去被自己的发音羞辱一下：https://pronounce.renlab.ai/daily
>
> 站点：https://pronounce.renlab.ai ｜ 源码（MIT）：https://github.com/anzy-renlab-ai/pronounce
>
> 最想要的反馈：**哪些词我读错了**。每周有一个 source-verification 的 issue，只要你能找到维护者本人念自己项目名字的地方，就是最好的引用。

---

## 3. X / Twitter — 4 tweets

**1/**
> kubectl 有三个读法。
> nginx 是 "engine X"，不是 "en-ginx"。
> GIF 的作者亲口说了是 "jif"，大家还在吵。
>
> 我花了几个月把 1,934 个开发者黑话的读法整理成了带出处的词典 —— 音标没用，存的是谐音。🧵

**2/**
> 每条都有置信度：
> · creator-clarified（本人说过，带链接）
> · community-consensus（社区共识）
> · contested（真的没定论）
>
> 查不到的词就说查不到。不编读音，也不编 citation —— 1,934 条里 1,313 条有可点的出处。

**3/**
> 形态：CLI / VS Code 插件 / MCP server / Claude Code skill。
> 还有每日五题，用来发现你在会上念错的那些词：
> pronounce.renlab.ai/daily

**4/**
> 源码 MIT，欢迎打脸：
> github.com/anzy-renlab-ai/pronounce
>
> 最想要的反馈是「你读错了」。能找到维护者本人念自己项目名字的地方，就是最好的引用。

**First reply to your own thread** (link + image): the site hero, one word
page, and the daily quiz result grid — three images, one per reply.

---

## 4. Reddit

Only two subs fit, and both have rules to read first:

- **r/ExperiencedDevs** — self-promotion is restricted; post only in a
  permitted thread or modmail first. The angle that works there is the *data*
  (which words are genuinely contested), not the tool.
- **r/ClaudeAI** — the skill + MCP angle. Title: "A Claude Code skill that
  makes Claude say technical names correctly (it plays audio instead of
  writing IPA)".

Skip r/programming: the self-promo rules will remove it and the removal is
permanent.

---

## 5. Listings (durable trickle, no rush)

| Where | How | State |
| --- | --- | --- |
| punkpeye/awesome-mcp-servers | merged | ✅ listed |
| hashgraph-online/awesome-codex-plugins | PR #223 | ✅ merged 2026-07-01 |
| ComposioHQ/awesome-claude-skills | PR #1794 | ⏳ open since 2026-09-01 |
| travisvn/awesome-claude-skills | PR #1421 | ⏳ open 2026-11-10 |
| hesreallyhim/awesome-claude-code | **web form only** — https://github.com/hesreallyhim/awesome-claude-code/issues/new?template=recommend-resource.yml | ⬜ needs a human |
| HOL registry | claim via OAuth — https://hol.org/guard/plugins | ⬜ needs a human |
| viatsko/awesome-vscode | PR #484 closed unmerged 2026-06-21 | ❌ closed |

awesome-claude-code explicitly rejects submissions made through the API or a
bot ("It is not possible to submit a resource recommendation using the `gh`
CLI"), and its admission rule is ≥100 stars **or** ≥14 days old with active
development — the repo clears the second bar.

---

## 6. What to say when someone asks "why not just ask an LLM"

> Because the model doesn't know either. Ask three of them how to say
> `kubectl` and you get three confident, different answers with no source.
> The point of this thing is that the answer arrives with a citation, or with
> the honest admission that there isn't one.
