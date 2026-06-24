#!/usr/bin/env python3
"""Pre-render an .mp3 per dictionary entry using the same TTS pipeline as the CLI.

The web page's ▶ button will use these files directly via HTML5 audio,
so visitors hear the EXACT same macOS Samantha rendering the CLI produces —
no more "browser audio may differ" disclaimer.

Writes:
  docs/audio/<slug>.mp3   (one file per dict entry)

Each file plays: primary × 3 with intra-pauses, then "or: <alt>" × 1 for each
alternate (matching the default CLI behavior).

Run from repo root: `python3 tools/make-audio-all.py`
"""
from __future__ import annotations
import pathlib
import re
import subprocess
import sys
import tempfile

REPO = pathlib.Path(__file__).resolve().parent.parent
DICT = REPO / "data" / "pronunciations.tsv"
OUT_DIR = REPO / "docs" / "audio"
OUT_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "Samantha"
RATE = 175
TIMES = 3
PAUSE_INTRA = "[[slnc 400]]"
PAUSE_INTER = "[[slnc 700]]"

def slugify(word: str) -> str:
    # Per-char replacement (NOT collapsing runs) to match bin/say-it and
    # build-seo.py. Collapsing runs makes C++ -> "c-" which collides with
    # C# and mismatches the canonical /word/ page slug (c--). See README §Contributing.
    return re.sub(r"[^a-z0-9._-]", "-", word.lower())

def build_body(resp: str, alts: list[str]) -> str:
    """Same logic as bin/say-it build_audible_body in default mode."""
    parts = []
    for i in range(TIMES):
        parts.append(resp + ".")
        if i < TIMES - 1:
            parts.append(PAUSE_INTRA)
    body = " ".join(parts)
    for a in alts:
        if not a: continue
        body += f" {PAUSE_INTER} or: {a}."
    return body

def render_one(slug: str, body: str) -> bool:
    """Generate .aiff via `say`, convert to .mp3 via ffmpeg."""
    out_mp3 = OUT_DIR / f"{slug}.mp3"
    if out_mp3.exists() and out_mp3.stat().st_size > 0:
        return True
    with tempfile.NamedTemporaryFile(suffix=".aiff", delete=False) as tmp_aiff:
        aiff_path = tmp_aiff.name
    try:
        subprocess.run(
            ["say", "-v", VOICE, "-r", str(RATE), "-o", aiff_path, body],
            check=True, capture_output=True,
        )
        subprocess.run(
            ["ffmpeg", "-y", "-i", aiff_path,
             "-codec:a", "libmp3lame", "-qscale:a", "5",
             str(out_mp3)],
            check=True, capture_output=True,
        )
        return True
    finally:
        pathlib.Path(aiff_path).unlink(missing_ok=True)

def main() -> None:
    count = 0
    skipped = 0
    failures = []
    with DICT.open() as f:
        for raw in f:
            if raw.startswith("#") or not raw.strip(): continue
            cols = raw.rstrip("\n").split("\t")
            if len(cols) < 3 or cols[0] in ("", "word"): continue
            word = cols[0]
            resp = cols[2] if len(cols) > 2 else ""
            alt_resp = cols[4] if len(cols) > 4 else ""
            speak = resp or word
            alts = [a for a in (alt_resp or "").split("|") if a]
            body = build_body(speak, alts)
            slug = slugify(word)
            try:
                if render_one(slug, body):
                    count += 1
                else:
                    skipped += 1
            except subprocess.CalledProcessError as e:
                failures.append((word, str(e)))
            if (count + skipped) % 25 == 0:
                print(f"  ... {count + skipped} done", flush=True)
    print(f"Wrote {count} audio files to {OUT_DIR}")
    if failures:
        print(f"  ({len(failures)} failures)")
        for w, err in failures[:5]:
            print(f"    {w}: {err}")

if __name__ == "__main__":
    main()
