#!/usr/bin/env python3
"""Regenerate the Chrome extension dictionary from data/pronunciations.tsv.

The Chrome content script looks entries up by lowercased page token
(`dict[m[0].toLowerCase()]`), so keys are lowercased words; the value keeps the
original-case `word` plus the display/audio fields the popup + tooltip use.
Source columns (source_url/source_label) are intentionally dropped — the Chrome
UI shows IPA + respelling + audio, not citations, and shipping them would just
bloat the no-network bundle.

Also stamps the current entry count into manifest.json and README.md so the
Chrome artifact can't drift from the dictionary the way it did (851 vs 1790).

Usage:  python3 tools/build-chrome-dict.py
Zero deps (stdlib only).
"""
import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TSV = ROOT / "data" / "pronunciations.tsv"
CHROME = ROOT / "integrations" / "chrome"
DICT_OUT = CHROME / "src" / "dictionary.json"
MANIFEST = CHROME / "manifest.json"
README = CHROME / "README.md"

# TSV column order (see the header block in pronunciations.tsv).
COLS = [
    "word", "ipa", "respelling_us", "alt_ipa", "alt_respelling_us",
    "source_url", "source_label", "category", "confidence", "notes",
]
# Fields the Chrome UI actually consumes.
KEEP = ["word", "ipa", "respelling_us", "alt_ipa", "alt_respelling_us",
        "category", "confidence", "notes"]


def load_entries():
    entries = {}
    with TSV.open(encoding="utf-8") as f:
        for line in f:
            if line.startswith("#") or not line.strip():
                continue
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 10 or parts[0] in ("", "word"):
                continue
            row = dict(zip(COLS, parts))
            key = row["word"].lower()
            entries[key] = {k: row[k] for k in KEEP}
    return entries


def stamp_count(path, count, patterns):
    text = path.read_text(encoding="utf-8")
    orig = text
    for pat, repl in patterns:
        text = re.sub(pat, repl.format(n=count), text)
    if text != orig:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main():
    entries = load_entries()
    count = len(entries)
    # Compact single-line JSON, matching the committed format; keep non-ASCII IPA.
    DICT_OUT.write_text(
        json.dumps(entries, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    stamp_count(MANIFEST, count, [
        (r"\d[\d,]* sourced entries", "{n} sourced entries"),
        (r"search \d[\d,]* entries", "search {n} entries"),
    ])
    stamp_count(README, count, [
        (r"\d[\d,]*-entry sourced dictionary", "{n}-entry sourced dictionary"),
        (r"all \d[\d,]* entries", "all {n} entries"),
    ])
    print(f"chrome dict: {count} entries -> {DICT_OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
