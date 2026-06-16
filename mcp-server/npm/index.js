#!/usr/bin/env node
/**
 * pronounce-mcp — zero-dependency MCP server for the community pronunciation
 * dictionary at https://pronounce.renlab.ai
 *
 * Speaks MCP's JSON-RPC 2.0 over stdio directly (newline-delimited messages,
 * per the MCP stdio transport spec — messages MUST NOT contain embedded
 * newlines). No SDK, no runtime dependencies; plain Node >= 18 (global fetch).
 *
 * Mirrors mcp-server/server.py (the Python/FastMCP implementation) exactly:
 * same three tools, same descriptions, same slugify rule, same not-found
 * behavior.
 */
"use strict";

const API_BASE = "https://pronounce.renlab.ai";
const REPO_URL = "https://github.com/anzy-renlab-ai/pronounce";
const TIMEOUT_MS = 10_000;

const SERVER_NAME = "pronounce";
const SERVER_VERSION = require("./package.json").version;

// Newest first. If the client asks for a version we know, echo it back;
// otherwise answer with our latest and let the client decide.
const SUPPORTED_PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];
const LATEST_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0];

const INSTRUCTIONS =
  "Community pronunciation dictionary for developer jargon " +
  "(kubectl, nginx, JSON, GIF, Pydantic, ...). Every entry carries a " +
  "confidence level and, where one exists, a source citation. " +
  `Data and contributions: ${REPO_URL}`;

// ---------------------------------------------------------------------------
// Dictionary API client
// ---------------------------------------------------------------------------

function slugify(word) {
  // Must match the site/API generator EXACTLY (1:1 char replacement, no `+`
  // quantifier). With a trailing `+`, runs of disallowed chars collapse to one
  // `-`, so "C++" -> "c-" which is C#'s slug — a silent wrong answer. Keep it
  // 1:1 so "C++" -> "c--" matches the deployed /api/word/c--.json.
  return word.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
}

class HttpError extends Error {
  constructor(status, url) {
    super(`HTTP ${status} for ${url}`);
    this.name = "HttpError";
    this.status = status;
  }
}

const FETCH_RETRIES = 2; // extra attempts on transport-level failures only

async function apiGet(path) {
  const url = `${API_BASE}${path}`;
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": `pronounce-mcp/${SERVER_VERSION}` },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) throw new HttpError(res.status, url);
      return await res.json();
    } catch (err) {
      // HTTP statuses (e.g. the 404 that drives not_found) are deterministic:
      // never retry those. Transport failures (dropped TLS handshakes,
      // timeouts, resets) are worth a couple of retries.
      if (err instanceof HttpError || attempt >= FETCH_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, 250 * (attempt + 1)));
    }
  }
}

function clampLimit(limit, fallback, max) {
  const n = Number.isFinite(limit) ? Math.trunc(limit) : fallback;
  return Math.max(1, Math.min(n, max));
}

// ---------------------------------------------------------------------------
// Tools (definitions + behavior mirror mcp-server/server.py)
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "pronounce",
    description:
      "Look up the canonical pronunciation of a developer-related word.\n\n" +
      "Returns the IPA, a respelling that approximates how engineers actually " +
      "say the word, optional alternate readings, the source citation when " +
      "available, and editorial notes. Use this for project names like " +
      "`kubectl`, `nginx`, `GIF`, `JSON`, `Pydantic`, `Knative`, programmer " +
      "jargon, and tech acronyms. Returns an error dict if the word is not " +
      "in the dictionary; for general English vocabulary, fall back to your " +
      "own knowledge.",
    inputSchema: {
      type: "object",
      properties: {
        word: { type: "string", title: "Word" },
      },
      required: ["word"],
    },
  },
  {
    name: "search_pronunciations",
    description:
      "Search the dictionary by partial word or notes match.\n\n" +
      "Returns a list of matching entries with `word`, `slug`, `category`, " +
      "and `confidence`. Use this when the exact spelling is unknown or " +
      "when browsing entries by category.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", title: "Query" },
        limit: { type: "integer", title: "Limit", default: 20 },
      },
      required: ["query"],
    },
  },
  {
    name: "list_pronunciations",
    description:
      "List dictionary entries, optionally filtered by category.\n\n" +
      "Categories include: product, project, cli-tool, tool, cs-term, " +
      "acronym, abbreviation, person. The dictionary holds well over 1500 " +
      "entries and grows continuously, so the unfiltered list is large — " +
      "pass `category` and/or `limit` to keep the result focused.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          anyOf: [{ type: "string" }, { type: "null" }],
          title: "Category",
          default: null,
        },
        limit: { type: "integer", title: "Limit", default: 100 },
      },
      required: [],
    },
  },
];

const TOOL_HANDLERS = {
  async pronounce({ word }) {
    if (typeof word !== "string" || word.length === 0) {
      throw new InvalidParams("`word` must be a non-empty string");
    }
    const slug = slugify(word);
    let entry;
    try {
      entry = await apiGet(`/api/word/${encodeURIComponent(slug)}.json`);
    } catch (err) {
      if (err instanceof HttpError && err.status === 404) {
        return {
          error: "not_found",
          word,
          hint:
            "This word is not in the community dictionary. " +
            "Try `list_pronunciations()` or `search_pronunciations(query)`.",
        };
      }
      throw err;
    }
    entry.url = `${API_BASE}/word/${slug}`;
    if (entry.audio_url === undefined) entry.audio_url = `${API_BASE}/audio/${slug}.mp3`;
    entry.source_repo = REPO_URL;
    return entry;
  },

  async search_pronunciations({ query, limit = 20 }) {
    if (typeof query !== "string") {
      throw new InvalidParams("`query` must be a string");
    }
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const words = await apiGet("/api/words.json");
    const matches = words.filter(
      (w) =>
        String(w.word ?? "").toLowerCase().includes(q) ||
        String(w.category ?? "").toLowerCase().includes(q),
    );
    return matches.slice(0, clampLimit(limit, 20, 100));
  },

  async list_pronunciations({ category = null, limit = 100 } = {}) {
    let words = await apiGet("/api/words.json");
    if (category) {
      const cat = String(category).toLowerCase();
      words = words.filter(
        (w) => String(w.category ?? "").toLowerCase() === cat,
      );
    }
    return words.slice(0, clampLimit(limit, 100, 1000));
  },
};

// ---------------------------------------------------------------------------
// JSON-RPC 2.0 over stdio (newline-delimited, per MCP stdio transport)
// ---------------------------------------------------------------------------

const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
const INVALID_PARAMS = -32602;
const INTERNAL_ERROR = -32603;

class InvalidParams extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidParams";
  }
}

function send(message) {
  // JSON.stringify never emits raw newlines, satisfying the stdio transport's
  // "no embedded newlines" rule.
  process.stdout.write(JSON.stringify(message) + "\n");
}

function sendResult(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function sendError(id, code, message, data) {
  const error = { code, message };
  if (data !== undefined) error.data = data;
  send({ jsonrpc: "2.0", id: id ?? null, error });
}

async function handleRequest(msg) {
  const { id, method, params = {} } = msg;

  switch (method) {
    case "initialize": {
      const requested = params?.protocolVersion;
      const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
        ? requested
        : LATEST_PROTOCOL_VERSION;
      sendResult(id, {
        protocolVersion,
        capabilities: { tools: {} },
        serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        instructions: INSTRUCTIONS,
      });
      return;
    }

    case "ping":
      sendResult(id, {});
      return;

    case "tools/list":
      sendResult(id, { tools: TOOLS });
      return;

    case "tools/call": {
      const name = params?.name;
      const handler = TOOL_HANDLERS[name];
      if (!handler) {
        sendError(id, INVALID_PARAMS, `Unknown tool: ${name}`);
        return;
      }
      try {
        const result = await handler(params?.arguments ?? {});
        sendResult(id, {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
          isError: false,
        });
      } catch (err) {
        if (err instanceof InvalidParams) {
          sendError(id, INVALID_PARAMS, err.message);
          return;
        }
        // Tool execution errors are reported in-band so the LLM can see them,
        // matching FastMCP's behavior.
        sendResult(id, {
          content: [{ type: "text", text: `Error: ${err?.message ?? err}` }],
          isError: true,
        });
      }
      return;
    }

    default:
      sendError(id, METHOD_NOT_FOUND, `Method not found: ${method}`);
  }
}

function handleMessage(msg) {
  if (Array.isArray(msg) || typeof msg !== "object" || msg === null) {
    // JSON-RPC batching was removed from MCP in 2025-06-18.
    sendError(null, INVALID_REQUEST, "Invalid Request");
    return;
  }
  if (typeof msg.method !== "string") {
    // A response (or junk) from the client — nothing for us to do.
    return;
  }
  if (msg.id === undefined || msg.id === null) {
    // Notification: notifications/initialized, notifications/cancelled, ...
    // We have nothing to do for any of them, and notifications never get a
    // response.
    return;
  }
  const p = handleRequest(msg).catch((err) => {
    sendError(msg.id, INTERNAL_ERROR, `Internal error: ${err?.message ?? err}`);
  });
  track(p);
}

// Keep the process alive until in-flight requests have been answered, even
// after stdin closes (clients close stdin to ask the server to exit).
const inFlight = new Set();
let stdinClosed = false;

function track(promise) {
  inFlight.add(promise);
  promise.finally(() => {
    inFlight.delete(promise);
    maybeExit();
  });
}

function maybeExit() {
  if (stdinClosed && inFlight.size === 0) {
    // Flush stdout before exiting.
    process.stdout.write("", () => process.exit(0));
  }
}

function main() {
  let buffer = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    buffer += chunk;
    let nl;
    while ((nl = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, nl).trim(); // also strips \r from \r\n
      buffer = buffer.slice(nl + 1);
      if (!line) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        sendError(null, PARSE_ERROR, "Parse error");
        continue;
      }
      handleMessage(msg);
    }
  });
  process.stdin.on("end", () => {
    stdinClosed = true;
    maybeExit();
  });
  process.stdin.on("error", () => {
    stdinClosed = true;
    maybeExit();
  });
}

main();
