// Phonetic ("sounds-like") matching for the pronunciation dictionary.
//
// The dictionary's real query pattern is not "I know the word, how is it
// said?" — it is "I heard this word out loud and I cannot spell it":
// someone hears *nginx* and types "engine x"; hears *kubectl* and types
// "kube control"; hears *JSON* and types "jason". A substring search over
// the spelling answers none of those. This module reduces both sides to a
// sound, so they land on the same key.
//
// Deliberately English-only and rule-based: no dependency, no shipped data
// file, small enough to run inside the site's client-side search box.

/** Lowercase letters and single spaces. Drops digits/punctuation. */
export function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

/** Spelling -> consonant-ish sound skeleton, vowels collapsed away. */
export function soundKey(s) {
  let t = normalize(s).replace(/ /g, '');
  if (!t) return '';
  // Order matters: digraphs before single letters, and `c` before `q`.
  t = t
    .replace(/you/g, 'u') // "you boon too" -> "u boon too" (Ubuntu)
    .replace(/ph/g, 'f')
    .replace(/ck/g, 'k')
    .replace(/qu/g, 'kw')
    .replace(/wh/g, 'w')
    .replace(/x/g, 'ks')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/z/g, 's')
    .replace(/(.)\1+/g, '$1');
  // Every vowel run becomes one `a`; keeping one marker preserves the
  // syllable beat, which is what separates "pi test" from "pytest"-as-missed.
  t = t.replace(/[aeiou]+/g, 'a');
  return t;
}

/** Vowel-free skeleton: the most forgiving key ("jason" === "json"). */
export function consonantKey(s) {
  return soundKey(s).replace(/a/g, '');
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[b.length];
}

/**
 * 0–100. Exact sound wins; equal skeletons are near-misses worth showing;
 * short keys are penalised for distance so "go" doesn't match everything.
 */
export function score(query, candidate) {
  const q = soundKey(query);
  const c = soundKey(candidate);
  if (!q || !c) return 0;
  if (q === c) return 100;
  const qk = consonantKey(query);
  const ck = consonantKey(candidate);
  if (qk === ck) return 88;
  const d = levenshtein(qk, ck);
  const longest = Math.max(qk.length, ck.length);
  if (!longest) return 0;
  if (d > 2 || Math.abs(qk.length - ck.length) > 2) return 0;
  // Two edits on a 4-letter skeleton is a different word; one edit is not.
  if (longest < 4 && d > 1) return 0;
  return Math.round(70 - (d / longest) * 40);
}

/**
 * Rank dictionary entries against what the user typed.
 *
 * `entries` may be `{w, r, r2}` (word, respelling, alt respelling) or the
 * site's `{word, respelling}`. Every spelling variant is scored; the entry's
 * best variant wins, so "kube control" matches kubectl's *respelling*
 * "koob control" even though its spelling looks nothing like it.
 */
export function soundsLike(entries, query, limit = 8) {
  const out = [];
  for (const e of entries) {
    const w = e.w || e.word || '';
    if (!w) continue;
    const variants = [w, e.r || e.respelling || '', e.r2 || e.alt_respelling || '']
      .flatMap((v) => String(v || '').split('|'))
      .filter(Boolean);
    let best = 0;
    for (const v of variants) {
      const s = score(query, v);
      if (s > best) best = s;
    }
    if (best > 0) out.push({ entry: e, score: best });
  }
  out.sort((a, b) => b.score - a.score || (a.entry.w || a.entry.word).length - (b.entry.w || b.entry.word).length);
  return out.slice(0, limit);
}
