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
import hashlib
import json
import pathlib
import re
import subprocess
import sys
import tempfile

REPO = pathlib.Path(__file__).resolve().parent.parent
DICT = REPO / "data" / "pronunciations.tsv"
OUT_DIR = REPO / "docs" / "audio"
OUT_DIR.mkdir(parents=True, exist_ok=True)
# slug -> fingerprint of the body that produced the committed mp3.
MANIFEST = OUT_DIR / "manifest.json"

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

def body_stamp(body: str) -> str:
    """Fingerprint of everything that determines the rendered audio."""
    payload = f"{VOICE}\x1f{RATE}\x1f{TIMES}\x1f{body}"
    return hashlib.sha1(payload.encode("utf-8")).hexdigest()[:16]


def load_manifest() -> dict:
    if MANIFEST.exists():
        try:
            return json.loads(MANIFEST.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            return {}
    return {}


def render_one(slug: str, body: str, manifest: dict) -> bool:
    """Generate .aiff via `say`, convert to .mp3 via ffmpeg.

    Existence alone is NOT proof the file is current: when an entry's respelling
    was corrected, the old mp3 stayed on disk forever and the page's ▶ button kept
    playing the reading the page itself calls wrong (/word/anthropic played
    "anth row pick" while displaying "an THROP ik"). Re-render whenever the
    fingerprint of the spoken body changes; otherwise skip, so the script stays
    idempotent and does not churn 1,790 files on every run.
    """
    out_mp3 = OUT_DIR / f"{slug}.mp3"
    stamp = body_stamp(body)
    if out_mp3.exists() and out_mp3.stat().st_size > 0 and manifest.get(slug) == stamp:
        return False  # already current
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
        manifest[slug] = stamp
        return True
    finally:
        pathlib.Path(aiff_path).unlink(missing_ok=True)

def main() -> None:
    manifest = load_manifest()
    jobs = []
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
            jobs.append((slugify(word), build_body(speak, alts), word))

    count = 0
    skipped = 0
    failures = []
    done = 0
    # SEQUENTIAL ON PURPOSE — do not parallelize this.
    # macOS `say -o` is not concurrency-safe for our purposes: under load it takes a
    # different synthesis path and emits a DIFFERENT (consistent, but non-canonical)
    # waveform for the very same input. Measured: rendering "engine X." x3 sequentially
    # gives md5 617753ad every time, but 8-way concurrently gives 8d9d579a every time.
    # The entire committed corpus was built sequentially, so a parallel pass silently
    # rewrites all ~1,800 mp3s and changes what users hear. Slow and correct wins.
    #
    # The renderer IS deterministic when sequential (same body -> byte-identical mp3),
    # so a full pass rewrites only the entries whose respelling actually changed.
    for slug, body, word in jobs:
        try:
            if render_one(slug, body, manifest):
                count += 1
            else:
                skipped += 1
        except subprocess.CalledProcessError as e:
            failures.append((word, str(e)))
        done += 1
        if done % 100 == 0:
            print(f"  ... {done}/{len(jobs)} ({count} rendered, {skipped} current)", flush=True)

    MANIFEST.write_text(json.dumps(manifest, indent=0, sort_keys=True), encoding="utf-8")
    print(f"Rendered {count} audio file(s); {skipped} already current. -> {OUT_DIR}")
    if failures:
        print(f"  ({len(failures)} failures)")
        for w, err in failures[:5]:
            print(f"    {w}: {err}")
        sys.exit(1)

if __name__ == "__main__":
    main()
