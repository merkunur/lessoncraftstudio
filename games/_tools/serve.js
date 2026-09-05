#!/usr/bin/env node
/* serve.js — the local server for testing games.
 *
 *   node games/_tools/serve.js            (from the repo root, or anywhere)
 *   → http://localhost:8480/              the hub (games/index.html)
 *   → http://localhost:8480/<slug>/index.html?lang=de
 *
 * Serves the games/ folder exactly as production will (same relative paths),
 * with no caching so an edit shows on refresh. Node's http module only.
 * Port 8480 (fixed, so the operator's links stay valid between sessions);
 * pass --port=N to change. Ctrl+C stops it.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const PORT = parseInt((process.argv.find((a) => a.startsWith("--port=")) || "--port=8480").slice(7), 10);
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp",
  ".md": "text/plain; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".woff2": "font/woff2", ".ico": "image/x-icon" };

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/favicon.ico") { res.writeHead(204); return res.end(); }
  if (urlPath.endsWith("/")) urlPath += "index.html";
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("forbidden"); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("404 " + urlPath); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
});
server.listen(PORT, "127.0.0.1", () => {
  console.log("LessonCraft games — local test server");
  console.log("  hub:   http://localhost:" + PORT + "/");
  console.log("  game:  http://localhost:" + PORT + "/<slug>/index.html?lang=en   (lang = en de fr it es pt nl sv da no fi)");
  console.log("  demo:  http://localhost:" + PORT + "/_test/demo.html");
  console.log("Ctrl+C to stop.");
});
server.on("error", (e) => {
  if (e.code === "EADDRINUSE") console.error("Port " + PORT + " is already in use — the server is probably already running. Open http://localhost:" + PORT + "/");
  else console.error(e.message);
  process.exit(1);
});
