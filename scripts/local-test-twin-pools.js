#!/usr/bin/env node
/* =====================================================================
   local-test-twin-pools.js — the interaction gate for ACTIVITY #15,
   "Twinsies — count how many & count out that many" (K.CC.B.5), the
   Twin Pools. Real clicks: a mark on a first-pool creature (on, off);
   empty places in the twin pool (a creature goes in); a creature in the
   twin pool (it comes out); Empty the twin pool; the shell Check through
   every slip (empty · too many · too few · too many again) to done; the
   twin pool numbered after miss 1; the strings and the lone rings after
   miss 2, each string ending on a creature at both ends; the strings on
   every pair when done; the "same creatures" and "up to 5" settings;
   every round of both ranges, every locale asked for, the width sweep.
   Usage: node scripts/local-test-twin-pools.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'twinsies.count-twin.k-cc-b-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'twin-pools-activity.js')).strings;
const CORE = require(path.join(MINI, 'twin-pools-core.js'));
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
    await page.goto(`${base}/twin-pools-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.TwinPoolsActivity && window.TwinPoolsActivity.st && window.TwinPoolsActivity._theme, { timeout: 8000 });
    await page.evaluate(() => { window.TwinPoolsActivity.STRING_MS = 20; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.TwinPoolsActivity.api.settings[k] = v; window.TwinPoolsActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.TwinPoolsActivity.st; return { id: s.id, n: s.n, model: s.model, twin: s.twin, places: s.places, filled: s.filled.slice(), marks: s.marks.filter(Boolean).length, misses: s.misses, done: s.done }; });
  const view = (page) => page.evaluate(() => {
    const vis = (el) => !el.hidden && el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden';
    const models = [...document.querySelectorAll('.tw-m')].filter(vis);
    const places = [...document.querySelectorAll('.tw-place')].filter(vis);
    const full = places.filter(p => p.classList.contains('is-full'));
    const pic = (el) => { const im = el && el.querySelector('img'); if (!im) return null; return { src: im.getAttribute('src'), w: Math.min(im.offsetWidth, im.offsetHeight), nat: im.naturalWidth }; };   /* the picture's own size, not a tilted box */
    const box = (s) => document.querySelector(s).getBoundingClientRect();
    const fp = box('.tw-first'), tp = box('.tw-twin');
    const rects = models.map(d => d.getBoundingClientRect());
    /* the creatures and their buttons are round: overlap = how far two circles cut into each other, as a share of a diameter */
    let overlap = 0; for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) { const a = rects[i], b = rects[j]; const d = Math.hypot((a.left + a.width / 2) - (b.left + b.width / 2), (a.top + a.height / 2) - (b.top + b.height / 2)), dia = models[0].offsetWidth; overlap = Math.max(overlap, (dia - d) / dia); }   /* the unrotated diameter: a tilt only inflates the box */
    const nums = (els) => els.map(d => { const n = d.querySelector('.tw-num'); return n.classList.contains('is-on') ? n.textContent : ''; });
    const order = (els) => els.map(e => e.getBoundingClientRect()).map((r, i) => ({ i, x: r.left + r.width / 2, y: r.top + r.height / 2 })).sort((a, b) => (a.x - b.x) || (a.y - b.y)).map(o => o.i);
    /* each string's two ends, in page px, against the creatures' centres */
    const svg = document.querySelector('.tw-strings'), sr = svg.getBoundingClientRect();
    const paths = [...svg.querySelectorAll('path')];
    const centres = (els) => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 }; });
    const mc = centres(models), tc = centres(full);
    const near = (pt, list) => list.findIndex(c => Math.hypot(c.x - pt.x, c.y - pt.y) <= c.r * 0.85);   /* tied at the creature's edge, inside its round */
    const ends = paths.map(p => { const d = p.getAttribute('d').match(/-?\d+(\.\d+)?/g).map(Number); return { a: near({ x: sr.left + d[0], y: sr.top + d[1] }, mc), b: near({ x: sr.left + d[4], y: sr.top + d[5] }, tc) }; });
    const usedA = new Set(ends.map(e => e.a)), usedB = new Set(ends.map(e => e.b));
    return { models: models.length, places: places.length, full: full.length, modelPic: pic(models[0]), twinPic: pic(full[0]), overlap,
      inFirst: rects.every(r => r.left >= fp.left - 4 && r.right <= fp.right + 4 && r.top >= fp.top - 4 && r.bottom <= fp.bottom + 4),
      inTwin: places.every(p => { const r = p.getBoundingClientRect(); return r.left >= tp.left && r.right <= tp.right && r.top >= tp.top && r.bottom <= tp.bottom; }),
      marked: models.filter(m => m.classList.contains('is-marked') && m.getAttribute('aria-pressed') === 'true').length,
      ticks: models.filter(m => getComputedStyle(m.querySelector('.tw-tick')).display !== 'none').length,
      mNums: nums(models).slice().sort((a, b) => (+a || 99) - (+b || 99)), tNums: nums(full),
      sameNumberEnds: ends.every(e => e.a >= 0 && e.b >= 0 && models[e.a].querySelector('.tw-num').textContent === full[e.b].querySelector('.tw-num').textContent),
      mGold: models.filter(d => d.querySelector('.tw-num').classList.contains('is-gold')).length, tGold: full.filter(d => d.querySelector('.tw-num').classList.contains('is-gold')).length,
      strings: paths.length, knots: svg.querySelectorAll('circle').length, endsOk: ends.every(e => e.a >= 0 && e.b >= 0) && usedA.size === ends.length && usedB.size === ends.length,
      loneM: models.filter(m => m.classList.contains('is-lone')).length, loneT: full.filter(m => m.classList.contains('is-lone')).length,
      placeAria: places.filter(p => !p.classList.contains('is-full')).every(p => p.getAttribute('aria-label')) ? places.find(p => !p.classList.contains('is-full'))?.getAttribute('aria-label') : null,
      backAria: full[0] ? full[0].getAttribute('aria-label') : null, markAria: models[0] ? models[0].getAttribute('aria-label') : null,
      emptyBtn: getComputedStyle(document.querySelector('.tw-empty')).visibility !== 'hidden', mode: ['wide', 'narrow', 'stack'].find(m => document.querySelector('.tw-wrap').classList.contains('is-' + m)) };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickEl(page, sel, pick) {
    const c = await page.evaluate((s, pick) => { const els = [...document.querySelectorAll(s)].filter(e => !e.hidden && e.offsetParent !== null && getComputedStyle(e).visibility !== 'hidden'); const el = els[pick || 0]; if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel, pick);
    if (!c) throw new Error('no element ' + sel + ' #' + (pick || 0)); await wait(30); await page.mouse.click(c.x, c.y); await wait(70);
  }
  const putOne = (page) => clickEl(page, '.tw-place:not(.is-full)', 0);
  const takeOne = (page) => clickEl(page, '.tw-place.is-full', 0);
  const check = (page) => clickEl(page, '.lcs-activity-check');
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.TwinPoolsActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(150); }
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1));

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to10', 'to5']) {
      if (range === 'to5') await setSetting(page, 'range', 'to5');
      const R = CORE.rounds(range, 'tw', 'other');
      is((await page.evaluate(() => window.TwinPoolsActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to10') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} ${r.arr} ${r.n}]`;
        await forceRound(page, ri);
        let v = await view(page);
        is(v.models === r.n && v.places === r.places && v.full === 0 && v.strings === 0, `${tag} ${r.n} in the first pool; an empty twin pool of ${r.places} places; no strings`);
        is(!!v.modelPic && v.modelPic.src === `/image-library-webp/themes/ocean life/${r.model}@2x.webp` && v.modelPic.nat > 0 && v.modelPic.w >= 96 && v.overlap < 0.12 && v.inFirst && v.inTwin, `${tag} library ${r.model}s ≥ 96 px, apart, inside the pool (${v.modelPic && v.modelPic.w.toFixed(0)}, overlap ${v.overlap.toFixed(2)})`);
        is(v.markAria === STR.markLabel[loc] && v.placeAria === STR.placeLabel[loc], `${tag} the labels`);
        await check(page);
        is((await bubble(page)) === STR.hintStart[loc] && (await state(page)).misses === 0, `${tag} an empty Check → "start", no miss`);
        await clickEl(page, '.tw-m', 0); v = await view(page);
        is(v.marked === 1 && v.ticks === 1 && (await state(page)).marks === 1, `${tag} a tap on a first-pool creature marks it counted`);
        await clickEl(page, '.tw-m', 0); v = await view(page);
        is(v.marked === 0 && v.ticks === 0, `${tag} a second tap takes the mark off`);
        for (let k = 0; k <= r.n; k++) await putOne(page);
        v = await view(page);
        is(v.full === r.n + 1 && (await state(page)).filled.length === r.n + 1 && v.twinPic && v.twinPic.src === `/image-library-webp/themes/ocean life/${r.twin}@2x.webp` && v.twinPic.w >= 96 && v.backAria === STR.backLabel[loc] && v.tNums.every(x => x === ''), `${tag} ${r.n + 1} taps → ${r.n + 1} ${r.twin}s in the twin pool, no numbers`);
        await check(page); v = await view(page);
        is((await bubble(page)) === STR.hintMore[loc] && (await state(page)).misses === 1 && v.tNums.join() === seq(r.n + 1).join() && v.strings === 0 && v.mNums.every(x => x === ''), `${tag} too many: the hint; the twin pool numbered 1..${r.n + 1}; no strings yet`);
        await takeOne(page); await takeOne(page); v = await view(page);
        is((await state(page)).filled.length === r.n - 1 && v.full === r.n - 1, `${tag} two taps on twin creatures → two come out`);
        if (r.n > 1) {
          await check(page); v = await view(page);
          is((await bubble(page)) === STR.hintFewerTied[loc] && (await state(page)).misses === 2 && v.strings === r.n - 1 && v.knots === 2 * (r.n - 1) && v.endsOk && v.loneM === 1 && v.loneT === 0, `${tag} too few, second miss: ${r.n - 1} strings, each from a first-pool creature to a twin; one creature ringed with no twin (${v.strings}, ends ${v.endsOk}, lone ${v.loneM}/${v.loneT})`);
        }
        await putOne(page); v = await view(page);
        is(v.strings === 0, `${tag} a change takes the strings away until the next Check`);
        await check(page); await wait(120); v = await view(page);
        is(await celebrated(page) && (await bubble(page)) === interp(STR.celebrate[loc], { n: r.n }) && v.strings === r.n && v.endsOk && v.loneM === 0 && v.loneT === 0 && v.mNums.join() === seq(r.n).join() && v.tNums.join() === seq(r.n).join() && v.sameNumberEnds && v.mGold === 1 && v.tGold === 1, `${tag} done: "${await bubble(page)}", a string on every pair, both pools numbered 1..${r.n}, each string joining a number to the same number, the last gold`);
      }
    }
    /* too many after the second miss: the strings ring the extra twins */
    await setSetting(page, 'range', 'to10'); await forceRound(page, 1);
    const n1 = CORE.rounds('to10', 'tw')[1].n;
    for (let k = 0; k < n1 + 2; k++) await putOne(page);
    await check(page); await check(page);
    let v = await view(page);
    is((await bubble(page)) === STR.hintMoreTied[loc] && v.strings === n1 && v.endsOk && v.loneT === 2 && v.loneM === 0, `[${loc}] too many twice: ${n1} strings, the two extra twins ringed`);
    is(v.emptyBtn, `[${loc}] Empty offered`);
    await clickEl(page, '.tw-empty'); v = await view(page);
    is((await state(page)).filled.length === 0 && v.full === 0 && !v.emptyBtn && v.strings === 0, `[${loc}] Empty the twin pool: every creature gone`);
    /* the same creatures */
    await setSetting(page, 'twin', 'same'); await forceRound(page, 0);
    await putOne(page); v = await view(page);
    const s0 = await state(page);
    is(s0.twin === s0.model && v.twinPic && v.twinPic.src === `/image-library-webp/themes/ocean life/${s0.model}@2x.webp`, `[${loc}] "the same sea creatures": the twin pool takes ${s0.model}s too`);
    await setSetting(page, 'twin', 'other');
    is((await page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent)) === STR.prompt[loc], `[${loc}] the task line`);
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 0); for (let k = 0; k < 9; k++) await putOne(page); await check(page); await check(page); await wait(1200); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    for (const ri of [0, 3, 6]) {   /* a scatter of 7, a ring of 6, a scatter of 10 */
      await forceRound(page, ri);
      const r = CORE.rounds('to10', 'tw')[ri], tg = `${tag} #${ri} ${r.arr} ${r.n}`;
      let v = await view(page);
      const m = await page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(); const els = ['.tw-first', '.tw-twin', '.tw-mid'].map(s => document.querySelector(s).getBoundingClientRect()); const taps = [...document.querySelectorAll('.tw-m,.tw-place')].filter(e => !e.hidden && e.offsetParent !== null).map(e => Math.min(e.getBoundingClientRect().width, e.getBoundingClientRect().height)); const ck = document.querySelector('.lcs-activity-check').getBoundingClientRect(); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: els.every(x => x.left >= card.left - 1 && x.right <= card.right + 1), tapMin: Math.min(...taps), checkBottom: ck.bottom + window.scrollY, vh: window.innerHeight }; });
      is(m.overflow <= 2 && m.inCard, `${tg} nothing spills out of the card`);
      is(m.tapMin >= 44, `${tg} creatures and places ≥ 44 px (${m.tapMin.toFixed(0)})`);
      is(v.overlap < 0.12 && v.inFirst && v.inTwin, `${tg} the first pool's creatures lie apart, inside the pool (overlap ${v.overlap.toFixed(2)})`);
      is(m.checkBottom <= m.vh, `${tg} Check above the fold (${m.checkBottom.toFixed(0)} ≤ ${m.vh})`);
      if (w >= 700) is(v.modelPic.w >= 96, `${tg} creatures ≥ 96 px (${v.modelPic.w.toFixed(0)})`);
      else if (w >= 360) is(v.modelPic.w >= 64, `${tg} creatures ≥ 64 px on a phone (${v.modelPic.w.toFixed(0)})`);
    }
    await forceRound(page, 0);
    for (let k = 0; k < 8; k++) await putOne(page);
    await check(page); await check(page); await wait(SHOT ? 1200 : 300);
    let v = await view(page);
    is(v.strings === 7 && v.endsOk && v.loneT === 1, `${tag} 8 for 7 twice: seven strings, one extra ringed`);
    if (w >= 700) is(v.twinPic.w >= 96, `${tag} twin creatures ≥ 96 px (${v.twinPic.w.toFixed(0)})`);
    else if (w >= 360) is(v.twinPic.w >= 64, `${tag} twin creatures ≥ 64 px on a phone (${v.twinPic.w.toFixed(0)})`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await clickEl(page, '.tw-place.is-lone', 0);
    await check(page); await wait(SHOT ? 1400 : 400);
    v = await view(page);
    is(await celebrated(page) && v.strings === 7 && v.endsOk, `${tag} the ringed one out → celebrate, seven strings`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-twin-pools: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
