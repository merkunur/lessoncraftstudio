#!/usr/bin/env node
/* =====================================================================
   local-test-stepping-stones.js — the interaction gate for ACTIVITY #48,
   Stenarna i bäcken (RF.K.2.B, sv). Real pointer, every round of every level:
     count — six blank stones in the pile at rest; Hoppa! untouched asks
       (no miss); one stone short (laid by tapping the WATER and the pile)
       → the last stone carries two syllables and sinks half under, a
       ghost stone; one too many → the frog nods at miss 2, the word as
       syllable stones in the pond row; a stone tapped back → right: the
       word card over the water, a lily in the pond;
     build — the second syllable TAPPED → Hoppa! tips it back to the pile
       (miss); the first → asks for more (no miss); the rest by DRAG and
       tap → right; the trick stone → hintDecoy, miss 2 glows ONLY the next
       stone; a stone dragged to gap 0 lands first;
     hidden — Hoppa! untouched asks; a wrong lift → the far bank shows
       what was made (a picture, a written word or the leftover syllables)
       and the stones splash back; the right lift by tap → right.
   Also: the settings, the keyboard, and the width sweep (no sideways
   scroll, controls ≥ 44 px inside the card, water stones inside the
   scene and never overlapping, syllables ≥ 14 px, pictures ≥ 64 px /
   ≥ 96 px from 704, every control above the fold) at rest, miss and done.
   Usage: node scripts/local-test-stepping-stones.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.bygg-ordet-av-stavelser.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'stepping-stones-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, SteppingStonesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'stepping-stones-activity.js'), 'utf8') + '\n;this.__A = SteppingStonesActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].sv; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/stepping-stones-activity.html?activity=${ID}&lang=sv&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SteppingStonesActivity && window.SteppingStonesActivity.st && document.querySelector('.sst-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.SteppingStonesActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.SteppingStonesActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, level: s.r.level, w: s.r.w, laid: s.laid, row: s.row, pile: s.pile, lifted: s.lifted, stones: s.stones, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.sst-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  /* a click on open water: the right end of the stream, clear of every stone */
  async function tapWater(page) {
    await ctr(page, '.sst-scene');
    const p = await page.evaluate(() => { const A = window.SteppingStonesActivity, L = A._L, r = document.querySelector('.sst-scene').getBoundingClientRect(), xs = window.SteppingStonesCore.spread(A.st.laid + 1, L.x0, L.x1); return { x: r.left + xs[xs.length - 1], y: r.top + L.waterY + L.stoneH * 0.5 + 8 }; });
    const hit = await page.evaluate((p) => { const e = document.elementFromPoint(p.x, p.y); return e && e.closest('.sst-stone,.sst-frog,.sst-far') ? e.className : null; }, p);
    if (hit) throw new Error('open water is covered by ' + hit);
    await page.mouse.click(p.x, p.y); await wait(60);
  }
  const P = (id) => `.sst-pstone[data-id="${id}"]`, W = (id) => `.sst-stone[data-id="${id}"]`;
  /* drag a stone into the water at a gap (or the end) */
  async function drag(page, sel, gap) {
    const a = await ctr(page, sel);
    const b = await page.evaluate((gap) => { const A = window.SteppingStonesActivity, L = A._L, r = document.querySelector('.sst-scene').getBoundingClientRect(), xs = window.SteppingStonesCore.spread(A.st.row.length, L.x0, L.x1); const x = gap === undefined || gap >= xs.length ? (xs.length ? xs[xs.length - 1] + 30 : (L.x0 + L.x1) / 2) : xs[gap] - 20; return { x: r.left + x, y: r.top + L.waterY }; }, gap);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10);
    await page.mouse.up(); await wait(100);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.SteppingStonesActivity; a.FAST = true; Object.assign(a.api.settings, { decoy: 'off', show: 'hop' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function hop(page) { await tap(page, '.sst-check'); await page.waitForFunction(() => !window.SteppingStonesActivity._busy || window.SteppingStonesActivity.st.done, { timeout: 8000 }); await wait(60); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.SteppingStonesActivity.OK_MS = 0; }); };
  const word = (s) => s.stones.filter(x => x.s >= 0).sort((a, b) => a.s - b.s).map(x => x.id);
  async function finish(page, r, w) {
    await page.waitForFunction(() => !!document.querySelector('.sst-word'), { timeout: 5000 }).catch(() => {});
    const s = await state(page);
    is(s.done && (await page.evaluate(() => (document.querySelector('.sst-word') || {}).textContent)) === w, `${r.id}: right — the stones close up into "${w}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.sst-lily span')].map(e => e.textContent))).includes(w), `${r.id}: a lily with "${w}" in the pond`);
    is(await page.evaluate(() => { const f = document.querySelector('.sst-frog').getBoundingClientRect(), b = document.querySelector('.sst-far').getBoundingClientRect(); return Math.hypot(f.left + f.width / 2 - (b.left + b.width / 2), f.top + f.height / 2 - (b.top + b.height / 2)) < b.width; }), `${r.id}: the frog reached the far bank`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }

  console.log('— sv');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  /* count */
  for (const r of C.rounds('count')) {
    await okRun(page); await force(page, 'count', r.id);
    let s = await state(page); const n = r.w.syl.length;
    is(s.laid === 0 && (await page.evaluate(() => document.querySelectorAll('.sst-pstone').length)) === 6 && (await page.evaluate(() => document.querySelectorAll('.sst-stone').length)) === 0, `${r.id}: six blank stones in the pile, the stream empty`);
    is((await page.evaluate(() => document.querySelector('.sst-far img').getAttribute('src'))).includes(encodeURIComponent(r.w.pic.split('/')[0])) && (await page.evaluate(() => document.querySelector('.sst-sign img').getAttribute('src'))) === (await page.evaluate(() => document.querySelector('.sst-far img').getAttribute('src'))), `${r.id}: the sign and the far bank show the round's picture`);
    await hop(page); is((await state(page)).misses === 0 && (await note(page)) === T('hintCount'), `${r.id}: Hoppa! untouched asks`);
    let miss = 0;
    if (n > 1) {
      for (let i = 0; i < n - 1; i++) { if (i % 2) await tap(page, '.sst-pstone'); else await tapWater(page); }
      s = await state(page); is(s.laid === n - 1, `${r.id}: ${n - 1} stones laid (water and pile taps)`);
      await hop(page); s = await state(page); miss++;
      is(s.last.result === 'short' && (await page.evaluate(() => document.querySelectorAll('.sst-stone.is-heavy').length)) === 1 && (await page.evaluate(() => !!document.querySelector('.sst-ghost.is-one'))) && (await note(page)) === T('hintShort'), `${r.id}: one stone short — the last carries two syllables and sinks, a ghost stone`);
      const dbl = await page.evaluate(() => document.querySelector('.sst-stone.is-heavy .sst-chalk').textContent);
      is(dbl === r.w.syl.slice(n - 2).join('·'), `${r.id}: the heavy stone reads ${dbl}`);
    }
    while ((await state(page)).laid < n + 1) await tap(page, '.sst-pstone');
    await hop(page); s = await state(page); miss++;
    is(s.last.result === 'long' && (await page.evaluate(() => document.querySelectorAll('.sst-stone.is-sink').length)) === 1 && s.laid === n + 1, `${r.id}: one too many — a blank stone slips under`);
    if (miss >= 2) is((await note(page)) === T('hintNod') && (await page.evaluate(() => [...document.querySelectorAll('.sst-banner b')].map(e => e.textContent).join('-'))) === r.w.syl.join('-') && (await page.evaluate(() => document.querySelector('.sst-frog').classList.contains('is-nod'))), `${r.id}: miss 2 — the frog nods, the word as syllable stones in the pond row`);
    else is((await note(page)) === T('hintLong'), `${r.id}: hintLong`);
    await tap(page, W('b' + n)); s = await state(page); is(s.laid === n, `${r.id}: a stone tapped back`);
    await hop(page);
    await finish(page, r, r.w.word);
  }
  /* build */
  for (const r of C.rounds('build')) {
    await okRun(page); await force(page, 'build', r.id);
    let s = await state(page); const n = r.w.syl.length, wd = word(s);
    is(s.pile.length === n && !s.row.length && (await page.evaluate(() => [...document.querySelectorAll('.sst-pstone')].map(e => e.dataset.id).join())) === s.pile.join(), `${r.id}: ${n} stones in the pile, in the pile's order`);
    await hop(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintBuild'), `${r.id}: Hoppa! untouched asks`);
    await tap(page, P(wd[1])); s = await state(page); is(s.row.join() === wd[1], `${r.id}: a tapped pile stone goes into the water`);
    await hop(page); s = await state(page);
    is(s.misses === 1 && !s.row.length && s.pile.includes(wd[1]) && (await page.evaluate((id) => document.querySelector(`.sst-pstone[data-id="${id}"]`).classList.contains('is-back'), wd[1])) && (await note(page)) === T('hintFirst'), `${r.id}: the wrong first stone tips back to the pile (miss)`);
    await tap(page, P(wd[0])); await hop(page); s = await state(page);
    is(s.misses === 1 && s.row.join() === wd[0] && s.last.result === 'more' && (await note(page)) === T('hintMore'), `${r.id}: a right beginning asks for more, no miss`);
    for (let i = 1; i < n; i++) { if (i % 2) await drag(page, P(wd[i])); else await tap(page, P(wd[i])); }
    s = await state(page); is(s.row.join() === wd.join(), `${r.id}: laid in word order (drag and tap)`);
    await hop(page);
    await finish(page, r, r.w.word);
  }
  /* the trick stone; drag to gap 0; a row stone tapped back */
  for (const r of C.rounds('build').slice(0, 4)) {
    await okRun(page); await force(page, 'build', r.id, { decoy: 'on' });
    let s = await state(page); const wd = word(s), dec = s.stones.find(x => x.s === -1);
    is(dec && dec.text === r.decoy && s.pile.length === r.w.syl.length + 1, `${r.id}: the trick stone "${r.decoy}" in the pile`);
    await tap(page, P(dec.id)); await hop(page); s = await state(page);
    is(s.last.result === 'decoy' && !s.row.length && (await note(page)) === T('hintDecoy'), `${r.id}: the trick stone tips (miss)`);
    await tap(page, P(wd[1])); await hop(page); s = await state(page);
    is(s.help === 2 && (await page.evaluate(() => [...document.querySelectorAll('.is-glow')].map(e => e.dataset.id))).join() === wd[0] && (await note(page)) === T('hintNext'), `${r.id}: miss 2 — ONLY the next stone glows`);
    await tap(page, P(wd[1])); await drag(page, P(wd[0]), 0); s = await state(page);
    is(s.row.join() === [wd[0], wd[1]].join(), `${r.id}: a stone dragged to the front lands first`);
    await tap(page, W(wd[1])); s = await state(page); is(s.row.join() === wd[0] && s.pile.includes(wd[1]), `${r.id}: a row stone tapped goes back to the pile`);
    for (const id of wd.slice(1)) await tap(page, P(id));
    await hop(page); is((await state(page)).done, `${r.id}: right with the trick stone left in the pile`);
  }
  /* hidden */
  for (const r of C.rounds('hidden')) {
    await okRun(page); await force(page, 'hidden', r.id);
    let s = await state(page); const n = r.w.syl.length;
    is((await page.evaluate(() => document.querySelectorAll('.sst-stone').length)) === n && (await page.evaluate(() => document.querySelector('.sst-far img').getAttribute('src'))).includes(r.target.pic.split('/').pop()) && (await page.evaluate(() => document.querySelector('.sst-sign img').getAttribute('src'))).includes(r.w.pic.split('/').pop()), `${r.id}: ${n} stones laid as ${r.w.word}; the sign shows the compound, the far bank ${r.target.word}`);
    await hop(page); is((await state(page)).misses === 0 && (await note(page)) === T('hintLift', { target: r.target.word }), `${r.id}: Hoppa! untouched asks`);
    /* a wrong lift, watched in real time: the far bank shows what was made, then the stones splash back */
    const wrong = r.lift.includes(0) ? [n - 1] : [0], made = r.w.syl.filter((_, i) => !wrong.includes(i)).join('');
    for (const q of wrong) await tap(page, W('s' + q));
    s = await state(page); is(s.lifted.join() === wrong.join() && (await page.evaluate(() => document.querySelectorAll('.sst-pstone.is-lifted').length)) === wrong.length, `${r.id}: the tapped stone lifts onto the bank`);
    await page.evaluate(() => { window.SteppingStonesActivity.FAST = false; });
    await tap(page, '.sst-check'); await wait(380 * (n + 1) + 300);
    const kind = r.others.includes(made) ? (C.WORDS[made].pic ? 'picture' : 'word') : 'none';
    const far = await page.evaluate(() => { const f = document.querySelector('.sst-far'); return { made: f.classList.contains('is-made'), img: (f.querySelector('img') || {}).src || '', card: (f.querySelector('.sst-card') || {}).textContent || '', none: !!f.querySelector('.sst-card.is-none') }; });
    is(far.made && (kind === 'picture' ? far.img.includes(C.WORDS[made].pic.split('/').pop()) : kind === 'word' ? far.card === made && !far.none : far.none && far.card === r.w.syl.filter((_, i) => !wrong.includes(i)).join('·')), `${r.id}: lifting ${wrong} made "${made}" — the far bank shows ${kind}`);
    is((await note(page)) === (kind === 'none' ? T('hintNoWord') : T('hintMade', { made, target: r.target.word })), `${r.id}: the hint names it`);
    await wait(1600);
    s = await state(page);
    is(!s.lifted.length && !(await page.evaluate(() => document.querySelector('.sst-far').classList.contains('is-made'))) && (await page.evaluate(() => document.querySelectorAll('.sst-stone').length)) === n, `${r.id}: the target returns, the stones splash back`);
    await page.evaluate(() => { window.SteppingStonesActivity.FAST = true; });
    for (const q of r.lift) await tap(page, W('s' + q));
    await hop(page);
    await finish(page, r, r.target.word);
  }
  /* settings */
  await page.evaluate(() => { window.SteppingStonesActivity.OK_MS = 60000; });
  await force(page, 'count', 'count-helikopter', { show: 'start' });
  is((await page.evaluate(() => (document.querySelector('.sst-faint') || {}).textContent)) === 'helikopter', 'Ordet: syns från början — the word, faint');
  await force(page, 'count', 'count-helikopter', { show: 'hop' }); is(!(await page.evaluate(() => !!document.querySelector('.sst-faint'))), 'Ordet: visas när grodan hoppar — hidden');
  for (const [v, k] of [['off', 0], ['on', 1]]) { await force(page, 'build', 'build-paraply', { decoy: v }); is((await state(page)).pile.length === 3 + k, `Lursten: ${v} — ${3 + k} stones`); }
  /* keyboard */
  await force(page, 'count', 'count-helikopter');
  await page.focus('.sst-wrap'); await page.keyboard.press('+'); await page.keyboard.press('+'); is((await state(page)).laid === 2, '+ lays a stone');
  await page.keyboard.press('Backspace'); is((await state(page)).laid === 1, 'Backspace takes one back');
  await force(page, 'build', 'build-paraply');
  await page.focus('.sst-pstone'); const fid = await page.evaluate(() => document.activeElement.dataset.id);
  await page.keyboard.press('Enter'); is((await state(page)).row.join() === fid, 'Enter on a pile stone lays it');
  await page.focus('.sst-wrap'); await page.keyboard.press('Backspace'); is(!(await state(page)).row.length, 'Backspace takes the last stone back');
  await force(page, 'hidden', 'hidden-solros');
  await page.focus('.sst-stone'); await page.keyboard.press('Enter'); is((await state(page)).lifted.length === 1, 'Enter on a stone lifts it');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.SteppingStonesActivity.OK_MS = 60000; });
    const cases = C.rounds('count').map(r => ['count', r.id, null]).concat(C.rounds('build').map(r => ['build', r.id, { decoy: 'on' }]), C.rounds('hidden').map(r => ['hidden', r.id, null]));
    for (const [lv, id, set] of cases) {
      await force(o.page, lv, id, set);
      const tag = `@${w} ${id}`;
      for (const phase of ['rest', 'miss', 'done']) {
        if (phase === 'miss') await o.page.evaluate(() => {
          const A = window.SteppingStonesActivity, C2 = window.SteppingStonesCore, st = A.st, r = st.r, n = r.w.syl.length;
          if (r.level === 'count') { for (let i = 0; i < 6; i++) C2.lay(st); C2.hop(st); for (let i = 0; i < 6 - Math.max(1, n - 1); i++) C2.unlay(st); if (n === 1) C2.lay(st); }
          else if (r.level === 'build') { const w2 = st.stones.filter(s => s.s >= 0).sort((a, b) => a.s - b.s); C2.place(st, w2[1].id); C2.hop(st); C2.place(st, w2[0].id); st.stones.filter(s => s.s === -1).forEach(s => C2.place(st, s.id)); }
          else { C2.lift(st, r.lift.includes(0) ? n - 1 : 0); C2.hop(st); C2.lift(st, r.lift.includes(0) ? n - 1 : 0); }
          A._hop();
        });
        if (phase === 'done') await o.page.evaluate(() => { const A = window.SteppingStonesActivity, C2 = window.SteppingStonesCore, st = A.st, r = st.r; A._made = null; A._busy = false; A._clearTimers(); if (st.done) return; if (r.level === 'count') { while (st.laid > r.w.syl.length) C2.unlay(st); while (st.laid < r.w.syl.length) C2.lay(st); } else if (r.level === 'build') { while (st.row.length) C2.unplace(st, st.row[0]); st.stones.filter(s => s.s >= 0).sort((a, b) => a.s - b.s).forEach(s => C2.place(st, s.id)); } else { st.lifted = []; r.lift.forEach(q => C2.lift(st, q)); } A._hop(); });
        await o.page.waitForFunction(() => !window.SteppingStonesActivity._busy || window.SteppingStonesActivity.st.done, { timeout: 8000 }).catch(() => {});
        await wait(phase === 'done' ? 120 : 60);
        if (phase === 'miss') { const s = await state(o.page); if (s.done || !s.misses) throw new Error('miss phase did not land on a miss: ' + id); }
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement, sc = document.querySelector('.sst-scene').getBoundingClientRect();
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const stones = [...document.querySelectorAll('.sst-stone')].filter(vis);
          const ctl = stones.concat([...document.querySelectorAll('.sst-pstone,.sst-check:not([hidden]),.sst-sign,.sst-frog')].filter(vis));
          const pics = [...document.querySelectorAll('.sst-sign img,.sst-far img,.sst-frog img')].map(e => e.getBoundingClientRect().width);
          let hit = 0; for (let i = 0; i < stones.length; i++) for (let j = i + 1; j < stones.length; j++) { const a = stones[i], b = stones[j]; if (a.offsetLeft < b.offsetLeft + b.offsetWidth - 1 && b.offsetLeft < a.offsetLeft + a.offsetWidth - 1) hit++; }
          const chalk = [...document.querySelectorAll('.sst-chalk,.sst-banner b,.sst-word,.sst-card')].filter(e => e.textContent).map(e => parseFloat(getComputedStyle(e).fontSize));
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < 44 - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            inScene: stones.every(e => { const b = e.getBoundingClientRect(); return b.left >= sc.left - 1 && b.right <= sc.right + 1 && b.top >= sc.top - 1 && b.bottom <= sc.bottom + 1; }),
            hit, chalk: chalk.length ? Math.min(...chalk) : 99,
            pic: pics.length ? Math.min(...pics) : 999, low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.inScene && m.pic >= minPic - 0.5, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, stones in the scene, pictures ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, scene ${m.inScene}, pic ${Math.round(m.pic)})`);
        is(m.hit === 0 && m.chalk >= 14, `${tag} ${phase}: no two stones overlap, syllables ≥ 14 px (hit ${m.hit}, syl ${m.chalk})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['count-motorcykel', 'build-paraply', 'hidden-vattenmelon'].includes(id)) await o.page.screenshot({ path: path.join(SHOT, `sv-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors (${o.errs.slice(0, 2).join(' | ')})`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-stepping-stones: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
