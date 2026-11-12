// Guards the demand-coverage report: the matching rules must keep collapsing
// spellings of the same product, and the shipped dictionary must not fall back
// below the ratchet floor.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { variants, measure, IN_SCOPE_FLOOR } from "./coverage.mjs";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const dict = readFileSync(join(REPO_ROOT, "data", "pronunciations.tsv"), "utf8");
const terms = readFileSync(join(REPO_ROOT, "data", "top-dev-terms.tsv"), "utf8");

// A row must be found under every spelling a developer might use for it.
test("variants collapse label spellings onto the same product", () => {
  const forms = (t) => new Set(variants(t));
  assert.ok(forms("node.js").has("node"));
  assert.ok(forms("reactjs").has("react"));
  assert.ok(forms("ruby-on-rails").has("rails"));
  assert.ok(forms("asp.net-mvc").has("asp.net"));
  assert.ok(forms("python-3.x").has("python"));
  assert.ok(forms("sql-server-2008").has("sql server"));
  assert.ok(forms("amazon-web-services").has("aws"));
});

test("variants never returns an empty or case-sensitive form", () => {
  for (const term of ["C++", ".NET", "iOS", "  jQuery  "]) {
    const out = variants(term);
    assert.ok(out.length > 0, term);
    for (const v of out) assert.equal(v, v.toLowerCase());
  }
  assert.deepEqual(variants(""), []);
});

test("measure separates in-scope holes from everyday vocabulary", () => {
  const dictTsv = "word\tipa\trespelling_us\nalpha\t/a/\talpha\njquery\t/b/\tjay kwery\n";
  const termsTsv = [
    "term\tcount\tkind",
    "jquery\t100\tin-scope",
    "python\t90\tin-scope",
    "algorithm\t80\tenglish",
  ].join("\n");
  const r = measure(dictTsv, termsTsv);
  assert.equal(r.total, 3);
  assert.equal(r.inScope, 2);
  assert.equal(r.coveredInScope, 1);
  assert.deepEqual(
    r.gaps.map((g) => g.term),
    ["python"],
  );
});

test("gaps are ordered by real demand, not alphabetically", () => {
  const dictTsv = "word\tipa\trespelling_us\nalpha\t/a/\talpha\n";
  const termsTsv = [
    "term\tcount\tkind",
    "java\t900\tin-scope",
    "python\t1000\tin-scope",
    "jquery\t100\tin-scope",
  ].join("\n");
  assert.deepEqual(
    measure(dictTsv, termsTsv).gaps.map((g) => g.term),
    ["python", "java", "jquery"],
  );
});

test("the shipped dictionary clears the in-scope floor", () => {
  const r = measure(dict, terms);
  assert.ok(
    r.inScopePct >= IN_SCOPE_FLOOR,
    `in-scope coverage ${r.inScopePct.toFixed(1)}% fell below the ${IN_SCOPE_FLOOR}% floor`,
  );
});

test("the demand snapshot stays a usable yardstick", () => {
  const r = measure(dict, terms);
  assert.ok(r.total >= 150, `snapshot only has ${r.total} terms`);
  assert.ok(r.inScope >= 50, `snapshot only marks ${r.inScope} terms in-scope`);
});
