#!/usr/bin/env node
/* =====================================================================
   local-test-next-number.js — the interaction gate for ACTIVITY #3, "What
   number comes next?" (K.CC.A.2), the Peek Path. Real pointer, every round
   of both ranges, every locale asked for, the width sweep, the resize
   broadcast. Usage: node scripts/local-test-next-number.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.next-number.k-cc-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'next-number-activity.js')).strings;
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.endsWith('.html')) file = path.join(MINI, path.basename(p));
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
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
  async function open(loc, w, tall) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() === 404 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push('404 ' + r.url()); });
    await page.setViewport({ width: w, height: tall ? 1600 : (w <= 420 ? 740 : 900) });
    await page.goto(`${base}/next-number-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.NextNumberActivity && window.NextNumberActivity.st && document.querySelectorAll('.np-stone').length === window.NextNumberActivity.st.N, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.NextNumberActivity.st; return { n: s.n, N: s.N, open: s.open.slice(), typed: s.typed, done: s.done }; });
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, shown: b.classList.contains('show'), cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  async function clickCenter(page, sel, idx) {
    const box = await page.evaluate((s, i) => { const el = document.querySelectorAll(s)[i]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, idx);
    if (!box) throw new Error('no element ' + sel + '[' + idx + ']');
    await page.mouse.click(box.x, box.y);
  }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.NextNumberActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await wait(120);
  }
  const stoneInfo = (page) => page.evaluate(() => [...document.querySelectorAll('.np-stone')].map(b => ({ v: Number(b.dataset.v), open: b.classList.contains('is-open'), ask: b.classList.contains('is-ask'), here: b.classList.contains('is-here'), done: b.classList.contains('is-done'), locked: b.classList.contains('is-locked'), face: b.firstChild.textContent, w: b.getBoundingClientRect().width, h: b.getBoundingClientRect().height })));
  const typeNum = async (page, v) => { for (const d of String(v)) { await clickCenter(page, `.np-key[data-d="${d}"]`, 0); await wait(30); } };
  const eraseAll = async (page) => { for (let i = 0; i < 2; i++) { await clickCenter(page, '.np-erase', 0); await wait(20); } };
  const puckOn = (page) => page.evaluate(() => { const p = document.querySelector('.np-puck').getBoundingClientRect(); const cx = p.left + p.width / 2; const hit = [...document.querySelectorAll('.np-stone')].find(b => { const r = b.getBoundingClientRect(); return cx >= r.left && cx <= r.right && p.top >= r.top && p.top <= r.bottom + 2; }); return hit ? Number(hit.dataset.v) : null; });
  const check = async (page) => { await clickCenter(page, '.lcs-activity-check', 0); await wait(60); };

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const S = (k) => STR[k][loc];
    const pool = await page.evaluate(() => window.NextNumberActivity._pool.map(r => r.n));
    is(pool.join() === '1,2,3,4,5,6,7,8,9', `[${loc}] pool to 10 = n 1…9 (got ${pool.join(',')})`);
    const ids = await page.evaluate(() => { const t = window.NextNumberActivity, o = []; for (let i = 0; i < 18; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 9).slice().sort().join() === ids.slice(9).slice().sort().join() && ids.slice(0, 9).join() !== ids.slice(9).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    for (let i = 0; i < 9; i++) {
      await forceRound(page, i);
      const st = await state(page);
      const n = st.n, tag = `[${loc} n=${n}]`;
      is((await promptText(page)) === interp(S('prompt'), { n }), `${tag} prompt`);
      let si = await stoneInfo(page);
      is(si.length === 10 && si.every(s => s.w >= 57 && s.h >= 60), `${tag} ten stones ≥ 57×60 at 704 (min ${Math.min(...si.map(s => s.h)).toFixed(0)} tall)`);
      is(si.filter(s => s.open).length === 1 && si[n - 1].open && si[n - 1].here && si[n - 1].face === String(n), `${tag} only ${n} is open, with the counter`);
      is(si[n].ask && si[n].face === '?' && si.filter(s => s.ask).length === 1, `${tag} the question stone is ${n + 1} and shows ?`);
      is(si.filter(s => s.locked).length === 10 - (n + 1) && si.slice(n + 1).every(s => s.locked), `${tag} ${10 - (n + 1)} stones locked after the question`);
      is((await puckOn(page)) === n, `${tag} the counter sits on ${n}`);
      is((await page.evaluate(() => document.querySelectorAll('.np-key').length)) === 11 && (await page.evaluate(() => [...document.querySelectorAll('.np-key')].every(k => k.getBoundingClientRect().height >= 44))), `${tag} 11 keys ≥ 44`);
      /* no digits → the no-answer hint */
      await check(page);
      is((await bubble(page)).text === S('hintNoAnswer') && (await state(page)).open.length === 0, `${tag} Check before writing → hintNoAnswer, nothing revealed`);
      /* a locked stone does not open; the question stone does not open */
      if (n + 2 <= 10) { await clickCenter(page, '.np-stone', n + 1); await wait(40); si = await stoneInfo(page); is(!si[n + 1].open && (await state(page)).open.length === 0, `${tag} a locked stone stays closed`); }
      await clickCenter(page, '.np-stone', n); await wait(40); is((await state(page)).open.length === 0, `${tag} tapping the question stone opens nothing`);
      /* peek: a lid before the counter opens and closes */
      if (n > 1) {
        await clickCenter(page, '.np-stone', 0); await wait(80); si = await stoneInfo(page);
        is(si[0].open && si[0].face === '1' && (await state(page)).open.join() === '1', `${tag} peek opens stone 1`);
        await clickCenter(page, '.np-stone', 0); await wait(80); si = await stoneInfo(page);
        is(!si[0].open && (await state(page)).open.length === 0, `${tag} peek again closes it`);
      }
      /* the named slips, each with the run-up scaffold */
      await typeNum(page, n); si = await stoneInfo(page);
      is(si[n].face === String(n) && (await state(page)).typed === String(n), `${tag} typing echoes on the question stone`);
      await check(page);
      const st2 = await state(page);
      is((await bubble(page)).text === S('hintSame') && st2.open.length === n - 1 && !st2.done, `${tag} same number → hintSame + run-up open (${st2.open.length})`);
      si = await stoneInfo(page); is(si.slice(0, n - 1).every(s => s.open) && si.slice(n + 1).every(s => !s.open), `${tag} the run-up is open, nothing past the question`);
      if (n >= 2) { await eraseAll(page); await typeNum(page, n - 1); await check(page); is((await bubble(page)).text === S('hintBefore'), `${tag} ${n - 1} → hintBefore`); }
      if (n + 2 <= 10) { await eraseAll(page); await typeNum(page, n + 2); await check(page); is((await bubble(page)).text === S('hintFar'), `${tag} ${n + 2} → hintFar`); }
      if (n >= 3) { await eraseAll(page); await typeNum(page, 0); await check(page); is((await bubble(page)).text === S('hintBefore'), `${tag} 0 → hintBefore (any number below ${n})`); }
      /* close the lids free move */
      await clickCenter(page, '.np-close', 0); await wait(60); is((await state(page)).open.length === 0, `${tag} Close the lids clears the run-up`);
      if (SHOT && n === 7) await page.screenshot({ path: path.join(SHOT, `np-${loc}-n7-asked.png`) });
      /* the right answer */
      await eraseAll(page); await typeNum(page, n + 1); si = await stoneInfo(page);
      is(si[n].face === String(n + 1), `${tag} ${n + 1} written on the stone`);
      await check(page); await wait(700);
      const b = await bubble(page), st3 = await state(page);
      is((await celebrated(page)) && b.text === interp(S('celebrate'), { n, m: n + 1 }), `${tag} right → "${interp(S('celebrate'), { n, m: n + 1 })}" (got "${b.text}")`);
      si = await stoneInfo(page);
      is(st3.done && si[n].done && si[n].face === String(n + 1) && !si[n].ask, `${tag} the stone opens with ${n + 1}`);
      is((await puckOn(page)) === n + 1, `${tag} the counter hopped onto ${n + 1}`);
      if (n + 2 <= 10) { await clickCenter(page, '.np-stone', n + 1); await wait(60); is((await state(page)).open.indexOf(n + 2) >= 0, `${tag} after the answer, ${n + 2} may be peeked`); }
      if (SHOT && n === 7) await page.screenshot({ path: path.join(SHOT, `np-${loc}-n7-celebrate.png`) });
      await clickCenter(page, '.lcs-activity-next', 0); await wait(150);
      const st4 = await state(page);
      is(!st4.done && st4.typed === '' && st4.open.length === 0, `${tag} Next clears`);
    }
    /* settings: to 20 → n 9…19 on twenty stones; path shown → the run-up open at setup */
    await page.evaluate(() => { window.NextNumberActivity.api.settings.range = '20'; window.NextNumberActivity.onSettings('range', '20'); }); await wait(200);
    is((await page.evaluate(() => window.NextNumberActivity._pool.map(r => r.n).join())) === '9,10,11,12,13,14,15,16,17,18,19', `[${loc}] to 20 → n 9…19`);
    await forceRound(page, 10); await wait(100);
    let s20 = await state(page); let si20 = await stoneInfo(page);
    is(s20.N === 20 && si20.length === 20 && s20.n === 19 && si20[19].ask, `[${loc}] twenty stones, 19 asks for 20`);
    await typeNum(page, 20); await check(page); await wait(400);
    is((await celebrated(page)) && (await puckOn(page)) === 20, `[${loc}] 19 → 20 celebrates and hops`);
    await page.evaluate(() => { window.NextNumberActivity.api.settings.path = 'shown'; window.NextNumberActivity.onSettings('path', 'shown'); }); await wait(200);
    await forceRound(page, 3); s20 = await state(page); si20 = await stoneInfo(page);
    is(s20.n === 12 && s20.open.length === 11 && si20.slice(0, 11).every(s => s.open) && si20[12].ask, `[${loc}] path shown: 1…11 open under 12, 13 asks`);
    await page.evaluate(() => { window.NextNumberActivity.api.settings.path = 'hidden'; window.NextNumberActivity.api.settings.range = '10'; window.NextNumberActivity.onSettings('range', '10'); }); await wait(200);
    /* the resize broadcast: a ten-stone round, then a twenty-stone round (taller) */
    await forceRound(page, 0); await wait(1300);
    await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
    await page.evaluate(() => { window.NextNumberActivity.api.settings.range = '20'; window.NextNumberActivity.onSettings('range', '20'); }); await wait(1300);
    const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height) }));
    is(rs.sent !== null && Math.abs(rs.sent - rs.app) <= 6, `[${loc}] a taller round broadcasts the card height (sent ${rs.sent}, card ${rs.app})`);
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep: ten stones and twenty stones */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const range of ['10', '20']) {
      await page.evaluate((r) => { window.NextNumberActivity.api.settings.range = r; window.NextNumberActivity.onSettings('range', r); }, range); await wait(150);
      await forceRound(page, 4); await wait(80);
      const m = await page.evaluate(() => {
        const cs = [...document.querySelectorAll('.np-stone')].map(b => b.getBoundingClientRect());
        const ks = [...document.querySelectorAll('.np-key')].map(b => b.getBoundingClientRect());
        const mat = document.querySelector('.np-mat').getBoundingClientRect();
        const puck = document.querySelector('.np-puck').getBoundingClientRect();
        return { n: cs.length, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, minW: Math.min(...cs.map(r => r.width)), minH: Math.min(...cs.map(r => r.height)), minKey: Math.min(...ks.map(r => Math.min(r.width, r.height))), inMat: cs.every(r => r.left >= mat.left - 1 && r.right <= mat.right + 1 && r.top >= mat.top - 1 && r.bottom <= mat.bottom + 1), matIn: mat.right <= window.innerWidth + 1, keysIn: ks.every(r => r.left >= 0 && r.right <= window.innerWidth + 1), puckIn: puck.left >= mat.left && puck.right <= mat.right && puck.bottom <= mat.bottom + 1, rows: new Set(cs.map(r => Math.round(r.top))).size };
      });
      const tag = `[en @${w} to ${range}]`;
      is(m.n === Number(range), `${tag} ${range} stones`);
      is(m.overflow <= 2, `${tag} no horizontal overflow (${m.overflow})`);
      is(m.minW >= 44 && m.minH >= 50, `${tag} stones ≥ 44×50 (got ${m.minW.toFixed(0)}×${m.minH.toFixed(0)})`);
      is(m.minKey >= 44, `${tag} keys ≥ 44 (got ${m.minKey.toFixed(0)})`);
      is(m.inMat && m.matIn && m.keysIn && m.puckIn, `${tag} stones and counter inside the mat, mat and keys inside the viewport`);
      is(m.rows === (w >= 650 ? Number(range) / 10 : Number(range) / 5), `${tag} rows ${m.rows}`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `np-en-${range}-${w}.png`), fullPage: true });
    }
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-next-number: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
