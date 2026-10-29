#!/usr/bin/env node
/* =====================================================================
   local-test-glow-ruler.js — ACTIVITY #152, The Glow Ruler ("Read the
   Ruler", 2.MD.A.1), in a real browser with real pointer taps and real
   drags, in all 11 locales. Plumbing: scripts/lib/activity-harness.js.
   REGISTRATION (en, every round of both levels at 320 / 360 / 704 / 1024):
     the picture's real pixels are read back in the page (canvas, alpha
     > 40) and mapped through the drawn <img> box: its left ink edge must
     sit within 1.5 px of the drawn tick 0 and its right ink edge within
     1.5 px of the drawn tick N; the art is ≥ 96 px thick at 704+, ≥ 64 at
     360 and 320.
   Scenarios per locale (1024):
     · Check with the marker at 0 → hintStart naming the object, no miss;
     · a real tap on the ruler at tick N + 2 → the marker there; Check →
       the light fills N + 2 spaces, the first count «1» sits between tick 0
       and tick 1, two coral spaces, hintOver;
     · three taps on «back» → N − 1; Check → miss 2: the drop line at tick
       N, the tick pulses, hintDrop1;
     · a real drag of the marker to tick N → Check → solved: the tag
       «N cm», the success sentence in the bubble, Next 0.5 s later, one
       column on the shelf;
     · level 2 (only 0, 5, 10, 15): the printed numbers; miss 2 → the
       printed number below the end glows, the count-on numerals m+1…N,
       hintDrop5 (hintDrop0 for the 4-cm seashell);
     · the keyboard: → × N and Enter solve a round;
     · «only at the end»: the light shows one count only.
   Then each state reached ONCE per locale and resized through 320…1366.
   Usage: node scripts/local-test-glow-ruler.js [--locales=…] [--widths=…]
   ===================================================================== */
'use strict';
const H = require('./lib/activity-harness');
const C = require('../mini tools/glow-ruler-core.js');
const LOCS = H.arg('locales', H.LOCALES.join(',')).split(',');
const WIDTHS = H.arg('widths', H.WIDTHS.join(',')).split(',').map(Number);
const { T } = H.strings('glow-ruler-activity.js', 'GlowRulerActivity', { GlowRulerCore: C });
const sp = H.sp, wait = H.wait;

(async () => {
  const L = await H.local({ html: 'glow-ruler-activity.html', id: 'choice-board.read-ruler.2-md-a-1', global: 'GlowRulerActivity', ready: '.gr-wrap' });
  const { is } = L.C;
  const ready = (page) => page.waitForFunction(() => window.GlowRulerActivity._picsReady, { timeout: 15000 });
  const force = async (page, level, k, count) => {
    const ok = await page.evaluate((level, k, count) => {
      const a = window.GlowRulerActivity; a.api.settings.numbers = level; a.api.settings.count = count || 'each'; a._pool = null; a._ensurePool(); a._start(k); a._render2(); window.scrollTo(0, 0);
      return a.st.k === k && a.st.level === level;
    }, level, k, count);
    if (!ok) throw new Error('force ' + level + k);
    await page.waitForFunction(() => { const i = document.querySelector('.gr-pic'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 15000 });
  };
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.GlowRulerActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.gr-note'); return { text: n.textContent, hint: n.classList.contains('is-hint') }; });
  const count = (page, sel) => page.$$eval(sel, (e) => e.length);
  const tickX = (page, i) => page.evaluate((i) => { const t = document.querySelector('.gr-tick[data-tick="' + i + '"]'); const r = t.getBoundingClientRect(); return r.left + r.width / 2; }, i);
  /* a real pointer tap on the ruler band straight below tick i */
  const tapTick = async (page, i, what) => {
    const y = await page.evaluate(() => { const b = document.querySelector('.gr-band'); b.scrollIntoView({ block: 'center' }); const r = b.getBoundingClientRect(); return r.top + r.height * 0.3; });
    const x = await tickX(page, i);
    await page.mouse.click(x, y); await wait(20);
    is((await st(page)).marker === i, what + ': a tap on the ruler under tick ' + i + ' puts the marker there');
  };
  /* the real-pixel registration: alpha box of the image, mapped through the drawn box */
  const registration = (page) => page.evaluate(async () => {
    const im = document.querySelector('.gr-pic'), a = window.GlowRulerActivity, r = a.st.round;
    const img = new Image(); img.src = im.src; await img.decode();
    const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data;
    let x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1;
    for (let y = 0; y < c.height; y++) for (let xx = 0; xx < c.width; xx++) if (d[(y * c.width + xx) * 4 + 3] > 40) { if (xx < x0) x0 = xx; if (xx > x1) x1 = xx; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    const W = c.width, bx = x0 / W, bw = (x1 - x0 + 1) / W, by = y0 / W, bh = (y1 - y0 + 1) / W;
    const R = im.getBoundingClientRect();
    /* the drawn box: unturned it is S wide, cropped to the ink rows; turned, S wide after the turn */
    const S = R.width;
    const left = r.rot ? R.left + (1 - by - bh) * S : R.left + bx * S, right = r.rot ? R.left + (1 - by) * S : R.left + (bx + bw) * S;
    const t0 = document.querySelector('.gr-tick[data-tick="0"]').getBoundingClientRect(), tN = document.querySelector('.gr-tick[data-tick="' + r.len + '"]').getBoundingClientRect();
    const ruler = document.querySelector('.gr-ruler').getBoundingClientRect();
    return { obj: r.obj, len: r.len, dl: left - (t0.left + t0.width / 2), dr: right - (tN.left + tN.width / 2), thick: Math.min(R.width, R.height), bottom: R.bottom - ruler.top };
  });

  /* ---------- registration, en, every round of both levels ---------- */
  for (const w of [1024, 704, 360, 320]) {
    const { page, errs } = await L.open(w, 'en'); await ready(page);
    for (const level of ['every', 'fives']) for (let k = 0; k < 8; k++) {
      await force(page, level, k);
      const g = await registration(page), tag = '@' + w + ' ' + level + ' ' + g.obj + ' ' + g.len + ' cm';
      is(Math.abs(g.dl) <= 1.5 && Math.abs(g.dr) <= 1.5, tag + ': the ink runs from tick 0 to tick ' + g.len + ' (' + g.dl.toFixed(2) + ', ' + g.dr.toFixed(2) + ')');
      is(g.thick >= (w >= 700 ? 96 : 64), tag + ': the picture is ' + g.thick.toFixed(1) + ' px thick');
      is(Math.abs(g.bottom) <= 1.5, tag + ': it lies on the ruler (' + g.bottom.toFixed(2) + ')');
    }
    is(errs.length === 0, 'registration @' + w + ': no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }

  async function scenarios(loc) {
    const { page, errs } = await L.open(1024, loc); await ready(page);
    /* ---- level 1, the key (8 cm) ---- */
    await force(page, 'every', 4);
    const o = T(loc, 'oA_key');
    is(sp(await L.prompt(page)) === sp(T(loc, 'taskLine')), loc + ' the task line');
    is(await count(page, '.gr-num') === 16 && (await count(page, '.gr-tick')) === 16, loc + ' level 1: 16 ticks, every one numbered');
    await L.click(page, 'check', loc);
    let n = await note(page), s = await st(page);
    is(sp(n.text) === sp(T(loc, 'hintStart', { o })) && !n.hint && s.misses === 0, loc + ' the marker at 0 → hintStart, no miss «' + sp(n.text) + '»');
    await tapTick(page, 10, loc);
    await L.click(page, 'check', loc);
    s = await st(page); n = await note(page);
    is(s.verdict && s.verdict.kind === 'over' && s.lit === 10 && sp(n.text) === sp(T(loc, 'hintOver')), loc + ' 10 for an 8-cm key → over, hintOver');
    is((await count(page, '.gr-lit')) === 10 && (await count(page, '.gr-lit.is-over')) === 2, loc + ' the light filled 10 spaces, the last two coral');
    const c1 = await page.evaluate(() => { const t = document.querySelector('.gr-count[data-count="1"]').getBoundingClientRect(); return t.left + t.width / 2; });
    const t0 = await tickX(page, 0), t1 = await tickX(page, 1);
    is(c1 > t0 + 2 && c1 < t1 - 2, loc + ' the first count «1» sits in the first space, between tick 0 and tick 1');
    for (let i = 0; i < 3; i++) await L.click(page, 'nudge-back', loc);
    s = await st(page);
    is(s.marker === 7 && s.lit === 0 && !s.verdict && !(await note(page)).text, loc + ' «back» × 3 → 7; a move takes the light and the hint away');
    await L.click(page, 'check', loc);
    s = await st(page); n = await note(page);
    is(s.help && s.verdict.kind === 'under' && sp(n.text) === sp(T(loc, 'hintDrop1')), loc + ' miss 2 → hintDrop1');
    const drop = await page.evaluate(() => { const d = document.querySelector('.gr-drop').getBoundingClientRect(); return d.left + d.width / 2; });
    is(Math.abs(drop - await tickX(page, 8)) <= 2 && (await count(page, '.gr-tick.is-pulse')) === 1 && (await count(page, '.gr-dim')) === 1, loc + ' the drop line falls on tick 8, the tick pulses, the unlit end dims');
    await L.drag(page, '[data-k="marker"]', { dx: (await tickX(page, 8)) - (await tickX(page, 7)) }, loc + ' marker drag');
    is((await st(page)).marker === 8, loc + ' the marker dragged one centimeter to 8');
    await page.evaluate(() => { window.GlowRulerActivity.OK_MS = 500; });
    await L.click(page, 'check', loc);
    s = await st(page);
    const nb = await L.nextShown(page); await wait(900);
    is(s.done && sp(await page.$eval('.gr-tag', (e) => e.textContent)) === sp('8 ' + T(loc, 'unit')), loc + ' solved: the tag «8 cm» on the key');
    is(!nb && await L.nextShown(page) && sp(await L.bubble(page)) === sp(T(loc, 'ok_key', { n: 8 })), loc + ' the success sentence and Next 0.5 s later');
    is((await count(page, '.gr-col')) === 1 && (await count(page, '.gr-thumb[data-mark]')) === 1, loc + ' the key joins the shelf');
    await page.evaluate(() => { window.GlowRulerActivity.OK_MS = 600000; });
    /* ---- level 1, too short: hintUnder names the object ---- */
    await force(page, 'every', 6);   /* the glue bottle, 11 cm */
    await tapTick(page, 9, loc + ' glue'); await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintUnder', { o: T(loc, 'oA_glue') })) && (await count(page, '.gr-dim')) === 1, loc + ' 9 for an 11-cm glue bottle → hintUnder, the end dims');
    /* ---- level 2 ---- */
    await force(page, 'fives', 6);   /* the ice pop, 12 cm */
    is((await page.$$eval('.gr-num', (e) => e.map((x) => x.textContent).join())) === '0,5,10,15', loc + ' level 2 prints only 0, 5, 10, 15');
    await tapTick(page, 14, loc + ' fives'); await L.click(page, 'check', loc); await L.click(page, 'check', loc);
    n = await note(page);
    is(sp(n.text) === sp(T(loc, 'hintDrop5', { m: 10 })), loc + ' level 2 miss 2 → hintDrop5 from 10');
    is((await page.$$eval('.gr-count.is-on', (e) => e.map((x) => x.textContent).join())) === '11,12' && (await page.$eval('.gr-num.is-glow', (e) => e.textContent)) === '10', loc + ' the 10 glows and the count-on numerals are 11, 12');
    await force(page, 'fives', 0);   /* the seashell, 4 cm */
    await tapTick(page, 6, loc + ' fives 0'); await L.click(page, 'check', loc); await L.click(page, 'check', loc);
    is(sp((await note(page)).text) === sp(T(loc, 'hintDrop0')), loc + ' the 4-cm seashell at miss 2 → hintDrop0 (count from 0)');
    /* ---- the keyboard ---- */
    await force(page, 'every', 1);   /* the seashell, 5 cm */
    await page.focus('.gr-wrap'); for (let i = 0; i < 5; i++) await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    is((await st(page)).done, loc + ' → × 5 and Enter solve the 5-cm seashell');
    /* ---- only at the end ---- */
    await force(page, 'every', 3, 'end');   /* the lemon, 7 cm */
    await tapTick(page, 7, loc + ' end'); await L.click(page, 'check', loc);
    is((await page.$$eval('.gr-count', (e) => e.map((x) => x.textContent).join())) === '7' && (await count(page, '.gr-lit')) === 7, loc + ' «only at the end»: seven lit spaces, one count');
    L.C.is(errs.length === 0, loc + ' scenarios: no console errors ' + errs.slice(0, 3).join(' | '));
    await page.close();
  }
  const go = async (page, level, k, m, checks) => { await ready(page); await force(page, level, k); await page.evaluate((m, checks) => { const a = window.GlowRulerActivity; a._move(m); for (let i = 0; i < checks; i++) a._check(); }, m, checks); };
  const STATES = [
    ['rest', async (page) => { await ready(page); await force(page, 'every', 7); }, { rest: true }],
    ['over', async (page) => go(page, 'every', 7, 15, 1), { miss: true }],
    ['help', async (page) => go(page, 'every', 0, 6, 2), { miss: true }],
    ['fives-help', async (page) => go(page, 'fives', 7, 11, 2), { miss: true }],
    ['solved', async (page) => go(page, 'every', 6, 11, 1), {}]
  ];
  for (const loc of LOCS) {
    const f0 = L.C.fail;
    await scenarios(loc);
    for (const [name, reach, opt] of STATES) await L.sweep(loc, name, reach, opt, WIDTHS);
    console.log(loc + ': ' + (L.C.fail === f0 ? 'ok' : (L.C.fail - f0) + ' fail'));
  }
  await L.close();
  process.exit(L.C.report('local-test-glow-ruler'));
})().catch((e) => { console.error(e); process.exit(1); });
