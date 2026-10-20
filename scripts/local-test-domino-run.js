#!/usr/bin/env node
/* =====================================================================
   local-test-domino-run.js — the interaction gate for ACTIVITY #50, La
   fila de fichas (RF.K.2.B, es). Real pointer, every round of every level:
     complete — the word's dominoes standing, the gap empty, three
       candidates in the box; ¡Empuja! untouched asks (no miss); the
       same-word syllable TAPPED onto the gap → it falls into the row and
       bounces back (miss); the foreign one DRAGGED → miss 2, the gap
       glows; the answer → right: the fallen row closes into the word, the
       word in the word box;
     order — ¡Empuja! untouched asks; one domino short → the run stops
       (no miss); a wrong order → the in-place dominoes stay, the others
       bounce; the right order (tap + drag) → right;
     count — six blanks in the box; one short (table taps + box taps) →
       the last fallen tile crammed; one too many → a blank tile; right.
   Also: the settings (Ficha trampa, MAYÚSCULAS), the keyboard, the
   fallen row carries the syllables (no separate strip), and the width
   sweep (no sideways scroll, controls ≥ 44 px inside the card, standing
   dominoes inside the table and never touching, fallen tiles inside the
   table, text ≥ 14 px, pictures ≥ 64 / 96 px, every control above the
   fold) at rest, miss, fallen and done.
   Usage: node scripts/local-test-domino-run.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.forma-las-silabas.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'domino-run-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, DominoRunCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'domino-run-activity.js'), 'utf8') + '\n;this.__A = DominoRunActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].es; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/domino-run-activity.html?activity=${ID}&lang=es&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.DominoRunActivity && window.DominoRunActivity.st && document.querySelector('.drn-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.DominoRunActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.DominoRunActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, level: s.r.level, marks: s.marks, box: s.box, blanks: s.blanks, pinned: s.pinned, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.drn-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  const LOOSE = (id) => `.drn-loose[data-id="${id}"]`, DOM = (id) => `.drn-dom[data-id="${id}"]`;
  async function dragTo(page, sel, mark) {
    await ctr(page, '.drn-table');
    const a = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    const b = await page.evaluate((m) => { const A = window.DominoRunActivity, L = A._L, t = document.querySelector('.drn-table').getBoundingClientRect(), xs = window.DominoRunCore.spread(A.st.marks.length, L.x0, L.x1); return { x: t.left + xs[m], y: t.top + L.base - L.dh / 2 }; }, mark);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 10; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10);
    await page.mouse.up(); await wait(100);
  }
  async function tapTable(page) {
    await ctr(page, '.drn-table');
    const p = await page.evaluate(() => { const t = document.querySelector('.drn-table').getBoundingClientRect(); return { x: t.left + t.width / 2, y: t.top + 20 }; });
    await page.mouse.click(p.x, p.y); await wait(60);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.DominoRunActivity; a.FAST = true; Object.assign(a.api.settings, { decoy: 'no', letters: 'lower' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function push(page) { await tap(page, '.drn-check'); await page.waitForFunction(() => !window.DominoRunActivity._busy || window.DominoRunActivity.st.done, { timeout: 8000 }); await wait(80); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.DominoRunActivity.OK_MS = 0; }); };
  async function finish(page, r) {
    await page.waitForFunction(() => !!document.querySelector('.drn-word'), { timeout: 5000 }).catch(() => {});
    const s = await state(page);
    is(s.done && (await page.evaluate(() => (document.querySelector('.drn-word') || {}).textContent)) === r.w.word && (await page.evaluate(() => [...document.querySelectorAll('.drn-fallen.is-closed .drn-flat span')].map(e => e.textContent).join(''))) === r.w.word, `${r.id}: right — the fallen tiles close up into "${r.w.word}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.drn-wtile')].map(e => e.textContent))).includes(r.w.word), `${r.id}: the word in the word box`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }

  console.log('— es');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  /* Completa la palabra */
  for (const r of C.rounds('complete')) {
    await okRun(page); await force(page, 'complete', r.id);
    let s = await state(page); const n = r.w.syl.length;
    is((await page.evaluate(() => document.querySelectorAll('.drn-dom').length)) === n - 1 && (await page.evaluate(() => !!document.querySelector('.drn-hole'))) && (await page.evaluate(() => document.querySelectorAll('.drn-loose').length)) === 3, `${r.id}: ${n - 1} dominoes standing, the gap empty, three candidates`);
    await push(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintGap'), `${r.id}: ¡Empuja! untouched asks`);
    await tap(page, LOOSE('b')); s = await state(page); is(s.marks[r.gap] === 'b', `${r.id}: a tapped candidate stands on the gap`);
    await push(page); s = await state(page);
    is(s.misses === 1 && s.last.result === 'same' && s.marks[r.gap] === null && s.box.includes('b') && (await note(page)) === T('hintSame', { syl: r.same, word: r.w.word }), `${r.id}: "${r.same}" falls into the row, then bounces back (miss)`);
    await dragTo(page, LOOSE('c'), r.gap); s = await state(page); is(s.marks[r.gap] === 'c', `${r.id}: a candidate dragged onto the table stands on the gap`);
    await push(page); s = await state(page);
    is(s.help === 2 && (await note(page)) === T('hintListen', { gapped: r.w.syl.map((x, i) => i === r.gap ? '¿?' : x).join(' … ') }) && (await page.evaluate(() => !!document.querySelector('.drn-hole.is-glow'))), `${r.id}: miss 2 — listen, the gap glows`);
    await tap(page, LOOSE('a')); await push(page);
    await finish(page, r);
  }
  /* Ordena las fichas */
  for (const r of C.rounds('order')) {
    await okRun(page); await force(page, 'order', r.id);
    let s = await state(page); const n = r.w.syl.length;
    is(s.marks.length === n && s.marks.every(x => x === null) && (await page.evaluate(() => document.querySelectorAll('.drn-loose').length)) === n, `${r.id}: ${n} empty marks, ${n} dominoes in the box`);
    await push(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T('hintOrder'), `${r.id}: ¡Empuja! untouched asks`);
    await tap(page, LOOSE('d1')); await push(page); s = await state(page);
    is(s.misses === 0 && s.last.result === 'stop' && (await note(page)) === T('hintStop'), `${r.id}: a missing domino stops the run (no miss)`);
    await tap(page, LOOSE('d0')); for (let i = 2; i < n; i++) await tap(page, LOOSE('d' + i));
    s = await state(page); is(s.marks.join() === ['d1', 'd0'].concat([...Array(n).keys()].slice(2).map(i => 'd' + i)).join(), `${r.id}: tapped dominoes fill the first empty mark`);
    await push(page); s = await state(page);
    is(s.misses === 1 && s.marks[0] === null && s.marks[1] === null && [...Array(n).keys()].slice(2).every(i => s.marks[i] === 'd' + i) && (await note(page)) === T('hintStay'), `${r.id}: the in-place dominoes stay, the others bounce`);
    await dragTo(page, LOOSE('d0'), 0); await tap(page, LOOSE('d1')); s = await state(page);
    is(s.marks[0] === 'd0' && s.marks[1] === 'd1', `${r.id}: d0 dragged onto the first mark, d1 tapped`);
    await push(page);
    await finish(page, r);
  }
  /* the trick domino; miss 2 pins */
  for (const r of C.rounds('order').slice(5, 8)) {
    await okRun(page); await force(page, 'order', r.id, { decoy: 'yes' });
    let s = await state(page); const n = r.w.syl.length;
    is(s.box.includes('x') && (await page.evaluate(() => document.querySelectorAll('.drn-loose').length)) === n + 1, `${r.id}: the trick domino "${r.decoy}" in the box`);
    await tap(page, LOOSE('x')); for (let i = 1; i < n; i++) await tap(page, LOOSE('d' + i));
    await push(page); s = await state(page); is(s.last.result === 'decoy' && (await note(page)) === T('hintDecoy') && s.box.includes('x'), `${r.id}: the trick domino bounces`);
    await tap(page, LOOSE('x')); await push(page); s = await state(page);
    is(s.help === 2 && s.marks[0] === 'd0' && s.pinned.includes(0) && (await page.evaluate(() => !!document.querySelector('.drn-dom.is-pinned'))) && (await note(page)) === T('hintFirst', { first: r.w.syl[0] }), `${r.id}: miss 2 — the first syllable stands itself, pinned`);
    await tap(page, DOM('d0')); is((await state(page)).marks[0] === 'd0', `${r.id}: a pinned domino stays`);
  }
  /* ¿Cuántas fichas? */
  for (const r of C.rounds('count')) {
    await okRun(page); await force(page, 'count', r.id);
    let s = await state(page); const n = r.w.syl.length;
    is(s.blanks === 0 && (await page.evaluate(() => document.querySelectorAll('.drn-loose').length)) === 6, `${r.id}: six blank dominoes in the box`);
    await push(page); is((await state(page)).misses === 0 && (await note(page)) === T('hintCount'), `${r.id}: ¡Empuja! untouched asks`);
    let miss = 0;
    if (n > 1) {
      for (let i = 0; i < n - 1; i++) { if (i % 2) await tap(page, '.drn-loose'); else await tapTable(page); }
      is((await state(page)).blanks === n - 1, `${r.id}: ${n - 1} blanks standing (table and box taps)`);
      await page.evaluate(() => { window.DominoRunActivity.HOLD_MS = 60000; window.DominoRunActivity.FAST = false; });
      await tap(page, '.drn-check'); await page.waitForFunction(() => !!document.querySelector('.drn-fallen'), { timeout: 8000 });
      const crammed = await page.evaluate(() => (document.querySelector('.drn-flat.is-crammed span') || {}).textContent);
      is(crammed === r.w.syl.slice(n - 2).join('·') && (await note(page)) === T('hintShort'), `${r.id}: one short — the last fallen tile carries ${crammed}`);
      await page.evaluate(() => { const A = window.DominoRunActivity; A.FAST = true; A.HOLD_MS = 1300; A._clearTimers(); A._view = null; A._busy = false; A._paint(); });
      miss++;
    }
    while ((await state(page)).blanks < n + 1) await tap(page, '.drn-loose');
    await push(page); s = await state(page); miss++;
    is(s.last.result === 'long' && (miss >= 2 ? (await note(page)) === T('hintClap') : (await note(page)) === T('hintLong')), `${r.id}: one too many — a blank (${miss >= 2 ? 'miss 2: clap' : 'hintLong'})`);
    if (miss >= 2) is((await page.evaluate(() => document.querySelectorAll('.drn-beat').length)) === n, `${r.id}: miss 2 — ${n} beats light above the run (visible with the sound off)`);
    await tap(page, DOM('b0')); s = await state(page); is(s.blanks === n, `${r.id}: a standing blank tapped back`);
    await push(page);
    await finish(page, r);
  }
  /* settings, keyboard */
  await page.evaluate(() => { window.DominoRunActivity.OK_MS = 60000; });
  await force(page, 'complete', 'complete-helicóptero', { letters: 'upper' });
  is((await page.evaluate(() => getComputedStyle(document.querySelector('.drn-dom .drn-face')).textTransform)) === 'uppercase', 'Letras: MAYÚSCULAS — the tiles are uppercase (accents kept by CSS)');
  await force(page, 'complete', 'complete-helicóptero', { letters: 'lower' }); is((await page.evaluate(() => getComputedStyle(document.querySelector('.drn-dom .drn-face')).textTransform)) === 'none', 'Letras: minúsculas');
  for (const [v, k] of [['no', 0], ['yes', 1]]) { await force(page, 'order', 'order-paraguas', { decoy: v }); is((await state(page)).box.length === 3 + k, `Ficha trampa: ${v} — ${3 + k} dominoes`); }
  await force(page, 'count', 'count-tigre'); await page.focus('.drn-wrap'); await page.keyboard.press('+'); await page.keyboard.press('+'); is((await state(page)).blanks === 2, '+ stands a blank');
  await page.keyboard.press('Backspace'); is((await state(page)).blanks === 1, 'Backspace takes one back');
  await force(page, 'order', 'order-paraguas'); await page.focus('.drn-loose'); const fid = await page.evaluate(() => document.activeElement.dataset.id);
  await page.keyboard.press('Enter'); is((await state(page)).marks[0] === fid, 'Enter stands a box domino on the first empty mark');
  await page.focus('.drn-wrap'); await page.keyboard.press('Backspace'); is((await state(page)).marks.every(x => x === null), 'Backspace takes the last domino back');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.DominoRunActivity.OK_MS = 60000; window.DominoRunActivity.HOLD_MS = 0; });
    const cases = C.rounds('complete').map(r => ['complete', r.id, null]).concat(C.rounds('order').map(r => ['order', r.id, { decoy: 'yes' }]), C.rounds('count').map(r => ['count', r.id, null]));
    for (const [lv, id, set] of cases) {
      await force(o.page, lv, id, set);
      const tag = `@${w} ${id}`;
      for (const phase of ['rest', 'miss', 'fallen', 'done']) {
        if (phase === 'miss') await o.page.evaluate(() => {
          const A = window.DominoRunActivity, C2 = window.DominoRunCore, st = A.st, r = st.r, n = r.w.syl.length;
          if (r.level === 'complete') { C2.stand(st, 'b'); C2.push(st); C2.stand(st, 'c'); C2.push(st); }
          else if (r.level === 'order') { C2.stand(st, 'x', 0); for (let i = 1; i < n; i++) C2.stand(st, 'd' + i, i); C2.push(st); C2.stand(st, 'x', 0); C2.push(st); }
          else { for (let i = 0; i < 6; i++) C2.standBlank(st); C2.push(st); while (st.blanks > Math.max(1, n - 1)) C2.unstandBlank(st); if (n === 1) C2.standBlank(st); C2.push(st); }
          A._view = null; A._busy = false; A._paint();
        });
        if (phase === 'fallen') await o.page.evaluate(() => {
          const A = window.DominoRunActivity, st = A.st, r = st.r, l = st.last || {};
          const f = r.level === 'count' ? l.printed.map(p => ({ text: p.join('·'), cls: p.length > 1 ? 'is-crammed' : !p.length ? 'is-blank' : '' })) : (l.fallen || r.w.syl).map(t => ({ text: t }));
          A._view = { fallen: f, closed: false, onTable: [] }; A._paint();
        });
        if (phase === 'done') await o.page.evaluate(() => {
          const A = window.DominoRunActivity, C2 = window.DominoRunCore, st = A.st, r = st.r; A._view = null; A._busy = false; A._clearTimers();
          if (r.level === 'complete') { C2.stand(st, 'a'); } else if (r.level === 'order') { st.pinned = []; for (let i = 0; i < st.marks.length; i++) if (st.marks[i]) C2.unstand(st, i); r.w.syl.forEach((_, i) => C2.stand(st, 'd' + i, i)); } else { while (st.blanks > r.w.syl.length) C2.unstandBlank(st); while (st.blanks < r.w.syl.length) C2.standBlank(st); }
          A._push();
        });
        await o.page.waitForFunction((ph) => ph !== 'done' || !!document.querySelector('.drn-word'), { timeout: 8000 }, phase).catch(() => {});
        await wait(60);
        if (phase === 'miss') { const s = await state(o.page); if (s.done || !s.misses) throw new Error('miss phase did not land on a miss: ' + id); }
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement, tb = document.querySelector('.drn-table').getBoundingClientRect();
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const doms = [...document.querySelectorAll('.drn-dom')].filter(vis), flats = [...document.querySelectorAll('.drn-flat')].filter(vis);
          const ctl = doms.concat([...document.querySelectorAll('.drn-loose,.drn-check:not([hidden]),.drn-pic')].filter(vis));
          const pics = [...document.querySelectorAll('.drn-pic img')].map(e => e.getBoundingClientRect().width);
          let hit = 0; for (let i = 0; i < doms.length; i++) for (let j = i + 1; j < doms.length; j++) { const a = doms[i].getBoundingClientRect(), b = doms[j].getBoundingClientRect(); if (a.left < b.right - 1 && b.left < a.right - 1) hit++; }
          const inside = (e) => { const b = e.getBoundingClientRect(); return b.left >= tb.left - 1 && b.right <= tb.right + 1 && b.top >= tb.top - 1 && b.bottom <= tb.bottom + 1; };
          const txt = [...document.querySelectorAll('.drn-face,.drn-flat span,.drn-word,.drn-wtile')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 - 0.5 || b.height < 44 - 0.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            onTable: doms.every(inside) && flats.every(inside), hit, txt: txt.length ? Math.min(...txt) : 99,
            pic: pics.length ? Math.min(...pics) : 999, low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.pic >= minPic - 0.5, `${tag} ${phase}: no sideways scroll, controls ≥ 44 inside the card, pictures ≥ ${minPic} (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, pic ${Math.round(m.pic)})`);
        is(m.onTable && m.hit === 0 && m.txt >= 14, `${tag} ${phase}: dominoes and fallen tiles on the table, standing dominoes never touch, text ≥ 14 px (table ${m.onTable}, hit ${m.hit}, txt ${m.txt})`);
        is(m.low <= m.H, `${tag} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['complete-mariposa', 'order-zanahoria', 'count-hipopótamo'].includes(id)) await o.page.screenshot({ path: path.join(SHOT, `es-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors (${o.errs.slice(0, 2).join(' | ')})`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-domino-run: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
