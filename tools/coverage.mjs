#!/usr/bin/env node
// Coverage: does the dictionary answer the words developers actually ask about?
//
// The daily release loop grows the dictionary by novelty — whatever trended
// this week. Nothing ever measured it against demand, so on 2026-11-12 a
// 1,936-entry dictionary had no row for python, git, java, jquery, node.js, or
// xcode, and /api/word/python.json returned 404 to anyone who typed it.
//
// This compares the shipped dictionary against data/top-dev-terms.tsv (the
// most-asked Stack Overflow tags) and prints the highest-demand holes first.
// The in-scope floor is a ratchet: it may go up, never down.
//
//   node tools/coverage.mjs            # summary + top holes
//   node tools/coverage.mjs --all      # every in-scope hole
//   node tools/coverage.mjs --json     # machine-readable
//   node tools/coverage.mjs --check    # exit 1 when below the floor (CI)
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DICT = join(REPO_ROOT, "data", "pronunciations.tsv");
const TERMS = join(REPO_ROOT, "data", "top-dev-terms.tsv");

// Ratchet floor for in-scope coverage, as a percentage of data/top-dev-terms.tsv.
// Raise it when entries land; lowering it needs a reason in the commit message.
export const IN_SCOPE_FLOOR = 69.0;

/** Skip `#` comment lines and the header row. */
function rows(text) {
  return text
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#") && !l.startsWith("term\t"))
    .map((l) => l.split("\t"));
}

export function dictionaryKeys(tsv) {
  const keys = new Set();
  for (const [word] of rows(tsv)) {
    if (!word) continue;
    for (const v of variants(word)) keys.add(v);
  }
  return keys;
}

/**
 * Every spelling a developer might reasonably use for the same thing.
 * `node.js` must find `Node`, `reactjs` must find `React`, `ruby-on-rails`
 * must find `Ruby on Rails`, `c++` must find `C++`.
 */
// Tag spellings that name the same thing under a different label. A developer
// who types "amazon-web-services" and gets nothing has hit a gap, even though
// the dictionary holds "AWS". Keep this list short and only for exact synonyms.
export const ALIASES = {
  "amazon-web-services": "aws",
  "amazon-s3": "s3",
  "amazon-ec2": "ec2",
  "google-cloud-platform": "gcp",
  "google-app-engine": "gae",
  "google-apps-script": "apps script",
  "google-chrome": "chrome",
  "google-maps": "maps",
  "google-sheets": "sheets",
  "ms-access": "access",
  "visual-studio": "visual studio",
  "visual-studio-2010": "visual studio",
  "entity-framework": "entity framework",
  "twitter-bootstrap": "bootstrap",
  "ruby-on-rails": "rails",
  "ruby-on-rails-3": "rails",
  "node.js": "node",
  "intellij-idea": "intellij",
  "selenium-webdriver": "selenium",
  "unity-game-engine": "unity",
  "ionic-framework": "ionic",
  "apache-spark": "spark",
  "asp.net-mvc": "asp.net",
  "asp.net-core": "asp.net",
  ".net-core": ".net",
  "django-models": "django",
};

export function variants(term) {
  const t = String(term || "").toLowerCase().trim();
  if (!t) return [];
  // Version suffixes name the same product: python-3.x, sql-server-2008,
  // visual-studio-2010, ruby-on-rails-3.
  const base = t.replace(/[-.]\d+(?:\.\d+)*(?:\.?x)?$/, "");
  const forms = new Set([t, base]);
  if (ALIASES[t]) forms.add(ALIASES[t]);
  if (ALIASES[base]) forms.add(ALIASES[base]);
  const out = new Set();
  for (const f of forms) {
    out.add(f);
    out.add(f.replace(/[^a-z0-9._+#-]/g, ""));
    out.add(f.replace(/\.js$/, "")); // node.js   -> node
    out.add(f.replace(/js$/, "")); // reactjs   -> react
    out.add(f.replace(/[._-]+/g, " ")); // ruby-on-rails -> ruby on rails
    out.add(f.replace(/[-_.]/g, "")); // asp.net   -> aspnet
    out.add(f.replace(/[._-]+/g, "").replace(/js$/, ""));
  }
  return [...out].filter(Boolean);
}

export function measure(dictTsv, termsTsv) {
  const have = dictionaryKeys(dictTsv);
  const hits = (term) => variants(term).some((v) => have.has(v));
  const all = [];
  for (const [term, count, kind] of rows(termsTsv)) {
    if (!term) continue;
    all.push({ term, count: Number(count) || 0, kind: kind || "english", covered: hits(term) });
  }
  const inScope = all.filter((t) => t.kind === "in-scope");
  const coveredInScope = inScope.filter((t) => t.covered);
  return {
    total: all.length,
    inScope: inScope.length,
    covered: all.filter((t) => t.covered).length,
    coveredInScope: coveredInScope.length,
    inScopePct: inScope.length ? (coveredInScope.length / inScope.length) * 100 : 100,
    gaps: inScope.filter((t) => !t.covered).sort((a, b) => b.count - a.count),
    coveredList: coveredInScope.sort((a, b) => b.count - a.count),
  };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const result = measure(readFileSync(DICT, "utf8"), readFileSync(TERMS, "utf8"));
  const args = new Set(process.argv.slice(2));

  if (args.has("--json")) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    const pct = result.inScopePct.toFixed(1);
    console.log(
      `dictionary coverage of top ${result.total} dev terms: ` +
        `${result.covered}/${result.total} (${((result.covered / result.total) * 100).toFixed(1)}%)`,
    );
    console.log(`in-scope only: ${result.coveredInScope}/${result.inScope} (${pct}%), floor ${IN_SCOPE_FLOOR}%`);
    const gaps = args.has("--all") ? result.gaps : result.gaps.slice(0, 25);
    if (gaps.length) {
      console.log(`\nmissing, highest demand first (${result.gaps.length} in-scope holes):`);
      for (const g of gaps) console.log(`  ${g.count.toString().padStart(8)}  ${g.term}`);
      if (gaps.length < result.gaps.length) console.log(`  … run with --all for the rest`);
    }
  }

  if (args.has("--check") && result.inScopePct < IN_SCOPE_FLOOR) {
    console.error(
      `\ncoverage: in-scope coverage ${result.inScopePct.toFixed(1)}% is below the ${IN_SCOPE_FLOOR}% floor. ` +
        `Add entries; do not lower the floor.`,
    );
    process.exit(1);
  }
}
