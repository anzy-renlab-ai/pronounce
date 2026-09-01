'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {
  readDictionary,
  renderGlossary,
  resolveFiles,
  scanFiles
} = require('./lib');

function input(name, fallback = '') {
  const key = `INPUT_${name.toUpperCase().replace(/ /g, '_').replace(/-/g, '_')}`;
  return process.env[key] === undefined ? fallback : process.env[key];
}

function booleanInput(name, fallback) {
  const value = input(name, String(fallback)).trim().toLowerCase();
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`${name} must be true or false, got: ${value}`);
}

function integerInput(name, fallback) {
  const value = Number.parseInt(input(name, String(fallback)), 10);
  if (!Number.isInteger(value) || value < 1 || value > 200) {
    throw new Error(`${name} must be an integer from 1 to 200`);
  }
  return value;
}

function writeOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  const delimiter = `pronounce_${crypto.randomBytes(8).toString('hex')}`;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}<<${delimiter}\n${value}\n${delimiter}\n`);
}

function main() {
  const actionRoot = path.resolve(__dirname, '..', '..');
  const workspace = path.resolve(process.env.GITHUB_WORKSPACE || process.cwd());
  const entries = readDictionary(path.join(actionRoot, 'data', 'pronunciations.tsv'));
  const files = resolveFiles({
    root: workspace,
    requested: input('files'),
    eventPath: process.env.GITHUB_EVENT_PATH || ''
  });
  const matches = scanFiles(workspace, files, entries, {
    includeUnsourced: booleanInput('include-unsourced', true),
    maxResults: integerInput('max-results', 25)
  });
  const markdown = renderGlossary(matches);

  writeOutput('count', String(matches.length));
  writeOutput('words', matches.map((entry) => entry.word).join(', '));
  writeOutput('markdown', markdown);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);

  console.log(`Pronounce Docs scanned ${files.length} Markdown file(s) and found ${matches.length} unique term(s).`);
  if (matches.length) console.log(matches.map((entry) => entry.word).join(', '));
  if (booleanInput('fail-on-match', false) && matches.length) process.exitCode = 2;
}

try {
  main();
} catch (error) {
  console.error(`Pronounce Docs failed: ${error.message}`);
  process.exitCode = 1;
}
