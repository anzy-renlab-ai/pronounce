#!/usr/bin/env node
// Batch 13 (v2.21.0): +58 entries — 2026 AI models/labs, CNCF & infra projects,
// framework/tooling names, and the researchers whose surnames devs read aloud in
// paper clubs. Discovered by a 6-lens multi-agent workflow (81 candidates), then
// adversarially source-verified per candidate, then run past TWO independent
// critics (Codex CLI + a Claude critic that rendered every respelling through
// macOS `say` and compared audio byte-for-byte).
//
// The audio check earned its keep: it proved `Liger -> "lie ger"` actually plays
// "LIE-jer" (say softens g before e/i/y) — the exact error that row's own notes
// warn about. It also cleared two rows the "respelling == spelling" heuristic had
// flagged (Typst, tau-bench), which turn out to be correct as written, and it
// exposed five ALREADY-SHIPPED rows with the same soft-g defect (Jaeger, guix,
// vogels, together.ai, Gitea) plus `tau -> "tow"` (played "toe"). Those are fixed
// directly in the TSV.
//
// Three rows were downgraded from creator-clarified -> community-consensus after
// both critics fetched the source and found it states the name's ORIGIN but never
// its pronunciation (Krkn, Kuasar, Zeitwerk).
//
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const tsvPath = join(repoRoot, "data", "pronunciations.tsv");
const batchPath = join(repoRoot, "tools", "batch13.json");

const rows = JSON.parse(readFileSync(batchPath, "utf8")).map((r) => [
  r.word, r.ipa, r.respelling_us, r.alt_ipa, r.alt_respelling_us,
  r.source_url, r.source_label, r.category, r.confidence, r.notes,
]);

const text = readFileSync(tsvPath, "utf8");
const existing = new Set(
  text.split("\n").filter(l => l && !l.startsWith("#"))
    .map(l => l.split("\t")[0].toLowerCase()).filter(w => w && w !== "word")
);
const fresh = rows.filter(r => !existing.has(r[0].toLowerCase()));
const dupes = rows.filter(r => existing.has(r[0].toLowerCase())).map(r => r[0]);
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
