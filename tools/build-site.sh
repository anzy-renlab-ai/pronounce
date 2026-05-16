#!/usr/bin/env bash
# Build the static GitHub Pages site from data/pronunciations.tsv into docs/.
#
# The site uses the browser's Web Speech API to play pronunciations — no
# pre-generated audio files, no build dependencies beyond awk + bash.
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DICT="$REPO_ROOT/data/pronunciations.tsv"
OUT="$REPO_ROOT/docs/index.html"
CSS="$REPO_ROOT/docs/style.css"
JS="$REPO_ROOT/docs/script.js"

if [[ ! -f "$DICT" ]]; then
  echo "build-site: dict not found at $DICT" >&2; exit 1
fi

# Emit per-entry JSON-ish JS array so the page can render and play without server-side help.
ENTRIES_JS="$(awk -F'\t' '
  function esc(s) {
    gsub(/\\/, "\\\\", s)
    gsub(/"/, "\\\"", s)
    return s
  }
  !/^#/ && NF >= 3 && $1 != "" && $1 != "word" {
    word=$1; ipa=$2; resp=$3; alt_ipa=$4; alt_resp=$5;
    src_url=$6; src_label=$7; cat=$8; conf=$9; notes=$10;
    printf "  { w: \"%s\", ipa: \"%s\", r: \"%s\", aIpa: \"%s\", aR: \"%s\", url: \"%s\", srcLabel: \"%s\", cat: \"%s\", conf: \"%s\", notes: \"%s\" },\n",
      esc(word), esc(ipa), esc(resp), esc(alt_ipa), esc(alt_resp), esc(src_url), esc(src_label), esc(cat), esc(conf), esc(notes)
  }
' "$DICT")"

cat > "$JS" <<EOF
// say-it dictionary — generated from data/pronunciations.tsv. Do not hand-edit.
const ENTRIES = [
${ENTRIES_JS}
];

// Reproduce say-it's audible behavior:
//   primary × N reps + " or: <alt>." for each alternate (each said once).
// If --solo equivalent ('solo' arg) is true, skip the chain.
function buildBody(entry, opts) {
  opts = opts || {};
  const reps = opts.reps || 3;
  const alts = entry.aR ? entry.aR.split('|').filter(Boolean) : [];

  if (opts.altIdx !== undefined) {
    const a = alts[opts.altIdx];
    if (!a) return '';
    return Array(reps).fill(a).join('. ') + '.';
  }

  let parts = [];
  for (let i = 0; i < reps; i++) parts.push(entry.r || entry.w);
  let body = parts.join('. ') + '.';

  if (!opts.solo && alts.length > 0) {
    for (const a of alts) {
      const repsEach = opts.all ? reps : 1;
      const altReps = Array(repsEach).fill(a).join('. ');
      body += ' or: ' + altReps + '.';
    }
  }
  return body;
}

let CURRENT_UTTER = null;
function speakBody(text) {
  if (!('speechSynthesis' in window)) {
    alert("Your browser doesn't support speech synthesis. Try Safari or Chrome.");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  // Try to pick a US English voice; fall back to default.
  const voices = speechSynthesis.getVoices();
  const us = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
  if (us) u.voice = us;
  u.rate = 1.0;
  u.lang = 'en-US';
  CURRENT_UTTER = u;
  speechSynthesis.speak(u);
}

function play(idx, opts) {
  const entry = ENTRIES[idx];
  const body = buildBody(entry, opts || {});
  if (!body) return;
  speakBody(body);
}

function badge(text, kind) {
  return \`<span class="badge badge-\${kind}">\${text}</span>\`;
}

function escHTML(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderEntry(e, idx) {
  const alts = e.aR ? e.aR.split('|').filter(Boolean) : [];
  const altIpas = e.aIpa ? e.aIpa.split('|') : [];
  let altsHtml = '';
  if (alts.length > 0) {
    altsHtml = '<div class="alts">';
    alts.forEach((a, i) => {
      const aip = altIpas[i] || '';
      altsHtml += \`
        <div class="alt-row">
          <button class="play-btn play-alt" onclick="play(\${idx}, {altIdx: \${i}})" aria-label="Play alternate \${i+1}">▶</button>
          <span class="alt-label">or:</span>
          <span class="alt-resp">\${escHTML(a)}</span>
          \${aip ? \`<span class="ipa-small">\${escHTML(aip)}</span>\` : ''}
        </div>\`;
    });
    altsHtml += '</div>';
  }

  const confBadge = badge(e.conf, e.conf);
  const catBadge = badge(e.cat, 'cat');

  let sourceHtml = '';
  if (e.url) {
    sourceHtml = \`<div class="source">📎 <a href="\${escHTML(e.url)}" target="_blank" rel="noopener">\${escHTML(e.srcLabel || e.url)}</a></div>\`;
  }

  return \`
    <article class="entry" id="\${escHTML(e.w)}" data-cat="\${escHTML(e.cat)}" data-conf="\${escHTML(e.conf)}">
      <header class="entry-header">
        <h3 class="word">\${escHTML(e.w)}</h3>
        <div class="entry-badges">\${catBadge}\${confBadge}</div>
      </header>
      <div class="primary-row">
        <button class="play-btn play-primary" onclick="play(\${idx})" aria-label="Play primary reading">▶</button>
        <span class="resp">\${escHTML(e.r)}</span>
        <span class="ipa">\${escHTML(e.ipa)}</span>
      </div>
      \${altsHtml}
      \${e.notes ? \`<p class="notes">\${escHTML(e.notes)}</p>\` : ''}
      \${sourceHtml}
    </article>\`;
}

function init() {
  // Force voices to load (some browsers need a hint).
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }

  const container = document.getElementById('entries');
  container.innerHTML = ENTRIES.map((e, i) => renderEntry(e, i)).join('\n');

  const counter = document.getElementById('counter');
  if (counter) counter.textContent = ENTRIES.length;

  // Filter
  const search = document.getElementById('search');
  const filterChips = document.querySelectorAll('.chip');
  let activeCat = 'all';

  function applyFilter() {
    const q = (search.value || '').toLowerCase().trim();
    let shown = 0;
    container.querySelectorAll('.entry').forEach(el => {
      const w = el.querySelector('.word').textContent.toLowerCase();
      const notes = (el.querySelector('.notes')?.textContent || '').toLowerCase();
      const cat = el.dataset.cat;
      const catOk = (activeCat === 'all') || (cat === activeCat);
      const qOk = !q || w.includes(q) || notes.includes(q);
      const show = catOk && qOk;
      el.style.display = show ? '' : 'none';
      if (show) shown++;
    });
    if (counter) counter.textContent = shown;
  }

  search.addEventListener('input', applyFilter);
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCat = chip.dataset.cat;
      applyFilter();
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
EOF

cat > "$CSS" <<'EOF'
:root {
  --bg: #0e0e10;
  --fg: #f6f6f7;
  --muted: #9b9ba0;
  --accent: #ff6a3d;
  --accent-2: #7adfbb;
  --card: #18181b;
  --border: #2a2a30;
  --link: #7ab8ff;
  --mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  --sans: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: var(--sans);
  line-height: 1.55;
  font-size: 17px;
}
.container { max-width: 980px; margin: 0 auto; padding: 48px 24px 96px; }
header.hero { margin-bottom: 48px; }
.hero h1 { font-size: 48px; margin: 0 0 8px; letter-spacing: -0.02em; }
.hero h1 .speaker { color: var(--accent); }
.hero .tagline { font-size: 22px; color: var(--muted); margin: 0 0 24px; }
.hero .install code {
  display: block;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px 18px;
  font-family: var(--mono);
  font-size: 14px;
  color: var(--accent-2);
  overflow-x: auto;
}
.hero .links { margin-top: 18px; display: flex; gap: 12px; flex-wrap: wrap; }
.hero .links a {
  color: var(--fg);
  background: var(--card);
  border: 1px solid var(--border);
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
}
.hero .links a:hover { border-color: var(--accent); color: var(--accent); }
.section-title {
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 56px 0 16px;
  font-weight: 600;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}
.controls input[type="search"] {
  flex: 1;
  min-width: 240px;
  background: var(--card);
  color: var(--fg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 15px;
  font-family: var(--sans);
}
.controls input[type="search"]:focus { outline: 2px solid var(--accent); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  background: var(--card);
  color: var(--fg);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
}
.chip:hover { border-color: var(--accent); }
.chip.active { background: var(--accent); color: var(--bg); border-color: var(--accent); }
.counter-label { color: var(--muted); font-size: 14px; margin-left: auto; }
.entry {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 14px;
}
.entry-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; gap: 12px; flex-wrap: wrap; }
.entry .word { margin: 0; font-size: 28px; letter-spacing: -0.01em; font-family: var(--mono); }
.entry-badges { display: flex; gap: 6px; flex-shrink: 0; }
.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--border);
  color: var(--muted);
  text-transform: lowercase;
  letter-spacing: 0.02em;
}
.badge-creator-clarified { background: rgba(122, 223, 187, 0.15); color: var(--accent-2); }
.badge-community-consensus { background: rgba(122, 184, 255, 0.15); color: var(--link); }
.badge-contested { background: rgba(255, 106, 61, 0.15); color: var(--accent); }
.badge-cat { background: var(--border); color: var(--muted); }
.primary-row, .alt-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 4px 0;
}
.play-btn {
  background: var(--accent);
  border: none;
  color: var(--bg);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
}
.play-btn:hover { filter: brightness(1.1); transform: scale(1.05); }
.play-alt { background: var(--card); color: var(--accent); border: 1px solid var(--accent); }
.resp { font-family: var(--mono); font-size: 18px; color: var(--fg); }
.alt-resp { font-family: var(--mono); font-size: 15px; color: var(--muted); }
.alt-label { color: var(--muted); font-style: italic; font-size: 13px; }
.ipa { font-family: var(--mono); color: var(--muted); font-size: 14px; }
.ipa-small { font-family: var(--mono); color: var(--muted); font-size: 12px; }
.notes { color: var(--muted); font-size: 14px; margin: 10px 0 4px; }
.source { font-size: 13px; color: var(--muted); margin-top: 8px; }
.source a { color: var(--link); text-decoration: none; }
.source a:hover { text-decoration: underline; }
.famous {
  background: linear-gradient(135deg, rgba(255, 106, 61, 0.08), rgba(122, 223, 187, 0.08));
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
}
.famous h2 { margin: 0 0 6px; font-size: 22px; }
.famous p { margin: 0 0 16px; color: var(--muted); }
.famous-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.famous-item {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 14px;
}
.famous-item .fam-word { font-family: var(--mono); font-size: 16px; color: var(--accent); }
.famous-item .fam-resp { color: var(--fg); }
.famous-item .fam-src { color: var(--muted); font-size: 12px; display: block; margin-top: 4px; }
.famous-item a { color: var(--link); text-decoration: none; }
.famous-item a:hover { text-decoration: underline; }
footer.footer { margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--border); color: var(--muted); font-size: 14px; text-align: center; }
footer.footer a { color: var(--link); text-decoration: none; }
@media (max-width: 640px) {
  .hero h1 { font-size: 36px; }
  .hero .tagline { font-size: 18px; }
  .container { padding: 32px 16px 64px; }
  .entry .word { font-size: 22px; }
  .counter-label { margin-left: 0; flex-basis: 100%; }
}
EOF

# Famous Moments — pick a curated list of creator-clarified entries for the hero panel.
FAMOUS_HTML="$(awk -F'\t' '
  function esc(s) {
    gsub(/&/, "\\&amp;", s); gsub(/</, "\\&lt;", s); gsub(/>/, "\\&gt;", s); gsub(/"/, "\\&quot;", s); return s
  }
  BEGIN {
    want["GIF"]=1; want["JSON"]=1; want["GNU"]=1; want["Linux"]=1; want["LaTeX"]=1;
    want["Django"]=1; want["Vue"]=1; want["Vite"]=1; want["Knative"]=1; want["etcd"]=1;
    want["Pydantic"]=1; want["Redis"]=1;
  }
  !/^#/ && NF>=3 && $1 in want {
    word=$1; resp=$3; src_url=$6; src_label=$7;
    printf "      <div class=\"famous-item\"><span class=\"fam-word\">%s</span> → <span class=\"fam-resp\">%s</span>", esc(word), esc(resp)
    if (src_url) printf "<a class=\"fam-src\" href=\"%s\" target=\"_blank\" rel=\"noopener\">%s</a>", esc(src_url), esc(src_label)
    print "</div>"
  }
' "$DICT")"

# Build the HTML.
cat > "$OUT" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>say-it · How engineers actually pronounce kubectl, nginx, GIF, JSON…</title>
  <meta name="description" content="A community-maintained dictionary of how engineers actually pronounce project names — kubectl, nginx, GIF, JSON, GUI, PostgreSQL, and 60+ more. With creator citations.">
  <meta property="og:title" content="say-it — How engineers actually pronounce kubectl">
  <meta property="og:description" content="A community-maintained dictionary of how engineers actually pronounce project names. With creator citations.">
  <meta property="og:type" content="website">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div class="container">

    <header class="hero">
      <h1><span class="speaker">🔊</span> say-it</h1>
      <p class="tagline">How engineers <em>actually</em> pronounce <code>kubectl</code>, <code>nginx</code>, <code>GIF</code>, <code>JSON</code>… with receipts.</p>
      <div class="install">
        <code>git clone https://github.com/anzy-renlab-ai/say-it.git &amp;&amp; cd say-it &amp;&amp; ./install.sh</code>
      </div>
      <div class="links">
        <a href="https://github.com/anzy-renlab-ai/say-it">GitHub →</a>
        <a href="https://github.com/anzy-renlab-ai/say-it#famous-moments">Famous Moments</a>
        <a href="https://github.com/anzy-renlab-ai/say-it/blob/main/data/pronunciations.tsv">Dictionary source</a>
      </div>
    </header>

    <section class="famous">
      <h2>📜 Famous moments</h2>
      <p>Some pronunciations aren't opinions — the creators settled them on record.</p>
      <div class="famous-list">
$FAMOUS_HTML
      </div>
    </section>

    <div class="section-title">Browse the dictionary <span style="text-transform:none; font-weight:normal;">— click ▶ to hear it</span></div>
    <div class="controls">
      <input type="search" id="search" placeholder="Search: kubectl, gif, postgres…" autocomplete="off">
      <div class="chips">
        <button class="chip active" data-cat="all">all</button>
        <button class="chip" data-cat="product">product</button>
        <button class="chip" data-cat="cli-tool">cli-tool</button>
        <button class="chip" data-cat="tool">tool</button>
        <button class="chip" data-cat="acronym">acronym</button>
        <button class="chip" data-cat="cs-term">cs-term</button>
        <button class="chip" data-cat="project">project</button>
        <button class="chip" data-cat="abbreviation">abbrev</button>
      </div>
      <span class="counter-label"><span id="counter">…</span> entries</span>
    </div>

    <div id="entries"></div>

    <footer class="footer">
      <p>Built with <a href="https://github.com/anzy-renlab-ai/say-it">say-it</a>. MIT licensed. PRs welcome to grow the dictionary — <a href="https://github.com/anzy-renlab-ai/say-it/blob/main/data/pronunciations.tsv">edit <code>pronunciations.tsv</code></a>.</p>
      <p style="margin-top:8px;">Audio uses your browser's Web Speech API; quality varies by OS. Install the CLI for the canonical macOS \`say\` output.</p>
    </footer>

  </div>
  <script src="./script.js"></script>
</body>
</html>
EOF

echo "Built $OUT ($(wc -l < "$OUT") lines)"
echo "Built $CSS"
echo "Built $JS"
