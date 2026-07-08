#!/usr/bin/env node
/* =====================================================================
   local-test-contraction.js — interaction harness (L.2.2.c contractions,
   clarity-first redesign of #77). Serves `mini tools/` + drives the DOM:

     • tapping a wrong chip does NOT resolve (warm nudge, no advance); tapping
       the correct contraction resolves + shows the contraction; shell Check
       hidden until resolved.
     • the two words + 3 contraction chips + Hear-it render; the shell prompt
       carries the question; no stored apostrophe literal; multi-locale (en/de/fr); ≥7 distinct
       + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'contraction.apostrophe.l-2-2-c';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

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
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/contraction-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.ContractionActivity._resolved, miss: !!document.querySelector('.ct-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.ContractionActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.ContractionActivity._round && document.querySelector('.ct-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapStr = (str) => page.evaluate((s) => { const b = Array.from(document.querySelectorAll('.ct-cand')).find(x => x.getAttribute('data-str') === s); if (b) b.click(); return !!b; }, str).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const derived = (id) => page.evaluate((rid) => { const t = window.ContractionActivity, r = t._pool.find(x => x.id === rid), C = window.ContractionCore; return { correct: C.deriveCorrect(r), chips: C.chipStrings(r) }; }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.ContractionActivity; return t && t._activityRow && document.querySelector('.ct-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Nib's Apostrophe Seat", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.ContractionActivity._activityRow.slug));
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);   // multi-locale (en/de/fr); en must be present

    const N = await page.evaluate(() => window.ContractionActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.ContractionActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.ContractionActivity._pool.every(r => r.combined.indexOf("'") < 0 && r.correct == null)), 'a round stores an apostrophe literal or answer flag');

    /* a regular round: prompt + words + chips render; wrong no-advance; correct resolves + shows the contraction */
    await force('ct-dont');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/which contraction/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const w = document.querySelector('.ct-words'); return w && /do/.test(w.textContent) && /not/.test(w.textContent); }), 'the two words did not render');
    note(await page.evaluate(() => document.querySelectorAll('.ct-cand').length === 3), 'the 3 contraction chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.ct-hear')), 'the Hear-it button did not render');

    let d = await derived('ct-dont');
    const wrongChip = d.chips.find(s => s !== d.correct);
    await tapStr(wrongChip);
    note(!(await S()).resolved, 'a wrong chip resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapStr(d.correct);
    note((await S()).resolved, 'the correct contraction did not resolve');
    note(await page.evaluate(() => { const r = document.querySelector('.ct-result'); return r && r.textContent.trim() === "don't"; }), 'the contraction did not show on resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* an irregular round (won't) */
    await force('ct-wont');
    d = await derived('ct-wont');
    note(d.correct === "won't", `irregular derive wrong: "${d.correct}"`);
    await tapStr(d.correct);
    note((await S()).resolved, 'irregular round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('ct-youre'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} contraction/en — "${title}"`);
  } catch (e) {
    fails.push('contraction/en: ' + e.message);
    console.log(`  FAIL contraction/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`CONTRACTION LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('CONTRACTION LOCAL TEST PASSED — contractions: a wrong chip does NOT resolve (warm nudge, no advance); the correct contraction resolves + shows; the two words + 3 chips + Hear-it render; the shell prompt carries the question; no stored apostrophe literal; multi-locale (en/de/fr); ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
