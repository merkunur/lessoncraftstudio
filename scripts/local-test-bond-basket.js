#!/usr/bin/env node
/* =====================================================================
   local-test-bond-basket.js — ACTIVITY #81, The Covered Basket ("Find the
   Total", 1.OA.A.1), in a real browser with REAL pointer clicks (never a
   model call to make a move). For every locale:
     · find the total (8 + 3): the tick before a pour is a hint, no miss; a
       tap pours the 8 — the cloth covers it, the tag says 8 and NEVER
       changes while the 3 are posted (the running count is never shown);
       the tick with things waiting is a hint; a wrong total is miss 1 —
       the arc writes 9, 10, 11 (one after the cloth); a second wrong total
       lifts the cloth into two-colour ten-frame rows; the right total fills
       the whole circle; the bowls never print a numeral;
     · the nudge: pouring the smaller bowl first brings "pour the bowl with
       more" on the NEXT round, once per pass;
     · make the whole (10 = 7 + ?): a post past 10 rolls off; typing the
       whole is miss 1 with "the basket counted 8, 9, 10"; too few posted
       says the basket is full when it holds 10; the right number succeeds;
     · empty the basket, the peek (a long press), the dots and ten-frame
       coats; en: the keyboard;
     · every round of every task at rest AND solved at 320–1366: every
       control above the fold at rest, the success line in view when solved,
       no sideways scroll, every control ≥ 44 px, every library picture at
       its floor (96 px wide, 64 px phone).
   Usage: node scripts/local-test-bond-basket.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '081-bond-basket', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'bond-basket-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, BondBasketCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'bond-basket-activity.js'), 'utf8') + '\n;this.__A = BondBasketActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
const fill = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, x) => x in a ? a[x] : m);
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
    await page.goto(`${base}/bond-basket-activity.html?activity=numberbond.find-the-total.1-oa-a-1&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.BondBasketActivity && window.BondBasketActivity.st && document.querySelector('.bb-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.BondBasketActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, task, idx, opts) {
    await page.evaluate((task, idx, o) => { const a = window.BondBasketActivity; a.api.settings.task = task; a.api.settings.coat = (o && o.coat) || 'pictures'; if (!(o && o.keepPool)) { a._pool = null; a._ensurePool(); } a._start(idx); a._render2(); }, task, idx, opts || {});
    await page.waitForFunction(() => { const im = [...document.querySelectorAll('.bb-wrap img.bb-pic')]; return im.length >= 1 && im.every(i => i.complete && i.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(50);
  }
  const st = (page) => page.evaluate(() => { const s = window.BondBasketActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, show: s.show, poured: s.poured, under: s.under, posted: s.posted, left: s.left, typed: s.typed }; });
  const note = (page) => page.evaluate(() => document.querySelector('.bb-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(30); return true;
  }
  const key = (page, k, tag) => click(page, `[data-k="key-${k}"]`, tag);
  const typeN = async (page, n, tag) => { for (const d of String(n)) await key(page, d, tag); };
  const clear = async (page, tag) => { while ((await st(page)).typed) await key(page, 'del', tag); };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- find the total, 8 + 3 (round 4) ---- */
    let tag = `${loc} total`;
    await force(page, 'total', 4);
    is(!/\d/.test(await page.evaluate(() => [...document.querySelectorAll('.bb-bowl')].map(b => b.textContent).join(''))), `${tag}: the bowls print no numeral`);
    await key(page, 'ok', tag); let s = await st(page);
    is(s.misses === 0 && s.last === 'pour' && sp(await note(page)) === sp(T(loc, 'hPour')), `${tag}: the tick before a pour is a hint, no miss`);
    await click(page, '.bb-bowl[data-side="L"]', tag); s = await st(page);
    is(s.poured === 'L' && s.under === 8 && (await text(page, '.bb-cloth .bb-tag')) === '8' && await count(page, '.bb-basket .bb-pic') === 0, `${tag}: the 8 is poured under the cloth, the tag says 8`);
    await key(page, 'ok', tag); s = await st(page);
    is(s.misses === 0 && s.last === 'waiting' && sp(await note(page)) === sp(T(loc, 'hWaiting')), `${tag}: things waiting is a hint`);
    for (let k = 1; k <= 3; k++) { await click(page, '.bb-bowl[data-side="R"]', tag); is((await text(page, '.bb-cloth .bb-tag')) === '8', `${tag}: post ${k}, the tag still says 8`); }
    s = await st(page); is(s.posted === 3 && s.left === 0 && await count(page, '.bb-bowl[data-side="R"] .bb-dimple') === 3, `${tag}: three posted, three dimples`);
    is(!/(^|\D)11(\D|$)/.test(await page.evaluate(() => document.querySelector('.bb-wrap').textContent)), `${tag}: the running count (11) is shown nowhere`);
    await typeN(page, 10, tag); await key(page, 'ok', tag); s = await st(page);
    const arc = await page.evaluate(() => [...document.querySelectorAll('.bb-arcn')].map(e => e.textContent).join(','));
    is(s.misses === 1 && arc === '9,10,11' && sp(await note(page)) === sp(fill(T(loc, 'hMiss1'), { first: 8, next: '9, 10, 11' })), `${tag}: miss 1 counts on from 8 (${arc}) — «${await note(page)}»`);
    await key(page, 'del', tag); is(await count(page, '.bb-arcn') === 0, `${tag}: a new move takes the help away`);
    await clear(page, tag); await typeN(page, 12, tag); await key(page, 'ok', tag); s = await st(page);
    is(s.misses === 2 && await count(page, '.bb-basket.is-lifted .bb-rows') === 1 && sp(await note(page)) === sp(fill(T(loc, 'hMiss2'), { a: 8, b: 3, total: 11 })), `${tag}: miss 2 lifts the cloth`);
    await clear(page, tag); await typeN(page, 11, tag); await key(page, 'ok', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okTotal'), { a: 8, b: 3, total: 11, first: 8 })) && (await text(page, '.bb-whole.is-full')) === '11', `${tag}: 11 — «${await note(page)}»`);
    /* ---- the nudge: the smaller bowl first, then the next round, once per pass ---- */
    tag = `${loc} nudge`;
    await force(page, 'total', 0); await click(page, '.bb-bowl[data-side="L"]', tag);
    for (let k = 0; k < 4; k++) await click(page, '.bb-bowl[data-side="R"]', tag);
    await typeN(page, 7, tag); await key(page, 'ok', tag); is((await st(page)).done, `${tag}: 3 + 4 poured smaller-first, solved`);
    await force(page, 'total', 1, { keepPool: true });
    is(sp(await note(page)) === sp(T(loc, 'hBigger')), `${tag}: the next round nudges «${await note(page)}»`);
    await click(page, '.bb-bowl[data-side="R"]', tag); for (let k = 0; k < 6; k++) await click(page, '.bb-bowl[data-side="L"]', tag);
    await typeN(page, 8, tag); await key(page, 'ok', tag);
    await force(page, 'total', 3, { keepPool: true });
    is(sp(await note(page)) === '', `${tag}: once per pass — no second nudge`);
    /* ---- empty the basket ---- */
    await click(page, '.bb-bowl[data-side="L"]', `${loc} empty`); await click(page, '.bb-bowl[data-side="R"]', `${loc} empty`);
    await click(page, '.bb-empty', `${loc} empty`); s = await st(page);
    is(!s.poured && s.posted === 0 && s.misses === 0 && await count(page, '.bb-cloth') === 0, `${loc}: the round arrow empties the basket, no miss`);
    /* ---- the peek ---- */
    await click(page, '.bb-bowl[data-side="R"]', `${loc} peek`);
    const bb = await page.evaluate(() => { const r = document.querySelector('.bb-basket').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.8 }; });
    await page.mouse.move(bb.x, bb.y); await page.mouse.down(); await wait(450);
    is(await count(page, '.bb-basket.is-peek .bb-pile') === 1, `${loc}: a long press lifts a corner`); await page.mouse.up();
    /* ---- make the whole, 10 = 7 + ? (round 0) ---- */
    tag = `${loc} whole`;
    await force(page, 'whole', 0); s = await st(page);
    is(s.poured && s.under === 7 && (await text(page, '.bb-rimtag')) === '10' && (await text(page, '.bb-cloth .bb-tag')) === '7', `${tag}: the cloth holds 7, the rim says 10`);
    await click(page, '.bb-bowl[data-side="R"]', tag); await click(page, '.bb-bowl[data-side="R"]', tag);
    await typeN(page, 2, tag); await key(page, 'ok', tag);
    is((await st(page)).misses === 1 && sp(await note(page)) === sp(fill(T(loc, 'hFull'), { whole: 10 })), `${tag}: too few posted — «${await note(page)}»`);
    await click(page, '.bb-bowl[data-side="R"]', tag); await click(page, '.bb-bowl[data-side="R"]', tag); s = await st(page);
    is(s.posted === 3 && await count(page, '.bb-roll') === 1, `${tag}: the fourth post rolls off, still 3 posted`);
    await clear(page, tag); await typeN(page, 10, tag); await key(page, 'ok', tag);
    is(sp(await note(page)) === sp(fill(T(loc, 'hMiss2w'), { given: 7, added: 3, whole: 10 })), `${tag}: the whole typed — miss 2 shows 7 and 3 make 10`);
    await force(page, 'whole', 0); for (let k = 0; k < 3; k++) await click(page, '.bb-bowl[data-side="R"]', tag);
    await typeN(page, 10, tag); await key(page, 'ok', tag);
    is(sp(await note(page)) === sp(fill(T(loc, 'hMiss1w'), { first: 7, next: '8, 9, 10' })), `${tag}: typing the whole asks how many numbers — «${await note(page)}»`);
    await clear(page, tag); await typeN(page, 3, tag); await key(page, 'ok', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okWhole'), { given: 7, added: 3, whole: 10 })), `${tag}: 3 posted — «${await note(page)}»`);
    /* ---- coats ---- */
    await force(page, 'to20', 0, { coat: 'dots' }); is(await count(page, '.bb-die') >= 3, `${loc}: dots coat draws dice`);
    await force(page, 'to20', 0, { coat: 'frames' }); is(await count(page, '.bb-frame') === 2, `${loc}: ten-frame coat`);
    await force(page, 'to20', 0, { coat: 'pictures' }); is(await count(page, '.bb-bowl[data-side="L"] img.bb-pic') === 4 && await count(page, '.bb-bowl[data-side="R"] .bb-frame') === 1, `${loc}: 10 does not fit a bowl as pictures — a ten frame`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- en: the keyboard ---- */
  {
    const { page } = await open(1024, 'en'); const tag = 'en keys';
    await force(page, 'total', 4);
    await page.focus('.bb-bowl[data-side="L"]'); await page.keyboard.press('Enter'); await wait(40);
    for (let k = 0; k < 3; k++) { await page.focus('.bb-bowl[data-side="R"]'); await page.keyboard.press('Enter'); await wait(30); }
    await page.keyboard.press('1'); await page.keyboard.press('1'); await wait(30);
    let s = await st(page); is(s.poured === 'L' && s.posted === 3 && s.typed === '11', `${tag}: Enter pours and posts, digits type (${s.typed})`);
    await page.focus('[data-k="key-ok"]'); await page.keyboard.press('Enter'); await wait(40);
    s = await st(page); is(s.done, `${tag}: Enter on the tick checks`);
    await page.close();
  }

  /* ---- every round of every task at rest and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const task of C.FACES) for (const idx of C.ids(task)) for (const state of ['rest', 'solved']) {
      const tag = `${loc} @${w} ${task}.${idx} ${state}`;
      await force(page, task, idx);
      if (state === 'solved') {
        await page.evaluate(() => { const a = window.BondBasketActivity, C = window.BondBasketCore, s = a.st, r = s.r;
          if (r.face !== 'whole') C.pour(s, r.a >= r.b ? 'L' : 'R');
          const n = r.face === 'whole' ? r.answer : s.left; for (let k = 0; k < n; k++) C.post(s);
          String(r.answer).split('').forEach(d => C.type(s, d)); a._paint(); a._check(); });
        await page.waitForFunction(() => [...document.querySelectorAll('.bb-wrap img.bb-pic')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
        await wait(60);
      } else await page.evaluate(() => window.scrollTo(0, 0));
      const m = await page.evaluate(() => {
        const L = window.BondBasketCore.layout(window.BondBasketActivity._width()), out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        out.low = Math.max.apply(null, [...document.querySelectorAll('.bb-key,.bb-bowl,.bb-empty')].filter(vis).map(e => e.getBoundingClientRect().bottom));
        const nr = document.querySelector('.bb-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        [...document.querySelectorAll('.bb-key,.bb-bowl,.bb-empty')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        [...document.querySelectorAll('.bb-wrap img.bb-pic')].filter(vis).forEach(i => { const r = i.getBoundingClientRect(), floor = L.mode === 'wide' ? 96 : 64; if (Math.round(Math.min(r.width, r.height)) < floor) out.fails.push('picture ' + Math.round(r.width) + ' < ' + floor); });
        [...document.querySelectorAll('.bb-bowl')].forEach(b => { const R = b.getBoundingClientRect(); [...b.querySelectorAll('img,svg,.bb-dimple')].filter(vis).forEach(c => { const r = c.getBoundingClientRect(); if (r.right > R.right + 1 || r.left < R.left - 1 || r.bottom > R.bottom + 1) out.fails.push('a thing spills out of its bowl'); }); });
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest') is(m.low <= VH(w), `${tag}: every control above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
      else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`);
      is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && idx === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${task}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-bond-basket: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
