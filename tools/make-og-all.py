#!/usr/bin/env python3
"""Incrementally generate one Open Graph card per dictionary entry.

The module is import-safe and keeps Pillow lazy: parsing, manifest checks,
bootstrap, and a fully current sync need only the Python standard library.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import pathlib
import re
import stat
import sys
import tempfile
from collections.abc import Iterable, Mapping
from typing import Any, NamedTuple


REPO = pathlib.Path(__file__).resolve().parent.parent
DICT = REPO / "data" / "pronunciations.tsv"
OUT_DIR = REPO / "docs" / "og"
MANIFEST = OUT_DIR / "manifest.json"

SCHEMA_VERSION = 1
RENDERER_VERSION = 1
ENTRY_FIELDS = (
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
RENDERED_FIELDS = (
    "word",
    "ipa",
    "respelling_us",
    "alt_respelling_us",
    "source_label",
    "category",
    "confidence",
)

# This is the complete render contract. card_stamp() hashes it alongside the
# renderer version and raw rendered entry fields, so every visual input is
# explicit and invalidates existing cards when changed.
RENDER_SPEC = {
    "canvas": {"mode": "RGB", "width": 1200, "height": 630},
    "palette": {
        "background": [14, 14, 16],
        "card": [24, 24, 27],
        "border": [42, 42, 48],
        "foreground": [246, 246, 247],
        "muted": [155, 155, 160],
        "muted_strong": [196, 196, 202],
        "accent": [255, 106, 61],
        "accent_2": [122, 223, 187],
        "link": [122, 184, 255],
    },
    "fonts": {
        "brand": {
            "candidates": [
                "/System/Library/Fonts/SFNS.ttf",
                "/System/Library/Fonts/Helvetica.ttc",
            ],
            "size": 24,
        },
        "word_huge": {
            "candidates": [
                "/System/Library/Fonts/SFNSMono.ttf",
                "/System/Library/Fonts/Menlo.ttc",
            ],
            "size": 92,
        },
        "word_big": {
            "candidates": [
                "/System/Library/Fonts/SFNSMono.ttf",
                "/System/Library/Fonts/Menlo.ttc",
            ],
            "size": 72,
        },
        "word_medium": {
            "candidates": [
                "/System/Library/Fonts/SFNSMono.ttf",
                "/System/Library/Fonts/Menlo.ttc",
            ],
            "size": 52,
        },
        "respelling": {
            "candidates": [
                "/System/Library/Fonts/SFNSMono.ttf",
                "/System/Library/Fonts/Menlo.ttc",
            ],
            "size": 56,
        },
        "ipa": {
            "candidates": [
                "/System/Library/Fonts/SFNSMono.ttf",
                "/System/Library/Fonts/Menlo.ttc",
            ],
            "size": 28,
        },
        "label": {
            "candidates": [
                "/System/Library/Fonts/SFNS.ttf",
                "/System/Library/Fonts/Helvetica.ttc",
            ],
            "size": 22,
        },
        "footer": {
            "candidates": [
                "/System/Library/Fonts/SFNS.ttf",
                "/System/Library/Fonts/Helvetica.ttc",
            ],
            "size": 24,
        },
        "alternate": {
            "candidates": [
                "/System/Library/Fonts/SFNSMono.ttf",
                "/System/Library/Fonts/Menlo.ttc",
            ],
            "size": 36,
        },
    },
    "layout": {
        "stripe_height": 8,
        "stripe_fade": 0.4,
        "brand_position": [60, 48],
        "label_position": [60, 100],
        "word_position": [60, 130],
        "horizontal_margin": 120,
        "word_gap": 24,
        "missing_respelling_gap": 16,
        "respelling_gap": 16,
        "ipa_gap": 20,
        "alternate_gap": 24,
        "footer_bottom": 80,
    },
    "copy": {
        "brand": "🔊  pronounce.renlab.ai",
        "label": "How to pronounce",
        "alternate_prefix": "or: ",
        "alternate_separator": ",  ",
        "alternate_more": "  (+more)",
        "source_prefix": "📎 ",
        "fallback_footer": "  ⌘ {category} · {confidence}",
    },
    "alternates": {"separator": "|", "limit": 2},
    "save": {"format": "PNG", "optimize": True},
}


class ManifestError(ValueError):
    """The OG manifest is absent or does not match its declared contract."""


def slugify(word: str) -> str:
    """Match the canonical per-character asset slug used by the site."""
    return re.sub(r"[^a-z0-9._-]", "-", word.lower())


def load_entries(path: pathlib.Path = DICT) -> list[dict[str, str]]:
    """Load usable dictionary rows without mutating repository state."""
    entries: list[dict[str, str]] = []
    with pathlib.Path(path).open(encoding="utf-8") as source:
        for raw in source:
            if raw.startswith("#") or not raw.strip():
                continue
            columns = raw.rstrip("\n").split("\t")
            if len(columns) < 3 or columns[0] in ("", "word"):
                continue
            entries.append(
                {
                    key: columns[index] if index < len(columns) else ""
                    for index, key in enumerate(ENTRY_FIELDS)
                }
            )
    return entries


def index_entries(
    entries: Iterable[Mapping[str, str]],
) -> dict[str, Mapping[str, str]]:
    """Index entries by slug, rejecting all collisions during preflight."""
    indexed: dict[str, Mapping[str, str]] = {}
    for entry in entries:
        word = entry.get("word", "")
        slug = slugify(word)
        if slug in indexed:
            first_word = indexed[slug].get("word", "")
            raise ValueError(
                f"duplicate OG slug {slug!r}: {first_word!r} and {word!r}"
            )
        indexed[slug] = entry
    return indexed


def card_stamp(
    entry: Mapping[str, Any],
    renderer_version: int = RENDERER_VERSION,
    render_spec: Mapping[str, Any] = RENDER_SPEC,
) -> str:
    """Fingerprint every raw input that can affect a rendered card."""
    payload = {
        "renderer": renderer_version,
        "render_spec": render_spec,
        "entry": {field: entry.get(field, "") for field in RENDERED_FIELDS},
    }
    canonical = json.dumps(
        payload,
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    ).encode("utf-8")
    return hashlib.sha256(canonical).hexdigest()[:20]


def _validate_manifest(
    value: Any,
    *,
    schema_version: int,
    renderer_version: int,
) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise ManifestError("OG manifest must be a JSON object")
    if set(value) != {"schema", "renderer", "cards"}:
        raise ManifestError("OG manifest keys must be exactly schema, renderer, cards")
    if type(value["schema"]) is not int or value["schema"] != schema_version:
        raise ManifestError(
            f"OG manifest schema must be exactly {schema_version!r}"
        )
    if (
        type(value["renderer"]) is not int
        or value["renderer"] != renderer_version
    ):
        raise ManifestError(
            f"OG manifest renderer must be exactly {renderer_version!r}"
        )
    cards = value["cards"]
    if not isinstance(cards, dict) or any(
        not isinstance(slug, str) or not isinstance(stamp, str)
        for slug, stamp in cards.items()
    ):
        raise ManifestError("OG manifest cards must map strings to strings")
    return value


def load_manifest(
    path: pathlib.Path = MANIFEST,
    *,
    strict: bool = False,
    schema_version: int = SCHEMA_VERSION,
    renderer_version: int = RENDERER_VERSION,
) -> dict[str, Any] | None:
    """Load a manifest strictly, or return None for any invalid lenient input."""
    manifest_path = pathlib.Path(path)
    try:
        with manifest_path.open(encoding="utf-8") as source:
            value = json.load(source)
        return _validate_manifest(
            value,
            schema_version=schema_version,
            renderer_version=renderer_version,
        )
    except (OSError, UnicodeError, json.JSONDecodeError, ManifestError) as exc:
        if strict:
            if isinstance(exc, ManifestError):
                raise
            raise ManifestError(f"cannot load OG manifest {manifest_path}: {exc}") from exc
        return None


def _manifest_bytes(manifest: Mapping[str, Any]) -> bytes:
    return (
        json.dumps(manifest, ensure_ascii=False, indent=2, sort_keys=False) + "\n"
    ).encode("utf-8")


def write_manifest_atomic(
    path: pathlib.Path,
    manifest: Mapping[str, Any],
) -> bool:
    """Atomically write canonical manifest bytes, preserving a byte-identical file."""
    manifest_path = pathlib.Path(path)
    encoded = _manifest_bytes(manifest)
    try:
        if manifest_path.read_bytes() == encoded:
            return False
    except FileNotFoundError:
        pass

    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    temporary: pathlib.Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="wb",
            prefix=f".{manifest_path.name}.",
            suffix=".tmp",
            dir=manifest_path.parent,
            delete=False,
        ) as destination:
            temporary = pathlib.Path(destination.name)
            destination.write(encoded)
            destination.flush()
            os.fsync(destination.fileno())
        os.replace(temporary, manifest_path)
        temporary = None
    finally:
        if temporary is not None:
            try:
                temporary.unlink()
            except FileNotFoundError:
                pass
    return True


class SyncResult(NamedTuple):
    rendered: int
    current: int


def _desired_manifest(
    indexed: Mapping[str, Mapping[str, Any]],
    *,
    renderer_version: int,
    render_spec: Mapping[str, Any],
) -> dict[str, Any]:
    # Start empty by design. Reusing prior cards would retain removed slugs.
    cards: dict[str, str] = {}
    for slug in sorted(indexed):
        cards[slug] = card_stamp(
            indexed[slug],
            renderer_version=renderer_version,
            render_spec=render_spec,
        )
    return {
        "schema": SCHEMA_VERSION,
        "renderer": renderer_version,
        "cards": cards,
    }


def valid_png(path: pathlib.Path) -> bool:
    """The state contract requires a regular, non-empty file (not image decode)."""
    png_path = pathlib.Path(path)
    try:
        metadata = png_path.lstat()
        return stat.S_ISREG(metadata.st_mode) and metadata.st_size > 0
    except OSError:
        return False


def render_atomic(
    entry: Mapping[str, str],
    output_path: pathlib.Path,
    renderer,
) -> None:
    """Render through a sibling temporary path, then atomically replace output."""
    final_path = pathlib.Path(output_path)
    final_path.parent.mkdir(parents=True, exist_ok=True)
    temporary: pathlib.Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            prefix=f".{final_path.name}.",
            suffix=".png",
            dir=final_path.parent,
            delete=False,
        ) as destination:
            temporary = pathlib.Path(destination.name)
        renderer(entry, temporary)
        if not valid_png(temporary):
            raise ValueError(
                f"renderer did not produce a non-empty regular PNG for "
                f"{entry.get('word', '')!r}"
            )
        os.replace(temporary, final_path)
        temporary = None
    finally:
        if temporary is not None:
            try:
                temporary.unlink()
            except (FileNotFoundError, IsADirectoryError):
                pass


def bootstrap_existing(
    entries: Iterable[Mapping[str, str]],
    *,
    out_dir: pathlib.Path = OUT_DIR,
    manifest_path: pathlib.Path = MANIFEST,
    renderer_version: int = RENDERER_VERSION,
    render_spec: Mapping[str, Any] = RENDER_SPEC,
) -> int:
    """Stamp a complete existing corpus without rendering or changing PNGs."""
    indexed = index_entries(entries)
    output_dir = pathlib.Path(out_dir)
    invalid = [
        output_dir / f"{slug}.png"
        for slug in indexed
        if not valid_png(output_dir / f"{slug}.png")
    ]
    if invalid:
        names = ", ".join(path.name for path in invalid)
        raise ValueError(
            "bootstrap refused; expected PNGs are missing, empty, or not regular: "
            + names
        )

    desired = _desired_manifest(
        indexed,
        renderer_version=renderer_version,
        render_spec=render_spec,
    )
    write_manifest_atomic(pathlib.Path(manifest_path), desired)
    return len(indexed)


def check_state(
    entries: Iterable[Mapping[str, str]],
    *,
    out_dir: pathlib.Path = OUT_DIR,
    manifest_path: pathlib.Path = MANIFEST,
    renderer_version: int = RENDERER_VERSION,
    render_spec: Mapping[str, Any] = RENDER_SPEC,
) -> int:
    """Validate exact manifest state and expected PNGs without writing anything."""
    indexed = index_entries(entries)
    manifest = load_manifest(
        pathlib.Path(manifest_path),
        strict=True,
        schema_version=SCHEMA_VERSION,
        renderer_version=renderer_version,
    )
    assert manifest is not None
    desired = _desired_manifest(
        indexed,
        renderer_version=renderer_version,
        render_spec=render_spec,
    )
    actual_cards = manifest["cards"]
    desired_cards = desired["cards"]
    errors: list[str] = []

    actual_keys = set(actual_cards)
    desired_keys = set(desired_cards)
    missing_keys = sorted(desired_keys - actual_keys)
    extra_keys = sorted(actual_keys - desired_keys)
    if missing_keys:
        errors.append("manifest missing cards: " + ", ".join(missing_keys))
    if extra_keys:
        errors.append("manifest has unexpected cards: " + ", ".join(extra_keys))

    stale_stamps = sorted(
        slug
        for slug in desired_keys & actual_keys
        if actual_cards[slug] != desired_cards[slug]
    )
    if stale_stamps:
        errors.append("manifest has stale card stamps: " + ", ".join(stale_stamps))

    output_dir = pathlib.Path(out_dir)
    invalid_pngs = sorted(
        f"{slug}.png"
        for slug in desired_keys
        if not valid_png(output_dir / f"{slug}.png")
    )
    if invalid_pngs:
        errors.append(
            "expected PNGs are missing, empty, or not regular: "
            + ", ".join(invalid_pngs)
        )
    if errors:
        raise ValueError("; ".join(errors))
    return len(indexed)


def sync_cards(
    entries: Iterable[Mapping[str, str]],
    *,
    out_dir: pathlib.Path = OUT_DIR,
    manifest_path: pathlib.Path = MANIFEST,
    renderer=None,
    renderer_factory=None,
    renderer_version: int = RENDERER_VERSION,
    render_spec: Mapping[str, Any] = RENDER_SPEC,
) -> SyncResult:
    """Render only stale cards and publish the manifest after all renders succeed."""
    indexed = index_entries(entries)
    desired = _desired_manifest(
        indexed,
        renderer_version=renderer_version,
        render_spec=render_spec,
    )
    prior = load_manifest(
        pathlib.Path(manifest_path),
        strict=False,
        schema_version=SCHEMA_VERSION,
        renderer_version=renderer_version,
    )
    prior_cards = prior["cards"] if prior is not None else {}
    output_dir = pathlib.Path(out_dir)
    stale = [
        slug
        for slug in sorted(indexed)
        if prior_cards.get(slug) != desired["cards"][slug]
        or not valid_png(output_dir / f"{slug}.png")
    ]

    active_renderer = renderer
    if stale and active_renderer is None:
        if renderer_factory is None:
            active_renderer = create_pillow_renderer(render_spec)
        else:
            active_renderer = renderer_factory()

    for slug in stale:
        render_atomic(
            indexed[slug],
            output_dir / f"{slug}.png",
            active_renderer,
        )

    # This also drops manifest entries whose dictionary rows were removed. The
    # corresponding PNGs intentionally remain for manual cleanup.
    write_manifest_atomic(pathlib.Path(manifest_path), desired)
    return SyncResult(rendered=len(stale), current=len(indexed) - len(stale))


def create_pillow_renderer(
    render_spec: Mapping[str, Any] = RENDER_SPEC,
):
    """Import Pillow and load fonts only when an actual render is required."""
    from PIL import Image, ImageDraw, ImageFont

    fonts = {}
    for name, font_spec in render_spec["fonts"].items():
        for candidate in font_spec["candidates"]:
            try:
                fonts[name] = ImageFont.truetype(candidate, font_spec["size"])
                break
            except Exception:
                continue
        else:
            fonts[name] = ImageFont.load_default()

    canvas = render_spec["canvas"]
    palette = render_spec["palette"]
    layout = render_spec["layout"]
    copy = render_spec["copy"]
    alternate_spec = render_spec["alternates"]
    save = render_spec["save"]

    def pillow_renderer(
        entry: Mapping[str, str],
        output_path: pathlib.Path,
    ) -> None:
        word = entry.get("word", "")
        ipa = entry.get("ipa", "") or ""
        respelling = entry.get("respelling_us", "") or ""
        alternate_respelling = entry.get("alt_respelling_us", "") or ""
        source_label = entry.get("source_label", "") or ""
        confidence = entry.get("confidence", "") or ""
        category = entry.get("category", "") or ""

        image = Image.new(
            canvas["mode"],
            (canvas["width"], canvas["height"]),
            tuple(palette["background"]),
        )
        draw = ImageDraw.Draw(image)

        stripe_height = layout["stripe_height"]
        stripe_fade = layout["stripe_fade"]
        for y in range(stripe_height):
            factor = 1 - y / stripe_height * stripe_fade
            stripe_color = tuple(
                int(channel * factor) for channel in palette["accent"]
            )
            draw.line(
                [(0, y), (canvas["width"], y)],
                fill=stripe_color,
            )

        draw.text(
            tuple(layout["brand_position"]),
            copy["brand"],
            font=fonts["brand"],
            fill=tuple(palette["accent_2"]),
        )
        draw.text(
            tuple(layout["label_position"]),
            copy["label"],
            font=fonts["label"],
            fill=tuple(palette["muted_strong"]),
        )

        word_position = tuple(layout["word_position"])
        maximum_word_width = canvas["width"] - layout["horizontal_margin"]
        word_font = fonts["word_medium"]
        for candidate in ("word_huge", "word_big", "word_medium"):
            bbox = draw.textbbox((0, 0), word, font=fonts[candidate])
            if bbox[2] - bbox[0] <= maximum_word_width:
                word_font = fonts[candidate]
                break
        draw.text(
            word_position,
            word,
            font=word_font,
            fill=tuple(palette["foreground"]),
        )
        word_bbox = draw.textbbox(word_position, word, font=word_font)
        y_after_word = word_bbox[3] + layout["word_gap"]

        if respelling:
            draw.text(
                (word_position[0], y_after_word),
                respelling,
                font=fonts["respelling"],
                fill=tuple(palette["accent"]),
            )
            y_after = (
                y_after_word
                + render_spec["fonts"]["respelling"]["size"]
                + layout["respelling_gap"]
            )
        else:
            y_after = y_after_word + layout["missing_respelling_gap"]

        if ipa:
            draw.text(
                (word_position[0], y_after),
                ipa,
                font=fonts["ipa"],
                fill=tuple(palette["muted"]),
            )
            y_after += (
                render_spec["fonts"]["ipa"]["size"] + layout["ipa_gap"]
            )

        if alternate_respelling:
            alternates = [
                alternate
                for alternate in alternate_respelling.split(
                    alternate_spec["separator"]
                )
                if alternate
            ]
            if alternates:
                limit = alternate_spec["limit"]
                alternate_text = copy["alternate_prefix"] + copy[
                    "alternate_separator"
                ].join(alternates[:limit])
                if len(alternates) > limit:
                    alternate_text += copy["alternate_more"]
                draw.text(
                    (word_position[0], y_after),
                    alternate_text,
                    font=fonts["alternate"],
                    fill=tuple(palette["accent_2"]),
                )

        footer_position = (
            word_position[0],
            canvas["height"] - layout["footer_bottom"],
        )
        if source_label:
            footer = copy["source_prefix"] + source_label
            footer_color = palette["muted_strong"]
        else:
            footer = copy["fallback_footer"].format(
                category=category,
                confidence=confidence,
            )
            footer_color = palette["muted"]
        draw.text(
            footer_position,
            footer,
            font=fonts["footer"],
            fill=tuple(footer_color),
        )
        image.save(
            pathlib.Path(output_path),
            format=save["format"],
            optimize=save["optimize"],
        )

    return pillow_renderer


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Incrementally generate per-entry Open Graph cards."
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--bootstrap-existing",
        action="store_true",
        help="stamp a complete existing PNG corpus without rendering",
    )
    mode.add_argument(
        "--check",
        action="store_true",
        help="read-only validation of manifest stamps and expected PNGs",
    )
    arguments = parser.parse_args(argv)

    try:
        entries = load_entries(DICT)
        if arguments.bootstrap_existing:
            count = bootstrap_existing(
                entries,
                out_dir=OUT_DIR,
                manifest_path=MANIFEST,
            )
            print(f"{count} cards bootstrapped")
        elif arguments.check:
            count = check_state(
                entries,
                out_dir=OUT_DIR,
                manifest_path=MANIFEST,
            )
            print(f"{count} cards current")
        else:
            result = sync_cards(
                entries,
                out_dir=OUT_DIR,
                manifest_path=MANIFEST,
            )
            print(f"{result.rendered} rendered and {result.current} current")
    except Exception as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
