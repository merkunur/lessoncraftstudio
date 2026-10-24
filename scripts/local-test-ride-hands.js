#!/usr/bin/env node
/* =====================================================================
   local-test-ride-hands.js — ACTIVITY #102, The Digits That Ride the
   Hands, in a real browser with real pointer and key actions (never a
   model call to choose a card or check), 11 locales.
   Scenarios per locale (at 1024, the cards in a fixed order):
     · H1 (3:00): an empty Check → hintNone and both hands glow, no miss;
       tap 12:00 → Check → its 12 rode the short hand and rests on it short
       of the 3 (clear of every numeral), the 3 lights, its 00 merged;
       hintHourC; tap 4:00 → Check → miss 2 (hintWatch), both hands glow,
       the 3 and the 00 collar light; tap 3:00 → Check → the celebration,
       the docked display 3:00, the right card glows; the long hand is now
       a button: a real click → an hour passes, the clock and the display
       read 4:00 and the line names 4:00; Enter on it → 5:00;
     · M3 (2:30, half past): tap 2:00 → its 00 rests beside the 30 collar,
       which lights; hintMinC; the hour merged;
     · Hand colours off (M3): tap 3:30 → hintHour (no colour word), both
       hands drawn in ink;
     · the keyboard: Enter on a card, Enter on Check.
   Then every round of both levels at rest, at miss 2 and solved — reached
   ONCE per locale by real taps, then resized through 320…1366: no
   sideways scroll, Check above the fold at rest, Check and the hint in
   view at miss 2, the success line in view, controls ≥ 44 px, nothing
   outside the card, the bands never overlap, Sprocket ≥ 64 / 96 px and
   clear of every numeral, no hand or tick touching a numeral, no resting
   digit chip on a numeral, the hands DRAWN at the model's angles
   (± 0.5°), card digits ≥ 24 px.
   Usage: node scripts/local-test-ride-hands.js [--widths=…] [--locales=…] [--faces=…] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,600,640,704,768,1024,1366').split(',').map(Number);
const FACES = arg('faces', 'hour,both').split(',');
const SHOTS = process.argv.includes('--shots');
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), PUB = path.join(REPO, 'frontend', 'public');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '102-ride-hands', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'ride-hands-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, RideHandsCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'ride-hands-activity.js'), 'utf8') + '\n;this.__A = RideHandsActivity;', ctx); return ctx.__A; })();
const T = (loc, k, a) => { let s = ACT.strings[k][loc]; a = Object.assign({ name: ACT.strings.name[loc] }, a || {}); return s.replace(/\{(\w+)\}/g, (m, x) => (x in a ? a[x] : m)); };
const OKT = (loc, t) => { const f = Object.create(ACT); f.api = { lang: loc, t: (k) => ACT.strings[k][loc] }; return f._t('okTime', { d: f._digital(t), p: f._phrase(t) }); };
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
    await page.goto(`${base}/ride-hands-activity.html?activity=clock-digital.read-hour.1-md-b-3&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RideHandsActivity && window.RideHandsActivity.st && document.querySelector('.rh-wrap') && window.RideHandsActivity._pics.farm && document.querySelector('.rh-rooster'), { timeout: 10000 });
    await page.evaluate(() => { const a = window.RideHandsActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, times, colours, id, order) {
    await page.evaluate((times, colours, id, order) => { const a = window.RideHandsActivity; a.api.settings.times = times; a.api.settings.colours = colours; a._pool = null; a._ensurePool(); a._start(id, 0); if (order) a.st.order = order; a._render2(); window.scrollTo(0, 0); }, times, colours, id, order || null);
    await page.waitForFunction(() => document.querySelector('.rh-rooster'), { timeout: 4000 }).catch(() => {});
    await wait(15);
  }
  const st = (page) => page.evaluate(() => { const s = window.RideHandsActivity.st, v = window.RideHandsActivity._view; return { chosen: s.chosen, misses: s.misses, show: s.show, done: s.done, order: s.order.slice(), disp: v.disp.h + ':' + v.disp.m, base: v.base ? v.base.h + ':' + v.base.m : null, free: !!v.free, gs: !!v.glowShort, gl: !!v.glowLong, litNum: v.litNum, litCollar: v.litCollar, chips: v.chips.filter(c => !c.gone).map(c => c.part + c.text).join(',') }; });
  const note = (page) => page.evaluate(() => document.querySelector('.rh-note').textContent);
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
  /* the hands as DRAWN: angles from the rendered line ends; the chips' and numerals' boxes */
  const DRAWN = () => { const a = window.RideHandsActivity, D = a._dims(), ang = (sel) => { const l = document.querySelector(sel); const x = +l.getAttribute('x2') - D.cx, y = D.cy - +l.getAttribute('y2'); return ((Math.atan2(x, y) * 180 / Math.PI) + 360) % 360; };
    const stroke = (sel) => document.querySelector(sel).getAttribute('stroke');
    return { short: ang('.rh-short'), long: ang('.rh-long'), sStroke: stroke('.rh-short'), lStroke: stroke('.rh-long') }; };
  const dAng = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); };

  for (const loc of LOCS) {
    const { page, errs } = await open(1024, loc);
    let tag = `${loc} H1`, s;
    await force(page, 'hour', 'on', 'H1', [0, 1, 2]);   /* 3:00 · 12:00 · 4:00 */
    await check(page, tag); s = await st(page);
    is(sp(await note(page)) === sp(T(loc, 'hintNone')) && s.misses === 0 && s.gs && s.gl, `${tag}: an empty Check → hintNone, both hands glow, no miss`);
    await click(page, K('card-1'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.chips === 'h12' && s.litNum === 3 && s.gs && !s.gl && sp(await note(page)) === sp(T(loc, 'hintHourC')), `${tag}: 12:00 → its 12 rode the short hand and does not fit; the 3 lights; its 00 merged; hintHourC (${s.chips})`);
    is(await page.evaluate(() => { const c = document.querySelector('.rh-chip.is-h'), n = [...document.querySelectorAll('.rh-num')].find(x => x.textContent === '3'); if (!c || !n) return false; const a = c.getBoundingClientRect(), b = n.getBoundingClientRect(), fs = parseFloat(n.getAttribute('font-size')), my = b.top + b.height / 2; return a.right < b.left || a.left > b.right || a.bottom < my - 0.38 * fs || a.top > my + 0.38 * fs; }) === true, `${tag}: the resting 12 does not cover the 3`);
    await click(page, K('card-2'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 2 && s.gs && s.gl && s.litNum === 3 && s.litCollar === 0 && sp(await note(page)) === sp(T(loc, 'hintWatch')), `${tag}: 4:00 → miss 2, both hands glow, the 3 and the 00 collar light, hintWatch`);
    await click(page, K('card-0'), tag); await check(page, tag); s = await st(page);
    is(s.done && s.base === '3:0' && s.chips === '' && sp(await note(page)) === sp(OKT(loc, { h: 3, m: 0 })) && await count(page, '.rh-card.is-right') === 1, `${tag}: 3:00 → both parts merge, the display reads 3:00, «${sp(await note(page))}»`);
    await click(page, K('long'), tag); s = await st(page);
    is(s.disp === '4:0' && s.base === '4:0' && sp(await note(page)) === sp(OKT(loc, { h: 4, m: 0 })), `${tag}: a click on the long hand → an hour passes: 4:00 on the clock, the display and the line`);
    const d1 = await page.evaluate(DRAWN); is(dAng(d1.short, 120) < 0.5 && dAng(d1.long, 0) < 0.5, `${tag}: drawn 4:00 (${d1.short.toFixed(1)}°, ${d1.long.toFixed(1)}°)`);
    await page.focus(K('long')); await page.keyboard.press('Enter'); await wait(10); s = await st(page);
    is(s.disp === '5:0', `${tag}: Enter on the long hand → 5:00`);
    /* ---- M3: the minutes ---- */
    tag = `${loc} M3`;
    await force(page, 'both', 'on', 'M3', [0, 1, 2]);   /* 2:30 · 2:00 · 3:30 */
    is(await count(page, '.rh-collar') === 2, `${tag}: the 00 and the 30 collars`);
    const d2 = await page.evaluate(DRAWN); is(dAng(d2.short, 75) < 0.5 && dAng(d2.long, 180) < 0.5, `${tag}: drawn 2:30 — the short hand half way (${d2.short.toFixed(1)}°)`);
    await click(page, K('card-1'), tag); await check(page, tag); s = await st(page);
    is(s.misses === 1 && s.chips === 'm00' && s.litCollar === 30 && s.gl && sp(await note(page)) === sp(T(loc, 'hintMinC')), `${tag}: 2:00 → its 00 rests beside the 30, which lights; the 2 merged; hintMinC (${s.chips})`);
    for (const w of [1024, 360, 320]) { await page.setViewport({ width: w, height: VH(w) }); await wait(60);
      is(await page.evaluate(() => { const c = document.querySelector('.rh-chip').getBoundingClientRect(), b = document.querySelector('.rh-baseface').getBoundingClientRect(), n = [...document.querySelectorAll('.rh-collar')].map(e => e.getBoundingClientRect()); return c.bottom <= b.top && n.every(q => c.right <= q.left || c.left >= q.right); }), `${tag} @${w}: the resting 00 sits beside the 30 label, clear of the display`); }
    await page.setViewport({ width: 1024, height: VH(1024) }); await wait(60);
    /* ---- the colours off ---- */
    tag = `${loc} M3 colours off`;
    await force(page, 'both', 'off', 'M3', [0, 1, 2]);
    const d3 = await page.evaluate(DRAWN); is(d3.sStroke === d3.lStroke && d3.sStroke === '#3A2E1F', `${tag}: both hands in ink`);
    await click(page, K('card-2'), tag); await check(page, tag);
    is(sp(await note(page)) === sp(T(loc, 'hintHourHalf')), `${tag}: 3:30 → hintHourHalf (the short hand is between two numbers), no colour word`);
    /* ---- the keyboard ---- */
    tag = `${loc} keys`;
    await force(page, 'hour', 'on', 'H6', [1, 0, 2]);   /* 11:00 · 5:00 · 6:00 */
    await page.focus(K('card-1')); await page.keyboard.press('Enter'); await wait(10);
    s = await st(page); is(s.chosen === 1, `${tag}: Enter on a card chooses it`);
    await page.focus(K('check')); await page.keyboard.press('Enter'); await wait(10); s = await st(page);
    is(s.done, `${tag}: Enter on Check checks (5:00 right)`);
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }

  /* ---- every round at rest, at miss 2 and solved — reached ONCE per locale by real taps, then resized ---- */
  async function reach(page, state, tag) {
    if (state === 'rest') return;
    const right = await page.evaluate(() => window.RideHandsCore.rightPlace(window.RideHandsActivity.st)), wrong = [0, 1, 2].filter(i => i !== right);
    if (state === 'miss2') { for (const i of wrong) { await click(page, K('card-' + i), tag); await check(page, tag); } return; }
    await click(page, K('card-' + right), tag); await check(page, tag);
  }
  const MEASURE = () => {
    const out = { fails: [] }, a = window.RideHandsActivity, C = window.RideHandsCore, D = a._dims();
    const vis = (e) => { const q = e.getBoundingClientRect(), cs = getComputedStyle(e); return q.width > 2 && q.height > 2 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    out.sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    [...document.querySelectorAll('.rh-wrap button')].filter(vis).filter(e => !e.disabled).forEach(e => { const q = e.getBoundingClientRect(); if (q.width < 43.5 || q.height < 43.5) out.fails.push('small control ' + e.className + ' ' + Math.round(q.width) + 'x' + Math.round(q.height)); });
    const ck = document.querySelector('.rh-check'); out.cTop = ck.getBoundingClientRect().top; out.cBottom = ck.getBoundingClientRect().bottom;
    const nr = document.querySelector('.rh-note').getBoundingClientRect(); out.nTop = nr.top; out.nBottom = nr.bottom;
    const W = document.querySelector('.rh-wrap').getBoundingClientRect(), floor = W.width >= 560 ? 96 : 64;
    /* a numeral's DIGITS: the text box's width, and 0.38 em above and below its centre (the box itself includes the line height) */
    const glyph = (n) => { const b = n.getBoundingClientRect(), fs = parseFloat(n.getAttribute('font-size')), my = b.top + b.height / 2; return { left: b.left, right: b.right, top: my - 0.38 * fs, bottom: my + 0.38 * fs, cx: b.left + b.width / 2, cy: my, w: b.width, fs: fs }; };
    const hit = (a1, b1) => a1.left < b1.right && a1.right > b1.left && a1.top < b1.bottom && a1.bottom > b1.top;
    document.querySelectorAll('.rh-stage,.rh-cards,.rh-card,.rh-check,.rh-rooster,.rh-chip').forEach(e => { if (!vis(e)) return; const q = e.getBoundingClientRect(); if (q.left < W.left - 1 || q.right > W.right + 1) out.fails.push(e.className.split(' ')[0] + ' outside the card'); });
    const band = ['.rh-stage', '.rh-cards', '.rh-foot', '.rh-note'].map(s => document.querySelector(s)).filter(e => e && vis(e)).map(e => e.getBoundingClientRect());
    for (let i = 1; i < band.length; i++) if (band[i].top < band[i - 1].bottom - 1) out.fails.push('two bands overlap');
    const nums = [...document.querySelectorAll('.rh-num')];
    const ro = document.querySelector('.rh-rooster');
    if (!ro) out.fails.push('Sprocket is missing'); else {
      const q = ro.getBoundingClientRect(); if (q.height < floor - 0.5) out.fails.push('Sprocket only ' + Math.round(q.height) + ' px');
      const ink = { left: q.left + q.width * 0.13, right: q.left + q.width * 0.89, top: q.top + q.height * 0.03, bottom: q.bottom };
      nums.forEach(n => { if (hit(glyph(n), ink)) out.fails.push('Sprocket covers the ' + n.textContent); });
      const S = document.querySelector('.rh-stage').getBoundingClientRect(); if (q.top < S.top - 1 || q.right > S.right + 1) out.fails.push('Sprocket outside the stage');
    }
    /* no hand, tick or resting digit on a numeral */
    const svg = document.querySelector('.rh-svg').getBoundingClientRect();
    nums.forEach(n => {
      const g = glyph(n), a0 = Math.atan2(g.cx - svg.left - D.cx, D.cy - (g.cy - svg.top));
      const at = (r, an) => ({ x: svg.left + D.cx + r * Math.sin(an), y: svg.top + D.cy - r * Math.cos(an) });
      const dist = (p) => Math.hypot(Math.max(g.left - p.x, 0, p.x - g.right), Math.max(g.top - p.y, 0, p.y - g.bottom));
      if (dist(at(D.longR, a0)) < 3) out.fails.push('a hand reaches the ' + n.textContent);
      const rim = (D.wide ? 6 : 4.5) / 2, near = [[0, D.tickL], [Math.PI / 30, 5], [-Math.PI / 30, 5]];
      if (near.some(([da, L]) => dist(at(D.rD - rim - L, a0 + da)) < 3)) out.fails.push('the ' + n.textContent + ' touches the tick marks');
      document.querySelectorAll('.rh-chip').forEach(c => { if (hit(c.getBoundingClientRect(), g)) out.fails.push('a resting ' + c.textContent + ' covers the ' + n.textContent); });
    });
    /* no resting part on the display under the clock or on Sprocket */
    const baseBox = document.querySelector('.rh-baseface').getBoundingClientRect(), roBox = ro && ro.getBoundingClientRect();
    document.querySelectorAll('.rh-chip').forEach(c => { const q = c.getBoundingClientRect(); if (hit(q, baseBox)) out.fails.push('a resting ' + c.textContent + ' on the display'); if (roBox && hit(q, { left: roBox.left + roBox.width * 0.13, right: roBox.left + roBox.width * 0.89, top: roBox.top + roBox.height * 0.03, bottom: roBox.bottom })) out.fails.push('a resting ' + c.textContent + ' on Sprocket'); });
    /* the hands DRAWN at the model's angles */
    const ang = (sel) => { const l = document.querySelector(sel); const x = +l.getAttribute('x2') - D.cx, y = D.cy - +l.getAttribute('y2'); return ((Math.atan2(x, y) * 180 / Math.PI) + 360) % 360; };
    const want = C.handAngles(a._view.disp), dA = (p, q) => { const d = Math.abs(p - q) % 360; return Math.min(d, 360 - d); };
    if (dA(ang('.rh-short'), want.short) > 0.5 || dA(ang('.rh-long'), want.long) > 0.5) out.fails.push('a hand drawn off its angle');
    document.querySelectorAll('.rh-card').forEach(c => { const fs = parseFloat(getComputedStyle(c).fontSize); if (fs < 24) out.fails.push('card digits ' + fs + ' px'); });
    const S2 = document.querySelector('.rh-stage').getBoundingClientRect();
    document.querySelectorAll('.rh-svg circle, .rh-svg text, .rh-svg rect').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && (b.left < S2.left - 2 || b.right > S2.right + 2 || b.top < S2.top - 2 || b.bottom > S2.bottom + 2)) out.fails.push('a drawn ' + e.tagName + ' outside the stage'); });
    return out;
  };
  for (const loc of LOCS) {
    const { page, errs } = await open(WIDTHS[WIDTHS.length - 1], loc);
    for (const times of FACES) for (const id of C.ids(times)) for (const state of ['rest', 'miss2', 'solved']) {
      const w0 = WIDTHS[WIDTHS.length - 1], t0 = `${loc} ${times} ${id} ${state}`;
      await page.setViewport({ width: w0, height: VH(w0) });
      await force(page, times, 'on', id);
      await reach(page, state, t0);
      const s0 = await st(page);
      if (state === 'miss2') is(s0.misses === 2 && s0.show === 2 && s0.gs && s0.gl, `${t0}: two misses by real taps, both hands glow`);
      if (state === 'solved') is(s0.done && s0.chips === '' && s0.free, `${t0}: solved by real taps, both parts merged`);
      for (const w of WIDTHS) {
        const tag = `${loc} @${w} ${times} ${id} ${state}`;
        await page.setViewport({ width: w, height: VH(w) });
        await page.waitForFunction(() => { const e = document.querySelector('.rh-wrap'), W = Math.floor(e.getBoundingClientRect().width); const sv = document.querySelector('.rh-svg'); return e.classList.contains(W >= 560 ? 'is-wide' : 'is-narrow') && e.classList.contains('is-tiny') === (W < 300) && sv && Math.abs(+sv.getAttribute('width') - Math.min(W, 660)) < 1.5; }, { timeout: 3000 })   /* the clock REDRAWN for this width (two wide widths share a class) */.catch(() => is(false, `${tag}: the activity repainted for the new width`));
        await wait(20);
        const s1 = await st(page);
        is(JSON.stringify(s1) === JSON.stringify(s0), `${tag}: the resize kept the state`);
        if (state === 'rest') await page.evaluate(() => window.scrollTo(0, 0));
        else await page.evaluate(() => document.querySelector('.rh-note').scrollIntoView({ block: 'end', behavior: 'instant' }));
        await wait(15);
        const m = await page.evaluate(MEASURE);
        is(m.sw <= 2, `${tag}: no sideways scroll (${m.sw})`);
        if (state === 'rest') is(m.cBottom <= VH(w), `${tag}: Check above the fold (${Math.round(m.cBottom)} ≤ ${VH(w)})`);
        else if (state === 'miss2') is(m.cTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: Check and the hint in view together (${Math.round(m.cTop)}–${Math.round(m.nBottom)})`);
        else is(m.nTop >= 0 && m.nBottom <= VH(w) + 1, `${tag}: the success line in view`);
        is(m.fails.length === 0, `${tag}: ${[...new Set(m.fails)].slice(0, 3).join('; ')}`);
        if (SHOTS && loc === 'en' && [360, 704, 1024].indexOf(w) >= 0 && /^(H1|H10|M3|M5)$/.test(id)) await page.screenshot({ path: path.join(SHOT_DIR, `${times}-${id}-${w}-${state}.png`), fullPage: true });
      }
    }
    is(errs.length === 0, `${loc}: no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-ride-hands: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
