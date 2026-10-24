#!/usr/bin/env node
/* =====================================================================
   local-test-nine-stop.js — ACTIVITY #97, The Nine-Stop Tubes ("Ten More,
   Ten Less", 1.NBT.C.5), in a real browser with REAL clicks on the
   handles, the arrow cards, the count boxes and the keypad, a REAL card
   drag and the keyboard (never a model call to make a move). Per locale:
     · 34 + 10: Check unchanged → hintMove, no miss; one more cube (35) →
       hintTenMore, the tens tube glows, a ghost rod; miss 2 → hintOnlyTens,
       the ones plate ringed; 44 → okTenMore; the board EMPTY until solved;
     · 39 + 1: ▲ on the full ones tube bumps the lid (39 stays, hintLid);
       the trade by hand (a rod in, nine cubes out) → okOneMore;
     · 70 − 1: ▼ on the empty ones tube does nothing; 60 → hintOneLess,
       then hintTradeDown naming 70; 69 → okOneLess;
     · 58 ↑↑→→: three cards played by taps, the fourth meets the lid; a
       card DRAGGED onto the wrong tube slides back (hintWrongTube); the
       trade by hand → 40 → okFollow;  34 ↓: a played card tapped again is
       taken back;
     · mystery 24 ↓↓→ | 56 ↑←: trip 1 lands, 45 pinned, the tubes reset to
       56; trip 2 → okMystery;
     · count 23 → 57: no handles; blank → hintTypeCounts; 4 · 4 lands on
       67 (pencil plate), hintCount1; 3 · 4 → okCountDown;
     · number of the day 47: 57 when 10 less is asked → hintTenLess; the
       four neighbours fill the cross in order; okNod with the shared
       number word; the windows light: 47 dots in ten frames, the word;
     · frosted glass hides the blocks until Check; ArrowUp on a focused
       handle adds a block.
   And every round of every face at rest, at miss 2 and solved — reached
   ONCE per locale by real clicks, then resized through 320–1366 and
   measured: no sideways scroll, every enabled control ≥ 44 px, Check above
   the fold at rest, Check and the hint in view after a miss, the success
   line in view, nine blocks fit inside each tube, the parts inside the card.
   Usage: node scripts/local-test-nine-stop.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'ten,one,jumps,nod').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '097-nine-stop', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'nine-stop-core.js'));
const NW = require(path.join(__dirname, 'worksheet-gen', 'lib', 'number-words.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, NineStopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'nine-stop-activity.js'), 'utf8') + '\n;this.__A = NineStopActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/nine-stop-activity.html?activity=choice-board.ten-more-less.1-nbt-c-5&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.NineStopActivity && window.NineStopActivity.st && document.querySelector('.ns-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.NineStopActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, face, id, glass) {
    await page.evaluate((face, id, glass) => { const a = window.NineStopActivity; a.api.settings.task = face; a.api.settings.glass = glass || 'clear'; a._pool = null; a._ensurePool(); a._start(id, 0); a._render2(); window.scrollTo(0, 0); }, face, id, glass);
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.NineStopActivity.st; return { t: s.t, o: s.o, v: 10 * s.t + s.o, phase: s.phase, played: s.played.slice(), filled: s.filled.slice(), ghost: s.ghost, counts: Object.assign({}, s.counts), ran: s.ran, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ns-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(10); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  const check = (page, tag) => click(page, K('check'), tag);
  /* set the tubes to v by real clicks: tens first, then ones (so a lid is never met on the way) */
  async function setTo(page, v, tag) {
    for (let g = 0; g < 40; g++) { const s = await st(page), T = Math.floor(v / 10); if (s.t === T) break; await click(page, K((s.t < T ? 'up-' : 'down-') + 't'), tag); }
    for (let g = 0; g < 40; g++) { const s = await st(page), O = v % 10; if (s.o === O) break; await click(page, K((s.o < O ? 'up-' : 'down-') + 'o'), tag); }
  }
  async function typeCounts(page, d, r, tag) { await click(page, K('cnt-d'), tag); if ((await st(page)).counts.d) await click(page, K('key-del'), tag); await click(page, K('key-' + d), tag); await click(page, K('cnt-r'), tag); if ((await st(page)).counts.r) await click(page, K('key-del'), tag); await click(page, K('key-' + r), tag); }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- 34 + 10 ---- */
    let tag = `${loc} 34+10`, s;
    await force(page, 'ten', 'n0');
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'instrMake')) && sp(await page.evaluate(() => document.querySelector('.ns-qlab').textContent)) === sp(T(loc, 'promptTenMore')), `${tag}: instrMake, promptTenMore`);
    is(await count(page, '.ns-tf') === 0 && sp(await page.evaluate(() => document.querySelector('.ns-win.is-word').textContent)) === '', `${tag}: the board is empty before the round is solved (no answer printed)`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintMove')), `${tag}: Check unchanged → hintMove, no miss`);
    await click(page, K('up-o'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintTenMore')) && await count(page, '.ns-glass.is-glow[data-tube="t"]') === 1 && await count(page, '.ns-blk.is-t.is-ghost') === 1, `${tag}: 35 → hintTenMore, the tens tube glows, a ghost rod`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintOnlyTens')) && await count(page, '.ns-col.is-o .ns-plate.is-ring') === 1, `${tag}: miss 2 → hintOnlyTens, the ones plate ringed`);
    await click(page, K('down-o'), tag); await click(page, K('up-t'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okTenMore', { start: 34, answer: 44 })), `${tag}: 44 → okTenMore`);
    is(await page.evaluate(() => [...document.querySelectorAll('.ns-tf b.is-on')].length) === 44 && sp(await page.evaluate(() => document.querySelector('.ns-win.is-word').textContent)) === sp(NW.numberWord(44, loc)), `${tag}: solved → 44 dots in ten frames and the word «${NW.numberWord(44, loc)}»`);
    /* ---- 39 + 1 ---- */
    tag = `${loc} 39+1`;
    await force(page, 'one', 'n1');
    await click(page, K('up-o'), tag); s = await st(page);
    is(s.v === 39 && sp(await note(page)) === sp(T(loc, 'hintLidOnes')) && await count(page, '.ns-glass.is-bump') === 1, `${tag}: ▲ on the full ones tube bumps the lid, 39 stays`);
    await setTo(page, 40, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okOneMore', { start: 39, answer: 40 })), `${tag}: the trade by hand → 40, okOneMore`);
    /* ---- 70 − 1 ---- */
    tag = `${loc} 70−1`;
    await force(page, 'one', 'n3');
    is(await page.evaluate(() => { const a = window.NineStopActivity; return a._move('o', -1); }) === false && (await st(page)).v === 70, `${tag}: ▼ on the empty ones tube does nothing`);
    await click(page, K('down-t'), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintTradeDown', { start: 70 })) && await count(page, '.ns-glass[data-tube="t"].is-glow') === 1 && await count(page, '.ns-glass.is-glow') === 1 && await count(page, '.ns-blk.is-ghost') === 0, `${tag}: 60 → hintTradeDown at miss 1, the tens tube lit, no ghost`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintTradeDown', { start: 70 })), `${tag}: miss 2 → hintTradeDown naming 70, not the answer`);
    await setTo(page, 69, tag); await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okOneLess', { start: 70, answer: 69 })), `${tag}: 69 → okOneLess`);
    /* ---- 58 ↑↑→→ ---- */
    tag = `${loc} 58 UURR`;
    await force(page, 'jumps', 'f4');
    for (const i of [0, 1, 2]) await click(page, K('card-' + i), tag);
    s = await st(page); is(s.v === 39 && s.played.join() === 'true,true,true,false', `${tag}: three cards played by taps → 39`);
    await click(page, K('card-3'), tag); s = await st(page);
    is(s.v === 39 && !s.played[3] && sp(await note(page)) === sp(T(loc, 'hintLidOnes')), `${tag}: the fourth card meets the lid and does not flip`);
    { const a = await centre(page, K('card-3')), b = await page.evaluate(() => { const r = document.querySelector('.ns-glass[data-tube="t"]').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
      await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let k = 1; k <= 8; k++) { await page.mouse.move(a.x + (b.x - a.x) * k / 8, a.y + (b.y - a.y) * k / 8); await wait(8); } await page.mouse.up(); await wait(30); }
    s = await st(page); is(s.v === 39 && !s.played[3] && sp(await note(page)) === sp(T(loc, 'hintWrongTube')) && await count(page, '.ns-glass.is-glow[data-tube="o"]') === 1, `${tag}: the → card DRAGGED onto the tens tube slides back, its own tube glows`);
    await setTo(page, 40, tag); await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okFollow', { start: 58, arrows: '↑↑→→', answer: 40 })), `${tag}: the trade by hand → 40, okFollow`);
    tag = `${loc} 34 DDR undo`;
    await force(page, 'jumps', 'f0');
    await click(page, K('card-0'), tag); s = await st(page); is(s.v === 44 && s.played[0], `${tag}: ↓ → 44`);
    await click(page, K('card-0'), tag); s = await st(page); is(s.v === 34 && !s.played[0], `${tag}: tapped again → taken back, 34`);
    /* ---- mystery ---- */
    tag = `${loc} mystery 24|56`;
    await force(page, 'jumps', 'm0');
    is(sp(await page.evaluate(() => document.querySelector('.ns-qlab').textContent)) === sp(T(loc, 'pMystery')), `${tag}: pMystery`);
    for (const i of [0, 1, 2]) await click(page, K('card-' + i), tag);
    await check(page, tag); s = await st(page);
    is(s.phase === 1 && s.ghost === 45 && s.v === 56 && await count(page, '.ns-ghostplate') === 0, `${tag}: trip 1 lands on 45, the tubes reset to 56, its plate stays hidden (it is the answer)`);
    for (const i of [0, 1]) await click(page, K('card-' + i), tag);
    await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okMystery', { answer: 45 })), `${tag}: trip 2 → okMystery`);
    is(sp(await page.evaluate(() => (document.querySelector('.ns-ghostplate') || {}).textContent || '')) === '45', `${tag}: once solved the 45 plate shows`);
    /* ---- count ---- */
    tag = `${loc} count 23→57`;
    await force(page, 'jumps', 'c0');
    is(await count(page, '.ns-handle') === 0, `${tag}: no handles in a count round`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintTypeCounts')) && (await st(page)).misses === 0, `${tag}: blank → hintTypeCounts`);
    await typeCounts(page, 4, 4, tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.ran === 67 && s.v === 67 && sp(await page.evaluate(() => (document.querySelector('.ns-pencil') || {}).textContent || '')) === '67' && sp(await note(page)) === sp(T(loc, 'hintCount1')), `${tag}: 4 · 4 lands on 67 (pencil plate), hintCount1`);
    await typeCounts(page, 3, 4, tag); s = await st(page); is(s.v === 23, `${tag}: changing a count sends the tubes back to 23`);
    await check(page, tag);
    is((await st(page)).done && sp(await note(page)) === sp(T(loc, 'okCountDown', { a: 23, b: 57, d: 3, r: 4 })), `${tag}: 3 · 4 → okCountDown`);
    /* ---- number of the day ---- */
    tag = `${loc} nod 47`;
    await force(page, 'nod', 'n0');
    is(sp(await page.evaluate(() => document.querySelector('.ns-qlab').textContent)) === sp(T(loc, 'lab_m10')) && await count(page, '.ns-frame.is-next') === 1, `${tag}: the card asks for 10 less, its frame marked`);
    await setTo(page, 57, tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintTenLess')), `${tag}: 57 when 10 less is asked → hintTenLess`);
    for (const [k, v] of [[0, 37], [1, 46], [2, 48], [3, 57]]) { await setTo(page, v, tag); await check(page, tag); s = await st(page); is(s.filled.length === k + 1 && s.filled[k] === v && (k < 3 ? s.v === 47 : s.done), `${tag}: neighbour ${v} fills its frame`); }
    is(sp(await note(page)) === sp(T(loc, 'okNod', { n: 47, word: NW.numberWord(47, loc), m10: 37, p10: 57, m1: 46, p1: 48 })) && await count(page, '.ns-frame.is-on:not(.is-c)') === 4, `${tag}: okNod with «${NW.numberWord(47, loc)}», the cross full (${sp(await note(page))} | ${await count(page, '.ns-frame.is-on')})`);
    is(await page.evaluate(() => [...document.querySelectorAll('.ns-tf b.is-on')].length) === 47 && await count(page, '.ns-windows.is-lit') === 1, `${tag}: the windows light — 47 dots in ten frames`);
    /* ---- frosted, keyboard ---- */
    tag = `${loc} frost`;
    await force(page, 'ten', 'n1', 'frost');
    is(await count(page, '.ns-glass.is-frost') === 2, `${tag}: frosted glass hides the blocks`);
    await page.focus(K('up-t')); await page.keyboard.press('ArrowUp'); await wait(20); s = await st(page);
    is(s.v === 67, `${tag}: ArrowUp on a focused handle adds a rod (57 → 67)`);
    await check(page, tag);
    is(await count(page, '.ns-glass.is-frost') === 0, `${tag}: Check clears the frost`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    if (r.kind === 'count') { await typeCounts(page, state === 'solved' ? r.d : r.d + 1, r.r, tag); await check(page, tag); if (state === 'miss2') await check(page, tag); return; }
    if (state === 'solved') {
      if (r.kind === 'nod') { for (const v of r.targets) { await setTo(page, v, tag); await check(page, tag); } return; }
      if (r.kind === 'mystery') { await setTo(page, r.trips[0].land, tag); await check(page, tag); }
      await setTo(page, r.answer, tag); await check(page, tag); return;
    }
    const want = r.kind === 'nod' ? r.targets[0] : r.kind === 'mystery' ? r.trips[0].land : r.answer;
    const base = r.kind === 'nod' ? r.n : r.kind === 'mystery' ? r.trips[0].start : r.start;
    const wrong = [want + 1, want - 1, want + 10, want - 10].find(v => v !== base && v >= 1 && v <= 99);
    await setTo(page, wrong, tag); await check(page, tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.ns-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.ns-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.ns-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.ns-wrap').getBoundingClientRect();
    document.querySelectorAll('.ns-q,.ns-col,.ns-card,.ns-cnt,.ns-board,.ns-win').forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    /* nine blocks fit: the stack never pokes above its glass */
    document.querySelectorAll('.ns-glass').forEach(g => { const G = g.getBoundingClientRect(), s = g.querySelector('.ns-stack'); if (!s) return; const S = s.getBoundingClientRect(), n = s.children.length, per = n ? S.height / n : 0; if (G.height - 14 < per * 9 - 2) out.fails.push('nine blocks would not fit the tube'); if (n && S.top < G.top + 8) out.fails.push('blocks above the lid'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const face of FACES) for (const id of C.ids(face)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(face, id), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${face} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, face, id);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${face} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.ns-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 330); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.ns-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^[nfmc][0-1]$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${face}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-nine-stop: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
