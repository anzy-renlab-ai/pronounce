#!/usr/bin/env python3
import json
import unittest
from pathlib import Path


REPO = Path(__file__).resolve().parent.parent
TSV = REPO / "data" / "pronunciations.tsv"
CHROME_DICTIONARY = REPO / "integrations" / "chrome" / "src" / "dictionary.json"
CI_WORKFLOW = REPO / ".github" / "workflows" / "ci.yml"

TSV_COLUMNS = (
    "word",
    "ipa",
    "respelling_us",
    "alt_ipa",
    "alt_respelling_us",
    "source_url",
    "source_label",
    "category",
    "confidence",
    "notes",
)
CHROME_FIELDS = (
    "word",
    "ipa",
    "respelling_us",
    "alt_ipa",
    "alt_respelling_us",
    "category",
    "confidence",
    "notes",
)


def load_tsv_entries():
    rows = []
    for line in TSV.read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#"):
            continue
        cells = line.split("\t")
        if cells[0] == "word":
            continue
        if len(cells) != len(TSV_COLUMNS):
            raise AssertionError(
                f"{cells[0] if cells else '<empty>'}: "
                f"expected {len(TSV_COLUMNS)} TSV fields, found {len(cells)}"
            )
        rows.append(dict(zip(TSV_COLUMNS, cells)))
    return rows


class ChromeDictionaryParityTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.rows = load_tsv_entries()
        cls.expected = {
            row["word"].lower(): {field: row[field] for field in CHROME_FIELDS}
            for row in cls.rows
        }
        cls.actual = json.loads(CHROME_DICTIONARY.read_text(encoding="utf-8"))

    def test_chrome_dictionary_matches_all_tsv_fields(self):
        # No literal entry count: the dictionary grows every release, and a pin
        # here only ever went red for adding a word. What matters is that the
        # shipped file and the TSV are the same set, key-for-key.
        self.assertGreaterEqual(len(self.rows), 1900, "dictionary shrank unexpectedly")
        self.assertEqual(
            len(self.expected),
            len(self.rows),
            "lowercased Chrome dictionary keys must stay collision-free",
        )
        self.assertEqual(len(self.actual), len(self.rows))
        self.assertEqual(self.actual, self.expected)

    def test_gif_alternate_and_notes_match_tsv(self):
        gif_row = next(row for row in self.rows if row["word"] == "GIF")
        gif = self.actual["gif"]

        self.assertEqual(gif["alt_ipa"], gif_row["alt_ipa"])
        self.assertEqual(
            gif["alt_respelling_us"],
            gif_row["alt_respelling_us"],
        )
        self.assertEqual(gif["notes"], gif_row["notes"])

    def test_ci_runs_chrome_dictionary_parity_guard(self):
        workflow = CI_WORKFLOW.read_text(encoding="utf-8")
        self.assertIn("'tools/test_chrome_dictionary.py'", workflow)
        self.assertIn(
            "tools/test_make_og_all.py tools/test_chrome_dictionary.py",
            workflow,
        )


if __name__ == "__main__":
    unittest.main()
