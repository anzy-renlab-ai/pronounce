#!/usr/bin/env python3
"""Generate the Open Graph card (1200x630 PNG) for pronounce.renlab.ai.

Writes docs/og.png. Run from repo root: `python3 tools/make-og.py`.
"""
from PIL import Image, ImageDraw, ImageFont
import pathlib

REPO = pathlib.Path(__file__).resolve().parent.parent
OUT = REPO / "docs" / "og.png"
DICT = REPO / "data" / "pronunciations.tsv"

def entry_count() -> int:
    n = 0
    with open(DICT) as f:
        for line in f:
            if line.startswith("#"):
                continue
            cols = line.rstrip("\n").split("\t")
            if len(cols) >= 3 and cols[0] and cols[0] != "word":
                n += 1
    return n

ENTRIES = entry_count()
OTHERS = ENTRIES - 1  # subtract the "Gemini 4 Neon" headline name
LEAD = "Gemini 4 Neon"   # the name the card leads with; the owner wants the new model names first

W, H = 1200, 630

# Palette (matches docs/style.css)
BG = (14, 14, 16)
CARD = (24, 24, 27)
BORDER = (42, 42, 48)
FG = (246, 246, 247)
MUTED = (155, 155, 160)
MUTED_STRONG = (196, 196, 202)
ACCENT = (255, 106, 61)
ACCENT_2 = (122, 223, 187)
LINK = (122, 184, 255)

# Fonts — bundle with macOS
def f(path, size):
    return ImageFont.truetype(path, size)

SF = "/System/Library/Fonts/SFNS.ttf"          # SF Pro
SFB = "/System/Library/Fonts/SFNS.ttf"         # SF Pro (bold weight via SF variable)
MONO = "/System/Library/Fonts/SFNSMono.ttf"

# Fallback finder if SFNS.ttf doesn't exist (depends on macOS version)
def try_font(*candidates, size=40):
    for c in candidates:
        try:
            return ImageFont.truetype(c, size)
        except Exception:
            continue
    return ImageFont.load_default()

font_title = try_font(
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    size=72,
)
font_subtitle = try_font(
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    size=32,
)
font_brand = try_font(
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    size=24,
)
font_url = try_font(
    "/System/Library/Fonts/SFNSMono.ttf",
    "/System/Library/Fonts/Menlo.ttc",
    "/System/Library/Fonts/Andale Mono.ttf",
    size=22,
)
font_terminal = try_font(
    "/System/Library/Fonts/SFNSMono.ttf",
    "/System/Library/Fonts/Menlo.ttc",
    "/System/Library/Fonts/Andale Mono.ttf",
    size=26,
)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

# Subtle accent gradient stripe on top
for y in range(8):
    r = int(255 * (1 - y / 8 * 0.4))
    g = int(106 * (1 - y / 8 * 0.4))
    b = int(61 * (1 - y / 8 * 0.4))
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Top: brand row
draw.text((60, 48), "🔊  pronounce.renlab.ai", font=font_brand, fill=ACCENT_2)

# Main headline
HEADLINE_TOP = 110
draw.text((60, HEADLINE_TOP), "How to pronounce", font=font_subtitle, fill=MUTED_STRONG)
draw.text((60, HEADLINE_TOP + 50), LEAD, font=font_title, fill=FG)
draw.text((60, HEADLINE_TOP + 132), f"and {OTHERS} more.", font=font_title, fill=ACCENT)

# Subhead
draw.text((60, HEADLINE_TOP + 218),
          "Community dictionary · every entry confidence-tagged · MIT",
          font=font_subtitle, fill=MUTED_STRONG)

# Terminal panel
T_X, T_Y = 60, 390
T_W, T_H = W - 120, 200

# Card background
draw.rounded_rectangle([T_X, T_Y, T_X + T_W, T_Y + T_H], radius=14, fill=CARD, outline=BORDER, width=2)

# 3 fake mac window dots
for i, color in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
    cx = T_X + 20 + i * 22
    cy = T_Y + 22
    draw.ellipse([cx - 7, cy - 7, cx + 7, cy + 7], fill=color)

# Terminal contents
def tline(y, parts):
    """parts = list of (text, color) pairs"""
    x = T_X + 28
    for text, color in parts:
        draw.text((x, y), text, font=font_terminal, fill=color)
        # rough advance
        bbox = draw.textbbox((0, 0), text, font=font_terminal)
        x += (bbox[2] - bbox[0])

tline(T_Y + 56, [("$ ", MUTED), ('say-it "Gemini 4 Neon"', FG)])
tline(T_Y + 92, [("🔊 ", FG), ("jem in eye four nee on.", ACCENT_2)])
tline(T_Y + 134, [("$ ", MUTED), ('say-it "Gemini 4 Carbon"', FG)])
tline(T_Y + 170, [("🔊 ", FG), ("jem in eye four carbon.  ", ACCENT_2), ("# said on Google's channel, 0:59", MUTED)])

img.save(OUT, "PNG", optimize=True)
print(f"Wrote {OUT}  ({OUT.stat().st_size // 1024} KB)")
