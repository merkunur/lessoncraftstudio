#!/usr/bin/env node
/* =====================================================================
   local-test-sunny-side-diner.js — interaction harness for "Sunny-Side
   Diner" (CCSS L.K.1.F). Serves `mini tools/` + drives the real shell:

     • tray-gather completes → "say the whole order back" → read-back, and
       the order-pad MODEL is GONE (the anti-copying invariant, fix #1/#6);
     • "Say it back" is DISABLED until all slots filled + the coupler placed
       (completeness gate); dropping the coupler → not valid (halves apart);
     • a complete-correct read-back → done (assemble);
     • the robot-repair fixes the wrong item → done;
     • the extend grows the frame + adds the item → done;
     • ≥7 distinct + reshuffle; no horizontal overflow 280→768 (both phases).
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sunny-side-diner.compound-order.l-k-1-f';
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

  const url = `http://127.0.0.1:${PORT}/sunny-side-diner-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const phase = () => page.evaluate(() => window.SunnySideDinerActivity.phase);
  const done = () => page.evaluate(() => window.SunnySideDinerActivity.phase === 'done');

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SunnySideDinerActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'sunny-side-diner.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SunnySideDinerActivity.round && document.querySelector('.sd-diner'), { timeout: 4000 });
  }

  async function gatherAndAdvance() {
    await page.evaluate(() => {
      const T = window.SunnySideDinerActivity;
      T.activeOrder.items.forEach(it => { for (let k = 0; k < it.quantity; k++) { const chip = [...document.querySelectorAll('.sd-palette .sd-foodchip')].find(b => b.getAttribute('aria-label') === it.food); if (chip) chip.click(); } });
    });
    await sleep(60);
    const go = await page.$('.sd-go'); if (go) { await go.click(); await sleep(80); }
  }
  // fill the read-back; placeCoupler=false leaves the coupler out (for the gate test)
  async function fillReadback(placeCoupler) {
    return await page.evaluate((withCoupler) => {
      const T = window.SunnySideDinerActivity, Core = window.CompoundOrderCore;
      const items = T.activeOrder.items;
      for (let i = 0; i < items.length; i++) {
        if (!T.assembled.slots[i]) { const chip = [...document.querySelectorAll('.sd-rail .sd-foodchip')].find(b => b.getAttribute('aria-label') === items[i].food); if (!chip) return 'no rail chip for ' + items[i].food; chip.click(); }
      }
      for (let i = 0; i < items.length; i++) { let g = 0; while (T.assembled.slots[i] && T.assembled.slots[i].count !== items[i].quantity && g++ < 5) { const b = document.querySelectorAll('.sd-slot-full .sd-count'); if (!b[i]) break; b[i].click(); } }
      if (withCoupler && Core.needsCoupler(T.activeOrder) && !T.assembled.coupler) { const c = document.querySelector('.sd-coupler') || document.querySelector('.sd-couplerslot'); if (c) c.click(); }
      return 'ok';
    }, placeCoupler);
  }
  const sayDisabled = () => page.evaluate(() => { const b = document.querySelector('.sd-say'); return !b || b.disabled; });
  async function clickSay() { const b = await page.$('.sd-say'); if (b) { await b.click(); await sleep(100); } }
  const padPresent = () => page.evaluate(() => !!document.querySelector('[data-role="order-pad"]'));

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SunnySideDinerActivity; return t && t._activityRow && document.querySelector('.sd-diner') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Sunny-Side Diner', `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.SunnySideDinerActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.SunnySideDinerActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    const reshuffled = ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',');
    note(reshuffled || N < 2, 'second pass did not reshuffle');

    /* ASSEMBLE: tray-gather → read-back (pad GONE) → coupler gate → done */
    await force('asm-pancake-milk');
    note(await padPresent(), 'order-pad missing in the tray phase');
    await gatherAndAdvance();
    note(await phase() === 'read-back', 'gathering the tray did not advance to read-back');
    note(!(await padPresent()), 'the order-pad MODEL is still in the DOM at read-back (anti-copying invariant broken)');
    // fill foods+counts but NOT the coupler → Say it back must stay disabled
    await fillReadback(false);
    note(await sayDisabled(), '"Say it back" enabled with the coupler dropped (the conjunction is not obligatory)');
    note(!(await done()), 'a coupler-less read-back resolved (must not)');
    // place the coupler → enabled → done
    await page.evaluate(() => { const c = document.querySelector('.sd-coupler') || document.querySelector('.sd-couplerslot'); if (c) c.click(); });
    await sleep(60);
    note(!(await sayDisabled()), '"Say it back" still disabled after placing the coupler');
    await clickSay();
    note(await done(), 'a complete-correct read-back did not resolve to done');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'Check did not celebrate after a correct order');

    /* INSERT-AND: halves pre-filled, just place the coupler */
    await force('ins-cookie-milk');
    await gatherAndAdvance();
    note(await sayDisabled(), 'insert-and: Say it back enabled before the coupler is placed');
    await fillReadback(true);
    await clickSay();
    note(await done(), 'insert-and: placing the coupler did not resolve to done');

    /* REPAIR: the robot pre-filled a wrong food → swap it */
    await force('rep-egg-milk');
    await gatherAndAdvance();
    // clear the wrong slot (slot 1 = juice, should be milk), then refill correctly
    await page.evaluate(() => { const T = window.SunnySideDinerActivity; T.assembled.slots[T.round.robotError.slot] = null; T.activeSlot = T.round.robotError.slot; T.render(); });
    await sleep(50);
    await fillReadback(true);
    await clickSay();
    note(await done(), 'repair: fixing the robot\'s wrong item did not resolve to done');

    /* EXTEND: base read-back → grows → fill the 3rd → done */
    await force('ext-pancake-milk-egg');
    await gatherAndAdvance();
    await fillReadback(true);
    await clickSay();
    note(await phase() === 'read-back' && await page.evaluate(() => window.SunnySideDinerActivity.extended), 'extend: the first complete read-back did not grow the order');
    note(await page.evaluate(() => window.SunnySideDinerActivity.assembled.slots.length === 3), 'extend: the frame did not grow a 3rd slot');
    await fillReadback(true);
    await clickSay();
    note(await done(), 'extend: filling the grown 3-item order did not resolve to done');

    /* mobile overflow 280→768 — BOTH phases */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('asm-egg-juice');
      let over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `tray-phase horizontal overflow ${over}px at ${w}px`);
      await gatherAndAdvance();
      over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `read-back horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} sunny-side-diner/en — "${title}"`);
  } catch (e) {
    fails.push('sunny-side-diner/en: ' + e.message);
    console.log(`  FAIL sunny-side-diner/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SUNNY-SIDE DINER LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SUNNY-SIDE DINER LOCAL TEST PASSED — tray→read-back (pad hidden), coupler obligatory (Say-it-back gated on completeness), assemble/insert-and/repair/extend all resolve, ≥7 distinct + reshuffle, no overflow 280→768 both phases.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
