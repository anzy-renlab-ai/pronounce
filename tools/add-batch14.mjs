#!/usr/bin/env node
// Batch 14 (v2.23.0): +32 entries — 2026 AI/chip vocab (Rubin, Taalas, Jalapeño,
// Maia, Majorana, MAI, AMI, Corsair, oMLX), infra gap-fill (Immich, Debezium,
// NiFi, Keptn, Tyk, Xapian, Kueue, Linode, OpenBao, Sqitch, Vitess, lighttpd),
// creator-clarified classics (Guice, Thymeleaf, musl, xonsh, Pyodide, FLTK,
// Nagios, Keptn), and contested staples (axios, Mockito, Haxe, Maia).
//
// Discovered by a 4-lens web-research workflow (4 finders -> dedup vs the 1,848
// shipped words -> one adversarial verifier per candidate, 32/32 survived with
// substantive corrections: MAI's "contested" claim was a summarizer
// hallucination, Kueue's respelling was the homograph "queue", Linode's
// creator tweet was recovered, Nagios' dead FAQ swapped for the archived
// original). Risky syllables byte-verified through `say -o` before appending:
// "bao"=="bough" (/baʊ/), "sair"=="sare", "ose" distinct from "oss"/"oze",
// "M A I" per the L L M letter convention, "nyoh" per the audited "pee nya"/
// "ray nyee" n+y glide precedent.
//
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const tsvPath = join(repoRoot, "data", "pronunciations.tsv");
const batchPath = join(repoRoot, "tools", "batch14.json");

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
