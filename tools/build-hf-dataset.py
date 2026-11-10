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

# --- Keep the dataset card's counts honest -------------------------------
# The card is hand-written prose with numbers baked into it, so it silently
# drifts every day the dictionary grows (it claimed 1,738 entries while the
# TSV held 1,934). Rewrite exactly the numbers that can be derived.
NAMED = 8  # the words named in the card's opening sentence
by_conf = {}
for r in rows:
    by_conf[r["confidence"]] = by_conf.get(r["confidence"], 0) + 1

card_path = "hf-dataset/README.md"
if os.path.exists(card_path):
    card = open(card_path, encoding="utf-8").read()
    subs = [
        # size_categories must match the row count or the Hub mislabels it
        (r"size_categories:\n  - n<\d+K",
         "size_categories:\n  - " + ("n<1K" if len(rows) < 1000 else "1K<n<10K")),
        (r"`awk`, and [\d,]+ more\.",
         f"`awk` — {len(rows):,} entries in all."),
        (r"- \*\*Entries:\*\* [\d,]+", f"- **Entries:** {len(rows):,}"),
        (r"(\| `community-consensus` \| )[\d,]+", rf"\g<1>{by_conf.get('community-consensus', 0):,}"),
        (r"(\| `contested`\s+\| )[\d,]+", rf"\g<1>{by_conf.get('contested', 0):,}"),
        (r"(\| `creator-clarified`\s+\| )[\d,]+", rf"\g<1>{by_conf.get('creator-clarified', 0):,}"),
        (r"Most of the [\d,]+ such entries", f"Most of the {by_conf.get('community-consensus', 0):,} such entries"),
    ]
    new = card
    for pat, rep in subs:
        new = re.sub(pat, rep, new, count=1)
    if new != card:
        open(card_path, "w", encoding="utf-8").write(new)
        print("updated hf-dataset/README.md counts")
print("confidence split:", by_conf)
