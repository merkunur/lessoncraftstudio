#!/usr/bin/env node
/* =====================================================================
   audit-money-mat-locale-layout.js — 11 locales × 6 viewports = 66 cells.

   English fitting proves nothing about German compounds or Finnish
   agglutination, and this tool just gained three settings labels and a
   print chip in eleven languages. Every one of them lands in the DOCK or
   the drawer, which is exactly where long words break a layout.

   Measured per cell:
     · the card does not overflow horizontally
     · NO CHROME ESCAPES THE CARD — every chip's right edge measured
       against the CARD, not against its own row. An overflow-x on a flex
       row absorbs the evidence, which is how this class hides.
     · no chip wraps to a second line inside itself (a two-line chip is
       what a German compound produces before it overflows anything)
     · the dock does not collide with the purse above it
     · every chip still clears the 44px control floor
     · zero console errors

   ⚠ CLONING A GATE COPIES ITS SELECTORS *AND* ITS GLOBALS. This drives
     `MoneyMat`; two locale gates in this programme silently drove the
     PREVIOUS tool's global and certified 396 cells off an untouched
     opening frame. The mount check below fails loudly if the global is
     absent, so this can never measure nothing.

   Usage: node scripts/audit-money-mat-locale-layout.js [--shot]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = process.env.MM_TOOL_DIR || path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const QA = path.join(REPO, 'docs', 'audit-results', 'money-mat', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const VIEWS = [[320, 568], [360, 740], [412, 915], [768, 1024], [1024, 768], [1366, 768]];

let pass = 0, fail = 0; const bad = [];
const ok = (n, c, x) => { if (c) pass++; else { fail++; bad.push(n); console.log('  ✗ FAIL ' + n + (x ? ' — ' + x : '')); } };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/')
      ? path.join(IMGLIB, p.slice('/image-library-webp/'.length))
      : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const worst = { chip: 0, where: '' };

  for (const L of LOCALES) {
    let cells = 0;
    for (const [w, h] of VIEWS) {
      const page = await browser.newPage();
      const errs = [];
      page.on('pageerror', (e) => errs.push(String(e)));
      /* ⚠ a console error's TEXT does not carry the URL — "Failed to load
         resource: 404" names nothing — so filtering on the text could never
         work. m.location().url is where the resource actually is. */
      page.on('console', (m) => {
        if (m.type() !== 'error') return;
        const url = (m.location() && m.location().url) || '';
        if (/favicon\.ico$/.test(url)) return;
        errs.push(m.text() + (url ? '  [' + url + ']' : ''));
      });
      /* ⚠ scoped to the TOOL's own requests. Every headless page asks for
         /favicon.ico and this static server has none — counting that as a
         tool defect is the harness blaming the tool for the harness. A real
         missing asset still fails, via the requestfailed hook below. */
      page.on('requestfailed', (r) => {
        const u = r.url();
        if (!/favicon\.ico$/.test(u)) errs.push('request failed: ' + u);
      });
      await page.setViewport({ width: w, height: h });
      /* premium, so every chip that can exist DOES — the longest dock is
         the one that must fit, not the free one */
      await page.goto(`http://127.0.0.1:${PORT}/money-mat.html?lang=${L}`, { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 220));
      const mounted = await page.evaluate(() => typeof MoneyMat === 'object' && !!document.querySelector('.mm-wrap'));
      ok(`${L} ${w}: the tool mounted`, mounted, 'MoneyMat absent — this gate would have measured nothing');
      if (!mounted) { await page.close(); continue; }
      await page.evaluate(() => { MoneyMat.premium = true; MoneyMat.render(); });
      await new Promise((r) => setTimeout(r, 200));

      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app') || document.querySelector('.mm-wrap');
        const cr = card.getBoundingClientRect();
        const chips = [...document.querySelectorAll('.mm-chip')];
        const out = { nChips: chips.length, escaped: [], wrapped: [], tiny: [], collide: 0 };
        for (const c of chips) {
          const r = c.getBoundingClientRect();
          const label = (c.textContent || '').trim().slice(0, 18);
          /* against the CARD — an overflow-x on the row would hide this */
          if (r.right > cr.right + 0.5 || r.left < cr.left - 0.5) out.escaped.push(label + ' ' + Math.round(r.right - cr.right) + 'px');
          /* ⚠ COUNT LINE BOXES, DO NOT INFER FROM HEIGHT. My first version
             compared the chip's height against fontSize * 3.4 — which comes
             to 45.9px, while .mm-chip carries min-height:46px. It condemned
             every correct chip in all eleven locales: an invented threshold
             that happened to sit one pixel under a real one. A Range over
             the text reports the actual line boxes, which is the thing the
             assertion is about. */
          const txt = [...c.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
          if (txt) {
            const rg = document.createRange();
            rg.selectNodeContents(txt);
            const lines = rg.getClientRects().length;
            if (lines > 1) out.wrapped.push(label + ' → ' + lines + ' lines');
          }
          if (r.width < 44 || r.height < 44) out.tiny.push(label + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
        }
        const purse = document.querySelector('.mm-purse');
        const dock = document.querySelector('.mm-dock');
        if (purse && dock) {
          const p = purse.getBoundingClientRect(), d = dock.getBoundingClientRect();
          if (d.top < p.bottom - 1) out.collide = Math.round(p.bottom - d.top);
        }
        return { ...out, hOver: document.documentElement.scrollWidth - document.documentElement.clientWidth };
      });

      const tag = `${L} ${w}x${h}`;
      ok(`${tag}: non-vacuity — the dock has chips`, m.nChips >= 4, String(m.nChips));
      ok(`${tag}: no horizontal overflow`, m.hOver <= 1, `${m.hOver}px`);
      ok(`${tag}: no chip escapes the CARD`, m.escaped.length === 0, m.escaped.join('; '));
      ok(`${tag}: no chip wraps inside itself`, m.wrapped.length === 0, m.wrapped.join('; '));
      ok(`${tag}: every chip clears the 44px floor`, m.tiny.length === 0, m.tiny.join('; '));
      ok(`${tag}: the dock does not collide with the purse`, m.collide === 0, `${m.collide}px overlap`);
      ok(`${tag}: no console errors`, errs.length === 0, errs[0]);
      if (m.nChips > worst.chip) { worst.chip = m.nChips; worst.where = tag; }
      cells++;
      if (process.argv.includes('--shot') && w === 360) {
        await page.screenshot({ path: path.join(QA, `L-${L}-360.png`) });
      }
      await page.close();
    }
    console.log(`  ${cells === VIEWS.length ? '✓' : '✗'} ${L} — ${cells}/${VIEWS.length} viewports`);
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed  (11 locales × 6 viewports; widest dock ${worst.chip} chips at ${worst.where})`);
  if (fail) { console.log('FAILED: ' + [...new Set(bad)].slice(0, 8).join(' · ')); process.exit(1); }
  console.log('audit-money-mat-locale-layout: ALL GREEN');
})();
