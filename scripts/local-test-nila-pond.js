#!/usr/bin/env node
/* =====================================================================
   local-test-nila-pond.js — the interaction gate for ACTIVITY #70, The Idea
   Umbrella (Nila's Idea Pond, RI.K.2, 11 locales). Real pointer at 704,
   every round of every locale:
     an empty Check → no miss, the hint; a DETAIL umbrella DRAGGED onto the
     pond → it opens full width in its peg's colour; Check → it rains, the
     canopy pulls in, exactly the two uncovered pads are wet, then it folds
     home (miss 1); the not-in-text umbrella TAPPED and checked → miss 2,
     that umbrella dims; the big idea tapped and checked → either the shell
     celebrates with the authored retelling, or step 2 opens: reject → a
     true pad dragged out is checked as a miss and drifts back, the stranger
     dragged out → success; supply → the off-topic pad tapped under is a
     miss, the belonging pad dragged under → success. Once per locale: a
     third wrong umbrella moves the target to a text about the same animal.
     Settings: Umbrellas 3 → three pegs, no not-in-text idea; Read it to me
     → the speaker marked.
   The width sweep (all locales at 320 / 704 / 1366, en at 320–1366): rest,
   rain, step 2 and success — no sideways scroll, every control ≥ 44 inside
   the card, text ≥ 14, every picture at its floor, Check above the fold.
   Usage: node scripts/local-test-nila-pond.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'nila-pond.main-idea-net.ri-k-2';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '070-idea-umbrella', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'nila-pond-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, NilaPondCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'nila-pond-activity.js'), 'utf8') + '\n;this.__A = NilaPondActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const file = p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'text/html'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/nila-pond-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.NilaPondActivity && window.NilaPondActivity.st && document.querySelector('.np-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.NilaPondActivity; a.FAST = true; a.OK_MS = 60000; a.MISS_MS = 0; a.STEP_MS = 0; });
    return { page, errs };
  }
  /* put round `id` first and reload */
  async function force(page, id) {
    await page.evaluate((id) => { const a = window.NilaPondActivity, pool = a._ensurePool(), o = pool.map((x, i) => i), k = pool.indexOf(id); o.splice(k, 1); o.unshift(k); a._order = o; a._orderForPool = pool; window.LCS_reloadFirstTask(); }, id);
    await wait(40);
  }
  const st = (page) => page.evaluate(() => { const s = window.NilaPondActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, rail: s.rail, hung: s.hung, misses: s.misses, done: s.done, phase: s.phase, under: s.under, out: s.out, tried: s.tried })); });
  const note = (page) => page.evaluate(() => document.querySelector('.np-note').textContent);
  const settle = (page) => page.waitForFunction(() => !window.NilaPondActivity._busy, { timeout: 15000 }).catch(() => {});
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 40) }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(50);
  }
  const won = async (page, fn) => { await page.evaluate(() => { window.NilaPondActivity.OK_MS = 0; }); await fn(); const c = await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false); const b = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; }); await page.evaluate(() => { window.NilaPondActivity.OK_MS = 60000; }); return { c, b }; };
  const pegOf = (s, tag) => s.rail.indexOf(tag);

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    const { page, errs } = await open(704, loc);
    for (const id of C.IDS) {
      await force(page, id);
      const r = C.round(loc, id); let s = await st(page);
      is(s.id === id && s.rail.length === 4 && s.rail.includes(0), `${loc} ${id}: the round loads with four umbrellas`);
      const prompt0 = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
      is(sp(prompt0) === sp(T(loc, 'instr')), `${loc} ${id}: the task line «${prompt0}»`);
      await tap(page, '.np-check'); s = await st(page);
      is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${loc} ${id}: an empty Check is no miss, says hang one`);
      /* a detail umbrella, dragged */
      const dpeg = pegOf(s, 1);
      await drag(page, `.np-umb[data-peg="${dpeg}"]`, '.np-pond'); s = await st(page);
      const open1 = await page.evaluate(() => { const c = document.querySelector('.np-canopy'), d = document.querySelector('.np-dry'); return c ? { w: c.getBoundingClientRect().width / d.getBoundingClientRect().width, fill: c.querySelector('path').getAttribute('fill') } : null; });
      is(s.hung === 1 && open1 && open1.w > 0.97 && open1.fill === ACT.PEG_COLORS[dpeg], `${loc} ${id}: a dragged detail umbrella opens full width in its peg colour (${open1 && open1.w.toFixed(2)}, ${open1 && open1.fill})`);
      await page.evaluate(() => { const a = window.NilaPondActivity; a.FAST = false; a.MISS_MS = 900; });
      await tap(page, '.np-check'); await wait(120);
      const rain = await page.evaluate(() => ({ wet: [...document.querySelectorAll('.np-pad.is-wet')].map(e => +e.dataset.pad), w: document.querySelector('.np-canopy').getBoundingClientRect().width / document.querySelector('.np-dry').getBoundingClientRect().width, drops: document.querySelectorAll('.np-drop').length }));
      const wantWet = [0, 1, 2].filter(p => !r.cover[1].includes(p));
      is(JSON.stringify(rain.wet) === JSON.stringify(wantWet) && rain.w < 0.5 && rain.drops > 10, `${loc} ${id}: the rain wets ${rain.wet} (want ${wantWet}), the canopy pulls in (${rain.w.toFixed(2)})`);
      await settle(page); await page.evaluate(() => { const a = window.NilaPondActivity; a.FAST = true; a.MISS_MS = 0; a._view = {}; a._paint(); }); s = await st(page);
      is(s.misses === 1 && s.hung === null && sp(await note(page)) === sp(T(loc, 'hintMiss1')), `${loc} ${id}: miss 1 — the umbrella folds home, hintMiss1`);
      /* the not-in-text umbrella, tapped */
      await tap(page, `.np-umb[data-peg="${pegOf(s, 3)}"]`); await tap(page, '.np-check'); await settle(page); s = await st(page);
      const dim = await page.evaluate((p) => document.querySelector(`.np-umb[data-peg="${p}"]`).classList.contains('is-dim'), pegOf(s, 3));
      is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintMiss2')) && dim, `${loc} ${id}: miss 2 — hintMiss2, the not-in-text umbrella dims`);
      /* the big idea */
      await tap(page, `.np-umb[data-peg="${pegOf(s, 0)}"]`);
      if (!r.step) {
        const w = await won(page, () => tap(page, '.np-check')); s = await st(page);
        is(s.done && w.c && sp(w.b).includes(sp(r.ok)), `${loc} ${id}: the big idea keeps every pad dry — celebrates with the retelling`);
        continue;
      }
      await tap(page, '.np-check'); await settle(page); s = await st(page);
      const p2 = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent);
      is(s.phase === 'step2' && sp(p2) === sp(T(loc, r.step === 'reject' ? 'instrStep2' : 'instrSupply')), `${loc} ${id}: step 2 opens with «${p2}»`);
      if (r.step === 'reject') {
        is(JSON.stringify(s.under) === '[0,1,2,3]' && !!(await page.$('.np-dry .np-pad[data-pad="3"]')), `${loc} ${id}: the stranger drifted in under the umbrella`);
        await drag(page, '.np-pad[data-pad="0"]', '.np-open'); s = await st(page);
        is(s.out.includes(0), `${loc} ${id}: a true pad dragged out into the rain`);
        await tap(page, '.np-check'); await settle(page); s = await st(page);
        is(!s.done && s.under.includes(0) && sp(await note(page)) === sp(T(loc, 'hintStep2')), `${loc} ${id}: a true pad out is a miss, it drifts back, hintStep2`);
        await drag(page, '.np-pad[data-pad="3"]', '.np-open');
      } else {
        is(JSON.stringify(s.out) === '[3,4]', `${loc} ${id}: two new pads float at the edge`);
        await tap(page, '.np-pad[data-pad="4"]'); await tap(page, '.np-check'); await settle(page); s = await st(page);
        is(!s.done && sp(await note(page)) === sp(T(loc, 'hintSupply')), `${loc} ${id}: the off-topic pad under is a miss, hintSupply`);
        await tap(page, '.np-pad[data-pad="4"]'); await drag(page, '.np-pad[data-pad="3"]', '.np-dry .np-pads');
      }
      s = await st(page);
      is(JSON.stringify(s.under) === (r.step === 'reject' ? '[0,1,2]' : '[0,1,2,3]'), `${loc} ${id}: the pads where they belong (${s.under})`);
      const w = await won(page, () => tap(page, '.np-check')); s = await st(page);
      is(s.done && w.c && sp(w.b).includes(sp(r.ok)), `${loc} ${id}: step 2 right — celebrates with the retelling`);
    }
    /* the target moves */
    await force(page, 'bee-hive');
    for (let k = 0; k < 3; k++) { const s = await st(page); await tap(page, `.np-umb[data-peg="${s.rail.indexOf(k === 1 ? 3 : 1)}"]`); await tap(page, '.np-check'); await settle(page); }
    const sw = await st(page);
    is(sw.id !== 'bee-hive' && C.siblings('bee-hive').includes(sw.id) && sw.misses === 0 && sp(await note(page)) === sp(T(loc, 'swapNote')), `${loc}: a third wrong umbrella brings a new text about the same animal (${sw.id})`);
    /* settings */
    await page.evaluate(() => { const a = window.NilaPondActivity; a.api.settings.umb = '3'; a.onSettings(); });
    await wait(80);
    const three = await page.evaluate(() => ({ n: document.querySelectorAll('.np-umb').length, rail: window.NilaPondActivity.st.rail }));
    is(three.n === 3 && !three.rail.includes(3), `${loc}: Umbrellas 3 — three pegs, no not-in-text idea`);
    await page.evaluate(() => { const a = window.NilaPondActivity; a.api.settings.read = 'aloud'; a.onSettings(); });
    await wait(80);
    is(await page.evaluate(() => document.querySelector('.np-wrap').classList.contains('is-aloud')), `${loc}: Read it to me marks the speaker`);
    await page.evaluate(() => { const a = window.NilaPondActivity; a._hush(); a.api.settings.read = 'self'; a.api.settings.umb = '4'; a.onSettings(); });
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    const longest = C.IDS.slice().sort((a, b) => { const L = (id) => { const r = C.round(loc, id); return r.lead.length + r.pads.join('').length + r.tags.join('').length; }; return L(b) - L(a); })[0];
    const cases = [[longest, 'rest'], [longest, 'rain'], ['swan-nest', 'step2'], ['bear-warm', 'step2'], [longest, 'won']];
    for (const [id, phase] of cases) {
      await force(page, id);
      await page.evaluate((phase) => {
        const A = window.NilaPondActivity, K = window.NilaPondCore, s = A.st;
        if (phase === 'rain') { K.hang(s, s.rail.indexOf(1)); K.check1(s); A._view = { rain: true }; }
        if (phase === 'step2') { K.hang(s, s.rail.indexOf(0)); K.check1(s); A._view = {}; A._setPrompt(); }
        if (phase === 'won') { K.hang(s, s.rail.indexOf(0)); K.check1(s); if (s.phase === 'step2') { if (s.r.step === 'reject') K.move(s, 3); else K.move(s, 3); K.check2(s); } A._view = { msg: s.r.ok, win: true }; }
        A._busy = false; A._paint();
      }, phase);
      await wait(50);
      const tag = `@${w} ${loc} ${id} ${phase}`;
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
        const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
        const ctl = [...document.querySelectorAll('.np-wrap button')].filter(vis);
        const txt = [...document.querySelectorAll('.np-note,.np-lead,.np-padtxt,.np-tag,.np-hangtag')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
        const pics = [...document.querySelectorAll('.np-wrap img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
        const chk = document.querySelector('.np-check');
        const clip = [...document.querySelectorAll('.np-padtxt,.np-tag')].filter(vis).filter(e => e.scrollWidth > e.clientWidth + 1 || e.getBoundingClientRect().right > e.parentElement.getBoundingClientRect().right + 1).length;
        return {
          side: de.scrollWidth - de.clientWidth,
          small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 3),
          out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
          txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999, clip,
          fold: chk && !chk.hidden ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
        };
      });
      const floor = w >= 700 ? 96 : 64;
      is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
      is(m.txt >= 14 && m.pic >= floor - .5 && !m.clip, `${tag}: text ≥ 14 (${m.txt}), every picture ≥ ${floor} (${Math.round(m.pic)}), no clipped words (${m.clip})`);
      if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${id}-${phase}.png`), fullPage: true });
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-nila-pond: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
