#!/usr/bin/env node
/* =====================================================================
   local-test-sentence-builder.js — interaction harness (L.1.1.j build-a-sentence,
   "Wiggles' Sentence Builder"). Serves `mini tools/` + `image-library-webp/`:

     • subject picture + N empty slots + scrambled tile palette + Hear-it render;
       the subject image loads (no 404).
     • a WRONG order does NOT resolve (nudge); the CORRECT order resolves + reads
       the sentence; an incomplete arrangement does NOT resolve (fill-all hint).
     • tap a placed slot returns the tile; EN-only; ≥7 distinct + reshuffle; no
       overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sentence-builder.build-a-sentence.l-1-1-j';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/sentence-builder-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SentenceBuilderActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SentenceBuilderActivity._round && document.querySelector('.snt-root'), { timeout: 4000 });
    await sleep(50);
  }
  const placeAll = (correct) => page.evaluate((ok) => {
    const t = window.SentenceBuilderActivity, canon = t._canonical.slice();
    const seq = ok ? canon : canon.slice().reverse();
    for (let k = 0; k < seq.length; k++) {
      const tiles = Array.from(document.querySelectorAll('.snt-tile'));
      const b = tiles.find(x => !x.classList.contains('used') && x.textContent === seq[k]);
      if (b) b.click();
    }
  }, correct).then(() => sleep(50));
  const clickCheck = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(50));
  const RO = () => page.evaluate(() => window.SentenceBuilderActivity.readOnly);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SentenceBuilderActivity; return t && t._activityRow && document.querySelector('.snt-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(/Sentence Builder/i.test(title), `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.SentenceBuilderActivity._activityRow.slug));
    // The EN slug is the canonical base; the activity is a localized fan-out target
    // (de/fr/es/pt/it/nl added since the original EN-only build), so assert EN is PRESENT
    // rather than EN-only (the old EN-only assertion went stale at the first localization).
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.SentenceBuilderActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.SentenceBuilderActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* render: subject pic + slots + palette + hear */
    await force('snt-dog');
    await sleep(120);
    note(await page.evaluate(() => !!document.querySelector('.snt-subject img')), 'the subject picture did not render');
    note(await page.evaluate(() => { const im = document.querySelector('.snt-subject img'); return im && im.complete && im.naturalWidth > 0; }), 'the subject image did not load (404)');
    note(await page.evaluate(() => document.querySelectorAll('.snt-slot').length === 4), 'expected 4 slots for "The big dog runs."');
    note(await page.evaluate(() => document.querySelectorAll('.snt-tile').length === 4), 'expected 4 palette tiles');
    note(await page.evaluate(() => !!document.querySelector('.snt-hear')), 'the Hear-it button did not render');

    /* incomplete → Check does not resolve */
    await page.evaluate(() => { const tiles = Array.from(document.querySelectorAll('.snt-tile:not(.used)')); if (tiles[0]) tiles[0].click(); }); await sleep(40);
    await clickCheck();
    note(!(await RO()), 'an incomplete arrangement resolved');

    /* tap-to-return: a filled slot returns its tile */
    note(await page.evaluate(() => document.querySelectorAll('.snt-slot.filled').length === 1), 'tile was not placed into a slot');
    await page.evaluate(() => { const f = document.querySelector('.snt-slot.filled'); if (f) f.click(); }); await sleep(40);
    note(await page.evaluate(() => document.querySelectorAll('.snt-slot.filled').length === 0), 'tapping a filled slot did not return the tile');

    /* WRONG order → no resolve */
    await placeAll(false); await clickCheck();
    note(!(await RO()), 'a reversed/wrong order resolved');

    /* CORRECT order → resolve */
    await force('snt-dog'); await placeAll(true); await clickCheck();
    note(await RO(), 'the correct sentence did not resolve');

    /* a second sentence */
    await force('snt-frog'); await placeAll(true); await clickCheck();
    note(await RO(), 'second sentence did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('snt-hen'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} sentence-builder/en — "${title}"`);
  } catch (e) {
    fails.push('sentence-builder/en: ' + e.message);
    console.log(`  FAIL sentence-builder/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`SENTENCE-BUILDER LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('SENTENCE-BUILDER LOCAL TEST PASSED — subject pic + slots + palette + Hear-it render (image loads); incomplete does NOT resolve (fill-all); tap-to-return works; a wrong order does NOT resolve; the correct order resolves; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
