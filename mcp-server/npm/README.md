# pronounce-mcp

Zero-dependency MCP server for the community pronunciation dictionary at <https://pronounce.renlab.ai> — look up how engineers actually pronounce project / product / jargon names (kubectl, nginx, GIF, Pydantic, ...) from any MCP-aware client. Every entry carries a confidence level and, where one exists, a source citation.

Plain Node (>= 18), no SDK, no runtime dependencies. Speaks MCP's newline-delimited JSON-RPC over stdio directly.

## Tools

| Tool | What it does |
|------|--------------|
| `pronounce(word)` | Look up a single word. Returns IPA, respelling, alternates, source citation, confidence, category, notes. |
| `search_pronunciations(query, limit)` | Find entries by partial match on word or category. |
| `list_pronunciations(category, limit)` | List entries, optionally filtered by category (`product`, `cli-tool`, `acronym`, ...). |

## Usage

```bash
npx pronounce-mcp
```

### Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pronounce": {
      "command": "npx",
      "args": ["-y", "pronounce-mcp"]
    }
  }
}
```

### Codex

`~/.codex/config.toml`:

```toml
[mcp_servers.pronounce]
command = "npx"
args = ["-y", "pronounce-mcp"]
```

### Kiro

`.kiro/settings/mcp.json` (or `~/.kiro/settings/mcp.json`):

```json
{
  "mcpServers": {
    "pronounce": {
      "command": "npx",
      "args": ["-y", "pronounce-mcp"]
    }
  }
}
```

Then ask: *"How do you pronounce kubectl?"* — the client calls `pronounce("kubectl")` and answers with the canonical reading plus citation instead of guessing.

## Source

Data, Python MCP server, and contributions: <https://github.com/anzy-renlab-ai/pronounce> (this package lives in `mcp-server/npm/`).

## License

MIT.
