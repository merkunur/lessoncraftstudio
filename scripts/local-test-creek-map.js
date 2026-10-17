#!/usr/bin/env node
/* =====================================================================
   local-test-creek-map.js — the interaction gate for ACTIVITY #21,
   "Comparison Creek" (K.CC.C.7), the Creek Map. Real clicks: a buoy at
   each fork (the planned route drawn), Check through every slip (nothing ·
   half a route · a wrong fork → the boat stops in the reeds there, the fork
   ringed · again → dots under that fork's numbers · a new choice → reeds
   and dots gone) to done (the boat at the pond beside the friend); the sign
   follows the rule; every round of both ranges under "mixed", the fixed
   rules, every locale asked for, the width sweep.
   Usage: node scripts/local-test-creek-map.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'comparison-creek.river-steer.k-cc-c-7';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'creek-map-activity.js')).strings;
const CORE = require(path.join(MINI, 'creek-map-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]); let file;
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
    await page.goto(`${base}/creek-map-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => { const t = window.CreekMapActivity; return t && t.st && t._themes['vehicles'] && t._themes['forest creatures']; }, { timeout: 8000 });
    await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; window.CreekMapActivity.SAIL_MS = 25; window.CreekMapActivity._paint(); });
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.CreekMapActivity.api.settings[k] = v; window.CreekMapActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.CreekMapActivity.st; return { rule: s.rule, route: s.route.join(','), misses: s.misses, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const buoys = [...document.querySelectorAll('.cm-buoy')];
    const wrap = document.querySelector('.cm-wrap').getBoundingClientRect();
    const boat = document.querySelector('.cm-boat').getBoundingClientRect(), bimg = document.querySelector('.cm-boat img'), fimg = document.querySelector('.cm-friend img');
    const pos = (r) => [Math.round(r.left + r.width / 2 - wrap.left), Math.round(r.top + r.height / 2 - wrap.top)];
    return {
      nums: buoys.map(b => b.querySelector('.cm-n').textContent).join(','), aria: buoys.map(b => b.getAttribute('aria-label')),
      on: buoys.map(b => b.classList.contains('is-on') ? 1 : 0).join(''), stuck: buoys.map(b => b.classList.contains('is-stuck') ? 1 : 0).join(''),
      dots: [...document.querySelectorAll('.cm-dots')].map(d => d.hidden ? '-' : String(d.querySelectorAll('i').length)).join(','),
      reeds: [...document.querySelectorAll('.cm-reeds')].map(r => r.classList.contains('is-on') ? 1 : 0).join(''),
      routes: document.querySelectorAll('.cm-rt').length, boat: pos(boat), boatSrc: bimg ? bimg.getAttribute('src') : '', friendSrc: fimg ? fimg.getAttribute('src') : '',
      boatSize: bimg ? Math.min(bimg.offsetWidth, bimg.offsetHeight) : 0, friendSize: fimg ? Math.min(fimg.offsetWidth, fimg.offsetHeight) : 0,
      sign: document.querySelector('.cm-sign').className, signAria: document.querySelector('.cm-sign').getAttribute('aria-label'), disabled: buoys.every(b => b.disabled)
    };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(70);
  }
  const buoy = (page, fork, side) => clickEl(page, '.cm-buoy', fork * 2 + (side === 'left' ? 0 : 1));
  const check = (page, sailMs) => clickEl(page, '.lcs-activity-check').then(() => wait(sailMs || 0));
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.CreekMapActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(200); }
  const o = (s) => (s === 'left' ? 'right' : 'left');
  const SAIL = 25 * 8 + 450;

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    const L = await page.evaluate(() => window.CreekMapActivity._L);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'cm', 'mixed');
      is((await page.evaluate(() => window.CreekMapActivity._pool.map(r => r.id + r.rule).join())) === R.map(r => r.id + r.rule).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], A = CORE.answers(CORE.newState(r)), big = r.rule === 'bigger', Rk = big ? 'Big' : 'Small';
        const tag = `[${loc} ${range} #${ri} ${r.rule} ${r.forks.map(p => p.join('/')).join(' ')}]`;
        await forceRound(page, ri);
        let v = await view(page);
        is(v.nums === r.forks.map(p => p.join(',')).join(',') && v.sign.includes(big ? 'rule-big' : 'rule-small') && v.signAria === STR[big ? 'signBig' : 'signSmall'][loc], `${tag} the four buoys, the sign for the rule`);
        is(v.boatSrc === `/image-library-webp/themes/vehicles/sailboat@2x.webp` && v.friendSrc === `/image-library-webp/themes/forest creatures/${r.friend}@2x.webp`.replace(' ', '%20') || v.friendSrc === `/image-library-webp/themes/forest creatures/${r.friend}@2x.webp`, `${tag} the sailboat and the ${r.friend}`);
        is(v.boatSize >= 96 && v.friendSize >= 96 && v.on === '0000' && v.routes === 0 && v.reeds === '0000' && v.dots === '-,-,-,-', `${tag} pictures ≥ 96, nothing planned`);
        is(v.aria[0] === interp(STR.buoyAria[loc], { f: 1, n: r.forks[0][0] }) && v.aria[3] === interp(STR.buoyAria[loc], { f: 2, n: r.forks[1][1] }), `${tag} the buoy labels`);
        is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR[big ? 'promptBig' : 'promptSmall'][loc], `${tag} the task line names the rule`);
        await check(page);
        is((await bubble(page)) === STR.hintStart[loc] && (await state(page)).misses === 0, `${tag} nothing planned → start hint, no miss`);
        await buoy(page, 0, A[0]); v = await view(page);
        is(v.routes === 1 && v.on === (A[0] === 'left' ? '1000' : '0100'), `${tag} a tap at fork 1 → that buoy pressed, its channel dashed`);
        await check(page);
        is((await bubble(page)) === STR.hintEvery[loc] && (await state(page)).misses === 0, `${tag} half a route → "choose at both forks", no miss`);
        await buoy(page, 1, o(A[1])); await check(page, SAIL); v = await view(page);
        const reedIdx = 2 + (o(A[1]) === 'left' ? 0 : 1);
        is((await bubble(page)) === STR['hintFork' + Rk][loc] && (await state(page)).misses === 1 && v.stuck === '0011' && v.reeds === '0000'.split('').map((c, i) => i === reedIdx ? '1' : '0').join('') && v.dots === '-,-,-,-', `${tag} fork 2 wrong → stuck there in the reeds, fork 2 ringed, no dots`);
        is(Math.abs(v.boat[0] - L.boatX[o(A[1])]) <= 3 && Math.abs(v.boat[1] - L.stuckY[1]) <= 3, `${tag} the boat sits in the wrong channel of fork 2`);
        await check(page, SAIL); v = await view(page);
        const nb = r.forks[1];
        is((await bubble(page)) === STR['hintDots' + Rk][loc] && (await state(page)).misses === 2 && v.dots === `-,-,${nb[0]},${nb[1]}`, `${tag} again → dots under fork 2: ${nb[0]} and ${nb[1]}`);
        await buoy(page, 1, A[1]); v = await view(page);
        is(v.stuck === '0000' && v.reeds === '0000' && v.dots === '-,-,-,-' && Math.abs(v.boat[1] - L.startY) <= 3, `${tag} a new choice → reeds and dots gone, the boat back at the source`);
        await check(page, SAIL + 300); v = await view(page);
        const f = CORE.followed(CORE.newState(r));
        is(await celebrated(page) && (await bubble(page)) === interp(STR[big ? 'celebrateBig' : 'celebrateSmall'][loc], { a: f[0], b: f[1] }), `${tag} done: "${await bubble(page)}"`);
        is(Math.abs(v.boat[1] - L.pondY) <= 3 && v.disabled && v.stuck === '0000', `${tag} the boat at the pond, the buoys locked`);
      }
    }
    /* the fixed rules */
    for (const rule of ['bigger', 'smaller']) {
      await setSetting(page, 'rule', rule);
      const ok = await page.evaluate((rule) => window.CreekMapActivity._pool.every(r => r.rule === rule), rule);
      await forceRound(page, 1); const v = await view(page);
      is(ok && v.sign.includes(rule === 'bigger' ? 'rule-big' : 'rule-small'), `[${loc}] "always ${rule}": every round, and the sign`);
    }
    await setSetting(page, 'rule', 'mixed'); await setSetting(page, 'range', 'to10');
    /* the voyage passes through fork 1 into fork 2 (not straight to the reeds) */
    await forceRound(page, 0);
    await page.evaluate(() => { window.CreekMapActivity.SAIL_MS = 180; });
    const A0 = CORE.answers(CORE.newState(CORE.rounds('to10', 'cm')[0]));
    await buoy(page, 0, A0[0]); await buoy(page, 1, o(A0[1])); await check(page);
    const ys = [];
    for (let k = 0; k < 40; k++) { ys.push((await view(page)).boat[1]); await wait(40); }
    const passed = ys.some(y => y > L.forkTop[0] + L.F * 0.5 && y < L.forkTop[1]) && ys[ys.length - 1] === L.stuckY[1] || Math.abs(ys[ys.length - 1] - L.stuckY[1]) <= 3;
    is(ys.some(y => y > L.forkTop[0] + L.F * 0.5 && y <= L.forkTop[1] + 2) && Math.abs(ys[ys.length - 1] - L.stuckY[1]) <= 3, `[${loc}] the boat sails down fork 1 and into the reeds of fork 2 (${passed})`);
    await page.evaluate(() => { window.CreekMapActivity.SAIL_MS = 25; });
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 1); const A = CORE.answers(CORE.newState(CORE.rounds('to10', 'cm')[1])); await buoy(page, 0, o(A[0])); await buoy(page, 1, A[1]); await check(page, SAIL); await check(page, SAIL); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    for (const [range, ri] of [['to10', 0], ['to10', 6], ['to5', 3]]) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      await forceRound(page, ri);
      const r = CORE.rounds(range, 'cm')[ri], tg = `${tag} ${range} #${ri}`;
      const ck = await page.evaluate(() => document.querySelector('.lcs-activity-check').getBoundingClientRect().bottom + window.scrollY);
      is(ck <= (w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900), `${tg} Check above the fold at rest (${ck.toFixed(0)})`);
      const A = CORE.answers(CORE.newState(r));
      await buoy(page, 0, o(A[0])); await buoy(page, 1, A[1]); await check(page, SAIL); await check(page, SAIL);
      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect(), wrap = document.querySelector('.cm-wrap').getBoundingClientRect();
        const rect = (s) => [...document.querySelectorAll(s)].filter(e => !e.hidden && getComputedStyle(e).display !== 'none').map(e => e.getBoundingClientRect());
        const B = rect('.cm-buoy'), D = rect('.cm-dots'), S = rect('.cm-sign'), boat = rect('.cm-boat img'), friend = rect('.cm-friend img');
        const ov = (a, c) => a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1;
        const all = B.concat(D, S, boat, friend);
        let clash = false;
        for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) if (ov(all[i], all[j])) clash = true;
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inWrap: all.every(x => x.left >= wrap.left - 1 && x.right <= wrap.right + 1 && x.top >= wrap.top - 1 && x.bottom <= wrap.bottom + 1), inCard: wrap.left >= card.left - 1 && wrap.right <= card.right + 1, clash, tap: Math.min(...B.map(b => Math.min(b.width, b.height))), boat: boat[0] ? Math.min(boat[0].width, boat[0].height) : 0 };
      });
      is(m.overflow <= 2 && m.inWrap && m.inCard && !m.clash, `${tg} with the boat stuck and the dots out: everything inside, nothing overlapping`);
      is(m.tap >= 44, `${tg} buoys ≥ 44 (${m.tap})`);
      if (w >= 700) is(m.boat >= 96, `${tg} the boat ≥ 96 (${m.boat})`); else if (w >= 360) is(m.boat >= 64, `${tg} the boat ≥ 64 on a phone (${m.boat})`);
    }
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0);
    const A = CORE.answers(CORE.newState(CORE.rounds('to10', 'cm')[0]));
    await buoy(page, 0, A[0]); await buoy(page, 1, o(A[1])); await check(page, SAIL); await check(page, SAIL);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await buoy(page, 1, A[1]); await check(page, SAIL + 300);
    is(await celebrated(page), `${tag} the right route → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-creek-map: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
