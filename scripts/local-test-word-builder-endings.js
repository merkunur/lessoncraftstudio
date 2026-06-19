#!/usr/bin/env node
/* =====================================================================
   local-test-word-builder-endings.js — local interaction harness for the
   RF.1.3.f "Build Words with Endings" build-endings activity (EN-only,
   word-only, word-builder engine / syllable-builder wrapper).

   Serves `mini tools/` + drives syllable-builder-activity.html with puppeteer:
     • the subject is the BASE word as TEXT (no picture; .wb-subject-text);
     • build base+ending by tapping the tiles in order (read core.targetTiles)
       → feedbackMode === 'correct' after Check;
     • a wrong ending (one of the other two) in slot 1 → NOT correct;
     • per-tile audio MUTED (spy: tapping tiles fires NO 'syllable' speak) +
       Hear-it speaks the whole target word + speakBlend ('word') on correct;
     • variety (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768.
   EN-only (the word-builder tail codes are the EN exception).

   Usage: node scripts/local-test-word-builder-endings.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const has = (k) => process.argv.includes('--' + k);
const SHOT = has('shot');
const ACTIVITY_ID = 'syllable-builder.build-endings.rf-1-3-f';
const ENDINGS = new Set(['s', 'ed', 'ing']);
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'word-builder');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.startsWith('/image-library-webp/')) { res.statusCode = 404; res.end('no img locally'); return; }
    let file = (p === '/' || p === '/syllable-builder-activity.html') ? path.join(MINI, 'syllable-builder-activity.html')
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
  async function tapTile(page, tile) {
    const tiles = await page.$$('.wb-tile');
    for (const t of tiles) { const l = await page.evaluate(e => e.dataset.tile, t); if (l === tile) { await t.click(); return true; } }
    return false;
  }
  const fb = (page) => page.evaluate(() => window.SyllableBuilderActivity && window.SyllableBuilderActivity.feedbackMode);
  const installSpy = (page) => page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { window.LCSAudio.speak = function (a) { window.__spoken.push({ type: a && a.type, text: a && a.text }); }; } });

  const tag = 'en/build-endings';
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|image-library-webp|404|net::ERR/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
  const url = `${BASE}/syllable-builder-activity.html?lang=en&activity=${ACTIVITY_ID}&embed=1`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => {
      const t = window.SyllableBuilderActivity;
      return t && t._activityRow && document.querySelector('.wb-slot') && document.querySelector('.lcs-activity-check');
    }, { timeout: 15000 });

    const wired = await page.evaluate(() => typeof window.SyllableBuilderActivity.nextTask === 'function' && !window.SyllableBuilderActivity.tasks);
    note(wired, `${tag}: nextTask not installed / tasks not nulled`);

    // variety
    const N = await page.evaluate(() => window.SyllableBuilderActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.SyllableBuilderActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
    note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

    // reload round 0, read targetTiles + subject text + mutePerTile
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => document.querySelector('.wb-slot') && window.SyllableBuilderActivity.targetTiles && window.SyllableBuilderActivity.targetTiles.length, { timeout: 5000 });
    const tiles = await page.evaluate(() => window.SyllableBuilderActivity.targetTiles.slice());
    const target = await page.evaluate(() => window.SyllableBuilderActivity.targetWord);
    const muted = await page.evaluate(() => window.SyllableBuilderActivity.mutePerTile === true);
    note(muted, `${tag}: mutePerTile not set true on the core`);
    note(Array.isArray(tiles) && tiles.length === 2 && ENDINGS.has(tiles[1]), `${tag}: round 0 not [base, ending] (${JSON.stringify(tiles)})`);

    // word-only: subject is the base word as TEXT (no image)
    const subjText = await page.$eval('.wb-subject-text', e => e.textContent.trim()).catch(() => null);
    note(subjText === tiles[0], `${tag}: subject text "${subjText}" ≠ base "${tiles[0]}" (word-only text subject)`);
    const hasImg = await page.$('.wb-subject-img');
    note(!hasImg, `${tag}: an image subject rendered (should be word-only)`);

    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(prompt.length > 0 && !/^prompt[A-Z]/.test(prompt) && !/\{word\}/.test(prompt), `${tag}: raw/empty/uninterpolated prompt "${prompt}"`);
    note(prompt.indexOf(target) >= 0, `${tag}: prompt does not name the target "${target}" ("${prompt}")`);

    // per-tile audio MUTED: spy, tap all tiles, assert 0 'syllable' speaks
    await installSpy(page);
    for (const t of tiles) await tapTile(page, t);
    const tileSpeaks = await page.evaluate(() => window.__spoken.filter(s => s.type === 'syllable'));
    note(tileSpeaks.length === 0, `${tag}: per-tile audio fired despite mutePerTile (spy=${JSON.stringify(tileSpeaks)})`);

    // Check → correct + speakBlend ('word')
    await page.click('.lcs-activity-check');
    note((await fb(page)) === 'correct', `${tag}: correct base+ending build did not register correct (fb=${await fb(page)})`);
    const blend = await page.evaluate(() => window.__spoken.filter(s => s.type === 'word'));
    note(blend.some(s => s.text === target), `${tag}: speakBlend did not speak the word "${target}" on correct (spy=${JSON.stringify(blend)})`);

    // Hear-it speaks the whole target
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => window.SyllableBuilderActivity.targetTiles, { timeout: 5000 });
    await installSpy(page);
    const hearBtn = await page.$('.wb-subject-hear');
    if (hearBtn) { await hearBtn.click(); const sp = await page.evaluate(() => window.__spoken.slice()); note(sp.some(s => s.type === 'word' && s.text === target), `${tag}: Hear-it did not speak the target "${target}" (spy=${JSON.stringify(sp)})`); }

    // wrong build: a different ending in slot 1
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => window.SyllableBuilderActivity.targetTiles, { timeout: 5000 });
    const t2 = await page.evaluate(() => window.SyllableBuilderActivity.targetTiles.slice());
    const wrongEnding = await page.evaluate((ends, correct) => {
      const pal = window.SyllableBuilderActivity.palette || [];
      return pal.find(p => ends.includes(p) && p !== correct) || null;
    }, Array.from(ENDINGS), t2[1]);
    note(wrongEnding, `${tag}: no other-ending distractor in palette`);
    if (wrongEnding) {
      await tapTile(page, t2[0]); await tapTile(page, wrongEnding);
      await page.click('.lcs-activity-check');
      note((await fb(page)) !== 'correct', `${tag}: wrong ending "${wrongEnding}" registered correct`);
    }

    // mobile overflow
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 900 });
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
      if (SHOT && (w === 280 || w === 390)) { await page.setViewport({ width: w, height: 900 }); const cc = await page.evaluate(() => window.SyllableBuilderActivity.targetTiles.slice()); for (const c of cc) await tapTile(page, c); await page.screenshot({ path: path.join(SHOT_DIR, `build-endings-${w}.png`) }); }
    }
    await page.setViewport({ width: 412, height: 900 });

    note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
    const okT = !fails.some(f => f.startsWith(tag + ':'));
    console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${prompt}" (round0=${tiles.join('+')}=${target}) | ${new Set(p1).size} distinct`);
  } catch (e) {
    fails.push(`${tag}: ${e.message}`);
    console.log(`  FAIL ${tag} — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WORD-BUILDER ENDINGS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`WORD-BUILDER ENDINGS LOCAL TEST PASSED — EN: word-only text subject, base+ending build → correct, wrong ending → not, per-tile audio muted, Hear-it + speakBlend speak the target, ≥7 reshuffle, no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
