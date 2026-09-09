#!/usr/bin/env node
/* =====================================================================
   local-test-sentence-builder.js — interaction harness (L.1.1.j build-a-sentence).
   Serves `mini tools/` + `image-library-webp/` and drives the real activity in
   EVERY localized pool it ships, currently en + sv:

     • subject picture + N empty slots + scrambled tile palette + Hear-it render;
       the subject image loads (no 404).
     • a WRONG order does NOT resolve (nudge); the CORRECT order resolves; an
       incomplete arrangement does NOT resolve (fill-all hint).
     • tap a placed slot returns the tile; ≥7 distinct + reshuffle; no overflow
       280→768.
     • each locale runs ITS OWN pool, asserted against the manifest on disk, and
       its chrome is not the English chrome.

   Two things this harness learned the hard way:

   1. ⚠ TILES ARE REACHED BY MODEL INDEX, NEVER BY THEIR TEXT. The palette is
      `_tiles`, a per-seed scramble, and `document.querySelectorAll('.snt-tile')[i]`
      is the node for `_tiles[i]`. The previous version searched the DOM for a tile
      whose textContent equalled the word it wanted — which happens to work while
      every word in a round is unique, and is exactly the shape that silently
      drives the wrong element the moment it is not.
   2. ⚠ IT CLAIMED "EN-only" IN ITS OWN PASS LINE while six localized pools
      shipped underneath it. A harness that names a scope it does not walk is
      worse than one that names none.
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

/* the pool each locale MUST run, read from the manifest rather than restated here */
const MANIFEST = JSON.parse(fs.readFileSync(path.join(MINI, 'sentence-builder-activities.json'), 'utf8'));
const ROW = MANIFEST.find((r) => r.id === ACTIVITY);
if (!ROW) { console.error('ERROR: ' + ACTIVITY + ' is not in the manifest'); process.exit(1); }
const poolFor = (loc) => (loc === 'en' ? ROW.params.rounds : (ROW.params.roundsL10n || {})[loc]) || [];

/* every locale that has BOTH a slug and a pool is a shipped surface; today the
   browser pass is en + sv (the five other pools are covered by the core gate). */
const ALL = Object.keys(ROW.slug).filter((l) => poolFor(l).length);
const WANT = (process.argv.find((a) => a.startsWith('--locales=')) || '--locales=en,sv').split('=')[1].split(',');
const LOCALES = ALL.filter((l) => WANT.indexOf(l) >= 0);

/* a title that proves the chrome switched; ASCII-only on purpose so this file
   carries no literal a re-encode can mangle */
const TITLE_RE = { en: /Sentence Builder/i, sv: /Krumelur/ };

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
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const chrome = {}; /* locale → the rendered chrome, for the cross-locale leak check */

  for (const LOC of LOCALES) {
    const note = (cond, msg) => { if (!cond) fails.push(LOC + ': ' + msg); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
    page.on('console', (m) => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = 'http://127.0.0.1:' + PORT + '/sentence-builder-activity.html?lang=' + LOC + '&activity=' + ACTIVITY + '&embed=1';

    async function force(id) {
      const ok = await page.evaluate((rid) => {
        const t = window.SentenceBuilderActivity, n = t._pool.length, order = [];
        for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex((x) => x.id === rid);
        if (k < 0) return false;
        const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
        return true;
      }, id);
      if (!ok) throw new Error('round "' + id + '" is not in this locale pool');
      await page.waitForFunction(() => window.SentenceBuilderActivity._round && document.querySelector('.snt-root'), { timeout: 4000 });
      await sleep(60);
    }
    /* by MODEL INDEX: nodes[i] is _tiles[i]; never search the DOM for the word */
    const placeAll = (correct) => page.evaluate((ok) => {
      const t = window.SentenceBuilderActivity;
      const seq = ok ? t._canonical.slice() : t._canonical.slice().reverse();
      let placed = 0;
      for (const w of seq) {
        const i = t._tiles.findIndex((x, k) => x === w && !t._used[k]);
        const nodes = document.querySelectorAll('.snt-tile');
        if (i >= 0 && nodes[i]) { nodes[i].click(); placed++; }
      }
      return placed;
    }, correct).then(async (n) => { await sleep(60); return n; });
    const clickCheck = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(60));
    const RO = () => page.evaluate(() => window.SentenceBuilderActivity.readOnly);

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.SentenceBuilderActivity; return t && t._activityRow && document.querySelector('.snt-root'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', (e) => e.textContent.trim()).catch(() => '');
      note(!!title, 'the header title is empty');
      if (TITLE_RE[LOC]) note(TITLE_RE[LOC].test(title), 'header title "' + title + '" is not this locale own');
      const slugKeys = await page.evaluate(() => Object.keys(window.SentenceBuilderActivity._activityRow.slug));
      note(slugKeys.indexOf(LOC) >= 0, 'manifest has no ' + LOC + ' slug: ' + slugKeys.join(','));

      /* THE POOL IS THIS LOCALE OWN, not a fallback to English */
      const expect = poolFor(LOC).map((r) => r.id + ' :: ' + r.canonical.join(' '));
      const actual = await page.evaluate(() => window.SentenceBuilderActivity._pool.map((r) => r.id + ' :: ' + (r.canonical || []).join(' ')));
      const diverge = actual.find((a, i) => a !== expect[i]);
      note(actual.length === expect.length && !diverge,
        'runs the wrong pool — first divergence: got "' + (diverge || '(length ' + actual.length + ' vs ' + expect.length + ')') + '"');

      const N = actual.length;
      const ids = await page.evaluate((c) => { const t = window.SentenceBuilderActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
      note(new Set(ids.slice(0, N)).size >= 7, 'only ' + new Set(ids.slice(0, N)).size + ' distinct exercises');
      note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

      /* render: subject pic + slots + palette + hear */
      await force('snt-dog');
      note(await page.evaluate(() => !!document.querySelector('.snt-subject img')), 'the subject picture did not render');
      /* ⚠ WAIT for the decode, never sleep and hope: the first page of the run is
         the slowest (cold server, cold cache) and a bare 60ms sleep made this
         assertion fail on EN and pass on SV for the same animals/dog file. */
      const imgOk = await page.waitForFunction(() => { const im = document.querySelector('.snt-subject img'); return !!(im && im.complete && im.naturalWidth > 0); }, { timeout: 5000 }).then(() => true).catch(() => false);
      note(imgOk, 'the subject image did not load (404)');
      const words = poolFor(LOC).find((r) => r.id === 'snt-dog').canonical.length;
      note(await page.evaluate(() => document.querySelectorAll('.snt-slot').length) === words, 'expected ' + words + ' slots on snt-dog');
      note(await page.evaluate(() => document.querySelectorAll('.snt-tile').length) === words, 'expected ' + words + ' palette tiles on snt-dog');
      note(await page.evaluate(() => !!document.querySelector('.snt-hear')), 'the Hear-it button did not render');

      /* the empty-slot label is this locale own, not hard-coded English */
      const slotLabel = await page.evaluate(() => { const s = document.querySelector('.snt-slot'); return s ? (s.getAttribute('aria-label') || '') : ''; });
      note(!!slotLabel, 'the empty slot carries no aria-label');
      const prompt = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return p ? p.textContent.trim() : ''; });
      chrome[LOC] = { title: title, slotLabel: slotLabel, prompt: prompt };

      /* incomplete → Check does not resolve */
      await page.evaluate(() => { const t = document.querySelectorAll('.snt-tile'); if (t[0]) t[0].click(); }); await sleep(40);
      await clickCheck();
      note(!(await RO()), 'an incomplete arrangement resolved');

      /* tap-to-return: a filled slot returns its tile */
      note(await page.evaluate(() => document.querySelectorAll('.snt-slot.filled').length === 1), 'tile was not placed into a slot');
      await page.evaluate(() => { const f = document.querySelector('.snt-slot.filled'); if (f) f.click(); }); await sleep(40);
      note(await page.evaluate(() => document.querySelectorAll('.snt-slot.filled').length === 0), 'tapping a filled slot did not return the tile');

      /* WRONG order → no resolve. The reverse of a capital-first period-last
         sentence is never canonical, so this is a real wrong answer everywhere. */
      const placedWrong = await placeAll(false); await clickCheck();
      note(placedWrong === words, 'only ' + placedWrong + ' of ' + words + ' tiles were placed for the wrong-order case');
      note(!(await RO()), 'a reversed/wrong order resolved');
      note(await page.evaluate(() => { const h = document.querySelector('.lcs-activity-prompt-hint'); return !!(h && h.textContent.trim()); }), 'a wrong order produced no hint');

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
        const over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
        note(over <= 2, 'horizontal overflow ' + over + 'px at ' + w + 'px');
      }

      note(errs.length === 0, 'console error(s): ' + errs.slice(0, 2).join(' | '));
      const bad = fails.filter((f) => f.indexOf(LOC + ': ') === 0).length;
      console.log('  ' + (bad ? 'FAIL' : 'ok  ') + ' sentence-builder/' + LOC + ' — "' + title + '"');
    } catch (e) {
      fails.push(LOC + ': ' + e.message);
      console.log('  FAIL sentence-builder/' + LOC + ' — ' + e.message);
    } finally { await page.close(); }
  }

  /* ⚠ no locale may render another chrome: title, prompt and the empty-slot label
     all have to move. The slot aria-label is the one that shipped hard-coded
     English for six locales, so it is ASSERTED here, never eyeballed. */
  for (const LOC of LOCALES) {
    if (LOC === 'en' || !chrome[LOC] || !chrome.en) continue;
    for (const k of ['title', 'prompt', 'slotLabel']) {
      if (chrome[LOC][k] && chrome[LOC][k] === chrome.en[k]) fails.push(LOC + ': renders the English ' + k + ' ("' + chrome.en[k] + '")');
    }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error('SENTENCE-BUILDER LOCAL TEST FAILED — ' + fails.length + ' issue(s):'); fails.forEach((f) => console.error('  • ' + f)); process.exit(1); }
  console.log('SENTENCE-BUILDER LOCAL TEST PASSED — ' + LOCALES.length + ' locale(s) [' + LOCALES.join(', ') + '], every tile reached by model index: subject pic + slots + palette + Hear-it render (image loads); each locale runs ITS OWN manifest pool with its own title, prompt and empty-slot label; incomplete does NOT resolve; tap-to-return works; a wrong order does NOT resolve and hints; the correct order resolves; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
