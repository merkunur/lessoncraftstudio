#!/usr/bin/env node
/* =====================================================================
   local-test-plank-path.js — ACTIVITY #90, The Plank Path ("Find the
   Missing Number", 1.OA.D.8), in a real browser with REAL clicks on the
   signposts and the planks, and the keyboard (never a model call to make
   a move). For every locale, Within 10, path 1 (? + 4 = 9 · 8 − ? = 5 ·
   3 + 4 = ? · ? − 6 = 2, decoy 4):
     · the first gap is chosen; plank 4 is too short — it falls in, one
       open square outlined (hShort); plank 7 is too long — the overhang
       glows (hLong); that second miss numbers the 5 squares (hCount);
     · plank 5 fits ("5 + 4 = 9", okFit), the ? fills, gap 2 is chosen; a
       tap on the full signpost lifts the plank out, and it fits again;
     · 3, 7, 8 → done: okAll "5, 3, 7 and 8", the walker crosses, the flag
       goes up, the decoy floats away;
     · keyboard: ↓ chooses the next open gap, Backspace lifts the last plank;
     · "Numbers only": every gap misted, no squares; a plank laid in gap 1
       lifts the mist there only.
   And every path of both levels at rest, at miss 2 and solved — each state
   reached ONCE per locale by real clicks, then the window resized through
   320–1366 and measured at every width: no sideways scroll, every control
   ≥ 44 px, the tray above the fold at rest, the hint and the tray in view
   after a miss, the success line in view, the walker a loaded library
   picture, every signpost's equation inside its board, nothing outside.
   Usage: node scripts/local-test-plank-path.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '090-plank-path', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'plank-path-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PlankPathCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'plank-path-activity.js'), 'utf8') + '\n;this.__A = PlankPathActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/plank-path-activity.html?activity=match-pairs.find-the-missing-number.1-oa-d-8&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PlankPathActivity && window.PlankPathActivity.st && document.querySelector('.pp-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.PlankPathActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, mode) {
    await page.evaluate((level, idx, mode) => { const a = window.PlankPathActivity; a.api.settings.numbers = level; a.api.settings.path = mode || 'squares'; a._pool = null; a._ensurePool(); a._start(idx, 0); a._render2(); window.scrollTo(0, 0); }, level, idx, mode);
    await page.waitForFunction(() => { const i = document.querySelector('.pp-walker'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.PlankPathActivity.st; return { laid: s.laid.slice(), misses: s.misses.slice(), selected: s.selected, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.pp-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled, hid: getComputedStyle(e).visibility === 'hidden' }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis || b.hid) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const plank = (page, p, tag) => click(page, `[data-k="plank-${p}"]`, tag);
  const sign = (page, g, tag) => click(page, `[data-k="sign-${g}"]`, tag);

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} path 1`;
    await force(page, '10', 0);
    is(await count(page, '.pp-sign') === 4 && await count(page, '.pp-seg.is-sel') === 1 && await count(page, '.pp-plank') === 5 && await count(page, '.pp-mist') === 0, `${tag}: four signposts, the first chosen, five planks, squares drawn`);
    is(await page.evaluate(() => { const i = document.querySelector('.pp-walker'); return !!i && i.naturalWidth > 0; }), `${tag}: the walker is a loaded library picture`);
    await plank(page, 4, tag); let s = await st(page);
    is(s.misses[0] === 1 && s.laid[0] === null && sp(await note(page)) === sp(T(loc, 'hShort')) && await count(page, '[data-k="plank-4"]:not(:disabled)') === 1 && await count(page, '.pp-miss') === 1, `${tag}: plank 4 is too short — it falls in, one open square outlined (hShort)`);
    await plank(page, 7, tag); s = await st(page);
    is(s.misses[0] === 2 && sp(await note(page)) === sp(T(loc, 'hCount')) && await count(page, '.pp-count') === 5 && await count(page, '.pp-countnum') === 5, `${tag}: plank 7 — the second miss numbers the 5 squares (hCount)`);
    await force(page, '10', 0); await plank(page, 7, tag);
    is(sp(await note(page)) === sp(T(loc, 'hLong')) && await count(page, '.pp-over') >= 1, `${tag}: plank 7 alone is too long — the overhang glows (hLong)`);
    await plank(page, 5, tag); s = await st(page);
    is(s.laid[0] === 5 && s.selected === 1 && sp(await note(page)) === sp(T(loc, 'okFit', { eq: '5 + 4 = 9' })) && await count(page, '[data-k="sign-0"] .pp-blank.is-full') === 1, `${tag}: plank 5 fits, the ? fills, gap 2 is chosen (okFit)`);
    await sign(page, 0, tag); s = await st(page);
    is(s.laid[0] === null && s.selected === 0 && await count(page, '[data-k="plank-5"]:not(:disabled)') === 1, `${tag}: tapping the full signpost lifts plank 5 out`);
    await plank(page, 5, tag); await plank(page, 3, tag); await plank(page, 7, tag); await plank(page, 8, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okAll', { a: 5, b: 3, c: 7, d: 8 })), `${tag}: all four fit → okAll`);
    is(await count(page, '.pp-wbox.is-across') === 1 && await count(page, '.pp-flag.is-up') === 1 && await count(page, '[data-k="plank-4"].is-float') === 1, `${tag}: the walker crosses, the flag goes up, the decoy floats away`);
    /* keyboard */
    tag = `${loc} keys`;
    await force(page, '10', 1);
    await page.focus('[data-k="sign-0"]'); await page.keyboard.press('ArrowDown'); await wait(20); s = await st(page);
    is(s.selected === 1, `${tag}: ↓ chooses the next gap`);
    await page.focus('[data-k="plank-7"]'); await page.keyboard.press('Enter'); await wait(20); s = await st(page);
    is(s.laid[1] === 7, `${tag}: Enter lays the focused plank (7 in ? − 3 = 4)`);
    await page.focus('[data-k="sign-0"]'); await page.keyboard.press('Backspace'); await wait(20); s = await st(page);
    is(s.laid[1] === null, `${tag}: Backspace lifts the last plank`);
    /* Numbers only */
    tag = `${loc} numbers only`;
    await force(page, '20', 0, 'numbers');
    is(await count(page, '.pp-mist') === 4 && await count(page, '.pp-sq') === 0, `${tag}: every gap misted, no squares at rest`);
    await plank(page, 9, tag);
    is(await count(page, '.pp-mist') === 3 && await count(page, '.pp-seg:first-child .pp-sq') > 0, `${tag}: a plank in gap 1 lifts the mist there only`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every path at rest, at miss 2 and solved — reached ONCE per locale, then resized through every width ---- */
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden]'); };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.pp-sign,.pp-plank')].filter(vis).forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); if (e.classList.contains('pp-sign') && e.scrollWidth > e.clientWidth + 1) out.fails.push('a signpost overflows'); });
    const tr = document.querySelector('.pp-tray').getBoundingClientRect(); out.tTop = tr.top; out.tBottom = tr.bottom;
    const nr = document.querySelector('.pp-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.pp-wrap').getBoundingClientRect();
    document.querySelectorAll('.pp-seg,.pp-svg,.pp-tray,.pp-strip').forEach(e => { const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push(e.className.baseVal != null ? 'svg' : e.className + ' outside the card'); });
    const w = document.querySelector('.pp-walker'); if (!w || !w.complete || !w.naturalWidth) out.fails.push('the walker did not load'); else if (w.getBoundingClientRect().width < (W.width >= 620 ? 96 : 64) - 1) out.fails.push('the walker is small');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of C.LEVELS) for (const idx of C.ids(level)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(level, idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level}.${idx} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, idx);
      if (state === 'miss2') { const wrong = r.answers.slice(1).concat([r.decoy]).slice(0, 2); for (const p of wrong) await plank(page, p, t0); }
      if (state === 'solved') for (const p of r.answers) await plank(page, p, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses[0] === 2, `${t0}: two misses in gap 1`);
      if (state === 'solved') is(s0.done, `${t0}: crossed by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level}.${idx} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.pp-wrap'), W = Math.floor(e.getBoundingClientRect().width), s = document.querySelector('.pp-svg'); return e.classList.contains(W >= 620 ? 'is-wide' : 'is-narrow') && s && Math.abs(+s.getAttribute('width') - (W >= 620 ? Math.floor((W - 16) / 2) : W)) < 9; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.pp-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.tBottom <= VH(w), `${tag}: the tray above the fold (${Math.round(m.tBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.tTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the tray and the hint in view together (${Math.round(m.tTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 1)) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-plank-path: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
