#!/usr/bin/env node
/* =====================================================================
   local-test-treat-box.js — the interaction gate for ACTIVITY #14,
   "Feed Mochi — count out treats" (K.CC.B.5), the Treat Box.
   Real clicks on the tray (one treat into the box per tap), on the lid (a
   peek that drops again by itself), on a treat inside the open box (it goes
   back to the tray), on Empty the box; the shell Check through every slip
   (empty · too many · too few) to done; the lid shut while counting and
   off after a miss; numbers + marks after the second miss; the "lid off"
   and "up to 5" settings; every round of both ranges, every locale asked
   for, the width sweep.
   Usage: node scripts/local-test-treat-box.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'mochi-feast.count-out.k-cc-b-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'treat-box-activity.js')).strings;
const CORE = require(path.join(MINI, 'treat-box-core.js'));
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
    await page.goto(`${base}/treat-box-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TreatBoxActivity && window.TreatBoxActivity.st && window.TreatBoxActivity._theme, { timeout: 8000 });
    await page.evaluate(() => { window.TreatBoxActivity.FLY_MS = 30; window.TreatBoxActivity.PEEK_MS = 1200; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.TreatBoxActivity.api.settings[k] = v; window.TreatBoxActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.TreatBoxActivity.st; return { id: s.id, n: s.n, noun: s.noun, box: s.box.slice(), misses: s.misses, peeks: s.peeks, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const vis = (el) => !el.hidden && el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden';
    const tray = [...document.querySelectorAll('.tb-treat')].filter(vis);
    const inside = [...document.querySelectorAll('.tb-in')].filter(vis);
    const places = [...document.querySelectorAll('.tb-place')].filter(p => !p.hidden);
    const lid = document.querySelector('.tb-lid'), lr = lid.getBoundingClientRect(), lcs = getComputedStyle(lid);
    const pic = (el) => { const im = el && el.querySelector('img'); if (!im) return null; const r = im.getBoundingClientRect(); return { src: im.getAttribute('src'), w: Math.min(r.width, r.height), nat: im.naturalWidth }; };
    const rects = tray.map(d => d.getBoundingClientRect());
    let overlap = 0; for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) { const a = rects[i], b = rects[j]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 0 && oy > 0) overlap = Math.max(overlap, Math.min(ox, oy) / Math.min(a.width, a.height)); }
    const tr = document.querySelector('.tb-tray').getBoundingClientRect();
    return { tray: tray.length, inside: inside.length, places: places.length, trayPic: pic(tray[0]), insidePic: pic(inside[0]), overlap, inTray: rects.every(r => r.left >= tr.left - 6 && r.right <= tr.right + 6 && r.top >= tr.top - 6 && r.bottom <= tr.bottom + 6),
      lidShut: lcs.display !== 'none' && !document.querySelector('.tb-wrap').classList.contains('is-open'), lidH: lr.height, lidOp: +lcs.opacity, ticket: document.querySelector('.tb-ticket').textContent, ticketAria: document.querySelector('.tb-ticket').getAttribute('aria-label'),
      nums: inside.map(d => { const n = d.querySelector('.tb-num'); return n.classList.contains('is-on') ? n.textContent : ''; }), gold: inside.filter(d => d.querySelector('.tb-num').classList.contains('is-gold')).length,
      extra: places.map((p, j) => p.classList.contains('is-extra') ? j : -1).filter(j => j >= 0).join(), need: places.map((p, j) => p.classList.contains('is-need') ? j : -1).filter(j => j >= 0).join(),
      emptyBtn: getComputedStyle(document.querySelector('.tb-empty')).visibility !== 'hidden', mode: ['wide', 'narrow', 'stack'].find(m => document.querySelector('.tb-wrap').classList.contains('is-' + m)) };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(70);
  }
  const putOne = (page) => clickEl(page, '.tb-treat', 0);
  const check = (page) => clickEl(page, '.lcs-activity-check');
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.TreatBoxActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1));

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'tb');
      is((await page.evaluate(() => window.TreatBoxActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.n}]`;
        await forceRound(page, ri);
        let v = await view(page);
        is(v.tray === r.tray && v.places === r.slots && v.inside === 0 && v.lidShut && v.ticket === String(r.n) && v.ticketAria === interp(STR.ticketLabel[loc], { n: r.n }), `${tag} ticket ${r.n}; ${r.tray} treats on the tray; a shut box of ${r.slots} places`);
        is(!!v.trayPic && v.trayPic.src === `/image-library-webp/themes/desserts and sweets/${r.noun}@2x.webp` && v.trayPic.nat > 0 && v.trayPic.w >= 96 && v.overlap < 0.12 && v.inTray, `${tag} the tray carries library ${r.noun}s ≥ 96 px, apart, inside the tray (${v.trayPic && v.trayPic.w.toFixed(0)}, overlap ${v.overlap.toFixed(2)})`);
        await check(page);
        is((await bubble(page)) === STR.hintStart[loc] && (await state(page)).misses === 0 && (await view(page)).lidShut, `${tag} an empty Check → "start", no miss, the lid stays on`);
        for (let k = 0; k <= r.n; k++) await putOne(page);
        v = await view(page);
        is((await state(page)).box.length === r.n + 1 && v.tray === r.tray - r.n - 1 && v.inside === 0 && v.lidShut, `${tag} ${r.n + 1} taps → ${r.n + 1} treats in the box, out of sight under the lid`);
        await check(page); v = await view(page);
        is((await bubble(page)) === STR.hintMore[loc] && (await state(page)).misses === 1 && !v.lidShut && v.inside === r.n + 1 && v.nums.every(x => x === '') && v.extra === '', `${tag} too many: the hint; the lid comes off, ${r.n + 1} inside, no numbers yet`);
        is(v.insidePic && v.insidePic.w >= 96, `${tag} the treats inside are ≥ 96 px (${v.insidePic && v.insidePic.w.toFixed(0)})`);
        await clickEl(page, '.tb-in', 0); await clickEl(page, '.tb-in', 0); v = await view(page);
        is((await state(page)).box.length === r.n - 1 && v.inside === r.n - 1 && v.tray === r.tray - r.n + 1, `${tag} two taps inside → two treats back on the tray`);
        if (r.n > 1) {
          await check(page); v = await view(page);
          is((await bubble(page)) === STR.hintFewer[loc] && (await state(page)).misses === 2 && v.nums.join() === seq(r.n - 1).join() && v.need === String(r.n - 1), `${tag} too few: the hint; second miss numbers the box and marks the place still needed`);
        }
        await putOne(page);
        await check(page); await wait(120); v = await view(page);
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { n: r.n }) && v.nums.join() === seq(r.n).join() && v.gold === 1 && v.extra === '' && v.need === '', `${tag} done: "${await bubble(page)}", every treat numbered, the last gold`);
      }
    }
    /* the peek and Empty the box */
    await setSetting(page, 'range', 'to10'); await forceRound(page, 0);
    await putOne(page); await putOne(page); await putOne(page);
    let v = await view(page);
    is(v.lidShut && v.inside === 0 && v.emptyBtn, `[${loc}] three in, the lid shut, Empty offered`);
    await clickEl(page, '.tb-lid'); v = await view(page);
    is(!v.lidShut && v.inside === 3 && (await state(page)).peeks === 1, `[${loc}] a tap on the lid: a peek — three inside`);
    await wait(380); v = await view(page);
    is(!v.lidShut && v.lidOp < 0.1, `[${loc}] while the peek lasts the lid is folded away (rendered opacity ${v.lidOp})`);
    await wait(1300); v = await view(page);
    is(v.lidShut && v.inside === 0 && v.lidOp > 0.95 && v.lidH > 100, `[${loc}] the peek ends by itself: the lid drops back over the box (rendered ${v.lidOp}, ${v.lidH.toFixed(0)} px)`);
    await clickEl(page, '.tb-empty'); v = await view(page);
    is((await state(page)).box.length === 0 && v.tray === 12 && !v.emptyBtn, `[${loc}] Empty the box: every treat back on the tray`);
    /* lid off */
    await setSetting(page, 'lid', 'off'); await forceRound(page, 0);
    await putOne(page); await putOne(page); v = await view(page);
    is(!v.lidShut && v.inside === 2, `[${loc}] lid off: the treats stay in sight`);
    await setSetting(page, 'lid', 'on');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 0); for (let k = 0; k < 8; k++) await putOne(page); await check(page); await check(page); await wait(300); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    await forceRound(page, 0);
    let v = await view(page);
    const m = await page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(); const els = ['.tb-box', '.tb-tray', '.tb-head'].map(s => document.querySelector(s).getBoundingClientRect()); const taps = [...document.querySelectorAll('.tb-treat,.tb-ticket,.tb-lid')].filter(e => !e.hidden).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height)); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tapMin: Math.min(...taps) }; });
    is(m.overflow <= 2 && m.inCard, `${tag} nothing spills out of the card`);
    is(m.tapMin >= 44, `${tag} treats, ticket and lid ≥ 44 px (${m.tapMin.toFixed(0)})`);
    is(v.overlap < 0.12 && v.inTray, `${tag} the heap lies apart, inside the tray`);
    if (w >= 700) is(v.trayPic.w >= 96, `${tag} treats ≥ 96 px (${v.trayPic.w.toFixed(0)})`);
    else if (w >= 360) is(v.trayPic.w >= 64, `${tag} treats ≥ 64 px on a phone (${v.trayPic.w.toFixed(0)})`);
    for (let k = 0; k < 8; k++) await putOne(page);
    await check(page); await wait(200);
    v = await view(page);
    if (w >= 700) is(v.insidePic.w >= 96, `${tag} open box: treats ≥ 96 px (${v.insidePic.w.toFixed(0)})`);
    else if (w >= 360) is(v.insidePic.w >= 64, `${tag} open box: treats ≥ 64 px on a phone (${v.insidePic.w.toFixed(0)})`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await clickEl(page, '.tb-in', 0);
    await check(page); await wait(250);
    is(await celebrated(page), `${tag} 8 for 7, one back → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-treat-box: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
