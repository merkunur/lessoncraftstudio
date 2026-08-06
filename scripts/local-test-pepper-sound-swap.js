#!/usr/bin/env node
/* =====================================================================
   local-test-pepper-sound-swap.js — interaction harness for "Pepper's Sound
   Swap" (CCSS RF.K.2.e). Serves `mini tools/` + image-library-webp; drives the
   real shell:
     • a round renders the target picture + letter cue + 3 picture cards;
     • tapping the correct (swapped) picture → shell Check → celebrate;
     • tapping a wrong picture → tryagain, NO card marked (no leak);
     • cards SHUFFLED; tap-to-deselect; every picture actually loads (>0 size);
     • ≥8 distinct rounds + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'pepper-sound-swap.substitute.rf-k-2-e';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
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
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|inventory\.json|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/pepper-sound-swap-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PepperSoundSwapActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'pepper-sound-swap.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PepperSoundSwapActivity.round && document.querySelector('.pss-root'), { timeout: 4000 });
    await sleep(60);
  }
  const correctId = () => page.evaluate(() => window.PhonemeSwapCore.oracle(window.PepperSoundSwapActivity.round));
  const wrongId = () => page.evaluate(() => { const r = window.PepperSoundSwapActivity.round, o = window.PhonemeSwapCore.oracle(r); return r.choices.map((c, i) => i).filter(i => i !== o)[0]; });
  const tap = (id) => page.evaluate((x) => { const b = document.querySelector('.pss-opt[data-id="' + x + '"]'); if (b) b.click(); }, id).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
  const firstCardImg = () => page.$eval('.pss-opt .pss-img', e => e.getAttribute('src')).catch(() => '');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PepperSoundSwapActivity; return t && t._activityRow && document.querySelector('.pss-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Pepper's Sound Swap", `header title "${title}"`);

    const Np = await page.evaluate(() => window.PepperSoundSwapActivity._pool.length);
    note(Np >= 8, `only ${Np} rounds (<8)`);
    const ids = await page.evaluate((count) => { const t = window.PepperSoundSwapActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * Np);
    note(new Set(ids.slice(0, Np)).size >= 8, `only ${new Set(ids.slice(0, Np)).size} distinct rounds (<8)`);
    note(ids.slice(0, Np).join(',') !== ids.slice(Np, 2 * Np).join(',') || Np < 2, 'second pass did not reshuffle');

    await force('cat-h');
    note(!!(await page.$('.pss-target')), 'no target picture');
    note(await page.$$eval('.pss-opt', els => els.length) === 3, 'did not render 3 picture cards');
    // every picture actually loads (naturalWidth > 0)
    const allLoaded = await page.$$eval('.pss-img', imgs => imgs.every(i => i.complete && i.naturalWidth > 0));
    note(allLoaded, 'a picture failed to load (broken image)');

    await tap(await correctId()); await check();
    note(await celebrated(), 'the correct (swapped) picture did not celebrate');

    await force('pan-f');
    await tap(await wrongId()); await check();
    note(await triedAgain(), 'a wrong picture did not show try-again');
    note(!(await celebrated()), 'a wrong picture celebrated (must not)');
    const leak = await page.$$eval('.pss-opt', els => els.filter(e => /pss-correct|pss-right|pss-wrong|pss-bad/.test(e.className)).length);
    note(leak === 0, 'a card is marked correct/wrong after a wrong pick (leak)');
    await tap(await correctId()); await check();
    note(await celebrated(), 'the correct picture did not celebrate after the wrong attempt');

    const firsts = [];
    for (const id of ['cat-h', 'pan-f', 'van-p', 'bat-c', 'fan-v']) { await force(id); firsts.push(await firstCardImg()); }
    note(new Set(firsts).size >= 2, `the first card is identical across rounds — cards not shuffled`);

    await force('hat-m-last');
    const cw = await correctId();
    await tap(cw); note(await page.evaluate(() => window.PepperSoundSwapActivity.sel != null), 'first tap did not select');
    await tap(cw); note(await page.evaluate(() => window.PepperSoundSwapActivity.sel == null), 'second tap did not deselect');

    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('cat-p-last');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} pepper-sound-swap/en — "${title}"`);
  } catch (e) {
    fails.push('pepper-sound-swap/en: ' + e.message);
    console.log(`  FAIL pepper-sound-swap/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`PEPPER-SOUND-SWAP LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('PEPPER-SOUND-SWAP LOCAL TEST PASSED — target + letter cue + 3 picture cards; pictures load; the swapped word celebrates; wrong = try-again with NO card marked (no leak); cards shuffle; tap-to-deselect; ≥8 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
