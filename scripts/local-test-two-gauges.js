#!/usr/bin/env node
/* =====================================================================
   local-test-two-gauges.js — ACTIVITY #89, The Two Gauges ("Fixit's
   Fix-It Corner", 1.OA.D.8), in a real browser with REAL clicks on the
   socket, the pad keys, the drums, the lever and the gauges, and the
   keyboard (never a model call to make a move). For every locale:
     · To 20, 6 + 6 = □ + 4: at rest the left needle stands on 12, the right
       on 0; the lever with an empty socket is hEmpty (the socket pulses, not
       a miss); 10 from the pad and the lever: miss 1 — the right needle on
       14, a ghost line on each gauge where the other side reads (hGap); a
       new number takes the help away; 9: miss 2 — the counting path, eight
       numbered steps on the right gauge, "Both gauges must read 12"; 8: the
       needles turn gold, the "=" plate lights, the gadget floods into
       colour, okBal; a tap on a gauge replays it;
     · To 10, □ − 3 = 5: 1 sends the left needle into the zero pin (hPin);
     · To 20, 8 + 5 = □ by the keyboard: type 1 3, Enter → okRun;
     · To 20, 16 − 7 = □: two wrong numbers → "count the steps from 7 to 16"
       (a difference counts UP, never back 7);
     · To 100, 25 + 10 + □ = 50 on the drums: ▲ tens, ▲ × 5 ones → 15 → runs.
   And every round of the three levels at rest, at miss 2 and solved — each
   state reached ONCE per locale by real clicks, then the window resized
   through 320–1366 and measured at every width: no sideways scroll, every
   control ≥ 44 px, the lever above the fold at rest, the note and the
   gauges in view together after a miss, the success line in view, the
   gadget a loaded library picture ≥ 64 / 96 px, nothing outside the card.
   Usage: node scripts/local-test-two-gauges.js [--widths=…] [--locales=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '089-two-gauges', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'two-gauges-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TwoGaugesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'two-gauges-activity.js'), 'utf8') + '\n;this.__A = TwoGaugesActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/two-gauges-activity.html?activity=fix-it-corner.missing-part.1-oa-d-8&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TwoGaugesActivity && window.TwoGaugesActivity.st && document.querySelector('.tg-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.TwoGaugesActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx, pathMode) {
    await page.evaluate((level, idx, pm) => { const a = window.TwoGaugesActivity; a.api.settings.numbers = level; a.api.settings.path = pm || 'help'; a._pool = null; a._ensurePool(); a._start(idx, idx, 3); a._render2(); window.scrollTo(0, 0); }, level, idx, pathMode);
    await page.waitForFunction(() => { const i = document.querySelector('.tg-gimg'); return i && i.complete && i.naturalWidth > 0; }, { timeout: 8000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.TwoGaugesActivity.st; return { value: s.value, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.tg-note').textContent);
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);
  const degs = (page) => page.evaluate(() => [...document.querySelectorAll('.tg-needle')].map(n => +n.getAttribute('data-deg')));
  const deg = (v, top) => 135 + 270 * v / top;
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(25); return true;
  }
  const lever = (page, tag) => click(page, '[data-k="lever"]', tag);
  async function setNum(page, n, tag, big) {
    if (!big) { await click(page, '[data-k="socket"]', tag); await click(page, `[data-k="key-${n}"]`, tag); return; }
    let s = await st(page), cur = s.value || 0, guard = 0;
    while (Math.floor(cur / 10) !== Math.floor(n / 10) && guard++ < 12) { await click(page, '[data-k="tens-up"]', tag); cur = (await st(page)).value || 0; }
    guard = 0; while (cur % 10 !== n % 10 && guard++ < 12) { await click(page, '[data-k="ones-up"]', tag); cur = (await st(page)).value || 0; }
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    /* ---- To 20: 6 + 6 = □ + 4 ---- */
    let tag = `${loc} 6+6=□+4`;
    await force(page, '20', 5);
    let d = await degs(page);
    is(d[0] === deg(12, 20) && d[1] === deg(0, 20), `${tag}: at rest the left needle stands on 12, the right on 0 (${d})`);
    is(await page.evaluate(() => { const i = document.querySelector('.tg-gimg'); return i.naturalWidth > 0 && getComputedStyle(i).filter.includes('grayscale'); }), `${tag}: the gadget is a library picture, grey while broken`);
    await lever(page, tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmpty')) && await count(page, '.tg-socket.is-pulse') === 1, `${tag}: the lever with an empty socket is hEmpty, not a miss`);
    await setNum(page, 10, tag); s = await st(page);
    is(s.value === 10 && await count(page, '.tg-pad') === 0 && sp(await page.evaluate(() => document.querySelector('[data-k="socket"]').textContent)) === '10', `${tag}: 10 from the pad, the pad closes`);
    await lever(page, tag); s = await st(page); d = await degs(page);
    is(s.misses === 1 && d[1] === deg(14, 20) && await count(page, '.tg-ghost') === 2 && sp(await note(page)) === sp(T(loc, 'hGap')), `${tag}: miss 1 — the right needle on 14, a ghost line on each gauge (hGap)`);
    await setNum(page, 9, tag);
    is(await count(page, '.tg-ghost') === 0 && sp(await note(page)) === '', `${tag}: a new number takes the help away`);
    await lever(page, tag); s = await st(page);
    is(s.misses === 2 && await count(page, '[data-k="gauge-R"] .tg-step.is-num') === 8 && await count(page, '[data-k="gauge-L"] .tg-step') === 0 && sp(await note(page)) === sp(T(loc, 'hBoth', { n: 12 })), `${tag}: miss 2 — eight numbered steps on the right gauge, hBoth 12`);
    await setNum(page, 8, tag); await lever(page, tag); s = await st(page);
    is(s.done && await count(page, '.tg-needle.is-gold') === 2 && await count(page, '.tg-plate.is-gold') === 1 && await count(page, '.tg-gimg.is-fixed') === 1 && sp(await note(page)) === sp(T(loc, 'okBal', { eq: '6 + 6 = 8 + 4', s: 12 })), `${tag}: 8 — gold needles, the "=" plate lights, the gadget fixed, okBal`);
    is(await count(page, '.tg-gear.is-on') === 4 && await count(page, '[data-k="lever"]') === 0, `${tag}: a gear lands on the shelf; the lever goes`);
    await click(page, '[data-k="gauge-L"]', tag); is((await st(page)).done && (await degs(page))[0] === deg(12, 20), `${tag}: a tap on a gauge replays it`);
    /* ---- To 10: □ − 3 = 5, the zero pin ---- */
    tag = `${loc} □−3=5`;
    await force(page, '10', 4);
    await setNum(page, 1, tag); await lever(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '[data-k="gauge-L"] .tg-pin.is-hit') === 1 && sp(await note(page)) === sp(T(loc, 'hPin')), `${tag}: 1 − 3 bonks the zero pin (hPin)`);
    /* ---- To 20: 8 + 5 = □ by the keyboard ---- */
    tag = `${loc} 8+5=□`;
    await force(page, '20', 0);
    await page.focus('[data-k="socket"]'); await page.keyboard.press('1'); await wait(15); await page.keyboard.press('3'); await wait(20);
    s = await st(page); is(s.value === 13, `${tag}: typing 1 3 sets 13`);
    await page.focus('[data-k="socket"]'); await page.keyboard.press('Enter'); await wait(40); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okRun', { eq: '8 + 5 = 13' })), `${tag}: Enter pulls the lever → okRun`);
    /* ---- To 20: 16 − 7 = □, counting UP ---- */
    tag = `${loc} 16−7=□`;
    await force(page, '20', 6);
    await setNum(page, 10, tag); await lever(page, tag); await setNum(page, 11, tag); await lever(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hSteps', { k: 7, target: 16 })), `${tag}: miss 2 counts UP from 7 to 16 (${await note(page)})`);
    /* ---- To 100: 25 + 10 + □ = 50 on the drums ---- */
    tag = `${loc} 25+10+□=50`;
    await force(page, 'big', 8);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : '')) === sp(T(loc, 'pChain', { c: 50 })) && await count(page, '.tg-op.is-arrow') === 2, `${tag}: the chain prompt and arrows`);
    await setNum(page, 15, tag, true); s = await st(page); is(s.value === 15, `${tag}: the drums set 15`);
    await lever(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okRun', { eq: '25 + 10 + 15 = 50' })), `${tag}: 15 runs the gadget`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale, then resized through every width ---- */
  const MEASURE = () => {
    const out = { fails: [] };
    const vis = (e) => { const r = e.getBoundingClientRect(), cs = getComputedStyle(e); return r.width > 2 && r.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none' && !e.closest('[hidden]'); };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const ctrls = [...document.querySelectorAll('.tg-socket,.tg-key,.tg-roll,.tg-lever,.tg-gauge')].filter(vis);
    ctrls.forEach(e => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.fails.push('small control ' + e.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); });
    const lv = document.querySelector('.tg-lever'); if (lv) { const q = lv.getBoundingClientRect(); out.lBottom = q.bottom; out.lTop = q.top; }
    const nr = document.querySelector('.tg-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const gr = document.querySelector('.tg-gauges').getBoundingClientRect(); out.gBottom = gr.bottom;
    const W = document.querySelector('.tg-wrap').getBoundingClientRect();
    ['.tg-gauges', '.tg-strip', '.tg-input', '.tg-top', '.tg-shelf'].forEach(s => { const e = document.querySelector(s); if (!e) return; const q = e.getBoundingClientRect(); if (q.width && (q.left < W.left - 1 || q.right > W.right + 1)) out.fails.push(s + ' outside the card'); });
    const g = document.querySelector('.tg-gimg'); if (!g || !g.complete || !g.naturalWidth) out.fails.push('the gadget did not load'); else if (g.getBoundingClientRect().width < (W.width >= 560 ? 96 : 64) - 1) out.fails.push('the gadget is small');
    const strip = document.querySelector('.tg-strip'); if (strip.scrollWidth > strip.clientWidth + 1) out.fails.push('the strip overflows');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of C.LEVELS) for (const idx of C.ids(level)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(level, idx), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level}.${idx} ${state}`, big = level === 'big';
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, idx);
      if (state === 'miss2') { const wrong = [1, 2, 3, 4, 5, 6, 7].filter(v => v !== r.ans).slice(0, 2); for (const v of wrong) { await setNum(page, v, t0, big); await lever(page, t0); } }
      if (state === 'solved') { await setNum(page, r.ans, t0, big); await lever(page, t0); }
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2, `${t0}: two misses`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level}.${idx} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.tg-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow'); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(s1.value === s0.value && s1.misses === s0.misses && s1.done === s0.done, `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.tg-note').scrollIntoView({ block: 'start', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.lBottom <= VH(w), `${tag}: the lever above the fold (${Math.round(m.lBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.nTop >= 0 && m.gBottom <= VH(w) + 1, `${tag}: the hint and the gauges in view together (${Math.round(m.nTop)}–${Math.round(m.gBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && (idx === 0 || idx === 5 || idx === 8)) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${idx}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-two-gauges: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
