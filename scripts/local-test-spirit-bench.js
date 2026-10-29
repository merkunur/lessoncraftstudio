#!/usr/bin/env node
/* =====================================================================
   local-test-spirit-bench.js — ACTIVITY #156, The Spirit Level ("Bram's
   Board Shop", 2.MD.B.5), in a real browser with real pointer taps and
   real drags, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024), round "a board is 45, Bram saws off 15"
   (rack 60 · 15 · 45):
     · Check with an empty bench → hintBoards, no miss; the keypad locked;
     · a real tap on the 45 then on the top rail; a real DRAG of the 15 to
       the bottom rail; the boards are drawn to scale; the mystery place is
       the 30 cm left; the keypad unlocks;
     · 60 typed (the keyword sum) → the saw cuts a 60, the level leans to
       the bottom, the 30-cm overhang is shaded, hintLevel; 20 → miss 2 →
       hintCount 15 → 45 with two marks; 30 → solved, the ticket stamped,
       the success line 0.5 s later with Next, the level straight;
     · the trap board on top with 45 typed → the rails balance and the
       hint says so (hintDecoyFlat); the 15 on top → hintRail; a third
       board → hintFull;
     · the scarf (the whole is the mystery): miss 2 → hintCountTop from the
       first piece, the answer never marked; the level test leans;
     · the keyboard; the ruler hidden; numbers within 100.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-spirit-bench.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/spirit-bench-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('spirit-bench-activity.js', 'SpiritBenchActivity', { SpiritBenchCore: C });
const sp = H.sp, wait = H.wait;

(async () => {
  const L = await H.local({ html: 'spirit-bench-activity.html', id: 'bram-board-shop.length-word-problems.2-md-b-5', global: 'SpiritBenchActivity', ready: '.sb-wrap' });
  const { is } = L.C;
  const ready = (page) => page.waitForFunction(() => window.SpiritBenchActivity._picsReady, { timeout: 15000 });
  const force = async (page, numbers, k, ruler) => {
    const ok = await page.evaluate((numbers, k, ruler) => { const a = window.SpiritBenchActivity; a.api.settings.numbers = numbers; a.api.settings.ruler = ruler || 'shown'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.k === k && a.st.level === numbers; }, numbers, k, ruler);
    if (!ok) throw new Error('force ' + numbers + '/' + k);
  };
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.SpiritBenchActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.sb-note'); return { text: n.textContent, hint: n.classList.contains('is-hint') }; });
  const attr = (page, sel, a) => page.evaluate((sel, a) => { const e = document.querySelector(sel); return e ? e.getAttribute(a) : null; }, sel, a);
  const count = (page, sel) => page.$$eval(sel, (e) => e.length);
  const key = (page, d, what) => L.click(page, 'key-' + d, what);
  const typeN = async (page, n, what) => { for (const d of String(n)) await key(page, d, what); };
  const clearN = async (page, what) => { for (let i = 0; i < 3; i++) { const dis = await page.$eval('[data-k="back"]', (e) => e.disabled); if (dis) break; await L.click(page, 'back', what); } };
  const ppc = (page) => page.evaluate(() => window.SpiritBenchActivity._g.ppc);
  /* a real drag of board i to a rail */
  const drag = async (page, i, rail) => {
    await page.evaluate(() => document.querySelector('.sb-board').scrollIntoView({ block: 'center' }));
    const b = await (await page.$('[data-k="board-' + i + '"]')).boundingBox(), z = await (await page.$('[data-k="rail-' + rail + '"]')).boundingBox();
    const x0 = b.x + 20, y0 = b.y + b.height / 2, x1 = z.x + 60, y1 = z.y + z.height / 2;
    await page.mouse.move(x0, y0); await page.mouse.down();
    for (let s = 1; s <= 12; s++) await page.mouse.move(x0 + (x1 - x0) * s / 12, y0 + (y1 - y0) * s / 12);
    await page.mouse.up(); await wait(40);
  };

  async function scenarios(loc) {
    const { page, errs } = await L.open(1024, loc); await ready(page);
    const R = C.rounds('80'), r3 = R[3];   /* takeResult 45 − 15, rack [60, 15, 45] */
    await force(page, '80', 3);
    is(sp(await L.prompt(page)) === sp(T(loc, 'taskLine')), loc + ' the task line');
    is(sp(await page.$eval('[data-qa="story"]', (e) => e.textContent)) === sp(T(loc, 's_takeResult', { a: 45, b: 15 })), loc + ' the order ticket tells the 45 − 15 story');
    await L.click(page, 'check', loc);
    let n = await note(page), s = await st(page);
    is(sp(n.text) === sp(T(loc, 'hintBoards')) && s.misses === 0, loc + ' empty bench → hintBoards, no miss');
    is(await page.$eval('[data-k="key-3"]', (e) => e.disabled), loc + ' the keypad is locked until the bench is built');
    const u = await ppc(page), w45 = await page.$eval('[data-k="board-2"] .sb-woodr', (e) => e.getBoundingClientRect().width);
    is(Math.abs(w45 - 45 * u) < 1.5, loc + ' the 45 board is drawn at bench scale (' + (w45 / u).toFixed(1) + ' cm)');
    await L.click(page, 'board-2', loc); await L.click(page, 'rail-top', loc);
    s = await st(page); is(s.top === 2, loc + ' a real tap on the 45 and on the top rail puts it on top');
    await drag(page, 1, 'bottom');
    s = await st(page); is(s.bottom.join() === '1', loc + ' a real drag puts the 15 on the bottom rail');
    const myst = await page.evaluate(() => { const e = document.querySelector('[data-mystery]'); return e ? { m: e.getAttribute('data-mystery'), w: e.getBoundingClientRect().width } : null; });
    is(myst && myst.m === 'bottom' && Math.abs(myst.w - 30 * u) < 2, loc + ' the mystery place is the 30 cm left on the bottom rail');
    is(!(await page.$eval('[data-k="key-3"]', (e) => e.disabled)), loc + ' the keypad unlocks once the bench is built');
    await typeN(page, 60, loc); await L.click(page, 'check', loc);
    s = await st(page); n = await note(page);
    is(s.verdict && s.verdict.kind === 'number' && sp(n.text) === sp(T(loc, 'hintLevel')) && n.hint, loc + ' 60 (the keyword sum) → hintLevel');
    is((await attr(page, '[data-cut]', 'data-cut')) === '60' && (await attr(page, '[data-level]', 'data-level')) === 'bottom' && (await attr(page, '[data-gap]', 'data-gap')) === '30', loc + ' the saw cut a 60, the level leans to the bottom, the 30-cm overhang is shaded');
    await clearN(page, loc); await typeN(page, 20, loc); await L.click(page, 'check', loc);
    s = await st(page);
    is(s.help && sp((await note(page)).text) === sp(T(loc, 'hintCount', { s: 15, e: 45 })) && (await count(page, '[data-span]')) === 2, loc + ' miss 2 → hintCount 15 → 45, two marks on the ruler');
    await page.evaluate(() => { window.SpiritBenchActivity.OK_MS = 500; });
    await clearN(page, loc); await typeN(page, 30, loc); await L.click(page, 'check', loc);
    s = await st(page);
    const nb = await L.nextShown(page); await wait(900);
    is(s.done && !nb && await L.nextShown(page) && sp(await L.bubble(page)) === sp(T(loc, 'ok_takeResult', { a: 45, b: 15, c: 30 })), loc + ' 30 → solved, the success line and Next 0.5 s later');
    is((await attr(page, '[data-level]', 'data-level')) === 'flat' && (await count(page, '[data-stamp]')) === 1 && !(await page.$eval('.sb-pad', (e) => e.offsetParent !== null)), loc + ' the level straight, the ticket stamped, the keypad gone');
    await page.evaluate(() => { window.SpiritBenchActivity.OK_MS = 600000; });
    /* the trap board on the bench, balanced */
    await force(page, '80', 3);
    await L.click(page, 'board-0', loc); await L.click(page, 'rail-top', loc); await L.click(page, 'board-1', loc); await L.click(page, 'rail-bottom', loc);
    await typeN(page, 45, loc); await L.click(page, 'check', loc);
    is((await st(page)).verdict.kind === 'decoy' && sp((await note(page)).text) === sp(T(loc, 'hintDecoyFlat')) && (await attr(page, '[data-level]', 'data-level')) === 'flat', loc + ' 60 on top, 15 + 45 → the rails balance and the hint says the bench is not the story');
    /* a known on the wrong rail */
    await force(page, '80', 3);
    await L.click(page, 'board-1', loc); await L.click(page, 'rail-top', loc); await L.click(page, 'board-2', loc); await L.click(page, 'rail-bottom', loc);
    await typeN(page, 5, loc); await L.click(page, 'check', loc);
    is((await st(page)).verdict.kind === 'wrongRail' && sp((await note(page)).text) === sp(T(loc, 'hintRail')), loc + ' the 15 on top → hintRail');
    /* a third board */
    await force(page, '80', 3);
    await L.click(page, 'board-2', loc); await L.click(page, 'rail-top', loc); await L.click(page, 'board-1', loc); await L.click(page, 'rail-bottom', loc);
    await L.click(page, 'board-0', loc); await L.click(page, 'rail-bottom', loc);
    s = await st(page);
    is(C.placed(s) === 2 && sp((await note(page)).text) === sp(T(loc, 'hintFull')), loc + ' a third board is refused with hintFull');
    /* the scarf: the whole is the mystery */
    await force(page, '80', 0);   /* 25 + 20, rack [5, 25, 20] */
    await L.click(page, 'board-1', loc); await L.click(page, 'rail-bottom', loc);
    await L.click(page, 'level', loc);
    is((await attr(page, '[data-level]', 'data-level')) === 'bottom', loc + ' the level test on a half-built bench leans');
    await L.click(page, 'board-2', loc); await L.click(page, 'rail-bottom', loc);
    await typeN(page, 50, loc); await L.click(page, 'check', loc); await clearN(page, loc); await typeN(page, 40, loc); await L.click(page, 'check', loc);
    const spans = await page.$$eval('[data-span]', (e) => e.map((x) => x.getAttribute('data-span')).join());
    is(sp((await note(page)).text) === sp(T(loc, 'hintCountTop', { s: 25 })) && spans === '25', loc + ' miss 2 on the scarf → hintCountTop from 25, the answer never marked (' + spans + ')');
    /* the keyboard */
    await force(page, '80', 0);
    await L.click(page, 'board-1', loc); await L.click(page, 'rail-bottom', loc); await L.click(page, 'board-2', loc); await L.click(page, 'rail-bottom', loc);
    await page.focus('.sb-wrap'); await page.keyboard.press('4'); await page.keyboard.press('5'); await page.keyboard.press('Enter');
    is((await st(page)).done, loc + ' "4", "5" and Enter solve the scarf');
    /* the ruler hidden; numbers within 100 */
    await force(page, '80', 1, 'hidden');
    is((await count(page, '.sb-rnum')) === 0, loc + ' the bench ruler hidden: no numerals on it');
    await force(page, '100', 0);
    is(sp(await page.$eval('[data-qa="story"]', (e) => e.textContent)) === sp(T(loc, 's_addResult', { a: 38, b: 27 })) && (await page.$$eval('.sb-rnum', (e) => e.map((x) => x.textContent))).includes('100'), loc + ' within 100: the 38 + 27 scarf, the ruler to 100');
    L.C.is(errs.length === 0, loc + ' scenarios: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  const run = (numbers, k, src) => async (page) => { await ready(page); await force(page, numbers, k); await page.evaluate((src) => { const t = window.SpiritBenchActivity, r = t.st.round; (new Function('t', 'r', src))(t, r); }, src); };
  const BUILD = 'var d = r.rack.indexOf(r.decoy), used = []; var pick = function (v) { for (var i = 0; i < 3; i++) if (i !== d && used.indexOf(i) < 0 && r.rack[i] === v) { used.push(i); return i; } }; if (r.topKnown !== null) t._put(pick(r.topKnown), "top"); r.bottomKnown.forEach(function (v) { t._put(pick(v), "bottom"); });';
  const TYPE = (n) => 'String(' + n + ').split("").forEach(function (x) { t._type(x); });';
  const STATES = [
    ['rest', run('80', 1, ''), { rest: true }],
    ['built', run('80', 7, BUILD + TYPE('r.answer')), {}],
    ['missed', run('80', 4, BUILD + TYPE('r.decoy') + ' t._check();'), { miss: true }],
    ['helped', run('80', 8, BUILD + TYPE('r.decoy') + ' t._check(); t._back(); t._back(); ' + TYPE('r.answer + 5') + ' t._check();'), { miss: true }],
    ['decoy', run('80', 9, 'var d = r.rack.indexOf(r.decoy), o = [0, 1, 2].filter(function (i) { return i !== d; }); t._put(d, "top"); t._put(o[0], "bottom");' + TYPE('5') + ' t._check();'), { miss: true }],
    ['solved', run('80', 10, BUILD + TYPE('r.answer') + ' t._check();'), {}],
    ['within100', run('100', 6, BUILD + TYPE('r.decoy') + ' t._check();'), { miss: true }]
  ];
  for (const loc of LOCS) {
    const f0 = L.C.fail;
    await scenarios(loc);
    for (const [name, reach, opt] of STATES) await L.sweep(loc, name, reach, opt, WIDTHS);
    console.log(loc + ': ' + (L.C.fail === f0 ? 'ok' : (L.C.fail - f0) + ' fail'));
  }
  await L.close();
  process.exit(L.C.report('local-test-spirit-bench'));
})().catch((e) => { console.error(e); process.exit(1); });
