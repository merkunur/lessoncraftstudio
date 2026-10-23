#!/usr/bin/env node
/* =====================================================================
   local-test-ten-plug.js — ACTIVITY #85, The Ten Plug ("Make a Ten to
   Add", 1.OA.C.6), in a real browser with REAL taps on the stick's joints,
   REAL drags into the rack, and the keys (never a model call to make a
   move). For every locale:
     · 8 + 5: the tick before the plug is a hint, no miss, the digits sleep;
       a tap on joint 3 snaps the stick 3 | 2 and the bond shows 3 and 2; the
       3 dragged into the hole bounces (nLong); the 2 fills it: the rack is
       gold, the strip reads 8 + 2 + 3 = 10 + 3, the shelves hold a gold ten
       and 3 ones; 15 (= 10 + 5) misses with 2 extra ghost places glowing and
       a thread into the ten (hLeft); 12 is miss 2 (hOn, the ten labelled 10);
       13 succeeds with the numeric chain;
     · 7 + 5: a 2 is too short (one gap glows); tapped out of the rack; the
       round arrow joins the stick again;
     · 6 + 8: the swap button puts the 8 in the rack;
     · Enter on a focused piece plugs it;
     · In my head, 8 + 7: the keys are awake; 17 misses and the stick snaps
       and plugs by itself (hShown); 15 succeeds;
     · Make 10, 7: the 7 bounces, the 3 fills, 3 is the answer (okM10).
   And every round of both levels at rest, plugged, at miss 2 and solved
   at 320–1366: every control above the fold at rest, the keys in view after
   a miss, the success line in view, no sideways scroll, every control ≥ 44
   px, every cube inside the rack, the board inside the card.
   Usage: node scripts/local-test-ten-plug.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '085-ten-plug', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'ten-plug-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TenPlugCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'ten-plug-activity.js'), 'utf8') + '\n;this.__A = TenPlugActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/ten-plug-activity.html?activity=numberbond.make-ten-to-add.1-oa-c-6&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TenPlugActivity && window.TenPlugActivity.st && document.querySelector('.tp-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.TenPlugActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, mode) {
    await page.evaluate((level, idx, mode) => { const a = window.TenPlugActivity; a.api.settings.level = level; a.api.settings.mode = mode || 'snap'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); window.scrollTo(0, 0); }, level, idx, mode);
    await wait(30);
  }
  const st = (page) => page.evaluate(() => { const s = window.TenPlugActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, plugged: s.plugged, pieces: s.pieces.map(p => p.len + p.where[0]).join(','), a: s.a, b: s.b, typed: s.typed }; });
  const note = (page) => page.evaluate(() => document.querySelector('.tp-note').textContent);
  const eq = (page) => page.evaluate(() => document.querySelector('.tp-eq').textContent.replace(/[  ]/g, ' '));
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  /* a real tap on joint j of the mat piece with that length */
  async function tapJoint(page, len, j, tag) {
    await page.evaluate(() => window.scrollTo(0, 0));
    const pt = await page.evaluate((len, j) => {
      const a = window.TenPlugActivity, G = a._geom(a._width()), b = [...document.querySelectorAll('.tp-piece')].find(e => +e.getAttribute('data-len') === len); if (!b) return null;
      const r = b.getBoundingClientRect(); return { x: r.left + (r.width - len * G.p) / 2 + j * G.p, y: r.top + r.height / 2 };
    }, len, j);
    if (!pt) { is(false, `${tag}: a piece of ${len} to snap`); return; }
    await page.mouse.click(pt.x, pt.y); await wait(30);
  }
  async function dragToRack(page, len, tag) {
    await page.evaluate(() => window.scrollTo(0, 0));
    const pts = await page.evaluate((len) => { const b = [...document.querySelectorAll('.tp-piece')].find(e => +e.getAttribute('data-len') === len), k = document.querySelector('.tp-rack'); if (!b || !k) return null; const r = b.getBoundingClientRect(), q = k.getBoundingClientRect(); return { x0: r.left + r.width / 2, y0: r.top + r.height / 2, x1: q.left + q.width * 0.8, y1: q.top + q.height / 2 }; }, len);
    if (!pts) { is(false, `${tag}: a piece of ${len} to drag`); return; }
    await page.mouse.move(pts.x0, pts.y0); await page.mouse.down();
    for (let k = 1; k <= 8; k++) await page.mouse.move(pts.x0 + (pts.x1 - pts.x0) * k / 8, pts.y0 + (pts.y1 - pts.y0) * k / 8);
    await page.mouse.up(); await wait(40);
  }
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const typeKeys = async (page, s, tag) => { for (const d of s) await click(page, `[data-k="key-${d}"]`, tag); };
  const tick = (page, tag) => click(page, '[data-k="key-ok"]', tag);
  const clear = async (page, tag) => { let s = await st(page); while (s.typed) { await click(page, '[data-k="key-del"]', tag); s = await st(page); } };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- 8 + 5 ---- */
    let tag = `${loc} 8+5`;
    await force(page, 'add', 0);
    await tick(page, tag); let s = await st(page);
    is(s.misses === 0 && s.last === 'snap' && sp(await note(page)) === sp(T(loc, 'hSnap')), `${tag}: the tick before the plug is a hint, no miss`);
    is(await count(page, '[data-k="key-5"]:disabled') === 1, `${tag}: the digits sleep until the ten is full`);
    await tapJoint(page, 5, 3, tag); s = await st(page);
    is(s.pieces === '3m,2m', `${tag}: a tap on joint 3 snaps 3 | 2 (${s.pieces})`);
    is((await page.evaluate(() => [...document.querySelectorAll('.tp-bond text')].map(t => t.textContent).join(','))) === '5,3,2', `${tag}: the bond shows 5 over 3 and 2`);
    await dragToRack(page, 3, tag); s = await st(page);
    is(s.last === 'long' && !s.plugged && s.pieces === '3m,2m' && sp(await note(page)) === sp(T(loc, 'nLong')), `${tag}: the 3 is too long and bounces back`);
    await dragToRack(page, 2, tag); s = await st(page);
    is(s.plugged && (await count(page, '.tp-rack.is-gold')) === 1 && sp(await note(page)) === sp(T(loc, 'nFit')), `${tag}: the 2 fills the ten, the rack is gold`);
    is((await eq(page)).indexOf('8 + 5 = 8 + 2 + 3 = 10 + 3 =') === 0, `${tag}: the strip shows the strategy (${await eq(page)})`);
    is(await count(page, '.tp-mini.is-gold') === 10 && await count(page, '.tp-mini.is-teal') === 3, `${tag}: the shelves hold a gold ten and 3 ones`);
    await typeKeys(page, '15', tag); await tick(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hOver')) && await count(page, '.tp-ghost.is-extra') === 2 && await count(page, '.tp-thread') === 1, `${tag}: 15 (10 + 5) shows 2 extra ghost places and a thread into the ten`);
    await clear(page, tag);
    is((await note(page)) === '', `${tag}: a key press takes the help away`);
    await typeKeys(page, '12', tag); await tick(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hOn')) && await count(page, '.tp-tenlab') >= 1, `${tag}: miss 2 labels the ten 10, hOn`);
    is(await count(page, '.tp-bnum') === 0, `${tag}: the ones are not numbered`);
    await clear(page, tag); await typeKeys(page, '13', tag); await tick(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === '8 + 5 = 8 + 2 + 3 = 10 + 3 = 13', `${tag}: 13 succeeds with the chain (${await note(page)})`);

    /* ---- 7 + 5: too short, taken out, joined again ---- */
    tag = `${loc} 7+5`;
    await force(page, 'add', 5);
    await tapJoint(page, 5, 2, tag); await dragToRack(page, 2, tag); s = await st(page);
    is(s.last === 'short' && s.pieces.indexOf('2r') >= 0 && await count(page, '.tp-slot.is-gap') === 1 && sp(await note(page)) === sp(T(loc, 'nShort')), `${tag}: a 2 in a hole of 3 is too short, one gap glows`);
    await click(page, '.tp-inrack', tag); s = await st(page);
    is(s.pieces === '3m,2m', `${tag}: tapping it in the rack takes it out (${s.pieces})`);
    await click(page, '[data-k="undo"]', tag); s = await st(page);
    is(s.pieces === '5m', `${tag}: the round arrow joins the stick again`);
    /* ---- 6 + 8: swap ---- */
    tag = `${loc} 6+8`;
    await force(page, 'add', 6);
    await click(page, '[data-k="swap"]', tag); s = await st(page);
    is(s.a === 8 && s.b === 6 && (await eq(page)).indexOf('8 + 6') === 0, `${tag}: the swap puts the 8 in the rack (${await eq(page)})`);
    /* Enter on a focused piece plugs it */
    await tapJoint(page, 6, 2, tag); await page.focus('.tp-piece[data-len="2"]'); await page.keyboard.press('Enter'); await wait(30); s = await st(page);
    is(s.plugged, `${tag}: Enter on the 2 plugs it`);
    /* ---- In my head: 8 + 7 ---- */
    tag = `${loc} head 8+7`;
    await force(page, 'add', 3, 'head');
    is(await count(page, '[data-k="key-1"]:disabled') === 0, `${tag}: the keys are awake`);
    await typeKeys(page, '17', tag); await tick(page, tag); s = await st(page);
    is(s.plugged && s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hShown', { left: 5 })), `${tag}: 17 makes the stick snap and plug by itself, hShown`);
    await clear(page, tag); await typeKeys(page, '15', tag); await tick(page, tag); s = await st(page);
    is(s.done, `${tag}: 15 succeeds`);
    /* ---- Make 10: 7 ---- */
    tag = `${loc} m10 7`;
    await force(page, 'm10', 0);
    is(await count(page, '.tp-shelves[hidden]') === 1 && (await eq(page)).indexOf('7 +') === 0, `${tag}: the strip reads 7 + ? = 10, no shelves`);
    await tapJoint(page, 10, 3, tag); await dragToRack(page, 7, tag); s = await st(page);
    is(s.last === 'long' && !s.plugged, `${tag}: the 7 does not fit`);
    await dragToRack(page, 3, tag); s = await st(page);
    is(s.plugged && sp(await note(page)) === sp(T(loc, 'nFitM10')), `${tag}: the 3 fills the hole`);
    await typeKeys(page, '3', tag); await tick(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okM10', { k: 7, p: 3 })), `${tag}: okM10`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round of both levels at rest, plugged, at miss 2 and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv)) for (const state of ['rest', 'plugged', 'miss2', 'solved']) {
      const tag = `${loc} @${w} ${lv}.${idx} ${state}`, r = C.round(lv, idx), hole = 10 - r.a;
      await force(page, lv, idx);
      if (state !== 'rest') {
        await tapJoint(page, r.b, hole, tag); await dragToRack(page, hole, tag);
        if (!(await st(page)).plugged) is(false, `${tag}: plugged by real taps and drags`);
        if (state === 'miss2') { const w1 = String(r.answer === 9 ? 8 : r.answer + 1), w2 = String(r.answer === 1 ? 2 : r.answer - 1); await typeKeys(page, w1, tag); await tick(page, tag); await clear(page, tag); await typeKeys(page, w2, tag); await tick(page, tag); await page.evaluate(() => document.querySelector('.tp-keys').scrollIntoView({ block: 'nearest', behavior: 'instant' })); }
        if (state === 'solved') { await typeKeys(page, String(r.answer), tag); await tick(page, tag); await page.evaluate(() => document.querySelector('.tp-note').scrollIntoView({ block: 'nearest', behavior: 'instant' })); }
        if (state === 'plugged') await page.evaluate(() => window.scrollTo(0, 0));
      }
      await wait(20);
      const m = await page.evaluate(() => {
        const out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden]') && !e.hidden; };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const ctrls = [...document.querySelectorAll('.tp-piece,.tp-key,.tp-tbtn,.tp-inrack')].filter(vis);
        out.low = Math.max.apply(null, ctrls.map(e => e.getBoundingClientRect().bottom));
        const kr = document.querySelector('.tp-keys').getBoundingClientRect(); out.kTop = kr.top; out.kBottom = kr.bottom;
        const nr = document.querySelector('.tp-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        const R = document.querySelector('.tp-rack').getBoundingClientRect();
        document.querySelectorAll('.tp-rack rect').forEach(c => { const q = c.getBoundingClientRect(); if (q.left < R.left - 1 || q.right > R.right + 1) out.fails.push('a cube outside the rack'); });
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        document.querySelectorAll('.tp-board > *, .tp-shelves svg, .tp-eq').forEach(e => { const q = e.getBoundingClientRect(); if (vis(e) && (q.left < app.left - 1 || q.right > app.right + 1)) out.fails.push('outside the card: ' + e.className); });
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest' || state === 'plugged') is(m.low <= VH(w), `${tag}: every control above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
      else if (state === 'miss2') is(m.kTop >= 0 && m.kBottom <= VH(w) + 1, `${tag}: the keys in view after a miss (${Math.round(m.kTop)}–${Math.round(m.kBottom)})`);
      else { is((await st(page)).done, `${tag}: solved`); is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`); }
      is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && idx === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-ten-plug: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
