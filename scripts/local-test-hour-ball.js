#!/usr/bin/env node
/* =====================================================================
   local-test-hour-ball.js — ACTIVITY #162, The Hour Ball ("Sprocket's
   Clock — Read the Clock to the Quarter-Hour", 2.MD.C.7), in a real
   browser with real pointer taps and a real drag, in all 11 locales.
   Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · 9:45: at rest the lid is shut, the tray face-down, the waiting ball
       blank; Check with no card → hintEmpty; a real tap on 10:45 posts a
       10-marble over the lid and a pin at :45; Check → hintLater: the cup
       holds 9, the waiting ball shows 10; Check again → hintChange; 9:15
       → miss 2: the run-on, then hintHelpTo with the locale's phrase;
       9:45 → solved: Sprocket, the success line 0.5 s later with Next;
       the clock runs on a quarter and ball 10 drops; a real drag of the
       long hand back across the 12 rolls it back up (cup 9);
     · 3:15: 2:15 → hintEarlier, the tray ball 2 marked; 3:45 → hintMinutes,
       the dotted gap;
     · the tray hidden; five-minute times mark twelve bold ticks;
     · the keyboard: arrows move along the cards, Enter posts.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-hour-ball.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/hour-ball-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('hour-ball-activity.js', 'HourBallActivity', { HourBallCore: C });
const G = 'HourBallActivity', sp = H.sp;
const K = (lv, h, m) => C.rounds(lv).findIndex((r) => r.h === h && r.m === m);

(async () => {
  const L = await H.local({ html: 'hour-ball-activity.html', id: 'clock-digital.read-quarter-hour.2-md-c-7', global: G, ready: '.hb-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, times, k, tray) => { await page.evaluate((g, times, k, tray) => { const a = window[g]; a.api.settings.times = times; a.api.settings.tray = tray || 'show'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, times, k, tray); await H.wait(30); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const attr = (page, sel, a) => page.evaluate((s, a) => { const e = document.querySelector(s); return e ? e.getAttribute(a) : null; }, sel, a);
  /* tap the card that shows h:m, wherever the shuffle put it */
  const card = async (page, h, m) => { const i = (await S(page)).round.cards.findIndex((c) => c.h === h && c.m === m); await L.click(page, '.hb-card[data-card="' + i + '"]', 'card ' + h + ':' + m); };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- 9:45 ---- */
    await go(page, '1', K('1', 9, 45));
    is(await count(page, '[data-lid="shut"]') === 1 && await count(page, '[data-cup]') === 0 && await count(page, '[data-tray-ball=""]') === 2 && await attr(page, '[data-waiting]', 'data-waiting') === '', tag + ' at rest: the lid shut, the tray face-down, the waiting ball blank');
    is(await page.evaluate(() => /\b9\b/.test(document.querySelector('.hb-srtext').textContent) && !/9[:.]45/.test(document.querySelector('.hb-srtext').textContent)), tag + ' the clock is read aloud by its hands, never its time');
    await L.click(page, 'check', 'check'); let s = await S(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), tag + ' Check with no card → hintEmpty, no miss');
    await card(page, 10, 45);
    is(await attr(page, '[data-marble]', 'data-marble') === '10' && await attr(page, '[data-pin]', 'data-pin') === '45' && await count(page, '[data-lid="shut"]') === 1, tag + ' a real tap on 10:45 posts a 10-marble over the shut lid and a pin at :45');
    await L.click(page, 'check', 'check'); s = await S(page);
    const a1 = C.hintArgs(s); a1.phrase = C.phrase(loc, 9, 45);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintLater', a1)) && await attr(page, '[data-cup]', 'data-cup') === '9' && await attr(page, '[data-waiting]', 'data-waiting') === '10', tag + ' 10:45 → hintLater: the cup holds 9, ball 10 still waiting at the top');
    await L.click(page, 'check', 'check again'); s = await S(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintChange')), tag + ' Check again with the same card → hintChange, no second miss');
    await card(page, 9, 15); await L.click(page, 'check', 'check'); await H.wait(60); s = await S(page);
    is(s.help && sp(await note(page)) === sp(T(loc, 'hintHelpTo', { h: 9, h1: 10, phrase: C.phrase(loc, 9, 45) })), tag + ' a second miss → the run-on, then hintHelpTo with "' + C.phrase(loc, 9, 45) + '"');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await card(page, 9, 45); await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && await count(page, '[data-rooster]') === 1, tag + ' 9:45 → solved, Sprocket');
    const okLine = T(loc, C.okKey(s.round), C.okArgs(s.round, loc));
    is(sp(await L.bubble(page)).indexOf(sp(okLine)) >= 0, tag + ' the success line "' + okLine + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    is(await attr(page, '[data-cup]', 'data-cup') === '10' && (await attr(page, '.hb-mhand', 'data-minute')) === '0', tag + ' the clock ran on a quarter: the long hand on the 12, ball 10 dropped');
    /* a real drag of the long hand from the 12 back to the 9 crosses the 12 backwards */
    const pts = await page.evaluate(() => { const r = document.querySelector('.hb-run').getBoundingClientRect(), k = r.width / 340; return { x0: r.left + 165 * k, y0: r.top + (205 - 108) * k, x1: r.left + (165 - 108) * k, y1: r.top + 205 * k, xm: r.left + (165 - 76) * k, ym: r.top + (205 - 76) * k }; });
    await page.mouse.move(pts.x0, pts.y0); await page.mouse.down(); await page.mouse.move(pts.xm, pts.ym, { steps: 6 }); await page.mouse.move(pts.x1, pts.y1, { steps: 6 }); await page.mouse.up(); await H.wait(60);
    is(await attr(page, '[data-cup]', 'data-cup') === '9' && (await attr(page, '.hb-mhand', 'data-minute')) === '270', tag + ' a real drag of the long hand back to the 9: ball 10 rolls back up, the cup holds 9');
    /* ---- 3:15 ---- */
    await go(page, '1', K('1', 3, 15)); await card(page, 2, 15); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintEarlier', { g: 2, h: 3 })) && await count(page, '.hb-ball.is-marked[data-tray-ball="2"]') === 1, tag + ' 2:15 → hintEarlier, tray ball 2 marked');
    await go(page, '1', K('1', 3, 15)); await card(page, 3, 45); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintMinutes', { n: 3, p: 9 })) && await count(page, '[data-gap]') === 1 && await count(page, '.hb-ball.is-marble') === 0, tag + ' 3:45 → hintMinutes, the dotted gap; the right hour clicks into the cup');
    /* ---- settings ---- */
    await go(page, '1', 0, 'hide'); is(await count(page, '[data-tray]') === 0, tag + ' the tray hidden');
    await go(page, '1', 0); const b1 = await count(page, '.hb-tick.is-bold'); await go(page, '2', 0); const b2 = await count(page, '.hb-tick.is-bold');
    is(b1 === 4 && b2 === 12, tag + ' quarter hours mark 4 bold ticks, five minutes 12 (' + b1 + '/' + b2 + ')');
    /* ---- the keyboard ---- */
    await go(page, '1', 0); await page.focus('[data-k="card-0"]'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter'); s = await S(page);
    is(s.posted === (await page.evaluate(() => +document.querySelector('[data-k="card-1"]').getAttribute('data-card'))), tag + ' arrows move along the cards, Enter posts');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ready = (pg) => pg.waitForFunction((g) => window[g]._picsReady, {}, G);
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', s))(window[g]), G, src);
    const k945 = K('1', 9, 45), idx = (h, m) => C.rounds('1')[k945].cards.findIndex((c) => c.h === h && c.m === m);
    await L.sweep(loc, 'rest', async (pg) => { await ready(pg); await go(pg, '1', k945); await ev(pg, 'a._post(' + idx(10, 45) + ');'); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'miss', async (pg) => { await ready(pg); await go(pg, '1', k945); await ev(pg, 'a._post(' + idx(10, 45) + ');a._check();'); }, { miss: true, rest: true }, WIDTHS);
    await L.sweep(loc, 'help', async (pg) => { await ready(pg); await go(pg, '1', k945); await ev(pg, 'a._post(' + idx(10, 45) + ');a._check();a._post(' + idx(9, 15) + ');a._check();'); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await ready(pg); await go(pg, '1', k945); await ev(pg, 'a._post(' + idx(9, 45) + ');a._check();'); }, {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-hour-ball'));
})().catch((e) => { console.error(e); process.exit(1); });
