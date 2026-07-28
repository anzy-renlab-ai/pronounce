#!/usr/bin/env python3
from __future__ import annotations

import contextlib
import importlib.util
import inspect
import io
import tempfile
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path
from unittest import mock


SCRIPT = Path(__file__).with_name("build-seo.py")
SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def import_script():
    spec = importlib.util.spec_from_file_location("build_seo_under_test", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


def sitemap_rows(path: Path) -> list[dict[str, str]]:
    root = ET.parse(path).getroot()
    rows = []
    for url in root.findall("sm:url", SITEMAP_NS):
        rows.append(
            {
                child.tag.rsplit("}", 1)[-1]: child.text or ""
                for child in list(url)
            }
        )
    return rows


def dictionary_row(word: str) -> str:
    return "\t".join(
        [
            word,
            "/test/",
            "TEST",
            "",
            "",
            "https://example.test/source",
            "Example",
            "tool",
            "community-consensus",
            "Test note.",
        ]
    )


class BuildSeoTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = import_script()

    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp_dir.cleanup)
        self.temp = Path(self.temp_dir.name)

    def helper(self, name: str):
        value = getattr(self.module, name, None)
        self.assertTrue(callable(value), f"{name} must be importable")
        return value

    def helper_with_parameters(self, name: str, expected: list[str]):
        value = self.helper(name)
        self.assertEqual(
            list(inspect.signature(value).parameters),
            expected,
            f"{name} must expose the documented contract",
        )
        return value


class EntryDateTests(BuildSeoTestCase):
    def setUp(self):
        super().setUp()
        self.dates = self.temp / "entry-dates.tsv"

    def test_load_entry_dates_returns_real_modified_dates(self):
        self.dates.write_text(
            "# generated state\n"
            "\n"
            "alpha\t2026-05-01\t2026-06-02\thash-a\n"
            "beta\t2026-05-03\t2026-06-04\thash-b\n",
            encoding="utf-8",
        )

        self.assertEqual(
            self.helper("load_entry_dates")(
                [{"slug": "alpha"}, {"slug": "beta"}], self.dates
            ),
            {"alpha": "2026-06-02", "beta": "2026-06-04"},
        )

    def test_load_entry_dates_accepts_the_repository_date_state(self):
        entries, _by_slug = self.module.load_entries()

        modified = self.helper("load_entry_dates")(entries)

        self.assertEqual(set(modified), {entry["slug"] for entry in entries})
        self.assertEqual(modified["anthropic"], "2026-06-24")

    def test_load_entry_dates_requires_exact_sorted_slug_parity(self):
        entries = [{"slug": "zeta"}, {"slug": "beta"}, {"slug": "alpha"}]
        self.dates.write_text(
            "zeta\t2026-05-01\t2026-06-02\thash-z\n"
            "old-z\t2026-05-03\t2026-06-04\thash-z-old\n"
            "old-a\t2026-05-05\t2026-06-06\thash-a-old\n",
            encoding="utf-8",
        )

        with self.assertRaises(ValueError) as raised:
            self.helper("load_entry_dates")(entries, self.dates)

        message = str(raised.exception)
        self.assertIn("entry date slug mismatch", message)
        self.assertIn("missing=['alpha', 'beta']", message)
        self.assertIn("stale=['old-a', 'old-z']", message)

    def test_load_entry_dates_rejects_duplicate_slug(self):
        self.dates.write_text(
            "alpha\t2026-05-01\t2026-06-02\thash-a\n"
            "alpha\t2026-05-01\t2026-06-03\thash-b\n",
            encoding="utf-8",
        )

        with self.assertRaises(ValueError) as raised:
            self.helper("load_entry_dates")([{"slug": "alpha"}], self.dates)

        message = str(raised.exception)
        self.assertIn(":2:", message)
        self.assertIn("duplicate slug", message)
        self.assertIn("alpha", message)

    def test_load_entry_dates_rejects_malformed_rows(self):
        malformed_rows = (
            "alpha\t2026-05-01\t2026-06-02",
            "alpha\t2026-05-01\t2026-06-02\thash-a\textra",
        )
        for malformed in malformed_rows:
            with self.subTest(malformed=malformed):
                self.dates.write_text(
                    "# generated state\n\n" + malformed + "\n",
                    encoding="utf-8",
                )

                with self.assertRaises(ValueError) as raised:
                    self.helper("load_entry_dates")(
                        [{"slug": "alpha"}], self.dates
                    )

                message = str(raised.exception)
                self.assertIn(":3:", message)
                self.assertIn("4 tab-separated fields", message)

    def test_load_entry_dates_rejects_invalid_or_non_normalized_modified_dates(self):
        for invalid in ("2026-02-30", "20260728"):
            with self.subTest(invalid=invalid):
                self.dates.write_text(
                    f"alpha\t2026-05-01\t{invalid}\thash-a\n",
                    encoding="utf-8",
                )

                with self.assertRaises(ValueError) as raised:
                    self.helper("load_entry_dates")(
                        [{"slug": "alpha"}], self.dates
                    )

                message = str(raised.exception)
                self.assertIn(":1:", message)
                self.assertIn("dateModified", message)
                self.assertIn(invalid, message)
                self.assertIn("YYYY-MM-DD", message)

    def test_load_entry_dates_requires_an_existing_file(self):
        missing = self.temp / "missing-entry-dates.tsv"

        with self.assertRaises(FileNotFoundError) as raised:
            self.helper("load_entry_dates")([{"slug": "alpha"}], missing)

        message = str(raised.exception)
        self.assertIn("entry date file missing", message)
        self.assertIn(str(missing), message)

    def test_load_entries_rejects_duplicate_generated_slugs(self):
        dictionary = self.temp / "pronunciations.tsv"
        dictionary.write_text(
            dictionary_row("Alpha!") + "\n" + dictionary_row("Alpha?") + "\n",
            encoding="utf-8",
        )

        with mock.patch.object(self.module, "DICT", dictionary):
            with self.assertRaises(ValueError) as raised:
                self.module.load_entries()

        message = str(raised.exception)
        self.assertIn("duplicate generated slug", message)
        self.assertIn("alpha-", message)


class SitemapEmitterTests(BuildSeoTestCase):
    def setUp(self):
        super().setUp()
        self.entries = [
            {"slug": "alpha"},
            {"slug": "beta"},
            {"slug": "gamma"},
        ]
        self.by_slug = {entry["slug"]: entry for entry in self.entries}
        self.modified = {
            "alpha": "2026-06-02",
            "beta": "2026-06-04",
            "gamma": "2026-07-01",
        }
        self.collections = [
            {"slug": "mixed", "words": ["alpha", "missing", "beta"]},
            {"slug": "single", "words": ["alpha"]},
            {"slug": "empty", "words": ["missing"]},
        ]
        self.compares = [
            {"pair": ("alpha", "beta")},
            {"pair": ("alpha", "missing")},
        ]
        self.seo_sitemap = self.temp / "sitemap-seo.xml"
        self.zh_sitemap = self.temp / "sitemap-zh.xml"

    def seo_emitter(self):
        return self.helper_with_parameters(
            "emit_seo_sitemap", ["by_slug", "modified", "out_path"]
        )

    def zh_emitter(self):
        return self.helper_with_parameters(
            "emit_zh_sitemap", ["entries", "modified", "out_path"]
        )

    def test_write_sitemap_refuses_an_empty_url_set(self):
        writer = self.helper_with_parameters(
            "write_sitemap", ["urls", "out_path"]
        )

        with self.assertRaises(ValueError) as raised:
            writer([], self.seo_sitemap)

        self.assertIn("refusing to write empty sitemap", str(raised.exception))
        self.assertIn(str(self.seo_sitemap), str(raised.exception))
        self.assertFalse(self.seo_sitemap.exists())

    def test_write_sitemap_is_deterministic_and_returns_maximum_lastmod(self):
        writer = self.helper_with_parameters(
            "write_sitemap", ["urls", "out_path"]
        )
        urls = [
            (
                "https://pronounce.renlab.ai/first",
                "2026-06-02",
                "0.8",
                "weekly",
            ),
            (
                "https://pronounce.renlab.ai/second",
                "2026-07-01",
                "0.7",
                "monthly",
            ),
        ]

        first_latest = writer(urls, self.seo_sitemap)
        first_bytes = self.seo_sitemap.read_bytes()
        second_latest = writer(urls, self.seo_sitemap)

        self.assertEqual(first_latest, "2026-07-01")
        self.assertEqual(second_latest, first_latest)
        self.assertEqual(self.seo_sitemap.read_bytes(), first_bytes)
        self.assertEqual(
            [row["loc"] for row in sitemap_rows(self.seo_sitemap)],
            [urls[0][0], urls[1][0]],
        )

    def test_emit_seo_sitemap_uses_only_valid_editorial_details_and_aggregate_dates(
        self,
    ):
        with mock.patch.object(self.module, "COLLECTIONS", self.collections):
            with mock.patch.object(self.module, "COMPARES", self.compares):
                latest = self.seo_emitter()(
                    self.by_slug, self.modified, self.seo_sitemap
                )

        rows = {row["loc"]: row for row in sitemap_rows(self.seo_sitemap)}
        base = self.module.SITE_URL
        self.assertEqual(
            set(rows),
            {
                f"{base}/collection",
                f"{base}/collection/mixed",
                f"{base}/collection/single",
                f"{base}/compare",
                f"{base}/compare/alpha-vs-beta",
            },
        )
        self.assertEqual(rows[f"{base}/collection/mixed"]["lastmod"], "2026-06-04")
        self.assertEqual(rows[f"{base}/collection/single"]["lastmod"], "2026-06-02")
        self.assertEqual(rows[f"{base}/collection"]["lastmod"], "2026-06-04")
        self.assertEqual(
            rows[f"{base}/compare/alpha-vs-beta"]["lastmod"], "2026-06-04"
        )
        self.assertEqual(rows[f"{base}/compare"]["lastmod"], "2026-06-04")
        self.assertEqual(latest, "2026-06-04")
        self.assertNotIn("/collection/empty", rows)
        self.assertNotIn("/compare/alpha-vs-missing", rows)
        self.assertFalse(any("/zh/word" in loc for loc in rows))

    def test_emit_seo_sitemap_omits_an_index_when_its_group_has_no_details(self):
        empty_collection = [{"slug": "empty", "words": ["missing"]}]
        valid_collection = [{"slug": "valid", "words": ["alpha"]}]
        valid_compare = [{"pair": ("alpha", "beta")}]
        invalid_compare = [{"pair": ("alpha", "missing")}]

        cases = (
            (empty_collection, valid_compare, "/collection", "/compare"),
            (valid_collection, invalid_compare, "/compare", "/collection"),
        )
        for collections, compares, absent, present in cases:
            with self.subTest(absent=absent):
                with mock.patch.object(self.module, "COLLECTIONS", collections):
                    with mock.patch.object(self.module, "COMPARES", compares):
                        self.seo_emitter()(
                            self.by_slug, self.modified, self.seo_sitemap
                        )

                locs = [
                    row["loc"] for row in sitemap_rows(self.seo_sitemap)
                ]
                self.assertFalse(
                    any(loc == f"{self.module.SITE_URL}{absent}" for loc in locs)
                )
                self.assertIn(f"{self.module.SITE_URL}{present}", locs)

    def test_emit_zh_sitemap_uses_exact_per_entry_dates_and_separate_population(
        self,
    ):
        latest = self.zh_emitter()(
            self.entries, self.modified, self.zh_sitemap
        )

        rows = {row["loc"]: row for row in sitemap_rows(self.zh_sitemap)}
        base = self.module.SITE_URL
        self.assertEqual(
            set(rows),
            {
                f"{base}/zh/word",
                f"{base}/zh/word/alpha",
                f"{base}/zh/word/beta",
                f"{base}/zh/word/gamma",
            },
        )
        self.assertEqual(rows[f"{base}/zh/word"]["lastmod"], "2026-07-01")
        self.assertEqual(rows[f"{base}/zh/word/alpha"]["lastmod"], "2026-06-02")
        self.assertEqual(rows[f"{base}/zh/word/beta"]["lastmod"], "2026-06-04")
        self.assertEqual(rows[f"{base}/zh/word/gamma"]["lastmod"], "2026-07-01")
        self.assertEqual(latest, "2026-07-01")
        self.assertFalse(
            any("/collection" in loc or "/compare" in loc for loc in rows)
        )

    def test_sitemap_emitters_are_byte_deterministic_and_use_clean_urls(self):
        with mock.patch.object(self.module, "COLLECTIONS", self.collections):
            with mock.patch.object(self.module, "COMPARES", self.compares):
                self.seo_emitter()(
                    self.by_slug, self.modified, self.seo_sitemap
                )
                first_seo = self.seo_sitemap.read_bytes()
                self.seo_emitter()(
                    self.by_slug, self.modified, self.seo_sitemap
                )
        self.zh_emitter()(self.entries, self.modified, self.zh_sitemap)
        first_zh = self.zh_sitemap.read_bytes()
        self.zh_emitter()(self.entries, self.modified, self.zh_sitemap)

        self.assertEqual(self.seo_sitemap.read_bytes(), first_seo)
        self.assertEqual(self.zh_sitemap.read_bytes(), first_zh)
        self.assertNotIn(b".html", first_seo)
        self.assertNotIn(b".html", first_zh)

    def test_dictionary_sitemap_source_has_no_build_date_fallback(self):
        functions = [
            self.helper("write_sitemap"),
            self.seo_emitter(),
            self.zh_emitter(),
        ]
        source = "\n".join(inspect.getsource(function) for function in functions)

        self.assertNotIn("TODAY", source)
        self.assertNotIn("date.today", source)
        self.assertNotRegex(source, r"(?i)build[_ -]?date")
        self.assertNotRegex(source, r"modified\s*\.get\s*\(")


class SitemapIndexTests(BuildSeoTestCase):
    def setUp(self):
        super().setUp()
        self.index = self.temp / "sitemap-index.xml"
        self.primary = (
            "  <sitemap><loc>https://pronounce.renlab.ai/sitemap.xml</loc>"
            "<lastmod>2026-07-25</lastmod></sitemap>"
        )
        self.images = (
            "  <sitemap><loc>https://pronounce.renlab.ai/sitemap-images.xml</loc>"
            "<lastmod>2026-07-24</lastmod></sitemap>"
        )
        self.index.write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            f"{self.primary}\n"
            "  <sitemap>\n"
            "    <loc>https://pronounce.renlab.ai/sitemap-seo.xml</loc>\n"
            "    <lastmod>1999-01-01</lastmod>\n"
            "  </sitemap>\n"
            f"{self.images}\n"
            "  <sitemap><loc>https://pronounce.renlab.ai/sitemap-zh.xml</loc>"
            "<lastmod>1999-01-02</lastmod></sitemap>\n"
            "  <sitemap><loc>https://pronounce.renlab.ai/sitemap-seo.xml</loc>"
            "<lastmod>1999-01-03</lastmod></sitemap>\n"
            "  <sitemap><loc>https://pronounce.renlab.ai/sitemap-zh.xml</loc>"
            "<lastmod>1999-01-04</lastmod></sitemap>\n"
            "</sitemapindex>\n",
            encoding="utf-8",
        )

    def patcher(self):
        return self.helper_with_parameters(
            "patch_sitemap_index", ["sitemaps", "path"]
        )

    def test_patch_sitemap_index_replaces_duplicates_in_order_and_is_idempotent(
        self,
    ):
        supplied = {
            "sitemap-seo.xml": "2026-06-04",
            "sitemap-zh.xml": "2026-07-01",
        }

        self.patcher()(supplied, self.index)
        first = self.index.read_bytes()
        text = first.decode("utf-8")

        self.assertEqual(text.count("/sitemap-seo.xml"), 1)
        self.assertEqual(text.count("/sitemap-zh.xml"), 1)
        self.assertIn(
            "<loc>https://pronounce.renlab.ai/sitemap-seo.xml</loc>"
            "<lastmod>2026-06-04</lastmod>",
            text,
        )
        self.assertIn(
            "<loc>https://pronounce.renlab.ai/sitemap-zh.xml</loc>"
            "<lastmod>2026-07-01</lastmod>",
            text,
        )
        self.assertLess(text.index("/sitemap-seo.xml"), text.index("/sitemap-zh.xml"))
        self.assertIn(self.primary, text)
        self.assertIn(self.images, text)
        self.assertNotIn("1999-01-", text)

        self.patcher()(supplied, self.index)
        self.assertEqual(self.index.read_bytes(), first)

    def test_patch_sitemap_index_requires_the_base_index(self):
        missing = self.temp / "missing-sitemap-index.xml"

        with self.assertRaises(FileNotFoundError) as raised:
            self.patcher()({"sitemap-seo.xml": "2026-06-04"}, missing)

        message = str(raised.exception)
        self.assertIn("sitemap index missing", message)
        self.assertIn(str(missing), message)


class MainIntegrationTests(BuildSeoTestCase):
    def test_main_writes_both_sitemaps_and_patches_their_real_latest_dates(self):
        self.assertTrue(
            hasattr(self.module, "ENTRY_DATES"),
            "ENTRY_DATES must identify the canonical date state",
        )
        docs = self.temp / "docs"
        docs.mkdir()
        dictionary = self.temp / "pronunciations.tsv"
        dates = self.temp / "entry-dates.tsv"
        dictionary.write_text(
            dictionary_row("Alpha") + "\n" + dictionary_row("Beta") + "\n",
            encoding="utf-8",
        )
        dates.write_text(
            "alpha\t2026-05-01\t2026-06-02\thash-a\n"
            "beta\t2026-05-03\t2026-06-04\thash-b\n",
            encoding="utf-8",
        )
        (docs / "sitemap-index.xml").write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            "  <sitemap><loc>https://pronounce.renlab.ai/sitemap.xml</loc>"
            "<lastmod>2026-06-01</lastmod></sitemap>\n"
            "  <sitemap><loc>https://pronounce.renlab.ai/sitemap-images.xml</loc>"
            "<lastmod>2026-06-01</lastmod></sitemap>\n"
            "</sitemapindex>\n",
            encoding="utf-8",
        )
        collections = [
            {
                "slug": "test",
                "title": "Test collection",
                "h1": "Test collection",
                "desc": "Test entries.",
                "intro": "Test collection introduction.",
                "words": ["alpha"],
            }
        ]
        compares = [
            {
                "pair": ("alpha", "beta"),
                "title": "Alpha vs Beta",
                "h1": "Alpha vs Beta",
                "angle": "Two test entries.",
            }
        ]

        stdout = io.StringIO()
        with mock.patch.object(self.module, "DICT", dictionary):
            with mock.patch.object(self.module, "ENTRY_DATES", dates):
                with mock.patch.object(self.module, "DOCS", docs):
                    with mock.patch.object(self.module, "COLLECTIONS", collections):
                        with mock.patch.object(self.module, "COMPARES", compares):
                            with contextlib.redirect_stdout(stdout):
                                self.module.main()

        seo = docs / "sitemap-seo.xml"
        zh = docs / "sitemap-zh.xml"
        self.assertTrue(seo.is_file())
        self.assertTrue(zh.is_file())
        seo_rows = {row["loc"]: row for row in sitemap_rows(seo)}
        zh_rows = {row["loc"]: row for row in sitemap_rows(zh)}
        self.assertEqual(
            seo_rows[f"{self.module.SITE_URL}/collection/test"]["lastmod"],
            "2026-06-02",
        )
        self.assertEqual(
            seo_rows[f"{self.module.SITE_URL}/compare/alpha-vs-beta"]["lastmod"],
            "2026-06-04",
        )
        self.assertEqual(
            zh_rows[f"{self.module.SITE_URL}/zh/word/alpha"]["lastmod"],
            "2026-06-02",
        )
        index_text = (docs / "sitemap-index.xml").read_text(encoding="utf-8")
        self.assertIn(
            "<loc>https://pronounce.renlab.ai/sitemap-seo.xml</loc>"
            "<lastmod>2026-06-04</lastmod>",
            index_text,
        )
        self.assertIn(
            "<loc>https://pronounce.renlab.ai/sitemap-zh.xml</loc>"
            "<lastmod>2026-06-04</lastmod>",
            index_text,
        )
        self.assertIn("sitemap-seo.xml", stdout.getvalue())
        self.assertIn("sitemap-zh.xml", stdout.getvalue())


if __name__ == "__main__":
    unittest.main()
