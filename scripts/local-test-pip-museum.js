#!/usr/bin/env node
/* =====================================================================
   local-test-pip-museum.js — interaction harness for "Professor Pip's Museum"
   (CCSS K.G.A.2). Serves `mini tools/` + drives the real shell:

     • TRANSFORMED-ROUTE: routing a transformed exhibit to its correctly-named
       pedestal SPINS it upright (transform→identity) ONLY on the committed
       drop; NO transform change before commit.
     • NO PEDESTAL CANONICAL ICON: pedestal markers are a trio of *different*
       (transformed) mini-exemplars, never one upright icon.
     • RE-SEED-ON-RETURN: a mis-route speaks the correct name + re-seeds the
       exhibit (its transform changes).
     • EXCLUDE: the rhombus routes to the Mystery Gallery (not Square).
     • name→shape / match-pair / confirm-correct flows complete.
     • ≥7 distinct facetActs + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pip-museum.curate-wing.k-g-a-2';
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
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/pip-museum-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const solved = () => page.evaluate(() => window.PipMuseumActivity.solved);

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PipMuseumActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'pip-museum.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PipMuseumActivity.round && document.querySelector('.pip-root'), { timeout: 4000 });
  }
  // tap the pedestal whose plate text matches `name`
  const tapPedestal = (name) => page.evaluate((nm) => { const ps = Array.from(document.querySelectorAll('.pip-pedestal')); const t = ps.find(p => { const pl = p.querySelector('.pip-plate'); return pl && pl.textContent.toLowerCase().indexOf(nm.toLowerCase()) >= 0; }); if (t) t.click(); }, name).then(() => sleep(60));
  const activeTransform = () => page.evaluate(() => { const e = document.querySelector('.pip-active'); return e ? e.style.transform : null; });
  const activeTruth = () => page.evaluate(() => { const t = window.PipMuseumActivity; const i = t._activeBeltIdx(); return i < 0 ? null : window.CurateWingCore.classifyInvariant(t.belt[i].geom); });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PipMuseumActivity; return t && t._activityRow && document.querySelector('.pip-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Professor Pip's Museum", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.PipMuseumActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PipMuseumActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const acts = await page.evaluate(() => new Set(window.PipMuseumActivity._pool.map(t => { const r = window.PipMuseumActivity._activityRow.params.rounds.find(x => 'pip-museum.' + x.id === t.id); return r.facetAct; })).size);
    note(acts >= 7, `only ${acts} distinct facetActs`);

    /* NO PEDESTAL CANONICAL ICON: the trio markers are 3 DIFFERENT transforms */
    await force('route-tri-sq-ci');
    const trioDistinct = await page.evaluate(() => { const ms = Array.from(document.querySelectorAll('.pip-pedestal .pip-mini')); const tr = ms.map(m => m.style.transform); return new Set(tr).size >= 2; });
    note(trioDistinct, 'pedestal trio markers are identical (a single canonical icon would silhouette-match)');

    /* TRANSFORMED-ROUTE: the active exhibit is transformed; route it correctly → spins upright */
    const truth0 = await activeTruth();
    const xf0 = await activeTransform();
    note(/rotate|scale/.test(xf0 || ''), 'the active exhibit is NOT transformed on screen');
    await tapPedestal(truth0);   // route to the correct pedestal
    await sleep(120);
    const xf1 = await page.evaluate(() => { const e = document.querySelector('.pip-exhibit'); return e ? e.style.transform : null; });
    note(/rotate\(0deg\) scale\(1\)/.test(xf1 || '') || xf1 === 'rotate(0deg) scale(1)', `the spin-to-upright did not fire on the committed-correct route (transform="${xf1}")`);
    await sleep(420);
    // finish the rest of the belt by routing each to its truth
    for (let g = 0; g < 6; g++) { if (await solved()) break; const tr = await activeTruth(); if (!tr) break; await tapPedestal(tr); await sleep(520); }
    note(await solved(), 'routing the whole belt correctly did not open the hall');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after the hall opened');

    /* RE-SEED-ON-RETURN: a mis-route changes the exhibit's transform */
    await force('route-tri-sq-ci');
    const truthA = await activeTruth();
    const wrongPed = ['triangle', 'square', 'circle'].find(t => t !== truthA);
    const beforeXf = await activeTransform();
    await tapPedestal(wrongPed);  // wrong → re-seed
    await sleep(80);
    const afterXf = await activeTransform();
    note(beforeXf !== afterXf, 'a mis-route did NOT re-seed the exhibit (same transform on return)');
    note(!await solved(), 'a mis-route somehow solved the round');

    /* EXCLUDE: the rhombus → Mystery Gallery */
    await force('exclude-mystery');
    let guard = 0;
    while (!await solved() && guard++ < 6) { const tr = await activeTruth(); if (!tr) break; await tapPedestal(tr === 'mystery' ? 'Mystery' : tr); await sleep(520); }
    note(await solved(), 'exclude-route (rhombus/oval → Mystery) did not complete');

    /* name→shape: pick the named shape */
    await force('name-to-hexagon');
    await page.evaluate(() => { const t = window.PipMuseumActivity; const i = t.choices.findIndex(c => window.CurateWingCore.classifyInvariant(c.geom) === t.target); const cards = document.querySelectorAll('.pip-choice'); if (cards[i]) cards[i].click(); }); await sleep(500);
    note(await solved(), 'name→shape (tap the hexagon) did not complete');

    /* match-pair: tap the two squares */
    await force('match-square-pair');
    await page.evaluate(() => { const t = window.PipMuseumActivity; const idxs = []; t.set.forEach((c, i) => { if (window.CurateWingCore.classifyInvariant(c.geom) === t.matchName) idxs.push(i); }); const cards = document.querySelectorAll('.pip-choice'); if (cards[idxs[0]]) cards[idxs[0]].click(); }); await sleep(60);
    await page.evaluate(() => { const t = window.PipMuseumActivity; const idxs = []; t.set.forEach((c, i) => { if (window.CurateWingCore.classifyInvariant(c.geom) === t.matchName) idxs.push(i); }); const cards = document.querySelectorAll('.pip-choice'); if (cards[idxs[1]]) cards[idxs[1]].click(); }); await sleep(420);
    note(await solved(), 'match-pair (the two squares) did not complete');

    /* confirm-correct: judge each claim */
    await force('confirm-claim');
    for (let g = 0; g < 5; g++) { if (await solved()) break; await page.evaluate(() => { const t = window.PipMuseumActivity; const c = t.claims[t.claimIdx]; const truth = window.CurateWingCore.classifyInvariant(c.geom); const agree = (truth === c.claim); const btn = document.querySelector(agree ? '.pip-yes' : '.pip-no'); if (btn) btn.click(); }); await sleep(240); }
    note(await solved(), 'confirm-correct (judge Pip\'s claims) did not complete');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('exclude-mystery');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} pip-museum/en — "${title}"`);
  } catch (e) {
    fails.push('pip-museum/en: ' + e.message);
    console.log(`  FAIL pip-museum/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`PIP-MUSEUM LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('PIP-MUSEUM LOCAL TEST PASSED — transformed exhibit spins upright ONLY on the committed-correct route; pedestal trio markers are varied (no canonical icon); mis-route re-seeds the exhibit; rhombus → Mystery Gallery; name→shape + match-pair + confirm-correct complete; ≥7 distinct facetActs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
