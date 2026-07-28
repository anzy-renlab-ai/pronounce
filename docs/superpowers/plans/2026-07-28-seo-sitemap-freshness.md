# SEO Sitemap Freshness Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop falsely marking every generated Chinese page as modified on each build, split Chinese URLs into an observable sitemap, and preserve IndexNow coverage.

**Architecture:** Add strict entry-date loading and small sitemap URL builders to `build-seo.py`. Generate editorial SEO and Chinese URL sets separately, then deterministically replace their entries in the sitemap index. Exercise the Python generator through importable functions and exercise IndexNow through a temporary real filesystem plus dry-run subprocess.

**Tech Stack:** Python 3 stdlib (`unittest`, `tempfile`, `xml.etree.ElementTree`), Bash, GitHub Actions YAML, generated static XML.

---

## File Map

- Create `tools/test_build_seo.py`: unit and integration regressions for entry dates, split URL sets, aggregate dates, stable output, and sitemap-index replacement.
- Create `tools/test_build_entry_dates.py`: regressions for strict persisted-state parsing and recovery of missing historical dates.
- Modify `tools/build-entry-dates.py`: reject corrupt persisted rows and recover missing committed entries from git history instead of stamping them as newly published today.
- Modify `tools/build-seo.py`: strict date loader, separate SEO/Chinese sitemap emitters, deterministic sitemap-index patching.
- Create `tools/test_indexnow_submit.py`: real dry-run coverage for all page sitemaps and missing-file failure.
- Modify `tools/indexnow-submit.sh`: require and read the primary, editorial SEO, and Chinese page sitemaps.
- Modify `.github/workflows/indexnow.yml`: trigger when either supplemental page sitemap changes.
- Modify `.github/workflows/ci.yml` and `.github/workflows/build-site.yml`: include and run the new regressions where the existing release guards live.
- Regenerate `docs/sitemap-seo.xml`, `docs/sitemap-zh.xml`, `docs/sitemap-index.xml`, and deterministic site artifacts produced by `tools/build-site.sh`.

### Task 1: Protect the canonical entry-date state

**Files:**
- Create: `tools/test_build_entry_dates.py`
- Modify: `tools/build-entry-dates.py:75-145`

- [ ] **Step 1: Write failing persisted-state parser tests**

Import `build-entry-dates.py` and call a path-accepting `load_state(path)`.
Require duplicate slugs, malformed rows, and invalid published/modified ISO
dates to raise actionable `ValueError`s instead of being skipped or
overwritten:

```python
def test_load_state_rejects_duplicate_slug(self):
    self.state_file.write_text(
        "alpha\t2026-05-01\t2026-05-01\thash-a\n"
        "alpha\t2026-05-01\t2026-06-01\thash-b\n",
        encoding="utf-8",
    )
    with self.assertRaisesRegex(ValueError, r"duplicate slug.*alpha"):
        self.module.load_state(self.state_file)
```

- [ ] **Step 2: Write a failing historical-recovery test**

Exercise a pure helper that receives current state, current dictionary rows,
git-history state, and today's date:

```python
reconciled, added = self.module.recover_missing_entries(
    state={},
    rows={"alpha": ["alpha", "ipa", "resp"]},
    historical={
        "alpha": {
            "published": "2026-05-01",
            "modified": "2026-06-02",
            "hash": expected_hash,
        }
    },
    today="2026-07-28",
)
self.assertEqual(reconciled["alpha"]["published"], "2026-05-01")
self.assertEqual(reconciled["alpha"]["modified"], "2026-06-02")
self.assertEqual(added, 0)
```

Add a second case proving a genuinely uncommitted slug absent from history
receives today's published/modified date and increments `added`.

- [ ] **Step 3: Run and verify RED**

Run:

```bash
python3 -m unittest tools/test_build_entry_dates.py -v
```

Expected: FAIL because `load_state` and `recover_missing_entries` do not
exist.

- [ ] **Step 4: Implement strict loading and history-aware recovery**

Rename the permissive `load()` boundary to `load_state(path=OUT)`, validate
all four fields and both dates, and reject duplicates. Add
`recover_missing_entries(state, rows, historical, today)`; reuse historical
published/modified values only when the recovered row hash matches current
content, otherwise treat the row as new/changed today.

In `main()`, lazily call `bootstrap()` whenever current dictionary slugs are
missing from a non-empty state, then reconcile before the existing changed-row
pass. This allows normal new-entry builds while restoring accidentally
deleted old rows to their actual git dates.

- [ ] **Step 5: Run tests and commit**

Run:

```bash
python3 -m unittest tools/test_build_entry_dates.py -v
git diff --check
```

Expected: PASS.

Commit:

```bash
git add tools/build-entry-dates.py tools/test_build_entry_dates.py
git commit -m "fix(seo): recover canonical entry dates"
```

### Task 2: Build a strict date and sitemap contract

**Files:**
- Create: `tools/test_build_seo.py`
- Modify: `tools/build-seo.py:1-75`
- Modify: `tools/build-seo.py:948-1025`

- [ ] **Step 1: Write failing entry-date tests**

Create a temporary dictionary/date fixture, import `build-seo.py`, and require
an exact slug-set match plus normalized ISO dates:

```python
def test_load_entry_dates_requires_exact_slug_parity(self):
    entries = [{"slug": "alpha"}, {"slug": "beta"}]
    self.dates.write_text(
        "alpha\t2026-05-01\t2026-06-02\thash-a\n"
        "stale\t2026-05-03\t2026-06-04\thash-s\n",
        encoding="utf-8",
    )
    with self.assertRaisesRegex(ValueError, r"missing.*beta.*stale.*stale"):
        self.module.load_entry_dates(entries, self.dates)

def test_load_entry_dates_returns_real_modified_dates(self):
    self.dates.write_text(
        "alpha\t2026-05-01\t2026-06-02\thash-a\n"
        "beta\t2026-05-03\t2026-06-04\thash-b\n",
        encoding="utf-8",
    )
    self.assertEqual(
        self.module.load_entry_dates(
            [{"slug": "alpha"}, {"slug": "beta"}], self.dates
        ),
        {"alpha": "2026-06-02", "beta": "2026-06-04"},
    )
```

Also cover a duplicate date-row slug and a non-`YYYY-MM-DD` modified value.
Add a source regression that inspects `emit_seo_sitemap` and
`emit_zh_sitemap` and rejects `TODAY`, `date.today`, or any build-date
fallback in dictionary URL emission.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
python3 -m unittest tools/test_build_seo.py -v
```

Expected: FAIL because `load_entry_dates` does not exist.

- [ ] **Step 3: Implement the minimal strict loader**

Add `ENTRY_DATES = REPO / "data" / "entry-dates.tsv"` and:

```python
def load_entry_dates(entries: list[dict], path: Path | None = None) -> dict[str, str]:
    source = path or ENTRY_DATES
    if not source.is_file():
        raise FileNotFoundError(f"entry date file missing: {source}")
    modified = {}
    for line_no, raw in enumerate(source.read_text(encoding="utf-8").splitlines(), 1):
        if not raw or raw.startswith("#"):
            continue
        cells = raw.split("\t")
        if len(cells) != 4:
            raise ValueError(f"{source}:{line_no}: expected 4 tab-separated fields")
        slug, _published, changed, _row_hash = cells
        if slug in modified:
            raise ValueError(f"{source}:{line_no}: duplicate slug {slug!r}")
        try:
            parsed = date.fromisoformat(changed)
        except ValueError as exc:
            raise ValueError(f"{source}:{line_no}: invalid dateModified {changed!r}") from exc
        if parsed.isoformat() != changed:
            raise ValueError(f"{source}:{line_no}: dateModified must be YYYY-MM-DD")
        modified[slug] = changed
    expected = {entry["slug"] for entry in entries}
    missing = sorted(expected - modified.keys())
    stale = sorted(modified.keys() - expected)
    if missing or stale:
        raise ValueError(f"entry date slug mismatch: missing={missing}, stale={stale}")
    return modified
```

Make `load_entries()` reject duplicate generated slugs instead of silently
overwriting `by_slug`.

- [ ] **Step 4: Run the date tests and verify GREEN**

Run:

```bash
python3 -m unittest tools/test_build_seo.py -v
```

Expected: date-loader tests PASS.

- [ ] **Step 5: Write failing split-sitemap tests**

Use two entries with different modification dates and temporarily replace
`COLLECTIONS` / `COMPARES`. Assert:

```python
seo_latest = self.module.emit_seo_sitemap(
    by_slug, modified, self.seo_sitemap
)
zh_latest = self.module.emit_zh_sitemap(
    entries, modified, self.zh_sitemap
)
self.assertEqual(seo_latest, "2026-06-04")
self.assertEqual(zh_latest, "2026-06-04")
self.assertNotIn("/zh/word", self.seo_sitemap.read_text())
self.assertIn(
    "<loc>https://pronounce.renlab.ai/zh/word/alpha</loc>"
    "<lastmod>2026-06-02</lastmod>",
    self.zh_sitemap.read_text(),
)
```

Assert collection detail dates equal the newest included entry, comparison
detail dates equal the newer side, and their index dates equal the newest
emitted child. Assert an empty collection is omitted from the sitemap.
Assert two identical calls produce byte-identical files.

- [ ] **Step 6: Run the split tests and verify RED**

Run:

```bash
python3 -m unittest tools/test_build_seo.py -v
```

Expected: FAIL because `emit_zh_sitemap` is missing and
`emit_seo_sitemap` still stamps `TODAY`.

- [ ] **Step 7: Implement reusable URL-set emission**

Introduce a typed tuple `(loc, lastmod, priority, changefreq)` and helpers:

```python
def newest(slugs: list[str], modified: dict[str, str]) -> str:
    return max(modified[slug] for slug in slugs)

def write_sitemap(urls: list[tuple[str, str, str, str]], out_path: Path) -> str:
    if not urls:
        raise ValueError(f"refusing to write empty sitemap: {out_path}")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for loc, lastmod, priority, changefreq in urls:
        lines.append(
            f"  <url><loc>{loc}</loc><lastmod>{lastmod}</lastmod>"
            f"<changefreq>{changefreq}</changefreq>"
            f"<priority>{priority}</priority></url>"
        )
    lines.append("</urlset>")
    out_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return max(lastmod for _loc, lastmod, _priority, _changefreq in urls)
```

`emit_seo_sitemap(by_slug, modified, out_path)` emits only collection and
comparison URLs with aggregate dates. `emit_zh_sitemap(entries, modified,
out_path)` emits the Chinese index plus one URL per entry with that entry's
real date.

- [ ] **Step 8: Write and verify deterministic sitemap-index tests**

Start with an index containing primary/image entries plus stale duplicate
SEO/Chinese entries. Require:

```python
self.module.patch_sitemap_index(
    {"sitemap-seo.xml": "2026-06-04", "sitemap-zh.xml": "2026-06-04"},
    self.sitemap_index,
)
text = self.sitemap_index.read_text()
self.assertEqual(text.count("/sitemap-seo.xml"), 1)
self.assertEqual(text.count("/sitemap-zh.xml"), 1)
self.assertIn(
    "<loc>https://pronounce.renlab.ai/sitemap-zh.xml</loc>"
    "<lastmod>2026-06-04</lastmod>",
    text,
)
```

Run the test before implementation and confirm it fails because the current
patcher neither accepts dates/path nor replaces stale entries.

- [ ] **Step 9: Implement deterministic sitemap-index replacement**

Change the patcher to accept an ordered mapping and optional path, fail if
the base index is absent, remove all existing generator-owned supplemental
entries, then insert exactly one entry for each supplied sitemap before
`</sitemapindex>`. Update `main()` to load real dates, write both supplemental
sitemaps, patch the index with returned maximum dates, and report both files.

- [ ] **Step 10: Run focused tests and commit**

Run:

```bash
python3 -m unittest tools/test_build_seo.py -v
git diff --check
```

Expected: all focused tests PASS and no whitespace errors.

Commit:

```bash
git add tools/build-seo.py tools/test_build_seo.py
git commit -m "fix(seo): preserve real sitemap modification dates"
```

### Task 3: Preserve IndexNow coverage after the split

**Files:**
- Create: `tools/test_indexnow_submit.py`
- Modify: `tools/indexnow-submit.sh:26-44`
- Modify: `.github/workflows/indexnow.yml:4-12`
- Modify: `.github/workflows/ci.yml`
- Modify: `.github/workflows/build-site.yml`

- [ ] **Step 1: Write a failing dry-run integration test**

Copy `indexnow-submit.sh` into a temporary repository-shaped directory, add
`.indexnow-key`, and create three one-URL page sitemaps. Run with
`INDEXNOW_DRY_RUN=1` and assert every URL occurs in stdout:

```python
completed = subprocess.run(
    ["bash", str(script)],
    cwd=repo,
    env={**os.environ, "INDEXNOW_DRY_RUN": "1", "SITE_URL": "https://example.test"},
    text=True,
    capture_output=True,
)
self.assertEqual(completed.returncode, 0, completed.stderr)
for path in ("english", "editorial", "chinese"):
    self.assertIn(f"https://example.test/{path}", completed.stdout)
```

Add a second test that omits `sitemap-zh.xml` and expects exit 2 plus a
message naming the missing file.

- [ ] **Step 2: Run and verify RED**

Run:

```bash
python3 -m unittest tools/test_indexnow_submit.py -v
```

Expected: the Chinese URL is absent and missing `sitemap-zh.xml` does not
fail for the expected reason.

- [ ] **Step 3: Require all three page sitemaps**

Replace the optional two-file loop with:

```bash
SITEMAPS=(
  "$ROOT/docs/sitemap.xml"
  "$ROOT/docs/sitemap-seo.xml"
  "$ROOT/docs/sitemap-zh.xml"
)
for sm in "${SITEMAPS[@]}"; do
  [[ -f "$sm" ]] || {
    echo "ERROR: required page sitemap missing: $sm" >&2
    exit 2
  }
done
```

Update comments to reflect the split. Add `docs/sitemap-seo.xml` and
`docs/sitemap-zh.xml` to the workflow push paths.

- [ ] **Step 4: Wire tests into existing guards**

Add all three new Python test modules to the Python unittest command in CI.
Add the test files and `tools/indexnow-submit.sh` /
`.github/workflows/indexnow.yml` to relevant workflow path filters so guard
changes cannot skip CI.

- [ ] **Step 5: Run tests and commit**

Run:

```bash
python3 -m unittest tools/test_build_entry_dates.py tools/test_build_seo.py tools/test_indexnow_submit.py -v
git diff --check
```

Expected: PASS.

Commit:

```bash
git add tools/indexnow-submit.sh tools/test_indexnow_submit.py \
  .github/workflows/indexnow.yml .github/workflows/ci.yml \
  .github/workflows/build-site.yml
git commit -m "fix(indexnow): submit split page sitemaps"
```

### Task 4: Regenerate and validate sitemap artifacts

**Files:**
- Modify: `docs/sitemap-seo.xml`
- Create: `docs/sitemap-zh.xml`
- Modify: `docs/sitemap-index.xml`
- Modify: deterministic `docs/` output produced by `tools/build-site.sh`

- [ ] **Step 1: Run the complete static-site generator**

Run:

```bash
bash tools/build-site.sh
```

Expected: exit 0, output reports separate SEO and Chinese sitemaps, and the
new Chinese sitemap exists.

- [ ] **Step 2: Validate XML and URL populations**

Run a stdlib validation script:

```bash
python3 - <<'PY'
from pathlib import Path
from xml.etree import ElementTree as ET

docs = Path("docs")
page_maps = ("sitemap.xml", "sitemap-seo.xml", "sitemap-zh.xml")
seen = {}
for name in (*page_maps, "sitemap-images.xml", "sitemap-index.xml"):
    ET.parse(docs / name)
for name in page_maps:
    root = ET.parse(docs / name).getroot()
    urls = [node.text for node in root.findall("{*}url/{*}loc")]
    duplicates = sorted(set(urls) & seen.keys())
    if duplicates:
        raise SystemExit(f"duplicate page URLs in {name}: {duplicates[:5]}")
    seen.update({url: name for url in urls})
    if any(url.endswith(".html") for url in urls):
        raise SystemExit(f"redirecting .html URL in {name}")
print({name: sum(1 for owner in seen.values() if owner == name) for name in page_maps})
PY
```

Expected: valid XML, no cross-sitemap page duplicates, no `.html` URLs,
roughly 2,022 primary URLs, editorial SEO URLs only, and roughly 1,881
Chinese URLs.

- [ ] **Step 3: Verify real dates and stable no-op generation**

Capture hashes for the two supplemental sitemap files and the index, rerun
`python3 tools/build-seo.py`, and assert hashes are unchanged. Sample old and
recent entries and compare their Chinese sitemap dates to
`data/entry-dates.tsv`.

- [ ] **Step 4: Review and commit generated output**

Run:

```bash
git status --short
git diff --stat
git diff --check
```

Review every non-generated source change separately from the generated
artifacts. Commit:

```bash
git add docs
git commit -m "build(site): publish split SEO sitemaps"
```

### Task 5: Full verification and handoff

**Files:**
- Verify all changed files.

- [ ] **Step 1: Run focused SEO and IndexNow tests**

```bash
python3 -m unittest tools/test_build_entry_dates.py tools/test_build_seo.py tools/test_indexnow_submit.py -v
```

- [ ] **Step 2: Run repository release guards**

```bash
python3 -m unittest \
  tools/test_build_v2_data.py \
  tools/test_make_og_all.py \
  tools/test_chrome_dictionary.py \
  tools/test_build_entry_dates.py \
  tools/test_build_seo.py \
  tools/test_indexnow_submit.py
node --test tools/test-v2-audio.mjs
bash tools/lint-dict.sh
bash tools/smoke-test.sh
```

Expected: zero failures.

- [ ] **Step 3: Verify deterministic build and clean generated state**

Run `bash tools/build-site.sh`, then:

```bash
git status --short
git diff --check
```

Expected: no new generated changes after the committed build and no
whitespace errors.

- [ ] **Step 4: Inspect final branch**

```bash
git log --oneline --decorate -6
git diff main...HEAD --stat
git status --short
```

Expected: only the approved sitemap freshness repair, tests, workflow
wiring, and generated artifacts; clean worktree.
