#!/usr/bin/env node
/* =====================================================================
   local-test-pronoun.js — interaction harness (L.1.1.d personal pronouns).
   Serves `mini tools/` and drives the real DOM in EVERY localized pool it
   ships a browser pass for — currently en + sv:

     • tapping the wrong form does NOT resolve (warm role nudge, no advance);
       tapping the correct form resolves + fills the blank; the shell Check
       button is hidden until resolved and appears after.
     • the sentence + 2 chips + Hear-it render; the shell prompt carries the
       question; ≥7 distinct + reshuffle; no overflow 280→768.
     • each locale runs ITS OWN pool, asserted against the manifest on disk,
       and its chrome is not the English chrome.

   Two things this harness learned the hard way:

   1. ⚠ IT DROVE `?lang=en` AND NOTHING ELSE, and its round ids (`pn-he-subj`,
      `pn-his`, …) are English-pool ids that exist in no localized pool. Six
      shipped decks were never driven. Its PASS line said "EN-only" while they
      shipped underneath it.
   2. ⚠ CHIPS ARE REACHED BY MODEL INDEX, NEVER BY THEIR TEXT. `_beginRound`
      shuffles `_chipOrder` ("position ≠ answer"), and the correct form differs
      per locale — searching the DOM for an English word is exactly how a probe
      silently drives the wrong element in a non-English locale.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pronoun.case.l-1-1-d';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

/* the pool each locale MUST run, read from the manifest rather than restated here */
const MANIFEST = JSON.parse(fs.readFileSync(path.join(MINI, 'pronoun-activities.json'), 'utf8'));
const ROW = MANIFEST.find((r) => r.id === ACTIVITY);
if (!ROW) { console.error('ERROR: ' + ACTIVITY + ' is not in the manifest'); process.exit(1); }
const poolFor = (loc) => (loc === 'en' ? ROW.params.rounds : (ROW.params.roundsL10n || {})[loc]) || [];

const ALL = Object.keys(ROW.slug).filter((l) => poolFor(l).length);
const WANT = (process.argv.find((a) => a.startsWith('--locales=')) || '--locales=en,sv').split('=')[1].split(',');
const LOCALES = ALL.filter((l) => WANT.indexOf(l) >= 0);

/* a title that proves the chrome switched; ASCII-only on purpose */
const TITLE_RE = { en: /Borrowed Hat/i, sv: /Sigge/i };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
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
  const chrome = {}; /* locale → rendered chrome, for the cross-locale leak check */

  for (const LOC of LOCALES) {
    const note = (cond, msg) => { if (!cond) fails.push(LOC + ': ' + msg); };
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 900 });
    const errs = [];
    const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
    page.on('console', (m) => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => { if (!isNoise(e.message)) errs.push(e.message); });

    const url = 'http://127.0.0.1:' + PORT + '/pronoun-activity.html?lang=' + LOC + '&activity=' + ACTIVITY + '&embed=1';
    const S = () => page.evaluate(() => ({ resolved: window.PronounActivity._resolved, miss: !!document.querySelector('.pn-line-msg.miss') }));
    const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); return !!(c && c.offsetParent !== null); });

    /* the correct form, read from the MODEL: localized pools store it, the English
       pool derives it through the protected core. */
    const correctOf = () => page.evaluate((loc) => {
      const r = window.PronounActivity._round;
      if (!r) return null;
      if (r[loc] && r[loc].correct) return r[loc].correct;
      return (window.PronounCore && window.PronounCore.deriveCorrect) ? window.PronounCore.deriveCorrect(r) : null;
    }, LOC);

    async function force(id) {
      const ok = await page.evaluate((rid) => {
        const t = window.PronounActivity, n = t._pool.length, order = [];
        for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex((x) => x.id === rid);
        if (k < 0) return false;
        const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0;
        if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
        return true;
      }, id);
      if (!ok) throw new Error('round "' + id + '" is not in this locale pool');
      await page.waitForFunction(() => window.PronounActivity._round && document.querySelector('.pn-root'), { timeout: 4000 });
      await sleep(60);
    }
    /* by MODEL INDEX — never search the DOM for a word */
    async function tapIndexOf(str) {
      const ok = await page.evaluate((s) => {
        const nodes = [...document.querySelectorAll('.pn-cand')];
        const i = nodes.findIndex((n) => n.getAttribute('data-str') === s);
        if (i < 0 || nodes[i].classList.contains('dim')) return false;
        nodes[i].click();
        return true;
      }, str);
      if (!ok) throw new Error('no live chip carrying "' + str + '"');
      await sleep(70);
    }

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => { const t = window.PronounActivity; return t && t._activityRow && document.querySelector('.pn-root'); }, { timeout: 15000 });

      const title = await page.$eval('.lcs-title', (e) => e.textContent.trim()).catch(() => '');
      note(!!title, 'the header title is empty');
      if (TITLE_RE[LOC]) note(TITLE_RE[LOC].test(title), 'header title "' + title + '" is not this locale own');
      const slugKeys = await page.evaluate(() => Object.keys(window.PronounActivity._activityRow.slug));
      note(slugKeys.indexOf(LOC) >= 0, 'manifest has no ' + LOC + ' slug: ' + slugKeys.join(','));

      /* THE POOL IS THIS LOCALE OWN, not a fallback to English */
      const expect = poolFor(LOC).map((r) => r.id + ' :: ' + r.sentence);
      const actual = await page.evaluate(() => window.PronounActivity._pool.map((r) => r.id + ' :: ' + r.sentence));
      const diverge = actual.find((a, i) => a !== expect[i]);
      note(actual.length === expect.length && !diverge,
        'runs the wrong pool — first divergence: got "' + (diverge || '(length ' + actual.length + ' vs ' + expect.length + ')') + '"');

      const N = actual.length;
      const ids = await page.evaluate((c) => { const t = window.PronounActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
      note(new Set(ids.slice(0, N)).size >= 7, 'only ' + new Set(ids.slice(0, N)).size + ' distinct exercises');
      note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
      note(await page.evaluate(() => window.PronounActivity._pool.every((r) => r.pronoun == null)), 'a round stores a bare pronoun literal field');

      /* walk EVERY round of this locale: render, wrong-no-advance, correct-resolves */
      const first = poolFor(LOC)[0].id;
      for (const r of poolFor(LOC)) {
        await force(r.id);
        const chips = await page.evaluate(() => [...document.querySelectorAll('.pn-cand')].map((n) => n.getAttribute('data-str')));
        note(chips.length === 2, r.id + ': expected 2 chips, saw ' + chips.length);
        note(await page.evaluate(() => !!document.querySelector('.pn-blank')), r.id + ': the blank slot did not render');
        note(await page.evaluate(() => !!document.querySelector('.pn-hear')), r.id + ': the Hear-it button did not render');
        note(!(await checkVisible()), r.id + ': shell Check visible before resolve');

        const correct = await correctOf();
        note(!!correct, r.id + ': could not read the correct form off the model');
        const wrong = chips.find((c) => c !== correct);
        note(!!wrong && wrong !== correct, r.id + ': the 2 chips are not distinct (' + chips.join(' / ') + ')');
        if (!correct || !wrong) continue;

        await tapIndexOf(wrong);
        note(!(await S()).resolved, r.id + ': a wrong chip resolved the round');
        note((await S()).miss, r.id + ': a wrong chip produced no nudge');

        await tapIndexOf(correct);
        note((await S()).resolved, r.id + ': the correct form did not resolve');
        note(await page.evaluate((c) => { const b = document.querySelector('.pn-blank'); return !!(b && b.classList.contains('filled') && b.textContent.trim() === c); }, correct),
          r.id + ': the blank did not fill with "' + correct + '"');
        note(await checkVisible(), r.id + ': shell Check did not appear after resolve');
      }

      /* the chrome this locale renders, for the cross-locale leak check */
      await force(first);
      chrome[LOC] = await page.evaluate(() => ({
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        instruction: (document.querySelector('.lcs-instruction') || {}).textContent || '',
        prompt: (document.querySelector('.lcs-activity-prompt-text') || {}).textContent || '',
        hear: (document.querySelector('.pn-hear') || {}).textContent || '',
      }));

      /* mobile overflow 280→768 */
      for (const w of [280, 360, 412, 768]) {
        await page.setViewport({ width: w, height: 820 });
        await force(first); await sleep(40);
        const over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
        note(over <= 2, 'horizontal overflow ' + over + 'px at ' + w + 'px');
      }

      note(errs.length === 0, 'console error(s): ' + errs.slice(0, 2).join(' | '));
      const bad = fails.filter((f) => f.indexOf(LOC + ': ') === 0).length;
      console.log('  ' + (bad ? 'FAIL' : 'ok  ') + ' pronoun/' + LOC + ' — "' + title + '"');
    } catch (e) {
      fails.push(LOC + ': ' + e.message);
      console.log('  FAIL pronoun/' + LOC + ' — ' + e.message);
    } finally { await page.close(); }
  }

  /* ⚠ no locale may render another chrome. The Hear-it label is included on
     purpose: it lives ONLY in the tool's `L` table, so a locale added to
     `strings` but not to `L` ships an English button and nothing else notices. */
  for (const LOC of LOCALES) {
    if (LOC === 'en' || !chrome[LOC] || !chrome.en) continue;
    for (const k of ['title', 'instruction', 'prompt', 'hear']) {
      if (chrome[LOC][k] && chrome[LOC][k] === chrome.en[k]) fails.push(LOC + ': renders the English ' + k + ' ("' + chrome.en[k].trim() + '")');
    }
  }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error('PRONOUN LOCAL TEST FAILED — ' + fails.length + ' issue(s):'); fails.forEach((f) => console.error('  • ' + f)); process.exit(1); }
  console.log('PRONOUN LOCAL TEST PASSED — ' + LOCALES.length + ' locale(s) [' + LOCALES.join(', ') + '], EVERY round of each driven by model index: a wrong form does NOT resolve (warm role nudge, no advance); the correct form resolves + fills the blank; the shell Check is hidden until resolved and appears after; each locale runs ITS OWN manifest pool with its own title, instruction, prompt and Hear-it label; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
