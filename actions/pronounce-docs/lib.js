'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const MARKDOWN_EXTENSIONS = new Set(['.md', '.mdx', '.markdown']);
const IGNORED_DIRECTORIES = new Set([
  '.git', '.hg', '.svn', 'node_modules', 'vendor', 'dist', 'build', 'coverage'
]);

function slugify(word) {
  return word.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function markdownCell(value) {
  return String(value || '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function readDictionary(dictionaryPath) {
  const entries = [];
  const lines = fs.readFileSync(dictionaryPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    const columns = line.split('\t');
    if (columns.length !== 10 || columns[0] === 'word') continue;
    const [word, ipa, respelling, altIpa, altRespelling, sourceUrl, sourceLabel, category, confidence, notes] = columns;
    entries.push({
      word, ipa, respelling, altIpa, altRespelling, sourceUrl, sourceLabel,
      category, confidence, notes, slug: slugify(word)
    });
  }
  return entries.sort((a, b) => b.word.length - a.word.length || a.word.localeCompare(b.word));
}

function stripMarkdownNoise(text) {
  return text
    .replace(/```[^\n]*\n([\s\S]*?)```/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!?(\[[^\]]*\])\([^)]*\)/g, '$1')
    .replace(/<https?:\/\/[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<[^>]+>/g, ' ');
}

function termPattern(entry, options = {}) {
  let escaped = escapeRegExp(entry.word).replace(/\\ /g, '\\s+');
  const shortAmbiguous = entry.word.length <= 4 && /^[A-Za-z]+$/.test(entry.word);
  if (shortAmbiguous && entry.word === entry.word.toLowerCase()) {
    const titleCase = `${entry.word[0].toUpperCase()}${entry.word.slice(1)}`;
    escaped = options.allowLowercaseShort
      ? `(?:${escaped}|${escapeRegExp(titleCase)})`
      : escapeRegExp(titleCase);
  }
  const flags = shortAmbiguous ? 'u' : 'iu';
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, flags);
}

function findMatches(text, entries, options = {}) {
  const clean = stripMarkdownNoise(text);
  const code = [...text.matchAll(/```[\s\S]*?```|`[^`]+`/g)].map((match) => match[0]).join('\n');
  const includeUnsourced = options.includeUnsourced !== false;
  const maxResults = Number.isFinite(options.maxResults) ? options.maxResults : 25;
  const matches = [];
  for (const entry of entries) {
    if (!includeUnsourced && !entry.sourceUrl) continue;
    let hit = termPattern(entry).exec(clean);
    if (!hit && entry.word.length <= 4 && entry.word === entry.word.toLowerCase()) {
      hit = termPattern(entry, { allowLowercaseShort: true }).exec(code);
    }
    if (hit) matches.push({ entry, index: hit.index });
  }
  return matches
    .sort((a, b) => a.index - b.index || a.entry.word.localeCompare(b.entry.word, 'en', { sensitivity: 'base' }))
    .map(({ entry }) => entry)
    .slice(0, Math.max(0, maxResults));
}

function walkMarkdownFiles(root, directory = root, found = []) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    if (item.isDirectory() && IGNORED_DIRECTORIES.has(item.name)) continue;
    const absolute = path.join(directory, item.name);
    if (item.isDirectory()) walkMarkdownFiles(root, absolute, found);
    else if (item.isFile() && MARKDOWN_EXTENSIONS.has(path.extname(item.name).toLowerCase())) {
      found.push(path.relative(root, absolute));
    }
  }
  return found;
}

function changedMarkdownFiles(root, eventPath) {
  if (!eventPath || !fs.existsSync(eventPath)) return [];
  let event;
  try {
    event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
  } catch (_) {
    return [];
  }
  const base = event.pull_request && event.pull_request.base && event.pull_request.base.sha;
  const head = event.pull_request && event.pull_request.head && event.pull_request.head.sha;
  if (!base || !head) return [];
  try {
    const output = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMR', base, head, '--'], {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return output.split(/\r?\n/).filter((file) =>
      file && MARKDOWN_EXTENSIONS.has(path.extname(file).toLowerCase()) && fs.existsSync(path.join(root, file))
    );
  } catch (_) {
    return [];
  }
}

function parseRequestedFiles(value, root) {
  if (!value.trim()) return [];
  const realRoot = fs.realpathSync(root);
  return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean).filter((file) => {
    const absolute = path.resolve(root, file);
    if (!absolute.startsWith(`${path.resolve(root)}${path.sep}`) || !fs.existsSync(absolute)) return false;
    const realFile = fs.realpathSync(absolute);
    return realFile.startsWith(`${realRoot}${path.sep}`) && fs.statSync(realFile).isFile() &&
      MARKDOWN_EXTENSIONS.has(path.extname(realFile).toLowerCase());
  });
}

function resolveFiles({ root, requested = '', eventPath = '' }) {
  const explicit = parseRequestedFiles(requested, root);
  if (explicit.length) return explicit;
  const changed = changedMarkdownFiles(root, eventPath);
  if (changed.length) return changed;
  return walkMarkdownFiles(root).sort();
}

function scanFiles(root, files, entries, options = {}) {
  const byWord = new Map();
  for (const file of files) {
    const absolute = path.resolve(root, file);
    const hits = findMatches(fs.readFileSync(absolute, 'utf8'), entries, {
      includeUnsourced: options.includeUnsourced,
      maxResults: Number.MAX_SAFE_INTEGER
    });
    for (const entry of hits) {
      const current = byWord.get(entry.word) || { ...entry, files: [] };
      current.files.push(file);
      byWord.set(entry.word, current);
    }
  }
  return [...byWord.values()].slice(0, Math.max(0, options.maxResults || 25));
}

function renderGlossary(matches) {
  if (!matches.length) return '## Pronunciation guide\n\nNo developer-jargon terms from the Pronounce dictionary were found.\n';
  const rows = matches.map((entry) => {
    const wordUrl = `https://pronounce.renlab.ai/word/${entry.slug}`;
    const source = entry.sourceUrl
      ? `[${markdownCell(entry.sourceLabel || 'source')}](${entry.sourceUrl})`
      : 'community consensus';
    return `| [${markdownCell(entry.word)}](${wordUrl}) | ${markdownCell(entry.respelling)} | ${markdownCell(entry.ipa)} | ${source} |`;
  });
  return [
    '## Pronunciation guide',
    '',
    '| Term | Say it | IPA | Evidence |',
    '|---|---|---|---|',
    ...rows,
    '',
    `_Generated from the [Pronounce developer-jargon dictionary](https://github.com/anzy-renlab-ai/pronounce)._`,
    ''
  ].join('\n');
}

module.exports = {
  changedMarkdownFiles,
  findMatches,
  parseRequestedFiles,
  readDictionary,
  renderGlossary,
  resolveFiles,
  scanFiles,
  slugify,
  stripMarkdownNoise,
  termPattern,
  walkMarkdownFiles
};
