#!/usr/bin/env node
/* =====================================================================
   local-test-partner-bows.js — the interaction gate for ACTIVITY #17,
   "Which group has more?" (K.CC.C.6), the Partner Bows. Real clicks: a
   pick (gold), a pair (the same bow on both, a colour and a shape), a tap
   on a bowed one (apart again), the "More" buttons and "The same", Check
   through every slip (none · wrong with nothing paired · wrong again → the
   rest paired, the lone ones ringed) to done (every pair bowed, both groups
   numbered); "even" spacing and "up to 5"; every round of both ranges,
   every locale asked for, the width sweep.
   Usage: node scripts/local-test-partner-bows.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.which-more.k-c-c-6';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'partner-bows-activity.js')).strings;
const CORE = require(path.join(MINI, 'partner-bows-core.js'));
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
    await page.goto(`${base}/partner-bows-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.PartnerBowsActivity && window.PartnerBowsActivity.st && Object.keys(window.PartnerBowsActivity._themes).length >= 5, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.PartnerBowsActivity.api.settings[k] = v; window.PartnerBowsActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.PartnerBowsActivity.st; return { a: s.a, b: s.b, pairs: s.pairs.length, pick: s.pick, choice: s.choice, misses: s.misses, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const vis = (el) => !el.hidden && el.offsetParent !== null;
    const side = (sd) => [...document.querySelectorAll('.pb-mat-' + sd + ' .pb-it')].filter(vis);
    const A = side('a'), B = side('b');
    const bowKey = (b) => { const bow = b.querySelector('.pb-bow'); return bow.classList.contains('is-on') ? bow.getAttribute('data-k') : null; };
    const sz = (b) => { const im = b && b.querySelector('img'); return im ? Math.min(im.offsetWidth, im.offsetHeight) : 0; };
    const nums = (els) => els.map(e => { const n = e.querySelector('.pb-num'); return n.classList.contains('is-on') ? n.textContent : ''; });
    const more = [...document.querySelectorAll('.pb-more')].map(m => m.getBoundingClientRect());
    const overMore = (els, k) => els.some(e => { const r = e.getBoundingClientRect(), m = more[k]; const cx = r.left + r.width / 2, cy = r.top + r.height / 2; return cx > m.left && cx < m.right && cy > m.top && cy < m.bottom; });
    let minD = Infinity; for (const g of [A, B]) { const c = g.map(e => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) minD = Math.min(minD, Math.hypot(c[i][0] - c[j][0], c[i][1] - c[j][1])); }
    return { na: A.length, nb: B.length, srcA: A[0] && A[0].querySelector('img') ? A[0].querySelector('img').getAttribute('src') : '', srcB: B[0] && B[0].querySelector('img') ? B[0].querySelector('img').getAttribute('src') : '',
      size: Math.min(sz(A[0]), sz(B[0])), dia: A[0] ? A[0].offsetWidth : 0, minD,
      bowsA: A.map(bowKey), bowsB: B.map(bowKey), picked: [...A, ...B].filter(e => e.classList.contains('is-picked')).length,
      loneA: A.filter(e => e.classList.contains('is-lone')).length, loneB: B.filter(e => e.classList.contains('is-lone')).length,
      numsA: nums(A).filter(Boolean).sort((x, y) => x - y).join(), numsB: nums(B).filter(Boolean).sort((x, y) => x - y).join(),
      moreOn: [...document.querySelectorAll('.pb-more')].map(m => m.classList.contains('is-on') && m.getAttribute('aria-pressed') === 'true'), sameOn: document.querySelector('.pb-same').classList.contains('is-on'),
      moreText: document.querySelector('.pb-more').textContent, sameText: document.querySelector('.pb-same').textContent, moreAria: [...document.querySelectorAll('.pb-more')].map(m => m.getAttribute('aria-label')),
      itemAria: A[0] ? A[0].getAttribute('aria-label') : '', overMore: overMore(A, 0) || overMore(B, 1) };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(70);
  }
  const check = (page) => clickEl(page, '.lcs-activity-check');
  const answerSel = (ans) => ans === 'a' ? ['.pb-mat-a .pb-more', 0] : ans === 'b' ? ['.pb-mat-b .pb-more', 0] : ['.pb-same', 0];
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.PartnerBowsActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1)).join();

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'pb');
      is((await page.evaluate(() => window.PartnerBowsActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.a}/${r.b}]`, wrong = r.answer === 'same' ? 'a' : 'same';
        await forceRound(page, ri);
        let v = await view(page);
        is(v.na === r.a && v.nb === r.b && v.srcA === `/image-library-webp/themes/${r.kind.aTheme}/${r.kind.a}@2x.webp` && v.srcB === `/image-library-webp/themes/${r.kind.bTheme}/${r.kind.b}@2x.webp`, `${tag} ${r.a} ${r.kind.a}s on top, ${r.b} ${r.kind.b}s below`);
        is(v.size >= 96 && v.minD >= 0.95 * v.dia && !v.overMore, `${tag} pictures ≥ 96 px, apart, none under a "More" button (${v.size}, ${(v.minD / v.dia).toFixed(2)})`);
        is(v.moreText === STR.moreBtn[loc] && v.sameText === STR.sameBtn[loc] && v.moreAria.join('|') === [STR.moreTopAria[loc], STR.moreBottomAria[loc]].join('|') && v.itemAria === STR.pairAria[loc], `${tag} the buttons and labels`);
        await check(page);
        is((await bubble(page)) === STR.hintStart[loc] && (await state(page)).misses === 0, `${tag} no answer → start hint, no miss`);
        await clickEl(page, '.pb-mat-a .pb-it', 0); v = await view(page);
        is(v.picked === 1 && (await state(page)).pick !== null, `${tag} a tap picks (gold)`);
        await clickEl(page, '.pb-mat-b .pb-it', 0); v = await view(page);
        is(v.picked === 0 && v.bowsA[0] === '0' && v.bowsB[0] === '0' && (await state(page)).pairs === 1, `${tag} a tap below → a pair, the same bow on both`);
        await clickEl(page, '.pb-mat-b .pb-it', 0); v = await view(page);
        is(v.bowsA[0] === null && v.bowsB[0] === null && (await state(page)).pairs === 0, `${tag} a tap on a bowed one → apart again`);
        await clickEl(page, answerSel(wrong)[0]); await check(page);
        is((await bubble(page)) === STR.hintPair[loc] && (await state(page)).misses === 1 && (await state(page)).pairs === 0, `${tag} wrong, nothing paired → "pair them up", nothing paired for the child`);
        await clickEl(page, answerSel(wrong)[0]); await check(page); v = await view(page);
        const min = Math.min(r.a, r.b), tiedKey = r.answer === 'same' ? 'hintTiedSame' : 'hintTied';
        is((await bubble(page)) === STR[tiedKey][loc] && (await state(page)).pairs === min && v.loneA === r.a - min && v.loneB === r.b - min, `${tag} wrong again → the rest paired (${min}), ${Math.abs(r.a - r.b)} ringed`);
        is(new Set(v.bowsA.filter(x => x !== null)).size === min && v.bowsA.filter(x => x !== null).sort().join() === v.bowsB.filter(x => x !== null).sort().join(), `${tag} every bow appears exactly once in each group`);
        await clickEl(page, answerSel(r.answer)[0]); v = await view(page);
        is(v.loneA === 0 && v.loneB === 0 && (r.answer === 'same' ? v.sameOn : v.moreOn[r.answer === 'a' ? 0 : 1]), `${tag} a new answer takes the rings away until Check`);
        await check(page); await wait(120); v = await view(page);
        const want = r.answer === 'same' ? interp(STR.celebrateSame[loc], { a: r.a }) : interp(STR.celebrateMore[loc], { m: Math.max(r.a, r.b), f: Math.min(r.a, r.b) });
        is(await celebrated(page) && (await bubble(page)) === want && v.numsA === seq(r.a) && v.numsB === seq(r.b) && v.loneA === r.a - min && v.loneB === r.b - min, `${tag} done: "${await bubble(page)}", both groups numbered, the extra ones ringed`);
      }
    }
    /* even spacing; a right first answer */
    await setSetting(page, 'range', 'to10'); await setSetting(page, 'spacing', 'even');
    is((await page.evaluate(() => window.PartnerBowsActivity._pool.every(r => r.trick === ''))), `[${loc}] "even": no round tricked`);
    await forceRound(page, 0); await clickEl(page, '.pb-mat-b .pb-more'); await check(page); await wait(120);
    is(await celebrated(page) && (await state(page)).pairs === 6, `[${loc}] right at the first try: celebrate, every pair bowed`);
    await setSetting(page, 'spacing', 'tricky');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 0); await clickEl(page, '.pb-mat-a .pb-it', 0); await clickEl(page, '.pb-mat-b .pb-it', 3); await clickEl(page, '.pb-mat-a .pb-it', 2); await clickEl(page, '.pb-mat-b .pb-it', 5); await clickEl(page, '.pb-mat-a .pb-more'); await check(page); await check(page); await wait(250); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    for (const ri of [6, 1, 4]) {   /* 10 against 7, 7 against 7, 4 against 9 */
      await forceRound(page, ri);
      const r = CORE.rounds('to10', 'pb')[ri], tg = `${tag} #${ri} ${r.a}/${r.b}`;
      const m = await page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(); const els = ['.pb-mat-a', '.pb-mat-b', '.pb-seam'].map(s => document.querySelector(s).getBoundingClientRect()); const taps = [...document.querySelectorAll('.pb-it,.pb-more,.pb-same')].filter(e => !e.hidden && e.offsetParent !== null).map(e => Math.min(e.offsetWidth, e.offsetHeight)); const ck = document.querySelector('.lcs-activity-check').getBoundingClientRect(); const more = document.querySelector('.pb-more'); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tapMin: Math.min(...taps), checkBottom: ck.bottom + window.scrollY, vh: window.innerHeight, moreFits: more.scrollWidth <= more.clientWidth + 1 }; });
      const v = await view(page);
      is(m.overflow <= 2 && m.inCard && m.tapMin >= 44 && m.checkBottom <= m.vh && m.moreFits, `${tg} inside the card, taps ≥ 44 (${m.tapMin}), Check above the fold (${m.checkBottom.toFixed(0)} ≤ ${m.vh}), "More" fits its button`);
      is(v.minD >= 0.95 * v.dia && !v.overMore, `${tg} apart, none under a "More" button`);
      if (w >= 700) is(v.size >= 96, `${tg} ≥ 96 px (${v.size})`); else if (w >= 360) is(v.size >= 64, `${tg} ≥ 64 px on a phone (${v.size})`);
    }
    await forceRound(page, 6);
    for (let k = 0; k < 3; k++) { await clickEl(page, '.pb-mat-a .pb-it', k); await clickEl(page, '.pb-mat-b .pb-it', k); }
    await clickEl(page, '.pb-same'); await check(page); await check(page); await wait(250);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await clickEl(page, '.pb-mat-a .pb-more'); await check(page); await wait(250);
    is(await celebrated(page), `${tag} 10 against 7 → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-partner-bows: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
