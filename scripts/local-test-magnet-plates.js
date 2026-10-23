#!/usr/bin/env node
/* =====================================================================
   local-test-magnet-plates.js — ACTIVITY #77, The Magnet Plates
   (Sunny-Side Diner, L.K.1.f), in a real browser with REAL pointer clicks
   (never a model call to make a move). For every locale:
     · a whole round of each level is played by hand — the tray (an empty
       Check is a hint; a wrong tray blinks the ticket line), the magnets (a
       tapped plate springs away; an "and" on an open end slides back), the
       hatch (shut without the end cap, rattling), miss 2 (the "and" lifts
       and its gap glows), the robot's rail (the counter opens when a plate
       goes back), "one more thing" (the first "and" turns into a comma; en
       ", and"), and the success line names the sentence the rail built;
     · every round at rest at 320–1366: Check above the fold, no sideways
       scroll, every control ≥ 44 px, every library picture ≥ 96 (desktop) /
       64 (phone), no two rail or booth pieces overlapping, no phrase clipped.
   Usage: node scripts/local-test-magnet-plates.js [--widths=…] [--locales=…] [--quick] [--shots]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const LOCS = arg('locales', 'en,de,nl,da,sv,no,es,it,pt,fr,fi').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOTS = process.argv.includes('--shots'), QUICK = process.argv.includes('--quick');
const ID = 'sunny-side-diner.compound-order.l-k-1-f';
const REPO = path.join(__dirname, '..'), MINI = path.join(REPO, 'mini tools'), LIB = path.join(REPO, 'image-library-webp');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'activities-rebuild', '077-magnet-plates', 'local');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'magnet-plates-core.js'));
const ACT = (function () { const vm = require('vm'); const ctx = { window: {}, MagnetPlatesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'magnet-plates-activity.js'), 'utf8') + '\n;this.__A = MagnetPlatesActivity;', ctx); return ctx.__A; })();
const T = (loc, k) => ACT.strings[k][loc];
const sp = (s) => String(s).replace(/[  ]/g, ' ');
const fill = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, x) => x in a ? a[x] : m);
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/image-library-webp/') ? path.join(LIB, p.slice('/image-library-webp/'.length)) : path.join(MINI, p.replace(/^\/(mini-tools\/)?/, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const browser = await require('puppeteer').launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOTS) fs.mkdirSync(SHOT_DIR, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  const VH = (w) => w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900;
  async function open(w, loc) {
    const page = await browser.newPage(), errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/|fonts\.g/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: VH(w) });
    await page.goto(`${base}/magnet-plates-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.MagnetPlatesActivity && window.MagnetPlatesActivity.st && document.querySelector('.mp-wrap'), { timeout: 8000 });
    await page.evaluate(() => { const a = window.MagnetPlatesActivity; a.FAST = true; a.OK_MS = 600000; });
    return { page, errs };
  }
  async function force(page, level, idx) {
    await page.evaluate((level, idx) => { const a = window.MagnetPlatesActivity; a.api.settings.level = level; a.api.settings.order = 'show'; a._pool = null; a._ensurePool(); a._start(idx); a._render2(); }, level, idx);
    await page.waitForFunction(() => [...document.querySelectorAll('.mp-wrap img')].length >= 3 && [...document.querySelectorAll('.mp-wrap img')].every(i => i.complete && i.naturalWidth > 0), { timeout: 8000 }).catch(() => {});
  }
  const st = (page) => page.evaluate(() => { const s = window.MagnetPlatesActivity.st; return { phase: s.phase, done: s.done, misses: s.misses, last: s.last && s.last.reason, lift: s.lift, plates: s.plates.length, joints: s.joints.slice(), end: s.end, help: s.help }; });
  const note = (page) => page.evaluate(() => document.querySelector('.mp-note').textContent);
  const has = (page, sel) => page.evaluate((s) => !!document.querySelector(s), sel);
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  /* a REAL click: scroll the control into view, press the mouse at its centre — and say so loudly if it is not there */
  async function click(page, sel, tag) {
    const b = await page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; e.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, dis: !!e.disabled }; }, sel);
    if (!b) { is(false, `${tag}: there is a «${sel}» to click`); return false; }
    if (b.dis) { is(false, `${tag}: «${sel}» is enabled`); return false; }
    await page.mouse.click(b.x, b.y); await wait(40); return true;
  }

  /* ---------------- the hand, one level at a time ---------------- */
  async function playL1(page, loc, idx, tag) {
    const r = C.round('l1', idx), W = C.words(loc);
    await click(page, '.mp-check', tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmptyTray')), `${tag}: an empty tray is a hint, no miss`);
    const other = r.bins.find(f => !r.ticket.some(p => p.food === f));
    await click(page, `.mp-bin[data-food="${other}"]`, tag);
    is(await page.evaluate((f) => document.querySelector(`.mp-group[data-k="tray-${f}"]`).getAttribute('data-n') === '1', other), `${tag}: a tapped bin puts one on the tray`);
    await click(page, '.mp-check', tag); s = await st(page);
    is(s.misses === 1 && s.last === 'tray' && sp(await note(page)) === sp(T(loc, 'hTray')), `${tag}: a wrong tray is a miss — «${T(loc, 'hTray')}»`);
    is(await has(page, '.mp-tline.is-blink') && await has(page, `.mp-group.is-blink[data-k="tray-${other}"]`), `${tag}: the ticket line and the wrong tray group blink`);
    await click(page, `.mp-group[data-k="tray-${other}"]`, tag);
    is(!(await has(page, `.mp-group[data-k="tray-${other}"]`)), `${tag}: a tapped tray group goes back to its bin`);
    for (const p of r.ticket) for (let k = 0; k < p.qty; k++) await click(page, `.mp-bin[data-food="${p.food}"]`, tag);
    await click(page, '.mp-check', tag); s = await st(page);
    is(s.phase === 'rail' && s.plates === 2 && s.joints.join() === '', `${tag}: the right tray turns into two plates on the rail`);
    is(sp(await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text') ? document.querySelector('.lcs-activity-prompt-text').textContent : '')) === sp(T(loc, 'tJoin')), `${tag}: the task line becomes «${T(loc, 'tJoin')}»`);
    is(await has(page, '.mp-booth .mp-hook .mp-and') && sp(await text(page, '.mp-start')) === sp(W.start), `${tag}: the "and" hangs on the hook; the rail begins «${W.start}»`);
    await click(page, '.mp-check', tag); s = await st(page);
    is(s.misses === 1 && sp(await note(page)) === sp(T(loc, 'hEmptyRail')), `${tag}: Check on the untouched rail is a hint`);
    await click(page, '[data-k="plate-0"]', tag);
    is(await has(page, '[data-k="plate-0"].is-repel') && await has(page, '[data-k="plate-1"].is-pushed') && sp(await note(page)) === sp(T(loc, 'fRepel')), `${tag}: a tapped plate springs away from its neighbour`);
    await click(page, '[data-k="hook-and-0"]', tag);
    is((await st(page)).lift === 'and' && await has(page, '[data-k="hook-and-0"].is-lift') && await has(page, '.mp-open') && await has(page, '.mp-gap.is-target'), `${tag}: the lifted "and" shows where it can go`);
    await click(page, '[data-k="dock"]', tag); s = await st(page);
    is(s.lift === null && s.joints[0] === null && await has(page, '[data-k="hook-and-0"]') && sp(await note(page)) === sp(T(loc, 'fOneSide')), `${tag}: an "and" after the last plate slides back to its hook`);
    await click(page, '[data-k="hook-and-0"]', tag); await click(page, '[data-k="gap-0"]', tag); s = await st(page);
    is(s.joints[0] === 'and' && sp(await text(page, '[data-k="joint-0"]')) === sp(W.and) && !(await has(page, '.mp-hook .mp-and')), `${tag}: the "and" in the gap joins the plates («${W.and}»)`);
    await click(page, '.mp-check', tag); s = await st(page);
    is(s.misses === 2 && s.last === 'end' && await has(page, '.mp-hatch.is-rattle') && await has(page, '[data-k="dock"].is-glow') && sp(await note(page)) === sp(T(loc, 'hEnd')), `${tag}: no end cap — the hatch rattles, the dock glows`);
    is(s.lift === null && !(await has(page, '[data-k="hook-end"].is-lift')), `${tag}: on miss 1 the end cap still hangs on its hook`);
    await click(page, '.mp-check', tag); s = await st(page);
    is(s.misses === 3 && s.lift === 'end' && await has(page, '[data-k="hook-end"].is-help') && sp(await note(page)) === sp(T(loc, 'hMiss2')), `${tag}: miss 2 lifts the end cap off its hook`);
    await click(page, '[data-k="dock"]', tag); s = await st(page);
    is(s.end && await has(page, '[data-k="dock"].mp-endcap.is-in'), `${tag}: the end cap docks at the end`);
    await click(page, '.mp-check', tag); s = await st(page);
    const want = C.say(loc, r.ticket);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okTwo'), { s: want })), `${tag}: the hatch opens — «${await note(page)}»`);
    is(sp((await text(page, '.mp-said')).trim()) === sp(want) && await has(page, '.mp-hatch.is-open') && await has(page, '.mp-cust.is-bob'), `${tag}: the sentence goes through the hatch, the customer bobs`);
  }
  async function playL2(page, loc, idx, tag) {
    const r = C.round('l2', idx);
    await click(page, '.mp-check', tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmptyRail')), `${tag}: Check on the untouched rail is a hint`);
    await click(page, '[data-k="gap-0"]', tag);
    is(await has(page, '[data-k="plate-0"].is-repel'), `${tag}: tapping the gap pushes the plates — they spring apart`);
    await click(page, '[data-k="hook-and-0"]', tag); await click(page, '.mp-open', tag); s = await st(page);
    is(s.joints[0] === null && sp(await note(page)) === sp(T(loc, 'fOneSide')), `${tag}: an "and" before the first plate slides back`);
    if (!r.endDocked) { await click(page, '[data-k="hook-end"]', tag); await click(page, '[data-k="dock"]', tag); }
    else { await click(page, '[data-k="dock"]', tag); await click(page, '[data-k="hook-end"]', tag); await click(page, '[data-k="dock"]', tag); }
    await click(page, '.mp-check', tag); s = await st(page);
    is(s.misses === 1 && s.last === 'gap' && await has(page, '[data-k="gap-0"].is-glow') && sp(await note(page)) === sp(T(loc, 'hGap')), `${tag}: no "and" — the gap glows`);
    await click(page, '.mp-check', tag); s = await st(page);
    is(s.misses === 2 && s.lift === 'and' && await has(page, '[data-k="hook-and-0"].is-help') && sp(await note(page)) === sp(T(loc, 'hMiss2')), `${tag}: miss 2 — the "and" lifts and waits over its gap`);
    await click(page, '[data-k="gap-0"]', tag); await click(page, '.mp-check', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okTwo'), { s: C.say(loc, r.ticket) })), `${tag}: done — «${C.say(loc, r.ticket)}»`);
  }
  async function playL3(page, loc, idx, tag) {
    const r = C.round('l3', idx);
    is(!(await has(page, '.mp-counter')) && !(await has(page, '.mp-hook')), `${tag}: at rest the robot's rail is whole — no hook, the counter shut`);
    await click(page, '.mp-check', tag); let s = await st(page);
    is(s.misses === 0 && sp(await note(page)) === sp(T(loc, 'hEmptyRepair')), `${tag}: Check on the robot's untouched rail is a hint`);
    await click(page, `[data-k="plate-${r.slot}"]`, tag);
    is(await has(page, `[data-k="hole-${r.slot}"]`) && await page.evaluate(() => document.querySelectorAll('.mp-counter .mp-plate').length) === 3, `${tag}: the robot's plate goes back and the counter opens (3 plates)`);
    const wrongK = await page.evaluate((f, q) => [...document.querySelectorAll('.mp-counter .mp-plate')].findIndex(b => !(b.getAttribute('data-food') === f && b.getAttribute('data-qty') === String(q))), r.ticket[r.slot].food, r.ticket[r.slot].qty);
    await click(page, `[data-k="spare-${wrongK}"]`, tag); await click(page, '.mp-check', tag); s = await st(page);
    is(s.misses === 1 && s.last === 'wrongPlate' && await has(page, `[data-k="plate-${r.slot}"].is-bad`), `${tag}: a wrong plate keeps the hatch shut (amber outline)`);
    await click(page, `[data-k="plate-${r.slot}"]`, tag);
    const rightK = await page.evaluate((f, q) => [...document.querySelectorAll('.mp-counter .mp-plate')].findIndex(b => b.getAttribute('data-food') === f && b.getAttribute('data-qty') === String(q)), r.ticket[r.slot].food, r.ticket[r.slot].qty);
    await click(page, `[data-k="spare-${rightK}"]`, tag); await click(page, '.mp-check', tag); s = await st(page);
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okTwo'), { s: C.say(loc, r.ticket) })), `${tag}: fixed — «${C.say(loc, r.ticket)}»`);
  }
  async function playL4(page, loc, idx, tag) {
    const r = C.round('l4', idx), W = C.words(loc);
    for (const p of r.ticket) for (let k = 0; k < p.qty; k++) await click(page, `.mp-bin[data-food="${p.food}"]`, tag);
    await click(page, '.mp-check', tag);
    await click(page, '[data-k="hook-and-0"]', tag); await click(page, '[data-k="gap-0"]', tag);
    await click(page, '[data-k="hook-end"]', tag); await click(page, '[data-k="dock"]', tag);
    await click(page, '.mp-check', tag); let s = await st(page);
    is(!s.done && s.plates === 3 && !s.end && s.joints.join() === 'and,' && sp(await note(page)) === sp(T(loc, 'tMore')), `${tag}: "one more thing" — a third plate, the end cap back on its hook`);
    is(await page.evaluate(() => document.querySelectorAll('.mp-tline').length) === 3, `${tag}: the ticket shows the third thing`);
    is(sp(await text(page, '[data-k="joint-0"]')) === sp(W.and), `${tag}: with one gap still open, the first coupler still reads «${W.and}»`);
    await click(page, '[data-k="hook-and-0"]', tag); await click(page, '[data-k="gap-1"]', tag);
    const last = W.serial ? ', ' + W.and : W.and;
    is(sp(await text(page, '[data-k="joint-0"]')) === ',' && await has(page, '[data-k="joint-0"].is-comma') && sp(await text(page, '[data-k="joint-1"]')) === sp(last), `${tag}: the first "and" turns into a comma, the last reads «${last}»`);
    await click(page, '[data-k="hook-end"]', tag); await click(page, '[data-k="dock"]', tag); await click(page, '.mp-check', tag); s = await st(page);
    const want = C.say(loc, r.ticket.concat([r.extra]));
    is(s.done && sp(await note(page)) === sp(fill(T(loc, 'okThree'), { s: want })), `${tag}: three things in one sentence — «${want}»`);
  }

  /* ---------------- the measured layout of a round at rest ---------------- */
  async function measure(page, w, tag, atRest) {
    const m = await page.evaluate((w) => {
      const de = document.documentElement, ctl = [...document.querySelectorAll('.mp-wrap button')].filter(b => b.offsetParent);
      const imgs = [...document.querySelectorAll('.mp-wrap img')].filter(i => i.offsetParent).map(i => { const r = i.getBoundingClientRect(); return Math.min(r.width, r.height); });
      const pieces = (sel) => [...document.querySelectorAll(sel)].filter(e => e.offsetParent).map(e => e.getBoundingClientRect());
      const overlap = (rs) => { let n = 0; for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) { const a = rs[i], b = rs[j]; const x = Math.min(a.right, b.right) - Math.max(a.left, b.left), y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (x > 6 && y > 6) n++; } return n; };
      /* a phrase is clipped when its TEXT is wider than its box (a Range, not scrollWidth: the drawn rail under a piece overhangs by design) */
      const clipped = [...document.querySelectorAll('.mp-phrase,.mp-start,.mp-endcap,.mp-and')].filter(e => { if (!e.offsetParent || !e.firstChild) return false; const rg = document.createRange(); rg.selectNodeContents(e); const t = rg.getBoundingClientRect(), b = e.getBoundingClientRect(); return t.left < b.left - 1 || t.right > b.right + 1; }).map(e => e.textContent);
      const chk = document.querySelector('.mp-check').getBoundingClientRect();
      return { side: de.scrollWidth - de.clientWidth, small: ctl.filter(e => { const b = e.getBoundingClientRect(); return b.width < 43.5 || b.height < 43.5; }).map(e => e.className + ':' + e.getAttribute('data-k')), imgs, rail: overlap(pieces('.mp-rail > *')), booth: overlap(pieces('.mp-booth > *:not(:empty)')), clipped, fold: chk.bottom + scrollY, H: innerHeight };
    }, w);
    const floor = w >= 700 ? 96 : 64;
    is(m.side <= 0, `${tag}: no sideways scroll (${m.side})`);
    is(!m.small.length, `${tag}: every control ≥ 44 px (${m.small.join(' ')})`);
    is(m.imgs.length >= 3 && m.imgs.every(x => x >= floor - 0.5), `${tag}: every picture ≥ ${floor} px (${Math.round(Math.min(...m.imgs))})`);
    is(m.rail === 0 && m.booth === 0, `${tag}: no rail or booth pieces overlap (${m.rail}/${m.booth})`);
    is(!m.clipped.length, `${tag}: no phrase or cap clipped (${m.clipped.join(' | ')})`);
    if (atRest) is(m.fold <= m.H + 1, `${tag}: Check above the fold (${Math.round(m.fold)} ≤ ${m.H})`);
  }

  for (const loc of LOCS) {
    for (const w of WIDTHS) {
      const { page, errs } = await open(w, loc);
      for (const lv of C.LEVELS) for (const i of (QUICK ? [0] : C.ids(lv))) { await force(page, lv, i); await measure(page, w, `@${w} ${loc} ${lv}.${i} rest`, true); }
      /* a whole round of each level by hand, at a phone and a desktop width (the rounds differ per locale) */
      if (w === 360 || w === 704 || (QUICK && w === WIDTHS[0])) {
        const k = LOCS.indexOf(loc);
        const plays = [['l1', k % 8, playL1], ['l2', 3 + (k % 4), playL2], ['l3', k % 7, playL3], ['l4', k % 7, playL4]];
        for (const [lv, i, fn] of plays) {
          await force(page, lv, i); await fn(page, loc, i, `@${w} ${loc} ${lv}.${i}`);
          await measure(page, w, `@${w} ${loc} ${lv}.${i} done`, false);
          if (SHOTS && (w === 704 || loc === 'en')) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-done.png`), fullPage: true });
        }
        if (SHOTS && (w === 704 || loc === 'en')) for (const lv of C.LEVELS) { await force(page, lv, 0); await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-rest.png`), fullPage: true }); }
      }
      if (SHOTS && loc === 'en' && (w === 1024 || w === 320)) for (const lv of C.LEVELS) { await force(page, lv, 0); await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}-${lv}-rest.png`), fullPage: true }); }
      is(!errs.length, `@${w} ${loc}: no console/page errors (${errs.slice(0, 3).join(' | ')})`);
      await page.close();
    }
  }
  await browser.close(); server.close();
  console.log(`local-test-magnet-plates: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
