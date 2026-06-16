"""Pronounce MCP server.

Exposes the community pronunciation dictionary at pronounce.renlab.ai as
MCP tools so any MCP-aware client (Claude Desktop, Continue, Zed, etc.)
can answer "how do you pronounce X?" with audio-ready respellings and
source citations.
"""
from __future__ import annotations
import json
import re
import urllib.parse
import urllib.request
from typing import Any

from mcp.server.fastmcp import FastMCP

API_BASE = "https://pronounce.renlab.ai"
TIMEOUT = 10

REPO_URL = "https://github.com/anzy-renlab-ai/pronounce"

mcp = FastMCP(
    "pronounce",
    instructions=(
        "Community pronunciation dictionary for developer jargon "
        "(kubectl, nginx, JSON, GIF, Pydantic, ...). Every entry carries a "
        "confidence level and, where one exists, a source citation. "
        f"Data and contributions: {REPO_URL}"
    ),
)


def _slugify(word: str) -> str:
    # Must match the site/API generator EXACTLY (1:1 char replacement, no `+`).
    # With a trailing `+`, runs of disallowed chars collapse to one `-`, so
    # "C++" -> "c-" which is C#'s slug — a silent wrong answer. Keep it 1:1 so
    # "C++" -> "c--" matches the deployed /api/word/c--.json.
    return re.sub(r"[^a-z0-9._-]", "-", word.lower())


def _get(path: str) -> Any:
    url = f"{API_BASE}{path}"
    req = urllib.request.Request(url, headers={"User-Agent": "pronounce-mcp/0.1"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return json.load(r)


@mcp.tool()
def pronounce(word: str) -> dict:
    """Look up the canonical pronunciation of a developer-related word.

    Returns the IPA, a respelling that approximates how engineers actually
    say the word, a playable MP3 `audio_url`, optional alternate readings,
    the source citation when available, and editorial notes. Use this for project names like
    `kubectl`, `nginx`, `GIF`, `JSON`, `Pydantic`, `Knative`, programmer
    jargon, and tech acronyms. Returns an error dict if the word is not
    in the dictionary; for general English vocabulary, fall back to your
    own knowledge.
    """
    slug = _slugify(word)
    try:
        entry = _get(f"/api/word/{urllib.parse.quote(slug)}.json")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return {
                "error": "not_found",
                "word": word,
                "hint": (
                    "This word is not in the community dictionary. "
                    "Try `list_pronunciations()` or `search_pronunciations(query)`."
                ),
            }
        raise
    entry["url"] = f"{API_BASE}/word/{slug}"
    entry.setdefault("audio_url", f"{API_BASE}/audio/{slug}.mp3")
    entry["source_repo"] = REPO_URL
    return entry


@mcp.tool()
def search_pronunciations(query: str, limit: int = 20) -> list[dict]:
    """Search the dictionary by partial word or notes match.

    Returns a list of matching entries with `word`, `slug`, `category`,
    and `confidence`. Use this when the exact spelling is unknown or
    when browsing entries by category.
    """
    q = query.strip().lower()
    if not q:
        return []
    words = _get("/api/words.json")
    matches = [w for w in words if q in w["word"].lower() or q in w.get("category", "").lower()]
    return matches[: max(1, min(limit, 100))]


@mcp.tool()
def list_pronunciations(category: str | None = None, limit: int = 100) -> list[dict]:
    """List dictionary entries, optionally filtered by category.

    Categories include: product, project, cli-tool, tool, cs-term,
    acronym, abbreviation, person. The dictionary holds well over 1500
    entries and grows continuously, so the unfiltered list is large —
    pass `category` and/or `limit` to keep the result focused.
    """
    words = _get("/api/words.json")
    if category:
        cat = category.lower()
        words = [w for w in words if w.get("category", "").lower() == cat]
    return words[: max(1, min(limit, 1000))]


@mcp.resource("pronounce://browse")
def browse_index() -> str:
    """The full dictionary index (URL → human-readable browse page)."""
    return f"{API_BASE}/browse"


@mcp.resource("pronounce://word/{slug}")
def word_resource(slug: str) -> str:
    """A single word's human-readable page on the dictionary site."""
    return f"{API_BASE}/word/{slug}"


def main() -> None:
    mcp.run()


if __name__ == "__main__":
    main()
