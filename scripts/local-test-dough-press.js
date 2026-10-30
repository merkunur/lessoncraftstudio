#!/usr/bin/env node
/* =====================================================================
   local-test-dough-press.js — ACTIVITY #171, The Dough Press ("Same Size,
   Different Shape", 2.G.A.3), in a real browser with real taps and the
   keyboard, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · MATCH: Check with nothing chosen → a reminder; a real tap on a wrong
       tile → miss 1 (the press runs; the tray shows rims / gaps / extra /
       missing; the patties hint); miss 2 → every tile shows its patties;
       a new choice takes them away; the right tile → every patty fits,
       the success line, Next 0.5 s; free play after success presses any
       tile; the keyboard (arrows + Enter);
     · the real press once (not fast-forwarded): the piece squashes in the
       tray, then the tray shows the result;
     · FAIR: no ribbon → a reminder; an unfair ribbon slips off after the
       press, plates under the pressed tiles; every fair one → success;
     · WHICH in words and in numbers: the card; a wrong tile → the lumps and
       the card hint; W9 (two triangle quarters = one half) → the "same
       amount" success line.
   Then each state reached ONCE per locale and resized through 320…1366,
   with Check above the fold at rest.
   Usage: node scripts/local-test-dough-press.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/dough-press-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const G = 'DoughPressActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'dough-press-activity.html', id: 'choice-board.fraction-noncongruent.2-g-a-3', global: G, ready: '.dp-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, board, k, read) => { await page.evaluate((g, board, k, read) => { const a = window[g]; a.api.settings.board = board; a.api.settings.read = read || 'words'; a._pool = null; a._ensurePool(); a._start(k, 0); a._render2(); }, G, board, k, read); await H.wait(60); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const say = (page, key, args) => page.evaluate((g, key, args) => window[g]._t(key, args || {}), G, key, args);
  const okLine = (page) => page.evaluate((g) => window[g]._okLine(), G);
  const okMs = (page, ms) => page.evaluate((g, ms) => { window[g].OK_MS = ms; }, G, ms);
  const rightOf = (st) => { const s2 = C.newState(st.board, st.k, 0); s2.tiles = st.tiles; return st.tiles.map((t, i) => C.tileRight(s2, i)); };
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    /* ---- MATCH, round 13: fourths, the mixed fourths is the ✓ ---- */
    await go(page, 'match', 12); let s = await S(page); let ok = rightOf(s);
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintPick')) && (await S(page)).misses === 0, tag + ' match: nothing chosen → hintPick, no miss');
    is(await count(page, '.dp-traysvg circle') === 4, tag + ' match: the model\'s 4 patties wait on the tray');
    const wrongU = s.tiles.findIndex((t) => t.fig === 'sq-fourths-uneq');
    await L.click(page, 'tile-' + wrongU, 'tap'); s = await S(page);
    is(s.sel === wrongU && await page.evaluate((i) => document.querySelector('[data-k="tile-' + i + '"]').getAttribute('aria-pressed') === 'true', wrongU), tag + ' match: a real tap selects the tile');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && !s.help, tag + ' match: the uneven fourths → miss 1');
    is(await count(page, '.dp-over') >= 1 && await count(page, '.dp-gap') >= 1, tag + ' match: the tray shows a coral rim and a pale gap');
    is(sp(await note(page)) === sp(await say(page, 'hintPatties')), tag + ' match: miss 1 → hintPatties');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.help && await count(page, '.dp-plate') === 4 && sp(await note(page)) === sp(await say(page, 'hintCompare')), tag + ' match: miss 2 → every tile shows its patties, hintCompare');
    const right = ok.indexOf(true);
    await L.click(page, 'tile-' + right, 'tap');
    is(await count(page, '.dp-plate') === 0 && (await S(page)).verdict === null, tag + ' match: a new choice takes the showing away');
    await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && await count(page, '.dp-fit') === 4, tag + ' match: the mixed fourths → four patties fit exactly');
    is(sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' match: success: ' + sp(await L.bubble(page)));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await okMs(page, 600000);
    await L.click(page, 'tile-' + wrongU, 'free play');
    is(await count(page, '.dp-over') >= 1, tag + ' free play after success: any tile can be pressed');
    /* ---- the keyboard ---- */
    await go(page, 'match', 0);
    await page.focus('[data-k="tile-0"]'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter');
    is((await S(page)).sel === 1, tag + ' keyboard: ArrowRight + Enter selects the next tile');
    /* ---- FAIR ---- */
    await go(page, 'fair', 0); s = await S(page); ok = rightOf(s);
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(await say(page, 'hintRibbon')), tag + ' fair: no ribbon → hintRibbon');
    const u = ok.indexOf(false), f0 = ok.indexOf(true);
    await L.click(page, 'tile-' + u, 'ribbon'); await L.click(page, 'tile-' + f0, 'ribbon');
    is(await count(page, '.dp-tile.is-ribbon') === 2, tag + ' fair: a tap ties a ribbon');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && s.ribbons.indexOf(u) < 0 && s.ribbons.indexOf(f0) >= 0 && await count(page, '.dp-plate') === 2, tag + ' fair: the unfair ribbon slips off, both pressed onto plates');
    for (let i = 0; i < ok.length; i++) if (ok[i] && (await S(page)).ribbons.indexOf(i) < 0) await L.click(page, 'tile-' + i, 'ribbon');
    await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await okLine(page))) >= 0, tag + ' fair: every fair shape ribboned → success: ' + sp(await L.bubble(page)));
    await okMs(page, 600000);
    /* ---- WHICH ---- */
    await go(page, 'which', 1); s = await S(page); ok = rightOf(s);
    is(await page.evaluate(() => !!document.querySelector('.dp-word')) && await count(page, '.dp-outlines circle') === 3, tag + ' which (words): the card shows the words and 3 dashed outlines');
    await L.click(page, 'tile-' + ok.indexOf(false), 'tap'); await L.click(page, 'check', 'check');
    is((await S(page)).misses === 1 && await count(page, '.dp-lump circle') === 4 && sp(await note(page)) === sp(await say(page, 'hintCard')), tag + ' which: a wrong tile → the lumps in their rings, hintCard');
    await go(page, 'which', 8, 'numbers'); s = await S(page); ok = rightOf(s);
    is(await page.evaluate(() => !!document.querySelector('.dp-num')), tag + ' which (numbers): the card shows a stacked fraction');
    await L.click(page, 'tile-' + ok.indexOf(true), 'tap'); await okMs(page, 500); await L.click(page, 'check', 'check'); await H.wait(900);
    const eq = await say(page, 'okWhichEq', { frac: '1/2', k: 2, n: 4, kc: 1, nc: 2 });
    is((await S(page)).done && sp(await L.bubble(page)) === sp(eq), tag + ' which W9: two triangle quarters = one half → «' + sp(await L.bubble(page)) + '»');
    await okMs(page, 600000);
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- a phone, miss 2: each tile's patty plate sits UNDER its shape, and the shape keeps its full drawn height (a
       flex column squeezes the svg box and clips the drawing's bottom edge — found by reading the render) ---- */
    { const { page: pp } = await L.open(320, loc); await go(pp, 'match', 12);
      await pp.evaluate((g) => { const a = window[g], C = window.DoughPressCore; a._tap(a.st.tiles.findIndex((t) => t.fig === 'sq-fourths-uneq')); a._check(); a._check(); }, G); await H.wait(80);
      const bad = await pp.evaluate(() => Array.from(document.querySelectorAll('.dp-tile.has-plate')).filter((b) => { const sv = b.querySelector('.dp-shape'), s = sv.getBoundingClientRect(), p = b.querySelector('.dp-plate').getBoundingClientRect(), t = b.getBoundingClientRect(); return s.height < +sv.getAttribute('height') - 0.5 || s.bottom > p.top + 0.5 || p.bottom > t.bottom + 0.5 || s.top < t.top - 0.5; }).map((b) => b.getAttribute('data-k')));
      is(bad.length === 0 && await count(pp, '.dp-tile.has-plate') === 4, loc + ' @320 miss 2: every plate sits under its shape inside the tile (' + bad + ')');
      await pp.close(); }

    /* ---- the real press once (not fast-forwarded) ---- */
    if (loc === LOCS[0]) {
      const { page: p2 } = await L.open(1024, loc); await go(p2, 'match', 1);
      await p2.evaluate((g) => { window[g].FAST = false; }, G); const s2 = await S(p2), r2 = rightOf(s2).indexOf(true);
      await L.click(p2, 'tile-' + r2, 'tap'); await L.click(p2, 'check', 'check'); await H.wait(120);
      is(await count(p2, '.dp-squash') === 1, 'the real press: a piece squashes in the tray');
      await p2.waitForFunction((g) => !window[g]._view.anim, { timeout: 8000 }, G);
      is(await count(p2, '.dp-squash') === 0 && await count(p2, '.dp-fit') === 2, 'the real press: then the patties fit');
      await p2.close();
    }

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.DoughPressCore), G, src);
    const WRONG = 'var w = a.st.tiles.findIndex(function (t, i) { return !C.tileRight(a.st, i); }); a._tap(w); a._check();';
    const sweep = (name, reach, mode) => L.sweep(loc, name, reach, mode === 'rest' ? { rest: true } : {}, WIDTHS);
    await sweep('match rest', async (pg) => { await go(pg, 'match', 14); }, 'rest');
    await sweep('match miss 1', async (pg) => { await go(pg, 'match', 14); await ev(pg, WRONG); }, 'rest');
    await sweep('match miss 2', async (pg) => { await go(pg, 'match', 14); await ev(pg, WRONG + 'a._check();'); }, 'rest');
    await sweep('fair rest', async (pg) => { await go(pg, 'fair', 3); }, 'rest');
    await sweep('fair miss 2', async (pg) => { await go(pg, 'fair', 3); await ev(pg, 'var w = a.st.tiles.findIndex(function (t, i) { return !C.tileRight(a.st, i); }), f = a.st.tiles.findIndex(function (t, i) { return C.tileRight(a.st, i); }); a._tap(w); a._tap(f); a._check(); a._check();'); }, 'rest');
    await sweep('which rest', async (pg) => { await go(pg, 'which', 6); }, 'rest');
    await sweep('which miss 2 numbers', async (pg) => { await go(pg, 'which', 6, 'numbers'); await ev(pg, WRONG + 'a._check();'); }, 'rest');
  }
  await L.close();
  process.exit(L.C.report('local-test-dough-press'));
})().catch((e) => { console.error(e); process.exit(1); });
