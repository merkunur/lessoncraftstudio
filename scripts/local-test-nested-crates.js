#!/usr/bin/env node
/* =====================================================================
   local-test-nested-crates.js — ACTIVITY #146, The Nested Crates ("Tuck
   Breaks a Hundred", 2.NBT.B.7), in a real browser with real pointer
   taps and drags, in all 11 locales.
   Scenarios per locale (at 1024):
     · 302 − 5: Check with the slip empty → hintSlip, the slip pulses, no
       miss; two cubes go on, the third pick is air → hintEmpty; the empty
       tens shelf → hintEmpty; a crate opens into ten BOXES (the ones shelf
       untouched, the screen-reader line); a second crate stays shut; the
       pack outline closes the ten boxes back into a crate; a box opens
       into ten cubes; press and hold the slip's cube row → a handful; the
       back arrow returns one; the slip fills and is stamped; Check →
       hintType; 287 → the tens box wrong, the tens shelf counts 10…90,
       hintCount; 298 → hintNest, the pencil digits, the written
       subtraction with 3→2, 0→10→9, 2→12; 297 → solved, the success
       line, Next 0.5 s later;
     · 400 − 136, written shown: a crate DRAGGED onto the tens shelf
       opens, a box dragged onto the ones shelf opens, a cube dragged onto
       the slip goes on; a crate dragged onto the ones shelf does not
       open; the slip's crate, box and cube rows fill; the marks 4→3,
       0→10→9, 0→10 as the packages open; 264 → the big-number line;
     · the keyboard: Shift+Space on the ones shelf sends five, Delete
       puts the last one back.
   Then every round of every face at rest, at miss 2 and solved —
   reached ONCE per locale by real taps, then resized through 320…1366:
   no sideways scroll, nothing outside the card, controls ≥ 44 px, Check
   above the fold at rest, the hint in view at a miss, Tuck at picture
   size, no console errors.
   Usage: node scripts/local-test-nested-crates.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'nested-crates-core.js'));
const ACT = (() => { const ctx = { window: {}, NestedCratesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'nested-crates-activity.js'), 'utf8') + '\n;this.__A = window.NestedCratesActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/nested-crates-activity.html?activity=place-value-regroup.subtract-decompose-hundred.2-nbt-b-7&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.NestedCratesActivity && window.NestedCratesActivity.st && document.querySelector('.nc-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.NestedCratesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, face, written, k) {
    const ok = await page.evaluate((face, written, k) => {
      const a = window.NestedCratesActivity; a.api.settings.take = face; a.api.settings.written = written; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.k === k && a.st.face === face;
    }, face, written, k);
    if (!ok) throw new Error('force failed ' + face + '/' + written + '/' + k);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  }
  /* a real drag: press on one element, move in steps, release over another */
  async function drag(page, from, to, what) {
    const a = await page.$(from), b = await page.$(to); if (!a || !b) { is(false, what + ': drag ends missing'); return; }
    await page.evaluate(e => e.scrollIntoView({ block: 'center' }), a);
    const ba = await a.boundingBox(), bb = await b.boundingBox();
    const x0 = ba.x + ba.width / 2, y0 = ba.y + ba.height / 2, x1 = bb.x + bb.width / 2, y1 = bb.y + bb.height / 2;
    await page.mouse.move(x0, y0); await page.mouse.down(); await page.mouse.move(x0 + 8, y0 + 8, { steps: 2 }); await page.mouse.move(x1, y1, { steps: 6 }); await page.mouse.up(); await wait(40);
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.NestedCratesActivity.st)));
  const noteT = async (page) => sp(await page.$eval('.nc-note', e => e.textContent));
  const texts = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent.replace(/\s+/g, ' ').trim()));
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const taps = async (page, sel, n, what) => { for (let i = 0; i < n; i++) await click(page, sel, what); };
  const typeNum = async (page, s, what) => { const t = (await st(page)).typed.length; for (let i = 0; i < t; i++) await click(page, '[data-k="key-del"]', what); for (const d of String(s)) await click(page, `[data-k="key-${d}"]`, what); };
  const check = (page, what) => click(page, '[data-k="check"]', what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  const marks = (page) => page.$$eval('.nc-written .nc-wrow.is-mark', rows => rows.map(r => [...r.querySelectorAll('.nc-wcell')].map(c => c.textContent + (c.classList.contains('is-struck') ? '/' : '')).join('|')));
  /* solve by taps: open a crate and a box, fill each slip row */
  const solveTaps = async (page, r, what) => { await click(page, '[data-k="shelf-H"]', what); await click(page, '[data-k="shelf-T"]', what); for (const c of ['H', 'T', 'O']) await taps(page, `[data-k="slip-${c}"]`, C.digit(r.b, c), what + ' slip ' + c); };

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 302 − 5 */
    await force(page, 'ones', 'hidden', 0);
    is((await count(page, '.nc-shelf.is-H .nc-crate')) === 3 && (await count(page, '.nc-shelf.is-T .nc-box')) === 0 && (await count(page, '.nc-shelf.is-O .nc-cube')) === 2 && (await count(page, '.nc-slip .nc-cell')) === 5 && (await count(page, '.nc-tuckimg')) === 1 && (await count(page, '.nc-written[style*="none"]')) === 1, `${loc}: 302 − 5 — three crates, no boxes, two cubes, five empty cells, Tuck, no written subtraction`);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === '302 − 5 = ?', `${loc}: the task line is the subtraction`);
    is((await texts(page, '.nc-colname')).join('|') === [T(loc, 'colH'), T(loc, 'colT'), T(loc, 'colO')].join('|'), `${loc}: the shelf names`);
    await check(page, loc + ' empty slip'); let s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintSlip')) && (await count(page, '.nc-slip.is-pulse')) === 1, `${loc}: Check with the slip empty → «${T(loc, 'hintSlip')}», the slip pulses`);
    await taps(page, '[data-k="shelf-O"]', 2, loc); s = await st(page);
    is(s.slip.have.O === 2 && s.shelves.O === 0 && (await count(page, '.nc-slip .nc-cell.is-on')) === 2, `${loc}: two cubes go onto the slip`);
    await click(page, '[data-k="shelf-O"]', loc + ' air'); s = await st(page);
    is(s.slip.have.O === 2 && (await noteT(page)) === sp(T(loc, 'hintEmpty')) && (await count(page, '.nc-shelf.is-O.is-wob')) === 1, `${loc}: the third pick is air → «${T(loc, 'hintEmpty')}», the shelf wobbles`);
    await click(page, '[data-k="shelf-T"]', loc + ' empty tens'); s = await st(page);
    is(s.shelves.T === 0 && s.shelves.O === 0 && (await noteT(page)) === sp(T(loc, 'hintEmpty')), `${loc}: the empty tens shelf opens nothing`);
    await click(page, '[data-k="shelf-H"]', loc + ' crate'); s = await st(page);
    is(s.shelves.H === 2 && s.shelves.T === 10 && s.shelves.O === 0 && (await count(page, '.nc-shelf.is-T .nc-box')) === 10 && sp(await page.$eval('.nc-sr', e => e.textContent)) === sp(T(loc, 'aState', { h: 2, t: 10, o: 0 })), `${loc}: a crate opens into ten boxes, the ones shelf untouched`);
    await click(page, '[data-k="shelf-H"]', loc + ' second crate'); s = await st(page);
    is(s.shelves.H === 2 && s.shelves.T === 10 && (await count(page, '.nc-shelf.is-H.is-wob')) === 1, `${loc}: a second crate stays shut while boxes lie loose`);
    await click(page, '[data-k="pack-T"]', loc + ' pack'); s = await st(page);
    is(s.shelves.H === 3 && s.shelves.T === 0 && (await count(page, '[data-k="pack-T"]')) === 0, `${loc}: the dashed outline packs ten boxes back into a crate`);
    await click(page, '[data-k="shelf-H"]', loc + ' crate again'); await click(page, '[data-k="shelf-T"]', loc + ' box'); s = await st(page);
    is(s.shelves.H === 2 && s.shelves.T === 9 && s.shelves.O === 10 && (await count(page, '.nc-shelf.is-O .nc-cube')) === 10, `${loc}: a box opens into ten cubes`);
    { const h = await page.$('[data-k="slip-O"]'); await page.evaluate(e => e.scrollIntoView({ block: 'center' }), h); const b = await h.boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await wait(600); await page.mouse.up(); await wait(30); }
    s = await st(page); is(s.slip.have.O === 3 + 1 || s.slip.have.O === 3 + 2 || s.slip.have.O === 5, `${loc}: holding the slip's cube row fetches a handful (${s.slip.have.O})`);
    await click(page, '[data-k="slip-back"]', loc + ' back'); s = await st(page); const h1 = s.slip.have.O;
    await taps(page, '[data-k="shelf-O"]', 5 - h1, loc); s = await st(page);
    is(C.slipFull(s) && s.shelves.O === 7 && (await count(page, '.nc-slip.is-full .nc-stamp')) === 1, `${loc}: the back arrow returns one; the slip fills and is stamped`);
    await check(page, loc + ' nothing typed'); s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintType')), `${loc}: nothing typed → «${T(loc, 'hintType')}»`);
    await typeNum(page, '287', loc); await check(page, loc + ' miss 1'); s = await st(page);
    is(s.misses === 1 && !s.help && (await noteT(page)) === sp(T(loc, 'hintCount')) && (await count(page, '.nc-box.is-wrong')) === 1 && (await texts(page, '.nc-shelf.is-T .nc-labt')).join() === '10,20,30,40,50,60,70,80,90', `${loc}: 287 → the tens box wrong, the tens shelf counts 10…90, «${T(loc, 'hintCount')}»`);
    await click(page, '[data-k="key-del"]', loc); is((await count(page, '.nc-labt')) === 0, `${loc}: a keystroke clears the counting`);
    await typeNum(page, '298', loc); await check(page, loc + ' miss 2'); s = await st(page);
    is(s.help && (await noteT(page)) === sp(T(loc, 'hintNest')) && (await texts(page, '.nc-pencil')).join() === '7' && (await count(page, '.nc-written:not([style*="none"])')) === 1, `${loc}: 298 → «${T(loc, 'hintNest')}», pencil 7, the written subtraction`);
    is((await marks(page)).join(' / ') === '|9|' + ' / ' + '2|10/|12', `${loc}: the marks 3→2, 0→10→9, 2→12 (${(await marks(page)).join(' / ')})`);
    is((await page.$$eval('.nc-written .nc-wrow:not(.is-mark):not(.is-ans)', r => r[0].querySelectorAll('.is-struck').length)) === 3, `${loc}: the top number is struck in every column`);
    await page.evaluate(() => { window.NestedCratesActivity.OK_MS = 500; });
    await typeNum(page, '297', loc); await check(page, loc + ' solved'); s = await st(page);
    const okl = T(loc, 'okOnes', { a: 302, b: 5, c: 297 });
    is(s.done && sp(await page.$eval('.nc-note', e => e.textContent)) === sp(okl) && (await count(page, '.nc-key')) === 0 && (await count(page, '.nc-box.is-ok')) === 3, `${loc}: 297 → «${okl}», the keypad away, the boxes green`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.NestedCratesActivity.OK_MS = 600000; });
    /* 400 − 136, written shown: drags */
    await force(page, 'big', 'shown', 0);
    is((await marks(page)).join(' / ') === '|| / ||', `${loc}: no marks before anything opens`);
    await drag(page, '[data-k="shelf-H"]', '[data-k="shelf-O"]', loc + ' crate to ones'); s = await st(page);
    is(s.shelves.H === 4 && s.shelves.T === 0 && s.shelves.O === 0, `${loc}: a crate dragged onto the ones shelf does not open`);
    await drag(page, '[data-k="shelf-H"]', '[data-k="shelf-T"]', loc + ' crate to tens'); s = await st(page);
    is(s.shelves.H === 3 && s.shelves.T === 10 && (await marks(page)).join(' / ') === '|| / 3|10|', `${loc}: a crate dragged onto the tens shelf opens; the marks 4→3 and 10 (${(await marks(page)).join(' / ')})`);
    await drag(page, '[data-k="shelf-T"]', '[data-k="shelf-O"]', loc + ' box to ones'); s = await st(page);
    is(s.shelves.T === 9 && s.shelves.O === 10 && (await marks(page)).join(' / ') === '|9| / 3|10/|10', `${loc}: a box dragged onto the ones shelf opens; 10 struck to 9, 10 over the ones (${(await marks(page)).join(' / ')})`);
    await drag(page, '[data-k="shelf-O"]', '.nc-slip', loc + ' cube to slip'); s = await st(page);
    is(s.slip.have.O === 1 && s.shelves.O === 9, `${loc}: a cube dragged onto the slip goes on`);
    await taps(page, '[data-k="slip-H"]', 1, loc); await taps(page, '[data-k="slip-T"]', 3, loc); await taps(page, '[data-k="slip-O"]', 5, loc); s = await st(page);
    is(C.slipFull(s) && s.shelves.H === 2 && s.shelves.T === 6 && s.shelves.O === 4, `${loc}: the slip's crate, box and cube rows fill`);
    await typeNum(page, '264', loc); await check(page, loc + ' big'); s = await st(page);
    is(s.done && sp(await page.$eval('.nc-note', e => e.textContent)) === sp(T(loc, 'okBig', { a: 400, b: 136, c: 264 })), `${loc}: 264 → «${T(loc, 'okBig', { a: 400, b: 136, c: 264 })}»`);
    /* the keyboard */
    await force(page, 'ones', 'hidden', 4); await click(page, '[data-k="shelf-H"]', loc); await click(page, '[data-k="shelf-T"]', loc);
    await page.focus('[data-k="shelf-O"]'); await page.keyboard.down('Shift'); await page.keyboard.press('Space'); await page.keyboard.up('Shift'); await wait(30);
    s = await st(page); is(s.slip.have.O === 5, `${loc}: Shift+Space on the ones shelf sends five (${s.slip.have.O})`);
    await page.keyboard.press('Delete'); await wait(20); s = await st(page); is(s.slip.have.O === 4, `${loc}: Delete puts the last one back`);
    is(!errs.length, `${loc}: no console errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();

    /* every round of every face: rest, miss 2, solved — reached once, resized through the widths */
    const p2 = await open(1024, loc), pg = p2.page;
    for (const [face, written] of [['ones', 'hidden'], ['ones', 'shown'], ['big', 'shown']]) {
      const R = C.rounds(face);
      for (let k = 0; k < R.length; k++) for (const state of ['rest', 'miss', 'solved']) {
        await pg.setViewport({ width: 1024, height: 900 }); await wait(100); await force(pg, face, written, k); await wait(20);
        if (state !== 'rest') {
          const r = R[k], ans = r.a - r.b;
          await solveTaps(pg, r, 'sweep');
          if (state === 'miss') { await typeNum(pg, ans + 10, 'miss'); await check(pg, 'miss 1'); await typeNum(pg, ans + 1, 'miss'); await check(pg, 'miss 2'); }
          else { await typeNum(pg, ans, 'solved'); await check(pg, 'solved'); }
          const s2 = await st(pg);
          if (state === 'miss' && !(s2.help && s2.verdict)) is(false, `${loc} ${face}/${written} r${k}: did not reach miss 2`);
          if (state === 'solved' && !s2.done) is(false, `${loc} ${face}/${written} r${k}: did not solve`);
        }
        for (const w of WIDTHS) {
          await pg.setViewport({ width: w, height: VH(w) }); await wait(30); await pg.waitForFunction(() => { const e = document.querySelector('.nc-wrap'); return e && e.classList.contains('is-wide') === (e.getBoundingClientRect().width >= 560); }, { timeout: 1000 }).catch(() => {}); await pg.evaluate(() => window.scrollTo(0, 0));
          const r = await pg.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app').getBoundingClientRect();
            document.querySelectorAll('.nc-wrap button, .nc-wrap img, .nc-shelfsvg, .nc-slipsvg, .nc-slip, .nc-box, .nc-written').forEach(e => { if (!vis(e) && !(e instanceof SVGElement)) return; const b = e.getBoundingClientRect(); if (!b.width) return; if (b.left < card.left - 1 || b.right > card.right + 1) F('outside the card: ' + (e.getAttribute('data-k') || e.className.baseVal || e.className)); });
            document.querySelectorAll('.nc-wrap button').forEach(e => { if (!vis(e) || e.disabled) return; const b = e.getBoundingClientRect(); if (b.width < 43.5 || b.height < 43.5) F('control under 44: ' + e.getAttribute('data-k') + ' ' + Math.round(b.width) + '×' + Math.round(b.height)); });
            const chk = document.querySelector('[data-k="check"]'); if (state === 'rest' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            const nt = document.querySelector('.nc-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            /* the shelf names never spill out of their shelves; the pieces stay inside their shelf */
            document.querySelectorAll('.nc-colname').forEach(e => { const b = e.getBoundingClientRect(), p = e.closest('.nc-shelf').getBoundingClientRect(); if (b.left < p.left - 0.5 || b.right > p.right + 0.5) F('shelf name spills: ' + e.textContent); });
            document.querySelectorAll('.nc-shelf').forEach(sh => { const p = sh.getBoundingClientRect(); sh.querySelectorAll('.nc-piece').forEach(x => { const b = x.getBoundingClientRect(); if (b.left < p.left - 0.5 || b.right > p.right + 0.5 || b.bottom > p.bottom + 0.5) F('a piece outside its shelf: ' + sh.getAttribute('data-k')); }); });
            const ti = document.querySelector('.nc-tuckimg'), wide = document.querySelector('.nc-wrap').classList.contains('is-wide'); if (!ti) F('no Tuck'); else { const b = ti.getBoundingClientRect(); if (Math.min(b.width, b.height) < (wide ? 95.5 : 63.5)) F('Tuck ' + Math.round(b.width)); } if (vw >= 700 && !wide) F('not the wide layout at ' + vw);
            return out;
          }, state);
          is(!r.fails.length, `${loc} ${face}/${written} r${k} ${state} @${w}: ${r.fails.slice(0, 3).join('; ')}`);
        }
      }
    }
    is(!p2.errs.length, `${loc}: no console errors in the sweep (${p2.errs.slice(0, 2).join(' | ')})`);
    await pg.close();
    console.log(`  ${loc}: ${Math.round((Date.now() - t0) / 1000)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-nested-crates: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
