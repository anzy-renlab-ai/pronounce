# SEO Sitemap Freshness Repair Design

## Context

`sitemap-seo.xml` currently mixes two different URL populations:

- the small set of collection and comparison pages; and
- every generated Chinese word page under `/zh/word/`.

The generator stamps every URL in that sitemap with the build date. As a
result, an unrelated site build tells crawlers that roughly 1,900 unchanged
Chinese pages changed that day. The primary English sitemap already avoids
this bug by reading the real per-entry modification dates from
`data/entry-dates.tsv`, but the SEO supplement does not.

Mixing page types also makes Search Console sitemap-level indexing data less
useful: collection/comparison pages and the much larger Chinese corpus cannot
be evaluated independently.

## Considered Approaches

### A. Correct only `lastmod`

This is the smallest change and stops the false freshness signal, but it
leaves Chinese and editorial SEO pages combined in one sitemap. Search
Console would still not expose a clean submitted/indexed ratio for each
population.

### B. Correct `lastmod` and split the sitemap (selected)

Keep `sitemap-seo.xml` for collection and comparison pages, add
`sitemap-zh.xml` for the Chinese word index and per-word pages, and derive
dates from the content that each URL represents. This fixes the crawler
signal and improves observability without changing whether any page is
indexable.

### C. Remove or `noindex` most Chinese pages

This could reduce submitted URL inventory quickly, but it may discard pages
that already rank or receive impressions. It requires Search Console
reason/category data and query performance evidence, so it is deferred.

## Design

### Shared entry modification dates

`tools/build-seo.py` will load `data/entry-dates.tsv` once into a
`slug -> dateModified` mapping. Every dictionary entry must receive its real
date; a missing or malformed date is a build error rather than a silent
fallback to today.

The mapping will drive:

- each `/zh/word/<slug>` sitemap entry;
- the `/zh/word` index, using the maximum modification date across all
  entries;
- each comparison page, using the maximum date of its two entries; and
- each collection page, using the maximum date of its included entries.

The collection and comparison index pages use the maximum modification date
of their emitted child pages. This keeps `lastmod` content-derived and stable
across no-op rebuilds.

### Sitemap separation

Generated page sitemaps will be:

- `sitemap.xml`: existing primary English and daily URLs;
- `sitemap-seo.xml`: collection and comparison index/detail URLs only;
- `sitemap-zh.xml`: `/zh/word` and all `/zh/word/<slug>` URLs; and
- `sitemap-images.xml`: existing image sitemap.

`sitemap-index.xml` will list all four sitemap files exactly once. The
supplemental sitemap entries will use the newest content-derived date within
that sitemap. Re-running the generator without source changes must produce
byte-identical `sitemap-seo.xml`, `sitemap-zh.xml`, and supplemental sitemap
index entries.

The existing clean, extensionless canonical URLs remain unchanged. No
`robots`, canonical, hreflang, redirect, or page-content behavior changes in
this repair.

### IndexNow continuity

`tools/indexnow-submit.sh` will read all three page sitemaps
(`sitemap.xml`, `sitemap-seo.xml`, and `sitemap-zh.xml`) while continuing to
exclude the sitemap index and image-only sitemap. Its workflow path filters
will include both supplemental page sitemap files so a relevant generated
change can trigger submission.

### Generated artifacts

The implementation will regenerate and commit:

- `docs/sitemap-seo.xml`;
- new `docs/sitemap-zh.xml`;
- `docs/sitemap-index.xml`; and
- any generated files whose deterministic site build legitimately changes.

The 1,880 Chinese HTML pages remain live and self-canonical. This change
improves the signals sent to crawlers; it does not claim that Google will
index every submitted page.

## Error Handling

- Missing `data/entry-dates.tsv`, duplicate slugs, unknown slugs, or invalid
  ISO dates fail the SEO build with an actionable message.
- An empty collection or unavailable comparison is omitted as it is today.
- Sitemap index patching replaces the generator-owned supplemental entries
  deterministically, so stale or duplicate `sitemap-seo.xml` /
  `sitemap-zh.xml` entries cannot accumulate.
- IndexNow fails before submission if an expected page sitemap is missing.

## Verification

- Add focused unit tests for date loading, per-entry Chinese dates,
  collection/comparison aggregate dates, sitemap separation, stable no-op
  output, and deterministic sitemap-index patching.
- Add a source-level regression test proving the SEO generator does not stamp
  dictionary URLs with `date.today()`.
- Update IndexNow tests or add a dry-run assertion covering URLs from all
  three page sitemaps.
- Run the focused SEO tests red before implementation, then green after the
  minimal change.
- Run the existing Python, Node, dictionary-lint, and shell smoke guards.
- Run `bash tools/build-site.sh` twice and verify the second run leaves the
  working tree unchanged.
- Validate every generated sitemap as XML, assert URL uniqueness across page
  sitemaps, assert that sitemap URLs return clean extensionless paths, and
  sample live-equivalent word/Chinese/404 behavior locally.

## Deferred

Bulk `noindex`, removing Chinese pages from the sitemap, translating the
English editorial notes on Chinese pages, and pruning low-demand dictionary
entries depend on Search Console coverage and performance exports. They are
separate content-quality decisions, not part of this technical repair.
