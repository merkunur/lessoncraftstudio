#!/usr/bin/env node
/* =====================================================================
   local-test-number-bond.js — local interaction harness for the E18
   Make-10 number-bond activity (no Next stack needed).

   Serves `mini tools/` + drives number-bond-activity.html with puppeteer:
     • renders (bond: whole + 2 parts + "−") per locale;
     • localized title + worded prompt (not a bare key);
     • TAP-FILL: tap the empty part `missing` times → isCorrect; the CORRECT
       fill celebrates + locks, an UNDER-fill does not;
     • variety/shuffle: ≥7 distinct + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.

   Usage: node scripts/local-test-number-bond.js [--locales=en,de] [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
const ACTIVITIES = [
  { id: 'numberbond.make-ten.k-oa-a-4', titleKey: 'title', answer: 'tap' },
  { id: 'numberbond.make-ten-to-add.1-oa-c-6', titleKey: 'titleAdd', answer: 'tap' },
  { id: 'numberbond.find-the-total.1-oa-a-1', titleKey: 'titleWhole', answer: 'keypad' },
  { id: 'numberbond.subtraction-unknown-addend.1-oa-b-4', titleKey: 'titleSubtraction', answer: 'tap' },
  { id: 'numberbond.add-three.1-oa-a-2', titleKey: 'titleThree', answer: 'keypad', parts: 3 },
];
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'number-bond');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = (p === '/' || p === '/number-bond-activity.html') ? path.join(MINI, 'number-bond-activity.html')
      : p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length))
      : path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (e, b) => { if (e) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(b); });
  });
}
function coreStrings() {
  const src = fs.readFileSync(path.join(MINI, 'number-bond-core.js'), 'utf8');
  const win = {}; new Function('window', src)(win); return win.NumberBondCore.strings;
}

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

  async function tapFill(page, n) { for (let i = 0; i < n; i++) { await page.click('.nb-part-fill'); } }
  async function keypadClear(page) { await page.evaluate(() => { const c = document.querySelector('.lcs-activity-key-clear'); if (c) c.click(); }); }
  async function keypadEnter(page, num) {
    for (const ch of String(num)) {
      await page.evaluate((d) => { const k = [...document.querySelectorAll('.lcs-activity-key')].find(b => b.textContent.trim() === d); if (k) k.click(); }, ch);
    }
  }
  const celebrating = (page) => page.evaluate(() => document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'));

  for (const loc of LOCALES) {
    for (const act of ACTIVITIES) {
      const tag = `${loc}/${act.id.split('.')[1]}`;
      const page = await browser.newPage();
      await page.setViewport({ width: 412, height: 900 });
      const errs = [];
      const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
      page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
      page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
      const url = `${BASE}/number-bond-activity.html?lang=${loc}&activity=${act.id}&embed=1`;
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await page.waitForFunction(() => {
          const t = window.NumberBondActivity;
          return t && t._activityRow && document.querySelector('.nb-svg') && document.querySelector('.lcs-activity-check');
        }, { timeout: 15000 });

        const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
        const expectTitle = (STR[act.titleKey] && STR[act.titleKey][loc]) || null;
        if (expectTitle) note(title === expectTitle, `${tag}: title "${title}" ≠ localized "${expectTitle}"`);
        const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
        note(prompt.length > 0, `${tag}: empty prompt`);

        /* 3-part bond: assert exactly 3 given part-nodes render (the novel render path) */
        if (act.parts === 3) {
          const nGiven = await page.$$eval('.nb-part-given', els => els.length);
          note(nGiven === 3, `${tag}: ${nGiven} given part-nodes (expected 3)`);
        }

        /* variety */
        const N = await page.evaluate(() => window.NumberBondActivity._pool.length);
        const ids = await page.evaluate((c) => { const t = window.NumberBondActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
        const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
        note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
        note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
        note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

        /* interaction: reload round 0, then drive the answer surface */
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());

        if (act.answer === 'keypad') {
          /* whole-unknown: read the total, type a WRONG value (no celebrate), then the correct total */
          await page.waitForFunction(() => document.querySelector('.lcs-activity-keypad'), { timeout: 5000 });
          const t = await page.evaluate(() => window.NumberBondActivity.total());
          await keypadEnter(page, t - 1);
          await page.click('.lcs-activity-check');
          note(!(await celebrating(page)), `${tag}: a wrong total (${t - 1}) still celebrated`);
          await keypadClear(page);
          await keypadEnter(page, t);
          await page.click('.lcs-activity-check');
          note(await celebrating(page), `${tag}: correct total (${t}) did not celebrate`);
        } else {
          /* tap-fill (make-ten / make-ten-to-add): under-fill → no celebrate, then complete */
          await page.waitForFunction(() => document.querySelector('.nb-part-fill'), { timeout: 5000 });
          const m = await page.evaluate(() => ({ whole: window.NumberBondActivity.whole, missing: window.NumberBondActivity.missing() }));
          if (m.missing - 1 >= 1) {
            await tapFill(page, m.missing - 1);
            await page.click('.lcs-activity-check');
            const wrong = await page.evaluate(() => ({ c: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), ro: window.NumberBondActivity.readOnly }));
            note(!wrong.c && !wrong.ro, `${tag}: an under-fill still celebrated/locked`);
            await tapFill(page, 1);
          } else {
            await tapFill(page, m.missing);
          }
          await page.click('.lcs-activity-check');
          const ok = await page.evaluate(() => ({ c: document.querySelector('.lcs-activity-prompt').classList.contains('celebrate'), ro: window.NumberBondActivity.readOnly, correct: window.NumberBondActivity.isCorrect() }));
          note(ok.correct, `${tag}: filling to the target (${m.missing}) did not satisfy isCorrect()`);
          note(ok.c && ok.ro, `${tag}: correct fill did not celebrate + lock`);
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
        console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${title}" | "${prompt}" | ${new Set(p1).size} distinct`);
      } catch (e) {
        fails.push(`${tag}: ${e.message}`);
        console.log(`  FAIL ${tag} — ${e.message}`);
      } finally { await page.close(); }
    }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`NUMBER-BOND LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`NUMBER-BOND LOCAL TEST PASSED — ${LOCALES.length} locale(s): render + localized title/prompt + tap-fill (correct celebrates, under-fill doesn't) + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
