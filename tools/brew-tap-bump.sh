#!/usr/bin/env bash
# brew-tap-bump.sh — point anzy-renlab-ai/homebrew-tap at the release named in
# .codex-plugin/plugin.json.
#
# The formula installs the source asset that release.sh uploads with the
# release (say-it-<version>.tar.gz), so the tag, the release and the asset must
# already exist on GitHub. release.sh runs this after opening the release.
# Nothing else updates the tap: on 2026-11-25 it still pointed at v2.23.0 while
# the repository was at v2.42.0.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TAP=anzy-renlab-ai/homebrew-tap
FORMULA=Formula/say-it.rb

fail() { echo "brew-tap-bump: $*" >&2; exit 1; }

read -r VERSION ENTRY_COUNT <<<"$(python3 - "$REPO_ROOT" <<'PYEOF'
import json, sys
root = sys.argv[1]
version = json.load(open(f"{root}/.codex-plugin/plugin.json"))["version"]
rows = [line.split("\t") for line in open(f"{root}/data/pronunciations.tsv", encoding="utf-8")
        if line and not line.startswith("#") and not line.startswith("word\t")]
print(version, sum(1 for cells in rows if len(cells) >= 10 and cells[0] and cells[2]))
PYEOF
)"
[[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || fail "bad version '$VERSION'"

URL="https://github.com/anzy-renlab-ai/pronounce/releases/download/v$VERSION/say-it-$VERSION.tar.gz"
# A freshly uploaded asset can take a few seconds to answer, so retry before failing.
SHA="$(curl -fsSL --retry 3 --retry-delay 5 --retry-all-errors "$URL" | shasum -a 256 | cut -d' ' -f1)" \
  || fail "could not fetch $URL — is the source asset uploaded with the release?"
[[ "$SHA" =~ ^[0-9a-f]{64}$ ]] || fail "could not hash $URL"

CURRENT="$(mktemp)"
PAYLOAD="$(mktemp)"
trap 'rm -f "$CURRENT" "$PAYLOAD"' EXIT

gh api "repos/$TAP/contents/$FORMULA" > "$CURRENT"

python3 - "$CURRENT" "$VERSION" "$SHA" "$ENTRY_COUNT" <<'PYEOF' > "$PAYLOAD"
import base64, json, re, sys
path, version, sha, count = sys.argv[1:5]
current = json.load(open(path))
text = base64.b64decode(current["content"]).decode("utf-8")

# The version is written out in the url: an interpolated "#{version}" is
# evaluated before any later version line, which downloads an empty version.
asset_url = f'url "https://github.com/anzy-renlab-ai/pronounce/releases/download/v{version}/say-it-{version}.tar.gz"'
updated = re.sub(r'url "https://github\.com/anzy-renlab-ai/pronounce/[^"]+"', asset_url, text)
updated = re.sub(r'^[ \t]*version "[^"]+"\n', '', updated, flags=re.MULTILINE)
updated = re.sub(r'sha256 "[0-9a-f]{64}"', f'sha256 "{sha}"', updated)
# The description is rewritten whole. It used to end "with cited sources",
# which over-claims: about half of the source links are a project's home page.
updated = re.sub(r'desc "Pronounce [0-9,+ ]+developer jargon names[^"]*"',
                 f'desc "Pronounce {int(count):,} developer jargon names out loud, each confidence-tagged"',
                 updated)
print(json.dumps({
    "same": updated == text,
    "message": f"say-it {version}",
    "content": base64.b64encode(updated.encode("utf-8")).decode("ascii"),
    "sha": current["sha"],
}))
PYEOF

if python3 -c 'import json, sys; sys.exit(0 if json.load(open(sys.argv[1]))["same"] else 1)' "$PAYLOAD"; then
  echo "brew-tap-bump: $TAP already points at v$VERSION"
  exit 0
fi

python3 -c 'import json, sys; d = json.load(open(sys.argv[1])); d.pop("same"); json.dump(d, open(sys.argv[1], "w"))' "$PAYLOAD"
gh api -X PUT "repos/$TAP/contents/$FORMULA" --input "$PAYLOAD" --jq '.content.html_url'
echo "brew-tap-bump: $TAP now points at v$VERSION"
