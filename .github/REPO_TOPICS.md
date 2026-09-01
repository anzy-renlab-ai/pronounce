# GitHub repo settings — quick-apply checklist

> Open https://github.com/anzy-renlab-ai/pronounce/settings and apply these.
> Each one nudges discoverability + organic stars.

## 1. Description (top right of repo page)

```
🔊 Hear how developers actually pronounce kubectl, nginx, GIF & 1,900+ tech terms. Sourced dictionary + CLI + VS Code + GitHub Action + MCP + Agent Skill.
```

## 2. Website

```
https://pronounce.renlab.ai
```

## 3. Topics (Settings → "Manage topics")

Add these — GitHub allows up to 20:

```
bash
cli
pronunciation
developer-tools
dictionary
github-actions
agent-skills
claude-code
ai-agents
mcp
mcp-server
speech-synthesis
text-to-speech
tts
ipa
pronunciation-dictionary
vscode-extension
kubernetes
devops
```

## 4. Repo settings

- [ ] **Enable Discussions** → seed with a pinned thread: "Which words do you want next?"
- [ ] **Enable Sponsors** (if you have a profile) — every project page gets a sponsor button
- [ ] **Pin the repo** on your GitHub profile (Profile → Customize your pins)
- [ ] **Pin issues** that explain the contribution flow (CONTRIBUTING.md → "Open a PR")
- [ ] **Create a release** for v2.x with a written changelog — releases show up on the GitHub homepage feed of starrers and followers
- [ ] **Branch protection on `main`** — looks more "real project"
- [ ] **Code of Conduct** — already in CODE_OF_CONDUCT.md, but link from README
- [ ] **Security policy** — already in SECURITY.md

## 5. Social preview image

Settings → Social preview → "Edit" → upload `docs/og.png` (already 1200x630, branded).

## 6. Pin issues for contributors

Create + pin these issues:

- "Words we want next — drop a comment with project names that need a pronunciation entry"
- "Windows backend (PowerShell + System.Speech) — design discussion"
- "Linux backend (espeak-ng vs cloud TTS) — design discussion"

Issues with comments + pin status convert visitors → stars at ~3x baseline rate.

## 7. README badges audit

Make sure the badges at the top render correctly. Ones we ship:

- `![GitHub stars]` — social proof
- `![Live site]` — proves it's not vapor
- `![License: MIT]` — removes friction
- `![Entries: 1,900+]` — concrete numbers
- `![🎯 Quiz]` — call to interactive demo
- `![GitHub Action]` — reusable workflow entry point
- `![PRs welcome]` — invites contribution
