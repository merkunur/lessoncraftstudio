#!/usr/bin/env node
/* =====================================================================
   local-test-freezing-floes.js — ACTIVITY #113, The Freezing Floes, in a
   real browser with real pointer and key actions (pictures tapped to
   choose a slot, floes TAPPED into the glowing slot and DRAGGED onto a
   slot, slots tapped to hand a piece back, seats tapped to swap, the
   frozen word tapped/dragged to a picture, Check clicked), in all 11
   locales.
   Scenarios per locale (at 1024):
     · the clue list; Join: an empty Check → hintEmpty, no miss; a picture
       tapped → its slot glows; a floe tapped → into that slot; the slot
       tapped → the piece back; every word built → Check → okJoin, the
       shelf tags; a wrong order → hintCrack, the pieces crack back, the
       right words freeze; miss 2 → hintStart and a frost ring; a drag;
     · Missing: a decoy cracks back, the right piece → okMissing;
     · Mixed: miss → hintCrack; swaps by taps → okMixed;
     · Read: the wrong picture → hintRead, the word drifts back; the right
       picture → okRead.
   Then every clue × round (all sets) at rest, at miss 2 and solved —
   reached ONCE per locale by real actions, then resized through 320…1366:
   no sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, pictures
   ≥ 64 px (≥ 96 from 704), nothing outside the card, no bands overlap,
   every seated piece inside its slot.
   Usage: node scripts/local-test-freezing-floes.js [--widths=…] [--locales=…] [--clues=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,fr,es,it,pt,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const CLUES = arg('clues', 'join,missing,mixed,read').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '113-freezing-floes', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'freezing-floes-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, FreezingFloesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'freezing-floes-activity.js'), 'utf8') + '\n;this.__A = FreezingFloesActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
const low = (s) => String(s).toLowerCase();
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
    await page.goto(`${base}/freezing-floes-activity.html?activity=domino-two-part.two-syllable.rf-1-3-e&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FreezingFloesActivity && window.FreezingFloesActivity.st && document.querySelector('.ff-foot'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.FreezingFloesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, clue, set, r) {
    await page.evaluate((clue, set, r) => { const a = window.FreezingFloesActivity; a.api.settings.clue = clue; a._pool = null; a._ensurePool(); a._set = set; a._pos = [1, 0, 2, 1, 0, 2, 1, 0, 2]; a._orders = null; a._perms = null; a._start(r, 0); a._view.note = ''; a._view.nudge = false; a._render2(); window.scrollTo(0, 0); }, clue, set, r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.FreezingFloesActivity.st; return { clue: s.clue, pics: s.pics.slice(), inlets: s.inlets.map(x => x.map(i => i == null ? '' : s.floes[i].s).join('|')), pond: s.pond.length, active: s.active, at: s.at, misses: s.misses, show: s.show, done: s.done, last: s.last }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ff-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(20); return true;
  }
  const floeOf = (page, s) => page.evaluate((s) => { const a = window.FreezingFloesActivity.st; return a.pond.find(id => a.floes[id].s.toLowerCase() === s.toLowerCase()); }, s);
  const tapFloe = async (page, s, tag) => { const id = await floeOf(page, s); if (id == null) { is(false, `${tag}: a floe ${s}`); return; } await click(page, K('floe-' + id), tag); };
  async function build(page, p, syl, tag) { await click(page, K('pic-' + p), tag); for (const s of syl) await tapFloe(page, s, tag); }
  async function drag(page, fromSel, toSel, tag) {
    const pos = (s) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, s);
    const a = await pos(fromSel); if (!a) { is(false, `${tag}: drag from ${fromSel}`); return; }
    const b = await page.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, toSel);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8); await wait(8); }
    await page.mouse.up(); await wait(40);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const W = (loc, k) => C.word(loc, k);

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.FreezingFloesActivity.settings[0].options.map(o => o.value))) === '["join","missing","mixed","read"]', `${loc}: the clue list`);
    /* Join */
    tag = `${loc} join`; await force(page, 'join', 0, 0);
    is(sp(await prompt(page)) === sp(T(loc, 'tJoin')), `${tag}: the task line`);
    is(await count(page, '.ff-inlet') === 3 && await count(page, '.ff-pic') === 3, `${tag}: three pictures, three slots`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    await click(page, K('pic-1'), tag); s = await st(page); is(s.active === 1 && await count(page, '.ff-col.is-active') === 1, `${tag}: a picture tapped → its slot glows`);
    const sy = s.pics.map(k => W(loc, k).syl);
    await tapFloe(page, sy[1][0], tag); s = await st(page); is(low(s.inlets[1].split('|')[0]) === low(sy[1][0]), `${tag}: a floe tapped → into the glowing slot`);
    await click(page, K('inlet-1'), tag); s = await st(page); is(s.inlets[1] === '||', `${tag}: the slot tapped → the piece back`);
    await build(page, 0, sy[0].slice().reverse(), tag); await build(page, 1, sy[1], tag); await build(page, 2, sy[2], tag);
    const rev = low(sy[0].slice().reverse().join('')) === low(sy[0].join(''));
    await check(page, tag); s = await st(page);
    if (!rev) is(s.last === 'crack' && sp(await note(page)) === sp(T(loc, 'hintCrack')) && s.inlets[0] === '||' && await count(page, '.ff-floe.is-cracked') >= 1 && await count(page, '.ff-seam.is-frozen') >= 1, `${tag}: a wrong order → hintCrack, the pieces crack back, the right words freeze`);
    await build(page, 0, sy[0].slice().reverse(), tag); await check(page, tag); s = await st(page);
    if (!rev) is(sp(await note(page)) === sp(T(loc, 'hintStart')) && await count(page, '.ff-floe.is-frost') === 1, `${tag}: miss 2 → hintStart, a frost ring`);
    await build(page, 0, sy[0], tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okJoin', { list: sy.map(x => x.join('–')).join(', ') })) && await count(page, '.ff-tag') === 3, `${tag}: all built → okJoin, three tags on the shelves`);
    tag = `${loc} join drag`; await force(page, 'join', 0, 1); const p1 = (await st(page)).pics; const id0 = await floeOf(page, W(loc, p1[2]).syl[0]);
    await drag(page, K('floe-' + id0), K('inlet-2'), tag); s = await st(page); is(low(s.inlets[2].split('|')[0]) === low(W(loc, p1[2]).syl[0]), `${tag}: a floe dragged onto a slot`);
    /* Missing */
    tag = `${loc} missing`; await force(page, 'missing', 0, 0);
    const M = C.DATA.missing[loc][0], ms = W(loc, M.key).syl;
    is(sp(await prompt(page)) === sp(T(loc, 'tMissing')) && await count(page, '.ff-seat.is-gap') === 1, `${tag}: the task line, one gap`);
    await tapFloe(page, M.decoys[0], tag); await check(page, tag); s = await st(page);
    is(s.last === 'crack' && s.pond === 3, `${tag}: a decoy cracks back`);
    await tapFloe(page, ms[M.gap], tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okMissing', { parts: ms.join(' + '), word: W(loc, M.key).w })), `${tag}: the right piece → the line`);
    /* Mixed */
    tag = `${loc} mixed`; await force(page, 'mixed', 0, 0);
    const mk = C.DATA.mixed[loc][0], mx = W(loc, mk).syl;
    is(sp(await prompt(page)) === sp(T(loc, 'tMixed')) && await count(page, '.ff-mseat') === mx.length, `${tag}: the task line, the pieces seated`);
    await check(page, tag); s = await st(page); is(s.last === 'crack' && sp(await note(page)) === sp(T(loc, 'hintCrack')), `${tag}: the mixed start → hintCrack`);
    for (let q = 0; q < mx.length; q++) {
      const order = await page.evaluate(() => { const a = window.FreezingFloesActivity.st; return a.inlets[0].map(i => i == null ? null : a.floes[i].s); });
      if (low(order[q]) === low(mx[q])) continue;
      const j = order.findIndex((x, i) => i > q && x != null && low(x) === low(mx[q]));
      await click(page, K('seat-' + q), tag); await click(page, K('seat-' + j), tag);
    }
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okMixed', { parts: mx.join('–'), word: W(loc, mk).w })), `${tag}: swapped into order → the line`);
    /* Read */
    tag = `${loc} read`; await force(page, 'read', 0, 0);
    const RD = C.DATA.read[loc][0];
    is(sp(await prompt(page)) === sp(T(loc, 'tRead')) && await count(page, '.ff-group') === 1, `${tag}: the task line, the frozen word`);
    await click(page, K('inlet-0'), tag); await check(page, tag); s = await st(page);
    is(s.last === 'wrongPic' && s.at === -1 && sp(await note(page)) === sp(T(loc, 'hintRead')) && await count(page, '.ff-inlet.is-wrong') === 1, `${tag}: the wrong picture → hintRead, the word drifts back`);
    await click(page, K('inlet-1'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okRead', { parts: W(loc, RD.key).syl.join('–'), word: W(loc, RD.key).w })), `${tag}: the right picture → the line`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every clue × round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, loc, clue, r, state, tag) {
    if (state === 'rest') return;
    const S0 = await st(page);
    if (clue === 'join') {
      const sy = S0.pics.map(k => W(loc, k).syl);
      if (state === 'solved') { for (let p = 0; p < 3; p++) await build(page, p, sy[p], tag); await check(page, tag); return; }
      await build(page, 0, sy[0].slice(0, 1), tag); for (let p = 1; p < 3; p++) await build(page, p, sy[p], tag); await check(page, tag); await check(page, tag); return;
    }
    if (clue === 'missing') {
      const M = C.DATA.missing[loc][r], s = W(loc, M.key).syl;
      if (state === 'solved') { await tapFloe(page, s[M.gap], tag); await check(page, tag); return; }
      await tapFloe(page, M.decoys[0], tag); await check(page, tag); await tapFloe(page, M.decoys[1], tag); await check(page, tag); return;
    }
    if (clue === 'mixed') {
      if (state === 'miss2') { await check(page, tag); await check(page, tag); return; }
      const mx = W(loc, C.DATA.mixed[loc][r]).syl;
      for (let q = 0; q < mx.length; q++) { const order = await page.evaluate(() => { const a = window.FreezingFloesActivity.st; return a.inlets[0].map(i => i == null ? null : a.floes[i].s); }); if (low(order[q]) === low(mx[q])) continue; const j = order.findIndex((x, i) => i > q && x != null && low(x) === low(mx[q])); await click(page, K('seat-' + q), tag); await click(page, K('seat-' + j), tag); }
      await check(page, tag); return;
    }
    if (state === 'solved') { await click(page, K('inlet-1'), tag); await check(page, tag); return; }
    for (let k = 0; k < 2; k++) { await click(page, K('inlet-0'), tag); await check(page, tag); }
  }
  const MEASURE = () => {
    const out = { fails: [] }, Wd = window.innerWidth;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.ff-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    document.querySelectorAll('.ff-pic img').forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 63.5 || (Wd >= 704 && q.width < 95.5)) out.fails.push('picture ' + Math.round(q.width) + ' px'); });
    const ck = document.querySelector('.ff-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.ff-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.ff-wrap')).getBoundingClientRect();
    document.querySelectorAll('.ff-pic,.ff-inlet,.ff-floe,.ff-group,.ff-check,.ff-shelf,.ff-pond').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.ff-shelves', '.ff-shelf', '.ff-pond', '.ff-foot', '.ff-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.ff-inlet').forEach(s => { const q = s.getBoundingClientRect(); s.querySelectorAll('.ff-seat.is-full,.ff-mseat').forEach(v => { const r = v.getBoundingClientRect(); if (r.left < q.left - 1 || r.right > q.right + 1) out.fails.push('a piece spills out of its slot'); }); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const clue of CLUES) for (let set = 0; set < (clue === 'join' ? C.DATA.join[loc].length : 1); set++) for (const r of C.rounds(loc, clue, set)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${clue} ${set}.${r} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, clue, set, r);
      await reach(page, loc, clue, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses >= 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${clue} ${set}.${r} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.FreezingFloesActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.ff-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && r < 2) await page.screenshot({ path: path.join(SHOT_DIR, `${clue}-${set}-${r}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-freezing-floes: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
