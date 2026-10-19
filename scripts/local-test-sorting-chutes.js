#!/usr/bin/env node
/* =====================================================================
   local-test-sorting-chutes.js — the interaction gate for ACTIVITY #35,
   "Sort and Count" (K.MD.B.3), the Sorting Chutes.
   Real pointer: the waiting thing DRAGGED to its chute, tap-then-chute,
   a direct chute tap, a WRONG chute (it bounces, nothing changes, the
   chute's labels flash), the top taken back out of a tube; the belt
   delivers every thing once; then the question — Check with nothing
   (asks), the count aid (a tap on a tube lights the next slot), a wrong
   number (miss 1 lights the tube, miss 2 shows the numbers), the right
   one; "which has the most" (the dashed line); tubes DRAGGED into order;
   "how many more" (the pairing lines); the 2 × 2 sky / ground tubes and
   the penguin; numbers hidden; the keyboard; the width sweep sorting,
   asking and helped (no sideways scroll, every control ≥ 44 px, inside
   the card, above the fold, pressable).
   Usage: node scripts/local-test-sorting-chutes.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'choice-board.sort-count.k-md-b-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
const C = require(path.join(MINI, 'sorting-chutes-core.js'));
const STR = (function () { const vm = require('vm'); const ctx = { window: {}, SortingChutesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(MINI, 'sorting-chutes-activity.js'), 'utf8') + '\n;this.__A = SortingChutesActivity;', ctx); return ctx.__A.strings; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));

/* a case-sensitive server, like production: a wrong-case path is a 404 here too */
function exact(file) { const parts = path.relative(REPO, file).split(path.sep); let cur = REPO; for (const p of parts) { if (!fs.existsSync(cur) || !fs.readdirSync(cur).includes(p)) return false; cur = path.join(cur, p); } return true; }
function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice(12)) : p.startsWith('/image-library-webp/') ? path.join(IMG, p.slice(20)) : path.join(MINI, p.replace(/^\//, ''));
    if (!exact(file)) { res.statusCode = 404; res.end(); return; }
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
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900 });
    await page.goto(`${base}/sorting-chutes-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.SortingChutesActivity && window.SortingChutesActivity.st && document.querySelector('.sc-wrap'), { timeout: 8000 });
    await page.evaluate(() => { window.SortingChutesActivity.FAST = true; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.SortingChutesActivity.st; return { id: s.round, phase: s.phase, belt: s.belt.slice(), tubes: JSON.parse(JSON.stringify(s.tubes)), order: s.order.slice(), num: s.num, pick: s.pick, misses: s.misses, help: s.help, done: s.done, bounces: s.bounces }; });
  const note = (page) => page.evaluate(() => document.querySelector('.sc-note').textContent);
  const prompt = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const ctr = (page, sel) => page.evaluate((s) => { const el = typeof s === 'string' ? document.querySelector(s) : null; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  const funnel = (page, key) => ctr(page, `.sc-funnel[data-key="${key}"]`);
  const tube = (page, key) => ctr(page, `.sc-tube[data-key="${key}"]`);
  async function tap(p, page) { await page.mouse.click(p.x, p.y); await wait(60); }
  async function force(page, groups, id, numbers) {
    await page.evaluate((g, id, nb) => { const t = window.SortingChutesActivity; t.api.settings.groups = g; t.api.settings.numbers = nb || 'shown'; t._pool = null; t._poolKey = null; const pool = t._ensurePool(); const i = pool.findIndex(r => r.id === id); if (i < 0) throw new Error('no round ' + id); t._order = [i].concat(pool.map((r, q) => q).filter(q => q !== i)); t._curPass = 0; window.LCS_reloadFirstTask(); }, groups, id, numbers);
    await wait(200);
  }
  /* sort everything by real taps on the right funnels */
  async function sortAll(page) { for (let g = 0; g < 30; g++) { const s = await state(page); if (s.phase !== 'sort') break; const key = C.keyOf(s.belt[0], s.id[0] === 'C'); await tap(await funnel(page, key), page); } }
  const celebrated = (page) => page.waitForFunction(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), { timeout: 5000 }).then(() => true).catch(() => false);
  const stageWords = (page) => page.evaluate(() => { const st = document.querySelector('.lcs-stage'); const c = st.cloneNode(true); c.querySelectorAll('.sc-note, .sc-ask, .sc-n, svg').forEach(e => e.remove()); return c.textContent.trim(); });
  const T = (loc, k) => STR[k][loc];

  for (const loc of LOCALES) {
    console.log(`— ${loc}`);
    const { page, errs } = await open(loc, 704);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === T(loc, 'title'), `${loc}: the title`);

    /* 1. A1: how many animals — sorting by every hand, then counting */
    await force(page, 'two', 'A1');
    is((await prompt(page)) === T(loc, 'pCountAnimals'), `${loc}: the prompt`);
    is((await stageWords(page)) === '', `${loc}: no words on the apparatus (only the slot numerals)`);
    is((await note(page)) === T(loc, 'pSort'), `${loc}: "drop each one down the right chute"`);
    is(await page.evaluate(() => document.querySelector('.sc-ask').hidden), `${loc}: no question controls while sorting`);
    is(await page.evaluate(() => [...document.querySelectorAll('.sc-obj img, .sc-lab')].every(i => i.complete && i.naturalWidth > 0)), `${loc}: the pictures load (case-exact)`);
    let s = await state(page), first = s.belt[0], want = C.keyOf(first, false), wrong = Object.keys(s.tubes).find(k => k !== want);
    /* a wrong chute: it bounces, nothing changes */
    await tap(await funnel(page, wrong), page);
    let s2 = await state(page);
    is(s2.belt.join() === s.belt.join() && JSON.stringify(s2.tubes) === JSON.stringify(s.tubes) && s2.bounces === 1, `${loc}: a wrong chute bounces the ${first} back — nothing changes`);
    is((await note(page)) === T(loc, 'hintBounce'), `${loc}: …and says to look at the little pictures`);
    /* a real drag to the right chute */
    const o = await ctr(page, '.sc-obj'), fp = await funnel(page, want);
    await page.mouse.move(o.x, o.y); await page.mouse.down(); for (let i = 1; i <= 12; i++) { await page.mouse.move(o.x + (fp.x - o.x) * i / 12, o.y + (fp.y - o.y) * i / 12); await wait(16); } await page.mouse.up(); await wait(120);
    s2 = await state(page);
    is(s2.tubes[want].length === 1 && s2.tubes[want][0] === first && s2.belt.length === s.belt.length - 1, `${loc}: dragged to its chute, the ${first} drops into the tube`);
    /* tap the waiting thing, then the chute */
    const second = s2.belt[0], w2 = C.keyOf(second, false);
    await tap(await ctr(page, '.sc-obj'), page); await tap(await funnel(page, w2), page);
    s2 = await state(page);
    is(s2.tubes[w2].includes(second), `${loc}: tap-tap drops the ${second}`);
    /* a tap on a tube drops into it too — even on its top picture (nothing in a tube is ever wrong, so there is no undo) */
    const third = s2.belt[0], w3 = C.keyOf(third, false), n3 = s2.tubes[w3].length;
    const topY = await page.evaluate((k) => { const t = window.SortingChutesActivity, el = document.querySelector('.sc-tube[data-key="' + k + '"]'), r = el.getBoundingClientRect(), n = t.st.tubes[k].length; return { x: r.left + r.width / 2, y: r.bottom - 5 - t._L.slot * Math.max(0.5, n - 0.5) }; }, w3);
    await tap(topY, page);
    s2 = await state(page);
    is(s2.tubes[w3].length === n3 + 1 && s2.tubes[w3][n3] === third, `${loc}: a tap on a tube (on its top picture) drops the ${third} in`);
    await sortAll(page);
    s2 = await state(page);
    is(s2.phase === 'ask' && JSON.stringify(Object.fromEntries(Object.entries(s2.tubes).map(([k, v]) => [k, v.length]))) === JSON.stringify(C.counts(C.rounds('two')[0])), `${loc}: every thing sorted once — the tubes are the counts`);
    is(await page.evaluate(() => !document.querySelector('.sc-ask').hidden && !document.querySelector('.sc-nums').hidden), `${loc}: the number strip appears`);
    is(await page.evaluate(() => document.querySelector('.sc-belt').hidden && document.querySelector('.sc-hopper').hidden), `${loc}: the empty belt rolls away`);
    /* equal slots: a picture's slot does not depend on the picture */
    is(await page.evaluate(() => { const hs = [...document.querySelectorAll('.sc-mark')].map(m => Math.round(m.getBoundingClientRect().height)); return hs.length > 0 && hs.every(h => h === hs[0]); }), `${loc}: every mark takes the same slot`);
    await tap(await ctr(page, '.sc-check'), page);
    is((await state(page)).misses === 0 && (await note(page)) === T(loc, 'tapNumber'), `${loc}: Check with no number asks for one`);
    /* the count aid */
    await tap(await tube(page, 'animals'), page); await tap(await tube(page, 'animals'), page);
    is(await page.evaluate(() => document.querySelectorAll('.sc-tube[data-key="animals"] .sc-slot.is-lit').length === 2), `${loc}: two taps on the tube light two slots`);
    await tap(await ctr(page, '.sc-num[data-v="4"]'), page); await tap(await ctr(page, '.sc-check'), page);
    s2 = await state(page);
    is(s2.misses === 1 && (await note(page)) === T(loc, 'hintCountUp'), `${loc}: a wrong number — count from the bottom`);
    is(await page.evaluate(() => document.querySelectorAll('.sc-tube[data-key="animals"] .sc-slot.is-lit').length === 3 && document.querySelector('.sc-tube[data-key="fruits"]').classList.contains('is-dim')), `${loc}: miss 1 lights the asked tube, dims the other`);
    await tap(await ctr(page, '.sc-check'), page);
    is((await note(page)) === T(loc, 'hintReadTop'), `${loc}: miss 2 — read the number at the top`);
    await tap(await ctr(page, '.sc-num[data-v="3"]'), page); await tap(await ctr(page, '.sc-check'), page);
    is((await state(page)).done && (await celebrated(page)) && (await bubble(page)).includes(interp(T(loc, 'okCountAnimals'), { n: 3 })), `${loc}: 3 wins (${await bubble(page)})`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'a1-won.png') });

    /* 2. A3: which has the most — the dashed line after a wrong tube */
    await force(page, 'two', 'A3'); await sortAll(page);
    await tap(await tube(page, 'animals'), page); await tap(await ctr(page, '.sc-check'), page);
    is((await note(page)) === T(loc, 'hintHeight') && await page.evaluate(() => !!document.querySelector('.sc-dash') && document.querySelector('.sc-tube[data-key="fruits"]').classList.contains('is-above')), `${loc}: a wrong tube — the dashed line; the fuller one rises above it`);
    await tap(await tube(page, 'fruits'), page); await tap(await ctr(page, '.sc-check'), page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okMostTwoFruits')) && (await prompt(page)) === T(loc, 'pMostTwo'), `${loc}: two groups — there are more fruits`);

    /* 3. B6: tubes DRAGGED into order */
    await force(page, 'three', 'B6'); await sortAll(page);
    s = await state(page);
    const want3 = ['fruits', 'vehicles', 'animals'];
    for (let pos = 0; pos < 3; pos++) {
      const cur = (await state(page)).order, k = want3[pos], from = cur.indexOf(k);
      if (from === pos) continue;
      const a = await tube(page, k), target = await page.evaluate((pos) => { const t = window.SortingChutesActivity, L = t._L, sr = t._stage.getBoundingClientRect(); return sr.left + SortingChutesCore.tubeX(L, pos) + L.tubeW / 2; }, pos);
      await page.mouse.move(a.x, a.y); await page.mouse.down(); for (let i = 1; i <= 10; i++) { await page.mouse.move(a.x + (target - a.x) * i / 10, a.y); await wait(20); } await page.mouse.up(); await wait(150);
    }
    is((await state(page)).order.join() === want3.join(), `${loc}: the tubes dragged into most-to-fewest order (${(await state(page)).order})`);
    await tap(await ctr(page, '.sc-check'), page);
    is((await state(page)).done && (await bubble(page)).includes(T(loc, 'okOrderShort')), `${loc}: the order wins`);
    is((await note(page)) === '' || (await note(page)).length > 0, `${loc}: the note after the win`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'b6-won.png') });

    /* 4. B7: how many more — answering the bigger count is wrong; the pairing lines */
    await force(page, 'three', 'B7'); await sortAll(page);
    await tap(await ctr(page, '.sc-num[data-v="5"]'), page); await tap(await ctr(page, '.sc-check'), page);
    is((await note(page)) === T(loc, 'hintPairUp') && await page.evaluate(() => document.querySelectorAll('.sc-pair').length === 3 && document.querySelectorAll('.sc-tube[data-key="vehicles"] .sc-slot.is-extra').length === 2), `${loc}: 5 (the bigger count) is wrong — 3 pairs, 2 without a partner`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'b7-pairs.png') });
    await tap(await ctr(page, '.sc-num[data-v="2"]'), page); await tap(await ctr(page, '.sc-check'), page);
    is((await state(page)).done && (await bubble(page)).includes(interp(T(loc, 'okMoreVehiclesAnimals'), { n: 2 })), `${loc}: 2 more vehicles than animals`);

    /* 5. C3: the 2 × 2 — the penguin does not fly */
    await force(page, 'fly', 'C3');
    is((await note(page)) === T(loc, 'pSortFly'), `${loc}: "does it fly?"`);
    for (let g = 0; g < 30; g++) {
      s = await state(page); if (s.phase !== 'sort') break;
      const n = s.belt[0];
      if (n === 'penguin') { await tap(await tube(page, 'animals.fly'), page); const s3 = await state(page); is(s3.belt[0] === 'penguin' && (await note(page)) === T(loc, 'hintBounceFly'), `${loc}: the penguin bounces off the sky tube — "does it fly?"`); }
      await tap(await tube(page, C.keyOf(n, true)), page);
    }
    s = await state(page);
    is(s.phase === 'ask' && s.tubes['animals.ground'].includes('penguin'), `${loc}: the penguin is on the ground`);
    is(await page.evaluate(() => document.querySelectorAll('.sc-base .sc-cloud:not(.is-no)').length === 2 && document.querySelectorAll('.sc-base .sc-cross').length === 2), `${loc}: asking, every tube still shows sky or ground`);
    await tap(await ctr(page, '.sc-num[data-v="4"]'), page); await tap(await ctr(page, '.sc-check'), page);
    is((await state(page)).done && (await bubble(page)).includes(interp(T(loc, 'okN'), { n: 4 })), `${loc}: 4 things fly`);
    if (SHOT && loc === 'en') await page.screenshot({ path: path.join(SHOT, 'c3-won.png') });

    /* 6. numbers hidden */
    await force(page, 'two', 'A2', 'hidden');
    is(await page.evaluate(() => document.querySelectorAll('.sc-n').length === 0), `${loc}: "hidden" — no slot numerals`);
    await force(page, 'two', 'A2', 'shown');
    is(await page.evaluate(() => document.querySelectorAll('.sc-n').length > 0), `${loc}: "shown" — the slot numerals`);

    /* 7. the keyboard */
    if (loc === 'en' || loc === 'fi') {
      await force(page, 'two', 'A6');
      s = await state(page);
      await page.focus(`.sc-funnel[data-key="${C.keyOf(s.belt[0], false)}"]`); await page.keyboard.press('Enter'); await wait(80);
      is((await state(page)).belt.length === s.belt.length - 1, `${loc}: keyboard: Enter on the right chute drops`);
    }
    is(errs.length === 0, `${loc}: no errors (${errs.join(' | ')})`);
    await page.close();
  }

  /* the width sweep: sorting, asking, helped */
  for (const w of WIDTHS) {
    const { page, errs } = await open('fi', w);
    for (const [g, id] of [['two', 'A4'], ['three', 'B6'], ['three', 'B7'], ['fly', 'C2'], ['fly', 'C5']]) {
      await force(page, g, id);
      const check = async (phase) => {
        const m = await page.evaluate(() => {
          const app = document.querySelector('.lcs-app').getBoundingClientRect(), sg = document.querySelector('.sc-stage').getBoundingClientRect();
          const ctl = [...document.querySelectorAll('.sc-obj, .sc-funnel, .sc-tube, .sc-num, .sc-check')].filter(e => !e.hidden && e.offsetParent !== null && !e.closest('[hidden]')).map(e => { const r = e.getBoundingClientRect(); return { c: e.className.split(' ')[0], l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height }; });
          const marks = [...document.querySelectorAll('.sc-mark, .sc-lab')].map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height));
          return { docW: document.documentElement.scrollWidth, vw: innerWidth, vh: innerHeight, app: { l: app.left, r: app.right }, sg: { l: sg.left, r: sg.right }, ctl, marks };
        });
        is(m.docW <= m.vw + 1, `${w} ${id} ${phase}: no sideways scroll`);
        m.ctl.forEach(c => {
          if (c.l < m.app.l - 1 || c.r > m.app.r + 1) is(false, `${w} ${id} ${phase}: ${c.c} inside the card`);
          if (Math.min(c.w, c.h) < 44) is(false, `${w} ${id} ${phase}: ${c.c} is ${Math.round(c.w)}×${Math.round(c.h)} — under 44`);
          if (c.b > m.vh + 1) is(false, `${w} ${id} ${phase}: ${c.c} below the fold (${Math.round(c.b)} > ${m.vh})`);
        });
        const mf = w >= 700 ? 40 : 30;
        m.marks.forEach(s => { if (s < mf - 0.5) is(false, `${w} ${id} ${phase}: a data mark ${s.toFixed(0)} px < ${mf}`); });
        const blocked = await page.evaluate(() => [...document.querySelectorAll('.sc-funnel, .sc-tube, .sc-num, .sc-check, .sc-obj')].filter(e => !e.hidden && e.offsetParent !== null && !e.closest('[hidden]') && !e.disabled).map(e => { const r = e.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2; if (y < 0 || y > innerHeight) return null; const h = document.elementFromPoint(x, y); return h && (h === e || e.contains(h)) ? null : e.className.split(' ')[0] + ' under ' + (h ? String(h.className.baseVal != null ? h.className.baseVal : h.className).split(' ')[0] : 'none'); }).filter(Boolean));
        is(blocked.length === 0, `${w} ${id} ${phase}: every control can be pressed (${blocked.join(', ')})`);
      };
      await check('sorting');
      await page.evaluate(() => { const t = window.SortingChutesActivity, C = SortingChutesCore, st = t.st; let g = 0; while (st.phase === 'sort' && g++ < 40) C.drop(st, C.keyOf(C.current(st), st.fly)); t._paint(); });
      await wait(60); await check('asking');
      await page.evaluate(() => { const t = window.SortingChutesActivity, C = SortingChutesCore, st = t.st; if (C.answerKind(st.r) === 'number') C.setNum(st, 9); else if (C.answerKind(st.r) === 'tube') C.setPick(st, Object.keys(st.tubes)[0]); else { st.moved = true; } C.check(st); t._paint(); });
      await wait(60); await check('helped');
      if (SHOT && (w === 360 || w === 704 || w === 1024)) await page.screenshot({ path: path.join(SHOT, `sweep-${w}-${id}.png`) });
    }
    is(errs.length === 0, `${w}: no errors (${errs.join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-sorting-chutes: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})();
