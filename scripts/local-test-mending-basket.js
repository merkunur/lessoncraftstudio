#!/usr/bin/env node
/* =====================================================================
   local-test-mending-basket.js — interaction harness for "Granny's
   Mending Basket" (CCSS RF.1.4.a). Serves `mini tools/` + drives the
   real shell:

     • each of the 7 types solves via its OWN tap action (piece→target /
       tap-the-wrong-word / two-step connect / figure→zone / page→picture /
       order-3-strips / item→basket) → the page mends + develops;
     • a WRONG attempt does NOT advance + paints NO answer-region pixel
       (the leaf never gains .mended on a wrong pick — the fix #5 contract);
     • connect is genuinely two-step (referent then mend);
     • variety/shuffle: nextTask over 2 passes → ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.

   EN-only pilot. Usage: node scripts/local-test-mending-basket.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'mending-basket.mend-page.rf-1-4-a';
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

  const url = `${BASE}/mending-basket-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.MendingBasketActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'mending-basket.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.MendingBasketActivity.round && document.querySelector('.mb-leaf'), { timeout: 4000 });
  }
  const round = () => page.evaluate(() => JSON.parse(JSON.stringify(window.MendingBasketActivity.round)));
  const done = () => page.evaluate(() => window.MendingBasketActivity.phase === 'done');
  const mended = () => page.evaluate(() => !!document.querySelector('.mb-leaf.mended'));
  async function clickText(sel, text) { const els = await page.$$(sel); for (const e of els) { const t = (await (await e.getProperty('textContent')).jsonValue()).trim(); if (t === text) { await e.click(); await sleep(70); return true; } } return false; }
  async function clickAttr(sel, attr, val) { const e = await page.$(sel + '[' + attr + '="' + val + '"]'); if (e) { await e.click(); await sleep(70); return true; } return false; }

  async function solve(r) {
    if (r.type === 'cloze') { await clickText('.mb-piece', r.answer); await page.click('.mb-tear'); }
    else if (r.type === 'contradiction') { await clickText('.mb-word-tap', r.answer); }
    else if (r.type === 'connect') {
      const refText = r.tokens[r.extras.referentIndex].t;
      await clickText('.mb-word-tap', refText);          // step 1
      await sleep(120);
      await clickText('.mb-piece', r.answer);            // step 2 select
      await page.click('.mb-tear');
    }
    else if (r.type === 'placement') { await page.click('.mb-figure'); await clickAttr('.mb-zone', 'data-z', r.answer); }
    else if (r.type === 'match') { await page.click('.mb-page'); await clickAttr('.mb-twin', 'data-i', r.answer); }
    else if (r.type === 'sequence') { for (const id of r.extras.sequenceOrder) { const txt = r.strips.filter(s => s.id === id)[0].text; await clickText('.mb-strip', txt); } }
    else if (r.type === 'sort') { for (const it of r.items) { const bin = r.extras.sortMap[it.id]; await clickText('.mb-sort-item', it.text); await sleep(60); const bins = await page.$$('.mb-bin'); for (const b of bins) { const t = await (await b.getProperty('textContent')).jsonValue(); if (String(t).includes(bin)) { await b.click(); await sleep(70); break; } } } }
    await sleep(150);
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.MendingBasketActivity; return t && t._activityRow && document.querySelector('.mb-granny') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    note(!!(await page.$('.mb-granny-svg')), 'no Granny');
    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Granny's Mending Basket", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.MendingBasketActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.MendingBasketActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const p1 = ids.slice(0, N), p2 = ids.slice(N, 2 * N);
    note(new Set(p1).size >= 7, `only ${new Set(p1).size} distinct rounds (<7)`);
    note(p1.slice().sort().join('|') === p2.slice().sort().join('|'), 'pass-2 not same set');
    note(p1.join('|') !== p2.join('|'), 'pass-2 order identical (no reshuffle)');

    /* one of each type solves */
    const ONE = ['cloze-puppy', 'contra-rain', 'connect-dog', 'place-cat-under', 'match-bow', 'seq-seed', 'sort-things'];
    for (const id of ONE) {
      await force(id);
      const r = await round();
      await solve(r);
      note(await done(), `'${id}' (${r.type}) did not mend via its correct action`);
      note(await mended(), `'${id}': leaf did not develop (.mended) on the correct mend`);
      if (await done()) { await page.click('.lcs-activity-check'); await sleep(120); const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); }); note(cel, `${id}: Check did not celebrate`); }
    }

    /* WRONG attempt → no advance + NO answer pixel (leaf never .mended) */
    await force('cloze-puppy');
    const rc = await round();
    const wrong = rc.pieces.filter(p => p.value !== rc.answer)[0].value;
    await clickText('.mb-piece', wrong); await page.click('.mb-tear'); await sleep(150);
    note(!(await done()), 'a wrong mend advanced (must not)');
    note(!(await mended()), 'a wrong mend painted the answer-region (leaf gained .mended — fix #5 violated)');
    // the tear still shows no answer text
    const tearText = await page.$eval('.mb-tear', e => e.textContent.trim()).catch(() => 'X');
    note(tearText === '', `wrong mend revealed the answer in the tear ("${tearText}")`);

    /* connect is two-step: tapping a wrong referent does NOT advance to step 2 */
    await force('connect-dog');
    const rcon = await round();
    const wrongRef = rcon.tokens.filter((t, i) => t.t && i < 5 && i !== rcon.extras.referentIndex && rcon.pieces.some(p => p.value.replace(/^the\s+/, '') === t.t))[0];
    if (wrongRef) { await clickText('.mb-word-tap', wrongRef.t); await sleep(120); const step = await page.evaluate(() => window.MendingBasketActivity.step); note(step === 1, 'a wrong referent advanced to step 2 (must stay on step 1)'); }

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('place-cat-under');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} mending-basket/en — "${title}"`);
  } catch (e) {
    fails.push('mending-basket/en: ' + e.message);
    console.log(`  FAIL mending-basket/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`MENDING-BASKET LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('MENDING-BASKET LOCAL TEST PASSED — Granny + leaf render, all 7 types mend via their own action, wrong mend does not advance or paint the answer, connect is two-step, ≥7 distinct + reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
