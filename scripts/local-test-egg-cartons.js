#!/usr/bin/env node
/* =====================================================================
   local-test-egg-cartons.js — the interaction gate for ACTIVITY #2, "Count
   by tens" (K.CC.A.1), the Ten-Shelf. Real pointer, every round of both
   kinds, every locale asked for, the width sweep, the resize broadcast.
   Usage: node scripts/local-test-egg-cartons.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'posy-egg-cartons.count-tens.k-cc-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'egg-cartons-activity.js')).strings;
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
    await page.goto(`${base}/egg-cartons-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.EggCartonsActivity && window.EggCartonsActivity.st && document.querySelectorAll('.ec-carton').length === (window.EggCartonsActivity.st.kind === 'pack' ? window.EggCartonsActivity.st.packed : window.EggCartonsActivity.st.tens), { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.EggCartonsActivity.st; return { kind: s.kind, tens: s.tens, tags: s.tags.slice(), packed: s.packed, answer: s.answer }; });
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, shown: b.classList.contains('show'), cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  async function clickCenter(page, sel, idx) {
    const box = await page.evaluate((s, i) => { const el = document.querySelectorAll(s)[i]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, idx);
    if (!box) throw new Error('no element ' + sel + '[' + idx + ']');
    await page.mouse.click(box.x, box.y);
  }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.EggCartonsActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await wait(120);
  }
  const labels = (page) => page.evaluate(() => [...document.querySelectorAll('.ec-carton')].map(b => b.querySelector('.ec-tag').textContent));

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const S = (k) => STR[k][loc];
    const pool = await page.evaluate(() => window.EggCartonsActivity._pool.map(r => r.kind[0] + r.tens));
    is(pool.length === 18 && pool.filter(x => x[0] === 'c').length === 9 && pool.filter(x => x[0] === 'p').length === 9, `[${loc}] pool = 9 count + 9 pack rounds (got ${pool.join(',')})`);
    const ids = await page.evaluate(() => { const t = window.EggCartonsActivity, o = []; for (let i = 0; i < 36; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 18).slice().sort().join() === ids.slice(18).slice().sort().join() && ids.slice(0, 18).join() !== ids.slice(18).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    for (let i = 0; i < 18; i++) {
      await forceRound(page, i);
      const st = await state(page);
      const tag = `[${loc} ${st.kind} ${st.tens}]`;
      if (st.kind === 'count') {
        const k = st.tens;
        is((await promptText(page)) === S('promptCount'), `${tag} prompt`);
        const boxes = await page.evaluate(() => [...document.querySelectorAll('.ec-carton')].map(b => { const r = b.getBoundingClientRect(); return { w: r.width, h: r.height }; }));
        is(boxes.length === k && boxes.every(b => b.w >= 60 && b.h >= 44), `${tag} ${boxes.length} cartons ≥ 60×44 (min ${Math.min(...boxes.map(b => b.h)).toFixed(0)} tall)`);
        is((await page.evaluate(() => document.querySelectorAll('.ec-numrow').length)) === 1 && (await page.evaluate(() => document.querySelectorAll('.ec-num').length)) === 10, `${tag} rail 10…100 in one row at 704`);
        await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
        is((await bubble(page)).text === S('hintUntagged'), `${tag} Check before tagging → hintUntagged`);
        const order = [...Array(k).keys()].sort((a, c) => ((a * 7 + 3) % k) - ((c * 7 + 3) % k));
        for (let j = 0; j < k; j++) {
          await clickCenter(page, '.ec-carton', order[j]); await wait(30);
          const L = await labels(page);
          is(L[order[j]] === String(10 * (j + 1)), `${tag} tap ${j + 1} → carton wears ${10 * (j + 1)} (got ${L[order[j]]})`);
          if (j === 0) { await clickCenter(page, '.ec-carton', order[0]); await wait(30); is((await state(page)).tags.length === 1, `${tag} a second tap is refused`); }
        }
        is((await page.evaluate(() => document.querySelector('.ec-rail').classList.contains('ec-ready') && !document.querySelector('.ec-carton.is-last'))), `${tag} rail ready, no glowing tag before Check`);
        if (SHOT && k === 7) await page.screenshot({ path: path.join(SHOT, `ec-${loc}-count7-tagged.png`) });
        await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
        is((await bubble(page)).text === S('hintNoAnswer'), `${tag} tagged, no numeral → hintNoAnswer`);
        const wrong = k === 10 ? 90 : 10 * k + 10;
        await page.evaluate((v) => [...document.querySelectorAll('.ec-num')].find(b => b.dataset.v === String(v)).click(), wrong); await wait(30);
        await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
        is((await bubble(page)).text === S('hintWrong') && (await page.evaluate(() => !!document.querySelector('.ec-carton.is-last'))), `${tag} wrong numeral → hintWrong + last tag glows`);
        await page.evaluate(() => [...document.querySelectorAll('.ec-num')].find(b => b.dataset.v === '10').click()); await clickCenter(page, '.lcs-activity-check', 0); await wait(50); is((await bubble(page)).text === S('hintOnes'), `${tag} "10" for ${k} cartons → the by-ones hint`);
        await page.evaluate((v) => [...document.querySelectorAll('.ec-num')].find(b => b.dataset.v === String(v)).click(), 10 * k); await wait(30);
        await clickCenter(page, '.lcs-activity-check', 0); await wait(120);
        const b = await bubble(page);
        is((await celebrated(page)) && b.text === interp(S('celebrateCount'), { n: 10 * k }), `${tag} right → "${interp(S('celebrateCount'), { n: 10 * k })}" (got "${b.text}")`);
        if (SHOT && k === 7) await page.screenshot({ path: path.join(SHOT, `ec-${loc}-count7-celebrate.png`) });
        await clickCenter(page, '.lcs-activity-next', 0); await wait(120);
        is((await state(page)).tags.length === 0, `${tag} Next clears`);
      } else {
        const t = st.tens;
        is((await promptText(page)) === interp(S('promptPack'), { n: 10 * t, k: t }), `${tag} prompt`);
        is((await page.evaluate(() => document.querySelectorAll('.ec-carton').length === 0 && !!document.querySelector('.ec-add') && document.querySelector('.ec-add').getBoundingClientRect().height >= 44)), `${tag} empty shelf + a crate button ≥ 44`);
        await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
        is((await bubble(page)).text === S('hintShort'), `${tag} Check on the empty shelf → hintShort`);
        for (let j = 1; j <= t; j++) { await clickCenter(page, '.ec-add', 0); await wait(40); const L = await labels(page); is(L.length === j && L[j - 1] === String(10 * j), `${tag} add ${j} → last carton wears ${10 * j}`); }
        if (t < 10) {
          await clickCenter(page, '.ec-add', 0); await wait(40);
          await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
          is((await bubble(page)).text === S('hintOver') && (await state(page)).packed === t + 1, `${tag} one too many → hintOver`);
          await clickCenter(page, '.ec-carton', 0); await wait(40);
          is((await state(page)).packed === t && (await labels(page)).length === t, `${tag} tapping a carton takes the last one off`);
        } else {
          await clickCenter(page, '.ec-add', 0); await wait(40);
          is((await state(page)).packed === 10, `${tag} the shelf caps at ten cartons`);
        }
        if (SHOT && t === 7) await page.screenshot({ path: path.join(SHOT, `ec-${loc}-pack7.png`) });
        await clickCenter(page, '.lcs-activity-check', 0); await wait(120);
        const b = await bubble(page);
        is((await celebrated(page)) && b.text === interp(S('celebratePack'), { n: 10 * t, k: t }), `${tag} exact → "${interp(S('celebratePack'), { n: 10 * t, k: t })}" (got "${b.text}")`);
        await clickCenter(page, '.lcs-activity-next', 0); await wait(120);
      }
    }
    /* settings: range 50 halves the pool; kind=pack serves only pack rounds */
    await page.evaluate(() => { window.EggCartonsActivity.api.settings.range = '50'; window.EggCartonsActivity.onSettings('range', '50'); }); await wait(150);
    is((await page.evaluate(() => window.EggCartonsActivity._pool.map(r => r.kind[0] + r.tens).join())) === 'c2,c3,c4,c5,p2,p3,p4,p5', `[${loc}] range 50 → 2..5 both kinds`);
    await page.evaluate(() => { window.EggCartonsActivity.api.settings.kind = 'pack'; window.EggCartonsActivity.onSettings('kind', 'pack'); }); await wait(150);
    is((await page.evaluate(() => window.EggCartonsActivity._pool.every(r => r.kind === 'pack'))), `[${loc}] kind=pack serves only pack rounds`);
    await page.evaluate(() => { window.EggCartonsActivity.api.settings.kind = 'both'; window.EggCartonsActivity.api.settings.range = '100'; window.EggCartonsActivity.onSettings('range', '100'); }); await wait(150);
    /* the resize broadcast after a round change */
    /* start from a SHORT round so the next change really changes the height (the shell
       suppresses a re-broadcast of the same height, by design) */
    await forceRound(page, 0); await wait(1300);
    await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
    await forceRound(page, 8); await wait(1300);
    const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height) }));
    is(rs.sent !== null && Math.abs(rs.sent - rs.app) <= 6, `[${loc}] a round change broadcasts the card height (sent ${rs.sent}, card ${rs.app})`);
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep: ten cartons (count) and ten packed */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const i of [8, 17, 0]) {
      await forceRound(page, i);
      const st = await state(page);
      if (st.kind === 'pack') for (let j = 0; j < st.tens; j++) await page.evaluate(() => document.querySelector('.ec-add').click());
      await wait(80);
      const m = await page.evaluate(() => {
        const cs = [...document.querySelectorAll('.ec-carton')].map(b => b.getBoundingClientRect());
        const chips = [...document.querySelectorAll('.ec-num,.ec-add,.ec-tool')].map(b => b.getBoundingClientRect());
        const mat = document.querySelector('.ec-mat').getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, minW: Math.min(...cs.map(r => r.width), 9999), minH: Math.min(...cs.map(r => r.height), 9999), minTap: Math.min(...chips.map(r => Math.min(r.width, r.height)), 9999), inMat: cs.every(r => r.left >= mat.left - 1 && r.right <= mat.right + 1 && r.top >= mat.top - 1 && r.bottom <= mat.bottom + 1), matIn: mat.right <= window.innerWidth + 1 };
      });
      const tag = `[en @${w} ${st.kind} ${st.tens}]`;
      is(m.overflow <= 2, `${tag} no horizontal overflow (${m.overflow})`);
      is(m.minW >= 60 && m.minH >= 44, `${tag} cartons ≥ 60×44 (got ${m.minW.toFixed(0)}×${m.minH.toFixed(0)})`);
      is(m.minTap >= 44, `${tag} controls ≥ 44 (got ${m.minTap.toFixed(0)})`);
      is(m.inMat && m.matIn, `${tag} cartons inside the mat, mat inside the viewport`);
      if (SHOT && i === 8) await page.screenshot({ path: path.join(SHOT, `ec-en-10-${w}.png`), fullPage: true });
    }
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-egg-cartons: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
