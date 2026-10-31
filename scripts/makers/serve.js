#!/usr/bin/env node
/**
 * Local preview of the worksheet makers, laid out like production (ARCHITECTURE §1):
 *   /makers/app/…            the maker screen (scripts/makers/shell/)
 *   /makers/<maker>/…        built bundles (out/makers/)
 *   /makers/data/…           preloaded data (out/makers/data/)
 *   /makers-assets/themes-512/…  pictures (scripts/worksheet-gen/cache/themes-512/)
 *   /makers-assets/fonts/…   worksheet fonts (scripts/worksheet-gen/assets/fonts/)
 *
 *   node scripts/makers/serve.js [--port=8490]   →  http://localhost:8490/makers/app/?maker=counting&lang=de
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..');
const PORT = Number((process.argv.find((a) => a.startsWith('--port=')) || '--port=8490').slice(7));
const ROUTES = [
  ['/makers/app/', path.join(__dirname, 'shell')],
  ['/makers-assets/themes-512/', path.join(REPO, 'scripts', 'worksheet-gen', 'cache', 'themes-512')],
  ['/makers-assets/fonts/', path.join(REPO, 'scripts', 'worksheet-gen', 'assets', 'fonts')],
  ['/makers/', path.join(REPO, 'out', 'makers')],
];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.map': 'application/json' };

function handler(req, res) {
  const url = decodeURIComponent(req.url.split('?')[0]);
  for (const [prefix, dir] of ROUTES) {
    if (!url.startsWith(prefix)) continue;
    let f = path.join(dir, url.slice(prefix.length));
    if (!f.startsWith(dir)) break;
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) break;
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' });
    return fs.createReadStream(f).pipe(res);
  }
  res.writeHead(404); res.end('not found');
}

if (require.main === module) http.createServer(handler).listen(PORT, () => console.log(`makers preview: http://localhost:${PORT}/makers/app/?maker=counting&lang=en`));
module.exports = { handler };
