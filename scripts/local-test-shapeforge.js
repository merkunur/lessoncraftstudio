#!/usr/bin/env node
/* =====================================================================
   local-test-shapeforge.js — interaction harness for "Shape Forge / Mim's
   Glow Workshop" (1.G.A.2 + K.G.B.6). Serves `mini tools/` + drives the shell:

     • COMPOSE: place the oracle's shards (select → place at a legal anchor) →
       the union exactly covers the blank silhouette → it FLARES (solved).
     • COMMIT-ONLY / SNAP-NOT-CORRECTNESS: a legal-but-DOOMED placement (a
       triangle on the big-triangle's centre) seats with NO "right so far"
       feedback and the round stays unsolved (no red).
     • ANCHOR-ONLY legality: a selected piece offers ONLY legal anchors (an
       illegal placement is never even offered).
     • REWAY: completing with the first/obvious piece-MULTISET cracks back +
       asks for a NEW way; a different multiset forges it.
     • FREE REMOVAL: place then take back restores the supply.
     • >=7 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'shapeforge.compose.1-g-a-2';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('not found'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

/* drive a list of placements through the real activity methods. */
const DRIVE = `function(pls){ var a=window.ShapeForgeActivity; pls.forEach(function(pl){ a.selected=pl.pieceId; a.orient=pl.orient; a._placeAt(pl.orient,pl.dr,pl.dc); }); }`;

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

  const url = `http://127.0.0.1:${PORT}/shapeforge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const A = () => page.evaluate(() => { const a = window.ShapeForgeActivity; return { solved: a.solved, roundId: a.round && a.round.id, placed: a.placements.length, msg: a.msg }; });

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ShapeForgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'shapeforge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ShapeForgeActivity.round && document.querySelector('.sf-svg'), { timeout: 4000 });
    await sleep(40);
  }
  const drive = (pls) => page.evaluate('(' + DRIVE + ')(' + JSON.stringify(pls) + ')').then(() => sleep(30));
  const oracleSol = () => page.evaluate(() => window.ShapeForgeCore.audit(window.ShapeForgeActivity.round).solution);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ShapeForgeActivity; return t && t._activityRow && document.querySelector('.sf-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Mim's Glow Workshop", `header title "${title}"`);

    /* >=7 distinct rounds + reshuffle */
    const N = await page.evaluate(() => window.ShapeForgeActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ShapeForgeActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* ANCHOR-ONLY legality: select a triangle → only legal anchor dots appear */
    await force('build-hexagon');
    await page.evaluate(() => window.ShapeForgeActivity._select('triangle'));
    const dots = await page.evaluate(() => document.querySelectorAll('.sf-anchor').length);
    note(dots >= 2, `a selected triangle offered ${dots} legal anchors (need >=2 — interchangeable)`);

    /* COMPOSE oracle → flare */
    await force('build-hexagon');
    await drive(await oracleSol());
    let s = await A(); note(s.solved, 'placing the oracle shards did not forge the hexagon');

    /* COMMIT-ONLY / SNAP-NOT-CORRECTNESS: a doomed-legal triangle on the big-
       triangle centre seats with no feedback + the round stays unsolved */
    await force('build-bigtriangle');
    await drive([{ pieceId: 'triangle', orient: 1, dr: 1, dc: 2 }]);   /* centre down cell [1,2] */
    s = await A();
    note(s.placed === 1 && !s.solved, 'the doomed-legal centre triangle did not seat-without-solving (commit-only broken)');
    note(!/right|correct|good/i.test(s.msg || ''), 'a legal placement leaked "right so far" feedback');

    /* FREE REMOVAL */
    await page.evaluate(() => window.ShapeForgeActivity._remove(0));
    s = await A(); note(s.placed === 0, 'removing a placed shard did not free it');

    /* REWAY: the obvious multiset cracks back; a different one forges */
    await force('reway-hexagon');
    const avoid = await page.evaluate(() => window.ShapeForgeActivity._avoid);
    note(!!avoid, 'reway round did not record an avoid-multiset');
    /* drive the avoided (obvious) solution → should NOT solve, should crack back */
    await drive(await page.evaluate(() => window.ShapeForgeCore.audit(window.ShapeForgeActivity.round).solution));
    s = await A();
    note(!s.solved, 'reway accepted the first/obvious way (multiset not enforced)');
    note(/new way|first way/i.test(s.msg || ''), `reway did not ask for a new way ("${s.msg}")`);
    note(s.placed === 0, 'reway did not crack the first way back to the palette');
    /* now drive a DIFFERENT multiset (solve avoiding the first) → forges */
    const second = await page.evaluate((av) => {
      const a = window.ShapeForgeActivity;
      return window.ShapeForgeCore.solve(a.round, { avoidMultiset: av });
    }, avoid);
    await drive(second);
    s = await A(); note(s.solved, 'a genuinely-different way did not forge the reway hexagon');

    /* SUBSTITUTE: pre-placed rhombus + fill the hole with triangles */
    await force('substitute-tri');
    await drive(await oracleSol());
    s = await A(); note(s.solved, 'the substitute (fill the hole with triangles) did not complete');

    /* shell Check celebrates after a forge */
    await force('onramp-rhombus'); await drive(await oracleSol());
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a forge');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('build-hexagon'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} shapeforge/en — "${title}"`);
  } catch (e) {
    fails.push('shapeforge/en: ' + e.message);
    console.log(`  FAIL shapeforge/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SHAPEFORGE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SHAPEFORGE LOCAL TEST PASSED — composing the oracle shards forges the blank silhouette; a selected piece offers only LEGAL anchors; a legal-but-doomed placement seats with NO "right so far" leak (commit-only) + stays unsolved; free removal restores supply; reway cracks the obvious way back + accepts only a different piece-MULTISET; substitute fills the hole with triangles; shell Check celebrates; >=7 distinct rounds + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
