#!/usr/bin/env node
/* =====================================================================
   local-test-tide-plot.js — ACTIVITY #167, The Tide You Push ("Shelly's
   Tide-Line", 2.MD.D.9), in a real browser with real drags, taps and the
   keyboard, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · longer than 4: untouched → a reminder; a real drag of the left wave
       over the 5s too → the right number is still a tide miss; Check again
       → hintAgain; the wave dragged back to the gap after the 4 → a wrong
       pebble → "count the dry shells" with the dry X's numbered; the right
       pebble → the success line, Next 0.5 s;
     · the most common length: the buoy dragged up two rows, the length
       tapped on the sand → success; the range: the left wave to the first
       shell → six footprints dry → 6; how many more: shores and buoy by the
       keyboard → success;
     · measure: a shell dropped where its unzeroed edge ends (a real drag
       from the board to the beach) → "slide it to 0 first", it flies back
       to where it was measured; slid to the stop by a real drag, dropped on
       its length → success; the shell's drawn ink width = length × px/cm;
     · halves: Home slides the shell to the stop, the length tapped → success
       (with «4½ cm = 4,5 cm» where the locale writes a decimal comma);
     · footprints off; X's under water stay visible.
   Then each state reached ONCE per locale and resized through 320…1366,
   with Check above the fold at rest.
   Usage: node scripts/local-test-tide-plot.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/tide-plot-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('tide-plot-activity.js', 'TidePlotActivity', { TidePlotCore: C });
const G = 'TidePlotActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'tide-plot-activity.html', id: 'line-plot.read.2-md-d-9', global: G, ready: '.tp-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, level, k, feet) => { await page.evaluate((g, level, k, feet) => { const a = window[g]; a.api.settings.level = level; a.api.settings.feet = feet || 'on'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, level, k, feet); await H.wait(60); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const len = (page, hu) => page.evaluate((g, hu) => window[g]._len(hu), G, hu);
  const line = (page) => page.evaluate((g) => { const a = window[g], C = window.TidePlotCore; let m = a._t(C.okKey(a.st), a._args()); return m; }, G);
  /* a real pointer drag of a handle to a beach x (a gap between two columns) */
  const gapX = (page, gap) => page.evaluate((g, gap) => { const a = window[g], r = a._beachEl.getBoundingClientRect(); return r.left + a._g.x0 + gap * a._g.p; }, G, gap);
  const dragTo = async (page, sel, x, y) => { const b = await page.$(sel); await page.evaluate((e) => e.scrollIntoView({ block: 'center' }), b); const bb = await b.boundingBox(); const x0 = bb.x + bb.width / 2, y0 = bb.y + bb.height / 2; await page.mouse.move(x0, y0); await page.mouse.down(); for (let i = 1; i <= 10; i++) await page.mouse.move(x0 + ((x == null ? x0 : x) - x0) * i / 10, y0 + ((y == null ? y0 : y) - y0) * i / 10); await page.mouse.up(); await H.wait(60); };
  /* a drop drag the way a child carries a shell: down off the board first, then across to the column */
  const dragL = async (page, sel, x, y) => { const b = await page.$(sel); const bb = await b.boundingBox(); const x0 = bb.x + bb.width / 2, y0 = bb.y + bb.height / 2; await page.mouse.move(x0, y0); await page.mouse.down(); for (let i = 1; i <= 8; i++) await page.mouse.move(x0 + (i % 3 === 0 ? 1 : 0), y0 + (y - y0) * i / 8); for (let i = 1; i <= 8; i++) await page.mouse.move(x0 + (x - x0) * i / 8, y); await page.mouse.up(); await H.wait(60); };
  /* no wave handle may sit on a dry X, its number, or the other handle */
  const noCover = (page) => page.evaluate(() => { const box = (e) => e.getBoundingClientRect(), hit = (a, b) => a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1; const hs = [...document.querySelectorAll('.tp-handle')].map(box); if (hs.length === 2 && hit(hs[0], hs[1])) return 'the two handles overlap'; const dry = [...document.querySelectorAll('.tp-x:not(.is-wet), .tp-xnum')].map(box); for (const a of hs) for (const d of dry) if (hit(a, d)) return 'a handle covers a dry X'; return ''; });
  const shore = async (page, side, gap) => { await page.evaluate(() => document.querySelector('.tp-beach').scrollIntoView({ block: 'center' })); const x = await gapX(page, gap); await dragTo(page, '[data-k="shore-' + side + '"]', x, null); };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- R3: longer than 4 ---- */
    await go(page, 'read', 2); let s = await S(page);
    await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintStart')) && (await S(page)).misses === 0, tag + ' untouched → hintStart, no miss');
    await shore(page, 'L', 4); s = await S(page); is(await noCover(page) === '', tag + ' handles clear of the dry marks ' + await noCover(page));
    is(s.tide.L === 4, tag + ' a real drag of the left wave to the gap after the 4 (L=' + s.tide.L + ')');
    await L.click(page, 'pebble-4', 'pebble 4'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && s.verdict && s.verdict.why === 'answer' && sp(await note(page)) === sp(T(loc, 'hintCountDry')), tag + ' the right tide, a wrong pebble → hintCountDry');
    is(await page.evaluate(() => [...document.querySelectorAll('.tp-xnum')].map((e) => e.textContent).join()) === '1,2,3,4,5', tag + ' the dry X\'s number themselves 1–5');
    await L.click(page, 'check', 'check again');
    is((await S(page)).misses === 1 && sp(await note(page)) === sp(T(loc, 'hintAgain')), tag + ' Check again unchanged → hintAgain, no second miss');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'pebble-5', 'pebble 5'); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(await line(page))) >= 0, tag + ' the right pebble → success: ' + sp(await L.bubble(page)));
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* the same round fresh: the 5s under water — even the right number is a tide miss */
    await go(page, 'read', 2);
    await shore(page, 'L', 5); s = await S(page);
    is(s.tide.L === 5, tag + ' a real drag of the left wave over the 5s (L=' + s.tide.L + ')');
    await L.click(page, 'pebble-5', 'pebble 5'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && s.verdict.why === 'tide' && sp(await note(page)) === sp(T(loc, 'tideLonger', { n: '4' })), tag + ' the 5s under water: even the right number is a tide miss → tideLonger');
    is(await page.evaluate(() => document.querySelectorAll('.tp-x.is-wet').length) > 0 && await page.evaluate(() => [...document.querySelectorAll('.tp-x.is-wet')].every((e) => +getComputedStyle(e).opacity >= 0.5)), tag + ' X\'s under water stay visible');
    await L.click(page, 'pebble-4', 'pebble 4'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 2 && s.help && s.tide.L === 4 && await page.evaluate(() => !!document.querySelector('.tp-pebble.is-ring[data-k="pebble-5"]')), tag + ' a second miss → help: the sea set right, the answer ringed');
    /* ---- R5: the most common length — the buoy, the sand ---- */
    await go(page, 'read', 4);
    const yRow = await page.evaluate((g) => { const a = window[g], r = a._beachEl.getBoundingClientRect(); return r.bottom - a._g.sand - 2 * a._g.rowH; }, G);
    await page.evaluate(() => document.querySelector('.tp-beach').scrollIntoView({ block: 'center' }));
    const yRow2 = await page.evaluate((g) => { const a = window[g], r = a._beachEl.getBoundingClientRect(); return r.bottom - a._g.sand - 2 * a._g.rowH; }, G);
    await dragTo(page, '[data-k="buoy"]', null, yRow2); s = await S(page);
    is(s.tide.S === 2, tag + ' a real drag of the buoy raises the sea 2 rows (S=' + s.tide.S + ')');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    is(await page.evaluate(() => !document.querySelector('.tp-col[role], .tp-col[tabindex]') && [...document.querySelectorAll('.tp-pebble.is-len')].every((b) => /cm/.test(b.textContent))), tag + ' the mode is answered on length pebbles that carry «cm», never on a count'); await L.click(page, 'len-12', 'the 6 cm pebble'); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(T(loc, 'okMode', { n: '6' }))) >= 0, tag + ' the 6 tapped on the sand → okMode');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- R7: the range — footprints ---- */
    await go(page, 'read', 6); await shore(page, 'L', 1);
    is(await page.evaluate(() => document.querySelectorAll('.tp-feet').length) === 6, tag + ' range: shores touching the 2 and the 8 → six footprints on dry sand');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.click(page, 'pebble-6', 'pebble 6'); await L.click(page, 'check', 'check'); await H.wait(900);
    is((await S(page)).done && sp(await L.bubble(page)).indexOf(sp(T(loc, 'okRange', { k: 6 }))) >= 0, tag + ' range → okRange');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- R9: how many more — the keyboard ---- */
    await go(page, 'read', 8);
    await page.focus('[data-k="shore-L"]'); for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
    await page.focus('[data-k="shore-R"]'); for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowLeft');
    await page.focus('[data-k="buoy"]'); await page.keyboard.press('ArrowUp');
    s = await S(page);
    is(s.tide.L === 4 && s.tide.R === 3 && s.tide.S === 1, tag + ' the keyboard moves both shores and the buoy');
    await L.click(page, 'pebble-2', 'pebble 2'); await L.click(page, 'check', 'check');
    is((await S(page)).done, tag + ' how many more (5 vs 6) → 2, success');
    /* ---- measure M1: an unzeroed drop, then from the stop ---- */
    await go(page, 'measure', 0); s = await S(page);
    const pxCheck = await page.evaluate((g) => { const a = window[g], b = document.querySelector('[data-k="shell"]'); const w = b.getBoundingClientRect().width * a.INK.frac; return { ink: w, want: a.st.shells[0].len / 2 * a._g.ppc }; }, G);
    is(Math.abs(pxCheck.ink - pxCheck.want) <= 2, tag + ' the shell\'s drawn ink width = its length × px/cm (' + pxCheck.ink.toFixed(1) + ' vs ' + pxCheck.want + ')');
    const colCentre = async (v) => page.evaluate((v) => { const e = document.querySelector('[data-col="' + v + '"]'); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.bottom - 60 }; }, v);
    await page.evaluate(() => document.querySelector('.tp-board').scrollIntoView({ block: 'start' }));
    let edge = s.shells[0].off + s.shells[0].len, c0 = await colCentre(edge);
    await dragL(page, '[data-k="shell"]', c0.x, c0.y); s = await S(page);
    is(s.shells[0].col === edge, tag + ' a real drag from the board drops the shell on the beach (at its unzeroed edge ' + edge / 2 + ')');
    const sh2 = s.shells[1], c2 = await colCentre(sh2.off + sh2.len); await page.evaluate(() => document.querySelector('.tp-board').scrollIntoView({ block: 'start' })); const c2b = await colCentre(sh2.off + sh2.len); await dragL(page, '[data-k="shell"]', c2b.x, c2b.y - 30); is((await S(page)).shells[1].col === sh2.off + sh2.len, tag + ' a second shell dragged onto a column that already holds my X drops there'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintZero')) && s.shells[0].col === null && s.shells[0].pos === s.shells[0].off * 5 && s.shells[0].droppedAt === s.shells[0].off * 5, tag + ' dropped at the unzeroed edge → hintZero, the shell back where it was measured ' + (s.misses === 1 && s.shells[0].col === null ? '' : JSON.stringify(s.shells) + ' m' + s.misses + ' ' + await note(page)));
    await page.evaluate(() => document.querySelector('.tp-board').scrollIntoView({ block: 'start' }));
    const stop = await page.evaluate((g) => { const a = window[g], r = document.querySelector('.tp-board').getBoundingClientRect(), b = document.querySelector('[data-k="shell"]').getBoundingClientRect(); return { x: b.left + b.width / 2 - (a.st.shells[0].pos / 10) * a._g.ppc, y: b.top + b.height / 2 }; }, G);
    await dragTo(page, '[data-k="shell"]', stop.x - 2, stop.y); s = await S(page);
    is(s.shells[0].pos === 0, tag + ' a real drag slides the shell to the stop (snap)');
    await page.focus('[data-k="shell"]'); await page.keyboard.press('Enter'); s = await S(page);
    is(s.shells[0].col === s.shells[0].len, tag + ' Enter on a zeroed shell drops it where its edge reads (' + s.shells[0].col / 2 + ')');
    if (s.shells[1].col !== s.shells[1].len) { await page.evaluate((g) => { const a = window[g], C = window.TidePlotCore; const j = a.st.shells.findIndex((x) => x.col != null && x.col !== x.len); if (j >= 0) { C.undrop(a.st, j); a._paint(); } }, G); await page.focus('[data-k="shell"]'); await page.keyboard.press('Home'); await page.keyboard.press('Enter'); }
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.done, tag + ' both shells on their lengths → success');
    /* ---- a steep diagonal carry to the beach does not slide the shell ---- */
    await go(page, 'measure', 1); s = await S(page);
    { const p0 = s.shells[C.boardShell(s)].pos; await page.evaluate(() => document.querySelector('.tp-board').scrollIntoView({ block: 'start' })); const bb = await (await page.$('[data-k="shell"]')).boundingBox(), bot = await page.evaluate(() => document.querySelector('.tp-board').getBoundingClientRect().bottom); const x0 = bb.x + bb.width / 2, y0 = bb.y + bb.height / 2; await page.mouse.move(x0, y0); await page.mouse.down(); for (let i = 1; i <= 12; i++) await page.mouse.move(x0 + 50 * i / 12, y0 + (bot + 40 - y0) * i / 12); await page.mouse.up(); await H.wait(60); s = await S(page); const j = s.shells.findIndex((x) => x.droppedAt != null || x.col != null);
      is(s.shells[C.boardShell(s) == null ? 0 : C.boardShell(s)].pos === p0 || (j >= 0 && s.shells[j].droppedAt === p0), tag + ' a steep diagonal carry off the board leaves the shell where it was read (' + p0 + ' mm)'); }
    /* ---- halves H1 ---- */
    await go(page, 'halves', 0); s = await S(page);
    await page.focus('[data-k="shell"]'); await page.keyboard.press('Home'); s = await S(page);
    is(s.shells[0].pos === 0, tag + ' halves: Home slides the shell to the stop');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await page.focus('[data-k="shell"]'); await page.keyboard.press('Enter'); await L.click(page, 'check', 'check'); await H.wait(900);
    const b4 = sp(await L.bubble(page)), dec = await page.evaluate((g) => window[g]._dec(9), G);
    is((await S(page)).done && b4.indexOf(sp(T(loc, 'okMeasure1', { s1: '4½' }))) >= 0 && (dec ? b4.indexOf('4½ cm = 4,5 cm') >= 0 : true), tag + ' halves → okMeasure1' + (dec ? ' + «4½ cm = 4,5 cm»' : '') + ': ' + b4);
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- footprints off ---- */
    await go(page, 'read', 6, 'off'); await page.evaluate((g) => { const a = window[g]; a.st.tide = window.TidePlotCore.canonicalTide(a.st); a._paint(); }, G);
    is(await page.evaluate(() => document.querySelectorAll('.tp-feet').length) === 0, tag + ' footprints off: no footprints on the sand');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', 'C', s))(window[g], window.TidePlotCore), G, src);
    const sweep = async (name, reach, mode) => {
      const { page: pg, errs: e2 } = await L.open(WIDTHS[WIDTHS.length - 1], loc);
      await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await reach(pg); await H.wait(60);
      for (const w of WIDTHS) { await pg.setViewport({ width: w, height: H.VH(w) }); await H.wait(120); await pg.evaluate(() => window.scrollTo(0, 0)); { const cover = await noCover(pg); is(cover === '', loc + ' ' + name + ' @' + w + ': ' + (cover || 'handles clear')); } await L.measure(pg, w, loc + ' ' + name, mode === 'rest' ? { rest: true } : mode === 'miss' ? { miss: true } : {}); }
      is(e2.length === 0, loc + ' ' + name + ': no console errors ' + e2.slice(0, 3).join(' | '));
      await pg.close();
    };
    await sweep('read rest', async (pg) => { await go(pg, 'read', 0); }, 'rest');
    await sweep('read tide miss', async (pg) => { await go(pg, 'read', 3); await ev(pg, 'C.setShore(a.st,"L",3);C.choose(a.st,2);a._check();'); }, 'miss');
    await sweep('read help', async (pg) => { await go(pg, 'read', 9); await ev(pg, 'C.choose(a.st,4);a._check();C.choose(a.st,5);a._check();'); }, 'miss');
    await sweep('one column dry', async (pg) => { await go(pg, 'read', 0); await ev(pg, 'a.st.tide = C.canonicalTide(a.st); a._paint();'); }, 'rest');
    await sweep('mode rest', async (pg) => { await go(pg, 'read', 5); }, 'rest');
    await sweep('measure rest', async (pg) => { await go(pg, 'measure', 7); }, 'rest');
    await sweep('measure miss', async (pg) => { await go(pg, 'measure', 2); await ev(pg, 'a.st.shells.forEach(function(){var j=C.boardShell(a.st),s=a.st.shells[j];C.drop(a.st,Math.min(16,s.off+s.len));});a._check();'); }, 'miss');
    await sweep('halves rest', async (pg) => { await go(pg, 'halves', 4); }, 'rest');
    await sweep('halves measure', async (pg) => { await go(pg, 'halves', 3); }, 'rest');
  }
  await L.close();
  process.exit(L.C.report('local-test-tide-plot'));
})().catch((e) => { console.error(e); process.exit(1); });
