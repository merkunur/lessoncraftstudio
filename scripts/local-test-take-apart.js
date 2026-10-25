#!/usr/bin/env node
/* =====================================================================
   local-test-take-apart.js — ACTIVITY #105, The Take-Apart Tray, in a
   real browser with real pointer and key actions (never a model call to
   take apart, place, choose or check), 11 locales.
   Scenarios per locale (at 1024):
     · level 1, round 1 (triangles): an empty Check → hintPlace, no miss,
       the shelf's shapes bob; a TAP takes a triangle apart (3 sticks on
       the rack, 3 full cups), a second tap snaps it together; the open
       "triangle" leaves exactly one EMPTY cup; a real DRAG puts a shape in
       the yes-box, a mini dragged back returns to the shelf; tap-then-box
       places a shape; the keyboard (Enter on a shape) takes it apart;
       a true one in "not a triangle" → miss 1, hintTurn, its row on the
       tray, the yes-box's stick pattern; a new move takes the help away;
       the open one in the yes-box → miss 2, hintBoth, a second tray row
       (the prototype), the empty cup; all right → the locale's success
       line, the lid, one bundle per triangle (3 sticks each), the free-
       play tools: turning / stretching / painting never change the sticks;
     · the bent stick (round 5) and the hoop with no cups (round 9);
     · "help only": the tray is a shut drawer, a tap only chooses, a miss
       opens it; "4 shapes": four on the shelf;
     · level 2 (rectangle): the "square" tile → hintLine2, miss 2 lays a
       square beside it, the "rectangle" tile → the success line;
     · level 3 (riddle 2): a wrong shape dragged into the frame → hintRiddle1,
       miss 2 → hintRiddle2 and the riddle's sticks drawn on the card, the
       answer by tap-then-frame → the success line.
   Then every round of every level at rest, at miss 2 and solved —
   reached ONCE per locale by real clicks, then resized through
   320…1366: no sideways scroll, Check above the fold at rest, Check and
   the hint in view at miss 2, the success line in view, controls ≥ 44 px,
   nothing outside the card, the bands never overlap, every stick inside
   its tray row, the cups drawn = the model's cups, shapes never under the
   size floor, the words big enough.
   Usage: node scripts/local-test-take-apart.js [--widths=…] [--locales=…] [--levels=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', 'real,name,riddle').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '105-take-apart', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'take-apart-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TakeApartCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'take-apart-activity.js'), 'utf8') + '\n;this.__A = TakeApartActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = a || {}; return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]), file = path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : w <= 800 ? 1000 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/take-apart-activity.html?activity=sort-bins.defining-attributes.1-g-a-1&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TakeApartActivity && window.TakeApartActivity.st && document.querySelector('.ta-shelf'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.TakeApartActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* the test seam: the level and settings, then a round started fresh (a fixed deal is read back, never set) */
  async function force(page, level, r, set) {
    await page.evaluate((level, r, set) => { const a = window.TakeApartActivity; a.api.settings.level = level; a.api.settings.tray = (set && set.tray) || 'open'; a.api.settings.shapes = (set && set.shapes) || '6'; a._pool = null; a._ensurePool(); a._pos = null; a._start(r, 0); a._render2(); window.scrollTo(0, 0); }, level, r, set);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const a = window.TakeApartActivity, s = a.st, v = a._view; return { items: s.items.map(i => ({ id: i.id, key: i.key, truth: i.truth })), place: s.place.slice(), tray: s.tray, sel: s.sel, choice: s.choice, frame: s.frame, answer: s.answer, misses: s.misses, show: s.show, done: s.done, showing: v.showing, proto: v.proto, pattern: v.pattern }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ta-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(10); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  /* a real drag: press on the shape, move in steps, release over the target */
  async function drag(page, from, to, tag) {
    const a = await centre(page, from); if (!a) { is(false, `${tag}: there is a «${from}» to drag`); return; }
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    const b = await page.evaluate((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 40) }; }, to);
    for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (b.x - a.x) * i / 10, a.y + (b.y - a.y) * i / 10); await wait(4); }
    await page.mouse.up(); await wait(30);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  const idx = (s, id) => s.items.findIndex(x => x.id === id);
  /* tap a shape, then tap a box — the tap-tap path */
  async function put(page, i, box, tag) { await click(page, K('shape-' + i), tag); await click(page, K('box-' + box), tag); }
  const rows = (page) => page.evaluate(() => [...document.querySelectorAll('.ta-tray svg.ta-row:not(.ta-bundles):not(.ta-rest)')].map(r => ({ sticks: r.querySelectorAll('.ta-stick').length, bent: r.querySelectorAll('.ta-stick.is-bent').length, cups: r.querySelectorAll('circle[r]').length, joints: r.querySelectorAll('.ta-joint').length, empty: r.querySelectorAll('.ta-empty').length })));

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} L1 triangles`, s;
    await force(page, 'real', 0);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintPlace')) && await count(page, '.ta-cell.is-bob') === 6, `${tag}: an empty Check → hintPlace, no miss, the shapes bob`);
    const te = idx(s, 'tri_equi'), to = idx(s, 'tri_open'), tr = idx(s, 'tri_right');
    await click(page, K('shape-' + te), tag); s = await st(page); let R = await rows(page);
    is(s.tray === te && R.length === 1 && R[0].sticks === 3 && R[0].joints === 3 && R[0].empty === 0, `${tag}: a tap takes the triangle apart — 3 sticks, 3 full cups (${JSON.stringify(R)})`);
    await click(page, K('shape-' + te), tag); s = await st(page);
    is(s.tray === null && (await rows(page)).length === 0, `${tag}: a second tap snaps it together`);
    await click(page, K('shape-' + to), tag); R = await rows(page);
    is(R.length === 1 && R[0].sticks === 3 && R[0].joints === 2 && R[0].empty === 1, `${tag}: the open one: 3 sticks, 2 joints, ONE empty cup (${JSON.stringify(R)})`);
    await drag(page, K('shape-' + te), K('box-yes'), tag); s = await st(page);
    is(s.place[te] === 'yes' && await count(page, '.ta-box-yes .ta-mini') === 1 && await count(page, '.ta-shelf .ta-cell') === 5, `${tag}: a real drag puts the triangle in the yes-box`);
    await drag(page, '.ta-box-yes .ta-mini', '.ta-shelf', tag); s = await st(page);
    is(s.place[te] === null && await count(page, '.ta-shelf .ta-cell') === 6, `${tag}: dragged back, it is on the shelf again`);
    await page.focus(K('shape-' + tr)); await page.keyboard.press('Enter'); await wait(15); s = await st(page);
    is(s.tray === tr, `${tag}: Enter on a shape takes it apart`);
    await page.keyboard.press('Enter'); await wait(15); s = await st(page); is(s.tray === null && s.sel === null, `${tag}: Enter again puts it back together`);
    /* a true one in "not" → miss 1 */
    for (let i = 0; i < s.items.length; i++) await put(page, i, i === tr ? 'no' : (s.items[i].truth ? 'yes' : 'no'), tag);
    s = await st(page); is(s.place.every(p => p), `${tag}: every shape placed by tap-then-box`);
    await check(page, tag); s = await st(page); R = await rows(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintTurn')) && s.tray === tr && R.length === 1 && R[0].sticks === 3, `${tag}: a turned small triangle in "not" → miss 1, hintTurn, its sticks on the tray`);
    is(await count(page, '.ta-box-yes .ta-rule') === 1, `${tag}: the yes-box shows its rule as a stick pattern`);
    await drag(page, `.ta-box-no ${K('shape-' + tr)}`, K('box-yes'), tag); s = await st(page);
    is(s.place[tr] === 'yes' && !s.showing && await count(page, '.ta-rule') === 0 && sp(await note(page)) === '', `${tag}: a new move takes the help away`);
    await drag(page, `.ta-box-no ${K('shape-' + to)}`, K('box-yes'), tag);
    await check(page, tag); s = await st(page); R = await rows(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintBoth')) && R.length === 2 && R[0].empty === 1 && R[1].sticks === 3 && R[1].joints === 3, `${tag}: the open one in the yes-box → miss 2, hintBoth, a second row (the prototype) beside the empty cup (${JSON.stringify(R)})`);
    await drag(page, `.ta-box-yes ${K('shape-' + to)}`, K('box-no'), tag);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okTri')), `${tag}: all right → «${sp(await note(page))}»`);
    is(await count(page, '.ta-lid') === 1 && await count(page, '.ta-bundle') === 3 && await page.evaluate(() => [...document.querySelectorAll('.ta-bundle')].every(b => b.querySelectorAll('rect').length === 4)), `${tag}: the lid shuts, three bundles of 3 sticks (+ ribbon)`);
    is(await count(page, '.ta-tool') === 3, `${tag}: the paint pot, the turn knob and the stretch handle`);
    await click(page, K('tool-turn'), tag); R = await rows(page); const ln1 = await page.evaluate(() => [...document.querySelectorAll('.ta-tray .ta-stick rect')].map(r => +r.getAttribute('width')));
    await click(page, K('tool-stretch'), tag); const R2 = await rows(page), ln2 = await page.evaluate(() => [...document.querySelectorAll('.ta-tray .ta-stick rect')].map(r => +r.getAttribute('width')));
    await click(page, K('tool-paint'), tag); const R3 = await rows(page);
    is(R.length === 1 && R[0].sticks === 3 && R2[0].sticks === 3 && R3[0].sticks === 3 && R3[0].joints === 3 && ln1.join() !== ln2.join(), `${tag}: turning, stretching and painting never change the sticks (only their length moves with the stretch)`);
    /* the bent stick, the hoop */
    tag = `${loc} L1 bent + hoop`;
    await force(page, 'real', 4); s = await st(page);
    await click(page, K('shape-' + idx(s, 'tri_curved')), tag); R = await rows(page);
    is(R.length === 1 && R[0].sticks === 3 && R[0].bent === 1 && R[0].joints === 3, `${tag}: the curved "triangle" drops one bent stick (${JSON.stringify(R)})`);
    await force(page, 'real', 8); s = await st(page);
    await click(page, K('shape-' + idx(s, 'circle')), tag); R = await rows(page);
    is(R.length === 1 && R[0].sticks === 1 && R[0].bent === 1 && R[0].cups === 0, `${tag}: the circle: one hoop and NO cups (${JSON.stringify(R)})`);
    /* settings */
    tag = `${loc} settings`;
    await force(page, 'real', 0, { tray: 'help' }); s = await st(page);
    is(await count(page, '.ta-tray.is-shut') === 1, `${tag}: "help only": the tray is a shut drawer`);
    await click(page, K('shape-0'), tag); s = await st(page);
    is(s.sel === 0 && s.tray === null && (await rows(page)).length === 0, `${tag}: "help only": a tap only chooses`);
    await click(page, K('box-' + (s.items[0].truth ? 'no' : 'yes')), tag);   /* shape 0 is already chosen */ for (let i = 1; i < s.items.length; i++) await put(page, i, s.items[i].truth ? 'no' : 'yes', tag);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && await count(page, '.ta-tray.is-shut') === 0 && (await rows(page)).length === 1, `${tag}: "help only": a miss opens the tray`);
    await force(page, 'real', 0, { shapes: '4' });
    is(await count(page, '.ta-shelf .ta-cell') === 4, `${tag}: "4 shapes": four on the shelf`);
    /* level 2 */
    tag = `${loc} L2 rectangle`;
    await force(page, 'name', 2); s = await st(page);
    const tileK = (name) => page.evaluate((txt) => { const b = [...document.querySelectorAll('.ta-tile')].find(e => e.textContent.trim() === txt); return b ? b.getAttribute('data-k') : null; }, T(loc, ACT.NAMEKEY[name]));
    await click(page, K(await tileK('square')), tag); s = await st(page);
    is(s.choice === 'square' && sp(await page.evaluate(() => document.querySelector('.ta-slot').textContent)) === sp(T(loc, 'nmSquare')), `${tag}: the "square" tile goes into the slot`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintLine2')), `${tag}: → hintLine2`);
    await check(page, tag); s = await st(page); R = await rows(page);
    is(s.misses === 2 && R.length === 2 && R[1].joints === 4 && sp(await note(page)) === sp(T(loc, 'hintBoth')), `${tag}: miss 2 lays a square beside the rectangle`);
    await click(page, K(await tileK('rectangle')), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'ok2Rect')), `${tag}: the "rectangle" tile → «${sp(await note(page))}»`);
    /* level 3 */
    tag = `${loc} L3 riddle 2`;
    await force(page, 'riddle', 1); s = await st(page);
    const wrongI = (s.answer + 1) % 3;
    await drag(page, K('shape-' + wrongI), K('frame'), tag); s = await st(page);
    is(s.frame === wrongI && await count(page, '.ta-frame .ta-mini') === 1 && await count(page, '.ta-shelf .ta-cell') === 2, `${tag}: a real drag puts a shape in the frame`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintRiddle1')), `${tag}: → hintRiddle1`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintRiddle2')) && await count(page, '.ta-card .ta-rpat') === 1 && !s.proto, `${tag}: miss 2 → hintRiddle2, the riddle's sticks on the card, no prototype`);
    await click(page, K('shape-' + s.answer), tag); await click(page, K('frame'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'ok3_2')), `${tag}: the answer by tap-then-frame → «${sp(await note(page))}»`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, level, state, tag) {
    if (state === 'rest') return;
    const s = await st(page);
    if (level === 'real') {
      for (let i = 0; i < s.items.length; i++) await put(page, i, s.items[i].truth === (state === 'solved' || i !== s.items.findIndex(x => x.truth)) ? 'yes' : 'no', tag);
      await check(page, tag); if (state === 'miss2') await check(page, tag); return;
    }
    if (level === 'name') {
      const k = await page.evaluate((ok) => { const a = window.TakeApartActivity, i = a.st.tiles.findIndex(t => ok ? t === a.st.name : t !== a.st.name); return 'tile-' + i; }, state === 'solved');
      await click(page, K(k), tag); await check(page, tag); if (state === 'miss2') await check(page, tag); return;
    }
    const i = state === 'solved' ? s.answer : (s.answer + 1) % 3;
    await click(page, K('shape-' + i), tag); await click(page, K('frame'), tag); await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.TakeApartActivity, C = window.TakeApartCore, D = a._dims(), st = a.st;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.ta-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.ta-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.ta-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.ta-wrap').getBoundingClientRect(), card = document.querySelector('.lcs-app') ? document.querySelector('.lcs-app').getBoundingClientRect() : W;
    document.querySelectorAll('.ta-shelf,.ta-cell,.ta-tray,.ta-row,.ta-tools,.ta-box,.ta-mini,.ta-slot,.ta-tile,.ta-card,.ta-frame,.ta-check').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push((e.className.baseVal != null ? e.className.baseVal : e.className).split(' ')[0] + ' outside the card'); });
    const band = ['.ta-shelf', '.ta-tray', '.ta-tools', '.ta-answer', '.ta-foot', '.ta-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    /* every stick inside its tray row; the cups drawn are the model's cups */
    document.querySelectorAll('.ta-tray svg.ta-row').forEach(r => { const q = r.getBoundingClientRect(); r.querySelectorAll('.ta-stick,.ta-bundle').forEach(k => { const b = k.getBoundingClientRect(); if (b.left < q.left - 1 || b.right > q.right + 1 || b.top < q.top - 1 || b.bottom > q.bottom + 1) out.fails.push('a stick leaves its tray row'); }); });
    if (st.tray != null && !(st.done && a._view.bundles)) { const row = document.querySelector('.ta-tray svg.ta-row'); const T = C.takeApart(st.items[st.tray]); if (row && (row.querySelectorAll('.ta-joint').length !== T.cups.filter(u => u.filled).length || row.querySelectorAll('.ta-empty').length !== T.cups.filter(u => !u.filled).length || row.querySelectorAll('.ta-stick').length !== T.sticks.length)) out.fails.push('the tray does not show the model\'s sticks and cups'); }
    /* shapes on the shelf never under the size floor */
    document.querySelectorAll('.ta-shelf .ta-cell svg').forEach(s => { if (+s.getAttribute('width') < D.floor - 0.5) out.fails.push('a shape drawn ' + s.getAttribute('width') + ' px'); });
    document.querySelectorAll('.ta-blabel,.ta-tile,.ta-slot,.ta-rtext').forEach(e => { if (!vis(e)) return; const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 17) out.fails.push(e.className + ' at ' + fs + ' px'); });
    /* words never clipped */
    document.querySelectorAll('.ta-blabel,.ta-tile,.ta-slot,.ta-rtext').forEach(e => { if (vis(e) && e.scrollWidth > e.clientWidth + 1) out.fails.push('clipped words in ' + e.className); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of LEVELS) for (const r of C.ids(level)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level} #${r + 1} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, r);
      await reach(page, level, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level} #${r + 1} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.TakeApartActivity, D = a._dims(); return a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow'); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.ta-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && [0, 4, 8].indexOf(r) >= 0) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${r + 1}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-take-apart: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
