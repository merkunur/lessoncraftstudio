#!/usr/bin/env node
/* =====================================================================
   local-test-roll-mat.js — ACTIVITY #96, The Roll-Up Mats ("Tuck's Ten
   Bundles", 1.NBT.C.4 + the column faces), in a real browser with REAL
   clicks on the bin, the mats, the grips, the shelves, the unroll arrows,
   the away tray, the boxes and the keypad, and a REAL press-and-hold pour
   (never a model call to make a move). For every locale:
     · 27 + 5: Check first → hintStart, no miss; the total box frosted;
       three cubes fill the ones mat (two fives: 5 + 5) and its tenth block
       covers the box; two more wait on the doorstep; Check → hintCovered,
       the ones bay pulses; roll → the ten lands on the tens shelf, the
       doorstep tumbles in, the box still covered by the shelf rod; drop →
       the box opens; 33 → the ones column counts itself, hintCount; again →
       hintCount2, the two-fives line; 32 → okAddRoll;
     · 42 + 5 (held down to pour): no ten to roll, 47 → okAddNone;
     · 38 + 25: the tens box stays closed while the ones are unsettled; the
       carry box shows 1 (de: in the row just above the answer rule); the
       pen moves left by itself; 63 → okAddRoll;
     · 52 − 17: hintStartSub; the ones run out → hintEmpty; the arrow pulls
       a ten down, it unrolls into a full mat, the tens digit is struck and
       rewritten; 35 → okSubRoll; one too few taken → hintAway;
     · 503 − 168: the arrow on an empty tens column → hintEmpty; a hundred
       unrolled into tens, then a ten into ones; 335 → okSubBoth;
     · 199 + 201: two carries, ten tens rolled into a hundred → okAddHundred.
   And every round of every face and way at rest, at miss 2 and solved —
   each state reached ONCE per locale by real clicks, then the window
   resized through 320–1366 and measured at every width: no sideways
   scroll, every enabled control ≥ 44 px, Check above the fold at rest,
   Check and the hint in view after a miss, the success line in view, Tuck
   a loaded library picture (≥ 96 / 64 px), every tenth well over its
   answer box, the written digits over their bays, the bays inside the card.
   Usage: node scripts/local-test-roll-mat.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'add1,col2,col3').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '096-roll-mat', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'roll-mat-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, RollMatCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'roll-mat-activity.js'), 'utf8') + '\n;this.__A = RollMatActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
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
    await page.goto(`${base}/roll-mat-activity.html?activity=place-value-regroup.add-compose-ten.1-nbt-c-4&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RollMatActivity && window.RollMatActivity.st && document.querySelector('.rm-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.RollMatActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, face, way, id) {
    await page.evaluate((face, way, id) => { const a = window.RollMatActivity; a.api.settings.numbers = face; a.api.settings.way = way; a._pool = null; a._ensurePool(); a._start(id, 0); a._render2(); window.scrollTo(0, 0); }, face, way, id);
    await page.waitForFunction(() => { const i = [...document.querySelectorAll('.rm-hamster')]; return i.length === 1 && i.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.RollMatActivity.st, o = {}; for (const c of s.r.cols) o[c] = { mat: s.cols[c].mat.length, door: s.cols[c].door.length, shelf: s.cols[c].shelf, bin: s.bin[c], away: s.away[c], w: s.written[c] }; return { cols: o, total: s.total, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.rm-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const has = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return !!(e && e.getClientRects().length && !e.disabled); }, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(12); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  const check = (page, tag) => click(page, K('check'), tag);
  async function type(page, digits, tag) { for (const d of String(digits)) await click(page, K('key-' + d), tag); }
  /* a full add: bring every block over, roll every full mat, drop every shelf, by real clicks */
  async function settleAdd(page, tag) {
    for (let g = 0; g < 80; g++) {
      const next = await page.evaluate(() => { const q = (s) => [...document.querySelectorAll(s)].find(e => e.getClientRects().length && !e.disabled); const x = q('[data-k^="roll-"]') || q('[data-k^="shelf-"]') || q('[data-k^="bin-"]'); return x ? x.getAttribute('data-k') : null; });
      if (!next) return; await click(page, K(next), tag);
    }
  }
  async function takeAll(page, r, tag) {
    for (let i = r.cols.length - 1; i >= 0; i--) {
      const c = r.cols[i]; let need = C.digit(r.b, c), guard = 0;
      while (need > 0 && guard++ < 60) {
        const s = await st(page);
        if (s.cols[c].mat + s.cols[c].door > 0) { await click(page, K('mat-' + c), tag); need--; continue; }
        let k = i; while (k > 0) { const sk = await st(page), L = r.cols[k - 1]; if (sk.cols[L].mat + sk.cols[L].door > 0) break; k--; }
        for (let j = k; j <= i; j++) await click(page, K('unroll-' + r.cols[j]), tag);
      }
    }
  }
  async function writeAns(page, r, v, tag) {
    if (r.total) { await click(page, K('box-total'), tag); await type(page, v, tag); return; }
    await click(page, K('box-O'), tag);
    for (let i = r.cols.length - 1; i >= 0; i--) await type(page, C.digit(v, r.cols[i]), tag);
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- 27 + 5 ---- */
    let tag = `${loc} 27+5`, s, r = C.round('add1', 'a0');
    await force(page, 'add1', 'add', 'a0');
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'instrAdd')) && sp(await page.evaluate(() => document.querySelector('.rm-line').textContent)) === '27 + 5 =', `${tag}: instrAdd, the sum line`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintStart')) && await count(page, '.rm-box.is-frost') === 1, `${tag}: Check first → hintStart, no miss, the box frosted`);
    for (let k = 0; k < 3; k++) await click(page, K('bin-O'), tag);
    s = await st(page);
    is(s.cols.O.mat === 10 && await count(page, '.rm-box.is-covered') === 1 && await has(page, K('roll-O')), `${tag}: three cubes fill the mat, its tenth block covers the box, the grip shows`);
    is(await page.evaluate(() => { const w = [...document.querySelectorAll('[data-k="mat-O"] .rm-well')]; return w.slice(0, 5).every(x => x.style.gridColumn === '1') && w.slice(5).every(x => x.style.gridColumn === '2'); }), `${tag}: the mat fills column by column (two fives)`);
    for (let k = 0; k < 2; k++) await click(page, K('bin-O'), tag);
    s = await st(page); is(s.cols.O.door === 2 && s.cols.O.bin === 0 && await count(page, '.rm-door.is-busy .rm-blk') === 2, `${tag}: two more wait on the doorstep`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintCovered')) && await count(page, '.rm-bay.is-pulse') === 1 && (await st(page)).misses === 0, `${tag}: Check → hintCovered, the ones bay pulses, no miss`);
    await click(page, K('roll-O'), tag); s = await st(page);
    is(s.cols.T.shelf === 1 && s.cols.O.mat === 2 && s.cols.O.door === 0 && await count(page, '.rm-box.is-covered') === 1, `${tag}: roll → the ten on the tens shelf, the doorstep tumbles in, the box still covered`);
    await click(page, K('shelf-T'), tag); s = await st(page);
    is(s.cols.T.mat === 3 && s.cols.T.shelf === 0 && await has(page, K('box-total')), `${tag}: drop → three tens, the box opens`);
    await click(page, K('box-total'), tag); await type(page, '33', tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintCount')) && await count(page, '.rm-bay.is-count') === 1 && await count(page, '.rm-box.is-wrong') === 1, `${tag}: 33 → the ones column lifts, hintCount`);
    await check(page, tag);
    is((await st(page)).misses === 2 && sp(await note(page)) === sp(T(loc, 'hintCount2')) && await count(page, '.rm-bay.is-fives') === 1, `${tag}: miss 2 → hintCount2, the two-fives line`);
    await click(page, K('box-total'), tag); await click(page, K('key-del'), tag); await type(page, '2', tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okAddRoll', { a: 27, b: 5, c: 32 })), `${tag}: 32 → okAddRoll`);
    /* ---- 42 + 5, poured by holding ---- */
    tag = `${loc} 42+5 hold`;
    await force(page, 'add1', 'add', 'a9');
    await page.evaluate(() => { window.RollMatActivity.FAST = false; });
    { const b = await centre(page, K('bin-O')); await page.mouse.move(b.x, b.y); await page.mouse.down(); await wait(1300); await page.mouse.up(); await wait(60); }
    await page.evaluate(() => { window.RollMatActivity.FAST = true; });
    s = await st(page); is(s.cols.O.bin === 0 && s.cols.O.mat === 7, `${tag}: holding the bin pours them all (${s.cols.O.bin} left)`);
    await wait(350); await click(page, K('mat-O'), tag); s = await st(page);
    is(s.cols.O.bin === 1 && s.cols.O.mat === 6, `${tag}: the next tap after a hold acts (a cube goes back to the bin) — the hold never swallows a later tap`);
    await click(page, K('bin-O'), tag); s = await st(page);
    is(s.cols.O.bin === 0 && s.cols.O.mat === 7, `${tag}: and the bin pours it again`);
    await writeAns(page, C.round('add1', 'a9'), 47, tag); await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okAddNone', { a: 42, b: 5, c: 47 })), `${tag}: 47 → okAddNone`);
    /* ---- 38 + 25 ---- */
    tag = `${loc} 38+25`;
    await force(page, 'col2', 'add', 'a0');
    const carryAfterOp = await page.evaluate(() => { const cells = [...document.querySelector('.rm-sum').children]; const op = cells.findIndex(e => e.classList.contains('is-op')); const cr = cells.findIndex(e => e.classList.contains('is-carryrow')); return cr > op; });
    is(carryAfterOp === (loc === 'de'), `${tag}: the carry box ${loc === 'de' ? 'in the row just above the answer rule (Übertragszeile)' : 'above the top number'}`);
    for (let k = 0; k < 2; k++) await click(page, K('bin-T'), tag);
    for (let k = 0; k < 5; k++) await click(page, K('bin-O'), tag);
    is(!(await has(page, K('box-T'))) && !(await has(page, K('box-O'))), `${tag}: the tens box stays closed while the ones are unsettled`);
    await click(page, K('roll-O'), tag); await click(page, K('shelf-T'), tag);
    is(sp(await page.evaluate(() => (document.querySelector('.rm-carry.is-on') || {}).textContent || '')) === '1', `${tag}: the carry box shows 1`);
    await click(page, K('box-O'), tag); await type(page, '3', tag);
    is(await page.evaluate(() => window.RollMatActivity._box) === 'T', `${tag}: the pen moves to the tens by itself`);
    await type(page, '6', tag); await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okAddRoll', { a: 38, b: 25, c: 63 })), `${tag}: 63 → okAddRoll`);
    /* ---- 52 − 17 ---- */
    tag = `${loc} 52−17`;
    await force(page, 'col2', 'sub', 's0');
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'instrSub')), `${tag}: instrSub`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintStartSub')), `${tag}: Check first → hintStartSub`);
    await click(page, K('mat-O'), tag); await click(page, K('mat-O'), tag); await click(page, K('mat-O'), tag);
    s = await st(page); is(s.cols.O.away === 2 && s.cols.O.mat === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: the ones run out → hintEmpty`);
    await click(page, K('unroll-O'), tag); s = await st(page);
    is(s.cols.O.mat === 10 && s.cols.T.mat === 4 && await count(page, '.rm-box.is-covered') === 1, `${tag}: a ten pulled down unrolls into a full mat, the ones box covered`);
    is(JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('.rm-sum s')].map(e => e.textContent + '>' + e.nextElementSibling.textContent))) === '["5>4","2>12"]', `${tag}: the tens digit struck and rewritten (5 > 4, 2 > 12)`);
    for (let k = 0; k < 5; k++) await click(page, K('mat-O'), tag);
    await click(page, K('mat-T'), tag);
    await writeAns(page, C.round('col2', 's0'), 35, tag); await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okSubRoll', { a: 52, b: 17, c: 35 })), `${tag}: 35 → okSubRoll`);
    tag = `${loc} 52−17 short`;
    await force(page, 'col2', 'sub', 's0');
    await click(page, K('mat-O'), tag); await click(page, K('mat-O'), tag); await click(page, K('unroll-O'), tag);
    for (let k = 0; k < 4; k++) await click(page, K('mat-O'), tag);
    await click(page, K('mat-T'), tag);
    await writeAns(page, C.round('col2', 's0'), 36, tag); await check(page, tag);
    is((await st(page)).misses === 1 && sp(await note(page)) === sp(T(loc, 'hintAway', { b: 17 })), `${tag}: one too few taken away → hintAway`);
    /* ---- 503 − 168 ---- */
    tag = `${loc} 503−168`;
    await force(page, 'col3', 'sub', 's2');
    for (let k = 0; k < 3; k++) await click(page, K('mat-O'), tag);
    await click(page, K('unroll-O'), tag);
    is(sp(await note(page)) === sp(T(loc, 'hintEmpty')) && (await st(page)).cols.T.mat === 0, `${tag}: an empty tens column → hintEmpty`);
    await click(page, K('unroll-T'), tag); await click(page, K('unroll-O'), tag); s = await st(page);
    is(s.cols.H.mat === 4 && s.cols.T.mat === 9 && s.cols.O.mat === 10, `${tag}: a hundred unrolled into tens, a ten into ones`);
    for (let k = 0; k < 5; k++) await click(page, K('mat-O'), tag);
    for (let k = 0; k < 6; k++) await click(page, K('mat-T'), tag);
    await click(page, K('mat-H'), tag);
    await writeAns(page, C.round('col3', 's2'), 335, tag); await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okSubBoth', { a: 503, b: 168, c: 335 })), `${tag}: 335 → okSubBoth`);
    /* ---- 199 + 201 ---- */
    tag = `${loc} 199+201`;
    await force(page, 'col3', 'add', 'a7');
    await settleAdd(page, tag); s = await st(page);
    is(s.cols.H.mat === 4 && s.cols.T.mat === 0 && s.cols.O.mat === 0, `${tag}: two carries, ten tens rolled into a hundred`);
    await writeAns(page, C.round('col3', 'a7'), 400, tag); await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okAddBoth', { a: 199, b: 201, c: 400 })), `${tag}: 400 → okAddBoth (a ten and a hundred rolled)`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    if (r.op === '+') await settleAdd(page, tag); else await takeAll(page, r, tag);
    await writeAns(page, r, state === 'solved' ? r.c : r.c + 1, tag);
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.rm-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.rm-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.rm-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.rm-wrap').getBoundingClientRect(), wide = W.width >= 560;
    document.querySelectorAll('.rm-bay,.rm-box,.rm-heap,.rm-sum').forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const pic = document.querySelector('.rm-hamster'); if (!pic || !pic.complete || !pic.naturalWidth) out.fails.push('Tuck did not load'); else if (pic.getBoundingClientRect().width < (wide ? 96 : 64) - 1) out.fails.push('Tuck is small');
    /* every tenth well hangs over its answer box */
    const boxes = [...document.querySelectorAll('.rm-box')].map(b => b.getBoundingClientRect());
    document.querySelectorAll('.rm-well.is-tenth').forEach(w => { const q = w.getBoundingClientRect(), cx = q.left + q.width / 2; const bx = boxes.find(b => cx >= b.left && cx <= b.right); if (!bx || q.bottom < bx.top + 4 || q.top > bx.bottom) out.fails.push('a tenth well is not over its answer box'); });
    /* the written digits stand over their bays */
    const bays = [...document.querySelectorAll('.rm-bay')].map(b => b.getBoundingClientRect()), digits = [...document.querySelectorAll('.rm-sum.is-cols .rm-cell.is-digit')];
    if (digits.length) digits.slice(0, bays.length).forEach((dg, i) => { const q = dg.getBoundingClientRect(); if (Math.abs((q.left + q.right) / 2 - (bays[i].left + bays[i].right) / 2) > 3) out.fails.push('a written digit is not over its bay'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const face of FACES) for (const id of C.ids(face, 'both')) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(face, id), way = r.op === '+' ? 'add' : 'sub', w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${face} ${id} ${r.a}${r.op}${r.b} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, face, way, id);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${face} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.rm-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 330); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.rm-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^[as][0-1]$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${face}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-roll-mat: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
