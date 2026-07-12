#!/usr/bin/env node
/* =====================================================================
   generate-activity-og-images.js — per-(activity, locale) 1200×630 og:image
   composites for the /[locale]/activities/[slug] pages.

   Activity pages shipped the generic og-homepage.png as og:image /
   twitter:image / JSON-LD image. This script gives every activity a real
   per-locale social image using the platform's canonical deck og pipeline
   (§17.8.19): screenshot the activity's actual play area once (locale-
   neutral EN render, same approach as generate-activity-previews.js),
   letterbox it onto cream to the deck-thumbnail geometry, then compose one
   1200×630 PNG per locale via scripts/publish-cli/og-image.js derive()
   (two-column: play-area left, cream panel with the LOCALIZED page_title +
   wordmark right) with an embedded XMP packet (og-image-xmp.js).

   - Includes locale-only activities (rows without slug.en) — unlike the
     previews script, which filters them out.
   - One composite per locale key present in row.page_title.

   Output: frontend/public/mini-tools/og/<id>.<locale>.png  (gitignored per
   §A.3 — only this script is committed; the PNGs are scp'd to
   /var/www/lcs-media/mini-tools/og/ BEFORE the code deploy).

   Usage: node scripts/generate-activity-og-images.js [--only=<id-substr>]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');
const sharp = require('sharp');
const ogImage = require('./publish-cli/og-image.js');
const ogImageXmp = require('./publish-cli/og-image-xmp.js');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'image-library-webp');
const OUT = path.join(REPO, 'frontend', 'public', 'mini-tools', 'og');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '';

// Match og-image.js geometry exactly: derive() cover-resizes its input to
// 488×630, so a pre-letterboxed 488×630 buffer passes through 1:1 (no crop).
const LEFT_W = 488;
const LEFT_H = 630;
const CREAM = { r: 0xfe, g: 0xfa, b: 0xf3 }; // #FEFAF3, og-image.js RIGHT_BG

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
    else if (p === '/') { res.statusCode = 404; res.end('no'); return; }
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

/* Per-engine seed — identical to generate-activity-previews.js so the og
   image shows the same content-rich state as the index-card preview. */
function seedScript(row) {
  const g = toolGlobal(row.tool);
  if (row.tool === 'ten-frame-activity') {
    const frames = (row.params && row.params.frames) || 1;
    const n = frames >= 2 ? 13 : 6;
    return `(function(){var t=window['${g}'];if(t&&t.setCount){t.setCount(${n});if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'array-activity') {
    return `(function(){var t=window['${g}'];if(t&&t.filled&&t._key){for(var r=0;r<t.rows;r++)for(var c=0;c<t.cols;c++){t.filled[t._key(r,c)]=true;}if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'money-activity') {
    return `(function(){var t=window['${g}'];if(t&&t.palette&&t.palette.length){t.tray.push(t.palette[t.palette.length-1]);if(t.paint)t.paint();}})();`;
  }
  if (row.tool === 'place-value-activity') {
    return `(function(){var t=window['${g}'];if(t){try{if(t.addHundred)t.addHundred();}catch(e){}try{if(t.addTen){t.addTen();t.addTen();}}catch(e){}try{if(t.addOne){t.addOne();t.addOne();t.addOne();}}catch(e){}if(t.paint)t.paint();}})();`;
  }
  return null;
}

/* All manifest rows — INCLUDING locale-only activities (no slug.en). The
   render lang follows the row's first available slug locale so a DE-only
   activity screenshots in German. */
function loadRows() {
  const files = fs.readdirSync(MINI).filter((f) => /-activities\.json$/.test(f));
  const all = [];
  for (const f of files) {
    try {
      const rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8'));
      for (const r of rows) {
        if (!r.id || !r.tool || !r.slug || !r.page_title) continue;
        all.push(r);
      }
    } catch (e) { console.warn('skip', f, e.message); }
  }
  return all;
}

function renderLang(row) {
  if (row.slug.en) return 'en';
  const keys = Object.keys(row.slug);
  return keys.length ? keys[0] : 'en';
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const rows = loadRows().filter((r) => !ONLY || r.id.includes(ONLY));
  const server = serve();
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  let okShots = 0, failShots = 0, pngs = 0;
  const fails = [];

  for (const row of rows) {
    const page = await browser.newPage();
    await page.setViewport({ width: 720, height: 640, deviceScaleFactor: 2 });
    const lang = renderLang(row);
    const url = `${BASE}/mini-tools/${row.tool}.html?activity=${encodeURIComponent(row.id)}&lang=${lang}&embed=compact`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
      await page.waitForSelector('.lcs-stage', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 900));
      const seed = seedScript(row);
      if (seed) {
        try { await page.evaluate(seed); await new Promise((r) => setTimeout(r, 500)); }
        catch (e) { console.warn(`  seed failed (${row.id}), using on-load: ${e.message}`); }
      }
      const stage = (await page.$('.lcs-stage')) || (await page.$('.lcs-app'));
      if (!stage) throw new Error('no .lcs-stage / .lcs-app');
      const raw = await stage.screenshot({ omitBackground: true });

      // Letterbox the (landscape) play area onto cream at the exact left-column
      // geometry derive() expects — full content visible, no crop.
      const letterboxed = await sharp(raw)
        .resize(LEFT_W, LEFT_H, { fit: 'contain', background: { ...CREAM, alpha: 1 } })
        .flatten({ background: CREAM })
        .png()
        .toBuffer();
      okShots++;

      const locales = Object.keys(row.page_title);
      for (const loc of locales) {
        const title = row.page_title[loc];
        if (!title) continue;
        const xmpPacket = ogImageXmp.buildXmpPacket({
          title,
          description: (row.page_intro && row.page_intro[loc]) || '',
          exerciseType: 'interactive activity',
          themeName: null,
          levelName: null,
          locale: loc,
        });
        const buf = await ogImage.derive(letterboxed, {
          title,
          themeName: null,
          levelName: null,
          locale: loc,
          xmpPacket,
        });
        const outPath = path.join(OUT, `${row.id}.${loc}.png`);
        fs.writeFileSync(outPath + '.new', buf);
        fs.renameSync(outPath + '.new', outPath);
        pngs++;
      }
      console.log(`  ok   ${row.id} (${locales.length} locales)`);
    } catch (e) {
      failShots++;
      fails.push(`${row.id}: ${e.message}`);
      console.log(`  FAIL ${row.id} — ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`\nScreenshots: ${okShots} ok, ${failShots} failed. Wrote ${pngs} og PNG(s) → ${OUT}`);
  if (fails.length) { console.log('Failures (pages fall back to og-homepage.png):'); fails.forEach((f) => console.log('  • ' + f)); }
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
