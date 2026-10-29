#!/usr/bin/env node
/* =====================================================================
   local-test-run-on.js — ACTIVITY #163, The Run-On Test ("Set the Clock
   — Tell Time to the Nearest 5 Minutes", 2.MD.C.7), in a real browser
   with real pointer drags of both grips and the keyboard, in all 11
   locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024, five minutes, 9:20):
     · at rest the readout is empty and the gear out; Check → hintEmpty;
     · a real drag of the long grip to the 4 and of the short grip ONTO
       the 9: the readout stays empty while the hands are set;
     · Check → the readout says 9:20 and still the clock runs on crooked
       (the core point: digits right, short hand wrong) → hintShort, the
       gap shaded; Check again → hintChange, no second miss;
     · the keyboard: one step back on the short grip, Check → miss 2: the
       minute ring, the two slots, the :20 help line ("not quite halfway");
     · five steps forward → solved: the bell strikes 10 (ten marks), the
       10 lights, the success line, Next 0.5 s later;
     · a wrong long hand with a right short hand → hintLong, the teal ring;
     · settings: the minute ring on/off; the rim bolds 2 / 4 / 12 ticks.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-run-on.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/run-on-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('run-on-activity.js', 'RunOnActivity', { RunOnCore: C });
const G = 'RunOnActivity', sp = H.sp;
const K = (lv, h, m) => C.rounds(lv).findIndex((r) => r.h === h && r.m === m);

(async () => {
  const L = await H.local({ html: 'run-on-activity.html', id: 'clock.tell-time-5-min.2-md-c-7', global: G, ready: '.ro-wrap' });
  const { is } = L.C;
  const S = (page) => page.evaluate((g) => JSON.parse(JSON.stringify(window[g].st)), G);
  const go = async (page, times, k, ring) => { await page.evaluate((g, times, k, ring) => { const a = window[g]; a.api.settings.times = times; a.api.settings.ring = ring || 'off'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); }, G, times, k, ring); await H.wait(30); };
  const note = (page) => page.evaluate(() => document.querySelector('[data-qa="note"]').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const attr = (page, sel, a) => page.evaluate((s, a) => { const e = document.querySelector(s); return e ? e.getAttribute(a) : null; }, sel, a);
  /* a real drag: press the grip, move through the clock to the angle, release */
  const drag = async (page, which, ang) => {
    const p = await page.evaluate((w, a) => {
      const g = document.querySelector('[data-k="grip-' + w + '"]'); g.scrollIntoView({ block: 'center' });
      const b = g.getBoundingClientRect(), c = document.querySelector('.ro-clock').getBoundingClientRect(), k = c.width / 400, t = (a - 90) * Math.PI / 180, rad = w === 'long' ? 130 : 90;
      return { x0: b.left + b.width / 2, y0: b.top + b.height / 2, x1: c.left + (200 + rad * Math.cos(t)) * k, y1: c.top + (220 + rad * Math.sin(t)) * k };
    }, which, ang);
    await page.mouse.move(p.x0, p.y0); await page.mouse.down(); await page.mouse.move((p.x0 + p.x1) / 2, (p.y0 + p.y1) / 2, { steps: 5 }); await page.mouse.move(p.x1, p.y1, { steps: 5 }); await page.mouse.up(); await H.wait(40);
  };
  const keys = async (page, which, key, n) => { await page.focus('[data-k="grip-' + which + '"]'); for (let i = 0; i < n; i++) { await page.keyboard.press(key); await H.wait(10); } };

  for (const loc of LOCS) {
    const tag = '[' + loc + ']';
    const { page, errs } = await L.open(1024, loc);
    const k920 = K('five', 9, 20);
    await go(page, 'five', k920);
    let s = await S(page);
    is(await attr(page, '[data-readout]', 'data-readout') === '' && await attr(page, '[data-gear]', 'data-gear') === 'out' && !(s.long === 120 && s.short === 280), tag + ' at rest: the readout empty, the gear out, the hands not on the answer');
    is(sp(await page.evaluate(() => document.querySelector('[data-phrase]').textContent)) === sp(C.phrase(loc, 9, 20)), tag + ' the card says "' + C.phrase(loc, 9, 20) + '"');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), tag + ' Check before any move → hintEmpty, no miss');
    await drag(page, 'long', 120); await drag(page, 'short', 270); s = await S(page);
    is(s.long === 120 && s.short === 270, tag + ' real drags: the long hand on the 4, the short hand on the 9 (' + s.long + '/' + s.short + ')');
    is(await attr(page, '[data-readout]', 'data-readout') === '' && await attr(page, '[data-gear]', 'data-gear') === 'out', tag + ' nothing reads the hands while they are set');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(await attr(page, '[data-readout]', 'data-readout') === '9:20', tag + ' Check: the readout says 9:20');
    is(s.misses === 1 && s.verdict.kind === 'short' && await count(page, '[data-crooked]') === 1 && await count(page, '[data-clank]') === 1 && await count(page, '[data-stroke]') === 0, tag + ' …and the clock still runs on crooked: no bell');
    is(sp(await note(page)) === sp(T(loc, 'hintShort', C.args(s, loc))) && await count(page, '[data-gap="9"]') === 1, tag + ' hintShort, the gap between 9 and 10 shaded');
    await L.click(page, 'check', 'check again'); s = await S(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintChange')), tag + ' Check again unchanged → hintChange, no second miss');
    await keys(page, 'short', 'ArrowLeft', 1); s = await S(page);
    is(s.short === 267.5 && await attr(page, '[data-readout]', 'data-readout') === '', tag + ' the keyboard moves the short hand 2.5°, and the readout empties again');
    await L.click(page, 'check', 'check'); s = await S(page);
    is(s.help && sp(await note(page)) === sp(T(loc, 'helpLess', C.args(s, loc))) && await count(page, '[data-min]') === 11 && await count(page, '[data-slot]') === 2, tag + ' miss 2: the minute ring, both slots, helpLess');
    await page.evaluate((g) => { window[g].OK_MS = 500; }, G);
    await keys(page, 'short', 'ArrowRight', 5); await L.click(page, 'check', 'check'); await H.wait(900); s = await S(page);
    is(s.done && await count(page, '[data-stroke]') === 10 && await page.evaluate(() => (document.querySelector('.ro-num.is-lit') || {}).textContent) === '10', tag + ' 9:20 set right → solved: the bell strikes ten times, the 10 lights');
    const okLine = T(loc, C.okKey(s.round), C.args(s, loc));
    is(sp(await L.bubble(page)).indexOf(sp(okLine)) >= 0, tag + ' the success line "' + okLine + '"');
    is(await L.nextShown(page), tag + ' Next 0.5 s after the result');
    is(await page.evaluate(() => [...document.querySelectorAll('[data-k^="grip-"]')].every((b) => b.disabled)), tag + ' a solved clock takes no more moves');
    await page.evaluate((g) => { window[g].OK_MS = 600000; }, G);
    /* a wrong long hand, a right short hand */
    await go(page, 'five', k920); await drag(page, 'long', 150); await drag(page, 'short', 280); await L.click(page, 'check', 'check'); s = await S(page);
    is(s.verdict && s.verdict.kind === 'long' && sp(await note(page)) === sp(T(loc, 'hintLong', C.args(s, loc))) && await count(page, '[data-ring="20"]') === 1, tag + ' long hand on the 5 → hintLong, the teal ring at the 4');
    /* settings */
    await go(page, 'five', 0, 'on'); is(await count(page, '[data-min]') === 11, tag + ' the minute ring on');
    await go(page, 'five', 0, 'off'); is(await count(page, '[data-min]') === 0, tag + ' the minute ring off');
    const bold = []; for (const lv of ['oh', 'q', 'five']) { await go(page, lv, 0); bold.push(await count(page, '.ro-tick.is-bold')); }
    is(bold.join() === '2,4,12', tag + ' the rim bolds 2 / 4 / 12 marks by level (' + bold + ')');
    is(errs.length === 0, tag + ' no console errors ' + errs.slice(0, 2).join(' | '));
    await page.close();

    /* ---- each state reached once, then resized ---- */
    const ev = (pg, src) => pg.evaluate((g, s) => (new Function('a', s))(window[g]), G, src);
    await L.sweep(loc, 'rest', async (pg) => { await go(pg, 'five', k920); }, { rest: true }, WIDTHS);
    await L.sweep(loc, 'miss', async (pg) => { await go(pg, 'five', k920); await ev(pg, 'a._setLong(120);a._setShort(270);a._check();'); }, { miss: true, rest: true }, WIDTHS);
    await L.sweep(loc, 'help', async (pg) => { await go(pg, 'five', k920); await ev(pg, 'a._setLong(120);a._setShort(270);a._check();a._setShort(267.5);a._check();'); }, { miss: true }, WIDTHS);
    await L.sweep(loc, 'done', async (pg) => { await go(pg, 'five', k920); await ev(pg, 'a._setLong(120);a._setShort(280);a._check();'); }, {}, WIDTHS);
  }
  await L.close();
  process.exit(L.C.report('local-test-run-on'));
})().catch((e) => { console.error(e); process.exit(1); });
