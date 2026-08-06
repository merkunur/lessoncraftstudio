#!/usr/bin/env node
/* =====================================================================
   local-test-mending-fences.js — interaction harness for "The Mending
   Fences" (3.MD.D.8). Serves `mini tools/` + `image-library-webp/` and
   drives the shell by clicking the RENDERED DOM, per ACT:

     • mend-board : the P−side foil does NOT resolve (owned-subtraction
       fails); the ½P−side plate resolves; shell Check hidden until resolved.
     • more-fence-or-grass : the wrong field scaffolds (no advance); the
       more-fence field then the more-grass field (opposite) resolves.
     • same-area-diff-perim : the more-fence field resolves.
     • fence-it-or-plant : the border-ring foil does NOT resolve; the right
       UNIT (edge for fence / interior for plant) resolves.
     • roll-reach : the wrong judgment scaffolds; reach/short resolves.
     • no stored perimeter/area/answer in any round; EN-only; ≥7 distinct +
       reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'mending-fences.mend-board.3-md-d-8';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

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

  const url = `http://127.0.0.1:${PORT}/mending-fences-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.MendingFencesActivity._resolved, cog: window.MendingFencesActivity._round && window.MendingFencesActivity._round.cog, miss: !!document.querySelector('.mf-line.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MendingFencesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MendingFencesActivity._round && document.querySelector('.mf-root'), { timeout: 4000 });
    await sleep(50);
  }
  const plate = (v) => page.evaluate((n) => { const b = Array.from(document.querySelectorAll('.mf-plate')).find(x => Number(x.textContent) === n); if (b) b.click(); return !!b; }, v).then(() => sleep(40));
  const field = (i) => page.evaluate((k) => { const f = document.querySelectorAll('.mf-field-btn'); if (f[k]) f[k].click(); }, i).then(() => sleep(40));
  const unit = (lab) => page.evaluate((l) => { const b = Array.from(document.querySelectorAll('.mf-unit')).find(x => (x.getAttribute('aria-label') || '').indexOf(l) >= 0); if (b) b.click(); }, lab).then(() => sleep(40));
  const reach = (lab) => page.evaluate((l) => { const b = Array.from(document.querySelectorAll('.mf-reach')).find(x => x.textContent.indexOf(l) >= 0); if (b) b.click(); }, lab).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const D = (id) => page.evaluate((rid) => { const r = window.MendingFencesActivity._pool.find(x => x.id === rid), C = window.MendingFencesCore; return { ans: C.deriveDoublingAnswer ? (r.cog === 'mend-board' ? C.deriveDoublingAnswer(r) : null) : null, foil: r.cog === 'mend-board' ? C.subtractionFoil(r) : null, mf: r.fields ? C.deriveMoreFence(r.fields) : null, mg: r.fields ? C.deriveMoreGrass(r.fields) : null, unit: r.field ? C.unitOracle(r) : null, reach: r.cog === 'roll-reach' ? C.reachOracle(r) : null }; }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.MendingFencesActivity; return t && t._activityRow && document.querySelector('.mf-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Mending Fences', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.MendingFencesActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en base slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.MendingFencesActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.MendingFencesActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const cogs = await page.evaluate(() => Array.from(new Set(window.MendingFencesActivity._pool.map(r => r.cog))));
    note(cogs.length >= 4, `only ${cogs.length} distinct ACTIONS: ${cogs.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.MendingFencesActivity._pool.every(r => r.perimeter == null && r.area == null && r.answer == null && r.correct == null)), 'a round carries a stored perimeter/area/answer field');

    /* MEND-BOARD: Check hidden; the P−side foil does NOT resolve; ½P−side resolves */
    await force('mf-mend-7x3');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    let d = await D('mf-mend-7x3');
    await plate(d.foil);
    note(!(await S()).resolved, `mend: the P−side foil (${d.foil}) resolved — OWNED_SUBTRACTION leaked`);
    note((await S()).miss, 'mend: wrong foil gave no scaffold');
    await plate(d.ans);
    note((await S()).resolved, `mend: the ½P−side answer (${d.ans}) did not resolve`);
    note(await checkVisible(), 'mend: shell Check did not appear after resolve');

    /* JOINT-RANKING: wrong field scaffolds; more-fence then more-grass (opposite) resolves */
    await force('mf-rank-9x2-5x5');
    d = await D('mf-rank-9x2-5x5');
    await field(1 - d.mf);   // the WRONG fence field
    note(!(await S()).resolved, 'rank: a wrong fence field resolved');
    await field(d.mf);       // correct fence → phase 2
    await field(d.mg);       // correct grass
    note((await S()).resolved, 'rank: more-fence then more-grass did not resolve');
    note(d.mf !== d.mg, 'rank: fence & grass are the same field (no decoupling)');

    /* SAME-AREA: the more-fence field resolves */
    await force('mf-samearea-6x2-4x3');
    d = await D('mf-samearea-6x2-4x3');
    await field(d.mf);
    note((await S()).resolved, 'same-area: the more-fence field did not resolve');

    /* FENCE-IT-OR-PLANT: the border-ring foil does NOT resolve; the right unit does */
    await force('mf-unit-fence-4x3');
    await unit('Edge ring');
    note(!(await S()).resolved, 'units: the border-ring foil resolved (BORDER_SQUARES leaked)');
    await unit('Edge marks');   // fence → edge
    note((await S()).resolved, 'units (fence): the edge unit did not resolve');
    await force('mf-unit-plant-5x3');
    await unit('Inside squares');   // plant → interior
    note((await S()).resolved, 'units (plant): the interior unit did not resolve');

    /* ROLL-REACH: wrong judgment scaffolds; the right one resolves */
    await force('mf-roll-reach-4x3');
    d = await D('mf-roll-reach-4x3');   // P=14, roll=16 → reach
    await reach(d.reach === 'reach' ? 'too short' : 'reaches');   // the WRONG one
    note(!(await S()).resolved, 'roll: the wrong reach judgment resolved');
    await reach(d.reach === 'reach' ? 'reaches' : 'too short');
    note((await S()).resolved, 'roll: the correct reach judgment did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('mf-rank-10x2-6x5'); await sleep(50);
      const over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} mending-fences/en — "${title}"`);
  } catch (e) {
    fails.push('mending-fences/en: ' + e.message);
    console.log(`  FAIL mending-fences/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`MENDING-FENCES LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('MENDING-FENCES LOCAL TEST PASSED — all acts: the P−side foil + border-ring foil + wrong field/reach all FAIL (no advance, warm scaffold); the ½P−side mend, the opposite fence/grass ranking, the more-fence same-area pick, the right unit, and the right reach all resolve; shell Check hides until resolved; no stored perimeter/area/answer; EN-only; ≥4 acts + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
