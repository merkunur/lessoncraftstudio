#!/usr/bin/env node
/* =====================================================================
   local-test-counting-lamp.js — ACTIVITY #92, The Counting Lamp ("Whistle
   Valley — Number-Line Track Repair", 1.NBT.A.1), in a real browser with
   REAL pointer drags and taps (never a model call to make a move). For
   every locale, To 120:
     · Find the spot 1–11 (8, 4; 13 does not belong): Check with no plate →
       hintEmpty, no miss; 8 DRAGGED onto tie 8 (9), 4 tapped onto tie 3 →
       Check: the lamp stops at tie 8 (coral, tag "9"), hintCountOn; 8
       dragged to tie 7 → okTies;
     · the arrow tie 20–30 (26; arrow 22): hintType; tap the arrow tie →
       keypad; 2, 3, ✓; 26 onto tie 6 → hintFromNearest 20; ⌫ 2 → okName;
     · Hops 47 + 3: hintFlag; tap tie 51 → three puffs, hintHop; the flag
       DRAGGED to 50 → okHop "47 + 3 = 50";
     · Mileposts 60, 70, _, 90, _, 110: 85 + 100 → a coral jump, hintStep;
       80 → okUp {10};
     · the open rail 10…30: 20 tapped onto the middle of the rail, 15
       DRAGGED near 12 → the lamp stops at 15, hintCountOn; → moved with
       the keyboard (→ one faint tie at a time) to 15 → okOpen.
   And every round of both ranges at rest, at miss 2 and solved — each state
   reached ONCE per locale by real clicks, then the window resized through
   320–1366 and measured at every width: no sideways scroll, every control
   ≥ 44 px, Check above the fold at rest, Check and the hint in view after a
   miss, the success line in view, the engine a loaded library picture
   (≥ 96 px wide layout, ≥ 64 px otherwise), every seat inside the card,
   no two seats overlapping.
   Usage: node scripts/local-test-counting-lamp.js [--widths=…] [--locales=…] [--levels=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', '120,50').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '092-counting-lamp', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'counting-lamp-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, CountingLampCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'counting-lamp-activity.js'), 'utf8') + '\n;this.__A = CountingLampActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/counting-lamp-activity.html?activity=track-repair.count-to-120.1-nbt-a-1&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.CountingLampActivity && window.CountingLampActivity.st && document.querySelector('.lm-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.CountingLampActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, track, level, idx) {
    await page.evaluate((track, level, idx) => { const a = window.CountingLampActivity; a.api.settings.track = track; a.api.settings.numbers = level; a._pool = null; a._ensurePool(); a._start(idx, 0); a._render2(); window.scrollTo(0, 0); }, track, level, idx);
    await page.waitForFunction(() => { const i = document.querySelector('.lm-engine-pic'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.CountingLampActivity.st; return { seats: s.seats, clamps: s.clamps, flag: s.flag, typed: s.typed, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.lm-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, w: r.width, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag, fx) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(fx != null ? b.l + b.w * fx : b.x, b.y); await wait(25); return true;
  }
  /* a REAL drag: press on the plate, move in steps, release over the target point */
  async function drag(page, fromSel, toSel, tag, fx) {
    const a = await centre(page, fromSel); if (!a) { is(false, `${tag}: there is a «${fromSel}» to drag`); return; }
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    const b = await page.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { l: r.left, w: r.width, y: r.top + r.height / 2 }; }, toSel);
    const tx = fx != null ? b.l + b.w * fx : b.l + b.w / 2;
    for (let k = 1; k <= 8; k++) { await page.mouse.move(a.x + (tx - a.x) * k / 8, a.y + (b.y - a.y) * k / 8); await wait(10); }
    await page.mouse.up(); await wait(40);
  }
  const prompt = (page) => page.evaluate(() => { const e = document.querySelector('.lcs-activity-prompt-text'); return e ? e.textContent : ''; });
  const check = (page, tag) => click(page, '[data-k="check"]', tag);

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- find the spot ---- */
    let tag = `${loc} spots 1–11`;
    await force(page, 'spots', '120', 0);
    is(sp(await prompt(page)) === sp(T(loc, 'pTies')) && await count(page, '.lm-plate') === 3 && await count(page, '.lm-seat.is-printed') === 2, `${tag}: pTies, three plates, two stations`);
    await check(page, tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: Check with no plate → hintEmpty, no miss`);
    await drag(page, '[data-k="plate-8"]', '[data-k="seat-8"]', tag);
    await click(page, '[data-k="plate-4"]', tag); await click(page, '[data-k="seat-3"]', tag); s = await st(page);
    is(s.seats[8] === 8 && s.seats[3] === 4, `${tag}: 8 DRAGGED onto tie 8 (the 9), 4 tapped onto tie 3`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '[data-k="seat-8"].is-wrong') === 1 && (await page.evaluate(() => document.querySelector('[data-k="seat-8"] .lm-tag').textContent)) === '9' && await count(page, '[data-k="seat-3"].is-right') === 1 && sp(await note(page)) === sp(T(loc, 'hintCountOn')), `${tag}: the lamp stops at tie 8 (coral, tag 9), tie 3 right, hintCountOn`);
    is(await count(page, '.lm-seat.is-lit') === 6, `${tag}: miss 1 lights the empty ties the lamp counted (1,2,4,5,6,7)`);
    await drag(page, '[data-k="seat-8"]', '[data-k="seat-7"]', tag); s = await st(page);
    is(s.seats[7] === 8 && s.seats[8] == null && s.show === 0 && await count(page, '.lm-seat.is-lit') === 0, `${tag}: 8 dragged from tie 8 to tie 7, the showing clears`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okTies', { a: 4, b: 8 })) && await count(page, '[data-k="check"]') === 0, `${tag}: okTies`);
    /* ---- the arrow tie + keypad ---- */
    tag = `${loc} arrow 20–30`;
    await force(page, 'spots', '120', 2);
    is(sp(await prompt(page)) === sp(T(loc, 'pName')) && await count(page, '.lm-arrow') === 1, `${tag}: pName, an arrow`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintType')) && (await st(page)).misses === 0, `${tag}: nothing typed → hintType`);
    await click(page, '[data-k="seat-2"]', tag);
    is(await count(page, '.lm-key') === 12 && await page.evaluate(() => getComputedStyle(document.querySelector('.lm-trolley')).display === 'none'), `${tag}: the arrow tie opens the keypad in the trolley's place`);
    await click(page, '[data-k="key-2"]', tag); await click(page, '[data-k="key-3"]', tag); await click(page, '[data-k="key-ok"]', tag);
    await click(page, '[data-k="plate-26"]', tag); await click(page, '[data-k="seat-6"]', tag); s = await st(page);
    is(s.typed === '23' && s.seats[6] === 26 && sp(await page.evaluate(() => document.querySelector('[data-k="seat-2"]').textContent)) === '23', `${tag}: 23 typed on the arrow tie, 26 on tie 6`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintFromNearest', { m: 20 })), `${tag}: 23 → hintFromNearest 20`);
    await click(page, '[data-k="seat-2"]', tag); await click(page, '[data-k="key-del"]', tag); await click(page, '[data-k="key-2"]', tag); await click(page, '[data-k="key-ok"]', tag);
    await check(page, tag); s = await st(page);
    is(s.done && s.typed === '22' && sp(await note(page)) === sp(T(loc, 'okName', { a: 26, n: 22 })), `${tag}: ⌫ 2 → okName`);
    /* ---- hops ---- */
    tag = `${loc} hops 47+3`;
    await force(page, 'hops', '120', 0);
    is(sp(await prompt(page)) === sp(T(loc, 'pHopOn', { a: 47, k: 3 })), `${tag}: pHopOn`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintFlag')) && (await st(page)).misses === 0, `${tag}: no flag → hintFlag`);
    await click(page, '[data-k="tie-5"]', tag); await check(page, tag); s = await st(page);
    is(s.flag === 5 && s.misses === 1 && await count(page, '.lm-puff') === 3 && sp(await note(page)) === sp(T(loc, 'hintHop')), `${tag}: the flag on 51 → three puffs, hintHop`);
    await page.evaluate(() => { const a = window.CountingLampActivity; a.st.flag = null; a._paint(); });   /* back to the trolley (a seam: the planted flag is drawn, not a button) */
    await drag(page, '[data-k="flag"]', '[data-k="tie-4"]', tag); await check(page, tag); s = await st(page);
    is(s.flag === 4 && s.done && sp(await note(page)) === sp(T(loc, 'okHop', { eq: '47 + 3 = 50' })), `${tag}: the flag DRAGGED to 50 → okHop`);
    /* ---- mileposts ---- */
    tag = `${loc} posts +10`;
    await force(page, 'posts', '120', 4);
    is(sp(await prompt(page)) === sp(T(loc, 'pPosts')) && await count(page, '.lm-plate') === 4, `${tag}: pPosts, four plates`);
    await drag(page, '[data-k="plate-85"]', '[data-k="seat-2"]', tag); await click(page, '[data-k="plate-100"]', tag); await click(page, '[data-k="seat-4"]', tag);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.lm-arc.is-wrong') >= 1 && await count(page, '[data-k="seat-2"].is-wrong') === 1 && sp(await note(page)) === sp(T(loc, 'hintStep')), `${tag}: 85 → a coral jump, hintStep`);
    await click(page, '[data-k="seat-2"]', tag); await click(page, '[data-k="plate-80"]', tag); await click(page, '[data-k="seat-2"]', tag);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okUp', { s: 10 })), `${tag}: 80 → okUp`);
    /* ---- the open rail ---- */
    tag = `${loc} open 10…30`;
    await force(page, 'spots', '120', 8);
    is(sp(await prompt(page)) === sp(T(loc, 'pOpen')) && await count(page, '[data-k="rail"]') === 1, `${tag}: pOpen, the rail`);
    await click(page, '[data-k="plate-20"]', tag); await click(page, '[data-k="rail"]', tag, 0.5);
    await drag(page, '[data-k="plate-15"]', '[data-k="rail"]', tag, 0.1); s = await st(page);
    const v15 = 10 + 20 * s.clamps[15], v20 = 10 + 20 * s.clamps[20];
    is(Math.abs(v20 - 20) <= 1.4 && v15 < 13.6, `${tag}: 20 tapped onto the middle (${v20.toFixed(1)}), 15 DRAGGED near 12 (${v15.toFixed(1)})`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '[data-k="clamp-15"].is-wrong') === 1 && await count(page, '.lm-ghost') >= 1 && sp(await note(page)) === sp(T(loc, 'hintCountOn')), `${tag}: the lamp stops at 15, faint ties laid, hintCountOn`);
    for (let k = 0; k < 6 && Math.abs(10 + 20 * (await st(page)).clamps[15] - 15) > 1; k++) { await page.focus('[data-k="clamp-15"]'); await page.keyboard.press('ArrowRight'); await wait(20); }
    s = await st(page);
    is(Math.abs(10 + 20 * s.clamps[15] - 15) <= 1, `${tag}: → moves 15 one faint tie at a time (${(10 + 20 * s.clamps[15]).toFixed(1)})`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okOpen', { a: 15, b: 20 })), `${tag}: okOpen`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function put(page, r, v, where, tag) {
    if (r.open) { await click(page, `[data-k="plate-${v}"]`, tag); await click(page, '[data-k="rail"]', tag, where); return; }
    await click(page, `[data-k="plate-${v}"]`, tag); await click(page, `[data-k="seat-${where}"]`, tag);
  }
  async function typeName(page, txt, tag) { await click(page, `[data-k="seat-${'ARROW'}"]`.replace('ARROW', String(await page.evaluate(() => window.CountingLampActivity.st.r.name.tie))), tag); for (const ch of txt) await click(page, `[data-k="key-${ch}"]`, tag); await click(page, '[data-k="key-ok"]', tag); }
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    const fr = (v) => (v - r.open.a) / (r.open.b - r.open.a);
    if (r.hop) {
      const wrongA = r.hop.land + (r.hop.land < 9 ? 1 : -1), wrongB = r.hop.land + (r.hop.land > 1 && r.hop.land - 1 !== r.hop.start ? -1 : 2);
      if (state === 'solved') { await click(page, `[data-k="tie-${r.hop.land}"]`, tag); await check(page, tag); return; }
      await click(page, `[data-k="tie-${wrongA}"]`, tag); await check(page, tag); await click(page, `[data-k="tie-${wrongB}"]`, tag); await check(page, tag); return;
    }
    if (r.posts) {
      const b = r.posts.blanks;
      if (state === 'solved') { for (const p of b) await put(page, r, r.posts.values[p], p, tag); await check(page, tag); return; }
      for (let k = 0; k < b.length; k++) await put(page, r, k === b.length - 1 ? r.dist[0] : r.posts.values[b[k]], b[k], tag);
      await check(page, tag); await put(page, r, r.dist[1], b[b.length - 1], tag); await check(page, tag); return;
    }
    if (r.open) {
      if (state === 'solved') { for (const v of r.plates) await put(page, r, v, fr(v), tag); await check(page, tag); return; }
      await put(page, r, r.plates[0], fr(r.plates[0]), tag); await put(page, r, r.plates[1], Math.min(0.95, fr(r.plates[1]) + 0.3), tag); await check(page, tag);
      await click(page, `[data-k="clamp-${r.plates[1]}"]`, tag); await click(page, '[data-k="rail"]', tag, Math.max(0.05, fr(r.plates[1]) - 0.3)); await check(page, tag); return;
    }
    if (r.name) await typeName(page, String(r.name.v), tag);
    const homes = r.plates.map(v => v - r.from);
    if (state === 'solved') { for (let k = 0; k < r.plates.length; k++) await put(page, r, r.plates[k], homes[k], tag); await check(page, tag); return; }
    const free = (t) => t > 0 && t < 10 && homes.indexOf(t) < 0 && !(r.name && t === r.name.tie);
    const off1 = [1, -1, 2, -2, 3].map(d => homes[0] + d).find(free), off2 = [-1, 1, -2, 2, -3].map(d => homes[0] + d).find(t => free(t) && t !== off1);
    await put(page, r, r.plates[0], off1, tag); for (let k = 1; k < r.plates.length; k++) await put(page, r, r.plates[k], homes[k], tag);
    await check(page, tag); await click(page, `[data-k="seat-${off1}"]`, tag); await click(page, `[data-k="seat-${off2}"]`, tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.lm-plate,.lm-check,.lm-key,button.lm-seat:not(:disabled),.lm-rail-zone')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 - 0.5 || r.height < 44 - 0.5) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
    const W = document.querySelector('.lm-wrap').getBoundingClientRect(), wide = W.width >= 560;
    const seats = [...document.querySelectorAll('.lm-seat')].filter(vis).map(e => e.getBoundingClientRect());
    seats.forEach(q => { if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push('a seat outside the card'); });
    for (let a = 0; a < seats.length; a++) for (let b = a + 1; b < seats.length; b++) { const p = seats[a], q = seats[b]; if (p.right > q.left + 1 && q.right > p.left + 1 && p.bottom > q.top + 1 && q.bottom > p.top + 1) out.fails.push('two seats overlap'); }
    const ck = document.querySelector('.lm-check'); out.cTop = ck ? ck.getBoundingClientRect().top : 0; out.cBottom = ck ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.lm-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const im = document.querySelector('.lm-engine-pic'); if (!im || !im.complete || !im.naturalWidth) out.fails.push('the engine did not load'); else if (im.getBoundingClientRect().width < (wide ? 96 : 64) - 1) out.fails.push('the engine is small ' + Math.round(im.getBoundingClientRect().width));
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of LEVELS) for (const track of C.TRACKS) for (const idx of C.ids(level, track)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(level, track, idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${track}.${level}.${idx} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, track, level, idx);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${track}.${level}.${idx} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.lm-wrap'), W = Math.floor(e.getBoundingClientRect().width), s = document.querySelector('.lm-svg'); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 330) && s && Math.abs(+s.getAttribute('width') - W) <= 1; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.lm-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && level === '120' && [360, 704, 1024].indexOf(w) >= 0 && idx <= 1) await page.screenshot({ path: path.join(SHOT_DIR, `${track}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-counting-lamp: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
