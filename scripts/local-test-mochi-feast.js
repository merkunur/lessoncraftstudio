#!/usr/bin/env node
/* =====================================================================
   local-test-mochi-feast.js — local interaction harness for "Mochi's
   Counting Feast" (no Next stack needed).

   Serves `mini tools/` at /mini-tools/ and drives the standalone
   mochi-feast-activity.html with puppeteer to exercise the REAL feed path:

     • renders the Mochi+bowl scene + the serving-dish source per locale;
     • per-locale CORE strings — the title renders the localized text;
     • TAP-FEED interaction (click .mf-tray): each tap drops one treat into
       the bowl; the bowl treat-count tracks the taps; a too-few count does
       NOT celebrate, EXACTLY the target celebrates + locks (readOnly);
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + pass-2 order
       ≠ pass-1 (same set, order-only);
     • basic mobile overflow at 280/360/412/768 (no horizontal scroll).

   EN-only pilot (the activity's slug map carries only `en`).

   Usage:
     node scripts/local-test-mochi-feast.js
     node scripts/local-test-mochi-feast.js --locales=en --shot
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en').split(',');
const SHOT = has('shot');
const ACTIVITY = 'mochi-feast.count-out.k-cc-b-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'mochi-feast');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p === '/' || p === '/mochi-feast-activity.html') file = path.join(MINI, 'mochi-feast-activity.html');
    else if (p.startsWith('/image-library-webp/')) file = path.join(REPO, p.replace(/^\//, ''));   // real library props
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end('not found'); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

function coreStrings() {
  const src = fs.readFileSync(path.join(MINI, 'mochi-feast-core.js'), 'utf8');
  const win = {}; new Function('window', src)(win);
  return win.MochiFeastCore.strings;
}

(async () => {
  const STR = coreStrings();
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };

  for (const loc of LOCALES) {
    const tag = `mochi-feast/${loc}`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/mochi-feast-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;

    async function feed(n) { for (let i = 0; i < n; i++) await page.click('.mf-tray'); }
    async function reload() {
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => !!document.querySelector('.mf-tray'), { timeout: 5000 });
    }
    const state = () => page.evaluate(() => ({
      celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')),
      readOnly: window.MochiFeastActivity.readOnly,
      inBowl: document.querySelectorAll('.mf-treat').length,
      target: window.MochiFeastActivity.target
    }));

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.MochiFeastActivity;
        return t && t._activityRow && document.querySelector('.mf-tray') && document.querySelector('.mf-svg') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* 1. localized title */
      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      const expTitle = STR.title[loc] || STR.title.en;
      note(title === expTitle, `${tag}: header title "${title}" ≠ localized "${expTitle}"`);

      /* 2. scene present (Mochi + bowl + serving dish) */
      note(!!(await page.$('.mf-mochi')), `${tag}: no Mochi in the scene`);
      note(!!(await page.$('.mf-bowl-body')), `${tag}: no bowl in the scene`);

      /* 3. variety/shuffle over 2 passes */
      const N = await page.evaluate(() => window.MochiFeastActivity._pool.length);
      const ids = await page.evaluate((count) => {
        const t = window.MochiFeastActivity, out = [];
        for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); }
        return out;
      }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      const distinct = new Set(p1).size;
      note(distinct >= 7, `${tag}: only ${distinct} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not the same set (order-only violated)`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical to pass-1 (no reshuffle)`);

      /* 4. TAP-FEED. UNDER-count → no celebrate; EXACT target → celebrate + lock. */
      await reload();
      const tgt = (await state()).target;

      await feed(tgt - 1);
      const under = await state();
      note(under.inBowl === tgt - 1, `${tag}: bowl shows ${under.inBowl} after ${tgt - 1} taps`);
      await page.click('.lcs-activity-check');
      const underAfter = await state();
      note(!underAfter.celebrated && !underAfter.readOnly, `${tag}: an under-count (${tgt - 1}/${tgt}) still celebrated/locked`);

      await reload();
      await feed(tgt);
      const exact = await state();
      note(exact.inBowl === tgt, `${tag}: bowl shows ${exact.inBowl} after ${tgt} taps`);

      /* the props are REAL library images: the tray <img> + the bowl
         <image> must actually load (naturalWidth>0 / non-empty href). */
      const imgOk = await page.evaluate(() => {
        const tray = document.querySelector('.mf-tray-treat');
        const bowlImgs = document.querySelectorAll('.mf-bowl-treats image').length;
        const trayLoaded = tray && tray.complete && tray.naturalWidth > 0;
        return { trayLoaded: !!trayLoaded, traySrc: tray ? tray.getAttribute('src') : '', bowlImgs };
      });
      note(imgOk.trayLoaded, `${tag}: tray prop image did not load (${imgOk.traySrc})`);
      note(imgOk.bowlImgs === tgt, `${tag}: ${imgOk.bowlImgs} bowl prop images, expected ${tgt}`);

      await page.click('.lcs-activity-check');
      const exactAfter = await state();
      note(exactAfter.celebrated && exactAfter.readOnly, `${tag}: exact target (${tgt}) did not celebrate + lock`);

      /* 5. mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await reload();
        const over = await page.evaluate(() => {
          const d = document.scrollingElement || document.documentElement;
          return d.scrollWidth - d.clientWidth;
        });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) {
          await feed(Math.min(3, tgt));   // a few treats in the bowl for the shot
          await page.screenshot({ path: path.join(SHOT_DIR, `mochi-feast-${loc}-${w}.png`) });
        }
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okLoc = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okLoc ? 'ok  ' : 'FAIL'} ${tag} — "${title}" | target ${tgt} | ${distinct} distinct rounds`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MOCHI-FEAST LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`MOCHI-FEAST LOCAL TEST PASSED — ${LOCALES.length} locale(s): scene renders, localized title, tap-feed fills the bowl (under-count doesn't celebrate, exact target celebrates + locks), ≥7-round reshuffle, no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
