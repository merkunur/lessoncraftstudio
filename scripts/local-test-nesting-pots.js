#!/usr/bin/env node
/* =====================================================================
   local-test-nesting-pots.js — interaction harness for "Grandpa Pip's
   Nesting Pots" (CCSS K.CC.C.7). Serves `mini tools/` + drives the real
   shell with puppeteer:

     • renders Grandpa + the nest target + the tray pots + Check;
     • CORRECT PLAY: place pots biggest-number → smallest (twins rest aside)
       → the round completes (tray empty) → Check celebrates + locks;
     • WRONG PLAY: on an empty nest, trying to tuck a SMALLER-number pot
       first bobs out (does NOT place, does NOT celebrate);
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   EN-only pilot. Usage: node scripts/local-test-nesting-pots.js [--shot]
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const has = (k) => process.argv.includes('--' + k);
const SHOT = has('shot');
const ACTIVITY = 'nesting-pots.seriate.k-cc-c-7';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const SHOT_DIR = path.join(REPO, 'docs', 'audit-results', 'nesting-pots-activity');
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
  if (SHOT) fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `${BASE}/nesting-pots-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  async function reload() { await page.evaluate(() => window.LCS_reloadFirstTask && window.LCS_reloadFirstTask()); await page.waitForFunction(() => document.querySelectorAll('.np-tray-pot').length > 0, { timeout: 5000 }); }
  const state = () => page.evaluate(() => ({
    celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')),
    readOnly: window.NestingPotsActivity.readOnly,
    trayLeft: window.NestingPotsActivity.tray.length,
    nest: window.NestingPotsActivity.nest.filter(Boolean).length
  }));

  // pick the correct next move (twin-aside first, else max legal; gap-fit for gap mode)
  async function nextMove() {
    return page.evaluate(() => {
      const t = window.NestingPotsActivity, O = window.OrderingCore;
      if (t.mode === 'gap') {
        const idx = t.tray.findIndex(p => p.value > t._gapBelow.value && p.value < t._gapAbove.value);
        return { idx, target: '.np-gap' };
      }
      const inner = t.innermost();
      if (inner) { const tw = t.tray.findIndex(p => p.value === inner.value); if (tw >= 0) return { idx: tw, target: '.np-target' }; }
      const legal = O.legalMoves(t.tray, inner);
      let best = null; legal.forEach(p => { if (!best || p.value > best.value) best = p; });
      return { idx: best ? t.tray.indexOf(best) : -1, target: '.np-target' };
    });
  }
  async function clickTray(i) { const pots = await page.$$('.np-tray-pot'); if (pots[i]) await pots[i].click(); }
  async function clickTarget(sel) { const t = await page.$(sel); if (t) await t.click(); }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => {
      const t = window.NestingPotsActivity;
      return t && t._activityRow && document.querySelector('.np-grandpa') && document.querySelector('.np-tray-pot') && document.querySelector('.lcs-activity-check');
    }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Grandpa Pip's Nesting Pots", `header title "${title}"`);
    note(!!(await page.$('.np-grandpa-svg')), 'no Grandpa');
    note(!!(await page.$('.np-target, .np-gap')), 'no glowing target/gap');
    note((await page.$$('.np-tray-pot')).length >= 2, 'fewer than 2 tray pots');

    /* variety/shuffle via nextTask */
    const N = await page.evaluate(() => window.NestingPotsActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.NestingPotsActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
    note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

    /* WRONG: on an empty nest, tuck a SMALLER pot first → bobs, no place */
    await reload();
    const before = await state();
    if (before.nest === 0) {
      // pick a NON-biggest tray pot
      const smallIdx = await page.evaluate(() => {
        const t = window.NestingPotsActivity; const max = Math.max.apply(null, t.tray.map(p => p.value));
        return t.tray.findIndex(p => p.value !== max);
      });
      if (smallIdx >= 0) {
        await clickTray(smallIdx); await clickTarget('.np-target');
        const w = await state();
        note(w.nest === 0 && !w.celebrated, 'a smaller-first pot was placed/celebrated (must bob out)');
      }
    }

    /* CORRECT: nest everything biggest→smallest → completes → Check celebrates */
    await reload();
    let guard = 0;
    while (guard++ < 14) {
      const st = await state();
      if (st.trayLeft === 0) break;
      const mv = await nextMove();
      if (mv.idx < 0) break;
      await clickTray(mv.idx); await clickTarget(mv.target);
      await new Promise(r => setTimeout(r, 130));
      if (SHOT && guard === 2) { await page.screenshot({ path: path.join(SHOT_DIR, 'nesting-pots-en-midnest.png') }); }
    }
    const done = await state();
    note(done.trayLeft === 0, `round did not complete (tray left ${done.trayLeft})`);
    await page.click('.lcs-activity-check');
    const fin = await state();
    note(fin.celebrated && fin.readOnly, 'completed nest did not celebrate + lock on Check');

    /* gap round: tray must hold exactly one fitter + NO duplicates of placed nest pots */
    const gapCheck = await page.evaluate(() => {
      const t = window.NestingPotsActivity, O = window.OrderingCore;
      const gap = O.buildRounds().find(r => r.gapFill);
      if (!gap) return { ok: true, skipped: true };
      t.setupTask(gap);
      const placed = t.nest.filter(Boolean).map(p => p.value);
      const tray = t.tray.map(p => p.value);
      const dup = tray.filter(v => placed.indexOf(v) >= 0);
      const fitter = t.tray.filter(p => p.value > t._gapBelow.value && p.value < t._gapAbove.value).length;
      return { ok: dup.length === 0 && fitter === 1, dup, fitter, placed, tray };
    });
    note(gapCheck.ok, `gap round bad: tray ${JSON.stringify(gapCheck.tray)} dup-of-nest ${JSON.stringify(gapCheck.dup)} / fitters=${gapCheck.fitter} (want 0 dup, 1 fitter)`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 800 });
      await reload();
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} nesting-pots/en — "${title}"`);
  } catch (e) {
    fails.push('nesting-pots/en: ' + e.message);
    console.log(`  FAIL nesting-pots/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`NESTING-POTS LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('NESTING-POTS LOCAL TEST PASSED — Grandpa + nest + tray render, smaller-first bobs out, biggest→smallest completes + Check celebrates + locks, ≥7 reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
