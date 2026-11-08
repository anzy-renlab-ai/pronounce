"use strict";

// Vercel Node function for the hosted MCP endpoint.
// Public URL: https://pronounce.renlab.ai/mcp (vercel.json rewrite).
// Stateless streamable-HTTP: every POST gets a single application/json
// JSON-RPC response (no SSE, no sessions — the spec allows this for
// stateless servers).

const { handleRequest, SUPPORTED_PROTOCOLS } = require("./mcp-lib.js");

function readBody(req) {
  // Concatenate Buffers, decode once — chunk-boundary splits inside a
  // multi-byte UTF-8 sequence would corrupt the text if decoded per chunk.
  return new Promise(function (resolve, reject) {
    const chunks = [];
    req.on("data", function (c) { chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)); });
    req.on("end", function () { resolve(Buffer.concat(chunks).toString("utf8")); });
    req.on("error", reject);
  });
}

module.exports = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Mcp-Session-Id, Last-Event-ID");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method === "GET") {
    res.status(405).json({
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Streamable-HTTP MCP endpoint. POST JSON-RPC 2.0 messages " +
          "(initialize, tools/list, tools/call). " +
          "Add to Claude Code: claude mcp add --transport http pronounce " +
          "https://pronounce.renlab.ai/mcp",
      },
    });
    return;
  }
  if (req.method === "DELETE") { res.status(200).end(); return; } // stateless: no session to end
  if (req.method !== "POST") { res.status(405).json({ error: "POST, GET, DELETE, OPTIONS only" }); return; }

  // MCP spec: invalid/unsupported MCP-Protocol-Version header MUST get 400.
  const pv = req.headers["mcp-protocol-version"];
  if (pv !== undefined && SUPPORTED_PROTOCOLS.indexOf(String(pv)) === -1) {
    res.status(400).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32000,
        message: "Unsupported MCP-Protocol-Version: " + pv +
          " (supported: " + SUPPORTED_PROTOCOLS.join(", ") + ")",
      },
    });
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(await readBody(req));
  } catch (e) {
    res.status(400).json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error: " + e.message } });
    return;
  }
  try {
    const r = await handleRequest(fetch, parsed);
    if (r.body === undefined) { res.status(r.status).end(); return; }
    res.status(r.status).json(r.body);
  } catch (e) {
    res.status(500).json({ jsonrpc: "2.0", id: null, error: { code: -32603, message: "Internal error" } });
  }
};
module.exports.readBody = readBody; // exposed for tests
