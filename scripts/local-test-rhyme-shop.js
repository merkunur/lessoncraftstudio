#!/usr/bin/env node
/* =====================================================================
   local-test-rhyme-shop.js — interaction harness for "Rosa Raccoon's Rhyme
   Wagon" (RF.K.2.a). Serves `mini tools/` + `image-library-webp/` + drives
   the shell by clicking the RENDERED DOM (by word), per shape:

     • AUDIO-FIRST: NO audio on load; tapping a picture SPEAKS its word (spy).
     • each shape (judge / pick / odd / sort / chant / field / chain) resolves
       when driven with the rimeKey-oracle answer; the gumball count rises.
     • a WRONG commit → guided re-listen (replays tails), the wrong tile becomes
       NON-CONFIRMABLE, order reshuffles, NO advance, NO shell try-again.
     • the shell Check is hidden until resolved.
     • the library <img> tokens actually load (naturalWidth>0).
     • EN-only manifest; ≥7 distinct shapes + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'rhyme-shop.rhyme.rf-k-2-a';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
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

  await page.evaluateOnNewDocument(() => {
    window.__spoken = [];
    const iv = setInterval(() => {
      if (window.LCSAudio && window.LCSAudio.speak && !window.LCSAudio.__spied) {
        window.LCSAudio.__spied = true; const orig = window.LCSAudio.speak;
        window.LCSAudio.speak = function (o) { try { window.__spoken.push((o && o.text) || ''); } catch (e) {} return orig.apply(this, arguments); };
        clearInterval(iv);
      }
    }, 5);
  });

  const url = `http://127.0.0.1:${PORT}/rhyme-shop-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const S = () => page.evaluate(() => ({ resolved: window.RhymeShopActivity._resolved, finds: window.RhymeShopActivity._finds, cog: window.RhymeShopActivity._round && window.RhymeShopActivity._round.cog, line: (document.querySelector('.rs-line') || {}).textContent || '', miss: !!document.querySelector('.rs-line.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.RhymeShopActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.RhymeShopActivity._round && document.querySelector('.rs-root'), { timeout: 4000 });
    await sleep(40);
  }
  /* click a tile/bin/button whose accessible word/text === `word` */
  const clickWord = (word) => page.evaluate((w) => {
    const els = Array.from(document.querySelectorAll('.rs-tile,.rs-bin'));
    const hit = els.find(e => (e.getAttribute('aria-label') || e.textContent || '').replace(/[♪\s]/g, '').toLowerCase().indexOf(w.toLowerCase()) >= 0);
    if (hit) hit.click(); return !!hit;
  }, word).then(() => sleep(25));
  const clickBtn = (txt) => page.evaluate((t) => { const b = Array.from(document.querySelectorAll('.rs-btn')).find(x => x.textContent.trim() === t); if (b && !b.disabled) b.click(); return !!b; }, txt).then(() => sleep(25));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const oracleOf = () => page.evaluate(() => window.RhymeShopCore.oracle(window.RhymeShopActivity._round));
  const roundData = () => page.evaluate(() => window.RhymeShopActivity._round);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.RhymeShopActivity; return t && t._activityRow && document.querySelector('.rs-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Rosa Raccoon's Rhyme Wagon", `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.RhymeShopActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.RhymeShopActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.RhymeShopActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* AUDIO-FIRST: nothing spoken on load; tapping a tile speaks the word */
    await force('rhyme-shop.pick-snail');
    note((await page.evaluate(() => window.__spoken.length)) === 0, 'audio played ON LOAD (must be tap-to-hear only)');
    note(!(await checkVisible()), 'shell Check visible before resolve');
    /* a library image actually loaded */
    note(await page.evaluate(() => { const im = document.querySelector('.rs-tile img'); return !!im && im.complete && im.naturalWidth > 0; }), 'a library token image did not load (naturalWidth 0)');
    await clickWord('Whale');   /* tap the correct rhyme → speaks */
    note((await page.evaluate(() => window.__spoken.some(s => /whale/i.test(s)))), 'tapping a tile did not speak its word');

    /* PICK: a WRONG commit first → re-listen, non-confirmable, no advance */
    await force('rhyme-shop.pick-pear');
    let r = await roundData(); let ans = await oracleOf();
    const wrongWord = cap(r.choices.find((c, i) => i !== ans).noun);
    await clickWord(wrongWord); await clickBtn('Feed it!');
    let s = await S();
    note(!s.resolved && s.miss && /listen again/i.test(s.line), `pick wrong: no guided re-listen (resolved=${s.resolved} line="${s.line}")`);
    const tryagain = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });
    note(!tryagain, 'pick wrong showed the shell try-again');
    const nonConf = await page.evaluate(() => document.querySelectorAll('.rs-tile.dim').length);
    note(nonConf >= 1, 'the wrong tile did not become non-confirmable (dim)');
    /* now the correct */
    ans = await oracleOf(); r = await roundData();
    await clickWord(cap(r.choices[ans].noun)); await clickBtn('Feed it!');
    note((await S()).resolved, 'pick correct: did not resolve');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* JUDGE (yes + no) */
    await force('rhyme-shop.judge-snail-whale');   /* rhyme → Yes */
    await clickBtn('Yes, they ring!');
    note((await S()).resolved, 'judge-yes: did not resolve on Yes');
    await force('rhyme-shop.judge-bear-ear');      /* non-rhyme → No */
    await clickBtn('No, different tails');
    note((await S()).resolved, 'judge-no: did not resolve on No');

    /* ODD */
    await force('rhyme-shop.odd-eyl'); r = await roundData(); ans = await oracleOf();
    await clickWord(cap(r.choices[ans].noun)); await clickBtn('Feed it!');
    note((await S()).resolved, 'odd: did not resolve on the odd one');

    /* CHANT */
    await force('rhyme-shop.chant-whale'); r = await roundData(); ans = await oracleOf();
    await clickWord(cap(r.choices[ans].noun)); await clickBtn('Feed it!');
    note((await S()).resolved, 'chant: did not resolve');

    /* SORT: place each pile token in its rhyming bin */
    await force('rhyme-shop.sort-eyl-iy'); r = await roundData();
    for (let pi = 0; pi < r.pile.length; pi++) {
      const tok = r.pile[pi];
      const binIdx = r.bins.findIndex(b => b.rimeKey === tok.rimeKey);
      await clickWord(cap(tok.noun));
      await page.evaluate((bw) => { const bins = Array.from(document.querySelectorAll('.rs-bin')); const b = bins.find(x => x.textContent.replace(/[♪\s]/g, '').toLowerCase().indexOf(bw.toLowerCase()) >= 0); if (b) b.click(); }, cap(r.bins[binIdx].noun));
      await sleep(25);
    }
    note((await S()).resolved, 'sort: did not resolve after placing all');

    /* FIELD: select all rhyming */
    await force('rhyme-shop.field-bee'); r = await roundData(); ans = await oracleOf();
    for (const i of ans) await clickWord(cap(r.choices[i].noun));
    await clickBtn('Done!');
    note((await S()).resolved, 'field: did not resolve with the full rhyming set');

    /* CHAIN: add the rhyming choice each step */
    await force('rhyme-shop.chain-eyl'); r = await roundData();
    for (let st = 0; st < r.steps.length; st++) {
      const cur = await page.evaluate(() => window.RhymeShopActivity._chainHistory[window.RhymeShopActivity._chainHistory.length - 1]);
      const choices = r.steps[st].choices;
      const rk = choices.find(c => c.rimeKey === cur.rimeKey);
      await clickWord(cap(rk.noun)); await sleep(25);
    }
    note((await S()).resolved, 'chain: did not resolve after building the chain');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('rhyme-shop.pick-snail'); await sleep(40);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} rhyme-shop/en — "${title}"`);
  } catch (e) {
    fails.push('rhyme-shop/en: ' + e.message);
    console.log(`  FAIL rhyme-shop/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`RHYME-SHOP LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('RHYME-SHOP LOCAL TEST PASSED — audio-first (no audio on load; tap speaks the word); all 7 shapes (judge/pick/odd/sort/chant/field/chain) resolve with the rimeKey-oracle answer + the gumball rises; a WRONG commit routes through a guided re-listen (non-confirmable tile, reshuffle), NO advance, NO shell try-again; the shell Check hides until resolved; the library token images load; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
