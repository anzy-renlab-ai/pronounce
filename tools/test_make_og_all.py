#!/usr/bin/env python3
from __future__ import annotations

import copy
import importlib.util
import io
import json
import re
import shutil
import sys
import tempfile
import time
import unittest
from pathlib import Path
from unittest import mock


SCRIPT = Path(__file__).with_name("make-og-all.py")
ENTRY = {
    "word": "Example",
    "ipa": "/ɪɡˈzæmpəl/",
    "respelling_us": "ig ZAM pull",
    "alt_ipa": "/alt/",
    "alt_respelling_us": "egg sample|example",
    "source_url": "https://example.com",
    "source_label": "Example source",
    "category": "term",
    "confidence": "community-consensus",
    "notes": "not rendered",
}
VISIBLE_FIELDS = (
    "word",
    "ipa",
    "respelling_us",
    "alt_respelling_us",
    "source_label",
    "category",
    "confidence",
)


def import_script(path: Path = SCRIPT, module_name: str = "make_og_all_under_test"):
    spec = importlib.util.spec_from_file_location(module_name, path)
    module = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(module)
    return module


class CoreContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = import_script()

    def helper(self, name):
        value = getattr(self.module, name, None)
        self.assertTrue(callable(value), f"{name} must be importable")
        return value

    def test_import_is_safe_without_pillow_or_output_directory_mutation(self):
        with tempfile.TemporaryDirectory() as tmp:
            repo = Path(tmp)
            (repo / "tools").mkdir()
            copied = repo / "tools" / SCRIPT.name
            shutil.copyfile(SCRIPT, copied)

            with mock.patch.dict(
                sys.modules,
                {"PIL": None, "PIL.Image": None, "PIL.ImageDraw": None, "PIL.ImageFont": None},
            ):
                import_script(copied, "make_og_all_import_safety")

            self.assertFalse((repo / "docs").exists())

    def test_load_entries_preserves_raw_columns_and_skips_comments_and_header(self):
        load_entries = self.helper("load_entries")
        with tempfile.TemporaryDirectory() as tmp:
            dictionary = Path(tmp) / "pronunciations.tsv"
            dictionary.write_text(
                "# comment\n"
                "\n"
                "word\tipa\trespelling_us\talt_ipa\talt_respelling_us\t"
                "source_url\tsource_label\tcategory\tconfidence\tnotes\n"
                "Example\t/ipa/\tresp\t/alt/\talt resp\thttps://example.com\t"
                "Source\tterm\tcontested\tnote\n"
                "TooShort\tonly-two\n",
                encoding="utf-8",
            )

            self.assertEqual(
                load_entries(dictionary),
                [
                    {
                        "word": "Example",
                        "ipa": "/ipa/",
                        "respelling_us": "resp",
                        "alt_ipa": "/alt/",
                        "alt_respelling_us": "alt resp",
                        "source_url": "https://example.com",
                        "source_label": "Source",
                        "category": "term",
                        "confidence": "contested",
                        "notes": "note",
                    }
                ],
            )

    def test_index_entries_rejects_duplicate_slug_before_returning_an_index(self):
        index_entries = self.helper("index_entries")
        with self.assertRaisesRegex(ValueError, "duplicate.*c-"):
            index_entries(
                [
                    {**ENTRY, "word": "C#"},
                    {**ENTRY, "word": "C@"},
                ]
            )

    def test_card_stamp_covers_every_raw_visible_field_renderer_and_render_spec(self):
        card_stamp = self.helper("card_stamp")
        render_spec = {"canvas": [1200, 630], "save": {"format": "PNG"}}
        baseline = card_stamp(ENTRY, renderer_version=1, render_spec=render_spec)

        for field in VISIBLE_FIELDS:
            changed = dict(ENTRY)
            changed[field] += " changed"
            with self.subTest(field=field):
                self.assertNotEqual(
                    card_stamp(
                        changed,
                        renderer_version=1,
                        render_spec=render_spec,
                    ),
                    baseline,
                )

        nonrendered = dict(ENTRY)
        nonrendered["notes"] += " changed"
        self.assertEqual(
            card_stamp(
                nonrendered,
                renderer_version=1,
                render_spec=render_spec,
            ),
            baseline,
        )
        self.assertNotEqual(
            card_stamp(ENTRY, renderer_version=2, render_spec=render_spec),
            baseline,
        )
        self.assertNotEqual(
            card_stamp(
                ENTRY,
                renderer_version=1,
                render_spec={"canvas": [1200, 631], "save": {"format": "PNG"}},
            ),
            baseline,
        )

    def test_default_renderer_contract_is_numeric_one(self):
        self.assertIs(type(self.module.RENDERER_VERSION), int)
        self.assertEqual(self.module.RENDERER_VERSION, 1)

    def test_manifest_loader_is_strict_or_lenient_about_exact_shape_and_versions(self):
        load_manifest = self.helper("load_manifest")
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "manifest.json"
            valid = {"schema": 7, "renderer": 3, "cards": {"example": "x"}}
            path.write_text(json.dumps(valid), encoding="utf-8")
            self.assertEqual(
                load_manifest(
                    path,
                    strict=True,
                    schema_version=7,
                    renderer_version=3,
                ),
                valid,
            )

            invalid_documents = (
                "{",
                json.dumps({**valid, "extra": True}),
                json.dumps({"schema": 8, "renderer": 3, "cards": {}}),
                json.dumps({"schema": 7, "renderer": 4, "cards": {}}),
                json.dumps({"schema": 7, "renderer": "3", "cards": {}}),
                json.dumps({"schema": 7, "renderer": 3.0, "cards": {}}),
                json.dumps({"schema": 7, "renderer": True, "cards": {}}),
                json.dumps({"schema": 7, "renderer": 3, "cards": []}),
                json.dumps(
                    {"schema": 7, "renderer": 3, "cards": {"example": 1}}
                ),
            )
            for document in invalid_documents:
                with self.subTest(document=document):
                    path.write_text(document, encoding="utf-8")
                    with self.assertRaises(ValueError):
                        load_manifest(
                            path,
                            strict=True,
                            schema_version=7,
                            renderer_version=3,
                        )
                    self.assertIsNone(
                        load_manifest(
                            path,
                            strict=False,
                            schema_version=7,
                            renderer_version=3,
                        )
                    )

            path.unlink()
            with self.assertRaises(ValueError):
                load_manifest(
                    path,
                    strict=True,
                    schema_version=7,
                    renderer_version=3,
                )
            self.assertIsNone(
                load_manifest(
                    path,
                    strict=False,
                    schema_version=7,
                    renderer_version=3,
                )
            )

    def test_atomic_manifest_writer_has_stable_bytes_and_true_noop(self):
        write_manifest_atomic = self.helper("write_manifest_atomic")
        manifest = {
            "schema": 1,
            "renderer": 1,
            "cards": {"z": "last", "a": "first"},
        }
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / "nested" / "manifest.json"
            self.assertTrue(write_manifest_atomic(path, manifest))
            first_bytes = path.read_bytes()
            first_stat = path.stat()
            time.sleep(0.01)
            self.assertFalse(write_manifest_atomic(path, manifest))
            second_stat = path.stat()

            self.assertEqual(path.read_bytes(), first_bytes)
            self.assertEqual(second_stat.st_mtime_ns, first_stat.st_mtime_ns)
            self.assertEqual(
                set(json.loads(first_bytes)),
                {"schema", "renderer", "cards"},
            )
            self.assertFalse(
                any(
                    child.name.startswith(f".{path.name}.")
                    for child in path.parent.iterdir()
                )
            )

    def test_valid_png_requires_a_nonempty_regular_file(self):
        valid_png = self.helper("valid_png")
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            missing = root / "missing.png"
            empty = root / "empty.png"
            directory = root / "directory.png"
            populated = root / "populated.png"
            symlink = root / "symlink.png"
            empty.touch()
            directory.mkdir()
            populated.write_bytes(b"x")
            symlink.symlink_to(populated)

            self.assertFalse(valid_png(missing))
            self.assertFalse(valid_png(empty))
            self.assertFalse(valid_png(directory))
            self.assertTrue(valid_png(populated))
            self.assertFalse(valid_png(symlink))


class StateMachineTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = import_script(SCRIPT, "make_og_all_state_tests")

    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.root = Path(self.temp_dir.name)
        self.out_dir = self.root / "docs" / "og"
        self.manifest_path = self.out_dir / "manifest.json"

    def tearDown(self):
        self.temp_dir.cleanup()

    def entry(self, word="Example", **changes):
        return {**ENTRY, "word": word, **changes}

    def manifest_for(
        self,
        entries,
        *,
        renderer_version=None,
        render_spec=None,
    ):
        if renderer_version is None:
            renderer_version = self.module.RENDERER_VERSION
        render_spec = render_spec or self.module.RENDER_SPEC
        indexed = self.module.index_entries(entries)
        cards = {}
        for slug in sorted(indexed):
            cards[slug] = self.module.card_stamp(
                indexed[slug],
                renderer_version=renderer_version,
                render_spec=render_spec,
            )
        return {
            "schema": self.module.SCHEMA_VERSION,
            "renderer": renderer_version,
            "cards": cards,
        }

    def install_current_state(self, entries):
        self.out_dir.mkdir(parents=True)
        for entry in entries:
            (self.out_dir / f"{self.module.slugify(entry['word'])}.png").write_bytes(
                f"existing:{entry['word']}".encode()
            )
        manifest = self.manifest_for(entries)
        self.module.write_manifest_atomic(self.manifest_path, manifest)
        return manifest

    @staticmethod
    def snapshot_tree(root):
        if not root.exists():
            return None
        return {
            path.relative_to(root).as_posix(): (
                path.is_file(),
                path.read_bytes() if path.is_file() else None,
                path.stat().st_mtime_ns,
            )
            for path in sorted(root.rglob("*"))
        }

    def test_current_sync_is_a_true_noop_and_never_calls_renderer_factory(self):
        entries = [self.entry()]
        self.install_current_state(entries)
        before = self.snapshot_tree(self.root)
        factory = mock.Mock(side_effect=AssertionError("Pillow must remain lazy"))

        result = self.module.sync_cards(
            entries,
            out_dir=self.out_dir,
            manifest_path=self.manifest_path,
            renderer_factory=factory,
        )

        self.assertEqual((result.rendered, result.current), (0, 1))
        factory.assert_not_called()
        self.assertEqual(self.snapshot_tree(self.root), before)

    def test_stale_missing_card_uses_lazy_pillow_factory_once(self):
        entry = self.entry()
        self.install_current_state([entry])
        (self.out_dir / "example.png").unlink()
        changed_spec = copy.deepcopy(self.module.RENDER_SPEC)
        changed_spec["palette"]["accent"] = [9, 8, 7]
        rendered_paths = []

        def fake_renderer(rendered_entry, output_path):
            self.assertEqual(rendered_entry, entry)
            rendered_paths.append(Path(output_path))
            Path(output_path).write_bytes(b"factory png")

        factory = mock.Mock(return_value=fake_renderer)
        with mock.patch.object(self.module, "create_pillow_renderer", factory):
            result = self.module.sync_cards(
                [entry],
                out_dir=self.out_dir,
                manifest_path=self.manifest_path,
                render_spec=changed_spec,
            )

        self.assertEqual((result.rendered, result.current), (1, 0))
        factory.assert_called_once_with(changed_spec)
        self.assertEqual(len(rendered_paths), 1)
        self.assertFalse(rendered_paths[0].exists())
        self.assertEqual(
            (self.out_dir / "example.png").read_bytes(),
            b"factory png",
        )
        self.assertEqual(
            json.loads(self.manifest_path.read_text(encoding="utf-8")),
            self.manifest_for([entry], render_spec=changed_spec),
        )

    def test_missing_or_empty_png_is_rendered_via_a_temporary_path(self):
        for original in ("missing", "empty"):
            with self.subTest(original=original):
                with tempfile.TemporaryDirectory() as tmp:
                    out_dir = Path(tmp) / "og"
                    manifest_path = out_dir / "manifest.json"
                    out_dir.mkdir()
                    entry = self.entry()
                    final_path = out_dir / "example.png"
                    if original == "empty":
                        final_path.touch()
                    self.module.write_manifest_atomic(
                        manifest_path, self.manifest_for([entry])
                    )
                    seen_paths = []

                    def renderer(rendered_entry, output_path):
                        self.assertEqual(rendered_entry, entry)
                        seen_paths.append(Path(output_path))
                        self.assertNotEqual(Path(output_path), final_path)
                        Path(output_path).write_bytes(b"new png")

                    result = self.module.sync_cards(
                        [entry],
                        out_dir=out_dir,
                        manifest_path=manifest_path,
                        renderer=renderer,
                    )

                    self.assertEqual((result.rendered, result.current), (1, 0))
                    self.assertEqual(final_path.read_bytes(), b"new png")
                    self.assertEqual(len(seen_paths), 1)
                    self.assertFalse(seen_paths[0].exists())

    def test_first_run_renders_with_output_directory_and_manifest_absent(self):
        entry = self.entry()
        calls = []

        def renderer(rendered_entry, output_path):
            calls.append(rendered_entry["word"])
            Path(output_path).write_bytes(b"first png")

        result = self.module.sync_cards(
            [entry],
            out_dir=self.out_dir,
            manifest_path=self.manifest_path,
            renderer=renderer,
        )

        self.assertEqual((result.rendered, result.current), (1, 0))
        self.assertEqual(calls, ["Example"])
        self.assertEqual((self.out_dir / "example.png").read_bytes(), b"first png")
        self.assertEqual(
            json.loads(self.manifest_path.read_text(encoding="utf-8")),
            self.manifest_for([entry]),
        )

    def test_changed_visible_field_renders_again_from_valid_manifest(self):
        original = self.entry()
        self.install_current_state([original])
        changed = {**original, "source_label": "Changed source"}
        calls = []

        def renderer(rendered_entry, output_path):
            calls.append(rendered_entry["source_label"])
            Path(output_path).write_bytes(b"field changed")

        result = self.module.sync_cards(
            [changed],
            out_dir=self.out_dir,
            manifest_path=self.manifest_path,
            renderer=renderer,
        )

        self.assertEqual((result.rendered, result.current), (1, 0))
        self.assertEqual(calls, ["Changed source"])
        self.assertEqual(
            json.loads(self.manifest_path.read_text(encoding="utf-8")),
            self.manifest_for([changed]),
        )

    def test_changed_render_spec_renders_again_from_valid_manifest(self):
        entry = self.entry()
        self.install_current_state([entry])
        changed_spec = copy.deepcopy(self.module.RENDER_SPEC)
        changed_spec["palette"]["accent"] = [1, 2, 3]
        calls = []

        def renderer(rendered_entry, output_path):
            calls.append(rendered_entry["word"])
            Path(output_path).write_bytes(b"style changed")

        result = self.module.sync_cards(
            [entry],
            out_dir=self.out_dir,
            manifest_path=self.manifest_path,
            renderer=renderer,
            render_spec=changed_spec,
        )

        self.assertEqual((result.rendered, result.current), (1, 0))
        self.assertEqual(calls, ["Example"])
        self.assertEqual(
            json.loads(self.manifest_path.read_text(encoding="utf-8")),
            self.manifest_for([entry], render_spec=changed_spec),
        )

    def test_changed_renderer_version_renders_again(self):
        entry = self.entry()
        self.install_current_state([entry])
        calls = []

        def renderer(rendered_entry, output_path):
            calls.append(rendered_entry["word"])
            Path(output_path).write_bytes(b"renderer changed")

        result = self.module.sync_cards(
            [entry],
            out_dir=self.out_dir,
            manifest_path=self.manifest_path,
            renderer=renderer,
            renderer_version=2,
        )

        self.assertEqual((result.rendered, result.current), (1, 0))
        self.assertEqual(calls, ["Example"])
        self.assertEqual(
            json.loads(self.manifest_path.read_text(encoding="utf-8")),
            self.manifest_for([entry], renderer_version=2),
        )

    def test_invalid_manifest_variants_make_every_card_stale(self):
        invalid_documents = (
            b"{",
            json.dumps(
                {
                    "schema": self.module.SCHEMA_VERSION + 1,
                    "renderer": self.module.RENDERER_VERSION,
                    "cards": {},
                }
            ).encode(),
            json.dumps(
                {
                    "schema": self.module.SCHEMA_VERSION,
                    "renderer": self.module.RENDERER_VERSION - 1,
                    "cards": {},
                }
            ).encode(),
            json.dumps(
                {
                    "schema": self.module.SCHEMA_VERSION,
                    "renderer": str(self.module.RENDERER_VERSION),
                    "cards": {},
                }
            ).encode(),
            json.dumps(
                {
                    "schema": self.module.SCHEMA_VERSION,
                    "renderer": self.module.RENDERER_VERSION,
                    "cards": {},
                    "extra": True,
                }
            ).encode(),
        )
        for document in invalid_documents:
            with self.subTest(document=document):
                with tempfile.TemporaryDirectory() as tmp:
                    out_dir = Path(tmp) / "og"
                    out_dir.mkdir()
                    entry = self.entry()
                    (out_dir / "example.png").write_bytes(b"old")
                    manifest_path = out_dir / "manifest.json"
                    manifest_path.write_bytes(document)
                    calls = []

                    def renderer(rendered_entry, output_path):
                        calls.append(rendered_entry["word"])
                        Path(output_path).write_bytes(b"new")

                    result = self.module.sync_cards(
                        [entry],
                        out_dir=out_dir,
                        manifest_path=manifest_path,
                        renderer=renderer,
                    )

                    self.assertEqual((result.rendered, result.current), (1, 0))
                    self.assertEqual(calls, ["Example"])
                    self.assertEqual(
                        json.loads(manifest_path.read_text(encoding="utf-8")),
                        self.manifest_for([entry]),
                    )

    def test_duplicate_slug_preflight_happens_before_any_mutation(self):
        self.out_dir.mkdir(parents=True)
        self.manifest_path.write_bytes(b"prior manifest")
        (self.out_dir / "c-.png").write_bytes(b"prior png")
        before = self.snapshot_tree(self.root)
        renderer = mock.Mock()

        with self.assertRaisesRegex(ValueError, "duplicate.*c-"):
            self.module.sync_cards(
                [self.entry("C#"), self.entry("C@")],
                out_dir=self.out_dir,
                manifest_path=self.manifest_path,
                renderer=renderer,
            )

        renderer.assert_not_called()
        self.assertEqual(self.snapshot_tree(self.root), before)

    def test_render_atomic_preserves_final_file_when_renderer_leaves_partial_output(self):
        self.out_dir.mkdir(parents=True)
        final_path = self.out_dir / "example.png"
        final_path.write_bytes(b"old png")
        seen = []

        def renderer(entry, output_path):
            seen.append(Path(output_path))
            Path(output_path).write_bytes(b"partial")
            raise RuntimeError("render failed")

        with self.assertRaisesRegex(RuntimeError, "render failed"):
            self.module.render_atomic(self.entry(), final_path, renderer)

        self.assertEqual(final_path.read_bytes(), b"old png")
        self.assertEqual(len(seen), 1)
        self.assertNotEqual(seen[0], final_path)
        self.assertFalse(seen[0].exists())

    def test_second_render_failure_keeps_manifest_and_failed_final_png(self):
        entries = [self.entry("Alpha"), self.entry("Beta")]
        self.out_dir.mkdir(parents=True)
        alpha_path = self.out_dir / "alpha.png"
        beta_path = self.out_dir / "beta.png"
        alpha_path.write_bytes(b"old alpha")
        beta_path.write_bytes(b"old beta")
        old_manifest = self.manifest_for(
            entries, renderer_version=self.module.RENDERER_VERSION - 1
        )
        self.manifest_path.write_text(
            json.dumps(old_manifest) + "\n", encoding="utf-8"
        )
        manifest_before = self.manifest_path.read_bytes()
        manifest_mtime = self.manifest_path.stat().st_mtime_ns
        calls = []

        def renderer(entry, output_path):
            calls.append(entry["word"])
            Path(output_path).write_bytes(f"new {entry['word']}".encode())
            if entry["word"] == "Beta":
                raise RuntimeError("second failed")

        with self.assertRaisesRegex(RuntimeError, "second failed"):
            self.module.sync_cards(
                entries,
                out_dir=self.out_dir,
                manifest_path=self.manifest_path,
                renderer=renderer,
            )

        self.assertEqual(calls, ["Alpha", "Beta"])
        self.assertEqual(alpha_path.read_bytes(), b"new Alpha")
        self.assertEqual(beta_path.read_bytes(), b"old beta")
        self.assertEqual(self.manifest_path.read_bytes(), manifest_before)
        self.assertEqual(self.manifest_path.stat().st_mtime_ns, manifest_mtime)

    def test_bootstrap_refuses_invalid_expected_png_and_preserves_prior_manifest(self):
        entries = [self.entry("Missing"), self.entry("Empty"), self.entry("Directory")]
        self.out_dir.mkdir(parents=True)
        (self.out_dir / "empty.png").touch()
        (self.out_dir / "directory.png").mkdir()
        self.manifest_path.write_bytes(b"prior manifest")
        before = self.snapshot_tree(self.root)

        with self.assertRaisesRegex(ValueError, "missing.png.*empty.png.*directory.png"):
            self.module.bootstrap_existing(
                entries,
                out_dir=self.out_dir,
                manifest_path=self.manifest_path,
            )

        self.assertEqual(self.snapshot_tree(self.root), before)

    def test_bootstrap_stamps_existing_pngs_without_changing_them(self):
        entries = [self.entry("Alpha"), self.entry("Beta")]
        self.out_dir.mkdir(parents=True)
        for entry in entries:
            (self.out_dir / f"{entry['word'].lower()}.png").write_bytes(
                f"png:{entry['word']}".encode()
            )
        png_before = {
            path.name: (path.read_bytes(), path.stat().st_mtime_ns)
            for path in self.out_dir.glob("*.png")
        }

        count = self.module.bootstrap_existing(
            entries,
            out_dir=self.out_dir,
            manifest_path=self.manifest_path,
        )

        self.assertEqual(count, 2)
        self.assertEqual(
            json.loads(self.manifest_path.read_text(encoding="utf-8")),
            self.manifest_for(entries),
        )
        self.assertEqual(
            {
                path.name: (path.read_bytes(), path.stat().st_mtime_ns)
                for path in self.out_dir.glob("*.png")
            },
            png_before,
        )

    def test_check_is_read_only_and_allows_orphan_pngs(self):
        entries = [self.entry()]
        self.install_current_state(entries)
        (self.out_dir / "orphan.png").write_bytes(b"orphan")
        before = self.snapshot_tree(self.root)

        self.assertEqual(
            self.module.check_state(
                entries,
                out_dir=self.out_dir,
                manifest_path=self.manifest_path,
            ),
            1,
        )
        self.assertEqual(self.snapshot_tree(self.root), before)

    def test_check_rejects_manifest_key_stamp_and_png_drift_without_mutation(self):
        entry = self.entry()
        drift_cases = ("extra-key", "bad-stamp", "empty-png")
        for drift in drift_cases:
            with self.subTest(drift=drift):
                with tempfile.TemporaryDirectory() as tmp:
                    out_dir = Path(tmp) / "og"
                    out_dir.mkdir()
                    manifest_path = out_dir / "manifest.json"
                    (out_dir / "example.png").write_bytes(b"png")
                    manifest = self.manifest_for([entry])
                    if drift == "extra-key":
                        manifest["cards"]["removed"] = "stamp"
                    elif drift == "bad-stamp":
                        manifest["cards"]["example"] = "wrong"
                    else:
                        (out_dir / "example.png").write_bytes(b"")
                    self.module.write_manifest_atomic(manifest_path, manifest)
                    before = self.snapshot_tree(Path(tmp))

                    with self.assertRaises(ValueError):
                        self.module.check_state(
                            [entry],
                            out_dir=out_dir,
                            manifest_path=manifest_path,
                        )

                    self.assertEqual(self.snapshot_tree(Path(tmp)), before)

    def test_removed_manifest_keys_drop_but_png_and_unrelated_orphan_remain(self):
        kept = self.entry("Kept")
        removed = self.entry("Removed")
        self.install_current_state([kept, removed])
        orphan = self.out_dir / "other-orphan.png"
        orphan.write_bytes(b"orphan")
        factory = mock.Mock(side_effect=AssertionError("no render expected"))

        result = self.module.sync_cards(
            [kept],
            out_dir=self.out_dir,
            manifest_path=self.manifest_path,
            renderer_factory=factory,
        )

        self.assertEqual((result.rendered, result.current), (0, 1))
        factory.assert_not_called()
        manifest = json.loads(self.manifest_path.read_text(encoding="utf-8"))
        self.assertEqual(set(manifest["cards"]), {"kept"})
        self.assertEqual((self.out_dir / "removed.png").read_bytes(), b"existing:Removed")
        self.assertEqual(orphan.read_bytes(), b"orphan")


class CliTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.module = import_script(SCRIPT, "make_og_all_cli_tests")

    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.root = Path(self.temp_dir.name)
        self.dictionary = self.root / "data" / "pronunciations.tsv"
        self.out_dir = self.root / "docs" / "og"
        self.manifest_path = self.out_dir / "manifest.json"
        self.dictionary.parent.mkdir()
        self.out_dir.mkdir(parents=True)
        self.dictionary.write_text(
            "word\tipa\trespelling_us\talt_ipa\talt_respelling_us\t"
            "source_url\tsource_label\tcategory\tconfidence\tnotes\n"
            "Example\t/ipa/\tresp\t\t\t\tSource\tterm\tcontested\t\n",
            encoding="utf-8",
        )
        (self.out_dir / "example.png").write_bytes(b"existing png")
        entry = self.module.load_entries(self.dictionary)[0]
        manifest = {
            "schema": self.module.SCHEMA_VERSION,
            "renderer": self.module.RENDERER_VERSION,
            "cards": {
                "example": self.module.card_stamp(entry),
            },
        }
        self.module.write_manifest_atomic(self.manifest_path, manifest)

    def tearDown(self):
        self.temp_dir.cleanup()

    def run_main(self, arguments):
        stdout = io.StringIO()
        stderr = io.StringIO()
        with (
            mock.patch.object(self.module, "DICT", self.dictionary),
            mock.patch.object(self.module, "OUT_DIR", self.out_dir),
            mock.patch.object(self.module, "MANIFEST", self.manifest_path),
            mock.patch("sys.stdout", stdout),
            mock.patch("sys.stderr", stderr),
        ):
            return self.module.main(arguments), stdout.getvalue(), stderr.getvalue()

    def test_default_current_run_prints_exact_counts_without_pillow_factory(self):
        with mock.patch.object(
            self.module,
            "create_pillow_renderer",
            side_effect=AssertionError("Pillow factory must remain lazy"),
        ) as factory:
            status, stdout, stderr = self.run_main([])

        self.assertEqual(status, 0)
        self.assertEqual(stdout, "0 rendered and 1 current\n")
        self.assertEqual(stderr, "")
        factory.assert_not_called()

    def test_bootstrap_and_check_modes_report_current_count(self):
        self.manifest_path.unlink()
        png_before = (
            (self.out_dir / "example.png").read_bytes(),
            (self.out_dir / "example.png").stat().st_mtime_ns,
        )

        status, stdout, stderr = self.run_main(["--bootstrap-existing"])
        self.assertEqual((status, stdout, stderr), (0, "1 cards bootstrapped\n", ""))
        self.assertEqual(
            (
                (self.out_dir / "example.png").read_bytes(),
                (self.out_dir / "example.png").stat().st_mtime_ns,
            ),
            png_before,
        )

        before = StateMachineTests.snapshot_tree(self.root)
        status, stdout, stderr = self.run_main(["--check"])
        self.assertEqual((status, stdout, stderr), (0, "1 cards current\n", ""))
        self.assertEqual(StateMachineTests.snapshot_tree(self.root), before)

    def test_cli_failure_is_concise_and_nonzero(self):
        (self.out_dir / "example.png").unlink()
        before_manifest = self.manifest_path.read_bytes()

        status, stdout, stderr = self.run_main(["--check"])

        self.assertEqual(status, 1)
        self.assertEqual(stdout, "")
        self.assertIn("error:", stderr)
        self.assertIn("example.png", stderr)
        self.assertEqual(self.manifest_path.read_bytes(), before_manifest)


class WorkflowClosureTests(unittest.TestCase):
    REPO = SCRIPT.parent.parent
    BUILD_WORKFLOW = REPO / ".github" / "workflows" / "build-site.yml"
    CI_WORKFLOW = REPO / ".github" / "workflows" / "ci.yml"
    COMMON_SOURCE_AND_TEST_PATHS = (
        "data/pronunciations.tsv",
        "tools/build-site.sh",
        "docs/v2/audio.jsx",
        "docs/v2/sections-1.jsx",
        "docs/v2/sections-2.jsx",
        "docs/v2/eggs.jsx",
        "docs/v2/app.jsx",
        "tools/build-v2-data.py",
        "tools/build-v2-bundle.sh",
        "tools/build-entry-dates.py",
        "tools/build-scoreboard.py",
        "tools/build-seo.py",
        "tools/make-audio-all.py",
        "tools/make-og.py",
        "tools/make-og-all.py",
        "tools/test-v2-audio.mjs",
        "tools/test_build_v2_data.py",
        "tools/test_make_og_all.py",
    )
    FACT_DOC_PATHS = (
        "README.md",
        "CLAUDE.md",
        "DESIGN.md",
        "CONTRIBUTING.md",
        "integrations/codex/AGENTS.md",
        "docs/index.html",
        "docs/v2/index.html",
        "CHANGELOG.md",
    )

    @staticmethod
    def source(path):
        return path.read_text(encoding="utf-8")

    @classmethod
    def push_paths(cls, path):
        source = cls.source(path)
        match = re.search(
            r"(?ms)^  push:\n.*?^    paths:\n"
            r"(?P<paths>(?:      - ['\"][^'\"]+['\"]\n)+)",
            source,
        )
        if match is None:
            raise AssertionError(f"{path} must define on.push.paths")
        return tuple(
            re.findall(r"^      - ['\"]([^'\"]+)['\"]$", match["paths"], re.MULTILINE)
        )

    def test_build_site_push_paths_are_the_exact_source_closure(self):
        expected = (
            *self.COMMON_SOURCE_AND_TEST_PATHS[:2],
            ".github/workflows/build-site.yml",
            *self.COMMON_SOURCE_AND_TEST_PATHS[2:],
        )
        actual = self.push_paths(self.BUILD_WORKFLOW)
        self.assertEqual(actual, expected)
        self.assertNotIn("docs/v2/data.js", actual)
        self.assertNotIn("docs/v2/bundle.js", actual)

    def test_ci_push_paths_are_the_exact_source_fact_and_test_closure(self):
        expected = (
            "bin/say-it",
            *self.COMMON_SOURCE_AND_TEST_PATHS[:2],
            ".github/workflows/ci.yml",
            ".github/workflows/build-site.yml",
            *self.COMMON_SOURCE_AND_TEST_PATHS[2:],
            "tools/lint-dict.sh",
            "tools/smoke-test.sh",
            *self.FACT_DOC_PATHS,
        )
        actual = self.push_paths(self.CI_WORKFLOW)
        self.assertEqual(actual, expected)
        self.assertNotIn("docs/v2/data.js", actual)
        self.assertNotIn("docs/v2/bundle.js", actual)

    def test_ci_has_pinned_ubuntu_release_guard_with_exact_commands(self):
        source = self.source(self.CI_WORKFLOW)
        release_guard = re.search(
            r"(?ms)^  release-guard:\n(?P<body>.*?)(?=^  [a-zA-Z0-9_-]+:\n|\Z)",
            source,
        )
        self.assertIsNotNone(release_guard, "CI must define a release-guard job")
        body = release_guard["body"]
        self.assertIn("    runs-on: ubuntu-latest\n", body)
        self.assertRegex(
            body,
            r"uses: actions/checkout@[0-9a-f]{40}\s+# v4",
        )
        self.assertRegex(
            body,
            r"uses: actions/setup-python@[0-9a-f]{40}\s+# v5",
        )
        self.assertIn("python-version: '3.12'", body)
        self.assertIn("run: python -m pip install Pillow", body)
        self.assertIn("run: node --test tools/test-v2-audio.mjs", body)
        self.assertIn(
            "run: python -m unittest "
            "tools/test_build_v2_data.py tools/test_make_og_all.py",
            body,
        )


if __name__ == "__main__":
    unittest.main()
