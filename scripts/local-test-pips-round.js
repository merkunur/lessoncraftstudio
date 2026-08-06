#!/usr/bin/env node
/* =====================================================================
   local-test-pips-round.js — interaction harness for "Pip's Round" (CCSS
   K.CC.A.3 recognition-face). Serves `mini tools/` + drives the shell:

     • NUMBER-RECOGNIZER delivers: tapping the house whose numeral===target →
       the door opens (win); tapping a confusable distractor does NOT.
     • NON-LEAKING WRONG: a wrong tap leaves the wrong house in place (curtain
       not opened) + a message that names the READ numeral + re-states the
       target, NEVER high/low/spatial/which-house.
     • SAME-TENS: a same-tens distractor (13 for 14) is rejected; only 14 wins.
     • CROSS-FONT: the envelope target glyph uses a DIFFERENT font-family from
       the house plates (anti-shape-match); the plate numerals are legible.
     • AUDIO: a hear-find round SPEAKS the number; ≥7 rounds + 4 cogs + reshuffle;
       no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pips-round.mail-route.k-cc-a-3';
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

  const url = `http://127.0.0.1:${PORT}/pips-round-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const st = () => page.evaluate(() => { const a = window.PipsRoundActivity; return { solved: a.solved, msg: a.msg, target: a.round.targetValue }; });
  const clickNumeral = (num) => page.evaluate((n) => { const b = [...document.querySelectorAll('.pr-house')].find(x => { const p = x.querySelector('.pr-plate'); return p && p.textContent === String(n); }); if (b) { b.click(); return true; } return false; }, num).then(() => sleep(30));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PipsRoundActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'pips-round.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PipsRoundActivity.round && document.querySelector('.pr-map'), { timeout: 4000 });
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // spy on spoken audio
    await page.evaluate(() => { window.__spoke = []; const o = window.LCSAudio && window.LCSAudio.speak; if (o) window.LCSAudio.speak = function (opts) { window.__spoke.push(opts && opts.text); return o.apply(this, arguments); }; });
    await page.waitForFunction(() => { const t = window.PipsRoundActivity; return t && t._activityRow && document.querySelector('.pr-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pip's Round", `header title "${title}"`);

    /* variety/shuffle + ≥7 rounds + 4 cogs */
    const N = await page.evaluate(() => window.PipsRoundActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PipsRoundActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const cogs = await page.evaluate(() => new Set(window.PipsRoundActivity._activityRow.params.rounds.map(r => r.cog)).size);
    note(cogs === 4, `expected 4 cogs, got ${cogs}`);

    /* CROSS-FONT: the target glyph font ≠ the plate font; plates legible */
    await force('teen-reversal-thirteen');
    const fonts = await page.evaluate(() => { const t = getComputedStyle(document.querySelector('.pr-target')).fontFamily, p = getComputedStyle(document.querySelector('.pr-plate')).fontFamily, sz = parseFloat(getComputedStyle(document.querySelector('.pr-plate')).fontSize); return { t, p, sz }; });
    note(fonts.t !== fonts.p, `the envelope target font equals the plate font (shape-matchable): "${fonts.t}"`);
    note(/serif|georgia|times/i.test(fonts.t), `the target is not a cross-font serif ("${fonts.t}")`);
    note(fonts.sz >= 14, `the plate numeral font is ${fonts.sz}px (<14px — not legible)`);

    /* NON-LEAKING WRONG: tap the reversal distractor (31 for 13) */
    await clickNumeral(31); let s = await st();
    note(!s.solved, 'delivering to the reversal distractor 31 was accepted for target 13');
    note(/31/.test(s.msg || '') && /13/.test(s.msg || ''), `the wrong message is not the non-leaking re-read ("${s.msg}")`);
    note(!/left|right|near|high|low|bigger|smaller|above|below/i.test(s.msg || ''), `the wrong message leaks a spatial/high-low hint ("${s.msg}")`);

    /* NUMBER-RECOGNIZER delivers (tap 13) */
    await clickNumeral(13); s = await st(); note(s.solved, 'delivering to the correct house 13 did not win');
    const doorOpen = await page.evaluate(() => !!document.querySelector('.pr-open .pr-resident'));
    note(doorOpen, 'the delivered door did not open with a waving resident');
    await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c) c.click(); }); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a delivery');

    /* SAME-TENS: 13 rejected, 14 wins (target 14) */
    await force('same-tens-fourteen'); await clickNumeral(13); s = await st(); note(!s.solved, 'a same-tens distractor 13 was accepted for target 14');
    await force('same-tens-fourteen'); await clickNumeral(14); s = await st(); note(s.solved, 'the correct house 14 did not win the same-tens round');

    /* AUDIO: a hear-find round speaks the number */
    await page.evaluate(() => { window.__spoke = []; });
    await force('hear-eight'); await sleep(400);
    const spoke = await page.evaluate(() => (window.__spoke || []).join(' '));
    note(/eight|number/i.test(spoke), `the audio round did not speak the target ("${spoke}")`);

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('dense-twelve'); await sleep(25);   // 5 houses — worst case
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} pips-round/en — "${title}"`);
  } catch (e) {
    fails.push('pips-round/en: ' + e.message);
    console.log(`  FAIL pips-round/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`PIPS-ROUND LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('PIPS-ROUND LOCAL TEST PASSED — number-recognizer delivers (the door opens, a resident waves); a confusable/reversal distractor is rejected; non-leaking wrong (names the read numeral + target, no spatial/high-low); ' +
    'same-tens needs the whole numeral; the envelope target font ≠ the plate font (anti-shape-match) + plates legible; the audio round speaks; ≥7 rounds + 4 cogs + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
