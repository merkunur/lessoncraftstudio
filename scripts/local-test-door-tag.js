#!/usr/bin/env node
/* =====================================================================
   local-test-door-tag.js — ACTIVITY #93, The Stretching Door Tag ("Bo's
   Berry Pantry — Tens and Ones the Smart Way", 1.NBT.B.2), in a real
   browser with REAL taps, a REAL sling pull and the keyboard (never a
   model call to make a move). For every locale, To 99:
     · STOCK 34: Check on an empty shelf → hintEmpty, no miss; a crate
       loaded and the sling PULLED back and let go → one crate on the deck;
       the quick path (tap the pile again) for 3 more crates and 3 berries
       → 4 crates + 3 berries: the tag stretches to 30 + 4, the crate count
       40 is coral, an extra crate glows, hintReverse; the last crate tapped
       back, one berry slung → okBuild "3 crates and 4 berries: 30 + 4 = 34";
     · STOCK 28 in number words: the card is number-words.js; keyboard C
       once, B eighteen times (nine in the bowl, nine on the lip) → a right
       total with a spill: Bo packs ten into a crate → okPack;
     · LABEL 25: wheels 5 · 2 → hintReverse, both wheels coral and NO counts
       (a given shelf's counts are the answer); a second miss shows 20 | 5;
       2 · 5 → okBuild;
     · STRETCH 63: plaques 6 + 3 → hintFace ("the 6 in 63 means 60"); the 6
       taken off its hook, 60 hung → okBuild;
     · OVERFLOW 23: wheels 1 · 3 → hintOverflow; 2 · 3 → okPack, packed.
   And every round of both ranges at rest, at miss 2 and solved — each state
   reached ONCE per locale by real taps, then the window resized through
   320–1366 and measured at every width: no sideways scroll, every control
   ≥ 44 px (a take-back crate or dimple by its hit area), Check above the
   fold at rest, Check and the hint in view after a miss, the success line
   in view, Bo and the berry loaded library pictures (≥ 96 / 64 px when
   shown), the tag's parts over the deck and the bowl they count.
   Usage: node scripts/local-test-door-tag.js [--widths=…] [--locales=…] [--ranges=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const RANGES = arg('ranges', '99,50').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '093-door-tag', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'door-tag-core.js'));
const NW = require(path.join(__dirname, 'worksheet-gen', 'lib', 'number-words.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, DoorTagCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'door-tag-activity.js'), 'utf8') + '\n;this.__A = DoorTagActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/door-tag-activity.html?activity=bos-berry-pantry.slingshot-tens.1-nbt-b-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.DoorTagActivity && window.DoorTagActivity.st && document.querySelector('.sdt-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.DoorTagActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, range, idx, card) {
    await page.evaluate((range, idx, card) => { const a = window.DoorTagActivity; a.api.settings.numbers = range; a.api.settings.card = card || 'num'; a._pool = null; a._ensurePool(); a._start(idx, 0); a._render2(); window.scrollTo(0, 0); }, range, idx, card);
    await page.waitForFunction(() => { const i = [...document.querySelectorAll('.sdt-bopic,.sdt-basketpic')]; return i.length >= 1 && i.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.DoorTagActivity.st; return { shelf: s.shelf, wheels: s.wheels, hooks: s.hooks, misses: s.misses, show: s.show, done: s.done, packed: s.packed }; });
  const note = (page) => page.evaluate(() => document.querySelector('.sdt-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(20); return true;
  }
  /* sling n pieces of a kind by the quick path: tap the pile to load, tap it again for each flight */
  async function sling(page, kind, n, tag) { if (!n) return; const sel = kind === 'crate' ? '[data-k="crates"]' : '[data-k="basket"]'; const loaded = await page.evaluate(() => window.DoorTagActivity._ammo); if (loaded !== kind) await click(page, sel, tag); for (let k = 0; k < n; k++) await click(page, sel, tag); }
  const check = (page, tag) => click(page, '[data-k="check"]', tag);
  const wheel = async (page, w, target, tag) => { const cur = (await st(page)).wheels[w]; const d = target - cur; for (let k = 0; k < Math.abs(d); k++) await click(page, `[data-k="${w}-${d > 0 ? 'up' : 'down'}"]`, tag); };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- stock 34 ---- */
    let tag = `${loc} stock 34`;
    await force(page, '99', 0);
    is(sp(await text(page, '.lcs-activity-prompt-text')) === sp(T(loc, 'pStock', { n: 34 })) && sp(await text(page, '.sdt-tag')) === '304' && await count(page, '.sdt-crate.is-place') === 9, `${tag}: pStock, the tag 34 (its 0 hidden), nine empty crate places`);
    await check(page, tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: Check on an empty shelf → hintEmpty, no miss`);
    await click(page, '[data-k="crates"]', tag);
    { const p = await centre(page, '[data-k="pouch"]'); await page.mouse.move(p.x, p.y); await page.mouse.down(); for (let k = 1; k <= 6; k++) { await page.mouse.move(p.x - 5 * k, p.y + 5 * k); await wait(10); } await page.mouse.up(); await wait(40); }
    s = await st(page);
    is(s.shelf.deck === 1, `${tag}: the sling PULLED back and let go → a crate on the deck`);
    await sling(page, 'crate', 3, tag); await sling(page, 'berry', 3, tag); s = await st(page);
    is(s.shelf.deck === 4 && s.shelf.bowl === 3, `${tag}: the quick path → 4 crates + 3 berries`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.sdt-tag.is-stretched') === 1 && sp(await text(page, '.sdt-count.is-tens')) === '40' && await count(page, '.sdt-count.is-tens.is-off') === 1 && await count(page, '.sdt-crate.is-extra') === 1 && sp(await note(page)) === sp(T(loc, 'hintReverse')), `${tag}: the tag stretches, the crates count 40 under the 30 (coral), one extra crate, hintReverse`);
    await click(page, '[data-k="crate-last"]', tag); s = await st(page);
    is(s.shelf.deck === 3 && s.show === 0 && await count(page, '.sdt-tag.is-stretched') === 0, `${tag}: the last crate tapped back, the showing clears`);
    await sling(page, 'berry', 1, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild', { t: 3, o: 4, t0: 30, n: 34 })) && await count(page, '.sdt-count.is-ok') === 2, `${tag}: 3 crates + 4 berries → okBuild, both counts land`);
    /* ---- stock 28 in words, a spill packed ---- */
    tag = `${loc} stock 28 words`;
    await force(page, '99', 4, 'words');
    is(sp(await text(page, '.sdt-card')) === sp(NW.numberWord(28, loc)) && await count(page, '.sdt-tag.is-blank') === 1 && sp(await text(page, '.lcs-activity-prompt-text')) === sp(T(loc, 'pStockWords')), `${tag}: the card says "${NW.numberWord(28, loc)}" (number-words.js)`);
    await page.focus('.sdt-wrap'); await page.keyboard.press('c'); for (let k = 0; k < 18; k++) await page.keyboard.press('b'); await wait(20); s = await st(page);
    is(s.shelf.deck === 1 && s.shelf.bowl === 9 && s.shelf.lip === 9, `${tag}: keyboard C + B×18 → 1 crate, a full bowl, 9 spilled`);
    await check(page, tag); s = await st(page);
    is(s.done && s.packed && s.shelf.deck === 2 && s.shelf.bowl + s.shelf.lip === 8 && sp(await note(page)) === sp(T(loc, 'okPack', { n: 28 })), `${tag}: a right total with a spill → Bo packs ten into a crate (okPack)`);
    /* ---- label 25 ---- */
    tag = `${loc} label 25`;
    await force(page, '99', 2);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintWheels')) && (await st(page)).misses === 0, `${tag}: wheels 0 · 0 → hintWheels`);
    await wheel(page, 't', 5, tag); await wheel(page, 'o', 2, tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintReverse')) && await count(page, '.sdt-count') === 0 && await count(page, '.sdt-wheel.is-off') === 2, `${tag}: 5 · 2 → hintReverse, both wheels coral, NO counts (the given shelf's counts would be the answer)`);
    await wheel(page, 'o', 3, tag); await check(page, tag);
    is(sp(await text(page, '.sdt-count.is-tens')) === '20' && sp(await text(page, '.sdt-count.is-ones')) === '5', `${tag}: the second miss shows the counts 20 and 5`);
    await wheel(page, 't', 2, tag); await wheel(page, 'o', 5, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild', { t: 2, o: 5, t0: 20, n: 25 })), `${tag}: 2 · 5 → okBuild`);
    /* ---- stretch 63 ---- */
    tag = `${loc} stretch 63`;
    await force(page, '99', 3);
    is(await count(page, '.sdt-plaque') === 4 && sp(await text(page, '.lcs-activity-prompt-text')) === sp(T(loc, 'pStretch')), `${tag}: four plaques, pStretch`);
    await click(page, '[data-k="plaque-6"]', tag); await click(page, '[data-k="hook-left"]', tag); await click(page, '[data-k="plaque-3"]', tag); await click(page, '[data-k="hook-right"]', tag);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintFace', { t: 6, n: 63, t0: 60 })) && await count(page, '.sdt-hook.is-left.is-wrong') === 1, `${tag}: 6 + 3 → hintFace "the 6 in 63 means 60"`);
    await click(page, '[data-k="hook-left"]', tag); await click(page, '[data-k="plaque-60"]', tag); await click(page, '[data-k="hook-left"]', tag); s = await st(page);
    is(s.hooks.left === 60 && s.hooks.right === 3, `${tag}: the 6 taken off, 60 hung`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild', { t: 6, o: 3, t0: 60, n: 63 })), `${tag}: 60 + 3 → okBuild`);
    /* ---- overflow 23 ---- */
    tag = `${loc} overflow 23`;
    await force(page, '99', 5);
    is(await count(page, '.sdt-spill') === 4 && await count(page, '.sdt-dimple .sdt-bead') === 9, `${tag}: a full bowl and 4 spilled`);
    await wheel(page, 't', 1, tag); await wheel(page, 'o', 3, tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintOverflow')), `${tag}: 1 · 3 → hintOverflow`);
    await wheel(page, 't', 2, tag); await check(page, tag); s = await st(page);
    is(s.done && s.packed && s.shelf.deck === 2 && s.shelf.lip === 0 && sp(await note(page)) === sp(T(loc, 'okPack', { n: 23 })), `${tag}: 2 · 3 → Bo packs ten into a crate (okPack)`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real taps, then resized ---- */
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    if (r.type === 'stock') {
      if (state === 'solved') { await sling(page, 'crate', r.t, tag); await sling(page, 'berry', r.o, tag); await check(page, tag); return; }
      await sling(page, 'crate', r.t, tag); await sling(page, 'berry', r.o + 1, tag); await check(page, tag); await sling(page, 'berry', 1, tag); await check(page, tag); return;
    }
    if (r.type === 'stretch') {
      const hangP = async (h, v) => { await click(page, `[data-k="plaque-${v}"]`, tag); await click(page, `[data-k="hook-${h}"]`, tag); };
      if (state === 'solved') { await hangP('left', 10 * r.t); await hangP('right', r.o); await check(page, tag); return; }
      await hangP('left', r.t); await hangP('right', r.o); await check(page, tag);
      await click(page, '[data-k="hook-left"]', tag); await click(page, `[data-k="plaque-${10 * r.o}"]`, tag); await click(page, '[data-k="hook-left"]', tag); await check(page, tag); return;
    }
    if (state === 'solved') { await wheel(page, 't', r.t, tag); await wheel(page, 'o', r.o, tag); await check(page, tag); return; }
    await wheel(page, 't', r.t === 1 ? 2 : r.t - 1, tag); await wheel(page, 'o', r.o, tag); await check(page, tag); await wheel(page, 'o', r.o === 9 ? 8 : r.o + 1, tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.sdt-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const h = e.querySelector('.sdt-hit'), r = (h || e).getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
    const ck = document.querySelector('.sdt-check'); out.cTop = ck ? ck.getBoundingClientRect().top : 0; out.cBottom = ck ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.sdt-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.sdt-wrap').getBoundingClientRect(), wide = W.width >= 560;
    document.querySelectorAll('.sdt-pantry,.sdt-yard,.sdt-rack').forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push(e.className + ' outside the card'); });
    [...document.querySelectorAll('.sdt-bopic,.sdt-basketpic')].forEach(p => { if (!p.complete || !p.naturalWidth) out.fails.push('a picture did not load'); else if (p.getBoundingClientRect().width < (wide ? 96 : 64) - 1) out.fails.push('a picture is small ' + Math.round(p.getBoundingClientRect().width)); });
    const deck = document.querySelector('.sdt-deck').getBoundingClientRect(), bowl = document.querySelector('.sdt-bowl').getBoundingClientRect();
    if (deck.right > bowl.left + 1) out.fails.push('the deck runs into the bowl');
    const tens = document.querySelector('.sdt-tag.is-stretched .is-tens'), ones = document.querySelector('.sdt-tag.is-stretched .is-ones');
    if (tens && ones) { const t = tens.getBoundingClientRect(), o = ones.getBoundingClientRect(); if (Math.abs((t.left + t.right) / 2 - (deck.left + deck.right) / 2) > 16 || Math.abs((o.left + o.right) / 2 - (bowl.left + bowl.right) / 2) > 16) out.fails.push('the tag parts are not over the deck and the bowl'); }
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const rg of RANGES) for (const idx of C.ids(rg)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(rg, idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${rg}.${idx} ${r.type} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, rg, idx);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real taps (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real taps`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${rg}.${idx} ${r.type} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.sdt-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 330); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.sdt-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && rg === '99' && [360, 704, 1024].indexOf(w) >= 0 && idx <= 5) await page.screenshot({ path: path.join(SHOT_DIR, `${idx}-${r.type}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-door-tag: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
