#!/usr/bin/env node
/* =====================================================================
   local-test-flip-pads.js — ACTIVITY #141, The Flip Pads (Hopper's Lily
   Hops, 2.NBT.A.2), in a real browser with real pointer taps, in all 11
   locales.
   Scenarios per locale (at 1024):
     · 85, 90, [95], [100], 105: the empty pad arrives as 90; Check on the
       copy (no miss); the ones flap once → 91 → the leap meter reads +1
       beside Hopper's +5; four more → 95 (five clacks, five tally dots) →
       the step line, and the next pad arrives as a copy of 95; the ones
       five more → 90 (no carry) → the meter reads −5; again → miss 2 (the
       pad before lined up over the board, all three flaps ringed); the
       hundreds and the tens by hand → 100 → the round line, the column
       show striping the ones; Next 0.5 s later;
     · going down 530, [520]: flipped forward → +10; back twice → done;
     · find the hop 640, 590, 540, 490: Check untouched (no miss); 50 with
       the plus sign → the sign hint; the sign turned → "−50";
     · "up only" drops the going-down rounds.
   Then every round of every set at rest, at a miss and solved — reached
   ONCE per locale by real taps, then resized through 320…1366: no
   sideways scroll, controls above the fold at rest, the hint in view,
   controls ≥ 44 px, nothing outside the card, the frog inside the pond,
   every drawn numeral inside its drawing, no console errors.
   Usage: node scripts/local-test-flip-pads.js [--widths=…] [--locales=…] [--sets=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path'), vm = require('vm');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,704,768,1024,1366').split(',').map(Number);
const SETS = arg('sets', '5,2,25').split(',');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'flip-pads-core.js'));
const ACT = (() => { const ctx = { window: {}, FlipPadsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'flip-pads-activity.js'), 'utf8') + '\n;this.__A = window.FlipPadsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ­]/g, ' ').replace(/\s+/g, ' ').trim();
const MINUS = '−';
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 150) console.error('   FAIL: ' + m); } };
/* the shortest real taps (on the core's own rule) from a board to a target board */
function tapsTo(board, target) {
  let b = board.slice(); const out = [];
  for (let pass = 0; pass < 3 && C.valueOf(b) !== C.valueOf(target); pass++) for (let i = 0; i < b.length; i++) {
    let best = null;
    for (const d of [1, -1]) { let g = b.slice(), n = 0; while (g[i] !== target[i] && n < 10) { C.flipDigits(g, i, d); n++; } if (g[i] === target[i] && (!best || n < best.n)) best = { d, n, g }; }
    if (best && best.n) { for (let q = 0; q < best.n; q++) out.push([i, best.d]); b = best.g; }
  }
  if (C.valueOf(b) !== C.valueOf(target)) throw new Error('no taps to ' + C.valueOf(target));
  return out;
}
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
    await page.goto(`${base}/flip-pads-activity.html?activity=skipcount.fill.2-nbt-a-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FlipPadsActivity && window.FlipPadsActivity.st && document.querySelector('.fp-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.FlipPadsActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, set, k, dir) {
    const ok = await page.evaluate((set, k, dir) => {
      const a = window.FlipPadsActivity; a.api.settings.by = set; a.api.settings.dir = dir; a._pool = null; a._ensurePool();
      a._start(k); a._render2(); window.scrollTo(0, 0); return a.st.set === set && a.st.k === k;
    }, set, k, dir || 'both');
    if (!ok) throw new Error('force failed');
  }
  async function click(page, sel, what) {
    let h = await page.$(sel); if (!h) { is(false, what + ': ' + sel + ' is missing'); return false; }
    const ok = await page.evaluate(e => { e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, hit = document.elementFromPoint(x, y); return !e.disabled && !!hit && (hit === e || e.contains(hit)); }, h);
    if (!ok) { is(false, what + ': ' + sel + ' cannot be clicked (disabled or covered)'); return false; }
    const b = await h.boundingBox(); if (!b) { is(false, what + ': ' + sel + ' vanished'); return false; }
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); await wait(10); return true;
  }
  const st = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.FlipPadsActivity.st)));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.fp-note'); return { t: n.textContent, cls: n.className }; });
  const count = (page, sel) => page.$$eval(sel, a => a.length);
  const txt = (page, sel) => page.$$eval(sel, a => a.map(e => e.textContent));
  const flip = (page, i, d, what) => click(page, `[data-k="${i === -1 ? 'sign' : 'flap-' + i}-${d > 0 ? 'up' : 'down'}"]`, what);
  const playTo = async (page, target, what) => { const s = await st(page); for (const [i, d] of tapsTo(s.board, C.flaps(target, s.places))) await flip(page, i, d, what); };
  const nextShown = (page) => page.evaluate(() => { const x = document.querySelector('.lcs-activity-next'); return !!(x && x.offsetParent !== null); });

  for (const loc of LOCS) {
    const t0 = Date.now(), { page, errs } = await open(1024, loc);
    /* 85, 90, [95], [100], 105 */
    await force(page, '5', 2); let s = await st(page);
    is(C.valueOf(s.board) === 90 && (await txt(page, '.fp-board .fp-digit')).join() === ',9,0', `${loc}: the empty pad arrives as a copy of 90 (blank, 9, 0)`);
    await click(page, '[data-k="check"]', loc + ' same'); s = await st(page);
    is(s.misses === 0 && sp((await note(page)).t) === sp(T(loc, 'hSame', { s: 5 })), `${loc}: Check on the copy — no miss`);
    await flip(page, 2, 1, loc); await click(page, '[data-k="check"]', loc + ' meter'); s = await st(page);
    is(s.misses === 1 && sp((await txt(page, '.fp-metertxt')).join()) === '+1' && sp((await txt(page, '.fp-hoptxt')).join()) === '+5' && sp((await note(page)).t) === sp(T(loc, 'missMeter', { hop: '+5', made: '+1' })), `${loc}: 91 — the leap meter reads +1 beside Hopper's +5`);
    for (let q = 0; q < 4; q++) await flip(page, 2, 1, loc);
    is((await count(page, '.fp-tally i')) === 5, `${loc}: five clacks, five tally dots`);
    await click(page, '[data-k="check"]', loc + ' bud1'); s = await st(page);
    is(s.filled.join() === '2' && C.valueOf(s.board) === 95 && sp((await note(page)).t) === sp(T(loc, 'okHop', { prev: 90, next: 95, s: 5 })) && (await count(page, '.fp-lily')) === 1, `${loc}: 95 — the step line; the next pad arrives as a copy of 95`);
    for (let q = 0; q < 5; q++) await flip(page, 2, 1, loc);
    await click(page, '[data-k="check"]', loc + ' carry'); s = await st(page);
    is(C.valueOf(s.board) === 90 && sp((await txt(page, '.fp-metertxt')).join()) === MINUS + '5', `${loc}: the ones past 9 leave the tens alone — 90, the meter reads ${MINUS}5`);
    await click(page, '[data-k="check"]', loc + ' miss2'); s = await st(page);
    is(s.help && sp((await note(page)).t) === sp(T(loc, 'miss2Up', { prev: 95, s: 5 })) && (await count(page, '.fp-ladder .fp-colrow')) === 2 && (await count(page, '.fp-flap.is-ring')) === 3, `${loc}: miss 2 — 95 lined up over the board, three flaps ringed`);
    await playTo(page, 100, loc); s = await st(page); is(C.valueOf(s.board) === 100 && !s.help, `${loc}: the hundreds and the tens by hand — 100`);
    await page.evaluate(() => { window.FlipPadsActivity.OK_MS = 500; });
    await click(page, '[data-k="check"]', loc + ' done'); s = await st(page);
    const line = T(loc, 'okList', { list: '85, 90, 95, 100, 105', s: 5 });
    is(s.done && sp((await note(page)).t) === sp(line) && (await count(page, '.fp-show .fp-colrow')) === 5 && (await count(page, '.fp-show .is-stripe')) === 5, `${loc}: «${line}», the column show stripes the ones`);
    await wait(1100); is(await nextShown(page), `${loc}: Next 0.5 s after the result`);
    await page.evaluate(() => { window.FlipPadsActivity.OK_MS = 600000; });
    /* going down 530, [520] */
    await force(page, '5', 6); await flip(page, 1, 1, loc); await click(page, '[data-k="check"]', loc + ' down');
    is(sp((await txt(page, '.fp-metertxt')).join()) === '+10' && sp((await txt(page, '.fp-hoptxt')).join()) === MINUS + '10', `${loc}: flipped forward in a going-down round — +10 beside ${MINUS}10`);
    await flip(page, 1, -1, loc); await flip(page, 1, -1, loc); await click(page, '[data-k="check"]', loc + ' down ok'); s = await st(page);
    is(s.filled.join() === '1' && sp((await note(page)).t) === sp(T(loc, 'okHop', { prev: 530, next: 520, s: 10 })), `${loc}: 520 — one hop back of 10`);
    /* find the hop: 640, 590, 540, 490 */
    await force(page, '25', 9);
    is((await count(page, '[data-k="sign-up"]')) === 1 && (await count(page, '.fp-board .fp-flap')) === 4, `${loc}: Hopper's sign — a sign flap and three digit flaps`);
    await click(page, '[data-k="check"]', loc + ' hop empty'); is(sp((await note(page)).t) === sp(T(loc, 'hSign')) && (await st(page)).misses === 0, `${loc}: an untouched sign — no miss`);
    await playTo(page, 50, loc); await click(page, '[data-k="check"]', loc + ' hop sign');
    is(sp((await note(page)).t) === sp(T(loc, 'missHopSign')), `${loc}: +50 for a shrinking chain — turn the sign`);
    await flip(page, -1, 1, loc); await click(page, '[data-k="check"]', loc + ' hop ok'); s = await st(page);
    is(s.done && sp((await note(page)).t) === sp(T(loc, 'okSign', { sign: MINUS, s: 50 })), `${loc}: ${MINUS}50 — every hop`);
    /* up only */
    await force(page, '5', 0, 'up'); is((await page.evaluate(() => window.FlipPadsActivity._pool.length)) === 9, `${loc}: up only — 9 rounds, no going down`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();

    /* ---------- the sweep ---------- */
    const sw = await open(1024, loc);
    for (const set of SETS) for (let k = 0; k < C.rounds(set, 'both').length; k++) {
      await force(sw.page, set, k);
      const rd = C.rounds(set, 'both')[k];
      for (const state of ['rest', 'miss', 'solved']) {
        if (state === 'miss') { await flip(sw.page, 2, 1, ''); await click(sw.page, '[data-k="check"]', ''); }
        if (state === 'solved') {
          if (rd.hop) { const s0 = await st(sw.page), step = rd.seq[1] - rd.seq[0]; if ((step < 0) !== (s0.sign < 0)) await flip(sw.page, -1, 1, ''); await playTo(sw.page, Math.abs(step), ''); await click(sw.page, '[data-k="check"]', ''); }
          else for (let guard = 0; guard < 3 && !(await st(sw.page)).done; guard++) { const s0 = await st(sw.page); await playTo(sw.page, rd.seq[rd.buds[s0.bi]], ''); await click(sw.page, '[data-k="check"]', ''); }
        }
        const s2 = await st(sw.page), tag = `${loc} ${set} r${k + 1} ${state}`;
        if (state === 'miss') is(s2.misses >= 1, `${tag}: reached`);
        if (state === 'solved') is(s2.done, `${tag}: reached`);
        for (const w of WIDTHS) {
          await sw.page.setViewport({ width: w, height: VH(w) }); await wait(60);
          await sw.page.waitForFunction(() => { const a = window.FlipPadsActivity, d = a._dims(), c = document.querySelector('.fp-wrap').classList; return c.contains('is-wide') === d.wide && c.contains('is-cramp') === d.cramp; }, { timeout: 4000 }).catch(() => {});
          await sw.page.evaluate(() => window.scrollTo(0, 0));
          const m = await sw.page.evaluate((state) => {
            const out = { fails: [] }, vw = innerWidth, vh = innerHeight, F = (x) => out.fails.push(x), vis = (e) => e && e.offsetParent !== null;
            if (document.documentElement.scrollWidth > vw + 1) F('sideways scroll ' + document.documentElement.scrollWidth);
            const card = document.querySelector('.lcs-app') || document.body, cr = card.getBoundingClientRect();
            Array.from(document.querySelectorAll('.fp-wrap button')).filter(vis).forEach(b => { const r = b.getBoundingClientRect(), k = b.getAttribute('data-k') || b.className; if (r.width < 43.5 || r.height < 43.5) F('small ' + k + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (r.left < cr.left - 1 || r.right > cr.right + 1) F('outside the card ' + k); if (state === 'rest' && r.bottom > vh + 1) F('below the fold ' + k + ' ' + Math.round(r.bottom)); });
            const nt = document.querySelector('.fp-note'); if (state === 'miss' && nt.getBoundingClientRect().bottom > vh + 1) F('the hint below the fold ' + Math.round(nt.getBoundingClientRect().bottom));
            const chk = document.querySelector('[data-k="check"]'); if (state === 'miss' && vis(chk) && chk.getBoundingClientRect().bottom > vh + 1) F('Check below the fold ' + Math.round(chk.getBoundingClientRect().bottom));
            document.querySelectorAll('.fp-note:not(.is-ok)').forEach(e => { if (vis(e) && e.scrollWidth > e.clientWidth + 1) F('clipped text «' + e.textContent.slice(0, 24) + '»'); });
            document.querySelectorAll('.fp-pond, .fp-board, .fp-show, .fp-ladder').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.right > cr.right + 1 || r.left < cr.left - 1)) F('outside the card ' + e.className.split(' ')[0]); });
            /* on phones a finished round shows the column in place of the pond */
            const pondEl = document.querySelector('.fp-pond'); if (!vis(pondEl)) { if (state !== 'solved' || document.querySelector('.fp-wrap').classList.contains('is-wide') || !vis(document.querySelector('.fp-show'))) F('the pond is hidden'); return out; }
            const pond = pondEl.getBoundingClientRect(), frog = document.querySelector('.fp-frog').getBoundingClientRect();
            if (frog.top < pond.top - 1 || frog.left < pond.left - 1 || frog.right > pond.right + 1) F('the frog cut off by the pond ' + Math.round(frog.top - pond.top) + '/' + Math.round(frog.left - pond.left));
            if (frog.width < (vw >= 700 ? 95 : 63)) F('frog too small ' + Math.round(frog.width));
            document.querySelectorAll('.fp-svg text').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.left < pond.left - 1 || r.right > pond.right + 1 || r.top < pond.top - 1 || r.bottom > pond.bottom + 1)) F('a numeral outside the pond «' + e.textContent + '»'); });
            document.querySelectorAll('.fp-padleaf').forEach(e => { const r = e.getBoundingClientRect(); if (r.left < pond.left - 1 || r.right > pond.right + 1 || r.top < pond.top - 1 || r.bottom > pond.bottom + 1) F('a pad cut off by the pond'); });
            return out;
          }, state);
          is(m.fails.length === 0, `${tag} @${w}: ${m.fails.slice(0, 4).join('; ')}`);
        }
        await sw.page.setViewport({ width: 1024, height: VH(1024) }); await sw.page.waitForFunction(() => document.querySelector('.fp-wrap').classList.contains('is-wide'), { timeout: 4000 }).catch(() => {}); await wait(80);
      }
    }
    is(sw.errs.length === 0, `${loc} sweep: no console errors (${sw.errs.slice(0, 3).join(' | ')})`);
    await sw.page.close();
    console.log(`  ${loc}: ${((Date.now() - t0) / 1000).toFixed(0)} s, ${PASS} pass, ${FAIL} fail so far`);
  }
  await browser.close(); server.close();
  console.log(`local-test-flip-pads: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
