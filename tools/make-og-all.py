#!/usr/bin/env python3
"""Generate one Open Graph card PER dict entry.

Each /word/<slug> page gets its OWN 1200×630 social card baked with the
word, IPA, respelling, and alternates. When a Twitter/Slack/LinkedIn user
shares a word page URL, they see a unique custom card — not the same
generic image as every other word.

Writes:
  docs/og/<slug>.png  (one file per dict entry)

Run from repo root: `python3 tools/make-og-all.py`
"""
from __future__ import annotations
import csv
import pathlib
import re
import sys
from PIL import Image, ImageDraw, ImageFont

REPO = pathlib.Path(__file__).resolve().parent.parent
DICT = REPO / "data" / "pronunciations.tsv"
OUT_DIR = REPO / "docs" / "og"
OUT_DIR.mkdir(parents=True, exist_ok=True)

W, H = 1200, 630
BG = (14, 14, 16)
CARD = (24, 24, 27)
BORDER = (42, 42, 48)
FG = (246, 246, 247)
MUTED = (155, 155, 160)
MUTED_STRONG = (196, 196, 202)
ACCENT = (255, 106, 61)
ACCENT_2 = (122, 223, 187)
LINK = (122, 184, 255)

def try_font(*candidates, size=40):
    for c in candidates:
        try: return ImageFont.truetype(c, size)
        except Exception: pass
    return ImageFont.load_default()

SFNS = "/System/Library/Fonts/SFNS.ttf"
SFNS_MONO = "/System/Library/Fonts/SFNSMono.ttf"
MENLO = "/System/Library/Fonts/Menlo.ttc"

font_brand = try_font(SFNS, "/System/Library/Fonts/Helvetica.ttc", size=24)
font_word_huge = try_font(SFNS_MONO, MENLO, size=92)
font_word_big = try_font(SFNS_MONO, MENLO, size=72)
font_word_med = try_font(SFNS_MONO, MENLO, size=52)
font_respelling = try_font(SFNS_MONO, MENLO, size=56)
font_ipa = try_font(SFNS_MONO, MENLO, size=28)
font_label = try_font(SFNS, "/System/Library/Fonts/Helvetica.ttc", size=22)
font_footer = try_font(SFNS, "/System/Library/Fonts/Helvetica.ttc", size=24)
font_alt = try_font(SFNS_MONO, MENLO, size=36)

def slugify(word: str) -> str:
    return re.sub(r"[^a-z0-9._-]+", "-", word.lower())

def fit_font_for_word(word: str, draw: ImageDraw.ImageDraw, max_w: int) -> ImageFont.ImageFont:
    for f in (font_word_huge, font_word_big, font_word_med):
        bbox = draw.textbbox((0, 0), word, font=f)
        if (bbox[2] - bbox[0]) <= max_w:
            return f
    return font_word_med

def render(entry: dict) -> None:
    word = entry["word"]
    ipa = entry.get("ipa", "")
    resp = entry.get("respelling_us", "")
    alt_resp = entry.get("alt_respelling_us", "") or ""
    src_label = entry.get("source_label", "") or ""
    confidence = entry.get("confidence", "") or ""
    category = entry.get("category", "") or ""

    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Top accent stripe
    for y in range(8):
        r = int(255 * (1 - y / 8 * 0.4))
        g = int(106 * (1 - y / 8 * 0.4))
        b = int(61 * (1 - y / 8 * 0.4))
        d.line([(0, y), (W, y)], fill=(r, g, b))

    # Brand row
    d.text((60, 48), "🔊  pronounce.renlab.ai", font=font_brand, fill=ACCENT_2)

    # "How to pronounce" label
    d.text((60, 100), "How to pronounce", font=font_label, fill=MUTED_STRONG)

    # The word — huge mono font, auto-sized
    f_word = fit_font_for_word(word, d, W - 120)
    d.text((60, 130), word, font=f_word, fill=FG)

    # Respelling — orange, big
    bbox_word = d.textbbox((60, 130), word, font=f_word)
    y_after_word = bbox_word[3] + 24

    if resp:
        d.text((60, y_after_word), resp, font=font_respelling, fill=ACCENT)
        y_after = y_after_word + font_respelling.size + 16
    else:
        y_after = y_after_word + 16

    # IPA
    if ipa:
        d.text((60, y_after), ipa, font=font_ipa, fill=MUTED)
        y_after += font_ipa.size + 20

    # Alternates if present (top 2)
    if alt_resp:
        alts = [a for a in alt_resp.split("|") if a]
        if alts:
            alt_text = "or: " + ",  ".join(alts[:2])
            if len(alts) > 2:
                alt_text += "  (+more)"
            d.text((60, y_after), alt_text, font=font_alt, fill=ACCENT_2)
            y_after += font_alt.size + 24

    # Footer: source citation if available
    footer_y = H - 80
    if src_label:
        d.text((60, footer_y), f"📎 {src_label}", font=font_footer, fill=MUTED_STRONG)
    else:
        d.text((60, footer_y), f"  ⌘ {category} · {confidence}", font=font_footer, fill=MUTED)

    img.save(OUT_DIR / f"{slugify(word)}.png", "PNG", optimize=True)

def main() -> None:
    count = 0
    with DICT.open() as f:
        for raw in f:
            if raw.startswith("#") or not raw.strip(): continue
            cols = raw.rstrip("\n").split("\t")
            if len(cols) < 3 or cols[0] in ("", "word"): continue
            keys = ["word", "ipa", "respelling_us", "alt_ipa", "alt_respelling_us",
                    "source_url", "source_label", "category", "confidence", "notes"]
            entry = {k: (cols[i] if i < len(cols) else "") for i, k in enumerate(keys)}
            render(entry)
            count += 1
            if count % 50 == 0:
                print(f"  ... {count} cards rendered", flush=True)
    print(f"Wrote {count} OG cards to {OUT_DIR}")

if __name__ == "__main__":
    main()
