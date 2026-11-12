# Privacy

Pronounce runs on your machine. Nothing here is a data-collection story, and
this file exists so the plugin manifest can point at a real policy.

## The CLI

`say-it` sends nothing anywhere. It passes the word's English respelling to the
text-to-speech engine the operating system already ships (`say` on macOS,
`espeak-ng` on Linux, `System.Speech` on Windows) and plays the result.

An optional `★` line, shown at most once a day after an interactive speak, is
printed in your terminal and never transmits anything. `SAY_IT_NO_STAR=1` turns
it off permanently.

## The site

`pronounce.renlab.ai` serves static files. It sets no cookies of its own and
stores nothing in the browser beyond a service-worker cache and, for the daily
game, your streak in `localStorage`. The site does load Vercel analytics, which
records page views in aggregate.

## The MCP server

The hosted endpoint at `pronounce.renlab.ai/mcp` and the `pronounce-mcp` package
(`uvx`, `npx`, or the container image) read the public dictionary API. They do
not authenticate, do not log lookups to a per-user store, and do not send your
query anywhere except that API.

## What we do not collect

No accounts, no email, no device identifiers, no telemetry from the CLI or the
MCP server.

Questions: open an issue at
<https://github.com/anzy-renlab-ai/pronounce/issues>.
