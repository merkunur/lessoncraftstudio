#!/usr/bin/env node
/* =====================================================================
   local-test-blink-camera.js — the interaction gate for ACTIVITY #60, The
   Blink Camera (RF.K.3.c, 11 locales). Real pointer at 704, every game,
   EVERY round:
     Snap and find — Check before snapping asks (no miss) and the shutter
     glows; a face-down card does nothing; while the shutter is open the
     cards lie face down and the lens shows the word; a wrong card → miss
     1, the camera looks again by itself; a wrong card again → miss 2, the
     photo sits beside the cards and the differing letters glow; the right
     card → right, gold, a photo in the album, the shell celebrates with
     the word named.
     Find every one — a bracket on a look-alike falls off (miss 1); every
     copy bracketed → how many? (no miss); a wrong count → the brackets
     are numbered (miss); the right count → right.
     In the story — a look-alike bracketed and one copy left (a capital
     one where the story has it: it glows) → miss 1; the last copy → right.
   Once per game: miss 2 dashed frames (hunts); the dial (tap and the D
   key) changes the blink; an album photo re-flashes its word; on a phone
   the dot strip opens the album. The shell's Check is hidden. The Game /
   Blink options. The width sweep (all locales at 320 / 704 / 1366, en at
   320–1366), every game at rest, up, help and won: no sideways scroll,
   controls ≥ 44 px inside the card, story words ≥ 44 tall (≥ 24 wide),
   text ≥ 14 px, the story picture ≥ 96 / 64, words inside their cards and
   the lens, Check above the fold.
   Usage: node scripts/local-test-blink-camera.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'choice-board.read-sight-word.rf-k-3-c';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '060-blink-camera', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'blink-camera-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, BlinkCameraCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'blink-camera-activity.js'), 'utf8') + '\n;this.__A = BlinkCameraActivity;', ctx); return ctx.__A; })();
const STR = ACT.strings;
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
const low = (s) => s.toLocaleLowerCase();
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
    await page.goto(`${base}/blink-camera-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.BlinkCameraActivity && window.BlinkCameraActivity.st && document.querySelector('.bcm-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.BlinkCameraActivity.FAST = true; window.BlinkCameraActivity.OK_MS = 60000; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.BlinkCameraActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, cards: s.cards, tiles: s.tiles, chosen: s.chosen, brackets: s.brackets, phase: s.phase, count: s.count, misses: s.misses, help: s.help, done: s.done, last: s.last, open: s.open, up: s.up, snaps: s.snaps })); });
  const note = (page) => page.evaluate(() => document.querySelector('.bcm-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  const idle = (page) => page.waitForFunction(() => { const a = window.BlinkCameraActivity; return !a._busy && !a.st.open; }, { timeout: 15000 }).then(() => wait(30));
  async function force(page, game, id) {
    await page.evaluate((game, id) => { const a = window.BlinkCameraActivity; a.api.settings.game = game; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; a._deals = null; window.LCS_reloadFirstTask(); }, game, id);
    await wait(70);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function snap(page) { await tap(page, '[data-k="shutter"]'); await idle(page); }
  async function check(page) { await tap(page, '[data-k="check"]'); await idle(page); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
  async function win(page, id, target, extra) {
    await page.evaluate(() => { window.BlinkCameraActivity.OK_MS = 0; });
    await check(page); const s = await state(page);
    is(s.done && await celebrated(page), `${id}: right → the shell celebrates`);
    const b = await bubble(page);
    is(b && !/\{\w+\}/.test(b) && b.includes(target) && (!extra || b.includes(extra)), `${id}: the success text is filled and names «${target}»${extra ? ' and ' + extra : ''} («${b}»)`);
    await page.evaluate(() => { window.BlinkCameraActivity.OK_MS = 60000; });
  }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.BlinkCameraActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'game:snap,hunt,story | blink:long,medium,short', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);

    /* Snap and find, every round */
    for (const r of C.rounds(loc, 'snap')) {
      const id = `${loc} snap ${r.id}`;
      await force(page, 'snap', r.id);
      let s = await state(page);
      is(await page.evaluate(() => document.querySelectorAll('.bcm-card.is-back').length) === 4, `${id}: four cards face down at rest`);
      await check(page); s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmpty') && await page.evaluate(() => !!document.querySelector('.bcm-shutter.is-nudge')), `${id}: Check before snapping asks, the button glows, no miss`);
      await tap(page, '[data-k="card0"]'); s = await state(page);
      is(s.chosen === null, `${id}: a face-down card cannot be chosen`);
      await page.evaluate(() => { window.BlinkCameraActivity.HOLD = true; });
      await tap(page, '[data-k="shutter"]');
      const open = await page.evaluate(() => ({ back: document.querySelectorAll('.bcm-card.is-back').length, lens: document.querySelector('.bcm-lword').textContent, live: document.querySelector('.bcm-sr').textContent, words: [...document.querySelectorAll('.bcm-cword')].length }));
      is(open.back === 4 && open.words === 0 && open.lens === r.target && open.live.includes(r.target), `${id}: shutter open — the cards face down, the lens shows «${open.lens}»`);
      await page.evaluate(() => { const a = window.BlinkCameraActivity; a.HOLD = false; a._shut(); }); await wait(30);
      s = await state(page);
      const cards = await page.evaluate(() => [...document.querySelectorAll('.bcm-card')].map(b => b.textContent));
      is(JSON.stringify(cards) === JSON.stringify(s.cards) && await page.evaluate(() => document.querySelector('.bcm-lword').textContent === ''), `${id}: the shutter shuts, the cards flip up (${cards.join(' ')})`);
      const right = s.cards.indexOf(r.target), wrong = s.cards.findIndex(w => w !== r.target);
      await tap(page, `[data-k="card${wrong}"]`); await check(page); s = await state(page);
      is(s.misses === 1 && s.snaps === 2 && s.chosen === null && s.up && (await note(page)) === T(loc, 'hintLook'), `${id}: «${s.cards[wrong]}» → miss 1, the camera looks again by itself (snaps ${s.snaps})`);
      await tap(page, `[data-k="card${wrong}"]`); await check(page); s = await state(page);
      const d = C.diff(r.target, s.cards[wrong]);
      const help = await page.evaluate((w) => ({ photo: (document.querySelector('.bcm-photo.is-pinned') || {}).textContent, glow: document.querySelectorAll(`[data-k="card${w}"] .is-diff`).length, extra: document.querySelectorAll(`[data-k="card${w}"] .is-extra`).length, miss: document.querySelectorAll(`[data-k="card${w}"] .is-miss`).length }), wrong);
      is(s.misses === 2 && help.photo === r.target && help.glow === d.glow.length && help.extra === d.extra.length && help.miss === d.missing && (await note(page)) === T(loc, 'hintPhoto'), `${id}: miss 2 — the photo «${help.photo}», ${help.glow} letters glow, ${help.extra} extra, ${help.miss} missing`);
      await tap(page, `[data-k="card${right}"]`);
      is(await page.evaluate(() => !document.querySelector('.bcm-photo') && !document.querySelector('.is-diff')), `${id}: a new move takes the photo and the glows away`);
      await win(page, id, r.target);
      is(await page.evaluate((i) => document.querySelector(`[data-k="card${i}"]`).classList.contains('is-gold'), right), `${id}: the right card turns gold`);
    }
    /* the dial, the album, the D key (Snap and find) */
    {
      const r = C.rounds(loc, 'snap')[1]; await force(page, 'snap', r.id);
      const b0 = await page.evaluate(() => document.querySelector('.bcm-dial').getAttribute('data-blink'));
      await tap(page, '[data-k="dial"]');
      const b1 = await page.evaluate(() => ({ b: document.querySelector('.bcm-dial').getAttribute('data-blink'), lit: [...document.querySelectorAll('.bcm-dial i')].findIndex(i => i.classList.contains('is-lit')) }));
      is(b0 === 'medium' && b1.b === 'short' && b1.lit === 2, `${loc}: tapping the dial turns the blink medium → short (dot ${b1.lit})`);
      await page.focus('.bcm-wrap'); await page.keyboard.press('d'); await wait(30);
      is(await page.evaluate(() => document.querySelector('.bcm-dial').getAttribute('data-blink')) === 'long', `${loc}: the D key turns the dial on (long)`);
      const frames = await page.evaluate(() => [...document.querySelectorAll('.bcm-frame.is-full')].map(f => f.textContent));
      is(frames.length >= 1 && frames.length <= 8, `${loc}: the album holds the photos of this pass (${frames.join(' ')})`);
      await tap(page, '[data-k="frame0"]');
      is(await page.evaluate(() => document.querySelector('.bcm-lword').textContent) === frames[0], `${loc}: an album photo flashes «${frames[0]}» in the lens`);
      await wait(60);
      await page.evaluate(() => { const a = window.BlinkCameraActivity; a.api.settings.blink = 'medium'; a.onSettings(); });
      is(await page.evaluate(() => document.querySelector('.bcm-dial').getAttribute('data-blink')) === 'medium', `${loc}: the Blink setting resets the dial`);
    }

    /* Find every one, every round */
    for (const r of C.rounds(loc, 'hunt')) {
      const id = `${loc} hunt ${r.id}`;
      await force(page, 'hunt', r.id); await snap(page);
      let s = await state(page);
      is(s.tiles.filter(w => w === r.target).length === r.copies && await page.evaluate(() => document.querySelectorAll('.bcm-tile:not(.is-back)').length) === 12, `${id}: twelve tiles up, ${r.copies} copies of «${r.target}»`);
      const copies = s.tiles.map((w, i) => w === r.target ? i : -1).filter(i => i >= 0), look = s.tiles.findIndex(w => w !== r.target);
      await tap(page, `[data-k="tile${look}"]`); await tap(page, `[data-k="tile${copies[0]}"]`); await check(page); s = await state(page);
      is(s.misses === 1 && JSON.stringify(s.brackets) === JSON.stringify([copies[0]]) && !(await page.evaluate((i) => document.querySelector(`[data-k="tile${i}"]`).classList.contains('is-br'), look)) && (await note(page)) === T(loc, 'hintWrongMore'), `${id}: the bracket on «${s.tiles[look]}» falls off → miss 1 («${await note(page)}»)`);
      for (const i of copies.slice(1)) await tap(page, `[data-k="tile${i}"]`);
      await check(page); s = await state(page);
      is(s.phase === 'count' && s.misses === 1 && await page.evaluate(() => document.querySelectorAll('.bcm-num-tile').length) === 6 && (await note(page)) === T(loc, 'hintCount'), `${id}: every copy bracketed → how many? (no miss)`);
      const wrongN = r.copies - 1;
      await tap(page, `[data-k="n${wrongN}"]`); await check(page); s = await state(page);
      const nums = await page.evaluate(() => [...document.querySelectorAll('.bcm-num')].map(e => +e.textContent).sort((a, b) => a - b).join());
      is(s.misses === 2 && nums === Array.from({ length: r.copies }, (_, i) => i + 1).join() && (await note(page)) === T(loc, 'hintCountAgain'), `${id}: ${wrongN} → the brackets are numbered 1–${r.copies}, miss 2`);
      await tap(page, `[data-k="n${r.copies}"]`);
      await win(page, id, r.target, String(r.copies));
    }
    /* miss 2 in a hunt: the photo and the dashed frames */
    {
      const r = C.rounds(loc, 'hunt')[0]; await force(page, 'hunt', r.id); await snap(page);
      let s = await state(page); const look = s.tiles.findIndex(w => w !== r.target);
      for (let t = 0; t < 2; t++) { await tap(page, `[data-k="tile${look}"]`); await check(page); }
      s = await state(page);
      const fr = await page.evaluate(() => ({ framed: document.querySelectorAll('.bcm-tile.is-framed').length, photo: (document.querySelector('.bcm-photo.is-pinned') || {}).textContent }));
      is(s.misses === 2 && fr.framed === r.copies && fr.photo === r.target && (await note(page)) === T(loc, 'hintFrames'), `${loc} hunt: miss 2 — the photo and ${fr.framed} dashed frames`);
      const first = s.tiles.indexOf(r.target); await tap(page, `[data-k="tile${first}"]`);
      is(await page.evaluate(() => document.querySelectorAll('.is-framed').length) === 0, `${loc} hunt: a move takes the frames away`);
    }

    /* In the story, every round */
    for (const r of C.rounds(loc, 'story')) {
      const id = `${loc} story ${r.id}`;
      await force(page, 'story', r.id);
      is(await page.evaluate(() => document.querySelector('.bcm-board').classList.contains('is-down') && document.querySelector('.bcm-spic').complete && document.querySelector('.bcm-spic').naturalWidth > 0), `${id}: the story waits under the veil; its picture loads`);
      await snap(page);
      const toks = r.tokens.map((t, i) => [t, i]).filter(([t]) => t.word);
      const cp = toks.filter(([t]) => !t.elided && low(t.t) === low(r.target)).map(([, i]) => i);
      const capI = cp.find(i => r.tokens[i].t !== low(r.tokens[i].t)), leave = capI !== undefined ? capI : cp[cp.length - 1];
      const look = toks.find(([t]) => r.looks.some(l => low(l) === low(t.t)))[1];
      await tap(page, `[data-k="tok${look}"]`); for (const i of cp) if (i !== leave) await tap(page, `[data-k="tok${i}"]`);
      await check(page); let s = await state(page);
      const capOn = await page.evaluate((i) => document.querySelector(`[data-k="tok${i}"]`).classList.contains('is-capglow'), leave);
      is(s.misses === 1 && !s.brackets.includes(look) && (await note(page)) === T(loc, 'hintWrongMore') && capOn === (capI !== undefined), `${id}: «${r.tokens[look].t}» falls off → miss 1${capI !== undefined ? '; «' + r.tokens[capI].t + '» glows' : ''}`);
      await tap(page, `[data-k="tok${leave}"]`);
      await win(page, id, r.target, String(r.copies));
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the phone album */
  if (!process.argv.includes('--sweep-only')) {
    const { page } = await open(360, 'en');
    is(await page.evaluate(() => !!document.querySelector('.bcm-dots') && !document.querySelector('.bcm-album.is-frames')), '@360: the album is a dot strip');
    await tap(page, '[data-k="album"]');
    is(await page.evaluate(() => document.querySelectorAll('.bcm-album.is-frames .bcm-frame').length) === 8, '@360: the dot strip opens the album frames');
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const game of ['snap', 'hunt', 'story']) {
      const R = C.rounds(loc, game);
      const weight = (r) => game === 'story' ? r.text.length : Math.max(...[r.target].concat(r.looks).map(x => x.length));
      const r = R.slice().sort((a, b) => weight(b) - weight(a))[0];
      await force(page, game, r.id);
      for (const phase of ['rest', 'up', 'help', 'count', 'won']) {
        if (phase === 'count' && game !== 'hunt') continue;
        await page.evaluate((phase) => {
          const A = window.BlinkCameraActivity, K = window.BlinkCameraCore, st0 = A.st, r = st0.r;
          const st = K.newState(r, { cards: st0.cards, tiles: st0.tiles }); A.st = st; A._view = {};
          if (phase !== 'rest') { K.snap(st); K.shut(st); }
          const copies = () => K.copiesAt(st), other = () => K.items(st).filter(x => !K.isCopy(st, x.i)).map(x => x.i);
          if (phase === 'help') { if (r.game === 'snap') { const w = other()[0]; K.choose(st, w); K.check(st); K.choose(st, w); K.check(st); } else { for (let t = 0; t < 2; t++) { K.toggle(st, other()[0]); K.check(st); } } }
          if (phase === 'count') { copies().forEach(i => K.toggle(st, i)); K.check(st); K.pickCount(st, 1); K.check(st); }
          if (phase === 'won') { if (r.game === 'snap') K.choose(st, copies()[0]); else copies().forEach(i => K.toggle(st, i)); K.check(st); if (r.game === 'hunt') { K.pickCount(st, copies().length); K.check(st); } A._view = { won: true }; }
          A._busy = false; A._paint();
        }, phase);
        await wait(60);
        const tag = `@${w} ${loc} ${game} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.bcm-shutter,.bcm-dial,.bcm-card,.bcm-tile,.bcm-num-tile,.bcm-frame.is-full,.bcm-dots,.bcm-check:not([hidden])')].filter(vis);
          const toks = [...document.querySelectorAll('.bcm-tok')].filter(vis);
          const txt = [...document.querySelectorAll('.bcm-cword,.bcm-tword,.bcm-text,.bcm-note,.bcm-pword,.bcm-num-tile,.bcm-check')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pic = document.querySelector('.bcm-spic'), chk = document.querySelector('.bcm-check:not([hidden])');
          const words = [...document.querySelectorAll('.bcm-cword,.bcm-tword')].filter(e => { const p = e.parentElement.getBoundingClientRect(), b = e.getBoundingClientRect(); return b.width > p.width - 4; }).length;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.concat(toks).filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            tok: toks.filter(e => { const b = e.getBoundingClientRect(); return b.height < 43.5 || b.width < 24; }).map(e => e.textContent).slice(0, 3),
            txt: txt.length ? Math.min(...txt) : 99, pic: pic ? pic.getBoundingClientRect().width : 999, words,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(!m.tok.length, `${tag}: story words ≥ 44 tall and ≥ 24 wide (${m.tok.join('/')})`);
        is(m.pic >= minPic - 0.5 && m.txt >= 14 && !m.words, `${tag}: picture ≥ ${minPic} (${Math.round(m.pic)}), text ≥ 14 (${m.txt}), words inside their cards (${m.words} spill)`);
        if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${game}-${phase}.png`), fullPage: true });
      }
      /* the lens word fits the lens (the longest word of the game) */
      const fit = await page.evaluate((word) => { const A = window.BlinkCameraActivity; A.HOLD = true; A.st.r = Object.assign({}, A.st.r, { target: word }); A.st.done = false; A._snap(); const l = document.querySelector('.bcm-lens').getBoundingClientRect(), t = document.querySelector('.bcm-lword').getBoundingClientRect(); const ok = t.width <= l.width * 0.92 && parseFloat(getComputedStyle(document.querySelector('.bcm-lword')).fontSize) >= 14; A.HOLD = false; A._shut(); return ok; }, R.map(x => x.target).sort((a, b) => b.length - a.length)[0]);
      is(fit, `@${w} ${loc} ${game}: the longest word fits the lens`);
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-blink-camera: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
