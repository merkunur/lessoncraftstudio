#!/usr/bin/env node
/* =====================================================================
   audit-sorting-hoops-locale-layout.js — 11 locales x 6 viewports.

   WHY THIS EXISTS: the smoke is 11 locales x ONE viewport and local-test is
   ONE locale x 6 viewports. The product is the cell neither covers, and
   English fitting proves nothing about German compounds. The native panels
   flagged the risk by name — de's `confirmClear` is 96 characters against
   sv's 66, and the three mode chips already total 41 characters in English
   before any locale is involved.

   ⚠⚠ THE OVERFLOW MEASUREMENT IS NOT `scrollWidth`. The tool sets
   `overflow-x:hidden` on its own root, so the document can NEVER report
   horizontal overflow — that check would be VACUOUS. Measure where the
   content actually IS: the furthest right edge of anything laid out,
   against the card.

   ⚠ AND IT MEASURES THE SETUP PHASE TOO. The Italian panel found that
   `.hp-seg` was `overflow:hidden` with no wrap, so the three mode chips
   CLIPPED at 320px and the clipping absorbed its own evidence. A sweep of
   the resting state alone cannot see a strip that hides its own overflow.

   Usage: node scripts/audit-sorting-hoops-locale-layout.js [--locales=de,fi]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMGLIB = path.join(ROOT, 'frontend', 'public', 'image-library-webp');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.indexOf('--locales=') === 0);
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.indexOf(l) > -1) : ALL;
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900]];
const MIN_TAP = 44, MIN_TEXT = 14;

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; if (!process.env.HP_TERSE) console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp' };

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (u.indexOf('/image-library-webp/') === 0) f = path.join(IMGLIB, u.slice('/image-library-webp/'.length));
    else if (u.indexOf('/mini-tools/') === 0) f = path.join(MINI, u.slice('/mini-tools/'.length));
    else f = path.join(MINI, u.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

/* the three states whose text differs most by locale */
const STATES = {
  sort: () => {},
  setup: () => {
    const T = window.SortingHoops;
    T.mode = 'guess'; T.phase = 'setup'; T.cursor = { hoop: null, family: null }; T.render();
  },
  family: () => {
    const T = window.SortingHoops;
    T.mode = 'guess'; T.phase = 'setup'; T.cursor = { hoop: 'a', family: null }; T.render();
  }
};

const MEASURE = (MIN_TAP, MIN_TEXT) => {
  const r = (e) => e.getBoundingClientRect();
  const vis = (e) => {
    const cs = getComputedStyle(e);
    return cs.display !== 'none' && cs.visibility !== 'hidden' && r(e).width > 0 && r(e).height > 0;
  };
  const card = document.querySelector('.lcs-app');
  const cb = card ? r(card) : null;

  let far = 0, farEl = '';
  Array.prototype.forEach.call(document.querySelectorAll('.hp-wrap, .hp-wrap *'), (e) => {
    if (!vis(e)) return;
    const b = r(e);
    if (b.width > 0 && b.right > far) { far = b.right; farEl = (e.className || e.tagName || '?').toString().trim().slice(0, 26); }
  });

  const tiny = Array.prototype.filter.call(
    document.querySelectorAll('.hp-cap,.hp-word,.hp-hint,.hp-hooptitle,.hp-hoopstate,.hp-famq,.hp-setuphead,.hp-traylabel,.hp-outlabel,.hp-lessonlabel'),
    (e) => e.textContent.trim() && vis(e))
    .map((e) => ({ cls: (e.className || '').split(' ')[0], px: parseFloat(getComputedStyle(e).fontSize) }))
    .filter((t) => t.px < MIN_TEXT).map((t) => t.cls + ' ' + t.px.toFixed(1) + 'px');

  const smallTap = Array.prototype.filter.call(document.querySelectorAll('.hp-chip,.hp-famrow'), vis)
    .filter((e) => r(e).width < MIN_TAP || r(e).height < MIN_TAP)
    .map((e) => (e.className || '').split(' ')[0] + ' ' + Math.round(r(e).width) + 'x' + Math.round(r(e).height));

  /* clipped text — and ⚠ this is what caught the segmented strip: a chip
     whose scrollWidth exceeds its clientWidth inside a non-visible overflow */
  const clipped = [];
  Array.prototype.forEach.call(
    document.querySelectorAll('.hp-chip,.hp-cap,.hp-famq,.hp-hooptitle,.hp-hoopstate,.hp-outlabel,.hp-traylabel,.hp-word'),
    (e) => {
      if (!vis(e)) return;
      const cs = getComputedStyle(e);
      if (e.scrollWidth > e.clientWidth + 1 && cs.overflow !== 'visible' && cs.overflowX !== 'auto') {
        clipped.push((e.className || '?').split(' ')[0] + ' "' + e.textContent.slice(0, 16) + '" ' +
          e.scrollWidth + '>' + e.clientWidth);
      }
    });

  /* ⚠ and the CONTAINER of the segmented strip: if the strip itself hides
     overflow, its own children are still inside it — measure the strip */
  const segOver = [];
  Array.prototype.forEach.call(document.querySelectorAll('.hp-seg'), (e) => {
    if (!vis(e)) return;
    if (e.scrollWidth > e.clientWidth + 1) segOver.push(e.scrollWidth + '>' + e.clientWidth);
  });

  return {
    far: Math.round(far), farEl,
    overRight: cb ? Math.round(far - cb.right) : 0,
    tiny, smallTap, clipped, segOver
  };
};

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let cells = 0;

  try {
    for (const loc of LOCALES) {
      console.log('\n[' + loc + ']');
      for (const [w, h] of VIEWPORTS) {
        const page = await browser.newPage();
        await page.setViewport({ width: w, height: h });
        const errs = [];
        page.on('pageerror', (e) => { if (!/404|Failed to load/.test(e.message)) errs.push(e.message); });
        await page.goto(`http://127.0.0.1:${PORT}/sorting-hoops.html?lang=${loc}&embed=1`,
          { waitUntil: 'networkidle2' });
        await page.waitForSelector('.hp-wrap', { timeout: 9000 });
        await wait(320);

        for (const st of Object.keys(STATES)) {
          await page.evaluate(STATES[st]);
          await wait(160);
          const m = await page.evaluate(MEASURE, MIN_TAP, MIN_TEXT);
          const tag = `${loc} ${st} ${w}x${h}`;
          cells++;
          is(m.overRight <= 1, `${tag}: contained in the card (${m.overRight}px past, ${m.farEl})`);
          is(m.segOver.length === 0, `${tag}: the mode strip does not clip its own chips` +
            (m.segOver.length ? ' — ' + m.segOver.join(', ') : ''));
          is(m.clipped.length === 0, `${tag}: no clipped text` +
            (m.clipped.length ? ' — ' + m.clipped.slice(0, 3).join(', ') : ''));
          is(m.smallTap.length === 0, `${tag}: taps >= ${MIN_TAP}px` +
            (m.smallTap.length ? ' — ' + m.smallTap.slice(0, 3).join(', ') : ''));
          is(m.tiny.length === 0, `${tag}: text >= ${MIN_TEXT}px` +
            (m.tiny.length ? ' — ' + m.tiny.join(', ') : ''));
        }
        is(errs.length === 0, `${loc} ${w}x${h}: no js errors` + (errs[0] ? ' — ' + errs[0] : ''));
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n' + (FAIL
    ? `FAILED — ${FAIL} failed, ${PASS} passed across ${cells} cells`
    : `ALL GREEN — ${PASS} assertions across ${cells} cells (${LOCALES.length} locales x ${VIEWPORTS.length} viewports x ${Object.keys(STATES).length} states)`));
  process.exit(FAIL ? 1 : 0);
})();
