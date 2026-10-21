#!/usr/bin/env node
/* =====================================================================
   local-test-picture-bingo.js — the interaction gate for ACTIVITY #62,
   Bingo's Picture Card (RF.K.3.d, 11 locales). Real pointer at 704, every
   level, EVERY round:
     Card levels — Check with no chip asks (no miss) and the call card
     wiggles; a chip TAPPED onto a look-alike slides off (miss 1) with its
     differing letters (or syllable) lit; the tray chip DRAGGED onto another
     word slides off (miss 2) and everything but the right word, its two
     nearest and the chosen one dims; a third miss pulses the right square;
     the chip on the right word flips it into its picture and the shell
     celebrates with the word.
     You call — Check with the slot empty asks; a decoy card → Bingo covers
     the decoy (miss); a nonsense card → he shrugs (miss 2, the needed word
     ghosts in); the right card → BINGO.
   Once per locale: a full card names the leftovers; First letter shows the
   tab; the options; the arrow keys walk the card. At 360: the four-wide
   card turns on its side. The width sweep (all locales at 320 / 704 / 1366,
   en at 320–1366), every level at rest, chipped, miss 2 and won: no
   sideways scroll, controls ≥ 44 inside the card, text ≥ 14, the call
   picture ≥ 96 (88 at 320), card pictures at their measured floors, Check
   above the fold.
   Usage: node scripts/local-test-picture-bingo.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'bingo-word-hunt.read-match.rf-k-3-d';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '062-picture-bingo', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'picture-bingo-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PictureBingoCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'picture-bingo-activity.js'), 'utf8') + '\n;this.__A = PictureBingoActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const Q = (loc, w) => { const q = ACT.QUOTES[loc] || ACT.QUOTES.en; return q[0] + w + q[1]; };
const fill = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
const low = (s) => String(s).normalize('NFC').toLocaleLowerCase();
/* the gate's own edit distance and look-alike */
const ed = (a, b) => { a = [...low(a)]; b = [...low(b)]; const d = []; for (let i = 0; i <= a.length; i++) { d[i] = [i]; for (let j = 1; j <= b.length; j++) d[i][j] = i ? Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) : j; } return d[a.length][b.length]; };
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
    await page.goto(`${base}/picture-bingo-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PictureBingoActivity && window.PictureBingoActivity.st && document.querySelector('.pbg-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.PictureBingoActivity.FAST = true; window.PictureBingoActivity.OK_MS = 60000; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.PictureBingoActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, chip: s.chip, slot: s.slot, misses: s.misses, help: s.help, done: s.done, last: s.last, covered: s.covered, bingo: s.bingo, flipped: s.cs ? s.cs.flipped : null, hand: s.hand })); });
  const note = (page) => page.evaluate(() => document.querySelector('.pbg-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 12; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 12, a.y + (b.y - a.y) * k / 12);
    await page.mouse.up(); await wait(50);
  }
  const sq = (i) => `.pbg-sq[data-sq="${i}"]`;
  const wc = (w) => `.pbg-wcard[data-word="${w.replace(/"/g, '\\"')}"]`;
  async function force(page, level, id) {
    await page.evaluate((level, id) => { const a = window.PictureBingoActivity; a.api.settings.level = level; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; a._cards = {}; a._deal = null; window.LCS_reloadFirstTask(); }, level, id);
    await wait(70);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function check(page) { await tap(page, '[data-k="check"]'); await page.waitForFunction(() => !window.PictureBingoActivity._busy, { timeout: 15000 }); await wait(30); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
  async function win(page, id, must) {
    await page.evaluate(() => { window.PictureBingoActivity.OK_MS = 0; });
    await check(page); const s = await state(page);
    is(s.done && await celebrated(page), `${id}: right → the shell celebrates`);
    const b = await bubble(page);
    is(b && !/\{\w+\}/.test(b) && must.every(x => b.includes(x)), `${id}: the success text is filled and names ${must.join(' / ')} («${b}»)`);
    await page.evaluate(() => { window.PictureBingoActivity.OK_MS = 60000; });
  }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.PictureBingoActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'level:' + C.levels(loc).join(',') + ' | read:pic,letter', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);

    for (const lv of C.levels(loc).filter(v => v !== 'call')) for (const r of C.rounds(loc, lv)) {
      const id = `${loc} ${lv} ${r.id}`, card = r.card;
      await force(page, lv, r.id);
      is(await page.evaluate(() => document.querySelectorAll('.pbg-card .pbg-sq').length) === card.sq.length && await page.evaluate((p) => (document.querySelector('.pbg-callpic') || {}).getAttribute('src').includes(p.split('/').pop() + '@2x.webp'), r.pic), `${id}: ${card.sq.length} squares, the call card shows ${r.pic}`);
      await check(page); let s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmpty'), `${id}: Check with no chip asks, no miss`);
      const others = card.sq.filter(x => x.i !== r.sq).sort((a, b) => ed(a.word, r.word) - ed(b.word, r.word) || a.i - b.i);
      const w1 = others[0], w2 = others[1];
      await tap(page, sq(w1.i)); s = await state(page);
      is(s.chip === w1.i && await page.evaluate((i) => !!document.querySelector(`.pbg-sq[data-sq="${i}"] .pbg-chip`), w1.i), `${id}: a chip on «${w1.word}»`);
      await check(page); s = await state(page);
      const lit = await page.evaluate((i) => document.querySelectorAll(`.pbg-sq[data-sq="${i}"] .is-diff`).length, w1.i);
      const want = r.card.sq[r.sq].syll && w1.syll ? C.sylDiff(r.card.sq[r.sq].syll, w1.syll).length : (d => d.glow.length + d.extra.length)(C.diff(r.word, w1.word));
      is(s.misses === 1 && s.chip === null && lit === want && (await note(page)) === T(loc, lv === 'syll' ? 'hintMissSyl' : 'hintMiss'), `${id}: «${w1.word}» slides off → miss 1, ${lit}/${want} lit`);
      await drag(page, '[data-k="tray"]', sq(w2.i)); s = await state(page);
      is(s.chip === w2.i, `${id}: the tray chip dragged onto «${w2.word}»`);
      await check(page); s = await state(page);
      const bright = await page.evaluate(() => [...document.querySelectorAll('.pbg-card .pbg-sq:not(.is-dim)')].map(e => +e.getAttribute('data-sq')).sort((a, b) => a - b));
      const near2 = card.sq.filter(x => x.i !== r.sq).sort((a, b) => ed(a.word, r.word) - ed(b.word, r.word) || a.i - b.i).slice(0, 2).map(x => x.i);
      const wantBright = [...new Set([r.sq, w2.i].concat(near2))].sort((a, b) => a - b);
      is(s.misses === 2 && bright.join() === wantBright.join() && (await note(page)) === T(loc, lv === 'syll' ? 'hintMiss2Syl' : 'hintMiss2'), `${id}: miss 2 — bright ${bright} (want ${wantBright})`);
      await tap(page, sq(w1.i)); await check(page);
      is(await page.evaluate((i) => !!document.querySelector(`.pbg-sq.is-pulse[data-sq="${i}"]`), r.sq), `${id}: miss 3 pulses the right square`);
      await tap(page, sq(r.sq));
      await win(page, id, [r.word]);
      is(await page.evaluate((i, f) => { const e = document.querySelector(`.pbg-sq.is-flip[data-sq="${i}"] img`); return !!e && e.getAttribute('src').includes(f); }, r.sq, r.pic.split('/').pop() + '@2x.webp'), `${id}: «${r.word}» flips into its picture`);
    }

    /* You call, every round */
    for (const r of C.rounds(loc, 'call')) {
      const id = `${loc} call ${r.id}`;
      await force(page, 'call', r.id);
      let s = await state(page);
      is(s.hand && s.hand.length === 3 && await page.evaluate(() => document.querySelectorAll('.pbg-hand .pbg-wcard').length) === 3 && await page.evaluate(() => document.querySelectorAll('.pbg-ycard .pbg-ysq').length) === 9, `${id}: three word cards, nine pictures (${(s.hand || []).join(' ')})`);
      await check(page); s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmptyCall'), `${id}: Check with the slot empty asks`);
      const dec = r.decoys[0] ? r.decoys[0].word : null, none = r.hand.find(w => w !== r.need && !r.decoys.some(d => d.word === w));
      let miss = 0;
      if (dec) {
        await tap(page, wc(dec)); s = await state(page); is(s.slot === dec, `${id}: «${dec}» in the slot`);
        await check(page); s = await state(page); miss++;
        is(s.misses === miss && s.last.result === 'decoy' && await page.evaluate(() => document.querySelectorAll('.pbg-ysq.is-chipped').length) === 3 && (await note(page)) === fill(T(loc, 'hintCallDecoy'), { got: Q(loc, dec), need: Q(loc, r.need) }), `${id}: «${dec}» → Bingo covers the decoy`);
      }
      if (none) {
        await tap(page, wc(none)); await check(page); s = await state(page); miss++;
        is(s.misses === miss && s.last.result === 'none' && (await note(page)) === fill(T(loc, miss >= 2 ? 'hintCall2' : 'hintCallNone'), { got: Q(loc, none), need: Q(loc, r.need) }), `${id}: «${none}» → nothing to cover`);
        if (miss >= 2) is(await page.evaluate((w) => (document.querySelector('.pbg-ysq.is-need .pbg-ghost') || {}).textContent === w, r.need), `${id}: miss 2 ghosts «${r.need}» in`);
      }
      await tap(page, wc(r.need));
      await win(page, id, [r.need]);
      is(await page.evaluate(() => !!document.querySelector('.pbg-banner')), `${id}: BINGO`);
    }

    /* a full card names the leftovers */
    {
      const R = C.rounds(loc, 'look'), c0 = R[0].card, Rc = R.filter(r => r.card.id === c0.id), last = Rc[Rc.length - 1];
      await force(page, 'look', last.id);
      await page.evaluate((keep) => { const a = window.PictureBingoActivity, st = a.st; st.r.card.sq.forEach(s => { if (s.called && s.i !== keep) st.cs.flipped.push(s.i); }); a._paint(); }, last.sq);
      await tap(page, sq(last.sq));
      const left = C.leftovers(c0);
      await win(page, `${loc} full card`, left);
      is(await page.evaluate(() => document.querySelectorAll('.pbg-sq.is-left').length) === left.length && await page.evaluate(() => !!document.querySelector('.pbg-banner')), `${loc}: a full card — the ${left.length} leftovers marked, BINGO`);
    }
    /* First letter */
    {
      const r = C.rounds(loc, 'look')[0]; await force(page, 'look', r.id);
      await page.evaluate(() => { const a = window.PictureBingoActivity; a.api.settings.read = 'letter'; a.onSettings(); }); await wait(40);
      is(await page.evaluate(() => (document.querySelector('.pbg-tab') || {}).textContent) === Array.from(r.word)[0], `${loc}: First letter shows «${Array.from(r.word)[0]}» on the call card`);
      await page.evaluate(() => { const a = window.PictureBingoActivity; a.api.settings.read = 'pic'; a.onSettings(); }); await wait(40);
      is(await page.evaluate(() => !document.querySelector('.pbg-tab')), `${loc}: Picture only hides the tab`);
      /* the arrow keys walk the card */
      await page.focus(sq(0)); await page.keyboard.press('ArrowRight'); await wait(20);
      is(await page.evaluate(() => document.activeElement.getAttribute('data-sq')) === '1', `${loc}: ArrowRight walks to the next square`);
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the four-wide card on a phone */
  if (!process.argv.includes('--sweep-only')) {
    for (const loc of LOCS) {
      const four = C.levels(loc).filter(v => v !== 'call').map(v => C.rounds(loc, v)[0]).find(r => r && r.card.cols === 4);
      if (!four) continue;
      const { page } = await open(360, loc);
      await force(page, four.level, four.id);
      const cols = await page.evaluate(() => new Set([...document.querySelectorAll('.pbg-card .pbg-sq')].map(e => Math.round(e.getBoundingClientRect().left))).size);
      is(cols === four.card.rows, `@360 ${loc} ${four.level}: the four-wide card turns on its side (${cols} columns)`);
      const p = await page.evaluate((i) => { const e = document.querySelector(`.pbg-sq[data-sq="${i}"]`); return [e.style.gridColumn, e.style.gridRow].join(','); }, four.card.cols);
      is(p === '2,1', `@360 ${loc}: square ${four.card.cols} (row 2, column 1) sits in column 2, row 1 (${p})`);
      await page.close();
    }
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const lv of C.levels(loc)) {
      const R = C.rounds(loc, lv);
      const weight = (r) => lv === 'call' ? Math.max(...r.hand.map(x => x.length)) : Math.max(...r.card.sq.map(x => x.word.length)) * 10 + r.card.cols;
      const r = R.slice().sort((a, b) => weight(b) - weight(a))[0];
      await force(page, lv, r.id);
      for (const phase of ['rest', 'chip', 'miss2', 'won']) {
        await page.evaluate((phase) => {
          const A = window.PictureBingoActivity, K = window.PictureBingoCore, st0 = A.st, r = st0.r;
          let st;
          if (r.level === 'call') { st = K.newState(r, null, st0.youCard); st.hand = st0.hand; const bad = st.hand.filter(x => x !== r.need).sort((a, b) => b.length - a.length);
            if (phase === 'chip') K.putInSlot(st, bad[0]);
            if (phase === 'miss2') { K.putInSlot(st, bad[0]); K.check(st); K.putInSlot(st, bad[1]); K.check(st); }
            if (phase === 'won') { K.putInSlot(st, r.need); K.check(st); A._view = { bingo: true, msg: 'x' }; } }
          else { st = K.newState(r, K.newCardState(r.card)); const bad = r.card.sq.filter(s => s.i !== r.sq).sort((a, b) => b.word.length - a.word.length);
            if (phase === 'chip') K.placeChip(st, bad[0].i);
            if (phase === 'miss2') { K.placeChip(st, bad[0].i); K.check(st); K.placeChip(st, bad[1].i); K.check(st); }
            if (phase === 'won') { r.card.sq.forEach(s => { if (s.called && s.i !== r.sq) st.cs.flipped.push(s.i); }); K.placeChip(st, r.sq); const res = K.check(st); A._view = { lines: res.lines, bingo: true, msg: 'x' }; } }
          if (phase !== 'won') A._view = {};
          A.st = st; A._busy = false; A._paint();
        }, phase);
        await wait(60);
        const tag = `@${w} ${loc} ${lv} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.pbg-sq,.pbg-wcard,.pbg-slot,.pbg-callcard,.pbg-traychip,.pbg-check:not([hidden])')].filter(vis);
          const txt = [...document.querySelectorAll('.pbg-word,.pbg-wcard,.pbg-slotword,.pbg-note,.pbg-check,.pbg-small,.pbg-ghost')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const W = (sel) => [...document.querySelectorAll(sel)].filter(vis).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
          const spill = [...document.querySelectorAll('.pbg-wcard')].filter(b => b.scrollWidth > b.clientWidth + 1).length + [...document.querySelectorAll('.pbg-word')].filter(e => e.getBoundingClientRect().width > e.parentNode.getBoundingClientRect().width - 4).length;
          const chk = document.querySelector('.pbg-check:not([hidden])');
          const mn = (a) => a.length ? Math.min(...a) : 999;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, call: mn(W('.pbg-callpic')), flip: mn(W('.pbg-flippic')), you: mn(W('.pbg-ypic')), spill,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const callMin = w >= 704 ? 96 : w <= 320 ? 88 : 96, cellMin = w >= 704 ? 72 : w <= 320 ? 56 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.call >= callMin - 0.5 && m.flip >= cellMin - 6.5 && m.you >= cellMin - 0.5 && m.txt >= 14 && !m.spill, `${tag}: call picture ≥ ${callMin} (${Math.round(m.call)}), card pictures ≥ ${cellMin} (flip ${Math.round(m.flip)}, you ${Math.round(m.you)}), text ≥ 14 (${m.txt}), nothing spills (${m.spill})`);
        if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-picture-bingo: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
