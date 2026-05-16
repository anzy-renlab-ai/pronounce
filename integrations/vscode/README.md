# VS Code — Pronounce (snippet + task)

Two ways to wire `say-it` into VS Code without writing a real extension.

## 1) Run on selection (5-minute setup)

Add a task to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Pronounce: selection",
      "type": "shell",
      "command": "say-it",
      "args": ["${selectedText}"],
      "presentation": { "reveal": "silent" }
    }
  ]
}
```

Bind it in `keybindings.json`:

```json
{ "key": "alt+shift+p", "command": "workbench.action.tasks.runTask", "args": "Pronounce: selection" }
```

Highlight any word → `⌥⇧P` → hear it.

## 2) Insert IPA snippet (`.vscode/snippets.code-snippets`)

```json
{
  "Pronounce IPA from say-it": {
    "scope": "markdown,plaintext",
    "prefix": "ipa",
    "body": [
      "$1 — /$2/ — $3"
    ],
    "description": "Word — /IPA/ — respelling"
  }
}
```

## 3) Roadmap: full extension

If you want autocomplete on `say-it ` calls and an inline play button, open an issue tagged `vscode-ext` — happy to bootstrap one with PRs from the community.
