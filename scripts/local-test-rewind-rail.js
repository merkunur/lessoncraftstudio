#!/usr/bin/env node
/* =====================================================================
   local-test-rewind-rail.js — the interaction gate for ACTIVITY #74, The
   Rewind Rail (Snippy's Letter Trace, L.K.1.a, 11 locales). Real pointer:
     every letter of every set in every locale is written through its steps
     by a mouse following the stroke — guided (numbered dot + arrow), with
     the road, then on its own (no road, every start dot shown) — each step
     ends with the rewind, the on-my-own letter is graded and won, and the
     family strip fills.
   Once per locale, on my own: an empty Check is no miss; a letter written
   BACKWARDS → miss 1 'direction', the rewind stops inside that stroke with
   the flag and the chevrons on the child's band; the strokes in the WRONG
   ORDER → 'order', the two tracks' first colours differ; a wrong START
   (a ring started at its far side) → 'start' with the two rings; a missing
   stroke → 'shape'; a second miss turns the letter back into the road step
   with the spark. The rail: a drag moves Snippy and scrubs BOTH pads (the
   strokes shown change), a tap on Snippy plays, ←/→ step it. Free play: a
   tile shows Snippy writing that letter, and the tile of the letter being
   written on its own is disabled. Settings: Steps → 3 / 2 / 1 pips,
   Letters → the strip; the phone pad's tabs Yours / Snippy's / Both.
   The width sweep (all locales at 320 / 704 / 1366, en at every width), at
   rest, frozen after a miss and won: no sideways scroll, controls ≥ 44
   inside the card, text ≥ 14, the pictures at their floor (96 / 64), the
   Check above the fold.
   Usage: node scripts/local-test-rewind-rail.js [--widths=…] [--locales=…] [--sweep-only] [--quick] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots'), QUICK = process.argv.includes('--quick');
const ID = 'snippy.letter-formation.l-k-1-a';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '074-rewind-rail', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
global.WritingCarriageCore = require(path.join(MINI, 'writing-carriage-core.js'));
const C = require(path.join(MINI, 'rewind-rail-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, RewindRailCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'rewind-rail-activity.js'), 'utf8') + '\n;this.__A = RewindRailActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
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
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/rewind-rail-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RewindRailActivity && window.RewindRailActivity.st && document.querySelector('.rr-svg'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.RewindRailActivity; a.FAST = true; a.OK_MS = 60000; });
    return { page, errs };
  }
  /* force a round: the setting, the letter, the steps */
  async function force(page, set, id, steps) {
    await page.evaluate((set, id, steps) => { const a = window.RewindRailActivity; a.api.settings.letters = set; a.api.settings.steps = steps || 'all'; a._pool = null; a._ensurePool(); a._start(id); a._render2(); }, set, id, steps);
    await waitPics(page);
  }
  const waitPics = (page) => page.waitForFunction(() => [...document.querySelectorAll('.rr-wrap img')].every(i => i.complete), { timeout: 5000 }).catch(() => {});
  const st = (page) => page.evaluate(() => { const a = window.RewindRailActivity, s = a.st; return { letter: s.r.letter, step: s.step, kinds: s.kinds.slice(), kind: s.kinds[s.step], idx: s.tr ? s.tr.idx : -1, misses: s.misses, done: s.done, ink: s.ink.length, shown: !!s.shown, last: s.last && s.last.reason, mode: a._view.mode, u: a._view.u, g: s.graded && s.graded.kind }; });
  const note = (page) => page.evaluate(() => document.querySelector('.rr-note').textContent);
  const settle = (page) => page.waitForFunction(() => !window.RewindRailActivity._busy && !window.RewindRailActivity._raf, { timeout: 8000 }).catch(() => {});
  /* the client points of model stroke k (forward, or reversed, or from its middle) on the child's pad */
  const pts = (page, k, mode) => page.evaluate((k, mode) => {
    const a = window.RewindRailActivity, L = RewindRailCore.lanes(a.st.r.strokes)[k]; if (!L) return null;
    let p = L.pts.filter((x, i) => i % 3 === 0 || i === L.pts.length - 1);
    if (mode === 'rev') p = p.slice().reverse();
    if (mode === 'half') p = p.slice(Math.floor(p.length / 2)).concat(p.slice(1, Math.floor(p.length / 2) + 1));
    return p.map(q => a._toClient('you', q));
  }, k, mode);
  async function drag(page, P) {
    await page.mouse.move(P[0].x, P[0].y); await page.mouse.down();
    for (const q of P.slice(1)) await page.mouse.move(q.x, q.y);
    if (P.length === 1) await page.mouse.move(P[0].x + 0.4, P[0].y + 0.4);
    await page.mouse.up(); await wait(10); await settle(page);
  }
  const nStrokes = (page) => page.evaluate(() => RewindRailCore.lanes(window.RewindRailActivity.st.r.strokes).length);
  /* write the current step's letter correctly, stroke by stroke (the tracer steps) or in one go (on my own) */
  async function writeStep(page) { const n = await nStrokes(page); for (let k = 0; k < n; k++) { const s = await st(page); if (s.kind !== 'own' && s.idx !== k) break; await drag(page, await pts(page, k)); } }
  async function tap(page, sel) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) throw new Error('no ' + sel);
    await wait(20); await page.mouse.click(b.x, b.y); await wait(20); await settle(page);
    return b;
  }
  async function scrollTop(page) { await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' })); await wait(20); }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    const { page, errs } = await open(704, loc);
    for (const set of C.SET_KEYS) {
      const list = QUICK ? C.letters(loc, set).slice(-2) : C.letters(loc, set);
      for (const id of list) {
        await force(page, set, id, 'all'); await scrollTop(page);
        const task = await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text, .lcs-activity-prompt').textContent);
        is(sp(task).includes(sp(T(loc, 'tGuided'))), `${loc} ${set} ${id}: the guided task line`);
        const steps = [];
        for (let k = 0; k < 3; k++) {
          const s0 = await st(page); steps.push(s0.kind);
          await scrollTop(page);
          await writeStep(page);
          if (s0.kind === 'own') { await tap(page, '.rr-check'); break; }
        }
        const s = await st(page);
        const tile = await page.evaluate((id) => { const e = [...document.querySelectorAll('.rr-tile')].find(t => t.textContent === id); return e ? e.className : ''; }, id);
        is(s.done && s.misses === 0 && steps.join() === 'guided,ckpt,own' && /is-done/.test(tile), `${loc} ${set} ${id}: guided → road → on my own, won, the tile filled (steps ${steps} done ${s.done} misses ${s.misses} tile ${tile})`);
        is(sp(await note(page)) === sp(T(loc, 'okLetter').replace('{g}', id)), `${loc} ${set} ${id}: «${await note(page)}»`);
      }
    }
    /* the misses, on my own: o (a ring), t / a (two strokes, the order), L */
    const one = async (set, id, fn) => { await force(page, set, id, 'own'); await scrollTop(page); await fn(); };
    await one('s1', 'c', async () => {
      await tap(page, '.rr-check'); const s = await st(page);
      is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmpty')), `${loc}: an empty Check is no miss`);
      const dots = await page.evaluate(() => document.querySelectorAll('.rr-dot').length);
      is(dots === 1 && await page.evaluate(() => !document.querySelector('.rr-road') && !document.querySelector('.rr-dotn')), `${loc}: on my own — no road, the start dot unnumbered`);
      await drag(page, await pts(page, 0, 'rev')); await tap(page, '.rr-check'); const s2 = await st(page);
      const chev = await page.evaluate(() => document.querySelectorAll('.rr-band.is-you').length > 0 && !!document.querySelector('.rr-chev') && !!document.querySelector('.rr-flag'));
      is(s2.misses === 1 && s2.g === 'direction' && s2.mode === 'frozen' && s2.u > 0 && s2.u < 1 && chev && sp(await note(page)) === sp(T(loc, 'hDirection')), `${loc}: c backwards → direction, frozen inside the stroke with the flag and the chevrons (${JSON.stringify(s2)})`);
    });
    await one('s1', 't', async () => {
      await drag(page, await pts(page, 1)); await drag(page, await pts(page, 0)); await tap(page, '.rr-check'); const s = await st(page);
      const cols = await page.evaluate(() => { const y = document.querySelector('.rr-band.is-you'), m = document.querySelector('.rr-band.is-snip'); return [y && y.getAttribute('fill'), m && m.getAttribute('fill')]; });
      const want = sp(T(loc, 'hOrder').replace('{c}', T(loc, 'c0')));
      is(s.g === 'order' && cols[0] && cols[1] && cols[0] !== cols[1] && sp(await note(page)) === want, `${loc}: t cross first → order, the tracks' first colours differ (${cols}), «${await note(page)}»`);
      /* the rail: a drag scrubs both pads */
      const before = await page.evaluate(() => document.querySelectorAll('.rr-rp').length);
      const a0 = await page.evaluate(() => window.RewindRailActivity._railClient(0.02)), a1 = await page.evaluate(() => window.RewindRailActivity._railClient(0.98));
      await page.mouse.move(a0.x, a0.y); await page.mouse.down(); await page.mouse.move(a1.x, a1.y, { steps: 6 }); await page.mouse.up(); await wait(30);
      const after = await page.evaluate(() => ({ n: document.querySelectorAll('.rr-rp').length, u: window.RewindRailActivity._view.u, you: document.querySelectorAll('svg[data-pad="you"] .rr-rp').length, snip: document.querySelectorAll('svg[data-pad="snip"] .rr-rp').length }));
      is(after.u > 0.9 && after.you === 2 && after.snip === 2 && after.n !== before, `${loc}: dragging Snippy to the end shows both letters whole (${JSON.stringify(after)} before ${before})`);
      await page.mouse.move(a0.x, a0.y); await page.mouse.down(); await page.mouse.up(); await wait(30);
      const back = await page.evaluate(() => ({ u: window.RewindRailActivity._view.u, n: document.querySelectorAll('.rr-rp').length }));
      is(back.u < 0.1 && back.n < after.n, `${loc}: a tap at the start of the rail rewinds both (${JSON.stringify(back)})`);
      await page.focus('.rr-knob'); await page.keyboard.press('ArrowRight'); await wait(20);
      is(Math.abs(await page.evaluate(() => window.RewindRailActivity._view.u) - back.u - 0.05) < 0.011, `${loc}: → steps Snippy along the rail`);
      /* a second miss: back to the road with the spark */
      await scrollTop(page); await drag(page, await pts(page, 1)); await drag(page, await pts(page, 0)); await tap(page, '.rr-check'); const s3 = await st(page);
      is(s3.misses === 2 && s3.kind === 'ckpt' && await page.evaluate(() => { const a = window.RewindRailActivity; a._view = { mode: 'rest', u: 0 }; a._paint(); return !!document.querySelector('.rr-gspark') && !!document.querySelector('.rr-road'); }) && sp(await note(page)).endsWith(sp(T(loc, 'hMiss2'))), `${loc}: a second miss → the road step with the spark (${JSON.stringify(s3)})`);
      await scrollTop(page); await writeStep(page); const s4 = await st(page);
      is(s4.kind === 'own' && !s4.done, `${loc}: after the road step, on my own again`);
    });
    await one('cu', 'O', async () => {
      await drag(page, await pts(page, 0, 'half')); await tap(page, '.rr-check'); const s = await st(page);
      is(s.g === 'start' && await page.evaluate(() => document.querySelectorAll('.rr-ring').length === 2) && sp(await note(page)) === sp(T(loc, 'hStart')), `${loc}: O begun at its far side → start, both starts ringed (${JSON.stringify(s)})`);
    });
    await one('st', 'L', async () => {
      await drag(page, await pts(page, 0)); await tap(page, '.rr-check'); const s = await st(page);
      is(s.g === 'shape' && sp(await note(page)) === sp(T(loc, 'hShape')), `${loc}: L without its foot → shape`);
      await tap(page, '.rr-erase'); const s2 = await st(page);
      is(s2.ink === 0 && s2.mode === 'rest', `${loc}: Rub out clears the pad`);
      /* free play: the current letter's tile is shut on your own; another letter's tile shows Snippy writing it */
      const shut = await page.evaluate(() => { const t = [...document.querySelectorAll('.rr-tile')].find(e => e.textContent === 'L'); return t && t.disabled; });
      await tap(page, '.rr-tile[data-k="tile-T"]'); const d = await page.evaluate(() => window.RewindRailActivity._view.mode);
      is(shut && d === 'rest' && await page.evaluate(() => !document.querySelector('svg[data-pad="you"] .rr-rp')), `${loc}: the L tile is shut on my own; the T tile played on Snippy's pad (${shut} ${d})`);
    });
    /* settings */
    for (const [steps, n] of [['all', 3], ['p', 2], ['own', 1]]) { await force(page, 's2', 'o', steps); is(await page.evaluate(() => document.querySelectorAll('.rr-pip').length) === n, `${loc}: Steps ${steps} → ${n} pips`); }
    await force(page, 'bs', 'B', 'all');
    is(await page.evaluate(() => [...document.querySelectorAll('.rr-tile')].map(t => t.textContent).join(' ')) === C.letters(loc, 'bs').join(' '), `${loc}: Letters → the strip shows the set`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const [set, id] of [['s1', 'a'], ['sl', C.letters(loc, 'sl').slice(-1)[0]]]) for (const phase of ['rest', 'frozen', 'won']) {
      await force(page, set, id, phase === 'rest' ? 'all' : 'own'); await scrollTop(page);
      if (phase === 'frozen') { await drag(page, await pts(page, 0, 'rev')); await tap(page, '.rr-check'); }
      if (phase === 'won') { await writeStep(page); await tap(page, '.rr-check'); }
      if (phase === 'frozen' && w < 520) await tap(page, '.rr-tab[data-k="tab-both"]');
      await scrollTop(page); await wait(40);
      const tag = `@${w} ${loc} ${set} ${id} ${phase}`;
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
        const vis = (e) => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none';
        const ctl = [...document.querySelectorAll('.rr-wrap button, .rr-knob')].filter(vis);
        const txt = [...document.querySelectorAll('.rr-note,.rr-check,.rr-word,.rr-tab')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
        const pics = [...document.querySelectorAll('.rr-wrap img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
        const boxes = [...document.querySelectorAll('.rr-padbox,.rr-rail')].map(e => e.getBoundingClientRect());
        const out = boxes.concat(ctl.map(e => e.getBoundingClientRect())).filter(b => b.right > app.right + 1 || b.left < app.left - 1).length;
        const chk = document.querySelector('.rr-check').getBoundingClientRect();
        return { side: de.scrollWidth - de.clientWidth, small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className), out, txt: Math.min(...txt), pics, fold: chk.bottom + scrollY, H: innerHeight, W: document.querySelector('.rr-wrap').getBoundingClientRect().width };
      });
      const floor = m.W >= 520 ? 96 : 64;
      is(m.side <= 0 && !m.small.length && !m.out, `${tag}: no sideways scroll, controls ≥ 44, nothing off the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out})`);
      is(m.txt >= 14 && m.pics.length >= 1 && Math.min(...m.pics) >= floor - 0.6, `${tag}: text ≥ 14 (${m.txt}), pictures ≥ ${floor} (${m.pics.map(Math.round).join('/')})`);
      if (phase === 'rest') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${set}-${phase}.png`), fullPage: true });
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-rewind-rail: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
