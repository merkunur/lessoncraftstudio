#!/usr/bin/env node
/* =====================================================================
   local-test-ten-frame.js — local interaction harness for the K.OA.A.1
   "Show the Operation" represent-operation ten-frame activity.

   Serves `mini tools/` + drives ten-frame-activity.html with puppeteer:
     • renders the frame + localized add/subtract prompt ("Show 3 + 2" /
       "Show 5 − 2 — take some away");
     • TAP cells to reach the target count: a WRONG count does NOT celebrate;
       the correct count (a+b for +, a−b for −) celebrates;
     • variety/shuffle (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.

   Usage: node scripts/local-test-ten-frame.js [--locales=en,de] [--shot]
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
  { id: 'ten-frame.show-the-operation.k-oa-a-1', kind: 'op' },
  { id: 'ten-frame.solve-the-story.k-oa-a-2', kind: 'story' },
  { id: 'ten-frame.quick-facts-to-5.k-oa-a-5', kind: 'choice' },
];
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'ten-frame');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = (p === '/' || p === '/ten-frame-activity.html') ? path.join(MINI, 'ten-frame-activity.html')
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
  const count = (page) => page.evaluate(() => window.TenFrameActivity.count);
  /* set the frame's count to T by tapping the right cell (mirrors setCount tap rule) */
  async function setCountTo(page, T) {
    const c = await count(page);
    if (c === T) return;
    const ord = (c < T) ? T : T + 1;            // c<T → tap ord=T (fills to T); c>T → tap ord=T+1 (drops to T)
    await page.evaluate(o => { document.querySelectorAll('.tf-cell')[o - 1].click(); }, ord);
  }
  async function keypadClear(page) { await page.evaluate(() => { const c = document.querySelector('.lcs-activity-key-clear'); if (c) c.click(); }); }
  async function keypadEnter(page, num) {
    for (const ch of String(num)) {
      await page.evaluate(d => { const k = [...document.querySelectorAll('.lcs-activity-key')].find(b => b.textContent.trim() === d); if (k) k.click(); }, ch);
    }
  }

  for (const act of ACTIVITIES) {
   const shortId = act.id.split('.')[1];
   for (const loc of LOCALES) {
    const tag = `${loc}/${shortId}`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/ten-frame-activity.html?lang=${loc}&activity=${act.id}&embed=1`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.TenFrameActivity;
        return t && t._activityRow && document.querySelector('.tf-cell') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* nextTask installed + tasks nulled */
      const wired = await page.evaluate(() => typeof window.TenFrameActivity.nextTask === 'function' && !window.TenFrameActivity.tasks);
      note(wired, `${tag}: nextTask not installed / tasks not nulled`);

      /* variety: ≥7 distinct + pass-2 reshuffle */
      const N = await page.evaluate(() => window.TenFrameActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.TenFrameActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

      /* interaction: reload round 0 */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelectorAll('.tf-cell').length >= 10, { timeout: 5000 });
      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      note(prompt.length > 0, `${tag}: empty prompt`);

      if (act.kind === 'op') {
        /* parse "a op b", drive frame to wrong then correct (state answer) */
        const m = /(\d+)\s*([+−])\s*(\d+)/.exec(prompt);
        note(!!m, `${tag}: prompt has no "a op b" — "${prompt}"`);
        if (m) {
          const a = +m[1], op = m[2], b = +m[3];
          const result = op === '+' ? a + b : a - b;
          const wrong = (result + 1 <= 10) ? result + 1 : result - 1;
          await setCountTo(page, wrong);
          await page.click('.lcs-activity-check');
          note(!(await celebrating(page)), `${tag}: a wrong count (${wrong}) still celebrated [${a}${op}${b}]`);
          await setCountTo(page, result);
          note((await count(page)) === result, `${tag}: could not reach count ${result} [${a}${op}${b}]`);
          await page.click('.lcs-activity-check');
          note(await celebrating(page), `${tag}: correct count (${result}) did not celebrate [${a}${op}${b}]`);
        }
      } else if (act.kind === 'story') {
        /* story: native prompt with digits; keypad the loaded round's .answer */
        note(/\d/.test(prompt), `${tag}: story prompt has no digits — "${prompt}"`);
        const ans = await page.evaluate(() => { const t = window.TenFrameActivity.nextTask({ index: 0 }); return t ? t.answer : null; });
        note(typeof ans === 'number', `${tag}: could not read round .answer`);
        if (typeof ans === 'number') {
          const wrong = (ans + 1 <= 10) ? ans + 1 : ans - 1;
          await keypadClear(page); await keypadEnter(page, wrong);
          await page.click('.lcs-activity-check');
          note(!(await celebrating(page)), `${tag}: a wrong answer (${wrong}) still celebrated`);
          await keypadClear(page); await keypadEnter(page, ans);
          await page.click('.lcs-activity-check');
          note(await celebrating(page), `${tag}: correct answer (${ans}) did not celebrate`);
        }
      } else {
        /* choice: bare expression prompt with digits; tap a WRONG chip → no celebrate,
           tap the answer chip → celebrate. Read .answer + .choices from the loaded round. */
        note(/\d/.test(prompt), `${tag}: choice prompt has no digits — "${prompt}"`);
        const t = await page.evaluate(() => { const x = window.TenFrameActivity.nextTask({ index: 0 }); return x ? { answer: x.answer, choices: (x.choices || []).map(c => c.value) } : null; });
        note(t && typeof t.answer === 'number' && t.choices.length === 3, `${tag}: bad task .answer/.choices`);
        const tapChip = async (val) => { await page.evaluate(v => { const c = [...document.querySelectorAll('.lcs-chip')].find(b => b.textContent.trim() === String(v)); if (c) c.click(); }, val); };
        if (t && typeof t.answer === 'number') {
          const wrong = t.choices.find(c => c !== t.answer);
          await tapChip(wrong);
          await page.click('.lcs-activity-check');
          note(!(await celebrating(page)), `${tag}: a wrong choice (${wrong}) still celebrated`);
          await tapChip(t.answer);
          await page.click('.lcs-activity-check');
          note(await celebrating(page), `${tag}: correct choice (${t.answer}) did not celebrate`);
        }
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
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`TEN-FRAME LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`TEN-FRAME LOCAL TEST PASSED — ${LOCALES.length} locale(s): frame + localized add/subtract prompt + tap-to-count (wrong doesn't celebrate, correct does) + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
