#!/usr/bin/env node
/* =====================================================================
   local-test-one-hop.js — ACTIVITY #100, The One-Hop Helpers, in a real
   browser with real pointer and key actions (never a model call to lay a
   helper, hop or answer), 11 locales.
   Scenarios per locale (at 1024):
     · A1: an empty Check → hintHop, no miss; a helper DRAGGED from the pot
       to just past the stone clicks flush onto it; dragged off the path it
       is gone; three pot taps + three hops → Inchie stops short (fShort);
       a tap on Inchie sends her home; one more helper, four hops → the end,
       the keypad wakes; 5 → miss 1 (hintCount1), miss 2 (hintCount2);
       ⌫, the KEY "4" → okLen with the locale's object phrase;
     · A3: two helpers and one from the decoy pot → her third hop lands in
       its middle (fSize, the helper marked); Delete on it, home, two more
       → the end; the helpers as drawn are one unit each, the object's ink
       is exactly four units;
     · B1: hop, hop, hop → the gap (fGap, the gap marked); drag the far
       helper a quarter left → it clicks flush; four hops → solved;
     · B5: the first hop → fStart; the three helpers dragged ⅜ left onto
       the stone and each other → three hops → solved;
     · J1: Check → hintPickTrack; each stone sends Inchie along its row;
       a wrong row → miss, hintJudge1; the clean row → okJudge;
     · C1: three cards measured in turn (the bed shows card 1, 2, 3 — the
       label lands on the card measured); an empty shelf → hintFill;
       longest first → miss, hintOrder1; shortest first → okOrder;
     · D1: big helpers from the big pot, two big hops, 2 → okBigStep and the
       second line; four small → okBig.
   Then every round of every face at rest, at miss 2 and solved — reached
   ONCE per locale by real actions, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, nothing
   outside the card, the bands never overlap, every helper drawn at its
   width and every object's ink at its length (±1 px), object ink ≥ 64
   (narrow) / 96 (wide) px on its short side and Inchie the same, no digit
   on the bed (and none in a hint).
   Usage: node scripts/local-test-one-hop.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'lay.one,lay.big,fix.one,order.one').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), PUB = path.join(REPO, 'frontend', 'public');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '100-one-hop', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'one-hop-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, OneHopCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'one-hop-activity.js'), 'utf8') + '\n;this.__A = OneHopActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = Object.assign({ name: ACT.strings.name[loc] }, a || {}); return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const CAP = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const OBJ = (loc, o) => ACT.OBJECTS[loc][o].split('|')[0], LONG = (loc, o) => ACT.OBJECTS[loc][o].split('|')[1] || '';
const sp = (s) => String(s).replace(/[   ]/g, ' ').trim();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(PUB, p) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
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
    await page.goto(`${base}/one-hop-activity.html?activity=lay-units.measure.1-md-a-2&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.OneHopActivity && window.OneHopActivity.st && document.querySelector('.oh-wrap') && Object.keys(window.OneHopActivity._pics).length === 8, { timeout: 10000 });
    await page.evaluate(() => { const a = window.OneHopActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  /* force a round with a FIXED queue / track order so the scenario is the same in every locale */
  async function force(page, job, sizes, id, perm) {
    await page.evaluate((job, sizes, id, perm) => { const a = window.OneHopActivity; a.api.settings.job = job; a.api.settings.sizes = sizes; a._pool = null; a._ensurePool(); a._start(id, 0); if (perm) a.st.perm = perm; a._view = {}; a._render2(); window.scrollTo(0, 0); }, job, sizes, id, perm || null);
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.OneHopActivity.st; return { helpers: s.helpers.map(h => [h.p, h.w]), hops: s.hops, status: s.status, typed: s.typed, misses: s.misses, show: s.show, done: s.done, cur: s.cur, labels: s.labels.slice(), slots: s.slots.slice(), track: s.track, phase: s.phase, runs: s.runs.map(r => !!r) }; });
  const note = (page) => page.evaluate(() => document.querySelector('.oh-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(10); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  const check = (page, tag) => click(page, K('check'), tag);
  const pots = async (page, n, tag, k) => { for (let i = 0; i < n; i++) await click(page, K(k || 'pot'), tag); };
  const hops = async (page, n, tag) => { for (let i = 0; i < n; i++) await click(page, K('helper-0'), tag); };
  const key = (page, d, tag) => click(page, K('key-' + d), tag);
  /* a real drag from a point to a point, both measured from ONE scroll position */
  async function drag(page, ptsFn, args, tag) {
    await page.evaluate(() => document.querySelector('.oh-bed').scrollIntoView({ block: 'center', behavior: 'instant' }));
    const pts = await page.evaluate((fn, args) => (new Function('return ' + fn))()(...args), ptsFn.toString(), args || []);
    if (!pts) { is(false, `${tag}: drag ends`); return; }
    await page.mouse.move(pts.ax, pts.ay); await page.mouse.down();
    for (let k = 1; k <= 10; k++) { await page.mouse.move(pts.ax + (pts.tx - pts.ax) * k / 10, pts.ay + (pts.ty - pts.ay) * k / 10); await wait(8); }
    await page.mouse.up(); await wait(350);
  }
  /* drag helper n (sorted) by dx units along the path */
  const dragBy = (page, n, du, tag) => drag(page, (n, du) => { const a = window.OneHopActivity, D = a._dims(), b = document.querySelector('[data-k="helper-' + n + '"]').getBoundingClientRect(); return { ax: b.left + b.width / 2, ay: b.top + b.height / 2, tx: b.left + b.width / 2 + du * D.u, ty: b.top + b.height / 2 }; }, [n, du], tag);
  /* all helpers away by keyboard (focus a helper, Delete) */
  async function clearRow(page) { for (let g = 0; g < 12 && await count(page, '.oh-helper'); g++) { await page.focus(K('helper-0')); await page.keyboard.press('Delete'); await wait(10); } }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} A1`, s;
    await force(page, 'lay', 'one', 'A1');
    await check(page, tag); s = await st(page);
    is(sp(await note(page)) === sp(T(loc, 'hintHop')) && s.misses === 0, `${tag}: an empty Check → hintHop, no miss`);
    await drag(page, () => { const a = window.OneHopActivity, D = a._dims(), p = document.querySelector('[data-k="pot"]').getBoundingClientRect(), bed = document.querySelector('.oh-bed').getBoundingClientRect(), path = document.querySelector('.oh-path').getBoundingClientRect(); return { ax: p.left + p.width / 2, ay: p.top + p.height / 2, tx: bed.left + D.x0 + 0.6 * D.u, ty: path.top + path.height / 2 }; }, [], tag);
    s = await st(page); is(s.helpers.length === 1 && s.helpers[0][0] === 0, `${tag}: a helper dragged to just past the stone clicks onto it (${JSON.stringify(s.helpers)})`);
    await drag(page, () => { const b = document.querySelector('[data-k="helper-0"]').getBoundingClientRect(); return { ax: b.left + b.width / 2, ay: b.top + b.height / 2, tx: b.left + b.width / 2, ty: b.top - 160 }; }, [], tag);
    s = await st(page); is(s.helpers.length === 0, `${tag}: dragged off the path, the helper is gone`);
    await pots(page, 3, tag); await hops(page, 3, tag); s = await st(page);
    is(s.status === 'short' && sp(await note(page)) === sp(T(loc, 'fShort')) && await count(page, '.oh-key') === 0, `${tag}: three helpers → Inchie stops short (fShort), no keypad yet`);
    await click(page, K('worm'), tag); s = await st(page); is(s.hops === 0 && !s.status, `${tag}: a tap on Inchie sends her home`);
    await pots(page, 1, tag); await hops(page, 4, tag); s = await st(page);
    is(s.status === 'end' && s.hops === 4 && sp(await note(page)) === sp(T(loc, 'hintWrite')) && await count(page, '.oh-print') === 4 && await count(page, '.oh-key') === 11, `${tag}: four hops → the end, four footprints, hintWrite, the keypad opens`);
    await key(page, 5, tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintCount1')), `${tag}: 5 → miss 1, hintCount1`);
    await check(page, tag); s = await st(page); is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintCount2')), `${tag}: miss 2 → hintCount2`);
    await key(page, 'del', tag); is((await st(page)).typed === '', `${tag}: ⌫ clears the box`);
    await page.focus('.oh-wrap'); await page.keyboard.press('4'); await wait(10); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okLen', { Obj: CAP(OBJ(loc, 'car')), n: T(loc, 'nHelpers', { n: 4 }), long: LONG(loc, 'car') })), `${tag}: the key 4 → okLen «${sp(await note(page))}»`);
    is(await count(page, '.oh-sum') === 4, `${tag}: four capsules under the car`);
    /* ---- A3: the decoy ---- */
    tag = `${loc} A3`;
    await force(page, 'lay', 'one', 'A3');
    await pots(page, 2, tag); await pots(page, 1, tag, 'decoy'); await hops(page, 3, tag); s = await st(page);
    is(s.status === 'inside' && sp(await note(page)) === sp(T(loc, 'fSize')) && await count(page, '.oh-helper.is-bad') === 1, `${tag}: her third hop lands inside the odd helper (fSize, marked)`);
    const D3 = await page.evaluate(() => { const a = window.OneHopActivity, C = window.OneHopCore, D = a._dims(), k = C.DATA.INK.shoe, im = document.querySelector('.oh-obj').getBoundingClientRect(); return { u: D.u, caps: [...document.querySelectorAll('.oh-helper .oh-cap')].map(c => c.getBoundingClientRect().width + 2), ink: im.width * k[0] }; });
    is(Math.abs(D3.caps[0] - D3.u) < 1 && Math.abs(D3.caps[2] - 1.5 * D3.u) < 1 && Math.abs(D3.ink - 4 * D3.u) < 1, `${tag}: drawn — a helper ${D3.caps[0].toFixed(1)} px (u ${D3.u.toFixed(1)}), the odd one 1.5 u, the shoe's ink 4 u (${D3.ink.toFixed(1)})`);
    await page.focus(K('helper-2')); await page.keyboard.press('Delete'); await wait(10);
    await click(page, K('worm'), tag); await pots(page, 2, tag); await hops(page, 4, tag); s = await st(page);
    is(s.status === 'end' && s.helpers.every(h => h[1] === 8), `${tag}: the odd one deleted, two more → the end`);
    await key(page, 4, tag); await check(page, tag); is((await st(page)).done, `${tag}: 4 → solved`);
    /* ---- B1: the gap ---- */
    tag = `${loc} B1`;
    await force(page, 'fix', 'one', 'B1');
    await hops(page, 3, tag); s = await st(page);
    is(s.status === 'gap' && sp(await note(page)) === sp(T(loc, 'fGap')) && await count(page, '.oh-gap') === 1, `${tag}: the third hop falls into the gap (fGap, marked)`);
    await click(page, K('helper-0'), tag); is(sp(await note(page)) === sp(T(loc, 'fHome')), `${tag}: hopping on from a fault → fHome`);
    await dragBy(page, 3, -0.25, tag); s = await st(page);
    is(s.helpers.map(h => h[0]).sort((a, b) => a - b).join() === '0,8,16,24' && !s.status, `${tag}: the far helper dragged a quarter left clicks flush (${s.helpers.map(h => h[0])}); Inchie back home`);
    await hops(page, 4, tag); await key(page, 4, tag); await check(page, tag); is((await st(page)).done, `${tag}: four hops, 4 → solved`);
    /* ---- B5: the crooked start ---- */
    tag = `${loc} B5`;
    await force(page, 'fix', 'one', 'B5');
    await hops(page, 1, tag); s = await st(page); is(s.status === 'start' && sp(await note(page)) === sp(T(loc, 'fStart')), `${tag}: the first hop → fStart`);
    for (let n = 0; n < 3; n++) await dragBy(page, n, -0.375, tag);
    s = await st(page); is(s.helpers.map(h => h[0]).join() === '0,8,16', `${tag}: dragged onto the stone and each other: ${s.helpers.map(h => h[0])}`);
    await hops(page, 3, tag); await key(page, 3, tag); await check(page, tag); is((await st(page)).done, `${tag}: three hops, 3 → solved`);
    /* ---- J1: judge ---- */
    tag = `${loc} J1`;
    await force(page, 'fix', 'one', 'J1', [0, 1, 2]);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintPickTrack')), `${tag}: Check with no row → hintPickTrack`);
    await click(page, K('run-0'), tag); is(sp(await note(page)) === sp(T(loc, 'fSize')) && await count(page, '.oh-wormj') === 1, `${tag}: row 1's stone → Inchie lands inside the long helper (fSize)`);
    await click(page, K('run-1'), tag); is(sp(await note(page)) === sp(T(loc, 'hEnd')), `${tag}: row 2's stone → all the way (hEnd)`);
    await click(page, K('run-2'), tag); is(sp(await note(page)) === sp(T(loc, 'fPast')), `${tag}: row 3's stone → past the end (fPast)`);
    await click(page, K('track-2'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintJudge1')), `${tag}: row 3 → miss, hintJudge1`);
    await click(page, K('track-1'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okJudge')), `${tag}: row 2 → okJudge`);
    /* ---- C1: order ---- */
    tag = `${loc} C1`;
    await force(page, 'order', 'one', 'C1', [1, 2, 0]);   /* the queue: car 4, ferry 5, fish 3 */
    const Q = ['car', 'ferry', 'fish'], QL = [4, 5, 3];
    for (let i = 0; i < 3; i++) {
      const alt = await page.evaluate(() => (document.querySelector('.oh-obj') || {}).alt);
      is(alt === OBJ(loc, Q[i]), `${tag}: the bed shows card ${i + 1} (${alt})`);
      await pots(page, QL[i], tag); await hops(page, QL[i], tag); await key(page, QL[i], tag); await check(page, tag);
      s = await st(page); is(s.labels[i] === QL[i] && (i < 2 ? sp(await note(page)) === sp(T(loc, 'okCard')) : true), `${tag}: card ${i + 1} gets its label ${QL[i]}`);
      const lab = await page.evaluate((i) => (document.querySelector('[data-k="card-' + i + '"] .oh-cardlab') || {}).textContent, i);
      is(lab === String(QL[i]), `${tag}: the label sits on card ${i + 1} (${lab})`);
    }
    is(await count(page, '.oh-bed') === 0 && await count(page, '.oh-slot') === 3 && sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : '')) === sp(T(loc, 'tOrder2')), `${tag}: measured — the bed rests, the shelf has three steps, the line says tOrder2`);
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintFill')), `${tag}: an empty shelf → hintFill`);
    for (const [i, sl] of [[1, 0], [0, 1], [2, 2]]) { await click(page, K('card-' + i), tag); await click(page, K('slot-' + sl), tag); }
    await check(page, tag); s = await st(page); is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintOrder1')), `${tag}: longest first → miss, hintOrder1`);
    for (const [i, sl] of [[2, 0], [0, 1], [1, 2]]) { await click(page, K('card-' + i), tag); await click(page, K('slot-' + sl), tag); }
    s = await st(page); is(s.slots.join() === '2,0,1', `${tag}: shortest first on the shelf (${s.slots})`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(CAP(T(loc, 'okOrder', { o1: OBJ(loc, 'fish'), o2: OBJ(loc, 'car'), o3: OBJ(loc, 'ferry') }))), `${tag}: okOrder «${sp(await note(page))}»`);
    /* ---- D1: big and small ---- */
    tag = `${loc} D1`;
    await force(page, 'lay', 'big', 'D1');
    is(await count(page, '.oh-pot.is-big') === 1 && await count(page, '.oh-box') === 2, `${tag}: the big pot and a two-box label`);
    await pots(page, 2, tag); await hops(page, 2, tag); s = await st(page); is(s.status === 'end' && s.hops === 2, `${tag}: two big helpers, two big hops → the end`);
    await key(page, 2, tag); await check(page, tag); s = await st(page);
    is(s.phase === 1 && sp(await note(page)) === sp(T(loc, 'okBigStep')) && await count(page, '.oh-pot.is-big') === 0, `${tag}: 2 → okBigStep, the small pot`);
    await pots(page, 4, tag); await hops(page, 4, tag); await key(page, 4, tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okBig', { B: 2, S: 4 })), `${tag}: 4 → okBig`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real actions, then resized ---- */
  async function measureOne(page, o, tag) { await pots(page, o.L, tag); await hops(page, o.L, tag); }
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    if (r.kind === 'judge') {
      const right = await page.evaluate(() => window.OneHopCore.rightTrack(window.OneHopActivity.st));
      if (state === 'miss2') for (let k = 1; k <= 2; k++) { await click(page, K('track-' + ((right + k) % 3)), tag); await check(page, tag); }
      else { await click(page, K('track-' + right), tag); await check(page, tag); }
      return;
    }
    if (r.kind === 'order') {
      const perm = await page.evaluate(() => window.OneHopActivity.st.perm.slice());
      for (let i = 0; i < 3; i++) { const o = r.objs[perm[i]]; await measureOne(page, o, tag); await key(page, o.L, tag); await check(page, tag); }
      const byL = [0, 1, 2].sort((a, b) => r.objs[perm[a]].L - r.objs[perm[b]].L), seq = state === 'solved' ? byL : byL.slice().reverse();
      for (let s = 0; s < 3; s++) { await click(page, K('card-' + seq[s]), tag); await click(page, K('slot-' + s), tag); }
      await check(page, tag); if (state === 'miss2') await check(page, tag); return;
    }
    if (r.kind === 'fix' || (r.pre && r.pre.length)) await clearRow(page);
    if (r.kind === 'big') { await pots(page, r.L / 2, tag); await hops(page, r.L / 2, tag); await key(page, r.L / 2, tag); await check(page, tag); }
    await measureOne(page, r, tag);
    if (state === 'miss2') { await key(page, r.L + 1, tag); await check(page, tag); await check(page, tag); }
    else { await key(page, r.L, tag); await check(page, tag); }
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.OneHopActivity, C = window.OneHopCore, D = a._dims(), st = a.st, r = st.r;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.oh-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.oh-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.oh-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.oh-wrap').getBoundingClientRect(), wide = W.width >= 560, floor = wide ? 96 : 64;
    document.querySelectorAll('.oh-bed,.oh-row,.oh-pad,.oh-check,.oh-cards,.oh-shelf,.oh-label,.oh-pot').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.oh-queue', '.oh-bed', '.oh-row', '.oh-pad', '.oh-foot', '.oh-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const bed = document.querySelector('.oh-bed');
    if (bed && vis(bed)) {
      const BR = bed.getBoundingClientRect();
      /* the object's ink: exactly L units, inside the bed, big enough, not too big */
      const im = bed.querySelector('.oh-obj'), o = C.objOf(st) || (r.kind === 'judge' ? r : null);
      if (o && !im) out.fails.push('the object picture is missing');
      if (im) { const k = C.DATA.INK[o.obj], q = im.getBoundingClientRect(), iw = q.width * k[0], ih = q.height * k[2], il = q.left + q.width * k[1], it = q.top + q.height * k[3];
        if (Math.abs(iw - o.L * D.u) > 1) out.fails.push('the object ink is not its length');
        if (Math.abs(il - (BR.left + D.x0)) > 1) out.fails.push('the object does not start at the stone line');
        if (Math.min(iw, ih) < floor - 0.5) out.fails.push('the object only ' + Math.round(ih) + ' px tall');
        if (il < BR.left - 1 || il + iw > BR.right + 1 || it < BR.top - 1) out.fails.push('the object outside the bed'); }
      /* helpers drawn at their width */
      bed.querySelectorAll('.oh-helper').forEach((b) => { const cap = b.querySelector('.oh-cap').getBoundingClientRect(); if (cap.right > BR.right + 1 + D.u * 2.5) out.fails.push('a helper far outside the bed'); });
      const caps = [...bed.querySelectorAll('.oh-helper .oh-cap')].map(c => c.offsetWidth + 2).sort((x, y) => x - y), ws = st.helpers.map(h => h.w / C.E8 * D.u).sort((x, y) => x - y);
      if (caps.length !== ws.length || caps.some((c, i) => Math.abs(c - ws[i]) > 1)) out.fails.push('a helper not drawn at its width');
      /* Inchie */
      const wm = bed.querySelector('.oh-worm .oh-wormpic, .oh-wormj'); if (r.kind !== 'judge' && (!wm || wm.getBoundingClientRect().height < floor - 0.5)) out.fails.push('Inchie is missing or under ' + floor + ' px');
      /* Inchie's ink never overlaps the object's ink (the worm's ink box: spring//worm in art-extents) */
      if (im && wm && r.kind !== 'judge') { const k = C.DATA.INK[o.obj], q = im.getBoundingClientRect(), w = wm.getBoundingClientRect(), wt = w.top + w.height * 0.028, ob = q.top + q.height * (k[3] + k[2]); if (wt < ob - 0.5 && w.left < q.left + q.width * (k[1] + k[0]) && w.right > q.left + q.width * k[1]) out.fails.push('Inchie overlaps the object'); }
      if (/\d/.test(bed.textContent)) out.fails.push('a digit on the bed');
    }
    if (document.querySelector('.oh-note').classList.contains('is-hint') && /\d/.test(document.querySelector('.oh-note').textContent)) out.fails.push('a digit in a hint');
    /* card labels inside their cards */
    document.querySelectorAll('.oh-card').forEach(c => { const q = c.getBoundingClientRect(), l = c.querySelector('.oh-cardlab'); if (l) { const m = l.getBoundingClientRect(); if (m.right > q.right + 8 || m.bottom > q.bottom + 8) out.fails.push('a card label off its card'); } });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const face of FACES) { const [job, sz] = face.split('.'); for (const id of C.ids(job, sz)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(id), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${face} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, job, sz, id);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real actions (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real actions`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${face} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.oh-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 300); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.oh-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^(A1|A3|B1|J1|C1|D1)$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${face}-${id}-${w}-${state}.png`), fullPage: true });
      }
    } }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-one-hop: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
