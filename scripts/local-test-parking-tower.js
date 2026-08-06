#!/usr/bin/env node
/* =====================================================================
   local-test-parking-tower.js — interaction harness for "Bramble's
   Parking Tower" (CCSS K.G.A.1). Serves `mini tools/` + drives the real
   shell with puppeteer:

     • renders Bramble + the side-on tower + tappable bays/trucks + Check;
     • CORRECT: tapping a target bay (or, on reverse rounds, the target
       truck) parks it → done → Check celebrates + locks;
     • WRONG: tapping a non-target bay does NOT advance (polite reverse);
     • every one of the ≥7 rounds is solvable via its target;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   EN-only pilot. Usage: node scripts/local-test-parking-tower.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'parking-tower.place-by-relation.k-g-a-1';
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

  const url = `${BASE}/parking-tower-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  async function force(roundId) {
    await page.evaluate((rid) => {
      const t = window.ParkingTowerActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'parking-tower.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, roundId);
    await page.waitForFunction(() => window.ParkingTowerActivity.round && document.querySelector('.pt-cand'), { timeout: 4000 });
  }
  const meta = () => page.evaluate(() => { const r = window.ParkingTowerActivity.round; return { id: r.id, targets: r.targetSpotIds, cands: r.scene.candidates.map(c => c.id) }; });
  const state = () => page.evaluate(() => ({ done: window.ParkingTowerActivity.phase === 'done', celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')), readOnly: window.ParkingTowerActivity.readOnly }));
  async function tapId(id) { const el = await page.$('.pt-cand[data-id="' + id + '"]'); if (el) { await el.click(); return true; } return false; }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ParkingTowerActivity; return t && t._activityRow && document.querySelector('.pt-bramble') && document.querySelector('.pt-cand') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    note(!!(await page.$('.pt-bramble-svg')), 'no Bramble');
    note(!!(await page.$('.pt-tower')), 'no tower');
    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Bramble's Parking Tower", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.ParkingTowerActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.ParkingTowerActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
    note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

    /* WRONG: tap a non-target candidate → no advance */
    await force('above-van');
    const m0 = await meta();
    const wrongId = m0.cands.filter(id => m0.targets.indexOf(id) < 0)[0];
    await tapId(wrongId);
    const w = await state();
    note(!w.done && !w.celebrated, `tapping a wrong bay (${wrongId}) advanced/celebrated (must reverse)`);

    /* EVERY round solvable via its target */
    const ROUNDS = ['next-to-bus', 'above-van', 'below-car', 'between-bus-van', 'transfer-boat', 'reverse-above', 'two-truck-between'];
    for (const rid of ROUNDS) {
      await force(rid);
      const m = await meta();
      await tapId(m.targets[0]);
      await new Promise(r => setTimeout(r, 120));
      const st = await state();
      note(st.done, `round '${rid}' did not complete when the target bay was tapped`);
      if (st.done) { await page.click('.lcs-activity-check'); const fin = await state(); note(fin.celebrated && fin.readOnly, `${rid}: Check did not celebrate + lock`); }
    }

    /* mobile overflow 280→768 */
    for (const w2 of [280, 360, 412, 768]) {
      await page.setViewport({ width: w2, height: 800 });
      await force('between-bus-van');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w2}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} parking-tower/en — "${title}"`);
  } catch (e) {
    fails.push('parking-tower/en: ' + e.message);
    console.log(`  FAIL parking-tower/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`PARKING-TOWER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('PARKING-TOWER LOCAL TEST PASSED — Bramble + tower render, wrong bay reverses, all 7 rounds solve via the target + Check celebrates, ≥7 reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
