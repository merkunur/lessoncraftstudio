#!/usr/bin/env node
/* =====================================================================
   local-test-paint-pots.js — the interaction gate for ACTIVITY #37, the
   Paint Pots (K.G.A.2). Real pointer: Check with nothing painted (asks, no
   miss); a tap with no tin (the brush traces, nothing is painted); a tin
   picked; paint WET at the tap whatever the piece; a painted piece lifted
   back; Check sets the right pieces and sheds the wrong one into the
   puddle ("count its corners"); the rest painted → the picture done; the
   miss ladder (one more {shape} + the dripping quadrant, then the glowing
   pieces); a leaking open triangle; a kite in a diamond tin ("look at the
   sides"); count rounds with the − / + counters; clue and name labels; the
   setting changes the board; the keyboard; the width sweep at rest, wet,
   miss 1 and miss 2 (no sideways scroll, controls ≥ 44 px, inside the
   card, above the fold, pressable; no words on the board).
   Usage: node scripts/local-test-paint-pots.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.shape-id.k-g-a-2';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'paint-pots-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, PaintPotsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'paint-pots-activity.js'), 'utf8') + '\n;this.__A = PaintPotsActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function exact(file) { const parts = path.relative(REPO, file).split(path.sep); let cur = REPO; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() { return http.createServer((req, res) => { const p = decodeURIComponent(req.url.split('?')[0]); const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : path.join(MINI, p.replace(/^\//, '')); if (!exact(file)) { res.statusCode = 404; res.end(); return; } fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); }); }); }
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function open(loc, w) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/paint-pots-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PaintPotsActivity && window.PaintPotsActivity.st && document.querySelector('.pp-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.PaintPotsActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await installPress(page);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.PaintPotsActivity.st; return JSON.parse(JSON.stringify({ id: s.r.id, tin: s.tin, painted: s.painted, set: s.set, count: s.count, misses: s.misses, help: s.help, done: s.done })); });
  const note = (page) => page.evaluate(() => document.querySelector('.pp-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  /* a piece: its centroid in page px (inside the shape, also for insets on top) */
  /* a point that really presses the piece (a parent's centre may sit under an inset) */
  const piece = (page, pid) => page.evaluate((pid) => { const t = window.PaintPotsActivity; t._pEls[pid].scrollIntoView({ block: 'center', behavior: 'instant' }); return window.__ppPressPoint(pid); }, pid);
  const installPress = (page) => page.evaluate(() => {
    window.__ppPressPoint = function (pid) {
      const t = window.PaintPotsActivity, pc = t._byId[pid], el = t._pEls[pid], svg = t._boardEl, m = svg.getScreenCTM(), c = PaintPotsCore.centroid(pc.pts);
      const xs = pc.pts.map(p => p[0]), ys = pc.pts.map(p => p[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys), cand = [c];
      for (let i = 1; i < 12; i++) for (let j = 1; j < 12; j++) cand.push([x0 + (x1 - x0) * i / 12, y0 + (y1 - y0) * j / 12]);
      for (const p of cand) { const pt = svg.createSVGPoint(); pt.x = p[0]; pt.y = p[1]; const q = pt.matrixTransform(m), h = document.elementFromPoint(q.x, q.y); if (h && (el.contains(h) || (h.classList && h.classList.contains('pp-patch') && h.getAttribute('data-id') === pid))) return { x: q.x, y: q.y }; }
      return null;
    };
  });
  async function tap(p, page) { if (!p) throw new Error('nothing to tap'); await page.mouse.click(p.x, p.y); await wait(90); }
  const tin = async (page, i) => tap(await ctr(page, `.pp-tin[data-i="${i}"]`), page);
  const check = async (page) => tap(await ctr(page, '.pp-check'), page);
  async function force(page, board, id, labels) {
    await page.evaluate((b, id, lab) => { const t = window.PaintPotsActivity; t.api.settings.board = b; t.api.settings.labels = lab || 'shape'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, board, id, labels);
    await wait(250);
    const s = await state(page); if (s.id !== id) throw new Error('force ' + id + ' landed on ' + s.id);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const T = (loc, k) => STR[k][loc];
  const count = (page, sel) => page.evaluate((s) => document.querySelectorAll(s).length, sel);

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. the house */
    await force(page, 'picture', 'house');
    const r = C.rounds('picture').find(x => x.id === 'house'), TG = C.targets(r), ps = C.piecesOf(r);
    const ti = r.tins.indexOf('triangle'), si = r.tins.indexOf('square'), wall = ps.find(p => p.t === 'rect' && p.spec.w === 240).id;
    is((await prompt(page)) === T(loc, 'pPicture'), `${loc}: the prompt`);
    is(await page.evaluate(() => !document.querySelector('.pp-board text') && document.querySelector('.pp-board').textContent.trim() === ''), `${loc}: no words on the board`);
    is(await page.evaluate(() => document.querySelectorAll('.pp-board img').length === 0), `${loc}: no library pictures — pieces only`);
    is((await count(page, '.pp-tin')) === 2 && (await count(page, '.pp-labshape')) === 2, `${loc}: two tins, each with its shape outline`);
    await check(page);
    is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'hintStart'), `${loc}: Check with nothing painted asks — not a miss`);
    await tap(await piece(page, TG.triangle[0]), page);
    is(Object.keys((await state(page)).painted).length === 0 && (await count(page, '.pp-trace .pp-bead')) === 3, `${loc}: no tin — the brush traces 3 beads, paints nothing`);
    await tin(page, ti);
    is((await state(page)).tin === ti && await page.evaluate((i) => document.querySelector('.pp-tin[data-i="' + i + '"]').classList.contains('is-on'), ti), `${loc}: the triangle tin opens`);
    await tap(await piece(page, TG.triangle[0]), page);
    await tap(await piece(page, wall), page);
    let s = await state(page);
    is(s.painted[TG.triangle[0]] === ti && s.painted[wall] === ti && s.misses === 0, `${loc}: both pieces wet — nothing judged at the tap`);
    is(await page.evaluate((w) => window.PaintPotsActivity._pEls[w].classList.contains('is-wet'), wall), `${loc}: wet paint has its gloss`);
    await tap(await piece(page, wall), page);
    is((await state(page)).painted[wall] == null, `${loc}: a tap on a painted piece lifts the paint`);
    await tap(await piece(page, wall), page);
    await check(page);
    s = await state(page);
    is(s.set[TG.triangle[0]] === ti && s.set[wall] == null && s.misses === 1 && (await note(page)) === T(loc, 'hintWrong'), `${loc}: Check — the roof sets, the wall sheds ("count its corners")`);
    is((await count(page, '.pp-blob')) === 1, `${loc}: the shed paint lands in the puddle`);
    await tap(await piece(page, TG.triangle[1]), page);
    is((await state(page)).help === 0 && (await note(page)) === '', `${loc}: a new paint clears the showing`);
    await tin(page, si);
    for (const p of TG.square) await tap(await piece(page, p), page);
    await check(page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(T(loc, 'ok_house')), `${loc}: the house is painted (${await bubble(page)})`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'house-won.png') });

    /* 2. the robot: the miss ladder */
    await force(page, 'picture', 'robot');
    const rr = C.rounds('picture').find(x => x.id === 'robot'), RT = C.targets(rr), sqi = rr.tins.indexOf('square');
    await tin(page, sqi); await tap(await piece(page, RT.square[0]), page);
    await check(page);
    const missKind = rr.tins[(await page.evaluate(() => window.PaintPotsActivity.st.last.missingTin))];
    is((await note(page)) === T(loc, 'hintMore_' + missKind) && await page.evaluate(() => document.querySelector('.pp-zone').classList.contains('is-on')), `${loc}: miss 1 — one more ${missKind}, the tin drips on a quarter`);
    await check(page);
    s = await state(page);
    is(s.help === 2 && (await note(page)) === T(loc, 'hintGlow') && (await count(page, '.pp-piece.is-glow')) === RT.square.length - 1 + RT.heart.length, `${loc}: miss 2 — the missing pieces glow`);
    is(s.set[RT.square[0]] === sqi, `${loc}: the set square stays set after the misses`);

    /* 3. a leak and a kite */
    await force(page, 'quilt', 'q-tri-1');
    const q = C.rounds('quilt')[0], qp = C.piecesOf(q), openP = qp.find(p => p.open);
    is((await prompt(page)) === T(loc, 'pQuilt_triangle') && (await count(page, '.pp-patch')) === 8 && (await count(page, '.pp-tin')) === 1, `${loc}: the quilt — eight patches, one tin`);
    await tin(page, 0);
    await tap(await ctr(page, `.pp-patch[data-id="${openP.id}"]`), page);
    is((await state(page)).painted[openP.id] === 0, `${loc}: a tap on the patch paints its piece`);
    await check(page);
    is((await note(page)) === T(loc, 'hintLeak') && (await count(page, '.pp-stream')) === 1, `${loc}: the open triangle leaks through its gap`);
    await force(page, 'picture', 'lighthouse');
    const lr = C.rounds('picture').find(x => x.id === 'lighthouse'), kite = C.piecesOf(lr).find(p => p.t === 'kite');
    await tin(page, lr.tins.indexOf('diamond')); await tap(await piece(page, kite.id), page); await check(page);
    is((await note(page)) === T(loc, 'hintSides'), `${loc}: a kite in diamond paint — look at the sides (not the corners)`);

    /* 4. count: paint, then the counters */
    await force(page, 'count', 'boat');
    const cr = C.rounds('count').find(x => x.id === 'boat'), CT = C.targets(cr);
    is((await count(page, '.pp-counter')) === 2 && (await prompt(page)) === T(loc, 'pCount'), `${loc}: count — two counters`);
    for (let i = 0; i < 2; i++) { await tin(page, i); for (const p of CT[cr.tins[i]]) await tap(await piece(page, p), page); }
    await check(page);
    is((await note(page)) === T(loc, 'hintCount') && (await state(page)).misses === 0, `${loc}: painted, numbers unset — "set the numbers"`);
    const plus = async (k, n) => { const ci = cr.tins.indexOf(k); for (let j = 0; j < n; j++) await tap(await page.evaluate((ci) => { const b = document.querySelectorAll('.pp-counter')[ci].querySelectorAll('.pp-step')[1]; b.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = b.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, ci), page); };
    await plus('triangle', 5); await plus('square', 3); await check(page);
    is((await note(page)) === T(loc, 'hintCountOne') && (await count(page, '.pp-piece.is-pulse')) === 6, `${loc}: 5 triangles is wrong — the six triangles pulse`);
    await plus('triangle', 1); await check(page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'ok_boat')), `${loc}: 6 triangles and 3 squares`);

    /* 5. labels */
    await force(page, 'quilt', 'q-sq-1', 'clue');
    is((await count(page, '.pp-word')) === 0 && (await count(page, '.pp-tin .pp-bead')) === 4 && (await prompt(page)) === T(loc, 'pQuiltClue') && (await page.evaluate(() => document.querySelector('.pp-tin').getAttribute('aria-label'))).includes(T(loc, 'clue_square')), `${loc}: clue — beads on the tin, the riddle in its label, no name`);
    await force(page, 'picture', 'garden', 'name');
    is((await count(page, '.pp-word.is-big')) === 2 && (await count(page, '.pp-labshape')) === 0, `${loc}: name — the word only`);

    /* 6. the setting changes the board */
    for (const [b, n] of [['picture', 2], ['quilt', 1], ['count', 2]]) { await page.evaluate((b) => { const t = window.PaintPotsActivity; t.api.settings.board = b; t.api.settings.labels = 'shape'; t.onSettings(); }, b); await wait(250); is((await count(page, '.pp-tin')) === n && (b !== 'quilt' || (await count(page, '.pp-patch')) === 8) && (b !== 'count' || (await count(page, '.pp-counter')) === 2), `${loc}: "${b}" — ${n} tin(s)`); }

    /* 7. the keyboard */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'picture', 'house');
      await page.focus('.pp-tin[data-i="0"]'); await page.keyboard.press('Enter'); await wait(60);
      const first = C.piecesOf(r)[0].id;
      await page.evaluate((f) => window.PaintPotsActivity._pEls[f].focus(), first); await page.keyboard.press('Enter'); await wait(60);
      is((await state(page)).painted[first] === 0, `${loc}: keyboard — Enter on a tin, then on a piece, paints it`);
      await page.keyboard.press('ArrowRight'); await wait(40);
      is(await page.evaluate(() => document.activeElement.getAttribute('data-id')) === C.piecesOf(r)[1].id, `${loc}: keyboard — an arrow moves to the next piece`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [b, id] of [['picture', 'house'], ['picture', 'robot'], ['picture', 'garden'], ['quilt', 'q-circle-1'], ['count', 'boat'], ['count', 'firs']]) {
      await force(page, b, id);
      const probe = async (phase) => {
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), vis = (e) => e.offsetParent !== null || e.tagName === 'g' || e.tagName === 'rect';
          const ctl = [...document.querySelectorAll('.pp-tin, .pp-step, .pp-check, .pp-patch')].filter(e => !e.hidden && !e.closest('[hidden]')).map(e => { const r = e.getBoundingClientRect(); return { c: String(e.className.baseVal != null ? e.className.baseVal : e.className).split(' ')[0], l: r.left, r: r.right, t: r.top, b: r.bottom + scrollY, w: r.width, h: r.height }; });
          const pcs = [...document.querySelectorAll('.pp-piece')].map(e => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); });
          return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right }, ctl, pcs, quilt: !!document.querySelector('.pp-patch') };
        });
        is(m.docW <= m.vw + 1, `${w} ${id} ${phase}: no sideways scroll`);
        m.ctl.forEach(c => {
          if (c.l < m.app.l - 1 || c.r > m.app.r + 1) is(false, `${w} ${id} ${phase}: ${c.c} inside the card`);
          if (Math.min(c.w, c.h) < 44) is(false, `${w} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)} — under 44`);
          if (c.b > m.vh + 1) is(false, `${w} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b)} > ${m.vh})`);
        });
        if (!m.quilt) m.pcs.forEach((s, i) => { if (s < 44) is(false, `${w} ${id} ${phase}: piece ${i} is ${s.toFixed(0)} px — under 44`); });
        /* press: tins, steps, Check, and every piece at its centroid */
        const blocked = await page.evaluate(() => {
          const t = window.PaintPotsActivity, out = [];
          [...document.querySelectorAll('.pp-tin, .pp-step, .pp-check')].filter(e => !e.hidden && !e.disabled && e.offsetParent !== null).forEach(e => { e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(), h = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (!(h && (h === e || e.contains(h)))) out.push(String(e.className).split(' ')[0]); });
          t._pieces.forEach(pc => { t._pEls[pc.id].scrollIntoView({ block: 'center', behavior: 'instant' }); if (!window.__ppPressPoint(pc.id)) out.push('piece ' + pc.id + ' (' + pc.t + ') cannot be pressed'); });
          window.scrollTo({ top: 0, behavior: 'instant' });
          return out;
        });
        is(blocked.length === 0, `${w} ${id} ${phase}: every control and piece can be pressed (${blocked.join(', ')})`);
      };
      await probe('rest');
      await page.evaluate(() => { const t = window.PaintPotsActivity, C = PaintPotsCore, st = t.st, r = st.r, T = C.targets(r); C.pickTin(st, 0); T[r.tins[0]].slice(0, 2).forEach(p => C.paint(st, p)); t._paint(); });
      await probe('wet');
      await page.evaluate(() => { const t = window.PaintPotsActivity, C = PaintPotsCore, st = t.st, r = st.r, T = C.targets(r), ps = C.piecesOf(r); const bad = ps.find(pc => !r.tins.some(k => T[k].indexOf(pc.id) >= 0)); if (bad) C.paint(st, bad.id); t._check(); });
      await wait(60); await probe('miss 1');
      await page.evaluate(() => { window.PaintPotsActivity._check(); });
      await wait(60); await probe('miss 2');
      if (SHOT && (w === 360 || w === 704 || w === 1024)) await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`) });
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-paint-pots: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
