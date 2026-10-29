#!/usr/bin/env node
/* =====================================================================
   local-test-drive-cables.js — ACTIVITY #160, The Drive Cables ("Sprocket's
   Clock — Match Analog and Digital", 2.MD.C.7), in a real browser with
   real pointer taps and drags, in all 11 locales.
   Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · at rest: 4 clocks, 3 cards, no lamp on, no ghost; a clock is read
       by its hands (never its time); a clock tap with no card → hintPick;
       Check with nothing plugged → hintPlug, no miss;
     · Level 2 "12:45 · 9:10 · 5:35" (lure 1:45): 12:45 tapped into the
       lure, 9:10 tapped into its clock, 5:35 DRAGGED into its clock;
       Check → the lure clock carries the card's ghost hands, only its
       hour hand blinks, two lamps lit, hintHourHand; a lit card does not
       move; a second Check → hintHelp, five-minute dots, the two bold
       numbers 12 and 1; a double tap pulls 12:45 out, a drag plugs it
       right → solved: three lamps, the rooster, the success line 0.5 s
       later with Next, the clocks now say their times;
     · Level 1 "6:00" into its swapped twin 12:30 → hintSwap;
     · "only 12, 3, 6, 9" → 4 numerals per face, 60 ticks still;
     · the keyboard: Enter on a card, Enter on a clock plugs it.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-drive-cables.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/drive-cables-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('drive-cables-activity.js', 'DriveCablesActivity', { DriveCablesCore: C });
const G = 'DriveCablesActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'drive-cables-activity.html', id: 'clock-digital.match-clocks.2-md-c-7', global: G, ready: '.dc-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, times, k, nums) => { await page.evaluate((g, times, k, nums) => { const a = window[g]; a.api.settings.times = times; a.api.settings.nums = nums || 'all'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, times, k, nums); await H.wait(40); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const attr = (page, sel, a) => page.evaluate((s, a) => { const e = document.querySelector(s); return e ? e.getAttribute(a) : null; }, sel, a);
  const plugTap = async (page, c, s) => { await L.click(page, 'card-' + c, 'card ' + c); await L.click(page, 'clock-' + s, 'clock ' + s); };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- at rest ---- */
    await go(page, '2', 7);
    const r = C.rounds('2')[7], lureS = r.layout.indexOf('L'), at = (c) => r.layout.indexOf(c);
    is(await count(page, '.dc-clock') === 4 && await count(page, '.dc-card') === 3 && await count(page, '.dc-lamp.is-on') === 0 && await count(page, '.dc-ghost') === 0, tag + ' at rest: 4 clocks, 3 cards, no lamp, no ghost');
    const cardTxt = await page.evaluate(() => [...document.querySelectorAll('.dc-lcd')].map((e) => e.textContent));
    is(cardTxt.join('|') === r.cards.map((t) => C.fmt(loc, t)).join('|'), tag + ' the cards read ' + cardTxt.join(' · '));
    const lureLabel = await attr(page, '[data-k="clock-' + lureS + '"]', 'aria-label');
    is(lureLabel.indexOf(C.fmt(loc, r.lure)) < 0 && sp(lureLabel) === sp(T(loc, 'aClockBetween', { n: lureS + 1, a: 1, b: 2, c: 9 })), tag + ' a clock is read by its hands: "' + lureLabel + '"');
    await L.click(page, 'clock-0', 'clock 0');
    is(sp(await note(page)) === sp(T(loc, 'hintPick')), tag + ' a clock tap with no card → hintPick');
    await L.click(page, 'check', 'check'); let s = await S(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintPlug')), tag + ' Check with nothing plugged → hintPlug, no miss');
    /* ---- plug: two taps, one drag ---- */
    await plugTap(page, 0, lureS); await plugTap(page, 1, at(1));
    await L.drag(page, '[data-k="card-2"]', '[data-k="clock-' + at(2) + '"]', 'drag card 2'); s = await S(page);
    is(s.plugs.join() === [lureS, at(1), at(2)].join(), tag + ' real taps and a real drag plug the cards (' + s.plugs.join() + ')');
    is(await count(page, '.dc-cable:not(.is-loose)') === 3, tag + ' three cables run to their sockets');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintHourHand')), tag + ' 12:45 in the 1:45 clock → hintHourHand');
    is(await attr(page, '[data-k="clock-' + lureS + '"] .dc-ghost', 'data-ghost') === String(r.cards[0]) && await count(page, '.dc-ghost') === 1, tag + ' the lure clock carries 12:45\'s ghost hands (and no other clock does)');
    is(await count(page, '[data-k="clock-' + lureS + '"] .dc-hhand.is-pulse') === 1 && await count(page, '[data-k="clock-' + lureS + '"] .dc-mhand.is-pulse') === 0, tag + ' only the hour hand blinks (the minutes agree)');
    is(await count(page, '.dc-lamp.is-on') === 2 && s.locked.join() === 'false,true,true', tag + ' two lamps lit, those pairs locked');
    await L.click(page, 'card-1', 'locked card'); is((await S(page)).plugs[1] === at(1), tag + ' a lit card does not move');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.help && sp(await note(page)) === sp(T(loc, 'hintHelp')), tag + ' a second miss → hintHelp');
    is(await count(page, '[data-k="clock-' + lureS + '"] .dc-dot') === 10 && await page.evaluate((sel) => [...document.querySelectorAll(sel + ' .dc-num.is-bold')].map((e) => e.textContent).join(), '[data-k="clock-' + lureS + '"]') === '1,12', tag + ' five-minute dots to the 9 and the bold numbers 12 and 1');
    /* ---- pull out, plug right ---- */
    await L.click(page, 'card-0', 'card 0'); await L.click(page, 'card-0', 'card 0 again'); s = await S(page);
    is(s.plugs[0] === null && s.verdict === null, tag + ' a double tap pulls 12:45 out and clears the ghosts');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await L.drag(page, '[data-k="card-0"]', '[data-k="clock-' + at(0) + '"]', 'drag card 0'); await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && await count(page, '.dc-lamp.is-on') === 3 && await count(page, '[data-rooster]') === 1, tag + ' solved: three lamps, the rooster');
    const tip = C.tipOf(r, loc), okLine = T(loc, 'okAll', { a: C.fmt(loc, r.cards[0]), b: C.fmt(loc, r.cards[1]), c: C.fmt(loc, r.cards[2]) }) + ' ' + T(loc, tip.key, tip.args);
    is(sp(await L.bubble(page)).indexOf(sp(okLine)) >= 0, tag + ' the success line "' + okLine + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    is(sp(await attr(page, '[data-k="clock-' + lureS + '"]', 'aria-label')) === sp(T(loc, 'aClockDone', { n: lureS + 1, time: C.fmt(loc, r.lure) })), tag + ' after success a clock says its time');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- swapped hands ---- */
    await go(page, '1', 3); const r1 = C.rounds('1')[3];
    await plugTap(page, 0, r1.layout.indexOf('L')); await plugTap(page, 1, r1.layout.indexOf(1)); await plugTap(page, 2, r1.layout.indexOf(2)); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintSwap')), tag + ' 6:00 into 12:30 → hintSwap');
    /* ---- only 12, 3, 6, 9 ---- */
    await go(page, '1', 0, 'quarters');
    is(await count(page, '[data-k="clock-0"] .dc-num') === 4 && await count(page, '[data-k="clock-0"] .dc-tick') === 60, tag + ' "only 12, 3, 6, 9": 4 numerals, 60 ticks');
    /* ---- the keyboard ---- */
    await go(page, '1', 0); await page.focus('[data-k="card-2"]'); await page.keyboard.press('Enter'); await page.focus('[data-k="clock-1"]'); await page.keyboard.press('Enter');
    is((await S(page)).plugs[2] === 1, tag + ' Enter on a card, Enter on a clock plugs it');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ready = (pg) => pg.waitForFunction((g) => window[g]._picsReady, {}, G);
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', s))(window[g]), G, src);
    const wrongPlug = "var r=a.st.round;a._plug(0,r.layout.indexOf('L'));a._plug(1,r.layout.indexOf(1));a._plug(2,r.layout.indexOf(2));";
    await L.sweep(loc, 'rest', async (pg) => { await ready(pg); await go(pg, '2', 7); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'miss', async (pg) => { await ready(pg); await go(pg, '2', 7); await ev(pg, wrongPlug + 'a._check();'); }, { miss: true, rest: true }, WIDTHS);
    await L.sweep(loc, 'help', async (pg) => { await ready(pg); await go(pg, '2', 7); await ev(pg, wrongPlug + 'a._check();a._check();'); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await ready(pg); await go(pg, '2', 7); await ev(pg, "var r=a.st.round;[0,1,2].forEach(function(c){a._plug(c,r.layout.indexOf(c))});a._check();"); }, {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-drive-cables'));
})().catch((e) => { console.error(e); process.exit(1); });
