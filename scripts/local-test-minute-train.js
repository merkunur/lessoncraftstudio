#!/usr/bin/env node
/* =====================================================================
   local-test-minute-train.js — ACTIVITY #161, The Minute Train ("Sprocket's
   Clock — Read the Clock to Five Minutes", 2.MD.C.7), in a real browser
   with real pointer taps, in all 11 locales.
   Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · 4:55: Check with empty boxes → hintBlank, no miss; eleven real taps
       on + build the train, the last roof says 55; a twelfth bumps the
       barrier (hintBump, the train stays 11); − sends one back; a tap on
       the tunnel sends it out again;
     · 5:55 written by real taps (the next hour) → hintNext: the train runs
       to the long hand and one pale carriage finishes the lap, the short
       hand steps onto the 5 for a moment; Check again unchanged →
       hintChange, no second miss; a changed answer, still wrong → miss 2:
       the right train with "?" on its last roof, the 4 bold, hintHelp;
     · 4:55 → solved: the success line 0.5 s later with Next, the rooster;
       free play: one more carriage closes the ring and the card says 5:00;
     · 3:20 written 3:04 → the child's train: four fifths of one carriage,
       hintMinutes; 4:15 (hands swapped) → the short hand outlined, hintHour;
     · 8:00 written 7:00 → hintHourOn (it is ON the 8);
     · roof numbers hidden: no roof numbers and no +5 sign;
     · the keyboard types digits.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-minute-train.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/minute-train-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('minute-train-activity.js', 'MinuteTrainActivity', { MinuteTrainCore: C });
const G = 'MinuteTrainActivity', sp = H.sp;
const K = (lv, h, m) => C.rounds(lv).findIndex((r) => r.h === h && r.m === m);

(async () => {
  const L = await H.local({ html: 'minute-train-activity.html', id: 'clock-digital.read-five-minute.2-md-c-7', global: G, ready: '.mt-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, times, k, roof) => { await page.evaluate((g, times, k, roof) => { const a = window[g]; a.api.settings.times = times; a.api.settings.roof = roof || 'shown'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, times, k, roof); await H.wait(30); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const attr = (page, sel, a) => page.evaluate((s, a) => { const e = document.querySelector(s); return e ? e.getAttribute(a) : null; }, sel, a);
  const type = async (page, digits) => { for (const d of digits) await L.click(page, 'key-' + d, 'key ' + d); };
  const write = async (page, hh, mm) => { await L.click(page, 'box-h', 'hour box'); await page.evaluate((g) => { const a = window[g]; a.st.h = ''; a.st.m = ''; a._render2(); }, G); await L.click(page, 'box-h', 'hour box'); await type(page, hh); await L.click(page, 'box-m', 'minute box'); await type(page, mm); };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    await page.waitForFunction((g) => window[g]._picsReady, { timeout: 15000 }, G);
    /* ---- 4:55 ---- */
    await go(page, '2', K('2', 4, 55));
    is(await count(page, '.mt-car') === 0 && (await S(page)).h === '' && (await S(page)).m === '', tag + ' at rest: an empty track, both boxes empty');
    await L.click(page, 'check', 'check'); let s = await S(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintBlank')), tag + ' Check with empty boxes → hintBlank, no miss');
    for (let i = 0; i < 11; i++) await L.click(page, 'add', 'add');
    is((await S(page)).cars === 11 && await page.evaluate(() => { const c = document.querySelectorAll('.mt-car'); return c[c.length - 1].textContent; }) === '55', tag + ' eleven real taps: the last roof says 55');
    await L.click(page, 'add', 'add'); s = await S(page);
    is(s.cars === 11 && sp(await note(page)) === sp(T(loc, 'hintBump')), tag + ' a twelfth carriage bumps the barrier (hintBump)');
    await L.click(page, 'remove', 'remove'); is((await S(page)).cars === 10, tag + ' − sends one back');
    await L.click(page, '.mt-tunnel', 'tunnel'); is((await S(page)).cars === 11, tag + ' a tap on the tunnel sends one out');
    await write(page, '5', '55'); s = await S(page);
    is(s.h === '5' && s.m === '55', tag + ' real taps write 5:55 (' + s.h + ':' + s.m + ')');
    await L.click(page, 'check', 'check'); await H.wait(60); s = await S(page);
    is(s.verdict && s.verdict.kind === 'nextHour' && sp(await note(page)) === sp(T(loc, 'hintNext')), tag + ' 5:55 for 4:55 → hintNext');
    is(await count(page, '.mt-car.is-lap') === 1 && await count(page, '.mt-car:not(.is-lap)') === 11 && await count(page, '[data-step]') === 1, tag + ' the train runs to the long hand, one pale carriage finishes the lap, the short hand steps on');
    await L.click(page, 'check', 'check again'); s = await S(page);
    is(s.misses === 1 && !s.help && sp(await note(page)) === sp(T(loc, 'hintChange')), tag + ' Check again unchanged → hintChange, no second miss');
    await L.click(page, 'back', 'back'); await type(page, '0'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.help && await page.evaluate(() => { const c = document.querySelectorAll('.mt-car.is-help'); return c.length + '/' + c[c.length - 1].textContent; }) === '11/?' && await page.evaluate(() => [...document.querySelectorAll('.mt-num.is-bold')].map((e) => e.textContent).join()) === '4' && sp(await note(page)) === sp(T(loc, 'hintHelp')), tag + ' miss 2: the right train with "?" on its last roof, the 4 bold, hintHelp');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await write(page, '4', '55'); await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && await count(page, '[data-rooster]') === 1, tag + ' 4:55 → solved, the rooster');
    const okLine = T(loc, C.okKey(s.round), C.okArgs(s.round, loc));
    is(sp(await L.bubble(page)).indexOf(sp(okLine)) >= 0, tag + ' the success line "' + okLine + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    await L.click(page, 'add', 'free play');
    is(await attr(page, '[data-k="box-h"]', 'data-value') === '5' && await attr(page, '[data-k="box-m"]', 'data-value') === '00' && (await attr(page, '.mt-train', 'data-cars')) === '0', tag + ' free play: one carriage closes the ring — the card says 5:00');
    /* ---- 3:20 ---- */
    await go(page, '2', K('2', 3, 20)); await write(page, '3', '04'); await L.click(page, 'check', 'check');
    is(await attr(page, '.mt-car.is-part', 'data-part') === '0.8' && sp(await note(page)) === sp(T(loc, 'hintMinutes')), tag + ' 3:04 → four fifths of one carriage, hintMinutes');
    await go(page, '2', K('2', 3, 20)); await write(page, '4', '15'); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict.kind === 'swap' && await count(page, '[data-outline]') === 1 && sp(await note(page)) === sp(T(loc, 'hintHour')), tag + ' 4:15 (hands swapped) → the short hand outlined, hintHour (' + JSON.stringify(s.verdict) + ' ' + s.h + ':' + s.m + ' / ' + await note(page) + ')');
    /* ---- 8:00 ---- */
    await go(page, '1', K('1', 8, 0)); await write(page, '7', '00'); await L.click(page, 'check', 'check');
    is(sp(await note(page)) === sp(T(loc, 'hintHourOn')), tag + ' 8:00 written 7:00 → hintHourOn');
    await L.click(page, 'add', 'add'); is((await S(page)).cars === 0, tag + ' on the hour the first carriage bumps');
    /* ---- roof numbers hidden ---- */
    await go(page, '1', 0, 'hidden'); await L.click(page, 'add', 'add');
    is(await count(page, '.mt-car') === 1 && await count(page, '.mt-roof') === 0 && await count(page, '[data-sign]') === 0, tag + ' roof numbers hidden: a plain carriage, no +5 sign');
    /* ---- the keyboard ---- */
    await go(page, '1', 0); await page.focus('[data-k="box-h"]'); await page.keyboard.type('315'); s = await S(page);
    is(s.h === '3' && s.m === '15', tag + ' the keyboard types 3:15 (' + s.h + ':' + s.m + ')');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ready = (pg) => pg.waitForFunction((g) => window[g]._picsReady, {}, G);
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', s))(window[g]), G, src);
    const k455 = K('2', 4, 55), W = "a._focus('h');'5'.split('').forEach(function(d){a._type(d)});a._focus('m');a._type('5');a._type('5');";
    await L.sweep(loc, 'rest', async (pg) => { await ready(pg); await go(pg, '2', k455); await ev(pg, 'for(var i=0;i<6;i++)a._add();'); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'miss', async (pg) => { await ready(pg); await go(pg, '2', k455); await ev(pg, W + 'a._check();'); }, { miss: true, rest: true }, WIDTHS);
    await L.sweep(loc, 'help', async (pg) => { await ready(pg); await go(pg, '2', k455); await ev(pg, W + "a._check();a._back();a._type('5');a._check();"); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await ready(pg); await go(pg, '2', k455); await ev(pg, "a._focus('h');a._type('4');a._type('5');a._type('5');a._check();"); }, {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-minute-train'));
})().catch((e) => { console.error(e); process.exit(1); });
