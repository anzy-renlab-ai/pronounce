# Kiro integration (Kiro IDE + Kiro CLI)

Kiro (formerly Amazon Q Developer CLI) supports both the Agent Skills
standard and MCP — pronounce plugs into either.

## One-click (Kiro IDE)

[![Add to Kiro](https://kiro.dev/images/add-to-kiro.svg)](https://kiro.dev/launch/mcp/add?name=pronounce&config=%7B%22command%22%3A%22uvx%22%2C%22args%22%3A%5B%22--from%22%2C%22git%2Bhttps%3A%2F%2Fgithub.com%2Fanzy-renlab-ai%2Fpronounce.git%23subdirectory%3Dmcp-server%22%2C%22pronounce-mcp%22%5D%7D)

## MCP server (manual)

Merge [`mcp.json`](mcp.json) into `~/.kiro/settings/mcp.json` (user-wide) or
`<project>/.kiro/settings/mcp.json` (workspace):

```json
{
  "mcpServers": {
    "pronounce": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/anzy-renlab-ai/pronounce.git#subdirectory=mcp-server", "pronounce-mcp"],
      "disabled": false
    }
  }
}
```

Note: the repo ships pre-rendered audio (~86 MB clone), so the first from-git
start takes a while. Once `pronounce-mcp` is on PyPI this collapses to
`"args": ["pronounce-mcp"]`.

## Skill (Kiro CLI — plays actual audio)

The `pronounce-word` skill is Agent Skills standard, drop-in compatible:

```bash
mkdir -p ~/.kiro/skills/pronounce-word
curl -fsSL https://raw.githubusercontent.com/anzy-renlab-ai/pronounce/main/skills/pronounce-word/SKILL.md \
  -o ~/.kiro/skills/pronounce-word/SKILL.md
```

(Or run `./install.sh` from a clone — it detects `~/.kiro/skills/` and
installs there too.) The default agent auto-loads it; invoke with
`/pronounce-word kubectl` or just ask "how do you pronounce kubectl?".
Requires the `say-it` CLI on PATH: `brew install anzy-renlab-ai/tap/say-it`.

Custom agents must opt in to skills via:

```json
"resources": ["skill://~/.kiro/skills/*/SKILL.md"]
```

## Self-contained custom agent (optional)

[`agent.json`](agent.json) → `~/.kiro/agents/pronounce.json` bundles the MCP
server, pre-trusts its read-only tools, and loads the skill — switch to it
with `kiro-cli --agent pronounce`.
