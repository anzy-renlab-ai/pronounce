#!/usr/bin/env node
// Parse ../../data/pronunciations.tsv into out/dictionary.json
// Runs at vscode:prepublish so the extension ships a static JSON, no TSV parser at runtime.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..', '..', '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');
const outPath = join(here, '..', 'out', 'dictionary.json');

const COLUMNS = [
  'word', 'ipa', 'respelling_us', 'alt_ipa', 'alt_respelling_us',
  'source_url', 'source_label', 'category', 'confidence', 'notes',
];

const raw = readFileSync(tsvPath, 'utf8');
const lines = raw.split('\n');
const entries = {};

for (const line of lines) {
  if (!line || line.startsWith('#')) continue;
  const cells = line.split('\t');
  if (cells[0] === 'word') continue; // header row
  if (cells.length < 3) continue;
  const rec = {};
  for (let i = 0; i < COLUMNS.length; i++) {
    const v = (cells[i] ?? '').trim();
    if (v) rec[COLUMNS[i]] = v;
  }
  if (!rec.word) continue;
  entries[rec.word.toLowerCase()] = rec;
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(entries, null, 0));
const COUNT = Object.keys(entries).length;
console.log(`built dictionary: ${COUNT} entries → ${outPath}`);

// Keep every "<N> entries" claim across docs in lockstep with the real count.
// Stale, contradictory counts (e.g. one page says 993, another 817) read as
// abandonware on the Marketplace listing — so this is part of the build, not a
// manual chore. Matches prose ("993 entries", "918 sourced entries",
// "918-entry browser", "918+ entries") and the URL-encoded shields badge.
const PROSE = /\b\d{3,4}\+?((?:[ \-]sourced)?[ \-]entr(?:y|ies))/gi;
const BADGE = /\b\d{3,4}(?:%2B)?%20entries/gi;
const CJK = /\d{3,4}(?=\s*条)/g; // Chinese: "1212 条" / "1212 条词条"
const NAMES = /\b\d{3,4}\+?( developer[ \-]jargon names)/gi; // README hero tagline
const docFiles = [
  ['integrations', 'vscode', 'package.json'],
  ['integrations', 'vscode', 'package.nls.json'],
  ['integrations', 'vscode', 'package.nls.zh-cn.json'],
  ['integrations', 'vscode', 'README.md'],
  ['integrations', 'vscode', 'media', 'walkthrough-hover.md'],
  ['integrations', 'vscode', 'media', 'walkthrough-search.md'],
  ['README.md'],
  ['docs', 'index.html'],
];
for (const parts of docFiles) {
  const p = join(repoRoot, ...parts);
  let text;
  try { text = readFileSync(p, 'utf8'); } catch { continue; }
  const next = text
    .replace(PROSE, `${COUNT}$1`)
    .replace(BADGE, `${COUNT}%20entries`)
    .replace(CJK, `${COUNT}`)
    .replace(NAMES, `${COUNT}+$1`);
  if (next !== text) {
    writeFileSync(p, next);
    console.log(`synced count → ${parts.join('/')}`);
  }
}
