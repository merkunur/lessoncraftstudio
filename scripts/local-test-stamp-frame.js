#!/usr/bin/env node
/* =====================================================================
   local-test-stamp-frame.js — the interaction gate for ACTIVITY #23,
   "Show the Operation" (K.OA.A.1), the Stamp Frame.
   Real pointer taps: lift a stamp, press it on places, Check (the frame's
   own button), the brackets, the peel into the dish, the number strip; an
   empty Check, a wrong printing (named), the part / taken-away answer, the
   right answer and the shell's celebration; every round of Within 10 in
   every locale asked for, Within 5 / Within 20 (the fill-the-first-frame
   rule), the Dots setting, free play, the width sweep.
   Expectations are computed HERE from the design sheet, not read off the tool.
   Usage: node scripts/local-test-stamp-frame.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.show-the-operation.k-oa-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };
const STR = require(path.join(MINI, 'stamp-frame-activity.js')).strings;
const CORE = require(path.join(MINI, 'stamp-frame-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

/* the Within 10 table, written out again (design §6) */
const W10 = [[3, 2, '+'], [4, 3, '+'], [5, 4, '+'], [2, 6, '+'], [1, 5, '+'], [5, 2, '-'], [8, 3, '-'], [7, 4, '-'], [9, 6, '-'], [6, 2, '-']];
const ans = (a, b, op) => op === '+' ? a + b : a - b;

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
  async function open(loc, w, tall) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() === 404 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push('404 ' + r.url()); });
    await page.setViewport({ width: w, height: tall ? 1500 : (w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900) });
    await page.goto(`${base}/stamp-frame-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.StampFrameActivity && window.StampFrameActivity.st && document.querySelector('.sf-cell'), { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.StampFrameActivity.st; return { id: s.id, a: s.a, b: s.b, op: s.op, cells: s.cells.slice(), step: s.step, done: s.done, misses1: s.misses1, misses2: s.misses2, dish: s.dish, stamp: s.stamp, answer: s.answer }; });
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.sf-note'); return n.hidden ? '' : n.textContent; });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el || el.offsetParent === null) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no visible element ' + sel); return c; };
  async function clickSel(page, sel) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(40); }
  async function lift(page, s) { await clickSel(page, '.sf-stamp-' + s); is((await page.evaluate(() => window.StampFrameActivity._cur().stamp)) === s, 'lifted the ' + s + ' stamp'); }
  async function pressCells(page, list) { for (const i of list) await clickSel(page, `.sf-cell[data-i="${i}"]`); }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.StampFrameActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await wait(80);
  }
  /* print the expression right, scattered (the tidy has to put it in order) */
  async function printRight(page, a, b, op) {
    const scatter = (n, cap) => { const o = []; for (let k = 0; o.length < n; k++) { const i = (k * 7 + 2) % cap; if (o.indexOf(i) < 0) o.push(i); } return o; };
    const cap = (await state(page)).cells.length;
    if (cap === 20) {
      /* the first ten-frame first: fill it in order, then the second */
      const total = op === '+' ? a + b : a;
      const ids = Array.from({ length: total }, (_, i) => i);
      await lift(page, 'c'); await pressCells(page, ids.slice(0, a));
      if (op === '+') { await lift(page, 't'); await pressCells(page, ids.slice(a)); }
      else { await lift(page, 'x'); await pressCells(page, ids.slice(0, b)); }
      return;
    }
    const pos = scatter(op === '+' ? a + b : a, cap);
    await lift(page, 'c'); await pressCells(page, pos.slice(0, a));
    if (op === '+') { await lift(page, 't'); await pressCells(page, pos.slice(a)); }
    else { await lift(page, 'x'); await pressCells(page, pos.slice(0, b)); }
  }
  async function check(page) { await clickSel(page, '.sf-go'); await wait(80); }
  async function waitStep2(page) { await page.waitForFunction(() => { const t = window.StampFrameActivity; return t.st.step === 2 && !t._busy && !document.querySelector('.sf-strip').hidden; }, { timeout: 5000 }); await wait(60); }
  const tapKey = async (page, v) => { await clickSel(page, `.sf-strip .sf-key:nth-child(${v})`); await wait(60); };

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704, true);
    const S = (k) => STR[k][loc];
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    const pool = await page.evaluate(() => window.StampFrameActivity._pool.map(r => [r.a, r.b, r.op].join(',')));
    is(pool.join(' ') === W10.map(p => p.join(',')).join(' '), `[${loc}] Within 10 = the old ten problems`);
    const ids = await page.evaluate(() => { const t = window.StampFrameActivity, o = []; for (let i = 0; i < 20; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 10).slice().sort().join() === ids.slice(10).slice().sort().join() && ids.slice(0, 10).join() !== ids.slice(10).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    is((await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return getComputedStyle(c).display; })) === 'none', `[${loc}] the shell Check is hidden; the frame has its own`);
    for (let ri = 0; ri < W10.length; ri++) {
      const [a, b, op] = W10[ri], v = ans(a, b, op), tag = `[${loc} ${a}${op === '+' ? '+' : '−'}${b}]`;
      await forceRound(page, ri);
      let st = await state(page);
      is(st.a === a && st.b === b && st.op === op && st.step === 1 && st.cells.every(c => c === null), `${tag} fresh state`);
      is((await promptText(page)) === interp(S(op === '+' ? 'promptAdd' : 'promptSub'), { a, b }), `${tag} prompt`);
      const rack = await page.evaluate(() => ['c', 't', 'x'].filter(s => !document.querySelector('.sf-stamp-' + s).hidden).join(','));
      is(rack === (op === '+' ? 'c,t' : 'c,x'), `${tag} rack ${rack}`);
      const eq = await page.evaluate(() => document.querySelector('.sf-eq').textContent.replace(/\s+/g, ''));
      is(eq === `${a}${op === '+' ? '+' : '−'}${b}=`, `${tag} the equation strip reads ${eq}, the box blank`);
      /* an empty Check: no miss */
      await check(page); st = await state(page);
      is((await note(page)) === S('hintStart') && st.misses1 === 0 && st.step === 1, `${tag} empty Check → hintStart, no miss`);
      /* a wrong printing */
      if (op === '+') {
        await lift(page, 'c'); await pressCells(page, Array.from({ length: a + 1 }, (_, i) => i));
        await lift(page, 't'); await pressCells(page, Array.from({ length: b }, (_, i) => a + 1 + i).filter(i => i < 10));
        await check(page); st = await state(page);
        const k = 1, n = a;
        is(st.misses1 === 1 && (await note(page)) === interp(S('hintOutside1'), { n, k }), `${tag} one orange too many → "${await note(page)}"`);
        const marks = await page.evaluate(() => [...document.querySelectorAll('.sf-cell')].map(c => c.getAttribute('data-mark') || '').join(','));
        is(/wrong|extra/.test(marks), `${tag} the stray counter is marked (${marks})`);
        const br = await page.evaluate(() => document.querySelectorAll('.sf-br path').length);
        is(br >= 2, `${tag} two brackets drop (${br})`);
        if (SHOT) { await wait(400); await page.screenshot({ path: path.join(SHOT, `sf-${loc}-miss-${a}p${b}.png`) }); }
        await clickSel(page, '.sf-wipe');
        is((await state(page)).cells.every(c => c === null), `${tag} wipe the frame`);
      } else {
        await lift(page, 'c'); await pressCells(page, Array.from({ length: a }, (_, i) => i));
        await check(page); st = await state(page);
        is(st.misses1 === 1 && (await note(page)) === S('hintCross'), `${tag} no crosses → hintCross`);
        await clickSel(page, '.sf-wipe');
      }
      /* the right printing */
      await printRight(page, a, b, op);
      await check(page);
      await waitStep2(page);
      st = await state(page);
      if (op === '+') is(st.cells.slice(0, a).every(c => c === 'c') && st.cells.slice(a, a + b).every(c => c === 't') && st.dish === 0, `${tag} tidied: orange then green`);
      else is(st.cells.slice(0, v).every(c => c === 'c') && st.cells.slice(v).every(c => c === null) && st.dish === b, `${tag} the crossed ones peeled into the dish (${st.dish}), ${v} left`);
      is((await note(page)) === interp(S(op === '+' ? 'askAdd' : 'askSub'), { a, b }), `${tag} step 2 asks "${await note(page)}"`);
      const strip = await page.evaluate(() => [...document.querySelectorAll('.sf-strip .sf-key')].map(k => k.textContent).join(','));
      is(strip === '1,2,3,4,5,6,7,8,9,10', `${tag} the number strip 1–10 in order`);
      is(await page.evaluate(() => document.querySelector('.sf-rack').hidden), `${tag} the rack gives way to the strip`);
      /* a part / taken-away number */
      const partV = op === '+' ? (a !== v ? a : b) : a;
      await tapKey(page, partV); st = await state(page);
      is(st.misses2 === 1 && !st.done && (await note(page)) === (op === '+' ? interp(S('hintPart'), { n: partV }) : S('hintAway')), `${tag} tapped ${partV} → "${await note(page)}"`);
      /* the right answer */
      await tapKey(page, v); await wait(1100); st = await state(page);
      const celeb = interp(S(CORE.celebrateKey({ a, b, op }, 'numerals')), { a, b, c: v });
      is(st.done && (await celebrated(page)) && (await bubble(page)) === celeb, `${tag} ${v}: the shell celebrates "${await bubble(page)}"`);
      const box = await page.evaluate(() => { const x = document.querySelector('.sf-box'); return { t: x.textContent, gold: x.classList.contains('is-gold') }; });
      is(box.t === String(v) && box.gold, `${tag} the answer box turns gold with ${v}`);
      if (SHOT && ri === 1) await page.screenshot({ path: path.join(SHOT, `sf-${loc}-add-done.png`) });
      if (SHOT && ri === 6) await page.screenshot({ path: path.join(SHOT, `sf-${loc}-sub-done.png`) });
      await clickSel(page, '.lcs-activity-next'); await wait(120);
      st = await state(page);
      is(!st.done && st.step === 1 && st.cells.every(c => c === null), `${tag} Next clears`);
    }
    /* raw keys / braces */
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    /* Within 20: the second frame waits for the first */
    await page.evaluate(() => { window.StampFrameActivity.api.settings.numbers = 'within20'; window.StampFrameActivity.onSettings(); }); await wait(200);
    await forceRound(page, 5); /* 15 − 6 */
    let st = await state(page);
    is(st.cells.length === 20 && (await page.evaluate(() => [...document.querySelectorAll('.sf-frame')].filter(f => !f.hidden).length)) === 2, `[${loc}] Within 20: two frames`);
    await lift(page, 'c'); await pressCells(page, [12]);
    is((await state(page)).cells[12] === null && (await note(page)) === S('hintFillFirst'), `[${loc}] Within 20: the second frame waits → "${await note(page)}"`);
    await printRight(page, 15, 6, '-'); await check(page); await waitStep2(page);
    is((await page.evaluate(() => document.querySelectorAll('.sf-strip .sf-key').length)) === 20, `[${loc}] Within 20: the strip runs 1–20`);
    await tapKey(page, 9); await wait(1100);
    is((await state(page)).done && (await celebrated(page)), `[${loc}] 15 − 6 = 9 by real taps`);
    /* Within 5 + Dots */
    await page.evaluate(() => { const t = window.StampFrameActivity; t.api.settings.numbers = 'within5'; t.api.settings.show = 'dots'; t.onSettings(); }); await wait(200);
    await forceRound(page, 2); /* 2 + 2 */
    const dies = await page.evaluate(() => [...document.querySelectorAll('.sf-eq .sf-die')].map(d => d.querySelectorAll('circle').length).join(','));
    is(dies === '2,2', `[${loc}] Dots: 2 + 2 shows two die faces of two (${dies})`);
    await printRight(page, 2, 2, '+'); await check(page); await waitStep2(page); await tapKey(page, 4); await wait(1100);
    is((await bubble(page)) === interp(S('celebrateDots'), { a: 2, b: 2, c: 4 }), `[${loc}] Dots success line "${await bubble(page)}"`);
    await page.evaluate(() => { const t = window.StampFrameActivity; t.api.settings.numbers = 'within10'; t.api.settings.show = 'numerals'; t.onSettings(); }); await wait(200);
    /* free play */
    await clickSel(page, '.sf-playbtn');
    is(await page.evaluate(() => window.StampFrameActivity._playing && !document.querySelector('.sf-stamp-x').hidden && !document.querySelector('.sf-stamp-t').hidden), `[${loc}] free play: all three stamps`);
    await lift(page, 'c'); await pressCells(page, [0, 1, 2]); await lift(page, 't'); await pressCells(page, [3, 4]); await lift(page, 'x'); await pressCells(page, [0]);
    const live = await page.evaluate(() => document.querySelector('.sf-eq').textContent.replace(/\s+/g, ''));
    is(live === '3+2−1=4', `[${loc}] free play: the equation writes itself (${live})`);
    is((await note(page)) === S('playNote'), `[${loc}] free play note`);
    await clickSel(page, '.sf-playbtn');
    is(await page.evaluate(() => !window.StampFrameActivity._playing && window.StampFrameActivity.st.step === 1), `[${loc}] back to the task`);
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep: a take-away round and the two-frame round */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const [lv, ri, a, b, op] of [['within10', 6, 8, 3, '-'], ['within10', 2, 5, 4, '+'], ['within20', 1, 9, 7, '+']]) {
      await page.evaluate((lv) => { const t = window.StampFrameActivity; t.api.settings.numbers = lv; t.onSettings(); }, lv); await wait(200);
      await forceRound(page, ri);
      const tag = `[en @${w} ${lv} ${a}${op}${b}]`;
      const m = await page.evaluate(() => {
        const wrap = document.querySelector('.sf-wrap').getBoundingClientRect(), go = document.querySelector('.sf-go').getBoundingClientRect();
        const cells = [...document.querySelectorAll('.sf-cell')].filter(c => c.offsetParent !== null).map(c => c.getBoundingClientRect());
        const frames = [...document.querySelectorAll('.sf-frame')].filter(f => !f.hidden).map(f => f.getBoundingClientRect());
        const stamps = [...document.querySelectorAll('.sf-stamp')].filter(s => !s.hidden).map(s => s.getBoundingClientRect());
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inside: frames.every(r => r.left >= wrap.left - 1 && r.right <= wrap.right + 1), cell: Math.min(...cells.map(r => Math.min(r.width, r.height))), stampMin: Math.min(...stamps.map(r => Math.min(r.width, r.height))), goBottom: go.bottom, innerH: window.innerHeight, wide: document.querySelector('.sf-wrap').classList.contains('is-wide') };
      });
      is(m.overflow <= 2 && m.inside, `${tag} no overflow, frames inside`);
      is(m.cell >= 44, `${tag} places ${m.cell.toFixed(0)} ≥ 44`);
      is(m.stampMin >= 44, `${tag} stamps ${m.stampMin.toFixed(0)} ≥ 44`);
      is(m.goBottom <= m.innerH + 1, `${tag} Check at ${m.goBottom.toFixed(0)} within ${m.innerH}`);
      await printRight(page, a, b, op); await check(page); await waitStep2(page);
      const k = await page.evaluate(() => { const ks = [...document.querySelectorAll('.sf-strip .sf-key')].map(k => k.getBoundingClientRect()), wrap = document.querySelector('.sf-wrap').getBoundingClientRect(); return { min: Math.min(...ks.map(r => Math.min(r.width, r.height))), inside: ks.every(r => r.left >= wrap.left - 1 && r.right <= wrap.right + 1), bottom: Math.max(...ks.map(r => r.bottom)), innerH: window.innerHeight, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }; });
      is(k.min >= 44 && k.inside && k.overflow <= 2, `${tag} strip keys ${k.min.toFixed(0)} ≥ 44, inside`);
      if (w >= 360) is(k.bottom <= k.innerH + 1, `${tag} the strip in the fold (${k.bottom.toFixed(0)} / ${k.innerH})`);
      if (SHOT && lv === 'within10' && op === '-') await page.screenshot({ path: path.join(SHOT, `sf-en-${w}-step2.png`) });
      await tapKey(page, ans(a, b, op)); await wait(1100);
      is((await state(page)).done && (await celebrated(page)), `${tag} done by real taps`);
      if (SHOT && lv === 'within10' && op === '-') await page.screenshot({ path: path.join(SHOT, `sf-en-${w}-done.png`) });
    }
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-stamp-frame: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
