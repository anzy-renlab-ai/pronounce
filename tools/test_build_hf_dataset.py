#!/usr/bin/env python3
"""tools/build-hf-dataset.py rewrites the numbers in the Hugging Face dataset
card. The card is hand-written prose, so that rewrite is the only thing that
keeps its counts true, and it has to work on every run. From 2026-11-12 to
2026-11-26 the card's first sentence said "1,934 entries in all" while the
dictionary grew past 1,980: the pattern matched the sentence it was written
for and not the sentence the script itself had written the day before."""
from __future__ import annotations

import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).with_name("build-hf-dataset.py")

CARD = """---
size_categories:
  - n<1K
---
A community dictionary of how engineers pronounce developer jargon. `kubectl`, `nginx`, `GIF`, `JSON`, `YAML`, `LaTeX`, `Tcl`, `awk`, and 1,934 more.

- **Entries:** 1,934

| `confidence` | count | meaning |
|---|---|---|
| `community-consensus` | 1,734 | one dominant reading, no live dispute |
| `contested`          | 175   | two live readings |
| `creator-clarified`  | 25    | settled by the creator or an official FAQ |

- **`community-consensus`** — the default: one dominant reading with no live dispute. Most of the 1,734 such entries are uncontroversial words.
"""

HEADER = "word\tipa\trespelling_us\talt_ipa\talt_respelling_us\tsource_url\tsource_label\tcategory\tconfidence\tnotes\n"


def row(word, confidence):
    cells = [word, "/x/", "x", "", "", "", "some source", "product", confidence, "a note"]
    return "\t".join(cells) + "\n"


class DatasetCardTests(unittest.TestCase):
    def export(self, root, rows):
        (root / "data").mkdir(exist_ok=True)
        (root / "data" / "pronunciations.tsv").write_text(HEADER + "".join(rows), encoding="utf-8")
        run = subprocess.run([sys.executable, str(SCRIPT)], cwd=root, capture_output=True, text=True)
        self.assertEqual(run.returncode, 0, run.stderr)

    def test_card_counts_follow_the_rows_on_every_run(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / "hf-dataset").mkdir()
            card = root / "hf-dataset" / "README.md"
            card.write_text(CARD, encoding="utf-8")
            two = [row("one", "community-consensus"), row("two", "creator-clarified")]
            self.export(root, two)
            self.assertIn("`awk` — 2 entries in all.", card.read_text(encoding="utf-8"))

            # The dictionary grows. The card, already rewritten once, has to follow.
            self.export(root, two + [row("three", "contested")])
            text = card.read_text(encoding="utf-8")
            self.assertIn("`awk` — 3 entries in all.", text)
            self.assertIn("- **Entries:** 3", text)
            self.assertIn("| `community-consensus` | 1 ", text)
            self.assertIn("| `contested`          | 1 ", text)
            self.assertIn("| `creator-clarified`  | 1 ", text)
            self.assertIn("Most of the 1 such entries", text)

            # A run that adds nothing rewrites nothing.
            self.export(root, two + [row("three", "contested")])
            self.assertEqual(text, card.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
