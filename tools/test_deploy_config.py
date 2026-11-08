"""Guard: vercel.json rewrites/functions for /say short-links and /mcp endpoint."""
import json
import pathlib
import unittest

REPO = pathlib.Path(__file__).resolve().parent.parent


class DeployConfigTests(unittest.TestCase):
    def load(self):
        return json.loads((REPO / "vercel.json").read_text(encoding="utf-8"))

    def test_say_rewrite_points_at_word_pages(self):
        self.assertIn(
            {"source": "/say/:slug", "destination": "/word/:slug"},
            self.load().get("rewrites", []),
        )

    def test_mcp_rewrite_points_at_function(self):
        self.assertIn(
            {"source": "/mcp", "destination": "/api/mcp"},
            self.load().get("rewrites", []),
        )

    def test_mcp_function_exists(self):
        self.assertTrue((REPO / "api" / "mcp.js").is_file(), "api/mcp.js missing")
        self.assertTrue((REPO / "api" / "mcp-lib.js").is_file(), "api/mcp-lib.js missing")

    def test_daily_game_assets_exist(self):
        self.assertTrue((REPO / "docs" / "daily" / "game.js").is_file(), "docs/daily/game.js missing")
        self.assertTrue((REPO / "docs" / "og-daily.png").is_file(), "docs/og-daily.png missing")


if __name__ == "__main__":
    unittest.main()
