#!/usr/bin/env node
/* =====================================================================
   serve.js — zero-dependency LOCAL games dev server + live-reload
   ---------------------------------------------------------------------
   The frictionless local test loop for the premium games program. Serves
   the games source tree production-identically so the SAME paths resolve
   locally and in production, with no-cache + auto-refresh-on-save so the
   operator can iterate on art/layout/timing many times per game without a
   deploy (everything stays LOCAL until ~300 games are ready).

   Built on Node core only (http + fs + fs.watch) — no npm deps (none are
   installed). One command, stays running:

     node scripts/games/serve.js            # opens the harness, live-reloads
     node scripts/games/serve.js --port=5500 --no-open

   Path mapping (mirrors the prod symlink frontend/public/mini-tools -> "mini tools"):
     /                       -> 302 /mini-tools/game-preview.html
     /mini-tools/<x>         -> <repo>/mini tools/<x>
     /image-library-webp/<x> -> <repo>/image-library-webp/<x>   (local copy)
     /__livereload           -> SSE stream; fs.watch("mini tools") pushes "reload"
   Every .html response gets a tiny EventSource snippet injected so the
   browser reloads itself on any save under "mini tools/".
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const PORT = parseInt(arg('port', '5173'), 10);
const OPEN = !has('no-open');
const ROOT = path.join(__dirname, '..', '..');
const MINI = path.join(ROOT, 'mini tools');
const LIB = path.join(ROOT, 'image-library-webp');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

const LIVE_RELOAD_SNIPPET =
  '\n<script>(function(){try{var s=new EventSource("/__livereload");' +
  's.onmessage=function(e){if(e.data==="reload")location.reload();};}catch(_){}}());</script>\n';

/* ---- SSE clients for live-reload ---- */
const sseClients = new Set();
function broadcastReload() { for (const res of sseClients) { try { res.write('data: reload\n\n'); } catch (_) {} } }

/* map a URL path to an absolute file path within an allowed base; null if
   it escapes the base (path-traversal guard) or isn't a mapped prefix. */
function resolveFile(urlPath) {
  let p;
  if (urlPath === '/mini-tools' || urlPath.startsWith('/mini-tools/')) {
    p = path.join(MINI, decodeURIComponent(urlPath.slice('/mini-tools'.length)));
    if (!path.resolve(p).startsWith(path.resolve(MINI))) return null;
    return p;
  }
  if (urlPath.startsWith('/image-library-webp/')) {
    p = path.join(LIB, decodeURIComponent(urlPath.slice('/image-library-webp'.length)));
    if (!path.resolve(p).startsWith(path.resolve(LIB))) return null;
    return p;
  }
  return null;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); res.end('GET only'); return; }
  const urlPath = req.url.split('?')[0];

  if (urlPath === '/') { res.writeHead(302, { Location: '/mini-tools/game-preview.html' }); res.end(); return; }

  if (urlPath === '/__livereload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' });
    res.write('retry: 1000\n\n');
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  let file = resolveFile(urlPath);
  if (!file) { res.writeHead(404, { 'Cache-Control': 'no-store' }); res.end('Not found: ' + urlPath); return; }

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { 'Cache-Control': 'no-store' }); res.end('Not found: ' + urlPath); return; }
    const ext = path.extname(file).toLowerCase();
    const type = TYPES[ext] || 'application/octet-stream';
    const headers = { 'Content-Type': type, 'Cache-Control': 'no-store' };
    if (ext === '.html') {
      // inject the live-reload snippet so the browser auto-refreshes on save
      fs.readFile(file, 'utf8', (e2, html) => {
        if (e2) { res.writeHead(500); res.end('read error'); return; }
        const out = html.includes('</body>') ? html.replace('</body>', LIVE_RELOAD_SNIPPET + '</body>') : html + LIVE_RELOAD_SNIPPET;
        res.writeHead(200, headers);
        res.end(req.method === 'HEAD' ? undefined : out);
      });
    } else {
      res.writeHead(200, headers);
      if (req.method === 'HEAD') { res.end(); return; }
      fs.createReadStream(file).pipe(res);
    }
  });
});

/* ---- watch the source for live-reload (recursive works on Windows) ---- */
let debounce = null;
try {
  fs.watch(MINI, { recursive: true }, () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(broadcastReload, 120);
  });
} catch (e) {
  console.warn('[serve] fs.watch unavailable (' + e.message + ') — live-reload off; manual refresh still fresh (no-store).');
}

server.listen(PORT, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:' + PORT + '/mini-tools/game-preview.html';
  console.log('LCS games dev server');
  console.log('  serving "mini tools/"        at  /mini-tools/');
  console.log('  serving "image-library-webp/" at  /image-library-webp/');
  console.log('  live-reload: edit + save under "mini tools/" -> browser auto-refreshes');
  console.log('  no-store caching (every refresh is fresh)');
  console.log('\n  ' + url + '\n');
  if (OPEN) {
    const cmd = process.platform === 'win32' ? 'start "" "' + url + '"'
      : process.platform === 'darwin' ? 'open "' + url + '"' : 'xdg-open "' + url + '"';
    exec(cmd, () => {});
  }
});
