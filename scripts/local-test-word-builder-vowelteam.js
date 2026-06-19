#!/usr/bin/env node
/* =====================================================================
   local-test-word-builder-vowelteam.js — local interaction harness for the
   RF.1.3 vowel-teams "Build the Vowel-Team Word" build-vowel-teams activity
   (EN-only, word-builder engine / syllable-builder wrapper).

   Serves `mini tools/` + drives syllable-builder-activity.html with puppeteer:
     • build the word by tapping the chunk tiles in order (read core.targetTiles)
       → feedbackMode === 'correct' after Check;
     • a wrong vowel-team in the vowel slot → NOT correct;
     • the vowel-team tile renders as ONE unit (a slot textContent === a chunk
       ≥2 chars);
     • per-tile audio MUTED (spy: tapping tiles fires NO 'syllable' speak) +
       Hear-it speaks the whole word + speakBlend ('word') on correct;
     • variety (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768 (novel vowel-team unit-tile render).
   EN-only (both word-builder tail codes are the EN exception).

   Usage: node scripts/local-test-word-builder-vowelteam.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const has = (k) => process.argv.includes('--' + k);
const SHOT = has('shot');
const ACTIVITY_ID = 'syllable-builder.build-vowel-teams.rf-1-3';
const VOWEL_TEAMS = new Set(['ai', 'ay', 'ea', 'ee', 'ey', 'ie', 'oa', 'oe', 'oo', 'ow', 'ou', 'ue', 'ui', 'igh', 'eigh']);
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
  const installSpy = (page) => page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) { const o = window.LCSAudio.speak; window.LCSAudio.speak = function (a) { window.__spoken.push({ type: a && a.type, text: a && a.text }); }; } });

  const tag = 'en/build-vowel-team';
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

    // reload round 0, read targetTiles + mutePerTile
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => document.querySelector('.wb-slot') && window.SyllableBuilderActivity.targetTiles && window.SyllableBuilderActivity.targetTiles.length, { timeout: 5000 });
    const tiles = await page.evaluate(() => window.SyllableBuilderActivity.targetTiles.slice());
    const target = await page.evaluate(() => window.SyllableBuilderActivity.targetWord);
    const muted = await page.evaluate(() => window.SyllableBuilderActivity.mutePerTile === true);
    note(muted, `${tag}: mutePerTile not set true on the core`);
    note(Array.isArray(tiles) && tiles.length >= 2, `${tag}: no tiles read`);
    note(tiles.filter(t => VOWEL_TEAMS.has(t)).length === 1, `${tag}: round 0 not exactly one vowel-team unit (${JSON.stringify(tiles)})`);

    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(prompt.length > 0 && !/^prompt[A-Z]/.test(prompt), `${tag}: raw/empty prompt "${prompt}"`);

    // per-tile audio MUTED: spy, tap all tiles, assert 0 'syllable' speaks
    await installSpy(page);
    for (const t of tiles) await tapTile(page, t);
    const tileSpeaks = await page.evaluate(() => window.__spoken.filter(s => s.type === 'syllable'));
    note(tileSpeaks.length === 0, `${tag}: per-tile audio fired despite mutePerTile (spy=${JSON.stringify(tileSpeaks)})`);
    const slotTexts = await page.$$eval('.wb-slot', els => els.map(e => e.textContent.trim()));
    note(slotTexts.join('') === tiles.join(''), `${tag}: slots ${JSON.stringify(slotTexts)} ≠ tiles ${JSON.stringify(tiles)} (unit-tile render)`);
    note(slotTexts.some(s => s.length >= 2 && VOWEL_TEAMS.has(s)), `${tag}: no vowel-team slot rendered as one unit (${JSON.stringify(slotTexts)})`);

    // Check → correct + speakBlend ('word')
    await page.click('.lcs-activity-check');
    note((await fb(page)) === 'correct', `${tag}: correct tile build did not register correct (fb=${await fb(page)})`);
    const blend = await page.evaluate(() => window.__spoken.filter(s => s.type === 'word'));
    note(blend.some(s => s.text === target), `${tag}: speakBlend did not speak the word "${target}" on correct (spy=${JSON.stringify(blend)})`);

    // Hear-it speaks the whole word
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => window.SyllableBuilderActivity.targetTiles, { timeout: 5000 });
    await installSpy(page);
    const hearBtn = await page.$('.wb-subject-hear');
    if (hearBtn) { await hearBtn.click(); const sp = await page.evaluate(() => window.__spoken.slice()); note(sp.some(s => s.type === 'word' && s.text === target), `${tag}: Hear-it did not speak the word "${target}" (spy=${JSON.stringify(sp)})`); }

    // wrong build: a confusable vowel-team in the vowel slot
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => window.SyllableBuilderActivity.targetTiles, { timeout: 5000 });
    const t2 = await page.evaluate(() => window.SyllableBuilderActivity.targetTiles.slice());
    const team2 = t2.find(t => VOWEL_TEAMS.has(t));
    const wrongTeam = await page.evaluate((teams, team) => {
      const pal = window.SyllableBuilderActivity.palette || [];
      return pal.find(p => teams.includes(p) && p !== team) || null;
    }, Array.from(VOWEL_TEAMS), team2);
    note(wrongTeam, `${tag}: no confusable vowel-team distractor in palette`);
    if (wrongTeam) {
      const vIdx = t2.indexOf(team2);
      for (let k = 0; k < t2.length; k++) await tapTile(page, k === vIdx ? wrongTeam : t2[k]);
      await page.click('.lcs-activity-check');
      note((await fb(page)) !== 'correct', `${tag}: wrong vowel-team "${wrongTeam}" in vowel slot registered correct`);
    }

    // mobile overflow
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 900 });
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
      if (SHOT && (w === 280 || w === 390)) { await page.setViewport({ width: w, height: 900 }); const cc = await page.evaluate(() => window.SyllableBuilderActivity.targetTiles.slice()); for (const c of cc) await tapTile(page, c); await page.screenshot({ path: path.join(SHOT_DIR, `build-vowel-team-${w}.png`) }); }
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
    console.error(`WORD-BUILDER VOWEL-TEAM LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`WORD-BUILDER VOWEL-TEAM LOCAL TEST PASSED — EN: unit-tile build → correct, wrong vowel-team → not, vowel-team renders as one unit, per-tile audio muted, Hear-it + speakBlend speak the word, ≥7 reshuffle, no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
