#!/usr/bin/env node
/* =====================================================================
   local-test-comparison-creek.js — interaction harness for "Comparison
   Creek" (CCSS K.CC.C.7). Serves `mini tools/` + drives the real shell:

     • renders Captain Quill + the river fork + two channel buoys + Check;
     • CORRECT: tapping the reader-correct channel (or = beacon / MORE-LESS)
       resolves → done → Check celebrates + locks;
     • WRONG: tapping the wrong channel does NOT advance + POSITION-FLIPS
       (the left channel's data-side swaps) so the child must re-read;
     • every fork solvable via deriveCorrect; tie via the = beacon, name-it
       via MORE/LESS;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   EN-only pilot. Usage: node scripts/local-test-comparison-creek.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'comparison-creek.river-steer.k-cc-c-7';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const BASE = `http://127.0.0.1:${PORT}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `${BASE}/comparison-creek-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ComparisonCreekActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'comparison-creek.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ComparisonCreekActivity.fork && (document.querySelector('.cc-channel') || document.querySelector('.cc-relbtn')), { timeout: 4000 });
  }
  const meta = () => page.evaluate(() => { const C = window.RiverSteerCore, f = window.ComparisonCreekActivity.fork; return { id: f.id, correct: C.deriveCorrect(f), mode: f.responseMode }; });
  const state = () => page.evaluate(() => ({ done: window.ComparisonCreekActivity.phase === 'done', celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')), readOnly: window.ComparisonCreekActivity.readOnly }));
  const leftSide = () => page.evaluate(() => { const e = document.querySelector('.cc-channel.cc-left'); return e ? e.getAttribute('data-side') : null; });
  async function tapSide(side) { const el = await page.$('.cc-channel[data-side="' + side + '"]'); if (el) { await el.click(); return true; } return false; }
  async function tapBeacon() { const el = await page.$('.cc-beacon'); if (el) await el.click(); }
  async function tapRel(word) { const bs = await page.$$('.cc-relbtn'); for (const b of bs) { const t = await (await b.getProperty('textContent')).jsonValue(); if (String(t).trim().toLowerCase() === word) { await b.click(); return true; } } return false; }
  /* the shell's polite live region — api.announce() writes here on the next rAF */
  const announced = () => page.evaluate(() => { const e = document.querySelector('.lcs-sr-only[aria-live]'); return e ? e.textContent.trim() : ''; });
  /* ⚠ record EVERY announcement, not the last one: _answer announces the read-back and then
     _win/_bonk announce over it in the same frame, so a single read measures the wrong one. */
  const recordAnnouncements = () => page.evaluate(() => {
    const e = document.querySelector('.lcs-sr-only[aria-live]');
    if (!e) return false;
    window.__ccSaid = [];
    if (window.__ccObs) window.__ccObs.disconnect();
    window.__ccObs = new MutationObserver(() => { const s = e.textContent.trim(); if (s && window.__ccSaid[window.__ccSaid.length - 1] !== s) window.__ccSaid.push(s); });
    window.__ccObs.observe(e, { childList: true, characterData: true, subtree: true });
    return true;
  });
  const saidAll = () => page.evaluate(() => (window.__ccSaid || []).slice());
  async function solve(m) { if (m.mode === 'side') await tapSide(m.correct); else if (m.mode === 'equal') await tapBeacon(); else await tapRel(m.correct); await new Promise(r => setTimeout(r, 120)); }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ComparisonCreekActivity; return t && t._activityRow && document.querySelector('.cc-quill') && (document.querySelector('.cc-channel') || document.querySelector('.cc-relbtn')) && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    note(!!(await page.$('.cc-quill-svg')), 'no Captain Quill');
    note(!!(await page.$('.cc-river')), 'no river');
    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Comparison Creek', `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.ComparisonCreekActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.ComparisonCreekActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
    note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

    /* WRONG → no advance + POSITION-FLIP (the left channel's data-side swaps) */
    await force('sc-7-6');
    const m0 = await meta();
    const before = await leftSide();
    const wrong = m0.correct === 'L' ? 'R' : 'L';
    await tapSide(wrong);
    await new Promise(r => setTimeout(r, 120));
    const w = await state();
    note(!w.done && !w.celebrated, 'a wrong steer advanced/celebrated (must reverse, no penalty)');
    const after = await leftSide();
    note(before !== after, `position-flip did not swap the buoys (left side ${before}→${after})`);
    // now steer the correct channel (by identity) → done
    await tapSide(m0.correct);
    await new Promise(r => setTimeout(r, 120));
    note((await state()).done, 'steering the correct channel after the flip did not complete');

    /* EVERY fork solvable */
    const FORKS = ['sc-7-6', 'sc-5-6', 'sc-8-9', 'sc-7-6s', 'dot-4-5', 'ros-7-6', 'sum-4-5', 'sz-3-8', 'sz-9-4', 'tie-6-6', 'name-6-7', 'btw-5-8'];
    for (const id of FORKS) {
      await force(id);
      const m = await meta();
      await solve(m);
      const st = await state();
      note(st.done, `fork '${id}' (${m.mode}) did not complete via the reader-correct response`);
      if (st.done) { await page.click('.lcs-activity-check'); const fin = await state(); note(fin.celebrated && fin.readOnly, `${id}: Check did not celebrate + lock`); }
    }

    /* ⛔ THE RE-TEACH MUST NAME THE CORRECT BUOY.
       `_bonk` used to branch on promptKey, which has no 'between' case, so btw-5-8 (5 vs 8,
       'which is between 4 and 6?', answer 5) announced "8 is more than 5 — which channel has
       8 now?" and looped the child back into the same wrong steer, forever, in all 7 locales. */
    await force('btw-5-8');
    {
      const m = await meta();
      note(m.id === 'btw-5-8', `forced the wrong round (${m.id}) — the check would be vacuous`);
      const vals = await page.evaluate(() => { const C = window.RiverSteerCore, f = window.ComparisonCreekActivity.fork; return { L: C.forkVal(f, 'L'), R: C.forkVal(f, 'R') }; });
      const right = m.correct === 'L' ? vals.L : vals.R, other = m.correct === 'L' ? vals.R : vals.L;
      note(right !== other, `btw-5-8 buoys are equal (${right}) — the check would be vacuous`);
      await tapSide(m.correct === 'L' ? 'R' : 'L');
      await new Promise(r => setTimeout(r, 160));
      const msg = await announced();
      note(msg.length > 0, 'btw-5-8: a wrong steer announced NOTHING — the check would be vacuous');
      const re = (n) => new RegExp('(?<![0-9])' + n + '(?![0-9])');
      note(re(right).test(msg), `btw-5-8: the re-teach never names the correct buoy ${right} — "${msg}"`);
      note(!re(other).test(msg) || msg.indexOf(String(right)) < msg.indexOf(String(other)),
        `btw-5-8: the re-teach leads with the WRONG buoy ${other} instead of ${right} — "${msg}"`);
    }

    /* ⛔ THE RELATION ROUND MUST NOT STATE ITS OWN ANSWER, NAME A CHANNEL IT DOES NOT RENDER,
       OR PROMISE A SWAP IT NEVER PERFORMS. It rendered only MORE/LESS buttons, and `swap`
       fires only for responseMode 'side' — yet it announced "6 is less than 7. Look again —
       which channel has 6 now?": the answer, a phantom control, and a false 'now'. */
    await force('name-6-7');
    {
      const m = await meta();
      note(m.id === 'name-6-7' && m.mode === 'relation', `forced ${m.id}/${m.mode}, wanted the relation round — vacuous`);
      note((await page.$$('.cc-channel')).length === 0, 'the relation round rendered channels — this check assumes it does not');
      const wrongWord = m.correct === 'more' ? 'less' : 'more';
      note(await tapRel(wrongWord), `could not tap the ${wrongWord} button — vacuous`);
      await new Promise(r => setTimeout(r, 160));
      const msg = await announced();
      note(msg.length > 0, 'name-6-7: a wrong answer announced NOTHING — vacuous');
      /* ⚠ NOT "must not contain the answer word": the re-asked prompt necessarily offers BOTH
         options, and the first version of this check failed the CORRECT fix for saying
         "more or less". The defect is asserting ONE relation to the exclusion of the other. */
      const hasMore = /\bmore\b/i.test(msg), hasLess = /\bless\b/i.test(msg);
      const picksOne = (m.correct === 'more') ? (hasMore && !hasLess) : (hasLess && !hasMore);
      note(!picksOne, `name-6-7: the re-teach asserts the ANSWER (${m.correct}) instead of re-asking — "${msg}"`);
      note(!/channel/i.test(msg), `name-6-7: the re-teach names a channel, but this round renders none — "${msg}"`);
    }

    /* ⛔ THE SUM ROUND'S READ-BACK MUST NAME THE SUM, NOT 0. A sum channel carries value:0
       with the quantity in `addends`; _answer read `.value` raw, so the commit read-back
       announced and SPOKE "0" for either side, on the round built to contrast the two. */
    await force('sum-4-5');
    {
      const m = await meta();
      note(m.id === 'sum-4-5', `forced the wrong round (${m.id}) — vacuous`);
      const sums = await page.evaluate(() => { const C = window.RiverSteerCore, f = window.ComparisonCreekActivity.fork; return { L: C.forkVal(f, 'L'), R: C.forkVal(f, 'R') }; });
      note(sums.L > 0 && sums.R > 0, `sum-4-5 sums are ${sums.L}/${sums.R} — the check would be vacuous`);
      note(await recordAnnouncements(), 'sum-4-5: no live region to observe — vacuous');
      await tapSide('L');
      await new Promise(r => setTimeout(r, 220));
      const said = await saidAll();
      note(said.length > 0, 'sum-4-5: tapping a side announced NOTHING — vacuous');
      /* find the read-back by its TEMPLATE, not by position — the shell announces the prompt
         on load and _bonk announces over it, so the stream holds three unrelated strings. */
      const tpl = await page.evaluate(() => window.ComparisonCreekActivity.api.t('readback'));
      note(!!tpl && tpl.indexOf('{n}') !== -1, `readback template unusable ("${tpl}") — the check would be vacuous`);
      const rx = new RegExp('^' + tpl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{n\\}', '(\\d+)') + '$');
      const backs = said.map((s) => rx.exec(s)).filter(Boolean);
      note(backs.length === 1, `sum-4-5: expected exactly one commit read-back, saw ${backs.length} — (all: ${JSON.stringify(said)})`);
      if (backs.length === 1) note(Number(backs[0][1]) === sums.L,
        `sum-4-5: the commit read-back says ${backs[0][1]}, not the sum ${sums.L} — "${backs[0][0]}"`);
    }

    /* mobile overflow 280→768 */
    for (const w2 of [280, 360, 412, 768]) {
      await page.setViewport({ width: w2, height: 800 });
      await force('sz-3-8');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w2}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} comparison-creek/en — "${title}"`);
  } catch (e) {
    fails.push('comparison-creek/en: ' + e.message);
    console.log(`  FAIL comparison-creek/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`COMPARISON-CREEK LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('COMPARISON-CREEK LOCAL TEST PASSED — Quill + river render, wrong steer position-flips (no penalty), all 12 forks solve via the reader, ≥7 reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
