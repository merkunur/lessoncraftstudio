/* =====================================================================
   audit-draw-bag-locale-layout.js — 11 locales x 6 widths for TOOL #38
   ---------------------------------------------------------------------
   Run:  node scripts/audit-draw-bag-locale-layout.js

   English fitting proves nothing about a German compound or a Finnish
   agglutination. This drives each locale into its DENSEST state — the
   40-cell record, both runs, every shelf occupied, the reveal open —
   and measures the same things the English sweep measures.
   ⚠ Containment is against THE CARD (.lcs-app), not the inner box: an
   overflowing record absorbs its own evidence through overflow-x.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PUBLIC = path.join(ROOT, 'frontend', 'public');
const PORT = 5512;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const serve = () => http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const f = url.indexOf('/image-library-webp/') === 0 ? path.join(PUBLIC, url) : path.join(MINI, path.basename(url));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = serve().listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let cells = 0;

  for (const loc of LOCALES) {
    const bad = [];
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setRequestInterception(true);
      page.on('request', (r) => (r.url().includes('/api/auth/me')
        ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
        : r.continue()));
      await page.evaluateOnNewDocument(() => {
        try { localStorage.clear(); localStorage.setItem('accessToken', 'harness'); } catch (_) {}
        window.print = function () {};
      });
      await page.setViewport({ width: w, height: w >= 768 ? 900 : 780 });
      await page.goto(`http://127.0.0.1:${PORT}/draw-bag.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.drb-bag', { timeout: 9000 });
      await wait(280);

      /* THE DENSEST STATE: longest record, both runs, shelves in use */
      await page.evaluate(() => {
        const lens = document.querySelectorAll('.drb-bar .drb-group')[0].querySelectorAll('.drb-chip');
        const last = lens[lens.length - 1];
        if (last && !last.disabled) last.click();
      });
      await wait(90);
      for (const sel of ['.drb-shelf.drb-pool .drb-gpiece', '.drb-shelf.drb-pool .drb-gpiece', '.drb-shelf.drb-in .drb-gpiece']) {
        await page.evaluate((s) => { const e = document.querySelectorAll(s)[0]; if (e && !e.disabled) e.click(); }, sel);
        await wait(45);
      }
      const drawAll = async () => {
        for (let i = 0; i < 45; i++) {
          const done = await page.evaluate(() => { const b = document.querySelector('.drb-bag'); if (!b || b.disabled) return true; b.click(); return false; });
          if (done) break;
          await wait(25);
        }
      };
      await drawAll();
      await page.evaluate(() => { const c = document.querySelectorAll('.drb-foot .drb-chip')[1]; if (c && !c.disabled) c.click(); });
      await wait(140);
      await drawAll();
      await page.evaluate(() => { const c = document.querySelectorAll('.drb-foot .drb-chip')[2]; if (c && !c.disabled) c.click(); });
      await wait(140);

      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const minOf = (sel) => {
          const els = Array.from(document.querySelectorAll(sel)).filter((e) => e.offsetParent !== null);
          if (!els.length) return null;
          return Math.min(...els.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); }));
        };
        const fonts = Array.from(document.querySelectorAll('.drb-hint,.drb-chip'))
          .filter((e) => e.offsetParent !== null && (e.textContent || '').trim())
          .map((e) => parseFloat(getComputedStyle(e).fontSize));
        return {
          minCtrl: Math.min(...[minOf('.drb-chip'), minOf('.drb-gpiece'), minOf('.drb-bag')].filter((v) => v !== null)),
          minCell: minOf('.drb-cell'),
          minFont: fonts.length ? Math.min(...fonts) : 99,
          outside: Array.from(document.querySelectorAll('.drb-rec,.drb-guess,.drb-main,.drb-opened'))
            .filter((e) => { const r = e.getBoundingClientRect(); return r.right > card.right + 1 || r.left < card.left - 1; }).length,
          /* a label clipped by its own box — the German-compound and
             Finnish-agglutination check, and the reason this file exists */
          clipped: Array.from(document.querySelectorAll('.drb-chip,.drb-hint'))
            .filter((e) => e.scrollWidth > e.clientWidth + 1)
            .map((e) => (e.textContent || '').slice(0, 28)),
          doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          bottom: document.querySelector('.drb-foot').getBoundingClientRect().bottom
        };
      });

      if (m.minCtrl < 43.5) bad.push(w + ': control ' + m.minCtrl.toFixed(1) + 'px');
      if (m.minCell !== null && m.minCell < 33.5) bad.push(w + ': cell ' + m.minCell.toFixed(1) + 'px');
      if (m.minFont < 14) bad.push(w + ': text ' + m.minFont + 'px');
      if (m.outside) bad.push(w + ': ' + m.outside + ' block(s) outside the card');
      if (m.clipped.length) bad.push(w + ': clipped "' + m.clipped[0] + '"');
      if (m.doc > 0) bad.push(w + ': overflows sideways ' + m.doc + 'px');
      if (w >= 768 && m.bottom > 900) bad.push(w + ': does not FIT (' + Math.round(m.bottom) + 'px)');
      cells++;
      await page.close();
    }
    is(bad.length === 0, loc + (bad.length ? ' — ' + bad.join(' | ') : ''));
  }

  await browser.close();
  server.close();
  console.log('');
  if (FAIL) { console.error('FAIL — ' + FAIL + ' locale(s) with layout defects across ' + cells + ' cells'); process.exit(1); }
  console.log('PASS — ' + PASS + ' locales clean across ' + cells + ' locale x width cells');
})();
