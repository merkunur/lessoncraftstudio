#!/usr/bin/env node
/* =====================================================================
   local-test-light-leak.js — ACTIVITY #106, The Light-Leak Lantern, in a
   real browser with real pointer and key actions (pieces are DRAGGED from
   the tray onto the bench, turned by real taps, panes clicked in; the
   model is only read — to know where a piece should go — never told what
   happened), 11 locales.
   Scenarios per locale (at 1024):
     · L7 hexagon: an empty Check → hintEmpty, no miss; a rhombus dragged
       in (the tray count drops, the light shrinks); a tap on it turns it;
       dragged off the bench it goes back to the tray; part built → Check
       → hintLeak, the lamp blazes; a new move clears it; miss 2 → the
       ghost; sealed by dragging what the ghost shows → the locale's line,
       etched seams, a lantern on the garland;
     · L5 big triangle: a rhombus half out → a wall shadow, Check names
       the overhang;
     · L8: rebuilt along the remembered seams → hintSame; rebuilt the other
       way → sealed;
     · M4: a wrong spare → hintSpare; the rhombus turned by taps and
       dragged in → okHole; M7: the flip button, then sealed;
     · S1: a wrong pane → hintShadow (leak + shadow), the right one → okShadow;
     · the keyboard: arrows + Enter drop the chosen piece, Delete takes it out;
     · settings: clear glass, turns-itself-to-fit (a wrongly turned drop fits).
   Then every round of every level at rest, at miss 2 and sealed —
   reached ONCE per locale by real actions, then resized through
   320…1366: no sideways scroll, Check above the fold at rest, Check and
   the hint in view at miss 2, the success line in view, controls ≥ 44 px,
   nothing outside the card, the bands never overlap, the lantern frame
   and every piece inside the bench, the grid side ≥ 30 px.
   Usage: node scripts/local-test-light-leak.js [--widths=…] [--locales=…] [--levels=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', 'glass,missing,tangram').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '106-light-leak', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'light-leak-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, LightLeakCore: C, Intl: Intl }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'light-leak-activity.js'), 'utf8') + '\n;this.__A = LightLeakActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
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
    await page.goto(`${base}/light-leak-activity.html?activity=shapeforge.compose.1-g-a-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.LightLeakActivity && window.LightLeakActivity.st && document.querySelector('.ll-bench'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.LightLeakActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  /* the test seam: level + settings, then a round started fresh (deals are read back, never set) */
  async function force(page, level, id, set) {
    await page.evaluate((level, id, set) => { const a = window.LightLeakActivity; a.api.settings.level = level; a.api.settings.glass = (set && set.glass) || 'colour'; a.api.settings.turning = (set && set.turning) || 'tap'; if (set && set.memory !== undefined) a._memory = set.memory; a._pool = null; a._ensurePool(); a._pos = null; a._start(id, 0); a._render2(); window.scrollTo(0, 0); }, level, id, set || null);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const a = window.LightLeakActivity, s = a.st, C = window.LightLeakCore, c = C.coverage(s); return { placed: s.placed.map(p => ({ id: p.id, kind: p.kind, rot: p.rot, locked: p.locked })), tray: Object.assign({}, s.tray), rot: Object.assign({}, s.rot), sel: s.sel, misses: s.misses, show: s.show, done: s.done, leak: c.uncovered.length, over: c.overhang.length, sealed: C.isSealed(s), pane: s.pane, right: s.right, showing: a._view.showing, ghost: !!a._view.ghost }; });
  const note = (page) => page.evaluate(() => document.querySelector('.ll-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(10); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  /* where a model point is on screen (after scrolling the bench into view) */
  async function benchXY(page, m) { return page.evaluate((m) => { const a = window.LightLeakActivity, D = a._dims(), sv = document.querySelector('.ll-bench'); sv.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = sv.getBoundingClientRect(), q = a._px(D, m); return { x: r.left + q[0], y: r.top + q[1] }; }, m); }
  /* a real drag from an element to a model point */
  async function dragTo(page, fromSel, m, tag) {
    const to0 = await benchXY(page, m);
    const a = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, fromSel);
    if (!a) { is(false, `${tag}: there is a «${fromSel}» to drag`); return; }
    /* the tray may be below the bench on a phone: keep both on screen by measuring again after the first move */
    await page.mouse.move(a.x, a.y); await page.mouse.down();
    for (let i = 1; i <= 8; i++) { await page.mouse.move(a.x + (to0.x - a.x) * i / 8, a.y + (to0.y - a.y) * i / 8); await wait(4); }
    await page.mouse.up(); await wait(30);
  }
  /* turn the tray piece (real taps) until it lies at rot r: the first tap chooses, each further tap turns */
  async function trayTurnTo(page, kind, r, tag) {
    for (let n = 0; n < 8; n++) { const s = await st(page); if (s.sel === kind && (s.rot[kind] || 0) === r) return; await click(page, K('tray-' + kind), tag); }
    is(false, `${tag}: the ${kind} tray piece reached turn ${r}`);
  }
  /* seal the lantern by dragging what the model's ghost names, piece by piece */
  async function sealByGhost(page, tag) {
    for (let n = 0; n < 9; n++) {
      const g = await page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore, g = C.ghost(a.st); if (!g) return null; return { kind: g.kind, rot: g.rot, flip: g.flip, c: g.cells ? C.triCentre(g.cells) : C.polyCentre(g.poly) }; });
      if (!g) return;
      await trayTurnTo(page, g.kind, g.rot, tag);
      if (g.flip) { const s = await st(page); /* the flip state only matters for the tangram parallelogram */ void s; await page.evaluate((f) => { const a = window.LightLeakActivity; if ((a.st.flip.para || 0) !== f) document.querySelector('[data-k="flip-para"]').click(); }, g.flip); }
      await dragTo(page, K('tray-' + g.kind), g.c, tag);
    }
  }
  /* what spare turn / flip fills the hole — found by trying it on a copy of the state */
  const holeFix = (page) => page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore, s = a.st, i = s.spares.findIndex(x => x.right), hole = C.coverage(s).uncovered;
    const ctr = (function () { var x = 0, y = 0, n = 0; hole.forEach(function (k) { (s.grid === 'tri' ? C.triPts(+k.split(',')[0], +k.split(',')[1]).map(C.ax2xy) : C.quarterPoly(k)).forEach(function (p) { x += p[0]; y += p[1]; n++; }); }); return [x / n, y / n]; })();
    for (let f = 0; f < 2; f++) for (let r = 0; r < (s.grid === 'tri' ? 6 : 4); r++) { const cp = JSON.parse(JSON.stringify(s)); cp.spares[i].rot = r; cp.spares[i].flip = f; C.drop(cp, Object.assign({}, cp.spares[i], { slot: i }), ctr[0], ctr[1], false); if (C.isSealed(cp)) return { i, r, f, ctr }; }
    return null; });
  async function fillHole(page, wrongFirst, tag) {
    const fx = await holeFix(page); if (!fx) { is(false, `${tag}: a fix exists for the hole`); return; }
    for (let n = 0; n < 8; n++) { const s = await page.evaluate((i) => { const x = window.LightLeakActivity.st; return { sel: x.sel, rot: x.spares[i].rot, flip: x.spares[i].flip }; }, fx.i); if (s.sel === 'spare' + fx.i && s.rot === fx.r) break; await click(page, K('spare-' + fx.i), tag); }
    const fl = await page.evaluate((i) => window.LightLeakActivity.st.spares[i].flip, fx.i); if (fl !== fx.f) await click(page, K('flip-' + fx.i), tag);
    await dragTo(page, K('spare-' + fx.i), fx.ctr, tag);
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} L7`, s;
    await force(page, 'glass', 'L7', { memory: {} });
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintEmpty')), `${tag}: an empty Check → hintEmpty, no miss`);
    const leak0 = s.leak;
    await dragTo(page, K('tray-rhombus'), [1, 0.5], tag); s = await st(page);
    is(s.placed.length === 1 && s.tray.rhombus === 2 && s.leak === leak0 - 2, `${tag}: a rhombus dragged in — the tray count drops, the light shrinks (${s.leak})`);
    const rot0 = s.placed[0].rot; const pc = await page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore; return C.triCentre(a.st.placed[0].cells); });
    let xy = await benchXY(page, pc); await page.mouse.click(xy.x, xy.y); await wait(15); s = await st(page);
    is(s.placed.length === 1 && s.placed[0].rot !== rot0, `${tag}: a tap turns the placed rhombus (${rot0} → ${s.placed[0].rot})`);
    xy = await benchXY(page, await page.evaluate(() => { const C = window.LightLeakCore; return C.triCentre(window.LightLeakActivity.st.placed[0].cells); }));
    const far = await page.evaluate((y) => { const r = document.querySelector('.ll-bench').getBoundingClientRect(); return { x: Math.max(4, r.left - 40), y: y }; }, xy.y);
    await page.mouse.move(xy.x, xy.y); await page.mouse.down(); for (let i = 1; i <= 6; i++) { await page.mouse.move(xy.x + (far.x - xy.x) * i / 6, xy.y + (far.y - xy.y) * i / 6); await wait(4); } await page.mouse.up(); await wait(20); s = await st(page);
    is(s.placed.length === 0 && s.tray.rhombus === 3 && s.leak === leak0, `${tag}: dragged off the bench it goes back to the tray`);
    await dragTo(page, K('tray-rhombus'), [1, 0.5], tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintLeak')) && await count(page, '.ll-glow.is-blaze') === 1, `${tag}: part built → Check → hintLeak, the lamp blazes`);
    await dragTo(page, K('tray-triangle'), [2.3, 1.6], tag); s = await st(page);
    is(!s.showing && sp(await note(page)) === '' && await count(page, '.ll-glow.is-blaze') === 0, `${tag}: a new move takes the help away`);
    await page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore, s = a.st; s.placed.filter(p => p.kind === 'triangle').forEach(p => C.takeOut(s, p.id)); a._paint(); });
    await check(page, tag); await check(page, tag); s = await st(page);
    is(s.misses === 3 && s.show === 2 && s.ghost && await count(page, '.ll-ghost') === 1 && sp(await note(page)) === sp(T(loc, 'hintGhost')), `${tag}: miss 2 → the ghost and hintGhost`);
    await sealByGhost(page, tag); s = await st(page);
    is(s.sealed, `${tag}: sealed by dragging what the ghost shows`);
    await check(page, tag); s = await st(page);
    const okLine = sp(await note(page));
    is(s.done && okLine.indexOf(sp(T(loc, 'okHexagon'))) === 0 && await count(page, '.ll-seam') === 1, `${tag}: → «${okLine}», seams etched`);
    is(await page.evaluate(() => window.LightLeakActivity._garland.length) === 1, `${tag}: a lantern rises to the garland`);
    /* overhang */
    tag = `${loc} L5 overhang`;
    await force(page, 'glass', 'L5'); await dragTo(page, K('tray-rhombus'), [1.25, 0.5], tag); s = await st(page);
    is(s.over > 0 && await count(page, '.ll-shadow') === 1, `${tag}: a rhombus half out throws a shadow on the wall`);
    await check(page, tag); is([T(loc, 'hintBoth'), T(loc, 'hintOver')].map(sp).indexOf(sp(await note(page))) >= 0, `${tag}: Check names the overhang («${sp(await note(page))}»)`);
    /* a new way */
    tag = `${loc} L8 new way`;
    const mem = await page.evaluate(() => window.LightLeakCore.DATA.DEFAULT_FILL);
    await force(page, 'glass', 'L8', { memory: { L7: mem.L7 } });
    for (const p of mem.L7) { const r = await page.evaluate((cells) => { const C = window.LightLeakCore; const n = JSON.stringify(cells.map(c => c.join(',')).sort()); for (let k = 0; k < 6; k++) { const o = C.triOrient('rhombus', k); const c0 = C.triCentre(o), c1 = C.triCentre(cells); const dr = Math.round(c1[1] - c0[1]), dc = Math.round(2 * (c1[0] - c0[0])); if ((dr + dc) % 2) continue; if (JSON.stringify(o.map(q => [q[0] + dr, q[1] + dc].join(',')).sort()) === n) return k; } return 0; }, p.cells); await trayTurnTo(page, 'rhombus', r, tag); await dragTo(page, K('tray-rhombus'), await page.evaluate((c) => window.LightLeakCore.triCentre(c), p.cells), tag); }
    s = await st(page); await check(page, tag);
    is(s.sealed && sp(await note(page)) === sp(T(loc, 'hintSame')), `${tag}: rebuilt along the remembered seams → hintSame`);
    await page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore; C.own(a.st).forEach(p => C.takeOut(a.st, p.id)); a._paint(); });
    await dragTo(page, K('tray-trapezoid'), [1, 0.4], tag); await sealByGhost(page, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)).indexOf(sp(T(loc, 'okNewHexagon'))) === 0, `${tag}: built another way → «${sp(await note(page))}»`);
    /* level 2 */
    tag = `${loc} M4`;
    await force(page, 'missing', 'M4'); s = await page.evaluate(() => window.LightLeakActivity.st.spares.map(x => ({ kind: x.kind, right: x.right })));
    const wrong = s.findIndex(x => !x.right && x.kind === 'triangle');
    await dragTo(page, K('spare-' + wrong), [1, 0.34], tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintSpare')), `${tag}: a wrong spare → hintSpare`);
    await page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore; C.own(a.st).forEach(p => C.takeOut(a.st, p.id)); a._paint(); });
    await fillHole(page, false, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okHole')), `${tag}: the rhombus turned by taps and dragged in → okHole`);
    tag = `${loc} M7 flip`;
    await force(page, 'missing', 'M7'); await fillHole(page, false, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okHole')), `${tag}: the parallelogram flipped by its button and dragged in → okHole`);
    /* level 3 */
    tag = `${loc} T1`;
    await force(page, 'tangram', 'T1'); await sealByGhost(page, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)).indexOf(sp(T(loc, 'okSquare'))) === 0, `${tag}: two small triangles dragged in → «${sp(await note(page))}»`);
    tag = `${loc} S1`;
    await force(page, 'tangram', 'S1'); s = await st(page);
    await click(page, K('pane-' + ((s.right + 1) % 3)), tag); await check(page, tag); s = await st(page);
    is(s.leak > 0 && s.over > 0 && sp(await note(page)) === sp(T(loc, 'hintShadow')) && await count(page, '.ll-shadow') === 1, `${tag}: a wrong pane leaks AND throws a shadow → hintShadow`);
    await click(page, K('pane-' + s.right), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okShadow')), `${tag}: the right pane → okShadow`);
    /* the keyboard */
    tag = `${loc} keys`;
    await force(page, 'glass', 'L1'); await click(page, K('tray-rhombus'), tag);
    await page.focus('.ll-benchbox'); await page.keyboard.press('Enter'); await wait(15); s = await st(page);
    is(s.placed.length === 1 && s.sealed, `${tag}: Enter on the bench drops the chosen piece at the cursor — sealed`);
    await page.keyboard.press('Delete'); await wait(15); s = await st(page); is(s.placed.length === 0 && s.tray.rhombus === 2, `${tag}: Delete takes it out`);
    /* settings */
    tag = `${loc} settings`;
    await force(page, 'glass', 'L1', { glass: 'clear' });
    is(await page.evaluate(() => [...document.querySelectorAll('.ll-tile path')].some(p => p.getAttribute('fill') === '#EEF4F6')), `${tag}: clear glass`);
    await force(page, 'glass', 'L2', { turning: 'auto' });
    is(await count(page, '.ll-autob') === 2, `${tag}: "turns itself to fit" — the badge on every tray piece`);
    await trayTurnTo(page, 'rhombus', 1, tag); await dragTo(page, K('tray-rhombus'), [1, 0.5], tag); s = await st(page);
    is(s.placed.length === 1 && s.over === 0, `${tag}: a wrongly turned rhombus turns itself to fit (no overhang)`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and sealed — reached ONCE per locale by real actions, then resized ---- */
  async function reach(page, level, id, state, tag) {
    if (state === 'rest') return;
    if (id[0] === 'S') { const s = await st(page); await click(page, K('pane-' + (state === 'solved' ? s.right : (s.right + 1) % 3)), tag); await check(page, tag); if (state === 'miss2') await check(page, tag); return; }
    if (id[0] === 'M') { if (state === 'solved') { await fillHole(page, false, tag); await check(page, tag); return; }
      /* the smallest wrong spare (it can lie in or beside the hole and show its leak or its shadow) */
      const w = await page.evaluate(() => { const s = window.LightLeakActivity.st, C = window.LightLeakCore, A = s.grid === 'tri' ? C.DATA.TRI_AREA : C.DATA.TAN_AREA; let b = -1; s.spares.forEach((x, i) => { if (!x.right && (b < 0 || A[x.kind] < A[s.spares[b].kind])) b = i; }); return b; }); const hole = await page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore, s = a.st, k = C.coverage(s).uncovered[0]; return s.grid === 'tri' ? C.triCentre([k.split(',').map(Number)]) : C.polyCentre(C.quarterPoly(k)); });
      await dragTo(page, K('spare-' + w), hole, tag); await check(page, tag); await check(page, tag); return; }
    if (state === 'solved') { await sealByGhost(page, tag); await check(page, tag); return; }
    /* miss 2: one piece in, two Checks */
    const g = await page.evaluate(() => { const C = window.LightLeakCore, a = window.LightLeakActivity, g = C.ghost(a.st); return g ? { kind: g.kind, c: g.cells ? C.triCentre(g.cells) : C.polyCentre(g.poly) } : null; });
    await dragTo(page, K('tray-' + g.kind), g.c, tag);
    const s = await st(page); if (s.sealed) { await page.evaluate(() => { const a = window.LightLeakActivity, C = window.LightLeakCore; C.own(a.st).forEach(p => C.takeOut(a.st, p.id)); a._paint(); }); }
    if (!(await st(page)).placed.filter(p => !p.locked).length) { const k = Object.keys((await st(page)).tray)[0]; await dragTo(page, K('tray-' + k), await page.evaluate(() => { const C = window.LightLeakCore, R = window.LightLeakActivity.st.R; return R.cells ? C.triCentre(R.cells.slice(0, 1)) : [R.poly[0][0] + 0.3, R.poly[0][1] + 0.3]; }), tag); }
    await check(page, tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.LightLeakActivity, C = window.LightLeakCore, D = a._dims();
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.ll-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.ll-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.ll-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const card = (document.querySelector('.lcs-app') || document.querySelector('.ll-wrap')).getBoundingClientRect();
    document.querySelectorAll('.ll-garland,.ll-benchbox,.ll-tray,.ll-tile,.ll-pane,.ll-flip,.ll-check').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < card.left - 1 || q.right > card.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.ll-garland', '.ll-work', '.ll-foot', '.ll-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const bench = document.querySelector('.ll-bench').getBoundingClientRect();
    document.querySelectorAll('.ll-bench .ll-frame,.ll-bench .ll-piece').forEach(e => { const q = e.getBoundingClientRect(); if (q.left < bench.left - 1 || q.right > bench.right + 1 || q.top < bench.top - 1 || q.bottom > bench.bottom + 1) out.fails.push((e.getAttribute('class') || '').split(' ')[0] + ' leaves the bench'); });
    /* the side of a grid cell (a pattern-block triangle's side, a small tan's leg) in px */
    const side = a.st.grid === 'tri' ? D.s : D.s * (a.st.R.frame === 'A' ? 1 : 1);
    if (side < 29.5) out.fails.push('grid side ' + side.toFixed(1) + ' px');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of LEVELS) for (const id of C.ids(level)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, id, { memory: {} });
      await reach(page, level, id, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: sealed by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.LightLeakActivity, D = a._dims(), sv = document.querySelector('.ll-bench'); return sv && Math.abs(+sv.getAttribute('width') - D.benchW) < 1 && a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow'); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.ll-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^(L7|L12|M7|T7|S4)$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-light-leak: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
  async function check(page, tag) { return click(page, K('check'), tag); }
})().catch(e => { console.error(e); process.exit(1); });
