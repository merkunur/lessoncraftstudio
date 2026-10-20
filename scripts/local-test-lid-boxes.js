#!/usr/bin/env node
/* =====================================================================
   local-test-lid-boxes.js — the interaction gate for ACTIVITY #55, the
   Pop-Up Sound Boxes (RF.K.2.d, 11 locales). Real pointer at 704, every
   round of every task in every locale:
     Task 1 — Check with nothing on the boxes asks (no miss); a distractor
       DRAGGED onto the boxes → its lids pop exactly where the lid test says
       (same colour + a bar per pair), the asked box stays shut (hintOther /
       hintNone, miss 1); a second distractor TAPPED on → miss 2: the asked
       box of every tray picture shows (hintListen); the answer DRAGGED on →
       right: the asked lids pop together, a pair token on the shelf;
     Task 2 — Check with no box asks; a wrong box → every lid opens
       (hintWhere); another wrong box → the answer box glows (miss 2); the
       answer → right;
     Task 3 — Check with pictures left asks; one picture DRAGGED into its
       basket, the rest tapped into baskets with two wrong → the two shake
       and show their boxes (hintSort); fixed → right.
   Also: the keyboard, the per-locale Position options (no Middle in it /
   fi / es / pt). And the width sweep (all locales at 320 / 704 / 1366, en
   at 320–1366) for every task at rest and after a miss: no sideways
   scroll, controls ≥ 44 px inside the card, pictures ≥ 96 / 64 px, text ≥
   14 px, boxes never overlapping, Check above the fold.
   Usage: node scripts/local-test-lid-boxes.js [--widths=…] [--locales=…]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const ID = 'sound-boxes.phoneme-position.rf-k-2-d';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'lid-boxes-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, LidBoxesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'lid-boxes-activity.js'), 'utf8') + '\n;this.__A = LidBoxesActivity;', ctx); return ctx.__A; })();
const STR = ACT.strings;
const Q = (loc, s) => (ACT.QUOTES[loc] || ACT.QUOTES.en)[0] + s + (ACT.QUOTES[loc] || ACT.QUOTES.en)[1];
const T = (loc, k, a) => { let s = STR[k][loc]; if (a) for (const x in a) s = s.split('{' + x + '}').join(a[x]); return s; };
const cap = (p) => p.charAt(0).toUpperCase() + p.slice(1);
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
    await page.goto(`${base}/lid-boxes-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LidBoxesActivity && window.LidBoxesActivity.st && document.querySelector('.lbx-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.LidBoxesActivity.FAST = true; });
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.LidBoxesActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, test: s.test, chosen: s.chosen, layout: s.layout, bins: s.bins, order: s.order, misses: s.misses, help: s.help, done: s.done, last: s.last })); });
  const note = (page) => page.evaluate(() => document.querySelector('.lbx-note').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  async function tap(page, sel) { const p = await ctr(page, sel); if (!p) throw new Error('nothing to tap: ' + sel); await page.mouse.click(p.x, p.y); await wait(40); }
  async function drag(page, from, to) {
    const a = await ctr(page, from); if (!a) throw new Error('nothing to drag: ' + from);
    const b = await page.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, to);
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let k = 1; k <= 10; k++) await page.mouse.move(a.x + (b.x - a.x) * k / 10, a.y + (b.y - a.y) * k / 10);
    await page.mouse.up(); await wait(60);
  }
  async function force(page, task, pos, id) {
    await page.evaluate((task, pos, id) => { const a = window.LidBoxesActivity; a.FAST = true; a.api.settings.task = task; if (pos) a.api.settings.pos = pos; a._pool = null; a._poolKey = null; const pool = a._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); a._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); a._curPass = 0; window.LCS_reloadFirstTask(); }, task, pos, id);
    await wait(80);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  async function check(page) { await tap(page, '.lbx-check'); await page.waitForFunction(() => !window.LidBoxesActivity._busy, { timeout: 8000 }); await wait(40); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 6000 }).then(() => true).catch(() => false);
  const okRun = (page) => page.evaluate(() => { window.LidBoxesActivity.OK_MS = 0; });
  const lidOf = (r, c) => C.lidTest(r.target, c.w);

  for (const loc of LOCS) {
    console.log('— ' + loc);
    const { page, errs } = await open(704, loc);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === STR.title[loc], `${loc}: the title`);
    const opts = await page.evaluate(() => window.LidBoxesActivity.settings[1].options.map(o => o.value).join());
    is(opts === C.positions(loc).concat(['mixed']).join(), `${loc}: Position options ${opts}`);
    /* Task 1 */
    for (const P of C.positions(loc)) for (const r of C.rounds(loc, 'same', P)) {
      await okRun(page); await force(page, 'same', P, r.id);
      const tag = `${loc} ${r.id}`, ai = C.asked(r.target, r.pos);
      let s = await state(page);
      const look = await page.evaluate(() => ({ boxes: document.querySelectorAll('.lbx-row.is-target .lbx-box.is-open').length, cands: document.querySelectorAll('.lbx-pic.is-cand').length, on: [...document.querySelectorAll('.lbx-arrows span')].findIndex(e => e.classList.contains('is-on')), asked: [...document.querySelectorAll('.lbx-row.is-target .lbx-box')].findIndex(e => e.classList.contains('is-asked')), lets: [...document.querySelectorAll('.lbx-row.is-target .lbx-let')].map(e => e.textContent).join('|') }));
      is(look.boxes === r.target.boxes.length && look.cands === 3 && look.on === ai && look.asked === ai && look.lets === r.target.boxes.map(b => b.replace(/_e$/, '').charAt(0) + b.replace(/_e$/, '').slice(1)).join('|'), `${tag}: the target's open boxes (${look.lets}), the arrow on box ${ai + 1}, three pictures`);
      await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintDrop'), `${tag}: Check with nothing on the boxes asks (no miss)`);
      const sl = (role) => s.layout.indexOf(['answer', 'd1', 'd2'].indexOf(role));
      await drag(page, `.lbx-pic.is-cand[data-i="${sl('d1')}"]`, '.lbx-test'); s = await state(page);
      is(s.test === sl('d1'), `${tag}: a picture dragged onto the boxes lands there`);
      await check(page); s = await state(page);
      const d1 = r.cands.find(c => c.role === 'd1'), lt = lidOf(r, d1), want = lt.filter(p => p.same).length;
      const pop = await page.evaluate(() => ({ t: document.querySelectorAll('.lbx-row.is-target .lbx-box.is-pop').length, c: document.querySelectorAll('.lbx-row.is-test .lbx-box.is-pop').length, bars: document.querySelectorAll('.lbx-bars line.lbx-barline').length, asked: document.querySelector('.lbx-row.is-target .lbx-box.is-asked').classList.contains('is-pop') }));
      is(s.misses === 1 && pop.t === want && pop.c === want && pop.bars === want && !pop.asked, `${tag}: "${d1.w.word}" — ${want} lid(s) pop in both rows with a bar each, the asked box stays shut (${JSON.stringify(pop)})`);
      is((await note(page)) === T(loc, want ? 'hintOther' + cap(r.pos) : 'hintNone', { target: r.target.word }), `${tag}: the miss-1 hint`);
      await tap(page, `.lbx-pic.is-cand[data-i="${sl('d2')}"]`); await check(page); s = await state(page);
      const help = await page.evaluate(() => document.querySelectorAll('.lbx-cell .lbx-box.is-help').length);
      is(s.misses === 2 && help === r.cands.filter(c => C.asked(c.w, r.pos) >= 0).length && (await note(page)) === T(loc, 'hintListen' + cap(r.pos)), `${tag}: miss 2 — the asked box of every tray picture (${help})`);
      await drag(page, `.lbx-pic.is-cand[data-i="${sl('answer')}"]`, '.lbx-test'); s = await state(page);
      is((await page.evaluate(() => document.querySelectorAll('.lbx-cell .lbx-box.is-help').length)) === 0, `${tag}: the move takes the help away`);
      await check(page); s = await state(page);
      const win = await page.evaluate(() => ({ asked: document.querySelector('.lbx-row.is-target .lbx-box.is-asked').classList.contains('is-pop'), tokens: document.querySelectorAll('.lbx-token').length }));
      is(s.done && win.asked && win.tokens >= 1, `${tag}: the answer — the asked lids pop together, a pair on the shelf`);
      is(await celebrated(page), `${tag}: celebrates`);
    }
    /* Task 2 */
    for (const r of C.rounds(loc, 'where')) {
      await okRun(page); await force(page, 'where', null, r.id);
      const tag = `${loc} ${r.id}`, n = r.target.boxes.length;
      let s = await state(page);
      is((await page.evaluate(() => document.querySelectorAll('.lbx-row.is-where .lbx-box.is-open').length)) === 0 && (await page.evaluate(() => document.querySelector('.lbx-card').textContent)) === r.card, `${tag}: the card ${r.card}, every lid shut`);
      await check(page); s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintTap', { card: Q(loc, r.card) }), `${tag}: Check with no box asks`);
      const w1 = (r.answer + 1) % n, w2 = (r.answer + 2) % n;
      await tap(page, `.lbx-box[data-k="box${w1}"]`); await check(page); s = await state(page);
      is(s.misses === 1 && (await page.evaluate(() => document.querySelectorAll('.lbx-row.is-where .lbx-box.is-open').length)) === n && (await note(page)) === T(loc, 'hintWhere', { card: Q(loc, r.card) }), `${tag}: a wrong box — every lid opens`);
      await tap(page, `.lbx-box[data-k="box${w2 === r.answer ? w1 : w2}"]`); await check(page); s = await state(page);
      is(s.misses === 2 && (await page.evaluate((a) => document.querySelector(`.lbx-box[data-k="box${a}"]`).classList.contains('is-glow'), r.answer)), `${tag}: miss 2 — the answer box glows`);
      await tap(page, `.lbx-box[data-k="box${r.answer}"]`); await check(page); s = await state(page);
      is(s.done && (await celebrated(page)), `${tag}: the right box`);
    }
    /* Task 3 */
    for (const r of C.rounds(loc, 'sort')) {
      await okRun(page); await force(page, 'sort', null, r.id);
      const tag = `${loc} ${r.id}`;
      is((await page.evaluate(() => document.querySelectorAll('.lbx-stray .lbx-pic').length)) === 8, `${tag}: eight pictures in the tray`);
      await check(page); let s = await state(page); is(s.misses === 0 && (await note(page)) === T(loc, 'hintBaskets'), `${tag}: Check with pictures left asks`);
      const first = s.order[0], firstBin = r.items[first].yes ? 'yes' : 'no';
      await drag(page, `.lbx-pic[data-k="item${first}"]`, `.lbx-basket[data-bin="${firstBin}"]`); s = await state(page);
      is(s.bins[first] === firstBin, `${tag}: a picture dragged into its basket`);
      const wrongs = s.order.slice(1, 3);
      for (const i of s.order.slice(1)) { const bin = (r.items[i].yes ? 'yes' : 'no'), put = wrongs.includes(i) ? (bin === 'yes' ? 'no' : 'yes') : bin; await tap(page, `.lbx-pic[data-k="item${i}"]`); await tap(page, `.lbx-blabel[data-k="bin-${put}"]`); }
      await check(page); s = await state(page);
      const sh = await page.evaluate(() => document.querySelectorAll('.lbx-scell.is-wrong').length);
      is(s.misses === 1 && sh === 2 && (await note(page)) === T(loc, 'hintSort'), `${tag}: two in the wrong basket shake and show their boxes (${sh})`);
      for (const i of wrongs) { await tap(page, `.lbx-pic[data-k="item${i}"]`); await tap(page, `.lbx-blabel[data-k="bin-${r.items[i].yes ? 'yes' : 'no'}"]`); }
      await check(page); s = await state(page);
      is(s.done && (await celebrated(page)), `${tag}: all sorted — right`);
    }
    /* keyboard */
    await page.evaluate(() => { window.LidBoxesActivity.OK_MS = 60000; });
    const wr = C.rounds(loc, 'where')[0]; await force(page, 'where', null, wr.id);
    await page.focus('.lbx-wrap'); await page.keyboard.press('ArrowRight'); let s = await state(page);
    is(s.chosen === 0, `${loc}: → raises the first lid`);
    const sr = C.rounds(loc, 'sort')[0]; await force(page, 'sort', null, sr.id); s = await state(page);
    await page.focus(`.lbx-pic[data-k="item${s.order[0]}"]`); await page.keyboard.press('Enter'); await page.keyboard.press('y'); s = await state(page);
    is(s.bins[s.order[0]] === 'yes', `${loc}: Enter picks a picture, Y puts it in the YES basket`);
    is(errs.length === 0, `${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  const sweep = [];
  for (const w of WIDTHS) for (const loc of LOCS) if (loc === 'en' || [320, 704, 1366].includes(w)) sweep.push([w, loc]);
  for (const [w, loc] of sweep) {
    const { page, errs } = await open(w, loc);
    await page.evaluate(() => { window.LidBoxesActivity.OK_MS = 60000; });
    const cases = [];
    for (const P of C.positions(loc)) cases.push(['same', P, C.rounds(loc, 'same', P)[P === 'first' ? 0 : 1]]);
    const longest = C.rounds(loc, 'same', 'first').concat(C.rounds(loc, 'same', 'last')).sort((a, b) => Math.max(b.target.boxes.length, ...b.cands.map(c => c.w.boxes.length)) - Math.max(a.target.boxes.length, ...a.cands.map(c => c.w.boxes.length)))[0];
    cases.push(['same', longest.pos, longest]);
    cases.push(['where', null, C.rounds(loc, 'where').slice().sort((a, b) => b.target.boxes.length - a.target.boxes.length)[0]]);
    cases.push(['sort', null, C.rounds(loc, 'sort')[0]]);
    for (const [task, P, r] of cases) {
      await force(page, task, P, r.id);
      for (const phase of ['rest', 'miss']) {
        if (phase === 'miss') await page.evaluate(() => {
          const A = window.LidBoxesActivity, K = window.LidBoxesCore, st = A.st, r = st.r;
          if (r.task === 'same') { K.drop(st, st.layout.indexOf(1)); K.check(st); K.drop(st, st.layout.indexOf(2)); K.check(st); K.drop(st, st.layout.indexOf(1)); K.check(st); }
          else if (r.task === 'where') { K.choose(st, (r.answer + 1) % r.target.boxes.length); K.check(st); }
          else { r.items.forEach((it, i) => K.place(st, i, it.yes ? 'no' : 'yes')); K.check(st); }
          A._busy = false; A._view = {}; A._paint();
        });
        await wait(60);
        const tag = `@${w} ${loc} ${r.id} ${phase}`;
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), de = document.documentElement;
          const vis = (e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden';
          const ctl = [...document.querySelectorAll('.lbx-pic,button.lbx-box,.lbx-blabel,.lbx-check:not([hidden])')].filter(vis);
          const txt = [...document.querySelectorAll('.lbx-box.is-open .lbx-let,.lbx-card,.lbx-bcard,.lbx-note,.lbx-tb')].filter(e => e.textContent && vis(e)).map(e => parseFloat(getComputedStyle(e).fontSize));
          const pics = [...document.querySelectorAll('.lbx-pic img')].filter(vis).map(e => e.getBoundingClientRect().width);
          let hit = 0; [...document.querySelectorAll('.lbx-row')].forEach(row => { const b = [...row.querySelectorAll(':scope > .lbx-box')].map(e => e.getBoundingClientRect()); for (let i = 1; i < b.length; i++) if (b[i].left < b[i - 1].right - 1) hit++; });
          const chk = document.querySelector('.lbx-check:not([hidden])');
          return {
            side: de.scrollWidth - de.clientWidth,
            small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className).slice(0, 3),
            out: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.left < app.left - 1 || b.right > app.right + 1; }).length,
            hit, txt: txt.length ? Math.min(...txt) : 99, pic: pics.length ? Math.min(...pics) : 999,
            fold: chk ? chk.getBoundingClientRect().bottom + scrollY : 0, H: innerHeight
          };
        });
        const minPic = w >= 704 ? 96 : 64;
        is(m.side <= 0 && !m.small.length && m.out === 0, `${tag}: no sideways scroll, controls ≥ 44 inside the card (side ${m.side}, small ${m.small.join('/')}, out ${m.out})`);
        is(m.pic >= minPic - 0.5 && m.txt >= 14 && m.hit === 0, `${tag}: pictures ≥ ${minPic} (${Math.round(m.pic)}), text ≥ 14 (${m.txt}), boxes not overlapping (${m.hit})`);
        is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
      }
    }
    is(errs.length === 0, `@${w} ${loc}: no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-lid-boxes: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
