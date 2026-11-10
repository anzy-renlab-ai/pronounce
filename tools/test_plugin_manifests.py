"""Guard: the Claude Code plugin manifests stay valid and in lockstep.

`.claude-plugin/` makes the repo installable in one step —

    /plugin install pronounce --marketplace anzy-renlab-ai/pronounce

— so a typo here costs every user of that command, and a stale `version`
makes Claude Code skip updates. The version is owned by
`.codex-plugin/plugin.json` (release.sh reads it from there); this test
fails when the two drift apart.
"""
import json
import pathlib
import unittest

REPO = pathlib.Path(__file__).resolve().parent.parent


def load(rel):
    return json.loads((REPO / rel).read_text(encoding="utf-8"))


class PluginManifestTests(unittest.TestCase):
    def test_manifests_parse_with_required_fields(self):
        plugin = load(".claude-plugin/plugin.json")
        market = load(".claude-plugin/marketplace.json")
        for field in ("name", "description", "version", "license"):
            self.assertIn(field, plugin, f".claude-plugin/plugin.json missing '{field}'")
        for field in ("name", "owner", "plugins"):
            self.assertIn(field, market, f".claude-plugin/marketplace.json missing '{field}'")
        self.assertIsInstance(market["owner"], dict, "marketplace owner must be an object")

    def test_version_matches_codex_manifest(self):
        # .codex-plugin/plugin.json is the source of truth: release.sh reads the
        # version from it. A drift here means Claude Code users never get the
        # update, silently.
        self.assertEqual(
            load(".claude-plugin/plugin.json")["version"],
            load(".codex-plugin/plugin.json")["version"],
            "plugin versions drifted — bump .claude-plugin/plugin.json too",
        )

    def test_marketplace_entry_name_matches_plugin_name(self):
        plugin_name = load(".claude-plugin/plugin.json")["name"]
        entries = load(".claude-plugin/marketplace.json")["plugins"]
        self.assertEqual(len(entries), 1, "marketplace lists more than one plugin")
        self.assertEqual(
            entries[0]["name"], plugin_name,
            "marketplace entry name must equal plugin.json name, "
            "or `claude plugin install <name>@pronounce` fails",
        )

    def test_marketplace_source_is_relative_and_within_root(self):
        source = load(".claude-plugin/marketplace.json")["plugins"][0]["source"]
        self.assertIsInstance(source, str, "source must be a relative path string")
        self.assertNotIn("..", source, "'..' in a marketplace source is rejected by validation")

    def test_declared_mcp_config_exists(self):
        plugin = load(".claude-plugin/plugin.json")
        mcp = plugin.get("mcpServers")
        if isinstance(mcp, str):
            path = REPO / mcp
            self.assertTrue(path.is_file(), f"mcpServers points at missing file: {mcp}")
            self.assertIn("mcpServers", load(mcp), f"{mcp} has no mcpServers key")

    def test_skill_ships_with_the_plugin(self):
        # A plugin with no skills loads nothing useful; the directory name must
        # also match the skill's frontmatter name or the command form breaks.
        skill = REPO / "skills" / "pronounce-word" / "SKILL.md"
        self.assertTrue(skill.is_file(), "skills/pronounce-word/SKILL.md missing")
        head = skill.read_text(encoding="utf-8").split("---")[1]
        self.assertIn("name: pronounce-word", head)


if __name__ == "__main__":
    unittest.main()
