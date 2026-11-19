// Dev Jargon 5 — deterministic selection tests.
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const { pickFive, buildQuestions, fnv1a, gradeOf, buildShareText } = require("../docs/daily/game.js");

// Load the real ENTRIES array from docs/script.js WITHOUT evaluating it: the
// file touches `document` at the bottom, and evaluating generated source is
// exactly the dynamic-execution pattern the plugin scanner rejects. The build
// only ever emits `{ key: "string", … }` object literals, so read that shape
// directly and fail loudly on anything else.
function loadEntries() {
  const src = readFileSync(new URL("../docs/script.js", import.meta.url), "utf8");
  const start = src.indexOf("const ENTRIES = [");
  assert.ok(start !== -1, "ENTRIES literal not found in script.js");
  const end = src.indexOf("\n];", start);
  assert.ok(end !== -1, "ENTRIES literal end not found");
  return parseObjectList(src.slice(start, end));
}

function parseObjectList(literal) {
  const entries = [];
  const isIdent = (c) => /[A-Za-z0-9_$]/.test(c);
  let cur = null;
  let key = null;
  let i = literal.indexOf("[") + 1;
  const skipWs = () => {
    while (i < literal.length && /\s/.test(literal[i])) i++;
  };
  while (i < literal.length) {
    const ch = literal[i];
    if (ch === "{") {
      cur = {};
      key = null;
      i++;
    } else if (ch === "}") {
      assert.ok(cur, "unbalanced '}' in ENTRIES literal");
      entries.push(cur);
      cur = null;
      i++;
    } else if (ch === '"') {
      let out = "";
      i++;
      for (;;) {
        assert.ok(i < literal.length, "unterminated string in ENTRIES literal");
        if (literal[i] === "\\") {
          const esc = literal[i + 1];
          out += esc === "n" ? "\n" : esc === "t" ? "\t" : esc;
          i += 2;
          continue;
        }
        if (literal[i] === '"') {
          i++;
          break;
        }
        out += literal[i++];
      }
      assert.ok(cur !== null && key !== null, "string value with no key in ENTRIES literal");
      cur[key] = out;
      key = null;
    } else if (/[A-Za-z_$]/.test(ch)) {
      let id = "";
      while (i < literal.length && isIdent(literal[i])) id += literal[i++];
      skipWs();
      assert.equal(literal[i], ":", "expected ':' after key " + id);
      i++;
      skipWs();
      assert.equal(literal[i], '"', "expected a string value for key " + id);
      key = id;
    } else {
      i++;
    }
  }
  return entries;
}

const ENTRIES = loadEntries();

test("script.js ENTRIES loaded and sane", () => {
  assert.ok(ENTRIES.length > 1900, "unexpectedly small: " + ENTRIES.length);
});

test("fnv1a is deterministic and date-sensitive", () => {
  assert.equal(fnv1a("nginx|2026-11-08"), fnv1a("nginx|2026-11-08"));
  assert.notEqual(fnv1a("nginx|2026-11-08"), fnv1a("nginx|2026-11-09"));
});

test("pickFive: 5 unique words, stable across calls", () => {
  const a = pickFive(ENTRIES, "2026-11-08");
  const b = pickFive(ENTRIES, "2026-11-08");
  assert.equal(a.length, 5);
  assert.deepEqual(a.map((e) => e.w), b.map((e) => e.w));
  const words = a.map((e) => e.w.toLowerCase());
  assert.equal(new Set(words).size, 5);
  for (const e of a) assert.ok(e.r, "picked entry lacks respelling: " + e.w);
});

test("pickFive: different dates yield different sets", () => {
  const a = pickFive(ENTRIES, "2026-11-08").map((e) => e.w);
  const b = pickFive(ENTRIES, "2026-11-09").map((e) => e.w);
  assert.notDeepEqual(a, b);
});

test("buildQuestions: 3 distinct options, answer points at the true respelling", () => {
  const five = pickFive(ENTRIES, "2026-11-08");
  const qs = buildQuestions(five, ENTRIES, "2026-11-08");
  assert.equal(qs.length, 5);
  for (const q of qs) {
    assert.equal(q.options.length, 3, q.w);
    assert.equal(new Set(q.options).size, 3, "duplicate option for " + q.w);
    assert.ok(q.answer >= 0 && q.answer <= 2);
    const correct = five.find((e) => e.w === q.w);
    assert.equal(q.options[q.answer], correct.r);
  }
});

test("buildQuestions: deterministic", () => {
  const five = pickFive(ENTRIES, "2026-11-09");
  const a = buildQuestions(five, ENTRIES, "2026-11-09");
  const b = buildQuestions(five, ENTRIES, "2026-11-09");
  assert.deepEqual(a, b);
});

test("buildQuestions: 3-week streak of days all build cleanly", () => {
  for (let d = 1; d <= 21; d++) {
    const date = "2026-11-" + String(d).padStart(2, "0");
    const five = pickFive(ENTRIES, date);
    const qs = buildQuestions(five, ENTRIES, date);
    assert.equal(qs.length, 5, date);
  }
});

test("todayISO is UTC-based: same instant, one date everywhere", () => {
  const { todayISO } = require("../docs/daily/game.js");
  // 2026-11-09T00:30Z is still 2026-11-08 evening in the Americas.
  const instant = new Date(Date.UTC(2026, 10, 9, 0, 30));
  const la = todayISO(instant); // reads UTC fields, so host TZ cannot leak in
  assert.equal(la, "2026-11-09");
  assert.equal(todayISO(new Date(Date.UTC(2026, 0, 2, 23, 59))), "2026-01-02");
});

test("prevDayISO crosses month and leap-year boundaries in UTC", () => {
  const { prevDayISO } = require("../docs/daily/game.js");
  assert.equal(prevDayISO("2026-11-09"), "2026-11-08");
  assert.equal(prevDayISO("2026-03-01"), "2026-02-28"); // 2026 is not a leap year
  assert.equal(prevDayISO("2028-03-01"), "2028-02-29"); // 2028 is
  assert.equal(prevDayISO("2027-01-01"), "2026-12-31");
});

test("nextStreak: consecutive days extend, replay keeps, gap resets, garbage resets", () => {
  const { nextStreak } = require("../docs/daily/game.js");
  assert.deepEqual(nextStreak(null, "2026-11-09"), { last: "2026-11-09", n: 1 });
  assert.deepEqual(nextStreak(undefined, "2026-11-09"), { last: "2026-11-09", n: 1 });
  assert.deepEqual(nextStreak({ last: "2026-11-08", n: 3 }, "2026-11-09"), { last: "2026-11-09", n: 4 });
  assert.deepEqual(nextStreak({ last: "2026-11-09", n: 4 }, "2026-11-09"), { last: "2026-11-09", n: 4 });
  assert.deepEqual(nextStreak({ last: "2026-11-05", n: 9 }, "2026-11-09"), { last: "2026-11-09", n: 1 });
  assert.deepEqual(nextStreak({ last: "2026-11-08", n: 0 }, "2026-11-09"), { last: "2026-11-09", n: 1 });
  assert.deepEqual(nextStreak({ last: "not-a-date", n: 5 }, "2026-11-09"), { last: "2026-11-09", n: 1 });
  // Tampered types must reset, never coerce: "5" + 1 === "51" would corrupt.
  assert.deepEqual(nextStreak({ last: "2026-11-08", n: "5" }, "2026-11-09"), { last: "2026-11-09", n: 1 });
  assert.deepEqual(nextStreak({ last: "2026-11-08", n: true }, "2026-11-09"), { last: "2026-11-09", n: 1 });
  assert.deepEqual(nextStreak({ last: "2026-11-08", n: Infinity }, "2026-11-09"), { last: "2026-11-09", n: 1 });
});

test("index.html wires streak storage, start badge, and share line", () => {
  const html = readFileSync(new URL("../docs/daily/index.html", import.meta.url), "utf8");
  assert.ok(html.includes('id="j5-streak"'), "start-card streak element missing");
  assert.ok(html.includes('STREAK_KEY = "j5-streak"'), "streak storage key missing");
  assert.ok(html.includes("DailyGame.nextStreak(readStreak(), date)"), "result-card streak advance missing");
  assert.ok(html.includes("-day streak"), "share streak line missing");
});

test("gradeOf: 5→S, 4→A, 3→B, else C", () => {
  assert.equal(gradeOf(5), "S");
  assert.equal(gradeOf(4), "A");
  assert.equal(gradeOf(3), "B");
  assert.equal(gradeOf(2), "C");
  assert.equal(gradeOf(0), "C");
});

test("buildShareText: byte-pins the clipboard block, with and without streak", () => {
  const marks = [true, false, true, true, true];
  assert.equal(
    buildShareText({ date: "2026-11-19", marks, streak: null }),
    "Dev Jargon 5 · 2026-11-19\n🔊🟩⬛🟩🟩🟩 4/5\nhow many dev words can you say?\nhttps://pronounce.renlab.ai/daily"
  );
  assert.equal(
    buildShareText({ date: "2026-11-19", marks, streak: { last: "2026-11-19", n: 3 } }),
    "Dev Jargon 5 · 2026-11-19\n🔊🟩⬛🟩🟩🟩 4/5\n🔥 3-day streak\nhow many dev words can you say?\nhttps://pronounce.renlab.ai/daily"
  );
});

test("score card wired: page renders image card and uses the shared share-text builder", () => {
  const html = readFileSync(new URL("../docs/daily/index.html", import.meta.url), "utf8");
  assert.ok(html.includes("Save score card"), "save-card button missing");
  assert.ok(html.includes("DailyGame.buildShareText"), "page still hand-rolls share text");
  assert.ok(html.includes("drawCard"), "canvas card renderer missing");
  assert.ok(html.includes("navigator.canShare"), "Web Share file branch missing");
});

// Two shipped card bugs, both reproduced in real Chrome by the adversarial
// review: (1) the word was measured under the 19px respelling font while
// drawn at 26px, so long words let the respelling overprint them
// ("continual-learning" et al. on hash-deterministic dates); (2) on a 5/5
// card the footer divider inherited the grade ring's 6px orange stroke.
// Both are ordering/state pins on the drawCard source — Node has no canvas,
// so the guard is structural.
test("drawCard geometry: word measured under its own font; divider sets its own stroke", () => {
  const html = readFileSync(new URL("../docs/daily/index.html", import.meta.url), "utf8");
  const start = html.indexOf("function drawCard");
  const end = html.indexOf("function saveCard");
  assert.ok(start !== -1 && end !== -1, "drawCard/saveCard not found");
  const seg = html.slice(start, end);
  const wordDraw = seg.indexOf("x.fillText(qs[j].w, 654, ry)");
  const wordMeasure = seg.indexOf("wordW = x.measureText(qs[j].w).width");
  const respFont = seg.indexOf('"500 19px "');
  assert.ok(wordDraw !== -1 && wordMeasure !== -1 && respFont !== -1, "row-draw block reshaped");
  assert.ok(wordDraw < wordMeasure && wordMeasure < respFont,
    "word width must be captured while the 26px font is active, before switching to the 19px respelling font");
  const divider = seg.indexOf("x.moveTo(72, 560)");
  const dividerStroke = seg.lastIndexOf("x.strokeStyle =", divider);
  const ringStroke = seg.indexOf('x.strokeStyle = "#ff6a3d"');
  assert.ok(divider !== -1 && dividerStroke !== -1,
    "footer divider must set strokeStyle/lineWidth itself, not inherit the grade ring's");
  assert.ok(ringStroke === -1 || dividerStroke > ringStroke);
});
