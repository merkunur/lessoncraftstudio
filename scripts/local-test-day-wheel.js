#!/usr/bin/env node
/* =====================================================================
   local-test-day-wheel.js — ACTIVITY #158, The Day Wheel ("Sprocket's
   Clock", 2.MD.C.7), in a real browser with real pointer drags round the
   clock face and real taps, in all 11 locales. Plumbing:
   scripts/lib/activity-harness.js.
   Scenarios per locale (1024), round "You eat breakfast. 7:00":
     · Check at midnight → hintIdle, no miss; the badge and the readout
       show midnight (the a.m. lap);
     · a real DRAG of the hour hand 210° clockwise → 7:00, gold window;
       one more lap (360°) → 7:00 again, but violet: the lap miss
       (hintLap, the window ringed); a second Check → the dashed arrow
       one lap back + hintBack; a real drag one lap back → solved: the
       picture seats on the wheel, the stamp, the rooster, the success
       line 0.5 s later with Next;
     · a wrong time (8:00) → hintTime naming both times, both underlined;
     · the stop pin: dragging back from midnight stays at midnight;
     · the keyboard (arrows ±1 h, Page Up +6 h);
     · half hours: the two riddles — 12:30 after midnight is the FIRST
       stop, 12:30 after noon one lap on;
     · the label clue: the card says the time with its day-part, the
       picture under a flap, the badge colour-only; the flap lifts on
       success;
     · es and it print the later evening (dinner 7:00, bed 9:00).
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-day-wheel.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/day-wheel-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('day-wheel-activity.js', 'DayWheelActivity', { DayWheelCore: C });
const G = 'DayWheelActivity', sp = H.sp, cap = (x) => x.charAt(0).toUpperCase() + x.slice(1);

(async () => {
  const L = await H.local({ html: 'day-wheel-activity.html', id: 'clock-ampm.morning-or-night.2-md-c-7', global: G, ready: '.dw-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, times, key, clue) => { await page.evaluate((g, times, key, clue) => { const a = window[g]; a.api.settings.times = times; a.api.settings.clue = clue || 'what'; a._pool = null; a._ensurePool(); const k = a._pool.findIndex((r) => r.key === key); a._start(k); a._render2(); }, G, times, key, clue); await H.wait(40); };
  const q = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  const attr = (page, sel, a) => page.evaluate((s, a) => { const e = document.querySelector(s); return e ? e.getAttribute(a) : null; }, sel, a);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  /* a real pointer drag round the face, clockwise from angle a0 by `deg` degrees (negative = back) */
  const wind = async (page, a0, deg) => {
    await page.evaluate(() => document.querySelector('.dw-clock').scrollIntoView({ block: 'center' }));
    const b = await (await page.$('.dw-clock')).boundingBox(), cx = b.x + b.width / 2, cy = b.y + b.height / 2, r = b.width * 0.3;
    const at = (a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
    let p = at(a0); await page.mouse.move(p[0], p[1]); await page.mouse.down();
    const n = Math.max(4, Math.ceil(Math.abs(deg) / 6));
    for (let i = 1; i <= n; i++) { p = at(a0 + deg * i / n); await page.mouse.move(p[0], p[1]); }
    await page.mouse.up(); await H.wait(40);
  };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    await go(page, '1', 'breakfast');
    is(sp(await q(page, '[data-qa="sentence"]')) === sp(T(loc, 's_breakfast')) && sp(await q(page, '[data-qa="cardtime"]')) === sp(C.fmt(loc, 420)), tag + ' the card: breakfast, ' + C.fmt(loc, 420));
    is(sp(await q(page, '.dw-badge')) === sp(C.part(loc, 0)) && sp(await q(page, '[data-qa="readout"]')) === sp(C.fmt(loc, 0)) && await attr(page, '.dw-badge', 'data-lap') === 'am', tag + ' midnight: the badge says "' + C.part(loc, 0) + '" in gold, the readout 12');
    await L.click(page, 'check', 'check');
    let s = await S(page);
    is(s.misses === 0 && sp(await q(page, '[data-qa="note"]')) === sp(T(loc, 'hintIdle')), tag + ' Check at midnight → hintIdle, no miss');
    await wind(page, 0, 210); s = await S(page);
    is(s.minutes === 420 && await attr(page, '[data-window]', 'data-window') === 'am' && sp(await q(page, '.dw-badge')) === sp(C.part(loc, 420)), tag + ' a real drag of 210° → 7:00 in the gold lap (' + s.minutes + ')');
    await wind(page, 210, 360); s = await S(page);
    is(s.minutes === 1140 && await attr(page, '[data-window]', 'data-window') === 'pm' && sp(await q(page, '[data-qa="readout"]')) === sp(C.fmt(loc, 420)), tag + ' one more lap → the SAME face, now the violet lap (' + s.minutes + ')');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict && s.verdict.kind === 'lap' && sp(await q(page, '[data-qa="note"]')) === sp(T(loc, 'hintLap')) && await count(page, '.dw-winframe.is-wrong') === 1, tag + ' the right time in the wrong lap → hintLap, the window ringed');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.help && await attr(page, '[data-ghost]', 'data-ghost') === 'back' && sp(await q(page, '[data-qa="note"]')) === sp(T(loc, 'hintBack')), tag + ' a second miss → the dashed arrow one lap back + hintBack');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await wind(page, 210, -360); await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && s.minutes === 420 && await count(page, '[data-seat]') === 1 && await count(page, '[data-stamp]') === 1 && await count(page, '.dw-rooster.is-crow') === 1, tag + ' one lap back → solved: the picture seats on the wheel, the stamp, the rooster');
    is(sp(await L.bubble(page)).indexOf(sp(T(loc, 'ok_breakfast', { say: cap(C.spoken(loc, 420)) }))) >= 0, tag + ' the success line "' + T(loc, 'ok_breakfast', { say: cap(C.spoken(loc, 420)) }) + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* a wrong time */
    await go(page, '1', 'breakfast'); await wind(page, 0, 240); await L.click(page, 'check', 'check');
    is(sp(await q(page, '[data-qa="note"]')) === sp(T(loc, 'hintTime', { card: C.fmt(loc, 420), set: C.fmt(loc, 480) })) && await count(page, '.dw-ttime.is-mark') === 1 && await count(page, '.dw-readout.is-mark') === 1, tag + ' 8:00 for 7:00 → hintTime, both times underlined');
    /* the stop pin */
    await go(page, '1', 'breakfast'); await wind(page, 0, -90); s = await S(page);
    is(s.minutes === 0, tag + ' dragging back from midnight stays at midnight (' + s.minutes + ')');
    await wind(page, 0, 345); await wind(page, 345, 345); await wind(page, 330, 120); s = await S(page);
    is(s.minutes === 1380, tag + ' the second midnight pin stops the day at 11 (' + s.minutes + ')');
    /* the keyboard */
    await go(page, '1', 'breakfast');
    await page.focus('[data-k="hand"]'); for (let i = 0; i < 3; i++) await page.keyboard.press('ArrowRight'); await page.keyboard.press('PageUp'); s = await S(page);
    is(s.minutes === 540, tag + ' keyboard: three arrows and Page Up → 9:00 (' + s.minutes + ')');
    /* half hours: the riddles */
    await go(page, '2', 'riddleAm');
    is(await count(page, '.dw-tpic') === 0 && sp(await q(page, '[data-qa="sentence"]')) === sp(T(loc, 's_riddleAm')), tag + ' a riddle card has no picture');
    await wind(page, 0, 15); s = await S(page);
    is(s.minutes === 30, tag + ' half hours snap: 15° → 12:30 (' + s.minutes + ')');
    await L.click(page, 'check', 'check'); is((await S(page)).done, tag + ' half an hour after midnight is the FIRST stop');
    await go(page, '2', 'riddlePm'); await wind(page, 0, 15); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict && s.verdict.kind === 'lap', tag + ' half an hour after noon is NOT the first 12:30');
    await wind(page, 15, 360); await L.click(page, 'check', 'check'); is((await S(page)).done, tag + ' …it is one lap on');
    /* the label clue */
    await go(page, '1', 'story', 'label'); const rs = C.rounds('1', loc).find((r) => r.key === 'story');
    is(sp(await q(page, '[data-qa="cardtime"]')) === sp(C.spoken(loc, rs.answer)) && await count(page, '[data-flap]') === 1 && await count(page, '.dw-tpic') === 0 && sp(await q(page, '.dw-badge')) === '', tag + ' label clue: the card says "' + C.spoken(loc, rs.answer) + '", the picture under a flap, the badge colour-only');
    await wind(page, 0, (rs.answer % 720) / 2 + 360); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.done && await count(page, '[data-flap]') === 0 && await count(page, '.dw-tpic') === 1 && sp(await q(page, '[data-qa="sentence"]')) === sp(T(loc, 's_story')), tag + ' on success the flap lifts: the picture and what happens then');
    if (loc === 'es' || loc === 'it') { await go(page, '1', 'bed'); is(sp(await q(page, '[data-qa="cardtime"]')) === sp(C.fmt(loc, 21 * 60)), tag + ' bed is at 9:00 (the later evening)'); }
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* each state reached once, then resized */
    const ready = (pg) => pg.waitForFunction((g) => window[g]._picsReady, {}, G);
    await L.sweep(loc, 'rest', async (pg) => { await ready(pg); await go(pg, '1', 'breakfast'); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'lapmiss', async (pg) => { await ready(pg); await go(pg, '1', 'breakfast'); await pg.evaluate((g) => { const a = window[g]; a._wind(1140); a._check(); a._check(); }, G); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await ready(pg); await go(pg, '1', 'breakfast'); await pg.evaluate((g) => { const a = window[g]; a._wind(420); a._check(); }, G); }, {}, WIDTHS);
    await L.sweep(loc, 'label', async (pg) => { await ready(pg); await go(pg, '1', 'story', 'label'); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'riddle', async (pg) => { await ready(pg); await go(pg, '2', 'riddlePm'); await pg.evaluate((g) => { const a = window[g]; a._wind(30); a._check(); }, G); }, { miss: true }, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-day-wheel'));
})().catch((e) => { console.error(e); process.exit(1); });
