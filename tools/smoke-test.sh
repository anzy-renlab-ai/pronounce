#!/usr/bin/env bash
# Smoke test the say-it CLI. Run from repo root.
# Exits non-zero if any subcommand misbehaves.
set -e

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CLI="$REPO_ROOT/bin/say-it"

fail=0
SAY_IT_NO_HISTORY=1
export SAY_IT_NO_HISTORY NO_COLOR=1

check() {
  local name="$1"; shift
  local out
  out="$("$@" 2>&1)" || { echo "✗ $name: exit non-zero"; fail=1; return; }
  if [[ -z "$out" ]]; then echo "✗ $name: empty output"; fail=1; return; fi
  echo "✓ $name"
}

assert_contains() {
  local name="$1"; local needle="$2"; shift 2
  local out
  out="$("$@" 2>&1)" || { echo "✗ $name: exit non-zero"; fail=1; return; }
  if [[ "$out" != *"$needle"* ]]; then
    echo "✗ $name: missing '$needle' in output" >&2
    fail=1
  else
    echo "✓ $name"
  fi
}

assert_contains_without() {
  local name="$1"; local needle="$2"; local unwanted="$3"; shift 3
  local out
  out="$("$@" 2>&1)" || { echo "✗ $name: exit non-zero"; fail=1; return; }
  if [[ "$out" != *"$needle"* ]]; then
    echo "✗ $name: missing '$needle' in output" >&2
    fail=1
  elif [[ "$out" == *"$unwanted"* ]]; then
    echo "✗ $name: unexpected '$unwanted' in output" >&2
    fail=1
  else
    echo "✓ $name"
  fi
}

failing_pbcopy_dir="$(mktemp -d)"
trap 'rm -rf "$failing_pbcopy_dir"' EXIT
printf '%s\n' '#!/usr/bin/env bash' 'exit 1' > "$failing_pbcopy_dir/pbcopy"
chmod +x "$failing_pbcopy_dir/pbcopy"

echo "Smoke testing $CLI ..."
assert_contains "help"             "Usage:"            "$CLI" -h
assert_contains "version"          "say-it"            "$CLI" -V
assert_contains "config"           "version:"          "$CLI" config
assert_contains "stats"            "Total entries"     "$CLI" stats
assert_contains "list"             "kubectl"           "$CLI" list
assert_contains "list --category"  "kubectl"           "$CLI" list --category cli-tool
assert_contains "search"           "Redis"             "$CLI" search redis
assert_contains "--why GIF"        "Wilhite"           "$CLI" --why GIF
assert_contains "--json kubectl"   "respelling_us"     "$CLI" --json kubectl
assert_contains "--md JSON"        "Crockford"         "$CLI" --md JSON
assert_contains "explain kubectl"  "Kelsey Hightower"  "$CLI" explain kubectl
assert_contains_without "badge GIF with failing pbcopy" "shields.io" "copied to clipboard" \
  env PATH="$failing_pbcopy_dir:$PATH" "$CLI" badge GIF
assert_contains_without "tweet kubectl with failing pbcopy" "TIL" "copied to clipboard" \
  env PATH="$failing_pbcopy_dir:$PATH" "$CLI" tweet kubectl
assert_contains "badge Fréchet canonical slug" "/word/fr-chet)" "$CLI" badge Fréchet
assert_contains "--md Fréchet canonical slug" "/word/fr-chet" "$CLI" --md Fréchet
assert_contains "tweet Fréchet canonical slug" "/word/fr-chet" "$CLI" tweet Fréchet
assert_contains "cheatsheet"       "Discovery"         "$CLI" cheatsheet
assert_contains "didyoumean"       "did you mean"      "$CLI" --why Kafkah

echo ""
if (( fail )); then echo "✗ smoke test FAILED ($fail check(s))"; exit 1
else echo "✓ all smoke tests passed"; fi
