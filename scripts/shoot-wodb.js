#!/usr/bin/env node
/* =====================================================================
   shoot-wodb.js — the renders I read myself.

   Gate 7 of the v4 suite is not a formality: on #43 every automated
   check was green while two circles sat on every mark, and it was
   reading the 768px render that found it. Shots land in
   docs/audit-results/wodb/qa/.

   Run:  node scripts/shoot-wodb.js
         node scripts/shoot-wodb.js --premium
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'audit-results', 'wodb', 'qa');
const PREMIUM = process.argv.includes('--premium');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json',
  '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };

function serve() {
  const roots = [path.join(ROOT, 'mini tools'), path.join(ROOT, 'frontend', 'public')];
  const srv = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/mini-tools\//, '/').replace(/^\//, '');
    for (const r of roots) {
      const f = path.join(r, rel);
      if (fs.existsSync(f) && fs.statSync(f).isFile()) {
        res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
        return fs.createReadStream(f).pipe(res);
      }
    }
    res.writeHead(404); res.end('nf');
  });
  return new Promise((r) => srv.listen(0, () => r({ srv, port: srv.address().port })));
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const { srv, port } = await serve();
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* the widths that matter: the phone, the iPad a teacher AirPlays from,
     and the projector. Plus 1440, because that is the operator's screen. */
  const SHOTS = [
    { name: 'board', w: 1024, h: 720, act: null },
    { name: 'board', w: 768, h: 1024, act: null },
    { name: 'board', w: 360, h: 780, act: null },
    { name: 'board', w: 1440, h: 900, act: null },
    { name: 'lifted', w: 1024, h: 720, act: 'lift2' },
    { name: 'ribbon', w: 1024, h: 720, act: 'reveal1' },
    { name: 'map', w: 1024, h: 720, act: 'revealall' },
    { name: 'map', w: 360, h: 900, act: 'revealall' },
    { name: 'library', w: 1024, h: 720, act: 'library' },
  ];

  for (const s of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h, deviceScaleFactor: 1 });
    if (PREMIUM) {
      await page.evaluateOnNewDocument(() => {
        try { localStorage.setItem('accessToken', 'x'); } catch (e) {}
      });
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        if (r.url().indexOf('/api/auth/me') >= 0) {
          return r.respond({ status: 200, contentType: 'application/json',
            body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) });
        }
        r.continue();
      });
    }
    await page.goto('http://127.0.0.1:' + port + '/wodb.html?lang=en', { waitUntil: 'networkidle2' });
    await page.waitForSelector('.wdb-grid', { timeout: 15000 });
    await new Promise((r) => setTimeout(r, 700));

    if (s.act === 'lift2') {
      await page.evaluate(() => {
        const c = document.querySelectorAll('.wdb-cell');
        c[0].click(); c[3].click();
      });
    } else if (s.act === 'reveal1' || s.act === 'revealall') {
      await page.evaluate(() => {
        const chips = [...document.querySelectorAll('.wdb-chip')];
        const rev = chips.find((b) => b.getAttribute('data-fk') === 'reasons');
        if (rev) rev.click();
      });
      await new Promise((r) => setTimeout(r, 300));
      if (s.act === 'reveal1') {
        await page.evaluate(() => document.querySelectorAll('.wdb-cell')[1].click());
      } else {
        await page.evaluate(() => {
          const all = [...document.querySelectorAll('.wdb-chip')]
            .find((b) => b.getAttribute('data-fk') === 'revealall');
          if (all) all.click();
        });
      }
    } else if (s.act === 'library') {
      await page.evaluate(() => {
        const lib = [...document.querySelectorAll('.wdb-chip')]
          .find((b) => b.getAttribute('data-fk') === 'library');
        if (lib) lib.click();
      });
    }
    await new Promise((r) => setTimeout(r, 900));
    const f = path.join(OUT, s.name + '-' + s.w + (PREMIUM ? '-premium' : '') + '.png');
    /* ⚠ fullPage, always. The board is content-driven now, so a viewport
       shot silently crops the dock — and the dock is where the control
       the operator asked for lives. A cropped render is exactly how a
       "looks fine" review misses the thing being reviewed. */
    await page.screenshot({ path: f, fullPage: true });
    console.log('  ' + path.basename(f));
    await page.close();
  }

  await browser.close();
  srv.close();
  console.log('\nshots -> ' + OUT);
})();
