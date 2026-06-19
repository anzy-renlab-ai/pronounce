# Upstream pronunciation-note PRs — target list (NEEDS HUMAN APPROVAL before opening)

The play (per Codex consult, 2026-06-19): open *tiny, genuinely-useful* doc PRs to
high-authority project repos adding one cited pronunciation line. Goal = real-domain
backlinks + maintainer visibility + legit discovery. This is NOT awesome-list spam.

**Bar for inclusion (all must hold):**
1. The name is genuinely, repeatedly mispronounced (search the repo issues for "pronounce").
2. There's a natural home for the line (README intro, docs glossary, FAQ, a CONTRIBUTING note).
3. We have a strong sourced entry already.
4. The addition reads as a contribution, not an ad: no link required; cite the *creator's own*
   statement where possible, link our page only as the audio/source.

**Rule: the agent drafts; a human opens the PR (or explicitly approves each).** Mass-PRing
docs reads as spam and burns the project's reputation. Approve/prune this list first.

| # | Repo | Why it fits | Proposed one-liner | Source to cite | Receptiveness / risk |
|---|------|-------------|--------------------|----------------|----------------------|
| 1 | `ghostty-org/ghostty` | Coined name, constant "how do you say it" Qs; creator (Mitchell Hashimoto) is doc-friendly | "Ghostty is pronounced *GHOST-ee*." in README intro | creator statements / our /word/ghostty | Med-high. Active, opinionated maintainer — must be genuinely wanted; check existing discussion first |
| 2 | `kubernetes/kubectl` (or website docs) | The canonical dev pronunciation fight; "koob-control vs cube-cuttle" | a glossary/FAQ note: "kubectl — community readings vary; see [pronunciation]" | Kelsey Hightower talks, our /word/kubectl | LOW-med. Huge project, heavy PR process; better as a docs/glossary issue first |
| 3 | `toml-lang/toml` | Preston-Werner settled it (rhymes with knoll) but people still spell it out | "TOML is pronounced like *Tom-ell* / rhymes with 'knoll'." | Tom Preston-Werner (on record) | Med. Small, settled debate; a clean cite is welcome |
| 4 | `tcltk/tcl` or docs | "tickle" vs "T-C-L" — Ousterhout settled it | note: "Tcl is pronounced *tickle*." | John Ousterhout | Med. Old, stable project; docs PRs may sit |
| 5 | `qdrant/qdrant` | "Qdrant (read: quadrant)" already in their README — natural ally, may link back | propose adding an audio/pronunciation link to their existing note | their own README line | Med-high. They already care about it; low-friction |
| 6 | `pkl-lang/pkl` (Apple) | "pronounced Pickle" — they announced it; good fit for a glossary cross-link | n/a (they state it) → instead: contribute our entry, ask for a backlink in docs | Apple Pkl launch post | Low-med. Corporate repo, slower |
| 7 | `nostr-protocol/nostr` | "NOH-ster" vs "noster" genuinely split | FAQ note with the two readings | community / our /word/nostr | Med. Community-run, receptive to docs |
| 8 | `cilium/cilium` | "SIL-ee-um" vs "kill-ee-um" debated | glossary note | maintainer talks, our /word/cilium | Med. CNCF, has docs site |

## Recommended first batch (lowest risk, highest fit)
Start with **#5 (Qdrant)** and **#3 (TOML)** — both already acknowledge the pronunciation,
so a cite/audio link is additive, not noise. If those land cleanly, try #1 (Ghostty) and
#7 (Nostr). Hold the big-process repos (#2 kubectl, #6 Apple) unless we get a warm signal.

## Before opening ANY of these
- [ ] Search the target repo's issues/PRs for prior "pronounce"/"pronunciation" threads —
      reply there first if one exists (warmer than a cold PR).
- [ ] Confirm the doc home (don't invent a section).
- [ ] Keep the diff to one line + one link. No badges, no marketing.
- [ ] Open as the human (or with explicit per-repo approval) — never batch-fire.
