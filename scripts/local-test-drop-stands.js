#!/usr/bin/env node
/* =====================================================================
   local-test-drop-stands.js — the interaction gate for ACTIVITY #34,
   "Comparing Length" (K.MD.A.2), the Drop-Down Stands.
   Real pointer: Check with nothing chosen (asks, no miss); a picture
   DRAGGED down folds its stand and dragged up unfolds it; a TAP on the
   stand folds it; a wrong choice and Check — every stand folds, the beam
   comes to rest ON the true tallest top (measured in pixels), the shorter
   one shows its gap; miss 2 — the halo; the right one wins. Lengths: a
   pencil DRAGGED left slides to the wall, the beam stops at the longest
   end; a whole row's shortest; "on the floor"; the keyboard; the mirrored
   pass; the width sweep at rest and revealed (no sideways scroll, every
   control ≥ 44 px, inside the card, above the fold, pressable).
   Usage: node scripts/local-test-drop-stands.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.compare-length.k-md-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'drop-stands-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, DropStandsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'drop-stands-activity.js'), 'utf8') + '\n;this.__A = DropStandsActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function open(loc, w) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/drop-stands-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.DropStandsActivity && window.DropStandsActivity.st && document.querySelector('.ds-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.DropStandsActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.DropStandsActivity.st; return { id: s.round, q: s.q, items: s.items.map(x => ({ size: x.size, lift: x.lift, down: x.down })), choice: s.choice, misses: s.misses, done: s.done, revealed: s.revealed, halo: s.halo }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ds-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const rect = (page, sel, nth) => page.evaluate((s, k) => { const el = document.querySelectorAll(s)[k || 0]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height }; }, sel, nth || 0);
  /* a point on the PICTURE of item i (not its stand) */
  const picPoint = (page, i) => page.evaluate((i) => { const t = window.DropStandsActivity, G = t._geo(i), sr = t._stage.getBoundingClientRect(); return { x: sr.left + (G.ink.l + G.ink.r) / 2, y: sr.top + (G.ink.t + G.ink.b) / 2 }; }, i);
  const standPoint = (page, i) => page.evaluate((i) => { const t = window.DropStandsActivity, G = t._geo(i), sr = t._stage.getBoundingClientRect(); return { x: sr.left + (G.ink.l + G.ink.r) / 2, y: sr.top + G.ink.b + Math.max(4, G.lift / 2) }; }, i);
  async function tapAt(page, p) { await page.mouse.click(p.x, p.y); await wait(80); }
  async function dragBy(page, p, dx, dy) { await page.mouse.move(p.x, p.y); await page.mouse.down(); for (let k = 1; k <= 10; k++) { await page.mouse.move(p.x + dx * k / 10, p.y + dy * k / 10); await wait(16); } await page.mouse.up(); await wait(120); }
  async function force(page, cmp, start, id, pass) {
    await page.evaluate((cmp, start, id, pass) => { const t = window.DropStandsActivity; t.api.settings.compare = cmp; t.api.settings.start = start; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = pass || 0; window.LCS_reloadFirstTask(); }, cmp, start, id, pass || 0);
    await wait(250);
  }
  async function checkBtn(page) { const c = await rect(page, '.ds-check'); await page.mouse.click(c.x, c.y); await wait(500); }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const stageWords = (page) => page.evaluate(() => { const st = document.querySelector('.lcs-stage'); const c = st.cloneNode(true); c.querySelectorAll('.ds-note, .ds-actions, svg').forEach(e => e.remove()); return c.textContent.trim(); });
  /* where the beam is, against the true extreme */
  const beamFit = (page) => page.evaluate(() => {
    const t = window.DropStandsActivity, st = t.st, b = document.querySelector('.ds-beam').getBoundingClientRect(), sr = t._stage.getBoundingClientRect();
    const g = st.items.map((_, i) => t._geo(i).ink);
    if (st.mode === 'height') { const top = Math.min(...g.map(x => x.t)); return { mode: 'h', diff: (b.bottom - sr.top) - top, at: g.findIndex(x => Math.abs(x.t - top) < 0.5), op: getComputedStyle(document.querySelector('.ds-beam')).opacity }; }
    const end = Math.max(...g.map(x => x.r)); return { mode: 'l', diff: (b.left - sr.left) - end, at: g.findIndex(x => Math.abs(x.r - end) < 0.5), op: getComputedStyle(document.querySelector('.ds-beam')).opacity };
  });
  const T = (loc, k) => STR[k][loc];

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. P1, the coconut palms: the shorter one on the higher stand */
    await force(page, 'two', 'stands', 'P1');
    is((await prompt(page)) === T(loc, 'pTaller'), `${loc}: the taller prompt`);
    is((await stageWords(page)) === '', `${loc}: no words on the apparatus`);
    await checkBtn(page);
    let s = await state(page);
    is(s.misses === 0 && !s.revealed && (await note(page)) === T(loc, 'tapTaller'), `${loc}: Check with nothing chosen asks first, no miss`);
    await dragBy(page, await picPoint(page, 1), 0, 60);
    is((await state(page)).items[1].down, `${loc}: the palm dragged down — its stand folds`);
    is(await page.evaluate(() => { const t = window.DropStandsActivity, G = t._geo(1); return Math.abs(G.ink.b - G.floorY) < 0.5; }), `${loc}: …and it stands on the floor`);
    await dragBy(page, await picPoint(page, 1), 0, -60);
    is(!(await state(page)).items[1].down, `${loc}: dragged up — the stand unfolds`);
    await tapAt(page, await standPoint(page, 1));
    s = await state(page);
    is(s.items[1].down && s.choice === null, `${loc}: a tap on the stand folds it (and chooses nothing)`);
    await dragBy(page, await picPoint(page, 1), 0, -60);
    await tapAt(page, await picPoint(page, 1));
    is((await state(page)).choice === 1 && await page.evaluate(() => document.querySelectorAll('.ds-ring')[1].classList.contains('is-on')), `${loc}: a tap on the picture chooses it (ring)`);
    await checkBtn(page);
    s = await state(page);
    is(s.misses === 1 && s.revealed && s.items.every(x => x.down), `${loc}: a wrong Check — every stand folds`);
    let bf = await beamFit(page);
    is(bf.at === 0 && Math.abs(bf.diff) < 1.5 && bf.op === '1', `${loc}: the beam rests on the true tallest top (off by ${bf.diff.toFixed(1)} px)`);
    is(await page.evaluate(() => getComputedStyle(document.querySelectorAll('.ds-gap')[1]).display !== 'none' && getComputedStyle(document.querySelectorAll('.ds-gap')[0]).display === 'none'), `${loc}: the shorter palm shows its gap under the beam`);
    is((await note(page)) === T(loc, 'missFloor'), `${loc}: miss 1: look where the beam rests`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'p1-miss1.png') });
    await dragBy(page, await picPoint(page, 1), 0, -60);
    is((await state(page)).items[1].down, `${loc}: after a miss the palms stay on the floor`);
    await checkBtn(page);
    s = await state(page);
    is(s.misses === 2 && s.halo && await page.evaluate(() => document.querySelectorAll('.ds-ring')[0].classList.contains('is-halo')), `${loc}: miss 2 — the right palm gets the halo`);
    is((await note(page)) === T(loc, 'haloReach'), `${loc}: "this one reaches the beam"`);
    await tapAt(page, await picPoint(page, 0)); await checkBtn(page);
    s = await state(page);
    is(s.done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'okTaller')), `${loc}: the right palm wins (${await bubble(page)})`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'p1-won.png') });

    /* 2. P2, pencils: one dragged LEFT slides to the wall; the beam stops at the longest end */
    await force(page, 'two', 'stands', 'P2');
    is((await prompt(page)) === T(loc, 'pLonger'), `${loc}: the longer prompt`);
    await dragBy(page, await picPoint(page, 1), -70, 0);
    is((await state(page)).items[1].down && await page.evaluate(() => { const t = window.DropStandsActivity, G = t._geo(1); return Math.abs(G.ink.l - (G.x0 + t._L.wallW)) < 0.5; }), `${loc}: the pencil dragged left — it touches the wall`);
    await dragBy(page, await picPoint(page, 1), 70, 0);
    is(!(await state(page)).items[1].down, `${loc}: dragged right — back where it was`);
    await tapAt(page, await picPoint(page, 1)); await checkBtn(page);
    bf = await beamFit(page);
    s = await state(page);
    is(s.done && bf.mode === 'l' && bf.at === 1 && Math.abs(bf.diff) < 1.5, `${loc}: the beam stops at the longest end (off by ${bf.diff.toFixed(1)} px); the longer pencil wins`);
    is((await bubble(page)).includes(T(loc, 'okLonger')), `${loc}: "…from the same wall…"`);

    /* 3. a whole row: the shortest bottle (the beam on the tallest, the biggest gap on the answer) */
    await force(page, 'row', 'stands', 'R9');
    is((await prompt(page)) === T(loc, 'pShortestH'), `${loc}: the shortest prompt`);
    s = await state(page);
    const ans = C.answer(s.items.map(x => x.size), 'shortestH');
    await tapAt(page, await picPoint(page, ans)); await checkBtn(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okShortestH')), `${loc}: the shortest bottle wins`);
    const gaps = await page.evaluate(() => [...document.querySelectorAll('.ds-gap')].map(g => g.getBoundingClientRect().height));
    is(gaps.indexOf(Math.max(...gaps)) === ans, `${loc}: the shortest has the biggest gap (${gaps.map(g => g.toFixed(0))})`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'r9-won.png') });

    /* 4. "on the floor": everything lined up, no stands */
    await force(page, 'two', 'floor', 'P5');
    s = await state(page);
    is(s.items.every(x => x.down && x.lift === 0) && await page.evaluate(() => !document.querySelector('.ds-stand')), `${loc}: "on the floor" — all lined up, no stands`);

    /* 5. the mirrored pass */
    await force(page, 'two', 'stands', 'P1', 1);
    s = await state(page);
    is(s.items[0].size === 0.78 && s.items[1].size === 1.00, `${loc}: on an odd pass the pair is mirrored`);

    /* 6. the keyboard */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'two', 'stands', 'P5');
      await page.focus('.ds-col'); await page.keyboard.press('ArrowDown'); await wait(60);
      is((await state(page)).items[0].down, `${loc}: keyboard: ArrowDown folds the stand`);
      await page.keyboard.press('ArrowUp'); await wait(60);
      is(!(await state(page)).items[0].down, `${loc}: keyboard: ArrowUp unfolds it`);
      await page.keyboard.press('Tab'); await page.keyboard.press('Space'); await wait(60);
      is((await state(page)).choice === 1, `${loc}: keyboard: Tab, Space chooses`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();
  }

  /* the width sweep: at rest and revealed */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [cmp, id] of [['two', 'P1'], ['two', 'P4'], ['two', 'P10'], ['row', 'R1'], ['row', 'R2'], ['row', 'R4'], ['row', 'R8']]) {
      await force(page, cmp, 'stands', id);
      const check = async (phase) => {
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), sg = document.querySelector('.ds-stage').getBoundingClientRect();
          const ctl = [...document.querySelectorAll('.ds-col, .ds-check')].filter(e => e.offsetParent !== null).map(e => { const r = e.getBoundingClientRect(); return { c: e.className.split(' ')[0], l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height }; });
          const ink = [...document.querySelectorAll('.ds-img, .ds-shape, .ds-beam')].filter(e => getComputedStyle(e).opacity !== '0').map(e => { const t = window.DropStandsActivity; return e.classList.contains('ds-beam') ? e.getBoundingClientRect() : null; }).filter(Boolean);
          const geo = window.DropStandsActivity.st.items.map((_, i) => window.DropStandsActivity._geo(i).ink);
          return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right }, sg: { l: sg.left, r: sg.right, t: sg.top, b: sg.bottom }, ctl, beams: ink.map(r => ({ l: r.left, r: r.right, t: r.top, b: r.bottom })), geo };
        });
        is(m.docW <= m.vw + 1, `${w} ${id} ${phase}: no sideways scroll (${m.docW} > ${m.vw})`);
        m.ctl.forEach(c => {
          if (c.l < m.app.l - 1 || c.r > m.app.r + 1) is(false, `${w} ${id} ${phase}: ${c.c} inside the card`);
          if (Math.min(c.w, c.h) < 44) is(false, `${w} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)} — under 44`);
          if (c.b > m.vh + 1) is(false, `${w} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b)} > ${m.vh})`);
        });
        const W = m.sg.r - m.sg.l, Hh = m.sg.b - m.sg.t;
        m.geo.forEach((g, i) => { if (g.l < -1 || g.r > W + 1 || g.t < -1 || g.b > Hh + 1) is(false, `${w} ${id} ${phase}: picture ${i + 1} drawn outside the stage (${g.l.toFixed(0)}..${g.r.toFixed(0)} / ${g.t.toFixed(0)}..${g.b.toFixed(0)} of ${W.toFixed(0)}×${Hh.toFixed(0)})`); });
        m.beams.forEach(b => { if (b.t < m.sg.t - 1 || b.r > m.sg.r + 1) is(false, `${w} ${id} ${phase}: the beam inside the stage`); });
        /* every column can be pressed: its picture point hit-tests to it */
        const blocked = await page.evaluate(() => { const t = window.DropStandsActivity, sr = t._stage.getBoundingClientRect(); return t.st.items.map((_, i) => { const G = t._geo(i); const x = sr.left + (G.ink.l + G.ink.r) / 2, y = sr.top + (G.ink.t + G.ink.b) / 2; if (y < 0 || y > innerHeight) return null; const h = document.elementFromPoint(x, y); return h === t._cols[i] ? null : 'picture ' + (i + 1) + ' under ' + (h ? String(h.className) : 'none'); }).filter(Boolean); });
        is(blocked.length === 0, `${w} ${id} ${phase}: every picture can be pressed (${blocked.join(', ')})`);
      };
      await check('rest');
      await page.evaluate(() => { const t = window.DropStandsActivity; DropStandsCore.choose(t.st, 0); t._check(); });
      await wait(400);
      await check('revealed');
      if (SHOT && (w === 360 || w === 704 || w === 1024) && (id === 'P4' || id === 'R1')) await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`) });
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-drop-stands: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
