#!/usr/bin/env node
/* =====================================================================
   local-test-calendar-wall.js — the browser DoD for Calendar Wall.
   ---------------------------------------------------------------------
   Run:  node scripts/local-test-calendar-wall.js

   Serves `mini tools/` locally and drives the tool with REAL POINTER
   EVENTS. Screenshots to docs/audit-results/calendar-wall/qa/.

   ⭐⭐ THE OLD VERSION OF THIS FILE ASSERTED THE DEFECT. At line 394 it
   read `if (free.digits !== '0') FAIL(...)` — it required the free tier
   to display ZERO days in school for a class on day 37, which is the
   confusing render the rebuild removed. Three artefacts described that
   tier and all three disagreed: the code persistently saved the count,
   the copy said it did not, and the test certified the copy. A gate can
   certify a defect, and this one did for months.

   ⭐ AND THE OLD SWEEP COULD NOT SEE THE HEADLINE DEFECT EITHER. It
   asserted `.cwl-cell:not(.empty)` >= 28 — it counted CELLS, and a
   face-down card with no number on it is a cell. A count is not a
   reading. The numeral assertion below is the one that matters, and it
   is poison-tested against the pre-rebuild build.

   ⚠ 704 IS IN THE SWEEP AND IS THE PRODUCTION WIDTH. The tool page
   embeds this in an iframe inside `max-w-3xl`, which is ~704px at 1440,
   1920 and 2560 alike, and media queries inside an iframe resolve
   against the IFRAME. The previous build's projector-compression block
   was keyed `(min-width:768px)` and therefore could never fire on the
   only surface teachers use.

   ⚠ EVERY INTERACTION FAILS LOUDLY IF IT DID NOT HAPPEN. A click helper
   that silently no-ops leaves the NEXT assertion passing for the wrong
   reason, and a synthetic `.click()` proves nothing about reachability —
   it bypasses hit-testing, and it hid two real unreachable-control
   defects in this very rebuild before the pointer runs found them.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'calendar-wall', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
               '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

/* ⭐ `fits` IS ON EVERY VIEWPORT, and it was not always. The first
   version marked only the three projector sizes, so the sweep passed at
   704x900 — THE PRODUCTION WIDTH — with the last week of the month and
   the whole dock below the fold. I found that by reading the render, not
   from the gate, which is the second time in this build that a hole in
   my own sweep was visible in a screenshot and invisible to 40 green
   assertions.
   The tool cannot scroll (`body{overflow:hidden}` and no scrollable
   ancestor), so on any standalone viewport EVERYTHING has to fit or it
   is unreachable. Embedded, `_fitBoard` stands down and the iframe grows
   instead — a different regime, checked separately. */
const VIEWPORTS = [
  { w: 320, h: 640, fits: true }, { w: 360, h: 740, fits: true }, { w: 412, h: 820, fits: true },
  { w: 704, h: 900, fits: true, embedWidth: true },
  { w: 768, h: 1000, fits: true },
  { w: 1024, h: 768, fits: true }, { w: 1024, h: 900, fits: true },
  { w: 1366, h: 768, fits: true },
];
const SHOTS = new Set([360, 704, 768, 1024]);
const TAP_CONTROL = 44;   /* chrome controls */
const TAP_CELL = 34;      /* canvas cells — a DIFFERENT floor, asserted separately */
const MIN_NUMERAL = 13;

const fails = [];
const FAIL = (m) => { fails.push(m); console.log('  ✗ FAIL ' + m); };
const OK = (m) => console.log('  ✓ ' + m);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/calendar-wall.html';
    const f = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
                                           : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; res.end('nf'); return; }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

async function tap(page, sel, what) {
  const el = await page.$(sel);
  if (!el) { FAIL('could not find ' + (what || sel)); return false; }
  const box = await el.boundingBox();
  if (!box || box.width < 1 || box.height < 1) { FAIL((what || sel) + ' has no box'); return false; }
  /* ⚠ reachability, not just existence: ask the browser what is actually
     at the point a finger would land on */
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  const hit = await page.evaluate((x, y, s) => {
    const at = document.elementFromPoint(x, y);
    return !!(at && at.closest && at.closest(s));
  }, cx, cy, sel);
  if (!hit) { FAIL((what || sel) + ' is not reachable at its own centre (covered or off-screen)'); return false; }
  await page.mouse.click(cx, cy);
  await sleep(170);
  return true;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}/mini-tools/calendar-wall.html`;

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource|net::ERR/.test(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    if (window.speechSynthesis) window.speechSynthesis.speak = (u) => window.__spoken.push(u.text);
    window.__printed = 0;
    window.print = () => { window.__printed++; };
  });

  /* ================= A. the viewport sweep ================= */
  console.log('\nA. viewport sweep (704 is the production width)');
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.w, height: vp.h });
    await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.cwl-grid', { timeout: 8000 }).catch(() => null);
    await sleep(450);

    const m = await page.evaluate((TC, TL, MN) => {
      const r = (e) => e.getBoundingClientRect();
      const cells = [...document.querySelectorAll('.cwl-cell:not(.empty)')];
      const small = [];
      for (const s of ['.cwl-dockchip', '.cwl-nav', '.cwl-monav', '.cwl-chipbtn', '.cwl-chip']) {
        document.querySelectorAll(s).forEach(e => {
          const b = r(e);
          if (b.width && (b.width < TC || b.height < TC)) small.push(s + ' ' + Math.round(b.width) + 'x' + Math.round(b.height));
        });
      }
      const smallCells = cells.filter(c => { const b = r(c); return b.width < TL || b.height < TL; }).length;
      const nums = cells.map(c => c.querySelector('.cwl-cellnum')).filter(Boolean);
      const tinyNum = nums.filter(n => parseFloat(getComputedStyle(n).fontSize) < MN).length;
      /* ⭐ COLLISION, not just containment. Every other assertion here
         measures ONE box against a floor, and a set of those cannot see
         two rendered things overlapping — which is how a clipped hint
         shipped past 141 of them on a sibling tool. */
      const marks = [...document.querySelectorAll('.cwl-cell .cwl-cellnum, .cwl-cell .cwl-marks, .cwl-cell .cwl-cellw, .cwl-cell .cwl-ord')];
      let collisions = 0;
      for (let i = 0; i < marks.length; i++) {
        for (let j = i + 1; j < marks.length; j++) {
          if (marks[i].parentNode !== marks[j].parentNode) continue;
          const a = r(marks[i]), b = r(marks[j]);
          if (a.right > b.left + 1 && b.right > a.left + 1 && a.bottom > b.top + 1 && b.bottom > a.top + 1) collisions++;
        }
      }
      const card = document.querySelector('.lcs-app');
      const cardR = r(card);
      let outside = 0;
      document.querySelectorAll('.cwl-wrap *').forEach(e => {
        const b = r(e);
        if (b.width && (b.right > cardR.right + 1.5 || b.left < cardR.left - 1.5)) outside++;
      });
      const dock = document.querySelector('.cwl-dock');
      return {
        cells: cells.length, numbered: nums.length, tinyNum, smallCells, small: [...new Set(small)],
        collisions, outside,
        overflowX: document.documentElement.scrollWidth - window.innerWidth,
        dockBottom: dock ? Math.round(r(dock).bottom) : 0,
        vh: window.innerHeight,
        cellW: cells[0] ? Math.round(r(cells[0]).width) : 0,
        cellH: cells[0] ? Math.round(r(cells[0]).height) : 0,
      };
    }, TAP_CONTROL, TAP_CELL, MIN_NUMERAL);

    const tag = vp.w + 'x' + vp.h;
    let bad = false;
    /* ⭐ THE ASSERTION THE OLD GATE DID NOT HAVE */
    if (m.numbered !== m.cells || m.cells < 28) {
      FAIL(tag + ': ' + m.numbered + ' of ' + m.cells + ' day cells carry a numeral'); bad = true;
    }
    if (m.tinyNum) { FAIL(tag + ': ' + m.tinyNum + ' numerals below ' + MIN_NUMERAL + 'px'); bad = true; }
    if (m.overflowX > 1) { FAIL(tag + ': horizontal overflow ' + m.overflowX + 'px'); bad = true; }
    if (m.outside > 0) { FAIL(tag + ': ' + m.outside + ' node(s) outside the CARD'); bad = true; }
    if (m.collisions > 0) { FAIL(tag + ': ' + m.collisions + ' overlapping pair(s) inside a cell'); bad = true; }
    if (m.small.length) { FAIL(tag + ': controls under ' + TAP_CONTROL + 'px: ' + m.small.join(', ')); bad = true; }
    if (m.smallCells) { FAIL(tag + ': ' + m.smallCells + ' cells under ' + TAP_CELL + 'px'); bad = true; }
    if (vp.fits && m.dockBottom > m.vh + 1) {
      FAIL(tag + ': dock bottom ' + m.dockBottom + ' > viewport ' + m.vh + ' (the whole ritual must fit a projector)'); bad = true;
    }
    /* a calendar cell that is more than 1.7x wider than tall is a ledger row */
    if (m.cellH && m.cellW / m.cellH > 1.75) {
      FAIL(tag + ': cell ' + m.cellW + 'x' + m.cellH + ' reads as a spreadsheet row'); bad = true;
    }
    if (!bad) OK(tag + ': ' + m.numbered + '/' + m.cells + ' numbered, cell ' + m.cellW + 'x' + m.cellH +
                 (vp.fits ? ', dock ' + m.dockBottom + '/' + m.vh : '') + (vp.embedWidth ? '  [production width]' : ''));
    if (SHOTS.has(vp.w) && (vp.w !== 1024 || vp.h === 768)) {
      await page.screenshot({ path: path.join(OUT, 'dod-' + vp.w + '.png'), fullPage: true });
    }
  }

  /* ================= B. no audio on open ================= */
  console.log('\nB. the tool is legible with the sound off');
  await page.setViewport({ width: 1024, height: 900 });
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await sleep(500);
  const spokeOnOpen = await page.evaluate(() => window.__spoken.length);
  if (spokeOnOpen) FAIL('it spoke on open (' + spokeOnOpen + ' utterances)'); else OK('nothing is spoken on open');
  const visible = await page.evaluate(() => (document.querySelector('.cwl-datetext') || {}).textContent || '');
  if (!visible.trim() || /\d/.test(visible)) FAIL('the date line is not a composed sentence: "' + visible + '"');
  else OK('the date is READ from the board, not heard: "' + visible.trim() + '"');

  /* ================= C. the counter ================= */
  console.log('\nC. days in school');
  await tap(page, '.cwl-dockchip[data-fk="dock-1"]', 'the counter chip');
  const c0 = await page.evaluate(() => ({
    digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
    jars: document.querySelectorAll('.cwl-jarcol').length,
    hundreds: !!document.querySelector('.cwl-jar.hundreds'),
    plus: !!document.querySelector('.cwl-plusone'),
  }));
  if (c0.jars !== 3 || !c0.hundreds) FAIL('the hundreds column must always be drawn (jars=' + c0.jars + ')');
  else OK('all three place-value columns are drawn, empty or not');
  if (!c0.plus) FAIL('no +1 control on a school day'); else OK('the +1 is offered');
  await tap(page, '.cwl-plusone', 'the +1');
  const c1 = await page.evaluate(() => ({
    digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
    ones: document.querySelectorAll('.cwl-jar.ones .cwl-jaritem').length,
    frameFilled: document.querySelectorAll('.cwl-tfcell.filled').length,
    counted: !!document.querySelector('.cwl-counted'),
    iHasVar: (() => { const it = document.querySelector('.cwl-jaritem');
      return !!(it && it.style.getPropertyValue('--i') !== ''); })(),
  }));
  if (c1.digits !== '1') FAIL('after +1 the numeral reads "' + c1.digits + '"'); else OK('the numeral advanced to 1');
  if (c1.ones !== 1 || c1.frameFilled !== 1) FAIL('the representations are out of sync (straws ' + c1.ones + ', frame ' + c1.frameFilled + ')');
  else OK('bundles, frame and numeral move together');
  if (!c1.counted) FAIL('double-counting is not structurally blocked'); else OK('counting twice in a day is structurally blocked');
  /* ⭐ --i IS THE VARIABLE WHOSE ABSENCE MADE THE CELEBRATION A NO-OP */
  if (!c1.iHasVar) FAIL('--i is not set on the jar items: the rebundle gather cannot animate');
  else OK('--i is set, so the regroup can actually gather');

  /* ================= D. the free tier tells the truth ================= */
  console.log('\nD. the free tier');
  await page.evaluate(() => {
    const T = window.CalendarWall;
    T.premium = false;
    const w = T.wall();
    /* a class on day 37, counted yesterday — the exact case the old gate
       required to render as ZERO */
    w.days = {};
    w.days[T.M.shiftKey(T._todayKey, -1)] = { n: 37 };
    T._paint();
  });
  await sleep(200);
  const free = await page.evaluate(() => ({
    digits: [...document.querySelectorAll('.cwl-digit')].map(e => e.textContent).join(''),
    gate: !!document.querySelector('.cwl-gate'),
  }));
  if (free.digits !== '37') FAIL('the free tier shows "' + free.digits + '" for a class on day 37 — a counting instrument may not assert a false quantity');
  else OK('the count is TRUE on the free plan (37), and the record is what is withheld');
  if (!free.gate) FAIL('no gate line explaining what a subscription adds'); else OK('the gate says what it withholds');

  /* ================= E. the weather month ================= */
  console.log('\nE. weather');
  await tap(page, '.cwl-dockchip[data-fk="dock-2"]', 'the weather chip');
  await tap(page, '.cwl-wbtn[data-w="rain"]', 'rain');
  const w1 = await page.evaluate(() => ({
    rows: document.querySelectorAll('.cwl-wrow').length,
    stamps: document.querySelectorAll('.cwl-stamp').length,
    ghosts: document.querySelectorAll('.cwl-stamp.ghost').length,
    keyOpacity: (() => { const k = document.querySelector('.cwl-wkeyicon svg');
      return k ? getComputedStyle(k).opacity : '0'; })(),
    pill: !!document.querySelector('.cwl-todaypill'),
    counts: [...document.querySelectorAll('.cwl-wcount')].map(e => e.textContent).join(''),
  }));
  if (w1.rows !== 6) FAIL('expected 6 weather rows, got ' + w1.rows); else OK('the pictograph is laid down as six rows');
  if (w1.stamps !== 1) FAIL('expected exactly 1 stamp after one observation, got ' + w1.stamps);
  else OK('one observation, one stamp — strict 1:1');
  /* ⭐ THE GHOSTS WERE PHANTOM DATA UNDER A REAL QUESTION */
  if (w1.ghosts) FAIL(w1.ghosts + ' ghost stamps still render'); else OK('no phantom stamps');
  if (parseFloat(w1.keyOpacity) < 1) FAIL('the axis key is faded (' + w1.keyOpacity + ') — key and unit must be the same mark');
  else OK('the key is the unit at full strength');
  if (!w1.pill) FAIL('no today pill after picking'); else OK('today reads back what was chosen');

  /* ================= F. print ================= */
  console.log('\nF. print');
  await page.evaluate(() => { window.CalendarWall.premium = false; window.CalendarWall._paint(); });
  await tap(page, '.cwl-printchip', 'the print chip (free)');
  const pFree = await page.evaluate(() => ({
    printed: window.__printed,
    sheetKids: document.querySelectorAll('.cwl-sheet > *').length,
    gate: !!document.querySelector('.cwl-gate'),
  }));
  if (pFree.printed) FAIL('a free visitor reached window.print()');
  else OK('the print chip is gated');
  if (pFree.sheetKids) FAIL('the sheet subtree exists in the DOM when unpaid (' + pFree.sheetKids + ' nodes)');
  else OK('the sheet is ABSENT from the DOM when unpaid, not merely hidden');
  await page.evaluate(() => { window.CalendarWall.premium = true; window.CalendarWall._paint(); });
  await sleep(150);
  await tap(page, '.cwl-printchip', 'the print chip (paid)');
  const pPaid = await page.evaluate(() => ({
    printed: window.__printed,
    cells: document.querySelectorAll('.cwl-p-cell').length,
    nums: document.querySelectorAll('.cwl-p-num').length,
  }));
  if (!pPaid.printed) FAIL('a subscriber did not reach window.print()'); else OK('a subscriber prints');
  if (pPaid.nums < 28) FAIL('the sheet carries only ' + pPaid.nums + ' numerals'); else OK('every day is numbered on paper too (' + pPaid.nums + ')');

  /* ================= G. keyboard + a11y ================= */
  console.log('\nG. keyboard and semantics');
  await page.goto(BASE + '?lang=en', { waitUntil: 'networkidle0' });
  await sleep(400);
  const a11y = await page.evaluate(() => {
    const cells = [...document.querySelectorAll('.cwl-cell:not(.empty)')];
    return {
      allButtons: cells.every(c => c.tagName === 'BUTTON'),
      allLabelled: cells.every(c => (c.getAttribute('aria-label') || '').length > 3),
      gridRole: (document.querySelector('.cwl-grid') || {}).getAttribute ? document.querySelector('.cwl-grid').getAttribute('role') : null,
      todayCurrent: !!document.querySelector('.cwl-cell[aria-current="date"]'),
    };
  });
  if (!a11y.allButtons) FAIL('not every day is a button — you cannot tab to a day'); else OK('every day is a real button');
  if (!a11y.allLabelled) FAIL('a day cell has no aria-label'); else OK('every day announces its date and its state');
  if (a11y.gridRole !== 'grid') FAIL('the month has no grid role'); else OK('the month is a grid to assistive tech');
  if (!a11y.todayCurrent) FAIL('today is not aria-current'); else OK('today is aria-current="date"');
  /* the arrow keys must NOT reach through an open dialog */
  await tap(page, '.cwl-cell[aria-current="date"]', 'today');
  const before = await page.evaluate(() => window.CalendarWall._widx);
  await page.keyboard.press('ArrowRight');
  await sleep(120);
  const after = await page.evaluate(() => window.CalendarWall._widx);
  if (after !== before) FAIL('an arrow key changed the widget behind an open dialog');
  else OK('arrow keys do not reach through an open dialog');
  await page.keyboard.press('Escape');
  await sleep(150);
  const closed = await page.evaluate(() => !document.querySelector('.cwl-sheetdlg.open'));
  if (!closed) FAIL('Escape did not close the day sheet'); else OK('Escape closes the sheet');

  console.log('\nconsole errors: ' + (errs.length ? errs.slice(0, 5).join(' | ') : 'none'));
  errs.forEach(e => FAIL('console: ' + e));

  await browser.close();
  server.close();
  console.log('\n' + (fails.length ? 'RESULT: FAIL (' + fails.length + ')' : 'RESULT: PASS'));
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
