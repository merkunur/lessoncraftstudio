#!/usr/bin/env node
/* =====================================================================
   generate-activity-previews.js — render a real, content-clear preview
   thumbnail for every interactive activity, for the activities index cards.

   Activities have no screenshot/thumbnail; the index cards previously showed
   an abstract per-ENGINE glyph that couldn't distinguish activities sharing
   an engine. This script screenshots each activity's actual play area
   (.lcs-stage) — so "Count to 10 with Animals" shows animal counters, "Make
   10" shows the number bond, the clock activity shows a clock face, etc.

   - Serves `mini tools/` at /mini-tools/ AND repo `image-library-webp/` at
     /image-library-webp/ (so themed counters load) from a tiny static server.
   - Loads /mini-tools/<tool>.html?activity=<id>&lang=en&embed=compact, waits
     for .lcs-stage, seeds a content-rich state where on-load is empty
     (ten-frame), screenshots the stage element.
   - Sharp → 480×360 contain on a TRANSPARENT matte → WebP, so the card's
     subject-tinted panel shows through the padding. One canonical en render
     per activity (stage is ~language-neutral) reused across all 11 locales.

   Output: frontend/public/mini-tools/previews/<id>.webp  (gitignored; never
   committed per §A.3 — only this script is committed; the webps are scp'd to
   /var/www/lcs-media/mini-tools/previews/ at deploy).

   Usage: node scripts/generate-activity-previews.js [--only=<id-substr>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const sharp = require('sharp');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'frontend', 'public', 'mini-tools', 'previews');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';

const MIME = {
  '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.woff2': 'font/woff2',
};

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMGLIB, p.slice('/image-library-webp/'.length));
    else if (p === '/' ) { res.statusCode = 404; res.end('no'); return; }
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => {
      if (e) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(b);
    });
  });
}

/* tool slug → mounted window global (CamelCase, hyphens dropped). */
function toolGlobal(tool) {
  return tool.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

/* Per-engine seed (only where on-load is an empty board). Returns a JS string
   run via page.evaluate; wrapped in try/catch by the caller. On-load fallback
   for every other engine (already content-rich). */
function seedScript(row) {
  const g = toolGlobal(row.tool);
  if (row.tool === 'ten-frame-activity') {
    const frames = (row.params && row.params.frames) || 1;
    const n = frames >= 2 ? 13 : 6; // show themed counters across the frame(s)
    return `(function(){var t=window['${g}'];if(t&&t.setCount){t.setCount(${n});if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'array-activity') {
    // Fill every R×C cell so the array of dots + repeated-addition strip show.
    return `(function(){var t=window['${g}'];if(t&&t.filled&&t._key){for(var r=0;r<t.rows;r++)for(var c=0;c<t.cols;c++){t.filled[t._key(r,c)]=true;}if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'place-value-activity') {
    // Add a hundred (no-op if no hundreds place) + a couple tens + a few ones
    // so the columns show blocks and the BUILD readout is non-zero.
    return `(function(){var t=window['${g}'];if(t){try{if(t.addHundred)t.addHundred();}catch(e){}try{if(t.addTen){t.addTen();t.addTen();}}catch(e){}try{if(t.addOne){t.addOne();t.addOne();t.addOne();}}catch(e){}if(t.paint)t.paint();}})();`;
  }
  return null;
}

function loadRows() {
  const files = fs.readdirSync(MINI).filter((f) => /-activities\.json$/.test(f));
  const all = [];
  for (const f of files) {
    try {
      const rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8'));
      for (const r of rows) if (r.slug && r.slug.en) all.push(r);
    } catch (e) { console.warn('skip', f, e.message); }
  }
  return all;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const rows = loadRows().filter((r) => !ONLY || r.id.includes(ONLY));
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  let ok = 0, fail = 0;
  const fails = [];

  for (const row of rows) {
    const page = await browser.newPage();
    await page.setViewport({ width: 720, height: 640, deviceScaleFactor: 2 });
    const url = `${BASE}/mini-tools/${row.tool}.html?activity=${encodeURIComponent(row.id)}&lang=en&embed=compact`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.waitForSelector('.lcs-stage', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 900)); // settle: first task + theme-image fetch
      const seed = seedScript(row);
      if (seed) {
        try { await page.evaluate(seed); await new Promise((r) => setTimeout(r, 500)); }
        catch (e) { console.warn(`  seed failed (${row.id}), using on-load: ${e.message}`); }
      }
      const stage = (await page.$('.lcs-stage')) || (await page.$('.lcs-app'));
      if (!stage) throw new Error('no .lcs-stage / .lcs-app');
      const png = await stage.screenshot({ omitBackground: true });
      await sharp(png)
        .resize(480, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .webp({ quality: 82 })
        .toFile(path.join(OUT, `${row.id}.webp`));
      ok++;
      console.log(`  ok   ${row.id}`);
    } catch (e) {
      fail++;
      fails.push(`${row.id}: ${e.message}`);
      console.log(`  FAIL ${row.id} — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`\nGenerated ${ok} preview(s), ${fail} failure(s) → ${OUT}`);
  if (fails.length) { console.log('Failures (will fall back to glyph on the card):'); fails.forEach((f) => console.log('  • ' + f)); }
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
