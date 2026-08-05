#!/usr/bin/env node
/* =====================================================================
   shoot-learning-clock.js — the QA renders a human reads.

   ⭐ THE RENDERS ARE NOT A FORMALITY. Three defects in this rebuild were
   found ONLY by looking: the hand blades started on the tip side of the
   pivot (so each hand floated clear of the hub with its counterweight
   bobbing at the far end); the two-tone tick rendered as twelve coral
   blobs because a round linecap bleeds a 24-wide stroke back 12 units at
   each end; and the hour counterweight read as heavy as the blade, i.e.
   a three-hand clock at a glance. No assertion in the suite failed on
   any of them.

   Run:  node scripts/shoot-learning-clock.js [--paid] [--lang=de]
   Out:  docs/audit-results/learning-clock/qa/
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const OUT = path.join(REPO, 'docs', 'audit-results', 'learning-clock', 'qa');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const argv = process.argv.slice(2);
const val = f => (argv.find(a => a.indexOf(f + '=') === 0) || '').split('=')[1];
const LANG = val('--lang') || 'en';
const PAID = argv.indexOf('--paid') >= 0;

const WIDTHS = [320, 360, 412, 768, 1024, 1366];
const sleep = ms => new Promise(r => setTimeout(r, ms));

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p === '/') p = '/learning-clock.html';
    if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length); else p = p.replace(/^\//, '');
    fs.readFile(path.join(MINI, p), (e, b) => {
      if (e) { res.statusCode = 404; res.end('nf'); return; }
      res.setHeader('Content-Type', MIME[path.extname(p)] || 'application/octet-stream');
      res.end(b);
    });
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = serve();
  await new Promise(r => srv.listen(0, r));
  const PORT = srv.address().port;
  const URL = `http://127.0.0.1:${PORT}/mini-tools/learning-clock.html?lang=${LANG}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const w of WIDTHS) {
    const page = await browser.newPage();
    /* ⚠ START TALL, THEN FIT. `.lcs-app` is height:100%;overflow:hidden,
       so a short viewport CROPS the card and the shot reads as a layout
       that simply ends — the first 360 render stopped at the 4 o'clock
       mark. Measuring the content and resizing to it reproduces exactly
       what the embed shows, because the iframe is sized the same way. */
    await page.setViewport({ width: w, height: 2000, hasTouch: true, deviceScaleFactor: 1 });
    if (PAID) {
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem('lcs:learning-clock:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, ourTimes: [] }));
        localStorage.setItem('accessToken', 'test');
      });
    }
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.lck-svg');
    /* ⚠ PRIMING localStorage IS NOT ENOUGH. _fetchEntitlement calls
       /api/auth/me, the local server answers 404, the promise RESOLVES
       (so .catch never runs) and the tool correctly settles to free —
       which is right in production and useless for a paid render. Force
       the tier on the tool itself, the audit-tool-print-sheets prime()
       pattern. */
    if (PAID) await page.evaluate(() => { const T = window.LearningClock; T.premium = true; T.premiumKnown = true; T.render(); });
    await sleep(400);
    const h = await page.evaluate(() => {
      const hd = document.querySelector('.lcs-header').getBoundingClientRect();
      const wr = document.querySelector('.lck-wrap').getBoundingClientRect();
      return Math.ceil(hd.height + wr.height + 46);
    });
    await page.setViewport({ width: w, height: h, hasTouch: true, deviceScaleFactor: 1 });
    await sleep(400);
    const tag = `${PAID ? 'paid' : 'free'}-${LANG}-${w}`;
    /* ⚠ SHOOT THE CARD, NOT THE VIEWPORT. lcs-shell.css sets
       `html,body{overflow:hidden}`, so `fullPage:true` silently CROPS at
       the viewport height and the render looks fine while the dock is
       missing — the first 360 shot stopped at the 4 o'clock mark and read
       as a layout that simply ended there. The card is also exactly what
       the embed shows, since the iframe is sized from its height. */
    const card = await page.$('.lcs-app');
    await card.screenshot({ path: path.join(OUT, `v2-${tag}.png`) });
    console.log('  shot ' + tag);
    await page.close();
  }

  /* the two other modes, at the desktop width the operator actually uses */
  if (PAID) {
    for (const mode of ['task', 'elapsed']) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1024, height: 900, hasTouch: true });
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem('lcs:learning-clock:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() }, ourTimes: [] }));
        localStorage.setItem('accessToken', 'test');
      });
      await page.goto(URL, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.lck-svg');
      await page.evaluate(() => { const T = window.LearningClock; T.premium = true; T.premiumKnown = true; T.render(); });
      await sleep(400);
      await page.evaluate(m => {
        const b = document.querySelector('[data-fk="mode-' + m + '"]');
        if (b) b.click();
      }, mode);
      await sleep(500);
      if (mode === 'elapsed') {
        await page.evaluate(() => {
          const T = window.LearningClock;
          T.elapsed = { start: 710, end: null }; T.total = 20; T.render();
        });
        await sleep(300);
      }
      const h2 = await page.evaluate(() => {
        const hd = document.querySelector('.lcs-header').getBoundingClientRect();
        const wr = document.querySelector('.lck-wrap').getBoundingClientRect();
        return Math.ceil(hd.height + wr.height + 46);
      });
      await page.setViewport({ width: 1024, height: h2, hasTouch: true });
      await sleep(350);
      const c2 = await page.$(".lcs-app"); await c2.screenshot({ path: path.join(OUT, `v2-${mode}-1024.png`) });
      console.log('  shot ' + mode + '-1024');
      await page.close();
    }
  }

  await browser.close();
  srv.close();
  console.log('\nrenders → ' + OUT);
})().catch(e => { console.error(e); process.exit(1); });
