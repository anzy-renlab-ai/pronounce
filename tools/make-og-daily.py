#!/usr/bin/env python3
"""Generate docs/og-daily.png — the Dev Jargon 5 share card (1200x630)."""
from PIL import Image, ImageDraw, ImageFont
import pathlib

REPO = pathlib.Path(__file__).resolve().parent.parent
OUT = REPO / "docs" / "og-daily.png"

W, H = 1200, 630
BG = (14, 14, 16)
FG = (246, 246, 247)
MUTED_STRONG = (196, 196, 202)
ACCENT = (255, 106, 61)
ACCENT_2 = (122, 223, 187)


def try_font(*candidates, size=40):
    for c in candidates:
        try:
            return ImageFont.truetype(c, size)
        except Exception:
            continue
    return ImageFont.load_default()


font_title = try_font("/System/Library/Fonts/SFNS.ttf", "/System/Library/Fonts/Helvetica.ttc", size=96)
font_sub = try_font("/System/Library/Fonts/SFNS.ttf", "/System/Library/Fonts/Helvetica.ttc", size=36)
font_grid = try_font("/System/Library/Fonts/SFNSMono.ttf", "/System/Library/Fonts/Menlo.ttc", size=64)
font_url = try_font("/System/Library/Fonts/SFNSMono.ttf", "/System/Library/Fonts/Menlo.ttc", size=28)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)

for y in range(8):
    r = int(255 * (1 - y / 8 * 0.4))
    g = int(106 * (1 - y / 8 * 0.4))
    b = int(61 * (1 - y / 8 * 0.4))
    draw.line([(0, y), (W, y)], fill=(r, g, b))

draw.text((60, 48), "🔊  pronounce.renlab.ai", font=font_url, fill=ACCENT_2)
draw.text((60, 140), "Dev Jargon 5", font=font_title, fill=FG)
draw.text((60, 265), "Five words a day. Same five for everyone.", font=font_sub, fill=MUTED_STRONG)
draw.text((60, 330), "Listen. Pick the right respelling.", font=font_sub, fill=MUTED_STRONG)
draw.text((60, 430), "🔊 🟩 🟩 ⬛ 🟩 🟩", font=font_grid, fill=ACCENT)
draw.text((60, 540), "https://pronounce.renlab.ai/daily", font=font_url, fill=ACCENT_2)

img.save(OUT, "PNG")
print("wrote", OUT)
