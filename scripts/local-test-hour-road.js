#!/usr/bin/env node
/* =====================================================================
   local-test-hour-road.js — ACTIVITY #101, The Hour Road, in a real
   browser with real pointer and key actions (never a model call to choose
   a card or check), 11 locales.
   Scenarios per locale (at 1024, the cards in a fixed order):
     · R1 (3:30): an empty Check → hintNone, no miss; tap 4:30 → Check →
       the road rolls round the dial and the marker stands one hour past
       the short hand's tip, a dashed arc between them (hintNext); tap 3:00
       → Check → miss 2 (hintWatch): the marker walks to the tip and the tip
       glows; tap 3:30 → Check → the locale's celebration; the road
       unrolls and the marker rests on its 3:30 spot; DRAG the marker to
       the 6 post → the hands follow and the readout says 6:00; the arrow
       key moves it half a segment;
     · R2 (6:00): tap 5:30 → hintShort and the long hand glows;
     · the keyboard: Tab to a card, Enter chooses it, Enter on Check;
     · H5 with the road "Only to check": at rest no posts on the road;
       on Check they appear.
   Then every round of both levels at rest, at miss 2 and solved — reached
   ONCE per locale by real taps, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, nothing
   outside the card, the bands never overlap, Sprocket ≥ 64 / 96 px and
   clear of every numeral, the card digits ≥ 24 px, the marker where the
   model puts it (on the tip at miss 2, on its road spot when solved).
   Usage: node scripts/local-test-hour-road.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'both,half').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), PUB = path.join(REPO, 'frontend', 'public');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '101-hour-road', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'hour-road-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, HourRoadCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'hour-road-activity.js'), 'utf8') + '\n;this.__A = HourRoadActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = Object.assign({ name: ACT.strings.name[loc] }, a || {}); return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const OKT = (loc, t) => { const fake = Object.create(ACT); fake.api = { lang: loc, t: (k) => ACT.strings[k][loc] }; return fake._t('okTime', { d: fake._digital(t), p: fake._phrase(t) }); };
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
    await page.goto(`${base}/hour-road-activity.html?activity=clock-digital.read-half-hour.1-md-b-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.HourRoadActivity && window.HourRoadActivity.st && document.querySelector('.hr-wrap') && window.HourRoadActivity._pics.farm && document.querySelector('.hr-rooster'), { timeout: 10000 });
    await page.evaluate(() => { const a = window.HourRoadActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  /* force a round with a FIXED card order so the scenario is the same in every locale */
  async function force(page, times, road, id, order) {
    await page.evaluate((times, road, id, order) => { const a = window.HourRoadActivity; a.api.settings.times = times; a.api.settings.road = road; a._pool = null; a._ensurePool(); a._start(id, 0); if (order) a.st.order = order; a._render2(); window.scrollTo(0, 0); }, times, road, id, order || null);
    await page.waitForFunction(() => document.querySelector('.hr-rooster'), { timeout: 4000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.HourRoadActivity.st, v = window.HourRoadActivity._view; return { chosen: s.chosen, misses: s.misses, show: s.show, done: s.done, order: s.order.slice(), s: v.s, ring: v.ring, mk: v.mk, disp: v.disp, free: !!v.free, glow: !!v.glow, arc: !!v.arc }; });
  const note = (page) => page.evaluate(() => document.querySelector('.hr-note').textContent);
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
  /* where things are drawn: the marker's disc, the tip cap, the dial centre */
  const GEOM = () => { const a = window.HourRoadActivity, D = a._dims(), svg = document.querySelector('.hr-svg').getBoundingClientRect(), mk = document.querySelector('.hr-marker > circle:last-child'), tip = document.querySelector('.hr-tip');
    const c = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return { x: b.left + b.width / 2 - svg.left, y: b.top + b.height / 2 - svg.top }; };
    return { D: { cx: D.cx, cy: D.cy, tip: D.tip, R: D.R, L: D.L, x0: D.x0, yBand: D.yBand }, mk: c(mk), tip: c(tip) }; };
  const angOf = (g, p) => (Math.atan2(p.x - g.D.cx, g.D.cy - p.y) * 180 / Math.PI + 360) % 360;
  const dAng = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} R1`, s, g;
    await force(page, 'both', 'shown', 'R1', [0, 1, 2]);   /* 3:30 · 3:00 · 4:30 */
    is(await count(page, '.hr-sign') === 13 && await count(page, '.hr-stone') === 12, `${tag}: the road has 13 posts and 12 half stones`);
    await check(page, tag); s = await st(page);
    is(sp(await note(page)) === sp(T(loc, 'hintNone')) && s.misses === 0, `${tag}: an empty Check → hintNone, no miss`);
    await click(page, K('card-2'), tag); s = await st(page); is(s.chosen === 2, `${tag}: tap 4:30 → chosen`);
    await check(page, tag); s = await st(page); g = await page.evaluate(GEOM);
    is(s.misses === 1 && s.s === 1 && s.ring === 1 && s.arc && sp(await note(page)) === sp(T(loc, 'hintNext')), `${tag}: 4:30 → the road rolled round the dial, an arc, hintNext`);
    is(g.mk && Math.abs(Math.hypot(g.mk.x - g.D.cx, g.mk.y - g.D.cy) - g.D.tip) < 1.5 && dAng(angOf(g, g.mk), 135) < 1 && dAng(angOf(g, g.tip), 105) < 1, `${tag}: the marker stands at 4:30 on the tip circle, the tip at 3:30 (${g.mk && angOf(g, g.mk).toFixed(1)}°, ${angOf(g, g.tip).toFixed(1)}°)`);
    is(await count(page, '.hr-arc') === 1, `${tag}: the dashed arc is drawn`);
    await click(page, K('card-1'), tag); s = await st(page); is(s.chosen === 1 && !s.arc && s.s === 0, `${tag}: a new tap unrolls the road and takes the arc away`);
    await check(page, tag); s = await st(page); g = await page.evaluate(GEOM);
    is(s.misses === 2 && s.glow && sp(await note(page)) === sp(T(loc, 'hintWatch')), `${tag}: 3:00 → miss 2, hintWatch, the tip glows`);
    is(g.mk && Math.hypot(g.mk.x - g.tip.x, g.mk.y - g.tip.y) < 1.5, `${tag}: miss 2 — the marker walked round to the short hand's tip`);
    is(await page.evaluate(() => /\d/.test([...document.querySelectorAll('.hr-cards .hr-card')].map(c => c.className).join('')) === false && !document.querySelector('.hr-card.is-right')), `${tag}: no card is marked right before it is chosen`);
    await click(page, K('card-0'), tag); await check(page, tag); s = await st(page); g = await page.evaluate(GEOM);
    is(s.done && sp(await note(page)) === sp(OKT(loc, { h: 3, m: 30 })), `${tag}: 3:30 → «${sp(await note(page))}»`);
    is(s.s === 0 && s.free && g.mk && Math.abs(g.mk.x - (g.D.x0 + g.D.L * 7 / 24)) < 1.5 && Math.abs(g.mk.y - g.D.yBand) < 1.5, `${tag}: the road unrolled, the marker rests on its 3:30 spot`);
    is(await count(page, '.hr-card.is-right') === 1, `${tag}: the right card glows`);
    /* free play: drag the marker to the 6 post */
    const pts = await page.evaluate(() => { const a = window.HourRoadActivity, D = a._dims(), svg = document.querySelector('.hr-svg').getBoundingClientRect(), m = document.querySelector('[data-k="marker"]').getBoundingClientRect(); return { ax: m.left + m.width / 2, ay: m.top + m.height / 2, tx: svg.left + D.x0 + D.L * 12 / 24 + 3, ty: m.top + m.height / 2 }; });
    await page.mouse.move(pts.ax, pts.ay); await page.mouse.down();
    for (let k = 1; k <= 8; k++) { await page.mouse.move(pts.ax + (pts.tx - pts.ax) * k / 8, pts.ay); await wait(10); }
    await page.mouse.up(); await wait(30); s = await st(page);
    is(s.mk === 12 && s.disp === 12 && sp(await page.evaluate(() => (document.querySelector('.hr-readout') || {}).textContent || '')) === '6:00', `${tag}: the marker dragged to the 6 post → the hands follow, the readout 6:00 (${s.mk})`);
    await page.focus(K('marker')); await page.keyboard.press('ArrowRight'); await wait(10); s = await st(page);
    is(s.mk === 13 && sp(await page.evaluate(() => document.querySelector('.hr-readout').textContent)) === '6:30', `${tag}: the arrow key moves it half a segment (6:30)`);
    /* ---- R2: half an hour too soon ---- */
    tag = `${loc} R2`;
    await force(page, 'both', 'shown', 'R2', [0, 1, 2]);   /* 6:00 · 6:30 · 5:30 */
    await click(page, K('card-2'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hintShort')) && await count(page, '.hr-long.is-glow') === 1, `${tag}: 5:30 → hintShort, the long hand glows`);
    /* ---- the keyboard ---- */
    tag = `${loc} keys`;
    await force(page, 'both', 'shown', 'R6', [1, 0, 2]);   /* 5:30 · 5:00 · 4:30 */
    await page.focus(K('card-1')); await page.keyboard.press('Enter'); await wait(10);
    s = await st(page); is(s.chosen === 1, `${tag}: Enter on a card chooses it`);
    await page.focus(K('check')); await page.keyboard.press('Enter'); await wait(10); s = await st(page);
    is(s.done, `${tag}: Enter on Check checks (5:00 right)`);
    /* ---- the road only to check ---- */
    tag = `${loc} H5 check-road`;
    await force(page, 'half', 'check', 'H5', [0, 1, 2]);
    is(await count(page, '.hr-sign') === 0 && await count(page, '.hr-marker') === 0, `${tag}: at rest the road shows no posts and no marker`);
    await click(page, K('card-2'), tag); await check(page, tag);
    is(await count(page, '.hr-stone') === 12, `${tag}: on Check the road appears (rolled round the dial)`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real taps, then resized ---- */
  async function reach(page, state, tag) {
    if (state === 'rest') return;
    const right = await page.evaluate(() => window.HourRoadCore.rightPlace(window.HourRoadActivity.st)), wrong = [0, 1, 2].filter(i => i !== right);
    if (state === 'miss2') { for (const i of wrong) { await click(page, K('card-' + i), tag); await check(page, tag); } return; }
    await click(page, K('card-' + right), tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.HourRoadActivity, D = a._dims();
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.hr-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.hr-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.hr-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.hr-wrap').getBoundingClientRect(), floor = W.width >= 560 ? 96 : 64;
    /* a numeral's DIGITS (an SVG text box includes the font's whole line height, ~1.5× the digits — that box would report
       touches that are not there): the box's width, and 0.38 em above and below its centre */
    const glyph = (n) => { const b = n.getBoundingClientRect(), fs = parseFloat(n.getAttribute('font-size')), my = b.top + b.height / 2; return { left: b.left, right: b.right, top: my - 0.38 * fs, bottom: my + 0.38 * fs, cx: b.left + b.width / 2, cy: my, w: b.width, fs: fs }; };
    document.querySelectorAll('.hr-stage,.hr-cards,.hr-card,.hr-check,.hr-rooster').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.hr-stage', '.hr-cards', '.hr-foot', '.hr-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    /* Sprocket: full size, his ink clear of every numeral */
    const ro = document.querySelector('.hr-rooster');
    if (!ro) out.fails.push('Sprocket is missing'); else {
      const q = ro.getBoundingClientRect(); if (q.height < floor - 0.5) out.fails.push('Sprocket only ' + Math.round(q.height) + ' px');
      const ink = { l: q.left + q.width * 0.13, r: q.left + q.width * 0.89, t: q.top + q.height * 0.03, b: q.bottom };
      document.querySelectorAll('.hr-num').forEach(n => { const b = glyph(n); if (b.left < ink.r && b.right > ink.l && b.top < ink.b && b.bottom > ink.t) out.fails.push('Sprocket covers the ' + n.textContent); });
      const S = document.querySelector('.hr-stage').getBoundingClientRect(); if (q.top < S.top - 1 || q.right > S.right + 1) out.fails.push('Sprocket outside the stage');
    }
    /* no hand ever covers a numeral (the long hand points AT a number; it must stay readable) */
    document.querySelectorAll('.hr-num').forEach(n => {
      /* point-to-box distance from the digits to (a) the long hand's tip on this numeral's ray, (b) the inner ends of the
         tick marks on and beside its ray — those are the only things that can touch it */
      const g = glyph(n), svg = document.querySelector('.hr-svg').getBoundingClientRect(), a0 = Math.atan2(g.cx - svg.left - D.cx, D.cy - (g.cy - svg.top));
      const at = (r, a) => ({ x: svg.left + D.cx + r * Math.sin(a), y: svg.top + D.cy - r * Math.cos(a) });
      const dist = (p) => Math.hypot(Math.max(g.left - p.x, 0, p.x - g.right), Math.max(g.top - p.y, 0, p.y - g.bottom));
      if (dist(at(D.longR, a0)) < 3) out.fails.push('a hand reaches the ' + n.textContent);
      const rim = (D.wide ? 6 : 4.5) / 2, near = [[0, D.tickL], [Math.PI / 30, 5], [-Math.PI / 30, 5]];
      if (near.some(([da, L]) => dist(at(D.rD - rim - L, a0 + da)) < 3)) out.fails.push('the ' + n.textContent + ' touches the tick marks'); });
    /* the card digits */
    document.querySelectorAll('.hr-card').forEach(c => { const fs = parseFloat(getComputedStyle(c).fontSize); if (fs < 24) out.fails.push('card digits ' + fs + ' px'); });
    /* the drawn road and dial inside the stage */
    const S2 = document.querySelector('.hr-stage').getBoundingClientRect();
    document.querySelectorAll('.hr-svg circle, .hr-svg text, .hr-svg polyline').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && (b.left < S2.left - 2 || b.right > S2.right + 2 || b.top < S2.top - 2 || b.bottom > S2.bottom + 2)) out.fails.push('a drawn ' + e.tagName + ' outside the stage'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const times of FACES) for (const id of C.ids(times)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${times} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, times, 'shown', id);
      await reach(page, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2 && s0.glow, `${t0}: two misses by real taps, the marker on the tip (${s0.misses})`);
      if (state === 'solved') is(s0.done && s0.s === 0 && s0.mk === C.roadPos(C.round(id).target), `${t0}: solved by real taps, the marker on its road spot`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${times} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.hr-wrap'), W = Math.floor(e.getBoundingClientRect().width); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 300); }, { timeout: 3000 }).catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.hr-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (state === 'miss2') { const g = await page.evaluate(GEOM); is(g.mk && Math.hypot(g.mk.x - g.tip.x, g.mk.y - g.tip.y) < 1.5, `${tag}: the marker still on the tip after the resize`); }
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^(R1|R4|R10|H5)$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${times}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-hour-road: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
