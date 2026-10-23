#!/usr/bin/env node
/* =====================================================================
   local-test-sunken-stones.js — ACTIVITY #86, The Sunken Stones ("Lily's
   Ten Stones", 1.OA.C.6), in a real browser with REAL slingshot drags,
   REAL taps on stones and the keyboard (never a model call to make a move).
   For every locale:
     · 8 + 6: the tick before the rope is empty is a hint, the digits sleep;
       a real pull of 6 splashes (the stone is under water) — no miss, Lily
       still on 8; a pull of 2 lands on the Ten Stone and the far stones rise;
       a tap on 14 lands; the strip reads 8 + 2 = 10 · 10 + 4 = ?; 15 is miss
       1 (hOn, 11 12 13 counted, Lily's stone not numbered); 13 is miss 2
       (hTenOn 4, the leaps as arcs); 14 succeeds with the chain;
     · 13 − 4: ↑↑↑ + Enter on Lily leaps 3 to the Ten Stone; the round arrow
       takes it back (Lily on 13, 4 beads);
     · 3 + 8 (choose a start): hPick; a tap on 8 starts there; 10, 11; 11
       succeeds with "starting on 8 was the short way";
     · bank 5 + ? = 20: a tap on 20 is too far for one leap (nFar); 10,
       then 20; 15 succeeds;
     · Every stone labels all 21 stones.
   And every round of both levels at rest, finished, at miss 2 and solved at
   320–1366: every control above the fold at rest, the keys in view after a
   miss, the success line in view, no sideways scroll, every control ≥ 44 px,
   Lily (a loaded library frog) inside the pond, every stone inside it.
   Usage: node scripts/local-test-sunken-stones.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '086-sunken-stones', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'sunken-stones-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, SunkenStonesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'sunken-stones-activity.js'), 'utf8') + '\n;this.__A = SunkenStonesActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/sunken-stones-activity.html?activity=ten-stones.add-sub-within-20.1-oa-c-6&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SunkenStonesActivity && window.SunkenStonesActivity.st && document.querySelector('.sk-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.SunkenStonesActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.waitForFunction(() => !!document.querySelector('.sk-frog'), { timeout: 8000 }).catch(() => {});
    return { page, errs };
  }
  async function force(page, level, idx, labels) {
    await page.evaluate((level, idx, labels) => { const a = window.SunkenStonesActivity; a.api.settings.facts = level; a.api.settings.labels = labels || 'five'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); window.scrollTo(0, 0); }, level, idx, labels);
    await page.waitForFunction(() => { const i = document.querySelector('.sk-frog'); return !i || (i.complete && i.naturalWidth > 0); }, { timeout: 8000 }).catch(() => {});
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const s = window.SunkenStonesActivity.st; return { done: s.done, misses: s.misses, last: s.last && s.last.reason, lily: s.lily, rope: s.rope, leaps: s.leaps.join(','), ten: s.tenVisited, typed: s.typed }; });
  const note = (page) => page.evaluate(() => document.querySelector('.sk-note').textContent);
  const eq = (page) => page.evaluate(() => document.querySelector('.sk-eq').textContent.replace(/[  ]/g, ' '));
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  /* a real tap on stone n of the pond */
  async function tapStone(page, n, tag) {
    await page.evaluate(() => document.querySelector('.sk-pond').scrollIntoView({ block: 'center', behavior: 'instant' }));
    const pt = await page.evaluate((n) => { const a = window.SunkenStonesActivity, G = a._G, p = document.querySelector('.sk-pond').getBoundingClientRect(); if (!G || n < G.lo || n > G.hi) return null; return { x: p.left + G.x(n), y: p.top + G.sy }; }, n);
    if (!pt) { is(false, `${tag}: stone ${n} is in view`); return; }
    await page.mouse.click(pt.x, pt.y); await wait(30);
  }
  /* a real slingshot pull: n beads, away from the leap */
  async function pull(page, n, tag) {
    await page.evaluate(() => document.querySelector('.sk-pond').scrollIntoView({ block: 'center', behavior: 'instant' }));
    const d = await page.evaluate(() => { const a = window.SunkenStonesActivity, L = document.querySelector('[data-k="lily"]').getBoundingClientRect(); return { x: L.left + L.width / 2, y: L.top + L.height / 2, bead: a._G.bead, dir: a.st.r.dir }; });
    await page.mouse.move(d.x, d.y); await page.mouse.down();
    for (let k = 1; k <= 10; k++) await page.mouse.move(d.x - d.dir * n * d.bead * k / 10, d.y);
    await page.mouse.up(); await wait(40);
  }
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const typeKeys = async (page, s, tag) => { for (const d of s) await click(page, `[data-k="key-${d}"]`, tag); };
  const tick = (page, tag) => click(page, '[data-k="key-ok"]', tag);
  const clear = async (page, tag) => { let s = await st(page); while (s.typed) { await click(page, '[data-k="key-del"]', tag); s = await st(page); } };
  /* walk the forced path by taps */
  async function walk(page, r, start, tag) { let p = start; for (const n of C.forcedSplit(r, start)) { p += r.dir * n; await tapStone(page, p, tag); } }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- 8 + 6 ---- */
    let tag = `${loc} 8+6`;
    await force(page, 'both', 0);
    is(await count(page, '.sk-frog') === 1 && await page.evaluate(() => document.querySelector('.sk-frog').naturalWidth > 0), `${tag}: Lily is the library frog`);
    is(await count(page, '.sk-frog.is-right') === 1, `${tag}: she faces right for adding`);
    is(await count(page, '.sk-stone.is-sunk') === 10, `${tag}: the ten stones past 10 are under water`);
    await tick(page, tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hRope')) && await count(page, '[data-k="key-5"]:disabled') === 1, `${tag}: the tick before the rope is empty is a hint, the digits sleep`);
    await pull(page, 6, tag); s = await st(page);
    is(s.last === 'splash' && s.lily === 8 && s.misses === 0 && sp(await note(page)) === sp(T(loc, 'nSplash')), `${tag}: a pull of 6 splashes, Lily stays on 8, no miss`);
    await pull(page, 2, tag); s = await st(page);
    is(s.lily === 10 && s.ten && s.rope === 4 && await count(page, '.sk-stone.is-sunk') === 0 && sp(await note(page)) === sp(T(loc, 'nTen')), `${tag}: a pull of 2 lands on the Ten Stone, the far stones rise`);
    await tapStone(page, 14, tag); s = await st(page);
    is(s.lily === 14 && s.rope === 0 && (await eq(page)).indexOf('8 + 2 = 10') === 0 && (await eq(page)).indexOf('10 + 4 =') > 0, `${tag}: a tap on 14 lands; the strip shows the leaps (${await eq(page)})`);
    await typeKeys(page, '15', tag); await tick(page, tag); s = await st(page);
    const ghosts = await page.evaluate(() => [...document.querySelectorAll('.sk-ghost')].map(t => t.textContent).join(','));
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hOn')) && ghosts === '11,12,13', `${tag}: miss 1 counts 11, 12, 13 and stops before Lily (${ghosts})`);
    await clear(page, tag); await typeKeys(page, '13', tag); await tick(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hTenOn', { r: 4 })) && await count(page, '.sk-arc') === 2, `${tag}: miss 2 shows the leaps as arcs, hTenOn 4`);
    await clear(page, tag); await typeKeys(page, '14', tag); await tick(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okAdd', { a: 8, p: 2, r: 4, s: 14, b: 6 })), `${tag}: 14 succeeds with the chain (${await note(page)})`);
    /* ---- 13 − 4: the keyboard, the undo ---- */
    tag = `${loc} 13−4`;
    await force(page, 'both', 7);
    is(await count(page, '.sk-frog.is-right') === 0, `${tag}: she faces left for taking away`);
    await page.focus('[data-k="lily"]'); for (let k = 0; k < 3; k++) await page.keyboard.press('ArrowUp'); await page.keyboard.press('Enter'); await wait(30); s = await st(page);
    is(s.lily === 10 && s.rope === 1, `${tag}: ↑↑↑ + Enter leaps 3 to the Ten Stone`);
    await click(page, '[data-k="undo"]', tag); s = await st(page);
    is(s.lily === 13 && s.rope === 4 && !s.ten, `${tag}: the round arrow takes the leap back`);
    /* ---- 3 + 8: choose the start ---- */
    tag = `${loc} 3+8`;
    await force(page, 'both', 4);
    is(sp(await note(page)) === sp(T(loc, 'hPick')) && await count(page, '.sk-stone.is-pick') === 2, `${tag}: two shining starts, hPick`);
    await tapStone(page, 8, tag); s = await st(page);
    is(s.lily === 8 && s.rope === 3, `${tag}: a tap on 8 starts there with a rope of 3`);
    await tapStone(page, 10, tag); await tapStone(page, 11, tag); await typeKeys(page, '11', tag); await tick(page, tag); s = await st(page);
    is(s.done && sp(await note(page)).indexOf(sp(T(loc, 'okShort', { big: 8 }))) > 0, `${tag}: 11 succeeds — starting on 8 was the short way`);
    /* ---- bank 5 + ? = 20 ---- */
    tag = `${loc} bank 5`;
    await force(page, 'both', 15);
    await tapStone(page, 20, tag); s = await st(page);
    is(s.last === 'rope' && s.lily === 5 && sp(await note(page)) === sp(T(loc, 'nFar')), `${tag}: 15 in one leap is too far for Lily (nFar)`);
    await tapStone(page, 10, tag); await tapStone(page, 20, tag); s = await st(page);
    is(s.lily === 20 && sp(await note(page)) === sp(T(loc, 'hTypeBank')), `${tag}: 10, then the bank`);
    await typeKeys(page, '15', tag); await tick(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBank', { k: 5, n: 15 })), `${tag}: 15 succeeds`);
    /* ---- every stone labelled ---- */
    await force(page, 'both', 0, 'all');
    is(await count(page, '.sk-lab') === 21, `${loc}: Every stone labels all 21`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round of both levels at rest, finished, at miss 2 and solved, 320–1366 ---- */
  for (const loc of LOCS) for (const w of WIDTHS) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.LEVELS) for (const idx of C.ids(lv)) for (const state of ['rest', 'finished', 'miss2', 'solved']) {
      const tag = `${loc} @${w} ${lv}.${idx} ${state}`, r = C.round(lv, idx);
      await force(page, lv, idx);
      if (state !== 'rest') {
        const start = r.kind === 'anchor' ? Math.max(r.a, r.b) : r.a;
        if (r.kind === 'anchor') await tapStone(page, start, tag);
        await walk(page, r, start, tag);
        if (!(await page.evaluate(() => window.SunkenStonesCore.finished(window.SunkenStonesActivity.st)))) is(false, `${tag}: finished by real taps`);
        if (state === 'miss2') { await typeKeys(page, String(r.answer + 1), tag); await tick(page, tag); await clear(page, tag); await typeKeys(page, String(r.answer === 1 ? 2 : r.answer - 1), tag); await tick(page, tag); await page.evaluate(() => document.querySelector('.sk-keys').scrollIntoView({ block: 'nearest', behavior: 'instant' })); }
        if (state === 'solved') { await typeKeys(page, String(r.answer), tag); await tick(page, tag); await page.evaluate(() => document.querySelector('.sk-note').scrollIntoView({ block: 'nearest', behavior: 'instant' })); }
        if (state === 'finished') await page.evaluate(() => window.scrollTo(0, 0));
      }
      await wait(20);
      const m = await page.evaluate(() => {
        const out = { fails: [] };
        const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden]'); };
        out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        const ctrls = [...document.querySelectorAll('.sk-lily,.sk-key,.sk-tbtn')].filter(vis);
        out.low = Math.max.apply(null, ctrls.map(e => e.getBoundingClientRect().bottom));
        const kr = document.querySelector('.sk-keys').getBoundingClientRect(); out.kTop = kr.top; out.kBottom = kr.bottom;
        const nr = document.querySelector('.sk-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
        ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
        const P = document.querySelector('.sk-pond').getBoundingClientRect(), L = document.querySelector('.sk-lily').getBoundingClientRect(), F = document.querySelector('.sk-frog');
        if (L.left < P.left - 1 || L.right > P.right + 1) out.fails.push('Lily outside the pond');
        if (!F || !F.complete || !F.naturalWidth) out.fails.push('the frog picture did not load');
        document.querySelectorAll('.sk-stone').forEach(c => { const q = c.getBoundingClientRect(); if (q.left < P.left - 1 || q.right > P.right + 1) out.fails.push('a stone outside the pond'); });
        return out;
      });
      is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
      if (state === 'rest' || state === 'finished') is(m.low <= VH(w), `${tag}: every control above the fold (${Math.round(m.low)} ≤ ${VH(w)})`);
      else if (state === 'miss2') is(m.kTop >= 0 && m.kBottom <= VH(w) + 1, `${tag}: the keys in view after a miss (${Math.round(m.kTop)}–${Math.round(m.kBottom)})`);
      else { is((await st(page)).done, `${tag}: solved`); is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view (${Math.round(m.nTop)}–${Math.round(m.nBottom)})`); }
      is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
      if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 4)) await page.screenshot({ path: path.join(SHOT_DIR, `${lv}-${idx}-${w}-${state}.png`), fullPage: true });
    }
    is(errs.length === 0, `${loc} @${w}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-sunken-stones: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
