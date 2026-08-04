#!/usr/bin/env node
/* =====================================================================
   audit-ten-frame-locale-layout.js — 11 locales x 6 viewports for the
   ten-frame's CHROME.

   Run:  node scripts/audit-ten-frame-locale-layout.js

   English fitting proves nothing about German compounds or Finnish
   agglutination. `local-test-ten-frame-tool.js` sweeps the APPARATUS in
   English; this sweeps the authored TEXT in every language, because the
   apparatus is language-free by design and the chrome is not.

   ⚠ MEASURED AGAINST THE CARD, not against the inner row — an
   `overflow-x` on a container absorbs the evidence. The frame's own
   scroller is excluded exactly as it is in the tool harness: what is
   inside it is reachable by scrolling; the scroller itself is not
   allowed to escape.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5586;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

let PASS = 0, FAIL = 0;
const fails = [];
const is = (c, m) => { if (c) PASS++; else { FAIL++; fails.push(m); } };

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const srv = http.createServer((req, res) => {
  const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]).replace(/^\/mini-tools/, ''));
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' });
  res.end(fs.readFileSync(f));
});

(async () => {
  await new Promise((r) => srv.listen(PORT, r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let cells = 0;
  const worst = { chip: 999, text: 999, at: '' };

  for (const loc of LOCALES) {
    for (const w of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 900 });
      await page.goto(`http://127.0.0.1:${PORT}/ten-frame.html?lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.tnf-cell');
      /* the widest field, so the chrome is measured under the worst
         apparatus — sweeping only the default is the recorded #42 trap */
      await page.evaluate(() => { document.querySelectorAll('.tnf-fieldchip')[3].click(); });
      await new Promise((r) => setTimeout(r, 150));

      const m = await page.evaluate(() => {
        const q = (s) => document.querySelector(s), qa = (s) => Array.from(document.querySelectorAll(s));
        const card = q('.lcs-app').getBoundingClientRect();
        const scroller = q('.tnf-fieldscroll');
        let escapes = 0;
        qa('.tnf-wrap *, .lcs-header *').forEach((e) => {
          const r = e.getBoundingClientRect();
          if (!r.width) return;
          if (scroller && scroller.contains(e) && e !== scroller) return;   /* reachable by scrolling */
          if (r.right > card.right + 2 || r.left < card.left - 2) escapes++;
        });
        const chips = qa('.tnf-chip').map((e) => e.getBoundingClientRect());
        const texts = qa('.tnf-hint, .tnf-chip').filter((e) => (e.textContent || '').trim())
          .map((e) => parseFloat(getComputedStyle(e).fontSize));
        /* a chip whose label has been squeezed to nothing, or that has
           grown taller than two lines, is a compound-noun failure */
        const tall = chips.filter((r) => r.height > 96).length;
        return {
          escapes, tall,
          chipMin: chips.length ? Math.round(Math.min(...chips.map((r) => Math.min(r.width, r.height)))) : 999,
          textMin: texts.length ? Math.min(...texts) : 999,
          bodyScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          hint: (q('.tnf-hint') || {}).textContent || ''
        };
      });

      const tag = `${loc}@${w}`;
      cells++;
      is(m.escapes === 0, `${tag}: nothing escapes the card (${m.escapes})`);
      is(m.bodyScroll <= 0, `${tag}: no sideways page scroll (${m.bodyScroll}px)`);
      is(m.chipMin >= 44, `${tag}: every chip keeps its 44px floor (${m.chipMin})`);
      is(m.textMin >= 14, `${tag}: text >= 14px (${m.textMin})`);
      is(m.tall === 0, `${tag}: no chip has grown past two lines (${m.tall})`);
      if (m.chipMin < worst.chip) { worst.chip = m.chipMin; worst.at = tag; }
      if (m.textMin < worst.text) worst.text = m.textMin;
      await page.close();
    }
    process.stdout.write(`[${loc}] `);
  }

  await browser.close();
  srv.close();
  console.log(`\n\n${cells} cells (11 locales x 6 widths). tightest chip ${worst.chip}px at ${worst.at}; smallest text ${worst.text}px`);
  console.log(`audit-ten-frame-locale-layout: ${PASS} passed, ${FAIL} failed`);
  if (FAIL) { console.error('\nFAILURES:'); fails.slice(0, 40).forEach((f) => console.error('  ' + f)); process.exit(1); }
  console.log('PASS');
})();
