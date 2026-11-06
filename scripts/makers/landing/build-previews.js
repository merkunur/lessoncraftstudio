#!/usr/bin/env node
/**
 * Landing previews, stage A: every template's SAMPLE page at 640 px, per maker and language, for the maker landing pages
 * (/<loc>/worksheet-makers/<slug>), the hub and the upgraded old landings. The gallery thumbnails in the maker's version
 * folder are 320 px, noindex and move with every release; these live at a stable, indexable path
 * (/maker-previews/<maker>/<loc>/<template>.webp) so Google can show them. Same page as the thumbnail
 * (window.__lcsMaker.sample → the gated generate() ladder), drawn at the page box 703 × 945.
 *
 *   node scripts/makers/landing/build-previews.js [--makers=counting,money] [--locales=de,fi] [--workers=4]
 *
 * Output: out/maker-previews/<maker>/<loc>/<template>.webp. Cached by the page's own html in out/maker-previews-cache/.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const sharp = require(path.join(REPO, 'node_modules', 'sharp'));
const { handler } = require('../serve.js');

const SRC = path.join(REPO, 'out', 'makers');
const OUT = path.join(REPO, 'out', 'maker-previews');
const CACHE = path.join(REPO, 'out', 'maker-previews-cache');
const WIDTH = 640, QUALITY = 74;
const arg = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3).split(',') : null; };

async function drawOne(page, html, file) {
  await page.evaluate(async (h) => {
    let f = document.getElementById('lcs-thumb-frame');
    if (!f) {
      f = document.createElement('iframe');
      f.id = 'lcs-thumb-frame';
      f.setAttribute('style', 'position:fixed;left:0;top:0;width:703px;height:945px;border:0;z-index:2147483647;background:#fff');
      document.body.appendChild(f);
    }
    await new Promise((r) => { f.onload = r; f.srcdoc = h; });
    const d = f.contentDocument;
    await d.fonts.ready;
    await Promise.all([...d.images].map((i) => (i.complete ? i.decode().catch(() => {}) : new Promise((r) => { i.onload = i.onerror = r; }))));
  }, html);
  const png = await page.screenshot({ clip: { x: 0, y: 0, width: 703, height: 945 } });
  await sharp(png).resize({ width: WIDTH }).webp({ quality: QUALITY }).toFile(file);
}

(async () => {
  const versions = JSON.parse(fs.readFileSync(path.join(SRC, 'versions.json'), 'utf8'));
  const makers = arg('makers') || Object.keys(versions);
  const onlyLocales = arg('locales');
  fs.mkdirSync(CACHE, { recursive: true });
  const srv = http.createServer(handler);
  await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  await fetch(`${base}/__dev/access?as=sub`);
  const jobs = [];
  for (const maker of makers) {
    const ver = versions[maker] && versions[maker].current;
    if (!ver) continue;
    const tj = JSON.parse(fs.readFileSync(path.join(SRC, maker, ver, 'templates.json'), 'utf8'));
    for (const loc of onlyLocales || [...new Set(tj.templates.flatMap((t) => t.locales))]) {
      const ids = tj.templates.filter((t) => t.locales.includes(loc)).map((t) => t.id);
      if (ids.length) jobs.push({ maker, loc, ids });
    }
  }
  let next = 0, drawn = 0, cached = 0, refused = 0, done = 0;
  const t0 = Date.now();
  // one browser per worker: a second tab in one browser is a background tab, and Chrome stalls its fonts and timers
  const browsers = [];
  const worker = async () => {
    const browser = await puppeteer.launch({ protocolTimeout: 900000 });
    browsers.push(browser);
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 1000, deviceScaleFactor: 1 });
    for (;;) {
      const job = jobs[next++];
      if (!job) break;
      const dir = path.join(OUT, job.maker, job.loc);
      fs.mkdirSync(dir, { recursive: true });
      if (job.ids.every((id) => fs.existsSync(path.join(dir, `${id}.webp`)))) { done++; continue; }
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await page.goto(`${base}/makers/app/?maker=${job.maker}&lang=${job.loc}`, { waitUntil: 'networkidle0', timeout: 120000 });
          await page.waitForFunction(() => window.__lcsMaker && window.__lcsMaker.sample, { timeout: 90000 });
          for (const id of job.ids) {
            const target = path.join(dir, `${id}.webp`);
            if (fs.existsSync(target)) continue;
            const s0 = Date.now();
            const html = await page.evaluate((x) => window.__lcsMaker.sample(x), id);
            if (Date.now() - s0 > 20000) console.log(`slow ${job.maker} ${job.loc} ${id}: ${((Date.now() - s0) / 1000).toFixed(0)} s`);
            if (!html) { refused++; console.log(`FAIL ${job.maker} ${job.loc} ${id}: sample refused`); continue; }
            const cf = path.join(CACHE, `${crypto.createHash('sha1').update(html).digest('hex')}.webp`);
            if (fs.existsSync(cf)) cached++; else { await drawOne(page, html, cf); drawn++; }
            fs.copyFileSync(cf, target);
          }
          break;
        } catch (e) {
          console.log(`retry ${attempt} ${job.maker} ${job.loc}: ${String(e.message).slice(0, 120)}`);
          if (attempt === 3) { refused++; }
        }
      }
      done++;
      if (done % 20 === 0) console.log(`${done}/${jobs.length} pairs · ${drawn} drawn, ${cached} cached · ${((Date.now() - t0) / 60000).toFixed(1)} min`);
    }
    await page.close();
  };
  const n = Number((arg('workers') || ['4'])[0]);
  await Promise.all(Array.from({ length: n }, worker));
  await Promise.all(browsers.map((b) => b.close()));
  srv.close();
  console.log(`previews: ${drawn} drawn, ${cached} from the cache, ${refused} refused · ${((Date.now() - t0) / 60000).toFixed(1)} min`);
  process.exit(refused ? 1 : 0);
})().catch((e) => { console.error('build-previews: ' + e.message); process.exit(1); });
