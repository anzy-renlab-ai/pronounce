import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  findMatches,
  parseRequestedFiles,
  readDictionary,
  renderGlossary,
  scanFiles,
  slugify,
  stripMarkdownNoise
} = require('../actions/pronounce-docs/lib.js');

const root = path.resolve(import.meta.dirname, '..');
const dictionary = readDictionary(path.join(root, 'data', 'pronunciations.tsv'));
assert.ok(dictionary.length >= 1900, 'loads the complete dictionary');

const hits = findMatches(
  'Deploy **Qwen** with `kubectl`; ordinary URLs like https://example.com/GIF should not count.',
  dictionary,
  { maxResults: 20 }
);
assert.deepEqual(hits.map((entry) => entry.word), ['qwen', 'kubectl']);
assert.equal(slugify('C++'), 'c--');
assert.equal(stripMarkdownNoise('[Qwen](https://example.com/kubectl)').includes('kubectl'), false);

const sourced = findMatches('Qwen and WebSocket', dictionary, { includeUnsourced: false, maxResults: 20 });
assert.ok(sourced.some((entry) => entry.word === 'qwen'));
assert.ok(!sourced.some((entry) => entry.word === 'WebSocket'));

const glossary = renderGlossary(hits);
assert.match(glossary, /Pronunciation guide/);
assert.match(glossary, /pronounce\.renlab\.ai\/word\/kubectl/);
assert.match(glossary, /Generated from the \[Pronounce developer-jargon dictionary\]/);

const ambiguity = findMatches('This is just prose, but `just` is also a command.', dictionary, { maxResults: 20 });
assert.equal(ambiguity.filter((entry) => entry.word === 'just').length, 1);
assert.ok(!findMatches('This is just prose.', dictionary, { maxResults: 20 }).some((entry) => entry.word === 'just'));

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'pronounce-action-'));
try {
  fs.writeFileSync(path.join(temporary, 'README.md'), 'Use Qwen with kubectl.\n');
  fs.writeFileSync(path.join(temporary, 'notes.txt'), 'GIF\n');
  assert.deepEqual(parseRequestedFiles('README.md, ../outside.md, notes.txt', temporary), ['README.md']);
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'pronounce-action-outside-'));
  fs.writeFileSync(path.join(outside, 'secret.md'), 'Qwen\n');
  fs.symlinkSync(path.join(outside, 'secret.md'), path.join(temporary, 'linked.md'));
  assert.deepEqual(parseRequestedFiles('linked.md', temporary), []);
  fs.rmSync(outside, { recursive: true, force: true });
  const scanned = scanFiles(temporary, ['README.md'], dictionary, { maxResults: 10 });
  assert.deepEqual(scanned.map((entry) => entry.word), ['qwen', 'kubectl']);
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}

console.log('✓ Pronounce Docs action tests passed');
