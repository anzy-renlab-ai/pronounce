#!/usr/bin/env python3
"""Export data/pronunciations.tsv as a HuggingFace-ready dataset (JSONL + CSV).
Adds a derived audio_url. Run from repo root: python3 tools/build-hf-dataset.py"""
import csv, json, re, os
SITE = "https://pronounce.renlab.ai"
COLS = ["word","ipa","respelling_us","alt_ipa","alt_respelling_us",
        "source_url","source_label","category","confidence","notes"]
def slug(w): return re.sub(r"[^a-z0-9._-]", "-", w.lower())
rows = []
with open("data/pronunciations.tsv", encoding="utf-8") as f:
    for line in f:
        if line.startswith("#"): continue
        c = line.rstrip("\n").split("\t")
        if len(c) < 3 or not c[0] or c[0] == "word": continue
        c = (c + [""] * 10)[:10]
        r = dict(zip(COLS, c))
        r["audio_url"] = f"{SITE}/audio/{slug(r['word'])}.mp3"
        rows.append(r)
os.makedirs("hf-dataset", exist_ok=True)
with open("hf-dataset/pronunciations.jsonl", "w", encoding="utf-8") as f:
    for r in rows: f.write(json.dumps(r, ensure_ascii=False) + "\n")
with open("hf-dataset/pronunciations.csv", "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=COLS + ["audio_url"]); w.writeheader(); w.writerows(rows)
print(f"Wrote {len(rows)} rows to hf-dataset/pronunciations.{{jsonl,csv}}")
