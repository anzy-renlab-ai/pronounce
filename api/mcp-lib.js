"use strict";

// Pure logic for the hosted MCP endpoint https://pronounce.renlab.ai/mcp.
// Mirrors mcp-server/server.py tool-for-tool; data comes from the same
// public JSON API the stdio server uses. fetchImpl is injected so tests
// run without network. Keep this file CommonJS — the Vercel function
// (api/mcp.js) requires it directly.

const API_BASE = "https://pronounce.renlab.ai";
const REPO_URL = "https://github.com/anzy-renlab-ai/pronounce";
const SERVER_VERSION = "0.2.0";
const DEFAULT_PROTOCOL = "2025-06-18";
const SUPPORTED_PROTOCOLS = ["2025-06-18", "2025-03-26", "2024-11-05"];

const TOOLS = [
  {
    name: "pronounce",
    description:
      "Look up the canonical pronunciation of a developer-related word. " +
      "Returns the IPA, a respelling that approximates how engineers actually " +
      "say the word, a playable MP3 audio_url, optional alternate readings, " +
      "the source citation when available, and editorial notes. Use this for " +
      "project names like kubectl, nginx, GIF, JSON, Pydantic, Knative, " +
      "programmer jargon, and tech acronyms. Returns an error object if the " +
      "word is not in the dictionary; for general English vocabulary, fall " +
      "back to your own knowledge.",
    inputSchema: {
      type: "object",
      properties: { word: { type: "string", description: "Word to look up, e.g. nginx or kubectl" } },
      required: ["word"],
    },
  },
  {
    name: "search_pronunciations",
    description:
      "Search the dictionary by partial word or category match. Matches " +
      "substrings against the entry's word and category only — the search " +
      "index carries no notes or source text, so a query like \"Kelsey\" will " +
      "NOT surface kubectl. To read an entry's notes, look it up with " +
      "pronounce. Returns matching entries with word, slug, category, " +
      "confidence.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string" },
        limit: { type: "number", default: 20 },
      },
      required: ["query"],
    },
  },
  {
    name: "list_pronunciations",
    description:
      "List dictionary entries, optionally filtered by category. Categories " +
      "include: product, project, cli-tool, tool, cs-term, acronym, " +
      "abbreviation, person. The dictionary holds well over 1500 entries and " +
      "grows continuously, so the unfiltered list is large — pass category " +
      "and/or limit to keep the result focused.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string" },
        limit: { type: "number", default: 100 },
      },
    },
  },
];

function slugify(word) {
  // 1:1 char replacement mirroring server.py._slugify — NO `+` quantifier:
  // collapsing runs makes "C++" -> "c-", which collides with C#'s slug.
  return String(word).toLowerCase().replace(/[^a-z0-9._-]/g, "-");
}

function toolResult(value) {
  return { content: [{ type: "text", text: JSON.stringify(value, null, 2) }] };
}

function rpcResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function rpcError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function clamp(v, dflt, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return dflt;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}

let _wordsCache = { at: 0, value: null };

async function getWords(fetchImpl) {
  const now = Date.now();
  if (_wordsCache.value && now - _wordsCache.at < 5 * 60 * 1000) return _wordsCache.value;
  const res = await fetchImpl(API_BASE + "/api/words.json");
  if (!res.ok) throw new Error("upstream words.json " + res.status);
  _wordsCache = { at: now, value: await res.json() };
  return _wordsCache.value;
}

async function callTool(fetchImpl, name, args) {
  args = args || {};
  if (name === "pronounce") {
    const word = String(args.word == null ? "" : args.word).trim();
    if (!word) {
      throw Object.assign(new Error("missing required argument: word"), { code: -32602 });
    }
    const slug = slugify(word);
    const res = await fetchImpl(API_BASE + "/api/word/" + encodeURIComponent(slug) + ".json");
    if (res.status === 404) {
      return toolResult({
        error: "not_found",
        word: word,
        hint: "This word is not in the community dictionary. " +
          "Try list_pronunciations or search_pronunciations(query). " +
          "Propose a new entry: " + REPO_URL,
      });
    }
    if (!res.ok) throw new Error("upstream word lookup " + res.status);
    const entry = await res.json();
    entry.url = API_BASE + "/word/" + slug;
    if (!entry.audio_url) entry.audio_url = API_BASE + "/audio/" + slug + ".mp3";
    entry.source_repo = REPO_URL;
    return toolResult(entry);
  }
  if (name === "search_pronunciations") {
    const q = String(args.query == null ? "" : args.query).trim().toLowerCase();
    if (!q) return toolResult([]);
    const limit = clamp(args.limit, 20, 1, 100);
    const words = await getWords(fetchImpl);
    const matches = words.filter(function (w) {
      return String(w.word).toLowerCase().indexOf(q) !== -1 ||
        String(w.category || "").toLowerCase().indexOf(q) !== -1;
    });
    return toolResult(matches.slice(0, limit));
  }
  if (name === "list_pronunciations") {
    const limit = clamp(args.limit, 100, 1, 1000);
    let words = await getWords(fetchImpl);
    if (args.category) {
      const cat = String(args.category).toLowerCase();
      words = words.filter(function (w) {
        return String(w.category || "").toLowerCase() === cat;
      });
    }
    return toolResult(words.slice(0, limit));
  }
  throw Object.assign(new Error("unknown tool: " + name), { code: -32602 });
}

// handleRequest(fetchImpl, body) -> { status, body? }
// body === undefined means "no response payload" (notification / empty batch).
async function handleRequest(fetchImpl, body) {
  if (Array.isArray(body)) {
    const out = [];
    for (const one of body) {
      const r = await handleRequest(fetchImpl, one);
      if (r.body !== undefined) out.push(r.body);
    }
    return { status: 200, body: out.length ? out : undefined };
  }
  if (!body || typeof body !== "object" || Array.isArray(body) ||
      body.jsonrpc !== "2.0" || typeof body.method !== "string") {
    return {
      status: 400,
      body: rpcError(null, -32600, "Invalid Request — JSON-RPC 2.0 object with jsonrpc/method required"),
    };
  }
  const id = body.id !== undefined ? body.id : null;
  if (id === null) return { status: 202 }; // notification: accepted, no body
  try {
    switch (body.method) {
      case "initialize": {
        const requested = body.params && body.params.protocolVersion;
        return {
          status: 200,
          body: rpcResult(id, {
            protocolVersion: SUPPORTED_PROTOCOLS.indexOf(requested) !== -1 ? requested : DEFAULT_PROTOCOL,
            capabilities: { tools: {} },
            serverInfo: {
              name: "pronounce",
              version: SERVER_VERSION,
              title: "Pronounce — how engineers say it",
            },
            instructions:
              "Community pronunciation dictionary for developer jargon " +
              "(kubectl, nginx, JSON, GIF, Pydantic, ...). Every entry carries a " +
              "confidence level and, where one exists, a source citation. " +
              "Data and contributions: " + REPO_URL,
          }),
        };
      }
      case "ping":
        return { status: 200, body: rpcResult(id, {}) };
      case "tools/list":
        return { status: 200, body: rpcResult(id, { tools: TOOLS }) };
      case "tools/call": {
        const name = body.params && body.params.name;
        const args = (body.params && body.params.arguments) || {};
        try {
          return { status: 200, body: rpcResult(id, await callTool(fetchImpl, name, args)) };
        } catch (e) {
          if (e && e.code === -32602) {
            return { status: 200, body: rpcError(id, -32602, e.message) };
          }
          // Tool execution failure is a tool RESULT (isError), not a transport error.
          return {
            status: 200,
            body: rpcResult(id, {
              content: [{ type: "text", text: String((e && e.message) || e) }],
              isError: true,
            }),
          };
        }
      }
      default:
        return { status: 200, body: rpcError(id, -32601, "Method not found: " + body.method) };
    }
  } catch (e) {
    return { status: 200, body: rpcError(id, -32603, String((e && e.message) || e)) };
  }
}

module.exports = {
  TOOLS: TOOLS,
  slugify: slugify,
  handleRequest: handleRequest,
  callTool: callTool,
  API_BASE: API_BASE,
  SERVER_VERSION: SERVER_VERSION,
};
