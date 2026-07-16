#!/usr/bin/env node
/* All-11-locale mount smoke for letter-tiles: tray renders from the
   agent-authored data file, title is the (renamed) native title, tap a
   tray tile doesn't crash, zero non-404 console errors. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = 'C:/Users/rkgen/lessoncraftstudio';
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

const EXPECT = {
  en: 'Letter Tiles', de: 'Magnetbuchstaben', fr: 'Lettres magnétiques',
  it: 'Lettere magnetiche', es: 'Letras magnéticas', pt: 'Alfabeto móvel',
  nl: 'Letterdoos', sv: 'Magnetbokstäver', da: 'Magnetbogstaver',
  no: 'Magnetbokstaver', fi: 'Magneettikirjaimet',
};

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice('/image-library-webp/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => {
      if (err) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream');
      res.end(buf);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 768, height: 1000 });
  let fails = 0;
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));

  for (const L of Object.keys(EXPECT)) {
    errs.length = 0;
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/letter-tiles.html?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.ltl-traytile', { timeout: 8000 }).then(() => true).catch(() => false);
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      tray: document.querySelectorAll('.ltl-traytile').length,
      anchors: document.querySelectorAll('.ltl-traytile .ltl-anchor').length,
      quiet: document.querySelectorAll('.ltl-traytile.quiet').length,
      warm: document.querySelectorAll('.ltl-traytile.warm').length,
    }));
    // tap the first anchored tray tile — must not throw
    await page.evaluate(() => {
      const t = document.querySelector('.ltl-traytile:not(.quiet)');
      if (t) {
        const r = t.getBoundingClientRect();
        const fire = (type) => t.dispatchEvent(new PointerEvent(type, { pointerId: 3, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, bubbles: true }));
        fire('pointerdown'); fire('pointerup');
      }
    });
    await new Promise((r) => setTimeout(r, 150));
    const real = errs.filter((e) => !/404|Failed to load resource|net::ERR/i.test(e));
    const ok = got && m.title === EXPECT[L] && m.tray >= 26 && m.anchors >= 20 && real.length === 0;
    if (!ok) fails++;
    console.log(`${ok ? '✓' : '✗'} ${L}: title="${m.title}" tray=${m.tray} anchors=${m.anchors} warm=${m.warm} quiet=${m.quiet}${real.length ? ' ERRORS: ' + real.slice(0, 2).join(' | ') : ''}`);
  }
  await browser.close();
  server.close();
  console.log(fails ? `RESULT: FAIL (${fails})` : 'RESULT: PASS (11/11)');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
