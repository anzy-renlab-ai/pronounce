#!/usr/bin/env node
// One-off: append a vetted batch of new entries to data/pronunciations.tsv.
// Columns: word, ipa, respelling_us, alt_ipa, alt_respelling_us,
//          source_url, source_label, category, confidence, notes
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const tsvPath = join(repoRoot, 'data', 'pronunciations.tsv');

// [word, ipa, respell, altIpa, altRespell, srcUrl, srcLabel, category, confidence, notes]
const rows = [
  // ── commonly mispronounced ───────────────────────────────────────────────
  ['anaconda','/ˌænəˈkɑːndə/','anna konda','','','','','product','community-consensus','Python distro; "AN-uh-KON-duh", like the snake.'],
  ['ansible','/ˈænsɪbəl/','ann sih bull','','','','','product','community-consensus','Red Hat automation; "AN-si-buhl", from the sci-fi FTL communicator.'],
  ['cache','/kæʃ/','cash','','','','','cs-term','community-consensus','Rhymes with "cash", not "cash-AY".'],
  ['char','/tʃɑːr/','char','/kɛr/|/kɑːr/','care|car','','','cs-term','contested','Short for "character"; "char" (charcoal), "care", and "car" all heard.'],
  ['chown','/tʃaʊn/','choun','/ˌtʃ ˈoʊn/','ch own','','','cli-tool','contested','"change owner"; rhymes-with-"clown" or spelled "CH-own".'],
  ['chroot','/ˈtʃruːt/','ch root','/ˌtʃeɪndʒ ruːt/','change root','','','cli-tool','contested','"change root"; "ch-root" or said as "change-root".'],
  ['clang','/klæŋ/','klang','','','','','tool','community-consensus','LLVM C/C++ compiler; rhymes with the sound "clang".'],
  ['cmake','/ˈsiːmeɪk/','see make','','','','','tool','community-consensus','Build tool; "see-make".'],
  ['conda','/ˈkɑːndə/','kon duh','','','','','tool','community-consensus','Python package/env manager; "KON-duh".'],
  ['couchbase','/ˈkaʊtʃbeɪs/','couch base','','','','','product','community-consensus','Document database; "couch-base".'],
  ['cron','/krɑːn/','kron','/kroʊn/','krohn','','','cli-tool','contested','Scheduler; "kron" (rhymes "on") common, some "krohn". From Greek chronos.'],
  ['crontab','/ˈkrɑːntæb/','kron tab','','','','','cli-tool','community-consensus','"cron table".'],
  ['daemon','/ˈdiːmən/','dee mun','/ˈdeɪmən/','day mun','','','cs-term','contested','Background process; classic "DEE-mun" vs "DAY-mun" split.'],
  ['deque','/dɛk/','deck','/ˌdiː kjuː/','dee cue','','','cs-term','contested','Double-ended queue; "deck" common, "D-Q" also heard.'],
  ['epoll','/ˈiː pɒl/','ee poll','','','','','cs-term','community-consensus','Linux I/O event notification; "e-poll".'],
  ['fsck','/ˌɛf ɛs siː ˈkeɪ/','eff ess see kay','/fsʌk/','fsuck','','','cli-tool','contested','Filesystem check; spelled out, or the infamous "F-suck" joke.'],
  ['gcc','/ˌdʒiː siː ˈsiː/','jee see see','','','','','tool','community-consensus','GNU Compiler Collection; letter-by-letter.'],
  ['gdb','/ˌdʒiː diː ˈbiː/','jee dee bee','','','','','tool','community-consensus','GNU Debugger; letters.'],
  ['gem','/dʒɛm/','jem','','','','','cli-tool','community-consensus','RubyGems CLI; like "gem" (jewel).'],
  ['golang','/ˈɡoʊlæŋ/','go lang','','','https://go.dev/','Go project','project','community-consensus','The Go language; "go-lang". Officially just "Go".'],
  ['grub','/ɡrʌb/','grub','','','','','tool','community-consensus','GRUB bootloader; like the food.'],
  ['initrd','/ɪˈnɪt ɑːr diː/','in it ar dee','','','','','cs-term','community-consensus','initial RAM disk; "init-R-D".'],
  ['kernel','/ˈkɜːrnəl/','kur nul','','','','','cs-term','community-consensus','Homophone of "colonel".'],
  ['kibana','/kɪˈbɑːnə/','kih bah nuh','','','','','product','community-consensus','Elastic dashboard; "kih-BAH-nuh".'],
  ['kubeadm','/ˌkuːb ˈædmɪn/','koob admin','/ˌkuːb eɪ diː ɛ ˈɛm/','koob ay dee ee em','','','cli-tool','contested','K8s bootstrap tool; "kube-admin" or "kube-A-D-M".'],
  ['llvm','/ˌɛl ɛl viː ˈɛm/','ell ell vee em','','','','','tool','community-consensus','Compiler infrastructure; letters. No longer an acronym officially.'],
  ['malloc','/ˈmælɒk/','mal ock','/ˈɛm əˌlɒk/','em alock','','','cs-term','contested','Memory allocate; "MAL-ock" common.'],
  ['mariadb','/məˈriːə diː biː/','muh ree uh dee bee','','','','','product','community-consensus','MySQL fork; "Maria-D-B", named after Maria Widenius.'],
  ['matplotlib','/ˈmæt plɒt lɪb/','mat plot lib','','','','','product','community-consensus','Python plotting library; "mat-plot-lib".'],
  ['mmap','/ˈɛm mæp/','em map','','','','','cs-term','community-consensus','Memory map syscall; "em-map".'],
  ['niche','/niːʃ/','neesh','/nɪtʃ/','nitch','','','cs-term','contested','"neesh" and "nitch" both accepted.'],
  ['nuget','/ˈnuː ɡɛt/','new get','/ˈnʌɡɪt/','nugget','https://learn.microsoft.com/nuget/','Microsoft','tool','contested','.NET package manager; Microsoft says "New Get", but "nugget" is widespread.'],
  ['protobuf','/ˈproʊtoʊ bʌf/','pro toe buff','','','','','tool','community-consensus','Protocol Buffers; "proto-buff".'],
  ['psql','/ˌpiː ɛs kjuː ˈɛl/','pee ess cue ell','','','','','cli-tool','community-consensus','Postgres CLI; usually letters "P-S-Q-L".'],
  ['pypi','/ˈpaɪ piː ˈaɪ/','pie pee eye','','','https://pypi.org/','PyPI','product','community-consensus','Python Package Index; "Pie-P-I", not "pie-pie" (avoids clash with PyPy).'],
  ['queue','/kjuː/','cue','','','','','cs-term','community-consensus','Pronounced just "Q"; the "ueue" is silent.'],
  ['rake','/reɪk/','rake','','','','','cli-tool','community-consensus','Ruby build tool; like a garden rake.'],
  ['regexp','/ˈrɛɡ ɛksp/','reg exp','/ˌrɛɡ ɛks ˈpiː/','reg eks pee','','','cs-term','community-consensus','Regular expression; "reg-exp" or "reg-E-X-P".'],
  ['sbt','/ˌɛs biː ˈtiː/','ess bee tee','','','','','tool','community-consensus','Scala Build Tool; letters.'],
  ['schema','/ˈskiːmə/','skee muh','','','','','cs-term','community-consensus','"SKEE-muh"; plural "schemas" or "schemata".'],
  ['scp','/ˌɛs siː ˈpiː/','ess see pee','','','','','cli-tool','community-consensus','Secure copy; letters.'],
  ['sed','/sɛd/','sed','/ˌɛs iː ˈdiː/','ess ee dee','','','cli-tool','contested','Stream editor; "sed" (said) common, also "S-E-D".'],
  ['segue','/ˈsɛɡweɪ/','seg way','','','','','cs-term','community-consensus','Like "Segway"; common in iOS storyboard work.'],
  ['struct','/strʌkt/','struckt','','','','','cs-term','community-consensus','Structure; rhymes with "duct".'],
  ['tuple','/ˈtuːpəl/','too pul','/ˈtʌpəl/','tup ul','','','cs-term','contested','"TOO-pul" and "TUH-pul" both common; UK often "TYOO-pul".'],
  ['vim','/vɪm/','vim','','','','','tool','community-consensus','The editor; "vim" like "vim and vigor", not "V-I-M".'],
  ['zookeeper','/ˈzuː kiːpər/','zoo kee per','','','','','product','community-consensus','Apache coordination service; "zoo-keeper".'],
  // ── genuinely hard to read ────────────────────────────────────────────────
  ['alsa','/ˈælsə/','al suh','','','','','product','community-consensus','Advanced Linux Sound Architecture; "AL-suh".'],
  ['asciidoc','/ˈæski dɒk/','ask ee dock','','','','','tool','community-consensus','"ASK-ee-dock".'],
  ['cosign','/ˈkoʊ saɪn/','co sine','','','','','tool','community-consensus','Sigstore signing tool; "co-sign".'],
  ['dovecot','/ˈdʌvkɒt/','duv cot','','','','','product','community-consensus','IMAP/POP3 server; "DUV-cot" (dove + cote).'],
  ['exim','/ˈɛksɪm/','eks im','','','','','product','community-consensus','Mail transfer agent; "EKS-im".'],
  ['firecracker','/ˈfaɪərˌkrækər/','fire cracker','','','','','product','community-consensus','AWS microVM monitor; like the firework.'],
  ['fulcio','/ˈfʊlsi oʊ/','fool see oh','/ˈfʊlki oʊ/','fool kee oh','','','tool','contested','Sigstore CA; "FULL-see-oh" common, some "FULL-kee-oh".'],
  ['gentoo','/ˈdʒɛntuː/','jen too','','','','','product','community-consensus','Linux distro; "JEN-too", after the penguin.'],
  ['gnome','/ɡəˈnoʊm/','guh nome','/noʊm/','nome','','','product','contested','Desktop environment; officially "guh-NOME" (hard G), many say "nome".'],
  ['graylog','/ˈɡreɪ lɒɡ/','gray log','','','','','product','community-consensus','Log management; "gray-log".'],
  ['guix','/ɡiːks/','geeks','','','https://guix.gnu.org/','GNU Guix','product','creator-clarified','GNU package manager; pronounced "geeks".'],
  ['gvisor','/ˈdʒiː vaɪzər/','jee visor','','','','','product','community-consensus','Google container sandbox; "G-visor".'],
  ['hyprland','/ˈhaɪpər lænd/','hyper land','','','','','product','community-consensus','Wayland compositor; "hyper-land".'],
  ['kakoune','/kæˈkuːn/','kah koon','','','','','tool','community-consensus','Modal code editor; "kah-KOON".'],
  ['kaniko','/kəˈniːkoʊ/','kah nee ko','','','','','tool','community-consensus','In-cluster image builder; "kah-NEE-ko".'],
  ['kde','/ˌkeɪ diː ˈiː/','kay dee ee','','','','','product','community-consensus','Desktop environment; letters "K-D-E".'],
  ['keepalived','/ˌkiːp əˈlaɪvd/','keep a lived','','','','','product','community-consensus','VRRP/load-balance daemon; "keep-alive-d".'],
  ['keydb','/ˈkiː diː biː/','key dee bee','','','','','product','community-consensus','Multithreaded Redis fork; "Key-D-B".'],
  ['mastodon','/ˈmæstədɒn/','mass tuh don','','','','','product','community-consensus','Federated social network; like the extinct animal.'],
  ['matrix','/ˈmeɪtrɪks/','may tricks','','','','','product','community-consensus','Decentralized chat protocol; like the movie.'],
  ['mesa','/ˈmeɪsə/','may suh','','','','','product','community-consensus','OpenGL/Vulkan implementation; "MAY-suh" (Spanish for table).'],
  ['mesos','/ˈmiːsoʊs/','mee sose','/ˈmɛsoʊs/','mess ose','','','product','contested','Apache cluster manager; "MEE-sose" vs "MEH-sose".'],
  ['mimir','/ˈmiːmɪr/','mee meer','','','','','product','community-consensus','Grafana metrics store; "MEE-meer", from Norse mythology.'],
  ['mkdocs','/ˌɛm keɪ ˈdɒks/','em kay docks','','','','','tool','community-consensus','Static docs generator; "M-K-docs".'],
  ['ngrok','/ˈɛn ɡrɒk/','en grok','/ˈɛn rɒk/','en rock','','','tool','contested','Tunneling tool; "en-grok" or "en-rock".'],
  ['nixos','/ˈnɪks oʊ ɛs/','niks oh ess','','','','','product','community-consensus','Declarative Linux distro; "Nix-O-S".'],
  ['openshift','/ˈoʊpən ʃɪft/','open shift','','','','','product','community-consensus','Red Hat Kubernetes platform; "open-shift".'],
  ['opensuse','/ˌoʊpən ˈsuːzə/','open soo zuh','','','','','product','community-consensus','Linux distro; "open-SOO-zuh".'],
  ['opentofu','/ˈoʊpən toʊfuː/','open tofu','','','','','tool','community-consensus','Terraform fork; "open-tofu".'],
  ['pandoc','/ˈpæn dɒk/','pan dock','','','','','tool','community-consensus','Universal document converter; "PAN-dock".'],
  ['pipewire','/ˈpaɪp waɪər/','pipe wire','','','','','product','community-consensus','Linux audio/video server; "pipe-wire".'],
  ['postfix','/ˈpoʊst fɪks/','post fix','','','','','product','community-consensus','Mail transfer agent; "post-fix".'],
  ['pulseaudio','/ˈpʌls ˌɔːdi oʊ/','pulse audio','','','','','product','community-consensus','Linux sound server; "pulse-audio".'],
  ['pyroscope','/ˈpaɪroʊ skoʊp/','pie ro scope','','','','','product','community-consensus','Continuous profiling; "PIE-ro-scope".'],
  ['qt','/kjuːt/','cute','/ˌkjuː ˈtiː/','cue tee','https://www.qt.io/','Qt Company','tool','creator-clarified','GUI framework; officially "cute", though many say "Q-T".'],
  ['quarto','/ˈkwɑːrtoʊ/','kwar toe','','','','','tool','community-consensus','Scientific publishing system; "KWAR-toe".'],
  ['quay','/kiː/','key','','','https://quay.io/','Red Hat Quay','product','creator-clarified','Container registry; pronounced "key" (like the dock).'],
  ['rancher','/ˈræntʃər/','ran cher','','','','','product','community-consensus','Kubernetes management platform; like a cattle "rancher".'],
  ['rekor','/ˈriːkɔːr/','ree core','','','','','tool','community-consensus','Sigstore transparency log; "REE-core" (record).'],
  ['scylla','/ˈsɪlə/','sill uh','','','','','product','community-consensus','Cassandra-compatible database; "SIL-uh", from Greek myth.'],
  ['sequel','/ˈsiːkwəl/','see kwul','','','','','cs-term','community-consensus','Common spoken reading of "SQL"; "SEE-kwul" vs spelled "S-Q-L".'],
  ['sigstore','/ˈsɪɡ stɔːr/','sig store','','','','','tool','community-consensus','Software signing project; "sig-store".'],
  ['slsa','/ˈsælsə/','salsa','','','https://slsa.dev/','SLSA','abbreviation','creator-clarified','Supply-chain security framework; pronounced "salsa".'],
  ['sphinx','/sfɪŋks/','sfinks','','','','','tool','community-consensus','Documentation generator; like the Egyptian sphinx.'],
  ['squid','/skwɪd/','skwid','','','','','product','community-consensus','Caching proxy; like the sea animal.'],
  ['suse','/ˈsuːzə/','soo zuh','','','','','product','community-consensus','Linux vendor; "SOO-zuh".'],
  ['sway','/sweɪ/','sway','','','','','tool','community-consensus','i3-compatible Wayland window manager; "sway".'],
  ['synapse','/ˈsɪnæps/','sin aps','','','','','product','community-consensus','Matrix homeserver; like the neural "synapse".'],
  ['talos','/ˈteɪlɒs/','tay loss','','','','','product','community-consensus','Talos Linux; "TAY-loss", the bronze giant of Greek myth.'],
  ['thanos','/ˈθænɒs/','than oss','','','','','product','community-consensus','Prometheus long-term storage; "THAN-oss", like the Marvel villain.'],
  ['varnish','/ˈvɑːrnɪʃ/','var nish','','','','','product','community-consensus','HTTP caching reverse proxy; like wood "varnish".'],
  ['victoriametrics','/vɪkˈtɔːriə ˈmɛtrɪks/','victoria metrics','','','','','product','community-consensus','Time-series database; "Victoria-metrics".'],
  ['vulkan','/ˈvʌlkən/','vul kun','','','','','product','community-consensus','Graphics API; "VUL-kun" (like Star Trek Vulcan).'],
  ['wayland','/ˈweɪlænd/','way land','','','','','product','community-consensus','Display server protocol; "WAY-land".'],
  ['xfce','/ˌɛks ɛf siː ˈiː/','eks eff see ee','','','','','product','community-consensus','Lightweight desktop environment; letters "X-F-C-E".'],
  ['zipkin','/ˈzɪpkɪn/','zip kin','','','','','product','community-consensus','Distributed tracing system; "ZIP-kin".'],
  ['zola','/ˈzoʊlə/','zoh luh','','','','','tool','community-consensus','Rust static site generator; "ZOH-luh".'],
];

const text = readFileSync(tsvPath, 'utf8');
const existing = new Set(
  text.split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.split('\t')[0].toLowerCase())
    .filter(w => w && w !== 'word')
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
