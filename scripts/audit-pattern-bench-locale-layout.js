#!/usr/bin/env node
/* =====================================================================
   audit-pattern-bench-locale-layout.js — 11 locales x 6 viewports x the
   states that change the layout.

   WHY THIS EXISTS: the smoke is 11 locales x ONE viewport and local-test
   is ONE locale x 6 viewports. The product is the cell neither covers,
   and English fitting proves nothing about German compounds or Finnish
   agglutination. This tool's chip bar carries six labels at once —
   en "Colours / Shapes / Pictures / Clap it / Cover a bead / A longer
   strip" is 56 characters before any locale is involved; de and fi are
   longer, and `hintTap` sits under the apparatus on ONE reserved line.

   ⚠⚠ THE OVERFLOW MEASUREMENT IS NOT `scrollWidth`. The tool sets
   `overflow-x:hidden` on the body scope and `.ptn-rail` is deliberately a
   horizontal scroller, so the document can never report overflow and that
   check would be VACUOUS. Measure where the content actually IS: the
   furthest-right laid-out edge of anything OUTSIDE the rail, against the
   CARD. The rail's own content is allowed to exceed it — that is what the
   fades, the snap and the thumb are for.

   ⚠ AND IT MEASURES MORE THAN THE RESTING STATE. The armed cloth swaps
   the hint for `coverNote` (the longest string in the set in several
   locales), and hiding the unit swaps the label for a full question.
   A sweep of the resting state alone cannot see either.

   Usage: node scripts/audit-pattern-bench-locale-layout.js [--locales=de,fi]
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
const MIN_TAP = 44, MIN_CELL = 44, MIN_TEXT = 14;

/* the states that change what text is on screen */
const STATES = {
  rest: null,
  armed: "T.st = T.setArmed(T.st, true); T.render();",
  hidden: "T.st = T._clone(T.st); T.st.unitHidden = true; T.render();",
  long4: "T.st = T.setUnitLength(T.st, 4); T.st = T.setLen(T.st, 25); T.render();",
  caption: "T.st = T.setMedium(T.st, 'shape'); T.render(); T._flashCap();"
};

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; if (!process.env.PTN_TERSE) console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    const f = u.indexOf('/image-library-webp/') === 0
      ? path.join(IMGLIB, u.slice('/image-library-webp/'.length))
      : path.join(MINI, path.basename(u));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  let cells = 0;
  const widest = {};

  for (const loc of LOCALES) {
    console.log('\n[' + loc + ']');
    /* a fresh browser per locale: a shared one caches the module and
       every later locale passes on the first one's copy */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    let locFails = 0;
    for (const [w, h] of VIEWPORTS) {
      for (const sk of Object.keys(STATES)) {
        const page = await browser.newPage();
        await page.setViewport({ width: w, height: h });
        await page.evaluateOnNewDocument(() => {
          try { localStorage.clear(); localStorage.setItem('accessToken', 'harness'); } catch (_) {}
        });
        await page.setRequestInterception(true);
        page.on('request', (r) => (r.url().indexOf('/api/auth/me') > -1
          ? r.respond({ status: 200, contentType: 'application/json',
              body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
          : r.continue()));
        const errs = [];
        page.on('pageerror', (e) => errs.push(String(e.message)));
        page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });

        await page.goto(`http://127.0.0.1:${PORT}/pattern-bench.html?lang=${loc}&embed=1`, { waitUntil: 'networkidle2' });
        await page.waitForSelector('.ptn-wrap', { timeout: 9000 });
        await wait(350);
        if (STATES[sk]) { await page.evaluate('(function(){var T=window.PatternBench;' + STATES[sk] + '}())'); await wait(300); }

        const m = await page.evaluate((f) => {
          const card = document.querySelector('.lcs-app').getBoundingClientRect();
          const rail = document.querySelector('.ptn-rail');
          const out = { over: [], small: [], tiny: [], text: [], clipped: [], widestChip: 0 };
          document.querySelectorAll('.ptn-wrap *').forEach((n) => {
            const r = n.getBoundingClientRect();
            if (!r.width) return;
            if (!(rail && rail.contains(n))) {
              if (r.right > card.right + 1 || r.left < card.left - 1) {
                out.over.push((n.className || n.tagName) + '@' + Math.round(r.right - card.right));
              }
            }
          });
          document.querySelectorAll('.ptn-chip,.ptn-segbtn,.ptn-lenbtn,.ptn-grip').forEach((n) => {
            const r = n.getBoundingClientRect();
            if (r.height && r.height < f.tap - 0.5) out.small.push(n.className + ':' + r.height.toFixed(0));
            out.widestChip = Math.max(out.widestChip, r.width);
          });
          document.querySelectorAll('.ptn-cell,.ptn-slot').forEach((n) => {
            const r = n.getBoundingClientRect();
            if (r.height && r.height < f.cell - 0.5) out.tiny.push(n.className + ':' + r.height.toFixed(0));
          });
          /* ⚠ CLIPPED TEXT, not just small text. A label that fits its box
             because the box hid the overflow is the defect this catches. */
          document.querySelectorAll('.ptn-chip,.ptn-segbtn,.ptn-lab,.ptn-hint,.ptn-cap,.ptn-privacy').forEach((n) => {
            const fs2 = parseFloat(getComputedStyle(n).fontSize);
            if (n.textContent.trim() && fs2 < f.text - 0.5) out.text.push(fs2.toFixed(0));
            if (n.scrollWidth > n.clientWidth + 2 && getComputedStyle(n).overflow !== 'visible') {
              out.clipped.push((n.className || '') + ' "' + n.textContent.trim().slice(0, 24) + '"');
            }
          });
          return out;
        }, { tap: MIN_TAP, cell: MIN_CELL, text: MIN_TEXT });

        const tag = `${loc} ${w}x${h} ${sk}`;
        cells++;
        const before = FAIL;
        is(m.over.length === 0, `${tag}: nothing outside the rail exceeds the card ${m.over.slice(0, 2).join(' ')}`);
        is(m.small.length === 0, `${tag}: every CONTROL >= ${MIN_TAP}px ${m.small.slice(0, 2).join(' ')}`);
        is(m.tiny.length === 0, `${tag}: every CANVAS CELL >= ${MIN_CELL}px ${m.tiny.slice(0, 2).join(' ')}`);
        is(m.text.length === 0, `${tag}: every label >= ${MIN_TEXT}px ${m.text.slice(0, 3).join(' ')}`);
        is(m.clipped.length === 0, `${tag}: no label is clipped by its own box ${m.clipped.slice(0, 2).join(' ')}`);
        is(errs.length === 0, `${tag}: zero console errors ${errs[0] || ''}`);
        if (FAIL > before) locFails += FAIL - before;
        widest[loc] = Math.max(widest[loc] || 0, m.widestChip);
        await page.close();
      }
    }
    console.log(`  [${loc}] ${locFails ? locFails + ' FAILURES' : 'clean'} — widest chip ${Math.round(widest[loc])}px`);
    await browser.close();
  }

  server.close();
  const order = Object.keys(widest).sort((a, b) => widest[b] - widest[a]);
  console.log('\n  widest chip by locale: ' + order.slice(0, 4).map((l) => l + ' ' + Math.round(widest[l])).join(', '));
  console.log('\n' + (FAIL
    ? `FAILED — ${FAIL} failed, ${PASS} passed across ${cells} cells`
    : `ALL GREEN — ${PASS} assertions across ${cells} cells (${LOCALES.length} locales x ${VIEWPORTS.length} viewports x ${Object.keys(STATES).length} states)`));
  process.exit(FAIL ? 1 : 0);
})();
