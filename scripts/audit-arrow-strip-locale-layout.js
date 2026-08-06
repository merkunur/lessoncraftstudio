/* =====================================================================
   audit-arrow-strip-locale-layout.js — 11 locales x 6 viewports = 66
   ---------------------------------------------------------------------
   Run:  node scripts/audit-arrow-strip-locale-layout.js

   English fits. That proves nothing about German compounds, Finnish
   agglutination or a Dutch chip that is twice the width of its English
   twin. This walks every locale across the whole sweep and measures.
   ⚠ Containment is against the CARD, not the mat — the mat itself is
   what overflowed once, and every cell-against-mat check passed it.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5506;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
/* the tier FLOORS, paired with the height that makes each tier apply -- on a
   1:1 apparatus a width alone names no tier at all. 1366 stays the CONTROL. */
const WIDTHS = [320, 360, 412, 768, 1024, 1366, 1400, 1800, 2400, 2560];
const heightFor = (w) => (w >= 2560 ? 1440 : w >= 2400 ? 1150 : w >= 1800 ? 1050 : w >= 1400 ? 880 : 900);

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    const bad = [];
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setRequestInterception(true);
      page.on('request', (r) => (r.url().includes('/api/auth/me')
        ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
        : r.continue()));
      await page.setViewport({ width: w, height: heightFor(w) });
      await page.goto(`http://127.0.0.1:${PORT}/arrow-strip.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.arw-card', { timeout: 9000 });
      /* the largest mat and a filled rail — the densest state there is */
      await page.evaluate(() => {
        const s = document.querySelectorAll('.arw-sizes .arw-chip');
        s[s.length - 1].click();
      });
      await wait(180);
      await page.evaluate(() => { const c = document.querySelectorAll('.arw-card'); [0, 0, 3, 0, 2, 1].forEach((i) => c[i].click()); });
      await wait(150);
      await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
      await wait(340);

      const m = await page.evaluate(() => {
        const card = (document.querySelector('.lcs-app') || document.body).getBoundingClientRect();
        const mat = document.querySelector('.arw-mat').getBoundingClientRect();
        const ctrl = Array.from(document.querySelectorAll('.arw-chip,.arw-card,.arw-place.arw-filled'));
        const cells = Array.from(document.querySelectorAll('.arw-cell'));
        const txt = Array.from(document.querySelectorAll('.arw-hint,.arw-chip')).filter((e) => (e.textContent || '').trim());
        return {
          minCtrl: Math.min(...ctrl.map((e) => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height))),
          minCell: Math.min(...cells.map((e) => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height))),
          minFont: Math.min(...txt.map((e) => parseFloat(getComputedStyle(e).fontSize))),
          matOut: (mat.right > card.right + 1 || mat.left < card.left - 1) ? 1 : 0,
          /* a chip whose text has been clipped by its own box */
          clipped: txt.filter((e) => e.scrollWidth > e.clientWidth + 1).length,
          doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          bottom: document.querySelector('.arw-foot').getBoundingClientRect().bottom
        };
      });
      if (m.minCtrl < 43.5) bad.push(`@${w} control ${m.minCtrl.toFixed(1)}px`);
      if (m.minCell < 33.5) bad.push(`@${w} cell ${m.minCell.toFixed(1)}px`);
      if (m.minFont < 14) bad.push(`@${w} text ${m.minFont}px`);
      if (m.matOut) bad.push(`@${w} the mat is outside the card`);
      if (m.clipped) bad.push(`@${w} ${m.clipped} label(s) clipped by their own box`);
      if (m.doc > 0) bad.push(`@${w} page overflows sideways by ${m.doc}px`);
      /* the REAL viewport, not a hardcoded 900 — see local-test's note */
      if (w >= 768 && m.bottom > heightFor(w)) bad.push(`@${w} does not FIT (bottom ${m.bottom.toFixed(0)} of ${heightFor(w)})`);
      await page.close();
    }
    is(bad.length === 0, `${loc}: ${bad.join('; ')}`);
    console.log(`  ${bad.length ? 'FAIL' : 'ok  '}  ${loc}${bad.length ? '  ' + bad.join('; ') : ''}`);
  }

  await browser.close();
  server.close();
  console.log('');
  console.log(FAIL ? `FAIL — ${FAIL} locale(s) with layout defects` : `PASS — ${LOCALES.length} locales x ${WIDTHS.length} viewports clean`);
  process.exit(FAIL ? 1 : 0);
})();
