#!/usr/bin/env node
/* =====================================================================
   local-test-mending-basket.js — ACTIVITY #115, The Thread That Snaps, in
   a real browser with real pointer actions (paper pieces tapped into the
   torn hole and the hole tapped to take them back, a word tapped to unpick
   it, crayons picked and pictures ringed, stickers lifted and placed, the
   needle or the scissors chosen, Check clicked), in all 11 locales.
   Scenarios per locale (at 1024):
     · the clue list;
     · Fill: an empty Check → hintEmptyFill, no miss; a piece → into the
       hole; the hole tapped → back; a wrong piece → hintSnap naming the
       keystone and the piece, the thread drawn in two frayed halves, both
       words glowing; again → hintKey, the keystone glows; the answer →
       okFill, the thread held, the page healed, a leaf in Granny's book;
     · Fix: a right word "fixed" → hintFixWord; the wrong word mended →
       okFix;
     · Who: the answer → okFill;
     · Do: a crayon + the right picture → okDo; a sticker in the wrong
       place → hintDo, then in the right place → okDo;
     · True or not: the right tool → okTrue / okFalse;
     · Story: two wrong answers → hintStory2 and the proof shaded; the
       answer → okStory.
   Then every clue × round at rest, at miss 2 and solved — reached ONCE per
   locale by real actions, then resized through 320…1366: no sideways
   scroll, Check above the fold at rest, Check and the hint in view at miss
   2, the success line in view, controls ≥ 44 px, pictures ≥ 64 px (≥ 96
   from 704), nothing outside the card, no bands overlap, the thread inside
   the page.
   Usage: node scripts/local-test-mending-basket.js [--widths=…] [--locales=…] [--clues=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,fr,es,it,pt,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const CLUES = arg('clues', 'fill,fix,who,do,true,story').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '115-thread-that-snaps', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'mending-basket-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, MendingBasketCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'mending-basket-activity.js'), 'utf8') + '\n;this.__A = MendingBasketActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = p.startsWith('/image-library-webp/') ? path.join(REPO, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/mending-basket-activity.html?activity=mending-basket.mend-page.rf-1-4-a&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MendingBasketActivity && window.MendingBasketActivity.st && document.querySelector('.mb-foot'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.MendingBasketActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, clue, r) {
    await page.evaluate((clue, r) => { const a = window.MendingBasketActivity; a.api.settings.clue = clue; a._pool = null; a._ensurePool(); a._pos = [1, 2, 0, 1, 2, 0, 1, 2, 0]; a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0); }, clue, r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.MendingBasketActivity.st; return { clue: s.clue, hole: s.hole, picked: s.picked, rings: JSON.stringify(s.rings), placed: JSON.stringify(s.placed), tool: s.tool, misses: s.misses, show: s.show, done: s.done, last: s.last }; });
  const R0 = (page) => page.evaluate(() => { const s = window.MendingBasketActivity.st; return { R: s.R, pieces: s.pieces, right: s.right, S: s.S }; });
  const note = (page) => page.evaluate(() => document.querySelector('.mb-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const W = (tok, i) => C.word(tok, i);
  /* at the narrowest width a story's question is the other side of the page: turn it first, like a child */
  async function toQuestion(page, tag) { if (await count(page, '.mb-storybox.is-s') === 1) { await click(page, K('turn'), tag); is(await count(page, '.mb-storybox.is-q') === 1 && await count(page, '.mb-basket.is-away') === 0, `${tag}: the page turned to the question`); } }
  /* real actions that solve a round, or miss it */
  async function solve(page, loc, clue, tag) {
    const r = await R0(page);
    await toQuestion(page, tag);
    if (clue === 'fix') await click(page, K('word-' + r.R.wrong), tag);
    if (r.pieces) { await click(page, K('piece-' + r.pieces.indexOf(r.R.ans)), tag); await check(page, tag); return; }
    if (clue === 'true') { await click(page, K('tool-' + (r.S.truth ? 'sew' : 'cut')), tag); await check(page, tag); return; }
    for (const o of r.S.ops) {
      if (o.op === 'place') { await click(page, K('sticker-' + r.S.stickers.indexOf(o.sticker)), tag); await click(page, K('zone-' + o.zone), tag); continue; }
      await click(page, K('crayon-' + o.colour), tag);
      if (o.index != null) await click(page, K('pic-' + o.index), tag);
      else { const done = await page.evaluate(() => Object.keys(window.MendingBasketActivity.st.rings).map(Number)); let n = o.count; for (let p = 0; n && p < r.S.row.length; p++) if (done.indexOf(p) < 0) { await click(page, K('pic-' + p), tag); n--; } }
    }
    await check(page, tag);
  }
  async function missTwice(page, loc, clue, tag) {
    const r = await R0(page);
    await toQuestion(page, tag);
    if (clue === 'fix') await click(page, K('word-' + r.R.wrong), tag);
    if (r.pieces) { await click(page, K('piece-' + r.pieces.findIndex(p => p !== r.R.ans)), tag); await check(page, tag); await check(page, tag); return; }
    if (clue === 'true') { await click(page, K('tool-' + (r.S.truth ? 'cut' : 'sew')), tag); await check(page, tag); await check(page, tag); return; }
    if (r.S.row) { const bad = r.S.crayons.find(c => !r.S.ops.some(o => o.colour === c)); await click(page, K('crayon-' + bad), tag); await click(page, K('pic-0'), tag); }
    else { const o = r.S.ops[0]; await click(page, K('sticker-' + r.S.stickers.indexOf(o.sticker)), tag); await click(page, K('zone-' + (o.zone === 'beside' ? 'above' : 'beside')), tag); }
    await check(page, tag); await check(page, tag);
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s, r;
    is(JSON.stringify(await page.evaluate(() => window.MendingBasketActivity.settings[0].options.map(o => o.value))) === '["fill","fix","who","do","true","story"]', `${loc}: the clue list`);
    /* Fill */
    tag = `${loc} fill`; await force(page, 'fill', 0); r = await R0(page);
    is(sp(await prompt(page)) === sp(T(loc, 'tFill')) && await count(page, '.mb-piece') === 3, `${tag}: the task line, three pieces`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmptyFill')), `${tag}: an empty Check → hintEmptyFill, no miss`);
    const wrong = r.pieces.findIndex(p => p !== r.R.ans);
    await click(page, K('piece-' + wrong), tag); s = await st(page);
    is(s.hole === wrong && sp(await page.evaluate(() => document.querySelector('.mb-hole').textContent)) === sp(r.pieces[wrong]), `${tag}: a piece → into the hole`);
    await click(page, K('hole'), tag); s = await st(page); is(s.hole === null, `${tag}: the hole tapped → the piece back`);
    await click(page, K('piece-' + wrong), tag); await check(page, tag); s = await st(page);
    is(s.last === 'snap' && sp(await note(page)) === sp(T(loc, 'hintSnap', { a: W(r.R.tok, r.R.key), b: r.pieces[wrong] })) && await count(page, '.mb-thread .mb-snapped') === 2 && await count(page, '.mb-w.is-snap') === 1 && await count(page, '.mb-hole.is-snap') === 1, `${tag}: ${r.pieces[wrong]} → the thread snaps between ${W(r.R.tok, r.R.key)} and it`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintKey', { w: W(r.R.tok, r.R.key) })) && await count(page, '.mb-w.is-key') === 1, `${tag}: miss 2 → the keystone glows`);
    await click(page, K('piece-' + r.pieces.indexOf(r.R.ans)), tag); is(await count(page, '.mb-w.is-key') === 0, `${tag}: a new move takes the help away`);
    await check(page, tag); s = await st(page);
    is(s.done && /\S/.test(await note(page)) && sp(await note(page)).indexOf(sp(r.R.ans)) >= 0 && await count(page, '.mb-thread .mb-held') === 1 && await count(page, '.mb-page.is-healed') === 1 && await count(page, '.mb-leaf.is-mended') === 1, `${tag}: ${r.R.ans} → okFill, the thread held, a leaf in the book`);
    /* Fix */
    tag = `${loc} fix`; await force(page, 'fix', 0); r = await R0(page);
    is(await count(page, 'button.mb-w') >= 5 && await page.evaluate(() => document.querySelectorAll('.mb-piece:disabled').length) === 3, `${tag}: the words are buttons; no piece before a word is unpicked`);
    const okWord = r.R.tok.findIndex((t, i) => t.t != null && !t.fix && i !== r.R.key);
    await click(page, K('word-' + okWord), tag); await click(page, K('piece-' + r.pieces.indexOf(r.R.ans)), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintFixWord', { a: W(r.R.tok, r.R.key), b: W(r.R.tok, okWord) })), `${tag}: a right word "fixed" → hintFixWord`);
    await click(page, K('word-' + r.R.wrong), tag);   /* another word moves the needle there; the first word goes back */ await click(page, K('piece-' + r.pieces.indexOf(r.R.ans)), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okFix', { a: r.R.tok[r.R.wrong].t, b: r.R.ans })), `${tag}: the wrong word mended → okFix`);
    /* Who */
    tag = `${loc} who`; await force(page, 'who', 0); await solve(page, loc, 'who', tag); s = await st(page); is(s.done, `${tag}: the answer → mended`);
    /* Do */
    tag = `${loc} do`; await force(page, 'do', 4); await solve(page, loc, 'do', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okDo')), `${tag}: the third fish ringed → okDo`);
    await force(page, 'do', 0); r = await R0(page);
    await click(page, K('sticker-0'), tag); is(await count(page, '.mb-stage.is-showing') === 1, `${tag}: a lifted sticker shows the places`);
    await click(page, K('zone-beside'), tag); await check(page, tag); s = await st(page);
    is(s.last === 'snap' && sp(await note(page)) === sp(T(loc, 'hintDo', { w: W(r.R.tok, r.R.cue[0].zone) })), `${tag}: the cat beside the bed → hintDo at the place word`);
    await click(page, K('zone-beside'), tag); s = await st(page); is(s.placed === '{}', `${tag}: a placed sticker tapped → back in the basket`);
    await solve(page, loc, 'do', tag); s = await st(page); is(s.done, `${tag}: the cat under the bed → okDo`);
    /* True */
    for (const ri of [0, 1]) { tag = `${loc} true ${ri}`; await force(page, 'true', ri); await solve(page, loc, 'true', tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, C.DATA.SH.true[ri].truth ? 'okTrue' : 'okFalse')), `${tag}: the right tool`); }
    /* Story */
    tag = `${loc} story`; await force(page, 'story', 0); await missTwice(page, loc, 'story', tag); r = await R0(page);
    is(sp(await note(page)) === sp(T(loc, 'hintStory2')) && await count(page, '.mb-sent.is-proof') === r.R.proof.length, `${tag}: miss 2 → the proof sentence shaded`);
    await click(page, K('piece-' + r.pieces.indexOf(r.R.ans)), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okStory', { a: r.R.ans })), `${tag}: the answer → okStory`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.mb-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.mb-pic img,.mb-ring img,.mb-still img,.mb-anchor img').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.mb-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.mb-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.mb-wrap')).getBoundingClientRect();
    document.querySelectorAll('.mb-page,.mb-basket,.mb-piece,.mb-hole,.mb-ring,.mb-spot,.mb-crayon,.mb-sticker,.mb-tool,.mb-check,.mb-stage').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.mb-book', '.mb-page', '.mb-basket', '.mb-foot', '.mb-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const pg = document.querySelector('.mb-page').getBoundingClientRect();
    document.querySelectorAll('.mb-thread path').forEach(p => { const q = p.getBoundingClientRect(); if (q.left < pg.left - 12 || q.right > pg.right + 12 || q.bottom > pg.bottom + 12) out.fails.push('the thread leaves the page'); });
    document.querySelectorAll('.mb-piece').forEach(c => { if (c.scrollWidth > c.clientWidth + 1) out.fails.push('a piece is cut off'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const clue of CLUES) for (const r of C.rounds(loc, clue)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${clue} ${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, clue, r);
      if (state === 'solved') await solve(page, loc, clue, t0); else if (state === 'miss2') await missTwice(page, loc, clue, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${clue} ${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.MendingBasketActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.mb-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${clue}-${r}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-mending-basket: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
