#!/usr/bin/env node
// Batch 10: the basic training / alignment / agent vocab every ML paper uses
// that we somehow missed — fine-tune, pretrain, prompt, alignment, agent, etc.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── Training stages ─────────────────────────────────────────────────────
  ['fine-tune','/ˌfaɪn ˈtjuːn/','fyne toon','','','','','cs-term','community-consensus','"FYNE-toon" — continue training a pretrained model on task data. Verb + compound.'],
  ['fine-tuning','/ˌfaɪn ˈtjuːnɪŋ/','fyne tooning','','','','','cs-term','community-consensus','"FYNE-tooning" — the noun form.'],
  ['pretrain','/ˌpriːˈtreɪn/','pree train','','','','','cs-term','community-consensus','"pree-TRAIN" — train from scratch on a large unlabeled corpus (the base step before fine-tuning).'],
  ['pretraining','/ˌpriːˈtreɪnɪŋ/','pree training','','','','','cs-term','community-consensus','"pree-TRAINING" — the noun form.'],
  ['adapter','/əˈdæptər/','uh dap ter','','','https://arxiv.org/abs/1902.00751','Houlsby et al. 2019','cs-term','community-consensus','"uh-DAP-ter" — small bottleneck layer injected into a frozen backbone (LoRA, IA³, etc. are adapter methods).'],
  ['instruction-tuning','/ɪnˈstrʌkʃən ˌtjuːnɪŋ/','in struk shun tooning','','','https://arxiv.org/abs/2109.01652','Wei et al. 2021 (FLAN)','cs-term','community-consensus','SFT on instruction-style (prompt, response) pairs; the step that turns a base LM into an instruct model.'],
  ['prompt-tuning','/ˈprɒmpt ˌtjuːnɪŋ/','prompt tooning','','','https://arxiv.org/abs/2104.08691','Lester et al. 2021','cs-term','community-consensus','Learn a soft-prompt embedding while the model stays frozen.'],
  ['prefix-tuning','/ˈpriːfɪks ˌtjuːnɪŋ/','pree fix tooning','','','https://arxiv.org/abs/2101.00190','Li & Liang 2021','cs-term','community-consensus','Tune a learned prefix prepended to each layer\'s keys/values.'],
  ['instruct','/ɪnˈstrʌkt/','in strukt','','','','','cs-term','community-consensus','"in-STRUKT" — short for instruction-tuned (GPT-3.5 Instruct, Llama-2-Instruct, etc.).'],
  ['few-shot','/ˌfjuː ˈʃɒt/','few shot','','','https://arxiv.org/abs/2005.14165','Brown et al. 2020 (GPT-3)','cs-term','community-consensus','"FEW-shot" — solve a task from k examples in the prompt; no weight updates.'],
  ['zero-shot','/ˌzɪroʊ ˈʃɒt/','zee roh shot','','','','','cs-term','community-consensus','"ZEE-roh-shot" — solve a task with no in-context examples.'],
  ['transfer-learning','/ˈtrænsfər ˌlɜːrnɪŋ/','trans fer ler ning','','','','','cs-term','community-consensus','Reuse representations learned on one task for another; the parent concept of fine-tuning.'],
  ['continual-learning','/kənˈtɪnjuəl ˌlɜːrnɪŋ/','kun tin yoo ul ler ning','','','','','cs-term','community-consensus','Sequential training across tasks without catastrophic forgetting; "kun-TIN-yoo-ul learning".'],
  ['curriculum-learning','/kəˈrɪkjələm ˌlɜːrnɪŋ/','kuh rik yu lum ler ning','','','https://dl.acm.org/doi/10.1145/1553374.1553380','Bengio et al. 2009','cs-term','community-consensus','Train on easy examples first, then harder; "kuh-RIK-yu-lum learning".'],
  ['scaling-laws','/ˈskeɪlɪŋ ˌlɔːz/','skay ling lawz','','','https://arxiv.org/abs/2001.08361','Kaplan et al. 2020','cs-term','community-consensus','Power-law relations between compute / data / params and loss; "SKAY-ling laws".'],
  ['downstream','/ˌdaʊnˈstriːm/','down streem','','','','','cs-term','community-consensus','"DOWN-STREEM" — the application/eval task that a pretrained model is adapted to.'],
  // ── Alignment / safety ──────────────────────────────────────────────────
  ['alignment','/əˈlaɪnmənt/','uh lyne munt','','','','','cs-term','community-consensus','"uh-LYNE-munt" — making model behavior match human intent and values.'],
  ['jailbreak','/ˈdʒeɪlˌbreɪk/','jayl brake','','','','','cs-term','community-consensus','"JAYL-brake" — prompt or attack that bypasses an LM\'s safety policies.'],
  ['red-teaming','/ˈrɛd ˌtiːmɪŋ/','red teeming','','','','','cs-term','community-consensus','"RED-teeming" — adversarial probing of an LM to find unsafe outputs.'],
  ['reward-model','/rɪˈwɔːrd ˌmɒdəl/','rih ward mod ul','','','','','cs-term','community-consensus','RM in RLHF — scores responses to drive PPO/DPO; "rih-WARD model".'],
  ['preference','/ˈprɛfərəns/','pref er uns','','','','','cs-term','community-consensus','"PREF-er-uns" — pairwise (A > B) judgements collected for preference learning.'],
  ['HHH','/ˌeɪtʃ eɪtʃ ˈeɪtʃ/','aitch aitch aitch','','','https://arxiv.org/abs/2112.00861','Askell et al. 2021','acronym','community-consensus','Helpful, Honest, Harmless — Anthropic\'s alignment goal triad; letters "H-H-H".'],
  ['grounding','/ˈɡraʊndɪŋ/','grown ding','','','','','cs-term','community-consensus','"GROWN-ding" — tying generations to verifiable evidence (retrieved docs, tool output).'],
  ['hallucination','/həˌluːsɪˈneɪʃən/','huh loo sih nay shun','','','','','cs-term','community-consensus','"huh-LOO-sih-NAY-shun" — an LM\'s confident but ungrounded fabrications.'],
  ['hallucinate','/həˈluːsɪˌneɪt/','huh loo sih nate','','','','','cs-term','community-consensus','"huh-LOO-sih-nate" — verb form.'],
  // ── Agents / tool use ───────────────────────────────────────────────────
  ['agent','/ˈeɪdʒənt/','ay junt','','','','','cs-term','community-consensus','"AY-junt" — an LM-driven loop that perceives, plans, calls tools, and acts.'],
  ['agentic','/eɪˈdʒɛntɪk/','ay jen tik','','','','','cs-term','community-consensus','"ay-JEN-tik" — adjective; capable of multi-step autonomous action.'],
  ['tool-use','/ˈtuːl ˌjuːs/','tool yoos','','','','','cs-term','community-consensus','"TOOL-YOOS" — LM-invoked external functions (search, code exec, calc).'],
  ['function-calling','/ˈfʌŋkʃən ˌkɔːlɪŋ/','funk shun call ing','','','https://platform.openai.com/docs/guides/function-calling','OpenAI docs','cs-term','community-consensus','OpenAI/JSON-schema-style tool invocation API; "FUNK-shun calling".'],
  // ── Prompting ───────────────────────────────────────────────────────────
  ['prompt','/prɒmpt/','prompt','','','','','cs-term','community-consensus','"PROMPT" — the input string fed to an LM.'],
  ['prompting','/ˈprɒmptɪŋ/','prompt ing','','','','','cs-term','community-consensus','"PROMPT-ing" — the noun form.'],
  ['reasoning','/ˈriːzənɪŋ/','ree zun ing','','','','','cs-term','community-consensus','"REE-zun-ing" — multi-step inference; also the name of the model class (o1, R1, etc.).'],
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
