#!/usr/bin/env node
/* =====================================================================
   local-test-snip-tape.js — ACTIVITY #155, The Snip-Out Tape ("Span's
   Length Gap", 2.MD.A.4), in a real browser with real pointer taps and
   real drags, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · caterpillar 5 / centipede 7: each picture's ink is exactly len × u
       long from the wall; Check with nothing → hintClips, no miss;
     · a real tap on the tape's upper half at 5 puts the orange clip there,
       its plumb line on the caterpillar's end; a real DRAG of the parked
       green clip to 7; the gap glows 2 cm wide; Check → hintType, no miss;
     · 1, 2 on the keypad → the readout says 12 cm; Check → the piece is
       snipped (2 cm in the tray, a hole in the tape), the dashed strip is
       12 cm, hintGhost; delete, 3 → miss 2 → one dot in each of the 2
       spaces, hintDots; 2 → solved: the success line 0.5 s later with
       Next, the 2-cm overhang glows, the keypad goes away;
     · key 7 / glue 10, the orange clip at 6 → hintClipA, the 1 cm it
       missed shaded;
     · loose starts: Check → hintWall before any clip, no miss; a real drag
       pushes the top thing to the wall, a tap pushes the bottom one;
     · the keyboard: arrows move a focused clip, digits type, Enter checks;
     · 0–20: the numerals are spaced when a cm is narrow, the tape fits.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-snip-tape.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/snip-tape-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('snip-tape-activity.js', 'SnipTapeActivity', { SnipTapeCore: C });
const sp = H.sp, wait = H.wait;

(async () => {
  const L = await H.local({ html: 'snip-tape-activity.html', id: 'span-length-gap.how-much-longer.2-md-a-4', global: 'SnipTapeActivity', ready: '.st-wrap' });
  const { is } = L.C;
  const ready = (page) => page.waitForFunction(() => window.SnipTapeActivity._picsReady, { timeout: 15000 });
  const force = async (page, ruler, k, starts) => {
    const ok = await page.evaluate((ruler, k, starts) => {
      const a = window.SnipTapeActivity; a.api.settings.ruler = ruler; a.api.settings.starts = starts || 'lined'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); window.scrollTo(0, 0);
      return a.st.k === k && a.st.level === ruler;
    }, ruler, k, starts);
    if (!ok) throw new Error('force ' + ruler + '/' + k);
  };
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.SnipTapeActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.st-note'); return { text: n.textContent, hint: n.classList.contains('is-hint') }; });
  const count = (page, sel) => page.$$eval(sel, (e) => e.length);
  const g = (page) => page.evaluate(() => { const a = window.SnipTapeActivity, b = document.querySelector('.st-board').getBoundingClientRect(); return { left: b.left, top: b.top, u: a._g.u, x0: a._g.x0, tapeY: a._g.tapeY, tapeH: a._g.tapeH, tapeEnd: a._g.tapeEnd, W: a._g.W }; });
  const rect = (page, sel) => page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height }; }, sel);
  /* a real tap on the tape at cm, upper half (orange) or lower half (green) */
  const tapTape = async (page, cm, half) => {
    await page.evaluate(() => document.querySelector('.st-board').scrollIntoView({ block: 'center' }));
    const q = await g(page), y = q.top + q.tapeY + (half === 'a' ? q.tapeH * 0.25 : q.tapeH * 0.75);
    await page.mouse.click(q.left + q.x0 + cm * q.u, y); await wait(30);
  };
  /* a real drag of a clip (or a thing) to a cm, or by dx px */
  const drag = async (page, sel, toX) => {
    await page.evaluate(() => document.querySelector('.st-board').scrollIntoView({ block: 'center' }));
    const r = await rect(page, sel), x0 = r.l + r.w / 2, y0 = r.t + r.h / 2;
    await page.mouse.move(x0, y0); await page.mouse.down();
    for (let i = 1; i <= 12; i++) await page.mouse.move(x0 + (toX - x0) * i / 12, y0);
    await page.mouse.up(); await wait(40);
  };
  const key = (page, d, what) => L.click(page, 'key-' + d, what);

  async function scenarios(loc) {
    const { page, errs } = await L.open(1024, loc); await ready(page);
    /* ---- caterpillar 5 / centipede 7 ---- */
    await force(page, '12', 0);
    is(sp(await L.prompt(page)) === sp(T(loc, 'taskLine')), loc + ' the task line');
    let q = await g(page);
    const ta = await rect(page, '[data-thing="a"]'), tb = await rect(page, '[data-thing="b"]');
    is(Math.abs(ta.w - 5 * q.u) < 1 && Math.abs(ta.l - (q.left + q.x0)) < 1.5, loc + ' the caterpillar is exactly 5 cm of tape long, from the wall (' + (ta.w / q.u).toFixed(2) + ')');
    is(Math.abs(tb.w - 7 * q.u) < 1 && Math.abs(tb.l - (q.left + q.x0)) < 1.5, loc + ' the centipede is exactly 7 cm long, from the wall');
    is((await count(page, '.st-clip.is-parked')) === 2, loc + ' both clips start parked off the tape');
    await L.click(page, 'check', loc);
    let n = await note(page), s = await st(page);
    is(sp(n.text) === sp(T(loc, 'hintClips')) && !n.hint && s.misses === 0, loc + ' nothing done → hintClips, no miss');
    await tapTape(page, 5, 'a');
    s = await st(page);
    is(s.clipA === 5 && s.clipB === null, loc + ' a real tap on the upper half of the tape at 5 puts the orange clip there');
    const pa = await rect(page, '[data-plumb="a"]'), taR = (await rect(page, '[data-thing="a"]')).r;
    is(pa && Math.abs(pa.l + pa.w / 2 - taR) < 1.5, loc + ' the orange plumb line touches the caterpillar\'s end');
    q = await g(page);
    await drag(page, '[data-k="clipB"]', q.left + q.x0 + 7 * q.u);
    s = await st(page);
    is(s.clipB === 7, loc + ' a real drag of the parked green clip lands it at 7 (' + s.clipB + ')');
    const glow = await rect(page, '[data-glow]');
    is(glow && Math.abs(glow.w - 2 * q.u) < 1.5, loc + ' the gap between the clips glows, 2 cm wide');
    await L.click(page, 'check', loc);
    s = await st(page);
    is(sp((await note(page)).text) === sp(T(loc, 'hintType')) && s.misses === 0, loc + ' clips right, nothing typed → hintType, no miss');
    await key(page, '1', loc); await key(page, '2', loc);
    is((await page.$eval('[data-read]', (e) => e.textContent.replace(/\s/g, ' '))) === '12 cm', loc + ' the readout says 12 cm');
    await L.click(page, 'check', loc);
    s = await st(page); n = await note(page);
    const piece = await rect(page, '[data-piece]'), ghost = await page.$eval('[data-ghost]', (e) => e.getAttribute('data-ghost'));
    is(s.verdict && s.verdict.kind === 'number' && sp(n.text) === sp(T(loc, 'hintGhost')) && n.hint, loc + ' 12 (the sum) → a number miss, hintGhost');
    is(piece && Math.abs(piece.w - 2 * q.u) < 1.5 && ghost === '12' && (await count(page, '[data-hole]')) === 1 && (await count(page, '[data-glow]')) === 0, loc + ' the 2-cm piece is snipped into the tray, a hole in the tape, the dashed strip is 12');
    await L.click(page, 'back', loc); await L.click(page, 'back', loc); await key(page, '3', loc);
    is((await count(page, '[data-ghost]')) === 0 && (await count(page, '[data-piece]')) === 0 && !(await note(page)).text, loc + ' a new number takes the snip, the strip and the hint away');
    await L.click(page, 'check', loc);
    s = await st(page);
    is(s.help && sp((await note(page)).text) === sp(T(loc, 'hintDots')) && (await count(page, '[data-dot]')) === 2, loc + ' miss 2 → one dot in each of the 2 spaces, hintDots');
    await page.evaluate(() => { window.SnipTapeActivity.OK_MS = 500; });
    await L.click(page, 'back', loc); await key(page, '2', loc); await L.click(page, 'check', loc);
    s = await st(page);
    const nb = await L.nextShown(page); await wait(900);
    is(s.done && !nb && await L.nextShown(page) && sp(await L.bubble(page)) === sp(T(loc, 'okBottom', { a: 7, b: 5, gap: 2 })), loc + ' solved: the success line and Next 0.5 s later');
    const over = await rect(page, '[data-over]');
    is(over && Math.abs(over.w - 2 * q.u) < 1.5 && Math.abs(over.l - (q.left + q.x0 + 5 * q.u)) < 1.5, loc + ' the 2-cm overhang past the caterpillar\'s end glows');
    is(!(await page.$eval('.st-pad', (e) => e.offsetParent !== null)), loc + ' the keypad goes away once solved');
    await page.evaluate(() => { window.SnipTapeActivity.OK_MS = 600000; });
    /* ---- key 7 / glue 10: the orange clip one short ---- */
    await force(page, '12', 1);
    await tapTape(page, 6, 'a'); await tapTape(page, 10, 'b'); await key(page, '3', loc); await L.click(page, 'check', loc);
    q = await g(page);
    const miss = await rect(page, '[data-missed="a"]');
    is(sp((await note(page)).text) === sp(T(loc, 'hintClipA')) && miss && Math.abs(miss.w - q.u) < 1.5, loc + ' the orange clip at 6 for a 7-cm key → hintClipA, the 1 cm it missed shaded');
    is((await count(page, '[data-notch="a"]')) === 1 && (await count(page, '[data-piece]')) === 0, loc + ' the real end gets a notch; nothing is snipped');
    /* ---- loose starts ---- */
    await force(page, '12', 0, 'loose');
    s = await st(page);
    is(s.startA === 2 && s.startB === 1 && (await count(page, 'button.st-thing')) === 2, loc + ' loose: the things start 2 and 1 cm off the wall');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintWall')) && (await st(page)).misses === 0, loc + ' loose, Check → hintWall first, no miss');
    q = await g(page);
    const tl = await rect(page, '[data-thing="a"]');
    await drag(page, '[data-thing="a"]', tl.l + tl.w / 2 - 2 * q.u);
    is((await st(page)).startA === 0, loc + ' a real drag pushes the top thing against the wall');
    await L.click(page, '[data-thing="b"]', loc);
    is((await st(page)).startB === 0, loc + ' a tap pushes the bottom thing against the wall');
    /* ---- the keyboard ---- */
    await force(page, '12', 0);
    await page.focus('[data-k="clipA"]'); for (let i = 0; i < 6; i++) await page.keyboard.press('ArrowRight');
    await page.focus('[data-k="clipB"]'); for (let i = 0; i < 8; i++) await page.keyboard.press('ArrowRight');
    s = await st(page);
    is(s.clipA === 5 && s.clipB === 7, loc + ' arrows move a focused clip (' + s.clipA + ', ' + s.clipB + ')');
    await page.focus('.st-wrap'); await page.keyboard.press('2'); await page.keyboard.press('Enter');
    is((await st(page)).done, loc + ' "2" and Enter solve it');
    /* ---- 0–20 ---- */
    await force(page, '20', 0);
    q = await g(page);
    const nums = await page.$$eval('.st-svg .st-num:not(.st-pnum)', (e) => e.map((x) => +x.textContent));
    is(q.u >= 24 ? nums.length === 21 : nums.every((v) => v % 2 === 0), loc + ' 0–20: every numeral when a cm is wide, every 2nd when it is narrow (u ' + q.u.toFixed(1) + ')');
    is(q.tapeEnd <= q.W, loc + ' 0–20: the tape fits the board');
    L.C.is(errs.length === 0, loc + ' scenarios: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  const run = (ruler, k, starts, src) => async (page) => { await ready(page); await force(page, ruler, k, starts); await page.evaluate((src) => { const t = window.SnipTapeActivity, r = t.st.round; (new Function('t', 'r', src))(t, r); }, src); };
  const SOLVE = 't._clip("a", r.a.len); t._clip("b", r.b.len); String(r.gap).split("").forEach(function (d) { t._type(d); });';
  const STATES = [
    ['rest', run('12', 0, 'lined', ''), { rest: true }],
    ['missed', run('12', 2, 'lined', 't._clip("a", r.a.len); t._clip("b", r.b.len); t._type("1"); t._type("7"); t._check();'), { miss: true }],
    ['helped', run('12', 7, 'lined', 't._clip("a", r.a.len); t._clip("b", r.b.len); t._type("9"); t._check(); t._back(); t._type("8"); t._check();'), { miss: true }],
    ['clipmiss', run('12', 5, 'lined', 't._clip("a", 11); t._clip("b", r.b.len); t._type("5"); t._check();'), { miss: true }],
    ['loose', run('12', 3, 'loose', 't._check();'), { rest: true }],
    ['solved', run('12', 4, 'lined', SOLVE + ' t._check();'), {}],
    ['ruler20', run('20', 1, 'lined', 't._clip("a", r.a.len); t._clip("b", r.b.len); t._type("4"); t._check();'), { miss: true }]
  ];
  for (const loc of LOCS) {
    const f0 = L.C.fail;
    await scenarios(loc);
    for (const [name, reach, opt] of STATES) await L.sweep(loc, name, reach, opt, WIDTHS);
    console.log(loc + ': ' + (L.C.fail === f0 ? 'ok' : (L.C.fail - f0) + ' fail'));
  }
  await L.close();
  process.exit(L.C.report('local-test-snip-tape'));
})().catch((e) => { console.error(e); process.exit(1); });
