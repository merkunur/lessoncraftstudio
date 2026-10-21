#!/usr/bin/env node
/* =====================================================================
   local-test-otto-picture-book.js — the interaction gate for ACTIVITY
   #67, Otto's proof pins (Otto's Picture Book, RL.K.7, 11 locales). Real
   pointer at 704, every round of every task, every locale, both
   Sentences settings:
     Which picture? — the strip TAPPED onto a wrong panel and checked →
     the words the panel does not show dangle, the hint (miss 1); the
     strip DRAGGED to another wrong panel → miss 2, the right panel is
     pointed at; the strips tapped onto their panels → every pin sticks,
     the shell celebrates with the success text.
     Fill the blank — a wrong word tapped (or the letters in a wrong
     order) → the blank's pin dangles, the hint; a wrong word DRAGGED to
     the blank (or a second wrong spelling) → miss 2, the right word
     glows / is spelled for the child; the right word → celebrates.
     Read and color — a pot and a tile painted wrong → the hint names
     the thing, color or place; miss 2 rings the right tiles; the right
     painting → celebrates.
     True or false? — the wrong ✓/✗ → hint; checked again → the pins
     fire; the right one → celebrates (okTrue / okFalse).
   Once per locale: the keyboard docks a strip by panel number; an empty
   check names the empty task and is not a miss. The width sweep (all
   locales at 320 / 704 / 1366, en at 320–1366), every task × setting on
   its longest round at rest, miss 2 and won: no sideways scroll, every
   control ≥ 44 inside the card, text ≥ 14, every picture ≥ 96 (≥ 64 on a
   phone), the Check button above the fold.
   Usage: node scripts/local-test-otto-picture-book.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'otto-picture-book.which-picture.rl-k-7';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '067-proof-pins', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'otto-pins-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, OttoPinsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'otto-picture-book-activity.js'), 'utf8') + '\n;this.__A = OttoPictureBookActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
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
    await page.goto(`${base}/otto-picture-book-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.OttoPictureBookActivity && window.OttoPictureBookActivity.st && document.querySelector('.op-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.OttoPictureBookActivity; a.FAST = true; a.OK_MS = 60000; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.OttoPictureBookActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, docks: s.docks, bank: s.bank, choice: s.choice, paint: s.paint, misses: s.misses, help: s.help, done: s.done, last: s.last, spelled: s.spelled, tiles: s.tiles })); });
  const note = (page) => page.evaluate(() => document.querySelector('.op-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 14; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 14, a.y + (b.y - a.y) * k / 14);
    await page.mouse.up(); await wait(50);
  }
  async function force(page, task, parts, key) {
    await page.evaluate((task, parts, key) => { const a = window.OttoPictureBookActivity; a.api.settings.task = task; a.api.settings.parts = parts; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.story === key || r.key === key); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; a._deal = null; window.LCS_reloadFirstTask(); }, task, parts, key);
    await wait(40);
  }
  const settle = (page) => page.waitForFunction(() => !window.OttoPictureBookActivity._busy, { timeout: 15000 }).catch(() => {});
  const check = async (page) => { await tap(page, '.op-check'); await settle(page); };
  const won = async (page) => { await page.evaluate(() => { window.OttoPictureBookActivity.OK_MS = 0; }); await check(page); const c = await page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false); const b = await page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; }); await page.evaluate(() => { window.OttoPictureBookActivity.OK_MS = 60000; }); return { c, b }; };
  const dangles = (page) => page.evaluate(() => [...document.querySelectorAll('.op-word.is-dangle')].map(w => w.getAttribute('data-tag')).concat(document.querySelector('.op-blank.is-dangle') ? ['_blank'] : []));

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.OttoPictureBookActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'task:which,fill,color,tf | parts:one,two', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);
    for (const parts of ['one', 'two']) {
      const two = parts === 'two';
      /* Which picture? */
      for (const r of C.rounds(loc, 'which', two)) {
        const id = `${loc} ${r.id}`; await force(page, 'which', parts, r.story);
        const w0 = r.strips.map(s => (s.target + 1) % 4), w1 = r.strips.map(s => (s.target + 2) % 4);
        for (let k = 0; k < r.strips.length; k++) { await tap(page, `[data-strip="${k}"]`); await tap(page, `[data-panel="${w0[k]}"]`); }
        await check(page); let s = await state(page);
        const d1 = await dangles(page), want1 = r.strips.flatMap((x, k) => C.pinsAgainst(x.tokens, r.panels[w0[k]].f).filter(p => !p.stuck).map(p => p.tag));
        is(s.misses === 1 && (await note(page)) === T(loc, 'hintWhich') && JSON.stringify(d1.sort()) === JSON.stringify(want1.sort()), `${id}: tapped onto wrong panels — the unshown words dangle (${d1}), the hint (miss 1)`);
        await drag(page, `[data-strip="0"]`, `[data-panel="${w1[0]}"]`); s = await state(page);
        is(s.docks[0] === w1[0], `${id}: strip 1 dragged onto panel ${w1[0] + 1}`);
        await check(page); s = await state(page);
        is(s.misses === 2 && (await note(page)) === T(loc, 'hintWhich2') && await page.evaluate(() => !!document.querySelector('.op-panel.is-point')), `${id}: miss 2 — the right panel is pointed at`);
        for (let k = 0; k < r.strips.length; k++) { await tap(page, `[data-strip="${k}"]`); await tap(page, `[data-panel="${r.strips[k].target}"]`); }
        const w = await won(page); s = await state(page);
        is(s.done && w.c && w.b.includes(T(loc, 'okWhich')), `${id}: every pin sticks — the shell celebrates (${w.b})`);
      }
      /* Fill the blank */
      for (const r of C.rounds(loc, 'fill', two)) {
        const id = `${loc} ${r.id}`; await force(page, 'fill', parts, r.key); let s = await state(page);
        if (r.letters) {
          const word = Array.from(r.word), order = s.tiles.map((_, i) => i).filter(i => s.tiles[i] !== word[0]).slice(0, word.length);
          for (const i of order) await tap(page, `[data-letter="${i}"]`);
          await check(page); s = await state(page);
          is(s.misses === 1 && (await note(page)) === T(loc, 'hintFill') && s.spelled.every(x => x === null), `${id}: a wrong spelling — the hint, the letters go back to the tray`);
          for (const i of order) await tap(page, `[data-letter="${i}"]`);
          await tap(page, `[data-letter="${order[0]}"]`); s = await state(page);
          is(s.spelled[0] === null && s.spelled.slice(1).every(x => x !== null), `${id}: a used letter tapped again comes back out of its box`);
          await tap(page, `[data-letter="${order[0]}"]`);
          await check(page); s = await state(page);
          is(s.misses === 2 && (await note(page)) === T(loc, 'hintSpell2') && await page.evaluate((n) => document.querySelectorAll('.op-box.is-ghost').length === n, word.length), `${id}: miss 2 — the grey letters show the word`);
          for (const ch of word) { const i = s.tiles.findIndex((t, q) => t === ch && s.spelled.indexOf(q) < 0); await tap(page, `[data-letter="${i}"]`); s = await state(page); }
          is(s.spelled.map(i => s.tiles[i]).join('') === r.word, `${id}: the letters tapped spell ${r.word}`);
        } else {
          const wrongSlots = [0, 1, 2].filter(q => s.bank[q] !== 0), right = s.bank.indexOf(0);
          await tap(page, `[data-word="${wrongSlots[0]}"]`); await check(page); s = await state(page);
          is(s.misses === 1 && (await note(page)) === T(loc, 'hintFill') && (await dangles(page)).includes('_blank'), `${id}: «${r.bank[s.bank[wrongSlots[0]]].word}» — the blank's pin dangles, the hint`);
          await drag(page, `[data-word="${wrongSlots[1]}"]`, '.op-blank'); s = await state(page);
          is(s.choice === wrongSlots[1], `${id}: a word dragged into the blank`);
          await check(page); s = await state(page);
          is(s.misses === 2 && (await note(page)) === T(loc, 'hintFill2') && await page.evaluate((q) => document.querySelector(`[data-word="${q}"]`).classList.contains('is-glow'), right), `${id}: miss 2 — the right word glows`);
          await tap(page, `[data-word="${right}"]`);
        }
        const w = await won(page); s = await state(page);
        is(s.done && w.c && w.b.includes(T(loc, 'okFill')), `${id}: the right word — every pin sticks, celebrates`);
      }
      /* Read and color */
      for (const r of C.rounds(loc, 'color', two)) {
        const id = `${loc} ${r.id}`; await force(page, 'color', parts, r.key);
        const right = C.rightTiles(r), wrongTile = r.tiles.findIndex((n, i) => !right[i]);
        await tap(page, '[data-pot="brown"]' === `[data-pot="${right[wrongTile]}"]` ? '[data-pot="red"]' : '[data-pot="' + (r.parts[0].col === 'brown' ? 'red' : 'brown') + '"]');
        await tap(page, `[data-tile="${wrongTile}"]`);
        await check(page); let s = await state(page);
        const n1 = await note(page);
        is(s.misses === 1 && n1 && n1 !== T(loc, 'instrColor'), `${id}: a wrong tile painted — a hint (${n1})`);
        await check(page); s = await state(page);
        is(s.misses === 2 && (await note(page)) === T(loc, 'hintColor2') && await page.evaluate(() => document.querySelectorAll('.op-ctile.is-ring').length > 0), `${id}: miss 2 — the right tiles are ringed`);
        s = await state(page); if (await page.evaluate((c) => !document.querySelector(`[data-pot="${c}"]`).classList.contains('is-sel'), s.paint[wrongTile])) await tap(page, `[data-pot="${s.paint[wrongTile]}"]`);
        await tap(page, `[data-tile="${wrongTile}"]`);
        for (const [i, c] of Object.entries(right)) { s = await state(page); if (await page.evaluate((c) => !document.querySelector(`[data-pot="${c}"]`).classList.contains('is-sel'), c)) await tap(page, `[data-pot="${c}"]`); await tap(page, `[data-tile="${i}"]`); }
        s = await state(page);
        is(JSON.stringify(s.paint) === JSON.stringify(right), `${id}: painted as the sentence says`);
        const w = await won(page); s = await state(page);
        is(s.done && w.c && w.b.includes(T(loc, 'okColor')), `${id}: the right painting — celebrates`);
      }
      /* True or false? */
      for (const r of C.rounds(loc, 'tf', two)) {
        const id = `${loc} ${r.id}`; await force(page, 'tf', parts, r.key);
        await tap(page, `[data-tf="${r.truth ? 0 : 1}"]`); await check(page); let s = await state(page);
        is(s.misses === 1 && (await note(page)) === T(loc, 'hintTF'), `${id}: the wrong answer — the hint`);
        await check(page); s = await state(page);
        const want = C.pinsAgainst(r.tokens, r.scene.f).filter(p => !p.stuck).map(p => p.tag);
        is(s.misses === 2 && (await note(page)) === T(loc, 'hintTF2') && JSON.stringify((await dangles(page)).sort()) === JSON.stringify(want.sort()), `${id}: miss 2 — the pins fire, the unshown words dangle (${want})`);
        await tap(page, `[data-tf="${r.truth ? 1 : 0}"]`);
        const w = await won(page); s = await state(page);
        is(s.done && w.c && w.b.includes(T(loc, r.truth ? 'okTrue' : 'okFalse')), `${id}: the right answer — celebrates`);
      }
    }
    {
      const r = C.rounds(loc, 'which', false)[3]; await force(page, 'which', 'one', r.story);
      await check(page); let s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'emptyWhich'), `${loc}: an empty check names the empty task and is not a miss`);
      await page.focus('.op-wrap'); await page.keyboard.press(String(r.strips[0].target + 1)); s = await state(page);
      is(s.docks[0] === r.strips[0].target, `${loc}: keyboard — the panel number docks the strip`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  const len = (r) => r.task === 'which' ? r.strips.reduce((x, s) => x + C.plain(s.tokens).length, 0) : C.plain(r.tokens).length + (r.letters ? 20 : 0) + (r.bank ? r.bank.reduce((x, b) => x + b.word.length, 0) : 0) + (r.tiles ? r.tiles.length * 3 : 0);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const task of C.TASKS) for (const parts of ['one', 'two']) {
      const R = C.rounds(loc, task, parts === 'two'), r = R.slice().sort((a, b) => len(b) - len(a))[0];
      await force(page, task, parts, r.story || r.key);
      for (const phase of ['rest', 'miss2', 'won']) {
        await page.evaluate((phase) => {
          const A = window.OttoPictureBookActivity, K = window.OttoPinsCore, st = K.newState(A.st.r, { bank: A.st.bank, letters: A.st.tiles }), r = st.r;
          const wrong = () => {
            if (st.task === 'which') r.strips.forEach((s, k) => K.dock(st, k, (s.target + 1) % 4));
            if (st.task === 'fill') { if (r.letters) st.tiles.slice(0, st.spelled.length).forEach((_, i) => K.putLetter(st, i)); else K.choose(st, st.bank.indexOf(1)); }
            if (st.task === 'tf') K.chooseTF(st, !r.truth);
            if (st.task === 'color') { const rt = K.rightTiles(r), wt = r.tiles.findIndex((n, i) => !rt[i]); K.pickPot(st, 'brown'); K.paint(st, wt); }
          };
          if (phase !== 'rest') { wrong(); K.check(st); if (r.letters) { st.spelled = st.spelled.map(() => null); wrong(); } K.check(st); if (r.letters) st.spelled = st.spelled.map(() => null); }
          if (phase === 'won') {
            if (st.task === 'which') r.strips.forEach((s, k) => K.dock(st, k, s.target));
            if (st.task === 'fill') { if (r.letters) { st.spelled = st.spelled.map(() => null); Array.from(r.word).forEach(c => K.putLetter(st, st.tiles.findIndex((t, i) => t === c && st.spelled.indexOf(i) < 0))); } else K.choose(st, st.bank.indexOf(0)); }
            if (st.task === 'tf') K.chooseTF(st, r.truth);
            if (st.task === 'color') st.paint = K.rightTiles(r);
            K.check(st);
          }
          A.st = st; A._busy = false; A._view = phase === 'won' ? { msg: 'won' } : {}; A._paint();
        }, phase);
        await wait(50);
        const tag = `@${w} ${loc} ${task}-${parts} ${r.story || r.key} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.op-wrap button')].filter(vis);
          const txt = [...document.querySelectorAll('.op-note,.op-strip,.op-tile,.op-word')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.op-wrap img')].filter(vis).map(i => Math.min(i.getBoundingClientRect().width, i.getBoundingClientRect().height));
          const chk = document.querySelector('.op-check').getBoundingClientRect();
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: chk.bottom + scrollY, H: innerHeight
          };
        });
        const floor = w >= 700 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.txt >= 14 && m.pic >= floor - .5, `${tag}: text ≥ 14 (${m.txt}), every picture ≥ ${floor} (${Math.round(m.pic)})`);
        is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${task}${parts}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-otto-picture-book: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
