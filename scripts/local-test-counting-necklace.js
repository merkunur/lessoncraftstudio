#!/usr/bin/env node
/* =====================================================================
   local-test-counting-necklace.js — the interaction gate for ACTIVITY #9,
   "The Necklace That Won't Hold Still" (K.CC.B.4), the Counting Necklace.
   Real clicks on the necklace (each slides one bead), the counter in the
   middle, the waiting cards, a wrong "how many" (named), Count again, the
   right card, the twist on the rendered beads (moved / one more), a wrong
   "now" card (named), the right one → the shell celebrates; every round of
   both ranges, both counting-number settings, every locale asked for, the
   width sweep, the resize broadcast.
   Bead positions are measured on the RENDERED necklace (screen angles of
   the bead centres), not read off the state.
   Usage: node scripts/local-test-counting-necklace.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'necklace.bead-string.k-cc-b-4';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'counting-necklace-activity.js')).strings;
const CORE = require(path.join(MINI, 'counting-necklace-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const QKEY = { spread: 'qSpread', bunch: 'qBunch', oneMore: 'qOneMore' };
function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
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
    await page.goto(`${base}/counting-necklace-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.CountingNecklaceActivity && window.CountingNecklaceActivity.st, { timeout: 8000 });
    await page.evaluate(() => { const t = window.CountingNecklaceActivity; t.TWIST_MS = 120; t.FADE_MS = 120; t.CHECK_MS = 120; document.querySelectorAll('.nk-bead').forEach(b => { b.style.transition = 'none'; }); });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.CountingNecklaceActivity.st; return { id: s.id, n: s.n, total: s.total, counted: s.counted, phase: s.phase, misses: s.misses, note: s.note, done: s.done }; });
  /* the rendered necklace: bead screen angles (0 = the clasp at the top, clockwise), counter, cards */
  const view = (page) => page.evaluate(() => {
    const neck = document.querySelector('.nk-necklace'), nr = neck.getBoundingClientRect(), cx = nr.left + nr.width / 2, cy = nr.top + nr.height / 2;
    const beads = [...document.querySelectorAll('.nk-bead')].filter(b => b.style.display !== 'none').map(b => { const r = b.querySelector('.nk-bead-ball').getBoundingClientRect(); const x = r.left + r.width / 2 - cx, y = r.top + r.height / 2 - cy; let a = Math.atan2(x, -y) * 180 / Math.PI; if (a < 0) a += 360; return { a, d: r.width }; });
    const cards = [...document.querySelectorAll('.nk-card')];
    const wrap = document.querySelector('.nk-wrap');
    return { beads, mode: wrap.classList.contains('is-row') ? 'row' : 'stack', neckW: nr.width, live: !neck.disabled,
      counter: document.querySelector('.nk-counter').classList.contains('is-on') ? document.querySelector('.nk-counter').textContent : '',
      waiting: document.querySelector('.nk-cards').classList.contains('is-wait'), cards: cards.map(c => c.textContent), cardsOn: cards.map(c => !c.disabled),
      right: cards.findIndex(c => c.classList.contains('is-right')), wrong: cards.findIndex(c => c.classList.contains('is-wrong')),
      question: document.querySelector('.nk-question').hidden ? '' : document.querySelector('.nk-question').textContent,
      note: document.querySelector('.nk-note').hidden ? '' : document.querySelector('.nk-note').textContent, recount: !document.querySelector('.nk-recount').hidden,
      cardMin: Math.min(...cards.map(c => Math.min(c.getBoundingClientRect().width, c.getBoundingClientRect().height))) };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const center = async (page, sel) => { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); return c; };
  async function clickSel(page, sel) { const c = await center(page, sel); await page.mouse.click(c.x, c.y); await wait(50); }
  /* a tap ON a bead of the necklace (not the centre): the next bead must still be the one that moves */
  async function tapNecklace(page) { const c = await page.evaluate(() => { const n = document.querySelector('.nk-necklace'); n.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = n.getBoundingClientRect(); return { x: r.left + r.width * 0.5, y: r.top + r.height * 0.92 }; }); await page.mouse.click(c.x, c.y); await wait(40); }
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.CountingNecklaceActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); document.querySelectorAll('.nk-bead').forEach(b => { b.style.transition = 'none'; }); }, i); await wait(150); }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.CountingNecklaceActivity.api.settings[k] = v; window.CountingNecklaceActivity.onSettings(k, v); }, k, v); await wait(250); };
  const near = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d) < 2.5; };
  const angSet = (v) => v.beads.map(b => b.a).sort((x, y) => x - y);
  async function countAll(page, n, shown, tag) {
    for (let k = 1; k <= n; k++) {
      await tapNecklace(page);
      const v = await view(page), st = await state(page);
      is(st.counted === k, `${tag}: tap ${k} slid one bead (counted ${st.counted})`);
      const ang = angSet(v), packed = ang.filter(a => CORE.packAngle(0) - 3 < a && a < CORE.packAngle(k - 1) + 3);
      is(packed.length >= k && ang.slice(0, k).every((a, i) => near(a, CORE.packAngle(i))), `${tag}: after tap ${k} the first ${k} beads sit packed by the clasp`);
      if (k < n) is(v.counter === (shown ? String(k) : ''), `${tag}: the counter says "${v.counter}" (${shown ? 'shown' : 'said aloud'})`);
    }
    await wait(200);
  }

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704, true);
    const S = (k) => STR[k][loc];
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    const ids = await page.evaluate(() => { const t = window.CountingNecklaceActivity, o = []; for (let i = 0; i < 20; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 10).slice().sort().join() === ids.slice(10).slice().sort().join() && ids.slice(0, 10).join() !== ids.slice(10).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'nk');
      is((await page.evaluate(() => window.CountingNecklaceActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      for (let ri = 0; ri < R.length; ri++) {
        const r = R[ri], tag = `[${loc} ${r.id}]`, n = r.n, ans = r.twist === 'oneMore' ? n + 1 : n;
        await forceRound(page, ri);
        let st = await state(page), v = await view(page);
        is(st.n === n && st.phase === 'count' && st.counted === 0 && v.beads.length === n && v.live, `${tag}: ${n} beads on a live necklace`);
        is(angSet(v).every((a, i) => near(a, CORE.arrange(r.start, n, r.seed)[i])), `${tag}: the beads lie ${r.start} as designed`);
        is(v.waiting && v.cards.every(c => c === '') && v.cardsOn.every(x => !x) && v.question === '' && v.note === '' && !v.recount && v.counter === '', `${tag}: three blank waiting cards, nothing else`);
        is(v.beads.every(b => b.d >= 44), `${tag}: beads ≥ 44 px (${Math.min(...v.beads.map(b => b.d)).toFixed(0)})`);
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)) === S('hintSlide'), `${tag}: Check while counting → hintSlide`);
        await countAll(page, n, true, tag);
        st = await state(page); v = await view(page);
        is(st.phase === 'howMany' && !v.live && v.counter === '' && !v.waiting && v.question === S('qHowMany'), `${tag}: all across — the count fades, "${v.question}"`);
        is(v.cards.join() === r.howMany.cards.join() && v.cardsOn.every(Boolean) && v.cardMin >= 64, `${tag}: the cards ${v.cards.join(' ')} (≥ 64 px)`);
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)) === S('hintPick'), `${tag}: Check before a card → hintPick`);
        /* a wrong how-many, then Count again */
        const wi = r.howMany.cards.findIndex(c => c !== n);
        await clickSel(page, `.nk-card:nth-child(${wi + 1})`); st = await state(page); v = await view(page);
        is(st.misses === 1 && v.wrong === wi && v.note === S('noteLast') && v.recount && st.phase === 'howMany', `${tag}: ${r.howMany.cards[wi]} → "${v.note}"`);
        await clickSel(page, '.nk-recount'); st = await state(page); v = await view(page);
        is(st.phase === 'count' && st.counted === 0 && v.live && v.waiting && angSet(v).every((a, i) => near(a, CORE.arrange(r.start, n, r.seed)[i])), `${tag}: Count again lays the beads out again`);
        await countAll(page, n, true, tag + ' recount');
        /* the right how-many → the twist on the rendered necklace */
        await clickSel(page, `.nk-card:nth-child(${r.howMany.cards.indexOf(n) + 1})`); await wait(400);
        await page.evaluate(() => document.querySelectorAll('.nk-bead').forEach(b => { b.style.transition = 'none'; })); await wait(200);
        st = await state(page); v = await view(page);
        is(st.phase === 'after' && v.question === S(QKEY[r.twist]) && v.cards.join() === r.after.cards.join(), `${tag}: right → "${v.question}"`);
        const want = r.twist === 'oneMore' ? Array.from({ length: n + 1 }, (_, i) => CORE.packAngle(i)) : CORE.arrange(r.twist, n, r.seed);
        is(v.beads.length === want.length && angSet(v).every((a, i) => near(a, want[i])), `${tag}: the necklace ${r.twist === 'oneMore' ? 'got one more bead' : 'beads ' + r.twist} (${v.beads.length} beads)`);
        for (const w of r.after.cards.filter(c => c !== ans)) {
          await clickSel(page, `.nk-card:nth-child(${r.after.cards.indexOf(w) + 1})`); v = await view(page);
          const nk = r.twist === 'oneMore' ? (w < n + 1 ? 'noteOneOn' : 'noteOnlyOne') : 'noteMoved';
          is(v.note === S(nk) && v.wrong === r.after.cards.indexOf(w), `${tag}: ${w} → "${v.note}"`);
        }
        await page.evaluate(() => { window.__lastResize = null; window.__h0 = Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height); window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
        await clickSel(page, `.nk-card:nth-child(${r.after.cards.indexOf(ans) + 1})`); await wait(500);
        st = await state(page); v = await view(page);
        is(st.done && (await celebrated(page)) && (await bubble(page)) === interp(S('celebrate'), { n: ans }) && v.right === r.after.cards.indexOf(ans) && !v.recount && v.cardsOn.every(x => !x), `${tag}: ${ans} → the round celebrates ("${await bubble(page)}")`);
        const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height), h0: window.__h0 }));
        is(rs.sent !== null ? Math.abs(rs.sent - rs.app) <= 6 : Math.abs(rs.app - rs.h0) <= 6, `${tag}: the card height is broadcast when it changes (sent ${rs.sent}, card ${rs.app})`);
        if (SHOT && loc === 'en' && ri < 3) await page.screenshot({ path: path.join(SHOT, `nk-${r.id}-done.png`) });
        await clickSel(page, '.lcs-activity-next'); await wait(150);
        st = await state(page);
        is(st.phase === 'count' && st.counted === 0 && st.misses === 0 && !st.done, `${tag}: Next brings a fresh necklace`);
      }
    }
    await setSetting(page, 'range', 'to10');
    /* counting numbers: said aloud */
    await setSetting(page, 'numbers', 'hidden');
    await forceRound(page, 0);
    await countAll(page, CORE.rounds('to10', 'nk')[0].n, false, `[${loc} said aloud]`);
    await setSetting(page, 'numbers', 'shown');
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep: the ten-bead round, counted, asked, twisted, answered — at every width */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const R = CORE.rounds('to10', 'nk'), ri = R.findIndex(r => r.n === 10), r = R[ri];
    await forceRound(page, ri);
    const stageW = await page.evaluate(() => Math.floor(document.querySelector('.nk-wrap').getBoundingClientRect().width));
    const L = CORE.layout(stageW);
    let v = await view(page);
    const tag = `[en @${w}]`;
    const m = await page.evaluate(() => { const wrap = document.querySelector('.nk-wrap').getBoundingClientRect(), neck = document.querySelector('.nk-necklace').getBoundingClientRect(), cards = document.querySelector('.nk-cards').getBoundingClientRect(), chk = document.querySelector('.lcs-activity-check').getBoundingClientRect(); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, fill: (Math.max(neck.right, cards.right) - Math.min(neck.left, cards.left)) / wrap.width, checkBottom: chk.bottom, innerH: window.innerHeight }; });
    is(v.mode === L.mode && Math.abs(v.neckW - L.D) <= 1, `${tag} ${L.mode}: necklace ${v.neckW.toFixed(0)} (want ${L.D})`);
    is(m.overflow <= 2, `${tag} no overflow`);
    is(L.mode === 'row' ? m.fill >= 0.9 : true, `${tag} the necklace and the cards span the stage (${m.fill.toFixed(2)})`);
    is(v.beads.every(b => b.d >= (w >= 700 ? 48 : 28)), `${tag} beads ${Math.min(...v.beads.map(b => b.d)).toFixed(0)} px`);
    is(m.checkBottom <= m.innerH + 1, `${tag} Check at ${m.checkBottom.toFixed(0)} within ${m.innerH} (counting)`);
    await countAll(page, 10, true, tag);
    await clickSel(page, `.nk-card:nth-child(${r.howMany.cards.indexOf(10) + 1})`); await wait(400);
    v = await view(page);
    is(v.cardMin >= 64, `${tag} cards ${v.cardMin.toFixed(0)} ≥ 64`);
    const wrongA = r.after.cards.find(c => c !== 10);
    await clickSel(page, `.nk-card:nth-child(${r.after.cards.indexOf(wrongA) + 1})`);
    const m2 = await page.evaluate(() => ({ checkBottom: document.querySelector('.lcs-activity-check').getBoundingClientRect().bottom, innerH: window.innerHeight, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
    is(m2.overflow <= 2 && (w < 360 || m2.checkBottom <= m2.innerH + 1), `${tag} after a wrong card (note + Count again) Check at ${m2.checkBottom.toFixed(0)} within ${m2.innerH}`);
    await clickSel(page, `.nk-card:nth-child(${r.after.cards.indexOf(10) + 1})`); await wait(500);
    is((await state(page)).done && (await celebrated(page)), `${tag} 10 → done by real taps`);
    const m3 = await page.evaluate(() => ({ nextBottom: document.querySelector('.lcs-activity-next').getBoundingClientRect().bottom, innerH: window.innerHeight }));
    is(w < 360 || m3.nextBottom <= m3.innerH + 1, `${tag} Next at ${m3.nextBottom.toFixed(0)} within ${m3.innerH}`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `nk-en-${w}.png`), fullPage: true });
    is(errs.length === 0, `${tag} no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-counting-necklace: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
