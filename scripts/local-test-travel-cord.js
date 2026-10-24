#!/usr/bin/env node
/* =====================================================================
   local-test-travel-cord.js — ACTIVITY #99, The Travelling Cord, in a real
   browser with real pointer actions (never a model call to move the cord or
   choose a thing), 11 locales.
   Scenarios per locale:
     · L1 (longest): an empty Check → hintNone, no miss; tap the basket → the
       cord is in hand (hintCarry); tap red → its tag, the cord laid on it,
       6 units long as DRAWN; DRAG the cord from the basket to blue's start
       pin → blue's tag; drag it onto the middle of green → green's tag;
       choose blue → Check → miss 1: hintLong, three tags; miss 2: hintTags2,
       the tags line up shorter / as long / longer; choose red → okLong with
       the locale's ribbon phrase; the reveal lays the three from ONE pin,
       shortest first, and the cord beneath;
     · O1 (order): an empty rail → hintFill; longest first by taps → miss,
       hintOrder; shortest first by DRAG onto the slots → okOrder;
     · T4 (tall, the trap): the cord held up from the stool's foot is 6 units
       upright; the high shelf's bottle (highest top) → miss, hintLongTall;
       the stool's → okLongTall, all three stand on the floor with their feet
       level; Enter on the basket picks the cord up, Escape puts it down.
   Then every round of every face at rest, at miss 2 and solved — reached ONCE
   per locale by real clicks, then resized through 320…1366: no sideways
   scroll, Check above the fold at rest, Check and the hint in view at miss 2,
   the success line in view, controls ≥ 44 px, nothing outside the card, the
   bands never overlap, every ribbon drawn at its length (±1 px per unit)
   and the cord at 6, tall pictures ≥ 64 px (narrow) / ≥ 96 px (wide) tall
   at their smallest, Tilly ≥ 64 / 96 px, no digit anywhere on the stage.
   Usage: node scripts/local-test-travel-cord.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'mixed.ribbons,order.ribbons,mixed.tall,order.tall').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), PUB = path.join(REPO, 'frontend', 'public');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '099-travel-cord', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'travel-cord-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, TravelCordCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'travel-cord-activity.js'), 'utf8') + '\n;this.__A = TravelCordActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; if (a) s = s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); return s; };
const CAP = (s) => s.charAt(0).toUpperCase() + s.slice(1);
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
    await page.goto(`${base}/travel-cord-activity.html?activity=seriation.compare-length.1-md-a-1&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TravelCordActivity && window.TravelCordActivity.st && document.querySelector('.tc-wrap') && Object.keys(window.TravelCordActivity._pics).length === 3, { timeout: 10000 });
    await page.evaluate(() => { const a = window.TravelCordActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  /* force a round with a FIXED layout (the default places, no offsets) so the scenario is the same in every locale */
  async function force(page, q, t, id, fixed) {
    await page.evaluate((q, t, id, fixed) => { const a = window.TravelCordActivity, C = window.TravelCordCore; a.api.settings.question = q; a.api.settings.things = t; a._pool = null; a._ensurePool(); a._start(id, 0);
      if (fixed) { const r = a.st.r, lay = { place: {}, off: {}, order: t === 'tall' ? C.DATA.STANDS.slice() : null }; r.items.forEach(x => { lay.place[x.id] = x.home; lay.off[x.id] = 0; }); a.st.lay = lay; }
      a._render2(); window.scrollTo(0, 0); }, q, t, id, fixed);
    await page.waitForFunction((t) => t !== 'tall' || document.querySelectorAll('.tc-pic').length === 3, { timeout: 4000 }, t).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.TravelCordActivity.st; return { tags: Object.assign({}, s.tags), chosen: s.chosen, slots: s.slots.slice(), carrying: s.carrying, laid: s.laid, misses: s.misses, show: s.show, done: s.done }; });
  const note = (page) => page.evaluate(() => document.querySelector('.tc-note').textContent);
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
  /* drag from one element to a point (both ends measured from ONE scroll position) */
  async function dragTo(page, fromSel, toFn, tag) {
    await page.evaluate(() => document.querySelector('.tc-wall').scrollIntoView({ block: 'start', behavior: 'instant' }));
    const pts = await page.evaluate((f, fn) => { const a = document.querySelector(f).getBoundingClientRect(); const to = (new Function('return ' + fn))()(); return { ax: a.left + a.width / 2, ay: a.top + a.height / 2, tx: to.x, ty: to.y }; }, fromSel, toFn.toString());
    if (!pts) { is(false, `${tag}: drag ends`); return; }
    await page.mouse.move(pts.ax, pts.ay); await page.mouse.down();
    for (let k = 1; k <= 10; k++) { await page.mouse.move(pts.ax + (pts.tx - pts.ax) * k / 10, pts.ay + (pts.ty - pts.ay) * k / 10); await wait(8); }
    await page.mouse.up(); await wait(30);
  }
  /* the ribbons as drawn: px length per unit */
  const drawn = (page) => page.evaluate(() => { const a = window.TravelCordActivity, D = a._dims(); const out = {}; document.querySelectorAll('.tc-ribbon').forEach(r => { const b = r.getBoundingClientRect(); out[r.getAttribute('data-id')] = Math.max(b.width, b.height) / D.U; }); const L = document.querySelector('.tc-laid line'); if (L) { const b = L.getBoundingClientRect(); out._cord = Math.max(b.width, b.height) / D.U; } return out; });

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    const RIB = (id) => ACT.RIBBON[loc][id];
    let tag = `${loc} L1`, s;
    await force(page, 'mixed', 'ribbons', 'L1', true);
    await check(page, tag); s = await st(page);
    is(sp(await note(page)) === sp(T(loc, 'hintTagFirst')) && s.misses === 0, `${tag}: Check before the cord has been anywhere → hintTagFirst, no miss`);
    await click(page, K('cord'), tag); s = await st(page);
    is(s.carrying && await count(page, '.tc-basket.is-on') === 1 && sp(await note(page)) === sp(T(loc, 'hintCarry')), `${tag}: the basket hands over the cord (hintCarry)`);
    await click(page, K('thing-red'), tag); s = await st(page);
    is(s.tags.red === 'long' && s.laid === 'red' && !s.carrying && await count(page, '.tc-laid.is-long') === 1, `${tag}: tap red → its tag says longer, the cord lies on it`);
    let d = await drawn(page);
    is(Math.abs(d.red - 8) < 0.05 && Math.abs(d.blue - 5) < 0.05 && Math.abs(d.green - 3) < 0.05 && Math.abs(d._cord - 6) < 0.05, `${tag}: drawn red ${d.red.toFixed(2)}, blue ${d.blue.toFixed(2)}, green ${d.green.toFixed(2)}, the cord ${d._cord.toFixed(2)} units`);
    is(sp(await note(page)) === sp(T(loc, 'tagNote', { name: CAP(RIB('red')), tag: T(loc, 'tagLong') })), `${tag}: the note reads the tag «${sp(await note(page))}»`);
    await dragTo(page, K('cord'), () => { const a = window.TravelCordActivity, C = window.TravelCordCore, g = C.geom(a.st.r, a.st.lay).blue, R = document.querySelector('.tc-wall').getBoundingClientRect(), U = a._dims().U; return { x: R.left + g.x0 * U + 6, y: R.top + g.y0 * U + 8 }; }, tag);
    s = await st(page);
    is(s.tags.blue === 'short' && s.laid === 'blue', `${tag}: the cord dragged to blue's start pin → shorter`);
    await dragTo(page, K('cord'), () => { const a = window.TravelCordActivity, C = window.TravelCordCore, g = C.geom(a.st.r, a.st.lay).green, R = document.querySelector('.tc-wall').getBoundingClientRect(), U = a._dims().U; return { x: R.left + (g.x0 + 2.2) * U, y: R.top + g.y0 * U }; }, tag);
    s = await st(page);
    is(s.tags.green === 'short' && s.laid === 'green', `${tag}: dropped on the middle of green, the clip slides to its start → shorter`);
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintNone')), `${tag}: three tags, nothing chosen → hintNone, no miss`);
    await wait(350); await click(page, K('thing-blue'), tag); s = await st(page);
    is(s.chosen === 'blue', `${tag}: a tap after a drag is not swallowed — blue chosen`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && Object.keys(s.tags).length === 3 && sp(await note(page)) === sp(T(loc, 'hintLong')), `${tag}: blue → miss 1, three tags, hintLong`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintTags2')) && await page.evaluate(() => { const t = [...document.querySelectorAll('.tc-tag')].map(e => e.getAttribute('class')); return t.join() === 'tc-tag is-short,tc-tag is-short,tc-tag is-long' || t.join() === 'tc-tag is-short,tc-tag is-same,tc-tag is-long' ? true : t.join(); }) === true, `${tag}: miss 2 → hintTags2, the tags line up shorter → longer`);
    await click(page, K('thing-red'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okLong', { Rib: CAP(RIB('red')) })), `${tag}: red → okLong «${sp(await note(page))}»`);
    is(await page.evaluate(() => { const rs = [...document.querySelectorAll('rect.tc-reveal')].map(e => e.getBoundingClientRect()); return rs.length === 3 && rs.every(b => Math.abs(b.left - rs[0].left) < 1) && rs[0].width < rs[1].width && rs[1].width < rs[2].width; }), `${tag}: the reveal lays the three from one pin, shortest first`);
    /* ---- C1: as long as the cord ---- */
    tag = `${loc} C1`;
    await force(page, 'mixed', 'ribbons', 'C1', true);
    for (const id of ['red', 'blue', 'green']) { await click(page, K('cord'), tag); await click(page, K('thing-' + id), tag); }
    await click(page, K('thing-red'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okSame', { Rib: CAP(RIB('red')) })), `${tag}: okSame «${sp(await note(page))}»`);
    /* ---- O1: order ---- */
    tag = `${loc} O1`;
    await force(page, 'order', 'ribbons', 'O1', true);
    is(await count(page, '.tc-slot') === 3, `${tag}: the rail has three steps`);
    await click(page, K('thing-red'), tag); await click(page, K('slot-0'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintTagFirst')), `${tag}: a rail answer before the cord has been anywhere → hintTagFirst, no miss`);
    for (const id of ['red', 'blue', 'green']) { await click(page, K('cord'), tag); await click(page, K('thing-' + id), tag); }
    await click(page, K('slot-0'), tag); await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintFill')), `${tag}: an empty rail → hintFill`);
    for (const [id, i] of [['red', 0], ['blue', 1], ['green', 2]]) { await click(page, K('thing-' + id), tag); await click(page, K('slot-' + i), tag); }
    s = await st(page); is(s.slots.join() === 'red,blue,green', `${tag}: tap a ribbon, tap a step: red, blue, green`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintOrder')), `${tag}: longest first → miss, hintOrder`);
    for (const [id, i] of [['green', 0], ['red', 2]]) await dragTo(page, K('thing-' + id), new Function(`return () => { const b = document.querySelector('[data-k="slot-${i}"]').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; }`)(), tag);
    s = await st(page); is(s.slots.join() === 'green,blue,red', `${tag}: dragged onto the steps (swaps): ${s.slots.join()}`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(CAP(T(loc, 'okOrder', { rib1: RIB('green'), rib2: RIB('blue'), rib3: RIB('red') }))), `${tag}: okOrder «${sp(await note(page))}»`);
    /* ---- T4: tall, the trap ---- */
    tag = `${loc} T4`;
    await force(page, 'mixed', 'tall', 'T4', true);
    await page.focus(K('cord')); await page.keyboard.press('Enter'); s = await st(page); is(s.carrying, `${tag}: Enter on the basket picks the cord up`);
    await page.keyboard.press('Escape'); s = await st(page); is(!s.carrying, `${tag}: Escape puts it down`);
    await click(page, K('cord'), tag); await click(page, K('thing-stool'), tag); s = await st(page);
    d = await drawn(page);
    is(s.tags.stool === 'long' && Math.abs(d._cord - 6) < 0.05 && await page.evaluate(() => { const L = document.querySelector('.tc-laid line').getBoundingClientRect(); return L.height > L.width * 5; }), `${tag}: the cord held up beside the stool's bottle: 6 units, upright (${d._cord.toFixed(2)})`);
    for (const id of ['box', 'shelf']) { await click(page, K('cord'), tag); await click(page, K('thing-' + id), tag); }
    await click(page, K('thing-shelf'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintLongTall')), `${tag}: the high shelf's bottle (the highest top) → miss, hintLongTall`);
    await click(page, K('thing-stool'), tag); await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(T(loc, 'okLongTall')), `${tag}: the stool's → okLongTall`);
    is(await page.evaluate(() => { const a = window.TravelCordActivity, C = window.TravelCordCore, ink = C.DATA.INK[a.st.r.pic]; const f = [...document.querySelectorAll('.tc-pic')].map(im => { const b = im.getBoundingClientRect(); return b.top + b.height * (ink.y + ink.h); }); return f.length === 3 && Math.max(...f) - Math.min(...f) < 1.5; }), `${tag}: done — all three stand on the floor, feet level`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, r, state, tag) {
    if (state === 'rest') return;
    for (const x of r.items) { await click(page, K('cord'), tag); await click(page, K('thing-' + x.id), tag); }
    const ans = C.answer(r);
    if (r.kind === 'order') {
      const seq = state === 'solved' ? ans : ans.slice().reverse();
      for (let i = 0; i < 3; i++) { await click(page, K('thing-' + seq[i]), tag); await click(page, K('slot-' + i), tag); }
      await check(page, tag); if (state === 'miss2') await check(page, tag); return;
    }
    await click(page, K('thing-' + (state === 'solved' ? ans : r.items.find(x => x.id !== ans).id)), tag);
    await check(page, tag); if (state === 'miss2') await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.TravelCordActivity, C = window.TravelCordCore, D = a._dims(), r = a.st.r;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.tc-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.tc-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.tc-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.tc-wrap').getBoundingClientRect();
    document.querySelectorAll('.tc-wall,.tc-tray,.tc-rail,.tc-check,.tc-slot,.tc-basket').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.tc-wall', '.tc-row', '.tc-foot'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    /* the drawing is the length */
    if (!a.st.done) document.querySelectorAll('.tc-ribbon').forEach(e => { const b = e.getBoundingClientRect(), x = C.item(r, e.getAttribute('data-id')), L = Math.max(b.width, b.height) / D.U; if (Math.abs(L - x.len) * D.U > 1.01 * x.len) out.fails.push('a ribbon not drawn at its length'); });
    /* pictures: the smallest tall object ≥ 64 / 96 px, Tilly too */
    const wide = W.width >= 560, floor = wide ? 96 : 64;
    if (r.things === 'tall') { const ink = C.DATA.INK[r.pic]; document.querySelectorAll('.tc-pic').forEach(im => { const h = im.getBoundingClientRect().height * ink.h; if (h < floor - 0.5) out.fails.push('a picture only ' + Math.round(h) + ' px tall'); }); if (document.querySelectorAll('.tc-pic').length !== 3) out.fails.push('the pictures are missing'); }
    const cat = document.querySelector('.tc-cat'); if (!cat || cat.getBoundingClientRect().height < floor - 0.5) out.fails.push('Tilly is missing or under ' + floor + ' px');
    /* no numbers on the stage */
    const txt = ['.tc-wall', '.tc-tray', '.tc-rail'].map(s => (document.querySelector(s) || {}).textContent || '').join(' ');
    if (/\d/.test(txt)) out.fails.push('a digit on the stage');
    /* the wall's things inside the wall */
    const WR = document.querySelector('.tc-wall').getBoundingClientRect();
    /* the INK of a picture (its square image has transparent margins), measured from the art extents */
    const inkBox = (e) => { const q = e.getBoundingClientRect(); if (!e.classList.contains('tc-pic')) return q; const k = C.DATA.INK[r.pic]; return { left: q.left + q.width * k.x, right: q.left + q.width * (k.x + k.w), top: q.top + q.height * k.y, bottom: q.top + q.height * (k.y + k.h) }; };
    document.querySelectorAll('.tc-pic,.tc-ribbon').forEach(e => { const q = inkBox(e); if (q.left < WR.left - 1 || q.right > WR.right + 1 || q.top < WR.top - 1 || q.bottom > WR.bottom + 1) out.fails.push(e.getAttribute('class') + ' outside the wall'); });
    /* two pictures never overlap (ink) */
    const ib = [...document.querySelectorAll('.tc-pic')].map(inkBox); for (let i = 0; i < ib.length; i++) for (let j = i + 1; j < ib.length; j++) if (ib[i].left < ib[j].right - 1 && ib[j].left < ib[i].right - 1 && ib[i].top < ib[j].bottom - 1 && ib[j].top < ib[i].bottom - 1) out.fails.push('two pictures overlap');
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const face of FACES) { const [q, t] = face.split('.'); for (const id of C.ids(q, t)) for (const state of ['rest', 'miss2', 'solved']) {
      const r = C.round(q, t, id), w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${face} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, q, t, id, false);
      await reach(page, r, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${face} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.tc-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 300); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.tc-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^(L1|C4|O1|T4|TO1)$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${face}-${id}-${w}-${state}.png`), fullPage: true });
      }
    } }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-travel-cord: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
