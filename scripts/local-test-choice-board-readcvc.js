#!/usr/bin/env node
/* =====================================================================
   local-test-choice-board-readcvc.js — local interaction harness for the RF.K.3
   "Read the Word, Tap the Picture" read-cvc-word choice-board activity (EN-only,
   whole-word decode-to-meaning).

   Serves `mini tools/` + drives choice-board-activity.html with puppeteer:
     • a printed CVC WORD text subject (.cb-subject-text, NOT a .cb-subject-img —
       word-only) + 4 PICTURE tiles render;
     • prompt = promptReadWord (assert rendered EN text, not the raw key);
     • subject text === the active round's printed word (a 3-letter lowercase CVC);
     • NO audio fires (spy: 0 speaks — printed-word is the visual stimulus);
     • the correct tile = window.ChoiceBoardActivity.targetKey (the noun); tap a
       FOIL → no celebrate; tap the correct → celebrate;
     • variety/shuffle (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.
   (Images served from /image-library-webp/ are NOT hosted here → tiles render a
   broken <img>; the test checks tile STRUCTURE + data-key + tap. Real image
   HTTP-200 is the gate's fs-exists + post-deploy curl.) EN-only.

   Usage: node scripts/local-test-choice-board-readcvc.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const has = (k) => process.argv.includes('--' + k);
const SHOT = has('shot');
const ACTIVITY_ID = 'choice-board.read-cvc-word.rf-k-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'choice-board');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.startsWith('/image-library-webp/')) { res.statusCode = 404; res.end('no img locally'); return; }
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
  async function clickTileKey(page, key) {
    const tiles = await page.$$('.cb-tile');
    for (const t of tiles) { const k = await page.evaluate(e => e.getAttribute('data-key'), t); if (k === key) { await t.click(); return true; } }
    return false;
  }

  const tag = 'en/read-cvc-word';
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|image-library-webp|404|net::ERR/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
  const url = `${BASE}/choice-board-activity.html?lang=en&activity=${ACTIVITY_ID}&embed=1`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => {
      const t = window.ChoiceBoardActivity;
      return t && t._activityRow && document.querySelector('.cb-tile') && document.querySelector('.lcs-activity-check');
    }, { timeout: 15000 });

    const wired = await page.evaluate(() => typeof window.ChoiceBoardActivity.nextTask === 'function' && !window.ChoiceBoardActivity.tasks);
    note(wired, `${tag}: nextTask not installed / tasks not nulled`);

    const N = await page.evaluate(() => window.ChoiceBoardActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ChoiceBoardActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
    note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

    // audio-silence spy installed before the round renders
    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { window.LCSAudio.speak = function (a) { window.__spoken.push(a); }; } });
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => document.querySelectorAll('.cb-tile').length === 4 && document.querySelector('.cb-subject-text'), { timeout: 5000 });

    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    const want = await page.evaluate(() => { const s = window.ChoiceBoardActivity.strings.promptReadWord; return s && s.en; });
    note(prompt.length > 0 && !/^prompt[A-Z]/.test(prompt), `${tag}: raw/empty prompt "${prompt}"`);
    if (want) note(prompt === want, `${tag}: prompt "${prompt}" ≠ "${want}"`);

    // word-only: a printed CVC word text subject, NO image subject
    const subj = await page.$eval('.cb-subject-text', e => e.textContent.trim()).catch(() => '');
    note(/^[a-z]{3}$/.test(subj), `${tag}: subject "${subj}" is not a 3-letter printed word`);
    const hasSubjImg = await page.$('.cb-subject-img');
    note(!hasSubjImg, `${tag}: an image subject rendered (should be word-only)`);
    const imgCount = await page.$$eval('.cb-tile .cb-tile-img', els => els.length);
    note(imgCount === 4, `${tag}: ${imgCount} image tiles (expected 4)`);

    const spokenOnLoad = await page.evaluate(() => (window.__spoken || []).length);
    note(spokenOnLoad === 0, `${tag}: ${spokenOnLoad} audio speak(s) fired (expected 0 — printed-word, no audio)`);

    const target = await page.evaluate(() => window.ChoiceBoardActivity.targetKey);
    const keys = await page.$$eval('.cb-tile', els => els.map(e => e.getAttribute('data-key')));
    note(keys.indexOf(target) >= 0, `${tag}: target "${target}" not among tiles ${JSON.stringify(keys)}`);
    note(target === subj, `${tag}: subject word "${subj}" ≠ target noun "${target}" (correct word should be the subject)`);
    const foil = keys.find(k => k !== target);
    if (foil && keys.indexOf(target) >= 0) {
      await clickTileKey(page, foil);
      await page.click('.lcs-activity-check');
      note(!(await celebrating(page)), `${tag}: a FOIL "${foil}" still celebrated`);
      await clickTileKey(page, target);
      await page.click('.lcs-activity-check');
      note(await celebrating(page), `${tag}: the correct tile "${target}" did not celebrate`);
    }

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 900 });
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
      if (SHOT && (w === 280 || w === 360)) await page.screenshot({ path: path.join(SHOT_DIR, `read-cvc-${w}.png`) });
    }
    if (SHOT) { await page.setViewport({ width: 390, height: 900 }); await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask()); await page.screenshot({ path: path.join(SHOT_DIR, `read-cvc-390.png`) }); }
    await page.setViewport({ width: 412, height: 900 });

    note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
    const okT = !fails.some(f => f.startsWith(tag + ':'));
    console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${prompt}" (subj=${subj}, target=${target}) | ${new Set(p1).size} distinct`);
  } catch (e) {
    fails.push(`${tag}: ${e.message}`);
    console.log(`  FAIL ${tag} — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`READ-CVC LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`READ-CVC LOCAL TEST PASSED — EN: promptReadWord + printed-CVC-word subject (no image, no audio) + 4 picture tiles + tap-foil→no-celebrate/tap-correct→celebrate + ≥7 reshuffle + no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
