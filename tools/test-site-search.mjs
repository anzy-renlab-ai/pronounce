// The landing page answers "heard it, cannot spell it" queries with a
// sounds-like fallback. That code lives inline in tools/build-site.sh (it is
// injected verbatim into docs/index.html), so this test extracts the shipped
// source and exercises it — if the extraction stops finding the functions, the
// feature silently disappeared from the page and this fails.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function extractFunctions() {
  const src = readFileSync(join(REPO_ROOT, "tools", "build-site.sh"), "utf8");
  const start = src.indexOf("function soundKey(s)");
  assert.ok(start > 0, "soundKey() is gone from tools/build-site.sh");
  const begin = src.indexOf("function soundMatches(q)");
  assert.ok(begin > start, "soundMatches() is gone from tools/build-site.sh");
  // Walk soundMatches' body brace-by-brace; the block ends when depth returns
  // to zero. Everything from soundKey to here is what the pages actually run.
  let i = src.indexOf("{", begin), depth = 0;
  for (; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  return src.slice(start, i + 1);
}

const ENTRIES = [
  { w: "nginx", r: "engine X", ipa: "" },
  { w: "kubectl", r: "koob control", ipa: "" },
  { w: "JSON", r: "jay son", ipa: "" },
  { w: "Python", r: "pie thon", ipa: "" },
  { w: "jQuery", r: "JAY kwery|jay QUERY", ipa: "" },
];

const soundMatches = new Function(
  "ENTRIES",
  `${extractFunctions()}\nreturn soundMatches;`,
)(ENTRIES);

const top = (q) => (soundMatches(q)[0] || {}).w;

test("heard-it-misspelled queries land on the right word", () => {
  assert.equal(top("engine x"), "nginx");
  assert.equal(top("en gin ex"), "nginx");
  assert.equal(top("kube control"), "kubectl");
  assert.equal(top("jason"), "JSON");
  assert.equal(top("pie thon"), "Python");
});

test("alternate respellings are searched too", () => {
  assert.equal(top("jay query"), "jQuery");
});

test("no skeleton match means no suggestions", () => {
  assert.deepEqual(soundMatches("zzzzqqqq"), []);
  assert.deepEqual(soundMatches(""), []);
});
