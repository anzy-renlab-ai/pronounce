#!/usr/bin/env python3
"""Generate PWA icons (192px, 512px, maskable 512px) into docs/."""
import pathlib
from PIL import Image, ImageDraw, ImageFont

REPO = pathlib.Path(__file__).resolve().parent.parent

ACCENT = (255, 106, 61)
BG = (14, 14, 16)
ACCENT_2 = (122, 223, 187)

def try_font(*candidates, size=40):
    for c in candidates:
        try: return ImageFont.truetype(c, size)
        except Exception: pass
    return ImageFont.load_default()

def render(size: int, maskable: bool, path: pathlib.Path) -> None:
    img = Image.new("RGB", (size, size), BG)
    d = ImageDraw.Draw(img)

    # Maskable icons need ~20% safe-area padding all around so the OS can crop
    pad = int(size * 0.20) if maskable else int(size * 0.06)

    # Background card
    if not maskable:
        d.rounded_rectangle([pad // 3, pad // 3, size - pad // 3, size - pad // 3],
                            radius=int(size * 0.18), fill=BG, outline=ACCENT, width=max(2, size // 80))

    # Big speaker icon centered (drawn from triangles + arcs)
    cx, cy = size // 2, size // 2
    speaker_w = size - 2 * pad
    speaker_h = int(speaker_w * 0.62)

    # Speaker body
    bx0 = cx - speaker_w // 3
    by0 = cy - speaker_h // 4
    by1 = cy + speaker_h // 4
    d.rectangle([bx0, by0, bx0 + speaker_w // 6, by1], fill=ACCENT)
    # Cone
    cone_w = speaker_w // 4
    d.polygon([
        (bx0 + speaker_w // 6, by0 - speaker_h // 6),
        (bx0 + speaker_w // 6 + cone_w, by0 - speaker_h // 4),
        (bx0 + speaker_w // 6 + cone_w, by1 + speaker_h // 4),
        (bx0 + speaker_w // 6, by1 + speaker_h // 6),
    ], fill=ACCENT)
    # Sound waves (3 arcs)
    base_x = bx0 + speaker_w // 6 + cone_w + size // 40
    for i in range(3):
        r = size // 12 + i * size // 14
        thick = max(2, size // 60)
        d.arc([cx + r - r, cy - r, cx + r + r, cy + r],
              start=-50, end=50, fill=ACCENT_2, width=thick)

    img.save(path, "PNG", optimize=True)

def main() -> None:
    out = REPO / "docs"
    render(192, False, out / "icon-192.png")
    render(512, False, out / "icon-512.png")
    render(512, True, out / "icon-maskable.png")
    # Apple touch icon at 180 too
    render(180, False, out / "apple-touch-icon.png")
    # Favicon 32
    render(32, False, out / "favicon-32.png")
    print(f"Wrote PWA icons into {out}")

if __name__ == "__main__":
    main()
