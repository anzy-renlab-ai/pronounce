# AI agent integrations

Drop-in configs for the most popular AI coding agents so they route
pronunciation questions through the `say-it` CLI / `pronounce` MCP server.

| Agent | File | Install |
|-------|------|---------|
| **Claude Code** | [`skills/pronounce-word/SKILL.md`](../skills/pronounce-word/SKILL.md) | `./install.sh` puts it in `~/.claude/skills/pronounce-word/` automatically |
| **Claude Desktop / Continue / Zed / Cline** (MCP) | [`mcp-server/`](../mcp-server/) | `pip install` + add `mcpServers` entry in client config |
| **Codex CLI** | [`integrations/codex/AGENTS.md`](codex/AGENTS.md) | Drop into `~/.codex/AGENTS.md` or your project's `AGENTS.md` |
| **Cursor** | [`integrations/cursor/.cursorrules`](cursor/.cursorrules) | Drop into your project root as `.cursorrules` |
| **Continue.dev** | [`integrations/continue/config.snippet.json`](continue/config.snippet.json) | Merge `customCommands` array into `~/.continue/config.json` — `/pronounce <word>` slash command |
| **Aider** | run `say-it` directly via Aider's `/run` command, e.g. `/run say-it kubectl` | none |
| **Any other CLI agent** | run the CLI: `say-it <word>` | install via `./install.sh` |

## What each integration does

Every integration boils down to the same workflow:

1. Detect a pronunciation question
2. Call `say-it <word>` (plays audio through macOS speakers)
3. Call `say-it --json <word>` for the dictionary entry
4. Reply with IPA + respelling + source citation

The only thing each agent format does differently is how the rule/skill gets
loaded. The CLI and the MCP server are platform-agnostic.

## Universal MCP path (recommended)

Most modern AI clients support MCP. The `pronounce` MCP server in
[`mcp-server/`](../mcp-server/) is the cleanest integration: install once
in your client's `mcpServers` config and every pronunciation question gets
deterministic dictionary-backed answers.

```jsonc
// claude_desktop_config.json / cline.json / continue config / zed settings
{
  "mcpServers": {
    "pronounce": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/anzy-renlab-ai/pronounce#subdirectory=mcp-server", "pronounce-mcp"]
    }
  }
}
```

Tools exposed: `pronounce(word)`, `search_pronunciations(query)`, `list_pronunciations(category)`.

## Why bother with multiple formats?

Not every client speaks MCP yet (Codex CLI, Cursor, raw bash agents).
The agent-specific files in this directory cover those gaps so the
pronunciation lookup works in whatever AI client a developer happens to use.
