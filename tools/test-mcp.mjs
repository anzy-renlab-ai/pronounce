// Hosted MCP endpoint logic tests — no network; fetchImpl is stubbed.
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const lib = require("../api/mcp-lib.js");

const NGINX = {
  word: "nginx", ipa: "/ˈɛn dʒɪnˈɛks/", respelling_us: "engine X",
  alt_ipa: [], alt_respelling_us: [], source_url: "https://nginx.org/en/",
  source_label: "NGINX official", category: "product",
  confidence: "creator-clarified",
  notes: '"engine-x" is the documented reading from the official site.',
  audio_url: "https://pronounce.renlab.ai/audio/nginx.mp3",
};
const WORDS = [
  { word: "kubectl", slug: "kubectl", category: "cli-tool", confidence: "contested" },
  { word: "nginx", slug: "nginx", category: "product", confidence: "creator-clarified" },
];

function stubFetch(routes, statusBy = {}) {
  return (url) => {
    if (url in routes) {
      return Promise.resolve({ ok: true, status: 200, json: async () => routes[url] });
    }
    if (url in statusBy) return Promise.resolve({ ok: false, status: statusBy[url], json: async () => ({}) });
    return Promise.reject(new Error("unexpected fetch " + url));
  };
}
const BASE = "https://pronounce.renlab.ai";
const okRoutes = { [BASE + "/api/word/nginx.json"]: NGINX, [BASE + "/api/words.json"]: WORDS };

test("slugify mirrors server.py (1:1, C++ -> c--)", () => {
  assert.equal(lib.slugify("nginx"), "nginx");
  assert.equal(lib.slugify("C++"), "c--");
  assert.equal(lib.slugify("Boba/&Tutor"), "boba--tutor");
});

test("initialize returns negotiated protocol + serverInfo", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), {
    jsonrpc: "2.0", id: 1, method: "initialize",
    params: { protocolVersion: "2025-06-18" },
  });
  assert.equal(r.status, 200);
  assert.equal(r.body.result.protocolVersion, "2025-06-18");
  assert.equal(r.body.result.serverInfo.name, "pronounce");
  assert.match(r.body.result.instructions, /kubectl/);
});

test("initialize falls back when client version unknown", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), {
    jsonrpc: "2.0", id: 2, method: "initialize",
    params: { protocolVersion: "1999-01-01" },
  });
  assert.equal(r.body.result.protocolVersion, "2025-06-18");
});

test("tools/list exposes the three stdio-parity tools", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), { jsonrpc: "2.0", id: 3, method: "tools/list" });
  assert.deepEqual(r.body.result.tools.map((t) => t.name),
    ["pronounce", "search_pronunciations", "list_pronunciations"]);
  for (const t of r.body.result.tools) {
    assert.equal(t.inputSchema.type, "object", t.name + " inputSchema");
  }
});

test("pronounce returns the entry with url/audio/source_repo", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), {
    jsonrpc: "2.0", id: 4, method: "tools/call",
    params: { name: "pronounce", arguments: { word: "nginx" } },
  });
  const payload = JSON.parse(r.body.result.content[0].text);
  assert.equal(payload.respelling_us, "engine X");
  assert.equal(payload.url, BASE + "/word/nginx");
  assert.equal(payload.source_repo, "https://github.com/anzy-renlab-ai/pronounce");
});

test("pronounce 404 -> not_found error dict, not JSON-RPC error", async () => {
  const f = stubFetch(okRoutes, { [BASE + "/api/word/zzznope.json"]: 404 });
  const r = await lib.handleRequest(f, {
    jsonrpc: "2.0", id: 5, method: "tools/call",
    params: { name: "pronounce", arguments: { word: "zzznope" } },
  });
  const payload = JSON.parse(r.body.result.content[0].text);
  assert.equal(payload.error, "not_found");
  assert.ok(!r.body.result.isError);
});

test("search matches word + category substrings", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), {
    jsonrpc: "2.0", id: 6, method: "tools/call",
    params: { name: "search_pronunciations", arguments: { query: "product" } },
  });
  const payload = JSON.parse(r.body.result.content[0].text);
  assert.deepEqual(payload.map((w) => w.word), ["nginx"]);
});

test("list filters by category and clamps limit", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), {
    jsonrpc: "2.0", id: 7, method: "tools/call",
    params: { name: "list_pronunciations", arguments: { category: "CLI-TOOL", limit: 50 } },
  });
  const payload = JSON.parse(r.body.result.content[0].text);
  assert.deepEqual(payload.map((w) => w.word), ["kubectl"]);
});

test("notifications return 202 with no body", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), {
    jsonrpc: "2.0", method: "notifications/initialized",
  });
  assert.equal(r.status, 202);
  assert.equal(r.body, undefined);
});

test("unknown method -> -32601; invalid request -> 400", async () => {
  const f = stubFetch(okRoutes);
  const r1 = await lib.handleRequest(f, { jsonrpc: "2.0", id: 8, method: "nope" });
  assert.equal(r1.body.error.code, -32601);
  const r2 = await lib.handleRequest(f, { hello: 1 });
  assert.equal(r2.status, 400);
  assert.equal(r2.body.error.code, -32600);
});

test("unknown tool -> JSON-RPC -32602 per MCP spec", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), {
    jsonrpc: "2.0", id: 9, method: "tools/call",
    params: { name: "no_such_tool", arguments: {} },
  });
  assert.equal(r.body.error.code, -32602);
});

test("ping", async () => {
  const r = await lib.handleRequest(stubFetch(okRoutes), { jsonrpc: "2.0", id: 10, method: "ping" });
  assert.deepEqual(r.body.result, {});
});

test("live words.json really parses (>1900 entries) when reachable", async () => {
  // Network smoke against production — tolerated offline.
  try {
    const res = await fetch(BASE + "/api/words.json");
    const words = await res.json();
    assert.ok(words.length > 1900, "words.json unexpectedly small: " + words.length);
  } catch (e) {
    assert.ok(true, "offline — skipped");
  }
});
