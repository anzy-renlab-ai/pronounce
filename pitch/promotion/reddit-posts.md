# Reddit posts

Four destinations, four genuinely different angles. Reddit's spam filter (and
mods) flag near-identical bodies posted across subs, so none of these reuse the
same opening, framing, or links-in-the-same-order. The r/kubernetes one is NOT a
post at all — it's a comment to drop into an existing "how do you say kubectl"
thread.

Post order and timing below. Stagger 12-24h between each so they don't all hit
/new at once and so you can actually sit in each comment thread for the first
few hours (the single biggest factor in whether a Reddit post lives or dies).

Honest framing throughout: it's a small project, ~26 stars, a TSV and a Bash
script. Don't oversell it. Reddit can smell a launch.

Suggested sequence:
1. **r/commandline** — day 1
2. **r/programming** — day 1, ~16h later
3. **r/devops** — day 2, ~14h after that
4. **r/kubernetes comment** — opportunistic, whenever a real thread appears
   (don't schedule it; it only works as a reply)

---

## 1. r/commandline

**Self-promo rules:** Tolerant of "I made a tool" posts as long as it's an
actual CLI and you show it working, not a landing page. No hard ratio rule, but
mods remove pure marketing. Lead with the terminal, not the website.
**Best time:** Weekday morning US Eastern (Tue-Thu, 8-10am ET). Lower-traffic
sub, so a post stays on /new longer — timing matters less than elsewhere.

**Title:**

I made a zero-dep Bash CLI that pronounces developer jargon out loud (kubectl, YAML, Ghostty, awk)

**Body:**

I kept second-guessing how to say half the tools in my own stack, so I built a
small CLI that just says them out loud. It wraps the system speech engine
(`say` on macOS, `espeak-ng` on Linux, PowerShell on Windows) and reads from a
TSV of how engineers actually pronounce things.

```
$ say-it kubectl
🔊 koob control. koob control. koob control.   (also heard: cube cuddle)

$ say-it awk
🔊 auk. auk. auk.

$ say-it --list          # every installed voice
$ say-it -n 1 yaml       # say it once instead of 3x
$ say-it -r 110 nginx    # slower
$ say-it -o gif.aiff gif # render to a file
```

It's deliberately boring under the hood: Bash + builtins + the OS speech binary,
no npm, no pip, nothing to `brew install` except the script itself (there's a
tap). The whole dictionary is one tab-separated file you can grep.

The part I actually care about: each entry is tagged `consensus`,
`creator-clarified`, or `contested`, with a source. So for a word like
`kubectl` where people genuinely disagree, it plays the common maintainer
reading and notes the meme one, instead of pretending there's one right answer.

Repo (MIT): https://github.com/anzy-renlab-ai/pronounce

It's small — ~26 stars, very much a weekend-project that grew. Mostly posting
because the CLI ergonomics are the interesting bit for this sub and I'd take
feedback on the flag design. Words it gets wrong → grep the TSV and open a PR,
or just tell me here.

[ATTACH: pitch/say-it-cli-demo.gif]

---

## 2. r/programming

**Self-promo rules:** Strict-ish. Mods prefer a link to *content* (the data, a
writeup, a discussable artifact) over "check out my repo." Self-promo isn't
banned but blatant launches get removed and downvoted. Link the *project page /
the contested list*, and frame it as a discussion, not a pitch. Expect
pedantic, well-sourced comments — lean into that.
**Best time:** Weekday US morning (Mon-Thu, 9-11am ET). It's a firehose; you get
~30-60 min on /new to gather initial votes, so post when the US is awake.

**Title:**

I tagged 158 developer words that engineers still actively argue about, and 67 the creators already settled — with citations

**Body:**

There's a recurring genre of programming argument — GIF vs JIF, "sequel" vs
"S-Q-L", kubectl, JSON, GUI — that never resolves because nobody brings
receipts. So I started keeping receipts.

It's a dictionary of how developer jargon is actually pronounced, 1738 entries,
and the only interesting column is the confidence tag:

- **67 creator-clarified** — settled, on the record, by the person who made the
  thing:
  - GIF → "jif" (Steve Wilhite, the creator, NYT 2013)
  - nginx → "engine X" (the project's own FAQ)
  - YAML → "yam-ul" (yaml.org)
  - TOML → rhymes with "knoll" (Tom Preston-Werner)
  - Tcl → "tickle" (John Ousterhout)
  - awk → "auk" (Aho, Weinberger, Kernighan — the three authors)
  - LaTeX → "lay-tek", GNU → "guh-new"

- **158 contested** — devs genuinely still split, so the entry records *both*
  readings instead of declaring a winner: kubectl ("koob-control" vs
  "cube-cuttle"), SQL, JSON, GUI, JWT ("jot" vs spelled out), regex, sudo, char.

The contested list is the part I think is actually fun to argue over, so that's
what I'd point you at:

https://pronounce.renlab.ai

The whole thing is MIT, zero dependencies — a single TSV plus a small CLI and a
static site. Honest status: it's tiny (~26 stars), and the data definitely has
gaps and probably some calls you'll disagree with. That's sort of the point —
the contested ones are supposed to start a fight, and the creator-clarified ones
are supposed to end one.

What's a word you'll die on the hill for? And which "settled" one above do you
refuse to accept?

[ATTACH: pitch/social-preview.png]

---

## 3. r/devops

**Self-promo rules:** Practitioner sub, allergic to marketing but fine with
"here's a thing I made for our world" if it's specific and useful. Keep it
cloud-native, skip the meta. Don't lead with "I built a startup"; lead with the
pronunciations they personally get corrected on in standup.
**Best time:** Tue-Thu, mid-morning to lunch US Eastern (10am-1pm ET), when the
on-call crowd is at a keyboard.

**Title:**

Settling the cloud-native pronunciation arguments with actual sources (kubectl, etcd, Knative, Istio, QUIC)

**Body:**

Every team I've been on has the same low-stakes standup argument about how to say
the tools, so I went and tracked down the recorded/sourced pronunciations for
the cloud-native vocabulary specifically:

- **kubectl** — "koob-control" is the reading you hear from Kelsey Hightower and
  a lot of maintainers. "cube-cuttle" / "cube-cuddle" is the running meme. This
  one's tagged *contested* on purpose — both readings are in the entry, I'm not
  going to pretend it's settled.
- **Kubernetes** — "koo-ber-NET-eez", from the Greek for "helmsman".
- **etcd** — "et-cee-dee" / "et-cetera-d", per the project's own framing
  (distributed `/etc`).
- **Knative** — "kay-native". The K is voiced.
- **Istio** — "ISS-tee-oh". Greek, "to sail."
- **QUIC** — "quick", per the IETF (RFC 9000), not spelled out.
- **CIDR** — "sigh-der" (yes, like the drink). **JWT** — "jot", per the RFC.

It's part of a bigger sourced dictionary (1738 entries total, every one tagged
consensus / creator-clarified / contested with a citation), but the K8s + infra
slice is the reason I'm posting here — that's the vocabulary I personally got
corrected on the most.

MIT, single TSV, zero deps, plus a CLI that'll say any of them out loud:
https://github.com/anzy-renlab-ai/pronounce

Small project, being honest — ~26 stars. But the infra entries are the ones I
sweated the sources on. If you've heard a maintainer say one of these
differently on a conference recording, I want the timestamp so I can fix the
entry.

So: at your shop, is it koob-control or cube-cuttle? And does anyone actually say
"et-cetera-d" out loud or do we all just type it?

[ATTACH: integrations/vscode/media/demo.gif]

---

## 4. r/kubernetes — reply, NOT a post

**Self-promo rules:** r/kubernetes removes low-effort self-promo posts fast, and
a "check out my dictionary" thread would get nuked. The *only* good way in here
is to answer the question that already gets asked constantly. Do NOT submit this
as a post. Wait for (or search for) a real "how do you pronounce kubectl /
k8s / etcd" thread and drop this as a comment. The link is optional and goes
LAST, after you've actually answered — and skip it entirely if the thread is
small or the mods are strict. The answer stands on its own.

**Search to find a live thread:** sort r/kubernetes by new/top for
`pronounce kubectl`, `how do you say`, `cube control`, `koob`. These threads
recur every few months.

**Comment to drop in:**

> Short version: there's no single official answer, which is exactly why this
> argument never dies.
>
> "koob-control" is what you'll hear from Kelsey Hightower and a lot of the
> maintainers — `kube` + `control` (it controls your cluster, `ctl` = control).
> "cube-cuttle" / "cube-cuddle" is the affectionate meme reading. Some people
> just spell it out, "cube-C-T-L." All three are in the wild; none is wrong
> enough to correct someone over.
>
> For the rest of the stack the closest-to-settled ones are: Kubernetes =
> "koo-ber-NET-eez" (Greek for helmsman), etcd = "et-cee-dee" (it's distributed
> `/etc`), Knative = "kay-native", Istio = "ISS-tee-oh" (Greek "to sail").
>
> (I keep a little sourced list of these if it's useful — the K8s ones are
> tagged "contested" precisely because the community genuinely splits on them.)

That parenthetical last line is the *only* promo, it's optional, and it should
read like a footnote, not a pitch. If you want to include the link, put it on
its own line after the comment and keep it bare:
https://pronounce.renlab.ai — drop it only if the thread is active and friendly.

---

## After you post (applies to all)

- Sit in the comments for the first 3-4 hours. An answered thread lives; an
  idle one dies. Reply to every top-level comment, especially the "you're wrong
  about X" ones — those are gold for the data and for engagement.
- When someone corrects a pronunciation, actually fix the TSV and say you did.
  Visible responsiveness is the whole brand here.
- Never paste the same body into two subs. If a post gets removed, don't
  re-submit it the same day — ask the mods first.
- The contested/creator-clarified split is the hook everywhere; the CLI demo and
  the website are just the proof. Lead with whichever the sub cares about (the
  tool for r/commandline, the data for r/programming, the infra words for
  r/devops).
