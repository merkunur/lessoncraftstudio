#!/usr/bin/env node
/* =====================================================================
   local-test-rung-ladder.js — ACTIVITY #87, The Rung Ladder ("Addition &
   Subtraction Pairs", 1.OA.D.7), in a real browser with REAL taps on the
   cards, the squirrel and the rack tags, and the keyboard (never a model
   call to make a move). For every locale:
     · Same answer 2 + 3 | 3 + 4 | 9 − 4 | 9 − 2: two additions are hKind,
       not a miss; 2 + 3 with 9 − 2 builds two rails (5 and 7 holes), the
       squirrel stops after 5 rungs — miss 1, hMore 2, two glowing holes
       numbered 1 2 on the TALLER rail; the next card tap clears that help;
       3 + 4 with 9 − 4 is miss 2: hLook, little rails on every card, no
       numerals; 2 + 3 with 9 − 4 climbs to the gold cap, okPair, the tag
       "2 + 3 = 9 − 4" hangs on the rack; tapping the tag takes it apart;
       both pairs by the keyboard (Enter) → okAll, every card locked;
     · Undo it 3 + 5 | 5 + 3 | 8 − 5 | 8 − 3: 3 + 5 with 8 − 3 stops on the
       seam — hColour, the band ringed on BOTH rails, no numerals; again →
       hSeam; 3 + 5 with 8 − 5 → okUndo and the tag "3 + 5 = 8 · 8 − 5 = 3";
       5 + 3 with 8 − 3 → okFamily.
     · "On the cards" shows a little rail on every card at rest.
   And every round of both levels at rest, waiting for the squirrel, at miss
   2 and solved — each state reached ONCE per locale by real taps, then the
   window resized through 320–1366 and measured at every width: the cards and the squirrel above the fold, the
   note in view after a stop and when solved, no sideways scroll, every
   control ≥ 44 px, the squirrel and the acorn loaded library pictures inside
   the yard, the yard inside the card.
   Usage: node scripts/local-test-rung-ladder.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '087-rung-ladder', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'rung-ladder-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, RungLadderCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'rung-ladder-activity.js'), 'utf8') + '\n;this.__A = RungLadderActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const sp = (s) => String(s).replace(/[   ]/g, ' ');
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
    await page.goto(`${base}/rung-ladder-activity.html?activity=match-pairs.addition-and-subtraction-pairs.1-oa-d-7&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RungLadderActivity && window.RungLadderActivity.st && document.querySelector('.rl-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.RungLadderActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.waitForFunction(() => !!document.querySelector('.rl-sq'), { timeout: 8000 }).catch(() => {});
    return { page, errs };
  }
  async function force(page, level, idx, rails) {
    await page.evaluate((level, idx, rails) => { const a = window.RungLadderActivity; a.api.settings.pairs = level; a.api.settings.rails = rails || 'after'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); window.scrollTo(0, 0); }, level, idx, rails);
    await page.waitForFunction(() => [...document.querySelectorAll('.rl-sq,.rl-acorn')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.RungLadderActivity.st; return { done: s.done, misses: s.misses, show: s.show, pending: !!s.pending, selected: s.selected, climbed: s.climbed.length, last: s.last && s.last.reason }; });
  const note = (page) => page.evaluate(() => document.querySelector('.rl-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const idOf = (r, txt) => r.cards.find(c => C.text(c) === txt).id;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const card = (page, id, tag) => click(page, `[data-k="card-${id}"]`, tag);
  const squirrel = async (page, tag) => { await click(page, '[data-k="squirrel"]', tag); await wait(60); };
  async function pairAndClimb(page, r, a, s, tag) { await card(page, idOf(r, a), tag); await card(page, idOf(r, s), tag); await squirrel(page, tag); }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- Same answer ---- */
    let tag = `${loc} same`, r = C.round('same', 0);
    await force(page, 'same', 0);
    is(await count(page, '.rl-card') === 4 && await count(page, '.rl-mini') === 0, `${tag}: four cards, no rails on them at rest`);
    is(await page.evaluate(() => [...document.querySelectorAll('.rl-sq,.rl-acorn')].length === 2 && [...document.querySelectorAll('.rl-sq,.rl-acorn')].every(i => i.naturalWidth > 0)), `${tag}: the squirrel and the acorn are loaded library pictures`);
    await card(page, idOf(r, '2 + 3'), tag); await card(page, idOf(r, '3 + 4'), tag); let s = await st(page);
    is(s.last === 'kind' && s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hKind')), `${tag}: two additions are hKind, not a miss`);
    await card(page, idOf(r, '3 + 4'), tag);   /* drop it */
    await card(page, idOf(r, '2 + 3'), tag); await card(page, idOf(r, '9 − 2'), tag); s = await st(page);
    const holes = await page.evaluate(() => [...document.querySelectorAll('.rl-yard .rl-hole')].length);
    is(s.pending && holes === 12 && sp(await note(page)) === sp(T(loc, 'hClimb')), `${tag}: 2 + 3 with 9 − 2 stands two rails of 5 and 7 holes (${holes}), hClimb`);
    is(await page.evaluate(() => !document.querySelector('[data-k="squirrel"]').disabled), `${tag}: the squirrel is ready`);
    await squirrel(page, tag); s = await st(page);
    const nums = await page.evaluate(() => [...document.querySelectorAll('.rl-num')].map(t => t.textContent).join(','));
    is(s.misses === 1 && !s.pending && sp(await note(page)) === sp(T(loc, 'hMore', { k: 2 })) && await count(page, '.rl-rung') === 5, `${tag}: the squirrel stops after 5 rungs — miss 1, hMore 2`);
    is(await count(page, '.rl-hole.is-extra') === 2 && nums === '1,2', `${tag}: the 2 extra holes glow, numbered 1 2 (${nums})`);
    const rightX = await page.evaluate(() => { const e = [...document.querySelectorAll('.rl-hole.is-extra')].map(c => +c.getAttribute('cx')), all = [...document.querySelectorAll('.rl-yard .rl-hole')].map(c => +c.getAttribute('cx')); return e.every(x => x === Math.max.apply(null, all)); });
    is(rightX, `${tag}: the glowing holes are on the TALLER rail (the subtraction's)`);
    await card(page, idOf(r, '3 + 4'), tag); s = await st(page);
    is(s.selected && s.show === 0 && sp(await note(page)) === '' && await count(page, '.rl-hole.is-extra') === 0, `${tag}: the next card tap clears the help`);
    await card(page, idOf(r, '9 − 4'), tag); await squirrel(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hLook')) && await count(page, '.rl-num') === 0, `${tag}: miss 2 is hLook, no numerals`);
    is(await count(page, '.rl-card .rl-mini') === 4, `${tag}: miss 2 puts a little rail on every card`);
    await page.evaluate(() => { window.RungLadderActivity.FAST = false; });   /* the real 1.3 s hold on the cap, before the ladder folds */
    await pairAndClimb(page, r, '2 + 3', '9 − 4', tag); s = await st(page);
    is(s.climbed === 1 && await count(page, '.rl-cap') === 1 && await count(page, '.rl-acorn.is-got') === 1 && sp(await note(page)) === sp(T(loc, 'okPair', { L: '2 + 3', R: '9 − 4' })), `${tag}: 2 + 3 with 9 − 4 reaches the gold cap and the acorn, okPair`);
    await wait(1500); await page.evaluate(() => { window.RungLadderActivity.FAST = true; });
    is(sp(await note(page)) === sp(T(loc, 'okPair', { L: '2 + 3', R: '9 − 4' })) && await count(page, '.rl-cap') === 0, `${tag}: the ladder folds, the line stays`);
    is(sp(await page.evaluate(() => document.querySelector('[data-k="tag-0"]').textContent)) === '2 + 3 = 9 − 4' && await count(page, '.rl-card.is-used:disabled') === 2, `${tag}: the tag 2 + 3 = 9 − 4 hangs on the rack, both cards locked`);
    await click(page, '[data-k="tag-0"]', tag); s = await st(page);
    is(s.climbed === 0 && await count(page, '.rl-tag') === 0 && await count(page, '.rl-card:disabled') === 0, `${tag}: tapping the tag takes that ladder apart`);
    /* both pairs by the keyboard */
    for (const [a, b] of [['2 + 3', '9 − 4'], ['3 + 4', '9 − 2']]) {
      await page.focus(`[data-k="card-${idOf(r, a)}"]`); await page.keyboard.press('Enter'); await wait(20);
      await page.focus(`[data-k="card-${idOf(r, b)}"]`); await page.keyboard.press('Enter'); await wait(20);
      await page.focus('[data-k="squirrel"]'); await page.keyboard.press('Enter'); await wait(80);
    }
    s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okAll')) && await count(page, '.rl-card:not(:disabled)') === 0, `${tag}: both pairs by Enter → okAll, every card locked`);
    /* ---- Undo it ---- */
    tag = `${loc} undo`; r = C.round('undo', 0);
    await force(page, 'undo', 0);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : '')) === sp(T(loc, 'tLineUndo')), `${tag}: the task line is tLineUndo`);
    await pairAndClimb(page, r, '3 + 5', '8 − 3', tag); s = await st(page);
    const band = await page.evaluate(() => { const e = [...document.querySelectorAll('.rl-hole.is-extra')]; return { n: e.length, xs: new Set(e.map(c => c.getAttribute('cx'))).size }; });
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hColour')) && band.n === 4 && band.xs === 2 && await count(page, '.rl-num') === 0, `${tag}: 3 + 5 with 8 − 3 stops on the seam — hColour, the band ringed on both rails (${band.n}), no numerals`);
    await pairAndClimb(page, r, '3 + 5', '8 − 3', tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hSeam')), `${tag}: again → hSeam`);
    await pairAndClimb(page, r, '3 + 5', '8 − 5', tag); s = await st(page);
    is(s.climbed === 1 && sp(await note(page)) === sp(T(loc, 'okUndo', { L: '3 + 5', R: '8 − 5' })), `${tag}: 3 + 5 with 8 − 5 → okUndo`);
    await wait(60);
    is(sp(await page.evaluate(() => document.querySelector('[data-k="tag-0"]').textContent)) === '3 + 5 = 8 · 8 − 5 = 3', `${tag}: the tag reads 3 + 5 = 8 · 8 − 5 = 3`);
    await pairAndClimb(page, r, '5 + 3', '8 − 3', tag); await wait(60); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okFamily', { a: 3, b: 5, w: 8 })), `${tag}: 5 + 3 with 8 − 3 → okFamily (${await note(page)})`);
    /* ---- On the cards ---- */
    await force(page, 'same', 6, 'cards');
    is(await count(page, '.rl-card .rl-mini') === 6, `${loc}: "On the cards" shows a little rail on every card`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round of both levels at rest, waiting, at miss 2 and solved, 320–1366 ----
     ⭐ The STATE does not depend on the width — only the layout does. So each state is
     reached ONCE per locale by real taps, then the window is resized through every width
     and measured there (the activity repaints on resize and keeps its state). Same
     coverage as replaying the taps at every width, ~9× fewer taps. */
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden]'); };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const ctrls = [...document.querySelectorAll('.rl-card,.rl-squirrel,.rl-tag')].filter(vis);
    out.low = Math.max.apply(null, [...document.querySelectorAll('.rl-card,.rl-squirrel')].filter(vis).map(e => e.getBoundingClientRect().bottom).concat([0]));
    const nr = document.querySelector('.rl-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
    const Y = document.querySelector('.rl-yard').getBoundingClientRect(), W = document.querySelector('.rl-wrap').getBoundingClientRect();
    if (Y.left < W.left - 1 || Y.right > W.right + 1) out.fails.push('the yard outside the card');
    document.querySelectorAll('.rl-sq,.rl-acorn').forEach(i => { const q = i.getBoundingClientRect(); if (!i.complete || !i.naturalWidth) out.fails.push('a picture did not load'); if (q.left < Y.left - 1 || q.right > Y.right + 1 || q.top < Y.top - 1 || q.bottom > Y.bottom + 1) out.fails.push('a picture outside the yard ' + i.className); });
    document.querySelectorAll('.rl-card').forEach(c => { const q = c.getBoundingClientRect(); if (q.right > W.right + 1 || q.left < W.left - 1) out.fails.push('a card outside'); if (c.scrollWidth > c.clientWidth + 1) out.fails.push('a card overflows'); });
    { const sq = document.querySelector('.rl-squirrel'); if (sq) { const a = sq.getBoundingClientRect(); document.querySelectorAll('.rl-hole.is-extra,.rl-num').forEach(h => { const b = h.getBoundingClientRect(); if (a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1) out.fails.push('the squirrel covers the help on the rails'); }); } }
    out.mode = document.querySelector('.rl-wrap').className;
    const sq = document.querySelector('.rl-squirrel'); if (sq) { const q = sq.getBoundingClientRect(); out.sqTop = q.top; out.sqBottom = q.bottom; } else out.sqTop = -1;
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv)) for (const state of ['rest', 'waiting', 'miss2', 'solved']) {
      const r = C.round(lv, idx), w0 = WIDTHS[WIDTHS.length - 1];
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lv, idx);
      const adds = r.cards.filter(c => c.kind === 'add'), wrong = r.cards.find(c => c.kind === 'sub' && c.id !== C.partnerOf(r, adds[0].id)), t0 = `${loc} ${lv}.${idx} ${state}`;
      if (state === 'waiting') { await card(page, adds[0].id, t0); await card(page, wrong.id, t0); }
      if (state === 'miss2') for (let k = 0; k < 2; k++) { await card(page, adds[0].id, t0); await card(page, wrong.id, t0); await squirrel(page, t0); }
      if (state === 'solved') for (const A of adds) { await card(page, A.id, t0); await card(page, C.partnerOf(r, A.id), t0); await squirrel(page, t0); await wait(40); }
      const s0 = await st(page);
      if (state === 'waiting') is(s0.pending, `${t0}: a ladder waits for the squirrel`);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real taps`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${lv}.${idx} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.rl-wrap'), W = Math.floor(e.getBoundingClientRect().width), y = document.querySelector('.rl-yard'); return e.classList.contains(W >= 620 ? 'is-wide' : 'is-narrow') && (W >= 620 || parseFloat(y.style.width) === Math.min(W, 360)); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(30);
        const s1 = await st(page);
        is(s1.done === s0.done && s1.misses === s0.misses && s1.pending === s0.pending && s1.climbed === s0.climbed, `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else if (state === 'waiting') await page.evaluate(() => { window.scrollTo(0, 0); document.querySelector('.rl-yard').scrollIntoView({ block: 'nearest' }); });   /* what _tapCard does on a pair */
        else await page.evaluate(() => document.querySelector('.rl-note').scrollIntoView({ block: 'nearest', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.low <= VH(w), `${tag}: the cards and the squirrel above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
        else if (state === 'waiting') is(m.sqTop >= 0 && m.sqBottom <= VH(w) + 1, `${tag}: after the pair scrolls the yard in, the whole squirrel is on screen (${Math.round(m.sqTop)}–${Math.round(m.sqBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the note in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 6)) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-rung-ladder: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
