#!/usr/bin/env node
/* =====================================================================
   local-test-ten-band.js — ACTIVITY #94, The Ten-Pocket Band ("Bundle
   Bot", 1.NBT.B.2.a), in a real browser with REAL clicks on the hopper,
   the take-out, the lever, the ✂ snip, the keypad and the slots, plus the
   keyboard (never a model call to make a move). For every locale, To 49:
     · BUILD 34: Check on an empty plate → hintStart, no miss; a pull with
       fewer than ten → the band springs, its empty pockets shown, no ten
       made (keyboard L); 4 tens + 4 → tooManyTens: one extra rod coral,
       the rods labelled 10…40, hintCount; Check again → hintStrong, the
       card split, the loose cubes numbered; one ten snipped (✂) and ten
       taken out → okBuild;
     · BUILD 23 with a ten hiding: 1 ten + 13 loose → ten cubes outlined
       gold, hintHiding; the lever → okBuild;
     · UNBUNDLE 32: ✂ twice → hintHiding (bundle one back, not "snip one");
       a second miss → hintStrong and the card NOT split; the lever → okUnbundle;
     · IMPOSTOR 29: the lever on the near-ten → it springs with ONE empty
       pocket; Check → hintImpostor; built right → okBuild;
     · READ 24: no lever, no ✂; 25 → hintTensByTens, the rods labelled 10;
       ⌫ and 4 → okRead;
     · TENS 37: 3 · 7 typed before bundling → hintHiding; three pulls →
       okRead-style success;
     · the gaps setting "spring": a short pull shows blank pockets.
   And every round of both ranges at rest, at miss 2 and solved — each state
   reached ONCE per locale by real clicks, then the window resized through
   320–1366 and measured at every width: no sideways scroll, every enabled
   control ≥ 44 px, Check above the fold at rest, Check and the hint in view
   after a miss, the success line in view, Bolt a loaded library picture
   (≥ 96 / 64 px), the plate and the rack inside the card.
   Usage: node scripts/local-test-ten-band.js [--widths=…] [--locales=…] [--ranges=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const RANGES = arg('ranges', '49,99').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '094-ten-band', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'ten-band-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TenBandCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'ten-band-activity.js'), 'utf8') + '\n;this.__A = TenBandActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/ten-band-activity.html?activity=bundle-bot.bundle-machine.1-nbt-b-2-a&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TenBandActivity && window.TenBandActivity.st && document.querySelector('.tbd-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.TenBandActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, range, idx, gaps) {
    await page.evaluate((range, idx, gaps) => { const a = window.TenBandActivity; a.api.settings.numbers = range; a.api.settings.gaps = gaps || 'show'; a._pool = null; a._ensurePool(); a._start(idx, 0); a._render2(); window.scrollTo(0, 0); }, range, idx, gaps);
    await page.waitForFunction(() => { const i = [...document.querySelectorAll('.tbd-botpic')]; return i.length === 1 && i.every(x => x.complete && x.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.TenBandActivity.st; return { rack: s.rack, plate: s.plate.length, typed: s.typed, slots: s.slots, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.tbd-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const texts = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].map(e => e.textContent.trim()), sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(15); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  const check = (page, tag) => click(page, K('check'), tag);
  /* build t tens and o loose cubes with the hopper, the lever and the take-out (a ten too many is snipped and taken out) */
  async function buildTo(page, t, o, tag) {
    let s = await st(page), g = 0, h = 0;
    while (s.rack < t && g++ < 40) { while (s.plate < 10 && h++ < 400) { if (!await click(page, K('hopper'), tag)) return; s = await st(page); } await click(page, K('lever'), tag); s = await st(page); }
    while (s.rack > t && g++ < 40) { await click(page, K('snip'), tag); s = await st(page); }
    while (s.plate < o && g++ < 200) { if (!await click(page, K('hopper'), tag)) return; s = await st(page); }
    while (s.plate > o && g++ < 200) { await click(page, K('takeout'), tag); s = await st(page); }
  }
  async function keys(page, str, tag) { for (const d of String(str)) await click(page, K('key-' + d), tag); }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- build 34 ---- */
    let tag = `${loc} build 34`, s;
    await force(page, '49', 1);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'pBuild', { n: 34 })), `${tag}: pBuild`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintStart')), `${tag}: Check on an empty plate → hintStart, no miss`);
    await click(page, K('hopper'), tag); await click(page, K('hopper'), tag); s = await st(page);
    const n0 = s.plate;
    await page.focus('.tbd-wrap'); await page.keyboard.press('l'); await wait(20); s = await st(page);
    is(n0 > 0 && n0 < 10 && s.rack === 0 && s.plate === n0 && await count(page, '.tbd-pocket.is-empty') === 10 - n0 && await count(page, '.tbd-pocket.is-full') === n0, `${tag}: keyboard L with ${n0} cubes → the band springs, ${10 - n0} empty pockets, no ten`);
    await buildTo(page, 4, 4, tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.tbd-rod.is-extra') === 1 && JSON.stringify(await texts(page, '.tbd-rlabel')) === '["10","20","30","40"]' && sp(await note(page)) === sp(T(loc, 'hintCount')), `${tag}: 4 tens + 4 → one extra rod coral, the rods labelled 10–40, hintCount`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && await count(page, '.tbd-card.is-split') === 1 && JSON.stringify((await texts(page, '.tbd-cube i')).map(Number).sort((a, b) => a - b)) === '[1,2,3,4]' && sp(await note(page)) === sp(T(loc, 'hintStrong')), `${tag}: a second miss → hintStrong, the card split, the loose cubes numbered 1–4`);
    await click(page, K('snip'), tag); s = await st(page);
    is(s.rack === 3 && s.plate === 14 && s.show === 0, `${tag}: ✂ → 3 tens + 14 loose, the number unchanged, the showing cleared`);
    await buildTo(page, 3, 4, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild', { t: 3, o: 4, n: 34 })), `${tag}: 3 tens + 4 → okBuild`);
    /* ---- build 23 with a ten hiding ---- */
    tag = `${loc} build 23 hiding`;
    await force(page, '49', 0);
    await buildTo(page, 1, 13, tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.tbd-cube.is-hiding') === 10 && sp(await note(page)) === sp(T(loc, 'hintHiding')), `${tag}: 1 ten + 13 → ten cubes outlined, hintHiding`);
    await click(page, K('lever'), tag); await check(page, tag); s = await st(page);
    is(s.done && s.rack === 2 && s.plate === 3 && sp(await note(page)) === sp(T(loc, 'okBuild', { t: 2, o: 3, n: 23 })), `${tag}: the lever → 2 tens + 3, okBuild`);
    /* ---- unbundle 32 ---- */
    tag = `${loc} unbundle 32`;
    await force(page, '49', 2);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === sp(T(loc, 'pUnbundle', { k: 12, n: 32 })) && await count(page, K('hopper') + ':disabled') === 1 && await count(page, K('takeout')) === 0, `${tag}: pUnbundle, the hopper off, no take-out`);
    await click(page, K('snip'), tag); await click(page, K('snip'), tag); await check(page, tag); s = await st(page);
    is(s.rack === 1 && s.plate === 22 && s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintHiding')), `${tag}: ✂ twice → 1 ten + 22, hintHiding (bundle one back)`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintStrong')) && await count(page, '.tbd-card.is-split') === 0, `${tag}: a second miss → hintStrong, the card NOT split (2 tens + 12 is the goal)`);
    await click(page, K('lever'), tag); await check(page, tag); s = await st(page);
    is(s.done && s.rack === 2 && s.plate === 12 && sp(await note(page)) === sp(T(loc, 'okUnbundle', { n: 32, t: 2, o: 12 })), `${tag}: the lever → 2 tens + 12, okUnbundle`);
    /* ---- impostor 29 ---- */
    tag = `${loc} impostor 29`;
    await force(page, '49', 3);
    await click(page, K('lever'), tag); s = await st(page);
    is(s.rack === 1 && s.plate === 9 && await count(page, '.tbd-pocket.is-empty') === 1, `${tag}: the lever on the near-ten → it springs, ONE empty pocket`);
    await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintImpostor')), `${tag}: Check → hintImpostor`);
    await buildTo(page, 2, 9, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBuild', { t: 2, o: 9, n: 29 })), `${tag}: 2 tens + 9 → okBuild`);
    /* ---- read 24 ---- */
    tag = `${loc} read 24`;
    await force(page, '49', 5);
    is(await count(page, K('lever')) === 0 && await count(page, K('snip')) === 0 && await count(page, K('hopper') + ':disabled') === 1, `${tag}: no lever, no ✂, the hopper off`);
    await keys(page, '25', tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintTensByTens')) && JSON.stringify(await texts(page, '.tbd-rlabel')) === '["10","10"]', `${tag}: 25 → hintTensByTens, each ten labelled 10`);
    await click(page, K('key-del'), tag); await keys(page, '4', tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okRead', { t: 2, o: 4, n: 24 })), `${tag}: 24 → okRead`);
    /* ---- tens 37 ---- */
    tag = `${loc} tens 37`;
    await force(page, '49', 9);
    await click(page, K('slot-t'), tag); await keys(page, '37', tag); await check(page, tag); s = await st(page);
    is(s.slots.t === '3' && s.slots.o === '7' && sp(await note(page)) === sp(T(loc, 'hintHiding')) && await count(page, '.tbd-cube.is-hiding') === 10, `${tag}: 3 · 7 before bundling → hintHiding`);
    for (let k = 0; k < 3; k++) await click(page, K('lever'), tag);
    await check(page, tag); s = await st(page);
    is(s.done && s.rack === 3 && s.plate === 7, `${tag}: three pulls → 3 tens + 7, solved`);
    /* ---- the gaps setting: spring ---- */
    tag = `${loc} gaps spring`;
    await force(page, '49', 1, 'spring');
    await click(page, K('hopper'), tag); s = await st(page);
    await click(page, K('lever'), tag);
    is(await count(page, '.tbd-pocket.is-blank') === 10 - s.plate && await count(page, '.tbd-pocket.is-empty') === 0, `${tag}: a short pull shows blank pockets, never empty ones`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    if (state === 'solved') {
      if (r.type === 'unbundle') await click(page, K('snip'), tag);
      else if (r.type === 'read') await keys(page, r.n, tag);
      else if (r.type === 'tens') { let s = await st(page); while (s.plate >= 10) { await click(page, K('lever'), tag); s = await st(page); } await click(page, K('slot-t'), tag); await keys(page, '' + r.t + r.o, tag); }
      else await buildTo(page, r.t, r.o, tag);
      await check(page, tag); return;
    }
    if (r.type === 'read') await keys(page, r.n + 1, tag);
    else if (r.type === 'tens') { await click(page, K('slot-t'), tag); await keys(page, '' + r.o + (r.t === r.o ? r.t + 1 : r.t), tag); }
    else if (r.type !== 'unbundle' && r.type !== 'impostor') await buildTo(page, r.t, r.o === 9 ? 8 : r.o + 1, tag);
    await check(page, tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.tbd-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 43.5 || r.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
    const ck = document.querySelector('.tbd-check'); out.cTop = ck ? ck.getBoundingClientRect().top : 0; out.cBottom = ck ? ck.getBoundingClientRect().bottom : 0;
    const nr = document.querySelector('.tbd-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.tbd-wrap').getBoundingClientRect(), wide = W.width >= 560;
    document.querySelectorAll('.tbd-plate,.tbd-rack,.tbd-top,.tbd-controls').forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push(e.className + ' outside the card'); });
    [...document.querySelectorAll('.tbd-botpic')].forEach(p => { if (!p.complete || !p.naturalWidth) out.fails.push('Bolt did not load'); else if (p.getBoundingClientRect().width < (wide ? 96 : 64) - 1) out.fails.push('Bolt is small ' + Math.round(p.getBoundingClientRect().width)); });
    if (!document.querySelector('.tbd-botpic')) out.fails.push('no Bolt picture');
    const plate = document.querySelector('.tbd-plate').getBoundingClientRect();
    document.querySelectorAll('.tbd-cube').forEach(c => { const q = c.getBoundingClientRect(); if (q.left < plate.left - 1 || q.right > plate.right + 1 || q.top < plate.top - 1 || q.bottom > plate.bottom + 1) out.fails.push('a cube outside the plate'); });
    const rack = document.querySelector('.tbd-rack').getBoundingClientRect();
    document.querySelectorAll('.tbd-rod,.tbd-rodslot').forEach(c => { const q = c.getBoundingClientRect(); if (q.right > rack.right + 1 || q.bottom > rack.bottom + 1) out.fails.push('a rod outside the rack'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const rg of RANGES) for (const idx of C.ids(rg)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(rg, idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${rg}.${idx} ${r.type} ${r.n} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, rg, idx);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'miss2' && r.type === 'tens') is(await count(page, '.tbd-cube i') === 0 && await count(page, '.tbd-cube.is-hiding') === 10, `${t0}: no cube numbered 1..n (the last number would be the answer); the first ten outlined instead`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${rg}.${idx} ${r.type} ${r.n} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.tbd-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 330); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.tbd-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && idx <= 9) await page.screenshot({ path: path.join(SHOT_DIR, `${rg}-${idx}-${r.type}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-ten-band: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
