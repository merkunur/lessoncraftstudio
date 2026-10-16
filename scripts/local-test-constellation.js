#!/usr/bin/env node
/* =====================================================================
   local-test-constellation.js — the interaction gate for ACTIVITY #4, "Count
   the Stars Awake" (K.CC.A.2), the Constellation Thread. Real pointer, every
   round of both pools, every locale asked for, both skies, the width sweep,
   the resize broadcast. Usage: node scripts/local-test-constellation.js [--locales=en,de,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'star-stitcher.connect-sequence.k-cc-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'constellation-activity.js')).strings;
const CORE = require(path.join(MINI, 'constellation-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
const shapeKey = (s) => 'shape' + s.charAt(0).toUpperCase() + s.slice(1);
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
    await page.setViewport({ width: w, height: tall ? 1700 : (w <= 420 ? 740 : 900) });
    await page.goto(`${base}/constellation-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.ConstellationActivity && window.ConstellationActivity.st && document.querySelectorAll('.sky-star').length === window.ConstellationActivity.st.stars.length, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => { const s = window.ConstellationActivity.st; return { start: s.start, end: s.end, N: s.N, shape: s.shape, cur: s.cur, lit: s.lit.slice(), done: s.done, stars: s.stars.map(q => ({ v: q.v, kind: q.kind })) }; });
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, shown: b.classList.contains('show'), cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const note = (page) => page.evaluate(() => { const n = document.querySelector('.sky-note'); return { text: n.textContent, slip: n.classList.contains('is-slip'), done: n.classList.contains('is-done') }; });
  const chips = (page) => page.evaluate(() => [...document.querySelectorAll('.sky-chip')].map(c => Number(c.textContent)));
  const nowText = (page) => page.evaluate(() => document.querySelector('.sky-now').textContent);
  const inkCount = (page) => page.evaluate(() => document.querySelectorAll('.sky-thread .sky-ink').length);
  async function tapStar(page, v) {
    const box = await page.evaluate((v) => { const el = document.querySelector(`.sky-star[data-v="${v}"]`); if (!el) return null; el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, v);
    if (!box) throw new Error('no star ' + v);
    await page.mouse.click(box.x, box.y); await wait(40);
  }
  async function clickSel(page, sel) {
    const box = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    if (!box) throw new Error('no element ' + sel);
    await page.mouse.click(box.x, box.y); await wait(60);
  }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.ConstellationActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await wait(120);
  }
  const starInfo = (page) => page.evaluate(() => [...document.querySelectorAll('.sky-star')].map(b => { const r = b.getBoundingClientRect(); return { v: Number(b.dataset.v), kind: b.dataset.kind, lit: b.classList.contains('is-lit'), here: b.classList.contains('is-here'), w: r.width, h: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2, label: b.getAttribute('aria-label'), disc: b.querySelector('.sky-disc').textContent }; }));
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.ConstellationActivity.api.settings[k] = v; window.ConstellationActivity.onSettings(k, v); }, k, v); await wait(200); };

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const S = (k) => STR[k][loc];
    is(!!S('title') && (await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    const pool = await page.evaluate(() => window.ConstellationActivity._pool.map(r => r.shape + ':' + r.start));
    is(pool.join() === CORE.rounds(10, 'sky').map(r => r.shape + ':' + r.start).join() && pool.length === 9, `[${loc}] pool to 10 = 9 rounds (${pool.join(' ')})`);
    const ids = await page.evaluate(() => { const t = window.ConstellationActivity, o = []; for (let i = 0; i < 18; i++) o.push(t.nextTask({ index: i }).id); return o; });
    is(ids.slice(0, 9).slice().sort().join() === ids.slice(9).slice().sort().join() && ids.slice(0, 9).join() !== ids.slice(9).join(), `[${loc}] pass 2 re-serves the pool in a new order`);
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    for (const [range, count] of [['10', 9], ['20', 10]]) {
      if (range === '20') { await setSetting(page, 'range', '20'); is((await page.evaluate(() => window.ConstellationActivity._pool.length)) === 10, `[${loc}] to 20 → 10 rounds`); }
      for (let i = 0; i < count; i++) {
        await forceRound(page, i);
        let st = await state(page);
        const { start: s, end: e, shape } = st, tag = `[${loc} ${range} ${shape} ${s}→${e}]`;
        const expect = CORE.newState(CORE.rounds(Number(range), 'sky')[i], 'starry');
        is(st.stars.length === expect.stars.length && st.stars.map(q => q.v).join() === expect.stars.map(q => q.v).join(), `${tag} the sky has the model's ${expect.stars.length} stars`);
        is((await promptText(page)) === interp(S('prompt'), { s, e }), `${tag} prompt`);
        let si = await starInfo(page);
        is(si.length === st.stars.length && si.every(q => q.w >= 57 && q.h >= 57), `${tag} ${si.length} stars ≥ 57 px at 704 (min ${Math.min(...si.map(q => q.w)).toFixed(0)})`);
        is(si.filter(q => q.lit).length === 1 && si.find(q => q.v === s).lit && si.find(q => q.v === s).here, `${tag} only ${s} is awake, with the halo`);
        is(si.every(q => q.disc === String(q.v)), `${tag} every star shows its numeral`);
        is(si.find(q => q.v === s).label === interp(S('starHere'), { v: s }) && si.find(q => q.v === e).label === interp(S('starSleeping'), { v: e }), `${tag} star labels`);
        is((await nowText(page)) === String(s) && (await chips(page)).join() === String(s) && (await note(page)).text === interp(S('noteNext'), { cur: s }), `${tag} the strip reads ${s}`);
        is((await inkCount(page)) === 0, `${tag} no thread yet`);
        /* Check before any tap → hintStart */
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)).text === S('hintStart') && /tryagain/.test((await bubble(page)).cls), `${tag} Check first → hintStart`);
        /* the slips: 1 (back), the star you stand on (same), a star too far (skip) */
        if (st.stars.some(q => q.v === 1)) { await tapStar(page, 1); const n1 = await note(page); st = await state(page); is(n1.slip && n1.text === interp(S('noteBack'), { v: 1, cur: s }) && st.lit.length === 1, `${tag} tap 1 → noteBack, nothing lit`); }
        await tapStar(page, s); { const n2 = await note(page); is(!n2.slip && n2.text === interp(S('noteSame'), { cur: s }), `${tag} tap ${s} → noteSame`); }
        await tapStar(page, s + 2); { const n3 = await note(page); st = await state(page); is(n3.slip && n3.text === interp(S('noteSkip'), { v: s + 2, cur: s }) && st.lit.length === 1, `${tag} tap ${s + 2} → noteSkip, nothing lit`); }
        /* the first right star */
        await tapStar(page, s + 1); st = await state(page); si = await starInfo(page);
        is(st.cur === s + 1 && st.lit.join() === `${s},${s + 1}` && si.find(q => q.v === s + 1).lit && si.find(q => q.v === s + 1).here && !si.find(q => q.v === s).here, `${tag} ${s + 1} wakes and takes the halo`);
        is((await inkCount(page)) === 1 && (await chips(page)).join() === `${s},${s + 1}` && (await note(page)).text === interp(S('noteNext'), { cur: s + 1 }), `${tag} one thread segment, chips ${s} ${s + 1}`);
        /* a lit star tapped again → back */
        await tapStar(page, s); { const n4 = await note(page); st = await state(page); is(n4.slip && n4.text === interp(S('noteBack'), { v: s, cur: s + 1 }) && st.cur === s + 1, `${tag} tapping the lit start → noteBack`); }
        /* Check mid-run → hintUnfinished */
        await clickSel(page, '.lcs-activity-check');
        is((await bubble(page)).text === S('hintUnfinished'), `${tag} Check mid-run → hintUnfinished`);
        /* Start again */
        await clickSel(page, '.sky-again'); st = await state(page);
        is(st.cur === s && st.lit.length === 1 && (await inkCount(page)) === 0 && (await chips(page)).length === 1, `${tag} Start again relights only ${s}`);
        is(await page.evaluate(() => document.querySelector('.sky-again').disabled), `${tag} Start again is disabled on a fresh sky`);
        if (SHOT && range === '10' && shape === 'kite') { await tapStar(page, s + 1); await tapStar(page, s + 2); await tapStar(page, 1); await wait(300); await page.screenshot({ path: path.join(SHOT, `sky-${loc}-kite-mid.png`) }); await clickSel(page, '.sky-again'); }
        /* the whole run → auto-Check → celebrate */
        for (let v = s + 1; v <= e; v++) await tapStar(page, v);
        st = await state(page);
        is(st.done && st.lit.length === e - s + 1, `${tag} the run completes`);
        await wait(1100);
        const b = await bubble(page);
        const want = interp(S('celebrate'), { s, e, shape: STR[shapeKey(shape)][loc] });
        is((await celebrated(page)) && b.text === want, `${tag} Check fired itself → "${want}" (got "${b.text}")`);
        is((await inkCount(page)) === (e - s) + CORE.SHAPES[shape].close.length, `${tag} the thread + ${CORE.SHAPES[shape].close.length} closing lines are drawn`);
        is((await note(page)).done && (await note(page)).text === interp(S('noteDone'), { s, e }), `${tag} the strip says done`);
        si = await starInfo(page); is(si.filter(q => q.lit).length === e - s + 1 && si.filter(q => q.kind === 'extra').every(q => !q.lit), `${tag} the picture's stars are awake, the extras still sleep`);
        if (SHOT && range === '10' && shape === 'kite') await page.screenshot({ path: path.join(SHOT, `sky-${loc}-kite-done.png`) });
        if (SHOT && range === '20' && shape === 'stairs') await page.screenshot({ path: path.join(SHOT, `sky-${loc}-stairs-done.png`) });
        await clickSel(page, '.lcs-activity-next'); await wait(150);
        st = await state(page);
        is(!st.done && st.lit.length === 1 && (await inkCount(page)) === 0, `${tag} Next clears`);
      }
    }
    /* sky: clear → only the picture's stars */
    await setSetting(page, 'sky', 'clear'); await forceRound(page, 0);
    let sc = await state(page);
    is(sc.stars.every(q => q.kind === 'path') && sc.stars.length === sc.end - sc.start + 1, `[${loc}] clear sky: only the picture's ${sc.stars.length} stars`);
    await setSetting(page, 'sky', 'starry'); await forceRound(page, 0); sc = await state(page);
    is(sc.stars.some(q => q.kind === 'extra'), `[${loc}] starry sky: extra stars are back`);
    await setSetting(page, 'range', '10');
    /* the resize broadcast: a short picture, then a taller sky (the phone aspect is not reachable here; use clear → starry? no: the sky height is width-bound) — so change the strip height instead: a long note */
    await forceRound(page, 0); await wait(1300);
    await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
    await page.evaluate(() => { window.ConstellationActivity.api.settings.range = '20'; window.ConstellationActivity.onSettings('range', '20'); }); await wait(600);
    const s20 = await state(page); for (let v = s20.start + 1; v <= s20.end; v++) await tapStar(page, v); await wait(1500);
    const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height) }));
    is(rs.sent !== null && Math.abs(rs.sent - rs.app) <= 6, `[${loc}] a completed round (Next shown) broadcasts the card height (sent ${rs.sent}, card ${rs.app})`);
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  /* width sweep: both pools, both skies — stars ≥ 44, apart, inside the sky; the strip inside the viewport */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const range of ['10', '20']) for (const sky of ['starry', 'clear']) {
      await setSetting(page, 'range', range); await setSetting(page, 'sky', sky);
      await forceRound(page, range === '10' ? 8 : 3); await wait(80);
      const m = await page.evaluate(() => {
        const cs = [...document.querySelectorAll('.sky-star')].map(b => b.getBoundingClientRect());
        const mat = document.querySelector('.sky-mat').getBoundingClientRect();
        const strip = document.querySelector('.sky-strip').getBoundingClientRect();
        const again = document.querySelector('.sky-again').getBoundingClientRect();
        let minD = Infinity; for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) minD = Math.min(minD, Math.hypot(cs[i].left - cs[j].left, cs[i].top - cs[j].top));
        return { n: cs.length, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, minW: Math.min(...cs.map(r => r.width)), minD, inMat: cs.every(r => r.left >= mat.left - 1 && r.right <= mat.right + 1 && r.top >= mat.top - 1 && r.bottom <= mat.bottom + 1), matIn: mat.right <= window.innerWidth + 1 && mat.left >= -1, stripIn: strip.right <= window.innerWidth + 1 && strip.left >= -1, againH: again.height, matH: mat.height, matW: mat.width };
      });
      const tag = `[en @${w} ${range} ${sky}]`;
      is(m.n >= 5, `${tag} ${m.n} stars`);
      is(m.overflow <= 2, `${tag} no horizontal overflow (${m.overflow})`);
      is(m.minW >= 44, `${tag} stars ≥ 44 (got ${m.minW.toFixed(0)})`);
      is(m.minD >= 1.12 * m.minW - 1, `${tag} star centres ≥ 1.12 × star apart (${m.minD.toFixed(0)} vs ${(1.12 * m.minW).toFixed(0)})`);
      is(m.inMat && m.matIn && m.stripIn, `${tag} stars inside the sky, sky and strip inside the viewport`);
      is(m.againH >= 44, `${tag} Start again ≥ 44 tall`);
      is(Math.abs(m.matH - Math.round(m.matW * (m.matW < 480 ? 1.0 : 0.66))) <= 2, `${tag} sky aspect (${m.matW.toFixed(0)}×${m.matH.toFixed(0)})`);
      if (SHOT && sky === 'starry') await page.screenshot({ path: path.join(SHOT, `sky-en-${range}-${w}.png`), fullPage: true });
    }
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-constellation: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
