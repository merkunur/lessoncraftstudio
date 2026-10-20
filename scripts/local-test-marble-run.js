#!/usr/bin/env node
/* =====================================================================
   local-test-marble-run.js — the interaction gate for ACTIVITY #53,
   Tavukuularata (RF.K.2.B, fi). Real pointer, every round of every level:
     Päästä kuula with nothing on the track asks (no miss); a piece
     DRAGGED onto place 2 → "the track must start at the funnel" (no
     miss); dragged to place 1; miss 1 — Lyhyet / Pitkät sanat: the decoy
     TAPPED on → the marble reads it and rolls into the side dish
     (hintLength, the strip shows what it read); Tavuvahti: the two-
     consonant piece TAPPED on → the marble bumps the step and rolls
     back (hintStep, the step glows); the piece tapped off → the ride
     clears; miss 2 (a wrong order, or for one-syllable words the decoy
     again) → the shadow track (one outline per syllable) and the grey
     word with dividers; all taken back; the first piece DRAGGED to
     place 1, the rest tapped → the marble lands in the cup, the strip
     says the word, a marble in the jar, celebrates.
   Also: a gap (it falls there: hintGap), a drag onto a taken place
   swaps, the keyboard (← → move, Delete removes), Houkutuspala ei, and
   Tavuvahti keeps its wrong pieces. And the width sweep 320–1366 at
   rest, miss 2 and landed: no sideways scroll, controls ≥ 44 px inside
   the card, the placed pieces inside the board and never touching, text
   ≥ 14 px, the picture ≥ 96 / 64 px, every control above the fold.
   Usage: node scripts/local-test-marble-run.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.muodosta-sana-tavuista.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'marble-run-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, MarbleRunCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'marble-run-activity.js'), 'utf8') + '\n;this.__A = MarbleRunActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].fi; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/marble-run-activity.html?activity=${ID}&lang=fi&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MarbleRunActivity && window.MarbleRunActivity.st && document.querySelector('.tmr-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.MarbleRunActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.MarbleRunActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, places: s.places, tray: s.tray, misses: s.misses, help: s.help, done: s.done, last: s.last, ride: s.ride })); });
  const note = (page) => page.evaluate(() => document.querySelector('.tmr-note').textContent);
  const strip = (page) => page.evaluate(() => document.querySelector('.tmr-read').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(50); }
  async function dragToPlace(page, sel, k) {
    await ctr(page, '.tmr-board');
    const a = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const b = await page.evaluate((k) => { const A = window.MarbleRunActivity, L = A._L, bd = document.querySelector('.tmr-board').getBoundingClientRect(), xy = window.MarbleRunCore.placeXY(L, k); return { x: bd.left + xy.x + L.pw / 2, y: bd.top + xy.y + L.ph / 2 }; }, k);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10);
    await page.mouse.up(); await wait(80);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.MarbleRunActivity; a.FAST = true; Object.assign(a.api.settings, { decoy: 'yes' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(120);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function release(page) { await tap(page, '.tmr-check'); await page.waitForFunction(() => !window.MarbleRunActivity._busy, { timeout: 8000 }); await wait(60); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.MarbleRunActivity.OK_MS = 0; }); };
  const TRAY = (id) => `.tmr-tray .tmr-piece[data-id="${id}"]`, ON = (id) => `.tmr-board .tmr-piece[data-id="${id}"]`;
  const marbleNear = (page, sel) => page.evaluate((s) => { const m = document.querySelector('.tmr-marble').getBoundingClientRect(), t = document.querySelector(s).getBoundingClientRect(); const cx = m.left + m.width / 2, cy = m.top + m.height / 2; return cx >= t.left - 14 && cx <= t.right + 14 && cy >= t.top - 24 && cy <= t.bottom + 14; }, sel);

  console.log('— fi');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  for (const lv of C.LEVEL_KEYS) for (const r of C.rounds(lv)) {
    await okRun(page); await force(page, lv, r.id);
    const n = r.w.syl.length, st0 = C.newState(r, 0); let s = await state(page);
    is(s.places.every(x => !x) && (await page.evaluate(() => document.querySelectorAll('.tmr-tray .tmr-piece').length)) === st0.pieces.length && (await strip(page)) === '', `${r.id}: ${st0.pieces.length} pieces in the tray, the track and the strip empty`);
    const steps = await page.evaluate(() => [...document.querySelectorAll('.tmr-tray .tmr-piece')].map(b => b.dataset.id + ':' + b.querySelectorAll('.tmr-step i').length).sort());
    is(JSON.stringify(steps) === JSON.stringify(st0.pieces.map(p => p.id + ':' + p.step).sort()), `${r.id}: every piece shows its step (${steps.join(' ')})`);
    await release(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintEmpty'), `${r.id}: nothing on the track asks (no miss)`);
    await dragToPlace(page, TRAY('p0'), 1); s = await state(page); is(s.places[1] === 'p0', `${r.id}: a piece dragged onto place 2`);
    await release(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintStart'), `${r.id}: the track must start at the funnel (no miss)`);
    await dragToPlace(page, ON('p0'), 0); s = await state(page); is(s.places[0] === 'p0' && !s.places[1], `${r.id}: the piece dragged along to place 1`);
    if (lv === 'guard') {
      const bad = st0.pieces.find(p => p.own < 0 && p.step === 2).id;
      await tap(page, TRAY(bad)); await release(page); s = await state(page);
      is(s.misses === 1 && s.last.result === 'step' && (await note(page)) === T('hintStep') && (await page.evaluate(() => !!document.querySelector('.tmr-piece.is-stepbad'))) && (await strip(page)) === r.w.syl[0] && (await marbleNear(page, ON('p0'))), `${r.id}: "${st0.pieces.find(p => p.id === bad).text}" — the marble bumps the step and rolls back onto "${r.w.syl[0]}" (miss 1)`);
      await tap(page, ON(bad));
    } else {
      await tap(page, TRAY('x0')); await release(page); s = await state(page);
      const read = r.w.syl[0] + r.decoy.text;
      const lk = C.lengthOnly(read, r.w.word) ? 'length' : 'other';
      is(s.misses === 1 && s.last.result === lk && (await note(page)) === T(lk === 'length' ? 'hintLength' : 'hintOther', { read }) && (await strip(page)) === read && (await marbleNear(page, '.tmr-dish')), `${r.id}: the decoy — the marble reads "${read}" and rolls into the dish (miss 1)`);
      await tap(page, ON('x0'));
    }
    s = await state(page); is(!s.ride && (await strip(page)) === '', `${r.id}: a piece taken off — the ride clears`);
    if (n >= 2) { await tap(page, ON('p0')); await tap(page, TRAY('p1')); await tap(page, TRAY('p0')); for (let i = 2; i < n; i++) await tap(page, TRAY('p' + i)); }
    else await tap(page, TRAY('x0'));
    await release(page); s = await state(page);
    is(s.help === 2 && (await note(page)) === T('hintShadow') && (await page.evaluate(() => document.querySelectorAll('.tmr-shadow').length)) === n && (await page.evaluate(() => document.querySelectorAll('.tmr-ghost span').length)) === n, `${r.id}: miss 2 — ${n} shadow outline(s), the grey word in ${n} syllable(s)`);
    for (const id of s.places.filter(Boolean)) await tap(page, ON(id));
    s = await state(page); is(s.places.every(x => !x), `${r.id}: placed pieces tapped go back to the tray`);
    await dragToPlace(page, TRAY('p0'), 0); for (let i = 1; i < n; i++) await tap(page, TRAY('p' + i));
    await release(page);
    s = await state(page);
    is(s.done && (await strip(page)) === r.w.word && (await marbleNear(page, '.tmr-cup')), `${r.id}: the marble lands in the cup, the strip says "${r.w.word}"`);
    is((await page.evaluate(() => document.querySelectorAll('.tmr-jarglass i').length)) >= 1, `${r.id}: a marble in the jar`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* a gap, swap, keyboard, settings */
  await page.evaluate(() => { window.MarbleRunActivity.OK_MS = 60000; });
  await force(page, 'long', 'long-auringonkukka');
  await tap(page, TRAY('p0')); await dragToPlace(page, TRAY('p1'), 2); await release(page); let s = await state(page);
  is(s.last.result === 'gap' && (await note(page)) === T('hintGap') && (await page.evaluate(() => !!document.querySelector('.tmr-slot.is-gap'))) && (await marbleNear(page, '.tmr-dish')), 'a gap: the marble falls there into the dish (hintGap)');
  await dragToPlace(page, ON('p1'), 0); s = await state(page); is(s.places[0] === 'p1' && s.places[2] === 'p0', `a piece dragged onto a taken place swaps them (${s.places.join()})`);
  await page.focus(ON('p1')); await page.keyboard.press('ArrowRight'); s = await state(page); is(s.places[1] === 'p1' && !s.places[0], '→ moves a placed piece one place');
  await page.focus(ON('p1')); await page.keyboard.press('Delete'); s = await state(page); is(!s.places.includes('p1') && s.tray.includes('p1'), 'Delete takes it back');
  await force(page, 'short', 'short-koira', { decoy: 'no' }); s = await state(page); is(s.tray.length === 2, 'Houkutuspala: ei — no decoy');
  await force(page, 'short', 'short-koira', { decoy: 'yes' }); s = await state(page); is(s.tray.length === 3, 'Houkutuspala: kyllä — the decoy');
  await force(page, 'guard', 'guard-kissa', { decoy: 'no' }); s = await state(page); is(s.tray.length === 4, 'Tavuvahti keeps its wrong pieces whatever the decoy setting');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.MarbleRunActivity.OK_MS = 60000; });
    const cases = [].concat(...C.LEVEL_KEYS.map(lv => C.rounds(lv).map(r => [lv, r.id])));
    for (const [lv, id] of cases) {
      await force(o.page, lv, id);
      const tag = `@${w} ${id}`;
      for (const phase of ['rest', 'miss', 'landed']) {
        if (phase === 'miss') await o.page.evaluate(() => {
          const A = window.MarbleRunActivity, C2 = window.MarbleRunCore, st = A.st;
          A._jar = 9; const ids = st.pieces.map(p => p.id).reverse().slice(0, 6);
          ids.forEach((id, k) => C2.place(st, id, k)); C2.release(st); C2.release(st);
          A._busy = false; A._view = {}; A._paint();
        });
        if (phase === 'landed') await o.page.evaluate(() => {
          const A = window.MarbleRunActivity, C2 = window.MarbleRunCore, st = A.st; A._clearTimers(); A._busy = false; A._view = {};
          st.places.slice().forEach(id => { if (id) C2.remove(st, id); }); st.r.w.syl.forEach((_, q) => C2.place(st, 'p' + q, q)); A._release();
        });
        await o.page.waitForFunction((ph) => ph !== 'landed' || !!document.querySelector('.tmr-read.is-whole'), { timeout: 8000 }, phase).catch(() => {});
        await wait(phase === 'landed' ? 400 : 60);
        if (phase === 'miss') { const s3 = await state(o.page); if (s3.done || s3.misses < 2) throw new Error('miss phase did not land on miss 2: ' + id); }
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement, bd = document.querySelector('.tmr-board').getBoundingClientRect();
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.tmr-piece,.tmr-check:not([hidden]),.tmr-pic')].filter(vis);
          const placed = [...document.querySelectorAll('.tmr-board .tmr-piece')].map(e => e.getBoundingClientRect());
          let hit = 0; for (let i = 0; i < placed.length; i++) for (let j = i + 1; j < placed.length; j++) { const a = placed[i], b = placed[j]; if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) hit++; }
          const inside = placed.every(b => b.left >= bd.left - 1 && b.right <= bd.right + 1 && b.top >= bd.top - 1 && b.bottom <= bd.bottom + 1);
          const strip = document.querySelector('.tmr-strip').getBoundingClientRect(), rd = document.querySelector('.tmr-read').getBoundingClientRect();
          const txt = [...document.querySelectorAll('.tmr-syl,.tmr-read,.tmr-note')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pic = document.querySelector('.tmr-pic').getBoundingClientRect();
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < 44 - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.concat([document.querySelector('.tmr-board')]).filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            hit, inside, stripOk: rd.right <= strip.right + 1, txt: txt.length ? Math.min(...txt) : 99, pic: Math.min(pic.width, pic.height),
            low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.pic >= minPic - 0.5, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, picture ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, pic ${Math.round(m.pic)})`);
        is(m.inside && m.hit === 0 && m.stripOk && m.txt >= 14, `${tag} ${phase}: pieces inside the board, never touching, the word inside the strip, text ≥ 14 px (inside ${m.inside}, hit ${m.hit}, strip ${m.stripOk}, txt ${m.txt})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['short-koira', 'long-auringonkukka', 'guard-kynttilä'].includes(id)) await o.page.screenshot({ path: path.join(SHOT, `fi-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors (${o.errs.slice(0, 2).join(' | ')})`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-marble-run: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
