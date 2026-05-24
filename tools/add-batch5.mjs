#!/usr/bin/env node
// Batch 5: Greek letters (ML/math), AWS/GCP services, file formats, mispronounced CS words.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── Greek letters (constants/symbols in ML, math, code) ───────────────────
  ['eta','/ˈeɪtə/','ay tuh','/ˈiːtə/','ee tuh','','','cs-term','contested','Greek letter η (learning rate); US math "AY-tuh", also "EE-tuh".'],
  ['nu','/njuː/','new','/nuː/','noo','','','cs-term','community-consensus','Greek letter ν; "new"/"noo". Not to be confused with mu.'],
  ['psi','/saɪ/','sigh','/psaɪ/','p sigh','','','cs-term','contested','Greek letter ψ (wavefunction); US "sigh", some "p-sigh".'],
  ['xi','/zaɪ/','zye','/ksaɪ/','k sigh','','','cs-term','contested','Greek letter ξ; readings vary wildly — "zye", "k-sigh", "ksee".'],
  ['rho','/roʊ/','roh','','','','','cs-term','community-consensus','Greek letter ρ (correlation, density); "roh".'],
  ['tau','/taʊ/','tow','/tɔː/','taw','','','cs-term','contested','Greek letter τ; "tow" (rhymes cow) vs "taw".'],
  ['zeta','/ˈzeɪtə/','zay tuh','/ˈziːtə/','zee tuh','','','cs-term','contested','Greek letter ζ; US "ZAY-tuh", also "ZEE-tuh".'],
  ['omega','/oʊˈmeɪɡə/','oh may guh','','','','','cs-term','community-consensus','Greek letter ω; "oh-MAY-guh".'],
  ['omicron','/ˈɒmɪkrɒn/','om ih kron','/ˈoʊmɪkrɒn/','oh mih kron','','','cs-term','contested','Greek letter ο; "OM-ih-kron" vs "OH-mih-kron".'],
  ['upsilon','/ˈʌpsɪlɒn/','up sih lon','/juːpˈsaɪlən/','yoop sigh lun','','','cs-term','contested','Greek letter υ; "UP-sih-lon" vs "yoop-SY-lun".'],
  // ── AWS / GCP / cloud services ────────────────────────────────────────────
  ['athena','/əˈθiːnə/','uh thee nuh','','','','','product','community-consensus','AWS Athena (serverless query); "uh-THEE-nuh", the goddess.'],
  ['aurora','/ɔːˈrɔːrə/','uh ror uh','','','','','product','community-consensus','AWS Aurora database; "uh-ROR-uh".'],
  ['bedrock','/ˈbɛdrɒk/','bed rock','','','','','product','community-consensus','AWS Bedrock (managed LLMs); "bed-rock".'],
  ['bigquery','/ˈbɪɡ ˌkwɪri/','big kweer ee','','','','','product','community-consensus','Google BigQuery; "big-QUERY".'],
  ['cloudfront','/ˈklaʊd frʌnt/','cloud frunt','','','','','product','community-consensus','AWS CloudFront CDN; "cloud-front".'],
  ['cognito','/kɒɡˈniːtoʊ/','kog nee toh','','','','','product','community-consensus','AWS Cognito (auth); "kog-NEE-toh" (from incognito).'],
  ['fargate','/ˈfɑːrɡeɪt/','far gate','','','','','product','community-consensus','AWS Fargate (serverless containers); "FAR-gate".'],
  ['kinesis','/kɪˈniːsɪs/','kih nee sis','','','','','product','community-consensus','AWS Kinesis (streaming); "kih-NEE-sis".'],
  ['redshift','/ˈrɛdʃɪft/','red shift','','','','','product','community-consensus','AWS Redshift warehouse; "red-shift".'],
  ['sagemaker','/ˈseɪdʒmeɪkər/','sage maker','','','','','product','community-consensus','AWS SageMaker (ML); "sage-maker".'],
  ['sqs','/ˌɛs kjuː ˈɛs/','ess cue ess','','','','','abbreviation','community-consensus','AWS Simple Queue Service; letters "S-Q-S".'],
  ['sns','/ˌɛs ɛn ˈɛs/','ess en ess','','','','','abbreviation','community-consensus','AWS Simple Notification Service; letters "S-N-S".'],
  ['vpc','/ˌviː piː ˈsiː/','vee pee see','','','','','abbreviation','community-consensus','Virtual Private Cloud; letters "V-P-C".'],
  ['pubsub','/ˈpʌbsʌb/','pub sub','','','','','product','community-consensus','Google Pub/Sub messaging; "pub-sub".'],
  ['firebase','/ˈfaɪərbeɪs/','fire base','','','','','product','community-consensus','Google Firebase platform; "fire-base".'],
  ['metamask','/ˈmɛtəmɑːsk/','met uh mask','','','','','product','community-consensus','Ethereum wallet; "META-mask".'],
  // ── File formats / extensions ─────────────────────────────────────────────
  ['avif','/ˈeɪvɪf/','ay vif','','','','','abbreviation','community-consensus','AV1 Image Format; "AY-vif".'],
  ['heic','/ˌeɪtʃ iː aɪ ˈsiː/','aitch ee eye see','/heɪk/','hake','','','abbreviation','contested','Apple High-Efficiency image; spelled "H-E-I-C", some say "hake".'],
  ['webp','/ˌwɛb ˈpiː/','web pee','','','','','abbreviation','community-consensus','Google image format; "web-P".'],
  ['flac','/flæk/','flak','','','','','abbreviation','community-consensus','Free Lossless Audio Codec; "flak".'],
  ['ogg','/ɒɡ/','og','','','','','abbreviation','community-consensus','Ogg audio container; "og".'],
  ['mkv','/ˌɛm keɪ ˈviː/','em kay vee','','','','','abbreviation','community-consensus','Matroska video container; letters "M-K-V".'],
  ['svg','/ˌɛs viː ˈdʒiː/','ess vee jee','','','','','abbreviation','community-consensus','Scalable Vector Graphics; letters "S-V-G".'],
  ['jpeg','/ˈdʒeɪpɛɡ/','jay peg','','','','','abbreviation','community-consensus','Joint Photographic Experts Group; "JAY-peg".'],
  ['ico','/ˈaɪkoʊ/','eye koh','/ˌaɪ siː ˈoʊ/','eye see oh','','','abbreviation','contested','Windows icon format; "EYE-koh" or letters "I-C-O".'],
  ['woff','/wɒf/','woff','','','','','abbreviation','community-consensus','Web Open Font Format; "woff".'],
  // ── Commonly mispronounced CS / English words ─────────────────────────────
  ['facade','/fəˈsɑːd/','fuh sahd','','','','','cs-term','community-consensus','Design pattern; "fuh-SAHD" (the ç/c is soft).'],
  ['paradigm','/ˈpærədaɪm/','pa ruh dime','','','','','cs-term','community-consensus','"PA-ruh-dime"; the g is silent.'],
  ['heuristic','/hjʊˈrɪstɪk/','hyoo riss tik','','','','','cs-term','community-consensus','"hyoo-RISS-tik".'],
  ['mnemonic','/nɪˈmɒnɪk/','nih mon ik','','','','','cs-term','community-consensus','"nih-MON-ik"; the m is silent.'],
  ['ephemeral','/ɪˈfɛmərəl/','ih fem er ul','','','','','cs-term','community-consensus','Short-lived (ephemeral storage/ports); "ih-FEM-er-ul".'],
  ['pseudo','/ˈsuːdoʊ/','soo doh','','','','','cs-term','community-consensus','"SOO-doh"; the p is silent. Not the same as `sudo`.'],
  ['quasi','/ˈkweɪzaɪ/','kway zye','/ˈkwɑːzi/','kwah zee','','','cs-term','contested','"KWAY-zye" (US) vs "KWAH-zee".'],
  ['verbose','/vɜːrˈboʊs/','ver bohss','','','','','cs-term','community-consensus','As in --verbose; "ver-BOHSS".'],
  // ── IDEs / frameworks / graphics ──────────────────────────────────────────
  ['pycharm','/ˈpaɪtʃɑːrm/','pie charm','','','','','product','community-consensus','JetBrains Python IDE; "PIE-charm".'],
  ['webstorm','/ˈwɛbstɔːrm/','web storm','','','','','product','community-consensus','JetBrains JS IDE; "web-storm".'],
  ['spring','/sprɪŋ/','spring','','','','','product','community-consensus','Java framework; "spring", like the season.'],
  ['opengl','/ˌoʊpən dʒiː ˈɛl/','open jee ell','','','','','abbreviation','community-consensus','Graphics API; "open-G-L".'],
  ['directx','/dɪˈrɛkt ɛks/','dih rekt eks','','','','','product','community-consensus','Microsoft graphics API; "Direct-X".'],
  ['metal','/ˈmɛtəl/','met ul','','','','','product','community-consensus','Apple graphics API; "metal", like the material.'],
  ['threejs','/ˌθriː dʒeɪ ˈɛs/','three jay ess','','','','','product','community-consensus','Three.js WebGL library; "three-J-S".'],
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
