#!/usr/bin/env node
/* =====================================================================
   local-test-overflow-trays.js — the interaction gate for ACTIVITY #30,
   "Teen Numbers" (K.NBT.A.1), the Overflow Trays.
   Real pointer on the spout (taps and a held pour), the cells, the stack,
   the sealed bars and Check: Make 14 — Check with nothing (no miss), the
   overflow at the 11th counter, a top counter refused while the bottom has
   any, too few (the dotted shape), too many (the numbered shape), the take-
   back, success (the split numeral, the shell celebrates); Number of the
   day 30 — three stacked tens, ten more, ten less (un-seal), one less
   (break a ten), the day card; a sealed ten refused while ones remain; Help
   always; Just pour; the width sweep. Expectations from the design (§5–7).
   Usage: node scripts/local-test-overflow-trays.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.teen-numbers.make-n';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };
const STR = require(path.join(MINI, 'overflow-trays-activity.js')).strings;
const NW = require(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'number-words.js'));
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
  async function open(loc, w, fast) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/overflow-trays-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.OverflowTraysActivity && window.OverflowTraysActivity.st && document.querySelector('.ot-tray'), { timeout: 8000 });
    if (fast !== false) await page.evaluate(() => { window.OverflowTraysActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const C = window.OverflowTraysCore, s = window.OverflowTraysActivity._cur(); return { tot: C.total(s), top: s.level === 'teen' ? C.top(s) : null, bottom: s.level === 'teen' ? C.bottom(s) : null, sealed: s.sealed, open: s.open, step: s.step, misses: s.misses, help: s.help, done: s.done, explore: s.explore }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.ot-note'); return n.hidden ? '' : n.textContent; });
  const stepLine = (page) => page.evaluate(() => { const n = document.querySelector('.ot-step'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = [...document.querySelectorAll(s)].find(e => e.offsetParent !== null && !e.hidden && !e.disabled); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no visible enabled element ' + sel); return c; };
  async function clickSel(page, sel, ms) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(ms || 50); }
  async function pour(page, n) { const c = await center(page, '.ot-spout'); for (let i = 0; i < n; i++) { await page.mouse.move(c.x, c.y); await page.mouse.down(); await wait(20); await page.mouse.up(); await wait(30); } }
  async function force(page, level, n) {
    await page.evaluate((level, n) => { const t = window.OverflowTraysActivity; t._playing = false; if (t.api.settings.level !== level) { t.api.settings.level = level; t._pool = null; } const pool = t._ensurePool(); const i = pool.findIndex(r => r.n === n); if (i < 0) throw new Error('no round ' + n); const order = [i]; for (let q = 0; q < pool.length; q++) if (q !== i) order.push(q); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, level, n);
    await wait(120);
  }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).catch(() => {});
  const stageNums = (page) => page.evaluate(() => { const st = document.querySelector('.lcs-stage'); const clone = st.cloneNode(true); clone.querySelectorAll('.ot-num, .ot-card, .ot-step, .ot-note, .ot-stack b, svg').forEach(e => e.remove()); return (clone.textContent.match(/\d+/g) || []).join(','); });

  for (const loc of LOCALES) {
    const tag = `[${loc}]`, w = loc === 'en' ? 1024 : 412;
    const { page, errs } = await open(loc, w);
    is((await page.evaluate(() => getComputedStyle(document.querySelector('.lcs-activity-check')).display)) === 'none', `${tag} the shell Check is hidden`);
    /* make 14 */
    await force(page, 'teen', 14);
    is((await prompt(page)) === interp(STR.promptMake[loc], { n: 14 }), `${tag} "${await prompt(page)}"`);
    is((await page.evaluate(() => document.querySelector('.ot-num').textContent.replace(/\s/g, ''))) === '14' + NW.numberWord(14, loc).replace(/\s/g, ''), `${tag} the numeral card shows 14 and its word (${NW.numberWord(14, loc)})`);
    await clickSel(page, '.ot-check');
    is((await state(page)).misses === 0 && (await note(page)) === interp(STR.hintPour[loc], { n: 14 }), `${tag} Check with nothing: "${await note(page)}"`);
    await pour(page, 10);
    let s = await state(page);
    is(s.top === 10 && s.bottom === 0 && (await page.evaluate(() => document.querySelector('.ot-chute').classList.contains('is-open'))), `${tag} ten counters fill the top tray; the chute opens`);
    await pour(page, 3);
    s = await state(page);
    is(s.top === 10 && s.bottom === 3, `${tag} the 11th counter overflows into the bottom tray`);
    is((await stageNums(page)) === '', `${tag} no count is shown on the stage during the task`);
    /* a top counter cannot leave while the bottom has counters */
    await clickSel(page, '.ot-tray-top .ot-cell.is-full');
    is((await state(page)).tot === 13 && (await note(page)) === STR.hintFull[loc], `${tag} a top counter stays: "${await note(page)}"`);
    /* too few */
    await clickSel(page, '.ot-check');
    s = await state(page);
    is(s.misses === 1 && (await note(page)) === STR.hintFew[loc], `${tag} 13 for 14: "${await note(page)}"`);
    is((await page.evaluate(() => document.querySelectorAll('.ot-cell.is-dotted').length)) === 14, `${tag} the dotted shape of 14 (10 + 4)`);
    /* too many, miss 2 */
    await pour(page, 2); await clickSel(page, '.ot-check');
    is((await state(page)).help === 2 && (await note(page)) === interp(STR.hintShape[loc], { n: 14, ones: 4 }), `${tag} 15: "${await note(page)}"`);
    is((await page.evaluate(() => [...document.querySelectorAll('.ot-num1')].filter(e => !e.hidden).map(e => e.textContent).join())) === '1,2,3,4,5,6,7,8,9,10,11,12,13,14', `${tag} miss 2 numbers the shape 1–14 along the pour`);
    is((await page.evaluate(() => document.querySelectorAll('.ot-cell.is-extra').length)) === 1, `${tag} the extra counter has a halo`);
    /* take back the last one, Check */
    await clickSel(page, '.ot-tray-bottom .ot-cell.is-full');
    is((await state(page)).tot === 14 && (await state(page)).help === 0, `${tag} a tap takes the last counter back and the help goes`);
    await clickSel(page, '.ot-check', 200); await celebrated(page);
    s = await state(page);
    is(s.done && (await note(page)) === interp(STR.okTeen[loc], { n: 14, ones: 4 }) && (await bubble(page)) === interp(STR.okTeen[loc], { n: 14, ones: 4 }), `${tag} "${await bubble(page)}"`);
    is((await page.evaluate(() => [document.querySelector('.ot-badge1').textContent, document.querySelector('.ot-badge2').textContent].join('|'))) === '1|4' && (await page.evaluate(() => document.querySelector('.ot-num').classList.contains('is-split'))), `${tag} the 1 lands on the full tray, the 4 below`);
    /* number of the day: 30 */
    await force(page, 'day', 30);
    is((await prompt(page)) === interp(STR.promptDay[loc], { n: 30 }) && (await stepLine(page)) === interp(STR.promptMake[loc], { n: 30 }), `${tag} day: "${await prompt(page)}" / "${await stepLine(page)}"`);
    is((await page.evaluate(() => document.querySelector('.ot-side').hidden || document.querySelector('.ot-chead').textContent === '?')), `${tag} the day card waits for the proof`);
    for (let i = 0; i < 3; i++) await clickSel(page, '.ot-stack');
    s = await state(page);
    is(s.sealed === 3 && s.open === 0, `${tag} the stack adds three sealed tens`);
    await clickSel(page, '.ot-check', 60);
    is((await note(page)) === interp(STR.okTensNone[loc], { n: 30, tens: 3 }), `${tag} "${await note(page)}"`);
    await page.evaluate(() => { const t = window.OverflowTraysActivity; t._ok = null; t._busy = false; t._paint(); });
    is((await stepLine(page)) === STR.stepMore[loc], `${tag} step 2: "${await stepLine(page)}"`);
    await clickSel(page, '.ot-stack'); await clickSel(page, '.ot-check', 60);
    is((await note(page)) === interp(STR.okMoreNone[loc], { m: 40 }), `${tag} "${await note(page)}"`);
    await page.evaluate(() => { const t = window.OverflowTraysActivity; t._ok = null; t._busy = false; t._paint(); });
    s = await state(page);
    is(s.sealed === 3 && s.open === 0 && (await stepLine(page)) === interp(STR.stepLess[loc], { n: 30 }), `${tag} step 3 starts from 30 again: "${await stepLine(page)}"`);
    await clickSel(page, '.ot-shelf'); await clickSel(page, '.ot-check', 60);
    is((await note(page)) === interp(STR.okLess[loc], { m: 20 }), `${tag} un-seal: "${await note(page)}"`);
    await page.evaluate(() => { const t = window.OverflowTraysActivity; t._ok = null; t._busy = false; t._paint(); });
    is((await stepLine(page)) === interp(STR.stepOneLess[loc], { n: 30 }), `${tag} step 4: "${await stepLine(page)}"`);
    await clickSel(page, '.ot-tray-top .ot-cell');
    s = await state(page);
    is(s.sealed === 2 && s.open === 9, `${tag} a tap on the empty open tray breaks a ten (29)`);
    await clickSel(page, '.ot-check', 200); await celebrated(page);
    s = await state(page);
    is(s.done && (await bubble(page)) === interp(STR.celebrateDay[loc], { n: 30 }), `${tag} "${await bubble(page)}"`);
    const card = await page.evaluate(() => [...document.querySelectorAll('.ot-card .ot-box')].map(b => b.textContent).join(','));
    is(card === '3,0,40,20,29', `${tag} the day card: tens 3, ones 0, ten more 40, ten less 20, one less 29 (${card})`);
    is((await page.evaluate(() => document.querySelector('.ot-cword').textContent)) === NW.numberWord(30, loc), `${tag} the word is the worksheets' word (${NW.numberWord(30, loc)})`);
    /* a sealed ten stays while ones remain (build) */
    await force(page, 'day', 37);
    await clickSel(page, '.ot-stack'); await pour(page, 2);
    await clickSel(page, '.ot-shelf');
    is((await state(page)).sealed === 1 && (await note(page)) === STR.hintSealed[loc], `${tag} a ten stays while ones remain: "${await note(page)}"`);
    /* Help always */
    await force(page, 'teen', 12);
    await page.evaluate(() => { const t = window.OverflowTraysActivity; t.api.settings.help = 'always'; t.onSettings(); }); await wait(60);
    is((await page.evaluate(() => document.querySelectorAll('.ot-cell.is-dotted').length)) === 12, `${tag} Help always: the shape of 12 at rest`);
    await page.evaluate(() => { const t = window.OverflowTraysActivity; t.api.settings.help = 'miss'; t.onSettings(); });
    /* Just pour */
    await clickSel(page, '.ot-playbtn');
    await clickSel(page, '.ot-stack'); await clickSel(page, '.ot-stack'); await pour(page, 3);
    is((await state(page)).explore && (await page.evaluate(() => document.querySelector('.ot-chead').textContent)) === '23' && (await note(page)) === STR.playNote[loc], `${tag} Just pour: the day card follows (23)`);
    await clickSel(page, '.ot-playbtn');
    is(!(await state(page)).explore, `${tag} back to the numbers`);
    is(errs.length === 0, `${tag} no page errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }

  /* a held pour: 4 per second, stoppable */
  {
    const { page, errs } = await open('en', 1024, false);
    await force(page, 'teen', 14);
    const c = await center(page, '.ot-spout');
    await page.mouse.move(c.x, c.y); await page.mouse.down(); await wait(1120); await page.mouse.up();
    const a = (await state(page)).tot; await wait(600); const b = (await state(page)).tot;
    is(a >= 4 && a <= 6 && b === a, `[en hold] about four a second, and it stops on release (${a} → ${b})`);
    is(errs.length === 0, '[en hold] no page errors');
    await page.close();
  }

  /* the width sweep */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const [lv, n, act] of [['teen', 19, 'miss'], ['teen', 14, 'done'], ['day', 72, 'step2'], ['day', 85, 'play']]) {
      await force(page, lv, n);
      if (act === 'miss') { await pour(page, 15); await clickSel(page, '.ot-check'); await pour(page, 1); await clickSel(page, '.ot-check'); }
      if (act === 'done') { await pour(page, 14); await clickSel(page, '.ot-check', 120); }
      if (act === 'step2') { for (let i = 0; i < 7; i++) await clickSel(page, '.ot-stack', 20); await pour(page, 2); await clickSel(page, '.ot-check'); await page.evaluate(() => { const t = window.OverflowTraysActivity; t._ok = null; t._busy = false; t._paint(); }); await pour(page, 3); await clickSel(page, '.ot-check'); }
      if (act === 'play') { await clickSel(page, '.ot-playbtn'); for (let i = 0; i < 8; i++) await clickSel(page, '.ot-stack', 20); await pour(page, 5); }
      await page.evaluate(() => window.scrollTo(0, 0)); await wait(80);
      const m = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - window.innerWidth;
        const app = document.querySelector('.lcs-app').getBoundingClientRect();
        const vis = (e) => e.offsetParent && !e.hidden;
        const btns = [...document.querySelectorAll('.lcs-stage button')].filter(vis).map(e => { const r = e.getBoundingClientRect(); return { d: Math.min(r.width, r.height), c: e.className, out: r.left < app.left - 1 || r.right > app.right + 1, bottom: r.bottom }; });
        const parts = [...document.querySelectorAll('.ot-tray, .ot-card, .ot-shelf, .ot-num, .ot-rig')].filter(vis).map(e => e.getBoundingClientRect());
        const font = Math.min(...[...document.querySelectorAll('.ot-word, .ot-crow span, .ot-box, .ot-note, .ot-step')].filter(vis).map(e => parseFloat(getComputedStyle(e).fontSize)));
        return { over, minBtn: Math.min(...btns.map(b => b.d)), small: btns.filter(b => b.d < 44).map(b => b.c).slice(0, 3).join(','), out: btns.filter(b => b.out).length + parts.filter(r => r.left < app.left - 1 || r.right > app.right + 1).length, lowest: Math.max(...btns.map(b => b.bottom)), check: (document.querySelector('.ot-check:not([hidden])') || document.querySelector('.ot-spout')).getBoundingClientRect().bottom, vh: window.innerHeight, font };
      });
      const tg = `[en @${w} ${lv} ${n} ${act}]`;
      is(m.over <= 0 && m.out === 0, `${tg} nothing outside the card (${m.over}, ${m.out})`);
      is(m.minBtn >= 44, `${tg} every control ≥ 44 px (${m.minBtn.toFixed(0)} ${m.small})`);
      /* the round in play keeps every control on screen; once it is done the shell's own Next carries on */
      if (lv === 'teen' && act !== 'done') is(m.lowest <= m.vh + 1, `${tg} every control on screen (${m.lowest.toFixed(0)} ≤ ${m.vh})`);
      else is(m.check <= m.vh + 1, `${tg} Check on screen (${m.check.toFixed(0)} ≤ ${m.vh})`);
      is(m.font >= 14, `${tg} text ≥ 14 px (${m.font})`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `ot-${lv}-${n}-${act}-${w}.png`) });
      if (act === 'play') await clickSel(page, '.ot-playbtn');
    }
    is(errs.length === 0, `[en @${w}] no page errors (${errs.slice(0, 2).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-overflow-trays: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
