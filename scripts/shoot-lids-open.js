/* =====================================================================
   shoot-lids-open.js — THE OPENING FRAME, photographed
   ---------------------------------------------------------------------
   Run:  node scripts/shoot-lids-open.js
   Shots land in docs/audit-results/lids/qa/

   ⚠ WHY THIS EXISTS. The operator's report on the shipped tool was "it
   requires clear explanation what to do in the beginning" — and nothing
   in the suite photographed the beginning. local-test-lids drives the
   tool INTO a state before it measures anything, so every render in the
   folder showed lids already down. The one frame the complaint was about
   was the one frame nobody had a picture of.

   So this captures the cold open at the widths the definition-of-done
   requires a human to read (360 / 768 / 1024 / 1366), plus German at 768
   because it carries the longest strings, plus the entitled view at 1024.
   It asserts nothing: it exists so the frames can be READ.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const OUT = path.join(ROOT, 'docs', 'audit-results', 'lids', 'qa');
const PORT = 5533;
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(decodeURIComponent(req.url.split('?')[0])));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* [file stem, locale, entitled, width, height] */
const SHOTS = [
  ['open', 'en', false, 360, 780],
  ['open', 'en', false, 768, 900],
  ['open', 'en', false, 1024, 900],
  ['open', 'en', false, 1366, 900],
  ['open-de', 'de', false, 768, 900],   /* the longest strings in the set */
  ['paid', 'en', true, 1024, 900]       /* the print chip unlocked */
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve().listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const [stem, lang, paid, w, h] of SHOTS) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().includes('/api/auth/me')
      ? r.respond({
        status: 200, contentType: 'application/json',
        body: JSON.stringify(paid
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null })
      })
      : r.continue()));
    await page.evaluateOnNewDocument((p) => {
      try { localStorage.clear(); if (p) localStorage.setItem('accessToken', 'shoot'); } catch (_) {}
    }, paid);
    await page.setViewport({ width: w, height: h });
    await page.goto(`http://127.0.0.1:${PORT}/lids.html?lang=${lang}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.lid-table', { timeout: 9000 });
    await wait(700);
    const f = path.join(OUT, stem + '-' + w + '.png');
    await page.screenshot({ path: f });
    console.log('  shot ' + path.basename(f));
    await page.close();
  }
  await browser.close();
  server.close();
  console.log('\nthe opening frame is on disk — now READ it. No gate replaces that step.');
})();
