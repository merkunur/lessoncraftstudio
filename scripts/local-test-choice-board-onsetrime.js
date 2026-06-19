#!/usr/bin/env node
/* =====================================================================
   local-test-choice-board-onsetrime.js — local interaction + AUDIO harness for
   the RF.K.2.c "Blend Onset & Rime" activity (REDUCED FAN en/nl/da).

   Serves `mini tools/` + drives choice-board-activity.html with puppeteer:
     • AUDIO SPY: overrides window.LCSAudio.speak → records {type,text}; asserts
       the RIME is spoken (type:'syllable') on load, and the blended WORD
       (type:'word') is spoken on a correct answer;
     • subject shows the onset · rime chunks; localized prompt via i18n.current;
     • 4 picture tiles; tap a foil → no celebrate, tap core.targetKey → celebrate;
     • ≥7 distinct via nextTask + reshuffle; mobile overflow 280/360/412/768.
   Loops ONLY the confirmed fan (en/nl/da).

   Usage: node scripts/local-test-choice-board-onsetrime.js [--locales=en,nl,da] [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,nl,da').split(',');
const SHOT = has('shot');
const ACTIVITY_ID = 'choice-board.onset-rime-blend.rf-k-2-c';
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
  const installSpy = (page) => page.evaluate(() => {
    window.__spoken = [];
    if (window.LCSAudio) window.LCSAudio.speak = function (o) { window.__spoken.push({ type: o && o.type, text: o && o.text }); };
  });

  for (const loc of LOCALES) {
    const tag = `${loc}/onset-rime`;
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|image-library-webp|404|net::ERR/i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    const url = `${BASE}/choice-board-activity.html?lang=${loc}&activity=${ACTIVITY_ID}&embed=1`;
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

      // AUDIO SPY: install, then reload round 0 → setup speaks rime
      await installSpy(page);
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      await page.waitForFunction(() => document.querySelectorAll('.cb-tile').length === 4 && document.querySelector('.cb-subject-text'), { timeout: 5000 });

      const subj = await page.$eval('.cb-subject-text', e => e.textContent.trim()).catch(() => '');
      const rime = subj.split('·').pop().trim();
      const spokenOnLoad = await page.evaluate(() => window.__spoken.slice());
      note(spokenOnLoad.some(s => s.type === 'syllable'), `${tag}: no syllable spoken on load (spy=${JSON.stringify(spokenOnLoad)})`);
      note(spokenOnLoad.some(s => s.type === 'syllable' && s.text === rime), `${tag}: rime "${rime}" not spoken (spy=${JSON.stringify(spokenOnLoad)})`);

      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      const want = await page.evaluate(l => { const s = window.ChoiceBoardActivity.strings.promptBlend; return s && (s[l] || null); }, loc);
      note(prompt.length > 0 && !/^prompt[A-Z]/.test(prompt), `${tag}: raw/empty prompt "${prompt}"`);
      if (want) note(prompt === want, `${tag}: prompt "${prompt}" ≠ "${want}"`);
      const imgCount = await page.$$eval('.cb-tile .cb-tile-img', els => els.length);
      note(imgCount === 4, `${tag}: ${imgCount} image tiles (expected 4)`);

      const target = await page.evaluate(() => window.ChoiceBoardActivity.targetKey);
      const keys = await page.$$eval('.cb-tile', els => els.map(e => e.getAttribute('data-key')));
      note(keys.indexOf(target) >= 0, `${tag}: target "${target}" not among tiles ${JSON.stringify(keys)}`);
      const foil = keys.find(k => k !== target);
      if (foil && keys.indexOf(target) >= 0) {
        await clickTileKey(page, foil);
        await page.click('.lcs-activity-check');
        note(!(await celebrating(page)), `${tag}: a FOIL "${foil}" still celebrated`);
        await page.evaluate(() => { window.__spoken = []; });
        await clickTileKey(page, target);
        await page.click('.lcs-activity-check');
        note(await celebrating(page), `${tag}: the correct tile "${target}" did not celebrate`);
        const afterCorrect = await page.evaluate(() => window.__spoken.slice());
        note(afterCorrect.some(s => s.type === 'word'), `${tag}: blended WORD not spoken on correct (spy=${JSON.stringify(afterCorrect)})`);
      }

      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 280 || w === 390)) await page.screenshot({ path: path.join(SHOT_DIR, `${tag.replace('/', '-')}-${w}.png`) });
      }
      if (SHOT) { await page.setViewport({ width: 390, height: 900 }); await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask()); await page.screenshot({ path: path.join(SHOT_DIR, `${tag.replace('/', '-')}-390.png`) }); }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okT = !fails.some(f => f.startsWith(tag + ':'));
      console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${prompt}" (subj=${subj}, rime=${rime}, target=${target}) | ${new Set(p1).size} distinct`);
    } catch (e) {
      fails.push(`${tag}: ${e.message}`);
      console.log(`  FAIL ${tag} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`ONSET-RIME LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`ONSET-RIME LOCAL TEST PASSED — ${LOCALES.length} fan locale(s): rime spoken on load + word spoken on correct (audio spy) + localized prompt + onset·rime subject + 4 picture tiles + tap-foil/correct + ≥7 reshuffle + no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
