#!/usr/bin/env node
// Batch 9: arXiv-paper vocabulary — venues, evaluation metrics, named
// architectures, training/alignment techniques, statistics, and researchers
// every ML reader runs into and routinely says wrong.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── Venues / publishing process ─────────────────────────────────────────
  ['arxiv','/ˈɑːrkaɪv/','ar kive','','','https://info.arxiv.org/help/faq/whatisarxiv.html','arXiv FAQ','product','creator-clarified','"AR-kive" — the X is Greek chi (/k/), so it sounds like "archive". Not "arks-iv".'],
  ['preprint','/ˈpriːˌprɪnt/','pree print','','','','','cs-term','community-consensus','"PREE-print" — pre-peer-review manuscript on arXiv/bioRxiv/etc.'],
  ['NeurIPS','/ˈnʊrɪps/','noor ips','/ˈnɔːrɪps/','nor ips','https://neurips.cc/','NeurIPS official','acronym','community-consensus','Neural Information Processing Systems; renamed from NIPS in 2018; "NUR-ips" or "NOR-ips".'],
  ['ICML','/ˌaɪ siː ɛm ˈɛl/','eye see em ell','','','https://icml.cc/','ICML','acronym','community-consensus','International Conference on Machine Learning; letters "I-C-M-L".'],
  ['ICLR','/ˌaɪ siː ɛl ˈɑːr/','eye see ell ar','','','https://iclr.cc/','ICLR','acronym','community-consensus','International Conference on Learning Representations; letters "I-C-L-R".'],
  ['CVPR','/ˌsiː viː piː ˈɑːr/','see vee pee ar','','','https://cvpr.thecvf.com/','CVPR','acronym','community-consensus','Computer Vision and Pattern Recognition; letters "C-V-P-R".'],
  ['AAAI','/ˌtrɪpəl eɪ ˈaɪ/','triple ay eye','/ˌeɪ eɪ eɪ ˈaɪ/','ay ay ay eye','https://aaai.org/','AAAI','acronym','contested','"Triple-A-I" common in talks; letters also heard.'],
  ['ACL','/ˌeɪ siː ˈɛl/','ay see ell','','','https://www.aclweb.org/','ACL','acronym','community-consensus','Association for Computational Linguistics; letters "A-C-L".'],
  ['EMNLP','/ˌiː ɛm ɛn ɛl ˈpiː/','ee em en ell pee','','','https://2024.emnlp.org/','EMNLP','acronym','community-consensus','Empirical Methods in Natural Language Processing; letters.'],
  ['KDD','/ˌkeɪ diː ˈdiː/','kay dee dee','','','https://kdd.org/','KDD','acronym','community-consensus','Knowledge Discovery and Data Mining; letters "K-D-D".'],
  ['AISTATS','/ˈeɪ stæts/','ay stats','','','https://aistats.org/','AISTATS','acronym','community-consensus','AI and Statistics conference; "AY-stats".'],
  ['COLT','/koʊlt/','colt','','','https://learningtheory.org/','COLT','acronym','community-consensus','Conference on Learning Theory; "colt" like the horse.'],
  ['IJCAI','/ˌaɪ dʒeɪ siː eɪ ˈaɪ/','eye jay see ay eye','/ˈɪdʒkaɪ/','ij-kai','https://www.ijcai.org/','IJCAI','acronym','contested','International Joint Conference on AI; letters dominant, "IJ-kai" also heard.'],
  ['SIGGRAPH','/ˈsɪɡɡræf/','sig graf','','','https://www.siggraph.org/','SIGGRAPH','acronym','community-consensus','Special Interest Group on Computer Graphics; "SIG-graf".'],
  ['OpenReview','/ˈoʊpən rɪˌvjuː/','open re view','','','https://openreview.net/','OpenReview','product','community-consensus','Peer-review platform used by ICLR/NeurIPS; "open-re-view".'],
  // ── Evaluation metrics ──────────────────────────────────────────────────
  ['BLEU','/bluː/','blue','','','https://aclanthology.org/P02-1040/','Papineni 2002','acronym','creator-clarified','Bilingual Evaluation Understudy; pronounced "blue" per the original paper.'],
  ['ROUGE','/ruːʒ/','roozh','','','https://aclanthology.org/W04-1013/','Lin 2004','acronym','creator-clarified','Recall-Oriented Understudy for Gisting Evaluation; French "rouge" — "roozh".'],
  ['METEOR','/ˈmiːtiər/','mee tee er','','','https://aclanthology.org/W05-0909/','Banerjee & Lavie 2005','acronym','community-consensus','MT eval metric; like the meteor in the sky.'],
  ['CIDEr','/ˈsaɪdər/','side er','','','https://arxiv.org/abs/1411.5726','Vedantam et al. 2015','acronym','community-consensus','Consensus-based Image Description Evaluation; "CIDER" like the drink.'],
  ['IoU','/ˌaɪ oʊ ˈjuː/','eye oh you','','','https://en.wikipedia.org/wiki/Jaccard_index','Wikipedia (Jaccard)','acronym','community-consensus','Intersection over Union (== Jaccard index); letters "I-o-U".'],
  ['mAP','/ˌɛm eɪ ˈpiː/','em ay pee','/mæp/','map','','','acronym','contested','Mean Average Precision; spoken letters "m-A-P" or as "map" — contested.'],
  ['AUC','/ˌeɪ juː ˈsiː/','ay you see','','','https://en.wikipedia.org/wiki/Receiver_operating_characteristic#Area_under_the_curve','Wikipedia','acronym','community-consensus','Area Under the Curve (usually under ROC); letters "A-U-C".'],
  ['NDCG','/ˌɛn diː siː ˈdʒiː/','en dee see jee','','','https://en.wikipedia.org/wiki/Discounted_cumulative_gain','Wikipedia','acronym','community-consensus','Normalized Discounted Cumulative Gain; letters "N-D-C-G".'],
  ['F1','/ˌɛf ˈwʌn/','eff one','','','https://en.wikipedia.org/wiki/F-score','Wikipedia','cs-term','community-consensus','Harmonic mean of precision & recall; "F-one".'],
  ['FID','/ˌɛf aɪ ˈdiː/','eff eye dee','/fɪd/','fid','https://arxiv.org/abs/1706.08500','Heusel et al. 2017','acronym','contested','Fréchet Inception Distance; letters dominant, "fid" sometimes.'],
  ['ELBO','/ˈɛlboʊ/','el bow','','','https://en.wikipedia.org/wiki/Evidence_lower_bound','Wikipedia','acronym','community-consensus','Evidence Lower BOund; "EL-bow" like the joint.'],
  ['ECE','/ˌiː siː ˈiː/','ee see ee','','','https://arxiv.org/abs/1706.04599','Guo et al. 2017','acronym','community-consensus','Expected Calibration Error; letters "E-C-E".'],
  ['KL','/ˌkeɪ ˈɛl/','kay ell','','','https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence','Wikipedia','abbreviation','community-consensus','Kullback-Leibler (divergence); letters "K-L".'],
  ['JSD','/ˌdʒeɪ ɛs ˈdiː/','jay ess dee','','','https://en.wikipedia.org/wiki/Jensen%E2%80%93Shannon_divergence','Wikipedia','acronym','community-consensus','Jensen-Shannon Divergence; letters "J-S-D".'],
  ['Wasserstein','/ˈvɑːsərʃtaɪn/','vah ser shtine','/ˈwɒsərˌstaɪn/','wah ser stine','https://en.wikipedia.org/wiki/Wasserstein_metric','Wikipedia','person','contested','Leonid Vaserštejn — German-style "VAH-ser-shtine" is closest to source; "WAH-ser-stine" common in ML talks.'],
  ['Fréchet','/freɪˈʃeɪ/','fray shay','','','https://en.wikipedia.org/wiki/Maurice_Ren%C3%A9_Fr%C3%A9chet','Wikipedia','person','community-consensus','French mathematician Maurice Fréchet; "fray-SHAY" — silent t.'],
  ['NLL','/ˌɛn ɛl ˈɛl/','en ell ell','','','','','acronym','community-consensus','Negative Log-Likelihood; letters "N-L-L".'],
  // ── Architectures / model families ──────────────────────────────────────
  ['ResNet','/ˈrɛznɛt/','rez net','','','https://arxiv.org/abs/1512.03385','He et al. 2015','product','community-consensus','Residual Network; "REZ-net".'],
  ['DenseNet','/ˈdɛnsˌnɛt/','dense net','','','https://arxiv.org/abs/1608.06993','Huang et al. 2016','product','community-consensus','Densely Connected Network; "DENSE-net".'],
  ['EfficientNet','/ɪˈfɪʃəntˌnɛt/','eh fish unt net','','','https://arxiv.org/abs/1905.11946','Tan & Le 2019','product','community-consensus','Compound-scaling CNN family; "ef-FISH-unt-net".'],
  ['MobileNet','/ˈmoʊbaɪlˌnɛt/','moh bile net','','','https://arxiv.org/abs/1704.04861','Howard et al. 2017','product','community-consensus','Mobile-friendly CNN family; "MOH-byle-net".'],
  ['ConvNeXt','/ˈkɒnvˌnɛkst/','konv next','','','https://arxiv.org/abs/2201.03545','Liu et al. 2022','product','community-consensus','Modernized ConvNet; "CONV-next".'],
  ['AlexNet','/ˈæləksˌnɛt/','al eks net','','','https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html','Krizhevsky et al. 2012','product','community-consensus','The 2012 ImageNet winner; "AL-eks-net".'],
  ['VGG','/ˌviː dʒiː ˈdʒiː/','vee jee jee','','','https://arxiv.org/abs/1409.1556','Simonyan & Zisserman 2014','acronym','community-consensus','Visual Geometry Group net; letters "V-G-G".'],
  ['GoogLeNet','/ˈɡuːɡəlˌnɛt/','goo gul net','','','https://arxiv.org/abs/1409.4842','Szegedy et al. 2014','product','community-consensus','The Inception-based ImageNet 2014 winner; "GOO-gul-net".'],
  ['Inception','/ɪnˈsɛpʃən/','in sep shun','','','https://arxiv.org/abs/1409.4842','Szegedy et al. 2014','product','community-consensus','Inception module / network family; "in-SEP-shun".'],
  ['U-Net','/ˈjuː ˌnɛt/','yoo net','','','https://arxiv.org/abs/1505.04597','Ronneberger et al. 2015','product','community-consensus','U-shaped encoder-decoder for segmentation; "YOO-net".'],
  ['ViT','/ˌviː aɪ ˈtiː/','vee eye tee','/vɪt/','vit','https://arxiv.org/abs/2010.11929','Dosovitskiy et al. 2020','acronym','contested','Vision Transformer; letters dominant, "vit" used informally.'],
  ['DiT','/ˌdiː aɪ ˈtiː/','dee eye tee','','','https://arxiv.org/abs/2212.09748','Peebles & Xie 2022','acronym','community-consensus','Diffusion Transformer (Sora-style); letters "D-i-T".'],
  ['Swin','/swɪn/','swin','','','https://arxiv.org/abs/2103.14030','Liu et al. 2021','product','community-consensus','Shifted-window Transformer; "swin" rhymes with "win".'],
  ['ELECTRA','/ɪˈlɛktrə/','uh lek truh','','','https://arxiv.org/abs/2003.10555','Clark et al. 2020','product','community-consensus','Pre-train via replaced-token detection; "uh-LEK-truh".'],
  ['XLNet','/ˌɛks ɛl ˈnɛt/','ex ell net','','','https://arxiv.org/abs/1906.08237','Yang et al. 2019','product','community-consensus','Permutation language-modeling pre-train; "X-L-net".'],
  ['ALBERT','/ælˈbɜːrt/','al bert','','','https://arxiv.org/abs/1909.11942','Lan et al. 2019','product','community-consensus','A Lite BERT; pronounced like the name "al-BERT".'],
  ['ELMo','/ˈɛlmoʊ/','el mo','','','https://arxiv.org/abs/1802.05365','Peters et al. 2018','product','community-consensus','Embeddings from Language Models; "EL-mo" like the Sesame Street character.'],
  ['BART','/bɑːrt/','bart','','','https://arxiv.org/abs/1910.13461','Lewis et al. 2019','product','community-consensus','Denoising seq2seq pre-train; "bart" like the name.'],
  ['Chinchilla','/tʃɪnˈtʃɪlə/','chin chill uh','','','https://arxiv.org/abs/2203.15556','Hoffmann et al. 2022','product','community-consensus','DeepMind compute-optimal LM (the "Chinchilla scaling laws"); "chin-CHIL-uh".'],
  ['Gopher','/ˈɡoʊfər/','goh fer','','','https://arxiv.org/abs/2112.11446','Rae et al. 2021','product','community-consensus','DeepMind 280B LM; "GOH-fer" like the animal.'],
  ['Hyena','/haɪˈiːnə/','hi ee nuh','','','https://arxiv.org/abs/2302.10866','Poli et al. 2023','product','community-consensus','Sub-quadratic Transformer alternative; "hi-EE-nuh" like the animal.'],
  // ── Training, alignment, generation techniques ──────────────────────────
  ['CoT','/ˌsiː oʊ ˈtiː/','see oh tee','','','https://arxiv.org/abs/2201.11903','Wei et al. 2022','acronym','community-consensus','Chain-of-Thought prompting; letters "C-o-T".'],
  ['ToT','/ˌtiː oʊ ˈtiː/','tee oh tee','','','https://arxiv.org/abs/2305.10601','Yao et al. 2023','acronym','community-consensus','Tree-of-Thoughts prompting; letters "T-o-T".'],
  ['ICL','/ˌaɪ siː ˈɛl/','eye see ell','','','https://arxiv.org/abs/2005.14165','Brown et al. 2020','acronym','community-consensus','In-Context Learning (few-shot from prompt); letters "I-C-L".'],
  ['SFT','/ˌɛs ɛf ˈtiː/','ess eff tee','','','','','acronym','community-consensus','Supervised Fine-Tuning (pre-RLHF stage); letters "S-F-T".'],
  ['GRPO','/ˌdʒiː ɑːr piː ˈoʊ/','jee ar pee oh','','','https://arxiv.org/abs/2402.03300','DeepSeek-Math 2024','acronym','community-consensus','Group Relative Policy Optimization (DeepSeek); letters "G-R-P-O".'],
  ['KTO','/ˌkeɪ tiː ˈoʊ/','kay tee oh','','','https://arxiv.org/abs/2402.01306','Ethayarajh et al. 2024','acronym','community-consensus','Kahneman-Tversky Optimization; letters "K-T-O".'],
  ['IPO','/ˌaɪ piː ˈoʊ/','eye pee oh','','','https://arxiv.org/abs/2310.12036','Azar et al. 2023','acronym','community-consensus','Identity Preference Optimization (alignment); letters "I-P-O".'],
  ['ORPO','/ˈɔːrpoʊ/','or poh','/ˌoʊ ɑːr piː ˈoʊ/','oh ar pee oh','https://arxiv.org/abs/2403.07691','Hong et al. 2024','acronym','contested','Odds-Ratio Preference Optimization; "OR-poh" or letters.'],
  ['SimPO','/ˈsɪmpoʊ/','sim poh','','','https://arxiv.org/abs/2405.14734','Meng et al. 2024','acronym','community-consensus','Simple Preference Optimization; "SIM-poh".'],
  ['HyDE','/haɪd/','hide','','','https://arxiv.org/abs/2212.10496','Gao et al. 2022','acronym','community-consensus','Hypothetical Document Embeddings; pronounced "hide".'],
  ['GraphRAG','/ˈɡræfˌræɡ/','graf rag','','','https://arxiv.org/abs/2404.16130','Microsoft 2024','product','community-consensus','Graph-based RAG; "GRAF-rag".'],
  ['DoRA','/ˈdɔːrə/','dor uh','','','https://arxiv.org/abs/2402.09353','Liu et al. 2024','acronym','community-consensus','Weight-Decomposed LoRA; "DOR-uh".'],
  ['IA3','/ˌaɪ eɪ ˈθriː/','eye ay three','','','https://arxiv.org/abs/2205.05638','Liu et al. 2022','acronym','community-consensus','(IA)³ — Infused Adapter by Inhibiting and Amplifying Inner Activations; letters + "three".'],
  ['p-tuning','/ˌpiː ˈtjuːnɪŋ/','pee tooning','','','https://arxiv.org/abs/2103.10385','Liu et al. 2021','cs-term','community-consensus','Continuous-prompt tuning; "P-tuning".'],
  ['DDPM','/ˌdiː diː piː ˈɛm/','dee dee pee em','','','https://arxiv.org/abs/2006.11239','Ho et al. 2020','acronym','community-consensus','Denoising Diffusion Probabilistic Models; letters "D-D-P-M".'],
  ['DDIM','/ˌdiː diː aɪ ˈɛm/','dee dee eye em','/ˈdiːdɪm/','dee dim','https://arxiv.org/abs/2010.02502','Song et al. 2020','acronym','contested','Denoising Diffusion Implicit Models; letters or "dee-dim".'],
  ['EDM','/ˌiː diː ˈɛm/','ee dee em','','','https://arxiv.org/abs/2206.00364','Karras et al. 2022','acronym','community-consensus','Elucidating the Design Space of Diffusion Models; letters "E-D-M".'],
  ['diffusion','/dɪˈfjuːʒən/','dih fyoo zhun','','','https://en.wikipedia.org/wiki/Diffusion_model','Wikipedia','cs-term','community-consensus','Diffusion model family; "dih-FYOO-zhun".'],
  ['CFG','/ˌsiː ɛf ˈdʒiː/','see eff jee','','','https://arxiv.org/abs/2207.12598','Ho & Salimans 2022','acronym','community-consensus','Classifier-Free Guidance (also Context-Free Grammar in NLP); letters "C-F-G".'],
  // ── Statistics / math ───────────────────────────────────────────────────
  ['ANOVA','/əˈnoʊvə/','uh noh vuh','','','https://en.wikipedia.org/wiki/Analysis_of_variance','Wikipedia','acronym','community-consensus','Analysis of Variance; "uh-NO-vuh".'],
  ['MANOVA','/məˈnoʊvə/','muh noh vuh','','','https://en.wikipedia.org/wiki/Multivariate_analysis_of_variance','Wikipedia','acronym','community-consensus','Multivariate ANOVA; "muh-NO-vuh".'],
  ['t-test','/ˈtiː ˌtɛst/','tee test','','','https://en.wikipedia.org/wiki/Student%27s_t-test','Wikipedia','cs-term','community-consensus','Student\'s t-test; "T-test".'],
  ['chi-squared','/ˌkaɪ ˈskwɛərd/','kye squared','','','https://en.wikipedia.org/wiki/Chi-squared_test','Wikipedia','cs-term','community-consensus','χ² test — the chi is the Greek letter, pronounced "kye"; NOT "chee" or "chai".'],
  ['nabla','/ˈnɑːblə/','nahb luh','/ˈnæblə/','nab luh','https://en.wikipedia.org/wiki/Nabla_symbol','Wikipedia','cs-term','contested','The ∇ operator (gradient); "NAH-bluh" or "NAB-luh".'],
  ['KKT','/ˌkeɪ keɪ ˈtiː/','kay kay tee','','','https://en.wikipedia.org/wiki/Karush%E2%80%93Kuhn%E2%80%93Tucker_conditions','Wikipedia','acronym','community-consensus','Karush-Kuhn-Tucker conditions; letters "K-K-T".'],
  ['MCMC','/ˌɛm siː ɛm ˈsiː/','em see em see','','','https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo','Wikipedia','acronym','community-consensus','Markov Chain Monte Carlo; letters "M-C-M-C".'],
  ['HMM','/ˌeɪtʃ ɛm ˈɛm/','aitch em em','','','https://en.wikipedia.org/wiki/Hidden_Markov_model','Wikipedia','acronym','community-consensus','Hidden Markov Model; letters "H-M-M".'],
  ['SVM','/ˌɛs viː ˈɛm/','ess vee em','','','https://en.wikipedia.org/wiki/Support_vector_machine','Wikipedia','acronym','community-consensus','Support Vector Machine; letters "S-V-M".'],
  ['KNN','/ˌkeɪ ɛn ˈɛn/','kay en en','','','https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm','Wikipedia','acronym','community-consensus','k-Nearest Neighbors; letters "K-N-N".'],
  ['PCA','/ˌpiː siː ˈeɪ/','pee see ay','','','https://en.wikipedia.org/wiki/Principal_component_analysis','Wikipedia','acronym','community-consensus','Principal Component Analysis; letters "P-C-A".'],
  ['ICA','/ˌaɪ siː ˈeɪ/','eye see ay','','','https://en.wikipedia.org/wiki/Independent_component_analysis','Wikipedia','acronym','community-consensus','Independent Component Analysis; letters "I-C-A".'],
  ['t-SNE','/ˌtiː ɛs ɛn ˈiː/','tee ess en ee','/ˈtiː ˌsniː/','tee snee','https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding','Wikipedia','acronym','contested','t-distributed Stochastic Neighbor Embedding; letters or "tee-snee".'],
  ['UMAP','/ˈjuːmæp/','yoo map','','','https://arxiv.org/abs/1802.03426','McInnes et al. 2018','acronym','community-consensus','Uniform Manifold Approximation and Projection; "YOO-map".'],
  // ── Researchers commonly cited (and mispronounced) ──────────────────────
  ['sutton','/ˈsʌtən/','suht un','','','https://incompleteideas.net/','Richard Sutton home','person','community-consensus','Richard Sutton (RL, "The Bitter Lesson"); "SUH-tun".'],
  ['silver','/ˈsɪlvər/','sil ver','','','https://www.davidsilver.uk/','David Silver','person','community-consensus','David Silver (DeepMind, AlphaGo); "SIL-ver".'],
  ['barto','/ˈbɑːrtoʊ/','bar toh','','','https://www-anw.cs.umass.edu/~barto/','Andrew Barto','person','community-consensus','Andrew Barto (RL textbook co-author with Sutton); "BAR-toh".'],
  ['vapnik','/ˈvæpnɪk/','vap nik','','','https://en.wikipedia.org/wiki/Vladimir_Vapnik','Wikipedia','person','community-consensus','Vladimir Vapnik (VC dimension, SVM); "VAP-nik".'],
  ['bottou','/buːˈtuː/','boo too','','','https://leon.bottou.org/','Léon Bottou','person','community-consensus','Léon Bottou (SGD, large-scale learning); French "boo-TOO".'],
  ['rumelhart','/ˈruːməlˌhɑːrt/','roo mul hart','','','https://en.wikipedia.org/wiki/David_Rumelhart','Wikipedia','person','community-consensus','David Rumelhart (backprop, PDP); "ROO-mul-hart".'],
  ['hopfield','/ˈhɒpfiːld/','hop feeld','','','https://en.wikipedia.org/wiki/John_Hopfield','Wikipedia','person','community-consensus','John Hopfield (Hopfield networks; 2024 Nobel in Physics); "HOP-feeld".'],
  ['judea-pearl','/dʒuːˈdiːə ˈpɜːrl/','joo dee uh purl','','','https://en.wikipedia.org/wiki/Judea_Pearl','Wikipedia','person','community-consensus','Judea Pearl (causal inference, Bayesian networks); "joo-DEE-uh PURL".'],
  ['boltzmann','/ˈboʊltsmən/','bohlts mun','','','https://en.wikipedia.org/wiki/Ludwig_Boltzmann','Wikipedia','person','community-consensus','Ludwig Boltzmann (statistical mechanics, Boltzmann machine); "BOHLTS-mun".'],
  ['schölkopf','/ˈʃɜːlkɒpf/','shurl kopf','/ˈʃɛlkɒpf/','shell kopf','https://en.wikipedia.org/wiki/Bernhard_Sch%C3%B6lkopf','Wikipedia','person','contested','Bernhard Schölkopf (kernel methods, causal ML); "SHURL-kopf" (ö ≈ "ur"); English speakers often say "SHELL-kopf".'],
  ['tegmark','/ˈtɛɡmɑːrk/','teg mark','','','https://space.mit.edu/home/tegmark/','Max Tegmark','person','community-consensus','Max Tegmark (MIT, AI safety, Future of Life Institute); "TEG-mark".'],
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
