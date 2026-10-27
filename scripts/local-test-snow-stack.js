#!/usr/bin/env node
/* =====================================================================
   local-test-snow-stack.js — ACTIVITY #140, The Snow-Lid Stack (Squirrel's
   Fair Winter Piles, 2.OA.C.4), in a real browser with real pointer
   actions, in all 11 locales.
   Scenarios per locale (at 1024):
     · Level 1, 3 rows of 4: Check with no twig (no miss); one twig, the
       stump stacks 4 on 8 — the lid slides, the extra row sticks out;
       Check (miss 1, the pile sizes beside the layers); again (miss 2, a
       dotted twig where the right cut goes); the second twig — the lid
       lies flat; the strip reads ▢ + ▢ + ▢ = 12; 3 (the top layer
       lights) then 4 → the success line, Next 0.5 s later;
     · the fix round: the preset twigs stack unfairly; moved → done;
     · Level 2, holes of 6: the mould on the stump; a wrong cut does not
       fit (dashed dents, coral extras); the right cut, 2 → done; with the
       equation hidden only the question and the box remain;
     · Level 3, 12 into 3 holes: Check on empty holes (no miss); one each
       (acorns left); one more (miss 2: one acorn in every hole again); a
       held press takes one back; shared out, 3 then 4 → done.
   Then every round of every level at rest, at a miss and solved — reached
   ONCE per locale by real clicks, then resized through 320…1366: no
   sideways scroll, controls above the fold at rest, the hint in view,
   controls ≥ 44 px, nothing outside the card, every drawn numeral inside
   its drawing, never a 0, no console errors.
   Usage: node scripts/local-test-snow-stack.js [--widths=…] [--locales=…] [--levels=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', '1,2,3').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'snow-stack-core.js'));
const ACT = (() => { const ctx = { window: {}, SnowStackCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'snow-stack-activity.js'), 'utf8') + '\n;this.__A = window.SnowStackActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/winter-piles-activity.html?activity=winter-piles.draw-partition.2-oa-c-4&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SnowStackActivity && window.SnowStackActivity.st && document.querySelector('.ws-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.SnowStackActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, level, k, eq) {
    const ok = await page.evaluate((level, k, eq) => {
      const a = window.SnowStackActivity; a.api.settings.level = level; a.api.settings.eq = eq; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.level === level && a.st.k === k;
    }, level, k, eq || 'shown');
    if (!ok) throw new Error('force failed');
  }
  async function click(page, sel, what) {
    let h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    let b = await h.boundingBox(); if (!b) { await wait(120); h = await page.$(sel); b = h && await h.boundingBox(); }
    if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(15); return true;
  }
  async function hold(page, sel, what) {
    const h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return; }
    await page.evaluate(e => e.scrollIntoView({ block: 'center' }), h); const b = await h.boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); await wait(700); await page.mouse.up(); await wait(30);
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.SnowStackActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.ws-note'); return { t: n.textContent, cls: n.className }; });
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const txt = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent));
  const key = (page, d, what) => click(page, `[data-k="key-${d}"]`, what);
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });
  const setCuts = async (page, want, what) => { const s = await st(page); for (const g of s.cuts) if (want.indexOf(g) < 0) await click(page, `[data-k="gap-${g}"]`, what); const s2 = await st(page); for (const g of want) if (s2.cuts.indexOf(g) < 0) await click(page, `[data-k="gap-${g}"]`, what); };

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* Level 1: 3 rows of 4 into fair piles */
    await force(page, '1', 1); let s = await st(page);
    is(s.rd.r === 3 && s.rd.c === 4 && (await count(page, '.ws-tray .ws-tok')) === 12 && (await count(page, '.ws-gap')) === 2, `${loc}: L1 3 rows of 4, twelve acorns, two gaps`);
    await click(page, '[data-k="check"]', loc + ' empty'); s = await st(page);
    is(s.misses === 0 && sp((await note(page)).t) === sp(T(loc, 'hCut')), `${loc}: Check with no twig — "tap a gap", no miss`);
    await click(page, '[data-k="gap-1"]', loc + ' twig'); s = await st(page);
    is(s.cuts.join() === '1' && (await count(page, '.ws-twig')) === 1 && await page.$eval('[data-k="gap-1"]', e => e.getAttribute('aria-pressed')) === 'true', `${loc}: a tap puts a twig in the gap`);
    await click(page, '[data-k="stack"]', loc + ' stack'); s = await st(page);
    is(s.stacked && (await count(page, '.ws-lid.is-slid')) === 1 && (await count(page, '.ws-slab')) === 2 && (await count(page, '.ws-dot.is-out')) === 4 && s.misses === 0, `${loc}: the stump stacks 4 on 8 — the extra row sticks out, the lid slides, no miss`);
    await click(page, '[data-k="check"]', loc + ' unfair'); s = await st(page);
    is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, 'unfair')) && (await txt(page, '.ws-size')).join() === '4,8', `${loc}: Check — miss 1, the sizes 4 and 8 beside the layers`);
    await click(page, '[data-k="check"]', loc + ' unfair2'); s = await st(page);
    is(s.help && sp((await note(page)).t) === sp(T(loc, 'miss2Cut')) && (await count(page, '.ws-ghost')) === 1, `${loc}: miss 2 — one dotted twig where the right cut goes`);
    await click(page, '[data-k="gap-2"]', loc + ' twig2'); s = await st(page);
    is(!s.stacked && !s.help && (await count(page, '.ws-ghost')) === 0, `${loc}: a twig slides the stack off and takes the help away`);
    await click(page, '[data-k="stack"]', loc + ' stack2');
    is((await count(page, '.ws-lid.is-flat')) === 1 && (await count(page, '.ws-dot.is-out')) === 0 && (await count(page, '.ws-slab')) === 3, `${loc}: three fair piles — the lid lies flat`);
    is((await count(page, '.ws-mirror')) === 2 && sp((await txt(page, '.ws-total')).join()) === '12', `${loc}: the strip reads ▢ + ▢ + ▢ = 12`);
    await key(page, 3, loc); await click(page, '[data-k="check"]', loc + ' read'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, 'readPile')) && (await count(page, '.ws-dot.is-lit')) === 4, `${loc}: 3 — count one pile (the top layer lights)`);
    await key(page, 4, loc);
    is((await txt(page, '.ws-mirror')).join() === '4,4', `${loc}: the mirrors repeat the typed 4`);
    await page.evaluate(() => { window.SnowStackActivity.OK_MS = 500; });
    await click(page, '[data-k="check"]', loc + ' ok'); s = await st(page);
    const okLine = T(loc, 'okPiles', { eq: '4 + 4 + 4', total: 12 });
    is(s.done && /is-ok/.test((await note(page)).cls) && sp((await note(page)).t) === sp(okLine), `${loc}: 4 — «${okLine}»`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.SnowStackActivity.OK_MS = 600000; });
    /* the fix round: 4 rows of 3, a twig after row 1 */
    await force(page, '1', 5); s = await st(page);
    is(s.cuts.join() === '1' && (await count(page, '.ws-twig')) === 1, `${loc}: the fix round arrives with its twig`);
    await click(page, '[data-k="check"]', loc + ' fix'); s = await st(page);
    is(s.misses === 1 && (await count(page, '.ws-lid.is-slid')) === 1, `${loc}: the preset piles stack unfairly`);
    await click(page, '[data-k="gap-1"]', loc); await click(page, '[data-k="gap-2"]', loc); await key(page, 6, loc); await click(page, '[data-k="check"]', loc + ' fix ok');
    is((await st(page)).done, `${loc}: the twig moved, 6 + 6 = 12`);
    /* Level 2: 4 rows of 3, holes of 6 */
    await force(page, '2', 0);
    is((await count(page, '.ws-mould')) === 1 && (await count(page, '.ws-dent')) === 6, `${loc}: L2 — the mould on the stump shows six dents`);
    await click(page, '[data-k="gap-1"]', loc); await click(page, '[data-k="check"]', loc + ' mould'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, 'mould', { k: 6 })) && (await count(page, '.ws-dent.is-missing')) >= 3 && (await count(page, '.ws-dot.is-out')) === 3, `${loc}: a 3 and a 9 do not fit the mould`);
    await setCuts(page, [2], loc); await key(page, 2, loc); await click(page, '[data-k="check"]', loc + ' L2 ok'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'okHoles', { total: 12, piles: 2, k: 6, eq: '6 + 6' })), `${loc}: L2 — 2 holes of 6`);
    await force(page, '2', 0, 'hidden');
    is((await count(page, '.ws-eqtxt')) === 0 && sp((await txt(page, '.ws-lbl')).join()) === sp(T(loc, 'boxHoles')), `${loc}: equation hidden — only the question and the box`);
    /* Level 3: 12 into 3 holes */
    await force(page, '3', 0); s = await st(page);
    is(s.heap === 12 && (await count(page, '.ws-heap .ws-tok')) === 12 && (await count(page, '.ws-pocket')) === 3, `${loc}: L3 — a heap of 12, three holes`);
    await click(page, '[data-k="check"]', loc + ' L3 empty'); is(sp((await note(page)).t) === sp(T(loc, 'hDeal')) && (await st(page)).misses === 0, `${loc}: Check with empty holes — no miss`);
    for (let i = 0; i < 3; i++) await click(page, `[data-k="pocket-${i}"]`, loc);
    await click(page, '[data-k="check"]', loc + ' heapLeft'); s = await st(page);
    is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, 'heapLeft')) && (await count(page, '.ws-heap.is-glow')) === 1 && (await count(page, '.ws-heap .ws-tok')) === 9, `${loc}: one each, nine left — share them all`);
    await click(page, '[data-k="pocket-0"]', loc); await click(page, '[data-k="check"]', loc + ' L3 unfair'); s = await st(page);
    is(s.help && s.pockets.join() === '1,1,1' && s.heap === 9 && sp((await note(page)).t) === sp(T(loc, 'miss2Deal')), `${loc}: miss 2 — back to one acorn in each hole`);
    await hold(page, '[data-k="pocket-0"]', loc); s = await st(page);
    is(s.pockets.join() === '0,1,1' && s.heap === 10, `${loc}: a held press takes the acorn back`);
    await click(page, '[data-k="pocket-0"]', loc);
    for (let q = 0; q < 9; q++) await click(page, `[data-k="pocket-${q % 3}"]`, loc);
    s = await st(page); is(s.pockets.join() === '4,4,4' && s.heap === 0 && (await count(page, '.ws-heap .ws-tok')) === 0, `${loc}: shared out — 4, 4, 4`);
    await key(page, 3, loc); await click(page, '[data-k="check"]', loc + ' readEach'); is(sp((await note(page)).t) === sp(T(loc, 'readEach')), `${loc}: 3 — count one hole`);
    await key(page, 4, loc); await click(page, '[data-k="check"]', loc + ' L3 ok'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'okShare', { each: 4, eq: '4 + 4 + 4', total: 12 })), `${loc}: L3 — each hole gets 4`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const lv of LEVELS) for (let k = 0; k < C.rounds(lv).length; k++) {
      await force(sw.page, lv, k);
      const rd = C.rounds(lv)[k], ans = C.answer(lv, rd);
      for (const state of ['rest', 'miss', 'solved']) {
        if (state === 'miss') {
          if (lv === '3') { for (let i = 0; i < rd.n; i++) await click(sw.page, `[data-k="pocket-${i}"]`, ''); }
          else if (rd.preset) { /* the preset twigs are already a wrong cut */ }
          else if (rd.r > 2) await click(sw.page, '[data-k="gap-1"]', '');
          else { await click(sw.page, '[data-k="gap-1"]', ''); await key(sw.page, ans === 9 ? 8 : ans + 1, ''); }
          await click(sw.page, '[data-k="check"]', '');
        }
        if (state === 'solved') {
          if (lv === '3') { const s2 = await st(sw.page); for (let q = 0; q < s2.heap; q++) await click(sw.page, `[data-k="pocket-${q % rd.n}"]`, ''); }
          else await setCuts(sw.page, C.rightCuts(lv, rd), '');
          await key(sw.page, ans, ''); await click(sw.page, '[data-k="check"]', '');
        }
        const s2 = await st(sw.page), tag = `${loc} L${lv} r${k + 1} ${state}`;
        if (state === 'miss') is(s2.misses >= 1, `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.SnowStackActivity, d = a._dims(), c = document.querySelector('.ws-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.ws-wrap button')).filter(vis).forEach(b => { const r = b.getBoundingClientRect(), k = b.getAttribute('data-k') || b.className; if (r.width < 43.5 || r.height < 43.5) F('small ' + k + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + k); if (state === 'rest' && r.bottom > vh + 1) F('below the fold ' + k + ' ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.ws-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            const chk = document.querySelector('[data-k="check"]'); if (state === 'miss' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            document.querySelectorAll('.ws-note:not(.is-ok)').forEach(e => { if (vis(e) && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            document.querySelectorAll('.ws-board, .ws-pockets, .ws-answer').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1)) F('outside the card ' + e.className.split(' ')[0]); });
            /* every drawn numeral lies inside its drawing */
            document.querySelectorAll('.ws-wrap svg text').forEach(e => { const r = e.getBoundingClientRect(), s = e.ownerSVGElement.getBoundingClientRect(); if (r.width && (r.left < s.left - 1 || r.right > s.right + 1 || r.top < s.top - 1 || r.bottom > s.bottom + 1)) F('a numeral outside its drawing «' + e.textContent + '»'); });
            /* never a 0 */
            document.querySelectorAll('.ws-size, .ws-dotnum, .ws-total, .ws-mirror, .ws-box').forEach(e => { if (e.textContent.trim() === '0') F('a 0 on screen'); });
            /* the pictures keep their size */
            document.querySelectorAll('.ws-pic').forEach(e => { const r = e.getBoundingClientRect(); if (r.width < (vw >= 700 ? 95 : 63)) F('picture too small ' + Math.round(r.width)); });
            return out;
          }, state);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await sw.page.waitForFunction(() => document.querySelector('.ws-wrap').classList.contains('is-wide'), { timeout: 4000 }).catch(() => {}); await wait(80);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-snow-stack: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
