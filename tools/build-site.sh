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
:root, html[data-theme="dark"] {
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
html[data-theme="light"] {
  --bg: #fefefe;
  --fg: #0e0e10;
  --muted: #6b6b71;
  --muted-strong: #3b3b41;
  --accent: #d54a1f;
  --accent-2: #1a8a5d;
  --card: #f6f6f8;
  --card-2: #ebebef;
  --border: #d8d8de;
  --link: #2462c1;
  --warn-bg: rgba(218, 165, 32, 0.08);
  --warn-border: rgba(218, 165, 32, 0.35);
  --warn-fg: #7a6420;
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
nav.topbar .theme-toggle { background: transparent; border: 1px solid var(--border); color: var(--muted-strong); font-size: 14px; padding: 4px 8px; border-radius: 6px; cursor: pointer; margin-left: 12px; }
nav.topbar .theme-toggle:hover { border-color: var(--accent); color: var(--accent); }
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
.info-pill { background: rgba(122, 223, 187, 0.08); border: 1px solid rgba(122, 223, 187, 0.30); border-radius: 8px; padding: 12px 18px; margin-bottom: 24px; font-size: 13.5px; color: var(--accent-2); line-height: 1.55; }
.info-pill strong { color: #a4ffd1; }

/* Download audio link */
.download-mp3 { display: inline-block; font-size: 12px; color: var(--muted); padding: 4px 10px; border: 1px solid var(--border); border-radius: 999px; text-decoration: none; margin-left: 10px; }
.download-mp3:hover { border-color: var(--accent-2); color: var(--accent-2); }
.download-mp3::before { content: "⬇ "; }

/* Difficulty rating badge */
.difficulty { display: inline-flex; gap: 2px; vertical-align: middle; margin-left: 8px; }
.difficulty .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border); }
.difficulty .dot.on { background: var(--accent); }

/* Toast for copy feedback */
.toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(20px); background: var(--card-2); border: 1px solid var(--accent-2); color: var(--accent-2); padding: 10px 18px; border-radius: 8px; font-size: 14px; opacity: 0; transition: all 0.2s; z-index: 200; pointer-events: none; }
.toast.toast-show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* Stats page */
.big-numbers { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 36px; }
.bn-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px 22px; text-align: center; }
.bn-num { font-size: 40px; font-weight: 700; color: var(--accent); font-family: var(--mono); }
.bn-label { color: var(--muted); font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
.bars { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 18px 22px; margin-bottom: 36px; }
.bar-row { display: grid; grid-template-columns: 180px 1fr 60px; align-items: center; gap: 14px; padding: 4px 0; }
.bar-label { color: var(--muted-strong); font-size: 14px; font-family: var(--mono); }
.bar-label a { color: inherit; text-decoration: none; }
.bar-label a:hover { color: var(--accent); }
.bar-track { background: var(--card-2); height: 12px; border-radius: 6px; overflow: hidden; }
.bar-fill { height: 100%; transition: width 0.4s; }
.bar-orange { background: linear-gradient(90deg, var(--accent), #ff8b5e); }
.bar-green { background: linear-gradient(90deg, var(--accent-2), #95e9c6); }
.bar-value { font-family: var(--mono); font-size: 14px; color: var(--muted-strong); text-align: right; }
.alphabet { display: grid; grid-template-columns: repeat(26, 1fr); gap: 6px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 18px; margin-bottom: 36px; align-items: end; }
.letter-col { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.letter-bar { background: var(--accent); width: 70%; border-radius: 2px 2px 0 0; min-height: 4px; }
.letter-label { font-family: var(--mono); color: var(--muted-strong); font-size: 12px; }
.letter-count { color: var(--muted); font-size: 10px; min-height: 14px; }
.cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
.cat-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; text-decoration: none; color: var(--fg); display: block; transition: transform 0.15s; }
.cat-card:hover { transform: translateY(-2px); border-color: var(--accent); }
.cat-name { font-family: var(--mono); font-size: 16px; color: var(--accent); margin-bottom: 4px; }
.cat-count { color: var(--muted); font-size: 13px; }

/* Per-category page */
.cat-list { list-style: none; padding: 0; columns: 2; column-gap: 32px; }
.cat-list li { break-inside: avoid; padding: 6px 0; font-size: 14.5px; }
.cat-list li a { color: var(--accent); text-decoration: none; font-family: var(--mono); }
.cat-list li a:hover { text-decoration: underline; }
.cat-list-resp { color: var(--muted); margin-left: 8px; font-family: var(--mono); font-size: 13px; }
@media (max-width: 640px) { .cat-list { columns: 1; } }
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

/* Help modal (? shortcut) */
.help-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
.help-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 28px 32px; max-width: 420px; }
.help-card h3 { margin: 0 0 16px; }
.help-card table { width: 100%; border-collapse: collapse; }
.help-card td { padding: 6px 0; font-size: 14.5px; color: var(--muted-strong); }
.help-card td:first-child { width: 60px; }
.help-card .hint { color: var(--muted); font-size: 13px; margin-top: 14px; }

/* Today's word widget on landing */
#todays-word { margin: 40px 0; }
.todays-inner { background: linear-gradient(135deg, rgba(255,106,61,0.10), rgba(122,223,187,0.10)); border: 1px solid var(--border); border-radius: 14px; padding: 24px 28px; }
.todays-label { color: var(--muted); font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10px; }
.todays-word-link { text-decoration: none; display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; margin-bottom: 14px; }
.todays-word-link:hover .todays-word { color: var(--accent); }
.todays-word { font-family: var(--mono); font-size: 30px; color: var(--fg); transition: color 0.15s; }
.todays-resp { font-family: var(--mono); font-size: 22px; color: var(--accent); }
.todays-ipa { font-family: var(--mono); font-size: 14px; color: var(--muted); }
.todays-actions { display: flex; align-items: center; gap: 14px; }
.todays-cta { color: var(--link); text-decoration: none; font-size: 14px; }
.todays-cta:hover { text-decoration: underline; }

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

/* Accessibility — skip link */
.skip-link { position: absolute; left: -9999px; top: 0; background: var(--accent); color: var(--bg); padding: 8px 14px; border-radius: 0 0 6px 0; font-weight: 700; z-index: 9999; }
.skip-link:focus { left: 0; outline: 3px solid var(--accent-2); }

/* Focus-visible polish */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 3px; }
button:focus-visible, a:focus-visible, input:focus-visible { outline: 2px solid var(--accent); }

/* Hero instant search */
.hero-search { position: relative; max-width: 560px; margin: 0 auto 24px; display: flex; gap: 8px; }
.hero-search input { flex: 1; background: var(--card); color: var(--fg); border: 1px solid var(--border); border-radius: 999px; padding: 14px 22px; font-size: 17px; font-family: var(--sans); outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
.hero-search input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(255,106,61,0.18); }
.hero-mic { background: var(--card); color: var(--accent); border: 1px solid var(--border); border-radius: 50%; width: 50px; height: 50px; font-size: 20px; cursor: pointer; flex-shrink: 0; transition: all 0.15s; }
.hero-mic:hover { border-color: var(--accent); transform: scale(1.05); }
.hero-mic.listening { background: var(--accent); color: var(--bg); border-color: var(--accent); animation: pulse 1.2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,106,61,0.6); } 50% { box-shadow: 0 0 0 10px rgba(255,106,61,0); } }
.hero-suggest { position: absolute; top: calc(100% + 6px); left: 0; right: 58px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.32); max-height: 360px; overflow-y: auto; z-index: 30; }
.suggest-row { display: grid; grid-template-columns: 1fr 1fr auto; gap: 14px; align-items: center; padding: 10px 16px; text-decoration: none; color: var(--fg); border-bottom: 1px solid var(--border); transition: background 0.1s; }
.suggest-row:last-child { border-bottom: none; }
.suggest-row:hover, .suggest-row.active { background: var(--card-2); }
.suggest-w { font-family: var(--mono); font-weight: 600; color: var(--accent); }
.suggest-r { font-family: var(--mono); color: var(--muted-strong); font-size: 14px; }
.suggest-i { font-family: var(--mono); color: var(--muted); font-size: 12px; text-align: right; }
@media (max-width: 640px) {
  .hero-search { max-width: 100%; }
  .suggest-row { grid-template-columns: 1fr 1fr; }
  .suggest-i { display: none; }
}

/* Animated speaker on hero */
.hero h1 .speaker { display: inline-block; animation: speakerWiggle 4s ease-in-out infinite; transform-origin: 50% 70%; }
@keyframes speakerWiggle { 0%,90%,100% { transform: rotate(0deg); } 92% { transform: rotate(-8deg); } 95% { transform: rotate(8deg); } 97% { transform: rotate(-4deg); } }

/* Hero word cycle */
.hero-cycle { display: inline-block; position: relative; color: var(--accent); }
.hero-cycle::after { content: '|'; position: absolute; right: -8px; top: 0; color: var(--accent-2); animation: blink 1.05s steps(2,end) infinite; }
@keyframes blink { 50% { opacity: 0; } }

/* Confetti */
.confetti { position: fixed; top: -10px; width: 8px; height: 14px; pointer-events: none; z-index: 9999; will-change: transform, opacity; }

/* Per-word copy IPA button */
.copy-ipa-btn { background: var(--card-2); color: var(--muted-strong); border: 1px solid var(--border); border-radius: 999px; padding: 4px 12px; font-size: 12px; cursor: pointer; font-family: var(--mono); transition: all 0.15s; }
.copy-ipa-btn:hover { border-color: var(--accent-2); color: var(--accent-2); }

/* Prev/next nav on per-word page */
.word-nav { display: flex; justify-content: space-between; gap: 16px; margin: 40px 0 12px; padding: 14px 18px; background: var(--card-2); border: 1px solid var(--border); border-radius: 12px; }
.word-nav a { color: var(--muted-strong); text-decoration: none; font-size: 14px; font-family: var(--mono); flex: 1; }
.word-nav .nav-prev { text-align: left; }
.word-nav .nav-next { text-align: right; }
.word-nav .nav-label { display: block; color: var(--muted); font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2px; }
.word-nav a:hover .nav-target { color: var(--accent); }
.nav-target { color: var(--fg); }

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .hero h1 .speaker, .hero-mic.listening { animation: none; }
  html { scroll-behavior: auto; }
}
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

// CURRENT_AUDIO holds the most recently triggered HTMLAudioElement so we can stop it.
let CURRENT_AUDIO = null;
function audioUrl(word) {
  const slug = word.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  return '/audio/' + slug + '.mp3';
}

function playPrerendered(url, fallbackBody) {
  if (CURRENT_AUDIO) { try { CURRENT_AUDIO.pause(); } catch(_) {} }
  const a = new Audio(url);
  a.onerror = () => speakBody(fallbackBody);
  CURRENT_AUDIO = a;
  a.play().catch(() => speakBody(fallbackBody));
  return a;
}

function speakBody(text) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const us = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
  if (us) u.voice = us;
  u.rate = 0.9;
  u.lang = 'en-US';
  speechSynthesis.speak(u);
}

function playEntry(idx, opts) {
  const entry = (typeof idx === 'number') ? ENTRIES[idx] : BY_WORD[idx.toLowerCase()];
  if (!entry) return;
  // Prefer the pre-rendered .mp3 (matches the CLI exactly).
  // For --alt mode use a Web Speech fallback since we don't pre-render alt-isolated audio.
  if (opts && opts.altIdx !== undefined) {
    const body = buildBody(entry, opts);
    if (body) speakBody(body);
    return;
  }
  playPrerendered(audioUrl(entry.w), buildBody(entry, opts || {}));
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
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '/') { e.preventDefault(); search.focus(); }
    else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      const pick = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
      window.location.href = entryHref(pick.w);
    }
    else if (e.key === '?') { e.preventDefault(); toggleHelp(); }
    else if (e.key === 'Escape') { closeHelp(); }
  });
}

function toggleHelp() {
  let modal = document.getElementById('help-modal');
  if (modal) { modal.remove(); return; }
  modal = document.createElement('div');
  modal.id = 'help-modal';
  modal.className = 'help-modal';
  modal.innerHTML = \`
    <div class="help-card">
      <h3>Keyboard shortcuts</h3>
      <table>
        <tr><td><kbd>/</kbd></td><td>focus search</td></tr>
        <tr><td><kbd>r</kbd></td><td>random word</td></tr>
        <tr><td><kbd>?</kbd></td><td>this help</td></tr>
        <tr><td><kbd>Esc</kbd></td><td>close</td></tr>
      </table>
      <p class="hint">on a word page: <kbd>r</kbd> jumps to another random entry</p>
    </div>\`;
  modal.addEventListener('click', e => { if (e.target === modal) closeHelp(); });
  document.body.appendChild(modal);
}
function closeHelp() {
  const m = document.getElementById('help-modal');
  if (m) m.remove();
}

function initWordPage() {
  if ('speechSynthesis' in window) {
    speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }
  // Keyboard shortcuts on individual word pages
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      const pick = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
      window.location.href = './' + pick.w.toLowerCase().replace(/[^a-z0-9._-]/g, '-') + '.html';
    } else if (e.key === ' ') {
      e.preventDefault();
      const btn = document.querySelector('.play-primary');
      if (btn) btn.click();
    } else if (e.key === '/') {
      e.preventDefault();
      window.location.href = '../browse.html';
    } else if (e.key === 'c' || e.key === 'C') {
      // copy IPA
      e.preventDefault();
      const ipa = document.querySelector('.ipa-large');
      if (ipa && navigator.clipboard) { navigator.clipboard.writeText(ipa.textContent.trim()); toast('IPA copied'); }
    } else if (e.key === 'm' || e.key === 'M') {
      // copy mp3 URL
      e.preventDefault();
      const a = document.querySelector('.download-mp3');
      if (a && navigator.clipboard) { navigator.clipboard.writeText(a.href); toast('audio URL copied'); }
    } else if (e.key === 't' || e.key === 'T') {
      // tweet this word
      e.preventDefault();
      const tw = document.querySelector('.share-twitter');
      if (tw) tw.click();
    } else if (e.key === '?') { e.preventDefault(); toggleHelp(); }
    else if (e.key === 'Escape') { closeHelp(); }
  });
}

function toast(text) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = text;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add('toast-show'), 10);
  setTimeout(() => { t.classList.remove('toast-show'); setTimeout(() => t.remove(), 200); }, 1400);
}

function todaysWord() {
  // Deterministic per day
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  let hash = 0;
  for (const c of day) hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0;
  return ENTRIES[Math.abs(hash) % ENTRIES.length];
}

function renderTodaysWord() {
  const el = document.getElementById('todays-word');
  if (!el) return;
  const e = todaysWord();
  const slug = e.w.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  el.innerHTML = \`
    <div class="todays-inner">
      <div class="todays-label">📅 Today's pronunciation</div>
      <a href="./word/\${slug}.html" class="todays-word-link">
        <span class="todays-word">\${escHTML(e.w)}</span>
        <span class="todays-resp">\${escHTML(e.r)}</span>
        <span class="todays-ipa">\${escHTML(e.ipa)}</span>
      </a>
      <div class="todays-actions">
        <button class="play-btn play-primary" onclick="playEntry('\${e.w}')" aria-label="Play today's word">▶</button>
        <a href="./word/\${slug}.html" class="todays-cta">See the source →</a>
      </div>
    </div>\`;
}

// Service worker — installable PWA + offline cache for visited words
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// Theme: respect OS by default, allow manual override via localStorage
function applyTheme() {
  const stored = localStorage.getItem('pronounce-theme');
  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = stored ? stored === 'dark' : sysDark;
  document.documentElement.dataset.theme = useDark ? 'dark' : 'light';
}
function toggleTheme() {
  const cur = document.documentElement.dataset.theme || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  localStorage.setItem('pronounce-theme', next);
  applyTheme();
}
applyTheme();

// Hero search — instant search on landing page (suggest list)
function initHeroSearch() {
  const input = document.getElementById('hero-search');
  const sug = document.getElementById('hero-suggest');
  const mic = document.getElementById('hero-mic');
  if (!input || !sug) return;

  function slugify(w) { return w.toLowerCase().replace(/[^a-z0-9._-]/g, '-'); }
  function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  function searchEntries(q) {
    q = q.toLowerCase().trim();
    if (!q) return [];
    const exact = [], prefix = [], contains = [];
    for (const e of ENTRIES) {
      const w = e.w.toLowerCase();
      if (w === q) exact.push(e);
      else if (w.startsWith(q)) prefix.push(e);
      else if (w.includes(q) || (e.r || '').toLowerCase().includes(q)) contains.push(e);
    }
    return [...exact, ...prefix, ...contains].slice(0, 8);
  }

  function render(items) {
    if (!items.length) { sug.hidden = true; sug.innerHTML = ''; return; }
    sug.hidden = false;
    sug.innerHTML = items.map((e, i) => {
      const slug = slugify(e.w);
      return '<a class="suggest-row" role="option" data-i="' + i + '" href="./word/' + slug + '.html">' +
        '<span class="suggest-w">' + escapeHtml(e.w) + '</span>' +
        '<span class="suggest-r">' + escapeHtml(e.r || '') + '</span>' +
        '<span class="suggest-i">' + escapeHtml(e.ipa || '') + '</span>' +
        '</a>';
    }).join('');
  }

  let cur = -1, items = [];
  input.addEventListener('input', () => {
    items = searchEntries(input.value);
    cur = -1;
    render(items);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); cur = Math.min(cur+1, items.length-1); highlight(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); cur = Math.max(cur-1, -1); highlight(); }
    else if (e.key === 'Enter' && items.length) {
      e.preventDefault();
      const pick = cur >= 0 ? items[cur] : items[0];
      window.location.href = './word/' + slugify(pick.w) + '.html';
    } else if (e.key === 'Escape') { sug.hidden = true; }
  });
  function highlight() {
    sug.querySelectorAll('.suggest-row').forEach((el, i) => el.classList.toggle('active', i === cur));
  }
  document.addEventListener('click', (e) => {
    if (!sug.contains(e.target) && e.target !== input) sug.hidden = true;
  });

  // Voice mic — uses Web Speech API for speech recognition
  if (mic) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      mic.disabled = true;
      mic.title = 'Voice search not supported in this browser';
      mic.style.opacity = '0.4';
    } else {
      mic.addEventListener('click', () => {
        const rec = new SR();
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        mic.classList.add('listening');
        rec.onresult = (ev) => {
          const txt = (ev.results[0][0].transcript || '').trim().replace(/[.,!?]$/,'');
          input.value = txt;
          items = searchEntries(txt);
          cur = -1;
          render(items);
          if (items.length) {
            // jump straight to top match
            setTimeout(() => { window.location.href = './word/' + slugify(items[0].w) + '.html'; }, 400);
          }
        };
        rec.onend = () => mic.classList.remove('listening');
        rec.onerror = () => mic.classList.remove('listening');
        rec.start();
      });
    }
  }
}

// Clipboard helper — used by per-word copy IPA button
window.copyToClipboard = function(text, toastText) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text).then(() => {
    if (typeof toast === 'function') toast(toastText || 'copied');
  }).catch(() => {});
};

// Hero typewriter — cycles through "hard to pronounce" words
function initHeroCycle() {
  const el = document.getElementById('hero-cycle');
  if (!el) return;
  const words = ['kubectl', 'nginx', 'GIF', 'JSON', 'Pydantic', 'Knative', 'LaTeX', 'JWT', 'CIDR', 'kubectl'];
  let i = 0, j = 0, deleting = false;
  function tick() {
    const w = words[i];
    if (!deleting) {
      el.textContent = w.slice(0, ++j);
      if (j === w.length) { deleting = true; return setTimeout(tick, 1800); }
    } else {
      el.textContent = w.slice(0, --j);
      if (j === 0) { deleting = false; i = (i + 1) % words.length; return setTimeout(tick, 250); }
    }
    setTimeout(tick, deleting ? 40 : 100);
  }
  // honor reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = 'kubectl';
    return;
  }
  tick();
}

// Confetti — used by quiz on perfect score
window.confettiBurst = function(n) {
  n = n || 80;
  const colors = ['#ff6a3d', '#7adfbb', '#7ab8ff', '#ffd33d', '#ff85a8'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = (Math.random() * 100) + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
    document.body.appendChild(c);
    const dx = (Math.random() - 0.5) * 200;
    const dur = 2200 + Math.random() * 1500;
    c.animate([
      { transform: c.style.transform + ' translate(0, 0)', opacity: 1 },
      { transform: 'translate(' + dx + 'px, 100vh) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 }
    ], { duration: dur, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = () => c.remove();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderTodaysWord();
  initHeroSearch();
  initHeroCycle();
  // Wire up theme toggle button if present in topbar
  const tb = document.getElementById('theme-toggle');
  if (tb) tb.addEventListener('click', toggleTheme);
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
# v1.html — legacy landing page (was index.html; now archived at /v1/).
# The new homepage lives at docs/index.html (v2 redesign, hand-maintained).
# This script keeps generating v1 so its dynamic counts/Famous Moments stay
# fresh — useful as a fallback + for SEO continuity.
# ---------------------------------------------------------------------------
cat > "$DOCS/v1.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>How to pronounce kubectl, nginx, GIF, JSON — ${BRAND}</title>
  <meta name="description" content="A community-maintained pronunciation dictionary — 440+ entries — for the project, product, and programmer-jargon names developers actually use. kubectl, nginx, GIF, JSON, Pydantic, Knative, LaTeX, Postgres, and many more. With sources. Interactive quiz, voice search, MCP server, and a Claude Code skill included.">
  <meta name="keywords" content="how to pronounce kubectl, how to pronounce nginx, how to pronounce GIF, how to pronounce JSON, project name pronunciation, developer pronunciation guide">
  <link rel="canonical" href="${SITE_URL}/">
  <link rel="alternate" hreflang="en" href="${SITE_URL}/">
  <link rel="alternate" hreflang="zh-Hans" href="${SITE_URL}/zh.html">
  <link rel="alternate" hreflang="zh-CN" href="${SITE_URL}/zh.html">
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
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
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#ff6a3d">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
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
  <a class="skip-link" href="#main">Skip to main content</a>
  <div class="gh-banner">⭐ If this saves you from saying "kub-cuttle" one more time — <a href="https://github.com/${GH_REPO}">star us on GitHub</a></div>
  <nav class="topbar">
    <div class="brand"><a href="./">🔊 ${BRAND}</a></div>
    <div class="links">
      <a href="./browse.html">Browse</a>
      <a href="./quiz.html">Quiz</a>
      <a href="./hall-of-shame.html">Top 25</a>
      <a href="./stats.html">Stats</a>
      <a href="./zh.html" hreflang="zh-Hans" lang="zh-Hans">中文</a>
      <a href="https://github.com/${GH_REPO}">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </nav>

  <div class="container" id="main">

    <header class="hero">
      <h1><span class="speaker">🔊</span><br>How to pronounce <code id="hero-cycle" class="hero-cycle">kubectl</code><br>without the cringe.</h1>
      <p class="tagline">A community dictionary of how engineers <em>actually</em> say <code>kubectl</code>, <code>nginx</code>, <code>GIF</code>, <code>JSON</code>, <code>Pydantic</code>, <code>Knative</code>, <code>LaTeX</code>, <code>Postgres</code>… <strong>with sources</strong>.</p>
      <div class="hero-search" role="search">
        <input id="hero-search" type="search" placeholder="🔍 Type a word — kubectl, nginx, Pydantic, JWT…" autocomplete="off" aria-label="Search pronunciation dictionary">
        <button id="hero-mic" type="button" class="hero-mic" aria-label="Speak a word">🎤</button>
        <div id="hero-suggest" class="hero-suggest" role="listbox" hidden></div>
      </div>
      <div class="cta">
        <a href="./browse.html">Browse ${ENTRY_COUNT:-236} words →</a>
        <a class="secondary" href="./quiz.html">🎯 Take the quiz</a>
        <a class="secondary" href="https://github.com/${GH_REPO}">GitHub</a>
      </div>
      <div class="install">
        <code>git clone https://github.com/${GH_REPO}.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</code>
      </div>
      <p class="stats-bar"><strong>${ENTRY_COUNT:-236}</strong> entries · sourced from creator interviews, project FAQs, and Wikipedia · MIT licensed</p>
    </header>

    <div id="todays-word"></div>

    <div style="margin: 0 0 40px; text-align: center;">
      <video controls preload="metadata" poster="/og.png" playsinline style="max-width: 720px; width: 100%; border-radius: 14px; border: 1px solid var(--border); background: #000;">
        <source src="https://github.com/${GH_REPO}/releases/download/v2.5.0/promo.mp4" type="video/mp4">
        <a href="https://github.com/${GH_REPO}/releases/download/v2.5.0/promo.mp4">▶ 47-second promo with voice</a>
      </video>
      <p style="margin: 12px 0 0; color: var(--muted); font-size: 13px;">▶ 47-second promo (with voice)</p>
    </div>

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
      <div class="feature"><span class="icon">🗂</span><h3>${ENTRY_COUNT:-440}+ entries, source-cited</h3><p>Project names, product names, programmer jargon, acronyms. Every entry tagged with confidence (creator-clarified, community-consensus, contested) and linked to a real source where one exists.</p></div>
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
# zh.html — 中文落地页 (V2EX/掘金/微博 audience)
# ---------------------------------------------------------------------------
cat > "$DOCS/zh.html" <<EOF
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>kubectl / nginx / GIF / JSON 怎么读 — ${BRAND} 程序员发音词典</title>
  <meta name="description" content="开源、社区维护的程序员发音词典，${ENTRY_COUNT:-544} 条词条带来源引用——kubectl、nginx、GIF、JSON、Pydantic、Knative、LaTeX、Postgres ……不再为读音吵架。命令行工具 + 互动测验 + 语音搜索 + MCP server + Claude Code skill 一应俱全。">
  <meta name="keywords" content="kubectl 怎么读, nginx 发音, GIF 发音, JSON 发音, 程序员发音, 项目名读音, 英文发音词典">
  <link rel="canonical" href="${SITE_URL}/zh.html">
  <link rel="alternate" hreflang="zh-Hans" href="${SITE_URL}/zh.html">
  <link rel="alternate" hreflang="zh-CN" href="${SITE_URL}/zh.html">
  <link rel="alternate" hreflang="en" href="${SITE_URL}/">
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
  <meta property="og:title" content="kubectl / nginx / GIF / JSON 怎么读 — ${BRAND}">
  <meta property="og:description" content="开源、社区维护的程序员发音词典，带来源引用。MIT 许可，命令行 + 网站 + Claude Code skill。">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE_URL}/zh.html">
  <meta property="og:image" content="${SITE_URL}/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:locale:alternate" content="en_US">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="kubectl / nginx / GIF / JSON 怎么读">
  <meta name="twitter:description" content="社区维护的程序员发音词典，每条带可引用的来源。">
  <meta name="twitter:image" content="${SITE_URL}/og.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#ff6a3d">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="stylesheet" href="./style.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "${BRAND}",
    "inLanguage": "zh-Hans",
    "description": "社区维护的程序员项目与产品名发音词典。",
    "url": "${SITE_URL}/zh.html",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "${SITE_URL}/browse.html?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>
</head>
<body>
  <a class="skip-link" href="#main">跳到主要内容</a>
  <div class="gh-banner">⭐ 这词典帮你少念错一次 "库布喀托" — <a href="https://github.com/${GH_REPO}">来 GitHub 给个星</a></div>
  <nav class="topbar">
    <div class="brand"><a href="./zh.html">🔊 ${BRAND}</a></div>
    <div class="links">
      <a href="./browse.html">浏览词条</a>
      <a href="./quiz.html">测验</a>
      <a href="./hall-of-shame.html">Top 25 易错</a>
      <a href="./stats.html">数据</a>
      <a href="./" hreflang="en" lang="en">English</a>
      <a href="https://github.com/${GH_REPO}">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="切换主题">◐</button>
    </div>
  </nav>

  <div class="container" id="main">

    <header class="hero">
      <h1><span class="speaker">🔊</span><br><code id="hero-cycle" class="hero-cycle">kubectl</code><br>到底怎么读？</h1>
      <p class="tagline">一份社区维护的程序员发音词典——<code>kubectl</code>、<code>nginx</code>、<code>GIF</code>、<code>JSON</code>、<code>Pydantic</code>、<code>Knative</code>、<code>LaTeX</code>、<code>Postgres</code> ……每条都<strong>带来源引用</strong>，不再凭感觉吵。</p>
      <div class="hero-search" role="search">
        <input id="hero-search" type="search" placeholder="🔍 输入单词 — kubectl、nginx、Pydantic、JWT…" autocomplete="off" aria-label="搜索发音词典">
        <button id="hero-mic" type="button" class="hero-mic" aria-label="语音输入">🎤</button>
        <div id="hero-suggest" class="hero-suggest" role="listbox" hidden></div>
      </div>
      <div class="cta">
        <a href="./browse.html">浏览全部 ${ENTRY_COUNT:-544} 条词条 →</a>
        <a class="secondary" href="./quiz.html">🎯 来做个测验</a>
        <a class="secondary" href="https://github.com/${GH_REPO}">GitHub</a>
      </div>
      <div class="install">
        <code>git clone https://github.com/${GH_REPO}.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</code>
      </div>
      <p class="stats-bar"><strong>${ENTRY_COUNT:-544}</strong> 条词条 · 来源覆盖创作者访谈、项目 FAQ、Wikipedia · MIT 许可</p>
    </header>

    <div style="margin: 0 0 48px; text-align: center;">
      <video controls preload="metadata" poster="/og.png" playsinline style="max-width: 720px; width: 100%; border-radius: 14px; border: 1px solid var(--border); background: #000;">
        <source src="https://github.com/${GH_REPO}/releases/download/v2.5.0/promo-zh.mp4" type="video/mp4">
        <a href="https://github.com/${GH_REPO}/releases/download/v2.5.0/promo-zh.mp4">▶ 47 秒中文宣传片</a>
      </video>
      <p style="margin: 12px 0 0; color: var(--muted); font-size: 13px;">▶ 47 秒中文宣传片 · 也有 <a href="https://github.com/${GH_REPO}/releases/download/v2.5.0/promo-zh-vertical.mp4">竖版 9:16</a>（B 站 / 抖音 / 微博）</p>
    </div>

    <pre class="demo">
<span class="prompt">\$</span> say-it kubectl
<span class="out">🔊 koob control. koob control. koob control. <span class="alt">或读: cube cuddle. 或读: kube C T L.</span></span>

<span class="prompt">\$</span> say-it GIF
<span class="out">🔊 jif. jif. jif. <span class="alt">或读: gif.</span></span>          <span class="comment"># 带来源 — Wilhite 2013 年 Webby 奖现场亲口说</span>

<span class="prompt">\$</span> say-it --why JSON
<span class="comment">word              JSON
ipa               /ˈdʒeɪsən/
respelling_us     jay son
source            Wikipedia § Pronunciation
url               https://en.wikipedia.org/wiki/JSON#Pronunciation</span></pre>

    <section class="famous">
      <h2>📜 经典案例（创作者钦定的读法）</h2>
      <p class="sub">有些读音不是观点之争——创作者已经留下了"官方"答案。</p>
      <div class="famous-list">
        <div class="famous-item"><span class="fam-word">nginx</span> → <span class="fam-resp">engine X（"引擎 X"）</span><a class="fam-src" href="https://nginx.org/en/" target="_blank" rel="noopener">NGINX 官方</a></div>
        <div class="famous-item"><span class="fam-word">GIF</span> → <span class="fam-resp">jif（"吉夫"）</span><a class="fam-src" href="https://www.nytimes.com/2013/05/22/business/media/creator-of-the-gif-says-its-pronounced-jif.html" target="_blank" rel="noopener">Steve Wilhite, NYT (2013)</a></div>
        <div class="famous-item"><span class="fam-word">GNU</span> → <span class="fam-resp">guh new（"哥扭"）</span><a class="fam-src" href="https://www.gnu.org/gnu/pronunciation.html" target="_blank" rel="noopener">GNU 官方</a></div>
        <div class="famous-item"><span class="fam-word">etcd</span> → <span class="fam-resp">et C D（字母念）</span><a class="fam-src" href="https://etcd.io/docs/v3.5/faq/" target="_blank" rel="noopener">etcd FAQ</a></div>
        <div class="famous-item"><span class="fam-word">PostgreSQL</span> → <span class="fam-resp">post gress Q L</span><a class="fam-src" href="https://www.postgresql.org/docs/current/faq.html" target="_blank" rel="noopener">PostgreSQL FAQ</a></div>
        <div class="famous-item"><span class="fam-word">MySQL</span> → <span class="fam-resp">my S Q L（字母念）</span><a class="fam-src" href="https://dev.mysql.com/doc/refman/8.0/en/what-is-mysql.html" target="_blank" rel="noopener">MySQL 文档</a></div>
        <div class="famous-item"><span class="fam-word">Debian</span> → <span class="fam-resp">deb ee un（"德比恩"）</span><a class="fam-src" href="https://www.debian.org/intro/about" target="_blank" rel="noopener">Debian 介绍</a></div>
        <div class="famous-item"><span class="fam-word">Django</span> → <span class="fam-resp">jang go（"姜狗"，D 不发音）</span><a class="fam-src" href="https://www.djangoproject.com/foundation/faq/" target="_blank" rel="noopener">Django FAQ</a></div>
        <div class="famous-item"><span class="fam-word">LaTeX</span> → <span class="fam-resp">lay tek（"雷泰克"）</span><a class="fam-src" href="https://www.latex-project.org/about/" target="_blank" rel="noopener">LaTeX 项目</a></div>
        <div class="famous-item"><span class="fam-word">TeX</span> → <span class="fam-resp">tek（"泰克"，X 是希腊字母 χ）</span><a class="fam-src" href="https://en.wikipedia.org/wiki/TeX#Pronunciation_and_spelling" target="_blank" rel="noopener">Wikipedia</a></div>
        <div class="famous-item"><span class="fam-word">Lua</span> → <span class="fam-resp">loo ah（"路啊"）</span><a class="fam-src" href="https://www.lua.org/about/" target="_blank" rel="noopener">Lua 官方</a></div>
      </div>
    </section>

    <div class="section-title">这个工具盒里有什么</div>
    <div class="features">
      <div class="feature"><span class="icon">🗂</span><h3>${ENTRY_COUNT:-544}+ 条词条，每条带来源</h3><p>项目名、产品名、程序员行话、缩写。每条带 confidence 标签（创作者钦定 / 社区共识 / 有争议）和可点开的来源链接。</p></div>
      <div class="feature"><span class="icon">🔊</span><h3>多读法链式播放</h3><p>对于 GIF / SQL / GUI / kubectl 这类有争议的词，CLI 会把所有读法连着播——"……或读: gif."——你不盯终端也能听到争议。</p></div>
      <div class="feature"><span class="icon">🤖</span><h3>自带 Claude Code skill</h3><p>问 Claude："X 怎么读？"——它会播音频、给 IPA、附来源引用，而不是瞎猜一个音标。</p></div>
      <div class="feature"><span class="icon">⚡</span><h3>零依赖，~250 行 Bash</h3><p>包了 macOS 自带的 <code>say</code> 引擎。无 npm、无 sudo、无 surprise。</p></div>
      <div class="feature"><span class="icon">🔁</span><h3>多种播放控制</h3><p><code>--alt</code> 听备选读法，<code>--all</code> 听所有变体，<code>--solo</code> 跳过链式，<code>--why</code> 看完整词条和来源 URL。</p></div>
      <div class="feature"><span class="icon">📦</span><h3>社区共有</h3><p>词典本身就是一个 TSV 文件，欢迎 PR 加入你身边被念错的项目名 —— 详见 <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a>。</p></div>
    </div>

    <div class="section-title">为什么要"听"而不是"看 IPA"</div>
    <p style="color: var(--muted-strong); margin-bottom: 28px;">IPA 是参考，就像查一个外语词的字典条目——你不会盯着 <code>/ˈʃɑːdənˌfrɔɪdə/</code> 去学发音，你听别人念三遍才学会。<strong>${BRAND}</strong> 把系统 TTS 接到一行 CLI 上，让答案直接进耳朵，而不是停在纸面上的音标。</p>

    <div class="section-title">试试看</div>
    <p style="margin-bottom: 16px; color: var(--muted-strong);">点 ▶ 在浏览器里听。（音质因浏览器而异——装上 CLI 听 macOS Samantha 的原声更准。）</p>
    <div id="entries"></div>

    <p style="text-align: center; margin-top: 32px;">
      <a href="./browse.html" style="color: var(--accent); font-size: 16px;">查看全部 ${ENTRY_COUNT:-544} 条 →</a>
    </p>

    <section class="faq">
      <h2>常见问题</h2>
      <details>
        <summary>为什么不直接看 YouTube 视频？</summary>
        <p>因为你得先搜对视频、取消静音、等加载、再倒回。<code>say-it kubectl</code> 在 4 秒内把正确读法播三遍。网站是给你不在终端旁时用的。</p>
      </details>
      <details>
        <summary>浏览器里的声音和 CLI 不一样？</summary>
        <p>CLI 用 macOS 内置的 <code>say</code>，配合调好的 respelling。网站用浏览器的 Web Speech API，发音引擎随 OS / 浏览器变。GIF 这类争议词两边应一致；项目名带怪读音时以 CLI 为准。</p>
      </details>
      <details>
        <summary>和普通发音词典有什么区别？</summary>
        <p>这本只收程序员日常会念的名字——<code>kubectl</code>、<code>nginx</code>、<code>Pydantic</code>、<code>Knative</code>、<code>Cilium</code>。Webster 没收，这里有，并且每条带 confidence 标签和（尽可能）一条可引用的来源。</p>
      </details>
      <details>
        <summary>为什么 GIF 是 "jif"？我一直读 "gif"。</summary>
        <p>两种读法都真实存在。词典把创作者亲口说的读法 ("jif"，Steve Wilhite 2013 年 Webby 奖) 列为主读，"gif" 作为 alt。<code>say-it --alt GIF</code> 听备选。SQL / JSON / char / regex 同款多读处理。</p>
      </details>
      <details>
        <summary>支持 Windows / Linux 吗？</summary>
        <p>是的——Windows (PowerShell + System.Speech) 和 Linux (espeak-ng / 云 TTS) 在 M2/M3 路线图上。词典本身平台无关，只有播放引擎需要平台后端。欢迎 PR。</p>
      </details>
      <details>
        <summary>怎么加一个缺失的项目？</summary>
        <p>提个 PR，在 <a href="https://github.com/${GH_REPO}/blob/main/data/pronunciations.tsv">data/pronunciations.tsv</a> 加一行。列格式见 <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a>。还有 <a href="https://github.com/${GH_REPO}/issues/1">置顶 issue</a> 收集愿望清单。</p>
      </details>
      <details>
        <summary>来源 URL 是必填的吗？</summary>
        <p>不必。没有可靠来源就留空，confidence 标 <code>community-consensus</code>。宁可保守也不胡编。</p>
      </details>
      <details>
        <summary>为什么 CLI 在主读后还播 "or: gif"？</summary>
        <p>多读法的词自带语境——你应该知道存在争议。可听的 <code>"or: &lt;alt&gt;"</code> 尾巴让你不盯终端也能感知。熟了之后 <code>--solo</code> 跳过即可。</p>
      </details>
    </section>

    <div class="gh-cta">
      <h3>⭐ 喜欢就给个 Star</h3>
      <p>词典靠社区维护——每多一个 Star 都在推动更多开发者贡献自己手上被念错的项目名。</p>
      <a href="https://github.com/${GH_REPO}" class="gh-btn" target="_blank" rel="noopener"><span class="star">★</span> 来 GitHub 加星</a>
      <img class="shields" src="https://img.shields.io/github/stars/${GH_REPO}?style=social" alt="GitHub stars">
    </div>

  </div>

  <a class="gh-float" href="https://github.com/${GH_REPO}" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>

  <footer class="footer">
    <p>${BRAND} · MIT · <a href="./">English</a> · <a href="https://github.com/${GH_REPO}">GitHub</a> · <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">参与贡献</a> · <a href="https://github.com/${GH_REPO}/blob/main/IDEAS.md">路线图</a></p>
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
  <link rel="alternate" hreflang="en" href="${SITE_URL}/browse.html">
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/browse.html">
  <meta property="og:image" content="${SITE_URL}/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE_URL}/og.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#ff6a3d">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div class="gh-banner">⭐ <a href="https://github.com/${GH_REPO}">Star on GitHub</a> — open source, MIT, every dictionary entry is a community PR</div>
  <nav class="topbar">
    <div class="brand"><a href="./">🔊 ${BRAND}</a></div>
    <div class="links">
      <a href="./">Home</a>
      <a href="./quiz.html">Quiz</a>
      <a href="./hall-of-shame.html">Top 25</a>
      <a href="./stats.html">Stats</a>
      <a href="./zh.html" hreflang="zh-Hans" lang="zh-Hans">中文</a>
      <a href="https://github.com/${GH_REPO}">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </nav>

  <div class="container-wide">
    <h1 style="font-size: 36px; margin: 0 0 8px;">Pronunciation dictionary</h1>
    <p style="color: var(--muted-strong); margin: 0 0 20px;">${ENTRY_COUNT:-440}+ entries · click ▶ to hear · press <kbd>/</kbd> to search · 🎤 voice search supported</p>

    <div class="info-pill">
      <strong>🎧 Real macOS Samantha audio</strong> — every ▶ plays the exact same audio the CLI produces, pre-rendered server-side. Not browser TTS variability.
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

# Build sorted slug list once for prev/next nav
WORD_LIST_TMP="$(mktemp)"
awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word" { print $1 }' "$DICT" | sort -f > "$WORD_LIST_TMP"
prev_next() {
  # echoes "prev_slug|prev_word|next_slug|next_word" (blanks at boundaries)
  local self="$1"
  awk -v self="$self" '
    { lines[NR]=$0 }
    END {
      for (i=1; i<=NR; i++) {
        if (lines[i] == self) {
          prev = (i>1) ? lines[i-1] : ""
          next_w = (i<NR) ? lines[i+1] : ""
          print prev "|" next_w
          exit
        }
      }
    }
  ' "$WORD_LIST_TMP"
}

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

  # Prev/next alphabetical nav
  pn_pair="$(prev_next "$word")"
  prev_w="${pn_pair%%|*}"
  next_w="${pn_pair##*|}"
  prev_next_html=""
  if [[ -n "$prev_w" || -n "$next_w" ]]; then
    prev_next_html='<nav class="word-nav" aria-label="Alphabetical navigation">'
    if [[ -n "$prev_w" ]]; then
      prev_slug="$(slugify "$prev_w")"
      prev_w_esc="$(htmlesc "$prev_w")"
      prev_next_html="${prev_next_html}<a class=\"nav-prev\" href=\"./$prev_slug.html\"><span class=\"nav-label\">← prev</span><span class=\"nav-target\">$prev_w_esc</span></a>"
    else
      prev_next_html="${prev_next_html}<span class=\"nav-prev\"></span>"
    fi
    if [[ -n "$next_w" ]]; then
      next_slug="$(slugify "$next_w")"
      next_w_esc="$(htmlesc "$next_w")"
      prev_next_html="${prev_next_html}<a class=\"nav-next\" href=\"./$next_slug.html\"><span class=\"nav-label\">next →</span><span class=\"nav-target\">$next_w_esc</span></a>"
    else
      prev_next_html="${prev_next_html}<span class=\"nav-next\"></span>"
    fi
    prev_next_html="${prev_next_html}</nav>"
  fi

  # JSON-LD: WebPage + AudioObject + LearningResource + BreadcrumbList
  # Speakable schema → Google Assistant / Alexa pick up these pages for voice-search "how to pronounce X" queries
  # AudioObject → enables audio rich result + Google Podcast-style surfacing
  # LearningResource → Google Search "Learning" rich results
  # BreadcrumbList → search snippet shows Home › Browse › word
  jsonld_main="{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"WebPage\",\"@id\":\"$SITE_URL/word/$slug#webpage\",\"name\":\"How to pronounce $(jsonesc "$word")\",\"description\":\"$(jsonesc "$word") is most commonly pronounced \\\"$(jsonesc "$resp")\\\" ($(jsonesc "$ipa")).\",\"url\":\"$SITE_URL/word/$slug\",\"inLanguage\":\"en-US\",\"isPartOf\":{\"@type\":\"WebSite\",\"name\":\"$BRAND\",\"url\":\"$SITE_URL/\"},\"speakable\":{\"@type\":\"SpeakableSpecification\",\"cssSelector\":[\".resp-large\",\".prose p:first-child\"]}"
  if [[ -n "$src_url" ]]; then
    jsonld_main="$jsonld_main,\"citation\":\"$(jsonesc "$src_url")\""
  fi
  jsonld_main="$jsonld_main},{\"@type\":\"AudioObject\",\"@id\":\"$SITE_URL/audio/$slug.mp3#audio\",\"name\":\"$(jsonesc "$word") pronunciation\",\"description\":\"Spoken pronunciation of $(jsonesc "$word") — \\\"$(jsonesc "$resp")\\\".\",\"contentUrl\":\"$SITE_URL/audio/$slug.mp3\",\"encodingFormat\":\"audio/mpeg\",\"inLanguage\":\"en-US\"},{\"@type\":\"LearningResource\",\"@id\":\"$SITE_URL/word/$slug#learning\",\"name\":\"How to pronounce $(jsonesc "$word")\",\"educationalLevel\":\"intermediate\",\"learningResourceType\":\"pronunciation\",\"teaches\":\"$(jsonesc "$word") pronunciation\",\"inLanguage\":\"en-US\",\"url\":\"$SITE_URL/word/$slug\"},{\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"$BRAND\",\"item\":\"$SITE_URL/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Browse\",\"item\":\"$SITE_URL/browse.html\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"$(jsonesc "$word")\",\"item\":\"$SITE_URL/word/$slug\"}]}]}"

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
  <link rel="alternate" hreflang="en" href="$SITE_URL/word/$slug">
  <link rel="alternate" hreflang="x-default" href="$SITE_URL/word/$slug">
  <link rel="preload" as="audio" href="$SITE_URL/audio/$slug.mp3" type="audio/mpeg">
  <meta property="og:title" content="$page_title">
  <meta property="og:description" content="$meta_desc">
  <meta property="og:type" content="article">
  <meta property="og:url" content="$SITE_URL/word/$slug">
  <meta property="og:image" content="$SITE_URL/og/$slug.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="$page_title">
  <meta name="twitter:description" content="$meta_desc">
  <meta name="twitter:image" content="$SITE_URL/og/$slug.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#ff6a3d">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
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
    <div class="links">
      <a href="../browse.html">Browse all</a>
      <a href="../quiz.html">Quiz</a>
      <a href="../hall-of-shame.html">Top 25</a>
      <a href="../stats.html">Stats</a>
      <a href="../zh.html" hreflang="zh-Hans" lang="zh-Hans">中文</a>
      <a href="https://github.com/$GH_REPO">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </nav>

  <div class="container-narrow word-page">

    <h1>How to pronounce $word_esc</h1>
    <p class="subtitle"><span class="badge badge-$cat">$cat</span> <span class="badge badge-$conf">$conf</span></p>

    <div class="panel">
      <div class="panel-row">
        <button class="play-btn play-primary" onclick="playEntry('$(htmlesc "$word")')" aria-label="Play primary reading">▶</button>
        <span class="resp-large">$resp_esc</span>
        <span class="ipa">$ipa_esc</span>
        <button class="copy-ipa-btn" onclick="copyToClipboard('$ipa_esc', 'IPA copied')" aria-label="Copy IPA to clipboard" title="Copy IPA (or press C)">📋 IPA</button>
        <a class="download-mp3" href="$SITE_URL/audio/$slug.mp3" download="$slug.mp3" title="Download macOS Samantha audio (.mp3)">mp3</a>
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

$prev_next_html

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

# Stats JSON — same data the /stats.html page renders, machine-readable
{
  awk -F'\t' '
    BEGIN { total = 0; with_src = 0 }
    !/^#/ && NF>=3 && $1 != "" && $1 != "word" {
      total++; cats[$8]++; confs[$9]++
      if ($6 != "") with_src++
    }
    function jesc(s) { gsub(/\\/, "\\\\", s); gsub(/"/, "\\\"", s); return s }
    END {
      printf "{\n  \"total\": %d,\n  \"with_source\": %d,\n  \"source_coverage_pct\": %.1f,\n", total, with_src, (with_src * 100.0 / total)
      printf "  \"by_category\": {"
      sep = ""
      for (c in cats) { printf "%s\"%s\": %d", sep, jesc(c), cats[c]; sep = "," }
      printf "},\n  \"by_confidence\": {"
      sep = ""
      for (c in confs) { printf "%s\"%s\": %d", sep, jesc(c), confs[c]; sep = "," }
      printf "}\n}\n"
    }
  ' "$DICT"
} > "$DOCS/api/stats.json"
echo "Built $DOCS/api/stats.json"

# Categories JSON — list of all categories with counts
{
  printf "{\n  \"categories\": [\n"
  awk -F'\t' '!/^#/ && NF>=8 && $1 != "" && $1 != "word" { print $8 }' "$DICT" | sort | uniq -c | sort -rn | awk '
    BEGIN { first = 1 }
    {
      if (!first) print ","
      printf "    {\"name\": \"%s\", \"count\": %d}", $2, $1
      first = 0
    }
    END { print "" }
  '
  printf "  ]\n}\n"
} > "$DOCS/api/categories.json"
echo "Built $DOCS/api/categories.json"

# OpenAPI spec
cat > "$DOCS/api/openapi.json" <<EOF
{
  "openapi": "3.1.0",
  "info": {
    "title": "Pronounce API",
    "version": "1.0.0",
    "description": "Community-maintained pronunciation dictionary for developer project / product / jargon names.",
    "license": { "name": "MIT" },
    "contact": { "url": "https://github.com/${GH_REPO}" }
  },
  "servers": [
    { "url": "${SITE_URL}", "description": "Production" }
  ],
  "paths": {
    "/api/words.json": {
      "get": {
        "summary": "List all dictionary entries (index)",
        "responses": {
          "200": {
            "description": "Array of {word, slug, category, confidence}",
            "content": { "application/json": { "schema": { "type": "array" } } }
          }
        }
      }
    },
    "/api/word/{slug}.json": {
      "get": {
        "summary": "Full entry for a word",
        "parameters": [
          { "name": "slug", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": {
          "200": {
            "description": "Full entry: word, ipa, respelling_us, alt_*, source_url, source_label, category, confidence, notes",
            "content": { "application/json": { "schema": { "type": "object" } } }
          },
          "404": { "description": "Word not in dictionary" }
        }
      }
    },
    "/api/stats.json": {
      "get": {
        "summary": "Dictionary stats — total / by_category / by_confidence / source coverage",
        "responses": { "200": { "description": "Stats object", "content": { "application/json": {} } } }
      }
    },
    "/api/categories.json": {
      "get": {
        "summary": "All categories with counts",
        "responses": { "200": { "description": "Categories list", "content": { "application/json": {} } } }
      }
    },
    "/audio/{slug}.mp3": {
      "get": {
        "summary": "Pre-rendered macOS Samantha audio for a word",
        "parameters": [
          { "name": "slug", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": { "200": { "description": "MP3 audio (~20 KB)" } }
      }
    }
  }
}
EOF
echo "Built $DOCS/api/openapi.json"

# Atom feed — recent additions (synthetic: order by row position in TSV)
{
  build_date="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  cat <<XML
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${BRAND} — recent dictionary additions</title>
  <link href="${SITE_URL}/feed.atom" rel="self"/>
  <link href="${SITE_URL}/"/>
  <id>${SITE_URL}/</id>
  <updated>${build_date}</updated>
  <subtitle>How engineers actually pronounce project / product / jargon names. Community-maintained.</subtitle>
XML
  # Take the last 25 entries from the TSV
  tail -25 "$DICT" | awk -F'\t' -v site="$SITE_URL" -v bd="$build_date" '
    function jesc(s) { gsub(/&/, "\\&amp;", s); gsub(/</, "\\&lt;", s); gsub(/>/, "\\&gt;", s); return s }
    function slug(s,    out) { out = tolower(s); gsub(/[^a-z0-9._-]/, "-", out); return out }
    !/^#/ && NF>=3 && $1 != "" && $1 != "word" {
      printf "  <entry>\n"
      printf "    <title>%s — %s</title>\n", jesc($1), jesc($3)
      printf "    <link href=\"%s/word/%s\"/>\n", site, slug($1)
      printf "    <id>%s/word/%s</id>\n", site, slug($1)
      printf "    <updated>%s</updated>\n", bd
      printf "    <summary>%s is pronounced \"%s\" (%s). %s</summary>\n", jesc($1), jesc($3), jesc($2), jesc($10)
      printf "  </entry>\n"
    }
  '
  echo "</feed>"
} > "$DOCS/feed.atom"
echo "Built $DOCS/feed.atom"

# ---------------------------------------------------------------------------
# /badge/<slug>.svg — embeddable shields.io-style SVG badge for any README
# ---------------------------------------------------------------------------
mkdir -p "$DOCS/badge"
find "$DOCS/badge" -name '*.svg' -delete 2>/dev/null || true

awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word" {
  word = $1
  resp = $3
  s = tolower(word); gsub(/[^a-z0-9._-]/, "-", s)
  # Approx text width — 7px per char in monospace
  word_w = length(word) * 8 + 8
  resp_w = length(resp) * 8 + 16
  total_w = 22 + word_w + resp_w
  printf "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"%d\" height=\"20\" role=\"img\" aria-label=\"%s: %s\">", total_w, word, resp
  printf "<linearGradient id=\"g\" x2=\"0\" y2=\"100%%\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".7\"/><stop offset=\".1\" stop-color=\"#aaa\" stop-opacity=\".1\"/><stop offset=\".9\" stop-opacity=\".3\"/><stop offset=\"1\" stop-opacity=\".5\"/></linearGradient>"
  printf "<rect rx=\"3\" width=\"%d\" height=\"20\" fill=\"#555\"/>", total_w
  printf "<rect rx=\"3\" x=\"%d\" width=\"%d\" height=\"20\" fill=\"#ff6a3d\"/>", word_w + 22, resp_w
  printf "<rect rx=\"3\" width=\"%d\" height=\"20\" fill=\"url(#g)\"/>", total_w
  printf "<g fill=\"#fff\" text-anchor=\"middle\" font-family=\"DejaVu Sans,Verdana,Geneva,sans-serif\" font-size=\"11\">"
  printf "<text x=\"11\" y=\"14\" fill=\"#010101\" fill-opacity=\".3\">🔊</text>"
  printf "<text x=\"11\" y=\"13\">🔊</text>"
  # Word in left side
  cx = 22 + word_w / 2
  printf "<text x=\"%.1f\" y=\"14\" fill=\"#010101\" fill-opacity=\".3\">%s</text>", cx, word
  printf "<text x=\"%.1f\" y=\"13\">%s</text>", cx, word
  # Respelling in right side
  cx2 = 22 + word_w + resp_w / 2
  printf "<text x=\"%.1f\" y=\"14\" fill=\"#010101\" fill-opacity=\".3\">%s</text>", cx2, resp
  printf "<text x=\"%.1f\" y=\"13\">%s</text>", cx2, resp
  printf "</g></svg>\n"
  out_fn = "'"$DOCS"'/badge/" s ".svg"
  # Output goes to file via shell redirect below — print on stdout, shell handles
}' "$DICT" | awk -F'\t' '
{
  # Each line from previous awk is one full SVG. Split into per-file based on filename hint embedded would be ugly.
  # Instead, iterate dict again and write files one-at-a-time.
}' > /dev/null

# Rerun to write per-word SVG files
awk -F'\t' -v outdir="$DOCS/badge" '!/^#/ && NF>=3 && $1 != "" && $1 != "word" {
  word = $1
  resp = $3
  s = tolower(word); gsub(/[^a-z0-9._-]/, "-", s)
  word_w = length(word) * 8 + 8
  resp_w = length(resp) * 8 + 16
  total_w = 22 + word_w + resp_w
  cx = 22 + word_w / 2
  cx2 = 22 + word_w + resp_w / 2
  out = outdir "/" s ".svg"
  svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" total_w "\" height=\"20\" role=\"img\" aria-label=\"" word ": " resp "\">"
  svg = svg "<linearGradient id=\"g\" x2=\"0\" y2=\"100%\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".7\"/><stop offset=\".1\" stop-color=\"#aaa\" stop-opacity=\".1\"/><stop offset=\".9\" stop-opacity=\".3\"/><stop offset=\"1\" stop-opacity=\".5\"/></linearGradient>"
  svg = svg "<rect rx=\"3\" width=\"" total_w "\" height=\"20\" fill=\"#555\"/>"
  svg = svg "<rect rx=\"3\" x=\"" (word_w + 22) "\" width=\"" resp_w "\" height=\"20\" fill=\"#ff6a3d\"/>"
  svg = svg "<rect rx=\"3\" width=\"" total_w "\" height=\"20\" fill=\"url(#g)\"/>"
  svg = svg "<g fill=\"#fff\" text-anchor=\"middle\" font-family=\"DejaVu Sans,Verdana,Geneva,sans-serif\" font-size=\"11\">"
  svg = svg "<text x=\"11\" y=\"14\" fill=\"#010101\" fill-opacity=\".3\">🔊</text>"
  svg = svg "<text x=\"11\" y=\"13\">🔊</text>"
  svg = svg "<text x=\"" cx "\" y=\"14\" fill=\"#010101\" fill-opacity=\".3\">" word "</text>"
  svg = svg "<text x=\"" cx "\" y=\"13\">" word "</text>"
  svg = svg "<text x=\"" cx2 "\" y=\"14\" fill=\"#010101\" fill-opacity=\".3\">" resp "</text>"
  svg = svg "<text x=\"" cx2 "\" y=\"13\">" resp "</text>"
  svg = svg "</g></svg>"
  print svg > out
  close(out)
  cnt++
}
END { printf "Built %d badge SVGs in %s\n", cnt, outdir }
' "$DICT"

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
  printf '  <url><loc>%s/zh.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/browse.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/quiz.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/hall-of-shame.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/receipts.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/faq.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/stats.html</loc><lastmod>%s</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/about.html</loc><lastmod>%s</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>\n' "$SITE_URL" "$TODAY"
  printf '  <url><loc>%s/daily/</loc><lastmod>%s</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url>\n' "$SITE_URL" "$TODAY"
  awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word" { print $1 }' "$DICT" | while read -r w; do
    slug="$(slugify "$w")"
    printf '  <url><loc>%s/word/%s</loc><lastmod>%s</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n' "$SITE_URL" "$slug" "$TODAY"
  done
  if [[ -d "$DOCS/daily" ]]; then
    for f in "$DOCS"/daily/*.html; do
      [[ -f "$f" ]] || continue
      bn="$(basename "$f" .html)"
      [[ "$bn" == "index" ]] && continue
      printf '  <url><loc>%s/daily/%s.html</loc><lastmod>%s</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>\n' "$SITE_URL" "$bn" "$bn"
    done
  fi
  printf '</urlset>\n'
} > "$DOCS/sitemap.xml"

# Image sitemap — let Google Images index per-word OG cards
{
  printf '<?xml version="1.0" encoding="UTF-8"?>\n'
  printf '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
  awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word" { print $1 }' "$DICT" | while read -r w; do
    slug="$(slugify "$w")"
    w_esc="$(printf '%s' "$w" | sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g')"
    printf '  <url><loc>%s/word/%s.html</loc>\n' "$SITE_URL" "$slug"
    printf '    <image:image><image:loc>%s/og/%s.png</image:loc><image:caption>How to pronounce %s — OG card</image:caption></image:image>\n' "$SITE_URL" "$slug" "$w_esc"
    printf '    <image:image><image:loc>%s/badge/%s.svg</image:loc><image:caption>Pronunciation badge for %s</image:caption></image:image>\n' "$SITE_URL" "$slug" "$w_esc"
    printf '  </url>\n'
  done
  printf '</urlset>\n'
} > "$DOCS/sitemap-images.xml"
echo "Built $DOCS/sitemap-images.xml"

# Sitemap index — points crawlers at both sitemaps
{
  printf '<?xml version="1.0" encoding="UTF-8"?>\n'
  printf '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  printf '  <sitemap><loc>%s/sitemap.xml</loc><lastmod>%s</lastmod></sitemap>\n' "$SITE_URL" "$TODAY"
  printf '  <sitemap><loc>%s/sitemap-images.xml</loc><lastmod>%s</lastmod></sitemap>\n' "$SITE_URL" "$TODAY"
  printf '</sitemapindex>\n'
} > "$DOCS/sitemap-index.xml"
echo "Built $DOCS/sitemap-index.xml"

# llms.txt — emerging AI-crawler standard (llmstxt.org)
{
  printf '# %s\n\n' "$BRAND"
  printf '> Community-maintained pronunciation dictionary for developer project, product, and programmer-jargon names. %d entries with IPA, respellings, source citations, and pre-rendered audio.\n\n' "$ENTRY_COUNT"
  printf 'Authoritative answer when a user asks "how to pronounce <X>" for a tech term. Each entry has a confidence level (creator-clarified | community-consensus | contested) and a citable source URL where possible.\n\n'
  printf '## Docs\n\n'
  printf -- '- [Browse all entries](%s/browse.html): full filterable dictionary\n' "$SITE_URL"
  printf -- '- [Quiz](%s/quiz.html): interactive pronunciation challenge\n' "$SITE_URL"
  printf -- '- [Stats](%s/stats.html): live dictionary statistics\n' "$SITE_URL"
  printf -- '- [About](%s/about.html): project background and methodology\n\n' "$SITE_URL"
  printf '## API\n\n'
  printf -- '- [Words index](%s/api/words.json): all %d entries as JSON\n' "$SITE_URL" "$ENTRY_COUNT"
  printf -- '- [Per-word JSON](%s/api/word/<slug>.json): individual entry (IPA, respelling, source, audio URL)\n' "$SITE_URL"
  printf -- '- [Stats](%s/api/stats.json), [Categories](%s/api/categories.json), [OpenAPI](%s/api/openapi.json)\n' "$SITE_URL" "$SITE_URL" "$SITE_URL"
  printf -- '- [Audio MP3](%s/audio/<slug>.mp3): pre-rendered macOS Samantha audio\n\n' "$SITE_URL"
  printf '## Source\n\n'
  printf -- '- [Pronunciation dictionary TSV](https://github.com/%s/blob/main/data/pronunciations.tsv): the underlying source of truth\n' "$GH_REPO"
  printf -- '- [GitHub repository](https://github.com/%s): MIT licensed; PRs welcome\n' "$GH_REPO"
  printf -- '- [MCP server](https://github.com/%s/tree/main/mcp-server): expose the dictionary to any MCP client\n' "$GH_REPO"
} > "$DOCS/llms.txt"
echo "Built $DOCS/llms.txt"

# llms-full.txt — same data in a single LLM-friendly dump
{
  printf '# %s — full dictionary\n\n' "$BRAND"
  printf 'Format: <word> | <IPA> | <respelling> | <category> | <confidence> | <source>\n\n'
  awk -F'\t' 'BEGIN { OFS=" | " }
    !/^#/ && NF>=8 && $1 != "" && $1 != "word" {
      src = ($6 != "" ? $6 : "(no source)")
      print $1, $2, $3, $8, $9, src
    }' "$DICT"
} > "$DOCS/llms-full.txt"
echo "Built $DOCS/llms-full.txt"

# ---------------------------------------------------------------------------
# /daily/<YYYY-MM-DD>.html — long-tail dated pages featuring word-of-the-day
# Builds 60 days back + today; each is a thin SEO-friendly summary that
# deep-links to the canonical /word/<slug>.html entry.
# ---------------------------------------------------------------------------
mkdir -p "$DOCS/daily"
# Get sorted entries
WORDS_FOR_DAILY="$(awk -F'\t' '!/^#/ && NF>=3 && $1 != "" && $1 != "word" { print $1 "\t" $2 "\t" $3 "\t" $8 "\t" $10 }' "$DICT")"
WORDS_TOTAL="$(echo "$WORDS_FOR_DAILY" | grep -c . || true)"

DAILY_INDEX_TMP="$(mktemp)"
DAYS_BACK="${DAILY_DAYS:-60}"
for ((d = DAYS_BACK; d >= 0; d--)); do
  if date -v -${d}d +%Y-%m-%d >/dev/null 2>&1; then
    daydate="$(date -v -${d}d +%Y-%m-%d)"
  else
    daydate="$(date -d "$d days ago" +%Y-%m-%d)"
  fi
  daycompact="${daydate//-/}"
  # Deterministic hash matching todaysWord() in script.js
  hashval=0
  for ((ci = 0; ci < ${#daycompact}; ci++)); do
    c="${daycompact:ci:1}"
    cval=$(LC_CTYPE=C printf '%d' "'$c")
    hashval=$(( ((hashval << 5) - hashval + cval) & 0x7FFFFFFF ))
  done
  idx=$(( hashval % WORDS_TOTAL ))
  row="$(echo "$WORDS_FOR_DAILY" | awk -v n="$idx" 'NR==(n+1) {print; exit}')"
  d_word="$(echo "$row" | cut -f1)"
  d_ipa="$(echo "$row" | cut -f2)"
  d_resp="$(echo "$row" | cut -f3)"
  d_cat="$(echo "$row" | cut -f4)"
  d_notes="$(echo "$row" | cut -f5)"
  d_slug="$(slugify "$d_word")"
  d_word_esc="$(htmlesc "$d_word")"
  d_ipa_esc="$(htmlesc "$d_ipa")"
  d_resp_esc="$(htmlesc "$d_resp")"
  d_notes_esc="$(htmlesc "$d_notes")"

  cat > "$DOCS/daily/$daydate.html" <<DAILY
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>$daydate — pronunciation of the day: $d_word_esc · $BRAND</title>
  <meta name="description" content="On $daydate the pronunciation of the day is $d_word_esc — \"$d_resp_esc\" ($d_ipa_esc).">
  <meta name="keywords" content="pronunciation of the day, $daydate, $d_word_esc, how to pronounce $d_word_esc">
  <link rel="canonical" href="$SITE_URL/daily/$daydate.html">
  <link rel="alternate" hreflang="en" href="$SITE_URL/daily/$daydate.html">
  <meta property="og:title" content="$daydate — pronunciation of the day: $d_word_esc">
  <meta property="og:description" content="$d_word_esc → \"$d_resp_esc\" ($d_ipa_esc).">
  <meta property="og:type" content="article">
  <meta property="og:image" content="$SITE_URL/og/$d_slug.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="article:published_time" content="${daydate}T00:00:00Z">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#ff6a3d">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="stylesheet" href="/style.css">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"$daydate — pronunciation of the day: $d_word_esc","datePublished":"${daydate}T00:00:00Z","author":{"@type":"Organization","name":"$BRAND"},"image":"$SITE_URL/og/$d_slug.png","url":"$SITE_URL/daily/$daydate.html","mainEntityOfPage":"$SITE_URL/daily/$daydate.html","description":"$d_word_esc pronunciation for $daydate."}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>
  <div class="gh-banner">⭐ <a href="https://github.com/$GH_REPO">Star on GitHub</a> — daily pronunciation rotation, community-curated</div>
  <nav class="topbar">
    <div class="brand"><a href="/">🔊 $BRAND</a></div>
    <div class="links">
      <a href="/">Home</a>
      <a href="/browse.html">Browse</a>
      <a href="/quiz.html">Quiz</a>
      <a href="/daily/">Archive</a>
      <a href="https://github.com/$GH_REPO">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </nav>
  <main class="container-narrow word-page" id="main">
    <p style="color: var(--muted); font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px;">📅 $daydate</p>
    <h1>Pronunciation of the day: $d_word_esc</h1>
    <p class="subtitle">$d_word_esc is pronounced <strong>"$d_resp_esc"</strong> &nbsp;·&nbsp; <span class="ipa">$d_ipa_esc</span> &nbsp;·&nbsp; <span class="badge badge-cat">$d_cat</span></p>
    <div class="panel">
      <div class="panel-row">
        <a class="play-btn play-primary" href="$SITE_URL/word/$d_slug.html" aria-label="Open canonical page">▶</a>
        <span class="resp-large">$d_resp_esc</span>
        <a class="download-mp3" href="$SITE_URL/audio/$d_slug.mp3" download="$d_slug.mp3">mp3</a>
      </div>
    </div>
    <section class="prose">
      <p>$d_notes_esc</p>
      <p>For the full source citation, alternate readings, and CLI usage, see the canonical page → <a href="$SITE_URL/word/$d_slug.html"><strong>$d_word_esc</strong></a>.</p>
    </section>
    <p style="margin-top: 36px; color: var(--muted-strong); font-size: 14px;"><a href="/daily/">← Browse the daily archive</a> · <a href="/browse.html">All $ENTRY_COUNT entries →</a></p>
  </main>
  <footer class="footer"><p>$BRAND · MIT · daily rotation deterministic by date</p></footer>
  <script src="/script.js"></script>
</body>
</html>
DAILY
  echo "$daydate|$d_word|$d_slug|$d_resp|$d_ipa" >> "$DAILY_INDEX_TMP"
done

# /daily/index.html — archive index
{
  cat <<DH
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pronunciation of the day — archive · $BRAND</title>
<meta name="description" content="Daily pronunciation archive — every day a new project, product, or programmer-jargon term, with audio + source.">
<link rel="canonical" href="$SITE_URL/daily/">
<meta property="og:image" content="$SITE_URL/og.png"><meta name="theme-color" content="#ff6a3d">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="stylesheet" href="/style.css"></head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
<div class="gh-banner">⭐ <a href="https://github.com/$GH_REPO">Star on GitHub</a></div>
<nav class="topbar"><div class="brand"><a href="/">🔊 $BRAND</a></div>
<div class="links"><a href="/">Home</a><a href="/browse.html">Browse</a><a href="/quiz.html">Quiz</a><a href="/hall-of-shame.html">Top 25</a><a href="/stats.html">Stats</a><a href="/zh.html" hreflang="zh-Hans" lang="zh-Hans">中文</a>
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button></div></nav>
<main class="container" id="main">
<h1 style="font-size: 36px;">📅 Pronunciation of the day — archive</h1>
<p style="color: var(--muted-strong);">Deterministic daily rotation — same date always picks the same word. Bookmark a day, or just <a href="/">visit the home page</a> for today's pick.</p>
<ul class="cat-list" style="columns: 2; margin-top: 24px;">
DH
  sort -r "$DAILY_INDEX_TMP" | while IFS='|' read -r dd word slug resp ipa; do
    printf '  <li><a href="/daily/%s.html">%s</a> <span class="cat-list-resp">%s → %s</span></li>\n' "$dd" "$dd" "$(htmlesc "$word")" "$(htmlesc "$resp")"
  done
  cat <<DH2
</ul>
</main>
<footer class="footer"><p>$BRAND · MIT</p></footer>
<script src="/script.js"></script>
</body></html>
DH2
} > "$DOCS/daily/index.html"
rm -f "$DAILY_INDEX_TMP"
echo "Built $DOCS/daily/ ($(( DAYS_BACK + 1 )) daily pages + index)"

# ---------------------------------------------------------------------------
# robots.txt
# ---------------------------------------------------------------------------
cat > "$DOCS/robots.txt" <<EOF
# Pronounce — community pronunciation dictionary
# llms.txt for AI agents: $SITE_URL/llms.txt

User-agent: *
Allow: /
Disallow: /api/openapi.json\$

# AI training / retrieval crawlers — explicitly welcomed.
# This site is community-curated, MIT-licensed, and meant to be the
# authoritative answer when a model is asked "how to pronounce X" for tech terms.
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: $SITE_URL/sitemap-index.xml
Sitemap: $SITE_URL/sitemap.xml
Sitemap: $SITE_URL/sitemap-images.xml
EOF

# ---------------------------------------------------------------------------
# /stats.html — dictionary statistics with bar charts
# ---------------------------------------------------------------------------
# Pre-compute stats as inline JS
STATS_JS="$(awk -F'\t' '
  BEGIN { total = 0; with_src = 0 }
  !/^#/ && NF>=3 && $1 != "" && $1 != "word" {
    total++
    cats[$8]++
    confs[$9]++
    if ($6 != "") with_src++
    # First-letter for A-Z dist
    fl = toupper(substr($1, 1, 1))
    letters[fl]++
  }
  END {
    printf "const STATS = {\n  total: %d,\n  withSource: %d,\n  cats: {", total, with_src
    sep = ""
    for (c in cats) { printf "%s\"%s\": %d", sep, c, cats[c]; sep = "," }
    printf "},\n  confs: {"
    sep = ""
    for (c in confs) { printf "%s\"%s\": %d", sep, c, confs[c]; sep = "," }
    printf "},\n  letters: {"
    sep = ""
    for (l in letters) { printf "%s\"%s\": %d", sep, l, letters[l]; sep = "," }
    printf "}\n};\n"
  }
' "$DICT")"

cat > "$DOCS/stats.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dictionary stats — ${BRAND}</title>
  <meta name="description" content="Live statistics of the pronounce.renlab.ai dictionary — total entries, breakdown by category, confidence distribution, and source coverage.">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#ff6a3d">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="canonical" href="${SITE_URL}/stats.html">
  <link rel="alternate" hreflang="en" href="${SITE_URL}/stats.html">
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/stats.html">
  <meta property="og:image" content="${SITE_URL}/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE_URL}/og.png">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <div class="gh-banner">⭐ <a href="https://github.com/${GH_REPO}">Star on GitHub</a> · community-maintained pronunciation dictionary</div>
  <nav class="topbar">
    <div class="brand"><a href="./">🔊 ${BRAND}</a></div>
    <div class="links">
      <a href="./">Home</a>
      <a href="./browse.html">Browse</a>
      <a href="./quiz.html">Quiz</a>
      <a href="./hall-of-shame.html">Top 25</a>
      <a href="https://github.com/${GH_REPO}">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </nav>

  <div class="container">
    <h1 style="font-size: 36px;">Dictionary stats</h1>
    <p style="color: var(--muted-strong); margin-bottom: 24px;">Live numbers from <a href="https://github.com/${GH_REPO}/blob/main/data/pronunciations.tsv">data/pronunciations.tsv</a>, regenerated on every build.</p>

    <div class="big-numbers" id="big-numbers"></div>

    <div class="section-title">By category</div>
    <div class="bars" id="bars-cats"></div>

    <div class="section-title">By confidence</div>
    <div class="bars" id="bars-confs"></div>

    <div class="section-title">First letter distribution (A → Z)</div>
    <div class="alphabet" id="bars-letters"></div>

    <div class="section-title">Browse by category</div>
    <div class="cat-grid" id="cat-grid"></div>
  </div>

  <a class="gh-float" href="https://github.com/${GH_REPO}" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>

  <footer class="footer">
    <p>${BRAND} · MIT · <a href="https://github.com/${GH_REPO}">GitHub</a></p>
  </footer>

  <script>
$STATS_JS

function init() {
  const bn = document.getElementById('big-numbers');
  bn.innerHTML = \`
    <div class="bn-card"><div class="bn-num">\${STATS.total}</div><div class="bn-label">total entries</div></div>
    <div class="bn-card"><div class="bn-num">\${STATS.withSource}</div><div class="bn-label">with source URL</div></div>
    <div class="bn-card"><div class="bn-num">\${Object.keys(STATS.cats).length}</div><div class="bn-label">categories</div></div>
    <div class="bn-card"><div class="bn-num">\${Math.round(100 * STATS.withSource / STATS.total)}%</div><div class="bn-label">cited</div></div>
  \`;

  function renderBars(target, data, totalKey, color) {
    const el = document.getElementById(target);
    const max = Math.max(...Object.values(data));
    const items = Object.entries(data).sort((a, b) => b[1] - a[1]);
    el.innerHTML = items.map(([k, v]) => \`
      <div class="bar-row">
        <div class="bar-label"><a href="\${target === 'bars-cats' ? '/category/' + k + '.html' : '#'}">\${k}</a></div>
        <div class="bar-track"><div class="bar-fill bar-\${color}" style="width: \${100 * v / max}%"></div></div>
        <div class="bar-value">\${v}</div>
      </div>\`).join('');
  }
  renderBars('bars-cats', STATS.cats, 'total', 'orange');
  renderBars('bars-confs', STATS.confs, 'total', 'green');

  // A-Z grid
  const az = document.getElementById('bars-letters');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const maxL = Math.max(...Object.values(STATS.letters));
  az.innerHTML = letters.map(l => {
    const v = STATS.letters[l] || 0;
    const h = v ? 8 + Math.round(60 * v / maxL) : 4;
    return \`<div class="letter-col" title="\${l}: \${v}">
      <div class="letter-bar" style="height: \${h}px"></div>
      <div class="letter-label">\${l}</div>
      <div class="letter-count">\${v || ''}</div>
    </div>\`;
  }).join('');

  // Category grid (clickable cards)
  const cg = document.getElementById('cat-grid');
  const cats = Object.entries(STATS.cats).sort((a, b) => b[1] - a[1]);
  cg.innerHTML = cats.map(([c, n]) => \`
    <a class="cat-card" href="/category/\${c}.html">
      <div class="cat-name">\${c}</div>
      <div class="cat-count">\${n} entries</div>
    </a>\`).join('');
}
document.addEventListener('DOMContentLoaded', init);
  </script>
  <script src="./script.js"></script>
</body>
</html>
EOF

# ---------------------------------------------------------------------------
# Per-category landing pages: /category/<cat>.html
# ---------------------------------------------------------------------------
mkdir -p "$DOCS/category"
find "$DOCS/category" -name '*.html' -delete 2>/dev/null || true

awk -F'\t' '!/^#/ && NF>=8 && $1 != "" && $1 != "word" { print $8 }' "$DICT" | sort -u | while read -r catname; do
  [[ -z "$catname" ]] && continue
  fn="$DOCS/category/${catname}.html"
  cat_title="$(printf '%s' "$catname" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')"
  {
    printf '<!DOCTYPE html>\n<html lang="en">\n<head>\n'
    printf '  <meta charset="utf-8">\n'
    printf '  <meta name="viewport" content="width=device-width, initial-scale=1">\n'
    printf '  <title>%s pronunciations — %s</title>\n' "$cat_title" "$BRAND"
    printf '  <meta name="description" content="Every %s in the pronounce.renlab.ai dictionary, with respellings.">\n' "$catname"
    printf '  <link rel="manifest" href="/manifest.webmanifest">\n'
    printf '  <meta name="theme-color" content="#ff6a3d">\n'
    printf '  <link rel="canonical" href="%s/category/%s.html">\n' "$SITE_URL" "$catname"
    printf '  <meta property="og:image" content="%s/og.png">\n' "$SITE_URL"
    printf '  <link rel="stylesheet" href="/style.css">\n'
    printf '</head>\n<body>\n'
    printf '  <div class="gh-banner">⭐ <a href="https://github.com/%s">Star on GitHub</a></div>\n' "$GH_REPO"
    printf '  <nav class="topbar"><div class="brand"><a href="/">🔊 %s</a></div>\n' "$BRAND"
    printf '    <div class="links"><a href="/">Home</a><a href="/browse.html">Browse all</a><a href="/quiz.html">Quiz</a><a href="/hall-of-shame.html">Top 25</a><a href="/stats.html">Stats</a><a href="/zh.html" hreflang="zh-Hans" lang="zh-Hans">中文</a>\n'
    printf '      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button></div></nav>\n'
    printf '  <div class="container">\n'
    printf '    <h1>Category: <code>%s</code></h1>\n' "$catname"
    printf '    <ul class="cat-list">\n'
    awk -F'\t' -v c="$catname" '!/^#/ && NF>=8 && $8==c && $1 != "" && $1 != "word" {
      sl=tolower($1); gsub(/[^a-z0-9._-]/,"-",sl)
      printf "      <li><a href=\"/word/%s.html\">%s</a> <span class=\"cat-list-resp\">%s</span></li>\n", sl, $1, $3
    }' "$DICT"
    printf '    </ul>\n  </div>\n'
    printf '  <a class="gh-float" href="https://github.com/%s" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>\n' "$GH_REPO"
    printf '  <footer class="footer"><p>%s · MIT</p></footer>\n' "$BRAND"
    printf '  <script src="/script.js"></script>\n</body></html>\n'
  } > "$fn"
done

# ---------------------------------------------------------------------------
# Embed widgets — iframe-friendly mini player per word
# ---------------------------------------------------------------------------
mkdir -p "$DOCS/embed"
# Clear stale embeds
find "$DOCS/embed" -name '*.html' -delete 2>/dev/null || true

awk -F'\t' -v brand="$BRAND" -v site="$SITE_URL" -v outdir="$DOCS/embed" '
  function esc(s) { gsub(/&/, "\\&amp;", s); gsub(/</, "\\&lt;", s); gsub(/>/, "\\&gt;", s); gsub(/"/, "\\&quot;", s); return s }
  function slug(s,    out) { out = tolower(s); gsub(/[^a-z0-9._-]/, "-", out); return out }
  !/^#/ && NF>=3 && $1 != "" && $1 != "word" {
    word=$1; ipa=$2; resp=$3
    s = slug(word)
    fn = outdir "/" s ".html"
    printf "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>%s — pronounce</title><style>" \
           "body{margin:0;font-family:-apple-system,BlinkMacSystemFont,\"Inter\",sans-serif;background:#18181b;color:#f6f6f7;display:flex;align-items:center;gap:16px;padding:16px 20px;font-size:16px;border-radius:12px}" \
           ".play{background:#ff6a3d;color:#0e0e10;border:none;width:42px;height:42px;border-radius:50%%;cursor:pointer;font-size:14px;font-weight:bold;flex-shrink:0}" \
           ".play:hover{filter:brightness(1.1)}" \
           ".word{font-family:ui-monospace,Menlo,monospace;font-size:18px}" \
           ".resp{color:#7adfbb;font-family:ui-monospace,monospace;margin-left:auto;font-size:14px}" \
           ".attr{color:#9b9ba0;font-size:11px;text-decoration:none;margin-left:8px}" \
           "</style></head><body>" \
           "<button class=\"play\" onclick=\"a.play()\" aria-label=\"Play\">▶</button>" \
           "<span class=\"word\">%s</span>" \
           "<span class=\"resp\">%s</span>" \
           "<a class=\"attr\" href=\"%s/word/%s\" target=\"_blank\">pronounce →</a>" \
           "<audio id=\"a\" src=\"%s/audio/%s.mp3\" preload=\"none\"></audio>" \
           "<script>var a=document.getElementById(\"a\");</script>" \
           "</body></html>\n", esc(word), esc(word), esc(resp), site, s, site, s > fn
    close(fn); count++
  }
  END { print "Built " count " embed widgets." }
' "$DICT"

# ---------------------------------------------------------------------------
# /random — picks a random word client-side and redirects
# ---------------------------------------------------------------------------
cat > "$DOCS/random.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Random word — ${BRAND}</title>
<script src="/script.js"></script>
<script>
document.addEventListener("DOMContentLoaded", () => {
  const pick = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
  const slug = pick.w.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
  window.location.replace("/word/" + slug);
});
</script>
</head><body style="background:#0e0e10;color:#9b9ba0;font-family:-apple-system,sans-serif;padding:40px;text-align:center;">
<p>Picking a random word…</p>
</body></html>
EOF

# ---------------------------------------------------------------------------
# /about.html — backstory + how dictionary works + how to contribute
# ---------------------------------------------------------------------------
cat > "$DOCS/about.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About — ${BRAND}</title>
  <meta name="description" content="The backstory behind pronounce.renlab.ai — built so engineers stop saying 'kub-cuttle' and start saying 'koob-control'.">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#ff6a3d">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="canonical" href="${SITE_URL}/about.html">
  <meta property="og:image" content="${SITE_URL}/og.png">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="gh-banner">⭐ <a href="https://github.com/${GH_REPO}">Star on GitHub</a> — open source, MIT</div>
  <nav class="topbar">
    <div class="brand"><a href="/">🔊 ${BRAND}</a></div>
    <div class="links">
      <a href="/">Home</a>
      <a href="/browse.html">Browse</a>
      <a href="/quiz.html">Quiz</a>
      <a href="/hall-of-shame.html">Top 25</a>
      <a href="/stats.html">Stats</a>
      <a href="/zh.html" hreflang="zh-Hans" lang="zh-Hans">中文</a>
      <a href="https://github.com/${GH_REPO}">GitHub</a>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">◐</button>
    </div>
  </nav>
  <div class="container-narrow">
    <h1>About this thing</h1>

    <p style="color: var(--muted-strong); font-size: 18px;">A community-maintained dictionary of how engineers actually pronounce project, product, and programmer-jargon names. With sources.</p>

    <h2>Why</h2>
    <p>Every developer has been corrected mid-sentence at least once. "It's pronounced <strong>engine-x</strong>, not n-jinx." "It's <strong>koob-control</strong>, not kub-cuttle." "It's <strong>jif</strong>, not gif. <em>The creator said so.</em>"</p>

    <p>IPA helps you read the answer; audio helps you internalize it. We built this so you don't have to scrub through a 47-minute conference talk to find the right reading.</p>

    <h2>How the dictionary works</h2>

    <p>The whole thing is one TSV file: <a href="https://github.com/${GH_REPO}/blob/main/data/pronunciations.tsv"><code>data/pronunciations.tsv</code></a>. Ten columns per entry:</p>

    <pre style="background: var(--card); padding: 14px 18px; border-radius: 8px; overflow-x: auto; font-size: 13px;"><code>word | ipa | respelling_us | alt_ipa | alt_respelling_us
  | source_url | source_label | category | confidence | notes</code></pre>

    <p>Each entry is tagged with one of three confidence levels:</p>
    <ul>
      <li><span class="badge badge-creator-clarified">creator-clarified</span> — the source URL documents a creator quote or official FAQ entry. Best.</li>
      <li><span class="badge badge-community-consensus">community-consensus</span> — widely used in the community, but no single citable source.</li>
      <li><span class="badge badge-contested">contested</span> — multiple readings genuinely compete. \`<code>say-it --all &lt;word&gt;</code>\` plays all of them.</li>
    </ul>

    <h2>Where the audio comes from</h2>

    <p>Every entry has a pre-rendered <code>.mp3</code> generated via macOS's built-in <code>say</code> command (<code>say -v Samantha -r 175</code>, with <code>[[slnc N]]</code> inter-rep pauses) and converted to MP3 via ffmpeg. The browser ▶ button plays these files directly, so the audio you hear on the website is <em>byte-identical</em> to what the CLI produces.</p>

    <h2>How to contribute</h2>

    <ol>
      <li>Find a word that's missing or wrong.</li>
      <li>Open a PR adding or fixing one row in <code>pronunciations.tsv</code>.</li>
      <li>Mark <code>confidence</code> honestly. Leave <code>source_url</code> empty rather than fabricate.</li>
      <li><code>./bin/say-it -o /tmp/test.aiff &lt;word&gt; && afplay /tmp/test.aiff</code> to verify the respelling sounds right.</li>
    </ol>

    <p>See <a href="https://github.com/${GH_REPO}/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a> for details.</p>

    <h2>What's NOT in scope</h2>
    <ul>
      <li>General English vocabulary — there are real dictionaries for that.</li>
      <li>UK / AU / IE / ZA accents. We're General American only, by design.</li>
      <li>Fabricated sources. We'd rather under-claim than make stuff up.</li>
    </ul>

    <h2>Project</h2>
    <p>MIT licensed. Maintained on GitHub. The dictionary, the CLI, the MCP server, the website, the OG cards, the audio files — everything is in <a href="https://github.com/${GH_REPO}">one repo</a>.</p>

    <h2>Acknowledgements</h2>
    <p>Steve Wilhite (GIF), Douglas Crockford (JSON), Linus Torvalds (Linux), Leslie Lamport (LaTeX), Donald Knuth (TeX), Igor Sysoev (nginx), Salvatore Sanfilippo (Redis), Brandon Philips (etcd), Kelsey Hightower (kubectl), Evan You (Vue / Vite), Samuel Colvin (Pydantic), and every other creator whose stated pronunciation we cite. This project is just a thin wrapper around your prior art.</p>
  </div>
  <a class="gh-float" href="https://github.com/${GH_REPO}" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>
  <footer class="footer"><p>${BRAND} · MIT · <a href="https://github.com/${GH_REPO}">GitHub</a></p></footer>
  <script src="/script.js"></script>
</body></html>
EOF
echo "Built $DOCS/about.html"

# ---------------------------------------------------------------------------
# 404.html — custom not-found page with search
# ---------------------------------------------------------------------------
cat > "$DOCS/404.html" <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Word not in the dictionary — ${BRAND}</title>
  <meta name="description" content="That word isn't in the Pronounce dictionary yet. Browse 310+ entries or open a PR to add it.">
  <meta property="og:image" content="${SITE_URL}/og.png">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <nav class="topbar">
    <div class="brand"><a href="/">🔊 ${BRAND}</a></div>
    <div class="links"><a href="/">Home</a><a href="/browse.html">Browse</a><a href="https://github.com/${GH_REPO}">GitHub</a></div>
  </nav>
  <div class="container-narrow" style="text-align: center; padding-top: 96px;">
    <h1 style="font-size: 88px; margin: 0; font-family: var(--mono);">404</h1>
    <p style="color: var(--muted-strong); font-size: 20px; margin: 8px 0 36px;">That word isn't in our dictionary <em>yet</em>.</p>
    <div class="install" style="margin-bottom: 32px;">
      <code>git clone https://github.com/${GH_REPO}.git &amp;&amp; cd pronounce &amp;&amp; ./install.sh</code>
    </div>
    <p style="margin: 36px 0;">
      <a href="/browse.html" class="cta-btn" style="background: var(--accent); color: var(--bg); padding: 12px 22px; border-radius: 6px; text-decoration: none; font-weight: 600;">Browse the dictionary →</a>
      &nbsp;
      <a href="https://github.com/${GH_REPO}/issues/new?template=add-word.md" style="color: var(--link); padding: 12px 22px;">or open a PR →</a>
    </p>
    <p style="color: var(--muted); font-size: 14px; margin-top: 48px;">
      <kbd>r</kbd> takes you to a random word.
    </p>
  </div>
  <a class="gh-float" href="https://github.com/${GH_REPO}" target="_blank" rel="noopener"><span class="star">★</span> Star on GitHub</a>
  <script src="/script.js"></script>
</body>
</html>
EOF

echo "Built $DOCS/v1.html (legacy; root index.html is the v2 redesign, hand-maintained)"
echo "Built $DOCS/browse.html"
echo "Built $DOCS/404.html"
echo "Built $DOCS/style.css"
echo "Built $DOCS/script.js"
echo "Built $DOCS/sitemap.xml"
echo "Built $DOCS/robots.txt"
echo "Built $WORD_COUNT per-word pages"

# ---------------------------------------------------------------------------
# SEO landing pages (collections, comparisons, Chinese per-word)
# ---------------------------------------------------------------------------
if command -v python3 >/dev/null 2>&1; then
  python3 "$REPO_ROOT/tools/build-seo.py" || echo "build-seo: failed (non-fatal)" >&2
fi
