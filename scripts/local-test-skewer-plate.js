#!/usr/bin/env node
/* =====================================================================
   local-test-skewer-plate.js — ACTIVITY #138, The Skewer Plate (Build an
   Array, 2.OA.C.4), in a real browser with real pointer clicks, in all 11
   locales.
   Scenarios per locale (at 1024):
     · count, 3 rows of 4: Check before lifting; one skewer out (keep
       going); a skewer put back; all three out with a box off by one (that
       skewer wobbles); rows + columns (one row and one column glow, r + c
       − 1 pieces); another wrong total (miss 2: running totals); 12 → the
       success line, Next 0.5 s later;
     · the skewer pot turns the sticks: beads on top, a column lifts whole;
     · build: an empty plate; the turned plate refused; 3 rows of 4 → done;
     · find: a wrong plate names its own rows and columns; the right one;
     · big arrays: a wrong product lifts every skewer into the rack; the
       right product → the line.
   Then every round of every job at rest, at a miss and solved — reached
   ONCE per locale by real clicks, then resized through 320…1366: no
   sideways scroll, the skewers, keys and Check above the fold at rest,
   the hint in view, controls ≥ 44 px, nothing outside the card, pictures
   large enough, no console errors.
   Usage: node scripts/local-test-skewer-plate.js [--widths=…] [--locales=…] [--modes=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const MODES = arg('modes', 'count,build,find,big').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'skewer-plate-core.js'));
const ACT = (() => { const ctx = { window: {}, SkewerPlateCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'skewer-plate-activity.js'), 'utf8') + '\n;this.__A = window.SkewerPlateActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/skewer-plate-activity.html?activity=array.build-array.2-oa-c-4&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SkewerPlateActivity && window.SkewerPlateActivity.st && document.querySelector('.sp-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.SkewerPlateActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, mode, k) {
    const ok = await page.evaluate((mode, k) => {
      const a = window.SkewerPlateActivity; a.api.settings.job = mode === 'big' ? 'count' : mode; a.api.settings.size = mode === 'big' ? 'big' : 'pics'; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.mode === mode && a.st.k === k;
    }, mode, k);
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
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.SkewerPlateActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.sp-note'); return { t: n.textContent, cls: n.className }; });
  const typeIn = async (page, box, v, what) => { await click(page, `[data-k="${box}"]`, what); for (const d of String(v)) await click(page, `[data-k="key-${d}"]`, what); };
  const clearBox = async (page, box) => { await click(page, `[data-k="${box}"]`, 'clear'); for (let i = 0; i < 3; i++) { const s = await st(page), v = box === 'total' ? s.totalBox : s.boxes[box.slice(4)]; if (!v) break; await click(page, '[data-k="key-del"]', 'del'); } };
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* count: 3 rows of 4 raspberries */
    await force(page, 'count', 1); let s = await st(page);
    await click(page, '[data-k="check"]', loc + ' early'); s = await st(page);
    is(s.misses === 0 && sp((await note(page)).t) === sp(T(loc, 'hLift')), `${loc}: Check before lifting — "lift first", no miss`);
    await click(page, '[data-k="skew-0"]', loc + ' lift 0'); s = await st(page);
    is(s.lifted.join() === '0' && (await page.$$('.sp-rstick')).length === 1 && (await page.$$('.sp-pic')).length === 8, `${loc}: a tap lifts a whole skewer — four pieces leave the plate`);
    await click(page, '[data-k="check"]', loc + ' partly'); is(sp((await note(page)).t) === sp(T(loc, 'hPartly')), `${loc}: one skewer out — keep going`);
    await click(page, '[data-k="back-0"]', loc + ' back'); s = await st(page); is(s.lifted.length === 0 && (await page.$$('.sp-pic')).length === 12, `${loc}: a tap in the rack puts the skewer back`);
    for (let i = 0; i < 3; i++) await click(page, `[data-k="skew-${i}"]`, loc + ' lift');
    await typeIn(page, 'box-0', 4, loc); await typeIn(page, 'box-1', 4, loc); await typeIn(page, 'box-2', 5, loc); await typeIn(page, 'total', 12, loc);
    await click(page, '[data-k="check"]', loc + ' unequal'); s = await st(page);
    is(s.misses === 1 && sp((await note(page)).t) === sp(T(loc, 'missUnequal')) && await page.$('[data-k="back-2"].is-bad') !== null, `${loc}: a box off by one — that skewer wobbles`);
    await clearBox(page, 'box-2'); await typeIn(page, 'box-2', 4, loc); await clearBox(page, 'total'); await typeIn(page, 'total', 7, loc);
    await click(page, '[data-k="check"]', loc + ' edges'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, 'missEdges')) && (await page.$$('.is-edge')).length === 6, `${loc}: 3 + 4 — one row and one column light up (6 pieces)`);
    await clearBox(page, 'total'); await typeIn(page, 'total', 13, loc);
    await click(page, '[data-k="check"]', loc + ' total'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, 'missTotal2')) && (await page.$$('.sp-run')).length === 3, `${loc}: miss 2 — running totals at each skewer`);
    await clearBox(page, 'total'); await typeIn(page, 'total', 12, loc);
    await page.evaluate(() => { window.SkewerPlateActivity.OK_MS = 500; });
    await click(page, '[data-k="check"]', loc + ' ok'); s = await st(page);
    is(s.done && /is-ok/.test((await note(page)).cls) && sp((await note(page)).t) === sp(T(loc, 'ok', { r: 3, c: 4, sum: '4 + 4 + 4', t: 12 })), `${loc}: 12 — the success line`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.SkewerPlateActivity.OK_MS = 600000; });
    /* the pot */
    await force(page, 'count', 6);
    await click(page, '[data-k="pot"]', loc + ' pot'); s = await st(page);
    is(s.dir === 'cols' && await page.$('.sp-plate.by-cols') !== null && (await page.$$('.sp-pic')).length === 16, `${loc}: the pot turns the sticks — no piece moves`);
    await click(page, '[data-k="skew-0"]', loc + ' lift col'); s = await st(page);
    is(s.lifted.join() === '0' && (await page.$$('.sp-pic')).length === 12, `${loc}: a column skewer lifts its whole column`);
    /* build */
    await force(page, 'build', 1);
    await click(page, '[data-k="check"]', loc + ' build empty'); is(sp((await note(page)).t) === sp(T(loc, 'hBuild')) && (await st(page)).misses === 0, `${loc}: build — an empty plate, no miss`);
    for (let i = 0; i < 4; i++) await click(page, '[data-k="step-rup"]', loc + ' row+'); for (let i = 0; i < 3; i++) await click(page, '[data-k="step-cup"]', loc + ' col+');
    await click(page, '[data-k="check"]', loc + ' turned'); s = await st(page);
    is(s.b.r === 4 && s.b.c === 3 && sp((await note(page)).t) === sp(T(loc, 'missTurned', { c: 4 })) && (await page.$$('.sp-pic')).length === 12, `${loc}: build — 4 rows of 3 for 4 + 4 + 4 is refused, the skewers go the wrong way`);
    await click(page, '[data-k="step-rdown"]', loc + ' row-'); await click(page, '[data-k="step-cup"]', loc + ' col+');
    await click(page, '[data-k="check"]', loc + ' build ok'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'ok', { r: 3, c: 4, sum: '4 + 4 + 4', t: 12 })), `${loc}: build — 3 rows of 4 is the plate`);
    /* find */
    await force(page, 'find', 0);
    await click(page, '[data-k="tray-2"]', loc + ' tray 2'); await click(page, '[data-k="check"]', loc + ' find wrong'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, 'missFind', { r: 4, c: 4 })) && (await page.$$('[data-k="tray-2"] .sp-edge')).length === 2, `${loc}: find — the wrong plate names its own 4 rows of 4`);
    await click(page, '[data-k="tray-0"]', loc + ' tray 0'); await click(page, '[data-k="check"]', loc + ' find ok'); is((await st(page)).done, `${loc}: find — the right plate`);
    /* big arrays */
    await force(page, 'big', 5);
    await typeIn(page, 'total', 15, loc); await click(page, '[data-k="check"]', loc + ' big wrong'); s = await st(page);
    is(sp((await note(page)).t) === sp(T(loc, 'missBig', { r: 8, c: 7 })) && (await page.$$('.sp-rstick.is-slim')).length === 8, `${loc}: big — a wrong product lifts all eight skewers into the rack`);
    await clearBox(page, 'total'); await typeIn(page, 'total', 56, loc); await click(page, '[data-k="check"]', loc + ' big ok'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'okBig', { r: 8, c: 7, t: 56 })), `${loc}: big — 8 × 7 = 56`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const mode of MODES) for (let k = 0; k < C.rounds(mode).length; k++) {
      await force(sw.page, mode, k);
      for (const state of ['rest', 'miss', 'solved']) {
        let s2 = await st(sw.page);
        const r = s2.r, c = s2.c;
        if (mode === 'count') {
          if (state === 'miss') { for (let i = 0; i < r; i++) await click(sw.page, `[data-k="skew-${i}"]`, ''); for (let i = 0; i < r; i++) await typeIn(sw.page, 'box-' + i, c, ''); await typeIn(sw.page, 'total', r + c, ''); await click(sw.page, '[data-k="check"]', ''); }
          if (state === 'solved') { await clearBox(sw.page, 'total'); await typeIn(sw.page, 'total', r * c, ''); await click(sw.page, '[data-k="check"]', ''); }
        } else if (mode === 'big') {
          if (state === 'miss') { await typeIn(sw.page, 'total', r + c, ''); await click(sw.page, '[data-k="check"]', ''); }
          if (state === 'solved') { await clearBox(sw.page, 'total'); await typeIn(sw.page, 'total', r * c, ''); await click(sw.page, '[data-k="check"]', ''); }
        } else if (mode === 'build') {
          if (state === 'miss') { for (let i = 0; i < r; i++) await click(sw.page, '[data-k="step-rup"]', ''); const wc = c < 5 ? c + 1 : c - 1; for (let i = 0; i < wc; i++) await click(sw.page, '[data-k="step-cup"]', ''); await click(sw.page, '[data-k="check"]', ''); }
          if (state === 'solved') { s2 = await st(sw.page); await click(sw.page, `[data-k="step-c${s2.b.c > c ? 'down' : 'up'}"]`, ''); await click(sw.page, '[data-k="check"]', ''); }
        } else {
          const ri = C.rightIndex(C.FIND[k]);
          if (state === 'miss') { await click(sw.page, `[data-k="tray-${(ri + 1) % 3}"]`, ''); await click(sw.page, '[data-k="check"]', ''); }
          if (state === 'solved') { await click(sw.page, `[data-k="tray-${ri}"]`, ''); await click(sw.page, '[data-k="check"]', ''); }
        }
        s2 = await st(sw.page); const tag = `${loc} ${mode} r${k + 1} ${state}`;
        if (state === 'miss') is(s2.misses >= 1, `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.SkewerPlateActivity, d = a._dims(), c = document.querySelector('.sp-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state, mode) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.sp-wrap button')).filter(vis).forEach(b => { const r = b.getBoundingClientRect(), k = b.getAttribute('data-k') || b.className; if (r.width < 43.5 || r.height < 43.5) F('small ' + k + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + k); if (state === 'rest' && r.bottom > vh + 1) F('below the fold ' + k + ' ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.sp-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            const chk = document.querySelector('[data-k="check"]'); if (state === 'miss' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            document.querySelectorAll('.sp-note:not(.is-ok), .sp-ordsum, .sp-fact').forEach(e => { if (vis(e) && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            document.querySelectorAll('.sp-platebox, .sp-buildplate, .sp-rack, .sp-tray').forEach(e => { const r = e.getBoundingClientRect(); if (r.right > cr.right + 1 || r.left < cr.left - 1) F('a drawing outside the card ' + e.className.split(' ')[0]); });
            const pic = Array.from(document.querySelectorAll('.sp-pic')).find(e => e.getBoundingClientRect().width > 0);
            if (pic) { const pw = pic.getBoundingClientRect().width, need = vw >= 700 ? 70 : vw >= 360 ? 56 : 44; if (pw < need) F('pictures too small: ' + pw.toFixed(0)); }
            const tile = Array.from(document.querySelectorAll('.sp-tile:not(.is-gone)')).find(e => e.getBoundingClientRect().width > 0); if (tile && tile.getBoundingClientRect().width < 17) F('tiles too small');
            return out;
          }, state, mode);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await sw.page.waitForFunction(() => document.querySelector('.sp-wrap').classList.contains('is-wide'), { timeout: 4000 }).catch(() => {}); await wait(80);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-skewer-plate: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
