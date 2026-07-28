#!/usr/bin/env python3
"""Integration tests for the IndexNow submission script."""

from __future__ import annotations

import os
from pathlib import Path
import shutil
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).with_name("indexnow-submit.sh")


class IndexNowSubmitTests(unittest.TestCase):
    def setUp(self) -> None:
        self.temp_dir = tempfile.TemporaryDirectory()
        self.repo = Path(self.temp_dir.name)
        self.tools = self.repo / "tools"
        self.docs = self.repo / "docs"
        self.tools.mkdir()
        self.docs.mkdir()
        shutil.copy2(SCRIPT, self.tools / SCRIPT.name)
        (self.docs / ".indexnow-key").write_text(
            "test-indexnow-key\n", encoding="utf-8"
        )

    def tearDown(self) -> None:
        self.temp_dir.cleanup()

    def write_sitemap(self, name: str, *urls: str) -> None:
        rows = "\n".join(f"  <url><loc>{url}</loc></url>" for url in urls)
        (self.docs / name).write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            f"{rows}\n"
            "</urlset>\n",
            encoding="utf-8",
        )

    def run_script(self) -> subprocess.CompletedProcess[str]:
        env = os.environ.copy()
        env.update(
            {
                "INDEXNOW_DRY_RUN": "1",
                "SITE_URL": "https://example.test",
            }
        )
        return subprocess.run(
            ["bash", str(self.tools / SCRIPT.name)],
            cwd=self.repo,
            env=env,
            capture_output=True,
            text=True,
            check=False,
        )

    def test_dry_run_submits_every_required_page_sitemap(self) -> None:
        urls = (
            "https://example.test/english",
            "https://example.test/editorial",
            "https://example.test/chinese",
        )
        for sitemap, url in zip(
            ("sitemap.xml", "sitemap-seo.xml", "sitemap-zh.xml"), urls
        ):
            self.write_sitemap(sitemap, url)

        result = self.run_script()

        self.assertEqual(result.returncode, 0, result.stderr)
        for url in urls:
            self.assertIn(url, result.stdout)

    def test_missing_required_sitemap_fails_before_submission(self) -> None:
        self.write_sitemap("sitemap.xml", "https://example.test/english")
        self.write_sitemap("sitemap-seo.xml", "https://example.test/editorial")

        result = self.run_script()

        self.assertEqual(result.returncode, 2, result.stdout)
        self.assertIn("sitemap-zh.xml", result.stderr)

    def test_large_dry_run_truncates_payload_without_sigpipe_failure(self) -> None:
        bulk_urls = [
            f"https://example.test/bulk/{index:05d}-{'x' * 160}"
            for index in range(5_000)
        ]
        self.write_sitemap("sitemap.xml", *bulk_urls)
        self.write_sitemap("sitemap-seo.xml", "https://example.test/editorial")
        self.write_sitemap("sitemap-zh.xml", "https://example.test/chinese")

        result = self.run_script()

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("Submitting 5002 URLs to IndexNow", result.stdout)
        self.assertIn("Dry run — payload:", result.stdout)
        self.assertIn(bulk_urls[0], result.stdout)
        self.assertTrue(result.stdout.endswith("...\n"), result.stdout[-100:])

    def test_dry_run_deduplicates_urls_across_page_sitemaps(self) -> None:
        duplicate = "https://example.test/shared"
        self.write_sitemap("sitemap.xml", duplicate)
        self.write_sitemap("sitemap-seo.xml", duplicate)
        self.write_sitemap("sitemap-zh.xml", duplicate)

        result = self.run_script()

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout.count(duplicate), 1, result.stdout)


if __name__ == "__main__":
    unittest.main()
