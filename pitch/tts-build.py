#!/usr/bin/env python3
"""Per-segment MiniMax TTS, pad each to its target duration, concat → single mp3."""
import json, binascii, os, sys, subprocess, urllib.request

KEY = os.environ['MM_KEY']

# segment text + target duration (seconds, matching video)
SEGS = [
    ("Pronounce. kubectl, with receipts.", 4.5),
    ("Engineers butcher project names every day. Kub-cuttle. Eng-inks. Jraffic. Pronounce gives you the real reading.", 11.5),
    ("Five hundred and forty four entries. Every one sourced.", 6.0),
    ("Multi-reading audio. Hear the debate. jif, or, gif.", 8.0),
    ("Plus a Claude Code skill. Ask Claude how to pronounce X. Get audio, IPA, and a source.", 10.0),
    ("Star Pronounce on GitHub. Stop saying kub-cuttle.", 6.5),
]

def tts(text, idx):
    payload = {
        "model": "speech-2.8-hd",
        "text": text,
        "stream": False,
        "voice_setting": {"voice_id": "English_Graceful_Lady", "speed": 1.0, "vol": 1, "pitch": 0, "emotion": "happy"},
        "audio_setting": {"sample_rate": 32000, "bitrate": 128000, "format": "mp3", "channel": 1},
    }
    req = urllib.request.Request(
        "https://api.minimaxi.com/v1/t2a_v2",
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as r:
        d = json.loads(r.read())
    if d.get("base_resp", {}).get("status_code") != 0:
        raise RuntimeError(f"MM seg{idx} failed: {d.get('base_resp')}")
    path = f"/tmp/mm-seg-{idx}.mp3"
    with open(path, "wb") as f:
        f.write(binascii.unhexlify(d["data"]["audio"]))
    return path

def dur(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path]
    )
    return float(out.strip())

# 1. generate each segment voice
voices = []
for i, (text, target) in enumerate(SEGS):
    p = tts(text, i)
    d = dur(p)
    voices.append((p, d, target))
    print(f"seg{i}: voice={d:.2f}s target={target:.2f}s text={text[:50]!r}")

# 2. concat with silence padding per segment
concat_inputs = []
for i, (p, d, target) in enumerate(voices):
    concat_inputs.append(p)
    pad = max(0.05, target - d)
    silence_path = f"/tmp/mm-sil-{i}.mp3"
    # generate silence at 32000 Hz mono mp3
    subprocess.check_call([
        "ffmpeg", "-y", "-f", "lavfi", "-i", f"anullsrc=r=32000:cl=mono", "-t", f"{pad:.3f}",
        "-c:a", "libmp3lame", "-b:a", "128k", silence_path,
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    concat_inputs.append(silence_path)
    if d > target:
        print(f"  ⚠ seg{i} voice {d:.2f}s > target {target:.2f}s — voice will spill into next segment")

# 3. concat with ffmpeg concat demuxer (works for same-codec mp3s)
list_path = "/tmp/mm-concat.txt"
with open(list_path, "w") as f:
    for p in concat_inputs:
        f.write(f"file '{p}'\n")
subprocess.check_call([
    "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", list_path,
    "-c", "copy", "/tmp/say-it-voice-aligned.mp3",
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
total = dur("/tmp/say-it-voice-aligned.mp3")
print(f"\n✓ wrote /tmp/say-it-voice-aligned.mp3 — total {total:.2f}s")
