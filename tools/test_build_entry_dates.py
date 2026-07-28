#!/usr/bin/env python3
from __future__ import annotations

import copy
import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest import mock


SCRIPT = Path(__file__).with_name("build-entry-dates.py")


def import_script():
    spec = importlib.util.spec_from_file_location(
        "build_entry_dates_under_test", SCRIPT
    )
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class EntryDateStateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = import_script()

    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp_dir.cleanup)
        self.state_file = Path(self.temp_dir.name) / "entry-dates.tsv"

    def helper(self, name):
        value = getattr(self.module, name, None)
        self.assertTrue(callable(value), f"{name} must be importable")
        return value

    def test_load_state_returns_empty_for_missing_file(self):
        self.assertEqual(self.helper("load_state")(self.state_file), {})

    def test_load_state_loads_valid_rows_and_ignores_comments_and_empty_lines(self):
        self.state_file.write_text(
            "# generated state\n"
            "\n"
            "alpha\t2026-05-01\t2026-06-02\t0123456789ab\n"
            ".hidden\t2026-05-02\t2026-06-03\t1234567890ab\n"
            "-leading\t2026-05-03\t2026-06-04\tabcdef012345\n",
            encoding="utf-8",
        )

        self.assertEqual(
            self.helper("load_state")(self.state_file),
            {
                "alpha": {
                    "published": "2026-05-01",
                    "modified": "2026-06-02",
                    "hash": "0123456789ab",
                },
                ".hidden": {
                    "published": "2026-05-02",
                    "modified": "2026-06-03",
                    "hash": "1234567890ab",
                },
                "-leading": {
                    "published": "2026-05-03",
                    "modified": "2026-06-04",
                    "hash": "abcdef012345",
                },
            },
        )

    def test_load_state_rejects_duplicate_slug(self):
        self.state_file.write_text(
            "alpha\t2026-05-01\t2026-05-01\taaaaaaaaaaaa\n"
            "alpha\t2026-05-01\t2026-06-01\tbbbbbbbbbbbb\n",
            encoding="utf-8",
        )

        with self.assertRaises(ValueError) as raised:
            self.helper("load_state")(self.state_file)

        message = str(raised.exception)
        self.assertIn(":2:", message)
        self.assertIn("duplicate slug", message)
        self.assertIn("alpha", message)

    def test_load_state_rejects_empty_slug(self):
        self.state_file.write_text(
            "\t2026-05-01\t2026-06-02\t0123456789ab\n",
            encoding="utf-8",
        )

        with self.assertRaises(ValueError) as raised:
            self.helper("load_state")(self.state_file)

        message = str(raised.exception)
        self.assertIn(":1:", message)
        self.assertIn("invalid slug", message)
        self.assertIn("''", message)
        self.assertIn("[a-z0-9._-]+", message)

    def test_load_state_rejects_non_canonical_slug(self):
        for invalid in ("Alpha", "alpha/beta", "alpha beta"):
            with self.subTest(invalid=invalid):
                self.state_file.write_text(
                    f"{invalid}\t2026-05-01\t2026-06-02\t0123456789ab\n",
                    encoding="utf-8",
                )

                with self.assertRaises(ValueError) as raised:
                    self.helper("load_state")(self.state_file)

                message = str(raised.exception)
                self.assertIn(":1:", message)
                self.assertIn("invalid slug", message)
                self.assertIn(invalid, message)
                self.assertIn("[a-z0-9._-]+", message)

    def test_load_state_rejects_empty_row_hash(self):
        self.state_file.write_text(
            "alpha\t2026-05-01\t2026-06-02\t\n",
            encoding="utf-8",
        )

        with self.assertRaises(ValueError) as raised:
            self.helper("load_state")(self.state_file)

        message = str(raised.exception)
        self.assertIn(":1:", message)
        self.assertIn("row hash", message)
        self.assertIn("alpha", message)
        self.assertIn("''", message)
        self.assertIn("12 lowercase hexadecimal", message)

    def test_load_state_rejects_non_canonical_row_hash(self):
        for invalid in ("abc123", "0123456789AB", "0123456789ag"):
            with self.subTest(invalid=invalid):
                self.state_file.write_text(
                    f"alpha\t2026-05-01\t2026-06-02\t{invalid}\n",
                    encoding="utf-8",
                )

                with self.assertRaises(ValueError) as raised:
                    self.helper("load_state")(self.state_file)

                message = str(raised.exception)
                self.assertIn(":1:", message)
                self.assertIn("row hash", message)
                self.assertIn("alpha", message)
                self.assertIn(invalid, message)
                self.assertIn("12 lowercase hexadecimal", message)

    def test_load_state_rejects_rows_without_exactly_four_tab_separated_fields(self):
        for malformed in (
            "alpha\t2026-05-01\t2026-06-02",
            "alpha\t2026-05-01\t2026-06-02\taaaaaaaaaaaa\textra",
        ):
            with self.subTest(malformed=malformed):
                self.state_file.write_text(
                    "# generated state\n\n" + malformed + "\n",
                    encoding="utf-8",
                )

                with self.assertRaises(ValueError) as raised:
                    self.helper("load_state")(self.state_file)

                message = str(raised.exception)
                self.assertIn(":3:", message)
                self.assertIn("4 tab-separated fields", message)

    def test_load_state_rejects_invalid_or_non_normalized_published_date(self):
        for invalid in ("2026-02-30", "20260728"):
            with self.subTest(invalid=invalid):
                self.state_file.write_text(
                    f"alpha\t{invalid}\t2026-07-28\taaaaaaaaaaaa\n",
                    encoding="utf-8",
                )

                with self.assertRaises(ValueError) as raised:
                    self.helper("load_state")(self.state_file)

                message = str(raised.exception)
                self.assertIn(":1:", message)
                self.assertIn("published", message)
                self.assertIn("alpha", message)
                self.assertIn(invalid, message)
                self.assertIn("YYYY-MM-DD", message)

    def test_load_state_rejects_invalid_or_non_normalized_modified_date(self):
        for invalid in ("2026-02-30", "20260728"):
            with self.subTest(invalid=invalid):
                self.state_file.write_text(
                    f"alpha\t2026-07-28\t{invalid}\taaaaaaaaaaaa\n",
                    encoding="utf-8",
                )

                with self.assertRaises(ValueError) as raised:
                    self.helper("load_state")(self.state_file)

                message = str(raised.exception)
                self.assertIn(":1:", message)
                self.assertIn("modified", message)
                self.assertIn("alpha", message)
                self.assertIn(invalid, message)
                self.assertIn("YYYY-MM-DD", message)

    def test_recover_missing_entry_with_matching_history_keeps_dates(self):
        rows = {"alpha": ["Alpha", "/al-fuh/", "AL-fuh"]}
        expected_hash = self.module.row_hash(rows["alpha"])
        state = {
            "kept": {
                "published": "2026-04-01",
                "modified": "2026-04-02",
                "hash": "kept-hash",
            }
        }
        historical = {
            "alpha": {
                "published": "2026-05-01",
                "modified": "2026-06-02",
                "hash": expected_hash,
            }
        }
        original_state = copy.deepcopy(state)
        original_historical = copy.deepcopy(historical)

        reconciled, added = self.helper("recover_missing_entries")(
            state, rows, historical, "2026-07-28"
        )

        self.assertEqual(
            reconciled["alpha"],
            {
                "published": "2026-05-01",
                "modified": "2026-06-02",
                "hash": expected_hash,
            },
        )
        self.assertEqual(added, 0)
        self.assertEqual(state, original_state)
        self.assertEqual(historical, original_historical)

    def test_recover_genuinely_uncommitted_entry_uses_today_and_counts_added(self):
        rows = {"alpha": ["Alpha", "/al-fuh/", "AL-fuh"]}
        expected_hash = self.module.row_hash(rows["alpha"])

        reconciled, added = self.helper("recover_missing_entries")(
            {}, rows, {}, "2026-07-28"
        )

        self.assertEqual(
            reconciled["alpha"],
            {
                "published": "2026-07-28",
                "modified": "2026-07-28",
                "hash": expected_hash,
            },
        )
        self.assertEqual(added, 1)

    def test_recover_changed_historical_entry_keeps_published_but_modifies_today(self):
        rows = {"alpha": ["Alpha", "/new/", "new"]}
        expected_hash = self.module.row_hash(rows["alpha"])
        historical = {
            "alpha": {
                "published": "2026-05-01",
                "modified": "2026-06-02",
                "hash": "old-hash",
            }
        }
        original_historical = copy.deepcopy(historical)

        reconciled, added = self.helper("recover_missing_entries")(
            {}, rows, historical, "2026-07-28"
        )

        self.assertEqual(
            reconciled["alpha"],
            {
                "published": "2026-05-01",
                "modified": "2026-07-28",
                "hash": expected_hash,
            },
        )
        self.assertEqual(added, 0)
        self.assertEqual(historical, original_historical)

    def test_recover_missing_entries_returns_detached_state(self):
        state = {
            "alpha": {
                "published": "2026-05-01",
                "modified": "2026-06-02",
                "hash": "hash-a",
            }
        }

        reconciled, added = self.helper("recover_missing_entries")(
            state, {}, {}, "2026-07-28"
        )
        reconciled["alpha"]["modified"] = "2026-07-28"

        self.assertEqual(state["alpha"]["modified"], "2026-06-02")
        self.assertEqual(added, 0)

    def test_main_recovers_missing_history_and_drops_stale_rows(self):
        repo = Path(self.temp_dir.name)
        data = repo / "data"
        data.mkdir()
        dictionary = data / "pronunciations.tsv"
        state_file = data / "entry-dates.tsv"
        alpha = ["Alpha", "/alpha/", "alpha"]
        beta = ["Beta", "/beta/", "beta"]
        dictionary.write_text(
            "\t".join(alpha) + "\n" + "\t".join(beta) + "\n",
            encoding="utf-8",
        )
        state_file.write_text(
            "alpha\t2026-05-01\t2026-06-01\t"
            f"{self.module.row_hash(alpha)}\n"
            "stale\t2026-04-01\t2026-04-01\tcccccccccccc\n",
            encoding="utf-8",
        )
        historical = {
            "beta": {
                "published": "2026-05-02",
                "modified": "2026-06-02",
                "hash": self.module.row_hash(beta),
            }
        }
        bootstrap = mock.Mock(return_value=historical)

        with (
            mock.patch.object(self.module, "REPO", repo),
            mock.patch.object(self.module, "DICT", dictionary),
            mock.patch.object(self.module, "OUT", state_file),
            mock.patch.object(self.module, "TODAY", "2026-07-28"),
            mock.patch.object(self.module, "bootstrap", bootstrap),
        ):
            self.module.main()

        bootstrap.assert_called_once_with()
        self.assertEqual(
            self.helper("load_state")(state_file),
            {
                "alpha": {
                    "published": "2026-05-01",
                    "modified": "2026-06-01",
                    "hash": self.module.row_hash(alpha),
                },
                "beta": {
                    "published": "2026-05-02",
                    "modified": "2026-06-02",
                    "hash": self.module.row_hash(beta),
                },
            },
        )


if __name__ == "__main__":
    unittest.main()
