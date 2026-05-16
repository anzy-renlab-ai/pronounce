# Launch Playbook — Target: 500 GitHub stars in 7 days

This is an opinionated, executable plan. It assumes:

- The site is live at <https://pronounce.renlab.ai>
- The repo is at <https://github.com/anzy-renlab-ai/say-it>
- You can dedicate ~2-3 hours on Day 0 and ~30 min/day after.

## Honest expectation

| Scenario | Week-1 stars |
|----------|-------------:|
| Show HN passes the new-queue but doesn't hit front page | 50-150 |
| Front-page HN (#10-30) for >1 hour | 200-600 |
| Front-page HN top-10 OR 1 mid-tier creator RT | 500-2000 |
| Mega creator RT (Kelsey Hightower / Theo / Crockford) | 1000-10000 |

**500 stars in 7 days is "front-page-HN-needed" territory.** It's plausible but not guaranteed. The Famous Moments hook + audible-alt feature are unusual enough to clear the bar — your launch quality and timing matter more than the artifact at this point.

## Pre-launch checklist — DO BEFORE you announce anywhere

These are P0. Do not skip.

- [ ] **Listen to 20-30 dict entries.** Run `tools/audit-listen.sh && open .audit-audio/`. Click through `kubectl`, `nginx`, `Pydantic`, `Anthropic`, `Kubernetes`, `Cilium`, `Knative`, `Vercel`, `Postgres`, `Mistral`, `Ollama`, `LaTeX`, `Pinia`, `Cassandra`, `Velero`, every `contested` entry, the Famous Moments words. If any sound badly wrong, fix the `respelling_us` column and re-run.
- [ ] **Verify every Famous Moments source URL clicks through to the right material.** A 404 or wrong-video URL kills credibility instantly on HN. If a source can't be verified, blank the URL and downgrade `confidence` to `community-consensus`.
- [ ] **Smoke test the install path on a fresh terminal.** `git clone … && cd say-it && ./install.sh && say-it kubectl`. If anything errors, fix before launching.
- [ ] **Test the site at <https://pronounce.renlab.ai> on Safari + Chrome.** Click ▶ on a few words — Web Speech voice will differ from CLI, that's documented in the disclaimer.
- [ ] **Take a 6-10 sec demo screen recording** of the terminal showing `say-it kubectl` and `say-it GIF`. Use [asciinema](https://asciinema.org) or [Cleanshot](https://cleanshot.com) → MP4. Upload to <https://x.com/upload/video> or wherever. Pin to repo README.
- [ ] **Star + watch your own repo** (signal to GitHub trending algorithm). Have a friend or two do the same — 5-10 stars before launch isn't suspicious, it's normal.
- [ ] **Pin an issue:** "Add your favorite mispronounced project — PR welcome". Lowers contribution friction; every PR opener tends to star.

## Launch day timing

**Best window: Tuesday or Wednesday, 9:00-10:00 AM Pacific Time (17:00-18:00 UTC).**

- HN front-page algorithm rewards early traction; Tue/Wed has the most US dev eyeballs.
- Twitter dev community engagement peaks in the US-Europe overlap window (8-11 AM PT).
- Avoid Mondays (Monday blues), Fridays (lower retention), weekends (US devs offline).

Launch order on Day 0:
1. **9:00 AM PT** — post Show HN
2. **9:05 AM PT** — Twitter thread goes live
3. **9:10 AM PT** — DMs to 5 targeted creators
4. **9:30 AM PT** — r/devops post (different title)
5. **10:00 AM PT** — r/programming post (yet another title)
6. **11:00 AM PT** — Lobste.rs submission
7. **Throughout the day:** reply to every HN comment; thank every star; retweet engaging replies

## Channel #1: Show HN

```
Title: Show HN: A dictionary of how engineers actually pronounce kubectl, nginx, GIF
URL: https://pronounce.renlab.ai
```

(One-line summary in the title is what HN voters scan. "Show HN: pronouncing tools" is too vague — front-load the specific examples.)

Body (write into the first comment, since HN posts can't have a body when there's a URL):

```
I built this after the 47th time I heard a coworker say "kub-cuttle" and finally
realized I'd been saying it that way for six months too.

It's a community-maintained dictionary of how engineers actually pronounce
project, product, and programmer-jargon names — kubectl, nginx, GIF, JSON,
Pydantic, Knative, LaTeX, Postgres, GUI, GNU, and ~170 more. Every entry tagged
with a confidence level (creator-clarified / community-consensus / contested)
and (where possible) linked to a source — official FAQ, Wikipedia § Pronunciation,
creator interview.

For multi-reading words, the CLI audibly chains the alternates after the primary
("jif. jif. jif. or: gif."), so you hear the debate without having to read the
terminal.

The CLI is a ~250-line Bash script wrapping macOS `say`. There's also a Claude
Code skill so "how do you pronounce X?" prompts get answered with audio + a
source URL instead of a phonetic guess.

GitHub: https://github.com/anzy-renlab-ai/say-it
MIT, contributions very welcome — especially for the contested entries.

Things I learned writing this that surprised me:
- Modern macOS `say` does not parse `[[inpt PHON]]` markup or SSML phoneme tags
  any more (both fall through as literal text — I checked empirically). So the
  dictionary ships English-like respellings rather than phonemes.
- `[[slnc N]]` IS still honored, so the inter-rep pauses are real silence.
- "giff" gets pronounced /dʒɪf/ by Samantha, same as "jif" — the engine has an
  internal lexicon override. You have to write "gif" (single f, lowercase) to
  get the hard-G.

Windows/Linux backends and cloud TTS (ElevenLabs, OpenAI) are M2-M3 on the
roadmap.
```

When the post hits the new queue, reload `news.ycombinator.com/newest` and find your submission. Have 2-3 friends ready to upvote within the first 10 minutes — this is **not** astroturfing if they're real users who actually find it useful, it's signal. The HN algorithm needs early signal to surface a post.

## Channel #2: Twitter / X thread

20-tweet "Famous Moments" thread. Each tweet = one contested word + a punchy line + a link.

**Tweet 1** (anchor — drives the whole thread):

```
20 project names I bet you're pronouncing wrong (with receipts from the
creators themselves) 🧵

I built a CLI that plays them out loud, with citations. The thread is the
free version — the tool just makes you actually hear it.

🔊 https://pronounce.renlab.ai
```

**Tweet 2-19** template (one per word):

```
{N}/

{word} — the one most engineers get wrong.

Most common: "{respelling}" ({ipa})
{One-line context}

Source: {source_label} → {source_url}

The CLI: `say-it {word}` plays it 3×.
```

Pre-write 18 of these. Suggested words (highest "huh I didn't know" factor):

1. **GIF** — "jif" per Wilhite at the 2013 Webbys
2. **JSON** — Crockford prefers "JAY-son"
3. **GNU** — "g-noo", one syllable
4. **Linux** — "LIN-ux" per Linus himself
5. **kubectl** — "koob-control" (Kelsey Hightower)
6. **LaTeX** — "lay-tek", documented by Leslie Lamport
7. **char** — "char" rhymes with "car" in C/C++ world
8. **Django** — silent D, "JANG-go"
9. **GUI** — "gooey" (matches Mandarin 故意 sound)
10. **nginx** — "engine-x", per Igor Sysoev
11. **Pydantic** — "pie-DAN-tic" (Samuel Colvin)
12. **etcd** — "et-cetera-distributed" per Brandon Philips
13. **PostgreSQL** — "post-gres-Q-L", per the FAQ
14. **Knative** — "KAY-native" (the K is voiced)
15. **Cassandra** — "kuh-SAN-druh"
16. **Vue** — "view" (one syllable, per Evan You)
17. **Vite** — "veet" (French for "quick")
18. **NaN** — divisive: "nan" or "N-A-N"?

**Tweet 20** (CTA):

```
20/

That's just the loud ones — there are 170+ in the full dict, plus a Claude
Code skill that turns "how do you pronounce X?" into audio with a source.

If you've been saying any of these wrong, the cure is hearing them three times.

▶ pronounce.renlab.ai
⭐ https://github.com/anzy-renlab-ai/say-it
```

Tag 2-3 relevant people in the relevant tweets — Kelsey Hightower (kubectl), Linus on Linux (low chance of response but raises odds of someone in their orbit retweeting), Crockford if findable, Evan You.

## Channel #3: DMs to specific creators

Don't @-tag them on the thread; send a personal DM. Generic at-tags get ignored.

Template (personalize the bracketed parts):

```
Hey — I just shipped a tiny dev tool that needed your call on something.

It's a community pronunciation dictionary for project names —
pronounce.renlab.ai. The entry for [their project] cites you (or your team)
as the canonical reading of [pronunciation]. You can see it here:
https://pronounce.renlab.ai/word/[slug]

Two reasons I'm sending this:
1. If I got the reading wrong, I'd rather hear it from you than from
   replies on Hacker News.
2. If you'd RT the launch (currently on the HN front page / Twitter), it
   would mean a lot — the project is small and a signal from you would
   make it findable.

Either way, I appreciate everything you've done for [their project / 
community]. Thanks.
```

Top 5 DM targets (highest EV):

| Who | What | Where |
|-----|------|-------|
| Kelsey Hightower | "koob-control" reading of kubectl, also a notable retweeter | <https://twitter.com/kelseyhightower> |
| Evan You | Vue / Vite — both in the dict, single-syllable readings | <https://twitter.com/youyuxi> |
| Theo (t3.gg) | dev-tool reviewer, frequent retweeter of new tools | <https://twitter.com/t3dotgg> |
| swyx | dev-tool curator, well-followed | <https://twitter.com/swyx> |
| Samuel Colvin (Pydantic) | "pie-DAN-tic" — direct connection | <https://twitter.com/samuel_colvin> |

Plus optionally: Salvatore Sanfilippo (Redis), Douglas Crockford (JSON — old-school, prefers email).

**Expected response rate: 1 in 5 will engage.** Even one mid-tier retweet adds 200-1000 stars.

## Channel #4: Reddit

Post to three subs the same day, but with **different angles** in the titles. Cross-posting identical text triggers spam filters.

**r/programming** (700k subs):

```
Title: How to pronounce kubectl, nginx, GIF, and 170+ project names —
       with creator citations
```

**r/devops** (150k subs):

```
Title: A small CLI for how to actually pronounce kubectl (and 12 other
       K8s tools your team mispronounces)
```

**r/commandline** (45k subs):

```
Title: say-it — a Bash CLI that wraps macOS `say` and a community
       dictionary of how engineers really pronounce things
```

For each: post the link, top comment yourself with a 3-paragraph context (problem → what it does → "here's the GitHub if you'd star"). Reply to every commenter.

## Channel #5: Lobste.rs (Day 1 evening or Day 2)

Smaller audience than HN but high quality. Wait until Day 2 if HN works (don't burn channels in parallel).

```
Title: A pronunciation dictionary for the project names engineers actually 
       mispronounce
URL: https://pronounce.renlab.ai
Tags: practices, programming
```

## Channel #6: dev.to / Hashnode / Medium long-form article

Publish ~24-48 hours after HN. Title: **"20 Project Names You've Been Pronouncing Wrong (with creator receipts)"**. Embed the Famous Moments + screenshots. End with a CTA to the GitHub. Cross-post to your personal blog if you have one. Tag it `#opensource #cli #devtools`.

Long-form content has a tail — the article keeps pulling traffic for months after the HN spike fades.

## Daily playbook

### Day 0 (Tuesday or Wednesday)
- 9:00 PT Show HN goes live; immediately post body comment
- 9:05 PT Twitter thread goes live
- 9:10 PT DM 5 creators
- 9:30 PT r/devops post
- 10:00 PT r/programming post
- 11:00 PT keep replying to comments
- **Throughout the day:** reply to *every* HN comment within 15 min; reply to every Twitter quote-tweet; thank every star

### Day 1
- Check HN: if still ranked, keep replying. If dropped, **don't bump artificially**.
- r/commandline post (saved for day 2 if HN was great on Day 0)
- Lobste.rs post
- Reply to creators who engaged on Day 0; ask if they'd consider a follow-up RT
- **Self-RT** the Twitter thread with a "morning bump" + 1 new insight ("update: X stars in Y hours, here's what folks are adding")

### Day 2
- dev.to long-form article goes live; share on Twitter + LinkedIn
- Submit to [TLDR Newsletter](https://tldr.tech/submit) and [Pointer](https://www.pointer.io/) for inclusion in their dev digest
- Submit to [Daily.dev](https://app.daily.dev/squads) (auto-pulls from GitHub if it has trending signal)
- Reach out to any podcast hosts in your network (Changelog, Software Engineering Daily) — short pitch

### Day 3
- Sync the dict with any PRs that came in
- Cut a v0.1.2 release that highlights new community-added words
- Tweet the release: "Day 3 update — added [these] thanks to [these contributors]"

### Day 4-6
- Continue adding entries (PRs + your own additions)
- Twitter: one mini-thread per day on a SPECIFIC word ("Quick PSA: nginx is officially 'engine-x' — here's the Igor Sysoev source"). Each one drives a small bump.
- LinkedIn post if your audience there is engineering-adjacent
- Slack/Discord communities you're in: share once per community (don't spam)

### Day 7
- Retrospective tweet: "1 week in: X stars, Y contributors, Z words added. Here's what surprised me about how devs pronounce …"
- Email anyone who DM'd / engaged on Day 0 with a thank-you
- Pin a "Star history" chart screenshot (star-history.t9t.io)

## Reply tactics

These multiply the leverage of every channel:

- **In every HN comment thread**, point one comment at the live site URL (not the repo). Page views convert to stars at a higher rate than direct repo links.
- **When someone says "you got X wrong"**, thank them, ask for the right reading + source URL, and offer to credit them in the commit message. Many of these turn into PRs.
- **When someone says "you should add Y"**, reply "great call, I'll add it in v0.1.2 today" and actually do it within an hour. Real-time responsiveness builds momentum.
- **On Twitter**, every quote-tweet is free distribution. Reply to all of them within 30 min.

## Stretch wins

- If a big creator RTs: cut a "v0.1.X — [their project] update" the same day with their citation prominent.
- If HN front-page: tweet the front-page screenshot ("we're on HN front page"); pin to repo.
- If you cross 200 stars on Day 0: pitch [Hacker News Newsletter](https://hnpicks.com/) for inclusion.

## Anti-patterns — don't

- ❌ "⭐ Please star" in any copy. Triggers the cringe immune system.
- ❌ Post the same text across HN + Reddit + Twitter at exactly the same time. Looks coordinated. Stagger.
- ❌ Astroturf with sockpuppet accounts. Detectable. Career-ending.
- ❌ Launch incomplete. If `kubectl` came out wrong in your last test, fix it BEFORE launching.
- ❌ Promise features that don't exist. Roadmap items are OK; "Windows support" claimed as shipping today is not.
- ❌ Argue with critics. Thank them, fix what's fixable, ignore what isn't.

## After the launch

If you hit 500 stars: cut a v0.2 with the actual top-3 community-requested features (probably cloud TTS, a brew formula, and Windows backend in that order).

If you don't hit 500: don't sweat it. The site has compounding SEO — `/word/<slug>` pages will keep ranking for "how to pronounce X" queries for months. Star count from organic search alone tends to be 10-30/month for tools with this kind of search profile, which adds up.
