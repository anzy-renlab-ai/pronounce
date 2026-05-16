# pronounce-mcp — MCP server for the Pronounce dictionary

An MCP server that exposes the community pronunciation dictionary at <https://pronounce.renlab.ai> as tools any MCP-aware client (Claude Desktop, Continue, Zed, ...) can call.

When a user asks an LLM "how do you pronounce kubectl?", the client invokes `pronounce("kubectl")` and gets back the canonical reading, IPA, alternate readings (if contested), source citation, and a link to the human-readable page — without the LLM having to hallucinate.

## Tools

| Tool | What it does |
|------|--------------|
| `pronounce(word)` | Look up a single word. Returns IPA, respelling, alts, source URL, confidence, category, notes. |
| `search_pronunciations(query, limit)` | Find entries by partial match on word or category. |
| `list_pronunciations(category)` | List all entries, optionally filtered by category (`product`, `cli-tool`, `acronym`, ...). |

## Install (Claude Desktop)

```jsonc
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "pronounce": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/anzy-renlab-ai/pronounce#subdirectory=mcp-server", "pronounce-mcp"]
    }
  }
}
```

Or with `pipx`:

```bash
pipx install "git+https://github.com/anzy-renlab-ai/pronounce#subdirectory=mcp-server"
```

```jsonc
{
  "mcpServers": {
    "pronounce": { "command": "pronounce-mcp" }
  }
}
```

Restart Claude Desktop. Ask any pronunciation question:

> "How do you pronounce kubectl?"

Claude calls `pronounce("kubectl")` → gets `{respelling_us: "koob control", ipa: "/ˈkuːb kənˌtroʊl/", source_label: "Kelsey Hightower (KubeCon)", url: "https://pronounce.renlab.ai/word/kubectl", ...}` → answers with the canonical reading plus the citation.

## Why this is useful

LLMs are bad at pronunciation by default. They've seen the spelling and the IPA, but they confabulate when asked about contested words (GIF? jif or gif?) or project names with non-obvious readings (kubectl is "koob-control", not "kub-cuttle"; Pinia is "pee-nya"; Vite is "veet").

This MCP server gives the LLM a deterministic source: the dictionary is community-maintained, source-citing, and updated continuously. Every contested word has both readings with the rationale. Every "creator-clarified" reading links to where the creator settled it.

## Source data

The dictionary is at <https://github.com/anzy-renlab-ai/pronounce/blob/main/data/pronunciations.tsv> — 310+ entries across cloud / DevOps, frontend & backend frameworks, AI/ML platforms, databases, languages, editors, companies, programmer jargon, and acronyms.

Each entry has 10 columns: `word | ipa | respelling_us | alt_ipa | alt_respelling_us | source_url | source_label | category | confidence | notes`.

`confidence` is one of: `creator-clarified` (source URL documents a creator quote), `community-consensus` (widely used but no single citable source), or `contested` (multiple readings in active use).

## License

MIT.
