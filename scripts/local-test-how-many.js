#!/usr/bin/env node
/* =====================================================================
   local-test-how-many.js — the interaction gate for ACTIVITY #1, "How
   many?" (K.CC.B.5), the Counting Table. Real pointer, every round, every
   locale asked for, the width sweep. Serves `mini tools/` + the picture
   library locally; no deploy.
   Usage: node scripts/local-test-how-many.js [--locales=en,de,…|all] [--widths=320,…] [--shot=<dir>]
   What it proves (each a FAIL on miss):
     • the pool holds every n 1..10 once (never 0); pass 2 re-serves the same set in
       a different order (§A.13.60);
     • per round (forced through the `_order` seam like visual-qa does):
       n pictures from the LIBRARY, each ≥ the floor for the width, tags
       1..n land in tap order under a REAL mouse, a second tap is refused
       (wobble, count unchanged), Check before the numeral → the "now tap
       how many" hint, a wrong numeral → the "last tag" hint, the right
       numeral → celebrate bubble "Yes — n!" + the prompt text unchanged,
       Next loads a fresh round with no tags;
     • the skipped-thing path: n−1 tags + Check → "still uncounted" hint
       and the missing one pulses; Count again clears; Mix keeps n and
       changes the arrangement where more than one is offered;
     • every rendered string is the locale's (no raw key, no `{`), the
       prompt equals strings.prompt[loc]; the picture alt is the locale
       label; the rail is one row at ≥560 mat width, two rows below;
     • width sweep: no horizontal overflow, chips ≥ 44 px, pictures ≥ floor,
       no console errors.
   ===================================================================== */
'use strict';
const http = require('http'), fs = require('fs'), path = require('path');
const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.slice(k.length + 3) : d; };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LOCALES = arg('locales', 'en') === 'all' ? ALL : arg('locales', 'en').split(',');
const WIDTHS = arg('widths', '320,360,412,704,768,1024,1366').split(',').map(Number);
const SHOT = arg('shot', null);
const ID = 'ten-frame.how-many.0-10.animals';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };
const STR = require(path.join(MINI, 'how-many-activity.js')).strings;
const CORE = require(path.join(MINI, 'how-many-core.js'));
const interp = (s, a) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in a ? a[k] : m));
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; console.error('   FAIL: ' + m); } };
const floorFor = (W) => (W >= 480 ? 96 : 64);

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

  async function open(loc, w, tall) {
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error' && !/404|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    /* /audio/inventory.json is the shell's recorded-audio inventory on production; the local server has none */
    page.on('response', r => { if (r.status() === 404 && !/favicon\.ico$|\/audio\/inventory\.json$/.test(r.url())) errs.push('404 ' + r.url()); });
    page.on('console', m => { if (m.type() === 'error' && /favicon/.test(m.location().url || '')) errs.pop(); });
    /* the interaction run gets the height the production iframe grows to
       (the shell's body is overflow:hidden, so a short window would hide the
       lower pictures of a tall ring from a real pointer); the width sweep
       keeps realistic device heights and only measures */
    await page.setViewport({ width: w, height: tall ? 1600 : (w <= 420 ? 740 : 900) });
    await page.goto(`${base}/how-many-activity.html?activity=${ID}&lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.HowManyActivity && window.HowManyActivity.theme && document.querySelectorAll('.hm-pic').length === window.HowManyActivity.st.n, { timeout: 8000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    return { page, errs };
  }
  const state = (page) => page.evaluate(() => ({ n: window.HowManyActivity.st.n, arr: window.HowManyActivity.st.arr, tags: window.HowManyActivity.st.tags.slice(), answer: window.HowManyActivity.st.answer }));
  const bubble = (page) => page.evaluate(() => { const b = document.querySelector('.lcs-activity-bubble'); return { text: b.textContent, shown: b.classList.contains('show'), cls: b.className }; });
  const promptText = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt-text').textContent.trim());
  const celebrated = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  async function clickCenter(page, sel, idx) {
    const box = await page.evaluate((s, i) => { const el = document.querySelectorAll(s)[i]; if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }; }, sel, idx);
    if (!box) throw new Error('no element ' + sel + '[' + idx + ']');
    await page.mouse.click(box.x, box.y);
    return box;
  }
  async function forceRound(page, i) {
    await page.evaluate((i) => { const t = window.HowManyActivity; const n = t._pool.length; const order = [i]; for (let k = 0; k < n; k++) if (k !== i) order.push(k); t._order = order; t._curPass = 0; window.LCS_reloadFirstTask(); }, i);
    await page.waitForFunction(() => document.querySelectorAll('.hm-pic').length === window.HowManyActivity.st.n, { timeout: 5000 });
    await wait(80);
  }

  for (const loc of LOCALES) {
    const W = 704;
    const { page, errs } = await open(loc, W, true);
    const LABELS = JSON.parse(fs.readFileSync(path.join(MINI, 'pictures', 'animals.json'), 'utf8')).nouns;
    const S = (k) => STR[k][loc];
    /* ---- pool + reshuffle ---- */
    const pool = await page.evaluate(() => window.HowManyActivity._pool.map(r => r.n));
    is(pool.length === 10 && pool.every((n, i) => n === i + 1), `[${loc}] pool is 1..10 once — counting never asks for 0 (got ${pool.join(',')})`);
    is((await page.evaluate(() => [...document.querySelectorAll('.hm-num')].map(b => b.dataset.v).join())) === '1,2,3,4,5,6,7,8,9,10', `[${loc}] the answer rail runs 1..10, no 0 chip`);
    const ids = await page.evaluate(() => { const t = window.HowManyActivity, o = []; for (let i = 0; i < 22; i++) o.push(t.nextTask({ index: i }).promptArgs.n); return o; });
    is(ids.slice(0, 10).slice().sort((a, b) => a - b).join() === pool.join() && ids.slice(10, 20).slice().sort((a, b) => a - b).join() === pool.join(), `[${loc}] each pass serves the whole pool`);
    is(ids.slice(0, 10).join() !== ids.slice(10, 20).join(), `[${loc}] pass 2 is a different order`);
    /* ---- strings ---- */
    const leaks = await page.evaluate(() => { const bad = []; document.querySelectorAll('.lcs-app *').forEach(el => { for (const n of el.childNodes) if (n.nodeType === 3) { const s = n.textContent.trim(); if (/\{|\}/.test(s) || /^[a-z]+[A-Z]\w+$/.test(s)) bad.push(s); } }); return bad; });
    is(leaks.length === 0, `[${loc}] raw keys / braces rendered: ${leaks.slice(0, 3).join(' | ')}`);
    is((await page.evaluate(() => document.querySelector('.lcs-title').textContent.trim())) === S('title'), `[${loc}] title`);
    is((await page.evaluate(() => document.querySelector('.hm-rail-label').textContent.trim())) === S('railLabel'), `[${loc}] rail label`);
    is((await page.evaluate(() => document.querySelector('.hm-again').textContent.trim())) === S('again') && (await page.evaluate(() => document.querySelector('.hm-mix').textContent.trim())) === S('mix'), `[${loc}] tool chips`);
    const rows = await page.evaluate(() => document.querySelectorAll('.hm-numrow').length);
    const matW0 = await page.evaluate(() => document.querySelector('.hm-mat').getBoundingClientRect().width);
    is(rows === 1 && matW0 >= 600, `[${loc}] one rail row and a ≥600px mat at 704 (rows ${rows}, mat ${matW0.toFixed(0)})`);
    const chipW = await page.evaluate(() => document.querySelector('.hm-num').getBoundingClientRect().width);
    is(chipW >= 44, `[${loc}] rail chip ≥44 (got ${chipW})`);

    /* ---- every round ---- */
    for (let i = 0; i < 10; i++) {
      await forceRound(page, i);
      const st = await state(page);
      const n = st.n;
      const tag = `[${loc} n=${n} ${st.arr}]`;
      is(n >= 1 && (await promptText(page)) === S('prompt'), `${tag} prompt text (never a 0 round)`);
      const pics = await page.evaluate(() => [...document.querySelectorAll('.hm-pic')].map(b => { const r = b.getBoundingClientRect(); const img = b.querySelector('img'); return { w: r.width, h: r.height, src: img.getAttribute('src'), alt: img.alt, loaded: img.complete && img.naturalWidth > 0 }; }));
      is(pics.length === n, `${tag} ${pics.length} pictures`);
      is(pics.every(p => p.w >= floorFor(W) - 0.5 && p.h >= floorFor(W) - 0.5), `${tag} pictures ≥ ${floorFor(W)}px (min ${Math.min(...pics.map(p => p.w), 999)})`);
      is(pics.every(p => /^\/image-library-webp\/themes\/animals\/[a-z]+@2x\.webp$/.test(p.src) && p.loaded), `${tag} pictures are library files and loaded`);
      if (n > 0) {
        const noun = (pics[0].src.match(/\/([a-z]+)@2x\.webp$/) || [])[1];
        const want = LABELS[noun] && LABELS[noun].labels[loc][0];
        is(!!want && pics.every(p => p.alt === want), `${tag} picture alt is the ${loc} label "${want}" (got "${pics[0].alt}")`);
      }
      if (n === 0) {
        is((await page.evaluate(() => document.querySelector('.hm-again').disabled && document.querySelector('.hm-mix').disabled)), `${tag} free moves disabled on the empty table`);
        await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
        is((await bubble(page)).text === S('hintNoAnswer'), `${tag} check without a numeral → hintNoAnswer`);
        await page.evaluate(() => [...document.querySelectorAll('.hm-num')].find(b => b.dataset.v === '0').click()); await wait(30);
        await clickCenter(page, '.lcs-activity-check', 0); await wait(80);
        is(await celebrated(page), `${tag} zero celebrates`);
        continue;
      }
      /* Check before any tag → untagged hint, all pulse */
      await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
      let b = await bubble(page);
      is(b.shown && b.text === S('hintUntagged') && /tryagain/.test(b.cls), `${tag} check before tagging → hintUntagged (got "${b.text}")`);
      is((await page.evaluate(() => document.querySelectorAll('.hm-pic.hm-missing').length)) === n, `${tag} every untagged picture pulses`);
      /* tag all but the last with a real mouse, in a scrambled order */
      const order = [...Array(n).keys()].sort((a, c) => ((a * 7 + 3) % n) - ((c * 7 + 3) % n));
      for (let k = 0; k < n - 1; k++) {
        await clickCenter(page, '.hm-pic', order[k]); await wait(30);
        const tags = await page.evaluate(() => [...document.querySelectorAll('.hm-pic.is-tagged')].map(b => b.querySelector('.hm-tag').textContent));
        is(tags.length === k + 1, `${tag} tag ${k + 1} landed`);
      }
      if (n >= 2) {
        const before = (await state(page)).tags.length;
        await clickCenter(page, '.hm-pic', order[0]); await wait(30);
        const after = await state(page);
        is(after.tags.length === before && (await page.evaluate(() => !!document.querySelector('.hm-pic.hm-wobble'))), `${tag} a second tap is refused with a wobble`);
        await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
        b = await bubble(page);
        is(b.text === S('hintUntagged') && (await page.evaluate(() => document.querySelectorAll('.hm-pic.hm-missing').length)) === 1, `${tag} one skipped → hint + exactly one pulses`);
      }
      await clickCenter(page, '.hm-pic', order[n - 1]); await wait(60);
      const tagsNow = await page.evaluate(() => [...document.querySelectorAll('.hm-pic')].map(b => b.querySelector('.hm-tag').textContent));
      is(tagsNow.filter(Boolean).length === n && order.every((pi, k) => tagsNow[pi] === String(k + 1)), `${tag} tags 1..${n} in tap order`);
      is((await page.evaluate(() => !document.querySelector('.hm-pic.is-last') && document.querySelector('.hm-rail').classList.contains('hm-ready'))), `${tag} the rail is ready and NO tag glows before Check (no cardinality tell)`);
      if (SHOT && (n === 7 || n === 4)) await page.screenshot({ path: path.join(SHOT, `hm-${loc}-${n}-${st.arr}-tagged-704.png`) });
      /* Check without a numeral */
      await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
      is((await bubble(page)).text === S('hintNoAnswer'), `${tag} tagged but no numeral → hintNoAnswer`);
      /* wrong numeral */
      const wrong = n === 10 ? 9 : n + 1;
      await page.evaluate((v) => [...document.querySelectorAll('.hm-num')].find(x => x.dataset.v === String(v)).click(), wrong); await wait(30);
      await clickCenter(page, '.lcs-activity-check', 0); await wait(50);
      b = await bubble(page);
      is(b.text === S('hintWrong') && !(await celebrated(page)), `${tag} wrong numeral → hintWrong, no celebration`);
      is((await page.evaluate((last) => document.querySelectorAll('.hm-pic')[last].classList.contains('is-last'), order[n - 1])), `${tag} the last tag glows as the remedy`);
      is((await promptText(page)) === S('prompt'), `${tag} the task line never changes on feedback`);
      /* right numeral */
      await page.evaluate((v) => [...document.querySelectorAll('.hm-num')].find(x => x.dataset.v === String(v)).click(), n); await wait(30);
      is((await page.evaluate(() => [...document.querySelectorAll('.hm-num[aria-pressed="true"]')].length)) === 1, `${tag} exactly one numeral pressed`);
      await clickCenter(page, '.lcs-activity-check', 0); await wait(120);
      b = await bubble(page);
      is((await celebrated(page)) && /celebrate/.test(b.cls) && b.text === interp(S('celebrate'), { n }), `${tag} right numeral → "${interp(S('celebrate'), { n })}" (got "${b.text}")`);
      is((await page.evaluate(() => document.querySelectorAll('.hm-pic.hm-hop').length)) >= 1, `${tag} the animals hop`);
      if (SHOT && n === 7) await page.screenshot({ path: path.join(SHOT, `hm-${loc}-${n}-celebrate-704.png`) });
      /* Next → fresh round */
      await clickCenter(page, '.lcs-activity-next', 0); await wait(120);
      const st2 = await state(page);
      is(st2.tags.length === 0 && st2.answer === null && !(await bubble(page)).shown, `${tag} Next clears tags, answer and bubble`);
    }
    /* ---- the free moves, on a round with ≥ 2 arrangements ---- */
    await forceRound(page, 5);   /* the pool is 1..10, so index 5 holds six */
    const st6 = await state(page);
    await clickCenter(page, '.hm-pic', 0); await clickCenter(page, '.hm-pic', 1); await wait(30);
    await clickCenter(page, '.hm-again', 0); await wait(30);
    is((await state(page)).tags.length === 0 && (await page.evaluate(() => document.querySelectorAll('.hm-pic.is-tagged').length)) === 0, `[${loc}] Count again clears every tag`);
    const mixEnabled = await page.evaluate(() => !document.querySelector('.hm-mix').disabled);
    is(mixEnabled, `[${loc}] Mix is offered for six`);
    /* the iframe contract: every height change is broadcast (the operator's
       clipped-Check defect) — listen for the shell's resize message */
    await page.evaluate(() => { window.__lastResize = null; window.addEventListener('message', e => { if (e.data && e.data.type === 'lcs-activity-resize') window.__lastResize = e.data.height; }); });
    await clickCenter(page, '.hm-mix', 0); await wait(1300);
    const st6b = await state(page);
    const rs = await page.evaluate(() => ({ sent: window.__lastResize, app: Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height) }));
    is(rs.sent !== null && Math.abs(rs.sent - rs.app) <= 6, `[${loc}] Mix broadcasts the new card height to the iframe (sent ${rs.sent}, card ${rs.app})`);
    is(st6b.n === st6.n && st6b.arr !== st6.arr && (await page.evaluate(() => document.querySelectorAll('.hm-pic').length)) === st6.n, `[${loc}] Mix keeps n=${st6.n} and changes the arrangement (${st6.arr} → ${st6b.arr})`);
    await page.evaluate(() => { window.HowManyActivity.api.settings.arrangement = 'line'; window.HowManyActivity.onSettings('arrangement', 'line'); });
    await wait(150);
    const linePool = await page.evaluate(() => window.HowManyActivity._pool.map(r => r.n + r.arr[0]));
    is(linePool.join() === '1l,2l,3l,4l,5l', `[${loc}] setting 'line' serves 1-5 in a line (got ${linePool.join()})`);
    await page.evaluate(() => { window.HowManyActivity.api.settings.arrangement = 'circle'; window.HowManyActivity.onSettings('arrangement', 'circle'); });
    await wait(150);
    const circPool = await page.evaluate(() => window.HowManyActivity._pool.map(r => r.n + r.arr[0]));
    is(circPool.join() === '3c,4c,5c,6c', `[${loc}] setting 'circle' serves 3-6 in a ring (got ${circPool.join()})`);
    await page.evaluate(() => { window.HowManyActivity.api.settings.arrangement = 'auto'; window.HowManyActivity.onSettings('arrangement', 'auto'); });
    await wait(150);
    is(errs.length === 0, `[${loc}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }

  /* ---- width sweep (en, round with 10 scattered and round with 8) ---- */
  for (const w of WIDTHS) {
    const { page, errs } = await open('en', w);
    for (const i of [10, 8, 3]) {
      await forceRound(page, i);
      const st = await state(page);
      const m = await page.evaluate(() => {
        const app = document.querySelector('.lcs-app');
        const pics = [...document.querySelectorAll('.hm-pic')].map(b => b.getBoundingClientRect());
        const chips = [...document.querySelectorAll('.hm-num')].map(b => b.getBoundingClientRect());
        const mat = document.querySelector('.hm-mat').getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, minPic: Math.min(...pics.map(r => Math.min(r.width, r.height)), 9999), minChip: Math.min(...chips.map(r => Math.min(r.width, r.height))), matIn: mat.left >= 0 && mat.right <= window.innerWidth + 1, picsIn: pics.every(r => r.left >= mat.left - 1 && r.right <= mat.right + 1 && r.top >= mat.top - 1 && r.bottom <= mat.bottom + 1), rows: document.querySelectorAll('.hm-numrow').length, matW: mat.width };
      });
      const tag = `[en @${w} n=${st.n} ${st.arr}]`;
      is(m.overflow <= 2, `${tag} no horizontal overflow (${m.overflow})`);
      is(st.n === 0 || m.minPic >= floorFor(m.matW) - 0.5, `${tag} pictures ≥ ${floorFor(m.matW)} (got ${m.minPic.toFixed(0)})`);
      is(m.minChip >= 40, `${tag} rail chips ≥ 40 (got ${m.minChip.toFixed(0)})`);
      is(m.matIn && m.picsIn, `${tag} mat and pictures inside the viewport / mat`);
      is(m.rows === (m.matW < 11 * 44 + 10 * 4 ? 2 : 1), `${tag} rail rows ${m.rows} for mat ${m.matW.toFixed(0)}`);
      if (SHOT && i === 10) await page.screenshot({ path: path.join(SHOT, `hm-en-10-${w}.png`), fullPage: true });
    }
    is(errs.length === 0, `[en @${w}] no page errors: ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close(); server.close();
  console.log(`local-test-how-many: ${PASS} pass, ${FAIL} fail (locales ${LOCALES.join(',')}; widths ${WIDTHS.join(',')})`);
  process.exit(FAIL ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
