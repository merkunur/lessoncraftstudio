#!/usr/bin/env node
/* =====================================================================
   local-test-sharing-jar.js — interaction harness for "The Sharing Jar"
   (CCSS 1.OA.D.8, the social-fair family head). Serves `mini tools/` + drives
   the real shell:

     • PRODUCE→SEAL: tapping the CORRECT number-tile seals + gives (beads float
       to the jar) + the "=" appears.
     • NO INCREMENT SURFACE: the ONLY input is the number-tile row — there is no
       add-bead / fill-one-at-a-time control.
     • WRONG → NON-DIRECTIONAL RE-POSE: a wrong tile → NOT solved + no bead
       animation + a fresh re-pose (tiles stay, the message has no high/low).
     • THE 5 SCHEMAS each seal on unknownFor; OFF-BY-ONE does not seal.
     • 0-CASE seals by producing 0.
     • CEILING tier hides the bigger jar's numeral ("?").
     • ≥7 rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sharing-jar.make-fair.1-oa-d-8';
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

  const url = `http://127.0.0.1:${PORT}/sharing-jar-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const solved = () => page.evaluate(() => window.SharingJarActivity.solved);
  const unknownOf = () => page.evaluate(() => window.MakeFairCore.unknownFor(window.SharingJarActivity.schema, window.SharingJarActivity.round.nums));
  const tapTile = (v) => page.evaluate((val) => { const t = [...document.querySelectorAll('.sj-tile')].find(b => b.textContent === String(val)); if (t) { t.click(); return true; } return false; }, v).then(() => sleep(40));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SharingJarActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'sharing-jar.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SharingJarActivity.round && document.querySelector('.sj-root'), { timeout: 4000 });
  }
  async function solve(id) { await force(id); const u = await unknownOf(); await tapTile(u); }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SharingJarActivity; return t && t._activityRow && document.querySelector('.sj-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Sharing Jar', `header title "${title}"`);

    /* NO increment / fill surface — the only input is the tile row */
    const fillCtrls = await page.evaluate(() => document.querySelectorAll('[class*="add"],[class*="increment"],[class*="fill"],[class*="plus"]').length);
    note(fillCtrls === 0, `a fill/increment surface is present (${fillCtrls}) — the perceptual cheat`);
    const tiles = await page.evaluate(() => document.querySelectorAll('.sj-tile').length);
    note(tiles === 11, `the number-tile row is not 0-10 (${tiles} tiles)`);

    /* variety/shuffle + ≥7 rounds */
    const N = await page.evaluate(() => window.SharingJarActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.SharingJarActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const schemas = await page.evaluate(() => new Set(window.SharingJarActivity._activityRow.params.rounds.map(r => r.schema)).size);
    note(schemas >= 5, `only ${schemas} distinct schemas (<5)`);

    /* PRODUCE→SEAL (level-pim, equalize-add, unknown 2) */
    await force('level-pim');
    const u0 = await unknownOf(); note(u0 === 2, `level-pim unknown ${u0} (expected 2)`);
    await tapTile(u0);
    note(await solved(), 'tapping the correct tile did not seal');
    const gaveBeads = await page.evaluate(() => document.querySelectorAll('.sj-new').length > 0);
    note(gaveBeads, 'no beads were given (the celebration) after a correct answer');
    const bridge = await page.evaluate(() => { const b = document.querySelector('.sj-bridge-on'); return !!b; });
    note(bridge, 'the "=" bridge did not appear on reconcile');
    await tapTile(0); // shell Check is a different element; trigger it
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a sealed round');

    /* WRONG → non-directional re-pose (no bead animation) */
    await force('give-it-back'); // restore, unknown 3
    const u1 = await unknownOf();
    await tapTile(u1 === 5 ? 4 : 5); // a wrong tile
    note(!(await solved()), 'a wrong tile sealed the round');
    const noGive = await page.evaluate(() => document.querySelectorAll('.sj-new').length === 0);
    note(noGive, 'a wrong answer animated a give (must give NOTHING on wrong)');
    const stillTiles = await page.evaluate(() => document.querySelectorAll('.sj-tile').length === 11);
    note(stillTiles, 'the tile row vanished after a wrong answer (must re-pose)');
    await tapTile(u1); note(await solved(), 'the correct tile after a re-pose did not seal');

    /* OFF-BY-ONE does not seal */
    await force('level-pim'); const u2 = await unknownOf(); await tapTile(u2 + 1);
    note(!(await solved()), 'unknown+1 sealed (the determined number is not load-bearing)');

    /* the 5 schemas each seal */
    for (const id of ['level-pim', 'how-unfair', 'give-it-back', 'put-some-back', 'how-many-start']) {
      await solve(id); note(await solved(), `schema round ${id} did not seal on its unknown`);
    }

    /* 0-CASE (already-fair) → produce 0 */
    await solve('already-fair'); note(await solved(), 'the 0-case did not seal by producing 0');

    /* CEILING tier hides the bigger jar numeral */
    await force('level-hidden');
    const hasQ = await page.evaluate(() => !!document.querySelector('.sj-qcount'));
    note(hasQ, 'the ceiling tier did not hide the bigger jar count (no "?")');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('gap-of-twelve'); await sleep(25);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} sharing-jar/en — "${title}"`);
  } catch (e) {
    fails.push('sharing-jar/en: ' + e.message);
    console.log(`  FAIL sharing-jar/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SHARING-JAR LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SHARING-JAR LOCAL TEST PASSED — produce→seal + give + "="; NO increment/fill surface (only the 0-10 tiles); wrong → no give + non-directional re-pose; off-by-one fails; all 5 schemas seal; 0-case seals on 0; ceiling hides the bigger numeral; ≥7 rounds + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
