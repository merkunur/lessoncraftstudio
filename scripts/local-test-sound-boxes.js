#!/usr/bin/env node
/* =====================================================================
   local-test-sound-boxes.js — interaction harness (RF.K.2.d phoneme isolation,
   "Coco's Sound Boxes"). Serves `mini tools/` + `image-library-webp/` + drives:

     • the target picture + 3 Elkonin boxes (target-position box highlighted) +
       "Hear it" + 3 candidate picture tiles render; ALL images load (no 404).
     • tapping a non-match does NOT resolve (warm nudge, no advance); tapping the
       matching picture resolves + shows the same-sound note; shell Check hidden
       until resolved.
     • the highlighted box matches the round's position; EN-only; ≥7 distinct +
       reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sound-boxes.phoneme-position.rf-k-2-d';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png' };

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

  const url = `http://127.0.0.1:${PORT}/sound-boxes-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.SoundBoxesActivity._resolved, miss: !!document.querySelector('.sb-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SoundBoxesActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SoundBoxesActivity._round && document.querySelector('.sb-root'), { timeout: 4000 });
    await sleep(60);
  }
  const tapOi = (oi) => page.evaluate((i) => { const b = Array.from(document.querySelectorAll('.sb-choice')).find(x => +x.getAttribute('data-oi') === i); if (b) b.click(); return !!b; }, oi).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const oracleOi = (id) => page.evaluate((rid) => { const t = window.SoundBoxesActivity, r = t._pool.find(x => x.id === rid), C = window.SoundBoxesCore; return C.oracle(r); }, id);
  const nonOi = (id) => page.evaluate((rid) => { const t = window.SoundBoxesActivity, r = t._pool.find(x => x.id === rid), C = window.SoundBoxesCore; for (let i = 0; i < r.options.length; i++) if (!C.isAnswer(r, i)) return i; return -1; }, id);
  const allImagesLoaded = () => page.evaluate(() => { const imgs = Array.from(document.querySelectorAll('.sb-root img')); return imgs.length > 0 && imgs.every(im => im.complete && im.naturalWidth > 0); });

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SoundBoxesActivity; return t && t._activityRow && document.querySelector('.sb-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(/Sound Boxes/i.test(title), `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.SoundBoxesActivity._activityRow.slug));
    note(slugKeys.length === 1 && slugKeys[0] === 'en', `manifest not EN-only: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.SoundBoxesActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.SoundBoxesActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');

    /* a medial round: target pic + 3 boxes (middle highlighted) + Hear + 3 option pics; images load */
    await force('sb-sun-mid');
    await sleep(120);
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/middle sound/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => !!document.querySelector('.sb-target img')), 'the target picture did not render');
    note(await page.evaluate(() => document.querySelectorAll('.sb-box').length === 3), 'expected 3 Elkonin boxes');
    note(await page.evaluate(() => { const bx = document.querySelectorAll('.sb-box'); return bx[1] && bx[1].classList.contains('is-target'); }), 'the MIDDLE box is not highlighted for a medial round');
    note(await page.evaluate(() => document.querySelectorAll('.sb-choice').length === 3), 'expected 3 picture options');
    note(await page.evaluate(() => !!document.querySelector('.sb-hear')), 'the Hear-it button did not render');
    note(await allImagesLoaded(), 'not all pictures loaded (404 / broken image)');

    const non = await nonOi('sb-sun-mid');
    await tapOi(non);
    note(!(await S()).resolved, 'a non-match resolved');
    note((await S()).miss, 'wrong gave no nudge');
    const oi = await oracleOi('sb-sun-mid');
    await tapOi(oi);
    note((await S()).resolved, 'the matching picture did not resolve');
    note(await page.evaluate(() => { const m = document.querySelector('.sb-msg'); return m && /same middle sound/i.test(m.textContent); }), 'the same-sound note did not show');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a first-sound round: leftmost box highlighted */
    await force('sb-cat-first');
    note(await page.evaluate(() => { const bx = document.querySelectorAll('.sb-box'); return bx[0] && bx[0].classList.contains('is-target'); }), 'the FIRST box is not highlighted for an initial round');
    const oi2 = await oracleOi('sb-cat-first');
    await tapOi(oi2);
    note((await S()).resolved, 'first-sound round: match did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('sb-van-last'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} sound-boxes/en — "${title}"`);
  } catch (e) {
    fails.push('sound-boxes/en: ' + e.message);
    console.log(`  FAIL sound-boxes/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`SOUND-BOXES LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('SOUND-BOXES LOCAL TEST PASSED — phoneme isolation: target picture + 3 Elkonin boxes (position-correct highlight) + Hear-it + 3 picture options render + all images load; a non-match does NOT resolve (warm nudge); the matching picture resolves + shows the same-sound note; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
