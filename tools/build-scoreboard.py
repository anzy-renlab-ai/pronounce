#!/usr/bin/env python3
"""Build docs/scoreboard.html — "The developer pronunciation scoreboard".

The launch object: the contested-vs-creator-settled debates, with receipts,
audio, and copy-the-debate share text. Self-contained page (own CSS, brand
fonts) so it doesn't couple to the v2 stylesheet internals. Reads the same
data/pronunciations.tsv as the rest of the site.
"""
import os
import re
import html
import json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DICT = os.path.join(ROOT, "data", "pronunciations.tsv")
OUT = os.path.join(ROOT, "docs", "scoreboard.html")
SITE = "https://pronounce.renlab.ai"
GH = "anzy-renlab-ai/pronounce"

COLS = ["word", "ipa", "respelling_us", "alt_ipa", "alt_respelling_us",
        "source_url", "source_label", "category", "confidence", "notes"]

# Marquee fights surface first — the ones that reliably start standup arguments.
CONTESTED_STARS = ["kubectl", "SQL", "JSON", "GUI", "JWT", "GIF", "char",
                   "regex", "sudo", "cron", "nginx", "Qdrant", "Dvorak"]
SETTLED_STARS = ["GIF", "nginx", "YAML", "GNU", "LaTeX", "TOML", "Tcl", "awk"]


def slug(w):
    return re.sub(r"[^a-z0-9._-]", "-", w.lower())


def load():
    rows = []
    with open(DICT, encoding="utf-8") as f:
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            cells = line.rstrip("\n").split("\t")
            if len(cells) < 3 or cells[0] == "word":
                continue
            cells += [""] * (len(COLS) - len(cells))
            rows.append(dict(zip(COLS, cells)))
    return rows


# Keep the page a tight, screenshot-able launch object — not a full dump.
# The complete lists live at /hall-of-shame, /receipts, and /browse.
MAX_CONTESTED = 24
MAX_SETTLED = 16


def order(rows, stars, cap=None):
    pri = {w.lower(): i for i, w in enumerate(stars)}
    ranked = sorted(rows, key=lambda r: (pri.get(r["word"].lower(), 9999),
                                         r["word"].lower()))
    return ranked[:cap] if cap else ranked


def esc(s):
    return html.escape(s or "", quote=True)


def contested_card(r):
    w = r["word"]
    sg = slug(w)
    camp_a = r["respelling_us"] or r["ipa"]
    camp_b = r["alt_respelling_us"] or r["alt_ipa"]
    src = ""
    if r["source_url"]:
        src = (f'<a class="src" href="{esc(r["source_url"])}" target="_blank" '
               f'rel="noopener">{esc(r["source_label"] or "source")}</a>')
    # share line copied by the "copy debate" button
    if camp_b:
        share = f'How do you say "{w}"? Camp A: {camp_a}. Camp B: {camp_b}. The dict plays both → {SITE}/word/{sg}'
        camps = (f'<span class="camp camp-a">{esc(camp_a)}</span>'
                 f'<span class="vs">vs</span>'
                 f'<span class="camp camp-b">{esc(camp_b)}</span>')
    else:
        share = f'How do you say "{w}"? Devs still argue. → {SITE}/word/{sg}'
        camps = f'<span class="camp camp-a">{esc(camp_a)}</span><span class="camp-note">+ contested</span>'
    return f'''      <article class="card contested">
        <div class="card-head">
          <a class="word" href="/word/{sg}">{esc(w)}</a>
          <button class="play" data-audio="/audio/{sg}.mp3" aria-label="hear {esc(w)}">▶</button>
        </div>
        <div class="camps">{camps}</div>
        <div class="card-foot">{src}
          <button class="copy" data-share="{esc(share)}">copy debate</button>
        </div>
      </article>'''


def settled_card(r):
    w = r["word"]
    sg = slug(w)
    reading = r["respelling_us"] or r["ipa"]
    src = ""
    if r["source_url"]:
        src = (f'<a class="src" href="{esc(r["source_url"])}" target="_blank" '
               f'rel="noopener">{esc(r["source_label"] or "the receipt")}</a>')
    return f'''      <article class="card settled">
        <div class="card-head">
          <a class="word" href="/word/{sg}">{esc(w)}</a>
          <button class="play" data-audio="/audio/{sg}.mp3" aria-label="hear {esc(w)}">▶</button>
        </div>
        <div class="reading">{esc(reading)}</div>
        <div class="card-foot">{src}</div>
      </article>'''


def build():
    rows = load()
    contested = [r for r in rows if r["confidence"] == "contested"]
    settled = [r for r in rows if r["confidence"] == "creator-clarified"]
    n_con, n_set = len(contested), len(settled)
    n_total = len(rows)

    contested_html = "\n".join(contested_card(r) for r in order(contested, CONTESTED_STARS, MAX_CONTESTED))
    settled_html = "\n".join(settled_card(r) for r in order(settled, SETTLED_STARS, MAX_SETTLED))
    more_contested = max(0, n_con - MAX_CONTESTED)
    more_settled = max(0, n_set - MAX_SETTLED)

    title = "The developer pronunciation scoreboard — kubectl, GIF, JWT & the fights that won't die"
    desc = (f"{n_con} developer words engineers still argue about, {n_set} the creators "
            f"already settled — with cited receipts and audio. kubectl, SQL, JSON, GIF, JWT, and more.")
    jsonld = {
        "@context": "https://schema.org", "@type": "CollectionPage",
        "name": "The developer pronunciation scoreboard",
        "description": desc, "url": f"{SITE}/scoreboard",
        "isPartOf": {"@type": "WebSite", "name": "Pronounce", "url": f"{SITE}/"},
        "about": {"@type": "DefinedTermSet", "@id": f"{SITE}/#dictionary"},
    }

    page = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="keywords" content="how to pronounce kubectl, kubectl pronunciation debate, GIF jif, JWT jot, SQL sequel, developer pronunciation">
<link rel="canonical" href="{SITE}/scoreboard">
<meta property="og:title" content="The developer pronunciation scoreboard">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="{SITE}/scoreboard">
<meta property="og:image" content="{SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="The developer pronunciation scoreboard">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{SITE}/og.png">
<meta name="theme-color" content="#14100c">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>
<style>
:root {{ --bg:#14100c; --panel:#1d1812; --ink:#f3ece1; --dim:#b3a892;
  --accent:#ff6a3d; --accent2:#8fd694; --line:rgba(243,236,225,.10); }}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:var(--bg); color:var(--ink);
  font-family:"JetBrains Mono",ui-monospace,monospace; line-height:1.5; }}
a {{ color:inherit; }}
.wrap {{ max-width:1080px; margin:0 auto; padding:0 20px; }}
header.top {{ display:flex; justify-content:space-between; align-items:center;
  padding:18px 0; border-bottom:1px solid var(--line); }}
header.top a.home {{ font-family:"Fraunces",serif; font-weight:600; font-size:20px; text-decoration:none; }}
header.top a.home b {{ color:var(--accent2); }}
header.top nav a {{ color:var(--dim); text-decoration:none; margin-left:18px; font-size:14px; }}
header.top nav a:hover {{ color:var(--ink); }}
.hero {{ padding:56px 0 28px; text-align:center; }}
.hero h1 {{ font-family:"Fraunces",serif; font-weight:600; font-size:clamp(30px,5vw,52px);
  line-height:1.08; margin:0 0 16px; }}
.hero h1 .fight {{ color:var(--accent); }}
.hero h1 .settled {{ color:var(--accent2); }}
.hero p {{ color:var(--dim); font-size:17px; max-width:680px; margin:0 auto 24px; }}
.tally {{ display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:8px; }}
.tally .stat {{ background:var(--panel); border:1px solid var(--line); border-radius:12px;
  padding:14px 22px; min-width:120px; }}
.tally .num {{ font-size:30px; font-weight:700; font-family:"Fraunces",serif; }}
.tally .num.fight {{ color:var(--accent); }}
.tally .num.settled {{ color:var(--accent2); }}
.tally .lbl {{ color:var(--dim); font-size:13px; }}
.cta {{ margin:26px 0 8px; }}
.cta a {{ display:inline-block; background:var(--accent2); color:#0c1a10; font-weight:700;
  text-decoration:none; padding:12px 22px; border-radius:10px; }}
.cta a.ghost {{ background:transparent; color:var(--ink); border:1px solid var(--line); margin-left:10px; }}
section.board {{ padding:30px 0; }}
section.board h2 {{ font-family:"Fraunces",serif; font-weight:600; font-size:26px;
  margin:0 0 4px; }}
section.board h2 .fight {{ color:var(--accent); }}
section.board h2 .settled {{ color:var(--accent2); }}
section.board .sub {{ color:var(--dim); margin:0 0 20px; font-size:14px; }}
.grid {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:14px; }}
.card {{ background:var(--panel); border:1px solid var(--line); border-radius:14px;
  padding:16px 16px 12px; }}
.card.contested {{ border-left:3px solid var(--accent); }}
.card.settled {{ border-left:3px solid var(--accent2); }}
.card-head {{ display:flex; justify-content:space-between; align-items:center; gap:8px; }}
.card .word {{ font-size:21px; font-weight:700; text-decoration:none; }}
.card .word:hover {{ text-decoration:underline; }}
.play {{ background:none; border:1px solid var(--line); color:var(--ink); border-radius:8px;
  width:34px; height:34px; cursor:pointer; font-size:13px; flex:none; }}
.play:hover {{ border-color:var(--accent2); color:var(--accent2); }}
.camps {{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin:12px 0 10px; }}
.camp {{ font-weight:500; padding:4px 9px; border-radius:7px; font-size:14px; }}
.camp-a {{ background:rgba(255,106,61,.14); color:#ffb59b; }}
.camp-b {{ background:rgba(143,214,148,.14); color:var(--accent2); }}
.vs {{ color:var(--dim); font-size:12px; }}
.camp-note {{ color:var(--dim); font-size:12px; }}
.reading {{ margin:12px 0 10px; font-size:16px; color:var(--accent2); }}
.more {{ margin:18px 0 0; }}
.more a {{ color:var(--accent2); text-decoration:none; font-size:14px; }}
.more a:hover {{ text-decoration:underline; }}
.card-foot {{ display:flex; justify-content:space-between; align-items:center; gap:8px;
  border-top:1px solid var(--line); padding-top:9px; }}
.src {{ color:var(--dim); font-size:12px; text-decoration:none; max-width:60%;
  overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }}
.src:hover {{ color:var(--ink); }}
.copy {{ background:none; border:1px solid var(--line); color:var(--dim); border-radius:7px;
  padding:5px 9px; cursor:pointer; font-size:12px; flex:none; }}
.copy:hover {{ border-color:var(--accent2); color:var(--accent2); }}
.copy.done {{ color:var(--accent2); border-color:var(--accent2); }}
footer.bottom {{ border-top:1px solid var(--line); padding:30px 0 50px; color:var(--dim);
  font-size:14px; text-align:center; }}
footer.bottom a {{ color:var(--accent2); text-decoration:none; }}
</style>
</head>
<body>
<header class="top"><div class="wrap" style="display:flex;justify-content:space-between;align-items:center;width:100%">
  <a class="home" href="/">Pro<b>nounce</b></a>
  <nav><a href="/hall-of-shame">Hall of shame</a><a href="/receipts">Receipts</a><a href="/quiz">Quiz</a><a href="/browse">Browse all</a><a href="https://github.com/{GH}">GitHub ★</a></nav>
</div></header>

<main class="wrap">
  <div class="hero">
    <h1>The developer pronunciation <span class="fight">scoreboard</span></h1>
    <p>Of {n_total} terms, <strong>{n_con}</strong> are still argued about and <strong>{n_set}</strong> were settled by the people who made them. Both readings, the receipts, and the audio — so you can stop fighting on standup (or fight better).</p>
    <div class="tally">
      <div class="stat"><div class="num fight">{n_con}</div><div class="lbl">still contested</div></div>
      <div class="stat"><div class="num settled">{n_set}</div><div class="lbl">creator-settled</div></div>
      <div class="stat"><div class="num">{n_total}</div><div class="lbl">total terms</div></div>
    </div>
    <div class="cta">
      <a href="https://github.com/{GH}">★ Star on GitHub</a>
      <a class="ghost" href="/browse">Browse the full dictionary</a>
    </div>
  </div>

  <section class="board">
    <h2>Still <span class="fight">contested</span> — pick your camp</h2>
    <p class="sub">Both readings are alive. The dictionary records both and plays them back to back. Tap ▶ to hear the primary, "copy debate" to settle it in your team chat.</p>
    <div class="grid">
{contested_html}
    </div>
    <p class="more"><a href="/hall-of-shame">+ {more_contested} more contested → the hall of shame</a></p>
  </section>

  <section class="board">
    <h2>Already <span class="settled">settled</span> — the creator said so</h2>
    <p class="sub">No more arguing. The person who made the thing put it on the record. Here's the receipt.</p>
    <div class="grid">
{settled_html}
    </div>
    <p class="more"><a href="/receipts">+ {more_settled} more settled, with citations → the receipts</a></p>
  </section>
</main>

<footer class="bottom">
  <p><strong>Pronounce</strong> — a community dictionary of how engineers actually say developer jargon. MIT, zero deps.<br>
  Found one we got wrong, or a third reading? <a href="https://github.com/{GH}/issues/1">Open a one-line PR</a> · <a href="https://github.com/{GH}">★ the repo</a></p>
</footer>

<script>
document.addEventListener('click', function(e) {{
  var p = e.target.closest('.play');
  if (p) {{ try {{ new Audio(p.dataset.audio).play(); }} catch (_) {{}} return; }}
  var c = e.target.closest('.copy');
  if (c) {{
    navigator.clipboard.writeText(c.dataset.share).then(function() {{
      var t = c.textContent; c.textContent = 'copied ✓'; c.classList.add('done');
      setTimeout(function() {{ c.textContent = t; c.classList.remove('done'); }}, 1600);
    }});
  }}
}});
</script>
</body>
</html>
'''
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(page)
    print(f"wrote {OUT}: {n_con} contested + {n_set} settled cards ({n_total} total)")


if __name__ == "__main__":
    build()
