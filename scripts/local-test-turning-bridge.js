#!/usr/bin/env node
/* =====================================================================
   local-test-turning-bridge.js — ACTIVITY #126, The Turning Bridge
   (Hazel's Word Bridge, L.1.1.g), in a real browser with real pointer
   actions (planks tapped onto the bridge and back, the turner, the swap
   knob, the car, Check), in all 11 locales.
   Scenarios per locale (at 1024):
     · the settings (four levels; pictures show / words only);
     · level 1: the task line, two signboards, an empty bridge, three
       planks; an empty Check → the empty hint, no miss; a wrong plank →
       the strip reads it, Check → its hint and the car drives its way;
       Check again → the right plank glows; the bridge plank tapped → it
       comes back; the right plank → solved, the success line, a plank on
       the long bridge;
     · level 2: the arrow plank on the wrong face → the face hint; the
       turner → solved; swapping the halves turns the plank and keeps it
       right;
     · level 4: Check unswapped → the swap hint, then the knob glows; the
       swap → solved (and an and-round);
     · "words only" hides the pictures.
   Then every round of every level at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, the hint and the success
   line in view, controls ≥ 44 px, everything inside the card, no text
   cut off, no two bands on top of each other.
   Usage: node scripts/local-test-turning-bridge.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,fr,es,pt,it,nl,sv,da,no,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMGROOT = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '126-turning-bridge', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'turning-bridge-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TurningBridgeCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'turning-bridge-activity.js'), 'utf8') + '\n;this.__A = window.TurningBridgeActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => String(ACT.strings[k][loc]).replace(/\{(\w+)\}/g, (m, x) => a && x in a ? a[x] : m);
const sp = (s) => String(s).replace(/[   ]/g, ' ').replace(/\s+/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 120) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    /* exact-case lookup, like the Linux server: a picture whose case differs is a 404 */
    const file = p.startsWith('/image-library-webp/') ? path.join(IMGROOT, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    if (p.startsWith('/image-library-webp/')) { const d = path.dirname(file); if (!fs.existsSync(d) || !fs.readdirSync(path.dirname(d)).includes(path.basename(d)) || !fs.readdirSync(d).includes(path.basename(file))) { res.statusCode = 404; res.end(); return; } }
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
    await page.goto(`${base}/turning-bridge-activity.html?activity=hazel-word-bridge.joining-words.l-1-1-g&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TurningBridgeActivity && window.TurningBridgeActivity.st && document.querySelector('.tb-wrap'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.TurningBridgeActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, lvl, r, pics) {
    const ok = await page.evaluate((lvl, r, pics) => {
      const a = window.TurningBridgeActivity; a.api.settings.level = lvl; a.api.settings.pics = pics || 'show'; a._pool = null; a._ensurePool();
      a._start(r, 0); a._render2(); window.scrollTo(0, 0); return a.st.lvl === lvl && a.st.r === r;
    }, lvl, r, pics);
    if (!ok) throw new Error('force missed ' + lvl + ' ' + r);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.TurningBridgeActivity.st; return { r: s.r, lvl: s.lvl, gap: s.gap, face: s.face, order: s.order, misses: s.misses, show: s.show, last: s.last, reason: s.reason, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.tb-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  const K = (k) => `[data-k="${k}"]`;
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const check = (page, tag) => click(page, K('check'), tag);
  async function layRight(page, rd, tag) {
    const rp = C.rightPlank(rd), s = await st(page);
    if (s.gap !== rp) await click(page, K('plank-' + rp), tag);
    if (rp === 'arrow') { const s2 = await st(page); if (s2.face !== C.rightFace(rd, s2.order)) await click(page, K('flip'), tag); }
  }
  async function reach(page, rd, state, tag) {
    if (state === 'rest') return true;
    if (rd.kind === 'swap') {
      if (state === 'solved') { await click(page, K('swap'), tag); await check(page, tag); return true; }
      await check(page, tag); await check(page, tag); return true;
    }
    if (state === 'solved') { await layRight(page, rd, tag); await check(page, tag); return true; }
    const rp = C.rightPlank(rd), wrong = rd.rack.find(p => p !== rp);
    await click(page, K('plank-' + wrong), tag); await check(page, tag); await check(page, tag); return true;
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc); let tag, s;
    is(JSON.stringify(await page.evaluate(() => window.TurningBridgeActivity.settings.map(x => x.key + ':' + x.options.map(o => o.value).join('/')))) === JSON.stringify(['level:1/2/3/4', 'pics:show/words']), `${loc}: the settings`);
    /* level 1: an or-round (its tray holds AND) */
    const r1 = C.rounds().find(r => C.round(loc, '1', r).rel === 'or'), rd = C.round(loc, '1', r1);
    tag = `${loc} L1.${r1 + 1}`; await force(page, '1', r1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 't1')), `${tag}: the task line`);
    is(await count(page, '.tb-sign') === 2 && await count(page, '.tb-hole') === 1 && await count(page, '.tb-rack .tb-plank') === 3 && await count(page, '.tb-pic') === [rd.a.p, rd.b.p].filter(Boolean).length, `${tag}: two signboards, an empty bridge, three planks, the pictures`);
    is(sp(await text(page, '.tb-bank.b-l .tb-sign')) === sp(rd.a.f), `${tag}: the first half «${rd.a.f}»`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → the empty hint, no miss`);
    const wrong = rd.rack.find(p => p !== 'or');
    await click(page, K('plank-' + wrong), tag); s = await st(page);
    is(s.gap === wrong && sp(await page.evaluate(() => document.querySelector('.tb-strip').textContent)) === sp(C.sentence(rd, 'ab', wrong, s.face)), `${tag}: ${wrong} on the bridge → the strip reads it`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, { and: 'missAnd', but: 'missBut', or: 'missOr', arrow: 'missArrow' }[wrong])) && await count(page, '.tb-car[class*="dr-"]') === 1, `${tag}: Check → «${sp(await note(page))}», the car drives`);
    await check(page, tag); is(await count(page, '.tb-rack .tb-plank.is-glow') === 1 && await count(page, K('plank-or') + '.is-glow') === 1 && sp(await note(page)) === sp(T(loc, 'missGlow')), `${tag}: miss 2 → the right plank glows`);
    await click(page, K('gap'), tag); s = await st(page); is(s.gap === null && await count(page, '.tb-hole') === 1, `${tag}: the bridge plank tapped → it comes back`);
    await click(page, K('plank-or'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okOr', { s: C.sentence(rd, 'ab', 'or', s.face).replace(/[.!]$/, '').replace(/ \?$/, '?') })) && await count(page, '.tb-seg') === 1, `${tag}: or → solved, the success line, a plank on the long bridge`);
    /* level 2: the face */
    const r2 = 0, x2 = C.round(loc, '2', r2), rf = C.rightFace(x2, 'ab'); tag = `${loc} L2.1`; await force(page, '2', r2);
    await click(page, K('plank-arrow'), tag); s = await st(page); if (s.face === rf) await click(page, K('flip'), tag);
    await check(page, tag); s = await st(page); is(s.misses === 1 && s.reason === 'face' && sp(await note(page)) === sp(T(loc, 'missFace')), `${tag}: the wrong face → the face hint`);
    await click(page, K('flip'), tag); s = await st(page); is(s.face === rf && sp(await text(page, '.tb-plank.on-bridge b')) === sp(C.word(loc, 'arrow', rf)), `${tag}: the turner shows «${C.word(loc, 'arrow', rf)}»`);
    await check(page, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(T(loc, rf === 'because' ? 'okBecause' : 'okSo', { s: C.sentence(x2, 'ab', 'arrow', rf).replace(/[.!]$/, '') })), `${tag}: the right face → solved`);
    await force(page, '2', r2); await layRight(page, x2, tag); await click(page, K('swap'), tag); s = await st(page);
    is(s.order === 'ba' && s.face === C.rightFace(x2, 'ba') && sp(await text(page, '.tb-bank.b-l .tb-sign')) === sp(x2.b.f), `${tag}: the swap → the halves change banks, the plank turns over`);
    await check(page, tag); is((await st(page)).done, `${tag}: the turned sentence is right too`);
    /* level 4 */
    for (const k4 of ['swap-cause', 'swap-and']) {
      const r4 = C.rounds().find(r => C.round(loc, '4', r).k === k4), x4 = C.round(loc, '4', r4); tag = `${loc} L4.${r4 + 1}`; await force(page, '4', r4);
      is(await count(page, '.tb-rack') === 0 && await count(page, '.tb-plank.on-bridge') === 1, `${tag}: the plank already on the bridge, no rack`);
      await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'missSwap')), `${tag}: unswapped → the swap hint`);
      await check(page, tag); is(await count(page, '.tb-swap.is-glow') === 1 && sp(await note(page)) === sp(T(loc, 'missGlowSwap')), `${tag}: miss 2 → the knob glows`);
      await click(page, K('swap'), tag); await check(page, tag); s = await st(page);
      is(s.done && sp(await note(page)) === sp(T(loc, k4 === 'swap-and' ? 'okSwapAnd' : 'okTurn', { s: C.sentence(x4, 'ba', s.gap, s.face).replace(/[.!]$/, '') })), `${tag}: swapped → «${sp(await note(page))}»`);
    }
    await force(page, '1', r1, 'words'); is(await count(page, '.tb-pic') === 0, `${loc}: "words only" hides the pictures`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.tb-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + String(e.className).split(' ')[0] + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.tb-check'); out.cBottom = ck && vis(ck) ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.tb-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.tb-wrap')).getBoundingClientRect();
    document.querySelectorAll('.tb-scene,.tb-strip,.tb-rack,.tb-plank,.tb-check,.tb-flip,.tb-sign').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the card'); });
    document.querySelectorAll('.tb-plank').forEach(p => { const q = p.getBoundingClientRect(), b = p.querySelector('b'); if (!b || !vis(p)) return; const r = b.getBoundingClientRect(); if (r.left < q.left - 1 || r.right > q.right + 1) out.fails.push('a word wider than its plank'); });
    const band = ['.tb-span', '.tb-scene', '.tb-strip', '.tb-rack', '.tb-turnrow', '.tb-foot', '.tb-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect()).sort((a, b) => a.top - b.top);
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.tb-sign,.tb-strip,.tb-note').forEach(c => { if (!vis(c)) return; if (c.scrollWidth > c.clientWidth + 1) out.fails.push(String(c.className).split(' ')[0] + ' text cut off'); });
    const sc = document.querySelector('.tb-scene'); if (sc) { const s = sc.getBoundingClientRect(); document.querySelectorAll('.tb-pic,.tb-car').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.top < s.top - 1 || q.bottom > s.bottom + 1) out.fails.push(String(e.className).split(' ')[0] + ' outside the scene'); }); }
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const lvl of C.levels()) for (const r of C.rounds()) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} L${lvl}.${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, lvl, r);
      const rd = await page.evaluate(() => { const x = window.TurningBridgeActivity.st.rd; return JSON.parse(JSON.stringify(x)); });
      if (!(await reach(page, rd, state, t0))) continue;
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} L${lvl}.${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.TurningBridgeActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow') && a._wrap.classList.contains('is-tiny') === D.tiny; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the width`));
        await wait(40);
        is(JSON.stringify(await st(page)) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.tb-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom > 0 && m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the ${state === 'solved' ? 'success line' : 'hint'} in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && ['en', 'de', 'fi'].indexOf(loc) >= 0 && [360, 704, 1024].indexOf(w) >= 0 && r % 4 === 0) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-L${lvl}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-turning-bridge: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
