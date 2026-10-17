#!/usr/bin/env node
/* =====================================================================
   local-test-fair-share.js — the interaction gate for ACTIVITY #18, "The
   Friendship Bridge" (K.CC.C.6). Real clicks: Check before judging, a
   wrong judgment (shake, no miss), the right one (the "More" tag, the toys
   come alive), toys sent across the bridge (one at a time, either way),
   Check through every slip (not the same yet → the plate with more named,
   both plates numbered; again → one toy lit) to done (fair: n and n, both
   numbered); the "same" rounds; "in rows" and "up to 5"; every round of
   both ranges, every locale asked for, the width sweep.
   Usage: node scripts/local-test-fair-share.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'friendship-bridge.compare-balance.k-cc-c-6';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'fair-share-activity.js')).strings;
const CORE = require(path.join(MINI, 'fair-share-core.js'));
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
    await page.goto(`${base}/fair-share-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FairShareActivity && window.FairShareActivity.st && window.FairShareActivity._theme, { timeout: 8000 });
    await page.evaluate(() => { window.FairShareActivity.WALK_MS = 20; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.FairShareActivity.api.settings[k] = v; window.FairShareActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.FairShareActivity.st; return { a: s.plates.a.length, b: s.plates.b.length, phase: s.phase, judged: s.judged, judgeMisses: s.judgeMisses, misses: s.misses, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const vis = (el) => !el.hidden && el.offsetParent !== null;
    const side = (sd) => [...document.querySelectorAll('.fs-plate-' + sd + ' .fs-toy')].filter(vis);
    const A = side('a'), B = side('b');
    const sz = (b) => { const im = b && b.querySelector('img'); return im ? Math.min(im.offsetWidth, im.offsetHeight) : 0; };
    const nums = (els) => els.map(e => { const n = e.querySelector('.fs-num'); return n.classList.contains('is-on') ? n.textContent : ''; }).filter(Boolean).sort((x, y) => x - y).join();
    let minD = Infinity; for (const g of [A, B]) { const c = g.map(e => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) minD = Math.min(minD, Math.hypot(c[i][0] - c[j][0], c[i][1] - c[j][1])); }
    const plateBox = (sd) => document.querySelector('.fs-plate-' + sd).getBoundingClientRect();
    const inside = (els, sd) => { const p = plateBox(sd); return els.every(e => { const r = e.getBoundingClientRect(), w = e.offsetWidth, cx = r.left + r.width / 2, cy = r.top + r.height / 2; return cx - w / 2 >= p.left - 2 && cx + w / 2 <= p.right + 2 && cy - w / 2 >= p.top - 2 && cy + w / 2 <= p.bottom + 2; }); };
    return { na: A.length, nb: B.length, src: A[0] && A[0].querySelector('img') ? A[0].querySelector('img').getAttribute('src') : '', size: Math.min(sz(A[0]), sz(B[0] || A[0])), dia: A[0] ? A[0].offsetWidth : 0, minD,
      inside: inside(A, 'a') && inside(B, 'b'), toysOn: A.concat(B).every(b => !b.disabled), toysOff: A.concat(B).every(b => b.disabled),
      picksShown: [...document.querySelectorAll('.fs-pick')].every(vis), picksHidden: [...document.querySelectorAll('.fs-pick')].every(p => p.hidden),
      tagA: getComputedStyle(document.querySelector('.fs-plate-a .fs-tag')).display !== 'none', tagB: getComputedStyle(document.querySelector('.fs-plate-b .fs-tag')).display !== 'none',
      sameShown: getComputedStyle(document.querySelector('.fs-same')).display !== 'none', sameOn: document.querySelector('.fs-same').classList.contains('is-on'), sameText: document.querySelector('.fs-same').textContent,
      numsA: nums(A), numsB: nums(B), suggest: A.concat(B).filter(e => e.classList.contains('is-suggest')).length,
      pickAria: [...document.querySelectorAll('.fs-pick')].map(p => p.getAttribute('aria-label')), toyAria: A[0] ? A[0].getAttribute('aria-label') : '', tagText: document.querySelector('.fs-tag').textContent };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).display !== 'none'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(90);
  }
  const check = (page) => clickEl(page, '.lcs-activity-check');
  const judgeSel = (c) => c === 'a' ? '.fs-plate-a .fs-pick' : c === 'b' ? '.fs-plate-b .fs-pick' : '.fs-same';
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.FairShareActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const sendFrom = (page, sd) => clickEl(page, '.fs-plate-' + sd + ' .fs-toy', 0);
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1)).join();

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'fs');
      is((await page.evaluate(() => window.FairShareActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 2];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.a}/${r.b}]`, wrong = r.answer === 'same' ? 'a' : 'same';
        await forceRound(page, ri);
        let v = await view(page);
        is(v.na === r.a && v.nb === r.b && v.src === `/image-library-webp/themes/toys/${r.noun}@2x.webp` && v.size >= 96 && v.minD >= 0.94 * v.dia && v.inside, `${tag} ${r.a} and ${r.b} ${r.noun}s, ≥ 96 px, apart, on their plates (${v.size})`);
        is(v.picksShown && v.toysOff && v.sameShown && v.sameText === STR.sameBtn[loc] && v.pickAria.join('|') === [STR.topPick[loc], STR.bottomPick[loc]].join('|') && v.toyAria === STR.toyAria[loc], `${tag} step 1: the plates and "The same" are the answers; the toys wait`);
        await check(page);
        is((await bubble(page)) === STR.hintJudge[loc] && (await state(page)).misses === 0, `${tag} Check before judging → "which plate first", no miss`);
        await clickEl(page, judgeSel(wrong)); let s = await state(page);
        is(s.phase === 'judge' && s.judgeMisses === 1 && s.misses === 0, `${tag} a wrong judgment: still step 1, no miss`);
        await clickEl(page, judgeSel(r.answer)); s = await state(page); v = await view(page);
        is(s.phase === 'share' && s.judged === r.answer && v.picksHidden && v.toysOn && (r.answer === 'a' ? v.tagA && !v.tagB : r.answer === 'b' ? v.tagB && !v.tagA : v.sameOn && !v.tagA && !v.tagB) && v.tagText === STR.moreTag[loc], `${tag} the right judgment: ${r.answer === 'same' ? '"The same" stays lit' : 'the "More" tag on that plate'}, the toys come alive`);
        if (r.answer !== 'same') {
          const more = r.answer, fewer = more === 'a' ? 'b' : 'a', diff = Math.abs(r.a - r.b) / 2;
          await check(page); v = await view(page);
          is((await bubble(page)) === STR[more === 'a' ? 'hintMoreTop' : 'hintMoreBottom'][loc] && (await state(page)).misses === 1 && v.numsA === seq(r.a) && v.numsB === seq(r.b), `${tag} not the same yet → the plate with more named, both plates numbered`);
          await sendFrom(page, fewer); v = await view(page); s = await state(page);
          is(s[fewer] === r[fewer] - 1 && s[more] === r[more] + 1 && v.numsA === '' && v.numsB === '', `${tag} a toy can go the wrong way too; a move takes the numbers away`);
          await sendFrom(page, more);
          if (diff >= 2) {
            await check(page); v = await view(page);
            is((await bubble(page)) === STR[more === 'a' ? 'hintOneTop' : 'hintOneBottom'][loc] && v.suggest === 1, `${tag} still not the same → second miss, one toy lights up`);
            await clickEl(page, '.fs-toy.is-suggest'); s = await state(page);
            is(s[more] === r[more] - 1, `${tag} the lit toy goes across`);
            for (let k = 1; k < diff; k++) await sendFrom(page, more);
          } else for (let k = 0; k < diff; k++) await sendFrom(page, more);
        }
        s = await state(page);
        is(s.a === r.fair && s.b === r.fair, `${tag} ${r.fair} and ${r.fair} on the plates`);
        await check(page); await wait(120); v = await view(page);
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { n: r.fair }) && v.numsA === seq(r.fair) && v.numsB === seq(r.fair) && v.toysOff, `${tag} done: "${await bubble(page)}", both plates numbered 1..${r.fair}`);
      }
    }
    await setSetting(page, 'range', 'to10'); await setSetting(page, 'layout', 'rows'); await forceRound(page, 0);
    is(await page.evaluate(() => { const s = window.FairShareActivity.st; return s.plates.a.join() === '0,1,2,3,4,5,6' && s.plates.b.join() === '0,1,2'; }), `[${loc}] "in rows": both plates fill in reading order`);
    await setSetting(page, 'layout', 'scatter');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 0); await clickEl(page, judgeSel('a')); await sendFrom(page, 'a'); await check(page); await wait(250); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    const measure = () => page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(); const els = ['.fs-plate-a', '.fs-plate-b', '.fs-bridge'].map(s => document.querySelector(s).getBoundingClientRect()); const taps = [...document.querySelectorAll('.fs-toy,.fs-pick,.fs-same')].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).display !== 'none').map(e => Math.min(e.offsetWidth, e.offsetHeight)); const ck = document.querySelector('.lcs-activity-check').getBoundingClientRect(); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tapMin: Math.min(...taps), checkBottom: ck.bottom + window.scrollY, vh: window.innerHeight }; });
    for (const ri of [4, 1, 2]) {   /* 9/5, 2/8, 6/6 */
      await forceRound(page, ri);
      const r = CORE.rounds('to10', 'fs')[ri], tg = `${tag} #${ri} ${r.a}/${r.b}`;
      let m = await measure(), v = await view(page);
      is(m.overflow <= 2 && m.inCard && m.tapMin >= 44 && m.checkBottom <= m.vh, `${tg} step 1: inside the card, taps ≥ 44 (${m.tapMin}), Check above the fold (${m.checkBottom.toFixed(0)} ≤ ${m.vh})`);
      is(v.minD >= 0.94 * v.dia && v.inside, `${tg} toys apart, on their plates`);
      if (w >= 700) is(v.size >= 96, `${tg} ≥ 96 px (${v.size})`); else if (w >= 360) is(v.size >= 64, `${tg} ≥ 64 px on a phone (${v.size})`);
      await clickEl(page, judgeSel(r.answer));
      m = await measure();
      is(m.overflow <= 2 && m.inCard && m.tapMin >= 44 && m.checkBottom <= m.vh, `${tg} step 2: inside the card, taps ≥ 44, Check above the fold`);
    }
    await forceRound(page, 4); await clickEl(page, judgeSel('a')); await sendFrom(page, 'a'); await check(page); await wait(200);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await sendFrom(page, 'a'); await check(page); await wait(300);
    is(await celebrated(page), `${tag} 9/5, two across → 7 and 7, celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-fair-share: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
