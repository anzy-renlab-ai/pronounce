// The landing page answers "heard it, cannot spell it" queries with a
// sounds-like fallback. That code lives inline in tools/build-site.sh (it is
// injected verbatim into docs/index.html), so this test extracts the shipped
// source and exercises it — if the extraction stops finding the functions, the
// feature silently disappeared from the page and this fails.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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
  { w: "Apache", r: "uh patch ee", ipa: "" },
];

// Execute the extracted source as a real module: write it to a temp .mjs and
// import it. No eval / Function constructor — the scanner treats those as high
// severity, and this runs the repo's own source rather than a string.
async function loadModule(source, names, prelude = "") {
  const dir = mkdtempSync(join(tmpdir(), "site-search-"));
  const file = join(dir, "probe.mjs");
  writeFileSync(file, `${prelude}${source}\nexport { ${names.join(", ")} };\n`);
  return import(pathToFileURL(file).href);
}

const { soundMatches, soundKey } = await loadModule(
  extractFunctions(),
  ["soundMatches", "soundKey"],
  `const ENTRIES = ${JSON.stringify(ENTRIES)};\n`,
);

// The landing page's command palette carries a second copy of the same idea
// (docs/v2/eggs.jsx) because the React app does not load script.js. Two copies
// that drift apart would answer the same query differently on two pages of the
// same site, so this compares them directly.
function extractV2() {
  const src = readFileSync(join(REPO_ROOT, "docs", "v2", "eggs.jsx"), "utf8");
  const start = src.indexOf("function soundKey(s)");
  assert.ok(start > 0, "soundKey() is gone from docs/v2/eggs.jsx");
  const begin = src.indexOf("function entrySoundKeys(d)");
  assert.ok(begin > start, "entrySoundKeys() is gone from docs/v2/eggs.jsx");
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

const v2 = await loadModule(extractV2(), ["soundKey", "entrySoundKeys"]);

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

test("a respelling's filler vowel does not change its skeleton", () => {
  // "uh" is a schwa: the h is not a sound. Without the vowel+h rule this query
  // keeps a stray h the dictionary's respelling does not have.
  assert.equal(top("a patch ee"), "Apache");
  assert.equal(soundKey("uh patch ee"), soundKey("a patch ee"));
});

test("doubled letters collapse to one, not to nothing", () => {
  // The collapse replacement lost its capture group once ($1 expanded to an
  // empty positional in the build heredoc), which deleted the letters instead
  // of merging them.
  assert.equal(soundKey("coffee"), "kf");
  assert.equal(soundKey("cofee"), "kf");
  assert.notEqual(soundKey("bell"), "");
});

test("the React app and the shared script agree on every skeleton", () => {
  const probe = [
    "engine x", "kube control", "jason", "uh patch ee", "a patch ee",
    "coffee", "cofee", "json", "nginx", "dot net", "ex code", "sequel",
    "chat g p t", "you boon too", "pie thon", "", "zzzzqqqq",
  ];
  for (const q of probe) {
    assert.equal(v2.soundKey(q), soundKey(q), `soundKey("${q}") differs between docs/v2/eggs.jsx and tools/build-site.sh`);
  }
  // The palette reads {w, resp, alt}; the shared script reads {w, r, r2}.
  const keys = v2.entrySoundKeys({ w: "jQuery", resp: "JAY kwery", alt: "jay QUERY" });
  assert.ok(keys.includes(soundKey("jay query")), "palette must search the alternate respelling");
});

test("no skeleton match means no suggestions", () => {
  assert.deepEqual(soundMatches("zzzzqqqq"), []);
  assert.deepEqual(soundMatches(""), []);
});
