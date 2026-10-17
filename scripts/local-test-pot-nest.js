#!/usr/bin/env node
/* =====================================================================
   local-test-pot-nest.js — the interaction gate for ACTIVITY #22, the
   Nesting Pots (K.CC.C.7). Real clicks: the row (all pots one size, only
   the numbers differ); a pot tapped grows to its number in the nest; a pot
   too big bounces back (the row unchanged); a dead end (nothing fits) →
   Check "take a pot out", the inside pot glows; a lift returns the inside
   pot to its own place; two bounces → dots on the waiting pots; in order
   → Check right, the nest reads biggest to smallest, every rim visible.
   "Always" dots; every round of both ranges, every locale, the width sweep.
   Usage: node scripts/local-test-pot-nest.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'nesting-pots.seriate.k-cc-c-7';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'pot-nest-activity.js')).strings;
const CORE = require(path.join(MINI, 'pot-nest-core.js'));
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
    await page.goto(`${base}/pot-nest-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PotNestActivity && window.PotNestActivity.st && document.querySelector('.pn-tp'), { timeout: 8000 });
    await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.PotNestActivity.api.settings[k] = v; window.PotNestActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.PotNestActivity.st; return { tray: s.tray.join(), nest: s.nest.join(), bounces: s.bounces, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const tps = [...document.querySelectorAll('.pn-tp')];
    const pots = [...document.querySelectorAll('.pn-nest .pn-pot:not(.is-bounce)')];
    const rect = (e) => e.getBoundingClientRect();
    return {
      row: tps.map(b => b.getAttribute('data-v')).join(), used: tps.map(b => b.classList.contains('is-used') ? 1 : 0).join(''),
      sizes: [...new Set(tps.filter(b => !b.classList.contains('is-used')).map(b => Math.round(rect(b.querySelector('.pn-tp-pot')).width) + 'x' + Math.round(rect(b.querySelector('.pn-tp-pot')).height)))].length,
      nums: tps.map(b => b.querySelector('.pn-tp-n').textContent).join(), aria: tps.map(b => b.getAttribute('aria-label')),
      dots: tps.map(b => { const d = b.querySelector('.pn-tp-dots'); return d ? d.querySelectorAll('i').length : 0; }).join(','),
      nest: pots.map(p => p.getAttribute('data-v')).join(), nestNums: pots.map(p => p.querySelector('.pn-n').textContent).join(),
      heights: pots.map(p => Math.round(rect(p).height)), widths: pots.map(p => Math.round(rect(p).width)),
      /* each rim is visible: its top band lies above the next pot in */
      rimsClear: pots.every((p, i) => i === pots.length - 1 || rect(p.querySelector('.pn-rim')).bottom <= rect(pots[i + 1]).top + 1),
      rimFont: pots.length ? Math.min(...pots.map(p => parseFloat(getComputedStyle(p.querySelector('.pn-n')).fontSize))) : 99,
      inner: (document.querySelector('button.pn-pot.is-inner') || {}).getAttribute ? document.querySelector('button.pn-pot.is-inner').getAttribute('data-v') : '',
      cue: !!document.querySelector('.pn-pot.is-cue'), liftAria: document.querySelector('button.pn-pot') ? document.querySelector('button.pn-pot').getAttribute('aria-label') : ''
    };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel) {
    const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + Math.min(r.height / 2, 20) }; }, sel);
    if (!c) throw new Error('no element ' + sel); await wait(30); await page.mouse.click(c.x, c.y); await wait(90);
  }
  const pot = (page, v) => clickEl(page, `.pn-tp[data-v="${v}"]`);
  const liftIt = (page) => clickEl(page, 'button.pn-pot.is-inner');
  const check = (page) => clickEl(page, '.lcs-activity-check');
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.PotNestActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(200); }
  const desc = (a) => a.slice().sort((x, y) => y - x);

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'pn');
      is((await page.evaluate(() => window.PotNestActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], D = desc(r.pots), tag = `[${loc} ${range} #${ri} ${r.pots.join('/')}]`;
        await forceRound(page, ri);
        let v = await view(page);
        is(v.row === r.pots.join() && v.nums === r.pots.join() && v.sizes === 1 && v.nest === '' && v.dots === r.pots.map(() => 0).join(','), `${tag} the row: every pot one size, only the numbers differ, no dots`);
        is(v.aria[0] === interp(STR.potAria[loc], { n: r.pots[0] }), `${tag} the pot label`);
        await check(page);
        is((await bubble(page)) === STR.hintStart[loc], `${tag} empty nest → "find the biggest number"`);
        /* the second-biggest first, then the biggest: it bounces */
        await pot(page, D[1]); await pot(page, D[0]); let s = await state(page);
        is(s.nest === String(D[1]) && s.bounces === 1 && s.tray.split(',').includes(String(D[0])), `${tag} ${D[1]} in, then ${D[0]} bounces back`);
        v = await view(page);
        is(v.dots === r.pots.map(() => 0).join(','), `${tag} one bounce → no dots yet`);
        /* the rest in order, leaving the biggest: stuck */
        for (let i = 2; i < D.length; i++) await pot(page, D[i]);
        v = await view(page);
        is(v.nest === D.slice(1).join() && v.cue && v.inner === String(D[D.length - 1]), `${tag} the rest fit: ${D.slice(1).join(', ')}; nothing left fits, the inside pot glows`);
        await check(page);
        is((await bubble(page)) === STR.hintStuck[loc] && !(await state(page)).done, `${tag} Check when stuck → "take a pot out"`);
        /* lift them all back, then a second bounce: the dots come */
        for (let i = 0; i < D.length - 1; i++) await liftIt(page);
        v = await view(page);
        is(v.nest === '' && v.row === r.pots.join() && v.used === r.pots.map(() => 0).join(''), `${tag} lifted back: each pot in its own place in the row`);
        await pot(page, D[1]); await pot(page, D[0]); v = await view(page);
        is((await state(page)).bounces === 2 && v.dots === r.pots.map(x => (x === D[1] ? 0 : x)).join(','), `${tag} two bounces → dots on the waiting pots`);
        await check(page);
        const hk = (await state(page)).tray.split(',').every(x => +x > D[1]) ? 'hintStuck' : 'hintDots';
        is((await bubble(page)) === STR[hk][loc], `${tag} Check now → "${hk}"`);
        await liftIt(page);
        for (const x of D) await pot(page, x);
        await check(page); await wait(250); v = await view(page);
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { list: D.join(', ') }), `${tag} in order → "${await bubble(page)}"`);
        is(v.nest === D.join() && v.nestNums === D.join() && v.rimsClear && v.heights.every((h, i) => i === 0 || h < v.heights[i - 1]) && v.widths.every((w, i) => i === 0 || w < v.widths[i - 1]), `${tag} the nest: ${D.join(', ')}, each pot smaller than the last, every rim showing`);
      }
    }
    await setSetting(page, 'range', 'to10'); await setSetting(page, 'dots', 'always'); await forceRound(page, 0);
    const v = await view(page);
    is(v.dots === '6,9,2,4', `[${loc}] "always": dots on every pot from the start`);
    await setSetting(page, 'dots', 'help');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 0); await pot(page, 9); await pot(page, 2); await check(page); await wait(250); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    for (const [range, ri] of [['to10', 2], ['to10', 4], ['to5', 2]]) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      await forceRound(page, ri);
      const r = CORE.rounds(range, 'pn')[ri], D = desc(r.pots), tg = `${tag} ${range} #${ri}`;
      const ck = await page.evaluate(() => document.querySelector('.lcs-activity-check').getBoundingClientRect().bottom + window.scrollY);
      is(ck <= (w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900), `${tg} Check above the fold (${ck.toFixed(0)})`);
      for (const x of D) await pot(page, x);
      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const els = [...document.querySelectorAll('.pn-tp, .pn-nest .pn-pot')].map(e => e.getBoundingClientRect());
        const taps = [...document.querySelectorAll('.pn-tp')].map(e => Math.min(e.offsetWidth, e.offsetHeight));
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tap: Math.min(...taps) };
      });
      const v = await view(page);
      is(m.overflow <= 2 && m.inCard && v.rimsClear && v.rimFont >= 14, `${tg} the full nest inside the card, every rim showing, rim numbers ≥ 14 px (${v.rimFont})`);
      is(m.tap >= 44, `${tg} row pots ≥ 44 (${m.tap})`);
    }
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0);
    await pot(page, 9); await pot(page, 2); await check(page); await wait(250);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await liftIt(page); for (const x of [6, 4, 2]) await pot(page, x);
    await check(page); await wait(300);
    is(await celebrated(page), `${tag} 9, 6, 4, 2 → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-pot-nest: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
