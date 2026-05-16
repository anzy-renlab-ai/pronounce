#!/usr/bin/env python3
"""Generate a self-contained demo MP4 of say-it.

Composes 3 terminal-style PNG frames with the real CLI audio output:
1. say-it kubectl  → koob control × 3 + or: cube cuddle, or: kube C T L
2. say-it GIF      → jif × 3 + or: gif
3. say-it --why JSON  → printed entry (silent panel)

Each frame is rendered with Pillow; audio is generated via the CLI;
ffmpeg stitches frames + audio into demo.mp4.

Writes:
  docs/demo.mp4
"""
from __future__ import annotations
import os
import pathlib
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw, ImageFont

REPO = pathlib.Path(__file__).resolve().parent.parent
CLI = REPO / "bin" / "say-it"
OUT = REPO / "docs" / "demo.mp4"
TMP = pathlib.Path(tempfile.mkdtemp(prefix="say-it-demo-"))

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
        try: return ImageFont.truetype(c, size)
        except Exception: pass
    return ImageFont.load_default()

font_title = f("/System/Library/Fonts/SFNS.ttf", size=40)
font_subtitle = f("/System/Library/Fonts/SFNS.ttf", size=24)
font_mono = f("/System/Library/Fonts/SFNSMono.ttf",
              "/System/Library/Fonts/Menlo.ttc",
              size=28)
font_mono_small = f("/System/Library/Fonts/SFNSMono.ttf",
                    "/System/Library/Fonts/Menlo.ttc",
                    size=22)

def frame_base():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    # Top brand stripe (orange gradient)
    for y in range(6):
        r = int(255 * (1 - y / 6 * 0.5))
        g = int(106 * (1 - y / 6 * 0.5))
        b = int(61 * (1 - y / 6 * 0.5))
        d.line([(0, y), (W, y)], fill=(r, g, b))
    # Top: title row
    d.text((PADDING, TITLE_Y), "🔊 pronounce.renlab.ai", font=font_title, fill=ACCENT_2)
    d.text((PADDING, TITLE_Y + 60), "Hear how engineers actually pronounce kubectl, GIF, JSON…",
           font=font_subtitle, fill=MUTED_STRONG)
    # Terminal panel
    d.rounded_rectangle([PADDING, TERMINAL_Y, W - PADDING, TERMINAL_Y + TERMINAL_H],
                        radius=14, fill=CARD, outline=BORDER, width=2)
    # 3 mac dots
    for i, color in enumerate([(255, 95, 86), (255, 189, 46), (39, 201, 63)]):
        cx = PADDING + 20 + i * 22
        cy = TERMINAL_Y + 22
        d.ellipse([cx - 7, cy - 7, cx + 7, cy + 7], fill=color)
    return img, d

def render_terminal_lines(img, d, lines, top=TERMINAL_Y + 60, line_h=42, font=font_mono):
    """lines = list of either str OR list[(text,color)] (mixed)"""
    x_start = PADDING + 28
    y = top
    for line in lines:
        if isinstance(line, str):
            d.text((x_start, y), line, font=font, fill=FG)
        else:
            x = x_start
            for text, color in line:
                d.text((x, y), text, font=font, fill=color)
                bbox = d.textbbox((0, 0), text, font=font)
                x += (bbox[2] - bbox[0])
        y += line_h
    return y

def render_frame_kubectl(path):
    img, d = frame_base()
    render_terminal_lines(img, d, [
        [("$ ", MUTED), ("say-it kubectl", FG)],
        "",
        [("🔊 ", FG), ("koob control. ", ACCENT_2), ("koob control. ", ACCENT_2), ("koob control.", ACCENT_2)],
        [("   ", FG), ("or: cube cuddle.   or: kube C T L.", ACCENT)],
    ])
    img.save(path)

def render_frame_gif(path):
    img, d = frame_base()
    render_terminal_lines(img, d, [
        [("$ ", MUTED), ("say-it GIF", FG)],
        "",
        [("🔊 ", FG), ("jif. jif. jif. ", ACCENT_2), ("or: gif.", ACCENT)],
        "",
        [("   ", FG), ("# Wilhite, Webby Awards 2013", MUTED)],
    ])
    img.save(path)

def render_frame_why(path):
    img, d = frame_base()
    render_terminal_lines(img, d, [
        [("$ ", MUTED), ("say-it --why JSON", FG)],
        "",
        [("word              ", MUTED), ("JSON", FG)],
        [("ipa               ", MUTED), ("/ˈdʒeɪsən/", FG)],
        [("respelling_us     ", MUTED), ("jay son", ACCENT_2)],
        [("alt_respelling_us ", MUTED), ("jee son", ACCENT)],
        [("category          ", MUTED), ("acronym", FG)],
        [("confidence        ", MUTED), ("contested", FG)],
        [("source            ", MUTED), ("Wikipedia § Pronunciation", FG)],
        [("url               ", MUTED), ("https://en.wikipedia.org/wiki/JSON#Pronunciation", FG)],
    ], font=font_mono_small, line_h=34)
    img.save(path)

def render_frame_outro(path):
    img, d = frame_base()
    d.text((PADDING + 28, TERMINAL_Y + 100),
           "310+ entries · with creator citations · MIT", font=font_title, fill=FG)
    d.text((PADDING + 28, TERMINAL_Y + 180),
           "Install:", font=font_subtitle, fill=MUTED_STRONG)
    d.text((PADDING + 28, TERMINAL_Y + 220),
           "git clone https://github.com/anzy-renlab-ai/pronounce.git", font=font_mono, fill=ACCENT_2)
    d.text((PADDING + 28, TERMINAL_Y + 260),
           "cd pronounce && ./install.sh && say-it kubectl", font=font_mono, fill=ACCENT_2)
    d.text((PADDING + 28, TERMINAL_Y + 360),
           "Browse:  pronounce.renlab.ai", font=font_subtitle, fill=ACCENT_2)
    d.text((PADDING + 28, TERMINAL_Y + 400),
           "GitHub:  github.com/anzy-renlab-ai/pronounce", font=font_subtitle, fill=ACCENT_2)
    img.save(path)

def main():
    # 1) Render frames
    f_kube = TMP / "frame_1_kubectl.png"
    f_gif = TMP / "frame_2_gif.png"
    f_why = TMP / "frame_3_why.png"
    f_outro = TMP / "frame_4_outro.png"
    render_frame_kubectl(f_kube)
    render_frame_gif(f_gif)
    render_frame_why(f_why)
    render_frame_outro(f_outro)
    print(f"[1/3] Rendered 4 frames in {TMP}")

    # 2) Generate audio segments via the CLI
    a_kube = TMP / "a_kubectl.aiff"
    a_gif = TMP / "a_gif.aiff"
    a_silent = TMP / "a_silent.aiff"
    subprocess.run([str(CLI), "-o", str(a_kube), "kubectl"], check=True)
    subprocess.run([str(CLI), "-o", str(a_gif), "GIF"], check=True)
    # 4-second silent track for --why frame and outro
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono",
                    "-t", "4", "-c:a", "pcm_s16be", str(a_silent)],
                   check=True, capture_output=True)
    print("[2/3] Generated audio (kubectl, GIF, silence)")

    # 3) Compose with ffmpeg: each frame for the duration of its audio segment
    # Build a concat list with image-per-segment (still frame for the audio length)
    # Use the segment files approach for reliable timing.
    seg_kube = TMP / "seg_kubectl.mp4"
    seg_gif = TMP / "seg_gif.mp4"
    seg_why = TMP / "seg_why.mp4"
    seg_outro = TMP / "seg_outro.mp4"

    def make_segment(image_path, audio_path, out_path, fallback_duration=None):
        cmd = ["ffmpeg", "-y", "-loop", "1", "-i", str(image_path)]
        if audio_path:
            cmd += ["-i", str(audio_path)]
        cmd += ["-c:v", "libx264", "-tune", "stillimage", "-pix_fmt", "yuv420p"]
        if audio_path:
            cmd += ["-c:a", "aac", "-b:a", "128k", "-shortest"]
        else:
            cmd += ["-t", str(fallback_duration)]
        cmd += ["-vf", "format=yuv420p", str(out_path)]
        subprocess.run(cmd, check=True, capture_output=True)

    make_segment(f_kube, a_kube, seg_kube)
    make_segment(f_gif, a_gif, seg_gif)
    make_segment(f_why, a_silent, seg_why)
    make_segment(f_outro, a_silent, seg_outro)

    # Concat
    concat_list = TMP / "concat.txt"
    with concat_list.open("w") as f:
        for s in (seg_kube, seg_gif, seg_why, seg_outro):
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

    print(f"[3/3] Composed final video.")
    print(f"  {OUT}  ({OUT.stat().st_size // 1024} KB)")
    print(f"  {gif_out}  ({gif_out.stat().st_size // 1024} KB)")

if __name__ == "__main__":
    main()
