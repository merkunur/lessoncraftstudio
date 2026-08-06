#!/usr/bin/env node
/* =====================================================================
   local-test-rivets-number-forge.js — interaction harness for "Rivet's Number
   Forge" (CCSS K.CC.A.3). Serves `mini tools/` + drives the real shell:

     • COUNT→FORGE: tapping every treasure + the lever MINTS the right numeral +
       advances the frame; the page strip fills; the page gilds → solved.
     • WHEEZE: pulling the lever with nothing counted does NOT advance (treasure
       stays); no card minted.
     • 0-CASE: an empty frame mints "0" via the same lever.
     • SUBSET: tapping a non-target (decoy) does NOT count; only the kind counts.
     • VERIFY: the minted numeral is the TRUE count, not Rivet's wrong claim.
     • PARADE: tapping the marching object N times then the lever advances.
     • BUILD-MINT / REVERSE: +Add to the target, then the lever.
     • NO shell number-keypad / selectable glyph anywhere (answerType state).
     • ≥7 act-types + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'rivets-number-forge.numeral-album.k-cc-a-3';
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

  const url = `http://127.0.0.1:${PORT}/rivets-number-forge-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const solved = () => page.evaluate(() => window.RivetsNumberForgeActivity.solved);
  const minted = () => page.evaluate(() => window.RivetsNumberForgeActivity.cstate.minted.map(m => m.numeral));
  const frameIdx = () => page.evaluate(() => window.RivetsNumberForgeActivity.cstate.frameIdx);
  const clickSel = (sel) => page.evaluate((s) => { const b = document.querySelector(s); if (b) { b.click(); return true; } return false; }, sel).then(() => sleep(35));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.RivetsNumberForgeActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'rivets-number-forge.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.RivetsNumberForgeActivity.round && document.querySelector('.nf-root'), { timeout: 4000 });
  }
  async function forgeFrame() {
    const inf = await page.evaluate(() => { const t = window.RivetsNumberForgeActivity, C = window.NumeralAlbumCore; return { produce: C.isProduceAct(t.round), target: C.targetOf(t.cstate) }; });
    if (inf.produce) { for (let k = 0; k < inf.target; k++) await clickSel('.nf-add:not(.nf-minus)'); }
    else {
      let guard = 0;
      while (guard++ < 40) {
        const ready = await page.evaluate(() => { const t = window.RivetsNumberForgeActivity, C = window.NumeralAlbumCore; const need = C.targetOf(t.cstate); const got = t.act === 'parade' ? t.paradeIdx : C.countedSize(t.cstate); return got >= need; });
        if (ready) break;
        const ok = await page.evaluate(() => { const b = document.querySelector('.nf-obj:not(.nf-counted):not(.nf-obj-static):not(.nf-decoy)'); if (b) { b.click(); return true; } return false; });
        if (!ok) break; await sleep(15);
      }
    }
    await clickSel('.nf-lever'); await sleep(45);
  }
  async function solve(id, maxFrames) {
    await force(id);
    for (let g = 0; g < (maxFrames || 6) && !(await solved()); g++) await forgeFrame();
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.RivetsNumberForgeActivity; return t && t._activityRow && document.querySelector('.nf-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Rivet's Number Forge", `header title "${title}"`);

    /* NO shell number-keypad / selectable glyph (the rejected palette) */
    const keypad = await page.evaluate(() => document.querySelectorAll('.lcs-activity-key,.lcs-activity-keypad,.lcs-activity-choices').length);
    note(keypad === 0, `a shell number-keypad/choice palette is present (${keypad}) — the rejected glyph menu`);

    /* variety/shuffle + ≥7 act-types */
    const N = await page.evaluate(() => window.RivetsNumberForgeActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.RivetsNumberForgeActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    const acts = await page.evaluate(() => new Set(window.RivetsNumberForgeActivity._activityRow.params.rounds.map(r => r.act_type)).size);
    note(acts >= 7, `only ${acts} distinct act-types`);

    /* COUNT→FORGE — count-acorns page [5,2,4] */
    await force('count-acorns');
    await forgeFrame();
    note(await frameIdx() === 1, 'forging the first frame did not advance the page');
    note((await minted())[0] === '5', `first forged numeral was ${(await minted())[0]}, expected "5"`);

    /* WHEEZE — pull the lever with nothing counted (frame 2 = 2 acorns) */
    const fi = await frameIdx();
    await clickSel('.nf-lever');
    note(await frameIdx() === fi, 'a no-count lever pull advanced the frame (must wheeze)');
    const treasureStays = await page.evaluate(() => document.querySelectorAll('.nf-obj:not(.nf-obj-static)').length > 0);
    note(treasureStays, 'the treasure vanished after a wheeze (it must stay for the re-count)');

    /* finish the page → solved */
    for (let g = 0; g < 4 && !(await solved()); g++) await forgeFrame();
    note(await solved(), 'completing every frame did not gild the page (solve)');
    await clickSel('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'shell Check did not celebrate after a solved page');

    /* 0-CASE — card-of-nothing [3,0] → a minted "0" */
    await solve('card-of-nothing');
    note((await minted()).indexOf('0') >= 0, 'the empty pack did not mint a "0"');

    /* SUBSET — only-the-acorns: a decoy tap must NOT count */
    await force('only-the-acorns');
    const before = await page.evaluate(() => window.NumeralAlbumCore.countedSize(window.RivetsNumberForgeActivity.cstate));
    await clickSel('.nf-decoy');
    const afterDecoy = await page.evaluate(() => window.NumeralAlbumCore.countedSize(window.RivetsNumberForgeActivity.cstate));
    note(afterDecoy === before, 'tapping a decoy (non-target) counted it');
    await solve('only-the-acorns');
    note(await solved(), 'subset page did not complete by counting only the target kind');

    /* VERIFY — fix-rivets-card [5(claim6),4(claim3)] → mint the TRUE count, not the claim */
    await force('fix-rivets-card');
    await forgeFrame();
    note((await minted())[0] === '5', `verify minted ${(await minted())[0]}, expected the true "5" (not the claim 6)`);

    /* PARADE */
    await solve('the-parade');
    note(await solved(), 'parade page did not complete by tapping the marching objects');

    /* BUILD-MINT */
    await solve('build-the-card');
    note(await solved(), 'build-mint page did not complete by +Add to the dot target');
    note((await minted()).join(',') === '6,4', `build-mint minted ${(await minted()).join(',')}, expected 6,4`);

    /* REVERSE */
    await solve('fill-the-ticket');
    note(await solved(), 'reverse page did not complete by producing the ticket amount');

    /* mobile overflow 280→768 (teen ten-frame worst case) */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('count-teen'); await sleep(25);
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} rivets-number-forge/en — "${title}"`);
  } catch (e) {
    fails.push('rivets-number-forge/en: ' + e.message);
    console.log(`  FAIL rivets-number-forge/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`RIVETS-NUMBER-FORGE LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('RIVETS-NUMBER-FORGE LOCAL TEST PASSED — count→forge mints the right numeral + advances; a no-count lever wheezes (treasure stays); the empty pack mints "0"; a decoy does not count; verify mints the TRUE count not the claim; parade/build-mint/reverse complete; no shell keypad/glyph palette; ≥7 act-types + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
