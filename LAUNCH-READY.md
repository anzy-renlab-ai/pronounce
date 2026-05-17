# LAUNCH-READY — copy-paste posts to drive stars

> Pre-written posts for Hacker News, Reddit, X/Twitter, Dev.to, V2EX, Juejin, LinkedIn, Mastodon, and Discord/Slack drops. Tested phrasing — each leads with a concrete pain ("you said n-jinx") and a 4-second demo, not a feature list.
>
> **Posting checklist** (in order, 90-minute total):
> 1. Hacker News (Show HN) — best Tue–Thu, 7-9 AM PT
> 2. Reddit r/programming, r/devops, r/commandline — same day
> 3. Lobste.rs (if you have an invite)
> 4. X/Twitter thread
> 5. Dev.to article
> 6. V2EX 创意 / 分享发现 (zh)
> 7. Juejin (zh, 7-9 PM CST)
> 8. LinkedIn — different framing, 1 day later
> 9. Mastodon — same as Twitter
> 10. Discord / Slack drops in dev communities you're in

---

## 0. Media kit — drop one of these in every post

All four hosted on the v2.5.0 release. Direct CDN URLs:

| Asset | Aspect | Best for | URL |
|---|---|---|---|
| `promo.mp4` | **16:9** · 47 s · EN voice | Hacker News, Twitter/X, LinkedIn, Mastodon, Dev.to, PH, Discord/Slack | <https://github.com/anzy-renlab-ai/pronounce/releases/download/v2.5.0/promo.mp4> |
| `promo-zh.mp4` | **16:9** · 47 s · 中文 voice | V2EX, 掘金, WeChat 文章, 知乎 | <https://github.com/anzy-renlab-ai/pronounce/releases/download/v2.5.0/promo-zh.mp4> |
| `promo-zh-vertical.mp4` | **9:16** · 47 s · 中文 voice | **B 站 / 抖音 / 微博 / 小红书** (vertical-first feeds) | <https://github.com/anzy-renlab-ai/pronounce/releases/download/v2.5.0/promo-zh-vertical.mp4> |
| `deck.pptx` | 11 slides · editable | Conf talks, PH gallery, sponsor pitches | <https://github.com/anzy-renlab-ai/pronounce/releases/download/v2.5.0/deck.pptx> |

**Twitter/X posting tip**: drag-drop `promo.mp4` directly into the compose box — autoplay = ~3-5× engagement vs. linking to YouTube. Same on LinkedIn.

**B 站 / 抖音 / 微博**: upload `promo-zh-vertical.mp4` (1080×1920) — horizontal videos get cropped or letterboxed, killing watch time.

---

## 1. Hacker News (Show HN)

**Title** (≤80 chars, no emoji):
```
Show HN: Pronounce – a CLI that speaks kubectl, GIF, JSON the way devs actually say them
```

**URL**: `https://pronounce.renlab.ai/`

**Text** (optional — HN now allows both URL + text):
```
Hi HN — I built Pronounce, a tiny CLI + community dictionary for the project
names devs trip over: kubectl ("koob-control"), nginx ("engine X"), GIF
("jif"), JSON ("jay-son"), and 540+ more, each with a source citation.

  $ say-it kubectl
  🔊  koob control. koob control. koob control. or: cube cuddle. or: kube C T L.

The CLI wraps macOS's built-in `say` with a curated respelling per entry,
so you hear the intended community reading instead of whatever the TTS
guessed from the letters. Multi-reading words (GIF, SQL, JWT) chain their
alternates audibly so you know the debate exists.

There's also an interactive quiz, voice search via Web Speech API, an MCP
server so Claude/Cursor can answer pronunciation questions, and a Raycast
script command.

The dictionary is a TSV file — every entry tagged with confidence
(creator-clarified, community-consensus, contested) and a source URL when
one exists. PRs welcome.

MIT, zero deps (Bash + macOS `say`). Windows/Linux backends are next.

Repo: https://github.com/anzy-renlab-ai/pronounce
Live: https://pronounce.renlab.ai/
Quiz: https://pronounce.renlab.ai/quiz.html
```

---

## 2. Reddit

### r/programming, r/devops, r/sysadmin, r/commandline

**Title**:
```
I built a CLI that pronounces kubectl, GIF, JWT the way the community actually says them (540+ entries, sourced)
```

**Body**:
```
Tired of saying "kub-cuttle" or hearing 47 takes on GIF? `say-it` is a 1-file
Bash CLI that speaks the *intended* community reading through macOS `say`:

    $ say-it kubectl
    🔊 koob control. koob control. koob control. or: cube cuddle. or: kube C T L.

It ships with a 540-entry dictionary (kubectl, nginx, GIF, JSON, Pydantic,
JWT, Knative, LaTeX, …), every entry tagged with a confidence level and
a source URL (creator interview, project FAQ, Wikipedia anchor).

Multi-reading words audibly chain their alternates ("or: gif") so you hear
the debate without watching the terminal.

Bonus: interactive quiz, voice-mic search on the site, MCP server for
Claude/Cursor, Raycast script.

MIT, zero deps. Star if it saves you from one cringey standup moment :)

https://github.com/anzy-renlab-ai/pronounce
https://pronounce.renlab.ai/
```

---

## 3. X / Twitter thread (5 tweets)

```
1/ You say "n-jinx" in standup one time and you never recover.

I built Pronounce — a CLI that speaks 540+ project / product names the way devs actually say them.

kubectl → "koob control"
GIF    → "jif" (creator says so)
JWT    → "jot" per RFC 7519

https://pronounce.renlab.ai 🔊
```

```
2/ Every entry is sourced.

If a creator settled the pronunciation on record (Wilhite at the Webby Awards for GIF, Linus for Linux, Crockford for JSON), the dictionary cites it.

If it's community-consensus or contested, it says so — and audibly chains the alternates.
```

```
3/ The CLI is 1 file of Bash. No deps. Just wraps macOS `say` with a curated respelling per word.

  $ say-it kubectl     # 3 reps + alternates
  $ say-it --alt GIF   # focus on the rival reading
  $ say-it --why JSON  # show IPA + source URL
  $ say-it quiz        # interactive challenge
```

```
4/ The browser side: interactive quiz, voice mic search (Web Speech API), instant typeahead, PWA install. Every word has its own page with audio + source + share buttons.

There's also an MCP server so Claude / Cursor can answer pronunciation questions.
```

```
5/ Open source, MIT, every entry is a community PR.

If you've ever been gently corrected mid-standup, this is for you.

⭐ https://github.com/anzy-renlab-ai/pronounce
🌐 https://pronounce.renlab.ai
```

---

## 4. Dev.to article — title + opening

**Title**: `Stop Saying "kub-cuttle": A Tiny CLI for Pronouncing Dev Jargon`

**Tags**: `cli`, `devtools`, `opensource`, `bash`, `productivity`

**Hook (first 200 chars)**:
```
You're in a standup. You say "n-jinx" out loud. Someone gently corrects you
to "engine-x". You've now lost 30 seconds and a tiny shred of credibility.
I built a 1-file Bash CLI to make this stop happening.
```

Then walk through: the problem → the dictionary approach → the audible alternates trick → the per-word page / quiz / MCP server → "MIT, drop a star".

---

## 5. V2EX (中文 · 创意 or 分享发现 节点)

**Title**:
```
[分享] kubectl 怎么读？一个 540 词的开发者发音字典 + CLI
```

**Body**:
```
做开发久了，每个人都念错过几个项目名 —— "kub-cuttle"、"n-jinx"、JSON 到底是 "jay-son" 还是 "jee-son"…

最近开源了一个小工具 say-it，把这种发音查询做成一个 1 文件 Bash CLI，调用 macOS `say` 把"社区实际念法"播出来，不是查 IPA 看不懂。

例：

    $ say-it kubectl
    🔊  koob control. koob control. koob control. or: cube cuddle. or: kube C T L.

字典 540 条，每条都标了置信度（creator-clarified / community-consensus / contested）和来源 URL（Wilhite 在 Webby Awards 上说 GIF 念 "jif"、Crockford 在 RailsConf 说 JSON 念 "jay-son" 等等）。

附带：
- 网页版（带语音 mic 搜索 + 互动 quiz）：https://pronounce.renlab.ai
- MCP server：在 Claude / Cursor 里直接问 "how to pronounce X" 就能听到音
- Raycast / Alfred / VS Code 集成
- Claude Code Skill：中文 "X 怎么读？" 自动触发

MIT、零依赖、PR 欢迎。GitHub：https://github.com/anzy-renlab-ai/pronounce
```

---

## 6. Juejin (中文掘金)

**Title**:
```
你确定 kubectl 念 "kub-cuttle"？我做了一个 540 词的开发者发音字典
```

**Frontmatter (tags)**: `命令行`, `开源`, `CLI`, `开发工具`, `效率`

**Opening 段**:
```
本文背景：写了 6 个月 Kubernetes，听到第一次 KubeCon talk 才知道 kubectl 念 "koob-control"，不是 "kub-cuttle"；nginx 念 "engine X"，不是 "n-jinx"；GIF 创作者 Wilhite 在 Webby Awards 上明确说念 "jif"，不是 "gif"…

整理了一份社区共识 + 来源引用的开发者发音字典，写了个 1 文件 Bash CLI 调 macOS `say` 播出来。540 条，全部有来源 URL。开源 MIT，欢迎补充。
```

后面同样：例子 → 字典维护方式 → 网页 / quiz / MCP server / Raycast 集成 → GitHub 链接。

---

## 7. LinkedIn

**Different framing — emphasize the operational pain it solves, not the toy.**

```
Three years on Kubernetes and I was still pronouncing "kubectl" wrong.
Turns out half my team was too.

Small thing — but every standup, every demo, every interview where someone
gently corrects you costs micro-trust. So I open-sourced what I'd wanted:

▸ Pronounce — a CLI + community dictionary for developer jargon
▸ 540+ entries with confidence levels and source citations
▸ Audio playback for the "intended" community reading
▸ MCP server so AI assistants stop guessing

The dictionary is a TSV file. Every entry is a community PR. If you've
ever been corrected mid-meeting, drop a star ⭐ — it nudges more devs to
contribute their favorite mispronounced project name.

https://github.com/anzy-renlab-ai/pronounce
```

---

## 8. Mastodon (fediverse — different vibe)

```
new tiny tool: Pronounce — a CLI that says "kubectl", "nginx", "GIF",
"JSON", and 540+ other developer jargon names the way the community
actually says them. cited sources, audible alternates, MIT, zero deps.

🌐 https://pronounce.renlab.ai
🐙 https://github.com/anzy-renlab-ai/pronounce

#devtools #cli #opensource #bash
```

---

## 9. Discord / Slack drops (1-line)

Adjust target community:

- General dev: `does anyone else still pronounce kubectl as "kub-cuttle"? I made a thing → https://pronounce.renlab.ai`
- DevOps: `apparently it's "et-cetera-distributed", not "et-see-dee". 540 of these, all cited → https://pronounce.renlab.ai`
- AI/ML: `built an MCP server so Claude / Cursor can answer "how to pronounce X" with audio → https://github.com/anzy-renlab-ai/pronounce/tree/main/mcp-server`
- Newbie-friendly: `if you've ever said n-jinx in a meeting and felt the shame, this is for you → https://pronounce.renlab.ai`

---

## 10. GitHub repo "About" description (Settings → top right)

Copy this into the repo Description field:

```
🔊 Pronounce developer jargon out loud. 540+ entries (kubectl, GIF, JSON, JWT…), sourced, with confidence levels. Bash CLI + interactive quiz + voice search + MCP server.
```

Topics to add (Settings → Topics):

```
cli  bash  pronunciation  dictionary  macos  developer-tools
text-to-speech  tts  speech-synthesis  open-source  community-driven
claude-code  mcp  mcp-server  raycast  alfred  pwa  kubernetes
sre  devops  programming  jargon
```

---

## Star-velocity tactics (in addition to the posts)

1. **Pin the repo** on your GitHub profile so visitors hit it first.
2. **GitHub Discussions** — enable, seed it with "Words we want next" thread, link from CONTRIBUTING.md. People who comment tend to star.
3. **Star existing devs who star similar tools** (e.g. kubectl, k9s, lazygit) — they'll see you in their feed.
4. **Reply, don't post** — when someone tweets "how do you pronounce X", reply with the canonical link + 1 sentence. Genuine help converts to stars more than launches do.
5. **Cross-link from your other repos** — README badge `[![Pronounce](https://img.shields.io/badge/say-it-ff6a3d)](https://pronounce.renlab.ai)`.
6. **Submit to awesome lists** — `awesome-cli-apps`, `awesome-shell`, `awesome-developer-tools`, `awesome-mcp-servers` (you're already in two).
7. **Hacker News follow-up post a month later** — "Pronounce update: 540 entries, MCP server, here's what worked" tends to chart better than launches.

---

*This file is not for users — it's a launch playbook for the maintainer. Delete or move to `.github/` after launch if you prefer.*
