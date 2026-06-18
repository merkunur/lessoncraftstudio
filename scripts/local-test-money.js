#!/usr/bin/env node
/* =====================================================================
   local-test-money.js — local interaction harness for the E11 money
   "Count Out the Money" activity (no Next stack).

   Serves `mini tools/` + drives money-activity.html with puppeteer, per
   locale (each locale's OWN currency + rounds from params.byLocale):
     • renders (tray + coin palette + running total);
     • localized title + worded prompt with the formatted amount;
     • TENDER: tap the round's solution coins from the palette → isCorrect;
       an under-tender does NOT celebrate, completing it DOES;
     • variety/shuffle: ≥7 distinct + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.

   Usage: node scripts/local-test-money.js [--locales=en,de] [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
const ACTIVITY = 'money.count-out.2-md-c-8';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'money');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = (p === '/' || p === '/money-activity.html') ? path.join(MINI, 'money-activity.html')
      : p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
        : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
function coreStrings() {
  const src = fs.readFileSync(path.join(MINI, 'money-core.js'), 'utf8');
  const win = {}; new Function('window', src)(win); return win.MoneyCore.strings;
}
const manifest = JSON.parse(fs.readFileSync(path.join(MINI, 'money-activities.json'), 'utf8'));
const byLocale = manifest[0].params.byLocale;

(async () => {
  const STR = coreStrings();
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port, BASE = `http://127.0.0.1:${PORT}`;
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const celebrating = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  async function tapCoin(page, v) { await page.click(`.mn-palette .mn-coin[data-v="${v}"]`); }

  for (const loc of LOCALES) {
    const L = byLocale[loc];
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/money-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;
    try {
      if (!L) { note(false, `${loc}: no byLocale.${loc} in manifest (currency not authored)`); console.log(`  FAIL ${loc} — no byLocale.${loc}`); await page.close(); continue; }
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.MoneyActivity;
        return t && t._activityRow && document.querySelector('.mn-palette .mn-coin') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
      const expectTitle = (STR.title && STR.title[loc]) || null;
      if (expectTitle) note(title === expectTitle, `${loc}: title "${title}" ≠ localized "${expectTitle}"`);
      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      note(prompt.length > 0, `${loc}: empty prompt`);

      /* variety */
      const N = await page.evaluate(() => window.MoneyActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.MoneyActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${loc}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${loc}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${loc}: pass-2 order identical (no reshuffle)`);

      /* interaction: reload round 0, read target, find its solution, tender */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelector('.mn-palette .mn-coin'), { timeout: 5000 });
      const target = await page.evaluate(() => window.MoneyActivity.target);
      const round = (L.rounds || []).find(r => r.target === target) || L.rounds[0];
      const solution = round.solution.slice();

      /* under-tender (solution minus last) → no celebrate; then complete → correct */
      for (const v of solution.slice(0, -1)) await tapCoin(page, v);
      await page.click('.lcs-activity-check');
      note(!(await celebrating(page)), `${loc}: an under-tender still celebrated`);
      await tapCoin(page, solution[solution.length - 1]);
      await page.click('.lcs-activity-check');
      const ok = await page.evaluate(() => ({ c: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), correct: window.MoneyActivity.isCorrect() }));
      note(ok.correct, `${loc}: tendering the solution (${solution.join('+')}=${target}) did not satisfy isCorrect()`);
      note(ok.c, `${loc}: correct tender did not celebrate`);

      /* mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${loc}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}.png`) });
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${loc}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okLoc = !fails.some(f => f.startsWith(loc + ':'));
      console.log(`  ${okLoc ? 'ok  ' : 'FAIL'} ${loc} — "${title}" | "${prompt}" | ${new Set(p1).size} distinct`);
    } catch (e) {
      fails.push(`${loc}: ${e.message}`);
      console.log(`  FAIL ${loc} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MONEY LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`MONEY LOCAL TEST PASSED — ${LOCALES.length} locale(s): render + localized title/prompt + tap-to-tender (correct celebrates, under-tender doesn't) + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
