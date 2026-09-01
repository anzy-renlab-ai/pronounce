#!/usr/bin/env python3
"""Build one deterministic, contributor-friendly weekly source sprint issue."""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import hashlib
import os
from pathlib import Path


ELIGIBLE_CATEGORIES = {"project", "product", "tool", "cli-tool"}


def load_candidates(dictionary: Path) -> list[dict[str, str]]:
    candidates: list[dict[str, str]] = []
    with dictionary.open(encoding="utf-8", newline="") as source:
        rows = (line for line in source if line.strip() and not line.startswith("#"))
        for columns in csv.reader(rows, delimiter="\t"):
            if len(columns) != 10 or columns[0] == "word":
                continue
            word, ipa, respelling, _alt_ipa, _alt_respelling, source_url, _source_label, category, confidence, notes = columns
            if source_url or category not in ELIGIBLE_CATEGORIES or confidence != "community-consensus":
                continue
            candidates.append({
                "word": word,
                "ipa": ipa,
                "respelling": respelling,
                "category": category,
                "notes": notes.strip('"'),
            })
    return candidates


def select_candidates(candidates: list[dict[str, str]], week: str, count: int = 5) -> list[dict[str, str]]:
    def rank(candidate: dict[str, str]) -> str:
        return hashlib.sha256(f"{week}\0{candidate['word'].casefold()}".encode()).hexdigest()

    return sorted(candidates, key=rank)[:count]


def slugify(word: str) -> str:
    return "".join(character if character.isascii() and (character.isalnum() or character in "._-") else "-" for character in word.lower())


def render(week: str, candidates: list[dict[str, str]]) -> str:
    lines = [
        f"This is the Pronounce source-verification sprint for **{week}**. Pick one unchecked term, find the strongest available pronunciation evidence, and open a small PR.",
        "",
        "Good evidence includes an official pronunciation guide, creator interview, conference talk with a timestamp, or an official video where the team says the name clearly. A generic homepage that never states or speaks the name is not enough.",
        "",
    ]
    for candidate in candidates:
        word = candidate["word"]
        lines.extend([
            f"- [ ] **[{word}](https://pronounce.renlab.ai/word/{slugify(word)})** — `{candidate['ipa']}`, \"{candidate['respelling']}\" ({candidate['category']})",
            f"  - Current note: {candidate['notes'] or 'No editorial note yet.'}",
        ])
    lines.extend([
        "",
        "## How to contribute",
        "",
        "1. Comment below to claim a term.",
        "2. Edit that row in `data/pronunciations.tsv`: add the exact `source_url` and a concise `source_label`; only change the pronunciation/confidence if the evidence supports it.",
        "3. Run `bash tools/lint-dict.sh` and open a PR that links this issue.",
        "",
        "If no reliable source exists, report where you looked. A documented dead end is useful and we will keep the entry honestly marked as community consensus.",
        "",
        "Full guide: [CONTRIBUTING.md](https://github.com/anzy-renlab-ai/pronounce/blob/main/CONTRIBUTING.md).",
    ])
    return "\n".join(lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dictionary", type=Path, default=Path("data/pronunciations.tsv"))
    parser.add_argument("--week", default=None, help="ISO week, for example 2026-W36")
    parser.add_argument("--count", type=int, default=5)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--github-output", type=Path)
    args = parser.parse_args()

    today = dt.date.today()
    week = args.week or f"{today.isocalendar().year}-W{today.isocalendar().week:02d}"
    selected = select_candidates(load_candidates(args.dictionary), week, args.count)
    if len(selected) < args.count:
        raise SystemExit(f"only {len(selected)} eligible source candidates found")
    args.output.write_text(render(week, selected), encoding="utf-8")

    title = f"Source sprint {week}: verify {', '.join(item['word'] for item in selected)}"
    if args.github_output:
        with args.github_output.open("a", encoding="utf-8") as output:
            output.write(f"title={title}\n")
    else:
        print(title)


if __name__ == "__main__":
    main()
