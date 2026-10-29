#!/usr/bin/env node
/* =====================================================================
   local-test-cm-cutter.js — ACTIVITY #153, The CM Cutter ("Tildy's Tailor
   Shop", 2.MD.A.1), in a real browser with real pointer taps and real
   drags, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   Scenarios per locale (1024):
     · ribbon 0 → 7, the cat left the 0 at 3: Check with nothing tapped →
       hintRead, no miss; a real tap on the numeral 4 (at the strip's end
       as the ruler lies) → Check: a 3-cm stub drawn from the strip's start,
       4 pieces in the jar, hintStub;
     · a real drag of the ruler 3 cm left → the 0 at the strip, the cut and
       the hint gone, the reading tag moved WITH the ruler; a tap on 7 →
       solved: the success line, Next 0.5 s later, 7 pieces, one strip on
       the rail;
     · NO ALIGNMENT LAMP: the table's drawing at the right spot and one
       centimetre off differs only in positions, never in its classes;
     · cord, the 0 left before the strip: two air puffs, hintAir;
     · leather aligned but misread → hintJar with the jar's 5; miss 2 →
       hintEnd and the line at the end;
     · broken ruler (2 → 8): real taps stitch eight spaces → the count tag
       8; Check → hintStitchPast, two puffs, 6 pieces; two taps undo the
       extra stitches → solved with okBroken;
     · Tildy's round: the task line with her 6, her "6 cm" by her picture;
     · the shelf (leather 0 → 14, rulers 10 · 12 · 15): Check → hintPick;
       the 12 picked lands at the table edge; dragged to the strip, 12 read
       → a tail, hintShort; the 15 picked, dragged, 14 read → solved;
     · the keyboard: ← × 4 and "8", Enter solve the denim round;
     · "only 0, 5, 10 …": the ruler prints 0, 5, 10.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-cm-cutter.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/cm-cutter-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('cm-cutter-activity.js', 'CmCutterActivity', { CmCutterCore: C });
const sp = H.sp, wait = H.wait;

(async () => {
  const L = await H.local({ html: 'cm-cutter-activity.html', id: 'tildy.measure-ruler.2-md-a-1', global: 'CmCutterActivity', ready: '.cc-wrap' });
  const { is } = L.C;
  const ready = (page) => page.waitForFunction(() => window.CmCutterActivity._picsReady, { timeout: 15000 });
  const force = async (page, level, k, numbers, rack) => {
    const ok = await page.evaluate((level, k, numbers, rack) => {
      const a = window.CmCutterActivity; a.api.settings.level = level; a.api.settings.numbers = numbers || 'every'; a._pool = null; a._ensurePool(); a._racks = rack ? { [k]: rack } : {}; a._start(k); a._render2(); window.scrollTo(0, 0);
      return a.st.k === k && a.st.level === level;
    }, level, k, numbers, rack);
    if (!ok) throw new Error('force ' + level + k);
  };
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.CmCutterActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.cc-note'); return { text: n.textContent, hint: n.classList.contains('is-hint') }; });
  const count = (page, sel) => page.$$eval(sel, (e) => e.length);
  const tickX = (page, i) => page.evaluate((i) => { const t = document.querySelector('.cc-tick[data-tick="' + i + '"]'); const r = t.getBoundingClientRect(); return r.left + r.width / 2; }, i);
  const rulerY = (page) => page.evaluate(() => { const b = document.querySelector('.cc-band'); b.scrollIntoView({ block: 'center' }); const r = document.querySelector('.cc-tablesvg .cc-ruler').getBoundingClientRect(); return r.top + r.height * 0.7; });
  const stripY = (page) => page.evaluate(() => { const r = document.querySelector('.cc-strip').getBoundingClientRect(); return r.top + r.height / 2; });
  const ppc = (page) => page.evaluate(() => window.CmCutterActivity._g.ppc);
  /* a real tap on the ruler's numeral i */
  const tapNum = async (page, i, what) => { const y = await rulerY(page), x = await tickX(page, i); await page.mouse.click(x, y); await wait(20); is((await st(page)).reading === i, what + ': a tap on the numeral ' + i + ' reads ' + i); };
  /* a real tap in the middle of the table centimetre space k (a stitch) */
  const tapSpace = async (page, k) => page.evaluate(() => document.querySelector('.cc-band').scrollIntoView({ block: 'center' })).then(async () => {
    const g = await page.evaluate(() => { const a = window.CmCutterActivity, b = document.querySelector('.cc-tablesvg').getBoundingClientRect(); return { left: b.left, pad: a._g.pad, ppc: a._g.ppc, w0: a.st.w0 }; });
    await page.mouse.click(g.left + g.pad + (k - g.w0 + 0.5) * g.ppc, await stripY(page)); await wait(20);
  });
  /* a real drag of the ruler by d centimetres */
  const dragBy = async (page, d, what) => {
    const y = await rulerY(page), z = (await st(page)).zero, x0 = await tickX(page, 0) + (await ppc(page)) * 2;
    await page.mouse.move(x0, y); await page.mouse.down();
    const dx = d * await ppc(page);
    for (let i = 1; i <= 12; i++) await page.mouse.move(x0 + dx * i / 12, y);
    await page.mouse.up(); await wait(30);
    is((await st(page)).zero === z + d, what + ': a drag of ' + d + ' cm moves the 0 from ' + z + ' to ' + (z + d));
  };
  /* everything the table draws, as class names only — positions left out */
  const classes = (page) => page.evaluate(() => [...document.querySelectorAll('.cc-tablesvg *, .cc-head *')].map((e) => e.tagName + '.' + (e.getAttribute('class') || '')).sort().join('|'));

  async function scenarios(loc) {
    const { page, errs } = await L.open(1024, loc); await ready(page);
    /* ---- ribbon 0 → 7, the 0 at 3 ---- */
    await force(page, 'align', 0);
    is(sp(await L.prompt(page)) === sp(T(loc, 'oP_ribbon')), loc + ' the task line names the ribbon');
    await L.click(page, 'check', loc);
    let n = await note(page), s = await st(page);
    is(sp(n.text) === sp(T(loc, 'hintRead')) && !n.hint && s.misses === 0, loc + ' nothing tapped → hintRead, no miss');
    await tapNum(page, 4, loc);
    await L.click(page, 'check', loc);
    s = await st(page); n = await note(page);
    is(s.verdict.kind === 'inside' && sp(n.text) === sp(T(loc, 'hintStub')) && (await count(page, '.cc-piece')) === 4, loc + ' 4 read with the 0 at 3 → a stub, 4 pieces, hintStub');
    const stub = await page.evaluate(() => { const r = document.querySelector('[data-left="stub"]').getBoundingClientRect(); return { l: r.left, w: r.width }; }), sx = await page.evaluate(() => { const r = document.querySelector('.cc-strip').getBoundingClientRect(); return r.left; });
    is(Math.abs(stub.l + 2 - sx) <= 2 && Math.abs(stub.w - 4 - 3 * await ppc(page)) <= 2, loc + ' the stub runs 3 cm from the strip\'s start');
    const tag0 = await page.evaluate(() => document.querySelector('[data-tag="reading"] rect').getBoundingClientRect().left);
    await dragBy(page, -3, loc);
    s = await st(page);
    const tag1 = await page.evaluate(() => document.querySelector('[data-tag="reading"] rect').getBoundingClientRect().left);
    is(s.reading === 4 && !s.verdict && !s.cut && !(await note(page)).text && (await count(page, '.cc-left')) === 0, loc + ' the drag takes the cut and the hint away; the reading stays on the ruler');
    is(Math.abs((tag0 - tag1) - 3 * await ppc(page)) <= 2, loc + ' the reading tag moved with the ruler');
    /* no alignment lamp: aligned and one centimetre off draw the same things */
    const atRight = await classes(page);
    await page.evaluate(() => window.CmCutterActivity._slide(1)); const off = await classes(page);
    await page.evaluate(() => window.CmCutterActivity._slide(0));
    is(atRight === off, loc + ' no alignment lamp: the drawing at the right spot and 1 cm off has the same parts');
    await tapNum(page, 7, loc);
    await page.evaluate(() => { window.CmCutterActivity.OK_MS = 500; });
    await L.click(page, 'check', loc);
    s = await st(page);
    const nb = await L.nextShown(page); await wait(900);
    is(s.done && (await count(page, '.cc-piece')) === 7 && (await count(page, '.cc-order')) === 1, loc + ' solved: 7 pieces in the jar, the ribbon on the rail');
    is(!nb && await L.nextShown(page) && sp(await L.bubble(page)) === sp(T(loc, 'ok_ribbon', { n: 7 })), loc + ' the success line and Next 0.5 s later');
    await page.evaluate(() => { window.CmCutterActivity.OK_MS = 600000; });
    /* ---- cord: the 0 before the strip ---- */
    await force(page, 'align', 3);
    await tapNum(page, 11, loc + ' cord'); await L.click(page, 'check', loc);
    is((await st(page)).verdict.kind === 'before' && (await count(page, '.cc-puff')) === 2 && sp((await note(page)).text) === sp(T(loc, 'hintAir')), loc + ' cord with the 0 two before → two air puffs, hintAir');
    /* ---- leather: aligned, misread ---- */
    await force(page, 'align', 1);
    await dragBy(page, -2, loc + ' leather'); await tapNum(page, 4, loc + ' leather'); await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintJar', { n: 5 })), loc + ' aligned but 4 read for 5 → hintJar with 5');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintEnd')) && (await count(page, '[data-endline]')) === 1, loc + ' miss 2 → hintEnd, the line at the end');
    /* ---- broken ruler 2 → 8 ---- */
    await force(page, 'tricky', 0);
    is(sp(await L.prompt(page)) === sp(T(loc, 'tBroken')), loc + ' broken: the task line');
    for (let k = 2; k < 10; k++) await tapSpace(page, k);
    is((await st(page)).stitches.join() === '2,3,4,5,6,7,8,9' && (await page.$eval('[data-tag="count"] text', (e) => e.textContent)) === '8', loc + ' eight real taps → eight stitches, the count tag 8');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintStitchPast')) && (await count(page, '.cc-puff')) === 2 && (await count(page, '.cc-piece')) === 6, loc + ' two stitches off the strip → hintStitchPast, two puffs, 6 pieces');
    await tapSpace(page, 9); await tapSpace(page, 8);
    await page.evaluate(() => { window.CmCutterActivity.OK_MS = 500; });
    await L.click(page, 'check', loc); await wait(900);
    is((await st(page)).done && sp(await L.bubble(page)) === sp(T(loc, 'okBroken', { n: 6 })), loc + ' the extra stitches undone → "6 spaces … 6 cm"');
    await page.evaluate(() => { window.CmCutterActivity.OK_MS = 600000; });
    /* ---- Tildy's round ---- */
    await force(page, 'tricky', 3);
    is(sp(await L.prompt(page)) === sp(T(loc, 'tFix', { m: 6 })) && sp(await page.$eval('.cc-says', (e) => e.textContent)) === sp('6 ' + T(loc, 'unit')), loc + ' Tildy says 6 cm, in the task line and by her picture');
    /* ---- the shelf ---- */
    await force(page, 'tricky', 7, 'every', [12, 10, 15]);
    is(sp(await L.prompt(page)) === sp(T(loc, 'tPick')) && (await count(page, '[data-k^="rack-"]')) === 3, loc + ' the shelf: three rulers, the task line');
    await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintPick')) && (await st(page)).misses === 0, loc + ' no ruler yet → hintPick, no miss');
    await L.click(page, 'rack-0', loc);
    s = await st(page);
    is(s.len === 12 && s.zero === s.w0, loc + ' the 12 lands at the table edge');
    await dragBy(page, 1, loc + ' shelf'); await tapNum(page, 12, loc + ' shelf'); await L.click(page, 'check', loc);
    is((await st(page)).verdict.kind === 'short' && sp((await note(page)).text) === sp(T(loc, 'hintShort')) && (await count(page, '[data-left="tail"]')) === 1, loc + ' the 12 on a 14-cm strip → a tail, hintShort');
    await L.click(page, 'rack-2', loc); await dragBy(page, 1, loc + ' shelf 15'); await tapNum(page, 14, loc + ' shelf 15');
    await L.click(page, 'check', loc);
    is((await st(page)).done, loc + ' the 15, aligned, 14 → solved');
    /* ---- the keyboard ---- */
    await force(page, 'align', 4);   /* denim 0 → 8, the 0 at 4 */
    await page.focus('.cc-wrap'); for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('8'); await page.keyboard.press('Enter');
    is((await st(page)).done, loc + ' ← × 4, "8", Enter solve the denim round');
    /* ---- the fives ruler ---- */
    await force(page, 'align', 2, 'fives');
    is((await page.$$eval('.cc-tablesvg .cc-num', (e) => e.map((x) => x.textContent).join())) === '0,5,10', loc + ' "only 0, 5, 10 …": the ruler prints 0, 5, 10');
    L.C.is(errs.length === 0, loc + ' scenarios: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  const run = (level, k, src) => async (page) => { await ready(page); await force(page, level, k); await page.evaluate((src) => { const t = window.CmCutterActivity, st = t.st, r = st.round; (new Function('t', 'st', 'r', src))(t, st, r); }, src); };
  const STATES = [
    ['rest', run('align', 8, ''), { rest: true }],
    ['stub', run('align', 8, 't._read(r.e - st.zero); t._check();'), { miss: true }],
    ['help', run('align', 6, 't._read(r.e - st.zero); t._check(); t._check();'), { miss: true }],
    ['broken', run('tricky', 2, 'for (var i = r.s; i < r.e + 2; i++) t._stitch(i); t._check();'), { miss: true }],
    ['shelf', run('tricky', 7, 't._pick(0); t._slide(r.s); t._read(st.len); t._check();'), { miss: true }],
    ['solved', run('align', 8, 't._slide(r.s); t._read(r.e - r.s); t._check();'), {}]
  ];
  for (const loc of LOCS) {
    const f0 = L.C.fail;
    await scenarios(loc);
    for (const [name, reach, opt] of STATES) await L.sweep(loc, name, reach, opt, WIDTHS);
    console.log(loc + ': ' + (L.C.fail === f0 ? 'ok' : (L.C.fail - f0) + ' fail'));
  }
  await L.close();
  process.exit(L.C.report('local-test-cm-cutter'));
})().catch((e) => { console.error(e); process.exit(1); });
