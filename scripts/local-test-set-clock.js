#!/usr/bin/env node
/* =====================================================================
   local-test-set-clock.js — ACTIVITY #104, The Echo Slice, in a real
   browser with real pointer and key actions (never a model call to
   place, point or check a hand), 11 locales.
   Scenarios per locale (at 1024, level "o'clock and half past"):
     · 7:30: an empty Check → hintTray, no miss, a tray hand wiggles; the
       short hand from the tray (on the 12, chosen), the long hand from
       the tray, a TAP on the face points the long hand at the 6; the
       short hand chosen again from the tray, a real DRAG round the face
       to the 7 → Check → miss 1 (hintEdge): the receipt "7?:30", the
       echo drawn in the 7-to-8 slice with its end pulsing, the arrow; any
       hand move clears the showing (no receipt, no echo); the short hand
       dragged ON the 8 → miss 2 (hintScale): the receipt "8?:30", the
       five-minute scale round the rim; dragged half way between the 7 and
       the 8 → the celebration in the locale's words, the bell rings, the
       receipt teal with no "?", the echo's end ON the short hand; free
       play: the long hand still moves and the receipt follows;
     · 3:00 built swapped (long on the 3, short on the 12) → hintSwap, the
       receipt "12?:15"; 9:00 with the long hand on the 6 → hintMinutes,
       the receipt's minutes underlined;
     · the hub swaps the chosen hand; ArrowRight on a tray hand puts it on
       the clock and turns it one step;
     · Green slice "after Check": no echo while setting; "while setting":
       the echo follows the hands live and the receipt still waits;
     · the levels change the face at rest: 12 ticks (o'clock), thick
       3/6/9/12 (quarter hours), 60 ticks + the 5…55 scale (five minutes).
   Then every round of every level at rest, at miss 2 and solved —
   reached ONCE per locale by real clicks, then resized through
   320…1366: no sideways scroll, Check above the fold at rest, Check and
   the hint in view at miss 2, the success line in view, controls ≥ 44 px,
   nothing outside the card, the bands never overlap, no hand's reach,
   tick or scale number on a numeral, the hands drawn at the model's
   angles, the echo's end on the short hand when solved, digits ≥ 24 px.
   Usage: node scripts/local-test-set-clock.js [--widths=…] [--locales=…] [--levels=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const LEVELS = arg('levels', 'both,hour,half,quarter,five,mixed').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '104-set-clock', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const C = require(path.join(MINI, 'set-clock-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, SetClockCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'set-clock-activity.js'), 'utf8') + '\n;this.__A = SetClockActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = a || {}; return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const OK = (loc, id) => { const w = ACT.TIMES[loc].w[id]; return T(loc, 'ok', { W: w.charAt(0).toUpperCase() + w.slice(1) }); };
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
    await page.goto(`${base}/set-clock-activity.html?activity=clock.set-clock.1-md-b-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SetClockActivity && window.SetClockActivity.st && document.querySelector('.sc-svg'), { timeout: 15000 });
    await page.evaluate(() => { const a = window.SetClockActivity; a.FAST = true; a.OK_MS = 600000; });
    await page.evaluate(() => document.fonts ? document.fonts.ready.then(() => true) : true);
    return { page, errs };
  }
  async function force(page, level, id, slice) {
    await page.evaluate((level, id, slice) => { const a = window.SetClockActivity; a.api.settings.times = level; a.api.settings.slice = slice || 'after'; a._pool = null; a._ensurePool(); a._start(id, 0); a._render2(); window.scrollTo(0, 0); }, level, id, slice);
    await wait(20);
  }
  const st = (page) => page.evaluate(() => { const a = window.SetClockActivity, s = a.st, v = a._view; return { short: s.short, long: s.long, sel: s.sel, misses: s.misses, show: s.show, done: s.done, showing: v.showing, ring: v.ring }; });
  const note = (page) => page.evaluate(() => document.querySelector('.sc-note').textContent);
  const count = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)].filter(e => e.getClientRects().length).length, sel);
  const receipt = (page) => page.evaluate(() => { const r = document.querySelector('.sc-receipt'); return r ? r.textContent : null; });
  async function centre(page, sel) { return page.evaluate((s) => { const e = document.querySelector(s); if (!e || !e.getClientRects().length) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel); }
  async function click(page, sel, tag) {
    const b = await centre(page, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(10); return true;
  }
  const K = (k) => `[data-k="${k}"]`;
  /* a screen point on the face at angle deg (clockwise from 12), at a fraction of the face radius */
  async function facePt(page, deg, frac) {
    return page.evaluate((deg, frac) => { const a = window.SetClockActivity, D = a._dims(), sv = document.querySelector('.sc-svg'); sv.scrollIntoView({ block: 'center', behavior: 'instant' }); const R = sv.getBoundingClientRect(), rad = deg * Math.PI / 180, rr = frac * D.r; return { x: R.left + D.cx + rr * Math.sin(rad), y: R.top + D.cy - rr * Math.cos(rad) }; }, deg, frac);
  }
  async function tapFace(page, deg) { const p = await facePt(page, deg, 0.8); await page.mouse.click(p.x, p.y); await wait(15); }
  async function dragFace(page, from, to) {
    let p = await facePt(page, from, 0.8); await page.mouse.move(p.x, p.y); await page.mouse.down();
    const n = Math.max(4, Math.ceil(Math.abs(to - from) / 8));
    for (let i = 1; i <= n; i++) { p = await facePt(page, from + (to - from) * i / n, 0.8); await page.mouse.move(p.x, p.y); await wait(4); }
    await page.mouse.up(); await wait(20);
  }
  const check = (page, tag) => click(page, K('check'), tag);
  /* put a hand on the clock (from the tray, or choose it) and point it at deg */
  async function setHand(page, which, deg, tag) { await click(page, K('tray-' + which), tag); await tapFace(page, deg); }

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} 7:30`, s;
    await force(page, 'both', '7:30');
    await check(page, tag); s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hintTray')) && await count(page, '.sc-hand.is-wiggle') === 1, `${tag}: an empty Check → hintTray, no miss, a tray hand wiggles`);
    await click(page, K('tray-short'), tag); s = await st(page); is(s.short === 0 && s.sel === 'short', `${tag}: the short hand comes out of the tray onto the 12, chosen`);
    await click(page, K('tray-long'), tag); s = await st(page); is(s.long === 0 && s.sel === 'long', `${tag}: the long hand comes out, chosen`);
    await tapFace(page, 180); s = await st(page); is(s.long === 30 && s.short === 0, `${tag}: a tap on the face points the long hand at the 6 (${s.long}); the short hand stays`);
    await click(page, K('tray-short'), tag); s = await st(page); is(s.sel === 'short' && s.short === 0, `${tag}: the tray button chooses the short hand on the clock`);
    await dragFace(page, 20, 210); s = await st(page); is(s.short === 84, `${tag}: a real drag round the face lays the short hand on the 7 (step ${s.short})`);
    is(await count(page, '.sc-echo') === 0, `${tag}: "after Check": no echo while setting`);
    await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintEdge')) && sp(await receipt(page)) === sp('7?' + ACT.TIMES[loc].sep.trim() + '30'), `${tag}: on the 7 → miss 1, hintEdge, the receipt «${await receipt(page)}»`);
    const echoEnd = await page.evaluate(() => { const a = window.SetClockActivity, D = a._dims(), l = document.querySelector('.sc-edge'); return l ? ((Math.atan2(+l.getAttribute('x2') - D.cx, D.cy - +l.getAttribute('y2')) * 180 / Math.PI) + 360) % 360 : null; });
    is(echoEnd != null && Math.abs(echoEnd - 225) < 0.6 && await count(page, '.sc-edge.is-pulse') === 1 && await count(page, '.sc-arrow') === 1, `${tag}: the echo lands in the 7-to-8 slice, its end at 225° pulsing (${echoEnd && echoEnd.toFixed(1)}), the arrow drawn`);
    await tapFace(page, 240); s = await st(page);
    is(s.short === 96 && !s.showing && await receipt(page) === null && await count(page, '.sc-echo') === 0, `${tag}: a hand move clears the showing (no receipt, no echo)`);
    await check(page, tag); s = await st(page);
    is(s.misses === 2 && sp(await note(page)) === sp(T(loc, 'hintScale')) && sp(await receipt(page)) === sp('8?' + ACT.TIMES[loc].sep.trim() + '30') && await count(page, '.sc-min.is-help') === 11, `${tag}: on the 8 → miss 2, hintScale, «${await receipt(page)}», the 5…55 scale`);
    await dragFace(page, 240, 225); s = await st(page); is(s.short === 90, `${tag}: dragged half way between the 7 and the 8 (step ${s.short})`);
    await check(page, tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(OK(loc, '7:30')) && s.ring >= 1 && await count(page, '.sc-ringarc') === 3, `${tag}: → «${sp(await note(page))}», the bell rings`);
    is(await count(page, '.sc-receipt.is-ok') === 1 && (await receipt(page)).indexOf('?') < 0, `${tag}: the receipt teal, no "?"`);
    await setHand(page, 'long', 0, tag); s = await st(page);
    is(s.long === 0 && sp(await receipt(page)) === sp('8?' + ACT.TIMES[loc].sep.trim() + '00'), `${tag}: free play — the long hand moves to the 12 and the receipt follows: the short hand half way reads as the 8, with a "?" («${await receipt(page)}»)`);
    /* swapped, minutes */
    tag = `${loc} 3:00 swapped`;
    await force(page, 'both', '3:00');
    await setHand(page, 'long', 90, tag); await setHand(page, 'short', 0, tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintSwap')) && sp(await receipt(page)) === sp('12?' + ACT.TIMES[loc].sep.trim() + '15'), `${tag}: → hintSwap, «${await receipt(page)}»`);
    tag = `${loc} 9:00 minutes`;
    await force(page, 'both', '9:00');
    await setHand(page, 'short', 270, tag); await setHand(page, 'long', 180, tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintMinutes')) && await count(page, '.sc-rm.is-off') === 1, `${tag}: → hintMinutes, the minutes underlined`);
    /* the hub, the keyboard */
    tag = `${loc} hub+keys`;
    await force(page, 'both', '4:30');
    await setHand(page, 'short', 90, tag); await setHand(page, 'long', 270, tag);
    const hub = await facePt(page, 0, 0); await page.mouse.click(hub.x, hub.y); await wait(10); s = await st(page); is(s.sel === 'short', `${tag}: a tap on the hub swaps the chosen hand`);
    await force(page, 'both', '4:30');
    await page.focus(K('tray-short')); await page.keyboard.press('ArrowRight'); await wait(10); s = await st(page); is(s.short === 1 && s.sel === 'short', `${tag}: ArrowRight on a tray hand puts it on the clock and turns it one step`);
    /* the green slice setting */
    tag = `${loc} live`;
    await force(page, 'both', '4:30', 'live');
    await setHand(page, 'short', 135, tag); await setHand(page, 'long', 180, tag);
    is(await count(page, '.sc-echo') === 1 && await receipt(page) === null, `${tag}: "while setting": the echo follows the hands, the receipt waits for Check`);
    /* the levels change the face at rest */
    tag = `${loc} levels`;
    await force(page, 'hour', '3:00'); const tH = await count(page, '.sc-tick'), mH = await count(page, '.sc-min');
    await force(page, 'quarter', '4:15'); const thick = await page.evaluate(() => [...document.querySelectorAll('.sc-tick')].filter(l => +l.getAttribute('stroke-width') === 5).length);
    await force(page, 'five', '2:10'); const tF = await count(page, '.sc-tick'), mF = await count(page, '.sc-min');
    is(tH === 12 && mH === 0 && thick === 4 && tF === 60 && mF === 11, `${tag}: o'clock 12 ticks · quarter hours 4 thick · five minutes 60 ticks and the 5…55 scale (${tH}/${mH}/${thick}/${tF}/${mF})`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real clicks, then resized ---- */
  async function reach(page, id, state, tag) {
    if (state === 'rest') return;
    const t = C.parse(id), longDeg = t.m * 6, trueDeg = 30 * (t.h % 12) + t.m / 2;
    await setHand(page, 'long', longDeg, tag);
    if (state === 'miss2') {
      await setHand(page, 'short', trueDeg + 60, tag); await check(page, tag);
      await setHand(page, 'short', trueDeg + 90, tag); await check(page, tag); return;
    }
    await setHand(page, 'short', trueDeg, tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.SetClockActivity, C = window.SetClockCore, D = a._dims(), st = a.st;
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.sc-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.sc-check').getBoundingClientRect(); out.cTop = ck.top; out.cBottom = ck.bottom;
    const nr = document.querySelector('.sc-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.sc-wrap').getBoundingClientRect();
    document.querySelectorAll('.sc-stage,.sc-row,.sc-card,.sc-receipt,.sc-tray,.sc-check,.sc-svg,.sc-hand').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push(e.className.baseVal != null ? 'svg' : e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.sc-stage', '.sc-row', '.sc-foot', '.sc-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const svg = document.querySelector('.sc-svg').getBoundingClientRect(), cx = svg.left + D.cx, cy = svg.top + D.cy;
    const at = (r, an) => ({ x: cx + r * Math.sin(an), y: cy - r * Math.cos(an) });
    const glyph = (n) => { const b = n.getBoundingClientRect(), fs = parseFloat(n.getAttribute('font-size')), my = b.top + b.height / 2; return { left: b.left, right: b.right, top: my - 0.38 * fs, bottom: my + 0.38 * fs, cx: b.left + b.width / 2, cy: my }; };
    const dist = (g, p) => Math.hypot(Math.max(g.left - p.x, 0, p.x - g.right), Math.max(g.top - p.y, 0, p.y - g.bottom));
    const reach = D.longL + D.longW / 2, sreach = D.shortL + D.shortW / 2;
    document.querySelectorAll('.sc-num').forEach(n => {
      const g = glyph(n), a0 = Math.atan2(g.cx - cx, cy - g.cy);
      if (dist(g, at(reach, a0)) < 2 || dist(g, at(sreach, a0)) < 2) out.fails.push('a hand reaches the ' + n.textContent);
      if ([...document.querySelectorAll('.sc-tick')].some(l => { const p1 = { x: svg.left + +l.getAttribute('x1'), y: svg.top + +l.getAttribute('y1') }, p2 = { x: svg.left + +l.getAttribute('x2'), y: svg.top + +l.getAttribute('y2') }; return Math.min(dist(g, p1), dist(g, p2)) < 2; })) out.fails.push('the ' + n.textContent + ' touches a tick');
    });
    /* the scale numbers sit outside the rim and never touch one another */
    const mins = [...document.querySelectorAll('.sc-min')].map(m => m.getBoundingClientRect());
    mins.forEach((b, i) => { const near = Math.hypot(Math.max(b.left - cx, 0, cx - b.right) ? Math.min(Math.abs(b.left - cx), Math.abs(b.right - cx)) * (b.left > cx || b.right < cx ? 1 : 0) : 0, 0); void near;
      const corners = [[b.left, b.top], [b.right, b.top], [b.left, b.bottom], [b.right, b.bottom]], inner = Math.min.apply(null, corners.map(c => Math.hypot(c[0] - cx, c[1] - cy)));
      if (inner < D.RO + 1) out.fails.push('a scale number on the rim');
      mins.forEach((o, j) => { if (j > i && !(b.right < o.left || o.right < b.left || b.bottom < o.top || o.bottom < b.top)) out.fails.push('two scale numbers touch'); }); });
    /* the hands drawn at the model's angles; when solved the echo's end lies on the short hand */
    const ang = (l) => ((Math.atan2(+l.getAttribute('x2') - D.cx, D.cy - +l.getAttribute('y2')) * 180 / Math.PI) + 360) % 360, dA = (p, q) => Math.min(Math.abs(p - q) % 360, 360 - Math.abs(p - q) % 360);
    const sh = document.querySelector('.sc-short'), lo = document.querySelector('.sc-long');
    if ((st.short != null) !== !!sh || (st.long != null) !== !!lo) out.fails.push('a hand drawn that is not on the clock (or missing)');
    if (sh && dA(ang(sh), C.shortDeg(st.short)) > 0.5) out.fails.push('the short hand drawn off its angle');
    if (lo && dA(ang(lo), C.longDeg(st.long)) > 0.5) out.fails.push('the long hand drawn off its angle');
    if (st.done) { const ed = document.querySelector('.sc-edge'); if (!ed || dA(ang(ed), C.shortDeg(st.short)) > 0.6) out.fails.push('solved, but the echo end is not on the short hand'); }
    document.querySelectorAll('.sc-target,.sc-receipt').forEach(e => { const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 24) out.fails.push('digits ' + fs + ' px'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const level of LEVELS) for (const id of C.ids(level)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${level} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, level, id);
      await reach(page, id, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2, `${t0}: two misses by real clicks (${s0.misses})`);
      if (state === 'solved') is(s0.done, `${t0}: solved by real clicks`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${level} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const a = window.SetClockActivity, D = a._dims(), sv = document.querySelector('.sc-svg'); return sv && Math.abs(+sv.getAttribute('width') - D.S) < 1 && a._wrap.classList.contains(D.wide ? 'is-wide' : 'is-narrow'); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity redrew for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.sc-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^(7:30|8:20|9:45|12:00)$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${level}-${id.replace(':', '')}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-set-clock: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
