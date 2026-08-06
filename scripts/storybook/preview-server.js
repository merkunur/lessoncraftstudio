#!/usr/bin/env node
/* =====================================================================
   preview-server.js — a standing local server to PLAY storybook exercises.

   Serves the real storybook player (mini tools/) + image-library-webp + audio, and an
   index at / that lists every playable story (any mini tools/stories/<id>/ with a
   story.json) with a click-to-play link. No build, no deploy. Use it to eyeball the
   29 apps' storybook exercises (run gen-preview-stories.js first) + the golden
   Pip's Picnic.

   USAGE:  node scripts/storybook/preview-server.js         (default port 5178)
           PORT=6000 node scripts/storybook/preview-server.js
   Then open the printed http://127.0.0.1:<port>/ .
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const MINI = path.join(REPO, 'mini tools');
const STORIES = path.join(MINI, 'stories');
const PORT = parseInt(process.env.PORT || '5178', 10);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

function matrixMeta() {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'storybook', 'app-coverage-matrix.json'), 'utf8'));
    const map = {};
    (m.apps || []).forEach(a => { map[a.app] = { family: (a.mapper && a.mapper[0]) || a.family, bucket: a.bucket }; });
    return map;
  } catch (e) { return {}; }
}

function listStories() {
  let ids = [];
  try { ids = fs.readdirSync(STORIES).filter(d => { try { return fs.existsSync(path.join(STORIES, d, 'story.json')); } catch (e) { return false; } }); }
  catch (e) {}
  return ids.sort();
}

function indexHtml() {
  const meta = matrixMeta();
  const ids = listStories();
  const previews = ids.filter(id => id.startsWith('preview-'));
  const others = ids.filter(id => !id.startsWith('preview-'));
  const famName = { A: 'A · letter/number fill', B: 'B · drag-trace path/word', C: 'C · tap', D: 'D · bar-chart', E: 'E · connect', F: 'F · drag-drop' };
  const byFam = {};
  previews.forEach(id => {
    const app = id.replace(/^preview-/, '');
    const f = (meta[app] && meta[app].family) || '?';
    (byFam[f] = byFam[f] || []).push(app);
  });
  function card(id, label, sub) {
    const url = '/mini-tools/storybook.html?activity=storybook.' + encodeURIComponent(id) + '&lang=en&embed=1&sound=on';
    return '<a class="card" href="' + url + '"><div class="t">' + label + '</div>' + (sub ? '<div class="s">' + sub + '</div>' : '') + '</a>';
  }
  let body = '<h1>Storybook — local preview</h1><p class="lede">Click any exercise to play it in the real player. Generate/refresh the per-app previews with <code>node scripts/storybook/gen-preview-stories.js</code>.</p>';
  if (others.length) {
    body += '<h2>Full stories</h2><div class="grid">' + others.map(id => card(id, id, id === 'pips-picnic' ? 'the golden multi-page story' : '')).join('') + '</div>';
  }
  Object.keys(byFam).sort().forEach(f => {
    body += '<h2>Family ' + (famName[f] || f) + '</h2><div class="grid">' +
      byFam[f].sort().map(app => card('preview-' + app, app, (meta[app] && meta[app].bucket) || '')).join('') + '</div>';
  });
  if (!previews.length) body += '<p class="empty">No per-app previews yet — run <code>node scripts/storybook/gen-preview-stories.js</code> (they appear here as they finish; reload).</p>';
  return '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Storybook preview</title><style>' +
    'body{font:16px/1.5 system-ui,Segoe UI,Roboto,sans-serif;margin:0;background:#FBF3E4;color:#1C1C1E}' +
    'h1{margin:24px 20px 4px}.lede{margin:0 20px 8px;color:#555}.empty{margin:20px;color:#a05}' +
    'h2{margin:24px 20px 8px;font-size:15px;color:#146B5E;text-transform:uppercase;letter-spacing:.04em}' +
    '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;margin:0 20px}' +
    '.card{display:block;padding:14px 16px;background:#fff;border:2px solid #DCE1E6;border-radius:12px;text-decoration:none;color:inherit;transition:border-color .15s,transform .1s}' +
    '.card:hover{border-color:#F2784B;transform:translateY(-1px)}.card .t{font-weight:800;color:#146B5E}.card .s{font-size:13px;color:#777;margin-top:2px}' +
    'code{background:#eee;padding:1px 5px;border-radius:4px;font-size:14px}' +
    '</style>' + body + '<p style="margin:28px 20px;color:#999;font-size:13px">served from mini&nbsp;tools/ · nothing here is deployed</p>';
}

const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(indexHtml());
  }
  let file = null;
  if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.replace('/mini-tools/', ''));
  else if (p.startsWith('/image-library-webp/')) file = path.join(REPO, p.replace(/^\//, ''));
  else if (p.startsWith('/audio/')) file = path.join(REPO, 'frontend', 'public', p.replace(/^\//, ''));
  if (file && fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    return fs.createReadStream(file).pipe(res);
  }
  res.writeHead(404); res.end('404 ' + p);
});
srv.listen(PORT, '127.0.0.1', () => {
  console.log('\n  Storybook preview server running:');
  console.log('    →  http://127.0.0.1:' + PORT + '/\n');
  console.log('  Open that in your browser and click any exercise to play it.');
  console.log('  (Ctrl+C to stop.)\n');
});
