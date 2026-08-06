#!/usr/bin/env node
/* =====================================================================
   local-test-sentence-clinic.js — interaction harness for "Dr. Plume's
   Sentence Clinic" (CCSS L.2.1). Serves `mini tools/` + drives the real
   shell with puppeteer:

     • renders Dr. Plume + the sentence card + Check;
     • NO BLIND-SWAP: on the swap round there are ZERO option chips before a
       correct diagnosis; tapping a HEALTHY word does NOT advance + chips
       stay hidden; tapping the troubled word REVEALS the same-lemma chips;
     • EVERY one of the 7 actions completes via its correct interaction
       (capitalize/insert-punct/swap/insert-word/reorder/delete/split) →
       phase 'done' → Check celebrates + locks;
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   EN-only pilot. Usage: node scripts/local-test-sentence-clinic.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sentence-clinic.fix-it.l-2-1';
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

  const url = `${BASE}/sentence-clinic-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  async function force(roundId) {
    await page.evaluate((rid) => {
      const t = window.SentenceClinicActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'sentence-clinic.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, roundId);
    await page.waitForFunction(() => window.SentenceClinicActivity.round, { timeout: 4000 });
  }
  const meta = () => page.evaluate(() => { const r = window.SentenceClinicActivity.round; return { action: r.action, targetIndex: r.targetIndex, gapIndex: r.gapIndex, seamIndex: r.seamIndex, replacement: r.replacement, correctOrder: r.correctOrder, tokens: r.tokens }; });
  const state = () => page.evaluate(() => ({ done: window.SentenceClinicActivity.phase === 'done', opts: document.querySelectorAll('.sc-opt').length, celebrated: !!(document.querySelector('.lcs-activity-prompt') && document.querySelector('.lcs-activity-prompt').classList.contains('celebrate')), readOnly: window.SentenceClinicActivity.readOnly }));
  async function clickWord(i) { const w = await page.$$('button.sc-chip'); if (w[i]) await w[i].click(); }
  async function clickSeam(i) { const s = await page.$$('.sc-seam'); if (s[i]) await s[i].click(); }
  async function clickOptText(txt) {
    const opts = await page.$$('.sc-opt');
    for (const o of opts) { const t = await (await o.getProperty('textContent')).jsonValue(); if (String(t).trim() === txt) { await o.click(); return true; } }
    return false;
  }
  async function solve(m) {
    if (m.action === 'capitalize' || m.action === 'delete') { await clickWord(m.targetIndex); }
    else if (m.action === 'insert-punct' || m.action === 'insert-word') { await clickOptText(m.replacement); }
    else if (m.action === 'split') { await clickSeam(m.seamIndex); }
    else if (m.action === 'swap') { await clickWord(m.targetIndex); await new Promise(r => setTimeout(r, 80)); await clickOptText(m.replacement); }
    else if (m.action === 'reorder') {
      const order = m.correctOrder.map(i => m.tokens[i]);
      for (const txt of order) { await clickOptText(txt); await new Promise(r => setTimeout(r, 80)); }
    }
    await new Promise(r => setTimeout(r, 120));
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => {
      const t = window.SentenceClinicActivity;
      return t && t._activityRow && document.querySelector('.sc-plume') && document.querySelector('.sc-chip') && document.querySelector('.lcs-activity-check');
    }, { timeout: 15000 });

    note(!!(await page.$('.sc-plume-svg')), 'no Dr. Plume');
    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Dr. Plume's Sentence Clinic", `header title "${title}"`);

    /* variety/shuffle via nextTask */
    const N = await page.evaluate(() => window.SentenceClinicActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.SentenceClinicActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
    note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

    /* NO BLIND-SWAP: chips hidden until a correct diagnosis */
    await force('swap-agree');
    const sm = await meta();
    const before = await state();
    note(before.opts === 0, `swap: ${before.opts} option chips shown BEFORE diagnosis (blind-swap must be impossible)`);
    // tap a HEALTHY word (not the target) → no chips, no advance
    const healthy = (sm.targetIndex + 2) % sm.tokens.length;
    await clickWord(healthy === sm.targetIndex ? (sm.targetIndex + 1) % sm.tokens.length : healthy);
    const afterHealthy = await state();
    note(afterHealthy.opts === 0 && !afterHealthy.done, 'swap: tapping a healthy word revealed chips / advanced (must not)');
    // tap the troubled word → chips appear
    await clickWord(sm.targetIndex);
    const afterDiag = await state();
    note(afterDiag.opts > 0, 'swap: correct diagnosis did NOT reveal the repair chips');
    await clickOptText(sm.replacement);
    const swapDone = await state();
    note(swapDone.done, 'swap: correct repair did not reach done');

    /* EVERY action completes via its correct interaction */
    const ROUNDS = ['cap-start', 'mark-end', 'swap-agree', 'fill-verb', 'order-svo', 'del-double', 'split-runon'];
    for (const rid of ROUNDS) {
      await force(rid);
      const m = await meta();
      await solve(m);
      const st = await state();
      note(st.done, `action '${m.action}' (${rid}) did not complete via the correct interaction`);
      if (st.done) { await page.click('.lcs-activity-check'); const fin = await state(); note(fin.celebrated && fin.readOnly, `${rid}: Check did not celebrate + lock`); }
    }

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 800 });
      await force('order-svo');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} sentence-clinic/en — "${title}"`);
  } catch (e) {
    fails.push('sentence-clinic/en: ' + e.message);
    console.log(`  FAIL sentence-clinic/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SENTENCE-CLINIC LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SENTENCE-CLINIC LOCAL TEST PASSED — Dr. Plume + sentence render, blind-swap impossible (chips hidden until diagnosis), all 7 actions complete + Check celebrates, ≥7 reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
