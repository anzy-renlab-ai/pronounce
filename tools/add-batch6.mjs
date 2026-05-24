#!/usr/bin/env node
// Batch 6: ML / math vocabulary — training, optimization, linear algebra, named after people.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  ['distill','/dɪˈstɪl/','dih still','','','','','cs-term','community-consensus','Knowledge distillation: train a small model to mimic a big one; "dih-STILL".'],
  ['distillation','/ˌdɪstɪˈleɪʃən/','diss tih lay shun','','','','','cs-term','community-consensus','The process of distilling a model; "diss-tih-LAY-shun".'],
  ['quantize','/ˈkwɒntaɪz/','kwon tize','','','','','cs-term','community-consensus','Reduce numeric precision (model quantization); "KWON-tize".'],
  ['quantization','/ˌkwɒntɪˈzeɪʃən/','kwon tih zay shun','','','','','cs-term','community-consensus','Compressing weights to lower precision; "kwon-tih-ZAY-shun".'],
  ['logits','/ˈloʊdʒɪts/','loh jits','','','','','cs-term','community-consensus','Raw pre-softmax outputs; "LOH-jits" (soft g).'],
  ['epoch','/ˈɛpək/','ep uk','/ˈiːpɒk/','ee pok','','','cs-term','contested','One full pass over the training data; US "EP-uk", also "EE-pok".'],
  ['stochastic','/stəˈkæstɪk/','stuh kass tik','','','','','cs-term','community-consensus','Random (stochastic gradient descent); "stuh-KASS-tik".'],
  ['bayesian','/ˈbeɪziən/','bay zee un','/ˈbeɪʒən/','bay zhun','','','cs-term','contested','From Bayes; "BAY-zee-un" or "BAY-zhun".'],
  ['gaussian','/ˈɡaʊsiən/','gow see un','','','','','cs-term','community-consensus','From Gauss (normal distribution); "GOW-see-un".'],
  ['euler','/ˈɔɪlər/','oy ler','','','','','cs-term','community-consensus','Mathematician Euler; "OY-ler", not "YOO-ler".'],
  ['eigen','/ˈaɪɡən/','eye gun','','','','','cs-term','community-consensus','German prefix (eigenvalue/eigenvector); "EYE-gun".'],
  ['eigenvalue','/ˈaɪɡənˌvæljuː/','eye gun val yoo','','','','','cs-term','community-consensus','"EYE-gun-val-yoo".'],
  ['jacobian','/dʒəˈkoʊbiən/','juh koh bee un','','','','','cs-term','community-consensus','Matrix of first-order partial derivatives; "juh-KOH-bee-un".'],
  ['lagrange','/ləˈɡrɑːnʒ/','luh grahnzh','','','','','cs-term','community-consensus','Mathematician Lagrange; "luh-GRAHNZH". French.'],
  ['lagrangian','/ləˈɡrɑːndʒiən/','luh grahn jee un','','','','','cs-term','community-consensus','"luh-GRAHN-jee-un" (Lagrange multipliers).'],
  ['riemann','/ˈriːmɑːn/','ree mahn','','','','','cs-term','community-consensus','Mathematician Riemann; "REE-mahn". German.'],
  ['ablation','/əˈbleɪʃən/','uh blay shun','','','','','cs-term','community-consensus','Ablation study: remove a part to measure its effect; "uh-BLAY-shun".'],
  ['annealing','/əˈniːlɪŋ/','uh nee ling','','','','','cs-term','community-consensus','Simulated annealing (optimization); "uh-NEE-ling".'],
  ['asymptotic','/ˌæsɪmpˈtɒtɪk/','ass im tot ik','','','','','cs-term','community-consensus','Behavior in the limit; "ass-im-TOT-ik".'],
  ['backprop','/ˈbækprɒp/','back prop','','','','','cs-term','community-consensus','Short for backpropagation; "back-prop".'],
  ['backpropagation','/ˌbækprɒpəˈɡeɪʃən/','back prop uh gay shun','','','','','cs-term','community-consensus','Gradient computation through the network; "back-prop-uh-GAY-shun".'],
  ['centroid','/ˈsɛntrɔɪd/','sen troyd','','','','','cs-term','community-consensus','Cluster center (k-means); "SEN-troyd".'],
  ['corpus','/ˈkɔːrpəs/','kor pus','','','','','cs-term','community-consensus','A body of text/data; "KOR-pus". Plural: corpora.'],
  ['corpora','/ˈkɔːrpərə/','kor per uh','','','','','cs-term','community-consensus','Plural of corpus; "KOR-per-uh".'],
  ['cosine','/ˈkoʊsaɪn/','koh sine','','','','','cs-term','community-consensus','Cosine similarity; "KOH-sine".'],
  ['covariance','/koʊˈvɛəriəns/','koh vair ee uns','','','','','cs-term','community-consensus','"koh-VAIR-ee-uns".'],
  ['determinant','/dɪˈtɜːrmɪnənt/','dih ter mih nunt','','','','','cs-term','community-consensus','Scalar from a square matrix; "dih-TER-mih-nunt".'],
  ['embedding','/ɪmˈbɛdɪŋ/','im bed ing','','','','','cs-term','community-consensus','Dense vector representation; "im-BED-ing".'],
  ['ensemble','/ɒnˈsɒmbəl/','on som bul','','','','','cs-term','community-consensus','Combine multiple models; "on-SOM-bul". French.'],
  ['entropy','/ˈɛntrəpi/','en truh pee','','','','','cs-term','community-consensus','Measure of uncertainty (cross-entropy loss); "EN-truh-pee".'],
  ['hessian','/ˈhɛʃən/','hesh un','','','','','cs-term','community-consensus','Matrix of second-order partial derivatives; "HESH-un".'],
  ['hyperparameter','/ˈhaɪpərpəˌræmɪtər/','hyper puh ram ih ter','','','','','cs-term','community-consensus','A setting chosen before training (lr, batch size); "hyper-puh-RAM-ih-ter".'],
  ['inference','/ˈɪnfərəns/','in fer uns','','','','','cs-term','community-consensus','Running a trained model on new data; "IN-fer-uns".'],
  ['laplace','/ləˈplɑːs/','luh plahss','','','','','cs-term','community-consensus','Mathematician Laplace; "luh-PLAHSS". French.'],
  ['laplacian','/ləˈplɑːsiən/','luh plah see un','','','','','cs-term','community-consensus','"luh-PLAH-see-un" (graph Laplacian).'],
  ['latent','/ˈleɪtənt/','lay tunt','','','','','cs-term','community-consensus','Hidden (latent space, latent diffusion); "LAY-tunt".'],
  ['manifold','/ˈmænɪfoʊld/','man ih fold','','','','','cs-term','community-consensus','A curved space (manifold hypothesis); "MAN-ih-fold".'],
  ['scalar','/ˈskeɪlər/','skay ler','','','','','cs-term','community-consensus','A single number; "SKAY-ler".'],
  ['sigmoid','/ˈsɪɡmɔɪd/','sig moyd','','','','','cs-term','community-consensus','S-shaped activation function; "SIG-moyd".'],
  ['tokenization','/ˌtoʊkənaɪˈzeɪʃən/','toh kun eye zay shun','','','','','cs-term','community-consensus','Splitting text into tokens; "toh-kun-eye-ZAY-shun".'],
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
