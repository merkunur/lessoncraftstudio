#!/usr/bin/env node
/* =====================================================================
   local-test-otto-picture-book.js — interaction harness for "Otto's
   Picture Book" (CCSS RL.K.7). Serves `mini tools/` + drives the real shell:

     • the spread renders 4 picture choices + the target "part" text + a
       "Hear the story" button;
     • tapping the CORRECT picture → shell Check → celebrate (the target
       beat's illustration is accepted);
     • tapping a WRONG picture → shell Check → tryagain, and NO card is
       marked correct/wrong (the diffuse-feedback / no-leak invariant);
     • the choice cards carry NO caption text (aria-label = "Picture N"),
       so the answer can't be read off the choices;
     • tap-to-deselect works;
     • ≥7 distinct rounds + reshuffle; no horizontal overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'otto-picture-book.which-picture.rl-k-7';
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

  const url = `http://127.0.0.1:${PORT}/otto-picture-book-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.OttoPictureBookActivity, n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'otto-picture-book.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.OttoPictureBookActivity.round && document.querySelector('.opb-root'), { timeout: 4000 });
    await sleep(40);
  }
  const correctIdx = () => page.evaluate(() => window.PictureMomentCore.correctIndex(window.OttoPictureBookActivity.round));
  const tapCard = (i) => page.evaluate((idx) => { const c = document.querySelector('.opb-card[data-i="' + idx + '"]'); if (c) c.click(); }, i).then(() => sleep(40));
  const check = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.disabled) c.click(); }).then(() => sleep(120));
  const celebrated = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
  const triedAgain = () => page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('tryagain')); });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.OttoPictureBookActivity; return t && t._activityRow && document.querySelector('.opb-root') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === "Otto's Picture Book", `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.OttoPictureBookActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.OttoPictureBookActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* a round: structure + correct → celebrate */
    await force('boat');
    note(await page.$$eval('.opb-card', els => els.length) === 4, 'did not render 4 picture choices');
    note(!!(await page.$('.opb-hear')), 'no "Hear the story" button');
    const partTxt = await page.$eval('.opb-parttxt', e => e.textContent.trim()).catch(() => '');
    const targetCap = await page.evaluate(() => window.PictureMomentCore.targetCaption(window.OttoPictureBookActivity.round));
    note(partTxt === targetCap, `the "part" text "${partTxt}" != target caption "${targetCap}"`);
    // choice cards must NOT carry the caption text (no answer leak): aria-label = "Picture N", body = number+emoji only
    const labels = await page.$$eval('.opb-card', els => els.map(e => e.getAttribute('aria-label')));
    note(labels.every(l => /^Picture \d+$/.test(l || '')), `a choice card aria-label leaks content: ${JSON.stringify(labels)}`);
    const cardHasCaption = await page.evaluate((cap) => Array.from(document.querySelectorAll('.opb-card')).some(c => c.textContent.indexOf(cap.slice(0, 8)) >= 0), targetCap);
    note(!cardHasCaption, 'a choice card shows the caption text (answer leak)');

    // correct pick → Check → celebrate
    await tapCard(await correctIdx());
    note(await page.evaluate(() => window.PictureMomentCore.grade(window.OttoPictureBookActivity.round, window.OttoPictureBookActivity.sel)), 'selecting the correct card did not set a winning selection');
    await check();
    note(await celebrated(), 'correct pick did not celebrate');

    /* a wrong pick → tryagain, no card marked correct/wrong (diffuse feedback) */
    await force('nest');
    const ci = await correctIdx();
    await tapCard((ci + 1) % 4);
    await check();
    note(await triedAgain(), 'a wrong pick did not show try-again');
    note(!(await celebrated()), 'a wrong pick celebrated (must not)');
    const leak = await page.$$eval('.opb-card', els => els.filter(e => /opb-correct|opb-right|opb-wrong|opb-bad/.test(e.className)).length);
    note(leak === 0, 'a card is marked correct/wrong after a wrong pick (answer leak)');

    /* tap-to-deselect */
    await force('apple');
    const ci2 = await correctIdx();
    await tapCard(ci2);
    note(await page.evaluate(() => !!window.OttoPictureBookActivity.sel), 'first tap did not select');
    await tapCard(ci2);
    note(await page.evaluate(() => !window.OttoPictureBookActivity.sel), 'second tap did not deselect');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('snowman');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} otto-picture-book/en — "${title}"`);
  } catch (e) {
    fails.push('otto-picture-book/en: ' + e.message);
    console.log(`  FAIL otto-picture-book/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`OTTO-PICTURE-BOOK LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('OTTO-PICTURE-BOOK LOCAL TEST PASSED — 4 choices + part text + Hear-the-story; correct pick celebrates; wrong pick = try-again with NO card marked (diffuse, no leak); choices carry no caption; tap-to-deselect; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
