#!/usr/bin/env bash
# Bundle docs/v2/ JSX into docs/v2/bundle.js via esbuild.
# No build step at request time — production loads React from CDN + bundle.js (no Babel).
set -euo pipefail

cd "$(dirname "$0")/.."

TMP="$(mktemp -t v2-bundle-XXXX).jsx"
cat docs/v2/audio.jsx \
    docs/v2/sections-1.jsx \
    docs/v2/sections-2.jsx \
    docs/v2/eggs.jsx \
    docs/v2/app.jsx > "$TMP"

npx --yes esbuild "$TMP" --target=es2018 --minify --outfile=docs/v2/bundle.js
rm -f "$TMP"
echo "wrote docs/v2/bundle.js"
