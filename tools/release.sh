#!/usr/bin/env bash
# release.sh — release mechanics for pronounce. Run AFTER the changelog entry
# for the new version exists (the entry's bullets are human/agent-written;
# this script handles the four version pins, guards, tag, push, and GitHub
# release, in the exact order the release guards expect).
#
#   bash tools/release.sh            # version read from .codex-plugin/plugin.json
#
# Requirements at invocation:
#   - working tree on main, clean, synced with origin
#   - CHANGELOG.md top entry is "## <version> — <today YYYY-MM-DD>"
#   - .codex-plugin/plugin.json already bumped to <version>
# The script then:
#   1. syncs README's `uses: …@v<version>` pin
#   2. syncs tools/test_build_v2_data.py's changelog-prefix pin
#   3. runs all four guard suites (fails loud, releases nothing)
#   4. commits any pin drift, tags v<version>, pushes main + tag
#   5. creates the GitHub release from the changelog section
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

fail() { echo "release: $*" >&2; exit 1; }

VERSION="$(python3 -c 'import json; print(json.load(open(".codex-plugin/plugin.json"))["version"])')"
TODAY="$(date +%F)"

[[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || fail "bad version in plugin.json: $VERSION"

# --- preconditions -----------------------------------------------------------
branch="$(git rev-parse --abbrev-ref HEAD)"
[[ "$branch" == "main" ]] || fail "on branch $branch, not main"
[[ -z "$(git status --porcelain)" ]] || fail "working tree dirty — commit first"
git fetch -q origin main
[[ "$(git rev-parse main)" == "$(git rev-parse origin/main)" ]] || fail "main not synced with origin"

head_entry="$(sed -n '3p' CHANGELOG.md)"
[[ "$head_entry" == "## v$VERSION — $TODAY" ]] \
  || fail "CHANGELOG.md top entry is '$head_entry', expected '## v$VERSION — $TODAY'"

# --- pin sync ----------------------------------------------------------------
python3 - "$VERSION" <<'PYEOF'
import re, sys
version = sys.argv[1]

readme = open("README.md").read()
readme2 = re.sub(r"(anzy-renlab-ai/pronounce@)v\d+\.\d+\.\d+", r"\g<1>v" + version, readme)
if readme2 != readme:
    open("README.md", "w").write(readme2)
    print("release: README uses-pin synced to v" + version)

t = open("tools/test_build_v2_data.py").read()# The pin is a Python string literal, so the newlines in it are written as
# escapes. Rebuild the literal in whatever escaping the file currently uses
# (one backslash-n or two) rather than assuming — assuming is how this sync
# silently stopped matching while still printing success.
pin_re = re.compile(
    r'"# Changelog(?P<nl>\\n|\\\\n)(?P=nl)'
    r'## v\d+\.\d+\.\d+ — \d{4}-\d{2}-\d{2}'
    r'(?P=nl)"'
)
m = pin_re.search(t)
if m:
    nl = m.group("nl")
    today = __import__("datetime").date.today().isoformat()
    new_pin = '"# Changelog' + nl + nl + '## v' + version + ' — ' + today + nl + '"'
    t2 = t[:m.start()] + new_pin + t[m.end():]
    if t2 != t:
        open("tools/test_build_v2_data.py", "w").write(t2)
        print("release: test changelog pin synced (v" + version + ")")
else:
    print("release: WARNING — changelog pin in tools/test_build_v2_data.py not found; update it by hand")

# The Claude Code plugin manifest carries the same version; if it drifts,
# Claude Code keeps serving the old copy to `/plugin install` users.
import json
cp = ".claude-plugin/plugin.json"
try:
    plug = json.load(open(cp))
    if plug.get("version") != version:
        plug["version"] = version
        open(cp, "w").write(json.dumps(plug, indent=2, ensure_ascii=False) + "\n")
        print("release: .claude-plugin/plugin.json synced to v" + version)
except FileNotFoundError:
    pass
PYEOF

if [[ -n "$(git status --porcelain)" ]]; then
  git add README.md tools/test_build_v2_data.py .claude-plugin/plugin.json
  git commit -q -m "release: sync version pins to v$VERSION"
fi

# --- guards ------------------------------------------------------------------
echo "release: running guards…"
bash tools/lint-dict.sh >/dev/null            || fail "lint-dict failed"
bash tools/smoke-test.sh >/dev/null           || fail "smoke-test failed"
node --test tools/test-v2-audio.mjs >/dev/null || fail "test-v2-audio failed"
node --test tools/test-daily.mjs tools/test-mcp.mjs >/dev/null || fail "daily/mcp tests failed"
python3 -m unittest tools/test_build_v2_data.py tools/test_make_og_all.py \
  tools/test_chrome_dictionary.py tools/test_build_entry_dates.py \
  tools/test_build_seo.py tools/test_deploy_config.py \
  tools/test_plugin_manifests.py >/dev/null || fail "unittest suite failed"

# --- tag + push --------------------------------------------------------------
git tag "v$VERSION"
git push -q origin main "v$VERSION"

# --- GitHub release from the changelog section -------------------------------
python3 - "$VERSION" <<'PYEOF' > /tmp/release-body.md
import sys
version = sys.argv[1]
text = open("CHANGELOG.md", encoding="utf-8").read()
start = text.index(f"## v{version}")
nxt = text.find("\n## v", start + 1)
section = text[start:nxt if nxt != -1 else None].strip()
print(section)
PYEOF

gh release create "v$VERSION" \
  --title "v$VERSION — $(sed -n '5p' CHANGELOG.md | tr -d '*' | cut -c1-72)" \
  --notes-file /tmp/release-body.md \
  || fail "gh release create failed (tag is pushed; finish manually)"

echo "release: v$VERSION shipped — https://github.com/anzy-renlab-ai/pronounce/releases/tag/v$VERSION"
