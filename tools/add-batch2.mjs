#!/usr/bin/env node
// One-off batch 2: trending GitHub projects + famous tech people.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── trending projects with non-obvious names ──────────────────────────────
  ['bulma','/ˈbʊlmə/','bull muh','','','','','product','community-consensus','CSS framework; "BULL-muh", named after the Dragon Ball character.'],
  ['celery','/ˈsɛləri/','sell er ee','','','','','tool','community-consensus','Python distributed task queue; like the vegetable.'],
  ['directus','/dɪˈrɛktəs/','dih rek tus','','','','','product','community-consensus','Headless CMS; "dih-REK-tus".'],
  ['knex','/kəˈnɛks/','kuh nex','','','','','tool','community-consensus','SQL query builder; "kuh-NEX", like the toy K\'NEX.'],
  ['kysely','/ˈkiːsəli/','kee suh lee','/kaɪˈsɛli/','kai sell ee','','','tool','contested','TypeScript query builder; Finnish for "query". Readings vary.'],
  ['mongoose','/ˈmɒŋɡuːs/','mong goose','','','','','tool','community-consensus','MongoDB ODM; like the animal.'],
  ['payloadcms','/ˈpeɪloʊd ɛs ɛm ɛs/','pay load ess em ess','','','','','product','community-consensus','Headless CMS; "Payload-C-M-S".'],
  ['sequelize','/ˈsiːkwəlaɪz/','see kwul ize','','','','','tool','community-consensus','Node.js ORM; "sequel-ize".'],
  ['strapi','/ˈstrɑːpi/','strah pee','/ˈstræpi/','strap ee','','','product','contested','Headless CMS; "STRAH-pee" vs "STRAP-ee".'],
  ['sveltekit','/ˈsvɛlt kɪt/','svelt kit','','','','','product','community-consensus','Svelte ("svelt") app framework + kit.'],
  ['zapier','/ˈzæpiər/','zap ee er','','','https://zapier.com/','Zapier','product','creator-clarified','Automation platform; rhymes with "happier", not "zay-pier".'],
  // ── famous tech people (commonly mispronounced surnames) ──────────────────
  ['torvalds','/ˈtɔːrvɔːldz/','tor valdz','','','','','person','community-consensus','Linus Torvalds (Linux, Git). First name is "LEE-nus", not "LYE-nus".'],
  ['guido','/ˈɣiːdoʊ/','ghee doh','/ˈɡwiːdoʊ/','gwee doh','','','person','contested','Guido van Rossum (Python). Dutch "GHEE-doh"; often anglicized "GWEE-doh".'],
  ['stroustrup','/ˈstroʊstrʊp/','strow strup','','','','','person','community-consensus','Bjarne ("bee-YAR-neh") Stroustrup, creator of C++.'],
  ['matsumoto','/ˌmætsuˈmoʊtoʊ/','mat soo mo toe','','','','','person','community-consensus','Yukihiro Matsumoto (Ruby), aka "Matz".'],
  ['matz','/mæts/','mats','','','','','person','community-consensus','Yukihiro Matsumoto\'s handle; creator of Ruby.'],
  ['hejlsberg','/ˈhaɪlzbɜːrɡ/','hilez berg','','','','','person','community-consensus','Anders Hejlsberg (Turbo Pascal, C#, TypeScript). Danish.'],
  ['hickey','/ˈhɪki/','hick ee','','','','','person','community-consensus','Rich Hickey, creator of Clojure.'],
  ['valim','/vɐˈlĩ/','vah leem','','','','','person','community-consensus','José ("zhoo-ZEH") Valim, creator of Elixir. Portuguese.'],
  ['dahl','/dɑːl/','dahl','','','','','person','community-consensus','Ryan Dahl, creator of Node.js and Deno.'],
  ['hykes','/haɪks/','hikes','','','','','person','community-consensus','Solomon Hykes, creator of Docker.'],
  ['knuth','/kəˈnuːθ/','kuh nooth','','','','','person','community-consensus','Donald Knuth (TAOCP, TeX); "Ka-NOOTH".'],
  ['kernighan','/ˈkɜːrnɪhæn/','kur nih han','','','','','person','community-consensus','Brian Kernighan (C, Unix, "K" in K&R and AWK).'],
  ['ritchie','/ˈrɪtʃi/','rich ee','','','','','person','community-consensus','Dennis Ritchie, creator of C and co-creator of Unix.'],
  ['liskov','/ˈlɪskɒv/','liss kov','','','','','person','community-consensus','Barbara Liskov (Liskov Substitution Principle).'],
  ['cerf','/sɜːrf/','surf','','','','','person','community-consensus','Vint Cerf, co-designer of TCP/IP; "surf".'],
  ['lecun','/ləˈkʌn/','luh cun','','','','','person','community-consensus','Yann ("yahn") LeCun, deep-learning pioneer. French.'],
  ['bengio','/bɛnˈʒioʊ/','ben zhee oh','','','','','person','community-consensus','Yoshua Bengio, deep-learning pioneer. French-Canadian.'],
  ['sutskever','/ˈsʌtskɪvər/','suts kih ver','','','','','person','community-consensus','Ilya ("ill-YAH") Sutskever, OpenAI co-founder.'],
  ['hassabis','/həˈsæbɪs/','huh sab iss','','','','','person','community-consensus','Demis Hassabis, co-founder of DeepMind.'],
  ['hinton','/ˈhɪntən/','hin tun','','','','','person','community-consensus','Geoffrey Hinton, "godfather of deep learning".'],
  ['buterin','/ˈbjuːtərɪn/','byoo ter in','','','','','person','community-consensus','Vitalik ("VEE-tah-leek") Buterin, co-founder of Ethereum.'],
  ['vogels','/ˈvoʊɡəlz/','voh gels','','','','','person','community-consensus','Werner Vogels, Amazon CTO. Dutch.'],
  ['raadt','/də ˈrɑːt/','duh raht','','','','','person','community-consensus','Theo de Raadt, founder of OpenBSD and OpenSSH.'],
  ['poettering','/ˈpœtərɪŋ/','pet er ing','/ˈpoʊətərɪŋ/','poh eh ter ing','','','person','contested','Lennart Poettering (systemd, PulseAudio). German.'],
  ['bellard','/bɛˈlɑːr/','bell ar','','','','','person','community-consensus','Fabrice ("fah-BREES") Bellard (FFmpeg, QEMU, QuickJS). French.'],
  ['heinemeier','/ˈhaɪnəmaɪər/','hine my er','','','','','person','community-consensus','David Heinemeier Hansson (DHH), creator of Ruby on Rails.'],
  ['otwell','/ˈɒtwɛl/','ot well','','','','','person','community-consensus','Taylor Otwell, creator of Laravel.'],
  ['tiangolo','/tjɑːnˈɡoʊloʊ/','tyahn go lo','','','','','person','community-consensus','Sebastián Ramírez (handle "tiangolo"), creator of FastAPI.'],
  ['lerdorf','/ˈlɜːrdɔːrf/','lur dorf','','','','','person','community-consensus','Rasmus Lerdorf, creator of PHP.'],
  ['nakamoto','/ˌnɑːkəˈmoʊtoʊ/','nah kah mo toe','','','','','person','community-consensus','Satoshi Nakamoto, pseudonymous creator of Bitcoin.'],
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
