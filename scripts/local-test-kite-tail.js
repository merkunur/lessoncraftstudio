#!/usr/bin/env node
/* =====================================================================
   local-test-kite-tail.js — the interaction gate for ACTIVITY #45, the
   Kite Tail (RF.K.2.B, en). Real pointer, every round of every level:
     count — one bow at rest; Check untouched asks (one beat flies); one
       bow too many by TAPS → sag, a blank bow; a tail bow TAPPED unties;
       the right bows → steady, the word under the kite;
     tie — the word's bows DRAGGED on reversed → the tail knots (miss); the
       foreign bow → sent back; then word order → steady; Write: typed on
       the letter keys, a wrong split → the split hint, the right split rides;
     fix — a same-word bow in the gap → sent back; swaps by TAP → steady;
     fence — the card DRAGGED to a wrong kite → spin/sag, then the right kite;
     tassels — tassels TAPPED onto the rails, one too many → bare tassel,
       then the right count → steady.
   Settings, the keyboard, and the width sweep (no sideways scroll, controls
   ≥ 44 px inside the card, pictures ≥ 64 px, above the fold, at rest and done).
   Usage: node scripts/local-test-kite-tail.js [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'syllable-builder.build-words-from-syllables.rf-k-2-b';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'kite-tail-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, KiteTailCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'kite-tail-activity.js'), 'utf8') + '\n;this.__A = KiteTailActivity;', ctx); return ctx.__A.strings; })();
const T = (k, a) => { let s = STR[k].en; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
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
    await page.goto(`${base}/kite-tail-activity.html?activity=${ID}&lang=en&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.KiteTailActivity && window.KiteTailActivity.st && document.querySelector('.kt-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.KiteTailActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.KiteTailActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, level: s.r.level, t: s.r.t, bare: s.r.bare, w: s.r.w, kites: s.r.kites, bows: s.bows, knots: s.knots, box: s.box, bowsAll: s.bowsAll, order: s.order, typed: s.typed, tassels: s.tassels, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.kt-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(60); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('no ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(a.x + (b.x - a.x) * i / 8, a.y + (b.y - a.y) * i / 8);
    await page.mouse.up(); await wait(80);
  }
  async function force(page, lv, id, set) {
    await page.evaluate((lv, id, set) => { const a = window.KiteTailActivity; Object.assign(a.api.settings, { bows: 'pick', kites: '123', cards: 'pictures' }, set || {}); a.api.settings.level = lv; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, lv, id, set);
    await wait(150);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const okRun = async (page) => { await page.evaluate(() => { window.KiteTailActivity.OK_MS = 0; }); };

  console.log('— en');
  const { page, errs } = await open(704);
  is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T('title'), 'the title');
  /* count */
  for (const r of C.rounds('count')) {
    await okRun(page); await force(page, 'count', r.id);
    const n = r.w.syl.length;
    is((await page.evaluate(() => document.querySelectorAll('.kt-tail .kt-knot').length)) === 1, `${r.id}: one bow at rest`);
    if (n === 1) { await tap(page, '.kt-check'); is((await state(page)).done, `${r.id}: one beat — the kite flies`); is(await celebrated(page), `${r.id}: celebrates`); continue; }
    await tap(page, '.kt-check'); is((await state(page)).misses === 0 && (await note(page)) === T('hintCount'), `${r.id}: Check untouched asks`);
    for (let i = 1; i <= n; i++) await tap(page, '.kt-spare');
    await tap(page, '.kt-check'); let s = await state(page);
    is(s.misses === 1 && s.last.result === 'sag' && (await page.evaluate(() => document.querySelectorAll('.kt-knot.is-blank').length)) === 1 && (await note(page)) === T('hintSag'), `${r.id}: one bow too many — a blank bow, sag`);
    await tap(page, '.kt-tail .kt-knot[data-k="0"]'); s = await state(page);
    is(s.bows === n, `${r.id}: a tail bow tapped unties`);
    await tap(page, '.kt-check'); s = await state(page);
    is(s.done && (await page.evaluate(() => (document.querySelector('.kt-word') || {}).textContent)) === r.w.word, `${r.id}: ${n} bows — steady, the word`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* tie */
  for (const r of C.rounds('tie')) {
    await okRun(page); await force(page, 'tie', r.id);
    let s = await state(page); const n = r.w.syl.length;
    const word = s.bowsAll.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).map(b => b.id), foreign = s.bowsAll.find(b => b.s < 0).id;
    await tap(page, '.kt-check'); is((await state(page)).misses === 0 && (await note(page)) === T('hintTie'), `${r.id}: Check with an empty tail asks`);
    for (let i = 0; i < n; i++) await drag(page, `.kt-boxbow[data-id="${word[n - 1 - i]}"]`, `.kt-tail .kt-knot[data-k="${i}"]`);
    s = await state(page); is(s.knots.join() === word.slice().reverse().join(), `${r.id}: the bows dragged on in reverse`);
    await tap(page, '.kt-check'); s = await state(page);
    is(s.misses === 1 && s.last.result === 'tangle' && s.last.tangleAt === 0, `${r.id}: the tail knots at the first bow (miss)`);
    for (let i = 0; i < n; i++) await tap(page, `.kt-tail .kt-knot[data-k="${i}"]`);
    await drag(page, `.kt-boxbow[data-id="${foreign}"]`, '.kt-tail .kt-knot[data-k="0"]'); await tap(page, '.kt-check'); s = await state(page);
    is(s.last.result === 'foreign' && s.box.includes(foreign) && (await note(page)) === T('hintForeign'), `${r.id}: the foreign bow is sent back`);
    for (const id of word) await tap(page, `.kt-boxbow[data-id="${id}"]`);
    s = await state(page); is(s.knots.join() === word.join(), `${r.id}: box bows tapped tie in turn`);
    await tap(page, '.kt-check'); is((await state(page)).done, `${r.id}: word order — steady`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* write */
  for (const r of C.rounds('tie').slice(0, 4)) {
    await okRun(page); await force(page, 'tie', r.id, { bows: 'write' });
    const w = r.w.word, cut = r.w.syl[0].length + 1, alt = [w.slice(0, cut), w.slice(cut)];
    for (const ch of alt[0]) await tap(page, `.kt-key:nth-child(${ch.charCodeAt(0) - 96})`);
    await tap(page, '.kt-tail .kt-knot[data-k="1"]');
    for (const ch of alt[1]) await tap(page, `.kt-key:nth-child(${ch.charCodeAt(0) - 96})`);
    let s = await state(page); is(s.typed.join('|') === alt.join('|'), `${r.id} write: typed ${alt.join('|')} on the letter keys`);
    await tap(page, '.kt-check'); s = await state(page);
    is(s.last.result === 'split' && /Split between|Say it slowly/.test(await note(page)), `${r.id} write: a wrong split — "${await note(page)}"`);
    await tap(page, '.kt-tail .kt-knot[data-k="0"]'); await tap(page, '.kt-key.is-back');
    await tap(page, '.kt-tail .kt-knot[data-k="1"]'); for (let i = 0; i < alt[1].length; i++) await tap(page, '.kt-key.is-back');
    await tap(page, '.kt-tail .kt-knot[data-k="1"]');
    for (const ch of r.w.syl[1]) await tap(page, `.kt-key:nth-child(${ch.charCodeAt(0) - 96})`);
    s = await state(page); is(s.typed.join('|') === r.w.syl.join('|'), `${r.id} write: re-typed ${s.typed.join('|')}`);
    await tap(page, '.kt-check'); is((await state(page)).done, `${r.id} write: the gated split — steady`);
    is(await celebrated(page), `${r.id} write: celebrates`);
  }
  /* fix */
  for (const r of C.rounds('fix')) {
    await okRun(page); await force(page, 'fix', r.id);
    let s = await state(page);
    if (r.t === 'a') {
      const same = s.bowsAll.find(b => b.s === -2).id, ans = s.bowsAll.find(b => b.s === r.bare).id;
      await tap(page, `.kt-boxbow[data-id="${same}"]`); await tap(page, '.kt-check'); s = await state(page);
      is(s.last.result === 'sameword' && s.box.includes(same) && (await note(page)) === T('hintSameWord'), `${r.id}: a same-word bow is sent back`);
      await tap(page, `.kt-boxbow[data-id="${ans}"]`);
    } else {
      await tap(page, '.kt-check'); is((await state(page)).misses === 0, `${r.id}: Check untouched asks`);
      for (let g = 0; g < 4; g++) { s = await state(page); if (s.order.every((x, i) => x === i)) break; const i = s.order.findIndex((x, j) => x !== j), j = s.order.indexOf(i); await tap(page, `.kt-tail .kt-knot[data-k="${i}"]`); await tap(page, `.kt-tail .kt-knot[data-k="${j}"]`); }
    }
    await tap(page, '.kt-check'); is((await state(page)).done, `${r.id}: fixed — steady`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* fence */
  for (const r of C.rounds('fence')) {
    await okRun(page); await force(page, 'fence', r.id);
    const n = r.w.syl.length, wrong = r.kites.findIndex(b => b !== n), right = r.kites.indexOf(n);
    is(!(await page.evaluate(() => { const b = document.querySelector('.kt-check'); return b && !b.hidden; })), `${r.id}: no Check on the fence`);
    await drag(page, '.kt-card', `.kt-fkite[data-kite="${wrong}"]`); let s = await state(page);
    is(s.misses === 1 && !s.done && (await note(page)) === T(n > r.kites[wrong] ? 'hintFenceFew' : 'hintFenceMany'), `${r.id}: the ${r.kites[wrong]}-bow kite — ${s.last.result}`);
    await drag(page, '.kt-card', `.kt-fkite[data-kite="${right}"]`); s = await state(page);
    is(s.done, `${r.id}: the ${n}-bow kite — fits`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* tassels */
  for (const r of C.rounds('tassels')) {
    await okRun(page); await force(page, 'tassels', r.id);
    for (let b = 0; b < r.sounds.length; b++) for (let t = 0; t < r.sounds[b].length + (b === 0 ? 1 : 0); t++) await tap(page, `.kt-hook[data-hook="${b}"]`);
    let s = await state(page); is(s.tassels.join() === r.sounds.map((g, i) => g.length + (i === 0 ? 1 : 0)).join(), `${r.id}: tassels tapped onto the rails`);
    await tap(page, '.kt-check'); s = await state(page);
    is(s.misses === 1 && (await page.evaluate(() => document.querySelectorAll('.kt-tassel.is-bare').length)) === 1, `${r.id}: one tassel too many — it stays bare`);
    await tap(page, '.kt-rail[data-rail="0"] .kt-tassel.is-bare');
    s = await state(page); is(s.tassels[0] === r.sounds[0].length, `${r.id}: a tapped tassel falls off`);
    await tap(page, '.kt-check'); s = await state(page);
    is(s.done && (await page.evaluate(() => [...document.querySelectorAll('.kt-tassel b')].map(e => e.textContent).join(''))) === r.sounds.flat().join(''), `${r.id}: steady — the letters on the tassels`);
    is(await celebrated(page), `${r.id}: celebrates`);
  }
  /* settings */
  await page.evaluate(() => { window.KiteTailActivity.OK_MS = 60000; });
  await force(page, 'fence', 'fence-pizza');
  for (const v of ['words', 'pictures']) { await page.evaluate((v) => { const a = window.KiteTailActivity; a.api.settings.cards = v; a.onSettings(); }, v); is((await page.evaluate(() => !!document.querySelector('.kt-cword'))) === (v === 'words'), `Cards: ${v}`); }
  await force(page, 'fence', 'fence-23-pizza', { kites: '23' }); is((await page.evaluate(() => document.querySelectorAll('.kt-fkite').length)) === 2, 'Kites: two or three');
  await force(page, 'tie', 'tie-muffin', { bows: 'write' }); is((await page.evaluate(() => !document.querySelector('.kt-keys').hidden && document.querySelector('.kt-box').hidden)), 'Bows: Write shows the letter keys, no box');
  /* keyboard */
  await force(page, 'count', 'count-rabbit');
  await page.focus('.kt-spare'); await page.keyboard.press('+'); is((await state(page)).bows === 2, '+ ties a bow');
  await page.keyboard.press('-'); is((await state(page)).bows === 1, '− unties');
  await force(page, 'tie', 'tie-carrot', { bows: 'write' });
  await page.focus('.kt-key'); for (const ch of 'car') await page.keyboard.press(ch);
  is((await state(page)).typed[0] === 'car', 'physical letters type into the focused bow');
  is(errs.length === 0, `no console errors (${errs.slice(0, 3).join(' | ')})`);
  await page.close();

  /* the width sweep */
  for (const w of WIDTHS) {
    const o = await open(w);
    await o.page.evaluate(() => { window.KiteTailActivity.OK_MS = 60000; });
    const cases = C.rounds('count').map(r => ['count', r.id, null]).concat(C.rounds('tie').map(r => ['tie', r.id, null]), C.rounds('tie').slice(0, 2).concat(C.rounds('tie').slice(8)).map(r => ['tie', r.id, { bows: 'write' }]), C.rounds('fix').map(r => ['fix', r.id, null]), C.rounds('fence').map(r => ['fence', r.id, null]), C.rounds('tassels').map(r => ['tassels', r.id, null]));
    for (const [lv, id, set] of cases) {
      await force(o.page, lv, id, set);
      for (const phase of ['rest', 'done']) {
        if (phase === 'done') await o.page.evaluate(() => { const A = window.KiteTailActivity, C2 = window.KiteTailCore, st = A.st, r = st.r, n = r.w.syl.length; if (r.level === 'count') { for (let i = 1; i < n; i++) C2.tie(st); A._gust(); } else if (r.level === 'tie' && st.write) { r.w.syl.forEach((s, i) => C2.type(st, i, s)); A._gust(); } else if (r.level === 'tie') { st.bowsAll.filter(b => b.s >= 0).sort((a, b) => a.s - b.s).forEach((b, i) => C2.tieBow(st, b.id, i)); A._gust(); } else if (r.level === 'fix' && r.t === 'a') { C2.tieBow(st, st.bowsAll.find(b => b.s === r.bare).id, r.bare); A._gust(); } else if (r.level === 'fix') { while (!st.order.every((s, i) => s === i)) { const i = st.order.findIndex((s, j) => s !== j); C2.swap(st, i, st.order.indexOf(i)); } A._gust(); } else if (r.level === 'fence') { A._tryCard(r.kites.indexOf(n)); } else { r.sounds.forEach((g, i) => { for (let t = 0; t < g.length; t++) C2.tassel(st, i, 1); }); A._gust(); } });
        const m = await o.page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const ctl = [...document.querySelectorAll('.kt-check:not([hidden]),.kt-tail .kt-knot,.kt-boxbow,.kt-spare,.kt-key,.kt-fkite,.kt-card,.kt-rail,.kt-kite')].filter(e => e.offsetParent);
          const pics = [...document.querySelectorAll('.kt-pic,.kt-cpic')].filter(e => e.offsetParent).map(e => e.getBoundingClientRect().width);
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 44 || b.height < 44; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            pic: pics.length ? Math.min(...pics) : 999, low: Math.max(...ctl.map(e => e.getBoundingClientRect().bottom + scrollY)), H: innerHeight
          };
        });
        is(m.side <= 0 && !m.small.length && m.out === 0 && m.pic >= 64, `@${w} ${id}${set ? ' write' : ''} ${phase}: no sideways scroll, controls ≥ 44 inside the card, pictures ≥ 64 (side ${m.side}, small ${m.small.join('/')}, out ${m.out}, pic ${Math.round(m.pic)})`);
        is(m.low <= m.H, `@${w} ${id}${set ? ' write' : ''} ${phase}: every control above the fold (${Math.round(m.low)} ≤ ${m.H})`);
        if (SHOT && (w === 360 || w === 704 || w === 1024) && ['count-butterfly', 'tie-gingerbread', 'fix-umbrella', 'fence-pizza', 'tassels-tractor'].includes(id) && !set) await o.page.screenshot({ path: path.join(SHOT, `en-${w}-${id}-${phase}.png`), fullPage: true });
      }
    }
    is(o.errs.length === 0, `@${w}: no console errors`);
    await o.page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-kite-tail: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
