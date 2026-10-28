#!/usr/bin/env node
/* =====================================================================
   local-test-acorn-sieve.js — ACTIVITY #144, The Acorn Sieve ("Tally's
   Acorn Baskets", 2.NBT.B.6), in a real browser with real pointer taps,
   in all 11 locales.
   Scenarios per locale (at 1024):
     · 23 + 14, cloth off: Check with the baskets upright → hintTip, no
       miss; tip both, a drag on the grip shakes: 3 cups, 7 in the tray;
       Check with empty windows → hintFill; 3 · 10 · 40 → the loose window
       is wrong, the cups count 10 20 30, hintCount; a second miss →
       hintSplit and the sums 20 + 10 = 30 and 3 + 4 = 7, the cups window
       pencilled; 3 · 7 · 37 → solved, the success line, Next 0.5 s later;
     · 44 + 28: a full groove rolls into a cup (6 → 7 cups, 12 → 2);
     · the cloth on: the grip asleep, nothing shows; 3 · 7 · 37 → the
       cloth comes off and the sieve shakes itself;
     · three small baskets 3 + 4 + 3: no cups window, one full groove,
       10 → solved;
     · the number wall 12 · 15 · 21: Check before pouring → hintPour; the
       brick pours its two bricks; 27, 36, 63 → the wall fills, the top line.
   Then every round of every face at rest, at a miss and solved — reached
   ONCE per locale by real taps, then resized through 320…1366: no
   sideways scroll, nothing outside the card, controls ≥ 44 px, Check
   above the fold at rest, the hint in view at a miss, Tally at picture
   size, no console errors.
   Usage: node scripts/local-test-acorn-sieve.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'acorn-sieve-core.js'));
const ACT = (() => { const ctx = { window: {}, AcornSieveCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'acorn-sieve-activity.js'), 'utf8') + '\n;this.__A = window.AcornSieveActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
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
    await page.goto(`${base}/acorn-sieve-activity.html?activity=tally-squirrel.add-four.2-nbt-b-6&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.AcornSieveActivity && window.AcornSieveActivity.st && document.querySelector('.as-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.AcornSieveActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, face, cloth, k) {
    const ok = await page.evaluate((face, cloth, k) => {
      const a = window.AcornSieveActivity; a.api.settings.baskets = face; a.api.settings.cloth = cloth; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.k === k && a.st.face === face && a.st.covered === (cloth === 'on');
    }, face, cloth, k);
    if (!ok) throw new Error('force failed ' + face + '/' + cloth + '/' + k);
  }
  async function click(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.AcornSieveActivity.st)));
  const noteT = async (page) => sp(await page.$eval('.as-note', e => e.textContent));
  const texts = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent.replace(/\s+/g, ' ').trim()));
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const win = async (page, w, digits, what) => { await click(page, `[data-k="win-${w}"]`, what); for (const d of String(digits)) await click(page, `[data-k="key-${d}"]`, what); };
  const clear = async (page, w, what) => { await click(page, `[data-k="win-${w}"]`, what); for (let i = 0; i < 2; i++) await click(page, '[data-k="key-del"]', what); };
  const check = (page, what) => click(page, '[data-k="check"]', what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  const tipAll = async (page, n, what) => { for (let i = 0; i < n; i++) await click(page, `[data-k="tub-${i}"]`, what + ' tub ' + i); };
  async function dragGrip(page) {
    const h = await page.$('[data-k="grip"]'); await page.evaluate(e => e.scrollIntoView({ block: 'center' }), h); const b = await h.boundingBox();
    const x = b.x + b.width / 2, y = b.y + b.height / 2; await page.mouse.move(x, y); await page.mouse.down();
    for (const dx of [12, 24, 6, -12, 10]) await page.mouse.move(x + dx, y, { steps: 2 });
    await page.mouse.up(); await wait(20);
  }

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 23 + 14, cloth off */
    await force(page, 'four', 'off', 0);
    is((await texts(page, '.as-tag')).join() === '23,14' && (await count(page, '.as-tallyimg')) === 1 && (await count(page, '.as-cloth[style*="none"]')) === 1, `${loc}: two baskets 23 and 14, Tally, no cloth`);
    await check(page, loc + ' upright'); let s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintTip')), `${loc}: Check with the baskets upright → «${T(loc, 'hintTip')}», no miss`);
    await tipAll(page, 2, loc); await dragGrip(page); s = await st(page);
    is(s.cups === 3 && s.tray === 7 && s.sieve === 0 && (await count(page, '.as-tub.is-tipped')) === 2 && (await count(page, '.as-cup')) === 3 && (await count(page, '.as-seated')) === 7, `${loc}: both tipped, a drag on the grip shakes — 3 cups, 7 in the tray`);
    await check(page, loc + ' empty'); s = await st(page);
    is(s.misses === 0 && (await noteT(page)) === sp(T(loc, 'hintFill')), `${loc}: empty windows → «${T(loc, 'hintFill')}»`);
    await win(page, 'cups', '3', loc); await win(page, 'loose', '10', loc); await win(page, 'all', '40', loc); await check(page, loc + ' miss 1'); s = await st(page);
    is(s.misses === 1 && !s.help && (await noteT(page)) === sp(T(loc, 'hintCount')) && (await count(page, '.as-win.is-wrong')) === 2 && (await texts(page, '.as-sieve .as-labt')).join() === '10,20,30', `${loc}: 3 · 10 · 40 → the loose and total windows are wrong, the cups count 10 20 30, «${T(loc, 'hintCount')}»`);
    await clear(page, 'loose', loc); is((await count(page, '.as-labt')) === 0, `${loc}: a keystroke clears the labels`);
    await click(page, '[data-k="key-7"]', loc); await check(page, loc + ' miss 2'); s = await st(page);
    is(s.help && (await noteT(page)) === sp(T(loc, 'hintSplit')) && sp((await texts(page, '.as-tensline')).join()) === '20 + 10 = 30' && sp((await texts(page, '.as-onesline')).join()) === '3 + 4 = 7', `${loc}: a second miss → «${T(loc, 'hintSplit')}», 20 + 10 = 30 and 3 + 4 = 7`);
    await page.evaluate(() => { window.AcornSieveActivity.OK_MS = 500; });
    await clear(page, 'all', loc); for (const d of '37') await click(page, `[data-k="key-${d}"]`, loc); await check(page, loc + ' solved'); s = await st(page);
    const okl = T(loc, 'okFour', { list: '23 + 14', total: 37, t: 3, o: 7 });
    is(s.done && (await noteT(page)) === sp(okl) && (await count(page, '.as-key')) === 0 && (await count(page, '.as-tensline:not(:empty)')) === 0, `${loc}: 3 · 7 · 37 → «${okl}», the keypad away, the sums gone`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.AcornSieveActivity.OK_MS = 600000; });
    /* 44 + 28: a full groove rolls */
    await force(page, 'four', 'off', 7); await tipAll(page, 2, loc); await click(page, '[data-k="grip"]', loc + ' shake');
    s = await st(page); is(s.cups === 6 && s.tray === 12 && (await count(page, '.as-groove.is-full')) === 1 && (await count(page, '[data-k="groove"]')) === 1, `${loc}: 44 + 28 — 6 cups, 12 loose, one full groove`);
    await click(page, '[data-k="groove"]', loc + ' roll'); s = await st(page);
    is(s.cups === 7 && s.tray === 2 && (await count(page, '.as-cup')) === 7 && (await count(page, '[data-k="groove"]')) === 0, `${loc}: the full groove rolls into a cup — 7 cups, 2 loose`);
    /* the cloth */
    await force(page, 'four', 'on', 0);
    is((await page.$eval('[data-k="grip"]', e => e.disabled)) && (await count(page, '.as-cloth:not([style*="none"])')) === 1, `${loc}: the cloth is on, the grip asleep`);
    await tipAll(page, 2, loc); s = await st(page); is(s.cups === 3 && s.sieve === 7 && s.tray === 0, `${loc}: under the cloth the acorns wait on the sieve`);
    await win(page, 'cups', '3', loc); await win(page, 'loose', '7', loc); await win(page, 'all', '37', loc); await check(page, loc + ' cloth'); s = await st(page);
    is(s.done && !s.covered && s.tray === 7 && (await count(page, '.as-cloth[style*="none"]')) === 1, `${loc}: Check lifts the cloth and shakes the sieve itself`);
    /* three small baskets */
    await force(page, 'small', 'off', 6);
    is((await count(page, '[data-k="win-cups"]')) === 0 && (await texts(page, '.as-tag')).join() === '3,4,3' && sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === sp(T(loc, 'pSmall')), `${loc}: three small baskets 3 4 3, no cups window, «${T(loc, 'pSmall')}»`);
    await tipAll(page, 3, loc); await click(page, '[data-k="grip"]', loc); s = await st(page);
    is(s.tray === 10 && (await count(page, '.as-groove.is-full')) === 1, `${loc}: 3 + 4 + 3 fills one groove`);
    await win(page, 'all', '10', loc); await check(page, loc + ' small'); s = await st(page);
    is(s.done && (await noteT(page)) === sp(T(loc, 'okSmall', { list: '3 + 4 + 3', total: 10 })), `${loc}: 10 → «${T(loc, 'okSmall', { list: '3 + 4 + 3', total: 10 })}»`);
    /* the number wall */
    await force(page, 'wall', 'off', 0);
    is((await texts(page, '.as-brick.is-filled')).join() === '12,15,21' && sp(await page.$eval('.lcs-activity-prompt-text', e => e.textContent)) === sp(T(loc, 'pWall')), `${loc}: the wall 12 15 21, «${T(loc, 'pWall')}»`);
    await check(page, loc + ' wall'); is((await noteT(page)) === sp(T(loc, 'hintPour')), `${loc}: Check before pouring → «${T(loc, 'hintPour')}»`);
    for (const [b, v] of [[3, 27], [4, 36], [5, 63]]) {
      await click(page, `[data-k="brick-${b}"]`, loc + ' pour ' + b); s = await st(page);
      is(s.focus === 'all' && s.tubs.every(t => t.tipped), `${loc}: brick ${b} pours its two bricks`);
      for (const d of String(v)) await click(page, `[data-k="key-${d}"]`, loc); await check(page, loc + ' brick ' + b); s = await st(page);
      if (b < 5) is(s.filled[b] && (await noteT(page)) === sp(T(loc, 'okBrick', { a: [12, 15, 27][b - 3], b: [15, 21, 36][b - 3], c: v })), `${loc}: brick ${b} = ${v}, the step line`);
    }
    is(s.done && (await noteT(page)) === sp(T(loc, 'okWall', { top: 63 })), `${loc}: the top brick 63 → «${T(loc, 'okWall', { top: 63 })}»`);
    is(!errs.length, `${loc}: no console errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();

    /* every round of every face: rest, miss, solved — reached once, resized through the widths */
    const p2 = await open(1024, loc), pg = p2.page;
    for (const [face, cloth] of [['four', 'off'], ['four', 'on'], ['few', 'off'], ['small', 'off'], ['wall', 'off']]) {
      const R = C.rounds(face);
      for (let k = 0; k < R.length; k++) for (const state of ['rest', 'miss', 'solved']) {
        await pg.setViewport({ width: 1024, height: 900 }); await wait(120); await force(pg, face, cloth, k); await wait(30);
        if (state !== 'rest') {
          if (face === 'wall') { await click(pg, '[data-k="brick-3"]', 'pour'); const br = C.bricksOf(R[k].base); const val = state === 'miss' ? br[3] + 10 : br[3]; for (const d of String(val)) await click(pg, `[data-k="key-${d}"]`, 'type'); await check(pg, 'wall'); if (state === 'miss') { await click(pg, '[data-k="key-del"]', 'del'); await click(pg, '[data-k="key-1"]', 'type'); await check(pg, 'miss 2'); } }
          else {
            const n = R[k].nums; await tipAll(pg, n.length, 'tip'); if (cloth === 'off') await click(pg, '[data-k="grip"]', 'shake');
            const tens = n.reduce((a, x) => a + Math.floor(x / 10), 0), ones = n.reduce((a, x) => a + x % 10, 0), tot = tens * 10 + ones;
            if (face !== 'small') { await click(pg, '[data-k="win-cups"]', 'cups'); await click(pg, `[data-k="key-${tens}"]`, 'cups'); await click(pg, '[data-k="win-loose"]', 'loose'); for (const d of String(ones)) await click(pg, `[data-k="key-${d}"]`, 'loose'); await click(pg, '[data-k="win-all"]', 'all'); }
            for (const d of String(state === 'miss' ? tot + 1 : tot)) await click(pg, `[data-k="key-${d}"]`, 'all');
            await check(pg, 'check'); if (state === 'miss') { await click(pg, '[data-k="key-del"]', 'del'); await click(pg, `[data-k="key-${(tot + 2) % 10}"]`, 'type'); await check(pg, 'miss 2'); }
          }
          const s2 = await st(pg);
          if (state === 'miss' && !(s2.help && s2.verdict)) is(false, `${loc} ${face}/${cloth} r${k}: did not reach miss 2`);
          if (state === 'solved' && !(face === 'wall' ? s2.filled[3] : s2.done)) is(false, `${loc} ${face}/${cloth} r${k}: did not solve`);
        }
        for (const w of WIDTHS) {
          await pg.setViewport({ width: w, height: VH(w) }); await wait(30); await pg.waitForFunction(() => { const e = document.querySelector('.as-wrap'); return e && e.classList.contains('is-wide') === (e.getBoundingClientRect().width >= 560); }, { timeout: 1000 }).catch(() => {}); await pg.evaluate(() => window.scrollTo(0, 0));
          const r = await pg.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app').getBoundingClientRect();
            document.querySelectorAll('.as-wrap button, .as-wrap img, .as-svg').forEach(e => { if (!vis(e)) return; const b = e.getBoundingClientRect(); if (b.left < card.left - 1 || b.right > card.right + 1) F('outside the card: ' + (e.getAttribute('data-k') || e.className.baseVal || e.className)); });
            document.querySelectorAll('.as-wrap button').forEach(e => { if (!vis(e) || e.disabled) return; const b = e.getBoundingClientRect(); if (b.width < 43.5 || b.height < 43.5) F('control under 44: ' + e.getAttribute('data-k') + ' ' + Math.round(b.width) + '×' + Math.round(b.height)); });
            const chk = document.querySelector('[data-k="check"]'); if (state === 'rest' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            const nt = document.querySelector('.as-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            const ti = document.querySelector('.as-tallyimg'), wide = document.querySelector('.as-wrap').classList.contains('is-wide'); if (!ti) F('no Tally'); else { const b = ti.getBoundingClientRect(); if (Math.min(b.width, b.height) < (wide ? 95.5 : 63.5)) F('Tally ' + Math.round(b.width)); } if (vw >= 700 && !wide) F('not the wide layout at ' + vw);
            return out;
          }, state);
          is(!r.fails.length, `${loc} ${face}/${cloth} r${k} ${state} @${w}: ${r.fails.slice(0, 3).join('; ')}`);
        }
      }
    }
    is(!p2.errs.length, `${loc}: no console errors in the sweep (${p2.errs.slice(0, 2).join(' | ')})`);
    await pg.close();
    console.log(`  ${loc}: ${Math.round((Date.now() - t0) / 1000)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-acorn-sieve: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
