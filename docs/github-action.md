# Pronounce Docs GitHub Action

Turn the developer jargon in a pull request into a sourced pronunciation
glossary. The action scans changed Markdown files, looks terms up in Pronounce's
1,900+ entry dictionary, and writes a table to the workflow job summary.

```yaml
name: Pronunciation guide

on:
  pull_request:
    paths:
      - '**/*.md'
      - '**/*.mdx'

permissions:
  contents: read

jobs:
  glossary:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - id: pronounce
        uses: anzy-renlab-ai/pronounce@v2.28.0
      - run: echo "Found ${{ steps.pronounce.outputs.count }} terms"
```

No token, API key, network request, package install, or telemetry is involved.
The dictionary is read from the checked-out action itself. On pull requests the
action scans changed Markdown when the checkout contains both revisions; if it
cannot resolve the diff, it safely falls back to all Markdown files.

## Inputs

| Input | Default | Meaning |
|---|---|---|
| `files` | auto | Comma- or newline-separated Markdown paths; no globs |
| `max-results` | `25` | Maximum unique glossary terms, from 1 to 200 |
| `include-unsourced` | `true` | Include honest community-consensus entries without a citation |
| `fail-on-match` | `false` | Exit 2 after writing the glossary when a term is found |

## Outputs

- `count` — number of unique matched terms.
- `words` — comma-separated canonical names.
- `markdown` — the complete ready-to-paste glossary.

To scan explicit files:

```yaml
- id: pronounce
  uses: anzy-renlab-ai/pronounce@v2.28.0
  with:
    files: |
      README.md
      docs/architecture.mdx
    include-unsourced: 'false'
    max-results: '40'
```

The generated table links each term to its canonical audio page and carries the
creator/official source when the dictionary has one.
