#!/usr/bin/env node
/* =====================================================================
   local-test-landing-pad.js — ACTIVITY #157, The Spring and the Landing
   Pad ("Hopper's Number Line", 2.MD.B.6), in a real browser with real
   pointer taps and real drags, in all 11 locales. Plumbing:
   scripts/lib/activity-harness.js.
   Scenarios per locale (1024), round "Hopper sits on 4. He hops 12
   forward" (within 20):
     · Check with nothing → hintFrog, no miss; the story shows 4 and 12;
     · a real DRAG of Hopper onto stone 4; a real tap turns him (back),
       another turns him forward; ten + one + one loaded by real taps (the
       spring shows 1 ten, 2 ones); the pad DRAGGED to stone 15 (counting
       the start as one) → Hopper hops 1 + 2 arcs to 16 and SPLASHES one
       stone from the pad, hintPadOff; the pad dragged to 17 → miss 2 →
       the dotted hops (3 arcs, the last stone never named) + hintGhost;
       the pad dragged to 16 → solved: lands on the pad, the lotus, the
       stamp, the success line 0.5 s later with Next;
     · a wrong start (5) → Hopper does not hop, the story's 4 is marked,
       "find 4" (labels on every number) / "count from 4" (some);
     · facing back on a forward story → hintDir; seven coils for eight →
       the pad sinks, hintLoadWrong, the story's hop number marked;
     · equal hops: 4 hops of 3 → the hop marks by real taps, ONE arc per
       hop; the division round keeps the pad at the bank;
     · within 100: the tens line shuts the one-coil button; the window
       40–60 prints every 5th number;
     · the keyboard (arrows move Hopper and the pad, Space turns him);
       the labels setting (every number / every 10).
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-landing-pad.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/landing-pad-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('landing-pad-activity.js', 'LandingPadActivity', { LandingPadCore: C });
const G = 'LandingPadActivity', sp = H.sp;
const R20 = C.rounds('20'), K412 = R20.findIndex((r) => r.start === 4 && r.size === 12);
const REQ = C.rounds('eq'), KMUL = 0, KDIV = REQ.findIndex((r) => r.kind === 'div');
const R100 = C.rounds('100'), KTENS = R100.findIndex((r) => r.step === 10), KWIN = 0;

(async () => {
  const L = await H.local({ html: 'landing-pad-activity.html', id: 'hoppers-number-line.jump-sums.2-md-b-6', global: G, ready: '.lp-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, line, k, labels) => { await page.evaluate((g, line, k, labels) => { const a = window[g]; a.api.settings.line = line; a.api.settings.labels = labels || 'some'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, line, k, labels); await H.wait(40); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const story = (page) => page.evaluate(() => document.querySelector('[data-qa="story"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const frogTo = (page, v, what) => L.drag(page, '[data-k="frog"]', '[data-stone="' + v + '"]', what);
  const padTo = (page, v, what) => L.drag(page, '[data-k="pad"]', '[data-stone="' + v + '"]', what);
  const load = async (page, tens, ones) => { for (let i = 0; i < tens; i++) await L.click(page, 'ten', 'ten'); for (let i = 0; i < ones; i++) await L.click(page, 'one', 'one'); };
  const overArcs = (page) => page.evaluate(() => { const o = document.querySelector('.lp-over'); return o ? o.querySelectorAll('.lp-arc:not(.is-ghost)').length : 0; });

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- within 20: 4 + 12 ---- */
    await go(page, '20', K412, 'some');
    const r = R20[K412];
    is(sp(await story(page)) === sp(T(loc, 's_add', { s: 4, n: 12 })), tag + ' the story is s_add with 4 and 12');
    await L.click(page, 'check', 'check');
    let s = await S(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintFrog')), tag + ' Check with nothing → hintFrog, no miss');
    is(await count(page, '[data-pad] text, .lp-padh text') === 0, tag + ' the pad shows no number');
    await frogTo(page, 4, 'drag Hopper');
    s = await S(page); is(s.frogAt === 4, tag + ' a real drag puts Hopper on 4 (' + s.frogAt + ')');
    await L.click(page, 'frog', 'turn'); s = await S(page); is(s.facing === -1, tag + ' a tap turns him back');
    await L.click(page, 'frog', 'turn'); s = await S(page); is(s.facing === 1, tag + ' another tap turns him forward');
    await load(page, 1, 2);
    s = await S(page);
    is(s.coils.length === 3 && await page.evaluate(() => { const w = document.querySelector('.lp-springwrap'); return w.getAttribute('data-tens') + '/' + w.getAttribute('data-ones'); }) === '1/2', tag + ' the spring holds 1 ten, 2 ones');
    is(await count(page, '.lp-coil.is-ten') === 1 && await count(page, '.lp-coil.is-one') === 2, tag + ' a fat ten-coil and two thin one-coils are drawn');
    await padTo(page, 15, 'drag the pad');
    s = await S(page); is(s.padAt === 15, tag + ' a real drag floats the pad on 15 (' + s.padAt + ')');
    await L.click(page, 'check', 'check'); await H.wait(40);
    s = await S(page);
    is(s.verdict && s.verdict.kind === 'splash' && s.verdict.final === 16, tag + ' counting the start as one: Hopper hops to 16 and splashes');
    is(await count(page, '[data-splash]') === 1 && await overArcs(page) === 3, tag + ' one arc per coil (3) and the splash rings');
    is(await page.evaluate(() => document.querySelector('[data-k="frog"]').getAttribute('data-at')) === '16', tag + ' Hopper is drawn where he really landed');
    is(sp(await note(page)) === sp(T(loc, 'hintPadOff')), tag + ' hintPadOff');
    await padTo(page, 17, 'move the pad'); await L.click(page, 'check', 'check'); await H.wait(40);
    s = await S(page);
    is(s.help && await count(page, '[data-ghost]') === 3 && sp(await note(page)) === sp(T(loc, 'hintGhost')), tag + ' miss 2 → three dotted hops + hintGhost');
    is(!(await page.evaluate(() => /\b16\b/.test(document.querySelector('[data-qa="note"]').textContent))), tag + ' the help never names the landing');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await padTo(page, 16, 'the pad on 16'); await L.click(page, 'check', 'check'); await H.wait(900);
    s = await S(page);
    is(s.done && await count(page, '[data-lotus]') === 1 && await count(page, '[data-stamp]') === 1, tag + ' solved: the lotus and the stamp');
    is(sp(await L.bubble(page)).indexOf(sp(T(loc, 'ok_add', C.okArgs(r)))) >= 0, tag + ' the success line "' + T(loc, 'ok_add', C.okArgs(r)) + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);

    /* ---- a wrong start ---- */
    for (const lb of ['every', 'some']) {
      await go(page, '20', R20.findIndex((x) => x.start === 3), lb);
      await frogTo(page, 5, 'wrong start'); await load(page, 0, 2); await padTo(page, 10, 'pad');
      await L.click(page, 'check', 'check'); s = await S(page);
      const lab = C.labelled(s.round, 3, lb);
      is(s.verdict && s.verdict.kind === 'start' && sp(await note(page)) === sp(T(loc, lab ? 'hintStartFind' : 'hintStart', { s: 3, lab: C.nearestLabel(s.round, lb) })), tag + ' wrong start (' + lb + ') → ' + (lab ? 'find 3' : 'count from ' + C.nearestLabel(s.round, lb)));
      is(await count(page, '.lp-sn.is-mark[data-n="s"]') === 1 && await overArcs(page) === 0, tag + ' Hopper does not hop; the story\'s start is marked');
    }
    /* ---- facing the wrong way; a self-consistent wrong load ---- */
    await go(page, '20', 0); /* 6 + 8 */
    await frogTo(page, 6, 'start'); await L.click(page, 'frog', 'turn'); await load(page, 0, 8); await padTo(page, 14, 'pad');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict && s.verdict.why === 'direction' && s.verdict.final === -2 && sp(await note(page)) === sp(T(loc, 'hintDir')), tag + ' facing back on a forward story → hintDir');
    await L.click(page, 'frog', 'turn'); await L.click(page, 'undo', 'undo'); await padTo(page, 13, 'pad 13');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict && s.verdict.kind === 'sink' && sp(await note(page)) === sp(T(loc, 'hintGhost')), tag + ' seven for eight on its own landing: the pad sinks (and this second miss helps)');
    is(await count(page, '.lp-lily.is-sink') === 1 && await count(page, '.lp-sn.is-mark[data-n="n"]') === 1, tag + ' the sinking pad and the story\'s hop marked');
    await go(page, '20', 0); await frogTo(page, 6, 'start'); await load(page, 0, 7); await padTo(page, 13, 'pad 13'); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintLoadWrong', { n: 8 })), tag + ' a first wrong load → hintLoadWrong');

    /* ---- equal hops ---- */
    await go(page, 'eq', KMUL); const rm = REQ[KMUL];
    is(sp(await story(page)) === sp(T(loc, 's_mul', { s: 0, k: rm.count, n: rm.size })), tag + ' the equal-hops story');
    await L.click(page, 'check', 'check'); await frogTo(page, 0, 'start 0'); await load(page, 0, rm.size); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintMarks')), tag + ' "how many hops?" before the pad');
    await L.click(page, 'mark-' + rm.count, 'hop marks');
    s = await S(page); is(s.count === rm.count && await count(page, '.lp-mark.is-lit') === rm.count, tag + ' a real tap lights ' + rm.count + ' hop marks');
    await padTo(page, rm.answer + 1, 'pad'); await L.click(page, 'check', 'check');
    is(await overArcs(page) === rm.count, tag + ' ONE arc per hop (' + rm.count + '), not per coil');
    await go(page, 'eq', KDIV); const rd = REQ[KDIV];
    is(await count(page, '[data-k="pad"]') === 0 && (await S(page)).padAt === 0 && await count(page, '[data-bank]') === 1, tag + ' a division round: the bank is the landing, no pad to move');
    await frogTo(page, rd.start, 'start'); await L.click(page, 'frog', 'turn'); await load(page, 0, rd.size); await L.click(page, 'mark-' + rd.answer, 'marks'); await L.click(page, 'check', 'check'); await H.wait(40);
    is((await S(page)).done, tag + ' ' + rd.start + ' back in hops of ' + rd.size + ' reaches the bank in ' + rd.answer);

    /* ---- within 100 ---- */
    await go(page, '100', KTENS);
    is(await page.evaluate(() => document.querySelector('[data-k="one"]').disabled) && await count(page, '.lp-num') === 11, tag + ' the tens line: one-coils shut, every ten printed');
    await go(page, '100', KWIN, 'some');
    is(await count(page, '.lp-num') === 5, tag + ' 40–60 prints every 5th number (' + await count(page, '.lp-num') + ')');
    /* ---- labels and keyboard ---- */
    await go(page, '20', 0, 'every'); is(await count(page, '.lp-num') === 21, tag + ' every number: 21 numerals');
    await go(page, '20', 0, 'ten'); is(await count(page, '.lp-num') === 3, tag + ' every 10: 0, 10, 20');
    await go(page, '20', 0);
    await page.focus('[data-k="frog"]'); await page.keyboard.press(' '); await page.focus('[data-k="frog"]'); await page.keyboard.press('ArrowRight'); await page.focus('[data-k="frog"]'); await page.keyboard.press('ArrowRight');
    s = await S(page); is(s.frogAt === 2, tag + ' keyboard: Space sets Hopper out, arrows move him (' + s.frogAt + ')');
    await page.focus('[data-k="frog"]'); await page.keyboard.press(' '); s = await S(page); is(s.facing === -1, tag + ' Space turns him');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const reachMiss = async (pg) => { await go(pg, '20', K412); await frogTo(pg, 4, 'f'); await load(pg, 1, 2); await padTo(pg, 15, 'p'); await L.click(pg, 'check', 'c'); };
    await L.sweep(loc, 'rest', async (pg) => { await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await go(pg, '20', K412); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'miss', async (pg) => { await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await reachMiss(pg); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await reachMiss(pg); await padTo(pg, 16, 'p'); await L.click(pg, 'check', 'c'); }, {}, WIDTHS);
    await L.sweep(loc, 'eq', async (pg) => { await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await go(pg, 'eq', KMUL); await frogTo(pg, 0, 'f'); await load(pg, 0, 3); await L.click(pg, 'mark-4', 'm'); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'tens', async (pg) => { await pg.waitForFunction((g) => window[g]._picsReady, {}, G); await go(pg, '100', KTENS); await frogTo(pg, 30, 'f'); await load(pg, 4, 0); }, { rest: true }, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-landing-pad'));
})().catch((e) => { console.error(e); process.exit(1); });
