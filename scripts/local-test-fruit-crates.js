#!/usr/bin/env node
/* =====================================================================
   local-test-fruit-crates.js — the interaction gate for ACTIVITY #8,
   "Write the Number 0 to 20 with Fruits" (K.CC.A.3), the Fruit Crates.
   Real taps on the keys (the floating pad on a phone) and the keyboard;
   wrong numbers on the slate (41 / the lone digit / 10 / one short / one
   over / a number for empty crates), the help ladder the crates show
   (landmarks, then count-on with "?"), the right number; every round of
   both ranges, the quick look (cloth + Peek), every locale asked for, the
   width sweep, the resize broadcast.
   The expected slips and chips are computed HERE from the rules in the
   design sheet, not read off the tool.
   Usage: node scripts/local-test-fruit-crates.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.write-numeral.0-20.fruits';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'fruit-crates-activity.js')).strings;
const CORE = require(path.join(MINI, 'fruit-crates-core.js'));
const PICS = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'fruits.json'), 'utf8'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };

/* ---- the rules, written out again from the design sheet ---- */
const POOL20 = [0, 3, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], POOL10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function slipOf(a, n) {
  if (a === n) return 'right';
  if (n === 0) return 'zero';
  const s = String(a);
  if (a >= 10 && a % 10 !== 0 && Number(s[1] + s[0]) === n) return 'reversed';
  if (a >= 1 && a <= 9 && n >= 10 && n % 10 === a) return 'oneDigit';
  if (a === 10 && n > 10) return 'tensOnly';
  return a < n ? 'more' : 'fewer';
}
const marks = (n) => [5, 10, 15, 20].filter(L => L < n);
function level(n, misses) { if (n === 0 || misses === 0) return 0; if (misses >= 2) return 2; return marks(n).length ? 1 : 0; }
function hintFor(slip, n, misses) {
  if (slip === 'zero') return 'hintZero';
  const lv = level(n, misses);
  if (lv === 2) return 'hintCountOn';
  if (slip === 'reversed') return 'hintReversed';
  if (slip === 'oneDigit') return 'hintOneDigit';
  if (slip === 'tensOnly') return 'hintTensOnly';
  if (lv === 0) return slip === 'more' ? 'hintRecountMore' : 'hintRecountFewer';
  return slip === 'more' ? 'hintMore' : 'hintFewer';
}
/* the chips the crates should show, as a string "i:v" list */
function chipsFor(n, misses, done) {
  const out = [];
  if (done) { for (const L of [5, 10, 15, 20]) if (L < n) out.push((L - 1) + ':' + L); if (n > 0) out.push((n - 1) + ':' + n); return out.join(' '); }
  const lv = level(n, misses);
  if (lv >= 1) for (const L of marks(n)) out.push((L - 1) + ':' + L);
  if (lv === 2) { const from = marks(n).length ? marks(n)[marks(n).length - 1] : 0; for (let v = from + 1; v < n; v++) out.push((v - 1) + ':' + v); out.push((n - 1) + ':?'); }
  return out.join(' ');
}

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
  async function open(loc, w, tall) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    page.on('response', r => { if (r.status() === 404 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push('404 ' + r.url()); });
    await page.setViewport({ width: w, height: tall ? 1500 : (w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 900) });   /* the visual-qa folds */
    await page.goto(`${base}/fruit-crates-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FruitCratesActivity && window.FruitCratesActivity.st && window.FruitCratesActivity._theme, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.FruitCratesActivity.st; return { id: s.id, n: s.n, crates: s.crates, noun: s.noun, typed: s.typed, misses: s.misses, checked: s.checked ? { ok: s.checked.ok, slip: s.checked.slip } : null, done: s.done }; });
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const view = (page) => page.evaluate(() => {
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden'; };
    const crates = [...document.querySelectorAll('.fc-crate')].filter(c => !c.hidden);
    const boxes = crates.flatMap(c => [...c.querySelectorAll('.fc-box')]);
    const fruit = boxes.map((b, i) => ({ i, img: b.querySelector('img') })).filter(x => x.img);
    const img = fruit[0] && fruit[0].img, ir = img ? img.getBoundingClientRect() : null;
    const chips = boxes.map((b, i) => { const c = b.querySelector('.fc-chip'); return c.classList.contains('is-on') ? i + ':' + c.textContent : null; }).filter(Boolean).join(' ');
    const gold = boxes.map((b, i) => b.querySelector('.fc-chip.is-gold') ? i : -1).filter(i => i >= 0);
    const slate = document.querySelector('.fc-slate'), wrap = document.querySelector('.fc-wrap');
    return { crates: crates.length, fruit: fruit.length, fruitIdx: fruit.map(x => x.i).join(','), visibleFruit: fruit.filter(x => vis(x.img)).length,
      img: img ? { src: img.getAttribute('src'), alt: img.alt, w: Math.min(ir.width, ir.height), nat: img.naturalWidth } : null, chips, gold,
      slate: slate.textContent, slateAria: slate.getAttribute('aria-label'), slateGold: slate.classList.contains('is-gold'), slateWrong: slate.classList.contains('is-wrong'),
      mode: wrap.classList.contains('is-row') ? 'row' : 'stack', covered: wrap.classList.contains('is-covered'), peekShown: !document.querySelector('.fc-peek').hidden,
      padShown: !document.querySelector('.fc-pad').hidden, pencilShown: !document.querySelector('.fc-pencil').hidden,
      keysDisabled: [...document.querySelectorAll('.fc-key:not(.fc-key-erase):not(.fc-key-done)')].every(k => k.disabled), eraseDisabled: document.querySelector('.fc-key-erase').disabled };
  });
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); return c; };
  async function clickSel(page, sel) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(60); }
  /* write a number with real key taps (opening the floating pad on a phone) */
  async function writeNum(page, a) {
    const v = await view(page);
    if (!v.padShown) await clickSel(page, '.fc-pencil');
    while ((await state(page)).typed !== '') await clickSel(page, '.fc-key-erase');
    for (const d of String(a)) await clickSel(page, `.fc-key:nth-child(${d === '0' ? 10 : Number(d)})`);
    if ((await view(page)).mode === 'stack') await clickSel(page, '.fc-key-done');
  }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.FruitCratesActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    /* let the fruit land (the drop-in scales it) before anything is measured */
    await page.waitForFunction(() => { const t = window.FruitCratesActivity; return !t.st || [...document.querySelectorAll('.fc-box.fc-in .fc-fruit')].every(f => f.getAnimations().every(a => a.playState === 'finished')); }, { timeout: 4000 }).catch(() => {});
    await wait(60);
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.FruitCratesActivity.api.settings[k] = v; window.FruitCratesActivity.onSettings(k, v); }, k, v); await wait(250); };
  const label = (noun, loc) => { const e = PICS.nouns[noun]; return e ? (e.labels[loc] || e.labels.en)[0] : null; };

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const S = (k) => STR[k][loc];
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    const pool = await page.evaluate(() => window.FruitCratesActivity._pool.map(r => r.n));
    is(pool.join() === POOL20.join(), `[${loc}] pool = the 14 to-20 rounds (${pool.join()})`);
    const ids = await page.evaluate(() => { const t = window.FruitCratesActivity, o = []; for (let i = 0; i < 28; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 14).slice().sort().join() === ids.slice(14).slice().sort().join() && ids.slice(0, 14).join() !== ids.slice(14).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    const nouns = await page.evaluate(() => [...new Set(window.FruitCratesActivity._pool.map(r => r.noun))]);
    is(nouns.length >= 7 && nouns.every(nn => PICS.nouns[nn]), `[${loc}] ${nouns.length} different library fruits over the pool`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    for (let ri = 0; ri < POOL20.length; ri++) {
      const n = POOL20[ri];
      await forceRound(page, ri);
      let st = await state(page), tag = `[${loc} n=${n}]`, v = await view(page);
      is(st.n === n && st.crates === 2 && !st.done && st.typed === '' && st.misses === 0, `${tag} fresh state`);
      is((await promptText(page)) === S('promptCrates'), `${tag} prompt`);
      is(v.mode === 'row' && v.crates === 2 && v.padShown && !v.pencilShown && !v.peekShown && !v.covered, `${tag} row layout, two crates, the key row`);
      /* the fruit sits in frame order: boxes 0..n-1, the first crate filled before the second */
      const wantIdx = Array.from({ length: n }, (_, i) => i).join(',');
      is(v.fruit === n && v.visibleFruit === n && v.fruitIdx === wantIdx && v.chips === '' && v.slate === '' && v.slateAria === S('slateEmpty'), `${tag} ${n} fruit in frame order, no numbers on them, the slate empty`);
      if (n) is(!!v.img && /^\/image-library-webp\/themes\/fruits\//.test(v.img.src) && v.img.nat > 0 && v.img.w >= 96 && v.img.alt === label(st.noun, loc), `${tag} library ${st.noun} ≥ 96 px (${v.img && v.img.w.toFixed(0)}), alt "${v.img && v.img.alt}"`);
      if (ri === 0) { const pk = await page.evaluate(() => { const cr = [...document.querySelectorAll('.fc-crate')].filter(c => !c.hidden).map(c => c.getBoundingClientRect()), pad = document.querySelector('.fc-pad').getBoundingClientRect(), ks = [...document.querySelectorAll('.fc-key')].filter(k => k.offsetParent !== null), keys = ks.map(k => k.getBoundingClientRect()); return { below: pad.top >= Math.max(...cr.map(r => r.bottom)) - 1, stacked: cr.length === 2 && cr[1].top >= cr[0].bottom - 1, oneRow: new Set(keys.map(k => Math.round(k.top))).size === 1, order: ks.map(k => k.textContent).join(''), keyMin: Math.min(...keys.map(k => Math.min(k.width, k.height))) }; }); is(pk.below && pk.stacked && pk.oneRow && pk.order === '1234567890⌫' && pk.keyMin >= 44, `${tag} the crates one above the other, eleven keys in one row under them, in order, ≥ 44 px (${pk.order}, ${pk.keyMin.toFixed(0)})`); }
      /* Check with nothing written */
      await clickSel(page, '.lcs-activity-check'); st = await state(page);
      is((await bubble(page)).text === S('hintNone') && /tryagain/.test((await bubble(page)).cls) && st.misses === 0, `${tag} Check with an empty slate → hintNone, no miss counted`);
      /* wrong numbers, each named; the crates read themselves */
      const rv = n >= 10 ? Number(String(n).split('').reverse().join('')) : null;
      const wrongs = n === 0 ? [3, 1] : n >= 10 ? [rv, n % 10, 10, n - 1, n + 1].filter(a => a !== null && a !== n && a > 0 && a <= 99) : [n - 1, n + 1].filter(a => a >= 0);
      let misses = 0;
      for (const a of [...new Set(wrongs)]) {
        await writeNum(page, a); st = await state(page);
        is(st.typed === String(a) && (await view(page)).slate === String(a), `${tag} wrote ${a} on the slate`);
        await clickSel(page, '.lcs-activity-check'); st = await state(page); v = await view(page); misses++;
        const slip = slipOf(a, n);
        is(st.checked && !st.checked.ok && st.checked.slip === slip && st.misses === misses && !st.done, `${tag} ${a} → ${slip} (got ${st.checked && st.checked.slip}), miss ${st.misses}`);
        const hk = hintFor(slip, n, misses);
        is((await bubble(page)).text === S(hk) && v.slateWrong, `${tag} ${a}: the bubble says ${hk} ("${(await bubble(page)).text}")`);
        is(v.chips === chipsFor(n, misses, false), `${tag} ${a} (miss ${misses}): chips "${v.chips}" — want "${chipsFor(n, misses, false)}"`);
        is(!/(^| )\d+:(\d+)$/.test(v.chips) || !v.chips.split(' ').some(c => c === (n - 1) + ':' + n), `${tag} the help never writes ${n} on the last fruit`);
      }
      /* the right number */
      await writeNum(page, n);
      await page.evaluate(() => { window.__lastResize = null; window.__h0 = Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height); window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
      await clickSel(page, '.lcs-activity-check'); await wait(450); st = await state(page); v = await view(page);
      is(st.done && (await celebrated(page)) && (await bubble(page)).text === interp(S('celebrate'), { n }) && v.slateGold && v.padShown && v.keysDisabled && v.eraseDisabled, `${tag} the right number: the slate turns gold, the keys rest (${(await bubble(page)).text})`);
      is(v.chips === chipsFor(n, misses, true) && (n === 0 ? v.gold.length === 0 : v.gold.join() === String(n - 1)), `${tag} the crates read themselves: "${v.chips}", gold on the last fruit`);
      /* the shell broadcasts on a height CHANGE; a round whose card did not change height owes no message */
      const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height), h0: window.__h0 }));
      is(rs.sent !== null ? Math.abs(rs.sent - rs.app) <= 6 : Math.abs(rs.app - rs.h0) <= 6, `${tag} a completed round broadcasts the card height when it changes (sent ${rs.sent}, card ${rs.app}, before ${rs.h0})`);
      if (SHOT && n === 14) await page.screenshot({ path: path.join(SHOT, `fc-${loc}-done.png`) });
      await clickSel(page, '.lcs-activity-next'); await wait(150);
      st = await state(page);
      is(!st.done && st.typed === '' && st.misses === 0 && st.checked === null, `${tag} Next clears`);
    }
    /* the keyboard writes too */
    await forceRound(page, POOL20.indexOf(17));
    await page.keyboard.press('7'); await page.keyboard.press('Backspace'); await page.keyboard.press('1'); await page.keyboard.press('7');
    is((await state(page)).typed === '17', `[${loc}] the keyboard writes and erases on the slate`);
    /* the quick look: a cloth, Peek, uncovered for good after a Check */
    await setSetting(page, 'look', 'quick');
    await page.evaluate(() => { window.FruitCratesActivity.SHOW_MS = 300; window.FruitCratesActivity.DROP_MS = 5; });
    await forceRound(page, POOL20.indexOf(14)); await wait(900);
    let v = await view(page);
    is(v.covered && v.peekShown, `[${loc}] quick look: the cloth covers the crates, Peek shows`);
    await clickSel(page, '.fc-peek'); v = await view(page);
    is(!v.covered && !v.peekShown, `[${loc}] Peek lifts the cloth`);
    await wait(700); v = await view(page);
    is(v.covered, `[${loc}] the cloth comes back after the look`);
    await writeNum(page, 4); await clickSel(page, '.lcs-activity-check'); await wait(900); v = await view(page);
    is(!v.covered && !v.peekShown && v.chips === chipsFor(14, 1, false), `[${loc}] after a Check the crates stay open and read themselves`);
    await page.evaluate(() => { window.FruitCratesActivity.SHOW_MS = 2600; window.FruitCratesActivity.DROP_MS = 45; });
    await setSetting(page, 'look', 'open');
    /* range to 10: one crate */
    await setSetting(page, 'range', 'to10');
    is((await page.evaluate(() => window.FruitCratesActivity._pool.map(r => r.n).join())) === POOL10.join(), `[${loc}] range to 10: the eleven small rounds`);
    await forceRound(page, POOL10.indexOf(7)); v = await view(page);
    is(v.crates === 1 && v.fruit === 7 && (await promptText(page)) === S('promptCrate'), `[${loc}] to 10: one crate of seven, promptCrate`);
    await writeNum(page, 6); await clickSel(page, '.lcs-activity-check'); v = await view(page);
    is(v.chips === chipsFor(7, 1, false) && (await bubble(page)).text === S('hintMore'), `[${loc}] to 10, 6 for 7: the 5 shows, hintMore`);
    await setSetting(page, 'range', 'to20');
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep: the fullest round (20) and a teen round at every width */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const n of [20, 13]) {
      await forceRound(page, POOL20.indexOf(n));
      const stageW = await page.evaluate(() => Math.floor(document.querySelector('.fc-wrap').getBoundingClientRect().width));
      const L = CORE.layout(stageW, 2);
      let v = await view(page);
      const m = await page.evaluate(() => {
        const wrap = document.querySelector('.fc-wrap').getBoundingClientRect(), chk = document.querySelector('.lcs-activity-check').getBoundingClientRect();
        const crates = [...document.querySelectorAll('.fc-crate')].filter(c => !c.hidden).map(c => c.getBoundingClientRect());
        const box = document.querySelector('.fc-box').getBoundingClientRect();
        const keys = [...document.querySelectorAll('.fc-key')].filter(k => !k.hidden && k.offsetParent !== null).map(k => k.getBoundingClientRect());
        const left = Math.min(...crates.map(r => r.left)), right = Math.max(...crates.map(r => r.right));
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, fill: (right - left) / wrap.width, inside: left >= wrap.left - 1 && right <= wrap.right + 1, boxW: box.width, checkBottom: chk.bottom, innerH: window.innerHeight, keyMin: keys.length ? Math.min(...keys.map(k => Math.min(k.width, k.height))) : 0, side: crates.length === 2 && Math.abs(crates[0].top - crates[1].top) < 2 };
      });
      const tag = `[en @${w} n=${n}]`;
      is(v.mode === L.mode && Math.abs(m.boxW - L.boxW) <= 1 && m.side === (L.mode === 'stack'), `${tag} ${L.mode}: box ${m.boxW.toFixed(0)} (want ${L.boxW}), crates ${m.side ? 'side by side' : 'stacked'}`);
      is(m.overflow <= 2 && m.inside, `${tag} no overflow, the crates inside the stage`);
      is(m.fill >= 0.9, `${tag} the crates fill the stage width (${m.fill.toFixed(2)})`);
      is(v.img && v.img.w >= (w >= 700 ? 96 : 64), `${tag} fruit ${v.img && v.img.w.toFixed(0)} px`);
      is(m.checkBottom <= m.innerH + 1, `${tag} Check at ${m.checkBottom.toFixed(0)} within ${m.innerH}`);
      if (L.mode === 'row') { is(v.padShown && m.keyMin >= 44 && Math.abs(m.keyMin - L.key) <= 1, `${tag} the key row, keys ${m.keyMin.toFixed(0)} ≥ 44`); }
      else {
        is(!v.padShown && v.pencilShown, `${tag} the pad is folded away; the pencil shows`);
        await clickSel(page, '.fc-pencil'); const m2 = await page.evaluate(() => { const pad = document.querySelector('.fc-pad').getBoundingClientRect(), wrap = document.querySelector('.fc-wrap').getBoundingClientRect(), keys = [...document.querySelectorAll('.fc-key')].map(k => k.getBoundingClientRect()); return { inside: pad.left >= wrap.left - 1 && pad.right <= wrap.right + 1, keyMin: Math.min(...keys.map(k => Math.min(k.width, k.height))), shown: !document.querySelector('.fc-pad').hidden }; });
        is(m2.shown && m2.inside && m2.keyMin >= 44, `${tag} the floating pad opens inside the stage, keys ≥ 44 (${m2.keyMin.toFixed(0)})`);
        await clickSel(page, '.fc-key:nth-child(2)'); await clickSel(page, '.fc-key-done'); v = await view(page);
        is(!v.padShown && v.slate === '2', `${tag} Done folds the pad; the slate keeps the digit`);
      }
      /* a miss, then the right number, at this width */
      await writeNum(page, n - 1); await clickSel(page, '.lcs-activity-check');
      const c1 = await page.evaluate(() => ({ checkBottom: document.querySelector('.lcs-activity-check').getBoundingClientRect().bottom, innerH: window.innerHeight }));
      /* 320 × 640 cannot hold the shell's hint bubble without fruit below the 64 px floor: there a miss scrolls (recorded in the design sheet) */
      if (w >= 360) is(c1.checkBottom <= c1.innerH + 1, `${tag} after a miss (bubble shown) Check stays in the fold (${c1.checkBottom.toFixed(0)} / ${c1.innerH})`);
      await writeNum(page, n); await clickSel(page, '.lcs-activity-check'); await wait(400);
      is((await state(page)).done && (await celebrated(page)), `${tag} ${n} by real taps`);
      if (SHOT) await page.screenshot({ path: path.join(SHOT, `fc-en-${w}-${n}.png`), fullPage: true });
    }
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-fruit-crates: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
