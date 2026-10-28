#!/usr/bin/env node
/* =====================================================================
   local-test-takeaway-scoop.js — ACTIVITY #147, The Take-Away Scoop
   ("Tuck Breaks a Ten", 2.NBT.B.7), in a real browser with real pointer
   taps and drags, in all 11 locales.
   Scenarios per locale (at 1024):
     · 342 − 5: two of five cups light; Check with the scoop parked →
       hintScoop, no miss; the ones shelf is not a control; a tap on the
       scoop is refused — three cups blink, hintShort, nothing moves; a
       rod snaps into ten cubes (all five cups light, the screen-reader
       line); a second rod is refused while twelve cubes lie loose
       (hintEnough, the ones shelf pulses); the dashed outline clicks the
       ten back into a rod; snap again; the scoop DRAGGED onto the shelves
       lifts five into Tuck's bowl; the bowl pours them back; a tap lifts
       again; Check → hintType; 327 → the tens box wrong, the tens shelf
       counts 10, 20, 30, hintCount; 338 → hintCountOn, the run 100 … 330
       … ? across the mat, the written subtraction 4→3 and 12 over the 2;
       337 → solved, the ten line, Next 0.5 s later;
     · 627 − 346, written shown: three flat-slots, four rod-slots, six
       cups; a flat snaps into ten rods (6→5, 12 over the 2); lift; 281 →
       the hundred line;
     · 58 − 23: the scoop lifts at once; a needless rod snapped first is
       clicked back on a right answer, the nothing-to-snap line;
     · the keyboard: Enter on the tens shelf snaps, Enter on the scoop lifts.
   Then every round of every face at rest, at miss 2 and solved —
   reached ONCE per locale by real taps, then resized through 320…1366:
   no sideways scroll, nothing outside the card, controls ≥ 44 px, Check
   above the fold at rest, the hint in view at a miss, Tuck at picture
   size, no console errors.
   Usage: node scripts/local-test-takeaway-scoop.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'takeaway-scoop-core.js'));
const ACT = (() => { const ctx = { window: {}, TakeawayScoopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'takeaway-scoop-activity.js'), 'utf8') + '\n;this.__A = window.TakeawayScoopActivity;', ctx); return ctx.__A; })();
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
/* the method's own snaps for a round */
const snapsFor = (a, b) => { const O = (n) => n % 10, Tt = (n) => Math.floor(n / 10) % 10; let t = Tt(a); const out = []; if (O(a) < O(b)) { out.push('T'); t--; } if (t < Tt(b)) out.push('H'); return out; };
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
    await page.goto(`${base}/takeaway-scoop-activity.html?activity=place-value-regroup.subtract-decompose.2-nbt-b-7&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TakeawayScoopActivity && window.TakeawayScoopActivity.st && document.querySelector('.tk-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.TakeawayScoopActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, face, written, k) {
    const ok = await page.evaluate((face, written, k) => {
      const a = window.TakeawayScoopActivity; a.api.settings.take = face; a.api.settings.written = written; a._pool = null; a._ensurePool();
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
  async function drag(page, from, to, what) {
    const a = await page.$(from), b = await page.$(to); if (!a || !b) { is(false, what + ': drag ends missing'); return; }
    await page.evaluate(e => e.scrollIntoView({ block: 'center' }), a);
    const ba = await a.boundingBox(), bb = await b.boundingBox();
    const x0 = ba.x + ba.width / 2, y0 = ba.y + ba.height / 2, x1 = bb.x + bb.width / 2, y1 = bb.y + bb.height / 2;
    await page.mouse.move(x0, y0); await page.mouse.down(); await page.mouse.move(x0 + 8, y0 + 8, { steps: 2 }); await page.mouse.move(x1, y1, { steps: 6 }); await page.mouse.up(); await wait(40);
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.TakeawayScoopActivity.st)));
  const noteT = async (page) => sp(await page.$eval('.tk-note', e => e.textContent));
  const texts = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent.replace(/\s+/g, ' ').trim()));
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const typeNum = async (page, s, what) => { const t = (await st(page)).typed.length; for (let i = 0; i < t; i++) await click(page, '[data-k="key-del"]', what); for (const d of String(s)) await click(page, `[data-k="key-${d}"]`, what); };
  const check = (page, what) => click(page, '[data-k="check"]', what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  const marks = (page) => page.$$eval('.tk-written .tk-wrow.is-mark .tk-wcell', a => a.map(c => c.textContent).join('|'));
  const struck = (page) => page.$$eval('.tk-written .tk-wrow:not(.is-mark):not(.is-ans)', r => [...r[0].querySelectorAll('.tk-wcell')].map(c => c.classList.contains('is-struck') ? 'x' : '-').join(''));

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 342 − 5 */
    await force(page, 'ones', 'hidden', 0);
    is((await count(page, '.tk-shelf.is-H .tk-flat')) === 3 && (await count(page, '.tk-shelf.is-T .tk-rod')) === 4 && (await count(page, '.tk-shelf.is-O .tk-cube')) === 2 && (await count(page, '.tk-scoop .tk-well')) === 5 && (await count(page, '.tk-scoop .tk-well.is-lit')) === 2 && (await count(page, '.tk-tuckimg')) === 1, `${loc}: 342 − 5 — 3 flats, 4 rods, 2 cubes; a five-cup scoop with two cups lit; Tuck`);
    is(sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === '342 − 5 = ?', `${loc}: the task line is the subtraction`);
    is((await texts(page, '.tk-colname')).join('|') === [T(loc, 'colH'), T(loc, 'colT'), T(loc, 'colO')].join('|'), `${loc}: the shelf names`);
    is((await count(page, '[data-k="shelf-O"]')) === 0, `${loc}: the ones shelf is not a control (cubes cannot be snapped)`);
    await check(page, loc + ' parked'); let s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintScoop')), `${loc}: Check with the scoop parked → «${T(loc, 'hintScoop')}»`);
    await click(page, '[data-k="scoop"]', loc + ' refused'); s = await st(page);
    is(!s.scoop.used && s.mat.O === 2 && s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintShort')) && (await count(page, '.tk-well.is-blink')) === 3, `${loc}: a lift with three empty cups is refused, they blink, «${T(loc, 'hintShort')}»`);
    await click(page, '[data-k="shelf-T"]', loc + ' snap'); s = await st(page);
    is(s.mat.T === 3 && s.mat.O === 12 && (await count(page, '.tk-scoop .tk-well.is-lit')) === 5 && sp(await page.$eval('.tk-sr', e => e.textContent)) === sp(T(loc, 'aState', { h: 3, t: 3, o: 12 })), `${loc}: a rod snaps into ten cubes, all five cups light`);
    await click(page, '[data-k="shelf-T"]', loc + ' second snap'); s = await st(page);
    is(s.mat.T === 3 && s.mat.O === 12 && (await noteT(page)) === sp(T(loc, 'hintEnough')) && (await count(page, '.tk-shelf.is-O.is-pulse')) === 1, `${loc}: a second rod is refused while twelve cubes lie loose, «${T(loc, 'hintEnough')}»`);
    await click(page, '[data-k="pack-O"]', loc + ' click back'); s = await st(page);
    is(s.mat.T === 4 && s.mat.O === 2, `${loc}: the dashed outline clicks ten cubes back into a rod`);
    await click(page, '[data-k="shelf-T"]', loc + ' snap again');
    await drag(page, '[data-k="scoop"]', '.tk-shelf.is-O', loc + ' drag the scoop'); s = await st(page);
    is(s.scoop.used && s.mat.O === 7 && (await count(page, '[data-k="bowl"]')) === 1 && sp(await page.$eval('.tk-sr', e => e.textContent)) === sp(T(loc, 'aLift', { b: 5 })), `${loc}: the scoop dragged onto the shelves lifts five into Tuck's bowl`);
    await click(page, '[data-k="bowl"]', loc + ' pour'); s = await st(page);
    is(!s.scoop.used && s.mat.O === 12, `${loc}: the bowl pours the five back`);
    await click(page, '[data-k="scoop"]', loc + ' lift'); s = await st(page);
    is(s.scoop.used && s.mat.O === 7, `${loc}: a tap on the scoop lifts`);
    await check(page, loc + ' nothing typed'); s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintType')), `${loc}: nothing typed → «${T(loc, 'hintType')}»`);
    await typeNum(page, '327', loc); await check(page, loc + ' miss 1'); s = await st(page);
    is(s.misses === 1 && (await noteT(page)) === sp(T(loc, 'hintCount')) && (await count(page, '.tk-box.is-wrong')) === 1 && (await texts(page, '.tk-shelf.is-T .tk-labt')).join() === '10,20,30', `${loc}: 327 → the tens box wrong, the tens shelf counts 10, 20, 30, «${T(loc, 'hintCount')}»`);
    await click(page, '[data-k="key-del"]', loc); is((await count(page, '.tk-labt')) === 0, `${loc}: a keystroke clears the counting`);
    await typeNum(page, '338', loc); await check(page, loc + ' miss 2'); s = await st(page);
    const run = (await texts(page, '.tk-labt')).join();
    is(s.help && (await noteT(page)) === sp(T(loc, 'hintCountOn')) && run === '100,200,300,310,320,330,335,?', `${loc}: 338 → «${T(loc, 'hintCountOn')}», one run across the mat (${run})`);
    is((await count(page, '.tk-written:not([style*="none"])')) === 1 && (await marks(page)) === '|3|12' && (await struck(page)) === '-xx', `${loc}: the written subtraction shows 4→3 and 12 over the 2 (${await marks(page)})`);
    await page.evaluate(() => { window.TakeawayScoopActivity.OK_MS = 500; });
    await typeNum(page, '337', loc); await check(page, loc + ' solved'); s = await st(page);
    const okl = T(loc, 'okTen', { a: 342, b: 5, c: 337 });
    is(s.done && sp(await page.$eval('.tk-note', e => e.textContent)) === sp(okl) && (await count(page, '.tk-key')) === 0 && (await count(page, '.tk-box.is-ok')) === 3, `${loc}: 337 → «${okl}», the keypad away, the boxes green`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.TakeawayScoopActivity.OK_MS = 600000; });
    /* 627 − 346, written shown */
    await force(page, 'tens', 'shown', 7);
    is((await count(page, '.tk-scoop rect.tk-well')) === 7 && (await count(page, '.tk-scoop circle.tk-well')) === 6 && (await marks(page)) === '||', `${loc}: 627 − 346 — three flat-slots, four rod-slots, six cups; no marks yet`);
    await click(page, '[data-k="shelf-T"]', loc + ' wrong snap'); s = await st(page);
    is(s.mat.T === 1 && s.mat.O === 17, `${loc}: snapping a rod is allowed but does not fill the rod-slots`);
    await click(page, '[data-k="pack-O"]', loc + ' undo');
    await click(page, '[data-k="shelf-H"]', loc + ' flat'); s = await st(page);
    is(s.mat.H === 5 && s.mat.T === 12 && (await marks(page)) === '5|12|', `${loc}: a flat snaps into ten rods: 6→5, 12 over the 2 (${await marks(page)})`);
    await click(page, '[data-k="scoop"]', loc + ' lift big'); await typeNum(page, '281', loc); await check(page, loc + ' big'); s = await st(page);
    is(s.done && sp(await page.$eval('.tk-note', e => e.textContent)) === sp(T(loc, 'okHundred', { a: 627, b: 346, c: 281 })), `${loc}: 281 → «${T(loc, 'okHundred', { a: 627, b: 346, c: 281 })}»`);
    /* 58 − 23: nothing to snap; a needless snap is clicked back */
    await force(page, 'none', 'hidden', 0);
    is((await count(page, '.tk-scoop .tk-well.is-lit')) === (await count(page, '.tk-scoop .tk-well')), `${loc}: 58 − 23 — every cup lights at once`);
    await click(page, '[data-k="shelf-T"]', loc + ' needless'); await click(page, '[data-k="scoop"]', loc + ' lift none'); await typeNum(page, '35', loc); await check(page, loc + ' none'); s = await st(page);
    is(s.done && s.mat.T === 3 && s.mat.O === 5 && sp(await page.$eval('.tk-note', e => e.textContent)) === sp(T(loc, 'okNone', { a: 58, b: 23, c: 35 })), `${loc}: 35 accepted, the needless ten clicked back, «${T(loc, 'okNone', { a: 58, b: 23, c: 35 })}»`);
    /* the keyboard */
    await force(page, 'ones', 'hidden', 0); await page.focus('[data-k="shelf-T"]'); await page.keyboard.press('Enter'); await wait(20);
    s = await st(page); is(s.mat.T === 3 && s.mat.O === 12, `${loc}: Enter on the tens shelf snaps a rod`);
    await page.focus('[data-k="scoop"]'); await page.keyboard.press('Enter'); await wait(20);
    s = await st(page); is(s.scoop.used, `${loc}: Enter on the scoop lifts it`);
    is(!errs.length, `${loc}: no console errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();

    /* every round of every face: rest, miss 2, solved — reached once, resized through the widths */
    const p2 = await open(1024, loc), pg = p2.page;
    for (const [face, written] of [['ones', 'hidden'], ['ones', 'shown'], ['none', 'hidden'], ['tens', 'shown']]) {
      const R = C.rounds(face);
      for (let k = 0; k < R.length; k++) for (const state of ['rest', 'miss', 'solved']) {
        await pg.setViewport({ width: 1024, height: 900 }); await wait(100); await force(pg, face, written, k); await wait(20);
        if (state !== 'rest') {
          const r = R[k], ans = r.a - r.b;
          for (const c of snapsFor(r.a, r.b)) await click(pg, `[data-k="shelf-${c}"]`, 'sweep snap');
          await click(pg, '[data-k="scoop"]', 'sweep lift');
          if (state === 'miss') { await typeNum(pg, ans + 10, 'miss'); await check(pg, 'miss 1'); await typeNum(pg, ans + 1, 'miss'); await check(pg, 'miss 2'); }
          else { await typeNum(pg, ans, 'solved'); await check(pg, 'solved'); }
          const s2 = await st(pg);
          if (state === 'miss' && !(s2.help && s2.verdict)) is(false, `${loc} ${face}/${written} r${k}: did not reach miss 2`);
          if (state === 'solved' && !s2.done) is(false, `${loc} ${face}/${written} r${k}: did not solve`);
        }
        for (const w of WIDTHS) {
          await pg.setViewport({ width: w, height: VH(w) }); await wait(30); await pg.waitForFunction(() => { const e = document.querySelector('.tk-wrap'); return e && e.classList.contains('is-wide') === (e.getBoundingClientRect().width >= 560); }, { timeout: 1000 }).catch(() => {}); await pg.evaluate(() => window.scrollTo(0, 0));
          const r = await pg.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app').getBoundingClientRect();
            document.querySelectorAll('.tk-wrap button, .tk-wrap img, .tk-shelfsvg, .tk-scoopsvg, .tk-bowlsvg, .tk-box, .tk-written').forEach(e => { if (!vis(e) && !(e instanceof SVGElement)) return; const b = e.getBoundingClientRect(); if (!b.width) return; if (b.left < card.left - 1 || b.right > card.right + 1) F('outside the card: ' + (e.getAttribute('data-k') || e.className.baseVal || e.className)); });
            document.querySelectorAll('.tk-wrap button').forEach(e => { if (!vis(e) || e.disabled) return; const b = e.getBoundingClientRect(); if (b.width < 43.5 || b.height < 43.5) F('control under 44: ' + e.getAttribute('data-k') + ' ' + Math.round(b.width) + '×' + Math.round(b.height)); });
            const chk = document.querySelector('[data-k="check"]'); if (state === 'rest' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            const nt = document.querySelector('.tk-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            document.querySelectorAll('.tk-colname').forEach(e => { const b = e.getBoundingClientRect(), p = e.closest('.tk-shelf').getBoundingClientRect(); if (b.left < p.left - 0.5 || b.right > p.right + 0.5) F('shelf name spills: ' + e.textContent); });
            document.querySelectorAll('.tk-shelf').forEach(sh => { const p = sh.getBoundingClientRect(); sh.querySelectorAll('.tk-piece').forEach(x => { const b = x.getBoundingClientRect(); if (b.left < p.left - 0.5 || b.right > p.right + 0.5 || b.bottom > p.bottom + 0.5) F('a piece outside its shelf: ' + sh.className); }); });
            const ti = document.querySelector('.tk-tuckimg'), wide = document.querySelector('.tk-wrap').classList.contains('is-wide'); if (!ti) F('no Tuck'); else { const b = ti.getBoundingClientRect(); if (Math.min(b.width, b.height) < (wide ? 95.5 : 63.5)) F('Tuck ' + Math.round(b.width)); } if (vw >= 700 && !wide) F('not the wide layout at ' + vw);
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
  console.log(`local-test-takeaway-scoop: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
