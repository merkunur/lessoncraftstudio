#!/usr/bin/env node
/* =====================================================================
   local-test-rod-drawers.js — ACTIVITY #95, The Ten-Rod Drawers
   ("Compare Two-Digit Numbers", 1.NBT.B.3), in a real browser with REAL
   clicks on the knobs, the sign, the cabinets and the steps, a REAL
   pointer drag on the staircase, and the keyboard (never a model call to
   make a move). For every locale:
     · 29 · 92: Check with the drawers shut → hintTensFirst, no miss; the
       ones knob rattles; the tens knob opens both tens drawers and SEALS
       the ones; Check with the sign flat → hintTurn; > → the sign grabs
       wrong (it wobbles), the tens drawers glow, hintLookTens; the columns
       to scale (29 : 92); a second miss → hintOpenSide, tens labels 20,
       10 in the 29 column, a dotted gap line; < → okLess, the sign pinned;
     · 54 · 51: the tens open → hintOnesNow; the ones open; = → hintEqual;
       > → okGreater;  45 · 45: < → hintSame; = → okEqual (level bars);
     · 4321 · 4312: the ones knob rattles; thousands, hundreds, tens open,
       the ones sealed; the numerals grouped as the locale writes them;
       < → hintLookLeft, the tens towers glow; > → okGreater;
     · groups 12 · 8: the fruit a loaded library picture on both cabinets
       (≥ 96 px), one pack on the left, none on the right; > → okGreater;
     · order 43 · 34 · 38, smallest first: Check → hintSteps; 43, 34, 38 on
       the steps by taps → 43 hops back, hintOrder; 34 tapped onto step 1,
       38 and 43 DRAGGED onto steps 2 and 3 → okUp.
   And every round of every level and task at rest, at miss 2 and solved —
   each state reached ONCE per locale by real clicks, then the window
   resized through 320–1366 and measured at every width: no sideways
   scroll, every enabled control ≥ 44 px, Check above the fold at rest,
   Check and the hint in view after a miss, the success line in view, the
   fruit pictures loaded and ≥ 96 / 64 px, the columns to scale, the
   cabinets inside the card.
   Usage: node scripts/local-test-rod-drawers.js [--widths=…] [--locales=…] [--levels=…] [--tasks=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', 'two,groups,four').split(','), TASKS = arg('tasks', 'compare,order').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '095-rod-drawers', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'rod-drawers-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, RodDrawersCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'rod-drawers-activity.js'), 'utf8') + '\n;this.__A = RodDrawersActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(LIB, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/rod-drawers-activity.html?activity=choice-board.compare-two-digit.1-nbt-b-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RodDrawersActivity && window.RodDrawersActivity.st && document.querySelector('.rd-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.RodDrawersActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, task, idx) {
    await page.evaluate((level, task, idx) => { const a = window.RodDrawersActivity; a.api.settings.numbers = level; a.api.settings.task = task; a._pool = null; a._ensurePool(); a._start(idx, 0); a._render2(); window.scrollTo(0, 0); }, level, task, idx);
    if (level === 'groups') await page.waitForFunction(() => { const i = [...document.querySelectorAll('.rd-fruitpic')]; return i.length >= 1 && i.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.RodDrawersActivity.st; return { open: s.open, sign: s.sign, steps: s.steps, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.rd-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const texts = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].map(e => e.textContent.trim()), sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(15); return true;
  }
  async function drag(page, from, to, tag) {
    const a = await centre(page, from), b0 = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    if (!a || !b0) { is(false, `${tag}: drag ${from} → ${to} has both ends`); return; }
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 8; k++) { await page.mouse.move(a.x + (b0.x - a.x) * k / 8, a.y + (b0.y - a.y) * k / 8); await wait(8); }
    await page.mouse.up(); await wait(30);
  }
  const K = (k) => `[data-k="${k}"]`;
  const check = (page, tag) => click(page, K('check'), tag);
  async function signTo(page, want, tag) { for (let g = 0; g < 4 && (await st(page)).sign !== want; g++) await click(page, K('sign'), tag); }
  async function openDeciding(page, r, tag) { for (let p = 0; p < r.places; p++) { const lk = await page.evaluate((p) => { const a = window.RodDrawersActivity; return window.RodDrawersCore.lockOf(a.st, p); }, p); if (lk !== 'free') break; await click(page, K('pull-' + p), tag); } }
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    const F = (n, lv) => C.format(n, loc, lv);
    /* ---- 29 · 92 ---- */
    let tag = `${loc} 29·92`, s;
    await force(page, 'two', 'compare', 5);
    is(sp(await prompt(page)) === sp(T(loc, 'pCompare')), `${tag}: pCompare`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintTensFirst')), `${tag}: Check with every drawer shut → hintTensFirst, no miss`);
    await click(page, K('pull-1'), tag); s = await st(page);
    is(!s.open[1] && await count(page, '.rd-knob.is-rattle') === 1, `${tag}: the ones knob only rattles`);
    await click(page, K('pull-0'), tag); s = await st(page);
    is(s.open[0] && !s.open[1] && await count(page, '.rd-knob.is-sealed') === 1 && await count(page, '.rd-drawer.is-open') === 2, `${tag}: the tens knob opens both tens drawers and seals the ones`);
    is(sp(await page.evaluate(() => document.querySelector('[data-k="pull-1"]').getAttribute('aria-label'))) === sp(T(loc, 'stSealed', { p: T(loc, 'plO') })), `${tag}: the sealed knob says so`);
    is(await count(page, '.rd-col.is-l .rd-rodv') === 2 && await count(page, '.rd-col.is-r .rd-rodv') === 9 && await count(page, '.rd-ones') === 0, `${tag}: the tens columns stand (2 and 9 rods), no ones yet`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintTurn')), `${tag}: a flat sign → hintTurn`);
    await signTo(page, '>', tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintLookTens')) && await count(page, '.rd-grab.is-wobble') === 1 && await count(page, '.rd-drawer.is-decide') === 2, `${tag}: > → the sign grabs wrong and wobbles, the tens drawers glow, hintLookTens`);
    const hs = await page.evaluate(() => [...document.querySelectorAll('.rd-col')].map(c => c.getBoundingClientRect().height));
    is(hs.length === 2 && Math.abs(hs[0] / hs[1] - 29 / 92) < 0.02 && await count(page, '.rd-ones') === 2, `${tag}: the columns to scale, ones shown (${hs.map(Math.round)})`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintOpenSide')) && JSON.stringify(await texts(page, '.rd-col.is-l .rd-tlabel')) === '["20","10"]' && await count(page, '.rd-gap') === 1, `${tag}: miss 2 → hintOpenSide, the 29 column counted 20, 10, a dotted gap line`);
    await signTo(page, '<', tag); s = await st(page);
    is(s.show === 0 && await count(page, '.rd-grab') === 0, `${tag}: a turn clears the showing`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okLess', { a: 29, b: 92 })) && await count(page, '.rd-grab.is-pinned') === 1, `${tag}: < → okLess, the sign pinned`);
    /* ---- 54 · 51 ---- */
    tag = `${loc} 54·51`;
    await force(page, 'two', 'compare', 4);
    await click(page, K('pull-0'), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintOnesNow')) && (await st(page)).misses === 0, `${tag}: the tens are the same → hintOnesNow`);
    await click(page, K('pull-1'), tag); s = await st(page); is(s.open[1], `${tag}: the ones open`);
    await signTo(page, '=', tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintEqual')), `${tag}: = → hintEqual`);
    await signTo(page, '>', tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okGreater', { a: 54, b: 51 })), `${tag}: > → okGreater`);
    /* ---- 45 · 45 ---- */
    tag = `${loc} 45·45`;
    await force(page, 'two', 'compare', 2);
    await click(page, K('pull-0'), tag); await click(page, K('pull-1'), tag); await signTo(page, '<', tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintSame')), `${tag}: < → hintSame`);
    await check(page, tag);
    is((await st(page)).misses === 2 && sp(await note(page)) === sp(T(loc, 'hintSame')), `${tag}: a second miss keeps hintSame (equal numbers have no bigger one)`);
    await signTo(page, '=', tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okEqual', { a: 45, b: 45 })), `${tag}: = → okEqual`);
    /* ---- 4321 · 4312 ---- */
    tag = `${loc} 4321·4312`;
    await force(page, 'four', 'compare', 0);
    is(JSON.stringify((await texts(page, '.rd-num')).map(sp)) === JSON.stringify([sp(F(4321, 'four')), sp(F(4312, 'four'))]) && JSON.stringify(await texts(page, '.rd-num')) === JSON.stringify([F(4321, 'four'), F(4312, 'four')]), `${tag}: the numerals written ${JSON.stringify(F(4321, 'four'))}`);
    await click(page, K('pull-3'), tag); is(!(await st(page)).open[3], `${tag}: the ones knob rattles`);
    for (const p of [0, 1, 2]) await click(page, K('pull-' + p), tag);
    s = await st(page); is(s.open.join() === 'true,true,true,false' && await count(page, '.rd-knob.is-sealed') === 1, `${tag}: thousands, hundreds, tens open; the ones sealed`);
    await signTo(page, '<', tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintLookLeft')) && await count(page, '.rd-tower.is-decide') === 2, `${tag}: < → hintLookLeft, the tens towers glow`);
    await signTo(page, '>', tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okGreater', { a: F(4321, 'four'), b: F(4312, 'four') })), `${tag}: > → okGreater`);
    /* ---- groups 12 · 8 ---- */
    tag = `${loc} groups 12·8`;
    await force(page, 'groups', 'compare', 1);
    is(sp(await prompt(page)) === sp(T(loc, 'pCompareGroups')), `${tag}: pCompareGroups`);
    is(await page.evaluate(() => { const i = [...document.querySelectorAll('.rd-fruitpic')]; return i.length === 2 && i.every(x => x.naturalWidth > 0 && x.getBoundingClientRect().width >= 95); }), `${tag}: the fruit on both cabinets, loaded, ≥ 96 px`);
    is(await count(page, '.rd-cabwrap.is-l .rd-pack') === 1 && await count(page, '.rd-cabwrap.is-r .rd-pack') === 0 && await count(page, '.rd-cabwrap.is-l .rd-loose i') === 2 && await count(page, '.rd-cabwrap.is-r .rd-loose i') === 8, `${tag}: one pack + 2 on the left, 8 loose on the right`);
    await click(page, K('pull-0'), tag); is(await count(page, '.rd-knob.is-sealed') === 1, `${tag}: one pack against none seals the loose`);
    await signTo(page, '>', tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okGreater', { a: 12, b: 8 })), `${tag}: > → okGreater`);
    /* ---- order 43 · 34 · 38, smallest first ---- */
    tag = `${loc} order 43·34·38`;
    await force(page, 'two', 'order', 0);
    is(sp(await prompt(page)) === sp(T(loc, 'pOrderUp')) && await count(page, '.rd-dir.is-up') === 1 && await count(page, '.rd-knobs .rd-knob') === 0, `${tag}: pOrderUp, the small→big icon, no knobs`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintSteps')) && (await st(page)).misses === 0, `${tag}: empty steps → hintSteps`);
    for (const k of [0, 1, 2]) { await click(page, K('card-' + k), tag); await click(page, K('step-' + k), tag); }
    s = await st(page); is(s.steps.join() === '0,1,2', `${tag}: 43, 34, 38 placed by taps`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.steps[0] === null && await count(page, '.rd-card.is-back') === 1 && sp(await note(page)) === sp(T(loc, 'hintOrder')), `${tag}: 43 hops back to the waiting row, hintOrder`);
    await click(page, K('card-1'), tag); await click(page, K('step-0'), tag); s = await st(page);
    is(s.steps[0] === 1 && s.steps[1] === null, `${tag}: 34 tapped onto step 1`);
    await drag(page, K('card-2'), K('step-1'), tag); s = await st(page);
    is(s.steps[1] === 2, `${tag}: 38 DRAGGED onto step 2`);
    await drag(page, K('card-0'), K('step-2'), tag); s = await st(page);
    is(s.steps.join() === '1,2,0', `${tag}: 43 DRAGGED onto step 3`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okUp', { x: 34, y: 38, z: 43 })) && await count(page, '.rd-col.is-sky') === 3, `${tag}: okUp, the skyline of three columns`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    if (r.task === 'order') {
      const want = C.sortedCards(r).map(v => r.cards.indexOf(v)), seq = state === 'solved' ? want : want.slice().reverse();
      for (let k = 0; k < 3; k++) { await click(page, K('card-' + seq[k]), tag); await click(page, K('step-' + k), tag); }
      await check(page, tag);
      if (state === 'miss2') { await click(page, K('card-' + seq[0]), tag); await click(page, K('step-0'), tag); await check(page, tag); }
      return;
    }
    await openDeciding(page, r, tag);
    await signTo(page, state === 'solved' ? r.rel : (r.rel === '<' ? '>' : '<'), tag);
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = (r) => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.rd-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.rd-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.rd-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.rd-wrap').getBoundingClientRect(), wide = W.width >= 560;
    document.querySelectorAll('.rd-cab,.rd-card,.rd-col,.rd-knob,.rd-stepcol,.rd-sign').forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    [...document.querySelectorAll('.rd-fruitpic')].forEach(p => { if (!p.complete || !p.naturalWidth) out.fails.push('a fruit did not load'); else if (p.getBoundingClientRect().width < (wide ? 96 : 64) - 1) out.fails.push('a fruit is small ' + Math.round(p.getBoundingClientRect().width)); });
    if (r.level === 'groups' && !document.querySelector('.rd-fruitpic')) out.fails.push('no fruit picture');
    const cols = [...document.querySelectorAll('.rd-col')].filter(c => c.querySelector('.rd-rodv') && c.querySelector('.rd-rodv').getClientRects().length);
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lv of LEVELS) for (const task of TASKS) for (const idx of C.ids(lv, task)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(lv, task, idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${lv} ${task}.${idx} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lv, task, idx);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${lv} ${task}.${idx} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.rd-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 330); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.rd-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE, { level: r.level, task: r.task });
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        /* compare at reveal: the two columns stand to scale */
        if (r.task === 'compare' && r.level !== 'four' && state !== 'rest') {
          const hs = await page.evaluate(() => [...document.querySelectorAll('.rd-col')].map(c => c.getBoundingClientRect().height));
          is(hs.length === 2 && Math.abs(hs[0] * r.b - hs[1] * r.a) <= 2 * Math.max(r.a, r.b), `${tag}: the columns to scale ${r.a} : ${r.b} (${hs.map(Math.round)})`);
        }
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && idx <= 2) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${task}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-rod-drawers: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
