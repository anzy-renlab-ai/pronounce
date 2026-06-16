# 中文渠道文案草稿

四个平台一篇。**先翻译 EN show-hn 起的势头到 ZH 圈，再上原创内容**。

---

## 即刻 (短动态，<500 字)

> 受不了视频会议上又有人把 kubectl 念成「酷比 C 偷弱」。
>
> 做了个发音字典 —— 1702 个程序员每天会用错的项目名，每条都有出处：
>
> · GIF → "jif" 创作者 Wilhite 2013 年在 Webby 奖颁奖典礼说的
> · YAML → "yam-ul" 押韵 "camel" yaml.org FAQ 钦定
> · TOML → 押韵 "knoll" Tom Preston-Werner 亲口确认
> · kubectl → "koob control" Kelsey Hightower KubeCon 演讲 / 也接受 "cube cuddle" 当 meme
>
> 一个 Bash CLI + 一个网页 + VS Code/Cursor 扩展 + Claude Code skill + MCP server, MIT 免费, 零 npm 依赖。
>
> 网页：https://pronounce.renlab.ai
> 源码：https://github.com/anzy-renlab-ai/pronounce
>
> 想看你手上哪个工具读错？评论丢词。

[附 GIF: pitch/say-it-cli-demo.gif]

---

## 小红书 (情绪共鸣 + 截图)

**标题候选**：
1. 我做了一个工具，专治程序员英文发音翻车
2. 1702 个程序员名词正确读法，附出处（最后一条全网都读错了）
3. kubectl 到底怎么读？我做了个发音字典救命

**正文骨架**：

> 视频会议上，"kub-cuttle"、"engine-eks"、"Gee-son"、"yaymul"……每次听到都尴尬到想关摄像头 🫠
>
> 写了一个 CLI 工具 say-it，覆盖 1702 个程序员日常踩雷的发音：
>
> 1️⃣ 创作者钦定（最权威）—— GIF / YAML / TOML / Tcl / awk / GNU / Knative
> 2️⃣ 社区共识（大家都这么读）—— Kubernetes / Istio / nginx
> 3️⃣ 争议（两种读法都活着）—— kubectl / SQL / JSON / char
>
> 每一条都有出处链接，不是我编的。
>
> Mac 装好 brew install say-it 然后 say-it kubectl 就会把正确读法朗读三遍。
>
> 也有网页版 pronounce.renlab.ai 和 VS Code / Cursor 扩展。
>
> 想知道你工具的读法 → 评论区扔词 / 我看到就加 ⌨️🔊
>
> #程序员 #开发工具 #英语发音 #程序员日常 #vscode

[附 6 张截图: 网页首页 / kubectl 卡片 / YAML 卡片 / extension hover / CLI 输出 / GitHub 仓库]

---

## V2EX (技术圈, 短直)

**节点**：分享创造 / 程序员

**标题**: [分享创造] Pronounce — 1702 条带出处的程序员发音字典

**正文**:

发音参考字典，目标是给"kubectl 怎么读" 这种问题一个**带引用**的答案。

· **创作者钦定** （13 条）— GIF (Wilhite NYT 2013), YAML (yaml.org FAQ), TOML (Tom Preston-Werner), Tcl (Ousterhout), awk (Aho/Weinberger/Kernighan), GNU (gnu.org), QUIC (IETF RFC 9000), Dijkstra (EWD 归档), Logseq, Slidev, viem, HTTPie, Ghostty (Mitchell Hashimoto)
· **社区共识** 600+
· **争议**（多种活读法都列）— kubectl, SQL, JSON, char, NaN, SQL, GUID, URL, GIF……

技术栈：Bash CLI (~250 行)+ 静态站 + VS Code/Cursor 扩展 (Open VSX) + MCP server + Claude Code skill。**TSV 是唯一真源，其他都 rebuild 自它。**

仓库（MIT）：https://github.com/anzy-renlab-ai/pronounce
网页：https://pronounce.renlab.ai
扩展：https://open-vsx.org/extension/sayit/pronounce

求三种反馈：① 你常读错的词 ② "consensus" 条目里你有创作者真引用的 ③ Linux 后端 PR 欢迎。

---

## 知乎 (长文)

**标题**：**程序员发音的"野生权威"——我做了 1702 条带出处的发音字典**

**结构**：

1. **缘起** — 视频会议听到 kub-cuttle 的次数。
2. **为什么需要带出处** — 大众词典覆盖不到程序员词汇；网传读法没人能背书。我去翻 RFC / 项目 FAQ / 创作者访谈，把 13 条最有传播力的读法找到了原始出处。
3. **核心发现**（一组重磅）—
   - YAML 真的押韵 "camel"（yaml.org FAQ 一句话）
   - TOML 真的押韵 "knoll"（Tom Preston-Werner GitHub issue）
   - QUIC 是 "quick" 不是字母拼读（IETF RFC 9000）
   - awk 是 "auk" （Aho/Weinberger/Kernighan 原版书第 1 章）
   - GIF "jif" 是创作者 Wilhite 2013 年 Webby 奖发言（虽然全网吵）
4. **kubectl 究竟该怎么读** — "koob control" / "cube cuddle" / "K C T L" 三派都收录，标 *contested*。"koob control" 是 Kelsey Hightower 在 KubeCon 多次现场用的。
5. **CLI / Web / VS Code 扩展 / Claude skill / MCP** —— TSV 单源驱动整个生态。
6. **平台支持** —— Mac 限定 v0.2（用 macOS `say`），网页全平台。
7. **CTA** —— 三个链接 + 求 star、求 PR、求 Linux 后端贡献者。

[附 promo.mp4 或 say-it-cli-demo.gif]

---

## B 站 (短视频脚本, 60-90s)

**镜头 1** (0-5s)：黑屏 + 字幕「2026 年，我们到底是怎么把这些名字读成现在这个样子的」+ 一组吐槽截图 (cube-cuddle / engine-eks / Gee-son)

**镜头 2** (5-15s)：终端打开，`say-it kubectl` 出声（"koob control. koob control. koob control. or: cube cuddle."）— 录屏，字幕同步打 IPA

**镜头 3** (15-30s)：依次播 `say-it YAML / TOML / Ghostty / Dijkstra / awk`，每一条配字幕"出处：xxx"

**镜头 4** (30-45s)：切到 pronounce.renlab.ai 浏览器版，点几个词触发音频 + IPA

**镜头 5** (45-60s)：切到 VS Code 中 hover kubectl 显示 popup（用现有 demo.gif）

**镜头 6** (60-90s)：黑屏 + 三个链接 + 「想被收录哪个词？评论区告诉我」

[已有 47s 横版 promo.mp4 可直接复用]
