#!/usr/bin/env node
/* =====================================================================
   local-test-fix-it-corner.js — interaction harness for "Fixit's Fix-It
   Corner" (CCSS 1.OA.D.8). Serves `mini tools/` + drives the real shell:

     • each of the 8 experiences solves via its OWN correct action
       (ten-frame fill / supply-the-whole tray / count-on + count-back
       number-line hops / fact-family triangle tray / recombine-then-whole /
       balance-beam tray / produce tap-to-hide) → done → Check celebrates;
     • a WRONG tray part shows a modeled consequence, does NOT advance, and
       does NOT eliminate the wrong part (no elimination-to-1 cheat);
     • ESCALATION: two misses on a tray band swaps in a count-on rail;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   EN-only pilot. Usage: node scripts/local-test-fix-it-corner.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'fix-it-corner.missing-part.1-oa-d-8';
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

  const url = `${BASE}/fix-it-corner-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.FixItCornerActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'fix-it-corner.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.FixItCornerActivity.round && document.querySelector('.fic-gadget'), { timeout: 4000 });
  }
  const meta = () => page.evaluate(() => { const C = window.MissingPartCore, r = window.FixItCornerActivity.round; return { id: r.id, exp: r.experience, kind: r.kind || null, x: C.deriveUnknown(r), a: r.a, given: r.a }; });
  const done = () => page.evaluate(() => window.FixItCornerActivity.phase === 'done');
  const clickPart = async (v) => { const el = await page.$('.fic-part[data-v="' + v + '"]'); if (el) { await el.click(); await sleep(80); return true; } return false; };

  async function solve(m) {
    if (m.exp === 'make10') {
      // click empty cells (index given..) until total 10 → x clicks
      for (let i = 0; i < m.x; i++) {
        const cells = await page.$$('.fic-fcell');
        if (cells[m.given + i]) { await cells[m.given + i].click(); await sleep(60); }
      }
    } else if (m.exp === 'missingAddend' || m.exp === 'missingSubtrahend') {
      for (let i = 0; i < m.x + 1 && !(await done()); i++) { const hop = await page.$('.fic-hop'); if (hop) { await hop.click(); await sleep(90); } }
    } else if (m.exp === 'missingMinuend') {
      const sl = await page.$('.fic-slide'); if (sl) { await sl.click(); await sleep(120); }
      await clickPart(m.x);
    } else if (m.exp === 'produce') {
      const nd = await page.$('.fic-prodnode'); if (nd) { await nd.click(); await sleep(80); }
    } else {
      await clickPart(m.x);   // missingSum / missingFirstAddend / balance
    }
    await sleep(120);
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.FixItCornerActivity; return t && t._activityRow && document.querySelector('.fic-mole') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    note(!!(await page.$('.fic-mole-svg')), 'no Fixit mole');
    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Fixit's Fix-It Corner", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.FixItCornerActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.FixItCornerActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
    note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

    /* EVERY experience solvable via its own correct action */
    const ROUNDS = ['m10-7', 'sum-8-5', 'ma-8-13', 'ms-13-8', 'mfa-5-12', 'mm-5-8', 'bal-6-6-4', 'prod-13-8-5'];
    for (const id of ROUNDS) {
      await force(id);
      const m = await meta();
      await solve(m);
      note(await done(), `'${id}' (${m.exp}) did not complete via its correct action`);
      if (await done()) { await page.click('.lcs-activity-check'); await sleep(120); const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); }); note(cel, `${id}: Check did not celebrate`); }
    }

    /* WRONG tray part → no advance + does NOT eliminate */
    await force('sum-8-5');
    const m2 = await meta();
    const wrong = m2.x === 13 ? 21 : 13;
    const before = await page.$$eval('.fic-part', els => els.length);
    const wEl = await page.$('.fic-part[data-v="' + (await page.evaluate(() => { const C = window.MissingPartCore, r = window.FixItCornerActivity.round; const x = C.deriveUnknown(r); const tray = C.commonErrorParts(r, x).filter(p => p.value !== x); return tray[0].value; })) + '"]');
    if (wEl) { await wEl.click(); await sleep(120); }
    note(!(await done()), 'a wrong tray part advanced (must not)');
    const after = await page.$$eval('.fic-part', els => els.length);
    note(before === after, `wrong part eliminated tray tiles (${before}→${after} — no elimination cheat allowed)`);

    /* ESCALATION: two misses on a tray band → count-on rail appears */
    await force('sum-8-5');
    for (let k = 0; k < 2; k++) {
      const wv = await page.evaluate(() => { const C = window.MissingPartCore, r = window.FixItCornerActivity.round; const x = C.deriveUnknown(r); const t = C.commonErrorParts(r, x).filter(p => p.value !== x); const tool = window.FixItCornerActivity; const used = tool._missUsed || (tool._missUsed = []); const pick = t.find(p => used.indexOf(p.value) < 0) || t[0]; used.push(pick.value); return pick.value; });
      const e = await page.$('.fic-part[data-v="' + wv + '"]'); if (e) { await e.click(); await sleep(140); }
    }
    note(!!(await page.$('.fic-rail-label')), 'escalation count-on rail did not appear after 2 misses');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('mfa-5-12');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} fix-it-corner/en — "${title}"`);
  } catch (e) {
    fails.push('fix-it-corner/en: ' + e.message);
    console.log(`  FAIL fix-it-corner/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`FIX-IT-CORNER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('FIX-IT-CORNER LOCAL TEST PASSED — Fixit + gadget render, all 8 experiences solve via their own action, wrong part does not advance or eliminate, escalation rail after 2 misses, ≥7 distinct + reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
