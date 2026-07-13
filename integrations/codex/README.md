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
# Only needed for the very first run — see below.
startup_timeout_sec = 120
```

Or: `codex mcp add pronounce -- uvx pronounce-mcp`

**Startup timing.** The package itself is a 5 KB wheel from PyPI. Cold start is
still slow the *first* time — measured 85 s from a completely empty `uv` cache,
because `uv` downloads a Python interpreter and the `mcp` dependency tree. Once
those are cached, startup is ~3 s and you can drop `startup_timeout_sec`
entirely. (Before this package existed, `uvx --from git+…` cloned the whole
repository — 217 MB of git history, pre-rendered audio and all — to fetch a 4 KB
`server.py`, and paid that on *every* cold start.)

The MCP tools return IPA + respelling + source citation as data; pair with
the skill (or `AGENTS.md` below) if you also want audio played out loud.

## Legacy: AGENTS.md

[`AGENTS.md`](AGENTS.md) in this directory is an always-on instruction file —
drop it into `~/.codex/AGENTS.md` or your project root. Still works, but the
skill (loaded on demand) is the lighter, recommended path.
