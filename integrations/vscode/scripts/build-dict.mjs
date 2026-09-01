#!/usr/bin/env node
// Parse ../../data/pronunciations.tsv into out/dictionary.json
// Runs at vscode:prepublish so the extension ships a static JSON, no TSV parser at runtime.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncCountText } from './count-sync.mjs';

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
const SOURCE_COUNT = Object.values(entries).filter(entry => entry.source_url).length;
const CREATOR_COUNT = Object.values(entries).filter(
  entry => entry.confidence === 'creator-clarified').length;
const CONTESTED_COUNT = Object.values(entries).filter(
  entry => entry.confidence === 'contested').length;
console.log(`built dictionary: ${COUNT} entries (${SOURCE_COUNT} sourced) → ${outPath}`);

// Keep every "<N> entries" claim across docs in lockstep with the real count.
// Stale, contradictory counts (e.g. one page says 993, another 817) read as
// abandonware on the Marketplace listing — so this is part of the build, not a
// manual chore. Matches total-count prose ("993 entries",
// "918-entry browser", "918+ entries") and the URL-encoded shields badge.
// Source-coverage phrases such as "1,283 sourced entries" are deliberately
// excluded: that number is not the total. "confidence-tagged" is safe because
// every dictionary entry carries a confidence value.
const docFiles = [
  ['integrations', 'vscode', 'package.json'],
  ['integrations', 'vscode', 'package.nls.json'],
  ['integrations', 'vscode', 'package.nls.zh-cn.json'],
  ['integrations', 'vscode', 'README.md'],
  ['integrations', 'vscode', 'media', 'walkthrough-hover.md'],
  ['integrations', 'vscode', 'media', 'walkthrough-search.md'],
  ['integrations', 'vscode', 'media', 'walkthrough-star.md'],
  ['README.md'],
  ['docs', 'index.html'],
  ['.codex-plugin', 'plugin.json'],
  ['mcp-server', 'server.json'],
];
for (const parts of docFiles) {
  const p = join(repoRoot, ...parts);
  let text;
  try { text = readFileSync(p, 'utf8'); } catch { continue; }
  const next = syncCountText(text, {
    count: COUNT,
    sourceCount: SOURCE_COUNT,
    creatorCount: CREATOR_COUNT,
    contestedCount: CONTESTED_COUNT,
  });
  if (next !== text) {
    writeFileSync(p, next);
    console.log(`synced count → ${parts.join('/')}`);
  }
}
