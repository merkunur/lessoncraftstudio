#!/usr/bin/env node
/* =====================================================================
   local-test-stamp-sheet.js — ACTIVITY #170, The Stamp Sheet ("Make and
   Count Squares", 2.G.A.2), in a real browser with real taps, drags and
   the keyboard, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024, then 360 for the phone rail):
     · make by numbers: Check with no holes → a reminder; real taps on the
       top and left rails perforate (a notch every half square); a real
       drag along the rail perforates where it is let go; a wrong grid →
       miss 1 (misprints on the sheet, the press + pieces hint); a tap on
       a line of holes heals it; the true grid → the count step (keypad);
       a tap on a stamp makes it glow; rows + cols typed → miss 1 (stamps
       light), a second wrong count → running totals; the total → success,
       the bubble, Next 0.5 s;
     · the card setting: adding (4 + 4 + 4) and multiplying (the locale's
       sign); the plate board: tap the plate → it lies on the first
       square; the keyboard (rail slider + Enter); on a phone the first tap
       parks the wheel at the nearest notch and the second runs it;
     · pick: a wrong sheet → miss 1 with the album page, miss 2 numbers
       the page; the match → success.
   Then each state reached ONCE per locale and resized through 320…1366,
   with Check above the fold at rest.
   Usage: node scripts/local-test-stamp-sheet.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/stamp-sheet-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'StampSheetActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'stamp-sheet-activity.html', id: 'fractions.make-and-count-squares.2-g-a-2', global: G, ready: '.sts-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const V = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g]._view)), G);
  const go = async (page, board, k, card) => { await page.evaluate((g, board, k, card) => { const a = window[g]; a.api.settings.board = board; a.api.settings.card = card || 'rowsOf'; a._pool = null; a._ensurePool(); a._start(k, 0); a._render2(); }, G, board, k, card); await H.wait(60); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const say = (page, key, args) => page.evaluate((g, key, args) => window[g]._t(key, args || window[g]._args()), G, key, args);
  const okLine = (page) => page.evaluate((g) => window[g]._okLine(), G);
  const okMs = (page, ms) => page.evaluate((g, ms) => { window[g].OK_MS = ms; }, G, ms);
  /* the screen point of a notch on a rail (axis col = top rail, row = left rail) */
  const notchXY = (page, axis, h) => page.evaluate((g, axis, h) => { const a = window[g], gg = a._g, svg = document.querySelector('.sts-sheetsvg'); svg.scrollIntoView({ block: 'center' }); const b = svg.getBoundingClientRect(); return axis === 'col' ? { x: b.left + gg.R + h * gg.u / 2, y: b.top + gg.R / 2 } : { x: b.left + gg.R / 2, y: b.top + gg.R + h * gg.u / 2 }; }, G, axis, h);
  const tapNotch = async (page, axis, h) => { const p = await notchXY(page, axis, h); await page.mouse.click(p.x, p.y); await H.wait(40); };
  const type = async (page, n) => { for (const d of String(n)) await L.click(page, 'key-' + d, 'key ' + d); };
  const erase = async (page) => { while ((await S(page)).typed) await L.click(page, 'key-back', 'erase'); };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    /* ---- make by numbers: 3 rows of 4 ---- */
    const k = C.rounds('numbers').findIndex((r) => r.rows === 3 && r.cols === 4);
    await go(page, 'numbers', k);
    /* at rest every notch on both rails is drawn the same: the rails never tell where the squares are */
    is(await page.evaluate(() => { const ls = Array.from(document.querySelectorAll('.sts-sheetsvg line')).filter((l) => !l.classList.contains('sts-perf') && !l.closest('.sts-wheel')); return ls.length === 7 + 5 && new Set(ls.map((l) => l.getAttribute('stroke') + '/' + l.getAttribute('stroke-width'))).size === 1; }), tag + ' at rest the 12 notches all look the same');
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintStart')) && (await S(page)).misses === 0, tag + ' no holes → hintStart, no miss');
    await tapNotch(page, 'col', 2); let s = await S(page);
    is(s.colCuts.join() === '2', tag + ' a real tap on the top rail perforates at that notch');
    await tapNotch(page, 'row', 2); s = await S(page);
    is(s.rowCuts.join() === '2', tag + ' a real tap on the left rail perforates across');
    /* a real drag along the top rail: from notch 1 to notch 5, let go there → a line at 5 (a deliberate wrong line) */
    { const a = await notchXY(page, 'col', 1), b = await notchXY(page, 'col', 5); await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 12; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 12, a.y); await page.mouse.up(); await H.wait(60); }
    s = await S(page); is(s.colCuts.slice().sort().join() === '2,5', tag + ' a real drag along the rail perforates where it is let go (' + s.colCuts + ')');
    await tapNotch(page, 'row', 4);
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && !s.help, tag + ' a wrong grid → miss 1');
    is(await page.evaluate(() => document.querySelectorAll('.sts-sliced, .sts-bordered').length) > 0 && await page.evaluate(() => document.querySelectorAll('.sts-stamp').length) > 0, tag + ' the press printed: true stamps and misprints on the sheet');
    is(sp(await note(page)) === sp((await say(page, 'hintPress')) + ' ' + (await say(page, 'hintPieces'))), tag + ' miss 1 → the press hint + the pieces hint');
    await L.click(page, 'perf-col-5', 'heal'); s = await S(page);
    is(s.colCuts.join() === '2' && s.verdict === null && await page.evaluate(() => !document.querySelector('.sts-sliced, .sts-bordered')), tag + ' a tap on a line of holes heals it; the misprints go');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.help && await page.evaluate(() => document.querySelectorAll('.sts-lattice').length) === 12, tag + ' miss 2 → the dotted squares (12)');
    is(sp(await note(page)) === sp(await say(page, 'hintGhost')), tag + ' miss 2 → hintGhost');
    /* the hint names the dotted squares, so they must be painted ABOVE the misprints' leftover paper (found by reading the render) */
    is(await page.evaluate(() => { const kids = Array.from(document.querySelector('.sts-sheetsvg').querySelectorAll('*')), lat = kids.findIndex((e) => e.classList.contains('sts-lattice')), mis = kids.map((e, i) => (e.classList.contains('sts-bordered') || e.closest('.sts-misprint') || e.classList.contains('sts-sliced') ? i : -1)).filter((i) => i >= 0); return lat > 0 && mis.length > 0 && mis.every((i) => i < lat); }), tag + ' miss 2: the dotted squares are painted above the misprints');
    await tapNotch(page, 'col', 4);
    is(await page.evaluate(() => document.querySelectorAll('.sts-lattice').length) === 0, tag + ' a new line of holes takes the dotted squares away until the next Check');
    await tapNotch(page, 'col', 6);
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.step === 'count' && sp(await note(page)) === sp(await say(page, 'noteGrid')) && sp(await L.prompt(page)) === sp(await say(page, 'qCount')), tag + ' the true grid → every stamp prints true, "how many?"');
    is(await page.evaluate(() => document.querySelectorAll('.sts-key').length) === 11, tag + ' the keypad appears');
    await L.click(page, 'stamp-0-0', 'glow');
    is(await page.evaluate(() => document.querySelector('[data-k="stamp-0-0"]').getAttribute('aria-pressed') === 'true' && !!document.querySelector('.sts-stamp.is-glow')), tag + ' a tap on a stamp makes it glow');
    await type(page, 7); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.cmisses === 1 && sp(await note(page)) === sp(await say(page, 'hintRow')) && await page.evaluate(() => document.querySelectorAll('.sts-stamp.is-lit').length) === 12, tag + ' rows + cols (7) → miss 1, the stamps light one by one');
    await erase(page); await type(page, 11); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.chelp && await page.evaluate(() => Array.from(document.querySelectorAll('.sts-run')).map((t) => t.textContent).join()) === '4,8,12', tag + ' a second wrong count → running totals 4, 8, 12');
    await erase(page); await type(page, 12); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' 12 → success: ' + sp(await L.bubble(page)));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await okMs(page, 600000);
    /* ---- the card setting ---- */
    await go(page, 'numbers', k, 'add');
    is(await page.evaluate(() => document.querySelector('.sts-cbig').textContent) === '4 + 4 + 4', tag + ' card adding: 4 + 4 + 4');
    await go(page, 'numbers', k, 'mul');
    const sign = C.mulSign(loc);
    is(await page.evaluate(() => document.querySelector('.sts-cbig').textContent) === '3 ' + sign + ' 4' && sp(await L.prompt(page)).indexOf('3 ' + sign + ' 4') >= 0, tag + ' card multiplying: 3 ' + sign + ' 4 on the card and in the task');
    /* ---- the plate board: the plate laid on the first square ---- */
    await go(page, 'plate', 1);
    is(await page.evaluate(() => !document.querySelector('.sts-csmall') && !!document.querySelector('.sts-plate-pic')), tag + ' plate board: the card shows only the plate');
    await L.click(page, 'plate', 'plate');
    is(await page.evaluate(() => !!document.querySelector('.sts-plateghost')), tag + ' a tap on the plate lays it on the first square');
    /* ---- the keyboard ---- */
    await go(page, 'numbers', k);
    await page.focus('[data-k="rail-col"]'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter');
    is((await S(page)).colCuts.join() === '2', tag + ' keyboard: ArrowRight on the top rail, Enter → a line at notch 2');
    await page.focus('[data-k="rail-row"]'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
    is((await S(page)).rowCuts.join() === '2', tag + ' keyboard: ArrowDown on the left rail, Enter → a line at notch 2');
    /* ---- pick ---- */
    await go(page, 'pick', 3); s = await S(page);
    const fits = (x) => x.rows === s.rows && x.cols === s.cols, wi = s.sheets.findIndex((x) => !fits(x)), ri = s.sheets.findIndex(fits);
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintPickStart')), tag + ' pick: nothing chosen → hintPickStart');
    await L.click(page, 'sheet-' + wi, 'pick'); await L.click(page, 'check', 'check');
    is((await S(page)).misses === 1 && await page.evaluate(() => !!document.querySelector('[data-qa="page"]')) && sp(await note(page)) === sp(await say(page, 'hintPickRows')), tag + ' a wrong sheet → miss 1, the album page shows its rows');
    await L.click(page, 'check', 'check');
    is((await S(page)).help && await page.evaluate(() => document.querySelectorAll('.sts-pnum').length) > 0, tag + ' miss 2 → the page is numbered');
    await L.click(page, 'sheet-' + ri, 'pick'); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' the match → success: ' + sp(await L.bubble(page)));
    await okMs(page, 600000);
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();
    /* ---- a phone: the first tap parks the wheel, the second runs it ---- */
    { const { page: pp, errs: e3 } = await L.open(360, loc); await go(pp, 'numbers', C.rounds('numbers').findIndex((r) => r.rows === 4 && r.cols === 5));
      const half = await pp.evaluate((g) => window[g]._g.u / 2, G);
      await tapNotch(pp, 'col', 3); let v = await V(pp), t = await S(pp);
      is(half < 44 && t.colCuts.length === 0 && v.ghost && v.ghost.h === 3, loc + ' @360: half notches ' + half + ' px → the first tap parks the wheel at notch 3, no line yet');
      await tapNotch(pp, 'col', 3); t = await S(pp);
      is(t.colCuts.join() === '3', loc + ' @360: the second tap there runs the wheel → a line at notch 3');
      is(e3.length === 0, loc + ' @360: no console errors');
      await pp.close(); }

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.StampSheetCore), G, src);
    const GRID = 'for (var h = 2; h < 2 * a.st.cols; h += 2) C.toggleCut(a.st, "col", h); for (var h2 = 2; h2 < 2 * a.st.rows; h2 += 2) C.toggleCut(a.st, "row", h2); a._check();';
    const sweep = (name, reach, mode) => L.sweep(loc, name, reach, mode === 'rest' ? { rest: true } : mode === 'miss' ? { miss: true } : {}, WIDTHS);
    await sweep('numbers rest 4x5', async (pg) => { await go(pg, 'numbers', 7); }, 'rest');
    await sweep('numbers miss 4x5', async (pg) => { await go(pg, 'numbers', 7); await ev(pg, 'C.toggleCut(a.st, "col", 3); C.toggleCut(a.st, "col", 6); C.toggleCut(a.st, "row", 2); a._check();'); }, 'rest');
    await sweep('numbers help 4x5', async (pg) => { await go(pg, 'numbers', 7); await ev(pg, 'C.toggleCut(a.st, "col", 3); a._check(); a._check();'); }, 'rest');
    await sweep('count 4x5', async (pg) => { await go(pg, 'numbers', 7); await ev(pg, GRID); }, 'rest');
    await sweep('count help 4x5', async (pg) => { await go(pg, 'numbers', 7); await ev(pg, GRID + 'a._type("7"); a._check(); a._check();'); }, 'rest');
    await sweep('add card 2x5', async (pg) => { await go(pg, 'numbers', 3, 'add'); }, 'rest');
    await sweep('plate rest 5x4', async (pg) => { await go(pg, 'plate', 7); }, 'rest');
    await sweep('pick rest K4', async (pg) => { await go(pg, 'pick', 3); }, 'rest');
    await sweep('pick help K4', async (pg) => { await go(pg, 'pick', 3); await ev(pg, 'var w = a.st.sheets.findIndex(function (x) { return !(x.rows === a.st.rows && x.cols === a.st.cols); }); a._choose(w); a._check(); a._check();'); }, 'rest');
  }
  await L.close();
  process.exit(L.C.report('local-test-stamp-sheet'));
})().catch((e) => { console.error(e); process.exit(1); });
