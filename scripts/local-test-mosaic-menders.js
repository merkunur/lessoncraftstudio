#!/usr/bin/env node
/* =====================================================================
   local-test-mosaic-menders.js — local interaction harness for "The
   Mosaic Menders" (CCSS 3.MD.C.6 area = count of unit tiles). Serves
   `mini tools/` and drives mosaic-menders-activity.html with puppeteer:

     • renders Tessa + the target panel + 3 candidate mosaics;
     • per-locale CORE strings (the localized title);
     • TAP-DISCRIMINATE: tapping a WRONG mosaic + Check does NOT celebrate;
       tapping the area-MATCH (derived via Core.matches) + Check celebrates
       + locks (readOnly);
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • mobile overflow at 280/360/412/768 + a MEASURED fits-phone check
       (.lcs-app height ≤ ~720px at 360px so all options + Check are visible).

   EN-only pilot. Usage: node scripts/local-test-mosaic-menders.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en').split(',');
const SHOT = has('shot');
const ACTIVITY = 'mosaic-menders.area-match.3-md-c-6';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'mosaic-menders-activity');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p === '/mosaic-menders-activity.html') file = path.join(MINI, 'mosaic-menders-activity.html');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}
function coreStrings() {
  const src = fs.readFileSync(path.join(MINI, 'mosaic-menders-activity.js'), 'utf8');
  const win = {}; win.MosaicMendersCore = {};
  try { new Function('window', src)(win); } catch (e) {}
  return win.MosaicMendersActivity ? win.MosaicMendersActivity.strings : null;
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
    const tag = `mosaic-menders/${loc}`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/mosaic-menders-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;

    async function reload() { await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask()); await page.waitForFunction(() => document.querySelectorAll('.mm-cand').length > 0, { timeout: 5000 }); }
    const layout = () => page.evaluate(() => {
      const t = window.MosaicMendersActivity, C = window.MosaicMendersCore;
      const correct = t.cands.findIndex(nm => C.matches(t.target, nm));
      return { correct, n: t.cands.length };
    });
    const state = () => page.evaluate(() => ({ celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')), readOnly: window.MosaicMendersActivity.readOnly }));
    async function tapCard(i) { const cards = await page.$$('.mm-cand'); await cards[i].click(); }

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.MosaicMendersActivity;
        return t && t._activityRow && document.querySelector('.mm-tessa') && document.querySelector('.mm-target') && document.querySelector('.mm-cand') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      const expTitle = (STR && (STR.title[loc] || STR.title.en)) || 'The Mosaic Menders';
      note(title === expTitle, `${tag}: header title "${title}" ≠ "${expTitle}"`);
      note(!!(await page.$('.mm-tessa-svg')), `${tag}: no Tessa`);
      note(!!(await page.$('.mm-target-svg')), `${tag}: no target mosaic`);
      const nCards = (await page.$$('.mm-cand')).length;
      note(nCards >= 3, `${tag}: only ${nCards} candidate mosaics`);
      note(!!(await page.$('.mm-card-svg rect')), `${tag}: no tiles drawn`);

      /* variety/shuffle */
      const N = await page.evaluate(() => window.MosaicMendersActivity._pool.length);
      const ids = await page.evaluate((count) => { const t = window.MosaicMendersActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical to pass-1 (no reshuffle)`);

      /* WRONG mosaic → no celebrate; area-MATCH → celebrate + lock */
      await reload();
      const L = await layout();
      await tapCard((L.correct + 1) % L.n);
      await page.click('.lcs-activity-check');
      const wrong = await state();
      note(!wrong.celebrated && !wrong.readOnly, `${tag}: a wrong mosaic still celebrated/locked`);

      await reload();
      const L2 = await layout();
      await tapCard(L2.correct);
      await page.click('.lcs-activity-check');
      const right = await state();
      note(right.celebrated && right.readOnly, `${tag}: the area-match did not celebrate + lock`);

      /* mobile overflow + MEASURED fits-phone height at 360 */
      let h360 = 0;
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 800 });
        await reload();
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (w === 360) h360 = await page.evaluate(() => Math.ceil(document.querySelector('.lcs-app').getBoundingClientRect().height));
        if (SHOT && (w === 360 || w === 768)) { const Ls = await layout(); await tapCard(Ls.correct); await page.screenshot({ path: path.join(SHOT_DIR, `mosaic-menders-${loc}-${w}.png`), fullPage: true }); }
      }
      note(h360 > 0 && h360 <= 740, `${tag}: app height ${h360}px at 360px exceeds ~740 (3rd option/Check may be cut off)`);
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okLoc = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okLoc ? 'ok  ' : 'FAIL'} ${tag} — "${title}" | h@360=${h360}px`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MOSAIC-MENDERS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`MOSAIC-MENDERS LOCAL TEST PASSED — ${LOCALES.length} locale(s): Tessa + target + mosaics render, wrong doesn't celebrate / area-match celebrates + locks, ≥7 reshuffle, no overflow, fits a phone @360.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
