// Dev Jargon 5 — deterministic selection tests.
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const { pickFive, buildQuestions, fnv1a } = require("../docs/daily/game.js");

// Load the real ENTRIES array from docs/script.js WITHOUT evaluating the
// whole file (it touches `document` at the bottom). Slice the literal only.
function loadEntries() {
  const src = readFileSync(new URL("../docs/script.js", import.meta.url), "utf8");
  const start = src.indexOf("const ENTRIES = [");
  assert.ok(start !== -1, "ENTRIES literal not found in script.js");
  const end = src.indexOf("\n];", start);
  assert.ok(end !== -1, "ENTRIES literal end not found");
  const literal = src.slice(start, end + 3); // include "\n];"
  return new Function(literal + "\nreturn ENTRIES;")();
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
