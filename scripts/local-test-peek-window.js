#!/usr/bin/env node
/* =====================================================================
   local-test-peek-window.js — the interaction gate for ACTIVITY #12,
   "How Many Are There?" (K.CC.B.5), the Peek Window.
   Real clicks: the window opens by itself and shuts again (the pictures
   are covered — measured as the shutters' rectangles over the pictures),
   Look again opens it, a wrong number on the rail + Check (named; the
   window stays open), a second wrong number (the numbers run to a "?"),
   the right number → the shell celebrates; every round of both ranges, the
   "stays open" setting, every locale asked for, the width sweep.
   Usage: node scripts/local-test-peek-window.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.how-many-group.k-c-c-b-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'peek-window-activity.js')).strings;
const CORE = require(path.join(MINI, 'peek-window-core.js'));
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
    await page.goto(`${base}/peek-window-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PeekWindowActivity && window.PeekWindowActivity.st && Object.keys(window.PeekWindowActivity._themes).length === 3, { timeout: 8000 });
    await page.evaluate(() => { window.PeekWindowActivity.FIRST_MS = 150; window.PeekWindowCore.LOOK_MS.quick = 500; window.PeekWindowCore.LOOK_MS.long = 700; document.querySelectorAll('.pw-shutter').forEach(s => { s.style.transition = 'none'; }); });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.PeekWindowActivity.api.settings[k] = v; window.PeekWindowActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.PeekWindowActivity.st; return { id: s.id, n: s.n, p: s.p, noun: s.noun, looks: s.looks, answer: s.answer, misses: s.misses, done: s.done }; });
  /* covered = every picture's centre lies under a shutter (the shutters' own rectangles, as rendered) */
  const view = (page) => page.evaluate(() => {
    const items = [...document.querySelectorAll('.pw-item')];
    const sh = [...document.querySelectorAll('.pw-shutter')].map(s => s.getBoundingClientRect());
    const win = document.querySelector('.pw-window').getBoundingClientRect();
    const under = (x, y) => sh.some(r => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom && r.left >= win.left - 1 && r.right <= win.right + 1);
    const pics = items.map(it => { const im = it.querySelector('img'); const r = it.getBoundingClientRect(); return { src: im && im.getAttribute('src'), w: r.width, nat: im ? im.naturalWidth : 0, covered: under(r.left + r.width / 2, r.top + r.height / 2) }; });
    const chips = [...document.querySelectorAll('.pw-chip')].filter(c => !c.hidden);
    const wrap = document.querySelector('.pw-wrap');
    return { mode: ['wide', 'side', 'narrow'].find(m => wrap.classList.contains('is-' + m)), open: wrap.classList.contains('is-open'), pics, allCovered: pics.every(p => p.covered), noneCovered: pics.every(p => !p.covered),
      chips: chips.map(c => c.textContent).join(','), chipMin: Math.min(...chips.map(c => Math.min(c.getBoundingClientRect().width, c.getBoundingClientRect().height))),
      wrong: chips.findIndex(c => c.classList.contains('is-wrong')), nums: items.map(it => { const n = it.querySelector('.pw-num'); return n.classList.contains('is-on') ? n.textContent : ''; }),
      gold: items.findIndex(it => it.querySelector('.pw-num').classList.contains('is-gold')), look: !document.querySelector('.pw-look').hidden, lookOn: !document.querySelector('.pw-look').disabled };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickSel(page, sel) { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); await page.mouse.click(c.x, c.y); await wait(90); }
  const chip = (page, v) => clickSel(page, `.pw-chip:nth-child(${v})`);
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.PeekWindowActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); document.querySelectorAll('.pw-shutter').forEach(s => { s.style.transition = 'none'; }); }, i); }
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1));

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'pw');
      is((await page.evaluate(() => window.PeekWindowActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.n} ${r.p}]`;
        await forceRound(page, ri);
        let v = await view(page);
        is(!v.open && v.pics.length === r.n && v.allCovered, `${tag} the window starts shut: ${r.n} pictures behind the shutters`);
        await wait(300);
        v = await view(page);
        is(v.open && v.noneCovered && v.pics.every(p => p.src === `/image-library-webp/themes/${r.theme}/${r.noun}@2x.webp` && p.nat > 0 && p.w >= 96), `${tag} it opens by itself: ${r.n} library ${r.noun} ≥ 96 px, nothing covered`);
        await wait(650);
        v = await view(page);
        is(!v.open && v.allCovered && v.look && v.lookOn, `${tag} …and shuts again; Look again is there`);
        await clickSel(page, '.pw-look'); v = await view(page);
        is(v.open && !v.lookOn && (await state(page)).looks === 2, `${tag} Look again opens it (second look)`);
        await wait(650);
        is(v.chips === seq(r.max).join(), `${tag} the rail runs 1..${r.max}`);
        const w1 = r.n === r.max ? r.n - 1 : r.n + 1, w2 = r.n === 1 ? 3 : r.n - 1 === w1 ? Math.max(1, r.n - 2) : r.n - 1;
        await chip(page, w1); await clickSel(page, '.lcs-activity-check'); await wait(120);
        v = await view(page);
        const hk = r.p === 'five' ? 'hintFive' : 'hintCount';
        is((await bubble(page)) === STR[hk][loc] && v.open && v.noneCovered && !v.look && v.wrong === w1 - 1 && v.nums.every(x => x === ''), `${tag} ${w1}: "${hk}", the window stays open, no numbers yet`);
        await chip(page, w2); await clickSel(page, '.lcs-activity-check'); await wait(120);
        v = await view(page);
        is((await bubble(page)) === STR.hintCountOn[loc] && v.nums.join() === seq(r.n - 1).concat(['?']).join(), `${tag} ${w2}: the numbers run to a "?" on the last picture`);
        await chip(page, r.n); await clickSel(page, '.lcs-activity-check'); await wait(200);
        v = await view(page);
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { n: r.n }), `${tag} ${r.n} → "${await bubble(page)}"`);
        is(v.nums.join() === seq(r.n).join() && v.gold === r.n - 1, `${tag} done: every picture numbered, the last gold`);
      }
    }
    /* an empty Check is not a miss */
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0); await wait(100);
    await clickSel(page, '.lcs-activity-check'); await wait(100);
    let v = await view(page);
    is((await bubble(page)) === STR.hintNone[loc] && (await state(page)).misses === 0, `[${loc}] an empty Check → hintNone, no miss`);
    /* stays open (plain counting) */
    await setSetting(page, 'look', 'open'); await forceRound(page, 1); await wait(80);
    v = await view(page);
    is(v.open && v.noneCovered && !v.look, `[${loc}] "stays open": the window is open at rest, no Look again`);
    await setSetting(page, 'look', 'quick');
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 1); await wait(900); await chip(page, 6); await clickSel(page, '.lcs-activity-check'); await wait(400); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    await forceRound(page, 1); await wait(300);
    let v = await view(page);
    const m = await page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(); const els = ['.pw-window', '.pw-rail', '.pw-look'].map(s => document.querySelector(s).getBoundingClientRect()); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1) }; });
    is(m.overflow <= 2 && m.inCard, `${tag} nothing spills out of the card`);
    is(v.chipMin >= 44, `${tag} number chips ≥ 44 px (${v.chipMin.toFixed(0)})`);
    is(v.mode === (w >= 600 ? 'wide' : w >= 360 ? 'side' : 'narrow'), `${tag} ${v.mode} layout`);
    const pw = Math.min(...v.pics.map(p => p.w));
    if (w >= 700) is(pw >= 96, `${tag} pictures ≥ 96 px (${pw.toFixed(0)})`);
    else if (w >= 360) is(pw >= 64, `${tag} pictures ≥ 64 px on a phone (${pw.toFixed(0)})`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-open.png`), fullPage: true });
    await wait(700);
    await chip(page, 6); await clickSel(page, '.lcs-activity-check'); await wait(300);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await chip(page, 7); await clickSel(page, '.lcs-activity-check'); await wait(300);
    is(await celebrated(page), `${tag} 6, then 7 → celebrate`);
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-peek-window: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
