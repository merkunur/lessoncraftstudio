#!/usr/bin/env node
/* =====================================================================
   local-test-one-piece-stamp.js — ACTIVITY #108, The One-Piece Stamp, in
   a real browser with real pointer and key actions (cuts are DRAGGED from
   dot to dot or tapped dot-then-dot, stamps lifted by a tap and stamped by
   a tap or a drag, Check clicked; the model is only read — to know where
   a dot is — never told what happened), 11 locales.
   Scenarios per locale (at 1024):
     · square fourths: an empty Check → hintEmpty, no miss, the dots pulse;
       the off-centre cross dragged → Check → the stamp from the biggest
       piece visits a piece it does not fit (coral + stripes), hintUneq;
       miss 2 → gold dots; a new move clears it; a fourth cut → hintLimit;
       a cut tapped away; the fair cross by tap-tap → a stamp lifted by a
       tap and stamped by a DRAG onto a copy (a number) and by a tap;
       Check → the locale's line, 1/4 on every piece, the shelf, the
       halve-again button → eight copies;
     · two pieces for fourths → hintCount, the card shows the count;
     · circle halves: a chord off centre → a stamp tapped onto the other
       piece → coral overhang; the diameter → ok;
     · hexagon thirds (spokes from the pin) → ok; L2 #8: halves, then the
       fourths step (the halves cut stays), then ok;
     · shade 3/4 by stamping, a tap uncolours; name: ▲ to 3/4 → ok; the trap:
       Check → hintTrap, "Not equal!" → the fair cross;
     · the keyboard: arrows + Enter cut, Delete takes it away; settings: the
       ruler marks and the stamp that tests at Check.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, nothing
   outside the card, the bands never overlap, every piece inside the mat.
   Usage: node scripts/local-test-one-piece-stamp.js [--widths=…] [--locales=…] [--levels=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', 'hf,thirds,name').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '108-one-piece-stamp', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'one-piece-stamp-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, OnePieceStampCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'one-piece-stamp-activity.js'), 'utf8') + '\n;this.__A = OnePieceStampActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/one-piece-stamp-activity.html?activity=fractions.partition-equal-shares.1-g-a-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.OnePieceStampActivity && window.OnePieceStampActivity.st && document.querySelector('.ops-mat'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.OnePieceStampActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* the test seam: level + settings, then a round started fresh */
  async function force(page, level, r, set) {
    await page.evaluate((level, r, set) => { const a = window.OnePieceStampActivity; a.api.settings.level = level; a.api.settings.marks = (set && set.marks) || 'off'; a.api.settings.stamp = (set && set.stamp) || 'hand'; a._pool = null; a._ensurePool(); a._start(r, 0); a._render2(); window.scrollTo(0, 0); }, level, r, set || null);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const a = window.OnePieceStampActivity, s = a.st; return { kind: s.kind, n: s.n, step: s.step, cuts: s.cuts.map(c => c.id), pieces: s.pieces.length, held: s.held, tokens: Object.keys(s.tokens).length, misses: s.misses, show: s.show, done: s.done, wheels: s.wheels.slice(), halved: !!s.halved, test: !!a._view.test, ghost: !!a._view.ghost }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ops-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  /* page coordinates of a model point (the mat scrolled into view first) */
  async function xy(page, m) { return page.evaluate((m) => { const sv = document.querySelector('.ops-mat'); const r0 = sv.getBoundingClientRect(); if (r0.top < 0 || r0.bottom > window.innerHeight) sv.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = sv.getBoundingClientRect(); return { x: r.left + m[0] / 100 * r.width, y: r.top + m[1] / 100 * r.height }; }, m); }
  async function dragCut(page, cut) {
    const a = await xy(page, cut.a), b = await xy(page, cut.b);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await wait(3); }
    await page.mouse.up(); await wait(15);
  }
  async function tapAt(page, m) { const p = await xy(page, m); await page.mouse.click(p.x, p.y); await wait(15); }
  /* a point inside piece i, away from every cut */
  const inside = (page, i) => page.evaluate((i) => { const p = window.OnePieceStampActivity.st.pieces[i]; return [p.cx, p.cy]; }, i);
  async function tapPiece(page, i) { await tapAt(page, await inside(page, i)); }
  async function dragPiece(page, i, j) {
    const a = await xy(page, await inside(page, i)), b = await xy(page, await inside(page, j));
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 10; k++) { await page.mouse.move(a.x + (b.x - a.x) * k / 10, a.y + (b.y - a.y) * k / 10); await wait(3); }
    await page.mouse.up(); await wait(20);
  }
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(15); return true;
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const L1 = C.DATA.L1, L2 = C.DATA.L2;

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} square fourths`, s;
    await force(page, 'hf', 1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tCut4')), `${tag}: the task line`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')) && await count(page, '.ops-snap.is-pulse') > 4, `${tag}: an empty Check → hintEmpty, no miss, the dots pulse`);
    for (const c of L1[1][4]) await dragCut(page, c);
    s = await st(page); is(s.cuts.length === 2 && s.pieces === 4, `${tag}: two cuts dragged from dot to dot → four pieces`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.test && sp(await note(page)) === sp(T(loc, 'hintUneq')), `${tag}: Check → the stamp test, hintUneq`);
    is(await count(page, '.ops-over') === 1 && await count(page, '.ops-piece.is-gap') === 1 && await count(page, '.ops-srcline') === 1, `${tag}: the stamp from the biggest piece hangs over one piece it does not fit`);
    await check(page, tag); s = await st(page);
    is(s.show === 2 && s.ghost && await count(page, '.ops-ghost') === 4 && sp(await note(page)) === sp(T(loc, 'hintGhost')), `${tag}: miss 2 → four gold dots, hintGhost`);
    await dragCut(page, L1[1][3][0]); s = await st(page);
    is(s.cuts.length === 3 && !s.test && !s.ghost && await count(page, '.ops-ghost') === 0, `${tag}: a new cut takes the help away`);
    await dragCut(page, { a: [8 + 84 * 6 / 24, 8], b: [8 + 84 * 6 / 24, 92] }); s = await st(page);
    is(s.cuts.length === 3 && sp(await note(page)) === sp(T(loc, 'hintLimit')), `${tag}: a fourth cut → hintLimit`);
    /* tap the two tempting cuts away (a third of the way along each) */
    for (const c of L1[1][4]) { const m = [c.a[0] + (c.b[0] - c.a[0]) * 0.31, c.a[1] + (c.b[1] - c.a[1]) * 0.31]; await tapAt(page, m); }
    s = await st(page); is(s.cuts.length === 1, `${tag}: a tap on a cut lifts it away (${s.cuts.length} left)`);
    /* tap-tap: the second cut of the cross */
    await tapAt(page, L1[1][3][1].a); is(await count(page, '.ops-partner') >= 1, `${tag}: a tapped dot lights its partners`);
    await tapAt(page, L1[1][3][1].b); s = await st(page);
    is(s.cuts.length === 2 && s.pieces === 4, `${tag}: tap-tap makes the cut → the fair cross`);
    await tapPiece(page, 0); s = await st(page);
    is(s.held === 0 && s.tokens === 1 && await page.evaluate(() => !!document.querySelector('.ops-pad.is-held')), `${tag}: a tap lifts the glass stamp (token 1, the pad shows it)`);
    await dragPiece(page, 0, 3); s = await st(page);
    is(s.tokens === 2 && await count(page, '.ops-token') === 2, `${tag}: dragged onto a copy → it clicks, number 2`);
    await tapPiece(page, 1); s = await st(page);
    is(s.tokens === 3, `${tag}: a tap stamps a copy, number 3`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'ok4')), `${tag}: Check → the success line`);
    is(await count(page, '.ops-plabel') === 4 && await count(page, '.ops-mini') >= 1, `${tag}: 1/4 on every piece, the shape on the shelf`);
    await click(page, K('halve'), tag); s = await st(page);
    is(s.halved && s.pieces === 8 && await count(page, '.ops-plabel') === 8, `${tag}: halve again → eight pieces, 1/8 on each`);
    await click(page, K('halve'), tag); s = await st(page); is(!s.halved && s.pieces === 4, `${tag}: and back`);
    /* the count miss */
    tag = `${loc} count`; await force(page, 'hf', 1); await dragCut(page, L1[1][3][0]); await check(page, tag); s = await st(page);
    is(sp(await note(page)) === sp(T(loc, 'hintCount')) && await page.evaluate(() => document.querySelector('.ops-countk').textContent + '/' + document.querySelector('.ops-countn').textContent) === '2/4', `${tag}: two pieces for fourths → hintCount, the card shows 2 against 4`);
    /* circle halves: a chord off centre, a stamp tapped onto the other piece */
    tag = `${loc} circle halves`; await force(page, 'hf', 0);
    await dragCut(page, L1[0][4][0]); await tapPiece(page, 0); await tapPiece(page, 1); s = await st(page);
    is(s.tokens === 1 && await count(page, '.ops-over') === 1, `${tag}: the stamp of the small piece on the big one → coral, no number`);
    await tapAt(page, [L1[0][4][0].a[0] + (L1[0][4][0].b[0] - L1[0][4][0].a[0]) * 0.5, L1[0][4][0].a[1]]); s = await st(page);
    is(s.cuts.length === 0, `${tag}: the chord tapped away`);
    await dragCut(page, L1[0][3][0]); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'ok2')), `${tag}: the diameter → ok2`);
    /* hexagon thirds by spokes */
    tag = `${loc} hexagon thirds`; await force(page, 'thirds', 4);
    is(await count(page, '.ops-pin') === 1, `${tag}: the centre pin`);
    await dragCut(page, L2[4][3][0]); s = await st(page); is(s.pieces === 1 && await count(page, '.ops-cut[stroke-dasharray]') === 1, `${tag}: one spoke splits nothing (dashed)`);
    for (const c of L2[4][3].slice(1)) await dragCut(page, c);
    await check(page, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, 'ok3')), `${tag}: three spokes to alternate corners → ok3`);
    /* L2 #8: halves, then fourths */
    tag = `${loc} two steps`; const R8 = L2[C.DATA.STEP_ROUND]; await force(page, 'thirds', C.DATA.STEP_ROUND);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tCut2')), `${tag}: halves first`);
    await dragCut(page, R8[3][0]); await check(page, tag); s = await st(page);
    is(s.step === 2 && !s.done && sp(await note(page)) === sp(T(loc, 'okStep')) && sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tStep2')), `${tag}: halves → okStep, the task changes`);
    await tapAt(page, [30, 50]); s = await st(page); is(s.cuts.length === 1, `${tag}: the halves cut stays`);
    await dragCut(page, R8[3][1]); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'ok8')), `${tag}: fourths from the halves → ok8`);
    /* level 3: shade, name, trap */
    tag = `${loc} shade 3/4`; await force(page, 'name', 0);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tShade')), `${tag}: the task line`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintShade0')), `${tag}: an empty Check → hintShade0`);
    await tapPiece(page, 0); await tapPiece(page, 1); await tapPiece(page, 2); await tapPiece(page, 3); s = await st(page);
    is(s.tokens === 4, `${tag}: four stamped`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintShade')), `${tag}: four for 3/4 → hintShade`);
    await tapPiece(page, 3); s = await st(page); is(s.tokens === 3, `${tag}: a tap uncolours one`);
    await check(page, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, 'okShade', { a: 3, n: 4 })), `${tag}: three copies → okShade`);
    tag = `${loc} name 3/4`; await force(page, 'name', 5);
    is(await count(page, '.ops-wbtn') === 4 && sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'tName')), `${tag}: the wheels`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintName')), `${tag}: 1/1 → hintName`);
    await check(page, tag); is(await count(page, '.ops-token') === 4 && await count(page, '.ops-token.is-grey') === 1, `${tag}: miss 2 → the pieces numbered, coloured first`);
    for (let i = 0; i < 2; i++) await click(page, K('up-0'), tag); for (let i = 0; i < 3; i++) await click(page, K('up-1'), tag);
    s = await st(page); is(s.wheels.join('/') === '3/4', `${tag}: ▲ sets 3/4`);
    await check(page, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, 'okName', { a: 3, n: 4 })), `${tag}: → okName`);
    tag = `${loc} trap`; await force(page, 'name', 8);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintTrap')), `${tag}: Check → hintTrap`);
    await click(page, K('noteq'), tag); s = await st(page);
    is(s.kind === 'shade' && sp(await note(page)) === sp(T(loc, 'okTrap')) && await count(page, '[data-k="noteq"]') === 0, `${tag}: "Not equal!" → the fair cross to shade`);
    /* keyboard */
    tag = `${loc} keyboard`; await force(page, 'hf', 2);
    const ai = await page.evaluate(() => { const a = window.OnePieceStampActivity, A = a._anchors(), R = window.OnePieceStampCore.DATA.L1[2][3][0]; return A.findIndex(x => Math.abs(x.p[0] - R.a[0]) < 1e-6 && Math.abs(x.p[1] - R.a[1]) < 1e-6); });
    await page.evaluate(() => document.querySelector('.ops-mat').focus()); for (let i = 0; i <= ai; i++) await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter'); await page.evaluate(() => document.querySelector('.ops-mat').focus()); await page.keyboard.press('Enter'); s = await st(page);
    is(s.cuts.length === 1, `${tag}: arrows + Enter + Enter make a cut`);
    await page.evaluate(() => document.querySelector('.ops-mat').focus()); await page.keyboard.press('Delete'); s = await st(page); is(s.cuts.length === 0, `${tag}: Delete takes it away`);
    /* settings */
    tag = `${loc} settings`; await force(page, 'hf', 2, { marks: 'on' });
    is(await count(page, '.ops-snap.is-mark') >= 6, `${tag}: ruler marks on — the half / third / fourth dots`);
    await force(page, 'hf', 2, { stamp: 'auto' }); is(await count(page, '.ops-play') === 1, `${tag}: the stamp that tests at Check — the play mark on the pad`);
    await force(page, 'hf', 2); is(await count(page, '.ops-snap.is-mark') === 0 && await count(page, '.ops-play') === 0, `${tag}: defaults — neither`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, level, r, state, tag) {
    if (state === 'rest') return;
    const s = await st(page);
    if (level !== 'name') {
      const R = (level === 'hf' ? L1 : L2)[r];
      if (state === 'miss2') { const tempt = (level === 'thirds' && r === C.DATA.STEP_ROUND) ? [R[4][1]] : R[4]; for (const c of tempt) await dragCut(page, c); if ((await st(page)).cuts.length === 0) await dragCut(page, R[4][0]); await check(page, tag); await check(page, tag); return; }
      if (r === C.DATA.STEP_ROUND && level === 'thirds') { await dragCut(page, R[3][0]); await check(page, tag); await dragCut(page, R[3][1]); await check(page, tag); return; }
      for (const c of R[3]) await dragCut(page, c); await check(page, tag); return;
    }
    if (s.kind === 'name') {
      if (state === 'miss2') { await check(page, tag); await check(page, tag); return; }
      const R = C.DATA.L3[r]; for (let i = 1; i < R[3]; i++) await click(page, K('up-0'), tag); for (let i = 1; i < R[4]; i++) await click(page, K('up-1'), tag); await check(page, tag); return;
    }
    if (s.kind === 'trap') { if (state === 'miss2') { await check(page, tag); await check(page, tag); return; } await click(page, K('noteq'), tag); }
    const n2 = (await st(page)).pieces, a = C.DATA.L3[r][3];
    if (state === 'miss2') { for (let i = 0; i < n2; i++) await tapPiece(page, i); await check(page, tag); await check(page, tag); return; }
    for (let i = 0; i < a; i++) await tapPiece(page, i); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.ops-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.ops-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.ops-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.ops-wrap')).getBoundingClientRect();
    document.querySelectorAll('.ops-mat,.ops-pad,.ops-card,.ops-check,.ops-noteq,.ops-halve,.ops-tokens').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.baseVal != null ? 'mat' : e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.ops-shelf', '.ops-work', '.ops-foot', '.ops-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const mat = document.querySelector('.ops-mat').getBoundingClientRect();
    document.querySelectorAll('.ops-piece,.ops-plabel,.ops-token').forEach(e => { const q = e.getBoundingClientRect(); if (q.left < mat.left - 1 || q.right > mat.right + 1 || q.top < mat.top - 1 || q.bottom > mat.bottom + 1) out.fails.push((e.getAttribute('class') || '').split(' ')[0] + ' leaves the mat'); });
    if (mat.width < 250) out.fails.push('the mat is ' + Math.round(mat.width) + ' px');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of LEVELS) for (const r of C.ids(level)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level} #${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, r);
      await reach(page, level, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level} #${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.OnePieceStampActivity, D = a._dims(), m = document.querySelector('.ops-mat'); return m && Math.abs(+m.getAttribute('width') - D.mat) < 1 && a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow'); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.ops-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (r < 2 || r === 8)) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-one-piece-stamp: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
