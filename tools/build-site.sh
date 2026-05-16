#!/usr/bin/env bash
# Build the static site from data/pronunciations.tsv into docs/.
#
#   docs/index.html             landing page (hero, Famous Moments, demo, install)
#   docs/browse.html            full searchable dictionary browser
#   docs/word/<slug>.html       one rich SEO page per dictionary entry
#   docs/style.css              shared stylesheet
#   docs/script.js              shared logic (Web Speech player, search, filter)
#   docs/sitemap.xml            sitemap for search engines
#   docs/robots.txt             allow crawl, link sitemap
#
# Vercel reads `vercel.json` at the repo root for clean URLs.
#
# Zero build deps: bash + awk.
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DICT="$REPO_ROOT/data/pronunciations.tsv"
DOCS="$REPO_ROOT/docs"
BRAND="${BRAND:-Pronounce}"
GH_REPO="${GH_REPO:-anzy-renlab-ai/pronounce}"
SITE_URL="${SITE_URL:-https://pronounce.renlab.ai}"

if [[ ! -f "$DICT" ]]; then
  echo "build-site: dict not found at $DICT" >&2; exit 1
fi

# Count dict entries (data rows, ignoring comments)
ENTRY_COUNT="$(awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word"' "$DICT" | wc -l | tr -d ' ')"
export ENTRY_COUNT

mkdir -p "$DOCS" "$DOCS/word"

# ---------------------------------------------------------------------------
# Helper: emit the dict as JS entries (used by browse.html and per-word pages
# that want to play alternates via Web Speech).
# ---------------------------------------------------------------------------
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

# ---------------------------------------------------------------------------
# style.css
# ---------------------------------------------------------------------------
cat > "$DOCS/style.css" <<'EOF'
:root {
  --bg: #0e0e10;
  --fg: #f6f6f7;
  --muted: #9b9ba0;
  --muted-strong: #c4c4ca;
  --accent: #ff6a3d;
  --accent-2: #7adfbb;
  --card: #18181b;
  --card-2: #1f1f24;
  --border: #2a2a30;
  --link: #7ab8ff;
  --warn-bg: rgba(255, 200, 0, 0.08);
  --warn-border: rgba(255, 200, 0, 0.35);
  --warn-fg: #d8c992;
  --mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  --sans: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--sans); line-height: 1.65; font-size: 17px; -webkit-font-smoothing: antialiased; }
a { color: var(--link); }
code { font-family: var(--mono); }
.container { max-width: 980px; margin: 0 auto; padding: 56px 24px 96px; }
.container-wide { max-width: 1180px; margin: 0 auto; padding: 56px 24px 96px; }
.container-narrow { max-width: 760px; margin: 0 auto; padding: 56px 24px 96px; }
nav.topbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: rgba(14,14,16,0.85); backdrop-filter: blur(8px); z-index: 50; }
nav.topbar .brand { font-weight: 700; font-size: 18px; letter-spacing: -0.01em; }
nav.topbar .brand a { color: var(--fg); text-decoration: none; }
nav.topbar .links a { color: var(--muted-strong); margin-left: 22px; text-decoration: none; font-size: 14px; }
nav.topbar .links a:hover { color: var(--accent); }
header.hero { margin-bottom: 48px; text-align: center; }
.hero h1 { font-size: 64px; margin: 0 0 14px; letter-spacing: -0.03em; line-height: 1.05; }
.hero h1 .speaker { color: var(--accent); }
.hero .tagline { font-size: 22px; color: var(--muted-strong); margin: 0 auto 32px; max-width: 720px; }
.hero .tagline code { color: var(--accent-2); background: var(--card); padding: 1px 8px; border-radius: 4px; font-size: 0.95em; }
.hero .cta { display: inline-flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 24px; }
.hero .cta a { background: var(--accent); color: var(--bg); padding: 12px 22px; border-radius: 6px; text-decoration: none; font-weight: 600; }
.hero .cta a.secondary { background: var(--card); color: var(--fg); border: 1px solid var(--border); }
.hero .cta a:hover { filter: brightness(1.08); }
.hero .install code { display: inline-block; background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 14px 18px; font-size: 14px; color: var(--accent-2); text-align: left; max-width: 100%; overflow-x: auto; }
.demo { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 24px 28px; margin-bottom: 56px; font-family: var(--mono); font-size: 14.5px; line-height: 1.7; }
.demo .prompt { color: var(--muted); }
.demo .out { color: var(--accent-2); }
.demo .alt { color: var(--accent); }
.demo .comment { color: var(--muted); }
.section-title { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin: 56px 0 18px; font-weight: 600; }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 56px; }
.feature { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 22px 24px; }
.feature h3 { margin: 0 0 8px; font-size: 17px; }
.feature p { margin: 0; color: var(--muted-strong); font-size: 14.5px; line-height: 1.6; }
.feature .icon { font-size: 22px; margin-bottom: 8px; display: block; }
.famous { background: linear-gradient(135deg, rgba(255, 106, 61, 0.08), rgba(122, 223, 187, 0.08)); border: 1px solid var(--border); border-radius: 14px; padding: 28px 32px; margin-bottom: 56px; }
.famous h2 { margin: 0 0 8px; font-size: 26px; }
.famous .sub { margin: 0 0 22px; color: var(--muted-strong); }
.famous-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; }
.famous-item { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; font-size: 14px; }
.famous-item .fam-word { font-family: var(--mono); font-size: 17px; color: var(--accent); }
.famous-item .fam-resp { color: var(--fg); }
.famous-item .fam-src { color: var(--muted); font-size: 12px; display: block; margin-top: 4px; }
.famous-item a { color: var(--link); text-decoration: none; }
.famous-item a:hover { text-decoration: underline; }
.disclaimer { background: var(--warn-bg); border: 1px solid var(--warn-border); border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; font-size: 13.5px; color: var(--warn-fg); line-height: 1.55; }
.disclaimer code { font-family: var(--mono); color: var(--accent-2); background: rgba(0,0,0,0.3); padding: 1px 5px; border-radius: 3px; }
.controls { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; align-items: center; }
.controls input[type="search"] { flex: 1; min-width: 240px; background: var(--card); color: var(--fg); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 15px; font-family: var(--sans); }
.controls input[type="search"]:focus { outline: 2px solid var(--accent); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip { background: var(--card); color: var(--fg); border: 1px solid var(--border); border-radius: 999px; padding: 6px 12px; font-size: 13px; cursor: pointer; }
.chip:hover { border-color: var(--accent); }
.chip.active { background: var(--accent); color: var(--bg); border-color: var(--accent); }
.counter-label { color: var(--muted); font-size: 14px; margin-left: auto; }
.entry { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px 22px; margin-bottom: 14px; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; gap: 12px; flex-wrap: wrap; }
.entry .word { margin: 0; font-size: 28px; letter-spacing: -0.01em; font-family: var(--mono); }
.entry .word a { color: inherit; text-decoration: none; }
.entry .word a:hover { color: var(--accent); }
.entry-badges { display: flex; gap: 6px; flex-shrink: 0; }
.badge { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 4px; background: var(--border); color: var(--muted); text-transform: lowercase; letter-spacing: 0.02em; }
.badge-creator-clarified { background: rgba(122, 223, 187, 0.15); color: var(--accent-2); }
.badge-community-consensus { background: rgba(122, 184, 255, 0.15); color: var(--link); }
.badge-contested { background: rgba(255, 106, 61, 0.15); color: var(--accent); }
.badge-cat { background: var(--border); color: var(--muted); }
.primary-row, .alt-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin: 4px 0; }
.play-btn { background: var(--accent); border: none; color: var(--bg); width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 12px; font-weight: bold; display: inline-flex; align-items: center; justify-content: center; padding: 0; flex-shrink: 0; }
.play-btn:hover { filter: brightness(1.1); transform: scale(1.05); }
.play-alt { background: var(--card-2); color: var(--accent); border: 1px solid var(--accent); }
.resp { font-family: var(--mono); font-size: 18px; color: var(--fg); }
.alt-resp { font-family: var(--mono); font-size: 15px; color: var(--muted-strong); }
.alt-label { color: var(--muted); font-style: italic; font-size: 13px; }
.ipa { font-family: var(--mono); color: var(--muted); font-size: 14px; }
.ipa-small { font-family: var(--mono); color: var(--muted); font-size: 12px; }
.notes { color: var(--muted-strong); font-size: 14px; margin: 10px 0 4px; }
.source { font-size: 13px; color: var(--muted); margin-top: 8px; }
.source a { color: var(--link); text-decoration: none; }
.source a:hover { text-decoration: underline; }

/* per-word page styles */
.word-page h1 { font-family: var(--mono); font-size: 56px; margin: 0 0 4px; letter-spacing: -0.01em; }
.word-page .subtitle { color: var(--muted-strong); font-size: 18px; margin: 0 0 24px; }
.word-page .ipa-large { font-family: var(--mono); color: var(--muted-strong); font-size: 22px; margin-bottom: 16px; }
.word-page .panel { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 22px 24px; margin: 22px 0; }
.word-page .panel-row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.word-page .resp-large { font-family: var(--mono); font-size: 22px; color: var(--fg); }
.word-page .panel .alt-row { margin-top: 12px; }
.word-page .panel .alt-row .alt-resp { font-size: 18px; }
.word-page h2 { font-size: 22px; margin: 36px 0 12px; }
.word-page .prose p { color: var(--muted-strong); margin: 0 0 14px; }
.word-page .prose code { background: var(--card); border: 1px solid var(--border); padding: 1px 6px; border-radius: 3px; color: var(--accent-2); font-size: 0.92em; }
.word-page .cli-howto { background: var(--card-2); border: 1px solid var(--border); border-radius: 12px; padding: 22px 24px; font-family: var(--mono); font-size: 14px; line-height: 1.85; }
.word-page .cli-howto .prompt { color: var(--muted); }
.word-page .related h2 { margin-top: 36px; }
.word-page .related ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.word-page .related li a { display: inline-block; padding: 7px 14px; background: var(--card); border: 1px solid var(--border); border-radius: 999px; text-decoration: none; color: var(--muted-strong); font-family: var(--mono); font-size: 14px; }
.word-page .related li a:hover { border-color: var(--accent); color: var(--accent); background: var(--card-2); }

footer.footer { margin-top: 64px; padding: 24px; border-top: 1px solid var(--border); color: var(--muted); font-size: 14px; text-align: center; }
footer.footer a { color: var(--link); text-decoration: none; }
@media (max-width: 640px) {
  .hero h1 { font-size: 40px; }
  .hero .tagline { font-size: 18px; }
  .container, .container-wide, .container-narrow { padding: 32px 16px 64px; }
  .entry .word { font-size: 22px; }
  .word-page h1 { font-size: 40px; }
  .counter-label { margin-left: 0; flex-basis: 100%; }
}
kbd { background: var(--card-2); border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; font-family: var(--mono); font-size: 12px; color: var(--accent-2); }

/* Share buttons */
.share { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-top: 36px; }
.share h2 { margin: 0 0 8px; font-size: 20px; }
.share .share-btn { display: inline-block; margin: 6px 4px 0; padding: 8px 14px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; border: 1px solid var(--border); transition: transform 0.12s; }
.share .share-btn:hover { transform: translateY(-1px); }
.share-twitter { background: #1da1f2; color: #fff !important; border-color: #1da1f2; }
.share-twitter:hover { background: #0d8bd9; }
.share-hn { background: #ff6600; color: #fff !important; border-color: #ff6600; }
.share-hn:hover { background: #e65c00; }
.share-reddit { background: #ff4500; color: #fff !important; border-color: #ff4500; }
.share-reddit:hover { background: #e63e00; }

/* GitHub star drive */
.gh-banner { background: linear-gradient(90deg, #1a1a1f, #2a1a14); border-bottom: 1px solid var(--border); padding: 10px 24px; text-align: center; font-size: 14px; color: var(--muted-strong); }
.gh-banner a { color: var(--accent); text-decoration: none; font-weight: 600; }
.gh-banner a:hover { text-decoration: underline; }
.gh-cta { background: linear-gradient(135deg, var(--card), var(--card-2)); border: 1px solid var(--border); border-radius: 14px; padding: 32px; margin: 48px 0; text-align: center; }
.gh-cta h3 { margin: 0 0 8px; font-size: 24px; }
.gh-cta p { margin: 0 0 18px; color: var(--muted-strong); }
.gh-cta .gh-btn { display: inline-flex; align-items: center; gap: 8px; background: #24292f; color: #fff; padding: 12px 22px; border-radius: 6px; text-decoration: none; font-weight: 600; border: 1px solid #444c56; font-size: 15px; }
.gh-cta .gh-btn:hover { background: #2d333b; }
.gh-cta .gh-btn .star { color: #ffd33d; }
.gh-cta img.shields { vertical-align: middle; margin-left: 12px; }
.gh-float { position: fixed; bottom: 24px; right: 24px; background: #24292f; color: #fff; padding: 12px 18px; border-radius: 999px; text-decoration: none; font-weight: 600; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border: 1px solid #444c56; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; z-index: 100; transition: transform 0.15s; }
.gh-float:hover { transform: scale(1.05); background: #2d333b; color: #fff; }
.gh-float .star { color: #ffd33d; }
.stats-bar { margin-top: 22px; color: var(--muted); font-size: 14px; }
.stats-bar strong { color: var(--accent); font-size: 18px; }
.faq { margin: 56px 0; }
.faq h2 { font-size: 26px; margin: 0 0 18px; }
.faq details { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 14px 20px; margin-bottom: 10px; cursor: pointer; }
.faq details[open] { background: var(--card-2); }
.faq summary { font-weight: 600; font-size: 16px; outline: none; }
.faq summary::marker { color: var(--accent); }
.faq details p { color: var(--muted-strong); margin: 14px 0 0; line-height: 1.65; }
.faq details code { background: var(--bg); border: 1px solid var(--border); padding: 1px 6px; border-radius: 3px; color: var(--accent-2); font-size: 0.92em; }
@media (max-width: 640px) { .gh-float { bottom: 16px; right: 16px; padding: 10px 14px; font-size: 12px; } .gh-banner { font-size: 13px; padding: 8px 16px; } }
EOF

# ---------------------------------------------------------------------------
# script.js — shared by every page
# ---------------------------------------------------------------------------
cat > "$DOCS/script.js" <<EOF
// say-it dictionary — generated from data/pronunciations.tsv. Do not hand-edit.
const ENTRIES = [
${ENTRIES_JS}
];
const BY_WORD = Object.fromEntries(ENTRIES.map(e => [e.w.toLowerCase(), e]));

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
      body += ' or: ' + Array(repsEach).fill(a).join('. ') + '.';
    }
  }
  return body;
}

let CURRENT_UTTER = null;
function speakBody(text) {
  if (!('speechSynthesis' in window)) {
    alert("Your browser doesn't support speech synthesis. Try Safari or Chrome on macOS.");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const us = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
  if (us) u.voice = us;
  u.rate = 0.9;
  u.lang = 'en-US';
  CURRENT_UTTER = u;
  speechSynthesis.speak(u);
}

function playEntry(idx, opts) {
  const entry = (typeof idx === 'number') ? ENTRIES[idx] : BY_WORD[idx.toLowerCase()];
  if (!entry) return;
  const body = buildBody(entry, opts || {});
  if (body) speakBody(body);
}

function escHTML(s) {
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function badge(text, kind) { return \`<span class="badge badge-\${kind}">\${text}</span>\`; }
function entryHref(word) {
  return './word/' + word.toLowerCase().replace(/[^a-z0-9._-]/g, '-') + '.html';
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
          <button class="play-btn play-alt" onclick="playEntry(\${idx}, {altIdx: \${i}})" aria-label="Play alternate \${i+1}">▶</button>
          <span class="alt-label">or:</span>
          <span class="alt-resp">\${escHTML(a)}</span>
          \${aip ? \`<span class="ipa-small">\${escHTML(aip)}</span>\` : ''}
        </div>\`;
    });
    altsHtml += '</div>';
  }
  const sourceHtml = e.url
    ? \`<div class="source">📎 <a href="\${escHTML(e.url)}" target="_blank" rel="noopener">\${escHTML(e.srcLabel || e.url)}</a></div>\`
    : '';
  return \`
    <article class="entry" data-cat="\${escHTML(e.cat)}" data-conf="\${escHTML(e.conf)}">
      <header class="entry-header">
        <h3 class="word"><a href="\${entryHref(e.w)}">\${escHTML(e.w)}</a></h3>
        <div class="entry-badges">\${badge(e.cat, 'cat')}\${badge(e.conf, e.conf)}</div>
      </header>
      <div class="primary-row">
        <button class="play-btn play-primary" onclick="playEntry(\${idx})" aria-label="Play primary reading">▶</button>
        <span class="resp">\${escHTML(e.r)}</span>
        <span class="ipa">\${escHTML(e.ipa)}</span>
      </div>
      \${altsHtml}
      \${e.notes ? \`<p class="notes">\${escHTML(e.notes)}</p>\` : ''}
      \${sourceHtml}
    </article>\`;
}

function initBrowse() {
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }
  const container = document.getElementById('entries');
  if (!container) return;
  container.innerHTML = ENTRIES.map((e, i) => renderEntry(e, i)).join('\n');
  const counter = document.getElementById('counter');
  if (counter) counter.textContent = ENTRIES.length;
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
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== search) {
      e.preventDefault(); search.focus();
    }
  });
}

function initWordPage() {
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('entries')) initBrowse();
  else initWordPage();
});
EOF

# ---------------------------------------------------------------------------
# Famous Moments block (used in index.html)
# ---------------------------------------------------------------------------
FAMOUS_HTML="$(awk -F'\t' '
  function esc(s) { gsub(/&/, "\\&amp;", s); gsub(/</, "\\&lt;", s); gsub(/>/, "\\&gt;", s); gsub(/"/, "\\&quot;", s); return s }
  BEGIN {
    want["GIF"]=1; want["JSON"]=1; want["GNU"]=1; want["LaTeX"]=1; want["TeX"]=1;
    want["Django"]=1; want["etcd"]=1; want["PostgreSQL"]=1; want["MySQL"]=1; want["Debian"]=1;
    want["nginx"]=1; want["Lua"]=1;
  }
  !/^#/ && NF>=3 && $1 in want && $9 == "creator-clarified" {
    word=$1; resp=$3; src_url=$6; src_label=$7;
    printf "        <div class=\"famous-item\"><span class=\"fam-word\">%s</span> → <span class=\"fam-resp\">%s</span>", esc(word), esc(resp)
    if (src_url) printf "<a class=\"fam-src\" href=\"%s\" target=\"_blank\" rel=\"noopener\">%s</a>", esc(src_url), esc(src_label)
    print "</div>"
  }
' "$DICT")"

# ---------------------------------------------------------------------------
# index.html — landing page
# ---------------------------------------------------------------------------
cat > "$DOCS/index.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>How to pronounce kubectl, nginx, GIF, JSON — ${BRAND}</title>
  <meta name="description" content="A community-maintained pronunciation dictionary for the project, product, and programmer-jargon names developers actually use — kubectl, nginx, GIF, JSON, Pydantic, Knative, LaTeX, Postgres, and 130+ more. With sources.">
  <meta name="keywords" content="how to pronounce kubectl, how to pronounce nginx, how to pronounce GIF, how to pronounce JSON, project name pronunciation, developer pronunciation guide">
  <link rel="canonical" href="${SITE_URL}/">
  <meta property="og:title" content="How to pronounce kubectl, nginx, GIF, JSON — ${BRAND}">
  <meta property="og:description" content="A community-maintained pronunciation dictionary for developer jargon. With sources. Open source, MIT.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}/">
  <meta property="og:image" content="${SITE_URL}/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="How to pronounce kubectl, nginx, GIF, JSON">
  <meta name="twitter:description" content="A community pronunciation dictionary for the names developers actually use. With sources.">
  <meta name="twitter:image" content="${SITE_URL}/og.png">
  <link rel="stylesheet" href="./style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "${BRAND}",
    "description": "Community pronunciation dictionary for developer project and product names.",
    "url": "${SITE_URL}/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "${SITE_URL}/browse.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
</head>
<body>
  <div class="gh-banner">⭐ If this saves you from saying "kub-cuttle" one more time — <a href="https://github.com/${GH_REPO}">star us on GitHub</a></div>
  <nav class="topbar">
    <div class="brand"><a href="./">🔊 ${BRAND}</a></div>
    <div class="links">
      <a href="./browse.html">Browse</a>
      <a href="https://github.com/${GH_REPO}">GitHub</a>
      <a href="https://github.com/${GH_REPO}/blob/main/IDEAS.md">Roadmap</a>
    </div>
  </nav>

  <div class="container">

    <header class="hero">
      <h1><span class="speaker">🔊</span><br>How to pronounce <code>kubectl</code><br>without the cringe.</h1>
      <p class="tagline">A community dictionary of how engineers <em>actually</em> say <code>kubectl</code>, <code>nginx</code>, <code>GIF</code>, <code>JSON</code>, <code>Pydantic</code>, <code>Knative</code>, <code>LaTeX</code>, <code>Postgres</code>… <strong>with sources</strong>.</p>
      <div class="cta">
        <a href="./browse.html">Browse 130+ words →</a>
        <a class="secondary" href="https://github.com/${GH_REPO}">GitHub</a>
      </div>
      <div class="install">
        <code>git clone https://github.com/${GH_REPO}.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</code>
      </div>
      <p class="stats-bar"><strong>${ENTRY_COUNT:-236}</strong> entries · sourced from creator interviews, project FAQs, and Wikipedia · MIT licensed</p>
    </header>

    <pre class="demo">
<span class="prompt">\$</span> say-it kubectl
<span class="out">🔊 koob control. koob control. koob control. <span class="alt">or: cube cuddle. or: kube C T L.</span></span>

<span class="prompt">\$</span> say-it GIF
<span class="out">🔊 jif. jif. jif. <span class="alt">or: gif.</span></span>          <span class="comment"># with receipts — Wilhite at the Webby Awards, 2013</span>

<span class="prompt">\$</span> say-it --why JSON
<span class="comment">word              JSON
ipa               /ˈdʒeɪsən/
respelling_us     jay son
source            Wikipedia § Pronunciation
url               https://en.wikipedia.org/wiki/JSON#Pronunciation</span></pre>

    <section class="famous">
      <h2>📜 Famous moments</h2>
      <p class="sub">Some pronunciations aren't opinions — the creators settled them on record.</p>
      <div class="famous-list">
$FAMOUS_HTML
      </div>
    </section>

    <div class="section-title">What's in the box</div>
    <div class="features">
      <div class="feature"><span class="icon">🗂</span><h3>130+ entries, source-cited</h3><p>Project names, product names, programmer jargon, acronyms. Every entry tagged with confidence (creator-clarified, community-consensus, contested) and linked to a real source where one exists.</p></div>
      <div class="feature"><span class="icon">🔊</span><h3>Multi-reading audio awareness</h3><p>When a word is contested — GIF, SQL, GUI, kubectl — the CLI audibly chains the alternates ("…or: gif"), so you hear the debate without watching the terminal.</p></div>
      <div class="feature"><span class="icon">🤖</span><h3>Claude Code skill included</h3><p>Ask Claude "how do you pronounce X?" — it replies with audio, IPA, and a source citation, not a phonetic guess.</p></div>
      <div class="feature"><span class="icon">⚡</span><h3>Zero deps, ~250 lines of bash</h3><p>Wraps the macOS \`say\` engine you already have. No npm, no sudo, no surprises.</p></div>
      <div class="feature"><span class="icon">🔁</span><h3>Pluggable alternates</h3><p><code>--alt</code> for the rival reading, <code>--all</code> for every variant, <code>--solo</code> to skip the chain, <code>--why</code> shows the dict entry with source URL.</p></div>
      <div class="feature"><span class="icon">📦</span><h3>Community-owned</h3><p>The dictionary is a TSV file you can edit. Open a PR with your favorite mispronounced project — see <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a>.</p></div>
    </div>

    <div class="section-title">Heard, not just read</div>
    <p style="color: var(--muted-strong); margin-bottom: 28px;">IPA is a reference — like a dictionary entry for a foreign word. You don't learn how to pronounce <code>schadenfreude</code> by squinting at <code>/ˈʃɑːdənˌfrɔɪdə/</code>. You learn it by hearing someone say it three times. <strong>${BRAND}</strong> wires your OS's TTS to a one-shot CLI so the answer is sound, not a phonetic transcription.</p>

    <div class="section-title">Try a few</div>
    <p style="margin-bottom: 16px; color: var(--muted-strong);">Click ▶ to hear it in your browser. (Audio quality varies by browser — install the CLI for the macOS Samantha rendering.)</p>
    <div id="entries"></div>

    <p style="text-align: center; margin-top: 32px;">
      <a href="./browse.html" style="color: var(--accent); font-size: 16px;">See all ${ENTRY_COUNT:-236} entries →</a>
    </p>

    <section class="faq">
      <h2>FAQ</h2>
      <details>
        <summary>Why not just listen to a YouTube video?</summary>
        <p>Because you'd have to hunt for the right clip, unmute, wait, and rewind. <code>say-it kubectl</code> plays the right reading three times in 4 seconds. The site is here for when you're not at a terminal.</p>
      </details>
      <details>
        <summary>Why is the audio in the browser different from the CLI?</summary>
        <p>The CLI uses macOS's built-in <code>say</code> with a tuned respelling. The site uses your browser's Web Speech API, whose voice and pronunciation rules vary by OS and browser. For a contested word like <code>GIF</code> they should agree; for projects with quirky readings the CLI is the canonical one.</p>
      </details>
      <details>
        <summary>How is this different from a regular pronunciation dictionary?</summary>
        <p>This one is for the names engineers actually use — <code>kubectl</code>, <code>nginx</code>, <code>Pydantic</code>, <code>Knative</code>, <code>Cilium</code>. Webster doesn't cover them; this does, with the additional value that each entry is tagged with a confidence level and (where possible) a citable source.</p>
      </details>
      <details>
        <summary>Why is GIF pronounced "jif" here? I always say "gif".</summary>
        <p>Both readings are real. The dictionary picks the creator's stated reading as primary ("jif", per Steve Wilhite at the 2013 Webby Awards) and surfaces "gif" as the alternate. Run <code>say-it --alt GIF</code> to hear the alternate. Same pattern for SQL, JSON, char, regex, and the other contested ones.</p>
      </details>
      <details>
        <summary>Will Windows or Linux be supported?</summary>
        <p>Yes — Windows (PowerShell + System.Speech) and Linux (espeak-ng / cloud TTS) are M2/M3 on the roadmap. The dictionary itself is platform-agnostic; only the playback engine needs the platform-specific backend. PRs welcome.</p>
      </details>
      <details>
        <summary>How do I add a missing project?</summary>
        <p>Open a PR adding a row to <a href="https://github.com/${GH_REPO}/blob/main/data/pronunciations.tsv">data/pronunciations.tsv</a>. See <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a> for the column format. There's also a <a href="https://github.com/${GH_REPO}/issues/1">pinned issue</a> with a wishlist of words we want next.</p>
      </details>
      <details>
        <summary>Is the source URL field mandatory?</summary>
        <p>No. If no source exists, leave it blank and mark <code>confidence</code> as <code>community-consensus</code>. We'd rather under-claim than fabricate.</p>
      </details>
      <details>
        <summary>Why does the CLI play "or: gif" after the primary?</summary>
        <p>Multi-reading words carry context — you should know there's a debate. The audible <code>"or: &lt;alt&gt;"</code> tail makes that perceptible without watching the terminal. Use <code>--solo</code> to skip it once you've internalized the debate.</p>
      </details>
    </section>

    <div class="gh-cta">
      <h3>⭐ Like it? Star it.</h3>
      <p>The dictionary is community-maintained — every star nudges more devs to contribute their favorite mispronounced project name.</p>
      <a href="https://github.com/${GH_REPO}" class="gh-btn" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>
      <img class="shields" src="https://img.shields.io/github/stars/${GH_REPO}?style=social" alt="GitHub stars">
    </div>

  </div>

  <a class="gh-float" href="https://github.com/${GH_REPO}" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>

  <footer class="footer">
    <p>${BRAND} · MIT · <a href="https://github.com/${GH_REPO}">GitHub</a> · <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">Contribute</a> · <a href="https://github.com/${GH_REPO}/blob/main/IDEAS.md">Roadmap</a></p>
  </footer>

  <script src="./script.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const c = document.getElementById('entries');
      if (!c) return;
      const max = 8;
      c.querySelectorAll('.entry').forEach((el, i) => { if (i >= max) el.style.display = 'none'; });
    });
  </script>
</body>
</html>
EOF

# ---------------------------------------------------------------------------
# browse.html — full searchable browser
# ---------------------------------------------------------------------------
cat > "$DOCS/browse.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pronunciation dictionary · ${BRAND}</title>
  <meta name="description" content="Browse the full ${BRAND} dictionary: 130+ project, product, and programmer-jargon pronunciations. Search, filter by category, hear each reading.">
  <link rel="canonical" href="${SITE_URL}/browse.html">
  <meta property="og:image" content="${SITE_URL}/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE_URL}/og.png">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div class="gh-banner">⭐ <a href="https://github.com/${GH_REPO}">Star on GitHub</a> — open source, MIT, every dictionary entry is a community PR</div>
  <nav class="topbar">
    <div class="brand"><a href="./">🔊 ${BRAND}</a></div>
    <div class="links"><a href="./">Home</a><a href="https://github.com/${GH_REPO}">GitHub</a></div>
  </nav>

  <div class="container-wide">
    <h1 style="font-size: 36px; margin: 0 0 8px;">Pronunciation dictionary</h1>
    <p style="color: var(--muted-strong); margin: 0 0 20px;">130+ entries · click ▶ to hear · press <kbd>/</kbd> to search</p>

    <div class="disclaimer">
      <strong>ℹ Audio quality note:</strong>
      the ▶ button uses your browser's Web Speech API, which varies by OS and browser. Install the CLI for the canonical macOS Samantha rendering: <code>git clone https://github.com/${GH_REPO}.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</code>
    </div>

    <div class="controls">
      <input type="search" id="search" placeholder="Search: kubectl, gif, postgres…  (press / to focus)" autocomplete="off">
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

    <div class="gh-cta">
      <h3>⭐ Help grow the dictionary</h3>
      <p>Found a word we got wrong, or one we should add? Open a PR. Or just star to follow updates.</p>
      <a href="https://github.com/${GH_REPO}" class="gh-btn" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>
      <img class="shields" src="https://img.shields.io/github/stars/${GH_REPO}?style=social" alt="GitHub stars">
    </div>
  </div>

  <a class="gh-float" href="https://github.com/${GH_REPO}" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>

  <footer class="footer">
    <p>${BRAND} · MIT · <a href="https://github.com/${GH_REPO}">GitHub</a> · <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">Contribute</a></p>
  </footer>

  <script src="./script.js"></script>
</body>
</html>
EOF

# ---------------------------------------------------------------------------
# Per-word pages — long-form SEO pages, JSON-LD, related links
# ---------------------------------------------------------------------------
find "$DOCS/word" -name '*.html' -delete 2>/dev/null || true

# Build a temp file with one record per entry. We swap TAB for ASCII unit-
# separator (\x1f) because bash `read` with IFS=$'\t' collapses adjacent tabs
# (whitespace IFS quirk), which silently corrupts rows whose alt_/source_
# fields are empty. \x1f is non-whitespace, so empty fields are preserved.
TMP_LIST="$(mktemp -t say-it-words.XXXXXX)"
awk -F'\t' '
  !/^#/ && NF>=3 && $1 != "" && $1 != "word" {
    printf "%s\x1f%s\x1f%s\x1f%s\x1f%s\x1f%s\x1f%s\x1f%s\x1f%s\x1f%s\n",
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
  }
' "$DICT" > "$TMP_LIST"

slugify() { printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9._-]/-/g'; }
htmlesc() { printf '%s' "$1" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g' -e 's/"/\&quot;/g'; }
jsonesc() { printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'; }

# Helper: words in the same category, excluding self.
related_words() {
  local cat="$1" self="$2" limit="${3:-6}"
  awk -F'\t' -v c="$cat" -v ex="$self" '
    !/^#/ && NF>=3 && $1 != "" && $1 != "word" && $8 == c && $1 != ex { print $1 }
  ' "$DICT" | head -n "$limit"
}

WORD_COUNT=0
SEP=$'\x1f'
while IFS="$SEP" read -r word ipa resp alt_ipa alt_resp src_url src_label cat conf notes; do
  [[ -z "$word" ]] && continue

  slug="$(slugify "$word")"
  fn="$DOCS/word/$slug.html"

  word_esc="$(htmlesc "$word")"
  ipa_esc="$(htmlesc "$ipa")"
  resp_esc="$(htmlesc "$resp")"
  notes_esc="$(htmlesc "$notes")"
  src_url_esc="$(htmlesc "$src_url")"
  src_label_esc="$(htmlesc "$src_label")"

  # Generate prose intro depending on confidence
  case "$conf" in
    creator-clarified)
      conf_blurb="This pronunciation is documented by the project itself"
      [[ -n "$src_label" ]] && conf_blurb="$conf_blurb (see <a href=\"$src_url_esc\" target=\"_blank\" rel=\"noopener\">$src_label_esc</a>)"
      conf_blurb="$conf_blurb."
      ;;
    contested)
      conf_blurb="This is one of several readings in active use; the developer community hasn't converged on a single answer."
      ;;
    *)
      conf_blurb="This is the widely-used reading among engineers, though edge cases exist."
      ;;
  esac

  # Build alts HTML and alts prose
  alts_html=""
  alts_prose=""
  faq_items=""
  if [[ -n "$alt_resp" ]]; then
    IFS='|' read -ra alts_array <<< "$alt_resp"
    IFS='|' read -ra alt_ipa_array <<< "$alt_ipa"
    i=0
    alts_prose='<p>Alternate readings you might hear:</p><ul>'
    for a in "${alts_array[@]}"; do
      [[ -z "$a" ]] && continue
      a_esc="$(htmlesc "$a")"
      a_ipa="${alt_ipa_array[$i]:-}"
      a_ipa_esc="$(htmlesc "$a_ipa")"
      alts_html="$alts_html
      <div class=\"alt-row\">
        <button class=\"play-btn play-alt\" onclick=\"playEntry('$(htmlesc "$word")', {altIdx: $i})\" aria-label=\"Play alternate $((i+1))\">▶</button>
        <span class=\"alt-label\">or:</span>
        <span class=\"alt-resp\">$a_esc</span>
        ${a_ipa:+<span class=\"ipa-small\">$a_ipa_esc</span>}
      </div>"
      alts_prose="$alts_prose<li><strong>\"$a_esc\"</strong>${a_ipa:+ <code>$a_ipa_esc</code>}</li>"
      i=$((i+1))
    done
    alts_prose="$alts_prose</ul>"
  fi

  # Related words: 6 from same category, exclude self
  related_html=""
  related_list="$(related_words "$cat" "$word" 6)"
  if [[ -n "$related_list" ]]; then
    related_html='<section class="related"><h2>More in this category</h2><ul>'
    while read -r w; do
      [[ -z "$w" ]] && continue
      w_slug="$(slugify "$w")"
      w_esc="$(htmlesc "$w")"
      related_html="$related_html<li><a href=\"./$w_slug.html\">$w_esc</a></li>"
    done <<< "$related_list"
    related_html="$related_html</ul></section>"
  fi

  # JSON-LD: WebPage. For contested with alts, FAQPage.
  jsonld_main="{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"How to pronounce $(jsonesc "$word")\",\"description\":\"$(jsonesc "$word") is most commonly pronounced \\\"$(jsonesc "$resp")\\\" ($(jsonesc "$ipa")).\",\"url\":\"$SITE_URL/word/$slug\",\"inLanguage\":\"en-US\""
  if [[ -n "$src_url" ]]; then
    jsonld_main="$jsonld_main,\"citation\":\"$(jsonesc "$src_url")\""
  fi
  jsonld_main="$jsonld_main}"

  jsonld_faq=""
  if [[ "$conf" == "contested" && -n "$alt_resp" ]]; then
    # First question: the canonical answer. Then one per alt.
    faq_main_q="How is $(jsonesc "$word") pronounced?"
    faq_main_a="$(jsonesc "$word") is most commonly pronounced \\\"$(jsonesc "$resp")\\\" ($(jsonesc "$ipa"))."
    [[ -n "$notes" ]] && faq_main_a="$faq_main_a $(jsonesc "$notes")"
    faq_items="{\"@type\":\"Question\",\"name\":\"$faq_main_q\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"$faq_main_a\"}}"

    IFS='|' read -ra alts_array2 <<< "$alt_resp"
    IFS='|' read -ra alt_ipa_array2 <<< "$alt_ipa"
    j=0
    for a in "${alts_array2[@]}"; do
      [[ -z "$a" ]] && continue
      a_ipa="${alt_ipa_array2[$j]:-}"
      faq_q="Is $(jsonesc "$word") sometimes pronounced \\\"$(jsonesc "$a")\\\"?"
      faq_a="Yes — \\\"$(jsonesc "$a")\\\"${a_ipa:+ ($(jsonesc "$a_ipa"))} is one of the alternate readings in active use."
      faq_items="$faq_items,{\"@type\":\"Question\",\"name\":\"$faq_q\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"$faq_a\"}}"
      j=$((j+1))
    done
    jsonld_faq="{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[$faq_items]}"
  fi

  # Page title (long-tail keyword friendly)
  if [[ "$conf" == "contested" ]]; then
    page_title="How to pronounce $word_esc (and the alternate readings)"
  else
    page_title="How to pronounce $word_esc"
  fi

  # Meta description (under 160 chars where possible)
  meta_desc="$word is pronounced \"$resp\" ($ipa)."
  [[ -n "$notes" ]] && meta_desc="$meta_desc $notes"
  meta_desc="$(htmlesc "${meta_desc:0:300}")"

  cat > "$fn" <<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$page_title — $BRAND</title>
  <meta name="description" content="$meta_desc">
  <meta name="keywords" content="how to pronounce $word_esc, $word_esc pronunciation, $word_esc respelling, $word_esc IPA">
  <link rel="canonical" href="$SITE_URL/word/$slug">
  <meta property="og:title" content="$page_title">
  <meta property="og:description" content="$meta_desc">
  <meta property="og:type" content="article">
  <meta property="og:url" content="$SITE_URL/word/$slug">
  <meta property="og:image" content="$SITE_URL/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="$page_title">
  <meta name="twitter:description" content="$meta_desc">
  <meta name="twitter:image" content="$SITE_URL/og.png">
  <link rel="stylesheet" href="../style.css">
  <script type="application/ld+json">$jsonld_main</script>
HTML

  if [[ -n "$jsonld_faq" ]]; then
    cat >> "$fn" <<HTML
  <script type="application/ld+json">$jsonld_faq</script>
HTML
  fi

  cat >> "$fn" <<HTML
</head>
<body>
  <div class="gh-banner">⭐ <a href="https://github.com/$GH_REPO">Star on GitHub</a> — community-maintained pronunciation dictionary</div>
  <nav class="topbar">
    <div class="brand"><a href="../">🔊 $BRAND</a></div>
    <div class="links"><a href="../browse.html">Browse all</a><a href="https://github.com/$GH_REPO">GitHub</a></div>
  </nav>

  <div class="container-narrow word-page">

    <h1>How to pronounce $word_esc</h1>
    <p class="subtitle"><span class="badge badge-$cat">$cat</span> <span class="badge badge-$conf">$conf</span></p>

    <div class="panel">
      <div class="panel-row">
        <button class="play-btn play-primary" onclick="playEntry('$(htmlesc "$word")')" aria-label="Play primary reading">▶</button>
        <span class="resp-large">$resp_esc</span>
        <span class="ipa">$ipa_esc</span>
      </div>
$alts_html
    </div>

    <section class="prose">
      <p><strong>$word_esc</strong> is most commonly pronounced <strong>"$resp_esc"</strong> ($ipa_esc). $conf_blurb</p>
HTML

  # Add notes paragraph
  if [[ -n "$notes" ]]; then
    cat >> "$fn" <<HTML
      <p>$notes_esc</p>
HTML
  fi

  # Add alts prose
  if [[ -n "$alts_prose" ]]; then
    cat >> "$fn" <<HTML
      $alts_prose
HTML
  fi

  # Source citation
  if [[ -n "$src_url" ]]; then
    cat >> "$fn" <<HTML
      <p><strong>Source:</strong> <a href="$src_url_esc" target="_blank" rel="noopener">$src_label_esc</a></p>
HTML
  fi

  # Generic SEO-bulking paragraph
  cat >> "$fn" <<HTML
      <p>Pronouncing project and product names correctly avoids the small but persistent friction of being gently corrected during standups, conference Q&amp;As, and team calls. Hearing the word a few times locks in the right reading better than reading IPA ever will. <strong>$BRAND</strong> is a community-maintained dictionary — every entry tagged with a confidence level and (where possible) a citable source.</p>
    </section>

    <h2>Hear it from the command line</h2>
    <div class="cli-howto">
      <div><span class="prompt">\$</span> say-it $word_esc                <span style="color: var(--muted)"># primary × 3 + audible "or: …" for each alternate</span></div>
HTML

  if [[ -n "$alt_resp" ]]; then
    cat >> "$fn" <<HTML
      <div><span class="prompt">\$</span> say-it --alt $word_esc          <span style="color: var(--muted)"># focus on the first alternate</span></div>
      <div><span class="prompt">\$</span> say-it --all $word_esc          <span style="color: var(--muted)"># primary AND every alternate, each repeated</span></div>
      <div><span class="prompt">\$</span> say-it --solo $word_esc         <span style="color: var(--muted)"># primary only, no "or: …" tail</span></div>
HTML
  fi

  cat >> "$fn" <<HTML
      <div><span class="prompt">\$</span> say-it --why $word_esc          <span style="color: var(--muted)"># print the dict entry with source URL</span></div>
    </div>

    <p style="margin-top: 20px; font-size: 14px; color: var(--muted);">
      Install the CLI: <code>git clone https://github.com/$GH_REPO.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</code>
    </p>

$related_html

    <section class="share" style="margin-top: 36px; text-align: center;">
      <h2>Share this</h2>
      <p style="color: var(--muted-strong); font-size: 14.5px;">Help one more dev stop saying "$word_esc" wrong.</p>
      <a class="share-btn share-twitter" href="https://twitter.com/intent/tweet?text=$(printf '%s' "TIL: $word is pronounced \"$resp\". Receipts + 170 more @ pronounce.renlab.ai" | python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.stdin.read()))')&url=$SITE_URL/word/$slug" target="_blank" rel="noopener">𝕏 Share on X / Twitter</a>
      <a class="share-btn share-hn" href="https://news.ycombinator.com/submitlink?u=$SITE_URL/word/$slug&t=$(printf '%s' "How to pronounce $word" | python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.stdin.read()))')" target="_blank" rel="noopener">Submit to HN</a>
      <a class="share-btn share-reddit" href="https://www.reddit.com/submit?url=$SITE_URL/word/$slug&title=$(printf '%s' "How to pronounce $word (with source)" | python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.stdin.read()))')" target="_blank" rel="noopener">Reddit</a>
    </section>

    <section class="related" style="margin-top: 36px;">
      <h2>About this entry</h2>
      <p style="color: var(--muted-strong); font-size: 14.5px;">
        Audio on this page is rendered by your browser's Web Speech API, whose voice varies by OS and browser. The CLI (<code>say-it $word_esc</code>) uses macOS's built-in <code>say</code> with a tuned respelling for a consistent reading.
        Found an issue or want to add a reading? <a href="https://github.com/$GH_REPO/blob/main/CONTRIBUTING.md">Contribute on GitHub</a>.
      </p>
    </section>

    <div class="gh-cta">
      <h3>⭐ Star the project</h3>
      <p>This whole page exists because of a community-maintained TSV. If it saved you a cringey moment, drop a star.</p>
      <a href="https://github.com/$GH_REPO" class="gh-btn" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>
      <img class="shields" src="https://img.shields.io/github/stars/$GH_REPO?style=social" alt="GitHub stars">
    </div>

  </div>

  <a class="gh-float" href="https://github.com/$GH_REPO" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>

  <footer class="footer">
    <p>$BRAND · MIT · <a href="https://github.com/$GH_REPO">GitHub</a></p>
  </footer>

  <script src="../script.js"></script>
</body>
</html>
HTML

  WORD_COUNT=$((WORD_COUNT + 1))
done < "$TMP_LIST"
rm -f "$TMP_LIST"

# ---------------------------------------------------------------------------
# JSON API — one static .json per entry so chatbots / MCP servers / agents
# can consume entries without parsing the TSV. The endpoint shape is
# stable: /api/word/<lowercase-slug>.json
# ---------------------------------------------------------------------------
mkdir -p "$DOCS/api/word"
find "$DOCS/api/word" -name '*.json' -delete 2>/dev/null || true
awk -F'\t' '
  function jesc(s) { gsub(/\\/, "\\\\", s); gsub(/"/, "\\\"", s); gsub(/\t/, " ", s); return s }
  function slug(s,    out) { out = tolower(s); gsub(/[^a-z0-9._-]/, "-", out); return out }
  function altarr(s, n,    arr, out, i, first) {
    n = split(s, arr, "|"); out = "["
    first = 1
    for (i = 1; i <= n; i++) {
      if (arr[i] == "") continue
      if (!first) out = out ", "
      out = out "\"" jesc(arr[i]) "\""
      first = 0
    }
    return out "]"
  }
  !/^#/ && NF >= 3 && $1 != "" && $1 != "word" {
    word=$1; ipa=$2; resp=$3; alt_ipa=$4; alt_resp=$5;
    src_url=$6; src_label=$7; cat=$8; conf=$9; notes=$10
    out = outdir "/" slug(word) ".json"
    printf "{\n" > out
    printf "  \"word\": \"%s\",\n", jesc(word) >> out
    printf "  \"ipa\": \"%s\",\n", jesc(ipa) >> out
    printf "  \"respelling_us\": \"%s\",\n", jesc(resp) >> out
    printf "  \"alt_ipa\": %s,\n", altarr(alt_ipa) >> out
    printf "  \"alt_respelling_us\": %s,\n", altarr(alt_resp) >> out
    printf "  \"source_url\": \"%s\",\n", jesc(src_url) >> out
    printf "  \"source_label\": \"%s\",\n", jesc(src_label) >> out
    printf "  \"category\": \"%s\",\n", jesc(cat) >> out
    printf "  \"confidence\": \"%s\",\n", jesc(conf) >> out
    printf "  \"notes\": \"%s\"\n", jesc(notes) >> out
    print "}" >> out
    close(out)
    count++
  }
  END { print "Built " count " JSON API entries." }
' outdir="$DOCS/api/word" "$DICT"

# Index JSON — list of all words for discovery
{
  printf "[\n"
  awk -F'\t' '
    function jesc(s) { gsub(/\\/, "\\\\", s); gsub(/"/, "\\\"", s); return s }
    function slug(s,    out) { out = tolower(s); gsub(/[^a-z0-9._-]/, "-", out); return out }
    BEGIN { first = 1 }
    !/^#/ && NF >= 3 && $1 != "" && $1 != "word" {
      if (!first) print ","
      printf "  {\"word\": \"%s\", \"slug\": \"%s\", \"category\": \"%s\", \"confidence\": \"%s\"}", jesc($1), slug($1), jesc($8), jesc($9)
      first = 0
    }
    END { print "\n]" }
  ' "$DICT"
} > "$DOCS/api/words.json"
echo "Built $DOCS/api/words.json (index)"

# ---------------------------------------------------------------------------
# IndexNow key file — submit URLs for instant Bing/Yandex indexing
# ---------------------------------------------------------------------------
INDEXNOW_KEY="${INDEXNOW_KEY:-83a4f7e21c5b48d6a0fe2c7b91d4e8af}"
printf '%s' "$INDEXNOW_KEY" > "$DOCS/$INDEXNOW_KEY.txt"
echo "$INDEXNOW_KEY" > "$DOCS/.indexnow-key"

# ---------------------------------------------------------------------------
# sitemap.xml — list every URL
# ---------------------------------------------------------------------------
TODAY="$(date +%Y-%m-%d)"
{
  printf '<?xml version="1.0" encoding="UTF-8"?>\n'
  printf '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  printf '  <url><loc>%s/</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/browse.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n' "$SITE_URL" "$TODAY"
  awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word" { print $1 }' "$DICT" | while read -r w; do
    slug="$(slugify "$w")"
    printf '  <url><loc>%s/word/%s</loc><lastmod>%s</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n' "$SITE_URL" "$slug" "$TODAY"
  done
  printf '</urlset>\n'
} > "$DOCS/sitemap.xml"

# ---------------------------------------------------------------------------
# robots.txt
# ---------------------------------------------------------------------------
cat > "$DOCS/robots.txt" <<EOF
User-agent: *
Allow: /

Sitemap: $SITE_URL/sitemap.xml
EOF

echo "Built $DOCS/index.html"
echo "Built $DOCS/browse.html"
echo "Built $DOCS/style.css"
echo "Built $DOCS/script.js"
echo "Built $DOCS/sitemap.xml"
echo "Built $DOCS/robots.txt"
echo "Built $WORD_COUNT per-word pages"
