#!/usr/bin/env node
/* =====================================================================
   local-test-ten-frame-tool.js — the interaction + layout harness for
   TOOL #1b, THE TEN FRAME (the free-play instrument).

   Run:  node scripts/local-test-ten-frame-tool.js [--shot] [--width=768]

   ⚠⚠ THE NAME. `scripts/local-test-ten-frame.js` already exists and
   drives `ten-frame-activity.html` — the K.OA.A.1 / K.OA.A.2 /
   K.OA.A.5 ACTIVITIES, on the shared core. It must not be clobbered,
   and it never opens `ten-frame.html`. This file is the tool's.

   WHAT IT MEASURES (never what it assumes):
     · the whole viewport sweep 320 · 360 · 412 · 768 · 1024 · 1366,
       and EVERY field, not just the default — a frame sized for the
       opening state looked right forever on #42 because five-by-nine
       was the default.
     · THREE TAP FLOORS, NAMED SEPARATELY. An or-shaped assertion hid a
       missing floor twice on this platform, so controls (>=44px),
       canvas cells (>=34px) and text (>=14px) are each checked on
       their own and reported on their own.
     · CONTAINMENT AGAINST THE CARD, not against the inner box —
       `overflow-x` on an inner element absorbs the evidence.
     · ⭐ THE FRAME NEVER WRAPS. A wrapped ten-frame is not a
       ten-frame; this is the single most important assertion here.
     · real pointer events for the gestures, because a synthetic
       .click() never fires pointerdown and cannot see a drag.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const IMG = path.join(__dirname, '..', 'frontend', 'public');
const PORT = 5583;                       /* 5391-5581 are taken by siblings */
const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const FIELDS = ['five', 'ten', 'tenrow', 'twentyfield', 'twentypair'];
const arg = (k, d) => { const m = process.argv.find((a) => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const SHOT = process.argv.includes('--shot');
const SHOTDIR = path.join(__dirname, '..', '.scratch', 'tnf');

let PASS = 0, FAIL = 0;
const fails = [];
function is(cond, msg) { if (cond) PASS++; else { FAIL++; fails.push(msg); } }

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png' };
function serve() {
  return http.createServer((req, res) => {
    const raw = decodeURIComponent(req.url.split('?')[0]);
    let f = path.join(ROOT, raw.replace(/^\/mini-tools/, ''));
    if (!fs.existsSync(f)) f = path.join(IMG, raw.replace(/^\//, ''));
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('nf'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'text/plain' });
    res.end(fs.readFileSync(f));
  });
}

/* a REAL pointer tap — a synthetic click cannot see a drag threshold */
async function tap(page, sel, nth = 0, mods = {}) {
  const box = await page.evaluate((s, n) => {
    const e = document.querySelectorAll(s)[n];
    if (!e) return null;
    const r = e.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }, sel, nth);
  if (!box) throw new Error(`tap: no ${sel}[${nth}] — a helper that silently does nothing hollows out the next assertion`);
  if (mods.shift) await page.keyboard.down('Shift');
  await page.mouse.move(box.x, box.y);
  await page.mouse.down();
  await page.mouse.up();
  if (mods.shift) await page.keyboard.up('Shift');
  await new Promise((r) => setTimeout(r, 60));
  return box;
}

const read = (page) => page.evaluate(() => {
  const q = (s) => document.querySelector(s), qa = (s) => Array.from(document.querySelectorAll(s));
  const filled = qa('.tnf-cell[data-filled="1"]').length;
  return {
    cells: qa('.tnf-cell').length,
    filled,
    ghosts: qa('.tnf-cell[data-filled="0"] .tnf-ghost').length,
    trayLeft: Number(q('.tnf-tray') ? q('.tnf-tray').dataset.left : -1),
    trayDiscs: qa('.tnf-traydisc').length,
    num: q('.tnf-num') ? q('.tnf-num').textContent : null,
    ords: qa('.tnf-cell[data-filled="1"]').map((e) => Number(e.dataset.ord)).sort((a, b) => a - b),
    tidyDisabled: !!(q('.tnf-bar button:nth-of-type(1)') && false),
    geom: q('.tnf-fields') ? q('.tnf-fields').dataset.geom : null
  };
});

(async () => {
  const srv = serve();
  await new Promise((r) => srv.listen(PORT, r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const url = (extra) => `http://127.0.0.1:${PORT}/ten-frame.html?lang=en${extra || ''}`;

  /* ================= 1. the gestures, at a comfortable size ========= */
  {
    const page = await browser.newPage();
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message));
    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(url(), { waitUntil: 'networkidle0' });
    await page.waitForSelector('.tnf-cell');

    let st = await read(page);
    is(st.cells === 10, `the ten-frame opens with ten cells (got ${st.cells})`);
    is(st.filled === 0, `it opens empty (got ${st.filled})`);
    is(st.trayLeft === 10, `and the tray opens with ten counters (got ${st.trayLeft})`);
    is(st.ghosts === 10, `every empty cell draws a ghost (got ${st.ghosts})`);
    is(st.num === null, 'the numeral is OFF by default — the frame is the only thing to read');

    /* ⭐ ONE TOUCH TO SEVEN — the whiteboard teacher's move, and the
       behaviour the shipped tool had. It must not regress. */
    await tap(page, '.tnf-cell', 6);
    st = await read(page);
    is(st.filled === 7, `one tap on the seventh cell fills seven (got ${st.filled})`);
    is(st.trayLeft === 3, `⭐ and the tray is down to three — the complement, as objects (got ${st.trayLeft})`);
    is(st.ghosts === 3, `and three ghosts remain in the frame (got ${st.ghosts})`);

    /* Shift = exactly one */
    await tap(page, '.tnf-cell', 9, { shift: true });
    st = await read(page);
    is(st.filled === 8, `shift-tap places exactly one counter (got ${st.filled})`);
    is(st.ords.join(',') === '0,1,2,3,4,5,6,9', `and it lands where it was tapped (${st.ords.join(',')})`);
    is(st.trayLeft === 2, `the tray follows (got ${st.trayLeft})`);

    /* ⭐ THE TIDY — the number must not change */
    const before = st.filled;
    const tidyIdx = await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('.tnf-bar .tnf-chip'));
      return b.findIndex((e) => !e.classList.contains('tnf-fieldchip'));
    });
    await tap(page, '.tnf-bar .tnf-chip', tidyIdx);
    st = await read(page);
    is(st.filled === before, `⭐ Tidy does not change the number: ${before} -> ${st.filled}`);
    is(st.ords.join(',') === '0,1,2,3,4,5,6,7', `and it collapses to canonical (${st.ords.join(',')})`);

    /* the tray places one */
    await tap(page, '.tnf-tray');
    st = await read(page);
    is(st.filled === 9, `tapping the tray places one counter (got ${st.filled})`);
    is(st.trayLeft === 1, `and takes it out of the tray (got ${st.trayLeft})`);

    /* Fill the rest empties the tray */
    await tap(page, '.tnf-bar .tnf-chip', tidyIdx + 1);
    st = await read(page);
    is(st.filled === 10 && st.trayLeft === 0, `Fill the rest fills the frame and empties the tray (${st.filled}/${st.trayLeft})`);

    /* ⭐ THE COUNTERS RAN OUT — the tray is a real bound */
    const trayDisabled = await page.evaluate(() => document.querySelector('.tnf-tray').disabled);
    is(trayDisabled === true, '⭐ an empty tray is disabled — the frame cannot be over-filled');

    /* tapping a filled cell clears from there on */
    await tap(page, '.tnf-cell', 3);
    st = await read(page);
    is(st.filled === 3, `tapping a filled cell clears from there on (got ${st.filled})`);

    /* ---- the field chips really change the field ---- */
    for (let i = 0; i < FIELDS.length; i++) {
      await tap(page, '.tnf-fieldchip', i);
      const s2 = await read(page);
      is(s2.cells === 5 || s2.cells === 10 || s2.cells === 20,
        `field chip ${i} draws a real field (${s2.cells} cells, ${s2.geom})`);
    }
    /* ⭐ the same counters, a different field */
    await page.evaluate(() => { document.querySelectorAll('.tnf-fieldchip')[3].click(); });
    await new Promise((r) => setTimeout(r, 80));
    await tap(page, '.tnf-cell', 12);
    const a = await read(page);
    await page.evaluate(() => { document.querySelectorAll('.tnf-fieldchip')[4].click(); });
    await new Promise((r) => setTimeout(r, 80));
    const b = await read(page);
    is(a.filled === 13 && b.filled === 13,
      `⭐ thirteen survives the change of field without a counter moving (${a.filled} -> ${b.filled})`);
    is(a.geom !== b.geom, `and it really is a different field (${a.geom} -> ${b.geom})`);

    /* ---- the keyboard reaches everything a pointer does ----
       ⚠ RESET FIRST. The first version of this block assumed an empty
       board and reported two defects that were its own: the field
       changes above leave thirteen counters down, which clamp to ten on
       the ten-frame, so Enter on the seventh cell correctly CLEARED
       rather than filled. The tool was right both times. */
    await page.evaluate(() => { document.querySelectorAll('.tnf-fieldchip')[1].click(); });
    await new Promise((r) => setTimeout(r, 80));
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.lcs-ctrl'));
      const reset = btns[btns.length - 1];
      if (reset) reset.click();
    });
    await new Promise((r) => setTimeout(r, 120));
    const cleared = await read(page);
    is(cleared.filled === 0, `the shell Reset empties the frame (got ${cleared.filled})`);
    await page.evaluate(() => { document.querySelector('.tnf-cell[tabindex="0"]').focus(); });
    for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await new Promise((r) => setTimeout(r, 80));
    const k = await read(page);
    is(k.filled === 7, `⭐ the keyboard alone reaches seven (got ${k.filled})`);
    const focusOrd = await page.evaluate(() => document.activeElement.dataset.ord);
    is(focusOrd === '6', `and focus is where the arrows left it (ord ${focusOrd})`);
    await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift');
    await new Promise((r) => setTimeout(r, 80));
    const k2 = await read(page);
    is(k2.filled === 6, `shift-Enter takes exactly one back off (got ${k2.filled})`);

    /* ================= THE CARRY ================================
       ⭐ Real pointer events. A synthetic .click() never fires
       pointerdown, so it cannot see a drag at all — and the whole
       reason drag exists here is that the copy has promised it in
       eleven locales since launch. */
    const centre = (sel, n) => page.evaluate((s, i) => {
      const e = document.querySelectorAll(s)[i];
      const r = e.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, sel, n);
    const drag = async (from, to) => {
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      await page.mouse.move(from.x + 14, from.y + 4);      /* past the 8px threshold */
      await page.mouse.move(to.x, to.y, { steps: 6 });
      await page.mouse.up();
      await new Promise((r) => setTimeout(r, 120));
    };

    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('.lcs-ctrl'));
      b[b.length - 1].click();
    });
    await new Promise((r) => setTimeout(r, 120));
    await tap(page, '.tnf-cell', 4);                        /* five down, canonical */
    st = await read(page);
    is(st.filled === 5, `five counters down before the carry (got ${st.filled})`);

    /* ⭐ TRAY -> CELL: the counters come from somewhere */
    await drag(await centre('.tnf-tray', 0), await centre('.tnf-cell', 8));
    st = await read(page);
    is(st.filled === 6 && st.ords.indexOf(8) !== -1,
      `⭐ a counter is carried out of the tray into cell 9 (${st.ords.join(',')})`);
    is(st.trayLeft === 4, `and the tray is one lighter (got ${st.trayLeft})`);

    /* ⭐ CELL -> CELL: the SAME counter travels, and the number holds */
    const n0 = st.filled;
    await drag(await centre('.tnf-cell', 8), await centre('.tnf-cell', 6));
    st = await read(page);
    is(st.filled === n0, `⭐ carrying a counter across does not change the number (${n0} -> ${st.filled})`);
    is(st.ords.indexOf(6) !== -1 && st.ords.indexOf(8) === -1,
      `and it really moved, 9 -> 7 (${st.ords.join(',')})`);

    /* CELL -> away: dropping it off the frame puts it back in the tray */
    const before2 = st.trayLeft;
    await drag(await centre('.tnf-cell', 6), { x: 40, y: 40 });
    st = await read(page);
    is(st.trayLeft === before2 + 1, `dropping a counter off the frame returns it to the tray (${before2} -> ${st.trayLeft})`);

    /* ⚠ A BAD DROP DOES NOTHING — onto an occupied cell */
    const snap0 = (await read(page)).ords.join(',');
    await drag(await centre('.tnf-cell', 0), await centre('.tnf-cell', 1));
    st = await read(page);
    is(st.ords.join(',') === snap0, `⚠ a drop onto an occupied cell changes nothing (${st.ords.join(',')})`);

    /* ⚠ AND A SHAKY TAP IS STILL A TAP — under the threshold */
    await page.evaluate(() => {
      const b = Array.from(document.querySelectorAll('.lcs-ctrl'));
      b[b.length - 1].click();
    });
    await new Promise((r) => setTimeout(r, 120));
    const c3 = await centre('.tnf-cell', 3);
    await page.mouse.move(c3.x, c3.y);
    await page.mouse.down();
    await page.mouse.move(c3.x + 4, c3.y + 3);              /* 5px — under 8 */
    await page.mouse.up();
    await new Promise((r) => setTimeout(r, 120));
    st = await read(page);
    is(st.filled === 4, `⚠ a 5px wobble is still a tap, not a drag (got ${st.filled})`);

    /* the carried ghost is cleaned up */
    const leftovers = await page.evaluate(() => document.querySelectorAll('.tnf-carry').length);
    is(leftovers === 0, `no carried counter is left on the page (${leftovers})`);

    is(errs.filter((e) => !/quota\/status|favicon|net::ERR|404/.test(e)).length === 0,
      'no console errors: ' + JSON.stringify(errs.slice(0, 3)));
    await page.close();
  }

  /* ================= 2. the sweep — every width x every field ======= */
  if (SHOT) fs.mkdirSync(SHOTDIR, { recursive: true });
  for (const w of WIDTHS) {
    for (let fi = 0; fi < FIELDS.length; fi++) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: 900 });
      await page.goto(url(), { waitUntil: 'networkidle0' });
      await page.waitForSelector('.tnf-cell');
      await page.evaluate((i) => { document.querySelectorAll('.tnf-fieldchip')[i].click(); }, fi);
      await new Promise((r) => setTimeout(r, 120));
      /* fill it, so the measurement sees the loaded state too */
      await page.evaluate(() => {
        const c = document.querySelectorAll('.tnf-cell');
        c[Math.floor(c.length * 0.7)].click();
      });
      await new Promise((r) => setTimeout(r, 120));

      const m = await page.evaluate(() => {
        const q = (s) => document.querySelector(s), qa = (s) => Array.from(document.querySelectorAll(s));
        const card = q('.lcs-app').getBoundingClientRect();
        const cells = qa('.tnf-cell');
        const cr = cells.map((e) => e.getBoundingClientRect());
        /* controls and canvas cells are DIFFERENT floors and are
           measured separately — never an or-shaped assertion */
        const ctrls = qa('.tnf-chip, .tnf-tray').map((e) => e.getBoundingClientRect());
        const texts = qa('.tnf-hint, .tnf-chip, .tnf-num').filter((e) => (e.textContent || '').trim())
          .map((e) => parseFloat(getComputedStyle(e).fontSize));
        /* ⚠ CONTAINMENT IS MEASURED AGAINST THE CARD — except for what
           lives inside the frame's own scroller, which is REACHABLE by
           scrolling and is measured against that scroller instead. The
           scroller itself is still measured against the card, so a
           runaway box cannot hide inside it. This is the same rule
           `audit-tool-wide-viewport.js:303-333` uses for a control in a
           scrollable ancestor. */
        const boxEl = q('.tnf-fieldscroll');
        const box = boxEl.getBoundingClientRect();
        let escapes = 0, boxEscapes = 0;
        qa('.tnf-wrap *').forEach((e) => {
          const r = e.getBoundingClientRect();
          if (!r.width) return;
          const inScroller = boxEl.contains(e) && e !== boxEl;
          if (inScroller) return;                       /* reachable by scrolling */
          if (r.right > card.right + 2 || r.left < card.left - 2) escapes++;
        });
        if (box.right > card.right + 2 || box.left < card.left - 2) boxEscapes++;
        /* does the frame actually need the scroller at this size? */
        const scrolls = boxEl.scrollWidth - boxEl.clientWidth > 2;
        /* ⭐ DOES THE FRAME WRAP? Every cell of one pane row must share
           a top edge; if the flex/grid has wrapped, they do not. */
        const pane = q('.tnf-pane');
        const paneCells = pane ? Array.from(pane.querySelectorAll('.tnf-cell')) : [];
        const tops = {};
        paneCells.forEach((e) => { const t = Math.round(e.getBoundingClientRect().top); tops[t] = (tops[t] || 0) + 1; });
        const rowsSeen = Object.keys(tops).length;
        return {
          card: Math.round(card.width),
          nCells: cells.length,
          cellMin: Math.round(Math.min(...cr.map((r) => r.width))),
          ctrlMin: ctrls.length ? Math.round(Math.min(...ctrls.map((r) => Math.min(r.width, r.height)))) : 999,
          textMin: texts.length ? Math.min(...texts) : 999,
          trayDisc: (() => { const d = q('.tnf-traydisc'); return d ? Math.round(d.getBoundingClientRect().width) : 0; })(),
          escapes, boxEscapes, scrolls, rowsSeen,
          bodyScroll: document.documentElement.scrollWidth - document.documentElement.clientWidth
        };
      });

      const tag = `${w}/${FIELDS[fi]}`;
      /* the drawn shape's row count, from the design */
      const expectRows = { five: 1, ten: 2, tenrow: 1, twentyfield: 2, twentypair: 2 }[FIELDS[fi]];
      is(m.rowsSeen === expectRows, `${tag}: ⭐ the frame does not wrap — ${m.rowsSeen} row(s), expected ${expectRows}`);
      is(m.escapes === 0, `${tag}: nothing outside the scroller escapes the CARD (${m.escapes} nodes)`);
      is(m.boxEscapes === 0, `${tag}: and the scroller itself is inside the card (${m.boxEscapes})`);
      is(m.bodyScroll <= 0, `${tag}: the page does not scroll sideways (${m.bodyScroll}px)`);
      /* ⭐ THE DEFAULT FIELDS MUST NEVER NEED THE SCROLLER. Only a
         ten-WIDE field on a phone may, and only because the alternative
         is a sub-floor cell or a wrapped frame. If `five` or `ten` ever
         starts scrolling, the layout has regressed. */
      if (FIELDS[fi] === 'five' || FIELDS[fi] === 'ten') {
        is(m.scrolls === false, `${tag}: ⭐ the default field never needs to scroll`);
      }
      is(m.cellMin >= 34, `${tag}: canvas cells >= 34px (got ${m.cellMin})`);
      /* ⭐ THE TRAY SCALES WITH THE FRAME. The unit was defined on the
         frame and custom properties inherit downwards only, so the
         tray — a SIBLING — silently used the 44px fallback and drew at
         a third of its size on a big screen. Every floor still passed;
         only reading the render found it. This is the assertion that
         would have caught it, and it is a RATIO so it cannot be
         satisfied by a coincidence at one viewport. */
      if (m.trayDisc > 0) {
        const ratio = m.trayDisc / m.cellMin;
        is(ratio > 0.45 && ratio < 0.85,
          `${tag}: ⭐ the tray counters scale with the cell (disc ${m.trayDisc} / cell ${m.cellMin} = ${ratio.toFixed(2)})`);
      }
      is(m.ctrlMin >= 44, `${tag}: controls >= 44px (got ${m.ctrlMin})`);
      is(m.textMin >= 14, `${tag}: text >= 14px (got ${m.textMin})`);

      if (SHOT && (w === 360 || w === 768 || w === 1024)) {
        await page.screenshot({ path: path.join(SHOTDIR, `${w}-${FIELDS[fi]}.png`) });
      }
      await page.close();
    }
  }

  await browser.close();
  srv.close();

  console.log(`\nlocal-test-ten-frame-tool: ${PASS} passed, ${FAIL} failed`);
  if (FAIL) { console.error('\nFAILURES:'); fails.forEach((f) => console.error('  ' + f)); process.exit(1); }
  console.log('PASS');
})();
