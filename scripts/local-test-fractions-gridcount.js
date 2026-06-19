#!/usr/bin/env node
/* =====================================================================
   local-test-fractions-gridcount.js — local interaction harness for the
   2.G.A.2 "Make and Count Squares" grid-count fractions activity.

   Serves `mini tools/` + drives fractions-activity.html with puppeteer:
     • renders the R×C grid-partition SVG + the keypad;
     • localized prompt per locale (taskGridCount interpolated; rendered NATIVE
       text per locale — the banked window.LCS.i18n.current discipline);
     • commit a gridline (partition), then keypad a WRONG total → no celebrate,
       keypad rows×cols → celebrate;
     • variety/shuffle (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.

   Usage: node scripts/local-test-fractions-gridcount.js [--locales=en,de] [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
const ACTIVITY_ID = 'fractions.make-and-count-squares.2-g-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'fractions');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = (p === '/' || p === '/fractions-activity.html') ? path.join(MINI, 'fractions-activity.html')
      : p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port, BASE = `http://127.0.0.1:${PORT}`;
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const celebrating = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));
  async function keypadClear(page) { await page.evaluate(() => { const c = document.querySelector('.lcs-activity-key-clear'); if (c) c.click(); }); }
  async function keypadEnter(page, num) {
    for (const ch of String(num)) {
      await page.evaluate(d => { const k = [...document.querySelectorAll('.lcs-activity-key')].find(b => b.textContent.trim() === d); if (k) k.click(); }, ch);
    }
  }

  for (const loc of LOCALES) {
    const tag = `${loc}/make-and-count-squares`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/fractions-activity.html?lang=${loc}&activity=${ACTIVITY_ID}&embed=1`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.FractionsActivity;
        return t && t._activityRow && document.querySelector('.frac-svg') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* nextTask present (fractions wrapper owns ordering; no tasks[]) */
      const wired = await page.evaluate(() => typeof window.FractionsActivity.nextTask === 'function' && !window.FractionsActivity.tasks);
      note(wired, `${tag}: nextTask not present / tasks not absent`);

      /* variety */
      const N = await page.evaluate(() => window.FractionsActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.FractionsActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

      /* interaction: reload round 0; assert localized prompt (native, interpolated) */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelector('.frac-cand') && document.querySelector('.lcs-activity-keypad'), { timeout: 5000 });
      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      const t = await page.evaluate((l) => {
        const a = window.FractionsActivity, task = a.nextTask({ index: 0 });
        const tpl = a.strings.taskGridCount && (a.strings.taskGridCount[l] || a.strings.taskGridCount.en);
        return { answer: task && task.answer, args: task && task.promptArgs, tpl: tpl };
      }, loc);
      note(t && typeof t.answer === 'number', `${tag}: bad task .answer`);
      if (t && t.tpl && t.args) {
        const want = t.tpl.replace('{rows}', t.args.rows).replace('{cols}', t.args.cols);
        note(prompt === want, `${tag}: prompt "${prompt}" ≠ localized "${want}"`);
      }
      note(/\d/.test(prompt), `${tag}: prompt has no digits — "${prompt}"`);

      if (t && typeof t.answer === 'number') {
        /* commit one gridline (the partition verb), then keypad wrong → correct */
        await page.evaluate(() => { const h = document.querySelector('.frac-hit'); if (h) h.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
        const wrong = (t.answer + 1 <= 30) ? t.answer + 1 : t.answer - 1;
        await keypadClear(page); await keypadEnter(page, wrong);
        await page.click('.lcs-activity-check');
        note(!(await celebrating(page)), `${tag}: a wrong count (${wrong}) still celebrated`);
        await keypadClear(page); await keypadEnter(page, t.answer);
        await page.click('.lcs-activity-check');
        note(await celebrating(page), `${tag}: correct count (${t.answer}) did not celebrate`);
      }

      /* mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) await page.screenshot({ path: path.join(SHOT_DIR, `${tag.replace('/', '-')}-${w}.png`) });
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okT = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${prompt}" | ${new Set(p1).size} distinct`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`FRACTIONS GRID-COUNT LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`FRACTIONS GRID-COUNT LOCAL TEST PASSED — ${LOCALES.length} locale(s): grid partition + localized prompt + keypad-count (wrong doesn't celebrate, correct does) + ≥7 reshuffle + no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
