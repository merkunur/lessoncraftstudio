#!/usr/bin/env node
/* =====================================================================
   local-test-growing-picture.js — ACTIVITY #154, The Growing Picture
   ("Gauge's Good Guess", 2.MD.A.3), in a real browser with real pointer
   taps, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · the ant: Check with nothing tapped → hintPick, no miss; a real tap on
       30 cm → the picture's ink is exactly as long as the 30-cm ruler (one
       scale), no ghost yet; Check → too big, hintBigRuler, a dashed ghost
       1/30 of the ruler with no number in it;
     · a tap on 1 cm → below the floor: a size bar 1/30 of the ruler, the
       picture as a framed label beside it (never at bar size), the ghost
       and the hint gone; Check → solved, ok1_ant 0.5 s later with Next, the
       ant in the size album;
     · the truck: 2 m → hintSmallStick, only the metre stick drawn; 60 m →
       miss 2 → the comparison cmp1_truck;
     · the door (tall): 9 m → the picture stands nine metre sticks high;
     · level 2, the bee: both benchmarks; "m" fills the gap, Check →
       hintBigBoth; "cm" → solved with okUnit "2 cm";
     · "grows after Check": a tap leaves the neutral "?" frame, Check grows
       the picture;
     · the keyboard: the digit of the right slot and Enter solve the banana;
     · the album keeps the solved things ordered by size.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-growing-picture.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/growing-picture-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('growing-picture-activity.js', 'GrowingPictureActivity', { GrowingPictureCore: C });
const sp = H.sp, wait = H.wait;
const K = (level, obj) => C.rounds(level).find((r) => r.obj === obj).k;

(async () => {
  const L = await H.local({ html: 'growing-picture-activity.html', id: 'gauge-good-guess.estimate.2-md-a-3', global: 'GrowingPictureActivity', ready: '.gp-wrap' });
  const { is } = L.C;
  const ready = (page) => page.waitForFunction(() => window.GrowingPictureActivity._picsReady, { timeout: 15000 });
  const force = async (page, level, k, order, grow) => {
    const ok = await page.evaluate((level, k, order, grow) => {
      const a = window.GrowingPictureActivity; a.api.settings.level = level; a.api.settings.grow = grow || 'tap'; a._pool = null; a._ensurePool(); a._cards = order ? { [k]: order } : {}; a._start(k); a._render2(); window.scrollTo(0, 0);
      return a.st.k === k && a.st.level === level && a.st.order.join() === (order || a.st.round.cards.map((c, i) => i)).join();
    }, level, k, order, grow);
    if (!ok) throw new Error('force ' + level + k);
  };
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.GrowingPictureActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.gp-note'); return { text: n.textContent, hint: n.classList.contains('is-hint') }; });
  const count = (page, sel) => page.$$eval(sel, (e) => e.length);
  const card = async (page, slot, what) => { await L.click(page, 'card-' + slot, what); await wait(20); };
  /* the frame's geometry: each bench's length in px, the picture's ink along its axis, the ghost and the bar */
  const geo = (page) => page.evaluate(() => {
    const C = window.GrowingPictureCore, a = window.GrowingPictureActivity, r = a.st.round, tall = r.axis === 'tall', f = document.querySelector('.gp-frame').getBoundingClientRect();
    const len = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return tall ? b.height : b.width; };
    const im = document.querySelector('.gp-pic'), ink = C.ink(r.obj), p = C.PICS[r.obj];
    let pic = null;
    const bx = document.querySelector('.gp-picbox');
    if (im && bx) { const S = parseFloat(im.style.width), B = bx.getBoundingClientRect(); pic = { along: tall ? B.height : B.width, model: S * ink.along, start: tall ? B.bottom - f.top : B.left - f.left, S }; }
    const g = document.querySelector('.gp-ghost'), bar = document.querySelector('.gp-sizebar'), ru = document.querySelector('.gp-ruler'), stk = document.querySelector('.gp-stick');
    return { ruler: len(ru), stick: len(stk), pic, ghost: len(g), ghostText: g ? (g.nextElementSibling && g.nextElementSibling.tagName === 'text') : false, bar: len(bar), chip: !!document.querySelector('.gp-chip .gp-label'),
      neutral: !!document.querySelector('[data-neutral]'), floorY: f.height, benchStart: ru ? (tall ? ru.getBoundingClientRect().bottom - f.top : ru.getBoundingClientRect().left - f.left) : stk ? (tall ? stk.getBoundingClientRect().bottom - f.top : stk.getBoundingClientRect().left - f.left) : null };
  });
  const near = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

  async function scenarios(loc) {
    const { page, errs } = await L.open(1024, loc); await ready(page);
    /* ---- the ant, cards 1 · 12 · 30 cm in this order ---- */
    await force(page, 'estimate', K('estimate', 'ant'), [0, 1, 2]);
    is(sp(await L.prompt(page)) === sp(T(loc, 'taskLine')), loc + ' the task line');
    is(sp(await page.$eval('[data-qa="question"]', (e) => e.textContent)) === sp(T(loc, 'q1_ant')), loc + ' the ant question');
    let g = await geo(page);
    is(g.neutral && !g.pic && g.ruler > 0 && g.stick == null, loc + ' at rest: the "?" frame and only the ruler');
    await L.click(page, 'check', loc);
    let n = await note(page), s = await st(page);
    is(sp(n.text) === sp(T(loc, 'hintPick')) && !n.hint && s.misses === 0, loc + ' nothing tapped → hintPick, no miss');
    await card(page, 2, loc + ' 30 cm');
    g = await geo(page);
    is(g.pic && near(g.pic.along, g.ruler, 0.03), loc + ' 30 cm: the ant is as long as the 30-cm ruler (' + (g.pic && g.pic.along.toFixed(1)) + ' / ' + g.ruler.toFixed(1) + ')');
    is(g.pic && Math.abs(g.pic.start - g.benchStart) <= 3, loc + ' the ant starts where the ruler starts');
    is(g.pic && near(g.pic.along, g.pic.model, 0.02), loc + ' the clip box is exactly the drawing ink');
    is(g.ghost == null, loc + ' no ghost before Check');
    await L.click(page, 'check', loc);
    s = await st(page); n = await note(page); g = await geo(page);
    is(s.verdict && s.verdict.kind === 'big' && sp(n.text) === sp(T(loc, 'hintBigRuler')) && n.hint, loc + ' 30 cm → too big, hintBigRuler');
    is(g.ghost != null && near(g.ghost, g.ruler / 30, 0.25) && !g.ghostText, loc + ' the ghost is the real 1 cm, dashed, no number (' + (g.ghost && g.ghost.toFixed(1)) + ')');
    await card(page, 0, loc + ' 1 cm');
    g = await geo(page); s = await st(page);
    is(!g.pic && g.bar != null && near(g.bar, g.ruler / 30, 0.3) && g.chip, loc + ' 1 cm: a size bar 1/30 of the ruler and the ant as a label beside it');
    is(!s.verdict && g.ghost == null && !(await note(page)).text, loc + ' a new card takes the ghost and the hint away');
    const lab = await page.evaluate(() => document.querySelector('.gp-chip').getBoundingClientRect().width);
    is(lab >= 64, loc + ' the label is never drawn at bar size (' + Math.round(lab) + ' px)');
    await page.evaluate(() => { window.GrowingPictureActivity.OK_MS = 500; });
    await L.click(page, 'check', loc);
    s = await st(page);
    const nb = await L.nextShown(page); await wait(900);
    is(s.done && !nb && await L.nextShown(page) && sp(await L.bubble(page)) === sp(T(loc, 'ok1_ant')), loc + ' solved: ok1_ant and Next 0.5 s later');
    is((await count(page, '.gp-athumb')) === 1 && (await count(page, '.gp-stamp')) === 1, loc + ' the ant in the album, the size stamp on the frame');
    const stampOk = () => page.evaluate(() => {
      const t = document.querySelector('.gp-stamp').getBoundingClientRect(), f = document.querySelector('.gp-frame').getBoundingClientRect();
      const hit = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
      const inside = t.left >= f.left && t.right <= f.right && t.top >= f.top && t.bottom <= f.bottom;
      const over = [...document.querySelectorAll('.gp-sizebar, .gp-chip')].some((e) => hit(t, e.getBoundingClientRect()));
      return inside && !over;
    });
    is(await stampOk(), loc + ' the size stamp sits inside the frame and covers neither the bar nor its label');
    for (const w of [320, 360, 412, 768]) { await page.setViewport({ width: w, height: 900 }); await wait(150); is(await stampOk(), loc + ' @' + w + ': the stamp clear of the bar and the label'); }
    await page.setViewport({ width: 1024, height: 900 }); await wait(150);
    await page.evaluate(() => { window.GrowingPictureActivity.OK_MS = 600000; });
    /* ---- the truck: the metre stick only; miss 2 → the comparison ---- */
    await force(page, 'estimate', K('estimate', 'truck'), [0, 1, 2]);
    g = await geo(page);
    is(g.stick > 0 && g.ruler == null, loc + ' truck: only the metre stick');
    await card(page, 0, loc + ' truck 2 m'); g = await geo(page);
    is(g.pic && near(g.pic.along, 2 * g.stick, 0.04), loc + ' 2 m: the truck is two metre sticks long');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintSmallStick')), loc + ' 2 m → too small, hintSmallStick');
    await card(page, 2, loc + ' truck 60 m'); await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'cmp1_truck')) && (await st(page)).help, loc + ' miss 2 → the comparison');
    /* ---- the door stands ---- */
    await force(page, 'estimate', K('estimate', 'door'), [0, 1, 2]);
    await card(page, 2, loc + ' door 9 m'); g = await geo(page);
    is(g.pic && near(g.pic.along, 9 * g.stick, 0.04), loc + ' 9 m: the door stands nine metre sticks high (' + (g.pic && (g.pic.along / g.stick).toFixed(2)) + ')');
    is(g.pic && Math.abs(g.pic.start - g.benchStart) <= 3, loc + ' the door stands on the floor with the stick');
    /* ---- level 2: the bee ---- */
    await force(page, 'unit', K('unit', 'bee'), [0, 1]);
    g = await geo(page);
    is(g.ruler > 0 && g.stick > 0, loc + ' level 2: the ruler and the metre stick');
    const q0 = await page.$eval('[data-qa="question"]', (e) => e.textContent);
    is(sp(q0) === sp(T(loc, 'q2_bee').replace('{gap}', '___')), loc + ' the bee sentence with its gap');
    await card(page, 1, loc + ' bee m');
    is((await page.$eval('.gp-gap', (e) => e.textContent)) === 'm', loc + ' "m" fills the gap');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintBigBoth')), loc + ' 2 m for a bee → hintBigBoth');
    await page.evaluate(() => { window.GrowingPictureActivity.OK_MS = 500; });
    await card(page, 0, loc + ' bee cm'); await L.click(page, 'check', loc); await wait(900);
    is((await st(page)).done && sp(await L.bubble(page)) === sp(T(loc, 'okUnit', { v: '2 cm' })), loc + ' "cm" → solved, okUnit 2 cm');
    await page.evaluate(() => { window.GrowingPictureActivity.OK_MS = 600000; });
    /* ---- grows after Check ---- */
    await force(page, 'estimate', K('estimate', 'spoon'), [0, 1, 2], 'check');
    await card(page, 1, loc + ' spoon 60'); g = await geo(page);
    is(g.neutral && !g.pic, loc + ' "after Check": a tap keeps the "?" frame');
    await L.click(page, 'check', loc); g = await geo(page);
    is(g.pic && near(g.pic.along, 2 * g.ruler, 0.04) && g.ghost != null, loc + ' Check grows the spoon to 60 cm and shows the ghost');
    /* ---- the keyboard ---- */
    await force(page, 'estimate', K('estimate', 'banana'), [2, 0, 1]);   /* 20 cm sits in slot 1 */
    await page.focus('.gp-wrap'); await page.keyboard.press('1'); await page.keyboard.press('Enter');
    is((await st(page)).done, loc + ' "1" and Enter solve the banana');
    is((await page.$$eval('.gp-aval', (e) => e.map((x) => x.textContent.replace(/\s/g, ' ')).join('|'))) === '1 cm|2 cm|20 cm', loc + ' the album is ordered by size: 1 cm | 2 cm | 20 cm');
    L.C.is(errs.length === 0, loc + ' scenarios: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  const run = (level, obj, src) => async (page) => { await ready(page); await force(page, level, K(level, obj), level === 'unit' ? [0, 1] : [0, 1, 2]); await page.evaluate((src) => { const t = window.GrowingPictureActivity; (new Function('t', src))(t); }, src); };
  const STATES = [
    ['rest', run('estimate', 'ant', ''), { rest: true }],
    ['big', run('estimate', 'ant', 't._choose(2); t._check();'), { miss: true }],
    ['bar', run('estimate', 'snail', 't._choose(0);'), {}],
    ['help', run('estimate', 'truck', 't._choose(0); t._check(); t._choose(2); t._check();'), { miss: true }],
    ['tall', run('estimate', 'lighthouse', 't._choose(2); t._check();'), { miss: true }],
    ['unit', run('unit', 'whale', 't._choose(0); t._check();'), { miss: true }],
    ['solved', run('estimate', 'ferry', 't._choose(2); t._check();'), {}]
  ];
  for (const loc of LOCS) {
    const f0 = L.C.fail;
    await scenarios(loc);
    for (const [name, reach, opt] of STATES) await L.sweep(loc, name, reach, opt, WIDTHS);
    console.log(loc + ': ' + (L.C.fail === f0 ? 'ok' : (L.C.fail - f0) + ' fail'));
  }
  await L.close();
  process.exit(L.C.report('local-test-growing-picture'));
})().catch((e) => { console.error(e); process.exit(1); });
