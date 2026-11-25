#!/usr/bin/env node
// sync-counts.mjs [--apply] [file...]
//
// Rewrites the entry counts quoted in the hand-maintained pages and in the VS Code
// extension copy so that they match data/pronunciations.tsv. It uses the patterns the
// extension builder already uses (integrations/vscode/scripts/count-sync.mjs).
//
// Why it exists: tools/build-site.sh generates the word pages but never touches
// docs/index.html or docs/v2/index.html, the extension copy is only synced when the
// extension is packaged, and tools/release.sh syncs the Claude plugin manifest's version
// but not the count in its description. On 2026-11-24 the landing page still said
// 1,903 entries / 1,283 sources and the plugin manifest 1,972 entries, against a
// dictionary of 1,979 / 1,322.
//
// The list is explicit on purpose: changelogs, design notes and code comments quote old
// numbers as history or as examples, and must not be rewritten.
//
// Without --apply it only reports and exits 1 when something would change, so it can be
// used as a check. Step 3 of .github/DAILY-RELEASE.md runs it with --apply.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { syncCountText } from '../integrations/vscode/scripts/count-sync.mjs';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_FILES = [
  'README.md',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  'mcp-server/server.json',
  'integrations/chrome/README.md',
  'integrations/chrome/manifest.json',
  'docs/index.html',
  'docs/v2/index.html',
  'integrations/vscode/README.md',
  'integrations/vscode/media/walkthrough-hover.md',
  'integrations/vscode/media/walkthrough-search.md',
  'integrations/vscode/media/walkthrough-star.md',
  'integrations/vscode/package.json',
  'integrations/vscode/package.nls.json',
  'integrations/vscode/package.nls.zh-cn.json',
];

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const files = args.filter(arg => !arg.startsWith('--'));
const targets = files.length > 0 ? files : DEFAULT_FILES;

const rows = readFileSync(join(repoRoot, 'data', 'pronunciations.tsv'), 'utf8')
  .split('\n')
  .filter(line => line && !line.startsWith('#') && !line.startsWith('word\t'))
  .map(line => line.split('\t'))
  .filter(cells => cells.length >= 10 && cells[0] && cells[2]);
const counts = {
  count: rows.length,
  sourceCount: rows.filter(cells => (cells[5] || '').trim()).length,
  creatorCount: rows.filter(cells => cells[8] === 'creator-clarified').length,
  contestedCount: rows.filter(cells => cells[8] === 'contested').length,
  clipCount: readFileSync(join(repoRoot, 'data', 'creator-clips.tsv'), 'utf8')
    .split('\n')
    .filter(line => line && !line.startsWith('#')).length,
};

const show = text => (text.length > 200 ? `${text.slice(0, 200)}…` : text).trim();
let stale = 0;
for (const file of targets) {
  const path = resolve(repoRoot, file);
  const before = readFileSync(path, 'utf8');
  const after = syncCountText(before, counts);
  if (after === before) {
    console.log(`${file}: in sync`);
    continue;
  }
  stale++;
  const oldLines = before.split('\n');
  const newLines = after.split('\n');
  console.log(`${file}:`);
  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    if (oldLines[i] !== newLines[i]) {
      console.log(`  ${i + 1}\n  - ${show(oldLines[i] || '')}\n  + ${show(newLines[i] || '')}`);
    }
  }
  if (apply) writeFileSync(path, after);
}

console.log(
  `dictionary: ${counts.count} entries, ${counts.sourceCount} with a source, ` +
    `${counts.creatorCount} creator-clarified, ${counts.contestedCount} contested`,
);
if (stale === 0) {
  console.log('all quoted counts match the dictionary');
} else {
  console.log(
    apply
      ? `${stale} file(s) updated`
      : `${stale} file(s) quote other numbers; run with --apply`,
  );
  if (!apply) process.exit(1);
}
