#!/usr/bin/env node
/* =====================================================================
   local-test-roll-book.js — the interaction gate for ACTIVITY #13,
   "Mama's Roll Call" (K.CC.B.5), the Roll Book.
   Real clicks on the raft (one duckling per tap), on a duckling on the
   bank (it swims back), on the number stamps; REAL pointer drags in the mud
   along the digit's strokes (signed only by a drag, never by a seam); the
   shell Check through every slip (too many · too few · unsigned · the wrong
   number · not traced) to done; the numbered bank and card; the "numeral"
   setting; every round of both ranges, every locale asked for, the width
   sweep.
   Usage: node scripts/local-test-roll-book.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'mamas-roll-call.numeral-trace.k-cc-b-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'roll-book-activity.js')).strings;
global.NumberTraceCore = require(path.join(MINI, 'number-trace-core.js')).NumberTraceCore || global.NumberTraceCore;
global.StrokeTraceCore = require(path.join(MINI, 'stroke-trace-core.js')).StrokeTraceCore || global.StrokeTraceCore;
const CORE = require(path.join(MINI, 'roll-book-core.js'));
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
    await page.goto(`${base}/roll-book-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.RollBookActivity && window.RollBookActivity.st && window.RollBookActivity._theme, { timeout: 8000 });
    await page.evaluate(() => { window.RollBookActivity.SWIM_MS = 30; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.RollBookActivity.api.settings[k] = v; window.RollBookActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.RollBookActivity.st; return { id: s.id, n: s.n, bank: s.bank.slice(), digit: s.digit, signed: window.RollBookCore.signed(s), misses: s.misses, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const ducks = [...document.querySelectorAll('.rb-duck')].filter(d => !d.hidden);
    const card = document.querySelector('.rb-card');
    const pic = (el) => { const im = el && el.querySelector('img'); if (!im) return null; const r = im.getBoundingClientRect(); return { src: im.getAttribute('src'), w: r.width, nat: im.naturalWidth }; };
    const rects = ducks.map(d => d.getBoundingClientRect());
    let overlap = false; for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) { const a = rects[i], b = rects[j]; if (a.left < b.right - 2 && b.left < a.right - 2 && a.top < b.bottom - 2 && b.top < a.bottom - 2) overlap = true; }
    const pond = document.querySelector('.rb-pond').getBoundingClientRect();
    return { bank: ducks.length, duckPic: pic(ducks[0]), raftPic: pic(document.querySelector('.rb-raft')), overlap, inPond: rects.every(r => r.left >= pond.left - 1 && r.right <= pond.right + 1 && r.top >= pond.top - 1 && r.bottom <= pond.bottom + 1),
      dots: card.querySelectorAll('.rb-dot').length, cardNum: (card.querySelector('.rb-card-num') || { textContent: '' }).textContent, dotNums: [...card.querySelectorAll('.rb-dot-num')].map(t => t.textContent),
      nums: ducks.map(d => { const n = d.querySelector('.rb-num'); return n.classList.contains('is-on') ? n.textContent : ''; }), gold: ducks.filter(d => d.querySelector('.rb-num').classList.contains('is-gold')).length,
      stamps: [...document.querySelectorAll('.rb-stamp')].filter(b => !b.hidden).map(b => b.textContent).join(','), stampMin: Math.min(...[...document.querySelectorAll('.rb-stamp')].filter(b => !b.hidden).map(b => Math.min(b.getBoundingClientRect().width, b.getBoundingClientRect().height))),
      guides: document.querySelectorAll('.rb-guide').length, ink: document.querySelectorAll('.rb-ink').length, signedFrame: document.querySelector('.rb-mud').classList.contains('is-signed'), mode: ['wide', 'narrow', 'stack'].find(m => document.querySelector('.rb-wrap').classList.contains('is-' + m)) };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickSel(page, sel) { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); await page.mouse.click(c.x, c.y); await wait(70); }
  const send = (page) => clickSel(page, '.rb-raft');
  async function recallFirst(page) { const c = await page.evaluate(() => { const d = [...document.querySelectorAll('.rb-duck')].find(x => !x.hidden); if (!d) return null; d.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = d.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }); if (!c) throw new Error('no duckling on the bank'); await page.mouse.click(c.x, c.y); await wait(70); }
  const stamp = (page, d) => clickSel(page, `.rb-stamp:nth-child(${d})`);
  /* a real finger: drag along each stroke of the stamped digit */
  async function traceDrag(page, reverse) {
    await page.evaluate(() => document.querySelector('.rb-mud').scrollIntoView({ block: 'center', behavior: 'instant' }));
    const strokes = await page.evaluate(() => { const st = window.RollBookActivity.st; const ST = window.RollBookCore._ST(); return window.RollBookCore.glyph(st).map(s => ST.flatten(s, 1)); });
    const box = await page.evaluate(() => { const r = document.querySelector('.rb-mud-svg').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
    for (let s of strokes) { if (reverse) s = s.slice().reverse(); const at = (p) => [box.x + p.x / 100 * box.w, box.y + p.y / 100 * box.h]; await page.mouse.move(...at(s[0])); await page.mouse.down(); for (const p of s) await page.mouse.move(...at(p)); await page.mouse.up(); }
    await wait(80);
  }
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.RollBookActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1));

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to9', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'rb');
      is((await page.evaluate(() => window.RollBookActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to9') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.n}]`;
        await forceRound(page, ri);
        let v = await view(page);
        is(v.dots === r.n && v.cardNum === '' && v.bank === 0 && !!v.raftPic && v.raftPic.src === '/image-library-webp/themes/animals/duck@2x.webp' && v.raftPic.nat > 0, `${tag} Mama's card shows ${r.n} dots, no numeral; the raft carries a library duckling`);
        is(v.stamps === seq(r.max).join() && v.guides === 0, `${tag} stamps 1..${r.max}, the mud empty`);
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)) === STR.hintSend[loc] && (await state(page)).misses === 0, `${tag} an empty Check → "send", no miss`);
        for (let k = 0; k <= r.n; k++) await send(page);
        v = await view(page);
        is(v.bank === r.n + 1 && !v.overlap && v.inPond && v.duckPic.w >= 96, `${tag} ${r.n + 1} taps on the raft → ${r.n + 1} ducklings on the bank, apart, inside the pond, ≥ 96 px (${v.duckPic.w.toFixed(0)})`);
        await clickSel(page, '.lcs-activity-check'); v = await view(page);
        is((await bubble(page)) === STR.hintMore[loc] && v.nums.join() === seq(r.n + 1).join() && v.dotNums.length === 0, `${tag} too many: the hint; the bank numbered, the card not`);
        await recallFirst(page); v = await view(page);
        is(v.bank === r.n && (await state(page)).bank.length === r.n, `${tag} a tap on a duckling sends it back (${r.n} left)`);
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)) === STR.hintSign[loc] && (await state(page)).misses === 1, `${tag} the right number came, not signed → "sign", no new miss`);
        const wrongD = r.n === 1 ? 2 : r.n - 1;
        await stamp(page, wrongD); v = await view(page);
        is(v.guides > 0 && (await state(page)).digit === wrongD, `${tag} the stamp ${wrongD} lays its dotted shape in the mud`);
        await traceDrag(page, true);
        is(!(await state(page)).signed, `${tag} a backwards drag does not sign`);
        await traceDrag(page, false); v = await view(page);
        is((await state(page)).signed && v.signedFrame && v.ink > 0, `${tag} a real drag along the strokes signs the roll`);
        await clickSel(page, '.lcs-activity-check'); v = await view(page);
        is((await bubble(page)) === STR.hintDigit[loc] && (await state(page)).misses === 2 && v.dotNums.join() === seq(r.n).join(), `${tag} signed ${wrongD}: the wrong number named; second miss numbers the card too`);
        await stamp(page, r.n);
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)) === STR.hintTrace[loc], `${tag} the right stamp, not traced → "trace"`);
        await traceDrag(page, false);
        await clickSel(page, '.lcs-activity-check'); await wait(150);
        v = await view(page);
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { n: r.n }) && v.nums.join() === seq(r.n).join() && v.gold === 1, `${tag} done: "${await bubble(page)}", every duckling numbered, the last gold`);
      }
    }
    await setSetting(page, 'range', 'to9'); await setSetting(page, 'call', 'numeral'); await forceRound(page, 1);
    let v = await view(page);
    is(v.cardNum === '7' && v.dots === 0 && (await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.promptNumeral[loc], `[${loc}] "the number" setting: the card shows 7, the prompt says read`);
    await setSetting(page, 'call', 'dots');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.promptDots[loc], `[${loc}] dots: the prompt says count the dots`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 1); for (let k = 0; k < 6; k++) await send(page); await clickSel(page, '.lcs-activity-check'); await wait(300); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    await forceRound(page, 1);
    for (let k = 0; k < 8; k++) await send(page);
    let v = await view(page);
    const m = await page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(); const els = ['.rb-pond', '.rb-mud', '.rb-stamps'].map(s => document.querySelector(s).getBoundingClientRect()); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1) }; });
    is(m.overflow <= 2 && m.inCard, `${tag} nothing spills out of the card`);
    is(!v.overlap && v.inPond, `${tag} eight ducklings apart, inside the pond`);
    is(v.stampMin >= 44, `${tag} stamps ≥ 44 px (${v.stampMin.toFixed(0)})`);
    if (w >= 700) is(v.duckPic.w >= 96, `${tag} ducklings ≥ 96 px (${v.duckPic.w.toFixed(0)})`);
    else if (w >= 360) is(v.duckPic.w >= 64, `${tag} ducklings ≥ 64 px on a phone (${v.duckPic.w.toFixed(0)})`);
    await clickSel(page, '.lcs-activity-check'); await wait(200);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await recallFirst(page); await stamp(page, 7); await traceDrag(page, false);
    await clickSel(page, '.lcs-activity-check'); await wait(250);
    is(await celebrated(page), `${tag} 8, one back, stamp 7, trace → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-roll-book: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
