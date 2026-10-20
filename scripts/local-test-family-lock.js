#!/usr/bin/env node
/* =====================================================================
   local-test-family-lock.js — the interaction gate for ACTIVITY #51, O
   cadeado das famílias (RF.K.2.B, pt-BR). Real pointer, every round of
   every level:
     rolling (Duas sílabas, Palavras maiores) — Check untouched asks (no
       miss); a NUB click rolls one face; Check → miss 1: pins on the
       right wheels, the wrong ones wobble; a real vertical DRAG rolls a
       wrong wheel one face the long way; Check → miss 2: the gold nub on
       every wrong wheel points the short way, the ghost under the plate;
       a TAP on a window opens the family fan and a fan face sets the
       wheel; the gold nubs finish it; Check → the lock opens, the plate
       closes into the word, a key with the word drops on the keyring;
     Monte o cadeado — Check with an empty socket asks; the tray's first
       wheels tapped in → miss (decoy named or pins); seated wheels tapped
       back; the first syllable DRAGGED into socket 1, the rest tapped →
       the lock opens.
   Also: the plate always reads the wheels; "Marca dourada: Sempre" shows
   the notch at rest; the keyboard (↑ ↓ roll, Enter opens the fan, ← →
   Enter picks, Esc closes, Backspace unseats); a key on the keyring
   reads its word on the plate; free play after the lock opens; and the
   width sweep 320–1366 at rest, miss and open: no sideways scroll,
   controls ≥ 44 px inside the card, wheels and sockets never touch, the
   plate text inside the plate, text ≥ 14 px, pictures ≥ 64 / 96 px,
   every control above the fold.
   Usage: node scripts/local-test-family-lock.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.forme-as-silabas.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'family-lock-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, FamilyLockCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'family-lock-activity.js'), 'utf8') + '\n;this.__A = FamilyLockActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].pt; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/family-lock-activity.html?activity=${ID}&lang=pt&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FamilyLockActivity && window.FamilyLockActivity.st && document.querySelector('.flk-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.FamilyLockActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.FamilyLockActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, level: s.r.level, wheels: s.wheels.map(w => ({ id: w.id, idx: w.idx, answer: w.answer, faces: w.faces, text: w.text })), sockets: s.sockets, tray: s.tray, pinned: s.pinned, wobble: s.wobble, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.flk-note').textContent);
  const plate = (page) => page.evaluate(() => document.querySelector('.flk-read').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, h: r.height }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  async function dragY(page, sel, dy) { const p = await ctr(page, sel); await page.mouse.move(p.x, p.y); await page.mouse.down(); for (let i = 1; i <= 8; i++) { await page.mouse.move(p.x, p.y + dy * i / 8); await wait(30); } await wait(120); await page.mouse.up(); await wait(120); }
  async function dragTo(page, sel, target) {
    const a = await ctr(page, sel); const b = await page.evaluate((t) => { const r = document.querySelector(t).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, target);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10);
    await page.mouse.up(); await wait(100);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.FamilyLockActivity; a.FAST = true; Object.assign(a.api.settings, { notch: 'after' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function check(page) { await tap(page, '.flk-check'); await page.waitForFunction(() => !window.FamilyLockActivity._busy, { timeout: 8000 }); await wait(60); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.FamilyLockActivity.OK_MS = 0; }); };
  const W = (q) => `.flk-win[data-q="${q}"]`;
  async function opened(page, r) {
    await page.waitForFunction(() => document.querySelector('.flk-plate.is-word'), { timeout: 5000 }).catch(() => {});
    const s = await state(page);
    is(s.done && (await plate(page)) === r.w.word, `${r.id}: the lock opens, the plate closes into "${r.w.word}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.flk-key .flk-shaft')].map(e => e.textContent))).includes(r.w.word), `${r.id}: a key with "${r.w.word}" on the keyring`);
    is(await page.evaluate(() => document.querySelector('.flk-lock').classList.contains('is-open') && document.querySelector('.flk-case').classList.contains('is-open')), `${r.id}: the shackle pops, the glass slides`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }

  console.log('— pt');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  /* rolling levels */
  for (const r of [].concat(C.rounds('two'), C.rounds('long'))) {
    await okRun(page); await force(page, r.level, r.id);
    let s = await state(page); const n = r.w.syl.length;
    is((await page.evaluate(() => document.querySelectorAll('.flk-win').length)) === n && (await page.evaluate(() => document.querySelectorAll('.flk-nub').length)) === 2 * n, `${r.id}: ${n} wheels, each with two nubs`);
    is((await plate(page)) === s.wheels.map(w => w.faces[w.idx]).join('·') && s.wheels.every(w => w.idx !== w.answer), `${r.id}: the plate reads the wheels; no wheel starts on its right face`);
    await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintRoll'), `${r.id}: Check untouched asks (no miss)`);
    await tap(page, `.flk-nub.is-dn[data-q="0"]`); s = await state(page);
    is((await plate(page)) === s.wheels.map(w => w.faces[w.idx]).join('·'), `${r.id}: a nub click rolls the wheel; the plate follows`);
    await check(page); s = await state(page);
    const right1 = s.wheels.map((w, q) => w.idx === w.answer ? q : -1).filter(q => q >= 0);
    is(s.misses === 1 && JSON.stringify(s.pinned) === JSON.stringify(right1) && (await page.evaluate(() => document.querySelectorAll('.flk-col.is-pinned').length)) === right1.length && (await note(page)) === T('hintPins'), `${r.id}: miss 1 — ${right1.length} pinned, the rest wobble`);
    /* a real drag rolls a wrong wheel one face the long way (never onto its answer) */
    const wq = s.wobble[0], w0 = s.wheels[wq], len = w0.faces.length, near = ((w0.answer - w0.idx) % len + len) % len <= len / 2 ? 1 : -1;
    const pitch = await page.evaluate((q) => parseFloat(getComputedStyle(document.querySelector(`.flk-win[data-q="${q}"]`)).getPropertyValue('--pitch')) || document.querySelector(`.flk-win[data-q="${q}"]`).clientHeight * 0.42, wq);
    await dragY(page, W(wq), near * pitch * 1.05); s = await state(page);
    is(s.wheels[wq].idx === ((w0.idx - near) % len + len) % len, `${r.id}: a vertical drag rolls wheel ${wq + 1} one face (${w0.faces[w0.idx]} → ${s.wheels[wq].faces[s.wheels[wq].idx]})`);
    await check(page); s = await state(page);
    if (!s.done) {
      const nubs = await page.evaluate(() => [...document.querySelectorAll('.flk-nub.has-notch')].map(b => (b.classList.contains('is-up') ? -1 : 1) + ':' + b.dataset.q));
      const wantN = s.wobble.map(q => { const w = s.wheels[q], L = w.faces.length; return ((((w.answer - w.idx) % L + L) % L) <= L / 2 ? 1 : -1) + ':' + q; });
      is(s.help === 2 && (await note(page)) === T('hintNotch') && JSON.stringify(nubs.sort()) === JSON.stringify(wantN.sort()) && (await page.evaluate(() => (document.querySelector('.flk-ghost') || {}).textContent)) === r.w.syl.join('·'), `${r.id}: miss 2 — the gold nub points the short way on every wrong wheel (${nubs.join(' ')}), the ghost under the plate`);
      /* the first wrong wheel by the family fan, the rest by the gold nubs */
      const fq = s.wobble[0];
      await tap(page, W(fq)); is(await page.evaluate(() => document.querySelectorAll('.flk-fanface').length) === s.wheels[fq].faces.length, `${r.id}: a tap on a window fans out its family`);
      await tap(page, `.flk-fanface[data-i="${s.wheels[fq].answer}"]`); s = await state(page);
      is(s.wheels[fq].idx === s.wheels[fq].answer && !(await page.evaluate(() => !!document.querySelector('.flk-fan'))), `${r.id}: a fan face sets the wheel and folds the fan`);
      for (let guard = 0; guard < 40; guard++) { s = await state(page); const q = s.wheels.findIndex(w => w.idx !== w.answer); if (q < 0) break; const w = s.wheels[q], L = w.faces.length; await tap(page, `.flk-nub.${((((w.answer - w.idx) % L + L) % L) <= L / 2) ? 'is-dn' : 'is-up'}[data-q="${q}"]`); }
      await check(page);
    }
    await opened(page, r);
  }
  /* Monte o cadeado */
  for (const r of C.rounds('build')) {
    await okRun(page); await force(page, 'build', r.id);
    let s = await state(page); const n = r.w.syl.length;
    is((await page.evaluate(() => document.querySelectorAll('.flk-sock').length)) === n && (await page.evaluate(() => document.querySelectorAll('.flk-tray .flk-lw').length)) === n + 1, `${r.id}: ${n} empty sockets, ${n + 1} wheels in the tray`);
    await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintMissing'), `${r.id}: Check with empty sockets asks (no miss)`);
    for (let i = 0; i < n; i++) await tap(page, '.flk-tray .flk-lw');
    s = await state(page); is(s.sockets.every(Boolean), `${r.id}: tray wheels tapped fill the sockets in turn`);
    is((await plate(page)) === s.sockets.map(id => s.wheels.find(w => w.id === id).text).join('·'), `${r.id}: the plate reads the sockets`);
    await check(page); s = await state(page);
    is(s.misses === 1 && (await note(page)) === (s.sockets.includes('x') ? T('hintDecoy', { word: r.w.word }) : T('hintPins3')), `${r.id}: miss 1 — ${s.sockets.includes('x') ? 'the decoy is named' : 'pins'}`);
    for (let q = n - 1; q >= 0; q--) await tap(page, `.flk-lw.is-seated[data-q="${q}"]`);
    s = await state(page); is(s.sockets.every(x => x === null), `${r.id}: seated wheels tapped go back to the tray`);
    await dragTo(page, '.flk-tray .flk-lw[data-id="w0"]', '.flk-sock[data-q="0"]'); s = await state(page);
    is(s.sockets[0] === 'w0', `${r.id}: "${r.w.syl[0]}" dragged into the first socket`);
    for (let i = 1; i < n; i++) await tap(page, `.flk-tray .flk-lw[data-id="w${i}"]`);
    await check(page);
    await opened(page, r);
  }
  /* settings, keyboard, the keyring, free play */
  await page.evaluate(() => { window.FamilyLockActivity.OK_MS = 60000; });
  await force(page, 'two', 'two-gato', { notch: 'always' });
  is((await page.evaluate(() => document.querySelectorAll('.flk-nub.has-notch').length)) === 2 && (await page.evaluate(() => !!document.querySelector('.flk-ghost'))), 'Marca dourada: Sempre — the gold nubs and the ghost at rest');
  await force(page, 'two', 'two-gato', { notch: 'after' }); is((await page.evaluate(() => document.querySelectorAll('.flk-nub.has-notch').length)) === 0, 'Marca dourada: depois de duas tentativas — none at rest');
  let s = await state(page);
  await page.focus(W(0)); await page.keyboard.press('ArrowDown'); let s2 = await state(page); is(s2.wheels[0].idx === (s.wheels[0].idx + 1) % 5, '↓ rolls a focused wheel one face');
  await page.keyboard.press('ArrowUp'); s2 = await state(page); is(s2.wheels[0].idx === s.wheels[0].idx, '↑ rolls it back');
  await page.keyboard.press('Enter'); is(await page.evaluate(() => !!document.querySelector('.flk-fan')), 'Enter fans out the family');
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter'); s2 = await state(page); is(s2.wheels[0].idx === (s.wheels[0].idx + 1) % 5 && !(await page.evaluate(() => !!document.querySelector('.flk-fan'))), '→ Enter picks the next face');
  await page.focus(W(1)); await page.keyboard.press('Enter'); await page.keyboard.press('Escape'); is(!(await page.evaluate(() => !!document.querySelector('.flk-fan'))), 'Esc folds the fan');
  await force(page, 'build', 'build-tigre'); await tap(page, '.flk-tray .flk-lw'); await page.focus('.flk-wrap'); await page.keyboard.press('Backspace'); is((await state(page)).sockets.every(x => x === null), 'Backspace takes the last seated wheel back');
  await force(page, 'two', 'two-bola');
  await page.evaluate(() => { const A = window.FamilyLockActivity; A._keys = ['gato', 'borboleta']; A._paint(); });
  await page.evaluate(() => { window.FamilyLockActivity.FAST = false; });
  await tap(page, '.flk-key'); is((await plate(page)) === 'gato' && (await page.evaluate(() => document.querySelector('.flk-plate').classList.contains('is-peek'))), 'a key on the keyring reads its word on the plate');
  await page.evaluate(() => { const A = window.FamilyLockActivity, st = A.st; A._peek = null; st.wheels.forEach((w, q) => window.FamilyLockCore.setFace(st, q, w.answer)); A._paint(); });
  await page.evaluate(() => { window.FamilyLockActivity.FREE_MS = 60000; });
  await tap(page, '.flk-check'); await page.waitForFunction(() => document.querySelector('.flk-plate.is-word') && !window.FamilyLockActivity._busy, { timeout: 6000 }).catch(() => {});
  await tap(page, `.flk-nub.is-dn[data-q="1"]`); s = await state(page);
  is(s.done && (await plate(page)) === s.wheels.map(w => w.faces[w.idx]).join('·') && (await plate(page)) !== 'bola', 'free play: after the lock opens the wheels still roll and the plate reads them');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.FamilyLockActivity.OK_MS = 60000; window.FamilyLockActivity.FREE_MS = 0; });
    const cases = [].concat(C.rounds('two'), C.rounds('long'), C.rounds('build')).map(r => [r.level, r.id]);
    for (const [lv, id] of cases) {
      await force(o.page, lv, id);
      const tag = `@${w} ${id}`;
      for (const phase of ['rest', 'miss', 'open']) {
        if (phase === 'miss') await o.page.evaluate(() => {
          const A = window.FamilyLockActivity, C2 = window.FamilyLockCore, st = A.st, r = st.r, n = r.w.syl.length;
          A._keys = ['borboleta', 'helicóptero', 'gato', 'maçã', 'tartaruga', 'girassol', 'pinguim', 'cenoura', 'abóbora'];
          if (r.level === 'build') { const order = ['x'].concat(r.w.syl.map((_, q) => 'w' + q)).slice(0, n); order.forEach((id, s) => C2.seat(st, id, s)); C2.check(st); C2.check(st); }
          else { C2.roll(st, 0, st.wheels[0].idx === (st.wheels[0].answer + st.wheels[0].faces.length - 1) % st.wheels[0].faces.length ? 2 : 1); C2.check(st); C2.check(st); }
          A._busy = false; A._view = {}; A._paint();
        });
        if (phase === 'open') await o.page.evaluate(() => {
          const A = window.FamilyLockActivity, C2 = window.FamilyLockCore, st = A.st, r = st.r; A._clearTimers(); A._busy = false; A._view = {};
          if (r.level === 'build') { for (let q = 0; q < st.sockets.length; q++) if (st.sockets[q]) C2.unseat(st, q); r.w.syl.forEach((_, q) => C2.seat(st, 'w' + q, q)); }
          else st.wheels.forEach((w, q) => C2.setFace(st, q, w.answer));
          A._check();
        });
        await o.page.waitForFunction((ph) => ph !== 'open' || !!document.querySelector('.flk-plate.is-word'), { timeout: 8000 }, phase).catch(() => {});
        await wait(phase === 'open' ? 800 : 60);
        if (phase === 'miss') { const s3 = await state(o.page); if (s3.done || s3.misses < 2) throw new Error('miss phase did not land on miss 2: ' + id); }
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.flk-win,.flk-nub,.flk-lw,.flk-check:not([hidden]),.flk-pic,.flk-say,.flk-key')].filter(vis);
          const slots = [...document.querySelectorAll('.flk-win,.flk-sock')].filter(vis);
          let hit = 0; for (let i = 0; i < slots.length; i++) for (let j = i + 1; j < slots.length; j++) { const a = slots[i].getBoundingClientRect(), b = slots[j].getBoundingClientRect(); if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) hit++; }
          const pl = document.querySelector('.flk-plate').getBoundingClientRect(), rd = document.querySelector('.flk-read').getBoundingClientRect(), say = document.querySelector('.flk-say').getBoundingClientRect();
          const plateOk = rd.left >= pl.left - 1 && rd.right <= say.left + 2;
          const body = document.querySelector('.flk-body').getBoundingClientRect();
          const txt = [...document.querySelectorAll('.flk-face.is-cur,.flk-lwface,.flk-read,.flk-shaft,.flk-tag span,.flk-note')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.flk-pic img')].map(e => e.getBoundingClientRect().width);
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < 44 - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.concat([body]).filter(e => { const b = e.getBoundingClientRect ? e.getBoundingClientRect() : e; return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            hit, plateOk, txt: txt.length ? Math.min(...txt) : 99,
            pic: pics.length ? Math.min(...pics) : 999, low: Math.max(...ctl.filter(e => !e.classList.contains('flk-key')).map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.pic >= minPic - 0.5, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, pictures ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, pic ${Math.round(m.pic)})`);
        is(m.hit === 0 && m.plateOk && m.txt >= 14, `${tag} ${phase}: wheels never touch, the plate text inside the plate, text ≥ 14 px (hit ${m.hit}, plate ${m.plateOk}, txt ${m.txt})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['two-gato', 'long-borboleta', 'build-helicóptero'].includes(id)) await o.page.screenshot({ path: path.join(SHOT, `pt-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors (${o.errs.slice(0, 2).join(' | ')})`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-family-lock: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
