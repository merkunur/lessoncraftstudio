#!/usr/bin/env node
/* =====================================================================
   local-test-cvc-builder-blend.js — local interaction harness for the RF.1.3
   "Build the Blend/Digraph Word" build-blend-word cvc-builder activity (EN-only).

   Serves `mini tools/` + drives cvc-builder-activity.html with puppeteer:
     • build the word by tapping the CHUNK tiles in order (read core.chunks) →
       core.feedbackMode === 'correct' after Check;
     • a wrong first chunk → NOT correct;
     • the chunk SLOT renders the multi-char chunk (textContent === chunk);
     • "Hear it" speaks the whole word (LCSAudio spy);
     • variety (§A.13.60): ≥7 distinct via nextTask + pass-2 reshuffle;
     • mobile overflow 280/360/412/768 (novel chunk-slot render).
   EN-only (cvc-builder is the EN exception).

   Usage: node scripts/local-test-cvc-builder-blend.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const has = (k) => process.argv.includes('--' + k);
const SHOT = has('shot');
const ACTIVITY_ID = 'cvc-builder.build-blend-word.rf-1-3';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'cvc-builder');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.startsWith('/image-library-webp/')) { res.statusCode = 404; res.end('no img locally'); return; }
    let file = (p === '/' || p === '/cvc-builder-activity.html') ? path.join(MINI, 'cvc-builder-activity.html')
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
  async function tapChunk(page, chunk) {
    const tiles = await page.$$('.cvc-letter');
    for (const t of tiles) { const l = await page.evaluate(e => e.dataset.letter, t); if (l === chunk) { await t.click(); return true; } }
    return false;
  }
  const fb = (page) => page.evaluate(() => window.CvcBuilderActivity && window.CvcBuilderActivity.feedbackMode);

  const tag = 'en/build-blend';
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|image-library-webp|404|net::ERR/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
  const url = `${BASE}/cvc-builder-activity.html?lang=en&activity=${ACTIVITY_ID}&embed=1`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => {
      const t = window.CvcBuilderActivity;
      return t && t._activityRow && document.querySelector('.cvc-slot') && document.querySelector('.lcs-activity-check');
    }, { timeout: 15000 });

    const wired = await page.evaluate(() => typeof window.CvcBuilderActivity.nextTask === 'function' && !window.CvcBuilderActivity.tasks);
    note(wired, `${tag}: nextTask not installed / tasks not nulled`);

    // variety
    const N = await page.evaluate(() => window.CvcBuilderActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.CvcBuilderActivity, o = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); o.push(x ? x.id : null); } return o; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `${tag}: only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), `${tag}: pass-2 not same set`);
    note(p1.join('|') !== p2.join('|'), `${tag}: pass-2 order identical (no reshuffle)`);

    // reload round 0, read chunks + targetWord
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => document.querySelector('.cvc-slot') && window.CvcBuilderActivity.chunks, { timeout: 5000 });
    const chunks = await page.evaluate(() => window.CvcBuilderActivity.chunks.slice());
    const target = await page.evaluate(() => window.CvcBuilderActivity.targetWord);
    note(Array.isArray(chunks) && chunks.length >= 2, `${tag}: no chunks read`);
    note(chunks.some(c => c.length >= 2), `${tag}: no multi-char chunk in round 0 (${JSON.stringify(chunks)})`);

    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(prompt.length > 0 && !/^prompt[A-Z]/.test(prompt), `${tag}: raw/empty prompt "${prompt}"`);

    // hear-it spy
    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) window.LCSAudio.speak = function (o) { window.__spoken.push({ type: o && o.type, text: o && o.text }); }; });
    const hearBtn = await page.$('.cvc-subject-hear');
    if (hearBtn) { await hearBtn.click(); const sp = await page.evaluate(() => window.__spoken.slice()); note(sp.some(s => s.type === 'word' && s.text === target), `${tag}: Hear-it did not speak the word "${target}" (spy=${JSON.stringify(sp)})`); }

    // build the word: tap chunks in order → Check → feedbackMode 'correct'
    for (const c of chunks) await tapChunk(page, c);
    const slotTexts = await page.$$eval('.cvc-slot', els => els.map(e => e.textContent.trim()));
    note(slotTexts.join('') === chunks.join(''), `${tag}: slots ${JSON.stringify(slotTexts)} ≠ chunks ${JSON.stringify(chunks)} (chunk-slot render)`);
    await page.click('.lcs-activity-check');
    note((await fb(page)) === 'correct', `${tag}: correct chunk build did not register correct (fb=${await fb(page)})`);

    // wrong build: reload, tap a wrong cluster first
    await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
    await page.waitForFunction(() => window.CvcBuilderActivity.chunks, { timeout: 5000 });
    const ch2 = await page.evaluate(() => window.CvcBuilderActivity.chunks.slice());
    const distractor = await page.evaluate(() => {
      const pal = (window.CvcBuilderActivity.palette || []); const ch = window.CvcBuilderActivity.chunks;
      return pal.find(t => ch.indexOf(t) < 0) || pal[0];
    });
    await tapChunk(page, distractor);
    for (let k = 1; k < ch2.length; k++) await tapChunk(page, ch2[k]);
    await page.click('.lcs-activity-check');
    note((await fb(page)) !== 'correct', `${tag}: wrong build "${distractor}…" registered correct`);

    // mobile overflow
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 900 });
      await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask());
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `${tag}: horizontal overflow ${over}px at ${w}px`);
      if (SHOT && (w === 280 || w === 390)) { await page.setViewport({ width: w, height: 900 }); const cc = await page.evaluate(() => window.CvcBuilderActivity.chunks.slice()); for (const c of cc) await tapChunk(page, c); await page.screenshot({ path: path.join(SHOT_DIR, `build-blend-${w}.png`) }); }
    }
    await page.setViewport({ width: 412, height: 900 });

    note(errs.length === 0, `${tag}: console error(s): ${errs.slice(0, 2).join(' | ')}`);
    const okT = !fails.some(f => f.startsWith(tag + ':'));
    console.log(`  ${okT ? 'ok  ' : 'FAIL'} ${tag} — "${prompt}" (round0=${chunks.join('+')}=${target}) | ${new Set(p1).size} distinct`);
  } catch (e) {
    fails.push(`${tag}: ${e.message}`);
    console.log(`  FAIL ${tag} — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`CVC-BLEND LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log(`CVC-BLEND LOCAL TEST PASSED — EN: chunk-tile build → correct, wrong-cluster → not, chunk-slot renders, Hear-it speaks the word, ≥7 reshuffle, no overflow.`);
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
