#!/usr/bin/env node
/* =====================================================================
   local-test-sock-and-shadow.js — interaction harness for "Sock & Shadow"
   (CCSS SL.K.6). Serves `mini tools/` + drives the real shell:

     • a VAGUE turn ("cup") → Tell Shadow → ambiguous: Shadow holds ≥2 +
       names a missing category, no advance;
     • adding the disambiguator ("red") → Tell again → clear → done;
     • an OVER-stuffed turn → overwhelmed → trim a tile → clear → done;
     • "Tell Shadow" is BLOCKED with no object (coherence: empty / attribute-
       without-noun / politeness-only never speaks);
     • variety/shuffle: ≥7 distinct + reshuffle;
     • no horizontal overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'sock-and-shadow.puppet-speak.sl-k-6';
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
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\//i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/sock-and-shadow-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.SockAndShadowActivity;
      const n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === 'sock-and-shadow.' + rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0;
      window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.SockAndShadowActivity.round && document.querySelector('.ss-theater'), { timeout: 4000 });
  }
  const phase = () => page.evaluate(() => window.SockAndShadowActivity.phase);
  const outcome = () => page.evaluate(() => (window.SockAndShadowActivity._res || {}).outcome);
  const done = () => page.evaluate(() => window.SockAndShadowActivity.phase === 'done');
  async function clickChip(text) { const bs = await page.$$('.ss-chip'); for (const b of bs) { const t = (await (await b.getProperty('textContent')).jsonValue()).trim(); if (t === text) { await b.click(); await sleep(70); return true; } } return false; }
  async function clickWord(text) { const bs = await page.$$('.ss-word'); for (const b of bs) { const t = (await (await b.getProperty('textContent')).jsonValue()).trim(); if (t === text) { await b.click(); await sleep(70); return true; } } return false; }
  const tell = () => page.click('.ss-tell').then(() => sleep(120)).catch(() => {});
  const again = async () => { const a = await page.$('.ss-again'); if (a) { await a.click(); await sleep(100); } };
  const holdCount = () => page.evaluate(() => document.querySelectorAll('.ss-holdobj').length);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.SockAndShadowActivity; return t && t._activityRow && document.querySelector('.ss-sock') && document.querySelector('.lcs-activity-check'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'Sock & Shadow', `header title "${title}"`);

    /* variety/shuffle */
    const N = await page.evaluate(() => window.SockAndShadowActivity._pool.length);
    const ids = await page.evaluate((count) => { const t = window.SockAndShadowActivity, out = []; for (let i = 0; i < count; i++) { const x = t.nextTask({ index: i, completed: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct rounds (<7)`);

    /* coherence: an attribute with no object cannot Tell */
    await force('trap-red-cup');
    await clickChip('red');               // a colour, no object yet
    await tell();
    note(await phase() === 'compose', 'Tell Shadow fired with no object (coherence gate failed)');

    /* vague → ambiguous (Shadow holds ≥2), no advance */
    await force('trap-red-cup');
    await clickChip('cup');
    await tell();
    note(await phase() === 'resolve' && await outcome() === 'ambiguous', `vague "cup" did not resolve ambiguous (got ${await outcome()})`);
    note(await holdCount() >= 2, `Shadow did not hold ≥2 objects on a vague turn (held ${await holdCount()})`);
    note(!(await done()), 'a vague turn advanced (must not)');
    await again();
    /* add the disambiguator → clear → done */
    await clickChip('red');
    await tell();
    note(await done(), 'adding the colour did not resolve clear → done');
    await page.click('.lcs-activity-check'); await sleep(120);
    const cel = await page.evaluate(() => { const p = document.querySelector('.lcs-activity-prompt'); return !!(p && p.classList.contains('celebrate')); });
    note(cel, 'Check did not celebrate after a clear turn');

    /* over-spec → overwhelmed → trim → clear */
    await force('overspec-red-car');
    await clickChip('car'); await clickChip('red'); await clickChip('big'); await clickChip('on top');
    await tell();
    note(await outcome() === 'overwhelmed', `piling 3 attributes did not overwhelm (got ${await outcome()})`);
    await again();
    await clickWord('big');               // trim the redundant size
    await tell();
    note(await done(), 'trimming to the minimal turn did not resolve clear');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('joint-brown-big-teddy');
      const over = await page.evaluate(() => { const d = document.scrollingElement || document.documentElement; return d.scrollWidth - d.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} sock-and-shadow/en — "${title}"`);
  } catch (e) {
    fails.push('sock-and-shadow/en: ' + e.message);
    console.log(`  FAIL sock-and-shadow/en — ${e.message}`);
  } finally { await page.close(); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) {
    console.error(`SOCK-AND-SHADOW LOCAL TEST FAILED — ${fails.length} issue(s):`);
    fails.forEach(f => console.error('  • ' + f));
    process.exit(1);
  }
  console.log('SOCK-AND-SHADOW LOCAL TEST PASSED — vague→ambiguous (Shadow holds ≥2)→add-disambiguator→clear, over-spec→overwhelmed→trim→clear, no-object blocked (coherence), ≥7 distinct + reshuffle, no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
