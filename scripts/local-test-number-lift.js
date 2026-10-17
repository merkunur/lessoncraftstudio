#!/usr/bin/env node
/* =====================================================================
   local-test-number-lift.js — the interaction gate for ACTIVITY #19,
   "Which number is bigger?" (K.CC.C.7), the Number Elevator. Real clicks:
   a passenger chosen (pressed), Check through every slip (none · wrong →
   find hint · wrong again → both floors lit · a new choice → lights off) to
   done (the ride: the lower ticket dropped first, then the higher one, the
   car parked at the bigger floor); "hidden" floor numbers (count hint);
   every round of both ranges, every locale asked for, the width sweep.
   Usage: node scripts/local-test-number-lift.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.pick-bigger.k-c-c-7';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'number-lift-activity.js')).strings;
const CORE = require(path.join(MINI, 'number-lift-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice(20));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end(); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
(async () => {
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + server.address().port;
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  if (SHOT) fs.mkdirSync(SHOT, { recursive: true });
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function open(loc, w) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() === 404 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push('404 ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/number-lift-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.NumberLiftActivity && window.NumberLiftActivity.st && window.NumberLiftActivity._theme, { timeout: 8000 });
    await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; window.NumberLiftActivity.RIDE_MS = 20; window.NumberLiftActivity._paint(); });
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.NumberLiftActivity.api.settings[k] = v; window.NumberLiftActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.NumberLiftActivity.st; return { left: s.left, right: s.right, choice: s.choice, misses: s.misses, done: s.done, labels: s.labels }; });
  const view = (page) => page.evaluate(() => {
    const vis = (el) => !el.hidden && el.offsetParent !== null;
    const floors = [...document.querySelectorAll('.nl-floor')].filter(vis);
    const pax = ['left', 'right'].map(s => document.querySelector('.nl-p-' + s));
    const img = (b) => b.querySelector('img');
    const carR = document.querySelector('.nl-car').getBoundingClientRect();
    const carFloor = floors.find(fl => { const r = fl.getBoundingClientRect(); return Math.abs((r.top + r.bottom) / 2 - (carR.top + carR.bottom) / 2) < r.height / 2; });
    return {
      floors: floors.map(f => +f.getAttribute('data-f')).join(),
      fnumsOrder: floors.map(f => f.querySelector('.nl-fnum').textContent).join(),
      fnumHidden: floors.every(f => getComputedStyle(f.querySelector('.nl-fnum')).color === 'rgba(0, 0, 0, 0)'),
      lit: floors.filter(f => f.classList.contains('is-lit')).map(f => +f.getAttribute('data-f')).sort((a, b) => a - b).join(),
      litA: floors.filter(f => f.classList.contains('lit-a')).map(f => +f.getAttribute('data-f')).join(),
      litB: floors.filter(f => f.classList.contains('lit-b')).map(f => +f.getAttribute('data-f')).join(),
      drops: floors.filter(f => f.querySelector('.nl-drop').textContent).map(f => f.getAttribute('data-f') + ':' + f.querySelector('.nl-drop').textContent + ':' + (f.querySelector('.nl-drop').classList.contains('is-a') ? 'a' : 'b')).sort().join(),
      tickets: pax.map(b => b.querySelector('.nl-tnum').textContent).join(),
      srcs: pax.map(b => img(b) ? img(b).getAttribute('src') : '').join('|'),
      size: Math.min(...pax.map(b => img(b) ? Math.min(img(b).offsetWidth, img(b).offsetHeight) : 0)),
      pressed: pax.map(b => b.getAttribute('aria-pressed')).join(),
      disabled: pax.every(b => b.disabled),
      aria: pax.map(b => b.getAttribute('aria-label')).join('|'),
      bldAria: document.querySelector('.nl-building').getAttribute('aria-label'),
      carFloor: carFloor ? +carFloor.getAttribute('data-f') : null
    };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(70);
  }
  const check = (page) => clickEl(page, '.lcs-activity-check');
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.NumberLiftActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const down = (n) => Array.from({ length: n }, (_, i) => String(n - i)).join();

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'nl'), F = range === 'to10' ? 10 : 5;
      is((await page.evaluate(() => window.NumberLiftActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.left}/${r.right}]`, wrong = r.answer === 'left' ? 'right' : 'left';
        const b = Math.max(r.left, r.right), s = Math.min(r.left, r.right);
        await forceRound(page, ri);
        let v = await view(page);
        is(v.floors === down(F) && v.fnumsOrder === down(F) && !v.fnumHidden, `${tag} a building of ${F} floors, numbered from the top down`);
        is(v.tickets === `${r.left},${r.right}` && v.srcs === r.animals.map(n => `/image-library-webp/themes/${CORE.THEME}/${n}@2x.webp`).join('|'), `${tag} ${r.animals[0]} with ${r.left}, ${r.animals[1]} with ${r.right} (${v.srcs})`);
        is(v.size >= 96 && v.lit === '' && v.drops === '' && v.carFloor === 1, `${tag} pictures ≥ 96 (${v.size}), nothing lit, the car on floor 1 (${v.carFloor})`);
        is(v.aria === `${interp(STR.passengerAria[loc], { n: r.left })}|${interp(STR.passengerAria[loc], { n: r.right })}` && v.bldAria === interp(STR.buildingLabel[loc], { f: F }), `${tag} the labels`);
        await check(page);
        is((await bubble(page)) === STR.hintStart[loc] && (await state(page)).misses === 0, `${tag} no choice → start hint, no miss`);
        await clickEl(page, '.nl-p-' + wrong); v = await view(page);
        is(v.pressed === (wrong === 'left' ? 'true,false' : 'false,true'), `${tag} a tap presses one passenger`);
        await check(page); v = await view(page);
        is((await bubble(page)) === STR.hintFind[loc] && (await state(page)).misses === 1 && v.lit === '', `${tag} wrong → "find both numbers", nothing lit`);
        await check(page); v = await view(page);
        is((await bubble(page)) === STR.hintLit[loc] && v.lit === [s, b].join() && v.litA === String(r.left) && v.litB === String(r.right), `${tag} wrong again → floors ${s} and ${b} lit, each in its passenger colour`);
        await clickEl(page, '.nl-p-' + r.answer); v = await view(page);
        is(v.lit === '' && v.pressed === (r.answer === 'left' ? 'true,false' : 'false,true'), `${tag} a new choice takes the lights away until Check`);
        await check(page); await wait(30 * (b + 4) + 500); v = await view(page);
        const want = interp(STR.celebrate[loc], { b, s });
        is(await celebrated(page) && (await bubble(page)) === want, `${tag} done: "${await bubble(page)}"`);
        is(v.drops === [`${r.left}:${r.left}:a`, `${r.right}:${r.right}:b`].sort().join() && v.lit === [s, b].join() && v.carFloor === b && v.disabled, `${tag} the ride: tickets left on floors ${s} and ${b}, the car parked at ${b} (${v.drops} / car ${v.carFloor})`);
      }
    }
    /* the ride order: the lower floor first */
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0);
    await page.evaluate(() => { window.NumberLiftActivity.RIDE_MS = 200; });
    await clickEl(page, '.nl-p-right'); await check(page);
    const order = [];
    for (let k = 0; k < 60 && order.length < 2; k++) { await wait(50); const d = (await view(page)).drops; const fl = d ? d.split(',').map(x => x.split(':')[0]) : []; for (const f of fl) if (!order.includes(f)) order.push(f); }
    is(order.join() === '6,9', `[${loc}] 6 and 9: the elevator stops at 6 first, then 9 (${order.join()})`);
    await wait(600);
    await page.evaluate(() => { window.NumberLiftActivity.RIDE_MS = 20; });
    /* floor numbers hidden */
    await setSetting(page, 'labels', 'hidden'); await forceRound(page, 3);
    const v = await view(page), st = await state(page);
    is(st.labels === 'hidden' && v.fnumHidden && v.tickets === '5,7', `[${loc}] hidden: the wall numbers are gone, the tickets stay`);
    await clickEl(page, '.nl-p-left'); await check(page);
    is((await bubble(page)) === STR.hintCount[loc], `[${loc}] hidden: wrong → "count the floors"`);
    await setSetting(page, 'labels', 'shown');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 0); await clickEl(page, '.nl-p-left'); await check(page); await check(page); await wait(250); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    for (const [range, ri] of [['to10', 4], ['to10', 5], ['to5', 3]]) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      await forceRound(page, ri);
      const r = CORE.rounds(range, 'nl')[ri], tg = `${tag} ${range} #${ri} ${r.left}/${r.right}`;
      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const els = ['.nl-building', '.nl-pax', '.nl-p-left', '.nl-p-right'].map(s => document.querySelector(s).getBoundingClientRect());
        const taps = [...document.querySelectorAll('.nl-p')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
        const ck = document.querySelector('.lcs-activity-check').getBoundingClientRect();
        const pl = els[2], pr = els[3], bl = els[0];
        const ov = (a, c) => a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1;
        const fl = [...document.querySelectorAll('.nl-floor')].filter(f => !f.hidden).map(f => f.getBoundingClientRect().height);
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tapMin: Math.min(...taps), checkBottom: ck.bottom + window.scrollY, vh: window.innerHeight, overlap: ov(pl, pr) || ov(pl, bl) || ov(pr, bl), floorMin: Math.min(...fl), sameHeight: Math.abs(pl.top - pr.top) < 2 && Math.abs(pl.bottom - pr.bottom) < 2 };
      });
      const v = await view(page);
      is(m.overflow <= 2 && m.inCard && !m.overlap && m.tapMin >= 44, `${tg} inside the card, no overlap, taps ≥ 44 (${m.tapMin})`);
      is(m.sameHeight, `${tg} the two passengers stand at the same height (on screen, height only means floors)`);
      is(m.checkBottom <= m.vh, `${tg} Check above the fold (${m.checkBottom.toFixed(0)} ≤ ${m.vh})`);
      is(m.floorMin >= 26, `${tg} floors ≥ 26 px (${m.floorMin.toFixed(1)})`);
      if (w >= 700) is(v.size >= 96, `${tg} ≥ 96 px (${v.size})`); else if (w >= 360) is(v.size >= 64, `${tg} ≥ 64 px on a phone (${v.size})`);
    }
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0);
    await clickEl(page, '.nl-p-left'); await check(page); await check(page); await wait(250);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await clickEl(page, '.nl-p-right'); await check(page); await wait(900);
    is(await celebrated(page), `${tag} 6 and 9 → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-number-lift: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
