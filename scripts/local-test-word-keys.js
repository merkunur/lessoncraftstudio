#!/usr/bin/env node
/* =====================================================================
   local-test-word-keys.js — the interaction gate for ACTIVITY #61, The
   Word Keys (RF.K.3.c, 11 locales). Real pointer at 704, every game,
   EVERY round:
     Three keys — Turn with no key asks (no miss) and the keyhole glints;
     a wrong key TAPPED in jams (miss 1): its differing teeth glow; another
     wrong key DRAGGED in jams again (miss 2): the lock turns to glass with
     one pin per letter of the word; a key tapped in the lock comes out;
     the right key → the word drops into the sentence, the shell
     celebrates with the sentence and the word.
     Key ring — one key dragged into its lock, two tapped into the wrong
     locks (tap a lock, then a key): one opens, two jam (one miss), the
     open lock stays open; the keys swapped → every lock open.
     Cut the key — Turn with nothing cut asks; a miscut key jams; uncut;
     the word cut tooth by tooth → open.
   Once per locale: typing cuts teeth (Backspace uncuts); Picture off hides
   the pictures; the options. At 360: the key-ring pager. The width sweep
   (all locales at 320 / 704 / 1366, en at 320–1366), every game at rest,
   keyed, jammed, glass and won: no sideways scroll, controls ≥ 44 px
   inside the card, text ≥ 14 px, pictures ≥ 96 / 64, Turn above the fold,
   the teeth inside their key.
   Usage: node scripts/local-test-word-keys.js [--widths=…] [--locales=…] [--sweep-only] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots');
const ID = 'choice-board.tell-words-apart.rf-k-3-c';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '061-word-keys', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'word-keys-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, WordKeysCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'word-keys-activity.js'), 'utf8') + '\n;this.__A = WordKeysActivity;', ctx); return ctx.__A; })();
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
    await page.goto(`${base}/word-keys-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.WordKeysActivity && window.WordKeysActivity.st && document.querySelector('.wky-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.WordKeysActivity.FAST = true; window.WordKeysActivity.OK_MS = 60000; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.WordKeysActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, keys: s.keys, inLock: s.inLock, opened: s.opened, cut: s.cut, tiles: s.tiles, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.wky-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(30); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 12; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 12, a.y + (b.y - a.y) * k / 12);
    await page.mouse.up(); await wait(50);
  }
  const keySel = (w) => `.wky-rail [data-key="${w}"]`;
  async function force(page, game, id) {
    await page.evaluate((game, id) => { const a = window.WordKeysActivity; a.api.settings.game = game; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; a._deals = null; window.LCS_reloadFirstTask(); }, game, id);
    await wait(70);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function turn(page) { await tap(page, '[data-k="turn"]'); await page.waitForFunction(() => !window.WordKeysActivity._busy, { timeout: 15000 }); await wait(30); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble, [class*="bubble"]'); return b ? b.textContent : ''; });
  async function win(page, id, must) {
    await page.evaluate(() => { window.WordKeysActivity.OK_MS = 0; });
    await turn(page); const s = await state(page);
    is(s.done && await celebrated(page), `${id}: every lock open → the shell celebrates`);
    const b = await bubble(page);
    is(b && !/\{\w+\}/.test(b) && must.every(x => b.includes(x)), `${id}: the success text is filled and names ${must.join(' / ')} («${b}»)`);
    await page.evaluate(() => { window.WordKeysActivity.OK_MS = 60000; });
  }

  for (const loc of (process.argv.includes('--sweep-only') ? [] : LOCS)) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    const opts = await page.evaluate(() => window.WordKeysActivity.settings.map(s => s.key + ':' + s.options.map(o => o.value).join(',')).join(' | '));
    is(opts === 'game:three,ring,cut | pic:on,off', `${loc}: options ${opts}`);
    is(await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !c || getComputedStyle(c).display === 'none'; }), `${loc}: the shell's Check is hidden`);

    /* Three keys, every round */
    for (const r of C.rounds(loc, 'three')) {
      const id = `${loc} three ${r.id}`, lk = r.locks[0];
      await force(page, 'three', r.id);
      let s = await state(page);
      is(s.keys.length === 3 && s.keys.includes(r.target) && await page.evaluate(() => document.querySelectorAll('.wky-rail .wky-key').length) === 3, `${id}: three keys on the rail (${s.keys.join(' ')})`);
      await turn(page); s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmpty') && await page.evaluate(() => !!document.querySelector('.wky-lock.is-glint')), `${id}: Turn with no key asks, the keyhole glints, no miss`);
      const wrong = s.keys.filter(w => w !== r.target);
      await tap(page, keySel(wrong[0])); s = await state(page);
      is(s.inLock[0] === wrong[0] && await page.evaluate(() => !!document.querySelector('.wky-lock.has-key')), `${id}: «${wrong[0]}» tapped into the lock`);
      await turn(page); s = await state(page);
      const d1 = C.diff(r.target, wrong[0]);
      is(s.misses === 1 && (await note(page)) === T(loc, 'hintJam') && await page.evaluate(() => document.querySelectorAll('.wky-lt.is-diff').length) === d1.glow.length && await page.evaluate(() => document.querySelectorAll('.wky-lt.is-extra').length) === d1.extra.length && await page.evaluate(() => document.querySelectorAll('.wky-lt.is-empty').length) === d1.missing, `${id}: «${wrong[0]}» jams → miss 1: ${d1.glow.length} teeth glow, ${d1.extra.length} stick out, ${d1.missing} empty`);
      await drag(page, keySel(wrong[1]), '.wky-lock'); s = await state(page);
      is(s.inLock[0] === wrong[1], `${id}: «${wrong[1]}» dragged into the lock`);
      await turn(page); s = await state(page);
      const pins = await page.evaluate(() => document.querySelectorAll('.wky-lock.is-glass .wky-pin').length);
      is(s.misses === 2 && pins === Array.from(r.target).length && (await note(page)) === T(loc, 'hintGlass'), `${id}: miss 2 — the glass lock shows ${pins} pins`);
      await tap(page, '.wky-lock'); s = await state(page);
      is(s.inLock[0] === null && await page.evaluate(() => !document.querySelector('.is-glass')), `${id}: a tap on the lock takes the key out and the glass away`);
      await tap(page, keySel(r.target));
      await win(page, id, [r.target, lk.after.trim().split(/\s+/).pop().replace(/[.!?]/g, '') || r.target]);
      is(await page.evaluate(() => (document.querySelector('.wky-word') || {}).textContent) === (lk.initial ? C.cap(r.target) : r.target), `${id}: the word drops into the sentence`);
    }

    /* Key ring, every board */
    for (const r of C.rounds(loc, 'ring')) {
      const id = `${loc} ring ${r.id}`;
      await force(page, 'ring', r.id);
      is(await page.evaluate(() => document.querySelectorAll('.wky-board').length) === 3 && await page.evaluate(() => document.querySelectorAll('.wky-lock').length) === 3, `${id}: three sentences, three locks`);
      const [k0, k1, k2] = r.keys;
      await drag(page, keySel(k0), '[data-lock="0"]');
      await tap(page, '[data-lock="1"]'); await tap(page, keySel(k2));
      await tap(page, '[data-lock="2"]'); await tap(page, keySel(k1));
      let s = await state(page);
      is(s.inLock.join('|') === [k0, k2, k1].join('|'), `${id}: keys in the locks: ${s.inLock.join(' ')}`);
      await turn(page); s = await state(page);
      is(s.opened.join() === 'true,false,false' && s.misses === 1 && (await note(page)) === T(loc, 'hintJam'), `${id}: «${k0}» opens, the swapped keys jam → one miss`);
      /* both jammed keys out (a tap on a lock), then each into its own lock */
      await tap(page, '[data-lock="1"]'); await tap(page, '[data-lock="2"]');
      await tap(page, '[data-lock="1"]'); await tap(page, keySel(k1));
      await tap(page, '[data-lock="2"]'); await tap(page, keySel(k2));
      s = await state(page);
      is(s.inLock.join('|') === r.keys.join('|') && s.opened[0], `${id}: the keys swapped, the open lock still open`);
      await win(page, id, r.keys);
    }

    /* Cut the key, every round */
    for (const r of C.rounds(loc, 'cut')) {
      const id = `${loc} cut ${r.id}`;
      await force(page, 'cut', r.id);
      let s = await state(page);
      is(s.tiles.length === 8 && await page.evaluate(() => document.querySelectorAll('.wky-tile').length) === 8, `${id}: eight letter tiles`);
      await turn(page); s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintEmptyCut'), `${id}: Turn with nothing cut asks`);
      const letters = Array.from(r.target.toLocaleLowerCase()), miscut = letters.length > 1 && letters.slice().reverse().join('') !== letters.join('') ? letters.slice().reverse() : letters.concat(letters[0]);
      for (const c of miscut) await tap(page, `[data-k="tile-${c}"]`);
      await turn(page); s = await state(page);
      is(s.misses === 1 && s.cut === miscut.join('') && await page.evaluate(() => !!document.querySelector('.wky-lock.is-jam')), `${id}: «${miscut.join('')}» jams → miss 1`);
      for (let i = 0; i < miscut.length; i++) await tap(page, '[data-k="uncut"]');
      s = await state(page); is(s.cut === '', `${id}: uncut takes every tooth back`);
      for (const c of letters) await tap(page, `[data-k="tile-${c}"]`);
      await win(page, id, [r.target]);
    }
    /* typing cuts teeth */
    {
      const r = C.rounds(loc, 'cut')[0]; await force(page, 'cut', r.id);
      await page.focus('.wky-wrap'); for (const c of Array.from(r.target.toLocaleLowerCase())) await page.keyboard.type(c); await wait(30);
      let s = await state(page); is(s.cut === r.target.toLocaleLowerCase(), `${loc}: typing cuts «${s.cut}»`);
      await page.keyboard.press('Backspace'); await wait(30); s = await state(page); is(Array.from(s.cut).length === Array.from(r.target).length - 1, `${loc}: Backspace uncuts a tooth`);
    }
    /* Picture off */
    {
      await force(page, 'three', C.rounds(loc, 'three')[0].id);
      await page.evaluate(() => { const a = window.WordKeysActivity; a.api.settings.pic = 'off'; a.onSettings(); }); await wait(40);
      is(await page.evaluate(() => [...document.querySelectorAll('.wky-pic')].every(e => getComputedStyle(e).display === 'none')), `${loc}: Picture off hides the picture`);
      await page.evaluate(() => { const a = window.WordKeysActivity; a.api.settings.pic = 'on'; a.onSettings(); });
    }
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the key-ring pager on a phone */
  if (!process.argv.includes('--sweep-only')) {
    const { page } = await open(360, 'en');
    const r = C.rounds('en', 'ring')[1]; await force(page, 'ring', r.id);
    is(await page.evaluate(() => document.querySelectorAll('.wky-board').length) === 1 && await page.evaluate(() => document.querySelectorAll('.wky-tab').length) === 3, '@360 ring: one sentence at a time, three tabs');
    await tap(page, '[data-k="page1"]'); await tap(page, keySel(r.keys[1]));
    let s = await state(page); is(s.inLock[1] === r.keys[1], '@360 ring: tab 2, then a key → it goes into lock 2');
    await turn(page); s = await state(page);
    is(s.opened[1] && await page.evaluate(() => document.querySelector('.wky-tab.is-on').textContent) !== '2', '@360 ring: lock 2 opens and the pager moves on');
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    for (const game of ['three', 'ring', 'cut']) {
      const R = C.rounds(loc, game);
      const weight = (r) => r.locks.reduce((n, lk) => n + lk.before.length + lk.after.length, 0) + Math.max(...(r.keys || [r.target].concat(r.looks)).map(x => x.length)) * 4;
      const r = R.slice().sort((a, b) => weight(b) - weight(a))[0];
      await force(page, game, r.id);
      for (const phase of ['rest', 'keyed', 'jam', 'glass', 'won']) {
        await page.evaluate((phase) => {
          const A = window.WordKeysActivity, K = window.WordKeysCore, st0 = A.st, r = st0.r;
          const st = K.newState(r, { keys: st0.keys, tiles: st0.tiles }); A.st = st; A._view = {}; A._page = 0;
          const wrong = (i) => st.keys.slice().sort((a, b) => b.length - a.length).find(k => k !== r.locks[i].answer);
          const put = (bad) => { if (r.game === 'cut') { st.cut = ''; (bad ? Array.from(r.target).reverse().concat([st.tiles.find(c => !r.target.includes(c))]) : Array.from(r.target)).forEach(c => K.cutLetter(st, c.toLocaleLowerCase())); } else r.locks.forEach((lk, i) => K.insert(st, bad ? wrong(i) : lk.answer, i)); };
          if (phase === 'keyed') put(true);
          if (phase === 'jam') { put(true); K.turn(st); }
          if (phase === 'glass') { put(true); K.turn(st); put(true); K.turn(st); put(true); K.turn(st); }
          if (phase === 'won') { put(false); K.turn(st); A._view = { won: true }; }
          A._busy = false; A._paint();
        }, phase);
        await wait(60);
        const tag = `@${w} ${loc} ${game} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.wky-rail .wky-key:not(.is-blank),.wky-lock,.wky-tile,.wky-uncut,.wky-tab,.wky-check:not([hidden]),.wky-ringbtn')].filter(vis);
          const txt = [...document.querySelectorAll('.wky-sent,.wky-tooth,.wky-lt,.wky-note,.wky-tile,.wky-check')].filter(e => e.textContent.trim() && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.wky-pic')].filter(vis).map(e => e.getBoundingClientRect().width);
          const chk = document.querySelector('.wky-check:not([hidden])');
          const spill = [...document.querySelectorAll('.wky-blade')].filter(b => b.scrollWidth > b.clientWidth + 1).length + [...document.querySelectorAll('.wky-board')].filter(b => b.scrollWidth > b.clientWidth + 1).length;
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).map(e => e.className).slice(0, 2),
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999, spill,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && !m.out.length, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out.join('/')})`);
        is(m.pic >= minPic - 0.5 && m.txt >= 14 && !m.spill, `${tag}: pictures ≥ ${minPic} (${Math.round(m.pic)}), text ≥ 14 (${m.txt}), nothing spills (${m.spill})`);
        if (phase !== 'won') is(m.fold <= m.H + 1, `${tag}: Turn above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
        if (SHOTS && [360, 704, 1024].includes(w)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${game}-${phase}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-word-keys: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
