#!/usr/bin/env node
/* =====================================================================
   local-test-square-vice.js — ACTIVITY #145, The Square Vice ("Tuck
   Makes a Hundred", 2.NBT.B.7), in a real browser with real pointer
   taps, in all 11 locales.
   Scenarios per locale (at 1024):
     · 160 + 50: Check with nothing typed → hintType; 210 typed while the
       tens column holds eleven → hintTooMany, the column pulses, no miss;
       nine rods on the bed, crank → hintShort, the bare stripe; eleven →
       hintTall, one rod glows; take one off, crank → the lock: a gold
       flat in the hundreds column, one rod left, the screen-reader line;
       220 → the tens box wrong, the tens column counts 10, hintCount;
       300 → hintShow 2 · 1 · 0, the pencil digits, the written sum with
       its carried 1; 210 → solved, the success line, Next 0.5 s later;
     · 168 + 284, written sum shown: press and hold the ones column → a
       handful goes on; ten cubes lock into a gold rod and the tens carry
       box shows 1; ten rods lock into a flat and the hundreds carry box
       shows 1; 452 → the both-trade line;
     · 320 + 80: a DRAG down on the handle cranks; a flat on the bed and
       the up arrow split it back into ten rods;
     · 34 + 25: nothing to trade, 59 → the warm-up line;
     · Shift+Space on a focused column lifts five.
   Then every round of every face at rest, at miss 2 and solved —
   reached ONCE per locale by real taps, then resized through 320…1366:
   no sideways scroll, nothing outside the card, controls ≥ 44 px, Check
   above the fold at rest, the hint in view at a miss, Tuck at picture
   size, no console errors.
   Usage: node scripts/local-test-square-vice.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'square-vice-core.js'));
const ACT = (() => { const ctx = { window: {}, SquareViceCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'square-vice-activity.js'), 'utf8') + '\n;this.__A = window.SquareViceActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/square-vice-activity.html?activity=place-value-regroup.add-compose-hundred.2-nbt-b-7&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SquareViceActivity && window.SquareViceActivity.st && document.querySelector('.sv-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.SquareViceActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, face, written, k) {
    const ok = await page.evaluate((face, written, k) => {
      const a = window.SquareViceActivity; a.api.settings.numbers = face; a.api.settings.written = written; a._pool = null; a._ensurePool();
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
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.SquareViceActivity.st)));
  const noteT = async (page) => sp(await page.$eval('.sv-note', e => e.textContent));
  const texts = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent.replace(/\s+/g, ' ').trim()));
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const taps = async (page, sel, n, what) => { for (let i = 0; i < n; i++) await click(page, sel, what); };
  const typeNum = async (page, s, what) => { const t = (await st(page)).typed.length; for (let i = 0; i < t; i++) await click(page, '[data-k="key-del"]', what); for (const d of String(s)) await click(page, `[data-k="key-${d}"]`, what); };
  const check = (page, what) => click(page, '[data-k="check"]', what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  const lock = async (page, col, what) => { await taps(page, `[data-k="bay-${col}"]`, 10, what + ' load ' + col); await click(page, '[data-k="crank"]', what + ' crank ' + col); };

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 160 + 50 */
    await force(page, 'hundred', 'hidden', 0);
    is((await count(page, '.sv-bay.is-T .sv-rod')) === 11 && (await count(page, '.sv-bay.is-H .sv-flat')) === 1 && (await count(page, '.sv-tuckimg')) === 1 && (await count(page, '.sv-written[style*="none"]')) === 1, `${loc}: 160 + 50 — one flat, eleven rods, Tuck, no written sum`);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === '160 + 50 = ?', `${loc}: the task line is the sum`);
    is((await texts(page, '.sv-colname')).join('|') === [T(loc, 'colH'), T(loc, 'colT'), T(loc, 'colO')].join('|'), `${loc}: the column names`);
    await check(page, loc + ' empty'); let s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintType')), `${loc}: nothing typed → «${T(loc, 'hintType')}»`);
    await typeNum(page, '210', loc); await check(page, loc + ' too many'); s = await st(page);
    is(s.misses === 0 && !s.done && (await noteT(page)) === sp(T(loc, 'hintTooMany')) && (await count(page, '.sv-bay.is-T.is-pulse')) === 1, `${loc}: 210 with eleven tens lying there → «${T(loc, 'hintTooMany')}», the tens column pulses`);
    await typeNum(page, '', loc);
    await taps(page, '[data-k="bay-T"]', 9, loc); await click(page, '[data-k="crank"]', loc + ' crank 9'); s = await st(page);
    is(s.bed.pieces.length === 9 && (await noteT(page)) === sp(T(loc, 'hintShort')) && (await count(page, '.sv-bare')) === 1 && s.misses === 0, `${loc}: nine rods → «${T(loc, 'hintShort')}», a bare stripe`);
    await taps(page, '[data-k="bay-T"]', 2, loc); await click(page, '[data-k="crank"]', loc + ' crank 11'); s = await st(page);
    is(s.bed.pieces.length === 11 && (await noteT(page)) === sp(T(loc, 'hintTall')) && (await count(page, '.sv-vice .is-over')) === 1, `${loc}: eleven → «${T(loc, 'hintTall')}», one rod glows`);
    await click(page, '[data-k="bed"]', loc + ' take one off'); await click(page, '[data-k="crank"]', loc + ' crank 10'); s = await st(page);
    is(s.bed.pieces.length === 0 && s.bays.H.length === 2 && s.bays.T.length === 1 && (await count(page, '.sv-bay.is-H .sv-flat.is-made')) === 1 && sp(await page.$eval('.sv-sr', e => e.textContent)) === sp(T(loc, 'aLockT')), `${loc}: ten lock — a gold flat in the hundreds, one rod left, «${T(loc, 'aLockT')}»`);
    await typeNum(page, '220', loc); await check(page, loc + ' miss 1'); s = await st(page);
    is(s.misses === 1 && !s.help && (await noteT(page)) === sp(T(loc, 'hintCount')) && (await count(page, '.sv-box.is-wrong')) === 1 && (await texts(page, '.sv-bay.is-T .sv-labt')).join() === '10', `${loc}: 220 → the tens box is wrong, the tens column counts 10, «${T(loc, 'hintCount')}»`);
    await click(page, '[data-k="key-del"]', loc); is((await count(page, '.sv-labt')) === 0, `${loc}: a keystroke clears the counting`);
    await typeNum(page, '300', loc); await check(page, loc + ' miss 2'); s = await st(page);
    const show = T(loc, 'hintShow', { h: 2, t: 1, o: 0 });
    is(s.help && (await noteT(page)) === sp(show) && (await texts(page, '.sv-pencil')).join() === '2,1' && (await count(page, '.sv-written:not([style*="none"])')) === 1 && (await texts(page, '.sv-carry.is-on')).join() === '1', `${loc}: 300 → «${show}», pencil 2 and 1, the written sum with its carried 1`);
    await page.evaluate(() => { window.SquareViceActivity.OK_MS = 500; });
    await typeNum(page, '210', loc); await check(page, loc + ' solved'); s = await st(page);
    const okl = T(loc, 'okHundred', { a: 160, b: 50, c: 210 });
    is(s.done && sp(await page.$eval('.sv-note', e => e.textContent)) === sp(okl) && (await count(page, '.sv-key')) === 0 && (await count(page, '.sv-box.is-ok')) === 3, `${loc}: 210 → «${okl}», the keypad away, the boxes green`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.SquareViceActivity.OK_MS = 600000; });
    /* 168 + 284, written sum shown: hold for a handful, both locks, both carries */
    await force(page, 'both', 'shown', 6);
    is((await count(page, '.sv-written:not([style*="none"])')) === 1 && (await count(page, '.sv-carry.is-on')) === 0, `${loc}: the written sum is shown, no carry yet`);
    { const h = await page.$('[data-k="bay-O"]'); await page.evaluate(e => e.scrollIntoView({ block: 'center' }), h); const b = await h.boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await wait(900); await page.mouse.up(); await wait(30); }
    s = await st(page); const held = s.bed.pieces.length;
    is(held >= 3 && held <= 10 && s.bed.kind === 'O', `${loc}: pressing and holding the ones column lifts a handful (${held})`);
    await taps(page, '[data-k="bay-O"]', 10 - held, loc); await click(page, '[data-k="crank"]', loc + ' ones lock'); s = await st(page);
    is(s.bays.T.length === 15 && s.bays.O.length === 2 && s.bays.T.indexOf('made') >= 0 && (await count(page, '.sv-written .sv-carry.is-on')) === 1 && sp(await page.$eval('.sv-sr', e => e.textContent)) === sp(T(loc, 'aLockO')), `${loc}: ten cubes lock into a gold rod, the tens carry box shows 1`);
    await lock(page, 'T', loc); s = await st(page);
    is(s.bays.H.length === 4 && s.bays.T.length === 5 && (await count(page, '.sv-written .sv-carry.is-on')) === 2 && s.bays.T.indexOf('made') >= 0, `${loc}: ten rods lock into a flat, the gold rod stays, both carry boxes show 1`);
    await typeNum(page, '452', loc); await check(page, loc + ' both'); s = await st(page);
    is(s.done && sp(await page.$eval('.sv-note', e => e.textContent)) === sp(T(loc, 'okBoth', { a: 168, b: 284, c: 452 })), `${loc}: 452 → «${T(loc, 'okBoth', { a: 168, b: 284, c: 452 })}»`);
    /* 320 + 80: a drag on the handle; the up arrow splits a flat */
    await force(page, 'hundred', 'hidden', 3); await taps(page, '[data-k="bay-T"]', 10, loc);
    { const h = await page.$('[data-k="crank"]'); await page.evaluate(e => e.scrollIntoView({ block: 'center' }), h); const b = await h.boundingBox(), x = b.x + b.width / 2, y = b.y + b.height / 2; await page.mouse.move(x, y); await page.mouse.down(); await page.mouse.move(x, y + 25, { steps: 3 }); await page.mouse.move(x, y + 55, { steps: 3 }); await page.mouse.up(); await wait(30); }
    s = await st(page); is(s.bays.H.length === 4 && s.bays.T.length === 0 && s.bed.pieces.length === 0, `${loc}: a drag down on the handle cranks: ten rods lock`);
    is(await page.$eval('[data-k="crank-up"]', e => e.disabled), `${loc}: the up arrow sleeps with nothing on the bed`);
    await click(page, '[data-k="bay-H"]', loc + ' flat'); is(await page.$eval('[data-k="crank"]', e => e.disabled), `${loc}: a flat on the bed: the handle cannot crank it shut`);
    await click(page, '[data-k="crank-up"]', loc + ' split'); s = await st(page);
    is(s.bays.H.length === 3 && s.bays.T.length === 10 && s.bed.pieces.length === 0 && sp(await page.$eval('.sv-sr', e => e.textContent)) === sp(T(loc, 'aSplit')), `${loc}: the up arrow splits the flat back into ten rods`);
    /* 34 + 25: nothing to trade */
    await force(page, 'none', 'hidden', 0); await typeNum(page, '59', loc); await check(page, loc + ' none'); s = await st(page);
    is(s.done && sp(await page.$eval('.sv-note', e => e.textContent)) === sp(T(loc, 'okNone', { a: 34, b: 25, c: 59 })) && (await texts(page, '.sv-box')).join() === ',5,9', `${loc}: 34 + 25 → 59 in the tens and ones boxes, «${T(loc, 'okNone', { a: 34, b: 25, c: 59 })}»`);
    /* the keyboard */
    await force(page, 'hundred', 'hidden', 0); await page.focus('[data-k="bay-T"]'); await page.keyboard.down('Shift'); await page.keyboard.press('Space'); await page.keyboard.up('Shift'); await wait(30);
    s = await st(page); is(s.bed.pieces.length === 5, `${loc}: Shift+Space on the tens column lifts five (${s.bed.pieces.length})`);
    is(!errs.length, `${loc}: no console errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();

    /* every round of every face: rest, miss 2, solved — reached once, resized through the widths */
    const p2 = await open(1024, loc), pg = p2.page;
    for (const [face, written] of [['hundred', 'hidden'], ['hundred', 'shown'], ['none', 'hidden'], ['both', 'shown']]) {
      const R = C.rounds(face);
      for (let k = 0; k < R.length; k++) for (const state of ['rest', 'miss', 'solved']) {
        await pg.setViewport({ width: 1024, height: 900 }); await wait(100); await force(pg, face, written, k); await wait(20);
        if (state !== 'rest') {
          const r = R[k], need = C.needs(r.a, r.b), tot = r.a + r.b;
          if (need.O) await lock(pg, 'O', 'sweep');
          if (need.T) await lock(pg, 'T', 'sweep');
          if (state === 'miss') { await typeNum(pg, tot + 10, 'miss'); await check(pg, 'miss 1'); await typeNum(pg, tot + 1, 'miss'); await check(pg, 'miss 2'); }
          else { await typeNum(pg, tot, 'solved'); await check(pg, 'solved'); }
          const s2 = await st(pg);
          if (state === 'miss' && !(s2.help && s2.verdict)) is(false, `${loc} ${face}/${written} r${k}: did not reach miss 2`);
          if (state === 'solved' && !s2.done) is(false, `${loc} ${face}/${written} r${k}: did not solve`);
        }
        for (const w of WIDTHS) {
          await pg.setViewport({ width: w, height: VH(w) }); await wait(30); await pg.waitForFunction(() => { const e = document.querySelector('.sv-wrap'); return e && e.classList.contains('is-wide') === (e.getBoundingClientRect().width >= 560); }, { timeout: 1000 }).catch(() => {}); await pg.evaluate(() => window.scrollTo(0, 0));
          const r = await pg.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app').getBoundingClientRect();
            document.querySelectorAll('.sv-wrap button, .sv-wrap img, .sv-svg, .sv-baysvg, .sv-box, .sv-written').forEach(e => { if (!vis(e) && !(e instanceof SVGElement)) return; const b = e.getBoundingClientRect(); if (!b.width) return; if (b.left < card.left - 1 || b.right > card.right + 1) F('outside the card: ' + (e.getAttribute('data-k') || e.className.baseVal || e.className)); });
            document.querySelectorAll('.sv-wrap button').forEach(e => { if (!vis(e) || e.disabled) return; const b = e.getBoundingClientRect(); if (b.width < 43.5 || b.height < 43.5) F('control under 44: ' + e.getAttribute('data-k') + ' ' + Math.round(b.width) + '×' + Math.round(b.height)); });
            const chk = document.querySelector('[data-k="check"]'); if (state === 'rest' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            const nt = document.querySelector('.sv-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            /* the column names never spill out of their columns */
            document.querySelectorAll('.sv-colname').forEach(e => { const b = e.getBoundingClientRect(), p = e.closest('.sv-bay').getBoundingClientRect(); if (b.left < p.left - 0.5 || b.right > p.right + 0.5) F('column name spills: ' + e.textContent); });
            const ti = document.querySelector('.sv-tuckimg'), wide = document.querySelector('.sv-wrap').classList.contains('is-wide'); if (!ti) F('no Tuck'); else { const b = ti.getBoundingClientRect(); if (Math.min(b.width, b.height) < (wide ? 95.5 : 63.5)) F('Tuck ' + Math.round(b.width)); } if (vw >= 700 && !wide) F('not the wide layout at ' + vw);
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
  console.log(`local-test-square-vice: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
