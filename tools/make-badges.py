#!/usr/bin/env python3
"""Pre-generate shields-style pronunciation badges: docs/badge/<slug>.svg.

One static SVG per dictionary word, so third-party READMEs can embed
    [![nginx](https://pronounce.renlab.ai/badge/nginx.svg)](https://pronounce.renlab.ai/word/nginx)
with zero runtime service — same zero-dependency rule as the rest of the
site build. Stdlib only. Idempotent: rewrites every badge each run (cheap,
~1 KB per file) so style changes propagate.

Badge: [🔊 <word> | <respelling>] — right side color carries the
confidence level, matching the site's badge palette.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DICT = REPO / "data" / "pronunciations.tsv"
OUT_DIR = REPO / "docs" / "badge"

CONF_COLOR = {
    "creator-clarified": "#0e7a8a",     # teal — the creator said it
    "community-consensus": "#2f9e44",   # green — everyone agrees
    "contested": "#e8a10c",             # amber — people still argue
}
DEFAULT_COLOR = "#555555"

# Rough Verdana-ish advance widths (px at 11px) — good enough to size the
# rect; text is centered by the browser's textAnchor anyway.
def text_width(s: str) -> int:
    w = 0
    for ch in s:
        if ch in "iljt.,:;'|!":      w += 4
        elif ch in "mwMW@":          w += 10
        elif ch.isupper() or ch.isdigit(): w += 7
        elif ch == " ":              w += 4
        else:                        w += 6
    return w


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def slugify(word: str) -> str:
    return re.sub(r"[^a-z0-9._-]", "-", word.lower())


def badge_svg(word: str, resp: str, conf: str) -> str:
    left = f"\U0001f50a {word}"          # 🔊 + word
    right = resp or "—"
    color = CONF_COLOR.get(conf, DEFAULT_COLOR)
    lw, rw = text_width(left) + 12, text_width(right) + 12
    total = lw + rw
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{total}" height="20" role="img" aria-label="{esc(word)}: {esc(right)}">
  <title>{esc(word)} — pronounced {esc(right)}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r"><rect width="{total}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="{lw}" height="20" fill="#343a40"/>
    <rect x="{lw}" width="{rw}" height="20" fill="{color}"/>
    <rect width="{total}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">
    <text x="{lw // 2}" y="14">{esc(left)}</text>
    <text x="{lw + rw // 2}" y="14">{esc(right)}</text>
  </g>
</svg>
"""


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    n = 0
    for raw in DICT.read_text(encoding="utf-8").splitlines():
        if not raw or raw.startswith("#"):
            continue
        cells = raw.split("\t")
        if len(cells) < 10 or cells[0] == "word" or not cells[0].strip():
            continue
        word, resp, conf = cells[0], cells[2], cells[8]
        svg = badge_svg(word, resp, conf)
        (OUT_DIR / f"{slugify(word)}.svg").write_text(svg, encoding="utf-8")
        n += 1
    print(f"  → wrote {n} pronunciation badges to docs/badge/")


if __name__ == "__main__":
    sys.exit(main())
