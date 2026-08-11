/* =====================================================================
   LOCALE × VIEWPORT LAYOUT — TOOL #54, THE DOUBLING MIRROR
   =====================================================================
   11 locales × 6 widths = 66 cells. German compounds, Finnish
   agglutination and the Nordic definite forms are all longer than the
   English they were authored beside, and this tool's act strip carries
   five legends and eleven labelled buttons.

   ⚠⚠ MEASURED AGAINST THE CARD, NEVER THE INNER BOX. `overflow-x` on a
   wrapper absorbs the evidence, so a box that overflows its own parent
   can report clean while the text is visibly clipped. Every measurement
   here is against `.dbm-card`'s rect.

   ⚠⚠ THE COUNTERS ARE MATERIAL, NOT CONTROLS, AND THE FIRST VERSION
   OF THIS GATE APPLIED A TAP FLOOR TO THEM. No listener is bound to
   `.dbm-c` anywhere in the tool — a child never taps a counter, they
   press the stepper — and a 34px floor is geometrically impossible for
   a five-wide row inside a 320px card anyway. So it failed a CORRECT
   layout in every locale at every phone width, and the fix it invited
   was to change the tool. That is the recorded trap: an invented
   threshold is not a measurement.
   What the counters actually owe a class is COUNTABILITY, so that is
   what is measured — they must not OVERLAP each other, and must clear a
   legibility floor. Controls, which are tapped, keep the 44px floor.

   ⚠ THE POISON IS ARMED ON EVERY RUN. A gate that has never been seen
   to fail is indistinguishable from a gate that cannot.

   Run: node scripts/audit-doubling-mirror-locale-layout.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.DOUBLING_MIRROR_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 704, 768, 1024];
const REACH = ['twenty', 'ten'];

let pass = 0;
const fails = [];
const warns = [];
const ok = (c, m) => { if (c) pass++; else fails.push(m); };

const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json' };
function serve() {
  return new Promise(res => {
    const s = http.createServer((rq, rs) => {
      let p = decodeURIComponent(rq.url.split('?')[0]);
      if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length);
      const f = path.join(ROOT, p.replace(/^\//, ''));
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rs.writeHead(404); rs.end(); return; }
      rs.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      rs.end(fs.readFileSync(f));
    });
    s.listen(0, '127.0.0.1', () => res(s));
  });
}

/* the one measurement, run in the page */
const MEASURE = `() => {
  const card = document.querySelector('.dbm-card');
  if (!card) return { err: 'no card' };
  const C = card.getBoundingClientRect();
  const out = { cardW: C.width, over: [], small: [], tinyCell: 0, cells: 0, ctl: 0, clipped: [] };
  document.querySelectorAll('.dbm-btn, .dbm-leg').forEach(function (el) {
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const label = (el.textContent || '').trim().slice(0, 34);
    /* against the CARD — an inner overflow container would hide this */
    if (r.right > C.right + 1 || r.left < C.left - 1) out.over.push(label);
    /* a label wider than its own box is clipped text */
    if (el.scrollWidth > el.clientWidth + 2) out.clipped.push(label);
    if (el.classList.contains('dbm-btn')) {
      out.ctl++;
      if (r.height < 44 || r.width < 44) out.small.push(label + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
    }
  });
  const boxes = [];
  document.querySelectorAll('.dbm-c').forEach(function (c) {
    const r = c.getBoundingClientRect();
    if (r.width < 1) return;
    out.cells++;
    if (r.width < 12) out.tinyCell++;
    boxes.push(r);
  });
  /* countability: no two counters may overlap, or a class cannot count
     them however big they are */
  out.overlap = 0;
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.right > b.left + 1 && b.right > a.left + 1 &&
          a.bottom > b.top + 1 && b.bottom > a.top + 1) out.overlap++;
    }
  }
  return out;
}`;

(async () => {
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  let cells = 0;

  try {
    for (const L of LOCALES) {
      /* ⚠ a FRESH page per locale — a reused one carries the previous
         locale's laid-out text and reports it as this locale's */
      const p = await browser.newPage();
      await p.setCacheEnabled(false);
      await p.goto(base + '/doubling-mirror.html?lang=' + L, { waitUntil: 'networkidle0' });
      await p.waitForSelector('.dbm-card', { timeout: 8000 });

      for (const reach of REACH) {
        /* ⚠ SWEEP EVERY CONFIGURATION, NOT JUST THE DEFAULT. `reach`
           shortens the chip strip and lowers the cap, so it changes the
           widest row on the page. */
        await p.evaluate(function (r) {
          const T = window.DoublingMirror;
          if (T && T.st) { T.st = T.newState(r, 'on'); T._paint(); }
        }, reach);
        await new Promise(r => setTimeout(r, 120));

        for (const w of WIDTHS) {
          await p.setViewport({ width: w, height: 900 });
          await new Promise(r => setTimeout(r, 140));
          const m = await p.evaluate(eval('(' + MEASURE + ')'));
          const at = L + '/' + reach + '@' + w;
          cells++;
          ok(!m.err, at + ' ' + m.err);
          if (m.err) continue;
          ok(m.ctl > 0, at + ' non-vacuity: no controls measured — the strip did not render');
          ok(m.cells > 0, at + ' non-vacuity: no counters measured');
          ok(m.over.length === 0, at + ' ⚠ overflows the CARD: ' + m.over.join(' · '));
          ok(m.clipped.length === 0, at + ' ⚠ text is CLIPPED inside its own box: ' + m.clipped.join(' · '));
          ok(m.small.length === 0, at + ' ⚠ under the 44px control floor: ' + m.small.join(' · '));
          ok(m.tinyCell === 0, at + ' ⚠ ' + m.tinyCell + ' counters under the 12px legibility floor');
          ok(m.overlap === 0, at + ' ⚠⚠ ' + m.overlap + ' pairs of counters OVERLAP — they cannot be counted');
        }
      }
      await p.close();
    }

    /* ---- POISON, armed on every run ---------------------------- */
    /* a synthetic label long enough to break any strip must FAIL */
    const p = await browser.newPage();
    await p.goto(base + '/doubling-mirror.html?lang=de', { waitUntil: 'networkidle0' });
    await p.waitForSelector('.dbm-card', { timeout: 8000 });
    await p.setViewport({ width: 320, height: 900 });
    await p.evaluate(() => {
      const b = document.querySelector('.dbm-btn');
      if (b) { b.style.whiteSpace = 'nowrap'; b.textContent = 'X'.repeat(220); }
    });
    await new Promise(r => setTimeout(r, 160));
    const poisoned = await p.evaluate(eval('(' + MEASURE + ')'));
    ok(poisoned.over.length > 0 || poisoned.clipped.length > 0,
      'POISON ⚠⚠ a 220-character label at 320px was NOT caught — this gate cannot fail, ' +
      'so its 66 green cells mean nothing');
    /* and the CONTROL: the untouched page must be clean */
    await p.evaluate(() => location.reload());
    await p.waitForSelector('.dbm-card', { timeout: 8000 });
    await new Promise(r => setTimeout(r, 200));
    const control = await p.evaluate(eval('(' + MEASURE + ')'));
    ok(control.over.length === 0 && control.clipped.length === 0,
      'POISON control ⚠ the untouched page FAILS the same check — the poison proved nothing');
    await p.close();

  } catch (e) {
    fails.push('THREW: ' + e.message);
  } finally {
    await browser.close();
    srv.close();
  }

  console.log('  ' + cells + ' cells (' + LOCALES.length + ' locales x ' + REACH.length +
    ' reach settings x ' + WIDTHS.length + ' widths)');
  warns.forEach(w => console.log('  warn ' + w));
  if (fails.length) {
    console.log('FAIL  ' + pass + ' checks, ' + fails.length + ' failures');
    fails.slice(0, 25).forEach(f => console.log('  ✗ ' + f));
    process.exit(1);
  }
  console.log('PASS  ' + pass + ' checks, 0 failures');
})();
