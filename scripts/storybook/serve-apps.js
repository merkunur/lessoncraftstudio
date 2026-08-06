#!/usr/bin/env node
/* =====================================================================
   serve-apps.js — a persistent LOCAL server so the operator can open a
   worksheet-generator app, Generate, and click "Export for Storybook"
   (the manual SEP export) to test the transparent crop → ZIP flow.

   Serves frontend/public/ (the apps + js/catalog-export.js) + image-library-webp
   + stubs /api/images, /api/themes*, /api/verify-app-access (→ hasAccess:true,
   so the admin export buttons reveal once localStorage.accessToken is set).

   USAGE:  node scripts/storybook/serve-apps.js        (default port 5190)
           PORT=6001 node scripts/storybook/serve-apps.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..', '..');
const PUB = path.join(REPO, 'frontend', 'public');
const PORT = parseInt(process.env.PORT || '5190', 10);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };

/* localized image names from image-vocabulary.js (so a theme's images carry words) */
let VOCAB = null;
function loadVocab() {
  if (VOCAB) return VOCAB;
  try {
    const src = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
    const sb = {}; sb.window = sb; vm.createContext(sb);
    vm.runInContext(src + '\n;globalThis.__VOCAB = (typeof IMAGE_VOCABULARY !== "undefined") ? IMAGE_VOCABULARY : {};', sb, { filename: 'image-vocabulary.js' });
    VOCAB = sb.__VOCAB || {};
  } catch (e) { VOCAB = {}; }
  return VOCAB;
}
function localizedName(fileKey, locale) {
  const v = loadVocab(), e = v[fileKey.toLowerCase()];
  return (e && e[locale] && e[locale][0]) || fileKey;
}
function themeDirs() {
  const r = path.join(PUB, 'images');
  if (!fs.existsSync(r)) return [];
  return fs.readdirSync(r).filter(f => { try { return fs.statSync(path.join(r, f)).isDirectory(); } catch (e) { return false; } });
}
function fromTheme(t, locale) {
  const d = path.join(PUB, 'images', t);
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d).filter(f => /\.(png|webp|jpg)$/i.test(f)).map(f => {
    const key = f.replace(/\.\w+$/, '').replace(/\s*\d+$/, '');
    const nm = localizedName(key, locale);
    return { path: '/images/' + t + '/' + f, name: nm, word: nm, theme: t };
  });
}

const srv = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://127.0.0.1');
  let p = decodeURIComponent(u.pathname);

  if (p === '/api/images') {
    const theme = u.searchParams.get('theme') || '', locale = u.searchParams.get('locale') || 'en', search = u.searchParams.get('search') || '';
    let images = [];
    if (theme) images = fromTheme(theme, locale);
    else if (search) themeDirs().forEach(t => { images = images.concat(fromTheme(t, locale).filter(i => i.word.toLowerCase().includes(search.toLowerCase()))); });
    else themeDirs().forEach(t => { images = images.concat(fromTheme(t, locale)); });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ images, hasMore: false, total: images.length }));
  }
  if (/\/themes-translated$/.test(p) || /\/themes$/.test(p)) {
    const th = themeDirs().map(t => ({ value: t, id: t, name: t, displayName: t, translatedName: t, theme: t, folderName: t, count: 1 }));
    res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify(th));
  }
  if (p.indexOf('/api/verify') >= 0 || p.indexOf('verify-app-access') >= 0) {
    res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end('{"hasAccess":true}');
  }
  if (p.startsWith('/api/')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end('[]'); }

  if (p === '/' || p === '') p = '/index.html';
  let f = path.join(PUB, p.replace(/^\//, ''));
  if (p.startsWith('/image-library-webp/') && !fs.existsSync(f)) f = path.join(REPO, p.replace(/^\//, ''));
  if (fs.existsSync(f) && fs.statSync(f).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    return fs.createReadStream(f).pipe(res);
  }
  res.writeHead(404); res.end('404 ' + p);
});
srv.listen(PORT, '127.0.0.1', () => {
  console.log('\n  Worksheet-app server (manual Export-for-Storybook testing):');
  console.log('    →  http://127.0.0.1:' + PORT + '/worksheet-generators/word-guess.html');
  console.log('  To reveal the admin "Export for Storybook" button, run once in the browser console:');
  console.log("       localStorage.setItem('accessToken','local'); location.reload();");
  console.log('  (Ctrl+C to stop.)\n');
});
