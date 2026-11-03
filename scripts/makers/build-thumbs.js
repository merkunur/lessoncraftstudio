#!/usr/bin/env node
/**
 * Gallery thumbnails (ARCHITECTURE §11.3, OPEN-DECISIONS #10a: one per template AND language — a Finnish teacher sees a
 * Finnish sheet). Run after build-bundles.js:
 *
 *   node scripts/makers/build-thumbs.js [--makers=counting,sight-words] [--locales=de,fi]
 *
 * Each thumbnail is the template's SAMPLE page, made by the maker screen's own code (window.__lcsMaker.sample → the
 * same gated generate() ladder as the page a visitor sees), drawn by the browser at the page box (703 × 945) and saved
 * as a 320 px WebP (q 70) in out/makers/<maker>/<current version>/thumbs/<locale>/<template>.webp.
 * Cached by the page's own html: out/makers/_thumbcache/<sha1 of html>.webp — a template whose page did not change is
 * copied, not redrawn, so a rebuild redraws only what changed.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const REPO = path.join(__dirname, '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const { handler } = require('./serve.js');

const OUT = path.join(REPO, 'out', 'makers');
const CACHE = path.join(OUT, '_thumbcache');
const WIDTH = 320, QUALITY = 70;
const arg = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3).split(',') : null; };

(async () => {
  const versions = JSON.parse(fs.readFileSync(path.join(OUT, 'versions.json'), 'utf8'));
  const makers = arg('makers') || Object.keys(versions);
  fs.mkdirSync(CACHE, { recursive: true });
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  await fetch(`${base}/__dev/access?as=sub`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 1000, deviceScaleFactor: 1 });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  let drawn = 0, cached = 0, refused = 0;
  const t0 = Date.now();
  try {
    for (const maker of makers) {
      const ver = versions[maker] && versions[maker].current;
      if (!ver) { console.log(`skip ${maker}: not built`); continue; }
      const tj = JSON.parse(fs.readFileSync(path.join(OUT, maker, ver, 'templates.json'), 'utf8'));
      const locales = arg('locales') || [...new Set(tj.templates.flatMap((t) => t.locales))];
      for (const loc of locales) {
        const ids = tj.templates.filter((t) => t.locales.includes(loc)).map((t) => t.id);
        if (!ids.length) continue;
        await page.goto(`${base}/makers/app/?maker=${maker}&lang=${loc}`, { waitUntil: 'networkidle0' });
        await page.waitForFunction(() => window.__lcsMaker && window.__lcsMaker.sample, { timeout: 30000 });
        const dir = path.join(OUT, maker, ver, 'thumbs', loc);
        fs.mkdirSync(dir, { recursive: true });
        for (const id of ids) {
          const html = await page.evaluate((id) => window.__lcsMaker.sample(id), id);
          if (!html) {
            refused++;
            // the gate's own reasons (shell.js keeps them beside the sample), so a refusal is fixable from the log
            const why = await page.evaluate(() => (window.__lcsMaker.lastSampleFails || []).slice(0, 3).join(' | '));
            console.log(`FAIL ${maker} ${loc} ${id}: the sample page is refused by its gates — ${String(why).slice(0, 400)}`);
            continue;
          }
          const key = crypto.createHash('sha1').update(html).digest('hex');
          const cachedFile = path.join(CACHE, `${key}.webp`);
          if (!fs.existsSync(cachedFile)) {
            // draw the page box in a frame laid over the screen, after its fonts and pictures are ready
            await page.evaluate(async (html) => {
              let f = document.getElementById('lcs-thumb-frame');
              if (!f) { f = document.createElement('iframe'); f.id = 'lcs-thumb-frame'; f.setAttribute('style', 'position:fixed;left:0;top:0;width:703px;height:945px;border:0;z-index:2147483647;background:#fff'); document.body.append(f); }
              await new Promise((r) => { f.onload = r; f.srcdoc = html; });
              const d = f.contentDocument;
              await d.fonts.ready;
              await Promise.all([...d.images].map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => { i.onload = i.onerror = r; }))));
            }, html);
            const png = await page.screenshot({ clip: { x: 0, y: 0, width: 703, height: 945 } });
            await sharp(png).resize({ width: WIDTH }).webp({ quality: QUALITY }).toFile(cachedFile);
            drawn++;
          } else cached++;
          fs.copyFileSync(cachedFile, path.join(dir, `${id}.webp`));
        }
        console.log(`${maker} ${loc}: ${ids.length} thumbnails`);
      }
    }
  } finally {
    await browser.close(); srv.close();
  }
  console.log(`thumbnails: ${drawn} drawn, ${cached} from the cache, ${refused} refused · ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  if (errs.length) console.log('page errors: ' + errs.slice(0, 3).join(' | '));
  if (refused || errs.length) process.exitCode = 1;
})().catch((e) => { console.error('build-thumbs: ' + e.message); process.exit(1); });
