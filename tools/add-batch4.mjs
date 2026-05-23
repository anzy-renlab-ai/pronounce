#!/usr/bin/env node
// Batch 4: AI labs/models, AI coding agents, Rust/JS ecosystem, modern infra.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── AI labs / models ──────────────────────────────────────────────────────
  ['glm','/ˌdʒiː ɛl ˈɛm/','jee ell em','','','','','product','community-consensus','Zhipu AI\'s General Language Model family; letters "G-L-M".'],
  ['zhipu','/ˈdʒiː puː/','jee poo','/ˈʒiː puː/','zhee poo','','','product','contested','Zhipu AI (智谱), maker of GLM/ChatGLM; pinyin "Zhì-pǔ", roughly "jee-poo".'],
  ['ernie','/ˈɜːrni/','er nee','','','','','product','community-consensus','Baidu\'s ERNIE LLM; "ER-nee", a play on BERT (Bert & Ernie).'],
  ['internlm','/ˌɪntɜːrn ɛl ˈɛm/','intern ell em','','','','','product','community-consensus','Shanghai AI Lab\'s open LLM; "intern-L-M".'],
  ['moonshot','/ˈmuːnʃɒt/','moon shot','','','','','product','community-consensus','Moonshot AI (月之暗面), maker of Kimi; "moon-shot".'],
  // ── AI coding agents / tools ──────────────────────────────────────────────
  ['openhands','/ˈoʊpən hændz/','open hands','','','','','product','community-consensus','Open-source coding agent (formerly OpenDevin); "open-hands".'],
  ['opendevin','/ˈoʊpən ˌdɛvɪn/','open dev in','','','','','product','community-consensus','Former name of OpenHands; "open-DEV-in".'],
  ['goose','/ɡuːs/','goose','','','','','tool','community-consensus','Block\'s open-source AI agent; like the bird.'],
  // ── Rust ecosystem ────────────────────────────────────────────────────────
  ['serde','/sɜːrˈdiː/','sir dee','/ˈsɜːrdi/','ser dee','','','tool','contested','Rust serialization framework; "sir-DEE" (serialize/deserialize), some say "SER-dee".'],
  ['yew','/juː/','you','','','','','tool','community-consensus','Rust/WASM front-end framework; "you", like the yew tree.'],
  ['clap','/klæp/','clap','','','','','tool','community-consensus','Rust Command Line Argument Parser; "clap", like applause.'],
  ['rayon','/ˈreɪɒn/','ray on','','','','','tool','community-consensus','Rust data-parallelism library; "RAY-on", like the fabric.'],
  ['wasmer','/ˈwɑːzmər/','wahz mer','/ˈwæzmər/','waz mer','','','product','contested','WebAssembly runtime; "WAHZ-mer" (wasm + -er).'],
  // ── JS/TS ecosystem ───────────────────────────────────────────────────────
  ['elysia','/ɛˈlɪziə/','eh lih zee uh','','','','','tool','community-consensus','Bun web framework; "eh-LIH-zee-uh".'],
  ['effect','/ɪˈfɛkt/','ih fekt','','','','','tool','community-consensus','Effect-TS library; just "effect".'],
  ['nitro','/ˈnaɪtroʊ/','ny tro','','','','','tool','community-consensus','UnJS server engine (powers Nuxt); "NY-tro".'],
  ['valibot','/ˈvælɪbɒt/','val ih bot','','','','','tool','community-consensus','Schema validation library; "VAL-ih-bot".'],
  ['million','/ˈmɪljən/','mill yun','','','','','tool','community-consensus','Million.js — React optimizing compiler; "MIL-yun".'],
  ['rolldown','/ˈroʊldaʊn/','roll down','','','','','tool','community-consensus','Rust-based bundler (Vite\'s future core); "roll-down".'],
  // ── Modern infra / dev platforms ──────────────────────────────────────────
  ['convex','/ˈkɒnvɛks/','kon veks','','','','','product','community-consensus','Reactive backend platform; "KON-veks".'],
  ['xata','/ˈzɑːtə/','zah tah','','','','','product','community-consensus','Serverless database platform; "ZAH-tah".'],
  ['axiom','/ˈæksiəm/','ak see um','','','','','product','community-consensus','Log/event analytics platform; "AK-see-um".'],
  ['quickwit','/ˈkwɪkwɪt/','quick wit','','','','','product','community-consensus','Search engine for logs; "quick-wit".'],
  ['reflex','/ˈriːflɛks/','ree fleks','','','','','tool','community-consensus','Python full-stack framework (formerly Pynecone); "REE-fleks".'],
  ['zstd','/ˌziː ˈstændərd/','zee standard','/ˌziː ɛs tiː ˈdiː/','zee ess tee dee','','','abbreviation','contested','Zstandard compression; "Z-standard" or spelled "Z-S-T-D".'],
  ['warp','/wɔːrp/','warp','','','','','product','community-consensus','Rust-based terminal (and a Rust web framework); "warp".'],
];

const text = readFileSync(tsvPath, 'utf8');
const existing = new Set(
  text.split('\n').filter(l => l && !l.startsWith('#'))
    .map(l => l.split('\t')[0].toLowerCase()).filter(w => w && w !== 'word')
);
const fresh = rows.filter(r => !existing.has(r[0].toLowerCase()));
const dupes = rows.filter(r => existing.has(r[0].toLowerCase())).map(r => r[0]);
if (dupes.length) console.log(`skipping ${dupes.length} already present: ${dupes.join(', ')}`);
const lines = fresh.map(r => {
  if (r.length !== 10) throw new Error(`row "${r[0]}" has ${r.length} fields, need 10`);
  return r.join('\t');
});
const out = text.endsWith('\n') ? text + lines.join('\n') + '\n' : text + '\n' + lines.join('\n') + '\n';
writeFileSync(tsvPath, out);
console.log(`appended ${fresh.length} entries → data/pronunciations.tsv`);
