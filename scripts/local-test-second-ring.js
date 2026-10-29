#!/usr/bin/env node
/* =====================================================================
   local-test-second-ring.js — ACTIVITY #159, The Second Ring ("Sprocket's
   Clock — 12-Hour & 24-Hour", 2.MD.C.7 extended), in a real browser with
   real pointer taps on the number pad, the boxes and the day-part chips,
   in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · "3:00 p.m." (write it the 24-hour way): Check empty → hintBlank, no
       miss; 17:00 typed by real taps → the run to 17: the tag says 17,
       tokens 13…17 in the ring, the given time's outlines at 3, hintHour;
       a second miss → the given run with its last token face-down ("?")
       + hintHelpPm; 15:00 → solved: the hands land, the tag turns gold,
       15 stays in the ring, the success line 0.5 s later with Next;
     · 8:00 in the morning written as 20:00 ("always add 12") → the run
       passes the sun: hintPastNoon;
     · "20:00" (write it the 12-hour way): no chip → hintPart, no miss;
       the locale's chip → solved; the chips appear only on 12-hour
       answers;
     · midnight written 24:00 → hintMidnight; 00:00 → solved, 0 kept;
       noon with a morning chip → hintNoon;
     · "empties every round": the next round's ring is empty;
     · the physical keyboard types digits.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-second-ring.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/second-ring-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('second-ring-activity.js', 'SecondRingActivity', { SecondRingCore: C });
const G = 'SecondRingActivity', sp = H.sp;

(async () => {
  const L = await H.local({ html: 'second-ring-activity.html', id: 'clock-convert.12-24.2-md-c-7', global: G, ready: '.sr-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, times, h24, ring) => { await page.evaluate((g, times, h24, ring) => { const a = window[g]; a.api.settings.times = times; a.api.settings.ring = ring || 'keep'; a._pool = null; a._ensurePool(); a._start(a._pool.findIndex((r) => r.h24 === h24)); a._render2(); }, G, times, h24, ring); await H.wait(30); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const attr = (page, sel, a) => page.evaluate((s, a) => { const e = document.querySelector(s); return e ? e.getAttribute(a) : null; }, sel, a);
  const type = async (page, digits) => { for (const d of digits) await L.click(page, 'key-' + d, 'key ' + d); };
  const write = async (page, hh, mm) => { await L.click(page, 'box-h', 'hour box'); await type(page, hh); await L.click(page, 'box-m', 'minute box'); await type(page, mm); };
  const clearBoxes = async (page) => { for (let i = 0; i < 5; i++) await page.evaluate((g) => window[g]._back(), G); };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- 3:00 p.m. → 15:00 ---- */
    await go(page, '1', 15);
    const r15 = C.rounds('1', loc).find((r) => r.h24 === 15);
    is(sp(await page.evaluate(() => document.querySelector('.sr-given').textContent)) === sp(r15.given) && await count(page, '.sr-chip') === 0, tag + ' the open card says "' + r15.given + '"; no chips on a 24-hour answer');
    is(await count(page, '.sr-tag') === 0, tag + ' at rest no tag (it would give the answer away)');
    await L.click(page, 'check', 'check'); let s = await S(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintBlank')), tag + ' Check empty → hintBlank, no miss');
    await write(page, '17', '00'); s = await S(page);
    is(s.h === '17' && s.m === '00' && await attr(page, '[data-k="box-h"]', 'data-value') === '17', tag + ' real taps write 17:00 (' + s.h + ':' + s.m + ')');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict && s.verdict.kind === 'hour' && sp(await note(page)) === sp(T(loc, 'hintHour')), tag + ' 17:00 for 15:00 → hintHour');
    is(await attr(page, '.sr-tag', 'data-tag') === '17' && await count(page, '[data-token]') === 5 && await attr(page, '[data-given-hour]', 'data-given-hour') === '90' && await count(page, '.sr-hhand.is-outline') === 1, tag + ' the run: the tag says 17, tokens 13…17, the given hour as an outline at 3');
    await clearBoxes(page); await write(page, '17', '00'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.help && await attr(page, '[data-socket="15"]', 'data-token') === '?' && await count(page, '.sr-socket.is-ghost') === 2 && sp(await note(page)) === sp(T(loc, 'hintHelpPm')), tag + ' miss 2 → the given run: 13, 14 and a face-down "?" at 15 + hintHelpPm');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await clearBoxes(page); await write(page, '15', '00'); await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && await count(page, '.sr-tag.is-gold') === 1 && await attr(page, '[data-socket="15"]', 'data-token') === '15' && await count(page, '[data-token]') === 1, tag + ' 15:00 → solved: the tag gold, only 15 stays in the ring');
    is(sp(await L.bubble(page)).indexOf(sp(T(loc, 'ok_to24', C.okArgs(r15, loc)))) >= 0, tag + ' the success line "' + T(loc, 'ok_to24', C.okArgs(r15, loc)) + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* ---- the ring keeps 15 into the next round ---- */
    /* the next round as the shell moves on: same settings, same pool, same ring */
    await page.evaluate((g) => { const a = window[g]; a._start(a._pool.findIndex((r) => r.h24 === 8)); a._render2(); }, G);
    is(await attr(page, '[data-socket="15"]', 'data-token') === '15', tag + ' the ring keeps 15 into the next round');
    await write(page, '20', '00'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict && s.verdict.kind === 'pastNoon' && sp(await note(page)) === sp(T(loc, 'hintPastNoon')) && await count(page, '[data-mark="sun"]') === 1, tag + ' 20:00 for a morning 8 → the run passes the sun: hintPastNoon');
    /* ---- 20:00 → the 12-hour way ---- */
    await go(page, '1', 20); const r20 = C.rounds('1', loc).find((r) => r.h24 === 20);
    is(await count(page, '.sr-chip') === C.chips(loc).length, tag + ' a 12-hour answer shows the ' + C.chips(loc).length + ' day-part chips');
    await write(page, '8', '00'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintPart')), tag + ' no chip → hintPart, no miss');
    await L.click(page, 'chip-' + r20.accepted[0], 'chip'); is(await attr(page, '[data-k="chip-' + r20.accepted[0] + '"]', 'aria-pressed') === 'true', tag + ' a real tap chooses "' + C.chip(loc, r20.accepted[0]).label + '"');
    await L.click(page, 'check', 'check'); is((await S(page)).done, tag + ' 8:00 ' + C.chip(loc, r20.accepted[0]).label + ' is 20:00');
    /* ---- midnight and noon ---- */
    await go(page, '2', 0); await write(page, '24', '00'); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintMidnight')), tag + ' midnight as 24:00 → hintMidnight');
    await clearBoxes(page); await write(page, '00', '00'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.done && await attr(page, '[data-socket="0"]', 'data-token') === '0', tag + ' 00:00 → solved, 0 sits under the 12');
    await go(page, '2', 12); await write(page, '12', '00'); const am = C.chips(loc).find((c) => !c.hours.includes(12) && c.hours.includes(0));
    if (am) { await L.click(page, 'chip-' + am.key, 'chip'); await L.click(page, 'check', 'check'); is(sp(await note(page)) === sp(T(loc, 'hintNoon')), tag + ' noon with "' + am.label + '" → hintNoon'); }
    /* ---- empties every round ---- */
    await go(page, '1', 15, 'empty'); await page.evaluate((g) => { const a = window[g]; '1500'.split('').forEach((d, i) => { if (i === 2) a._focus('m'); a._type(d); }); a._check(); }, G);
    await go(page, '1', 21, 'empty'); is(await count(page, '[data-token]') === 0, tag + ' "empties every round": the next ring is empty');
    /* ---- the keyboard ---- */
    await go(page, '1', 21); await page.focus('[data-k="box-h"]'); await page.keyboard.type('2130'); s = await S(page);
    is(s.h === '21' && s.m === '30', tag + ' the keyboard types 21:30 (' + s.h + ':' + s.m + ')');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ready = (pg) => pg.waitForFunction((g) => window[g]._picsReady, {}, G);
    const ev = (pg, fn) => pg.evaluate((g, src) => (new Function('a', src))(window[g]), G, fn);
    await L.sweep(loc, 'rest', async (pg) => { await ready(pg); await go(pg, '1', 15); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'miss', async (pg) => { await ready(pg); await go(pg, '1', 15); await ev(pg, "'17'.split('').forEach(function(d){a._type(d)});a._focus('m');a._type('0');a._type('0');a._check();"); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'help', async (pg) => { await ready(pg); await go(pg, '1', 15); await ev(pg, "'17'.split('').forEach(function(d){a._type(d)});a._focus('m');a._type('0');a._type('0');a._check();a._back();a._type('0');a._check();"); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await ready(pg); await go(pg, '1', 15); await ev(pg, "'15'.split('').forEach(function(d){a._type(d)});a._focus('m');a._type('0');a._type('0');a._check();"); }, {}, WIDTHS);
    await L.sweep(loc, 'chips', async (pg) => { await ready(pg); await go(pg, '1', 23); await ev(pg, "a._type('1');a._type('1');a._focus('m');a._type('0');a._type('0');a._check();a._check();"); }, { rest: true }, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-second-ring'));
})().catch((e) => { console.error(e); process.exit(1); });
