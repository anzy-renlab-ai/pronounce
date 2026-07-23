#!/usr/bin/env python3
import importlib.util
import shutil
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).with_name("build-v2-data.py")


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


if __name__ == "__main__":
    unittest.main()
