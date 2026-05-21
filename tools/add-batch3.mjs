#!/usr/bin/env node
// One-off batch 3: AI/ML projects, models, and researchers.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── AI/ML projects, models, tools ─────────────────────────────────────────
  ['alpaca','/ælˈpækə/','al pack uh','','','','','product','community-consensus','Stanford instruction-tuned LLaMA; like the animal.'],
  ['altair','/ælˈtɛər/','al tair','/ælˈtaɪər/','al tire','','','tool','contested','Python declarative viz library; "al-TAIR" or "al-TYRE", from the star.'],
  ['automatic1111','/ˌɔːtəˈmætɪk ɪˈlɛvən ɪˈlɛvən/','automatic eleven eleven','','','','','product','community-consensus','Stable Diffusion WebUI; "automatic-eleven-eleven".'],
  ['bark','/bɑːrk/','bark','','','','','product','community-consensus','Suno text-to-audio model; like a dog bark.'],
  ['bentoml','/ˈbɛntoʊ ɛm ɛl/','bento em ell','','','','','tool','community-consensus','Model serving framework; "Bento-M-L".'],
  ['bokeh','/ˈboʊkeɪ/','boh kay','/ˈboʊkə/','boh kuh','','','tool','contested','Python interactive viz library; from the photography term (Japanese).'],
  ['catboost','/ˈkæt buːst/','cat boost','','','','','tool','community-consensus','Gradient boosting library; "cat-boost" (categorical boosting).'],
  ['colab','/ˈkoʊlæb/','co lab','','','','','product','community-consensus','Google Colaboratory notebooks; "co-lab".'],
  ['coreml','/ˈkɔːr ɛm ɛl/','core em ell','','','','','tool','community-consensus','Apple on-device ML framework; "Core-M-L".'],
  ['deberta','/diːˈbɜːrtə/','dee bur tuh','','','','','product','community-consensus','Decoding-enhanced BERT; "dee-BER-tuh".'],
  ['diffusers','/dɪˈfjuːzərz/','dih fyoo zers','','','','','tool','community-consensus','Hugging Face diffusion-models library.'],
  ['einops','/ˈaɪnɒps/','eyen ops','','','','','tool','community-consensus','Tensor-rearrangement library; "EIN-ops" (Einstein ops).'],
  ['flax','/flæks/','flaks','','','','','tool','community-consensus','JAX neural-network library; like the plant "flax".'],
  ['flowise','/ˈfloʊwaɪz/','flo wize','','','','','tool','community-consensus','Visual LLM-flow builder; "flow-wise".'],
  ['fooocus','/ˈfoʊkəs/','focus','','','','','product','community-consensus','Image-generation UI; pronounced "focus" (spelled with three o\'s).'],
  ['gensim','/ˈdʒɛnsɪm/','jen sim','','','','','tool','community-consensus','Topic-modeling library; "JEN-sim".'],
  ['ggml','/ˌdʒiː dʒiː ɛm ˈɛl/','jee jee em ell','','','','','tool','community-consensus','Tensor library behind llama.cpp; letters "G-G-M-L".'],
  ['gguf','/ˌdʒiː dʒiː juː ˈɛf/','jee jee you eff','','','','','abbreviation','community-consensus','Quantized-model file format; letters "G-G-U-F".'],
  ['invokeai','/ɪnˈvoʊk eɪ aɪ/','in voke ay eye','','','','','product','community-consensus','Stable Diffusion creative toolkit; "Invoke-A-I".'],
  ['kaggle','/ˈkæɡəl/','kag ul','','','','','product','community-consensus','Data-science competition platform; "KAG-ul".'],
  ['kubeflow','/ˈkuːb floʊ/','koob flow','','','','','tool','community-consensus','ML toolkit on Kubernetes; "kube-flow".'],
  ['lancedb','/ˈlæns diː biː/','lance dee bee','','','','','product','community-consensus','Embedded vector database; "Lance-D-B".'],
  ['langflow','/ˈlæŋ floʊ/','lang flow','','','','','tool','community-consensus','LangChain visual builder; "lang-flow".'],
  ['langgraph','/ˈlæŋ ɡræf/','lang graf','','','','','tool','community-consensus','LangChain stateful agent framework; "lang-graph".'],
  ['lightgbm','/ˈlaɪt dʒiː biː ɛm/','light jee bee em','','','','','tool','community-consensus','Microsoft gradient boosting; "Light-G-B-M".'],
  ['llamafile','/ˈlɑːmə faɪl/','lah muh file','','','','','tool','community-consensus','Single-file LLM executable; "llama-file".'],
  ['mamba','/ˈmæmbə/','mam buh','','','','','product','community-consensus','State-space sequence model; like the snake.'],
  ['mlx','/ˌɛm ɛl ˈɛks/','em ell eks','','','','','tool','community-consensus','Apple Silicon array/ML framework; letters "M-L-X".'],
  ['nltk','/ˌɛn ɛl tiː ˈkeɪ/','en ell tee kay','','','','','tool','community-consensus','Natural Language Toolkit; letters.'],
  ['olmo','/ˈoʊlmoʊ/','ol mo','','','','','product','community-consensus','AllenAI fully-open LLM; "OL-mo".'],
  ['openvino','/ˌoʊpən ˈviːnoʊ/','open vee no','','','','','tool','community-consensus','Intel inference toolkit; "open-VEE-no".'],
  ['pgvector','/ˌpiː dʒiː ˈvɛktər/','pee jee vector','','','','','tool','community-consensus','Postgres vector-search extension; "P-G-vector".'],
  ['piper','/ˈpaɪpər/','pipe er','','','','','tool','community-consensus','Fast local neural TTS; "PIPE-er".'],
  ['plotly','/ˈplɒtli/','plot lee','','','','','tool','community-consensus','Interactive plotting library; "PLOT-lee".'],
  ['pythia','/ˈpɪθiə/','pith ee uh','','','','','product','community-consensus','EleutherAI model suite; "PITH-ee-uh", the Oracle of Delphi.'],
  ['roberta','/roʊˈbɜːrtə/','ro bur tuh','','','','','product','community-consensus','Robustly-optimized BERT; "ro-BER-tuh".'],
  ['rwkv','/ˌɑːr dʌbəljuː keɪ ˈviː/','ar double you kay vee','','','','','product','community-consensus','RNN-with-transformer-strength model; usually letters, some say "RWa-Kuv".'],
  ['safetensors','/ˈseɪf tɛnsərz/','safe tensors','','','','','tool','community-consensus','Safe model-weight serialization format; "safe-tensors".'],
  ['scikit','/ˈsaɪ kɪt/','sigh kit','','','','','tool','community-consensus','As in scikit-learn; "sci-kit" (SciPy toolkit).'],
  ['seaborn','/ˈsiːbɔːrn/','see born','','','','','tool','community-consensus','Statistical viz library on matplotlib; "SEE-born".'],
  ['sklearn','/ˌɛs keɪ ˈlɜːrn/','ess kay learn','','','','','tool','community-consensus','scikit-learn import alias; "S-K-learn".'],
  ['spacy','/ˈspeɪsi/','spay see','','','','','tool','community-consensus','Industrial NLP library; "spay-see" (spaCy).'],
  ['tokenizers','/ˈtoʊkənaɪzərz/','toke en eye zers','','','','','tool','community-consensus','Hugging Face fast-tokenizers library.'],
  ['vespa','/ˈvɛspə/','vess puh','','','','','product','community-consensus','Search + vector engine; "VESS-puh", like the scooter.'],
  ['vits','/vɪts/','vits','/ˌviː aɪ tiː ˈɛs/','vee eye tee ess','','','product','contested','End-to-end TTS model; "vits" or spelled out.'],
  ['wandb','/ˌdʌbəljuː ænd ˈbiː/','double you and bee','','','','','tool','community-consensus','Weights & Biases; "W-and-B" or "wand-B".'],
  ['xgboost','/ˌɛks dʒiː ˈbuːst/','eks jee boost','','','','','tool','community-consensus','Scalable gradient boosting; "X-G-boost".'],
  // ── AI/ML researchers & founders ──────────────────────────────────────────
  ['abbeel','/ˈɑːbiːl/','ah beel','','','','','person','community-consensus','Pieter Abbeel, robotics/RL researcher (Berkeley, Covariant).'],
  ['altman','/ˈɔːltmən/','alt mun','','','','','person','community-consensus','Sam Altman, CEO of OpenAI; "ALT-mun".'],
  ['amodei','/ˌɑːmoʊˈdeɪ/','ah mo day','','','','','person','community-consensus','Dario Amodei, CEO of Anthropic; "ah-mo-DAY". Italian.'],
  ['bahdanau','/ˌbɑːdɑːˈnaʊ/','bah dah now','','','','','person','community-consensus','Dzmitry Bahdanau, co-author of neural attention.'],
  ['brockman','/ˈbrɒkmən/','brock mun','','','','','person','community-consensus','Greg Brockman, co-founder & president of OpenAI.'],
  ['chollet','/ʃɔːˈleɪ/','show lay','','','','','person','community-consensus','François Chollet, creator of Keras; "show-LAY". French.'],
  ['devlin','/ˈdɛvlɪn/','dev lin','','','','','person','community-consensus','Jacob Devlin, lead author of BERT.'],
  ['goodfellow','/ˈɡʊdfɛloʊ/','good fellow','','','','','person','community-consensus','Ian Goodfellow, inventor of GANs.'],
  ['hochreiter','/ˈhɔːxraɪtər/','hoke ry ter','','','','','person','community-consensus','Sepp Hochreiter, co-inventor of LSTM. German.'],
  ['howard','/ˈhaʊərd/','how erd','','','','','person','community-consensus','Jeremy Howard, co-founder of fast.ai.'],
  ['huang','/hwɑːŋ/','hwang','','','','','person','community-consensus','Jensen Huang, co-founder & CEO of NVIDIA; "hwang".'],
  ['kingma','/ˈkɪŋmə/','king muh','','','','','person','community-consensus','Diederik Kingma, co-author of Adam and the VAE.'],
  ['krizhevsky','/krɪˈʒɛfski/','krih zhef skee','','','','','person','community-consensus','Alex Krizhevsky, lead author of AlexNet.'],
  ['mikolov','/ˈmiːkəlɒf/','mee koh lof','','','','','person','community-consensus','Tomáš Mikolov, creator of word2vec. Czech.'],
  ['mnih','/məˈniː/','muh nee','','','','','person','community-consensus','Volodymyr Mnih, lead author of the DQN / Atari paper.'],
  ['ng','/ɪŋ/','ing','/ˌɛn ˈdʒiː/','en jee','','','person','contested','Andrew Ng (Coursera, deeplearning.ai); roughly "ng/ing", often spelled "N-G".'],
  ['polosukhin','/ˌpɒloʊˈsuːkɪn/','po lo soo kin','','','','','person','community-consensus','Illia Polosukhin, co-author of "Attention Is All You Need".'],
  ['raffel','/ˈræfəl/','raf ul','','','','','person','community-consensus','Colin Raffel, lead author of T5.'],
  ['ramesh','/ˈrɑːmɛʃ/','rah mesh','','','','','person','community-consensus','Aditya Ramesh, creator of DALL·E.'],
  ['rombach','/ˈrɒmbɑːx/','rom bahk','','','','','person','community-consensus','Robin Rombach, lead author of Stable Diffusion / latent diffusion. German.'],
  ['schmidhuber','/ˈʃmɪthuːbər/','shmit hoo ber','','','','','person','community-consensus','Jürgen Schmidhuber, co-inventor of LSTM. German.'],
  ['shazeer','/ʃəˈzɪər/','shuh zeer','','','','','person','community-consensus','Noam ("NOH-um") Shazeer, Transformer co-author, founder of Character.AI.'],
  ['szegedy','/ˈsɛɡɛdi/','seg eh dee','','','','','person','community-consensus','Christian Szegedy (Inception, adversarial examples). Hungarian.'],
  ['uszkoreit','/ˈuːʃkɔːraɪt/','oosh kor ite','','','','','person','community-consensus','Jakob Uszkoreit, co-author of the Transformer. German.'],
  ['vaswani','/vəˈswɑːni/','vuh swah nee','','','','','person','community-consensus','Ashish Vaswani, lead author of "Attention Is All You Need".'],
  ['vinyals','/viˈɲals/','vin yals','','','','','person','community-consensus','Oriol ("oh-ree-OL") Vinyals, DeepMind (Seq2Seq, AlphaStar). Catalan.'],
  ['wojciech','/ˈvɔɪtɛx/','voy tekh','','','','','person','community-consensus','Polish first name (e.g. Wojciech Zaremba, OpenAI); "VOY-tekh".'],
  ['zaremba','/zəˈrɛmbə/','zuh rem buh','','','','','person','community-consensus','Wojciech Zaremba, co-founder of OpenAI. Polish.'],
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
