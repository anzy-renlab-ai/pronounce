#!/usr/bin/env python3
"""Per-segment MiniMax TTS (Chinese), pad each to its target duration, concat → single mp3."""
import json, binascii, os, subprocess, urllib.request

KEY = os.environ['MM_KEY']
VOICE = "Chinese (Mandarin)_Unrestrained_Young_Man"  # 不羁青年 — tech podcast vibe

SEGS = [
    ("Pronounce。kubectl 怎么读？这本词典告诉你。", 4.5),
    ("程序员每天都在念错项目名。库布喀托。恩金克斯。杰拉菲克。Pronounce 直接告诉你真正的读法。", 11.5),
    ("五百四十四条词条，每一条都带来源引用。", 6.0),
    ("多读法连读。听完争议，再下结论。jif，或者，gif。", 8.0),
    ("外加一个 Claude Code skill。问 Claude 怎么发音，它给你音频、IPA、还有出处。", 10.0),
    ("在 GitHub 给 Pronounce 加个星。别再念错 kubectl 了。", 6.5),
]

def tts(text, idx):
    payload = {
        "model": "speech-2.8-hd",
        "text": text,
        "stream": False,
        "voice_setting": {"voice_id": VOICE, "speed": 1.0, "vol": 1, "pitch": 0, "emotion": "happy"},
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
    path = f"/tmp/mm-zh-seg-{idx}.mp3"
    with open(path, "wb") as f:
        f.write(binascii.unhexlify(d["data"]["audio"]))
    return path

def dur(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path]
    )
    return float(out.strip())

voices = []
for i, (text, target) in enumerate(SEGS):
    p = tts(text, i)
    d = dur(p)
    voices.append((p, d, target))
    print(f"seg{i}: voice={d:.2f}s target={target:.2f}s text={text[:40]!r}")

concat_inputs = []
for i, (p, d, target) in enumerate(voices):
    concat_inputs.append(p)
    pad = max(0.05, target - d)
    silence_path = f"/tmp/mm-zh-sil-{i}.mp3"
    subprocess.check_call([
        "ffmpeg", "-y", "-f", "lavfi", "-i", f"anullsrc=r=32000:cl=mono", "-t", f"{pad:.3f}",
        "-c:a", "libmp3lame", "-b:a", "128k", silence_path,
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    concat_inputs.append(silence_path)
    if d > target:
        print(f"  ⚠ seg{i} voice {d:.2f}s > target {target:.2f}s — voice will spill")

list_path = "/tmp/mm-zh-concat.txt"
with open(list_path, "w") as f:
    for p in concat_inputs:
        f.write(f"file '{p}'\n")
subprocess.check_call([
    "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", list_path,
    "-c", "copy", "/tmp/say-it-voice-zh.mp3",
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
total = dur("/tmp/say-it-voice-zh.mp3")
print(f"\n✓ wrote /tmp/say-it-voice-zh.mp3 — total {total:.2f}s")
