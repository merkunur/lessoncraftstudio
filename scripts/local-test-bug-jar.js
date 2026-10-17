#!/usr/bin/env node
/* =====================================================================
   local-test-bug-jar.js — the interaction gate for ACTIVITY #16, "The
   Wondering Jar — guess, then count to find out" (K.CC.B.5), the Bug Jar.
   Real clicks: Check at the jar (guess first), a guess, Check (pour), the
   pour (the bugs fly to the tray), Check (set the label), ticks on and off,
   Clear the ticks, − and + on the label, Check through every slip (unticked
   · too many after all ticked → the last-number help with "?") to done, the
   verdict against the guess; the "no guess" and "up to 10" settings; every
   round of both ranges, every locale asked for, the width sweep in both
   phases (the jars and the tray).
   Usage: node scripts/local-test-bug-jar.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'wondering-jar.estimate-jar.k-cc-b-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'bug-jar-activity.js')).strings;
const CORE = require(path.join(MINI, 'bug-jar-core.js'));
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
    await page.goto(`${base}/bug-jar-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.BugJarActivity && window.BugJarActivity.st && window.BugJarActivity._theme, { timeout: 8000 });
    await page.evaluate(() => { window.BugJarActivity.POUR_MS = 20; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.BugJarActivity.api.settings[k] = v; window.BugJarActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.BugJarActivity.st; return { n: s.n, noun: s.noun, bench: s.bench, phase: s.phase, guess: s.guess, seq: s.seq.length, answer: s.answer, misses: s.misses, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const vis = (el) => el && !el.hidden && el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden';
    const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
    const bugs = qa('.bj-bug').filter(vis);
    const tray = q('.bj-tray').getBoundingClientRect();
    const sz = (im) => im ? Math.min(im.offsetWidth, im.offsetHeight) : 0;
    let minD = Infinity; const c = bugs.map(b => { const r = b.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
    for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) minD = Math.min(minD, Math.hypot(c[i][0] - c[j][0], c[i][1] - c[j][1]));
    const nums = bugs.map(b => { const n = b.querySelector('.bj-num'); return n.classList.contains('is-on') ? n.textContent : ''; });
    return {
      jarsShown: vis(q('.bj-jars')), trayShown: vis(q('.bj-tray')),
      packedM: qa('.bj-mystery .bj-packed').length, packedB: qa('.bj-bench .bj-packed').length,
      packedSize: sz(q('.bj-mystery .bj-packed')), packedSrc: q('.bj-mystery .bj-packed') ? q('.bj-mystery .bj-packed').getAttribute('src') : '',
      benchTag: q('.bj-bench .bj-tag').textContent, benchAria: q('.bj-bench').getAttribute('aria-label'),
      gTexts: qa('.bj-gbtn').map(b => b.textContent), gPressed: qa('.bj-gbtn').map(b => b.getAttribute('aria-pressed')).join(),
      guessShown: vis(q('.bj-guess')), pourDisabled: q('.bj-pour').disabled,
      bugs: bugs.length, bugSrc: bugs[0] && bugs[0].querySelector('img') ? bugs[0].querySelector('img').getAttribute('src') : '', bugSize: sz(bugs[0] && bugs[0].querySelector('img')), dia: bugs[0] ? bugs[0].offsetWidth : 0, minD,
      inTray: bugs.every(b => { const r = b.getBoundingClientRect(), w = b.offsetWidth; const cx = r.left + r.width / 2, cy = r.top + r.height / 2; return cx - w / 2 >= tray.left - 2 && cx + w / 2 <= tray.right + 2 && cy - w / 2 >= tray.top - 2 && cy + w / 2 <= tray.bottom + 2; }),
      ticked: bugs.filter(b => b.classList.contains('is-ticked') && b.getAttribute('aria-pressed') === 'true').length,
      nums, numsSorted: nums.filter(Boolean).slice().sort((a, b) => (+a || 99) - (+b || 99)).join(), q: nums.filter(x => x === '?').length, gold: bugs.filter(b => b.querySelector('.bj-num').classList.contains('is-gold')).length,
      chip: vis(q('.bj-chip')) ? q('.bj-chip').textContent : null, verdict: q('.bj-chip').classList.contains('is-verdict'),
      card: q('.bj-card').textContent, cardAria: q('.bj-card').getAttribute('aria-label'), clearShown: vis(q('.bj-clear')),
      bugAria: bugs[0] ? bugs[0].getAttribute('aria-label') : null };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(70);
  }
  const check = (page) => clickEl(page, '.lcs-activity-check');
  async function setLabel(page, v) {
    for (let g = 0; g < 40; g++) {
      const s = await state(page), cur = s.answer === null ? s.bench : s.answer;
      if (cur === v && s.answer !== null) return;
      if (cur === v) { await clickEl(page, '.bj-step', 1); await clickEl(page, '.bj-step', 0); return; }   /* touch it, so the label counts as set */
      await clickEl(page, '.bj-step', cur > v ? 0 : 1);
    }
    throw new Error('label never reached ' + v);
  }
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.BugJarActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1)).join();

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to16', 'to10']) {
      if (range === 'to10') await setSetting(page, 'range', 'to10');
      const R = CORE.rounds(range, 'bj');
      is((await page.evaluate(() => window.BugJarActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to16') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.arr} ${r.n}]`, src = `/image-library-webp/themes/insects and bugs/${r.noun}@2x.webp`;
        await forceRound(page, ri);
        let v = await view(page);
        is(v.jarsShown && !v.trayShown && v.packedM === r.n && v.packedB === r.bench && v.benchTag === String(r.bench) && v.benchAria === interp(STR.benchLabel[loc], { b: r.bench }), `${tag} the jar packed with ${r.n}, the yardstick jar with ${r.bench}`);
        is(v.packedSrc === src && v.packedSize >= 96, `${tag} library ${r.noun}s in the jars, ≥ 96 px (${v.packedSize})`);
        is(v.gTexts.join('|') === [interp(STR.guessFewer[loc], { b: r.bench }), interp(STR.guessMore[loc], { b: r.bench })].join('|') && v.pourDisabled, `${tag} the guess: "${v.gTexts.join('" / "')}"; the pour locked`);
        await check(page);
        is((await bubble(page)) === STR.hintGuess[loc] && (await state(page)).misses === 0, `${tag} Check at the jar → "guess first", no miss`);
        await clickEl(page, '.bj-gbtn', 1); v = await view(page);
        is(v.gPressed === 'false,true' && !v.pourDisabled && (await state(page)).guess === 'more', `${tag} guessed "more"; the pour unlocked`);
        await check(page);
        is((await bubble(page)) === STR.hintPour[loc] && (await state(page)).misses === 0, `${tag} Check before the pour → "pour", no miss`);
        await clickEl(page, '.bj-pour'); await wait(120); v = await view(page);
        is(!v.jarsShown && v.trayShown && v.bugs === r.n && v.bugSrc === src && v.bugSize >= 96 && v.inTray && v.minD >= 0.95 * v.dia, `${tag} poured: ${r.n} ${r.noun}s on the tray, ≥ 96 px, apart, inside (${v.bugSize}, ${(v.minD / v.dia).toFixed(2)})`);
        is(v.chip === interp(STR.chipMore[loc], { b: r.bench }) && v.card === String(r.bench) && v.cardAria === interp(STR.answerLabel[loc], { v: r.bench }) && v.bugAria === STR.bugTick[loc], `${tag} the chip "${v.chip}"; the label starts at ${r.bench}`);
        await check(page);
        is((await bubble(page)) === STR.hintSet[loc] && (await state(page)).misses === 0, `${tag} an untouched label → "set the label", no miss`);
        await clickEl(page, '.bj-bug', 0); v = await view(page);
        is(v.ticked === 1 && v.clearShown, `${tag} a tap ticks a bug`);
        await clickEl(page, '.bj-clear'); v = await view(page);
        is(v.ticked === 0 && !v.clearShown, `${tag} Clear the ticks`);
        await clickEl(page, '.bj-bug', 0);
        await setLabel(page, r.n + 1); v = await view(page);
        is(v.card === String(r.n + 1), `${tag} − / + set the label to ${r.n + 1}`);
        await check(page);
        is((await bubble(page)) === STR.hintTicks[loc] && (await state(page)).misses === 1, `${tag} ${r.n + 1} with bugs unticked → a miss, "tick each one"`);
        for (let k = 1; k < r.n; k++) await clickEl(page, '.bj-bug', k);
        v = await view(page);
        is(v.ticked === r.n, `${tag} every bug ticked`);
        await check(page); v = await view(page);
        is((await bubble(page)) === STR.hintLast[loc] && (await state(page)).misses === 2 && v.q === 1 && v.numsSorted === seq(r.n - 1) + (r.n > 1 ? ',?' : '?'), `${tag} again → second miss: numbered to ${r.n - 1}, "?" on the last`);
        await clickEl(page, '.bj-step', 0); v = await view(page);
        is(v.q === 0 && v.nums.every(x => x === ''), `${tag} a change takes the help numbers away`);
        await check(page); await wait(150); v = await view(page);
        const key = r.n > r.bench ? 'verdictMoreYes' : 'verdictFewerNo';
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { n: r.n }) && v.numsSorted === seq(r.n) && v.gold === 1 && v.verdict && v.chip === interp(STR[key][loc], { b: r.bench }), `${tag} done: "${await bubble(page)}", numbered 1..${r.n}, the last gold; "${v.chip}"`);
      }
    }
    /* no guess */
    await setSetting(page, 'range', 'to16'); await setSetting(page, 'guess', 'off'); await forceRound(page, 0);
    let v = await view(page);
    is(!v.guessShown && !v.pourDisabled, `[${loc}] no guess: no guess buttons, the pour open`);
    await clickEl(page, '.bj-mystery'); v = await view(page);
    is(v.trayShown && v.chip === null, `[${loc}] a tap on the jar pours it; no guess chip`);
    await setSetting(page, 'guess', 'on');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 2); await clickEl(page, '.bj-gbtn', 1); if (SHOT) await page.screenshot({ path: path.join(SHOT, `${loc}-704-jar.png`), fullPage: true }); await clickEl(page, '.bj-pour'); await wait(200); for (let k = 0; k < 6; k++) await clickEl(page, '.bj-bug', k); await setLabel(page, 15); await check(page); await wait(200); await page.screenshot({ path: path.join(SHOT, `${loc}-704-count.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    const measure = () => page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(); const els = ['.bj-jars', '.bj-guess', '.bj-pour', '.bj-tray', '.bj-top', '.bj-label'].map(s => document.querySelector(s)).filter(e => e.offsetParent !== null).map(e => e.getBoundingClientRect()); const taps = [...document.querySelectorAll('.bj-gbtn,.bj-pour,.bj-mystery,.bj-bug,.bj-step,.bj-clear')].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden').map(e => Math.min(e.offsetWidth, e.offsetHeight)); const ck = document.querySelector('.lcs-activity-check').getBoundingClientRect(); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tapMin: Math.min(...taps), checkBottom: ck.bottom + window.scrollY, vh: window.innerHeight }; });
    for (const ri of [4, 2, 3, 1]) {   /* 16 in an array, 14 in rows, a ring of 9, a scatter of 7 */
      await forceRound(page, ri);
      const r = CORE.rounds('to16', 'bj')[ri], tg = `${tag} #${ri} ${r.arr} ${r.n}`;
      let m = await measure(), v = await view(page);
      is(m.overflow <= 2 && m.inCard && m.tapMin >= 44 && m.checkBottom <= m.vh, `${tg} the jars: inside the card, taps ≥ 44 (${m.tapMin}), Check above the fold (${m.checkBottom.toFixed(0)} ≤ ${m.vh})`);
      if (w >= 700) is(v.packedSize >= 96, `${tg} jar bugs ≥ 96 px (${v.packedSize})`); else if (w >= 360) is(v.packedSize >= 64, `${tg} jar bugs ≥ 64 px on a phone (${v.packedSize})`);
      await clickEl(page, '.bj-gbtn', 0); await clickEl(page, '.bj-pour'); await wait(120);
      if (ri === 4) { for (let k = 0; k < 5; k++) await clickEl(page, '.bj-bug', k); await clickEl(page, '.bj-step', 1); }
      m = await measure(); v = await view(page);
      is(m.overflow <= 2 && m.inCard && m.tapMin >= 44 && m.checkBottom <= m.vh, `${tg} the tray: inside the card, taps ≥ 44 (${m.tapMin}), Check above the fold (${m.checkBottom.toFixed(0)} ≤ ${m.vh})`);
      is(v.inTray && v.minD >= 0.95 * v.dia, `${tg} bugs apart, inside the tray`);
      if (w >= 700) is(v.bugSize >= 96, `${tg} tray bugs ≥ 96 px (${v.bugSize})`); else if (w >= 360) is(v.bugSize >= 64, `${tg} tray bugs ≥ 64 px on a phone (${v.bugSize})`);
      if (SHOT && ri === 4) await page.screenshot({ path: path.join(SHOT, `en-${w}-count.png`), fullPage: true });
    }
    await forceRound(page, 2);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-jar.png`), fullPage: true });
    await clickEl(page, '.bj-gbtn', 1); await clickEl(page, '.bj-pour'); await wait(150);
    for (let k = 0; k < 14; k++) await clickEl(page, '.bj-bug', k);
    await setLabel(page, 14); await check(page); await wait(300);
    is(await celebrated(page), `${tag} 14 ticked and set → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-bug-jar: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
