#!/usr/bin/env node
/* =====================================================================
   local-test-name-tag.js — the interaction gate for ACTIVITY #57, The
   Sticky Name Tag (RF.K.3, 11 locales). Real pointer at 704, every round
   of every level:
     read — Check with the tag in the tray asks (no miss); the tag DRAGGED
       onto the nearest look-alike → Check: it peels back to the tray with
       the first different letter ringed, the stuck letters left as a glue
       mark on that frame, the hint names how far it stuck; the tag TAPPED
       then its picture TAPPED → Check: it stays on, the frame glows, the
       note reads the word to the end, the shell celebrates;
     family — every tag hung on a neighbour's picture → all peel; then all
       on their own pictures → the wall weaves, celebrates;
     syllables — Check with pieces loose asks; the pieces tapped in the
       wrong order → the tag peels at the first part; taken apart, tapped in
       order, dragged onto its picture → right;
     memory — a picture and another word's tag → both turn back; every
       pair → each tag sticks on its picture; all → celebrates.
   Also: the far setting changes the wall, the keyboard path, the tag never
   speaks its word before it sticks. The width sweep (all locales at 320 /
   704 / 1366, en at 320–1366) for every level at rest and after a miss:
   no sideways scroll, controls ≥ 44 px inside the card, pictures ≥ 96 / 64,
   text ≥ 14 px, Check above the fold.
   Usage: node scripts/local-test-name-tag.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const ID = 'choice-board.read-cvc-word.rf-k-3';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'name-tag-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, NameTagCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'name-tag-activity.js'), 'utf8') + '\n;this.__A = NameTagActivity;', ctx); return ctx.__A; })();
const STR = ACT.strings;
const Q = (loc, s) => (ACT.QUOTES[loc] || ACT.QUOTES.en)[0] + s + (ACT.QUOTES[loc] || ACT.QUOTES.en)[1];
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
const SEG = new Intl.Segmenter('en', { granularity: 'grapheme' });
const G = (s) => [...SEG.segment(String(s).normalize('NFC'))].map(x => x.segment);
const stuckOf = (a, b) => { const x = G(a.toLocaleLowerCase()), y = G(b.toLocaleLowerCase()); let k = 0; while (k < x.length && x[k] === y[k]) k++; return k; };
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
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
    await page.evaluateOnNewDocument(() => { window.__said = []; window.LCSAudio = { speak: (o) => { window.__said.push(o.text); } }; });
    await page.goto(`${base}/name-tag-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.NameTagActivity && window.NameTagActivity.st && document.querySelector('.ntg-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.NameTagActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.NameTagActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, layout: s.layout, hung: s.hung, locked: s.locked, built: s.built, pieceOrder: s.pieceOrder, misses: s.misses, help: s.help, done: s.done, last: s.last, cards: s.cards, up: s.up, found: s.found })); });
  const note = (page) => page.evaluate(() => document.querySelector('.ntg-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(40); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 10; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 10, a.y + (b.y - a.y) * k / 10);
    await page.mouse.up(); await wait(60);
  }
  async function force(page, lv, id, look) {
    await page.evaluate((lv, id, look) => { const a = window.NameTagActivity; a.FAST = true; a.api.settings.level = lv; a.api.settings.look = look || 'close'; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, look);
    await wait(80);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function check(page) { await tap(page, '.ntg-check'); await page.waitForFunction(() => !window.NameTagActivity._busy, { timeout: 8000 }); await wait(40); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 12000 }).then(() => true).catch(() => false);
  const okRun = (page) => page.evaluate(() => { window.NameTagActivity.OK_MS = 0; });
  const frameOf = (s, wallIdx) => s.layout.indexOf(wallIdx);

  for (const loc of LOCS) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    /* the Level options are this locale's levels */
    const opts = await page.evaluate(() => window.NameTagActivity.settings[0].options.map(o => o.value).join());
    is(opts === C.levels(loc).join(), `${loc}: Level options = ${C.levels(loc).join()} (${opts})`);
    /* READ — every round */
    for (const r of C.rounds(loc, 'read', 'close')) {
      await page.evaluate(() => { window.NameTagActivity.OK_MS = 60000; window.__said = []; });
      await force(page, 'read', r.id);
      const id = `${loc} read ${r.tag.key}`;
      let s = await state(page);
      const tray = await page.evaluate(() => [...document.querySelectorAll('.ntg-tray .ntg-tag .ntg-l')].map(e => e.textContent).join(''));
      is(tray === r.tag.word, `${id}: the tag prints ${r.tag.word} (${tray})`);
      await check(page); s = await state(page);
      is(s.misses === 0 && (await note(page)) === T(loc, 'hintHang'), `${id}: Check with the tag in the tray asks, no miss`);
      /* the nearest look-alike, by drag */
      const nf = frameOf(s, r.near), near = r.wall[r.near];
      await drag(page, '.ntg-tray .ntg-tag', `.ntg-frame[data-frame="${nf}"]`);
      s = await state(page); is(s.hung[0] === nf, `${id}: dragged onto ${near.word}`);
      await check(page); s = await state(page);
      const k = stuckOf(r.tag.word, near.word), letter = G(r.tag.word)[k];
      const want = k === 0 ? T(loc, 'hintFirst') : k === 1 ? T(loc, 'hintPeel1', { letter: Q(loc, letter) }) : T(loc, 'hintPeel', { k, letter: Q(loc, letter) });
      is(s.misses === 1 && s.hung[0] === -1 && (await note(page)) === want, `${id}: peels on ${near.word} at ${letter} — «${await note(page)}»`);
      const ring = await page.evaluate(() => { const r = document.querySelector('.ntg-tray .ntg-tag .ntg-l.is-ring'); return r ? [...r.parentNode.children].filter(x => x.classList.contains('ntg-l')).indexOf(r) : -1; });
      is(ring === k, `${id}: the first different letter is ringed (${ring} = ${k})`);
      const glue = await page.evaluate((f) => { const g = document.querySelectorAll('.ntg-cell')[f].querySelector('.ntg-glue'); return g ? g.textContent : ''; }, nf);
      is(glue === G(r.tag.word).slice(0, k).join(''), `${id}: the glue mark keeps the stuck letters «${glue}»`);
      /* the right picture, by tap tap */
      await tap(page, '.ntg-tray .ntg-tag'); await tap(page, `.ntg-frame[data-frame="${frameOf(s, 0)}"]`);
      s = await state(page); is(s.hung[0] === frameOf(s, 0) && !s.last, `${id}: tap-tap hangs it on its picture (the hint goes)`);
      is(!(await page.evaluate(() => window.__said)).includes(r.tag.word), `${id}: the tag's word is never spoken before it sticks`);
      await okRun(page); await check(page); s = await state(page);
      is(s.done && await celebrated(page), `${id}: right → done, celebrates`);
      is(await page.evaluate((f) => document.querySelector(`.ntg-frame[data-frame="${f}"]`).classList.contains('is-win'), frameOf(s, 0)), `${id}: the frame glows`);
    }
    /* the far setting changes the wall */
    const r0 = C.rounds(loc, 'read', 'far')[0];
    await force(page, 'read', r0.id, 'far');
    const pics = await page.evaluate(() => [...document.querySelectorAll('.ntg-frame img')].map(i => decodeURIComponent(i.getAttribute('src'))).join('|'));
    is(r0.wall.every(x => pics.includes(x.pic.split('/').pop() + '@2x')), `${loc}: the far wall shows its own pictures`);
    /* FAMILY — every round */
    for (const r of C.rounds(loc, 'family')) {
      await page.evaluate(() => { window.NameTagActivity.OK_MS = 60000; });
      await force(page, 'family', r.id);
      const id = `${loc} family ${r.tags.map(t => t.key).join('/')}`, n = r.tags.length;
      let s = await state(page);
      for (let t = 0; t < n; t++) await drag(page, `.ntg-tray [data-k="tag${t}"]`, `.ntg-frame[data-frame="${frameOf(s, (t + 1) % n)}"]`);
      s = await state(page); is(s.hung.every((h, t) => h === frameOf(s, (t + 1) % n)), `${id}: every tag hung on a neighbour`);
      await check(page); s = await state(page);
      is(s.misses === 1 && s.hung.every(h => h === -1) && (await note(page)) === T(loc, 'hintFamily'), `${id}: all peel back`);
      for (let t = 0; t < n; t++) await drag(page, `.ntg-tray [data-k="tag${t}"]`, `.ntg-frame[data-frame="${frameOf(s, t)}"]`);
      await okRun(page); await check(page); s = await state(page);
      is(s.done && await celebrated(page) && await page.evaluate(() => document.querySelector('.ntg-wall').classList.contains('is-weave')), `${id}: all on their own pictures → the wall weaves, celebrates`);
    }
    /* SYLLABLES — every round */
    for (const r of C.rounds(loc, 'syllables')) {
      await page.evaluate(() => { window.NameTagActivity.OK_MS = 60000; });
      await force(page, 'syllables', r.id);
      const id = `${loc} syllables ${r.tag.key}`;
      let s = await state(page);
      is(s.pieceOrder.some((v, i) => v !== i), `${id}: the pieces arrive out of order`);
      await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintJoin'), `${id}: Check with pieces loose asks`);
      const rev = r.tag.parts.map((_, i) => i).reverse();
      for (const i of rev) await tap(page, `[data-k="piece${i}"]`);
      await drag(page, '.ntg-tray .ntg-tag', `.ntg-frame[data-frame="${frameOf(s, 0)}"]`);
      await check(page); s = await state(page);
      is(s.misses === 1 && s.last && s.last.stuck === 0 && (await note(page)) === T(loc, 'hintFirstSyl'), `${id}: the wrong order peels at the first part`);
      await tap(page, '[data-k="apart"]'); s = await state(page); is(s.built.length === 0, `${id}: taken apart`);
      for (let i = 0; i < r.tag.parts.length; i++) await tap(page, `[data-k="piece${i}"]`);
      const built = await page.evaluate(() => [...document.querySelectorAll('.ntg-tray .ntg-tag .ntg-l')].map(e => e.textContent).join(''));
      is(built === r.tag.word, `${id}: joined in order reads ${r.tag.word} (${built})`);
      await drag(page, '.ntg-tray .ntg-tag', `.ntg-frame[data-frame="${frameOf(s, 0)}"]`);
      await okRun(page); await check(page); s = await state(page);
      is(s.done && await celebrated(page), `${id}: right → done`);
    }
    /* MEMORY — every board */
    for (const r of C.rounds(loc, 'memory')) {
      await page.evaluate(() => { window.NameTagActivity.OK_MS = 60000; });
      await force(page, 'memory', r.id);
      const id = `${loc} memory ${r.words.map(w => w.key).join('/')}`;
      let s = await state(page);
      const at = (kind, i) => s.cards.findIndex(c => c.kind === kind && c.i === i);
      is(await page.evaluate(() => document.querySelector('.ntg-check').hidden), `${id}: no Check on a memory board`);
      await tap(page, `[data-k="card${at('pic', 0)}"]`); await tap(page, `[data-k="card${at('tag', 1)}"]`);
      s = await state(page); is(s.up.length === 2 && (await note(page)) === T(loc, 'hintMem'), `${id}: not a pair`);
      await page.waitForFunction(() => !window.NameTagActivity._busy, { timeout: 4000 }); s = await state(page);
      is(s.up.length === 0, `${id}: they turn back`);
      await okRun(page);
      for (let i = 0; i < 3; i++) { await tap(page, `[data-k="card${at('tag', i)}"]`); await tap(page, `[data-k="card${at('pic', i)}"]`); }
      s = await state(page);
      is(s.done && await celebrated(page), `${id}: every pair → done`);
      const onCards = await page.evaluate(() => document.querySelectorAll('.ntg-card .ntg-tag.is-on-card').length);
      is(onCards === 3, `${id}: each tag sticks on its picture (${onCards})`);
    }
    /* the keyboard */
    const rk = C.rounds(loc, 'read', 'close')[0];
    await page.evaluate(() => { window.NameTagActivity.OK_MS = 60000; });
    await force(page, 'read', rk.id);
    let s = await state(page);
    await page.focus('.ntg-tray .ntg-tag'); await page.keyboard.press('Enter'); await page.focus(`.ntg-frame[data-frame="${frameOf(s, 0)}"]`); await page.keyboard.press('Enter'); await wait(40);
    s = await state(page); is(s.hung[0] === frameOf(s, 0), `${loc}: keyboard — Enter picks the tag, Enter on a picture hangs it`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    await page.evaluate(() => { window.NameTagActivity.OK_MS = 60000; });
    for (const lv of C.levels(loc)) {
      const R = C.rounds(loc, lv, 'close');
      const len = (r) => r.level === 'memory' ? Math.max(...r.words.map(x => x.letters.length)) : r.level === 'family' ? r.tags.reduce((m, t) => m + t.letters.length, 0) : r.tag.letters.length;
      const r = R.slice().sort((a, b) => len(b) - len(a))[0];
      await force(page, lv, r.id);
      for (const phase of ['rest', 'miss']) {
        if (phase === 'miss') await page.evaluate(() => {
          const A = window.NameTagActivity, K = window.NameTagCore, st = A.st, r = st.r;
          if (r.level === 'memory') { K.flip(st, st.cards.findIndex(c => c.kind === 'tag' && c.i === 0)); K.flip(st, st.cards.findIndex(c => c.kind === 'pic' && c.i === 1)); A._view = { miss: st.up.slice(), test: K.stickTest(r.words[0].letters, r.words[1].letters) }; A._paint(); return; }
          if (r.level === 'syllables') r.tag.parts.forEach((_, i) => K.join(st, i));
          for (let rep = 0; rep < 2; rep++) {
            if (r.level === 'family') r.tags.forEach((t, i) => K.hang(st, i, st.layout.indexOf((i + 1) % r.tags.length)));
            else K.hang(st, 0, st.layout.indexOf(1));
            K.check(st);
          }
          A._busy = false; A._view = {}; A._paint();
        });
        await wait(60);
        const tag = `@${w} ${loc} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.ntg-tag:not(.is-card-tag):not(.is-on-card):not(.is-building),.ntg-piece,.ntg-apart,.ntg-frame,.ntg-card,.ntg-check:not([hidden])')].filter(vis);
          const txt = [...document.querySelectorAll('.ntg-l,.ntg-piece,.ntg-note,.ntg-glue,.ntg-ghostname')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.ntg-frame img,.ntg-card img')].filter(vis).map(e => e.getBoundingClientRect().width);
          const chk = document.querySelector('.ntg-check:not([hidden])');
          const low = [...document.querySelectorAll('.ntg-wall,.ntg-cards,.ntg-check:not([hidden])')].filter(vis).reduce((mx, e) => Math.max(mx, e.getBoundingClientRect().bottom + scrollY), 0);
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : low, H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out})`);
        is(m.pic >= minPic - 0.5 && m.txt >= 14, `${tag}: pictures ≥ ${minPic} (${Math.round(m.pic)}), text ≥ 14 (${m.txt})`);
        is(m.fold <= m.H + 1, `${tag}: Check / the board above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-name-tag: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
