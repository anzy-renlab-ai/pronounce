#!/usr/bin/env python3
import ast
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
        self.assertEqual(entry["alt_respelling_us"], "ghif")
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

        if shutil.which("say"):
            with tempfile.TemporaryDirectory() as audio_dir:
                primary = Path(audio_dir) / "primary.aiff"
                alternate = Path(audio_dir) / "alternate.aiff"
                for respelling, output in (
                    (entry["respelling_us"], primary),
                    (entry["alt_respelling_us"], alternate),
                ):
                    subprocess.run(
                        [
                            "say",
                            "-v",
                            "Samantha",
                            "-r",
                            "130",
                            "-o",
                            str(output),
                            f"{respelling}.",
                        ],
                        check=True,
                    )
                self.assertNotEqual(
                    primary.read_bytes(),
                    alternate.read_bytes(),
                    "GIF's alternate must produce a distinct hard-G waveform",
                )

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

    def dictionary_rows(self):
        rows = []
        for line in self.source("data/pronunciations.tsv").splitlines():
            if not line or line.startswith("#") or line.startswith("word\t"):
                continue
            cells = line.split("\t")
            if len(cells) >= 10 and cells[0] and cells[2]:
                rows.append(cells)
        return rows

    def dictionary_counts(self):
        rows = self.dictionary_rows()
        return len(rows), sum(bool(cells[5].strip()) for cells in rows)

    def dictionary_confidence_counts(self):
        rows = self.dictionary_rows()
        return (
            sum(cells[8] == "creator-clarified" for cells in rows),
            sum(cells[8] == "contested" for cells in rows),
        )

    def test_dictionary_counts_match_what_the_readme_advertises(self):
        # These were two literals, so every release that added an entry turned
        # CI red until someone edited the test — the same trap the changelog
        # heading had. The invariant worth testing is that the numbers the
        # README tells users are the numbers actually in the dictionary.
        total, sourced = self.dictionary_counts()
        self.assertGreaterEqual(total, 1900, "dictionary shrank unexpectedly")
        self.assertIn(
            f"{total:,} entries, every one confidence-tagged",
            self.source("README.md"),
        )
        self.assertIn(
            f"{sourced:,} entries carry a source link",
            self.source("README.md"),
        )

    def test_v224_ai_company_rows(self):
        expected = {
            "simile": (
                "/ˈsɪ mə li/",
                "SIM uh lee",
                "",
                "",
                "https://www.youtube.com/watch?v=_7FuglsjhbM&t=26s",
                "Joon Sung Park @ Bloomberg Technology (0:26)",
                "project",
                "creator-clarified",
            ),
            "qualiki": (
                "/ˈkwɑː lə kiː/",
                "KWAH luh key",
                "",
                "",
                "https://www.linkedin.com/posts/qualiki_ever-wondered-how-to-pronounce-our-name-activity-7476337222900875264-Kcui",
                "QualiKI official pronunciation post",
                "project",
                "creator-clarified",
            ),
            "kugelaudio": (
                "/ˈkuː ɡəl ˌɔː di oʊ/",
                "KOO gull audio",
                "",
                "",
                "https://www.youtube.com/watch?v=fEBxXqWpUMA&t=15s",
                "Viktor Presber @ The Parameter (0:15)",
                "project",
                "creator-clarified",
            ),
            "gradium": (
                "/ˈɡreɪ di əm/",
                "GRAY dee um",
                "",
                "",
                "https://www.youtube.com/watch?v=qaaaXWs_bMg&t=6s",
                "Neil Zeghidour @ Gradium AI (0:06)",
                "project",
                "creator-clarified",
            ),
        }
        rows = {}
        for line in self.source("data/pronunciations.tsv").splitlines():
            if not line or line.startswith("#") or line.startswith("word\t"):
                continue
            cells = line.split("\t")
            rows[cells[0].lower()] = cells

        for word, contract in expected.items():
            with self.subTest(word=word):
                self.assertIn(word, rows)
                self.assertEqual(tuple(rows[word][1:9]), contract)
                self.assertTrue(rows[word][5].startswith("https://"))

        self.assertEqual(rows["simile"][3], "")
        self.assertEqual(rows["simile"][4], "")
        self.assertEqual(rows["simile"][0], "Simile")

    def test_v225_neolab_rows(self):
        expected = {
            "neo lab": (
                "/ˈniːoʊ læb/",
                "NEE oh lab",
                "",
                "",
                "https://dictionary.cambridge.org/us/pronunciation/english/neo",
                "Cambridge English — neo- (US /niː.oʊ-/)",
                "project",
                "community-consensus",
            ),
            "neocognition": (
                "/ˌniːoʊ kɑːɡˈnɪʃən/",
                "NEE oh kog NISH un",
                "",
                "",
                "https://www.youtube.com/watch?v=VRWrA_KhHwU&t=464s",
                "Yu Su @ Berkeley RDI (7:44)",
                "project",
                "creator-clarified",
            ),
            "andon": (
                "/ˈændən/",
                "AN dun",
                "",
                "",
                "https://www.youtube.com/watch?v=cO8qC6HBuBg&t=15s",
                "Lukas Petersson @ AI Engineer (0:15)",
                "project",
                "creator-clarified",
            ),
            "taide": (
                "/ˈtaɪ də/",
                "tie duh",
                "",
                "",
                "https://www.youtube.com/watch?v=c-nWFyYP0QU&t=2585s",
                "Tsai Tzong-Han @ TFC (43:05)",
                "project",
                "creator-clarified",
            ),
            "gigaai": (
                "/ˈɡɪɡə ˌeɪ ˈaɪ/",
                "GIG uh A I",
                "/ˈdʒɪɡə ˌeɪ ˈaɪ/",
                "JIG uh A I",
                "https://www.merriam-webster.com/dictionary/giga-",
                "Merriam-Webster — giga- (hard-G and soft-G)",
                "project",
                "contested",
            ),
        }
        rows = {}
        for line in self.source("data/pronunciations.tsv").splitlines():
            if not line or line.startswith("#") or line.startswith("word\t"):
                continue
            cells = line.split("\t")
            rows[cells[0].lower()] = cells

        for word, contract in expected.items():
            with self.subTest(word=word):
                self.assertIn(word, rows)
                self.assertEqual(tuple(rows[word][1:9]), contract)
                self.assertTrue(rows[word][5].startswith("https://"))

    def test_v226_persona_affective_and_world_model_rows(self):
        expected = {
            "persona": ("/pɚˈsoʊnə/", "per soh nuh", "", "", "cs-term"),
            "affect": ("/ˈæfɛkt/", "AFF ekt", "/əˈfɛkt/", "uh FEKT", "cs-term"),
            "affective": ("/əˈfɛktɪv/", "uh FEK tiv", "", "", "cs-term"),
            "anthropomorphism": (
                "/ˌænθrəpəˈmɔːrfɪzəm/",
                "an thruh puh MOR fiz um",
                "",
                "",
                "cs-term",
            ),
            "prosody": (
                "/ˈprɑːsədi/",
                "PRAH suh dee",
                "/ˈprɑːzədi/",
                "PRAH zuh dee",
                "cs-term",
            ),
            "valence": ("/ˈveɪləns/", "vay luns", "", "", "cs-term"),
            "arousal": ("/əˈraʊzəl/", "uh rouse uhl", "", "", "cs-term"),
            "interoception": (
                "/ˌɪntəroʊˈsɛpʃən/",
                "in ter oh SEP shun",
                "",
                "",
                "cs-term",
            ),
            "alexithymia": (
                "/əˌlɛksɪˈθaɪmiə/",
                "uh lek sih THIGH mee uh",
                "/eɪˌlɛksəˈθaɪmiə/",
                "ay lek suh THIGH mee uh",
                "cs-term",
            ),
            "affordance": ("/əˈfɔːrdəns/", "uh FOR dunce", "", "", "cs-term"),
            "homeostasis": (
                "/ˌhoʊmioʊˈsteɪsɪs/",
                "hoh mee oh STAY sis",
                "",
                "",
                "cs-term",
            ),
            "enactivism": (
                "/ɪˈnæktɪvɪzəm/",
                "ih NAK tih viz um",
                "",
                "",
                "cs-term",
            ),
            "autopoiesis": (
                "/ˌɔːtoʊpɔɪˈiːsɪs/",
                "aw toh poy EE sis",
                "",
                "",
                "cs-term",
            ),
            "Genie 3": ("/ˈdʒiːni ˈθriː/", "jee nee three", "", "", "product"),
            "Marble": ("/ˈmɑːrbəl/", "mar bul", "", "", "product"),
        }

        for word, contract in expected.items():
            with self.subTest(word=word):
                entry = self.dictionary_entry(word)
                self.assertEqual(
                    (
                        entry["ipa"],
                        entry["respelling_us"],
                        entry["alt_ipa"],
                        entry["alt_respelling_us"],
                        entry["category"],
                    ),
                    contract,
                )
                self.assertTrue(entry["source_url"].startswith("https://"))
                self.assertEqual(entry["confidence"], "community-consensus")

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

    def test_readme_leads_with_confidence_tags_and_calls_source_links_links(self):
        # Until 2026-11-26 the README led with "N entries — M carry a citable
        # source". About half of those M links were a project's home page, so
        # the owner had the headline changed: every entry has a tag, and a link
        # is reported as a link.
        readme = self.source("README.md")
        total, sourced = self.dictionary_counts()
        self.assertIn(f"{total:,} entries, every one confidence-tagged", readme)
        self.assertIn(f"{sourced:,} entries carry a source link", readme)
        self.assertIn("home page", readme.split("entries carry a source link", 1)[1][:160])
        for phrase in (
            "carry a citable source",
            "with a cited source",
            "with citable sources",
            "creator-sourced",
        ):
            with self.subTest(phrase=phrase):
                self.assertNotIn(phrase, readme)
        self.assertNotRegex(readme, re.compile(r"(?<!un)[ \-]sourced entries", re.IGNORECASE))
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
                r"(?:all|every) \d[\d,]* (?:entries|words)"
                r"[^.\n]*(?:source|cited)",
                re.IGNORECASE,
            ),
        )

    def test_vscode_count_sync_does_not_overwrite_source_coverage(self):
        # Expected numbers come from the dictionary: literals here went stale on
        # 2026-11-24 (the extension copy still said 1903 / 1283 / 108) while the
        # test stayed green.
        total, sourced = self.dictionary_counts()
        creator, _ = self.dictionary_confidence_counts()

        builder = self.source("integrations/vscode/scripts/build-dict.mjs")
        synchronizer = self.source("integrations/vscode/scripts/count-sync.mjs")
        self.assertNotIn("(?:[ \\-]sourced)?", synchronizer)
        self.assertIn("confidence[ \\-]tagged", synchronizer)
        self.assertIn("const SOURCE_COUNT =", builder)
        self.assertIn("const CREATOR_COUNT =", builder)
        self.assertIn("const CONTESTED_COUNT =", builder)
        self.assertIn("syncCountText(text", builder)

        zh = self.source("integrations/vscode/package.nls.zh-cn.json")
        self.assertIn(
            f"{total} 条发音词条，每条都标了置信度，其中 {creator} 条为作者确认", zh
        )
        self.assertNotIn(f"{total} 条带来源", zh)
        self.assertNotIn("带来源引用", zh)

        package = self.source("integrations/vscode/package.json")
        walkthrough = self.source("integrations/vscode/media/walkthrough-star.md")
        self.assertIn("Browse all confidence-tagged entries", package)
        self.assertIn(f"{total:,} entries, every one confidence-tagged", walkthrough)
        self.assertNotIn("citable source", walkthrough)
        self.assertIn(f"dictionary-{total}%20entries", package)
        self.assertNotIn("Every entry has a source citation", walkthrough)

    def test_committed_daily_page_keeps_its_original_word_selection(self):
        daily = self.source("docs/daily/2026-06-15.html")
        self.assertIn("pronunciation of the day: UXE", daily)
        self.assertIn("/word/uxe", daily)

        generator = self.source("tools/build-site.sh")
        self.assertIn("existing_daily_slug", generator)

    def test_stats_contributor_output_does_not_drift_on_every_commit(self):
        generator = self.source("tools/build-site.sh")
        stats = self.source("docs/stats.html")
        self.assertNotIn('"commits":%d', generator)
        self.assertNotIn('"commits":', stats)

    def test_live_root_reports_the_total_and_the_tag_not_a_count_of_source_links(self):
        # The root page is hand-maintained and no build rewrites its numbers, so
        # the literals this test used to pin went stale with the page: on
        # 2026-11-24 the meta descriptions and noscript block still said
        #1,903 / 1,283 against a dictionary of 1,979 / 1,322. Since 2026-11-26
        # the page states the total and the confidence tag, and no count of
        # source links: about half of those links are a project's home page.
        total, sourced = self.dictionary_counts()
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
                        rf'{total:,}[^"]*confidence tag',
                        re.IGNORECASE,
                    ),
                )

        noscript = root.split("<noscript>", 1)[1].split("</noscript>", 1)[0]
        self.assertIn(f"{total:,}", noscript)
        self.assertIn("confidence tag", noscript)
        self.assertNotIn(f"{sourced:,}", root)
        quoted_totals = set(
            re.findall(r"\b(\d,\d{3})(?= (?:project|tech|entries))", root)
        )
        self.assertEqual(quoted_totals, {f"{total:,}"}, "root page quotes a stale entry total")
        self.assertNotRegex(
            root,
            re.compile(
                r"(?:each|every|all) (?:dictionary )?entr(?:y|ies)"
                r"[^.\n]*(?:source|cited)|"
                r"\d[\d,]* entries with cited sources",
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
        # Since 2026-11-26 no page counts "citable" or "cited" sources: about
        # half of the source links are a project's home page. A link is a link.
        self.assertIn("Every one of ${ENTRY_COUNT} entries confidence-tagged", source)
        self.assertNotIn("${SOURCE_COUNT} of ${ENTRY_COUNT}", source)
        self.assertIn("a source citation when available", source)
        self.assertIn("有可靠来源时附引用", source)
        self.assertIn(
            "%d entries with IPA, respellings, pre-rendered audio and a"
            " confidence tag; %d carry a source link.",
            source,
        )
        self.assertIn('"$ENTRY_COUNT" "$SOURCE_COUNT"', source)
        for pattern in (
            r"Every entry[^.\n]*linked to a real source",
            r"Every entry[^.\n]*a citable source URL",
            r"每条(?:都)?带来源",
            r"每条都标注来源",
            r"条带来源引用",
            r"条带可引用来源",
            r"条词条带来源",
            r"have cited sources",
            r"with cited sources",
            r"source citations",
            r"Audio on this page is rendered by your browser's Web Speech API",
            r"在 M2/M3 路线图上",
            r"audio, IPA, and a source citation, not a phonetic guess",
            r"entries with IPA, respellings, source citations",
            r"给 IPA、附来源引用",
        ):
            with self.subTest(pattern=pattern):
                self.assertNotRegex(source, re.compile(pattern, re.IGNORECASE))

    def test_chinese_landing_leads_with_the_new_model_names(self):
        # The owner's rule of 2026-11-26: the first name on the page is a newly
        # coined model name, never kubectl. The page had "kubectl 到底怎么读？"
        # as its headline and cycled kubectl first.
        source = self.source("tools/build-site.sh")
        self.assertIn('<code id="hero-cycle" class="hero-cycle" data-cycle="Gemini 4 Neon|', source)
        self.assertIn('class="hero-cycle" data-cycle="Gemini 4 Neon|Gemini 4 Carbon|', source.split("到底怎么读")[0][-400:])
        self.assertNotIn('class="hero-cycle">kubectl</code><br>到底怎么读', source)
        self.assertIn("<title>Gemini 4 Neon、Carbon 怎么读", source)
        self.assertIn("每条标了置信度", source)
        self.assertIn("el.dataset.cycle", source)

        # The same rule holds for everything a visitor reads first: the star
        # banner above the headline, the first command of the terminal sample,
        # and the titles a chat app shows next to the link card.
        self.assertIn('这词典帮你少念错一次 "Gemini 4 Neon"', source)
        self.assertIn(
            '<meta property="og:title" content="Gemini 4 Neon、Carbon 怎么读 — ${BRAND}">',
            source,
        )
        self.assertIn(
            '<meta name="twitter:title" content="Gemini 4 Neon、Carbon 怎么读">', source
        )
        demos = re.findall(r'<pre class="demo">(.*?)</pre>', source, re.DOTALL)
        chinese = [block for block in demos if "或读" in block]
        self.assertEqual(len(chinese), 1, "the Chinese landing has no terminal sample")
        first_command = chinese[0].strip().split("\n", 1)[0]
        self.assertIn('say-it "Gemini 4 Carbon"', first_command)
        self.assertNotIn("kubectl", first_command)
        # kubectl is contested and the CLI chains its two alternates, so it is
        # neither "the correct reading" nor done in four seconds (measured 8.6 s).
        self.assertNotIn("把正确读法播三遍", source)
        self.assertNotIn("可引用的来源", source)

    def test_link_cards_lead_with_the_new_model_names(self):
        # The root page's card title and the card and demo generators share the
        # lead. On 2026-11-26 the card image said Gemini 4 Neon while the title
        # beside it said "how to say kubectl", and the demo opened on kubectl.
        root = self.source("docs/index.html")
        for attribute in ('property="og:title"', 'name="twitter:title"', "<title>"):
            with self.subTest(attribute=attribute):
                self.assertRegex(
                    root,
                    re.compile(
                        rf'<meta {attribute} content="[^"]*Gemini 4 Neon' if attribute != "<title>"
                        else r"<title>[^<]*Gemini 4 Neon",
                        re.IGNORECASE,
                    ),
                )
        card = self.source("tools/make-og.py")
        self.assertIn('LEAD = "Gemini 4 Neon"', card)
        demo = self.source("tools/make-demo.py")
        self.assertIn('LEAD = "Gemini 4 Carbon"', demo)
        main = demo.split("def main(", 1)[1]
        self.assertLess(
            main.index("render_frame_lead("),
            main.index("render_frame_contested("),
            "the demo opens on the contested word instead of the new model name",
        )

    def test_first_run_works_on_a_stock_mac(self):
        # The installer writes ~/.local/bin, which a stock Mac does not keep on
        # PATH, and until 2026-11-26 it only said so in prose. The README's
        # "Try it in 30 seconds" block went straight on to `say-it`, so a reader
        # who pasted it met "command not found". The same block now carries the
        # line that fixes it, and the installer prints that line.
        readme = self.source("README.md")
        quick = readme.split("## 🚀 Try it in 30 seconds", 1)[1].split("![", 1)[0]
        blocks = re.findall(r"```bash\n(.*?)```", quick, re.DOTALL)
        self.assertGreaterEqual(len(blocks), 2, "the quick-start blocks are gone")
        export_line = 'export PATH="$HOME/.local/bin:$PATH"'
        for block in blocks:
            with self.subTest(block=block.splitlines()[0]):
                lines = block.splitlines()
                positions = [i for i, line in enumerate(lines) if line.startswith(export_line)]
                self.assertEqual(len(positions), 1, f"{export_line} is missing from the block")
                self.assertLess(
                    positions[0],
                    next(i for i, line in enumerate(lines) if line.startswith('say-it "')),
                )
                self.assertTrue(lines[-1].startswith('say-it "Gemini 4 '), lines[-1])

        installer = self.source("install.sh")
        self.assertRegex(installer, r'echo "  export PATH=\\"\$PREFIX/bin:\\\$PATH\\""')
        # The first command the installer suggests is a new model name, not kubectl.
        self.assertRegex(installer, r'Try:"\necho "  say-it \\"Gemini 4 ')

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
        cases = [
            ("C++", "c--"),
            ("C#", "c-"),
            ("éö", "--"),
        ]
        for line in self.source("data/pronunciations.tsv").splitlines():
            if line.startswith("#") or line.startswith("word\t") or not line:
                continue
            word = line.split("\t", 1)[0]
            if not word.isascii():
                cases.append(
                    (word, re.sub(r"[^a-z0-9._-]", "-", word.lower()))
                )

        self.assertGreaterEqual(len(cases), 5)
        for word, expected in cases:
            with self.subTest(word=word):
                completed = subprocess.run(
                    ["bash", str(build_script), "--slug-for-test", word],
                    cwd=REPO,
                    env=env,
                    check=False,
                    capture_output=True,
                    text=True,
                )
                self.assertEqual(
                    completed.returncode,
                    0,
                    completed.stderr or completed.stdout,
                )
                self.assertEqual(completed.stdout, expected + "\n")
                self.assertEqual(completed.stderr, "")

    def test_atom_feed_timestamp_tracks_latest_entry_modification(self):
        build_script = REPO / "tools" / "build-site.sh"
        source = build_script.read_text(encoding="utf-8")
        if "--feed-timestamp-for-test" not in source:
            self.fail("build-site.sh must expose its stable Atom timestamp")

        modified_dates = []
        for line in self.source("data/entry-dates.tsv").splitlines():
            if line.startswith("#") or not line:
                continue
            cells = line.split("\t")
            modified_dates.append(cells[2])
        expected = max(modified_dates) + "T00:00:00Z\n"

        completed = subprocess.run(
            ["bash", str(build_script), "--feed-timestamp-for-test"],
            cwd=REPO,
            check=True,
            capture_output=True,
            text=True,
        )
        self.assertEqual(completed.stdout, expected)
        self.assertEqual(completed.stderr, "")
        self.assertNotIn("date -u +%Y-%m-%dT%H:%M:%SZ", source)

    def test_build_workflow_commits_entry_date_state_with_site_outputs(self):
        workflow = self.source(".github/workflows/build-site.yml")
        self.assertIn(
            "git status --porcelain -- docs/ data/entry-dates.tsv",
            workflow,
        )
        self.assertIn("git add docs/ data/entry-dates.tsv", workflow)

    def test_build_helpers_match_previous_oracles_for_the_whole_corpus(self):
        build_script = REPO / "tools" / "build-site.sh"
        source = build_script.read_text(encoding="utf-8")
        if "--helper-stream-for-test" not in source:
            self.fail("build-site.sh must expose pure helpers for corpus parity tests")
        self.assertIn(
            "shopt -u patsub_replacement",
            source,
            "Bash 5.2 must not expand '&' inside HTML replacement strings",
        )

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
                "a" * 299 + "é" + " must be truncated without splitting UTF-8",
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
        self.assertEqual(run_helper("truncate-300"), [value[:300] for value in values])

    def test_release_heading_and_historical_promo_asset_are_stable(self):
        changelog = self.source("CHANGELOG.md")
        manifest_version = json.loads(self.source(".codex-plugin/plugin.json"))["version"]
        lines = changelog.splitlines()
        self.assertEqual(lines[0], "# Changelog")
        self.assertEqual(lines[1], "")
        # Shape first, then agreement with the manifest. Pinning the literal
        # version here meant every commit that opened a new changelog section
        # failed CI until the release step rewrote this line — red builds that
        # said nothing about the code and trained everyone to ignore CI.
        self.assertRegex(lines[2], r"^## v\d+\.\d+\.\d+ — \d{4}-\d{2}-\d{2}$")
        self.assertEqual(
            lines[2].split()[1],
            "v" + manifest_version,
            "CHANGELOG top heading and .codex-plugin/plugin.json disagree",
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

    def test_word_pages_offer_readme_safe_badges(self):
        generator = self.source("tools/build-site.sh")
        self.assertIn("Add a pronunciation badge to your README", generator)
        self.assertIn("$SITE_URL/badge/$slug.svg", generator)
        self.assertIn("$SITE_URL/word/$slug", generator)
        self.assertIn("Markdown badge copied", generator)

    def test_marketplace_badges_use_live_static_shields_endpoints(self):
        readmes = "\n".join(
            (self.source("README.md"), self.source("integrations/vscode/README.md"))
        )
        for retired in (
            "img.shields.io/visual-studio-marketplace/",
            "img.shields.io/open-vsx/",
        ):
            self.assertNotIn(retired, readmes)
        self.assertIn("VS_Code_Marketplace-install", readmes)
        self.assertIn("Open_VSX-install", readmes)

    def dictionary_rows_by_lowercased_word(self):
        rows = {}
        for line in self.source("data/pronunciations.tsv").splitlines():
            cells = line.split("\t")
            if len(cells) == 10 and not line.startswith("#") and cells[0] != "word":
                rows.setdefault(cells[0].lower(), []).append(cells)
        return rows

    def test_hand_picked_settled_lists_name_creator_clarified_rows(self):
        # The README table and the scoreboard star list both promise "the creator
        # said so". On 2026-11-24 they still showcased TOML and awk after the rows
        # behind them were downgraded, because nothing tied either list to the tag.
        rows = self.dictionary_rows_by_lowercased_word()

        readme = self.source("README.md")
        section = readme[readme.index("### ✅ Settled — the creator said so"):]
        section = section[: section.index("### ⚔️")]
        showcased = re.findall(r"^\| \*\*\[([^\]]+)\]\(https://pronounce\.renlab\.ai/word/", section, flags=re.M)
        self.assertGreaterEqual(len(showcased), 6, "README settled table lost its rows")

        spec = importlib.util.spec_from_file_location(
            "build_scoreboard_under_test", REPO / "tools" / "build-scoreboard.py"
        )
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        stars = module.SETTLED_STARS

        for source, names in (("README settled table", showcased), ("SETTLED_STARS", stars)):
            for name in names:
                with self.subTest(list=source, word=name):
                    matches = rows[name.lower()]
                    self.assertEqual(len(matches), 1, f"{name} is not exactly one dictionary row")
                    self.assertEqual(
                        matches[0][8],
                        "creator-clarified",
                        f"{source} showcases {name}, but the row is tagged {matches[0][8]}",
                    )

    def receipts_cards(self):
        page = self.source("docs/receipts.html")
        block = page[page.index("const RECEIPTS = ["):]
        block = block[: block.index("];")]
        cards = []
        for line in block.splitlines()[1:]:
            line = line.strip()
            if line.startswith("["):
                # one JS array of single-quoted strings per line; the same literal syntax as Python's
                cards.append(ast.literal_eval(line.rstrip(",")))
        return cards

    def test_receipts_cards_match_their_dictionary_rows(self):
        # Every card shows its quote inside quotation marks, so the quote has to be
        # on the page the card links to. On 2026-11-24 none of the 21 was. Whether a
        # quote is verbatim needs the network and is checked when a card is edited;
        # everything that can be compared offline is compared here.
        cards = self.receipts_cards()
        self.assertGreaterEqual(len(cards), 20, 'the page promises "20+ entries have a direct citation"')
        self.assertIn('<span class="stat">20+ entries</span>', self.source("docs/receipts.html"))
        for card in cards:
            self.assertEqual(len(card), 6, card)
            word, reading, ipa, quote, label, url = card
            with self.subTest(word=word):
                entry = self.dictionary_entry(word)
                self.assertEqual(entry["respelling_us"], reading)
                self.assertEqual(entry["ipa"], ipa)
                self.assertEqual(entry["source_label"], label)
                self.assertEqual(entry["source_url"], url)
                self.assertNotEqual(url, "")
                self.assertGreaterEqual(len(quote), 20)
                # the card template wraps every quote in quotation marks; the quote itself must not carry its own
                self.assertFalse(quote[0] == quote[-1] and quote[0] in "\"'“", f"{word}: quote carries its own quotation marks")


if __name__ == "__main__":
    unittest.main()
