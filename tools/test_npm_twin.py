"""Lockstep guard for the npm twin of the MCP server.

`mcp-server/npm/` is a second packaging of the same three tools. Nothing at
runtime reads it, so nothing breaks when it drifts — it just silently publishes
a package whose version disagrees with the registry entry that points at it.
These assertions are cheap and catch exactly that.

No network: the published artifacts are checked by the release workflows.
"""
import json
import pathlib
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
NPM_DIR = ROOT / "mcp-server" / "npm"


def load(path):
    return json.loads(path.read_text(encoding="utf-8"))


class NpmTwinTests(unittest.TestCase):
    def setUp(self):
        self.pkg = load(NPM_DIR / "package.json")
        self.server = load(ROOT / "mcp-server" / "server.json")

    def test_version_matches_the_registry_entry(self):
        self.assertEqual(
            self.pkg["version"], self.server["version"],
            "npm package.json version drifted from mcp-server/server.json",
        )

    def test_registry_name_matches(self):
        # mcpName is what tells the official registry which server.json entry
        # this npm package belongs to; a typo makes the package unfindable.
        self.assertEqual(self.pkg["mcpName"], self.server["name"])

    def test_package_name_matches_the_pypi_identifier(self):
        # uvx and npx must install the same thing under the same name.
        pypi = [p for p in self.server["packages"] if p["registryType"] == "pypi"]
        self.assertTrue(pypi, "server.json no longer lists a pypi package")
        self.assertEqual(self.pkg["name"], pypi[0]["identifier"])

    def test_entry_point_is_shipped_and_executable(self):
        entry = NPM_DIR / self.pkg["bin"]["pronounce-mcp"]
        self.assertTrue(entry.is_file(), f"bin target {entry} is missing")
        self.assertIn(entry.name, self.pkg["files"], "bin target is not in files[]")
        self.assertTrue(
            entry.read_text(encoding="utf-8").startswith("#!/"),
            "bin target has no shebang, so `npx -y pronounce-mcp` cannot exec it",
        )

    def test_registry_entry_keeps_its_oci_package(self):
        oci = [p for p in self.server["packages"] if p["registryType"] == "oci"]
        self.assertTrue(oci, "server.json lost its oci package")
        self.assertIn(f"pronounce-mcp:{self.server['version']}", oci[0]["identifier"])


if __name__ == "__main__":
    unittest.main()
