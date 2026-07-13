# Codex CLI integration

Three ways to give OpenAI Codex CLI pronunciation superpowers, best first.

## 1. Plugin (one command — skill + MCP server together)

```bash
codex plugin marketplace add anzy-renlab-ai/pronounce
```

The repo doubles as a Codex plugin: it ships the `pronounce-word` skill
(Agent Skills standard — same `SKILL.md` Claude Code uses) plus the
`pronounce` MCP server config. Browse installed plugins with `/plugins`.

## 2. Skill only

Codex reads skills from `~/.agents/skills/` (user) or `<repo>/.agents/skills/`
(project). The skill file is drop-in compatible:

```bash
mkdir -p ~/.agents/skills/pronounce-word
curl -fsSL https://raw.githubusercontent.com/anzy-renlab-ai/pronounce/main/skills/pronounce-word/SKILL.md \
  -o ~/.agents/skills/pronounce-word/SKILL.md
```

(Or run `./install.sh` from a clone — it detects `~/.agents/skills/` and
installs there too.) Invoke explicitly with `$pronounce-word` or just ask
"how do you pronounce kubectl?". Requires the `say-it` CLI on PATH:
`brew install anzy-renlab-ai/tap/say-it`.

## 3. MCP server only

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.pronounce]
command = "uvx"
args = ["pronounce-mcp"]
```

Or: `codex mcp add pronounce -- uvx pronounce-mcp`

(Installs a 5 KB wheel from PyPI. The old `uvx --from git+…` form cloned the
whole repo — pre-rendered audio and all — and blew past Codex's 10 s startup
timeout, which is why this used to need `startup_timeout_sec = 120`.)

The MCP tools return IPA + respelling + source citation as data; pair with
the skill (or `AGENTS.md` below) if you also want audio played out loud.

## Legacy: AGENTS.md

[`AGENTS.md`](AGENTS.md) in this directory is an always-on instruction file —
drop it into `~/.codex/AGENTS.md` or your project root. Still works, but the
skill (loaded on demand) is the lighter, recommended path.
