#!/usr/bin/env python3
import importlib.util
import json
import os
import re
import shutil
import subprocess
import tempfile
import unittest
import urllib.parse
from pathlib import Path


SCRIPT = Path(__file__).with_name("build-v2-data.py")
REPO = SCRIPT.parent.parent


class BuildV2DataTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp_dir = tempfile.TemporaryDirectory()
        repo = Path(cls.temp_dir.name)
        (repo / "tools").mkdir()
        (repo / "data").mkdir()
        (repo / "docs" / "v2").mkdir(parents=True)
        shutil.copyfile(SCRIPT, repo / "tools" / SCRIPT.name)
        (repo / "data" / "pronunciations.tsv").write_text(
            "word\tipa\trespelling_us\talt_ipa\talt_respelling_us\t"
            "source_url\tsource_label\tcategory\tconfidence\tnotes\n"
            "GIF\t/dʒɪf/\tjif\t\t\t\t\tacronym\tcreator-clarified\t\n",
            encoding="utf-8",
        )
        cls.output = repo / "docs" / "v2" / "data.js"
        cls.output.write_text("sentinel\n", encoding="utf-8")

        spec = importlib.util.spec_from_file_location(
            "build_v2_data_under_test", repo / "tools" / SCRIPT.name
        )
        cls.module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(cls.module)

    @classmethod
    def tearDownClass(cls):
        cls.temp_dir.cleanup()

    def helper(self, name):
        value = getattr(self.module, name, None)
        self.assertTrue(callable(value), f"{name} must be importable")
        return value

    def test_import_does_not_generate_data(self):
        self.assertEqual(self.output.read_text(encoding="utf-8"), "sentinel\n")

    def test_slugify_matches_asset_slug_rules(self):
        slugify = self.helper("slugify")
        self.assertEqual(slugify("C++"), "c--")
        self.assertEqual(slugify("C#"), "c-")
        self.assertEqual(slugify("Fréchet"), "fr-chet")
        self.assertEqual(slugify("Jalapeño"), "jalape-o")

    def test_split_alts_trims_drops_empty_parts_and_preserves_order(self):
        split_alts = self.helper("split_alts")
        self.assertEqual(
            split_alts(" first reading | | second reading | third "),
            ["first reading", "second reading", "third"],
        )

    def test_entry_exposes_canonical_slug_and_alternates(self):
        entry_from_cells = self.helper("entry_from_cells")
        entry = entry_from_cells(
            [
                "C++",
                "/ˌsiː plʌs ˈplʌs/",
                "C plus plus",
                "/alt one/|/alt two/",
                " first reading | | second reading ",
                "https://example.com/cpp",
                "Example source",
                "product",
                "creator-clarified",
                "Editorial note",
            ]
        )
        self.assertEqual(
            entry,
            {
                "w": "C++",
                "slug": "c--",
                "ipa": "/ˌsiː plʌs ˈplʌs/",
                "resp": "C plus plus",
                "alts": ["first reading", "second reading"],
                "alt": "first reading",
                "conf": "creator",
                "src": "Example source",
                "url": "https://example.com/cpp",
                "cat": "product",
                "notes": "Editorial note",
            },
        )

    def test_entry_keeps_empty_alts_array_and_omits_compat_alt(self):
        entry_from_cells = self.helper("entry_from_cells")
        entry = entry_from_cells(
            [
                "C#",
                "/ˌsiː ˈʃɑːrp/",
                "C sharp",
                "",
                "",
                "",
                "",
                "product",
                "community-consensus",
                "",
            ]
        )
        self.assertEqual(entry["slug"], "c-")
        self.assertEqual(entry["alts"], [])
        self.assertNotIn("alt", entry)

    def test_famous_presentation_shape_stays_stable(self):
        build_famous = self.helper("build_famous")
        famous = build_famous(
            [
                {
                    "w": "GIF",
                    "slug": "gif",
                    "resp": "jif",
                    "alts": [],
                    "conf": "creator",
                }
            ]
        )
        self.assertEqual(
            famous,
            [{"w": "GIF", "said": "jif", "src": "—", "url": "#"}],
        )


class RepositoryProductFactTests(unittest.TestCase):
    FACT_DOCS = (
        "README.md",
        "CLAUDE.md",
        "DESIGN.md",
        "CONTRIBUTING.md",
        "integrations/codex/AGENTS.md",
    )
    CURRENT_SOURCES = FACT_DOCS + (
        "docs/index.html",
        "docs/v2/sections-1.jsx",
        "docs/v2/sections-2.jsx",
        "docs/v2/eggs.jsx",
        "docs/v2/index.html",
        "tools/build-v2-data.py",
        "tools/build-site.sh",
    )

    def source(self, path):
        return (REPO / path).read_text(encoding="utf-8")

    def dictionary_entry(self, word):
        lines = self.source("data/pronunciations.tsv").splitlines()
        header = next(line.split("\t") for line in lines if line.startswith("word\t"))
        row = next(
            line.split("\t")
            for line in lines
            if not line.startswith("#") and line.split("\t", 1)[0] == word
        )
        self.assertEqual(len(row), len(header))
        return dict(zip(header, row))

    def cli_json_entry(self, word):
        completed = subprocess.run(
            [str(REPO / "bin" / "say-it"), "--json", word],
            cwd=REPO,
            env={
                **os.environ,
                "NO_COLOR": "1",
                "SAY_IT_NO_HISTORY": "1",
                "SAY_IT_DICT": str(REPO / "data" / "pronunciations.tsv"),
                "SAY_IT_LOCAL_DICT": str(REPO / ".test-no-local-dict"),
            },
            check=True,
            capture_output=True,
            text=True,
        )
        return json.loads(completed.stdout)

    def test_gif_demo_alternate_matches_dictionary_and_cli(self):
        entry = self.dictionary_entry("GIF")
        cli = self.cli_json_entry("GIF")

        self.assertEqual(entry["alt_ipa"], "/ɡɪf/")
        self.assertEqual(entry["alt_respelling_us"], "gif")
        self.assertEqual(cli["alt_ipa"], [entry["alt_ipa"]])
        self.assertEqual(
            cli["alt_respelling_us"], [entry["alt_respelling_us"]]
        )
        self.assertEqual(cli["confidence"], entry["confidence"])
        self.assertEqual(cli["source_url"], entry["source_url"])
        self.assertEqual(cli["source_label"], entry["source_label"])

        spoken_alternate = f"or: {cli['alt_respelling_us'][0]}."
        self.assertIn(spoken_alternate, self.source("docs/v2/sections-2.jsx"))
        self.assertIn(spoken_alternate, self.source("tools/build-site.sh"))

    def test_json_why_demos_match_dictionary_and_cli(self):
        entry = self.dictionary_entry("JSON")
        cli = self.cli_json_entry("JSON")

        for field in (
            "ipa",
            "respelling_us",
            "source_url",
            "source_label",
            "confidence",
        ):
            with self.subTest(field=field):
                self.assertEqual(cli[field], entry[field])

        self.assertEqual(cli["confidence"], "contested")
        self.assertEqual(cli["source_label"], "Wikipedia § Pronunciation")
        self.assertEqual(
            cli["source_url"],
            "https://en.wikipedia.org/wiki/JSON#Pronunciation",
        )

        jsx_demo = self.source("docs/v2/sections-2.jsx").split(
            '<span className="flag">--why</span> JSON', 1
        )[1].split('<span className="prompt">$</span>', 1)[0]
        readme_demo = self.source("README.md").split(
            "$ say-it --why JSON", 1
        )[1].split("```", 1)[0]
        shell_demos = re.findall(
            r"say-it --why JSON\n(.*?)</span></pre>",
            self.source("tools/build-site.sh"),
            re.DOTALL,
        )
        self.assertEqual(len(shell_demos), 2)

        for name, demo in (
            ("v2 terminal", jsx_demo),
            ("README", readme_demo),
            ("generated English source", shell_demos[0]),
            ("generated Chinese source", shell_demos[1]),
        ):
            with self.subTest(demo=name):
                self.assertIn(cli["ipa"], demo)
                self.assertIn(cli["respelling_us"], demo)
                self.assertIn(cli["source_label"], demo)
                self.assertIn(cli["source_url"], demo)
                self.assertIn(cli["confidence"], demo)

    def test_dictionary_has_exact_total_and_sourced_counts(self):
        rows = []
        for line in self.source("data/pronunciations.tsv").splitlines():
            if not line or line.startswith("#") or line.startswith("word\t"):
                continue
            cells = line.split("\t")
            if len(cells) >= 10 and cells[0] and cells[2]:
                rows.append(cells)

        self.assertEqual(len(rows), 1_880)
        self.assertEqual(sum(bool(cells[5].strip()) for cells in rows), 1_260)

    def test_current_sources_omit_retired_marketing_and_roadmap_claims(self):
        for path in self.CURRENT_SOURCES:
            source = self.source(path)
            with self.subTest(path=path):
                self.assertNotRegex(source, re.compile(r"~250", re.IGNORECASE))
                self.assertNotRegex(
                    source, re.compile(r"On the roadmap", re.IGNORECASE)
                )
                self.assertNotRegex(
                    source,
                    re.compile(r"powered by Web Speech API", re.IGNORECASE),
                )

    def test_current_guidance_uses_respelling_us_not_apple_phon_or_phon_us(self):
        for path in self.FACT_DOCS:
            source = self.source(path)
            with self.subTest(path=path):
                self.assertNotRegex(source, re.compile(r"\b(?:alt_)?phon_us\b"))
                self.assertNotIn("Apple PHON", source)
                self.assertNotIn("[[inpt PHON]]", source)

        combined = "\n".join(self.source(path) for path in self.FACT_DOCS)
        self.assertRegex(
            combined,
            re.compile(
                r"respelling_us[^.\n]*(?:English-like|plain English)",
                re.IGNORECASE,
            ),
        )
        self.assertRegex(
            combined,
            re.compile(r"respelling_us[^.\n]*detected OS TTS", re.IGNORECASE),
        )

    def test_readme_reports_source_coverage_without_universal_source_claims(self):
        readme = self.source("README.md")
        self.assertIn("1,880 entries — 1,260 carry a citable source", readme)
        self.assertNotIn("Shipped since this list was written", readme)
        self.assertNotRegex(
            readme,
            re.compile(
                r"Every cell has IPA, audio, and the source|"
                r"Every dictionary entry includes a `source_url`|"
                r"every word browsable, audio, source citation",
                re.IGNORECASE,
            ),
        )
        self.assertNotRegex(
            readme,
            re.compile(
                r"(?:all|every) (?:1,880|1880) (?:entries|words)"
                r"[^.\n]*(?:source|cited)",
                re.IGNORECASE,
            ),
        )

    def test_live_root_reports_exact_source_coverage_without_universal_claims(self):
        root = self.source("docs/index.html")
        for attribute in (
            'name="description"',
            'property="og:description"',
            'name="twitter:description"',
        ):
            with self.subTest(attribute=attribute):
                self.assertRegex(
                    root,
                    re.compile(
                        rf'<meta {attribute} content="[^"]*'
                        r'1,880[^"]*1,260[^"]*citable source',
                        re.IGNORECASE,
                    ),
                )

        noscript = root.split("<noscript>", 1)[1].split("</noscript>", 1)[0]
        self.assertIn("1,880", noscript)
        self.assertIn("1,260", noscript)
        self.assertNotRegex(
            root,
            re.compile(
                r"(?:each|every|all) (?:dictionary )?entr(?:y|ies)"
                r"[^.\n]*(?:source|cited)|"
                r"(?:1,880|1880) entries with cited sources",
                re.IGNORECASE,
            ),
        )

    def test_core_docs_state_one_bash_cli_three_shipped_backends_and_site_audio(self):
        readme = self.source("README.md")
        design = self.source("DESIGN.md")
        claude = self.source("CLAUDE.md")
        agent = self.source("integrations/codex/AGENTS.md")
        combined = "\n".join((readme, design, claude, agent))

        self.assertRegex(combined, re.compile(r"one Bash CLI", re.IGNORECASE))
        self.assertRegex(combined, re.compile(r"no npm runtime", re.IGNORECASE))
        self.assertRegex(combined, re.compile(r"macOS[^.\n]*\bsay\b", re.IGNORECASE))
        self.assertRegex(
            combined,
            re.compile(r"Linux[^.\n]*espeak-ng[^.\n]*espeak", re.IGNORECASE),
        )
        self.assertRegex(
            combined,
            re.compile(r"Windows[^.\n]*System\.Speech", re.IGNORECASE),
        )
        self.assertRegex(
            readme,
            re.compile(
                r"(?:committed canonical|canonical committed) MP3"
                r"[^.\n]*Web Speech[^.\n]*fallback",
                re.IGNORECASE,
            ),
        )
        self.assertRegex(agent, re.compile(r"detected OS TTS", re.IGNORECASE))

    def test_site_generator_tracks_coverage_and_omits_core_public_overclaims(self):
        source = self.source("tools/build-site.sh")
        self.assertRegex(source, r'SOURCE_COUNT="\$\(awk ')
        self.assertIn("${SOURCE_COUNT} of ${ENTRY_COUNT}", source)
        self.assertIn("a source citation when available", source)
        self.assertIn("有可靠来源时附引用", source)
        self.assertIn(
            "%d entries with IPA, respellings, and pre-rendered audio;"
            " %d source citations.",
            source,
        )
        self.assertIn('"$ENTRY_COUNT" "$SOURCE_COUNT"', source)
        for pattern in (
            r"Every entry[^.\n]*linked to a real source",
            r"Every entry[^.\n]*a citable source URL",
            r"每条(?:都)?带来源",
            r"Audio on this page is rendered by your browser's Web Speech API",
            r"在 M2/M3 路线图上",
            r"audio, IPA, and a source citation, not a phonetic guess",
            r"entries with IPA, respellings, source citations",
            r"给 IPA、附来源引用",
        ):
            with self.subTest(pattern=pattern):
                self.assertNotRegex(source, re.compile(pattern, re.IGNORECASE))

    def test_dictionary_lint_counts_citable_sources_by_source_url_only(self):
        source = self.source("tools/lint-dict.sh")
        coverage = source.split("# Source coverage", 1)[1]
        self.assertIn('if ($6 != "") srcd++', coverage)
        self.assertNotIn('$6 != "" || $7 != ""', coverage)

    def test_shell_build_slug_matches_python_contract_under_c_locale(self):
        build_script = REPO / "tools" / "build-site.sh"
        source = build_script.read_text(encoding="utf-8")
        if "--slug-for-test" not in source:
            self.fail("build-site.sh must expose its canonical slugger for parity tests")

        env = {**os.environ, "LC_ALL": "C", "LANG": "C"}
        for word, expected in (
            ("C++", "c--"),
            ("C#", "c-"),
            ("Fréchet", "fr-chet"),
            ("Jalapeño", "jalape-o"),
        ):
            with self.subTest(word=word):
                completed = subprocess.run(
                    ["bash", str(build_script), "--slug-for-test", word],
                    cwd=REPO,
                    env=env,
                    check=True,
                    capture_output=True,
                    text=True,
                )
                self.assertEqual(completed.stdout, expected + "\n")
                self.assertEqual(completed.stderr, "")

    def test_build_helpers_match_previous_oracles_for_the_whole_corpus(self):
        build_script = REPO / "tools" / "build-site.sh"
        source = build_script.read_text(encoding="utf-8")
        if "--helper-stream-for-test" not in source:
            self.fail("build-site.sh must expose pure helpers for corpus parity tests")

        values = [
            cell
            for line in self.source("data/pronunciations.tsv").splitlines()
            if line and not line.startswith("#")
            for cell in line.split("\t")
        ]
        values.extend(
            (
                "",
                "plain ASCII / safe",
                '& < > " \\',
                "&amp;",
                "café Fréchet Jalapeño",
                "IPA /ˈdʒeɪsən/ + 𝕏",
                "/ % + # = ?",
            )
        )

        def run_helper(name):
            payload = b"\0".join(value.encode("utf-8") for value in values) + b"\0"
            completed = subprocess.run(
                ["bash", str(build_script), "--helper-stream-for-test", name],
                cwd=REPO,
                env={**os.environ, "LC_ALL": "C", "LANG": "C"},
                input=payload,
                check=True,
                capture_output=True,
            )
            self.assertEqual(completed.stderr, b"")
            encoded = completed.stdout.split(b"\0")
            self.assertEqual(encoded[-1], b"")
            return [value.decode("utf-8") for value in encoded[:-1]]

        html_expected = [
            value.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
            for value in values
        ]
        json_expected = [
            value.replace("\\", "\\\\").replace('"', '\\"') for value in values
        ]
        url_expected = [urllib.parse.quote(value) for value in values]

        self.assertEqual(run_helper("html"), html_expected)
        self.assertEqual(run_helper("json"), json_expected)
        self.assertEqual(run_helper("url"), url_expected)

    def test_release_heading_and_historical_promo_asset_are_stable(self):
        changelog = self.source("CHANGELOG.md")
        self.assertTrue(
            changelog.startswith(
                "# Changelog\n\n## v2.23.1 — 2026-07-23\n"
            )
        )
        self.assertIn("## v2.23.0 — 2026-07-17", changelog)
        self.assertIn("Windows / Linux backends on the roadmap.", changelog)

        promo = (
            "https://github.com/anzy-renlab-ai/pronounce/"
            "releases/download/v2.5.0/promo.mp4"
        )
        self.assertIn(promo, self.source("README.md"))
        self.assertIn(
            "releases/download/v2.5.0/promo.mp4",
            self.source("tools/build-site.sh"),
        )


if __name__ == "__main__":
    unittest.main()
