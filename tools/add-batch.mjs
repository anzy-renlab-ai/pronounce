#!/usr/bin/env node
// Generic dictionary batch appender — replaces the former per-batch
// add-batchN.mjs one-offs (batch 1-14 row data still lives in git history and
// in tools/batch13.json / tools/batch14.json).
//
//   node tools/add-batch.mjs tools/batch15.json
//
// Input: a JSON array of 10-field row objects (see tools/batch14.json for the
// shape). Rows are validated (10 string fields, no tabs/newlines), deduped
// against the shipped dictionary AND within the batch, then appended to
// data/pronunciations.tsv.
//
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const batchPath = process.argv[2];
if (!batchPath) {
  console.error("usage: node tools/add-batch.mjs <batch.json>");
  process.exit(2);
}

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const tsvPath = join(repoRoot, "data", "pronunciations.tsv");

const rows = JSON.parse(readFileSync(batchPath, "utf8")).map((r) => [
  r.word, r.ipa, r.respelling_us, r.alt_ipa, r.alt_respelling_us,
  r.source_url, r.source_label, r.category, r.confidence, r.notes,
]);

const text = readFileSync(tsvPath, "utf8");
const existing = new Set(
  text.split("\n").filter(l => l && !l.startsWith("#"))
    .map(l => l.split("\t")[0].toLowerCase()).filter(w => w && w !== "word")
);
const fresh = [];
const dupes = [];
for (const r of rows) {
  if (typeof r[0] !== "string" || !r[0]) throw new Error(`row ${JSON.stringify(r).slice(0, 60)} has no word key`);
  const key = r[0].toLowerCase();
  if (existing.has(key)) { dupes.push(r[0]); continue; }
  existing.add(key); // guards against duplicates WITHIN the batch too
  fresh.push(r);
}
if (dupes.length) console.log(`skipping ${dupes.length} already present: ${dupes.join(", ")}`);
const lines = fresh.map(r => {
  if (r.length !== 10) throw new Error(`row "${r[0]}" has ${r.length} fields, need 10`);
  for (const f of r) {
    if (typeof f !== "string") throw new Error(`row "${r[0]}" has a non-string field`);
    if (f.includes("\t") || f.includes("\n")) throw new Error(`row "${r[0]}" has a tab/newline in a field`);
  }
  return r.join("\t");
});
const out = text.endsWith("\n") ? text + lines.join("\n") + "\n" : text + "\n" + lines.join("\n") + "\n";
writeFileSync(tsvPath, out);
console.log(`appended ${fresh.length} entries → data/pronunciations.tsv`);
