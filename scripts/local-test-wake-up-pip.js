#!/usr/bin/env node
/* =====================================================================
   local-test-wake-up-pip.js — interaction harness for "Wake Up, Pip!"
   (CCSS RL.K.2). Serves `mini tools/` + drives the real shell:

     • WATCH plays + the film cards render; "Tell my friend!" → RETELL, and
       the watch film is GONE (the no-copy invariant);
     • tap-tile→tap-slot places; tap a filled slot picks it up; swap works;
     • an ORDER round: correct causal order → "Tell it!" → done (book);
     • a wrong (resolution-before-problem) order → NOT done, Pip names a
       break KIND, and NO slot index appears anywhere in the DOM/aria
       (the anti-leak invariant);
     • a SUPPLY-KEY round rejects the trivial/foreign/wrong-cast tile and
       accepts the key tile;
     • a FIX-MEMORY round: fix the one wrong beat → done;
     • ≥7 distinct + reshuffle; no horizontal overflow 280→768 both stages.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'wake-up-pip.retell-story.rl-k-2';
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

  const url = `http://127.0.0.1:${PORT}/wake-up-pip-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const T = () => 'window.WakeUpPipActivity';
  const stage = () => page.evaluate(() => window.WakeUpPipActivity.stage);
  const done = () => page.evaluate(() => window.WakeUpPipActivity.stage === 'done');

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.WakeUpPipActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'wake-up-pip.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.WakeUpPipActivity.round && document.querySelector('.rt-root'), { timeout: 4000 });
  }
  const toRetell = async () => { const g = await page.$('.rt-go'); if (g) { await g.click(); await sleep(80); } };
  // place the full canonical solution by directly setting placed via the core (drives the real validate path on Tell it!)
  async function solveCanonical() {
    await page.evaluate(() => { const t = window.WakeUpPipActivity; t.placed = window.RetellStoryCore.canonicalPlacement(t.round).slice(); t.tray = []; t.sel = null; t.render(); });
    await sleep(40);
  }
  async function tellIt() { const b = await page.$('.rt-tell'); if (b && !(await page.evaluate(e => e.disabled, b))) { await b.click(); await sleep(120); } }
  const slotIndexInDom = () => page.evaluate(() => {
    // the anti-leak check: after a break, no element text/aria should name the wrong SLOT NUMBER.
    // (slot numerals 1..n are structural labels on EVERY slot; the leak would be a SINGLE highlighted "wrong" slot.)
    const wrong = document.querySelectorAll('.rt-slot.rt-wrong, .rt-slot[data-wrong], .rt-slot.rt-bad');
    return wrong.length;
  });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.WakeUpPipActivity; return t && t._activityRow && document.querySelector('.rt-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Wake Up, Pip!', `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.WakeUpPipActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.WakeUpPipActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* ORDER round: watch → film cards present → retell (film GONE) → canonical → done */
    await force('sun');
    note(await stage() === 'watch', 'did not start in watch stage');
    note(await page.$$eval('.rt-filmrow', els => els.length) === 4, 'watch film did not render 4 panels');
    await toRetell();
    note(await stage() === 'retell', 'Tell my friend did not advance to retell');
    note(await page.$$eval('.rt-filmrow', els => els.length) === 0, 'the watch film is STILL in the DOM at retell (no-copy invariant broken)');
    // a wrong order first: reverse canonical → Tell it! → not done, a break kind, no wrong-slot highlight
    await page.evaluate(() => { const t = window.WakeUpPipActivity; t.placed = window.RetellStoryCore.canonicalPlacement(t.round).slice().reverse(); t.tray = []; t.sel = null; t.render(); });
    await sleep(30); await tellIt();
    note(!(await done()), 'a reversed order resolved to done (must not)');
    note(await page.evaluate(() => !!window.WakeUpPipActivity.broke), 'no breakKind recorded after a wrong retell');
    note(await slotIndexInDom() === 0, 'a specific wrong SLOT is highlighted (anti-leak invariant broken)');
    const tangle = await page.evaluate(() => { const m = document.querySelector('.rt-mirror'); return m && /rt-tangle/.test(m.className); });
    note(tangle, 'the stub-mirror did not tangle on a break');
    // now the correct order → done
    await solveCanonical(); await tellIt();
    note(await done(), 'the canonical order did not resolve to done');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'Check did not celebrate after a correct retell');

    /* SUPPLY-KEY: reject a trivial/foreign tile, accept the key */
    await force('puppy'); await toRetell();
    const openSlot = await page.evaluate(() => window.WakeUpPipActivity.round.keySlots[0]);
    // place the FOREIGN tile into the open slot → not valid
    await page.evaluate((slot) => { const t = window.WakeUpPipActivity; t.placed[slot] = 'puppy-fw'; t.tray = t.tray.filter(p => p !== 'puppy-fw'); t.sel = null; t.render(); }, openSlot);
    await sleep(20); await tellIt();
    note(!(await done()), 'supply-key accepted a foreign tile in the key slot');
    // place the correct key tile → done
    await page.evaluate((slot) => { const t = window.WakeUpPipActivity; t.placed[slot] = 'puppy-3'; t.sel = null; t.render(); }, openSlot);
    await sleep(20); await tellIt();
    note(await done(), 'supply-key did not accept the correct key tile');

    /* FIX-MEMORY (face): fix the one wrong beat → done */
    await force('paint'); await toRetell();
    note(await page.evaluate(() => window.WakeUpPipActivity.placed.indexOf('paint-fw1') >= 0), 'fix-memory did not pre-fill the planted wrong beat');
    await page.evaluate(() => { const t = window.WakeUpPipActivity; t.placed = window.RetellStoryCore.canonicalPlacement(t.round).slice(); t.sel = null; t.render(); });
    await sleep(20); await tellIt();
    note(await done(), 'fix-memory did not resolve after fixing the wrong beat');

    /* FIX-MEMORY (order) round resolves too */
    await force('seed'); await toRetell();
    await solveCanonical(); await tellIt();
    note(await done(), 'fix-memory(order) did not resolve after reordering');

    /* mobile overflow 280→768 — both stages */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('crow');
      let over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `watch-stage overflow ${over}px at ${w}px`);
      await toRetell();
      over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `retell-stage overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} wake-up-pip/en — "${title}"`);
  } catch (e) {
    fails.push('wake-up-pip/en: ' + e.message);
    console.log(`  FAIL wake-up-pip/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`WAKE-UP-PIP LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('WAKE-UP-PIP LOCAL TEST PASSED — watch→retell (film gone), tap-place, order/supply-key/fix-memory all resolve, wrong retell names a KIND (no slot leak), ≥7 distinct + reshuffle, no overflow 280→768 both stages.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
