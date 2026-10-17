#!/usr/bin/env node
/* =====================================================================
   local-test-block-towers.js — the interaction gate for ACTIVITY #20,
   "Which number is smaller?" (K.CC.C.7), the Block Towers. Real clicks:
   a card chosen (pressed), Check through every slip (none · wrong → count
   hint, no towers · wrong again → the towers grow · a new choice → towers
   gone) to done (both towers grow together, the smaller stops first with
   its flag, the counting row lit to the bigger number); "hidden" counting
   row; every round of both ranges, every locale asked for, the width sweep.
   Usage: node scripts/local-test-block-towers.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.pick-smaller.k-c-c-7';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'block-towers-activity.js')).strings;
const CORE = require(path.join(MINI, 'block-towers-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : path.join(MINI, p.replace(/^\//, ''));
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
    await page.goto(`${base}/block-towers-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.BlockTowersActivity && window.BlockTowersActivity.st && document.querySelector('.bt-card'), { timeout: 8000 });
    await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; window.BlockTowersActivity.GROW_MS = 20; window.BlockTowersActivity._paint(); });
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.BlockTowersActivity.api.settings[k] = v; window.BlockTowersActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.BlockTowersActivity.st; return { left: s.left, right: s.right, choice: s.choice, misses: s.misses, done: s.done, strip: s.strip }; });
  const view = (page) => page.evaluate(() => {
    const vis = (el) => !el.hidden && el.offsetParent !== null;
    const side = (sd) => {
      const col = document.querySelector('.bt-col-' + sd), card = col.querySelector('.bt-card');
      const slots = [...col.querySelectorAll('.bt-slot')].filter(vis);
      const flag = col.querySelector('.bt-flag');
      return { slots: slots.length, on: slots.filter(s => s.classList.contains('is-on')).length, num: card.querySelector('.bt-num').textContent,
        pressed: card.getAttribute('aria-pressed'), disabled: card.disabled, aria: card.getAttribute('aria-label'),
        flag: flag.classList.contains('is-on') && getComputedStyle(flag).display !== 'none', flagN: col.querySelector('.bt-flag-n').textContent };
    };
    const chips = [...document.querySelectorAll('.bt-chip')].filter(vis);
    return { L: side('left'), R: side('right'), chips: chips.map(c => c.textContent).join(), lit: chips.filter(c => c.classList.contains('is-lit')).length,
      stop: chips.filter(c => c.classList.contains('is-stop')).map(c => c.textContent).join(), stripShown: getComputedStyle(document.querySelector('.bt-strip')).display !== 'none' };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(70);
  }
  const check = (page) => clickEl(page, '.lcs-activity-check');
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.BlockTowersActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const seq = (n) => Array.from({ length: n }, (_, i) => String(i + 1)).join();

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'bt'), M = range === 'to10' ? 10 : 5;
      is((await page.evaluate(() => window.BlockTowersActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.left}/${r.right}]`, wrong = r.answer === 'left' ? 'right' : 'left';
        const s = Math.min(r.left, r.right), b = Math.max(r.left, r.right), first = r.answer === 'left' ? 'L' : 'R';
        await forceRound(page, ri);
        let v = await view(page);
        is(v.L.num === String(r.left) && v.R.num === String(r.right) && v.L.slots === M && v.R.slots === M && v.chips === seq(M), `${tag} cards ${r.left} and ${r.right}, two empty towers of ${M}, the row 1…${M}`);
        is(v.L.on === 0 && v.R.on === 0 && !v.L.flag && !v.R.flag && v.lit === 0, `${tag} nothing built, no flag, nothing lit`);
        is(v.L.aria === interp(STR.cardAria[loc], { n: r.left }) && v.R.aria === interp(STR.cardAria[loc], { n: r.right }), `${tag} the card labels`);
        await check(page);
        is((await bubble(page)) === STR.hintStart[loc] && (await state(page)).misses === 0, `${tag} no choice → start hint, no miss`);
        await clickEl(page, '.bt-card-' + wrong); v = await view(page);
        is((wrong === 'left' ? v.L.pressed + v.R.pressed : v.R.pressed + v.L.pressed) === 'truefalse', `${tag} a tap presses one card`);
        await check(page); await wait(60); v = await view(page);
        is((await bubble(page)) === STR.hintCount[loc] && (await state(page)).misses === 1 && v.L.on === 0 && v.R.on === 0, `${tag} wrong → "count from 1", no towers`);
        await check(page); await wait(20 * (b + 3) + 300); v = await view(page);
        is((await bubble(page)) === STR.hintBuilt[loc] && v.L.on === r.left && v.R.on === r.right && v[first].flag && !v[first === 'L' ? 'R' : 'L'].flag, `${tag} wrong again → the towers grow to ${r.left} and ${r.right}, the flag on the smaller`);
        await clickEl(page, '.bt-card-' + r.answer); v = await view(page);
        is(v.L.on === 0 && v.R.on === 0 && !v.L.flag && !v.R.flag, `${tag} a new choice takes the towers away until Check`);
        await check(page); await wait(20 * (b + 3) + 400); v = await view(page);
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { s, b }), `${tag} done: "${await bubble(page)}"`);
        is(v.L.on === r.left && v.R.on === r.right && v[first].flag && v[first].flagN === String(s) && v.lit === b && v.stop === String(s) && v.L.disabled && v.R.disabled, `${tag} both towers stand, the ${s} flagged, the row lit to ${b} with a stop at ${s}`);
      }
    }
    /* the growth itself: both towers rise together, the smaller one stops first */
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0);   /* 3 and 8 */
    await page.evaluate(() => { window.BlockTowersActivity.GROW_MS = 160; });
    await clickEl(page, '.bt-card-left'); await check(page);
    const frames = [];
    for (let k = 0; k < 40; k++) { const v = await view(page); frames.push([v.L.on, v.R.on, v.L.flag]); if (v.R.on === 8 && k > 2) break; await wait(40); }
    const together = frames.every(([a, c]) => a === Math.min(c, 3) || a === c);
    const flagAt3 = frames.filter(f => f[2]).every(([a]) => a === 3) && frames.some(f => f[2] && f[1] < 8);
    is(together && flagAt3, `[${loc}] 3 and 8: both towers rise together, the 3 stops and raises its flag while the 8 still climbs`);
    await page.evaluate(() => { window.BlockTowersActivity.GROW_MS = 20; });
    await wait(600);
    /* the counting row hidden */
    await setSetting(page, 'strip', 'hidden'); await forceRound(page, 1);
    let v = await view(page);
    is((await state(page)).strip === 'hidden' && !v.stripShown && v.L.num === '7', `[${loc}] hidden: no counting row`);
    await setSetting(page, 'strip', 'shown');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 0); await clickEl(page, '.bt-card-right'); await check(page); await check(page); await wait(600); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    for (const [range, ri] of [['to10', 5], ['to10', 2], ['to5', 2]]) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      await forceRound(page, ri);
      const r = CORE.rounds(range, 'bt')[ri], b = Math.max(r.left, r.right), tg = `${tag} ${range} #${ri} ${r.left}/${r.right}`;
      await clickEl(page, '.bt-card-' + (r.answer === 'left' ? 'right' : 'left')); await check(page); await check(page); await wait(20 * (b + 3) + 300);
      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const els = ['.bt-col-left', '.bt-col-right', '.bt-strip', '.bt-card-left', '.bt-card-right'].map(s => document.querySelector(s).getBoundingClientRect());
        const flags = [...document.querySelectorAll('.bt-flag.is-on')].map(f => f.getBoundingClientRect());
        const taps = [...document.querySelectorAll('.bt-card')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
        const ck = document.querySelector('.lcs-activity-check').getBoundingClientRect();
        const ov = (a, c) => a.left < c.right - 1 && c.left < a.right - 1 && a.top < c.bottom - 1 && c.top < a.bottom - 1;
        const prompt = document.querySelector('.lcs-activity-prompt').getBoundingClientRect();
        const cl = els[3], cr = els[4];
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.concat(flags).every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tapMin: Math.min(...taps), checkBottom: ck.bottom + window.scrollY, vh: window.innerHeight,
          overlap: ov(cl, cr) || ov(els[0], els[1]), flagClear: flags.every(f => f.top >= prompt.bottom - 1), sameRow: Math.abs(cl.top - cr.top) < 2, stripFits: (() => { const s = document.querySelector('.bt-strip'); return s.scrollWidth <= s.clientWidth + 1; })(), cardH: Math.min(cl.height, cr.height) };
      });
      is(m.overflow <= 2 && m.inCard && !m.overlap && m.sameRow && m.stripFits, `${tg} inside the card, no overlap, the cards level, the row fits`);
      is(m.tapMin >= 44 && m.flagClear, `${tg} cards ≥ 44 (${m.tapMin}), the flag below the task line`);
      is(m.checkBottom <= m.vh, `${tg} Check above the fold with the towers built (${m.checkBottom.toFixed(0)} ≤ ${m.vh})`);
      if (w >= 700) is(m.cardH >= 96, `${tg} cards ≥ 96 px tall (${m.cardH.toFixed(0)})`);
    }
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0);
    await clickEl(page, '.bt-card-right'); await check(page); await check(page); await wait(600);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await clickEl(page, '.bt-card-left'); await check(page); await wait(700);
    is(await celebrated(page), `${tag} 3 and 8 → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-block-towers: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
