#!/usr/bin/env node
/* =====================================================================
   local-test-pull-key.js — ACTIVITY #103, The Pull-Back Key, in a real
   browser with real pointer and key actions (never a model call to wind,
   choose, turn or check), 11 locales.
   Scenarios per locale (at 1024):
     · R3 (board, 8:30): an empty Check → hintChoose; a real CIRCULAR drag
       anticlockwise round the key winds both hands back six clicks and the
       key stops on the o'clock — the short hand ON the 8, its number
       ringed; let go → back to 8:30, the ring stays; a clockwise drag does
       nothing; the window is a plain day pane; 7:30 → Check → miss 1 (the
       spring rewinds by itself, hintBack); 9:00 → miss 2 (hintCount, six
       beads counted 5…30); 8:30 → the celebration with the locale's time
       words and event, Owl out with the bed, one dot lit, the evening
       window; free play: ▶ moves the clock on five minutes;
     · R2 (write, 3:00): an untouched Check → hintWheels; ▲ ▲ ▲ on the hour
       and ▼ on the minutes → 3 : 00 → the celebration;
     · R4 (partners, 6:30): the key is idle until a clock is chosen; 6:00 →
       miss (hintBack, its 6 ringed); 6:30 → right;
     · R5 (set, 7:00 → 9:00): Check → hintWind; ▶ ×4 → 9:00 → the
       celebration, nine dots lit;
     · the keyboard: ArrowLeft on the key rewinds (R1); Enter on a card;
     · Rounds "read only": R5 is a write round.
   Then every round of both levels at rest, at miss 2 and solved — reached
   ONCE per locale by real clicks, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, nothing
   outside the card, the bands never overlap, pictures ≥ 64 / 96 px, no
   hand or tick on a numeral, the hands drawn at the geared angles.
   Usage: node scripts/local-test-pull-key.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'half,quarter').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), PUB = path.join(REPO, 'frontend', 'public');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '103-pull-key', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'pull-key-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, PullKeyCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'pull-key-activity.js'), 'utf8') + '\n;this.__A = PullKeyActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = Object.assign({ name: ACT.strings.name[loc] }, a || {}); return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const OK = (loc, id, mix) => { const f = Object.create(ACT); f.api = { lang: loc, t: (k) => ACT.strings[k][loc], settings: {} }; f.st = C.newState(C.round(id, mix || 'readset')); return f._okText(); };
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
    await page.goto(`${base}/pull-key-activity.html?activity=clock-read.tell-time.1-md-b-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PullKeyActivity && window.PullKeyActivity.st && document.querySelector('.pk-wrap') && Object.keys(window.PullKeyActivity._pics).length >= new Set(Object.values(window.PullKeyCore.DATA.EVENTS).concat([window.PullKeyCore.DATA.OWL]).map(p => p[0])).size, { timeout: 15000 });
    await page.evaluate(() => { const a = window.PullKeyActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, times, rounds, id) {
    await page.evaluate((times, rounds, id) => { const a = window.PullKeyActivity; a.api.settings.times = times; a.api.settings.rounds = rounds; a._pool = null; a._ensurePool(); a._start(id, 0); a._render2(); window.scrollTo(0, 0); }, times, rounds, id);
    await wait(30);
  }
  const st = (page) => page.evaluate(() => { const a = window.PullKeyActivity, s = a.st, v = a._view, C = window.PullKeyCore, f = C.face(s); return { type: s.r.type, back: s.back, face: f ? C.fmt(f) : null, shown: C.fmt(s.shown), pick: s.pick, sel: s.sel, wheels: s.wheels ? C.fmt(s.wheels) : null, misses: s.misses, show: s.show, done: s.done, ring: v.ring, beads: v.beads, owl: v.owl, lit: v.lit, bobs: v.bobs, free: v.free, freeT: v.freeT ? C.fmt(v.freeT) : null }; });
  const note = (page) => page.evaluate(() => document.querySelector('.pk-note').textContent);
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
  /* a real circular drag round the key's bow: `turn` degrees (negative = anticlockwise), then optionally hold before letting go */
  async function turnKey(page, turn, beforeUp) {
    const c = await centre(page, K('key'));
    const R = await page.evaluate(() => document.querySelector('[data-k="key"]').getBoundingClientRect().width * 0.36);
    const steps = Math.ceil(Math.abs(turn) / 10), at = (deg) => ({ x: c.x + R * Math.sin(deg * Math.PI / 180), y: c.y - R * Math.cos(deg * Math.PI / 180) });
    let p = at(0); await page.mouse.move(p.x, p.y); await page.mouse.down();
    for (let i = 1; i <= steps; i++) { p = at(turn * i / steps); await page.mouse.move(p.x, p.y); await wait(6); }
    if (beforeUp) await beforeUp();
    await page.mouse.up(); await wait(20);
  }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} R3`, s;
    await force(page, 'half', 'readset', 'R3');
    is(await page.evaluate(() => document.querySelector('.pk-window').getAttribute('class')) === 'pk-window is-day', `${tag}: before success the window is a plain day pane`);
    await check(page, tag); s = await st(page); is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintChoose')), `${tag}: an empty Check → hintChoose`);
    let mid = null;
    await turnKey(page, -230, async () => { mid = await st(page); });
    is(mid && mid.back === 6 && mid.face === '8:00' && mid.ring === 8, `${tag}: a real anticlockwise drag winds back six clicks and STOPS: the short hand on the 8 (${mid && mid.face}, ring ${mid && mid.ring})`);
    s = await st(page); is(s.back === 0 && s.face === '8:30' && s.ring === 8, `${tag}: let go → back to 8:30, the 8 stays ringed`);
    await turnKey(page, 120); s = await st(page); is(s.back === 0 && s.face === '8:30', `${tag}: a clockwise drag does nothing (the spring only winds back)`);
    await click(page, K('card-1'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.ring === 8 && s.back === 0 && sp(await note(page)) === sp(T(loc, 'hintBack')), `${tag}: 7:30 → miss 1, the spring rewound by itself (8 ringed), hintBack`);
    await click(page, K('card-0'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 2 && s.beads === 6 && await count(page, '.pk-bead') === 6 && sp(await note(page)) === sp(T(loc, 'hintCount')), `${tag}: 9:00 → miss 2, six beads, hintCount`);
    is(await page.evaluate(() => !document.querySelector('.pk-five') && !/(5|10|15|20|25|30)/.test([...document.querySelectorAll('.pk-svg text')].filter(e => !e.classList.contains('pk-num')).map(e => e.textContent).join(' '))), `${tag}: no count printed on the face (the minutes would be the answer)`);
    is(await page.evaluate(() => !document.querySelector('.pk-card.is-right')), `${tag}: the right card is not marked before it is chosen`);
    await click(page, K('card-2'), tag); await check(page, tag); s = await st(page);
    is(s.done && s.owl && s.bobs === 1 && s.lit === 1 && sp(await note(page)) === sp(OK(loc, 'R3')), `${tag}: 8:30 → «${sp(await note(page))}», Owl out, one call`);
    is(await count(page, '.pk-owl') === 1 && await count(page, '.pk-evpic') === 1 && await page.evaluate(() => document.querySelector('.pk-window').getAttribute('class')) === 'pk-window is-evening', `${tag}: Owl holds the bed; the evening window`);
    await click(page, K('on'), tag); s = await st(page); is(s.freeT === '8:35', `${tag}: free play — ▶ winds the clock on five minutes (${s.freeT})`);
    /* ---- R2 write ---- */
    tag = `${loc} R2`;
    await force(page, 'half', 'readset', 'R2');
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintWheels')), `${tag}: untouched wheels → hintWheels`);
    for (let i = 0; i < 3; i++) await click(page, K('h-up'), tag);
    await click(page, K('m-down'), tag); s = await st(page); is(s.wheels === '3:00', `${tag}: the wheels turned to 3 : 00 (${s.wheels})`);
    await check(page, tag); s = await st(page); is(s.done && sp(await note(page)) === sp(OK(loc, 'R2')), `${tag}: → «${sp(await note(page))}»`);
    /* ---- R4 partners ---- */
    tag = `${loc} R4`;
    await force(page, 'half', 'readset', 'R4');
    is(await page.evaluate(() => document.querySelector('[data-k="key"]').disabled), `${tag}: the key is idle until a clock is chosen`);
    await click(page, K('clock-0'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.ring === 6 && sp(await note(page)) === sp(T(loc, 'hintBack')), `${tag}: 6:00 → miss, its 6 ringed, hintBack`);
    await click(page, K('clock-2'), tag); await check(page, tag); s = await st(page); is(s.done, `${tag}: 6:30 → right`);
    /* ---- R5 set ---- */
    tag = `${loc} R5`;
    await force(page, 'half', 'readset', 'R5');
    await check(page, tag); is(sp(await note(page)) === sp(T(loc, 'hintWind')), `${tag}: an unwound clock → hintWind`);
    for (let i = 0; i < 4; i++) await click(page, K('on'), tag);
    s = await st(page); is(s.shown === '9:00', `${tag}: ▶ ×4 → 9:00 (${s.shown})`);
    await check(page, tag); s = await st(page); is(s.done && s.lit === 9 && await count(page, '.pk-dot.is-lit') === 9 && sp(await note(page)) === sp(OK(loc, 'R5')), `${tag}: → «${sp(await note(page))}», nine calls`);
    /* ---- the keyboard ---- */
    tag = `${loc} keys`;
    await force(page, 'half', 'readset', 'R1');
    await page.focus(K('card-0')); await page.keyboard.press('Enter'); await wait(10); s = await st(page); is(s.pick === 0, `${tag}: Enter on a card picks it`);
    await force(page, 'half', 'readset', 'R6');
    await page.focus(K('key')); await page.keyboard.press('ArrowLeft'); await wait(20); s = await st(page); is(s.ring === 1 && s.back === 0, `${tag}: ArrowLeft on the key rewinds 1:30 to the 1 (ring ${s.ring})`);
    /* ---- read only ---- */
    await force(page, 'half', 'read', 'R5'); s = await st(page); is(s.type === 'write' && await count(page, '[data-k="on"]') === 0, `${loc} read only: R5 is a write round, the key never pulled out`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, state, tag) {
    if (state === 'rest') return;
    const info = await page.evaluate(() => { const a = window.PullKeyActivity, C = window.PullKeyCore, r = a.st.r; return { type: r.type, right: r.type === 'board' ? r.cards.findIndex(c => C.same(c.t, r.time)) : r.type === 'partners' ? r.clocks.findIndex(c => C.same(c, r.time)) : -1, wrong: r.type === 'board' ? r.cards.map((c, i) => C.same(c.t, r.time) ? -1 : i).filter(i => i >= 0) : r.type === 'partners' ? r.clocks.map((c, i) => C.same(c, r.time) ? -1 : i).filter(i => i >= 0) : [], need: r.type === 'write' ? { h: (r.time.h - r.start.h + 12) % 12, m: r.time.m } : r.type === 'set' ? (C.toMin(r.time) - C.toMin(r.start) + 720) % 720 : 0, step: C.stepOf(a._times()), m0: a.st.wheels ? a.st.wheels.m : 0 }; });
    const ans = async (right) => {
      if (info.type === 'board') await click(page, K('card-' + (right ? info.right : info.wrong[0])), tag);
      else if (info.type === 'partners') await click(page, K('clock-' + (right ? info.right : info.wrong[0])), tag);
      else if (info.type === 'write') { const h = right ? info.need.h : info.need.h + 1; for (let i = 0; i < h; i++) await click(page, K('h-up'), tag); if (right) { let g = 0; while ((await st(page)).wheels.split(':')[1] !== String(info.need.m).padStart(2, '0') && g++ < 4) await click(page, K('m-up'), tag); } }
      else { const n = info.need / info.step + (right ? 0 : 1); for (let i = 0; i < n; i++) await click(page, K('on'), tag); }
    };
    if (state === 'miss2') { await ans(false); await check(page, tag); if (info.type === 'board' || info.type === 'partners') await click(page, K((info.type === 'board' ? 'card-' : 'clock-') + info.wrong[1]), tag); else await ans(false); await check(page, tag); return; }
    await ans(true); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.PullKeyActivity, C = window.PullKeyCore, D = a._dims();
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.pk-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.pk-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.pk-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.pk-wrap').getBoundingClientRect(), floor = W.width >= 560 ? 96 : 64;
    document.querySelectorAll('.pk-stage,.pk-answer,.pk-card,.pk-check,.pk-wheels,.pk-owl,.pk-evpic,.pk-arrow,.pk-key').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.pk-stage', '.pk-answer', '.pk-foot', '.pk-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    document.querySelectorAll('.pk-cardpic,.pk-owl,.pk-evpic').forEach(im => { const q = im.getBoundingClientRect(); if (Math.min(q.width, q.height) < floor - 0.5) out.fails.push('a picture only ' + Math.round(q.height) + ' px'); });
    /* the arrows and the key never cover the clock face */
    const svg = document.querySelector('.pk-svg').getBoundingClientRect();
    document.querySelectorAll('.pk-arrow,.pk-key').forEach(e => { const q = e.getBoundingClientRect(); D.clocks.forEach(c => { const cx = svg.left + c.cx, cy = svg.top + c.cy, dx = Math.max(q.left - cx, 0, cx - q.right), dy = Math.max(q.top - cy, 0, cy - q.bottom); if (Math.hypot(dx, dy) < c.r - 1) out.fails.push(e.className.split(' ')[0] + ' on a clock face'); }); });
    /* numerals: no hand tip or tick on the digits (point-to-box, on the numeral's ray) */
    const glyph = (n) => { const b = n.getBoundingClientRect(), fs = parseFloat(n.getAttribute('font-size')), my = b.top + b.height / 2; return { left: b.left, right: b.right, top: my - 0.38 * fs, bottom: my + 0.38 * fs, cx: b.left + b.width / 2, cy: my }; };
    document.querySelectorAll('.pk-num').forEach(n => {
      const g = glyph(n), c = D.clocks.map(k => ({ k, d: Math.hypot(g.cx - svg.left - k.cx, g.cy - svg.top - k.cy) })).sort((x, y) => x.d - y.d)[0].k, a0 = Math.atan2(g.cx - svg.left - c.cx, c.cy - (g.cy - svg.top));
      const at = (r, an) => ({ x: svg.left + c.cx + r * Math.sin(an), y: svg.top + c.cy - r * Math.cos(an) });
      const dist = (p) => Math.hypot(Math.max(g.left - p.x, 0, p.x - g.right), Math.max(g.top - p.y, 0, p.y - g.bottom));
      const ci = D.clocks.indexOf(c), ln = document.querySelectorAll('.pk-long')[ci], reach = ln ? Math.hypot(+ln.getAttribute('x2') - c.cx, +ln.getAttribute('y2') - c.cy) + parseFloat(ln.getAttribute('stroke-width')) / 2 : 0.62 * c.r;
      if (dist(at(reach, a0)) < 2) out.fails.push('a hand reaches the ' + n.textContent);
      /* every tick actually drawn on this face: no tick end within 2 px of the numeral */
      const near = (p) => Math.hypot(p.x - svg.left - c.cx, p.y - svg.top - c.cy) <= c.r + 1;
      if ([...document.querySelectorAll('.pk-tick')].some(l => { const p1 = { x: svg.left + +l.getAttribute('x1'), y: svg.top + +l.getAttribute('y1') }, p2 = { x: svg.left + +l.getAttribute('x2'), y: svg.top + +l.getAttribute('y2') }; return near(p1) && near(p2) && Math.min(dist(p1), dist(p2)) < 2; })) out.fails.push('the ' + n.textContent + ' touches the tick marks');
    });
    /* the miss-2 beads clear every numeral by 2 px; the hour ring never meets the long hand's reach */
    document.querySelectorAll('.pk-bead').forEach(bd => { const bx = svg.left + +bd.getAttribute('cx'), by = svg.top + +bd.getAttribute('cy'), br = +bd.getAttribute('r'); document.querySelectorAll('.pk-num').forEach(n => { const g = glyph(n); if (Math.hypot(Math.max(g.left - bx, 0, bx - g.right), Math.max(g.top - by, 0, by - g.bottom)) - br < 2) out.fails.push('a bead on the ' + n.textContent); }); });
    document.querySelectorAll('.pk-ring').forEach(rg => { const x = +rg.getAttribute('cx'), y = +rg.getAttribute('cy'), rr = +rg.getAttribute('r'); const c = D.clocks.map(k => ({ k, d: Math.hypot(x - k.cx, y - k.cy) })).sort((p, q) => p.d - q.d)[0]; const ln = document.querySelectorAll('.pk-long')[D.clocks.indexOf(c.k)]; const reach = Math.hypot(+ln.getAttribute('x2') - c.k.cx, +ln.getAttribute('y2') - c.k.cy) + parseFloat(ln.getAttribute('stroke-width')) / 2; if (c.d - rr - reach < 2) out.fails.push('the hour ring meets the long hand'); });
    /* the hands drawn at the geared angles */
    const st2 = a.st, r = st2.r, v = a._view;
    document.querySelectorAll('.pk-short').forEach((l, i) => { const c = D.clocks[i]; let t = r.type === 'partners' ? r.clocks[i] : st2.shown; if (v.free && (r.type !== 'partners' || st2.sel === i)) t = v.freeT; else if (r.type !== 'partners' || st2.sel === i) t = C.add(t, -5 * st2.back); const ang = (sel) => { const x = +sel.getAttribute('x2') - c.cx, y = c.cy - +sel.getAttribute('y2'); return ((Math.atan2(x, y) * 180 / Math.PI) + 360) % 360; }; const want = C.angles(t), dA = (p, q) => Math.min(Math.abs(p - q) % 360, 360 - Math.abs(p - q) % 360); if (dA(ang(l), want.hour) > 0.5 || dA(ang(document.querySelectorAll('.pk-long')[i]), want.minute) > 0.5) out.fails.push('a hand drawn off its geared angle'); });
    document.querySelectorAll('.pk-tag,.pk-wval,.pk-signtext').forEach(e => { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 20) out.fails.push('digits ' + fs + ' px'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const times of FACES) for (const id of C.ids(times)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${times} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, times, 'readset', id);
      await reach(page, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done && s0.owl, `${t0}: solved by real clicks, Owl out`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${times} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.pk-wrap'), W = Math.floor(e.getBoundingClientRect().width), sv = document.querySelector('.pk-svg'); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 300) && sv && Math.abs(+sv.getAttribute('width') - Math.min(W, 660)) < 1.5; }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.pk-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^(R1|R2|R4|R5|Q1)$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${times}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-pull-key: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
