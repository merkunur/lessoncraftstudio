#!/usr/bin/env node
/* =====================================================================
   local-test-place-value-regroup-hundred.js — interaction harness for the two
   HUNDRED-level activities (2.NBT.B.7): "Tuck Makes a Hundred" (compose-a-
   hundred) + "Tuck Breaks a Hundred" (decompose-a-hundred / double borrow).
   Verifies render + the regroup cascade + titles + EN-only + reshuffle +
   no-overflow for BOTH.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const ADD = 'place-value-regroup.add-compose-hundred.2-nbt-b-7';
const SUB = 'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7';

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
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
  const note = (c, m) => { if (!c) fails.push(m); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function load(a) {
    await page.goto(`http://127.0.0.1:${PORT}/place-value-regroup-activity.html?lang=en&activity=${a}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PlaceValueRegroupActivity; return t && t._activityRow && document.querySelector('.pvr-root'); }, { timeout: 15000 });
  }
  async function force(rid) {
    await page.evaluate((id) => {
      const t = window.PlaceValueRegroupActivity, n = t._pool.length, o = [];
      for (let i = 0; i < n; i++) o.push(i);
      const k = t._pool.findIndex(x => x.id.indexOf(id) >= 0);
      const at = o.indexOf(k); if (at > 0) { o.splice(at, 1); o.unshift(k); }
      t._order = o; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, rid);
    await page.waitForFunction(() => window.PlaceValueRegroupActivity.a && document.querySelector('.pvr-root'), { timeout: 4000 });
    await sleep(50);
  }
  const press = () => page.evaluate(() => { const b = document.querySelector('.pvr-maketen'); if (b) b.click(); }).then(() => sleep(50));
  const btnText = () => page.evaluate(() => { const b = document.querySelector('.pvr-maketen'); return b ? b.textContent : ''; });
  const typeNum = (n) => page.evaluate((v) => { const keys = Array.from(document.querySelectorAll('.lcs-activity-key')); String(v).split('').forEach(ch => { const k = keys.find(x => x.textContent === ch); if (k) k.click(); }); }, n).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(50));
  const RO = () => page.evaluate(() => window.PlaceValueRegroupActivity.readOnly);
  const st = () => page.evaluate(() => { const t = window.PlaceValueRegroupActivity; return { h: t.hundredsCount, te: t.tensCount, o: t.onesCount, tgt: t.operation === 'subtract' ? t.a - t.b : t.a + t.b }; });
  const slugKeys = () => page.evaluate(() => Object.keys(window.PlaceValueRegroupActivity._activityRow.slug));
  const distinctReshuffle = () => page.evaluate(() => { const t = window.PlaceValueRegroupActivity, N = t._pool.length, out = []; for (let i = 0; i < 2 * N; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return { N, first: out.slice(0, N), second: out.slice(N) }; });

  try {
    /* ---- A: Tuck Makes a Hundred ---- */
    await load(ADD);
    note(/Makes a Hundred/i.test(await page.$eval('.lcs-title', e => e.textContent).catch(() => '')), 'A: title not "Tuck Makes a Hundred"');
    note((await slugKeys()).join() === 'en', 'A: not EN-only');
    const ar = await distinctReshuffle();
    note(new Set(ar.first).size >= 7, `A: only ${new Set(ar.first).size} distinct`);
    note(ar.first.join() !== ar.second.join() || ar.N < 2, 'A: no reshuffle');
    await force('r-340-70');   // 340 + 70 = 410, tens 4+7=11 → make a hundred
    note(await page.evaluate(() => document.querySelectorAll('.pvr-col').length === 3), 'A: not 3 columns');
    note(/Make a hundred/i.test(await btnText()), 'A: button is not "Make a hundred"');
    let s = await st(); note(s.te === 11 && s.h === 3, `A: start state wrong (h${s.h} t${s.te})`);
    await press();   // make a hundred
    s = await st(); note(s.te === 1 && s.h === 4, `A: after make-a-hundred expected h4 t1, got h${s.h} t${s.te}`);
    note(!(await page.evaluate(() => !!document.querySelector('.pvr-maketen'))), 'A: button still present after make-a-hundred');
    await typeNum(s.tgt); await check();
    note(await RO(), 'A: make-a-hundred + total did not resolve');
    note(await page.evaluate(() => { const c = document.querySelector('.pvr-cap'); return c && /340 \+ 70 = 410/.test(c.textContent); }), 'A: caption wrong');

    /* ---- B: Tuck Breaks a Hundred ---- */
    await load(SUB);
    note(/Breaks a Hundred/i.test(await page.$eval('.lcs-title', e => e.textContent).catch(() => '')), 'B: title not "Tuck Breaks a Hundred"');
    note((await slugKeys()).join() === 'en', 'B: not EN-only');
    const br = await distinctReshuffle();
    note(new Set(br.first).size >= 7, `B: only ${new Set(br.first).size} distinct`);
    await force('r-302-5');   // 302 − 5, tens 0 → break a hundred, then a ten
    note(/Break a hundred/i.test(await btnText()), 'B: first button is not "Break a hundred"');
    let bs = await st(); note(bs.h === 3 && bs.te === 0 && bs.o === 2, `B: start wrong (h${bs.h} t${bs.te} o${bs.o})`);
    await press();   // break a hundred
    bs = await st(); note(bs.h === 2 && bs.te === 10, `B: after break-a-hundred expected h2 t10, got h${bs.h} t${bs.te}`);
    note(/Break a ten/i.test(await btnText()), 'B: second button is not "Break a ten"');
    await press();   // break a ten
    bs = await st(); note(bs.te === 9 && bs.o === 12, `B: after break-a-ten expected t9 o12, got t${bs.te} o${bs.o}`);
    note(await page.evaluate(() => document.querySelectorAll('.pvr-cube.is-take').length === 5), 'B: expected 5 take-away ones');
    await typeNum(bs.tgt); await check();
    note(await RO(), 'B: cascade + difference did not resolve');
    note(await page.evaluate(() => { const c = document.querySelector('.pvr-cap'); return c && /302 − 5 = 297/.test(c.textContent); }), 'B: caption wrong');

    /* overflow 280→768 (post-regroup busy states) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await load(ADD); await force('r-450-60'); let ov = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(ov <= 2, `A overflow ${ov}px @${w}`);
      await load(SUB); await force('r-403-8'); await press(); await press(); ov = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(ov <= 2, `B overflow ${ov}px @${w} (post-cascade)`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} place-value-regroup hundred activities`);
  } catch (e) {
    fails.push('hundred local-test: ' + e.message);
    console.log('  FAIL — ' + e.message);
  } finally { await page.close(); }

  await browser.close(); server.close();
  console.log('');
  if (fails.length) { console.error(`PLACE-VALUE-REGROUP HUNDRED LOCAL TEST FAILED — ${fails.length}:`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('PLACE-VALUE-REGROUP HUNDRED LOCAL TEST PASSED — A compose-a-hundred (make-a-hundred → tens−10/hundreds+1, caption) + B decompose-a-hundred (break-a-hundred → break-a-ten cascade, 5 take-marks, caption); 3 columns; correct titles; EN-only; ≥7 + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
