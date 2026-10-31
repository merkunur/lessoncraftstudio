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
  ['/makers/app/ui-strings.js', path.join(REPO, 'out', 'makers', 'ui-strings.js')],   // generated: build-ui-strings.js
  ['/makers/app/vendor/', path.join(REPO, 'out', 'makers', 'vendor')],             // generated: build-bundles.js (pdf-lib)
  ['/makers/app/', path.join(__dirname, 'shell')],
  ['/makers-assets/themes-512/', path.join(REPO, 'scripts', 'worksheet-gen', 'cache', 'themes-512')],
  ['/makers-assets/fonts/', path.join(REPO, 'scripts', 'worksheet-gen', 'assets', 'fonts')],
  ['/makers/', path.join(REPO, 'out', 'makers')],
];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.map': 'application/json' };

/*
 * A stand-in for the site's metering API (frontend/lib/quota.ts), so the access rules can be tried locally:
 *   /__dev/access?as=anon|free|sub[&made=N][&downloaded=N]   switch who you are (default: sub)
 * It answers like the real routes: anonymous make/download → 401, a free account past 3 → 402, a subscriber unlimited.
 */
const dev = { as: (process.argv.find((a) => a.startsWith('--access=')) || '--access=sub').slice(9), made: 0, downloaded: 0 };
const CAP = 3;
function devApi(req, res, url, query) {
  const send = (status, body) => { res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(body)); };
  if (url === '/__dev/access') {
    if (query.get('as')) dev.as = query.get('as');
    if (query.get('made') !== null) dev.made = Number(query.get('made'));
    if (query.get('downloaded') !== null) dev.downloaded = Number(query.get('downloaded'));
    return send(200, dev);
  }
  const meter = (used) => (dev.as === 'sub' ? 'unlimited' : dev.as === 'anon' ? 0 : Math.max(0, CAP - used));
  if (url === '/api/quota/status') {
    return send(200, { kind: { anon: 'anon', free: 'free-user', sub: 'subscriber' }[dev.as], make: { remaining: meter(dev.made) }, download: { remaining: meter(dev.downloaded) } });
  }
  if (url === '/api/quota/check-and-increment' && req.method === 'POST') {
    let body = '';
    req.on('data', (c) => { body += c; });
    req.on('end', () => {
      const kind = (JSON.parse(body || '{}').kind) || 'play';
      const field = kind === 'make' ? 'made' : 'downloaded';
      if (dev.as === 'sub') return send(200, { allowed: true, remaining: 'unlimited' });
      if (dev.as === 'anon') return send(401, { allowed: false, reason: 'signup_required' });
      if (dev[field] >= CAP) return send(402, { allowed: false, reason: 'quota_exceeded', remaining: 0 });
      dev[field]++;
      return send(200, { allowed: true, used: dev[field], remaining: CAP - dev[field] });
    });
    return true;
  }
  return false;
}

/*
 * The local hub (operator 2026-10-31: "a local page like a hub where I can find and test every new worksheet maker…
 * it should also show the list of the makers you are planning to build"):
 *   /          the hub page (shell/hub.html)
 *   /hub.json  live data: every planned maker (scripts/makers/topic-map.js), its templates today (the type inventory,
 *              hideIds removed), its planned new templates (docs/makers/NEW-TEMPLATES.md "— N new"), whether it is built
 *              (out/makers/<id>/current.txt) and the build's own template count; plus who you are testing as (dev.as)
 */
function hubData() {
  for (const k of Object.keys(require.cache)) if (k.includes(path.join('scripts', 'makers', 'topic-map.js'))) delete require.cache[k];
  const { MAKERS } = require('./topic-map.js');
  const inv = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'makers', 'inventory', 'types.json'), 'utf8')).rows;
  const md = fs.readFileSync(path.join(REPO, 'docs', 'makers', 'NEW-TEMPLATES.md'), 'utf8');
  const planned = {};
  for (const m of md.matchAll(/^### \d+\. .*\(`([a-z0-9-]+)`\) — (\d+) new/gm)) planned[m[1]] = Number(m[2]);
  const makers = MAKERS.map((m, i) => {
    const types = inv.filter((r) => !r.science && (m.families.includes(r.family) || (m.extraIds || []).includes(r.id)) && !(m.hideIds || []).includes(r.id));
    const cur = path.join(REPO, 'out', 'makers', m.id, 'current.txt');
    let built = null;
    if (fs.existsSync(cur)) {
      const ver = fs.readFileSync(cur, 'utf8').trim();
      try {
        const tj = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', m.id, ver, 'templates.json'), 'utf8'));
        built = { version: ver, templates: tj.templates.length, locales: [...new Set(tj.templates.flatMap((t) => t.locales))] };
      } catch (e) { built = { version: ver, templates: 0, locales: [] }; }
    }
    return { order: i + 1, id: m.id, name: m.name, group: m.group, oldApps: m.oldApps || [], templatesToday: types.length, plannedNew: planned[m.id] || 0, built };
  });
  return { as: dev.as, makers, lan: lanUrls() };
}

/** This PC's addresses on the home network (for opening the makers on an iPad on the same Wi-Fi). */
function lanUrls() {
  const out = [];
  for (const list of Object.values(require('os').networkInterfaces())) for (const a of list || []) if (a.family === 'IPv4' && !a.internal && !a.address.startsWith('169.254.')) out.push(`http://${a.address}:${PORT}/`);
  return out;
}

function handler(req, res) {
  const [rawPath, rawQuery] = req.url.split('?');
  if (rawPath === '/hub.json') { res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' }); return res.end(JSON.stringify(hubData())); }
  if (rawPath === '/' || rawPath === '/index.html') { res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' }); return fs.createReadStream(path.join(__dirname, 'shell', 'hub.html')).pipe(res); }
  if (rawPath.startsWith('/__dev/') || rawPath.startsWith('/api/quota/')) { if (devApi(req, res, rawPath, new URLSearchParams(rawQuery || '')) !== false) return; }
  const url = decodeURIComponent(rawPath);
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

if (require.main === module) http.createServer(handler).listen(PORT, () => console.log(`makers preview: http://localhost:${PORT}/  (iPad on the same Wi-Fi: ${lanUrls().join(' ') || 'no network address'})`));
module.exports = { handler };
