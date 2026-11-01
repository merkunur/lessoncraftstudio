#!/usr/bin/env node
/**
 * Local preview of the worksheet makers, laid out like production (ARCHITECTURE §1):
 *   /makers/app/…            the maker screen (scripts/makers/shell/)
 *   /makers/<maker>/…        built bundles (out/makers/)
 *   /makers/data/…           preloaded data (out/makers/data/)
 *   /makers-assets/themes-512/…  pictures (scripts/worksheet-gen/cache/themes-512/)
 *   /makers-assets/fonts/…   worksheet fonts (scripts/worksheet-gen/assets/fonts/)
 *   /makers/play/…           the student play shell (scripts/makers/play/ + its strings, landings, two shell modules)
 *   /s/<linkId>              a student link: the play shell with its <head> card and site chrome filled per link
 *                            (play/link-page.js → play/ssr.js, as frontend/app/s/[id]/route.ts does on the website)
 *   /api/qr?u=<url>          the share sheet's QR code (the site's /api/qr, frontend/node_modules/qrcode)
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
  // the play tree (scripts/makers/build-play.js copies these same files into out/makers/play/<version>/ for the site)
  ['/makers/play/resolve-version.js', path.join(__dirname, 'shell', 'resolve-version.js')],
  ['/makers/play/recipe.js', path.join(__dirname, 'shell', 'recipe.js')],
  ['/makers/play/strings.json', path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'play-strings.json')],
  ['/makers/play/', path.join(__dirname, 'play')],
  ['/makers-assets/themes-512/', path.join(REPO, 'scripts', 'worksheet-gen', 'cache', 'themes-512')],
  ['/makers-assets/fonts/', path.join(REPO, 'scripts', 'worksheet-gen', 'assets', 'fonts')],
  ['/makers/migrations/', path.join(REPO, 'docs', 'makers', 'migrations')],          // content-fix records (record-fix.js)
  ['/makers/', path.join(REPO, 'out', 'makers')],
  // the site chrome's brand mark on the student page (the website serves these from frontend/public)
  ['/logo-lcs.webp', path.join(REPO, 'frontend', 'public', 'logo-lcs.webp')],
  ['/logo-lcs-optimized.png', path.join(REPO, 'frontend', 'public', 'logo-lcs-optimized.png')],
  ['/favicon.ico', path.join(REPO, 'frontend', 'public', 'favicon.ico')],
];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.map': 'application/json' };

/*
 * A stand-in for the site's metering API (frontend/lib/quota.ts), so the access rules can be tried locally:
 *   /__dev/access?as=anon|free|sub[&made=N][&downloaded=N][&played=N]   switch who you are (default: sub)
 * It answers like the real routes: anonymous make/download → 401, a free account past 3 → 402, a subscriber unlimited;
 * plays are 10 a day for anonymous and free alike (quota.ts PLAYS_PER_DAY).
 */
const dev = { as: (process.argv.find((a) => a.startsWith('--access=')) || '--access=sub').slice(9), made: 0, downloaded: 0, played: 0 };
const CAP = 3;
const PLAY_CAP = 10;
function devApi(req, res, url, query) {
  const send = (status, body) => { res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(body)); };
  if (url === '/__dev/access') {
    if (query.get('as')) dev.as = query.get('as');
    if (query.get('made') !== null) dev.made = Number(query.get('made'));
    if (query.get('downloaded') !== null) dev.downloaded = Number(query.get('downloaded'));
    if (query.get('played') !== null) dev.played = Number(query.get('played'));
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
      if (dev.as === 'sub') return send(200, { allowed: true, remaining: 'unlimited' });
      if (kind === 'play') {
        if (dev.played >= PLAY_CAP) return send(402, { allowed: false, reason: 'quota_exceeded', remaining: 0 });
        dev.played++;
        return send(200, { allowed: true, used: dev.played, remaining: PLAY_CAP - dev.played });
      }
      const field = kind === 'make' ? 'made' : 'downloaded';
      if (dev.as === 'anon') return send(401, { allowed: false, reason: 'signup_required' });
      if (dev[field] >= CAP) return send(402, { allowed: false, reason: 'quota_exceeded', remaining: 0 });
      dev[field]++;
      return send(200, { allowed: true, used: dev[field], remaining: CAP - dev[field] });
    });
    return true;
  }
  // the share sheet's QR code (the site's /api/qr?u=; locally any URL of this preview is encoded)
  if (url === '/api/qr' && req.method === 'GET') {
    let QR = null;
    try { QR = require(path.join(REPO, 'frontend', 'node_modules', 'qrcode')); } catch (e) { /* not installed */ }
    const u = query.get('u') || '';
    if (!QR || !/^https?:\/\//.test(u)) { res.writeHead(400); res.end('bad request'); return true; }
    QR.toBuffer(u, { type: 'png', width: 480, margin: 2, color: { dark: '#146B5E', light: '#FFFFFF' } }).then((png) => { res.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'no-store' }); res.end(png); }).catch(() => { res.writeHead(500); res.end(); });
    return true;
  }
  return false;
}

/*
 * The student play page, /s/<linkId> (INTERACTIVE-AND-SHARING §C.6): the static play shell with the per-link <head>
 * (title, Open Graph card, noindex) and the site chrome filled in — exactly what frontend/app/s/[id]/route.ts serves on
 * the website (both call play/ssr.js). Unknown / taken-back link → the kid-safe 404 page. The headers are the website's.
 */
const play = { template: null, strings: null, landings: null, chrome: {}, ui: {} };
function playAssets() {
  if (!play.template) play.template = fs.readFileSync(path.join(__dirname, 'play', 'index.html'), 'utf8');
  if (!play.strings) play.strings = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'play-strings.json'), 'utf8'));
  if (!play.landings) play.landings = require('./play/makers-index.js').landings();
  return play;
}
function playPage(req, res, linkId) {
  const { linkPageHtml, notFoundHtml } = require('./play/link-page.js');
  const { chromeFor } = require('./play/chrome.js');
  const a = playAssets();
  const headers = { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex', 'cache-control': 'public, max-age=0, s-maxage=300' };
  const link = /^[a-z0-9]{6,20}$/i.test(linkId) ? require('./local-store.js').readLink(linkId) : null;
  if (!link) { res.writeHead(404, headers); return res.end(notFoundHtml(a.strings, 'en')); }
  const lang = link.recipe.lang;
  if (!a.chrome[lang]) a.chrome[lang] = chromeFor(lang);
  if (!a.ui[lang]) { try { a.ui[lang] = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'makers', lang + '.json'), 'utf8')); } catch (e) { a.ui[lang] = {}; } }
  const origin = 'http://' + (req.headers.host || ('localhost:' + PORT));
  const html = linkPageHtml({ link, makersDir: path.join(REPO, 'out', 'makers'), template: a.template, base: '/makers/play', origin, strings: a.strings, landings: a.landings, chrome: a.chrome[lang], uiStrings: a.ui[lang] });
  res.writeHead(200, headers); res.end(html);
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
  if (rawPath.startsWith('/__dev/') || rawPath.startsWith('/api/quota/') || rawPath === '/api/qr') { if (devApi(req, res, rawPath, new URLSearchParams(rawQuery || '')) !== false) return; }
  // saved worksheets + share links (local stand-in for the website's /api/makers/*; who = anon | free | sub)
  if (rawPath.startsWith('/api/makers/') && require('./local-store.js').handle(req, res, rawPath, new URLSearchParams(rawQuery || ''), dev.as) !== false) return;
  // a student link
  const sm = /^\/s\/([^/]+)\/?$/.exec(rawPath);
  if (sm) return playPage(req, res, decodeURIComponent(sm[1]));
  // the play tree's landings (makers → the indexable page per language; build-play.js writes the same file for the site)
  if (rawPath === '/makers/play/landings.json') { res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' }); return res.end(JSON.stringify(playAssets().landings)); }
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
