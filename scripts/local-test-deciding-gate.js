#!/usr/bin/env node
/* =====================================================================
   local-test-deciding-gate.js — ACTIVITY #151, The Deciding Gate
   ("Compare Three-Digit Numbers", 2.NBT.A.4), in a real browser with
   real pointer taps and real drags, in all 11 locales. Plumbing:
   scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · 389 / 412: Check with nothing → hintPick; a gate without a sign →
       hintSign (no misses); the tens gate called → the race runs and stops
       at the hundreds: one bar, in 389's lane, 412 reaches the flag, the
       tens header shakes, hintLate names the hundreds gate; no long view
       yet; miss 2 → the hundreds digits grow, hintVs "3 hundreds against
       4 hundreds … 389"; the hundreds gate + the < tile DRAGGED into the
       box → "389 is less than 412.", the long view, Next 0.5 s later;
     · 247 / 274 called at the hundreds → hintEarly, both hundreds cells glow;
     · 875 / 857: the right gate with < → hintSignSide;
     · 504 / 504: the flag with > → hintSignEq; the flag with = → solved;
     · four digits 1999 / 2001: big cubes at the thousands gate;
     · order four (389, 412, 398, 421): an empty step → hintSteps; shown
       order on the steps → wrong steps flash, hintOrder; miss 2 → the pair
       panel, hintPair; tags DRAGGED onto their true steps → solved.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-deciding-gate.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/deciding-gate-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('deciding-gate-activity.js', 'DecidingGateActivity', { DecidingGateCore: C });
const sp = H.sp, wait = H.wait;
const word = (loc, P, n) => n + ' ' + T(loc, 'w' + P + (n === 0 ? '0' : n === 1 ? '1' : 'n'));

(async () => {
  const L = await H.local({ html: 'deciding-gate-activity.html', id: 'match-pairs.compare-three-digit-numbers.2-nbt-a-4', global: 'DecidingGateActivity', ready: '.dg-wrap' });
  const { is } = L.C;
  const force = (page, job, digits, k) => page.evaluate((job, digits, k) => {
    const a = window.DecidingGateActivity; a.api.settings.job = job; a.api.settings.digits = digits; a._pool = null; a._ensurePool(); a._start(k); a._render2(); window.scrollTo(0, 0);
    return a.st.k === k && a.st.job === job;
  }, job, digits, k).then((ok) => { if (!ok) throw new Error('force ' + job + k); });
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.DecidingGateActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.dg-note'); return { text: n.textContent, hint: n.classList.contains('is-hint') }; });
  const count = (page, sel) => page.$$eval(sel, (e) => e.length);

  async function scenarios(loc) {
    const { page, errs } = await L.open(1024, loc);
    /* ---- 389 / 412 ---- */
    await force(page, 'compare', 'three', 0);
    is(sp(await L.prompt(page)) === sp(T(loc, 'taskCompare')), loc + ' the task line');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintPick')) && (await st(page)).misses === 0, loc + ' nothing called → hintPick, no miss');
    await L.click(page, 'gate-1', loc);
    is((await st(page)).predicted === 1 && (await count(page, '.dg-gate.is-pick')) === 1, loc + ' the tens gate is called');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintSign')) && (await st(page)).misses === 0, loc + ' no sign → hintSign, no miss');
    await L.click(page, 'sign-lt', loc); await L.click(page, 'check', loc);
    let s = await st(page), n = await note(page);
    is(s.misses === 1 && s.verdict.kind === 'gateLate' && n.hint && sp(n.text) === sp(T(loc, 'hintLate', { at: T(loc, 'atH') })), loc + ' tens called for 389/412 → hintLate at the hundreds');
    is((await count(page, '.dg-gatebar')) === 1 && (await count(page, '.dg-cell.is-a.is-barred')) === 1 && (await count(page, '.dg-fincell.is-b.is-through')) === 1, loc + ' one bar, in 389\'s lane; 412 reaches the flag');
    is((await count(page, '.dg-cell.is-run')) === 2, loc + ' the race ran only to the hundreds gate (two cells)');
    is((await count(page, '.dg-long')) === 0, loc + ' no long view before the win');
    await L.click(page, 'check', loc);
    s = await st(page); n = await note(page);
    is(s.help && (await count(page, '.dg-plate.is-big')) === 2 && sp(n.text) === sp(T(loc, 'hintVs', { w1: word(loc, 'H', 3), w2: word(loc, 'H', 4), small: 389 })), loc + ' miss 2: the hundreds grow, hintVs');
    await L.click(page, 'gate-0', loc);
    is(!(await note(page)).text && (await count(page, '.dg-gatebar')) === 0, loc + ' a new call takes the run and the hint away');
    await L.click(page, 'slot', loc);
    is((await st(page)).sign === null, loc + ' tapping the box clears the sign');
    await L.drag(page, '[data-k="sign-lt"]', '[data-k="slot"]', loc + ' sign drag');
    is((await st(page)).sign === '<', loc + ' the < tile dragged into the box');
    await page.evaluate(() => { window.DecidingGateActivity.OK_MS = 500; });
    await L.click(page, 'check', loc);
    is((await st(page)).done && (await count(page, '.dg-long')) === 1, loc + ' solved: the long view');
    const nb = await L.nextShown(page); await wait(900);
    is(!nb && await L.nextShown(page) && sp(await L.bubble(page)) === sp(T(loc, 'okLess', { a: 389, b: 412 })), loc + ' "389 is less than 412." and Next 0.5 s later');
    await page.evaluate(() => { window.DecidingGateActivity.OK_MS = 600000; });
    /* ---- 247 / 274 called early ---- */
    await force(page, 'compare', 'three', 3);
    await L.click(page, 'gate-0', loc); await L.click(page, 'sign-lt', loc); await L.click(page, 'check', loc);
    is((await st(page)).verdict.kind === 'gateEarly' && (await count(page, '.dg-cell.is-glow')) === 2 && sp((await note(page)).text) === sp(T(loc, 'hintEarly')), loc + ' 247/274 at the hundreds → hintEarly, both equal cells glow');
    /* ---- 875 / 857: right gate, wrong sign ---- */
    await force(page, 'compare', 'three', 4);
    await L.click(page, 'gate-1', loc); await L.click(page, 'sign-lt', loc); await L.click(page, 'check', loc);
    is((await st(page)).verdict.kind === 'sign' && sp((await note(page)).text) === sp(T(loc, 'hintSignSide')), loc + ' 875/857 with < → hintSignSide');
    /* ---- 504 / 504 ---- */
    await force(page, 'compare', 'three', 9);
    await L.click(page, 'gate-3', loc); await L.click(page, 'sign-gt', loc); await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintSignEq')) && (await count(page, '.dg-fincell.is-through')) === 2, loc + ' 504/504 with > → hintSignEq, both at the flag');
    await page.focus('.dg-wrap'); await page.keyboard.type('='); await L.click(page, 'check', loc);
    is((await st(page)).done, loc + ' = typed on the keyboard solves 504/504');
    /* ---- four digits ---- */
    await force(page, 'compare', 'four', 2);
    await L.click(page, 'gate-0', loc); await L.click(page, 'sign-lt', loc); await L.click(page, 'check', loc);
    is((await st(page)).done && (await count(page, '.dg-big')) === 3, loc + ' 1999/2001: one big cube against two, solved at the thousands');
    /* ---- order four ---- */
    await force(page, 'order', 'three', 0);
    is(sp(await L.prompt(page)) === sp(T(loc, 'taskOrder')), loc + ' order: the task line');
    await L.click(page, 'tag-0', loc); await L.click(page, 'step-0', loc); await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintSteps')) && (await st(page)).misses === 0, loc + ' order: an empty step → hintSteps');
    for (let i = 1; i < 4; i++) { await L.click(page, 'tag-' + i, loc); await L.click(page, 'step-' + i, loc); }
    await L.click(page, 'check', loc);
    s = await st(page);
    is(s.verdict.kind === 'order' && s.verdict.wrong.join() === '1,2' && (await count(page, '.dg-step.is-wrong')) === 2 && sp((await note(page)).text) === sp(T(loc, 'hintOrder')), loc + ' order: 389 412 398 421 → steps 2 and 3 flash');
    await L.click(page, 'check', loc);
    is((await count(page, '.dg-pair')) === 1 && sp((await note(page)).text) === sp(T(loc, 'hintPair', { a: 412, b: 398, at: T(loc, 'atH') })), loc + ' order miss 2: the pair 412/398 at the hundreds');
    await L.drag(page, '[data-k="tag-2"]', '[data-k="step-1"]', loc + ' tag drag');
    s = await st(page);
    is(s.steps.join() === '0,2,1,3', loc + ' order: a dragged tag swaps the two steps');
    await L.click(page, 'check', loc);
    is((await st(page)).done && (await count(page, '.dg-step.is-right')) === 4, loc + ' order: solved');
    L.C.is(errs.length === 0, loc + ' scenarios: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  const STATES = [
    ['rest', async (page) => { await force(page, 'compare', 'three', 1); }, { rest: true }],
    ['late', async (page) => { await force(page, 'compare', 'three', 0); await L.click(page, 'gate-2', 'l'); await L.click(page, 'sign-gt', 'l'); await L.click(page, 'check', 'l'); }, { miss: true }],
    ['help', async (page) => { await force(page, 'compare', 'three', 6); await L.click(page, 'gate-0', 'h'); await L.click(page, 'sign-gt', 'h'); await L.click(page, 'check', 'h'); await L.click(page, 'check', 'h'); }, { miss: true }],
    ['four', async (page) => { await force(page, 'compare', 'four', 3); await L.click(page, 'gate-3', 'f'); await L.click(page, 'sign-gt', 'f'); await L.click(page, 'check', 'f'); await L.click(page, 'check', 'f'); }, { miss: true }],
    ['order-help', async (page) => { await force(page, 'order', 'four', 4); for (let i = 0; i < 4; i++) { await L.click(page, 'tag-' + i, 'o'); await L.click(page, 'step-' + i, 'o'); } await L.click(page, 'check', 'o'); await L.click(page, 'check', 'o'); }, { miss: true }],
    ['solved', async (page) => { await force(page, 'compare', 'four', 0); await L.click(page, 'gate-0', 's'); await L.click(page, 'sign-lt', 's'); await L.click(page, 'check', 's'); }, {}]
  ];
  for (const loc of LOCS) {
    const f0 = L.C.fail;
    await scenarios(loc);
    for (const [name, reach, opt] of STATES) await L.sweep(loc, name, reach, opt, WIDTHS);
    console.log(loc + ': ' + (L.C.fail === f0 ? 'ok' : (L.C.fail - f0) + ' fail'));
  }
  await L.close();
  process.exit(L.C.report('local-test-deciding-gate'));
})().catch((e) => { console.error(e); process.exit(1); });
