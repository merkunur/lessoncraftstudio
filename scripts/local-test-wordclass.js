#!/usr/bin/env node
/* =====================================================================
   local-test-wordclass.js — interaction harness (L.2.1.e adjective vs adverb,
   clarity-first redesign of #73). Serves `mini tools/` + drives the DOM:

     • tapping the wrong form does NOT resolve (warm function nudge, no
       advance); tapping the matching form resolves + fills the blank; shell
       Check hidden until resolved.
     • the sentence (with blank) + 2 form chips + Hear-it render; the shell
       prompt carries the question naming the modified word; no stored answer;
       EN-only; ≥7 distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wordclass.adjective-adverb.l-2-1-e';
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

  const url = `http://127.0.0.1:${PORT}/wordclass-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.WordclassActivity._resolved, miss: !!document.querySelector('.wc-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WordclassActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WordclassActivity._round && document.querySelector('.wc-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapClass = (cls) => page.evaluate((c) => { const b = Array.from(document.querySelectorAll('.wc-cand')).find(x => x.getAttribute('data-class') === c); if (b) b.click(); return !!b; }, cls).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const otherClass = (id) => page.evaluate((rid) => { const t = window.WordclassActivity, r = t._pool.find(x => x.id === rid), C = window.WordclassCore; return C.CLASSES.find(x => x !== C.oracle(r)); }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.WordclassActivity; return t && t._activityRow && document.querySelector('.wc-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Glim's Describing Words", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.WordclassActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.WordclassActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.WordclassActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    const kinds = await page.evaluate(() => Array.from(new Set(window.WordclassActivity._pool.map(r => r.targetKind))));
    note(kinds.indexOf('noun') >= 0 && kinds.indexOf('verb') >= 0, `not both kinds: ${kinds.join(',')}`);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.WordclassActivity._pool.every(r => r.correct == null && r.correctIndex == null)), 'a round carries a stored answer-flag field');

    /* an ADJECTIVE (noun-target) round: prompt + sentence + chips render; wrong no-advance; correct resolves + fills blank */
    await force('wc-a1');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/describes the rabbit/i.test(prompt), `adjective-round prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const s = document.querySelector('.wc-sentence'); return s && /rabbit/.test(s.textContent); }), 'the sentence did not render');
    note(await page.evaluate(() => !!document.querySelector('.wc-blank')), 'the blank slot did not render');
    note(await page.evaluate(() => document.querySelectorAll('.wc-cand').length === 2), 'the 2 form chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.wc-hear')), 'the Hear-it button did not render');

    let other = await otherClass('wc-a1');
    await tapClass(other);   // a wrong form (adverb on a noun-target)
    note(!(await S()).resolved, 'a wrong form resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapClass('adjective');
    note((await S()).resolved, 'the correct (adjective) form did not resolve');
    note(await page.evaluate(() => { const b = document.querySelector('.wc-blank'); return b && b.classList.contains('filled') && b.textContent.trim() === 'quick'; }), 'the blank did not fill with the chosen word');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* an ADVERB (verb-target) round */
    await force('wc-v1');
    const promptV = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/how the rabbit hopped/i.test(promptV), `adverb-round prompt wrong: "${promptV}"`);
    await tapClass('adverb');
    note((await S()).resolved, 'adverb round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('wc-a3'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} wordclass/en — "${title}"`);
  } catch (e) {
    fails.push('wordclass/en: ' + e.message);
    console.log(`  FAIL wordclass/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`WORDCLASS LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('WORDCLASS LOCAL TEST PASSED — adjective vs adverb: a wrong form does NOT resolve (warm function nudge, no advance); the matching form resolves + fills the blank; the sentence + 2 chips + Hear-it render; the shell prompt names the modified word; shell Check hides until resolved; no stored answer; EN-only; both kinds + ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
