#!/usr/bin/env node
// Batch 7: World models, RL, embodied AI, robotics simulation.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

const rows = [
  // ── World models & RL agents ──────────────────────────────────────────────
  ['dreamer','/ˈdriːmər/','dree mer','','','','','product','community-consensus','Hafner\'s world-model agent (DreamerV3); "DREE-mer".'],
  ['dreamerv3','/ˈdriːmər viː ˈθriː/','dree mer vee three','','','','','product','community-consensus','Latest Dreamer world model; "Dreamer-V-three".'],
  ['muzero','/ˈmjuː ˌzɪroʊ/','mew zee roh','','','','','product','community-consensus','DeepMind model-based RL (learns the model); "MEW-zee-roh".'],
  ['alphazero','/ˈælfə ˌzɪroʊ/','al fuh zee roh','','','','','product','community-consensus','DeepMind self-play agent; "AL-fuh-ZEE-roh".'],
  ['alphago','/ˈælfə ɡoʊ/','al fuh go','','','','','product','community-consensus','DeepMind Go agent; "AL-fuh-go".'],
  ['alphafold','/ˈælfə foʊld/','al fuh fold','','','','','product','community-consensus','DeepMind protein-structure model; "AL-fuh-fold".'],
  ['alphastar','/ˈælfə stɑːr/','al fuh star','','','','','product','community-consensus','DeepMind StarCraft II agent; "AL-fuh-star".'],
  ['jepa','/ˈdʒɛpə/','jep uh','','','','','cs-term','community-consensus','Joint-Embedding Predictive Architecture (LeCun); "JEP-uh".'],
  ['gato','/ˈɡɑːtoʊ/','gah toh','','','','','product','community-consensus','DeepMind generalist agent; "GAH-toh" (Spanish for cat).'],
  ['rssm','/ˌɑːr ɛs ɛs ˈɛm/','ar ess ess em','','','','','abbreviation','community-consensus','Recurrent State-Space Model (Dreamer/PlaNet core); letters.'],
  ['tdmpc','/ˌtiː diː ɛm piː ˈsiː/','tee dee em pee see','','','','','abbreviation','community-consensus','Temporal-Difference Model-Predictive Control; letters "TD-MPC".'],
  ['octo','/ˈɒktoʊ/','ok toh','','','','','product','community-consensus','Open-source generalist robot policy; "OK-toh".'],
  ['openvla','/ˈoʊpən viː ɛl ˈeɪ/','open vee ell ay','','','','','product','community-consensus','Open Vision-Language-Action model; "Open-V-L-A".'],
  // ── Robotics / embodied simulation ────────────────────────────────────────
  ['mujoco','/ˈmjuːdʒoʊkoʊ/','mew jo co','','','https://mujoco.org/','MuJoCo','product','creator-clarified','Multi-Joint dynamics with Contact physics engine; "MEW-jo-co".'],
  ['isaac','/ˈaɪzək/','eye zik','','','','','product','community-consensus','NVIDIA Isaac Sim/Lab/Gym for robotics; "EYE-zik".'],
  ['habitat','/ˈhæbɪtæt/','hab ih tat','','','','','product','community-consensus','Meta AI Habitat embodied-AI sim; "HAB-ih-tat".'],
  ['gymnasium','/dʒɪmˈneɪziəm/','jim nay zee um','','','','','product','community-consensus','RL environment API (successor to OpenAI Gym); "jim-NAY-zee-um".'],
  ['brax','/bræks/','bracks','','','','','product','community-consensus','JAX differentiable physics engine; "bracks".'],
  ['pybullet','/ˈpaɪˌbʊlɪt/','pie bullet','','','','','product','community-consensus','Python bindings for Bullet physics; "pie-bullet".'],
  ['gazebo','/ɡəˈziːboʊ/','guh zee boh','','','','','product','community-consensus','ROS robotics simulator; "guh-ZEE-boh".'],
  ['webots','/ˈwɛbɒts/','web ots','','','','','product','community-consensus','Open-source robot simulator; "WEB-ots".'],
  ['carla','/ˈkɑːrlə/','kar luh','','','','','product','community-consensus','Open driving simulator; "KAR-luh".'],
  ['airsim','/ˈɛərsɪm/','air sim','','','','','product','community-consensus','Microsoft drone/car sim; "air-sim".'],
  ['omniverse','/ˈɒmnɪvɜːrs/','om nih verse','','','','','product','community-consensus','NVIDIA simulation platform; "OM-nih-verse".'],
  ['groot','/ɡruːt/','groot','','','','','product','community-consensus','NVIDIA GR00T humanoid foundation model; "groot".'],
  ['maniskill','/ˈmænɪskɪl/','man ih skill','','','','','product','community-consensus','Manipulation-skill benchmark; "MAN-ih-skill".'],
  ['aloha','/əˈloʊhɑː/','uh loh hah','','','','','product','community-consensus','Low-cost bimanual teleop robot; "uh-LOH-hah".'],
  ['atari','/əˈtɑːri/','uh tar ee','','','','','product','community-consensus','Atari (ALE) RL benchmark; "uh-TAR-ee".'],
  ['crafter','/ˈkræftər/','craf ter','','','','','product','community-consensus','Open-world RL benchmark; "CRAF-ter".'],
  ['minerl','/ˌmaɪn ɑːr ˈɛl/','mine ar ell','','','','','product','community-consensus','Minecraft RL competition/env; "Mine-R-L".'],
  ['minedojo','/ˈmaɪn doʊdʒoʊ/','mine doh joh','','','','','product','community-consensus','Open-ended Minecraft agent benchmark; "Mine-DOH-joh".'],
  ['procgen','/ˈprɒkdʒɛn/','prock jen','','','','','product','community-consensus','Procedurally-generated RL benchmark; "PROCK-jen".'],
  // ── RL / control algorithms ───────────────────────────────────────────────
  ['trpo','/ˈtɜːrpoʊ/','ter po','','','','','abbreviation','community-consensus','Trust Region Policy Optimization; "TER-po" or letters.'],
  ['ddpg','/ˌdiː diː piː ˈdʒiː/','dee dee pee jee','','','','','abbreviation','community-consensus','Deep Deterministic Policy Gradient; letters "D-D-P-G".'],
  ['sac','/sæk/','sack','/ˌɛs eɪ ˈsiː/','ess ay see','','','abbreviation','contested','Soft Actor-Critic; "sack" or letters "S-A-C".'],
  ['impala','/ɪmˈpɑːlə/','im pah luh','','','','','product','community-consensus','Distributed RL architecture; "im-PAH-luh", like the antelope.'],
  // ── RL / robotics theory terms ────────────────────────────────────────────
  ['bellman','/ˈbɛlmən/','bell mun','','','','','cs-term','community-consensus','Bellman equation/backup; "BELL-mun".'],
  ['markov','/ˈmɑːrkɒf/','mar koff','','','','','cs-term','community-consensus','Markov property/chain; "MAR-koff".'],
  ['mdp','/ˌɛm diː ˈpiː/','em dee pee','','','','','abbreviation','community-consensus','Markov Decision Process; letters "M-D-P".'],
  ['pomdp','/ˌpiː oʊ ɛm diː ˈpiː/','pee oh em dee pee','/ˈpɒm diː piː/','pom dee pee','','','abbreviation','contested','Partially-Observable MDP; "P-O-M-D-P" or "POM-D-P".'],
  ['ergodic','/ɜːrˈɡɒdɪk/','er god ik','','','','','cs-term','community-consensus','Ergodic process (long-run = ensemble average); "er-GOD-ik".'],
  ['quaternion','/kwəˈtɜːrniən/','kwuh ter nee un','','','','','cs-term','community-consensus','4-component rotation representation; "kwuh-TER-nee-un".'],
  ['odometry','/oʊˈdɒmɪtri/','oh dom uh tree','','','','','cs-term','community-consensus','Motion estimation from sensors; "oh-DOM-uh-tree".'],
  ['lidar','/ˈlaɪdɑːr/','lye dar','','','','','cs-term','community-consensus','Light Detection and Ranging; "LYE-dar".'],
  ['proprioception','/ˌproʊprioʊˈsɛpʃən/','pro pree oh sep shun','','','','','cs-term','community-consensus','Sense of body state/joint angles; "pro-pree-oh-SEP-shun".'],
  ['geodesic','/ˌdʒiːoʊˈdɛsɪk/','jee oh dess ik','','','','','cs-term','community-consensus','Shortest path on a manifold; "jee-oh-DESS-ik".'],
  ['holonomic','/ˌhɒləˈnɒmɪk/','hol uh nom ik','','','','','cs-term','community-consensus','Constraint type in robotics; "hol-uh-NOM-ik".'],
  ['kinematics','/ˌkɪnəˈmætɪks/','kin uh mat iks','','','','','cs-term','community-consensus','Motion without forces (forward/inverse); "kin-uh-MAT-iks".'],
  ['slam','/slæm/','slam','','','','','cs-term','community-consensus','Simultaneous Localization And Mapping; "slam".'],
  ['rollout','/ˈroʊlaʊt/','roll out','','','','','cs-term','community-consensus','Simulating a trajectory under a policy; "roll-out".'],
  ['trajectory','/trəˈdʒɛktəri/','truh jek tuh ree','','','','','cs-term','community-consensus','Sequence of states/actions; "truh-JEK-tuh-ree".'],
  ['embodied','/ɪmˈbɒdid/','im bod eed','','','','','cs-term','community-consensus','Embodied AI (agents with a body); "im-BOD-eed".'],
  ['egocentric','/ˌiːɡoʊˈsɛntrɪk/','ee go sen trik','','','','','cs-term','community-consensus','First-person (egocentric video); "ee-go-SEN-trik".'],
  ['allocentric','/ˌæloʊˈsɛntrɪk/','al oh sen trik','','','','','cs-term','community-consensus','World-centered frame of reference; "al-oh-SEN-trik".'],
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
