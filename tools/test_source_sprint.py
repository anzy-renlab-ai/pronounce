import tempfile
import unittest
from pathlib import Path

from tools.build_source_sprint import load_candidates, render, select_candidates, slugify


ROOT = Path(__file__).resolve().parent.parent


class SourceSprintTests(unittest.TestCase):
    def test_candidates_are_unsourced_products_and_tools(self):
        candidates = load_candidates(ROOT / "data" / "pronunciations.tsv")
        self.assertGreater(len(candidates), 100)
        self.assertTrue(all(item["category"] in {"project", "product", "tool", "cli-tool"} for item in candidates))

    def test_selection_is_stable_and_changes_by_week(self):
        candidates = load_candidates(ROOT / "data" / "pronunciations.tsv")
        first = select_candidates(candidates, "2026-W36")
        self.assertEqual(first, select_candidates(candidates, "2026-W36"))
        self.assertNotEqual(first, select_candidates(candidates, "2026-W37"))

    def test_issue_body_is_actionable(self):
        candidates = select_candidates(load_candidates(ROOT / "data" / "pronunciations.tsv"), "2026-W36")
        body = render("2026-W36", candidates)
        self.assertEqual(body.count("- [ ] **["), 5)
        self.assertIn("data/pronunciations.tsv", body)
        self.assertIn("tools/lint-dict.sh", body)
        self.assertEqual(slugify("C++"), "c--")


if __name__ == "__main__":
    unittest.main()
