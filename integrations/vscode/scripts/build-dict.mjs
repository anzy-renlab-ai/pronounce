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
console.log(`built dictionary: ${Object.keys(entries).length} entries → ${outPath}`);
