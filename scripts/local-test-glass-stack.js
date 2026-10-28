#!/usr/bin/env node
/* =====================================================================
   local-test-glass-stack.js — ACTIVITY #148, The Glass Stack ("Comet's
   Big Leaps", 2.NBT.B.8), in a real browser with real pointer taps, in
   all 11 locales.
   Scenarios per locale (at 1024):
     · 247 + 10: the task line, one cleared square (the start, ringed),
       Comet's token on it; Check empty → hintType, no miss; 248 → the
       flag one square right of Comet on 257, the connector, the column
       band, hintAxis with "+ 10"; a keystroke takes the flag away; 2470 →
       miss 2: Comet back on 247, the move pad; ↓ → 257, dive → 357, rise
       → 257; 257 → solved, the tens line, Next 0.5 s later;
     · 296 + 10: 206 → hintEdge, Comet on sheet 300 (the spine), a pin on
       sheet 200 where the flag is; 306 → the edge line;
     · 1 and 10, 29 + 1: no spine; 20 → hintRowEnd; 30 → the row line;
     · arrow trails: 34 ↓↓→ (45 → hintTrail, 55 → solved); the mystery
       square (two tokens, 48 solved); how far 23 → 57 (empty → hintTypeFar,
       ↓3 →5 → one box wrong, hintFar; →4 → the how-far line);
     · clear glass: every square shows its number;
     · the keyboard: digits type, Backspace deletes.
   Then every round of every face at rest, at miss 2 and solved —
   reached ONCE per locale by real taps, then resized through 320…1366:
   no sideways scroll, nothing outside the card, controls ≥ 44 px, Check
   above the fold at rest, the hint in view at a miss, Comet at picture
   size, the sheet whole, no console errors.
   Usage: node scripts/local-test-glass-stack.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'glass-stack-core.js'));
const ACT = (() => { const ctx = { window: {}, GlassStackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'glass-stack-activity.js'), 'utf8') + '\n;this.__A = window.GlassStackActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/glass-stack-activity.html?activity=comet-kangaroo.tens-hundreds.2-nbt-b-8&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.GlassStackActivity && window.GlassStackActivity.st && document.querySelector('.gk-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.GlassStackActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, face, glass, k) {
    const ok = await page.evaluate((face, glass, k) => {
      const a = window.GlassStackActivity; a.api.settings.leaps = face; a.api.settings.glass = glass; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.k === k && a.st.face === face;
    }, face, glass, k);
    if (!ok) throw new Error('force failed ' + face + '/' + k);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.GlassStackActivity.st)));
  const noteT = async (page) => sp(await page.$eval('.gk-note', e => e.textContent));
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const tokLabel = (page) => page.$eval('.gk-sheetsvg', e => e.getAttribute('aria-label'));
  const typeNum = async (page, s, what) => { const t = (await st(page)).typed.length; for (let i = 0; i < t; i++) await click(page, '[data-k="key-del"]', what); for (const d of String(s)) await click(page, `[data-k="key-${d}"]`, what); };
  const typeFar = async (page, d, r, what) => {
    await click(page, '[data-k="box-1"]', what); let s = await st(page); if (s.typed) await click(page, '[data-k="key-del"]', what); await click(page, `[data-k="key-${d}"]`, what);
    await click(page, '[data-k="box-2"]', what); s = await st(page); if (s.typed2) await click(page, '[data-k="key-del"]', what); await click(page, `[data-k="key-${r}"]`, what);
  };
  const check = (page, what) => click(page, '[data-k="check"]', what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  const flagCell = (page) => page.evaluate(() => { const f = document.querySelector('.gk-flag .gk-pole'), t = document.querySelector('.gk-token:not(.is-two) circle'); if (!f || !t) return null; const a = f.getBoundingClientRect(), b = t.getBoundingClientRect(); return { dx: (a.left - b.left), dy: (a.top - b.top), c: b.width }; });

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 247 + 10 */
    await force(page, 'big', 'frost', 0);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === sp(T(loc, 'qMore10', { n: 247 })), `${loc}: the task line «${T(loc, 'qMore10', { n: 247 })}»`);
    is((await count(page, '.gk-cell.is-clear')) === 1 && (await count(page, '.gk-cell.is-start')) === 1 && (await count(page, '.gk-token')) === 1 && (await count(page, '.gk-cometimg')) === 1 && (await count(page, '.gk-edge')) === 10, `${loc}: one cleared start square, Comet's token, the picture, ten sheet edges`);
    is(sp(await tokLabel(page)) === sp(T(loc, 'aToken', { n: 247 })), `${loc}: the sheet says Comet is on 247`);
    is((await count(page, '.gk-move')) === 0, `${loc}: no move pad before miss 2`);
    await check(page, loc + ' empty'); let s = await st(page);
    is(s.misses === 0 && !s.leapt && (await noteT(page)) === sp(T(loc, 'hintType')), `${loc}: Check with nothing typed → «${T(loc, 'hintType')}»`);
    await typeNum(page, '248', loc); await check(page, loc + ' miss 1'); s = await st(page);
    await wait(450); const fc = await flagCell(page);
    is(s.misses === 1 && s.flag === 248 && s.token === 257 && (await count(page, '.gk-flag')) === 1 && (await count(page, '.gk-connector')) === 1 && (await count(page, '.gk-band')) === 1, `${loc}: 248 → the flag, the connector and the column band; Comet on 257`);
    is(fc && fc.dx > fc.c * 0.9 && fc.dy < -fc.c * 0.6, `${loc}: the flag stands on 248 — one row up and one column right of Comet on 257 (${fc && Math.round(fc.dx)}, ${fc && Math.round(fc.dy)})`);
    is((await noteT(page)) === sp(T(loc, 'hintAxis', { leap: '+ 10' })) && (await count(page, '.gk-box.is-wrong')) === 1, `${loc}: «${T(loc, 'hintAxis', { leap: '+ 10' })}», the box wrong`);
    await click(page, '[data-k="key-del"]', loc); is((await count(page, '.gk-flag')) === 0 && (await noteT(page)) === '', `${loc}: a keystroke takes the flag and the hint away`);
    await typeNum(page, '2470', loc); await check(page, loc + ' miss 2'); s = await st(page);
    is(s.help && s.token === 247 && (await noteT(page)) === sp(T(loc, 'hintMove')) && (await count(page, '.gk-move')) === 6 && (await count(page, '.gk-flag')) === 0, `${loc}: 2470 → miss 2: Comet back on 247, six move buttons, «${T(loc, 'hintMove')}»`);
    await click(page, '[data-k="move-D"]', loc + ' down'); s = await st(page);
    is(s.token === 257 && sp(await tokLabel(page)) === sp(T(loc, 'aToken', { n: 257 })), `${loc}: the down arrow moves Comet to 257`);
    await click(page, '[data-k="move-DIVE"]', loc + ' dive'); s = await st(page);
    is(s.token === 357 && (await page.$eval('.gk-edge.is-cur .gk-edgelab', e => e.textContent)) === '300', `${loc}: one sheet deeper → 357, the spine on 300`);
    await click(page, '[data-k="move-RISE"]', loc + ' rise'); s = await st(page); is(s.token === 257, `${loc}: one sheet up → 257`);
    await page.evaluate(() => { window.GlassStackActivity.OK_MS = 500; });
    await typeNum(page, '257', loc); await check(page, loc + ' solved'); s = await st(page);
    const okl = T(loc, 'okTens', { start: 247, leap: '+ 10', land: 257 });
    is(s.done && (await noteT(page)) === sp(okl) && (await count(page, '.gk-key')) === 0 && (await count(page, '.gk-box.is-ok')) === 1, `${loc}: 257 → «${okl}», the keypad away`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.GlassStackActivity.OK_MS = 600000; });
    /* 296 + 10 */
    await force(page, 'big', 'frost', 9); await typeNum(page, '206', loc); await check(page, loc + ' edge'); s = await st(page);
    is(s.token === 306 && (await noteT(page)) === sp(T(loc, 'hintEdge')) && (await page.$eval('.gk-edge.is-cur .gk-edgelab', e => e.textContent)) === '300' && (await page.$$eval('.gk-edge', a => a.findIndex(e => e.querySelector('.gk-pin')))) === 2, `${loc}: 206 → «${T(loc, 'hintEdge')}», Comet on sheet 300, a pin on sheet 200`);
    await typeNum(page, '306', loc); await check(page, loc + ' edge ok'); s = await st(page);
    is(s.done && (await noteT(page)) === sp(T(loc, 'okEdge', { start: 296, leap: '+ 10', land: 306 })), `${loc}: 306 → the edge line`);
    /* 1 and 10, 29 + 1 */
    await force(page, 'small', 'frost', 4);
    is(await page.$eval('.gk-spine', e => e.offsetParent === null), `${loc}: 1 and 10 has no spine`);
    await typeNum(page, '20', loc); await check(page, loc + ' row'); s = await st(page);
    is(s.token === 30 && (await noteT(page)) === sp(T(loc, 'hintRowEnd')), `${loc}: 20 → «${T(loc, 'hintRowEnd')}»`);
    await typeNum(page, '30', loc); await check(page, loc + ' row ok'); s = await st(page);
    is(s.done && (await noteT(page)) === sp(T(loc, 'okRow', { start: 29, leap: '+ 1', land: 30 })), `${loc}: 30 → the row line`);
    /* arrow trails */
    await force(page, 'trails', 'frost', 0);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === sp(T(loc, 'qFollow', { n: 34 })) && (await count(page, '.gk-card .gk-chip')) === 3, `${loc}: follow 34 with three arrow chips`);
    await typeNum(page, '45', loc); await check(page, loc + ' trail'); is((await noteT(page)) === sp(T(loc, 'hintTrail')), `${loc}: 45 → «${T(loc, 'hintTrail')}»`);
    await typeNum(page, '55', loc); await check(page, loc + ' trail ok'); s = await st(page);
    is(s.done && (await noteT(page)) === sp(T(loc, 'okTrail', { land: 55 })), `${loc}: 55 → solved`);
    await force(page, 'trails', 'frost', 5);
    is((await count(page, '.gk-token.is-two')) === 1 && (await count(page, '.gk-cell.is-clear')) === 2, `${loc}: the mystery square — two tokens on 38 and 47`);
    await typeNum(page, '48', loc); await check(page, loc + ' mystery'); s = await st(page); is(s.done, `${loc}: 48 solves the mystery`);
    await force(page, 'trails', 'frost', 7);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === sp(T(loc, 'qFar', { a: 23, b: 57 })) && (await count(page, '[data-k^="box-"]')) === 2, `${loc}: how far 23 → 57, two answer boxes`);
    await check(page, loc + ' far empty'); is((await noteT(page)) === sp(T(loc, 'hintTypeFar')), `${loc}: empty boxes → «${T(loc, 'hintTypeFar')}»`);
    await typeFar(page, 3, 5, loc); await check(page, loc + ' far miss'); s = await st(page);
    is(s.misses === 1 && (await noteT(page)) === sp(T(loc, 'hintFar')) && (await count(page, '.gk-box.is-wrong')) === 1, `${loc}: ↓3 →5 → one box wrong, «${T(loc, 'hintFar')}»`);
    await typeFar(page, 3, 4, loc); await check(page, loc + ' far ok'); s = await st(page);
    is(s.done && (await noteT(page)) === sp(T(loc, 'okFar', { a: 23, b: 57, d: 3, r: 4 })), `${loc}: ↓3 →4 → the how-far line`);
    /* clear glass */
    await force(page, 'big', 'clear', 0);
    is((await count(page, '.gk-cell.is-clear')) === 100 && (await count(page, '.gk-num')) >= 99, `${loc}: clear glass shows every number`);
    /* the keyboard */
    await force(page, 'big', 'frost', 0); await page.focus('.gk-wrap'); await page.keyboard.press('2'); await page.keyboard.press('5'); await page.keyboard.press('8'); await page.keyboard.press('Backspace'); await wait(20);
    s = await st(page); is(s.typed === '25', `${loc}: the keyboard types and deletes (${s.typed})`);
    is(!errs.length, `${loc}: no console errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();

    /* every round of every face: rest, miss 2, solved — reached once, resized through the widths */
    const p2 = await open(1024, loc), pg = p2.page;
    for (const face of ['small', 'big', 'trails']) {
      const R = C.rounds(face);
      for (let k = 0; k < R.length; k++) for (const state of ['rest', 'miss', 'solved']) {
        await pg.setViewport({ width: 1024, height: 900 }); await wait(80); await force(pg, face, 'frost', k); await wait(20);
        if (state !== 'rest') {
          const r = R[k];
          if (r.kind === 'far') {
            if (state === 'miss') { await typeFar(pg, r.answer.down + 1, r.answer.right, 'miss'); await check(pg, 'miss 1'); await typeFar(pg, r.answer.down, r.answer.right + 1, 'miss'); await check(pg, 'miss 2'); }
            else { await typeFar(pg, r.answer.down, r.answer.right, 'solved'); await check(pg, 'solved'); }
          } else if (state === 'miss') { await typeNum(pg, r.answer + 10, 'miss'); await check(pg, 'miss 1'); await typeNum(pg, r.answer + 1, 'miss'); await check(pg, 'miss 2'); }
          else { await typeNum(pg, r.answer, 'solved'); await check(pg, 'solved'); }
          const s2 = await st(pg);
          if (state === 'miss' && !(s2.help && s2.verdict)) is(false, `${loc} ${face} r${k}: did not reach miss 2`);
          if (state === 'solved' && !s2.done) is(false, `${loc} ${face} r${k}: did not solve`);
        }
        for (const w of WIDTHS) {
          await pg.setViewport({ width: w, height: VH(w) }); await wait(30); await pg.waitForFunction(() => { const e = document.querySelector('.gk-wrap'); return e && e.classList.contains('is-wide') === (e.getBoundingClientRect().width >= 560); }, { timeout: 1000 }).catch(() => {}); await pg.evaluate(() => window.scrollTo(0, 0));
          const r = await pg.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app').getBoundingClientRect();
            document.querySelectorAll('.gk-wrap button, .gk-wrap img, .gk-sheetsvg, .gk-spine, .gk-card, .gk-box').forEach(e => { if (!vis(e) && !(e instanceof SVGElement)) return; const b = e.getBoundingClientRect(); if (!b.width) return; if (b.left < card.left - 1 || b.right > card.right + 1) F('outside the card: ' + (e.getAttribute('data-k') || e.className.baseVal || e.className)); });
            document.querySelectorAll('.gk-wrap button').forEach(e => { if (!vis(e) || e.disabled) return; const b = e.getBoundingClientRect(); if (b.width < 43.5 || b.height < 43.5) F('control under 44: ' + e.getAttribute('data-k') + ' ' + Math.round(b.width) + '×' + Math.round(b.height)); });
            const chk = document.querySelector('[data-k="check"]'); if (state === 'rest' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            const nt = document.querySelector('.gk-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            const sv = document.querySelector('.gk-sheetsvg').getBoundingClientRect(); document.querySelectorAll('.gk-token circle, .gk-flag, .gk-dchip').forEach(x => { const b = x.getBoundingClientRect(); if (b.left < sv.left - 0.5 || b.right > sv.right + 0.5 || b.top < sv.top - 0.5 || b.bottom > sv.bottom + 0.5) F('a mark outside the sheet: ' + (x.className.baseVal || x.tagName)); });
            const cells = document.querySelectorAll('.gk-cell'); if (cells.length !== 100) F('cells ' + cells.length); else { const p = cells[1].getBoundingClientRect().left - cells[0].getBoundingClientRect().left; if (p < 19.5) F('a square ' + Math.round(p) + ' px'); }
            const ci = document.querySelector('.gk-cometimg'), wide = document.querySelector('.gk-wrap').classList.contains('is-wide'); if (!ci) F('no Comet'); else { const b = ci.getBoundingClientRect(); if (Math.min(b.width, b.height) < (wide ? 95.5 : 63.5)) F('Comet ' + Math.round(b.width)); } if (vw >= 700 && !wide) F('not the wide layout at ' + vw);
            return out;
          }, state);
          is(!r.fails.length, `${loc} ${face} r${k} ${state} @${w}: ${r.fails.slice(0, 3).join('; ')}`);
        }
      }
    }
    is(!p2.errs.length, `${loc}: no console errors in the sweep (${p2.errs.slice(0, 2).join(' | ')})`);
    await pg.close();
    console.log(`  ${loc}: ${Math.round((Date.now() - t0) / 1000)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-glass-stack: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
