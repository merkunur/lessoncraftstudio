#!/usr/bin/env node
/* =====================================================================
   local-test-flip-card.js — the interaction gate for ACTIVITY #56,
   Pepper's Flip Card (RF.K.2.e, 11 locales). Real pointer at 704, every
   round of every level a locale shows:
     predict (first / other / add) — Check with no picture asks (no miss);
       the "nearly" picture TAPPED → the card flips to the real new word,
       the guess shows its tiles with the differing tile marked (miss 1);
       the third picture → miss 2: the slot to change pulses; the answer →
       right, celebrates;
     swap — Check with the card unchanged asks; a wrong tile DRAGGED onto a
       slot → the old tile pops out and the card flips to exactly the word
       its tiles now make (or the grey blank card); Check → miss, the goal's
       tiles line up and the differing one glows; the goal's tile DRAGGED
       onto the right slot → right;
     chain — every step: the step's tile tapped then its slot tapped → the
       goal moves on, a ticket on the strip; the last step → right.
   Also: the per-locale Level options, the keyboard. And the width sweep
   (all locales at 320 / 704 / 1366, en at 320–1366) for every level at
   rest and after a miss: no sideways scroll, controls ≥ 44 px inside the
   card, pictures ≥ 96 / 64 px, text ≥ 14 px, Check above the fold.
   Usage: node scripts/local-test-flip-card.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const ID = 'pepper-sound-swap.substitute.rf-k-2-e';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'flip-card-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, FlipCardCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'flip-card-activity.js'), 'utf8') + '\n;this.__A = FlipCardActivity;', ctx); return ctx.__A; })();
const STR = ACT.strings;
const Q = (loc, s) => (ACT.QUOTES[loc] || ACT.QUOTES.en)[0] + s + (ACT.QUOTES[loc] || ACT.QUOTES.en)[1];
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(root, file) { const parts = path.relative(root, file).split(path.sep); let cur = root; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); let root = MINI, file; if (p.startsWith('/image-library-webp/')) { root = IMG; file = path.join(IMG, p.slice(20)); } else file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, '')); if (!exact(root, file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/flip-card-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FlipCardActivity && window.FlipCardActivity.st && document.querySelector('.fcd-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.FlipCardActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.FlipCardActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, guess: s.guess, layout: s.layout, trayOrder: s.trayOrder, card: s.card, step: s.step, goal: s.goal && s.goal.word, reached: s.reached, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.fcd-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(40); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 10; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 10, a.y + (b.y - a.y) * k / 10);
    await page.mouse.up(); await wait(60);
  }
  async function force(page, lv, id) {
    await page.evaluate((lv, id) => { const a = window.FlipCardActivity; a.FAST = true; a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id);
    await wait(80);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function check(page) { await tap(page, '.fcd-check'); await page.waitForFunction(() => !window.FlipCardActivity._busy, { timeout: 8000 }); await wait(40); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = (page) => page.evaluate(() => { window.FlipCardActivity.OK_MS = 0; });
  const cardWord = (page) => page.evaluate(() => { const c = document.querySelector('.fcd-card'); return { blank: c.classList.contains('is-blank'), label: c.getAttribute('aria-label') }; });

  for (const loc of LOCS) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === STR.title[loc], `${loc}: the title`);
    is((await page.evaluate(() => window.FlipCardActivity.settings[0].options.map(o => o.value).join())) === C.levels(loc).join(), `${loc}: Level options ${C.levels(loc).join(',')}`);
    for (const lv of C.levels(loc)) for (const r of C.rounds(loc, lv)) {
      await okRun(page); await force(page, lv, r.id);
      const tag = `${loc} ${r.id}`;
      let s = await state(page);
      if (r.choices) {
        is((await page.evaluate(() => document.querySelectorAll('.fcd-choice').length)) === 3 && (await page.evaluate(() => document.querySelector('.fcd-tile.is-new').textContent)) === r.tile.g, `${tag}: Pepper's tile ${r.tile.g}, three pictures`);
        await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintPick'), `${tag}: Check with no picture asks`);
        const sl = (i) => s.layout.indexOf(i);
        await tap(page, `.fcd-choice[data-i="${sl(1)}"]`); await check(page); s = await state(page);
        const mini = await page.evaluate(() => ({ n: document.querySelectorAll('.fcd-mini .fcd-mtile').length, d: document.querySelectorAll('.fcd-mini .fcd-mtile.is-diff').length }));
        is(s.misses === 1 && s.last.face && s.last.face.word === r.answer.word && mini.n >= r.choices[1].tiles.length && mini.d >= 1 && (await note(page)) === T(loc, 'hintTurned', { result: r.answer.word, guess: r.choices[1].word }), `${tag}: "${r.choices[1].word}" — the card shows ${r.answer.word}, the guess shows its tiles (${mini.d} marked)`);
        await tap(page, `.fcd-choice[data-i="${sl(2)}"]`); await check(page); s = await state(page);
        const need = await page.evaluate(() => document.querySelectorAll('.fcd-tile.is-need').length);
        is(s.misses === 2 && (r.level === 'add' || need === 1) && (await note(page)) === T(loc, r.level === 'add' ? 'hintHelpAdd' : 'hintHelp', { start: r.start.word, tile: Q(loc, r.tile.g) }), `${tag}: miss 2 — the slot to change (${need})`);
        await tap(page, `.fcd-choice[data-i="${sl(0)}"]`); await check(page); s = await state(page);
        const cw = await cardWord(page);
        is(s.done && !cw.blank && cw.label === T(loc, 'ariaCard', { word: r.answer.word }), `${tag}: the answer — the card shows ${r.answer.word}`);
        is(await celebrated(page), `${tag}: celebrates`);
      } else if (lv === 'swap') {
        await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintSwapOne'), `${tag}: Check with the card unchanged asks`);
        const p = r.start.keys.findIndex((k, i) => k !== r.goal.keys[i]);
        const trayNow = s.trayOrder.map(i => r.tray[i]), gi = trayNow.findIndex(t => t.k === r.goal.keys[p] && t.g === r.goal.tiles[p]);
        const wi = trayNow.findIndex((t, i) => i !== gi && t.k !== r.start.keys[p]);
        await drag(page, `.fcd-tile.is-tray[data-i="${wi}"]`, `.fcd-tile.is-slot[data-slot="${p}"]`); s = await state(page);
        const want = C.lookup(loc, C.apply(r.start, p, trayNow[wi]).keys), cw = await cardWord(page);
        is(s.card.tiles[p] === trayNow[wi].g && (want ? (!cw.blank && cw.label === T(loc, 'ariaCard', { word: want.word })) : cw.blank), `${tag}: ${trayNow[wi].g} dragged in — the card flips to ${want ? want.word : 'a blank card'}`);
        await check(page); s = await state(page);
        const diff = await page.evaluate(() => document.querySelectorAll('.fcd-tile.is-slot.is-diff').length);
        is(s.misses === 1 && diff === 1 && (await note(page)).indexOf(r.goal.word) >= 0, `${tag}: a miss — the differing tile glows`);
        await drag(page, `.fcd-tile.is-tray[data-i="${gi}"]`, `.fcd-tile.is-slot[data-slot="${p}"]`); await check(page); s = await state(page);
        is(s.done && (await celebrated(page)), `${tag}: the goal`);
      } else {
        for (let st = 0; st < r.words.length - 1; st++) {
          s = await state(page);
          const a = r.words[st], b = r.words[st + 1], p = a.keys.findIndex((k, i) => k !== b.keys[i]);
          const trayNow = s.trayOrder.map(i => r.trays[st][i]), gi = trayNow.findIndex(t => t.k === b.keys[p] && t.g === b.tiles[p]);
          await tap(page, `.fcd-tile.is-tray[data-i="${gi}"]`); await tap(page, `.fcd-tile.is-slot[data-slot="${p}"]`); await check(page); s = await state(page);
          if (st < r.words.length - 2) is(s.step === st + 1 && s.goal === r.words[st + 2].word && (await page.evaluate(() => document.querySelectorAll('.fcd-ticket').length)) === st + 2, `${tag}: step ${st + 1} — ${b.word}, the goal moves on`);
          else is(s.done && (await celebrated(page)), `${tag}: the chain ends at ${b.word}`);
        }
      }
    }
    /* keyboard */
    await page.evaluate(() => { window.FlipCardActivity.OK_MS = 60000; });
    const r0 = C.rounds(loc, 'first')[0]; await force(page, 'first', r0.id);
    await page.focus('.fcd-wrap'); await page.keyboard.press('ArrowRight'); let s = await state(page);
    is(s.guess === 0, `${loc}: → chooses a picture`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    await page.evaluate(() => { window.FlipCardActivity.OK_MS = 60000; });
    for (const lv of C.levels(loc)) {
      const R = C.rounds(loc, lv), r = R.slice().sort((a, b) => (b.words || [b.start]).concat(b.choices || []).reduce((m, x) => Math.max(m, x.tiles.length), 0) - (a.words || [a.start]).concat(a.choices || []).reduce((m, x) => Math.max(m, x.tiles.length), 0))[0];
      await force(page, lv, r.id);
      for (const phase of ['rest', 'miss']) {
        if (phase === 'miss') await page.evaluate(() => {
          const A = window.FlipCardActivity, K = window.FlipCardCore, st = A.st, r = st.r;
          if (r.choices) { K.guess(st, st.layout.indexOf(1)); K.check(st); K.guess(st, st.layout.indexOf(2)); K.check(st); }
          else { const tr = K.trayOf(st); const p = K.diffAt(st.card.keys, st.goal.keys)[0]; const i = tr.findIndex(t => t.k !== st.goal.keys[p] && t.k !== st.card.keys[p]); K.put(st, p, i); K.check(st); K.check(st); }
          A._busy = false; A._view = {}; A._paint();
        });
        await wait(60);
        const tag = `@${w} ${loc} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.fcd-tile:not(.is-ghost),.fcd-choice,.fcd-check:not([hidden])')].filter(vis);
          const txt = [...document.querySelectorAll('.fcd-tile,.fcd-mtile,.fcd-note,.fcd-letters')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.fcd-face img,.fcd-choice img,.fcd-goal img')].filter(vis).map(e => e.getBoundingClientRect().width);
          const chk = document.querySelector('.fcd-check:not([hidden])');
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out})`);
        is(m.pic >= minPic - 0.5 && m.txt >= 14, `${tag}: pictures ≥ ${minPic} (${Math.round(m.pic)}), text ≥ 14 (${m.txt})`);
        is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-flip-card: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
