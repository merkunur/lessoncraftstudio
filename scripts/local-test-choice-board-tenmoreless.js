#!/usr/bin/env node
/* =====================================================================
   local-test-choice-board-tenmoreless.js — local interaction harness for the
   1.NBT.C.5 "Ten More, Ten Less" ten-more-less choice-board activity.

   Serves `mini tools/` + drives choice-board-activity.html with puppeteer:
     • subject = the two-digit number n (rendered in .cb-subject-text);
     • prompt = promptTenMore / promptTenLess (localized via
       window.LCS.i18n.current — assert rendered native text, not the raw key);
     • 4 number tiles; correct = (op==='more'?n+10:n-10) computed from the
       displayed n + the op inferred from the localized prompt;
     • tap a FOIL → no celebrate; tap the correct tile → celebrate;
     • variety/shuffle (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.

   Usage: node scripts/local-test-choice-board-tenmoreless.js [--locales=en,de] [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const SHOT = has('shot');
const ACTIVITY_ID = 'choice-board.ten-more-less.1-nbt-c-5';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'choice-board');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file = (p === '/' || p === '/choice-board-activity.html') ? path.join(MINI, 'choice-board-activity.html')
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
  const celebrating = (page) => page.evaluate(() => { var p = document.querySelector('.lcs-activity-prompt'); return !!p && p.classList.contains('celebrate'); });
  async function clickTileText(page, text) {
    const tiles = await page.$$('.cb-tile');
    for (const t of tiles) {
      const txt = await page.evaluate(e => { var s = e.querySelector('.cb-tile-text'); return s ? s.textContent.trim() : ''; }, t);
      if (txt === text) { await t.click(); return true; }
    }
    return false;
  }

  for (const loc of LOCALES) {
    const tag = `${loc}/ten-more-less`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/choice-board-activity.html?lang=${loc}&activity=${ACTIVITY_ID}&embed=1`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        const t = window.ChoiceBoardActivity;
        return t && t._activityRow && document.querySelector('.cb-tile') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* nextTask installed + tasks nulled */
      const wired = await page.evaluate(() => typeof window.ChoiceBoardActivity.nextTask === 'function' && !window.ChoiceBoardActivity.tasks);
      note(wired, `${tag}: nextTask not installed / tasks not nulled`);

      /* variety */
      const N = await page.evaluate(() => window.ChoiceBoardActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.ChoiceBoardActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

      /* interaction: reload round 0 */
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelectorAll('.cb-tile').length === 4 && document.querySelector('.cb-subject-text'), { timeout: 5000 });

      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      const wantMore = await page.evaluate(l => { const s = window.ChoiceBoardActivity.strings.promptTenMore; return s && (s[l] || null); }, loc);
      const wantLess = await page.evaluate(l => { const s = window.ChoiceBoardActivity.strings.promptTenLess; return s && (s[l] || null); }, loc);
      note(prompt.length > 0 && !/^prompt[A-Z]/.test(prompt), `${tag}: raw/empty prompt "${prompt}"`);
      const op = (prompt === wantMore) ? 'more' : (prompt === wantLess) ? 'less' : null;
      note(op !== null, `${tag}: prompt "${prompt}" matched neither promptTenMore "${wantMore}" nor promptTenLess "${wantLess}"`);

      const subjN = await page.$eval('.cb-subject-text', e => parseInt(e.textContent.trim(), 10)).catch(() => NaN);
      note(!isNaN(subjN) && subjN >= 20 && subjN <= 89, `${tag}: subject n "${subjN}" not in 20..89`);

      const tileTexts = await page.$$eval('.cb-tile .cb-tile-text', els => els.map(e => e.textContent.trim()));
      note(tileTexts.length === 4, `${tag}: ${tileTexts.length} tiles (expected 4)`);
      if (op && !isNaN(subjN) && tileTexts.length === 4) {
        const correct = (op === 'more') ? subjN + 10 : subjN - 10;
        const expectedSet = [subjN - 10, subjN - 1, subjN + 1, subjN + 10].map(String).sort();
        note(tileTexts.slice().sort().join() === expectedSet.join(), `${tag}: tiles ${JSON.stringify(tileTexts)} ≠ offset set ${JSON.stringify(expectedSet)}`);
        const foil = tileTexts.find(t => Number(t) !== correct);
        const correctStr = String(correct);
        note(tileTexts.indexOf(correctStr) >= 0, `${tag}: correct ${correctStr} not among tiles`);
        if (foil && tileTexts.indexOf(correctStr) >= 0) {
          await clickTileText(page, foil);
          await page.click('.lcs-activity-check');
          note(!(await celebrating(page)), `${tag}: a FOIL "${foil}" still celebrated`);
          await clickTileText(page, correctStr);
          await page.click('.lcs-activity-check');
          note(await celebrating(page), `${tag}: the correct tile "${correctStr}" (=${op} ${subjN}) did not celebrate`);
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
      console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${prompt}" (op=${op}, n=${subjN}) | ${new Set(p1).size} distinct`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`TEN-MORE-LESS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`TEN-MORE-LESS LOCAL TEST PASSED — ${LOCALES.length} locale(s): localized prompt (more/less) + subject n + 4 offset tiles + tap-foil→no-celebrate/tap-correct→celebrate + ≥7 reshuffle + no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
