#!/usr/bin/env node
/* =====================================================================
   local-test-sight-word.js — local interaction harness for the E9
   read-sight-word choice-board skill (RF.K.3.c). No Next stack.

   Serves `mini tools/` + drives choice-board-activity.html per locale
   (10 locales — fi is intentionally absent / 404 by design):
     • stubs speechSynthesis (evaluateOnNewDocument) to CAPTURE the spoken
       word — proves the wrapper speaks the TARGET on task load (the audio
       is the only channel that reveals the answer → genuine reading);
     • localized prompt ("Tap the word you hear"), 4 word tiles;
     • tap the TARGET word → celebrate; tap a DISTRACTOR → no celebrate;
     • variety/shuffle: nextTask ≥7 distinct + pass-2 reshuffle (order-only);
     • mobile overflow 280/360/412/768.

   Usage: node scripts/local-test-sight-word.js [--locales=en,de] [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no').split(',');  /* no fi */
const SHOT = has('shot');
const ACTIVITY = 'choice-board.read-sight-word.rf-k-3-c';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'sight-word');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

/* expected localized prompt per locale (strict no-raw-key check) */
const PROMPTS = {
  en: 'Tap the word you hear.', de: 'Tippe auf das Wort, das du hörst.', fr: 'Touche le mot que tu entends.',
  it: 'Tocca la parola che senti.', es: 'Toca la palabra que escuchas.', pt: 'Toque na palavra que você ouve.',
  nl: 'Tik op het woord dat je hoort.', sv: 'Tryck på ordet du hör.', da: 'Tryk på ordet, du hører.', no: 'Trykk på ordet du hører.'
};

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    /* LCSAudio loads /audio/inventory.json first; serve empty so it resolves
       cleanly into the TTS path (rather than a 404 the loader might reject on). */
    if (p === '/audio/inventory.json') { res.setHeader('Content-Type', 'application/json'); res.end('{}'); return; }
    const file = (p === '/' || p === '/choice-board-activity.html') ? path.join(MINI, 'choice-board-activity.html')
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

  /* tap the .cb-tile whose word === `word`; returns true if found+clicked */
  async function clickWord(page, word) {
    const tiles = await page.$$('.cb-tile');
    for (const t of tiles) {
      const txt = await page.evaluate(e => { var s = e.querySelector('.cb-tile-text'); return s ? s.textContent.trim() : ''; }, t);
      if (txt === word) { await t.click(); return true; }
    }
    return false;
  }
  const curTarget = (page) => page.evaluate(() => window.ChoiceBoardActivity.targetKey);
  const reload = (page) => page.evaluate(() => { window.__spokenWords = []; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); });

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
    page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
    /* capture every spoken word: LCSAudio → TTS fallback → speechSynthesis.speak(utterance) */
    await page.evaluateOnNewDocument(() => {
      window.__spokenWords = [];
      /* window.speechSynthesis / SpeechSynthesisUtterance are read-only accessors
         in headless Chrome — plain assignment silently no-ops, so defineProperty. */
      try { Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, writable: true, value: function (t) { this.text = String(t); } }); } catch (e) {}
      try { Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { speak: function (u) { window.__spokenWords.push(u && u.text); }, cancel: function () {}, getVoices: function () { return []; } } }); } catch (e) {}
    });
    const url = `${BASE}/choice-board-activity.html?lang=${loc}&activity=${ACTIVITY}&embed=1`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => {
        var t = window.ChoiceBoardActivity;
        return t && t._activityRow && document.querySelector('.cb-tile') && document.querySelector('.lcs-activity-check');
      }, { timeout: 15000 });

      /* prompt localized (not the raw key) */
      const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
      note(prompt === PROMPTS[loc], `${loc}: prompt "${prompt}" ≠ "${PROMPTS[loc]}"`);
      note(prompt !== 'promptReadSight', `${loc}: raw key leaked in prompt`);

      /* 4 word tiles */
      const tileWords = await page.$$eval('.cb-tile .cb-tile-text', els => els.map(e => e.textContent.trim()));
      note(tileWords.length === 4, `${loc}: ${tileWords.length} tiles (expected 4)`);

      /* audio: the TARGET word was spoken on load (the answer channel) */
      await page.waitForFunction(() => window.__spokenWords && window.__spokenWords.length > 0, { timeout: 5000 }).catch(() => {});
      const target0 = await curTarget(page);
      const spoken = await page.evaluate(() => window.__spokenWords.slice());
      note(spoken.indexOf(target0) >= 0, `${loc}: target "${target0}" was not spoken on load (spoken=${JSON.stringify(spoken)})`);
      note(tileWords.indexOf(target0) >= 0, `${loc}: spoken target "${target0}" is not among the tiles`);

      /* variety/shuffle over 2 passes */
      const N = await page.evaluate(() => window.ChoiceBoardActivity._pool.length);
      const ids = await page.evaluate((c) => { const t = window.ChoiceBoardActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
      const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
      note(new Set(p1).size >= 7, `${loc}: only ${new Set(p1).size} distinct rounds (<7)`);
      note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${loc}: pass-2 not same set`);
      note(p1.join('|') !== p2.join('|'), `${loc}: pass-2 order identical (no reshuffle)`);

      /* DISTRACTOR → no celebrate (fresh task) */
      await reload(page);
      await page.waitForFunction(() => document.querySelector('.cb-tile'), { timeout: 5000 });
      const tA = await curTarget(page);
      const wordsA = await page.$$eval('.cb-tile .cb-tile-text', els => els.map(e => e.textContent.trim()));
      const distractor = wordsA.find(w => w !== tA);
      await clickWord(page, distractor);
      await page.click('.lcs-activity-check');
      note(!(await celebrating(page)), `${loc}: tapping a distractor ("${distractor}") still celebrated`);

      /* TARGET → celebrate (fresh task) */
      await reload(page);
      await page.waitForFunction(() => document.querySelector('.cb-tile'), { timeout: 5000 });
      const tB = await curTarget(page);
      const okClick = await clickWord(page, tB);
      note(okClick, `${loc}: target tile "${tB}" not found`);
      await page.click('.lcs-activity-check');
      note(await celebrating(page), `${loc}: tapping the target ("${tB}") did not celebrate`);

      /* mobile overflow */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 900 });
        await reload(page);
        const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
        note(over <= 2, `${loc}: horizontal overflow ${over}px at ${w}px`);
        if (SHOT && (w === 360 || w === 768)) await page.screenshot({ path: path.join(SHOT_DIR, `${loc}-${w}.png`) });
      }
      await page.setViewport({ width: 412, height: 900 });

      note(errs.length === 0, `${loc}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
      const okLoc = !fails.some(f => f.startsWith(loc + ':'));
      console.log(`  ${okLoc ? 'ok  ' : 'FAIL'} ${loc} — "${prompt}" | heard "${target0}" | ${new Set(p1).size} distinct`);
    } catch (e) {
      fails.push(`${loc}: ${e.message}`);
      console.log(`  FAIL ${loc} — ${e.message}`);
    } finally { await page.close(); }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SIGHT-WORD LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`SIGHT-WORD LOCAL TEST PASSED — ${LOCALES.length} locale(s): localized prompt + 4 word tiles + the spoken TARGET is heard + tap-target celebrates / tap-distractor doesn't + ≥7-round reshuffle + no mobile overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
