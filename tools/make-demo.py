#!/usr/bin/env python3
"""Generate a self-contained demo MP4 of say-it.

Composes 4 terminal-style PNG frames with the real CLI audio output:
1. say-it "Gemini 4 Carbon"   → the reading × 3
2. say-it "Gemini 4 Hydrogen" → the reading × 3, with the second of the
                                creator clip where the name is said
3. say-it --why "Gemini 4 Carbon"  → the entry's source (silent panel)
4. the entry count, counted from the dictionary when this runs, and the install line

The Gemini 4 model names lead, as the owner asked on 2026-11-26, and no
contested word is in the animation: under a caption about the model names the
old example held the longest scene. The script stops unless the dictionary holds both rows as it expects
them, and every count, reading, source and second on screen comes from the
dictionary and the clip file.

Counts are drawn as floors ("1,900+"), because nothing re-renders this file
when the dictionary grows.

Each frame is rendered with Pillow; audio is generated via the CLI (`-o`, so
nothing is played); ffmpeg stitches frames + audio into demo.mp4. Run from the
repo root: python3 tools/make-demo.py

Writes:
  docs/demo.mp4
  docs/demo.gif   (what the README shows)
"""
from __future__ import annotations

import pathlib
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFont

REPO = pathlib.Path(__file__).resolve().parent.parent
CLI = REPO / "bin" / "say-it"
DICT = REPO / "data" / "pronunciations.tsv"
CLIPS = REPO / "data" / "creator-clips.tsv"
OUT = REPO / "docs" / "demo.mp4"
TMP = pathlib.Path(tempfile.mkdtemp(prefix="say-it-demo-"))

LEAD = "Gemini 4 Carbon"          # spoken first and shown with its source
LEAD_RESP = "jem in eye four carbon"
SECOND = "Gemini 4 Hydrogen"      # spoken next; its creator clip gives the second
NAMED = 4                         # the four Gemini 4 model names in the title

W, H = 1280, 720
PADDING = 60
TITLE_Y = 60
TERMINAL_Y = 160
TERMINAL_H = H - TERMINAL_Y - 60

# Palette (matches the site)
BG = (14, 14, 16)
CARD = (24, 24, 27)
BORDER = (42, 42, 48)
FG = (246, 246, 247)
MUTED = (155, 155, 160)
MUTED_STRONG = (196, 196, 202)
ACCENT = (255, 106, 61)
ACCENT_2 = (122, 223, 187)


def f(*candidates, size=40):
    for c in candidates:
        try:
            return ImageFont.truetype(c, size)
        except Exception:
            pass
    return ImageFont.load_default()


font_title = f("/System/Library/Fonts/SFNS.ttf", size=40)
font_subtitle = f("/System/Library/Fonts/SFNS.ttf", size=24)
font_mono = f("/System/Library/Fonts/SFNSMono.ttf",
              "/System/Library/Fonts/Menlo.ttc",
              size=28)
font_mono_small = f("/System/Library/Fonts/SFNSMono.ttf",
                    "/System/Library/Fonts/Menlo.ttc",
                    size=22)


def dictionary():
    """The rows of data/pronunciations.tsv as lists of ten cells."""
    rows = []
    with open(DICT, encoding="utf-8") as fh:
        for line in fh:
            if line.startswith("#") or not line.strip():
                continue
            cols = line.rstrip("\n").split("\t")
            if len(cols) >= 10 and cols[0] and cols[0] != "word":
                rows.append(cols)
    return rows


def clip_second(word):
    """The second at which the creator clip for `word` says the name."""
    with open(CLIPS, encoding="utf-8") as fh:
        for line in fh:
            cols = line.rstrip("\n").split("\t")
            if len(cols) >= 3 and cols[0] == word:
                return int(cols[2])
    raise SystemExit(f'data/creator-clips.tsv has no clip for "{word}"')


def floor(count, step=100):
    """A lower bound that stays true after the dictionary grows: 1,988 → "1,900+"."""
    return f"{count // step * step:,}+"


def frame_base(subtitle: str):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # Top brand stripe (orange gradient)
    for y in range(6):
        k = 1 - y / 6 * 0.5
        d.line([(0, y), (W, y)], fill=(int(255 * k), int(106 * k), int(61 * k)))
    # Top: title row
    d.text((PADDING, TITLE_Y), "🔊 pronounce.renlab.ai", font=font_title, fill=ACCENT_2)
    d.text((PADDING, TITLE_Y + 60), subtitle, font=font_subtitle, fill=MUTED_STRONG)
    # Terminal panel
    d.rounded_rectangle([PADDING, TERMINAL_Y, W - PADDING, TERMINAL_Y + TERMINAL_H],
                        radius=14, fill=CARD, outline=BORDER, width=2)
    # 3 mac dots
    for i, color in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        cx = PADDING + 20 + i * 22
        cy = TERMINAL_Y + 22
        d.ellipse([cx - 7, cy - 7, cx + 7, cy + 7], fill=color)
    return img, d


def render_terminal_lines(d, lines, top=TERMINAL_Y + 60, line_h=42, font=font_mono):
    """lines = list of lists of (text, color); an empty list leaves a blank line."""
    x_start = PADDING + 28
    y = top
    for line in lines:
        x = x_start
        for text, color in line:
            d.text((x, y), text, font=font, fill=color)
            bbox = d.textbbox((0, 0), text, font=font)
            x += (bbox[2] - bbox[0])
        y += line_h
    return y


def spoken(resp: str) -> list:
    """What the CLI says for a word without alternates, one line per repetition."""
    return [
        [("   ", FG), (f"{resp}.  ", ACCENT_2), (f"{resp}.", ACCENT_2)],
        [("   ", FG), (f"{resp}.", ACCENT_2)],
    ]


def said_on_clip(word) -> str:
    second = clip_second(word)
    return f"# said on Google's own channel at {second // 60}:{second % 60:02d}"


def render_frame_lead(path, subtitle):
    img, d = frame_base(subtitle)
    render_terminal_lines(d, [
        [("$ ", MUTED), (f'say-it "{LEAD}"', FG)],
        [],
        *spoken(LEAD_RESP),
        [],
        [("   ", FG), (said_on_clip(LEAD), MUTED)],
    ])
    img.save(path)


def render_frame_second(path, subtitle, row):
    img, d = frame_base(subtitle)
    render_terminal_lines(d, [
        [("$ ", MUTED), (f'say-it "{row[0]}"', FG)],
        [],
        *spoken(row[2]),
        [],
        [("   ", FG), (said_on_clip(row[0]), MUTED)],
    ])
    img.save(path)


def render_frame_why(path, subtitle, row):
    img, d = frame_base(subtitle)
    # Four of the fields `say-it --why` prints, one per line, read from the row.
    render_terminal_lines(d, [
        [("$ ", MUTED), (f'say-it --why "{row[0]}"', FG)],
        [],
        [("category   ", MUTED), (row[7], FG)],
        [("confidence ", MUTED), (row[8], ACCENT_2)],
        [("source     ", MUTED), (row[6], FG)],
        [("url        ", MUTED), (row[5], FG)],
    ], font=font_mono_small, line_h=38)
    img.save(path)


def render_frame_outro(path, subtitle, entries: int):
    img, d = frame_base(subtitle)
    d.text((PADDING + 28, TERMINAL_Y + 100),
           f"{floor(entries)} entries · every one tagged by confidence · MIT", font=font_title, fill=FG)
    d.text((PADDING + 28, TERMINAL_Y + 180),
           "Install:", font=font_subtitle, fill=MUTED_STRONG)
    d.text((PADDING + 28, TERMINAL_Y + 220),
           "curl -fsSL https://pronounce.renlab.ai/install.sh | bash", font=font_mono, fill=ACCENT_2)
    d.text((PADDING + 28, TERMINAL_Y + 260),
           'say-it "Gemini 4 Neon"', font=font_mono, fill=ACCENT_2)
    d.text((PADDING + 28, TERMINAL_Y + 360),
           "Browse:  pronounce.renlab.ai", font=font_subtitle, fill=ACCENT_2)
    d.text((PADDING + 28, TERMINAL_Y + 400),
           "GitHub:  github.com/anzy-renlab-ai/pronounce", font=font_subtitle, fill=ACCENT_2)
    img.save(path)


def main():
    rows = dictionary()
    lead_rows = [r for r in rows if r[0] == LEAD]
    if len(lead_rows) != 1 or lead_rows[0][2] != LEAD_RESP:
        raise SystemExit(f'the dictionary must hold exactly one "{LEAD}" row read "{LEAD_RESP}"')
    second_rows = [r for r in rows if r[0] == SECOND]
    if len(second_rows) != 1:
        raise SystemExit(f'the dictionary must hold exactly one "{SECOND}" row')
    subtitle = f"Hear how to say Google's new Gemini 4 models, and {floor(len(rows) - NAMED)} other names"

    # 1) Render frames
    f_lead = TMP / "frame_1_lead.png"
    f_second = TMP / "frame_2_second.png"
    f_why = TMP / "frame_3_why.png"
    f_outro = TMP / "frame_4_outro.png"
    render_frame_lead(f_lead, subtitle)
    render_frame_second(f_second, subtitle, second_rows[0])
    render_frame_why(f_why, subtitle, lead_rows[0])
    render_frame_outro(f_outro, subtitle, len(rows))
    print(f"[1/3] Rendered 4 frames in {TMP}")

    # 2) Generate audio segments via the CLI (`-o` writes a file; nothing is played)
    a_lead = TMP / "a_lead.aiff"
    a_second = TMP / "a_second.aiff"
    a_silent = TMP / "a_silent.aiff"
    subprocess.run([str(CLI), "-o", str(a_lead), LEAD], check=True, capture_output=True)
    subprocess.run([str(CLI), "-o", str(a_second), SECOND], check=True, capture_output=True)
    # 4-second silent track for the --why frame and the outro
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono",
                    "-t", "4", "-c:a", "pcm_s16be", str(a_silent)],
                   check=True, capture_output=True)
    print(f"[2/3] Generated audio ({LEAD}, {SECOND}, silence)")

    # 3) Compose with ffmpeg: each frame for the duration of its audio segment
    segments = []
    for image, audio in ((f_lead, a_lead), (f_second, a_second), (f_why, a_silent), (f_outro, a_silent)):
        segment = TMP / f"seg_{image.stem}.mp4"
        cmd = ["ffmpeg", "-y", "-loop", "1", "-i", str(image), "-i", str(audio),
               "-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p",
               "-c:a", "aac", "-b:a", "128k", "-shortest", "-vf", "format=yuv420p", str(segment)]
        subprocess.run(cmd, check=True, capture_output=True)
        segments.append(segment)

    concat_list = TMP / "concat.txt"
    with concat_list.open("w") as f:
        for s in segments:
            f.write(f"file '{s}'\n")

    OUT.parent.mkdir(exist_ok=True)
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_list), "-c", "copy", str(OUT),
    ], check=True, capture_output=True)

    # Also export a smaller GIF version for README
    gif_out = OUT.with_suffix(".gif")
    subprocess.run([
        "ffmpeg", "-y", "-i", str(OUT),
        "-vf", "fps=10,scale=800:-1:flags=lanczos",
        "-loop", "0",
        str(gif_out),
    ], check=True, capture_output=True)

    print("[3/3] Composed final video.")
    print(f"  {OUT}  ({OUT.stat().st_size // 1024} KB)")
    print(f"  {gif_out}  ({gif_out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
