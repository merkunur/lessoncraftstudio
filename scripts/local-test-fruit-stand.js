#!/usr/bin/env node
/* =====================================================================
   local-test-fruit-stand.js — the interaction gate for ACTIVITY #11,
   "Count to 20 with Fruits" (K.CC.B.4), the Fruit Stand.
   Real mouse clicks on the spaces of the trays (fill to here / take back
   from here), the shell Check, the note and the hint, the numbering, the
   second-miss marks, the teen slips (only the part after ten, only the full
   tray), the one-at-a-time setting, every round of both ranges, every
   locale asked for, the width sweep. Fruit is read off the RENDERED
   spaces (pictures present), not the state.
   Usage: node scripts/local-test-fruit-stand.js [--locales=en,…|all] [--widths=…] [--shot=<dir>]
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.count-to-20.make-n.fruits';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'fruit-stand-activity.js')).strings;
const CORE = require(path.join(MINI, 'fruit-stand-core.js'));
const PICS = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'fruits.json'), 'utf8'));
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
    await page.setViewport({ width: w, height: w <= 320 ? 640 : w <= 360 ? 740 : w <= 420 ? 820 : 1000 });
    await page.goto(`${base}/fruit-stand-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.FruitStandActivity && window.FruitStandActivity.st && window.FruitStandActivity._theme, { timeout: 8000 });
    await page.evaluate(() => { window.FruitStandActivity.DROP_MS = 1; });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const setSetting = async (page, k, v) => { await page.evaluate((k, v) => { window.FruitStandActivity.api.settings[k] = v; window.FruitStandActivity.onSettings(k, v); }, k, v); await wait(250); };
  const state = (page) => page.evaluate(() => { const s = window.FruitStandActivity.st; return { id: s.id, n: s.n, trays: s.trays, noun: s.noun, filled: s.filled, misses: s.misses, done: s.done, mode: s.mode }; });
  const view = (page) => page.evaluate(() => {
    const cups = [...document.querySelectorAll('.fs-cup')].filter(c => !c.closest('.fs-tray').hidden);
    const pic = (el) => { const im = el && el.querySelector('img'); if (!im) return null; const r = im.getBoundingClientRect(); return { src: im.getAttribute('src'), w: r.width, nat: im.naturalWidth, alt: im.alt }; };
    const wrap = document.querySelector('.fs-wrap');
    return { mode: wrap.classList.contains('is-row') ? 'row' : 'stack', slip: document.querySelector('.fs-slip-num').textContent, slipAria: document.querySelector('.fs-slip').getAttribute('aria-label'),
      spaces: cups.length, fruit: cups.map(c => !!c.querySelector('img')), nums: cups.map(c => { const n = c.querySelector('.fs-num'); return n.classList.contains('is-on') ? n.textContent : ''; }),
      extra: cups.map(c => c.classList.contains('is-extra')), need: cups.map(c => c.classList.contains('is-need')), gold: cups.map(c => c.querySelector('.fs-num').classList.contains('is-gold')),
      pic: pic(cups.find(c => c.querySelector('img'))), cupMin: Math.min(...cups.map(c => c.getBoundingClientRect().width)),
      note: document.querySelector('.fs-note').classList.contains('is-on') ? document.querySelector('.fs-note').textContent : '',
      emptyAria: (cups.find(c => !c.querySelector('img')) || { getAttribute: () => '' }).getAttribute('aria-label'), fullAria: (cups.find(c => c.querySelector('img')) || { getAttribute: () => '' }).getAttribute('aria-label') };
  });
  const bubble = (page) => page.evaluate(() => document.querySelector('.lcs-activity-bubble').textContent);
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate') && !document.querySelector('.lcs-activity-next').hidden);
  async function clickSel(page, sel) { const c = await page.evaluate((s) => { const el = document.querySelector(s); if (!el) return null; el.scrollIntoView({ block: 'center', behavior: 'instant' }); const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel); if (!c) throw new Error('no element ' + sel); await page.mouse.click(c.x, c.y); await wait(110); }
  const space = (page, i) => clickSel(page, `.fs-tray:nth-child(${Math.floor(i / 10) + 1}) .fs-cup:nth-child(${i % 10 + 1})`);
  async function forceRound(page, i) { await page.evaluate((i) => { const t = window.FruitStandActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i); await wait(220); }
  const count = (a) => a.filter(Boolean).length;
  const seq = (k) => Array.from({ length: k }, (_, i) => String(i + 1)).join();
  const label = (noun, loc) => { const s = PICS.nouns[noun].labels[loc][0]; return s; };

  for (const loc of LOCALES) {
    const { page, errs } = await open(loc, 704);
    for (const range of ['to20', 'to10']) {
      if (range === 'to10') await setSetting(page, 'range', 'to10');
      const R = CORE.rounds(range, 'fs');
      is((await page.evaluate(() => window.FruitStandActivity._pool.map(r => r.id).join())) === R.map(r => r.id).join(), `[${loc}] ${range}: the pool`);
      const rounds = (loc === 'en' || range === 'to20') ? R.map((r, i) => i) : [0, 1];
      for (const ri of rounds) {
        const r = R[ri], tag = `[${loc} ${range} #${ri} order ${r.n}]`, cups = r.trays * 10;
        await forceRound(page, ri);
        let v = await view(page), st = await state(page);
        is(st.id === r.id && v.slip === String(r.n) && v.slipAria === interp(STR.orderLabel[loc], { n: r.n }), `${tag} the order slip reads ${r.n}`);
        is(v.spaces === cups && count(v.fruit) === 0, `${tag} ${cups} empty spaces`);
        is(v.emptyAria === STR.cupEmpty[loc], `${tag} an empty space is named "${v.emptyAria}"`);
        /* a wrong fill first: one too many (or one too few for a full stand) */
        const wrong = r.n === cups ? r.n - 1 : r.n + 1;
        await space(page, wrong - 1);
        v = await view(page);
        is(count(v.fruit) === wrong && v.fruit.slice(0, wrong).every(Boolean), `${tag} a tap on space ${wrong} fills spaces 1..${wrong}`);
        is(!!v.pic && v.pic.src === PICS.nouns[r.noun].src && v.pic.nat > 0 && v.pic.w >= 96 && v.pic.alt === '', `${tag} library ${r.noun} ≥ 96 px (${v.pic && v.pic.w.toFixed(0)})`);
        is(v.fullAria === STR.cupFull[loc] + ' — ' + label(r.noun, loc), `${tag} a fruit is named "${v.fullAria}"`);
        is(v.nums.every(x => x === ''), `${tag} no numbers before Check — the child counts`);
        await clickSel(page, '.lcs-activity-check'); await wait(150);
        v = await view(page);
        is(v.note === interp(STR.noteCompare[loc], { a: wrong, n: r.n }) && (await bubble(page)) === STR[wrong > r.n ? 'hintMore' : 'hintFewer'][loc], `${tag} Check with ${wrong}: "${v.note}" + the hint`);
        is(v.nums.slice(0, wrong).join() === seq(wrong) && count(v.extra) + count(v.need) === 0, `${tag} the stand numbers its fruit 1..${wrong}`);
        await clickSel(page, '.lcs-activity-check'); await wait(150);
        v = await view(page);
        const marks = wrong > r.n ? v.extra.map((x, i) => x ? i : -1).filter(i => i >= 0).join() : v.need.map((x, i) => x ? i : -1).filter(i => i >= 0).join();
        is(marks === String(wrong > r.n ? r.n : r.n - 1) && count(v.fruit) === wrong, `${tag} second miss: the ${wrong > r.n ? 'extra fruit' : 'waiting space'} is marked; nothing moved`);
        /* fix it: take back from the extra fruit, or fill to the waiting space */
        await space(page, r.n === cups ? r.n - 1 : r.n);
        v = await view(page);
        is(count(v.fruit) === r.n && v.note === '', `${tag} one tap makes it ${r.n}; the note clears`);
        await clickSel(page, '.lcs-activity-check'); await wait(220);
        v = await view(page); st = await state(page);
        is(st.done && await celebrated(page) && (await bubble(page)) === STR.celebrate[loc], `${tag} ${r.n} → the shell celebrates`);
        is(v.nums.slice(0, r.n).join() === seq(r.n) && v.gold[r.n - 1] && count(v.gold) === 1, `${tag} everyone numbered, the ${r.n}th fruit gold`);
        /* the teen slips */
        if (r.n > 10 && ri < 3) {
          await forceRound(page, ri);
          await space(page, r.n - 11); await clickSel(page, '.lcs-activity-check'); await wait(120);
          is((await bubble(page)) === STR.hintOnesOnly[loc], `${tag} ${r.n - 10} for ${r.n} → "only the part after ten"`);
          await space(page, 9); await clickSel(page, '.lcs-activity-check'); await wait(120);
          is((await bubble(page)) === STR.hintTenOnly[loc], `${tag} 10 for ${r.n} → "only the full tray"`);
        }
      }
    }
    /* an empty Check is not a miss */
    await setSetting(page, 'range', 'to20');
    await forceRound(page, 0);
    await clickSel(page, '.lcs-activity-check'); await wait(120);
    is((await bubble(page)) === STR.hintNone[loc] && (await state(page)).misses === 0 && (await view(page)).note === '', `[${loc}] an empty Check → hintNone, no miss, no note`);
    /* one at a time */
    await setSetting(page, 'tap', 'one');
    await forceRound(page, 0);
    await space(page, 15); await space(page, 18); await space(page, 3);
    let v = await view(page);
    is(count(v.fruit) === 3 && v.fruit.slice(0, 3).every(Boolean) && v.emptyAria === STR.cupAdd[loc] && v.fullAria === STR.cupTake[loc] + ' — ' + label((await state(page)).noun, loc), `[${loc}] one at a time: three taps anywhere, three fruit in the first spaces`);
    await space(page, 0); v = await view(page);
    is(count(v.fruit) === 2, `[${loc}] one at a time: a tap on a fruit takes back the last`);
    await setSetting(page, 'tap', 'fill');
    is(errs.length === 0, `[${loc}] no console errors (${errs.slice(0, 3).join(' | ')})`);
    if (SHOT && loc !== 'en') { await forceRound(page, 1); await space(page, 13); await clickSel(page, '.lcs-activity-check'); await wait(500); await page.screenshot({ path: path.join(SHOT, `${loc}-704-miss.png`), fullPage: true }); }
    await page.close();
  }

  /* width sweep: order 17, a wrong Check, the fix */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    const tag = `[en @${w}]`;
    await forceRound(page, 1);
    await space(page, 13);
    let v = await view(page);
    const m = await page.evaluate(() => { const card = document.querySelector('.lcs-app').getBoundingClientRect(), wrap = document.querySelector('.fs-wrap').getBoundingClientRect(), trays = [...document.querySelectorAll('.fs-tray')].filter(t => !t.hidden).map(t => t.getBoundingClientRect()), slip = document.querySelector('.fs-slip').getBoundingClientRect(); const l = Math.min(...trays.map(r => r.left)), r = Math.max(...trays.map(r => r.right)); return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, inCard: trays.concat([slip]).every(x => x.left >= card.left - 1 && x.right <= card.right + 1), centred: Math.abs((l - wrap.left) - (wrap.right - r)) <= 2 }; });
    is(m.overflow <= 2 && m.inCard, `${tag} nothing spills out of the card`);
    is(v.cupMin >= 44, `${tag} every space ≥ 44 px to tap (${v.cupMin.toFixed(0)})`);
    is(v.mode === (w >= 600 ? 'row' : 'stack'), `${tag} ${v.mode} layout`);
    /* on a wide desktop the 900 px fold, not the width, sizes the trays (visual-qa measures the fold), so they stand centred */
    if (w >= 700) is(v.pic.w >= 96 && m.centred, `${tag} fruit ≥ 96 px (${v.pic.w.toFixed(0)}), the trays centred`);
    else if (w >= 360) is(v.pic.w >= 64, `${tag} fruit ≥ 64 px on a phone (${v.pic.w.toFixed(0)})`);
    await clickSel(page, '.lcs-activity-check'); await wait(500);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-miss.png`), fullPage: true });
    await space(page, 16); await clickSel(page, '.lcs-activity-check'); await wait(400);
    is(await celebrated(page), `${tag} 14, then fill to 17 → celebrate`);
    if (SHOT) await page.screenshot({ path: path.join(SHOT, `en-${w}-done.png`), fullPage: true });
    is(errs.length === 0, `${tag} no console errors (${errs.slice(0, 3).join(' | ')})`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`\nlocal-test-fruit-stand: ${PASS} pass, ${FAIL} fail`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
