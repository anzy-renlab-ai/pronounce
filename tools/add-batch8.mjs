#!/usr/bin/env node
// Batch 8: AI-native company roles / org acronyms (C-suite, eng, product,
// design, data, GTM, ops, process). Letter-by-letter unless the community
// has settled on a syllabic reading (CISO, RACI, DevOps).
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── C-suite ───────────────────────────────────────────────────────────────
  ['CEO','/ˌsiː iː ˈoʊ/','see ee oh','','','https://en.wikipedia.org/wiki/Chief_executive_officer','Wikipedia','acronym','community-consensus','Chief Executive Officer; letters "C-E-O".'],
  ['CTO','/ˌsiː tiː ˈoʊ/','see tee oh','','','https://en.wikipedia.org/wiki/Chief_technology_officer','Wikipedia','acronym','community-consensus','Chief Technology Officer; letters "C-T-O".'],
  ['CFO','/ˌsiː ɛf ˈoʊ/','see eff oh','','','https://en.wikipedia.org/wiki/Chief_financial_officer','Wikipedia','acronym','community-consensus','Chief Financial Officer; letters "C-F-O".'],
  ['COO','/ˌsiː oʊ ˈoʊ/','see oh oh','','','https://en.wikipedia.org/wiki/Chief_operating_officer','Wikipedia','acronym','community-consensus','Chief Operating Officer; letters "C-O-O".'],
  ['CMO','/ˌsiː ɛm ˈoʊ/','see em oh','','','https://en.wikipedia.org/wiki/Chief_marketing_officer','Wikipedia','acronym','community-consensus','Chief Marketing Officer; letters "C-M-O".'],
  ['CPO','/ˌsiː piː ˈoʊ/','see pee oh','','','https://en.wikipedia.org/wiki/Chief_product_officer','Wikipedia','acronym','community-consensus','Chief Product Officer (also Chief People Officer); letters "C-P-O".'],
  ['CRO','/ˌsiː ɑːr ˈoʊ/','see ar oh','','','https://en.wikipedia.org/wiki/Chief_revenue_officer','Wikipedia','acronym','community-consensus','Chief Revenue Officer; letters "C-R-O".'],
  ['CIO','/ˌsiː aɪ ˈoʊ/','see eye oh','','','https://en.wikipedia.org/wiki/Chief_information_officer','Wikipedia','acronym','community-consensus','Chief Information Officer; letters "C-I-O".'],
  ['CISO','/ˈsiːsoʊ/','see soh','/ˌsiː aɪ ɛs ˈoʊ/','see eye ess oh','https://en.wikipedia.org/wiki/Chief_information_security_officer','Wikipedia','acronym','contested','Chief Information Security Officer; "SEE-soh" is dominant, letters also heard.'],
  ['CSO','/ˌsiː ɛs ˈoʊ/','see ess oh','','','https://en.wikipedia.org/wiki/Chief_security_officer','Wikipedia','acronym','community-consensus','Chief Security/Strategy/Sustainability Officer; letters "C-S-O".'],
  ['CHRO','/ˌsiː eɪtʃ ɑːr ˈoʊ/','see aitch ar oh','','','https://en.wikipedia.org/wiki/Chief_human_resources_officer','Wikipedia','acronym','community-consensus','Chief Human Resources Officer; letters "C-H-R-O".'],
  ['CDO','/ˌsiː diː ˈoʊ/','see dee oh','','','https://en.wikipedia.org/wiki/Chief_data_officer','Wikipedia','acronym','community-consensus','Chief Data/Design/Digital Officer; letters "C-D-O".'],
  ['CCO','/ˌsiː siː ˈoʊ/','see see oh','','','https://en.wikipedia.org/wiki/Chief_commercial_officer','Wikipedia','acronym','community-consensus','Chief Commercial/Customer/Compliance Officer; letters "C-C-O".'],
  // ── VP / director tier ────────────────────────────────────────────────────
  ['VP','/ˌviː ˈpiː/','vee pee','','','https://en.wikipedia.org/wiki/Vice_president','Wikipedia','acronym','community-consensus','Vice President; letters "V-P".'],
  ['SVP','/ˌɛs viː ˈpiː/','ess vee pee','','','','','acronym','community-consensus','Senior Vice President; letters "S-V-P".'],
  ['EVP','/ˌiː viː ˈpiː/','ee vee pee','','','','','acronym','community-consensus','Executive Vice President; letters "E-V-P".'],
  ['AVP','/ˌeɪ viː ˈpiː/','ay vee pee','','','','','acronym','community-consensus','Associate Vice President; letters "A-V-P".'],
  ['GM','/ˌdʒiː ˈɛm/','jee em','','','','','acronym','community-consensus','General Manager; letters "G-M".'],
  ['COS','/ˌsiː oʊ ˈɛs/','see oh ess','','','','','acronym','community-consensus','Chief of Staff; letters "C-O-S".'],
  // ── Engineering management & seniority ────────────────────────────────────
  ['EM','/ˌiː ˈɛm/','ee em','','','','','acronym','community-consensus','Engineering Manager; letters "E-M".'],
  ['TLM','/ˌtiː ɛl ˈɛm/','tee ell em','','','','','acronym','community-consensus','Tech Lead Manager (Google-coined hybrid IC+manager); letters "T-L-M".'],
  ['TL','/ˌtiː ˈɛl/','tee ell','','','','','acronym','community-consensus','Tech Lead; letters "T-L".'],
  ['IC','/ˌaɪ ˈsiː/','eye see','','','https://en.wikipedia.org/wiki/Individual_contributor','Wikipedia','acronym','community-consensus','Individual Contributor (non-manager track); letters "I-C".'],
  ['DRI','/ˌdiː ɑːr ˈaɪ/','dee ar eye','','','https://en.wikipedia.org/wiki/DRI','Wikipedia','acronym','community-consensus','Directly Responsible Individual (Apple-coined, now AI-native standard); letters "D-R-I".'],
  ['MTS','/ˌɛm tiː ˈɛs/','em tee ess','','','','','acronym','community-consensus','Member of Technical Staff (OpenAI/Anthropic IC title, Bell Labs heritage); letters "M-T-S".'],
  // ── Engineering specialties ───────────────────────────────────────────────
  ['SWE','/ˌɛs ˌdʌbəl juː ˈiː/','ess double yoo ee','/swiː/','swee','https://en.wikipedia.org/wiki/Software_engineering','Wikipedia','acronym','contested','Software Engineer; letters "S-W-E" common, "swee" used informally.'],
  ['MLE','/ˌɛm ɛl ˈiː/','em ell ee','','','','','acronym','community-consensus','Machine Learning Engineer; letters "M-L-E".'],
  ['RE','/ˌɑːr ˈiː/','ar ee','','','','','acronym','community-consensus','Research Engineer (AI lab IC track); letters "R-E".'],
  ['RS','/ˌɑːr ˈɛs/','ar ess','','','','','acronym','community-consensus','Research Scientist; letters "R-S".'],
  ['FDE','/ˌɛf diː ˈiː/','eff dee ee','','','https://en.wikipedia.org/wiki/Forward_deployed_engineer','Wikipedia','acronym','community-consensus','Forward Deployed Engineer (Palantir-coined, now AI-native standard); letters "F-D-E".'],
  ['FE','/ˌɛf ˈiː/','eff ee','','','','','acronym','community-consensus','Frontend (engineer); letters "F-E".'],
  ['BE','/ˌbiː ˈiː/','bee ee','','','','','acronym','community-consensus','Backend (engineer); letters "B-E".'],
  ['FSE','/ˌɛf ɛs ˈiː/','eff ess ee','','','','','acronym','community-consensus','Full-Stack Engineer; letters "F-S-E".'],
  ['PE','/ˌpiː ˈiː/','pee ee','','','','','acronym','community-consensus','Platform/Production Engineer; letters "P-E".'],
  ['QA','/ˌkjuː ˈeɪ/','kew ay','','','https://en.wikipedia.org/wiki/Quality_assurance','Wikipedia','acronym','community-consensus','Quality Assurance; letters "Q-A".'],
  ['QE','/ˌkjuː ˈiː/','kew ee','','','','','acronym','community-consensus','Quality Engineer; letters "Q-E".'],
  // ── Product / program ─────────────────────────────────────────────────────
  ['PM','/ˌpiː ˈɛm/','pee em','','','https://en.wikipedia.org/wiki/Product_manager','Wikipedia','acronym','community-consensus','Product Manager (also Project Manager); letters "P-M".'],
  ['TPM','/ˌtiː piː ˈɛm/','tee pee em','','','','','acronym','community-consensus','Technical Program/Product Manager; letters "T-P-M".'],
  ['PgM','/ˌpiː dʒiː ˈɛm/','pee jee em','','','','','acronym','community-consensus','Program Manager; letters "P-G-M".'],
  ['GPM','/ˌdʒiː piː ˈɛm/','jee pee em','','','','','acronym','community-consensus','Group Product Manager; letters "G-P-M".'],
  ['APM','/ˌeɪ piː ˈɛm/','ay pee em','','','','','acronym','community-consensus','Associate Product Manager (also Application Performance Monitoring); letters "A-P-M".'],
  ['PMM','/ˌpiː ɛm ˈɛm/','pee em em','','','','','acronym','community-consensus','Product Marketing Manager; letters "P-M-M".'],
  // ── Design / research ─────────────────────────────────────────────────────
  ['UX','/ˌjuː ˈɛks/','yoo ex','','','https://en.wikipedia.org/wiki/User_experience','Wikipedia','acronym','community-consensus','User Experience; letters "U-X".'],
  ['UI','/ˌjuː ˈaɪ/','yoo eye','','','https://en.wikipedia.org/wiki/User_interface','Wikipedia','acronym','community-consensus','User Interface; letters "U-I".'],
  ['UXR','/ˌjuː ɛks ˈɑːr/','yoo ex ar','','','','','acronym','community-consensus','UX Researcher; letters "U-X-R".'],
  ['UXE','/ˌjuː ɛks ˈiː/','yoo ex ee','','','','','acronym','community-consensus','UX Engineer; letters "U-X-E".'],
  // ── Data ──────────────────────────────────────────────────────────────────
  ['DS','/ˌdiː ˈɛs/','dee ess','','','','','acronym','community-consensus','Data Scientist; letters "D-S".'],
  ['DA','/ˌdiː ˈeɪ/','dee ay','','','','','acronym','community-consensus','Data Analyst; letters "D-A".'],
  ['DE','/ˌdiː ˈiː/','dee ee','','','','','acronym','community-consensus','Data Engineer; letters "D-E".'],
  ['DBA','/ˌdiː biː ˈeɪ/','dee bee ay','','','https://en.wikipedia.org/wiki/Database_administrator','Wikipedia','acronym','community-consensus','Database Administrator; letters "D-B-A".'],
  ['BIE','/ˌbiː aɪ ˈiː/','bee eye ee','','','','','acronym','community-consensus','Business Intelligence Engineer (Amazon title); letters "B-I-E".'],
  // ── GTM / customer ────────────────────────────────────────────────────────
  ['AE','/ˌeɪ ˈiː/','ay ee','','','','','acronym','community-consensus','Account Executive (sales); letters "A-E".'],
  ['AM','/ˌeɪ ˈɛm/','ay em','','','','','acronym','community-consensus','Account Manager; letters "A-M".'],
  ['SE','/ˌɛs ˈiː/','ess ee','','','','','acronym','community-consensus','Sales/Solutions Engineer; letters "S-E".'],
  ['SA','/ˌɛs ˈeɪ/','ess ay','','','','','acronym','community-consensus','Solutions Architect; letters "S-A".'],
  ['CSM','/ˌsiː ɛs ˈɛm/','see ess em','','','','','acronym','community-consensus','Customer Success Manager; letters "C-S-M".'],
  ['CS','/ˌsiː ˈɛs/','see ess','','','','','acronym','community-consensus','Customer Success (also Computer Science); letters "C-S".'],
  ['SDR','/ˌɛs diː ˈɑːr/','ess dee ar','','','','','acronym','community-consensus','Sales Development Rep; letters "S-D-R".'],
  ['BDR','/ˌbiː diː ˈɑːr/','bee dee ar','','','','','acronym','community-consensus','Business Development Rep; letters "B-D-R".'],
  ['BD','/ˌbiː ˈdiː/','bee dee','','','','','acronym','community-consensus','Business Development; letters "B-D".'],
  // ── Ops / finance ─────────────────────────────────────────────────────────
  ['BizOps','/ˈbɪz ɒps/','biz ops','','','','','acronym','community-consensus','Business Operations; "biz-ops".'],
  ['RevOps','/ˈrɛv ɒps/','rev ops','','','','','acronym','community-consensus','Revenue Operations; "rev-ops".'],
  ['FinOps','/ˈfɪn ɒps/','fin ops','','','https://en.wikipedia.org/wiki/FinOps','Wikipedia','acronym','community-consensus','Cloud Financial Operations; "fin-ops".'],
  ['PeopleOps','/ˈpiːpəl ɒps/','pee pul ops','','','','','acronym','community-consensus','People Operations (modern HR); "people-ops".'],
  ['HRBP','/ˌeɪtʃ ɑːr biː ˈpiː/','aitch ar bee pee','','','','','acronym','community-consensus','HR Business Partner; letters "H-R-B-P".'],
  // ── Process / planning ────────────────────────────────────────────────────
  ['KR','/ˌkeɪ ˈɑːr/','kay ar','','','','','acronym','community-consensus','Key Result (the "KR" in OKR); letters "K-R".'],
  ['RACI','/ˈreɪsi/','ray see','','','https://en.wikipedia.org/wiki/Responsibility_assignment_matrix','Wikipedia','acronym','community-consensus','Responsible-Accountable-Consulted-Informed; "RAY-see".'],
  ['EBR','/ˌiː biː ˈɑːr/','ee bee ar','','','','','acronym','community-consensus','Executive Business Review; letters "E-B-R".'],
  ['MBR','/ˌɛm biː ˈɑːr/','em bee ar','','','','','acronym','community-consensus','Monthly Business Review; letters "M-B-R".'],
  // ── AI-native / lab-specific titles ───────────────────────────────────────
  ['MoTS','/ˌɛm oʊ tiː ˈɛs/','em oh tee ess','/ˈmɒts/','mots','','','acronym','contested','Member of Technical Staff (compact form); letters or "mots".'],
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
