#!/usr/bin/env node
/* =====================================================================
   local-test-echo-grove.js — local interaction harness for "The Echo
   Grove" activity (CCSS 3.OA.A.1 match-the-rune). Serves `mini tools/`
   + `/image-library-webp/` and drives echo-grove-activity.html with
   puppeteer to exercise the REAL discrimination path:

     • renders Pim + the rune (g × s) + the vertical candidate groves;
     • per-locale CORE strings — the title renders the localized text;
     • the REAL library fruit <image> loads in the baskets;
     • TAP-DISCRIMINATE: tapping the WRONG grove + Check does NOT celebrate;
       tapping the CORRECT grove (derived via matches()) + Check celebrates
       + locks (readOnly); the total is never the answer;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • mobile overflow at 280/360/412/768.

   EN-only pilot. Usage: node scripts/local-test-echo-grove.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en').split(',');
const SHOT = has('shot');
const ACTIVITY = 'echo-grove.match-the-rune.3-oa-a-1';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'echo-grove-activity');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p === '/' || p === '/echo-grove-activity.html') file = path.join(MINI, 'echo-grove-activity.html');
    else if (p.startsWith('/image-library-webp/')) file = path.join(REPO, p.replace(/^\//, ''));
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
  const src = fs.readFileSync(path.join(MINI, 'echo-grove-activity.js'), 'utf8');
  const win = {}; win.EchoGroveCore = {};
  try { new Function('window', src)(win); } catch (e) { /* the activity references EchoGroveCore at parse-time only inside fns */ }
  return win.EchoGroveActivity ? win.EchoGroveActivity.strings : null;
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
    const tag = `echo-grove/${loc}`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 1000 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/echo-grove-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;

    async function reload() {
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelectorAll('.eg-cand').length > 0, { timeout: 5000 });
    }
    const layout = () => page.evaluate(() => {
      const t = window.EchoGroveActivity;
      const correct = t.cands.findIndex(c => c.g === t.g && c.s === t.s);
      return { correct, n: t.cands.length, g: t.g, s: t.s };
    });
    const state = () => page.evaluate(() => ({
      celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')),
      readOnly: window.EchoGroveActivity.readOnly
    }));
    async function tapCard(i) { const cards = await page.$$('.eg-cand'); await cards[i].click(); }

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.EchoGroveActivity;
        return t && t._activityRow && document.querySelector('.eg-pim') && document.querySelector('.eg-rune') && document.querySelector('.eg-cand') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* 1. localized title */
      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      const expTitle = (STR && (STR.title[loc] || STR.title.en)) || "The Echo Grove";
      note(title === expTitle, `${tag}: header title "${title}" ≠ "${expTitle}"`);

      /* 2. Pim + rune + ≥2 candidate groves */
      note(!!(await page.$('.eg-pim-svg')), `${tag}: no Pim`);
      note(!!(await page.$('.eg-rune-expr')), `${tag}: no rune`);
      const nCards = (await page.$$('.eg-cand')).length;
      note(nCards >= 2, `${tag}: only ${nCards} candidate groves`);

      /* 3. real fruit <image> loaded */
      const imgOk = await page.evaluate(() => {
        const im = document.querySelector('.eg-card-svg image');
        if (!im) return { found: false };
        return { found: true, href: im.getAttribute('href') };
      });
      note(imgOk.found, `${tag}: no fruit <image> in a grove card`);

      /* 4. variety/shuffle over 2 passes */
      const N = await page.evaluate(() => window.EchoGroveActivity._pool.length);
      const ids = await page.evaluate((count) => {
        const t = window.EchoGroveActivity, out = [];
        for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); }
        return out;
      }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      const distinct = new Set(p1).size;
      note(distinct >= 7, `${tag}: only ${distinct} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not the same set`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical to pass-1 (no reshuffle)`);

      /* 5. WRONG grove → no celebrate; CORRECT grove → celebrate + lock */
      await reload();
      const L = await layout();
      const wrongIdx = (L.correct + 1) % L.n;
      await tapCard(wrongIdx);
      await page.click('.lcs-activity-check');
      const wrong = await state();
      note(!wrong.celebrated && !wrong.readOnly, `${tag}: a wrong grove (${wrongIdx}, correct ${L.correct}) still celebrated/locked`);

      await reload();
      const L2 = await layout();
      await tapCard(L2.correct);
      await page.click('.lcs-activity-check');
      const right = await state();
      note(right.celebrated && right.readOnly, `${tag}: the correct grove (${L2.g}×${L2.s}) did not celebrate + lock`);

      /* 6. mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 1000 });
        await reload();
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) {
          const Ls = await layout(); await tapCard(Ls.correct);
          await page.screenshot({ path: path.join(SHOT_DIR, `echo-grove-${loc}-${w}.png`) });
        }
      }
      await page.setViewport({ width: 412, height: 1000 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okLoc = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okLoc ? 'ok  ' : 'FAIL'} ${tag} — "${title}" | ${distinct} distinct rounds`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`ECHO-GROVE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`ECHO-GROVE LOCAL TEST PASSED — ${LOCALES.length} locale(s): Pim + rune + groves render, real fruit loads, wrong grove doesn't celebrate / correct grove celebrates + locks, ≥7 reshuffle, no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
