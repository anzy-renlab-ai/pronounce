// Dev Jargon 5 — deterministic daily selection. No DOM here on purpose:
// tools/test-daily.mjs requires this file via CommonJS and pins
// determinism; the page consumes window.DailyGame.
(function (global) {
  "use strict";

  // Deterministic 32-bit FNV-1a — same string, same number, everywhere.
  function fnv1a(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)) >>> 0;
    }
    return h >>> 0;
  }

  function eligible(entries) {
    return entries.filter(function (e) {
      return e && e.w && e.r && e.w.length <= 18;
    });
  }

  // 5 entries per date, identical for every visitor on the same deploy:
  // rank by hash(slug|date), take the 5 smallest, dedupe by slug.
  function pickFive(entries, date) {
    var ranked = eligible(entries)
      .map(function (e) { return { e: e, k: fnv1a(e.w.toLowerCase() + "|" + date) }; })
      .sort(function (a, b) {
        return a.k - b.k || (a.e.w.toLowerCase() < b.e.w.toLowerCase() ? -1 : 1);
      });
    var seen = {};
    var out = [];
    for (var i = 0; i < ranked.length && out.length < 5; i++) {
      var w = ranked[i].e.w.toLowerCase();
      if (seen[w]) continue;
      seen[w] = 1;
      out.push(ranked[i].e);
    }
    return out;
  }

  function slugOf(word) {
    return word.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
  }

  // Each question: hear the word (page calls playEntry), pick the right
  // respelling among 3. Distractors are deterministic per (date, word).
  function buildQuestions(five, all, date) {
    return five.map(function (correct) {
      var cr = correct.r.toLowerCase();
      var pool = all.filter(function (e) {
        return e && e.w && e.r && e.w !== correct.w &&
          e.r.toLowerCase() !== cr &&
          e.r.length <= 30;
      });
      var ranked = pool
        .map(function (e) {
          return { e: e, k: fnv1a(e.w.toLowerCase() + "|" + correct.w.toLowerCase() + "|" + date) };
        })
        .sort(function (a, b) {
          return a.k - b.k || (a.e.w.toLowerCase() < b.e.w.toLowerCase() ? -1 : 1);
        });
      var options = [correct, ranked[0].e, ranked[1].e];
      var seedBase = "ord|" + date + "|" + correct.w.toLowerCase() + "|";
      var order = [0, 1, 2].sort(function (a, b) {
        return fnv1a(seedBase + a) - fnv1a(seedBase + b);
      });
      return {
        w: correct.w,
        slug: slugOf(correct.w),
        options: order.map(function (i) { return options[i].r; }),
        answer: order.indexOf(0),
        ipa: correct.ipa || "",
        note: correct.notes || "",
        cat: correct.cat || "",
        conf: correct.conf || "",
      };
    });
  }

  // UTC date — the five words roll over at the same instant for every
  // visitor, keeping the "same five for everyone" promise timezone-true.
  function todayISO(d) {
    d = d || new Date();
    return d.getUTCFullYear() + "-" +
      String(d.getUTCMonth() + 1).padStart(2, "0") + "-" +
      String(d.getUTCDate()).padStart(2, "0");
  }

  // UTC day before a YYYY-MM-DD string (also a UTC date), for streak math.
  function prevDayISO(date) {
    var d = new Date(date + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() - 1);
    return todayISO(d);
  }

  // Streak advance for finishing today's game: consecutive UTC days extend
  // the run, replaying today keeps it, any gap resets to 1. Pure — tests pin it.
  // prev.n must be a real number: ">=" alone would let tampered strings
  // through ("5" + 1 === "51") and corrupt the stored streak.
  function nextStreak(prev, today) {
    if (!prev || typeof prev.last !== "string" ||
        typeof prev.n !== "number" || !isFinite(prev.n) || prev.n < 1) {
      return { last: today, n: 1 };
    }
    if (prev.last === today) return { last: today, n: prev.n };
    if (prev.last === prevDayISO(today)) return { last: today, n: prev.n + 1 };
    return { last: today, n: 1 };
  }

  var api = {
    fnv1a: fnv1a, pickFive: pickFive, buildQuestions: buildQuestions,
    todayISO: todayISO, prevDayISO: prevDayISO, nextStreak: nextStreak,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.DailyGame = api;
})(typeof window !== "undefined" ? window : globalThis);
