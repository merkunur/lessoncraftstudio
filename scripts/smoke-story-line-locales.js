#!/usr/bin/env node
/* All-11-locale mount smoke for story-line: the free set's slots + tray
   render, title/instruction localized, the first sequence chip shows the
   localized "First"-word, and zero non-404 console errors. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file;
    if (p.startsWith('/image-library-webp/')) file = path.join(IMGLIB, p.slice('/image-library-webp/'.length));
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
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
  await page.setViewport({ width: 1024, height: 768 });
  let fails = 0;
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));

  for (const L of LOCALES) {
    errs.length = 0;
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/story-line.html?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.stl-slot', { timeout: 8000 }).then(() => true).catch(() => false);
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      instr: (document.querySelector('.lcs-instruction') || {}).textContent,
      slots: document.querySelectorAll('.stl-slot').length,
      tray: document.querySelectorAll('.stl-card.in-tray').length,
      firstChip: (document.querySelector('.stl-seq') || {}).textContent,
      name: (document.querySelector('.stl-namechip') || {}).textContent,
    }));
    const real = errs.filter((e) => !/404|Failed to load resource|net::ERR/i.test(e));
    const ok = got && m.slots >= 3 && m.tray === m.slots && m.title && m.instr && m.firstChip && real.length === 0;
    if (!ok) fails++;
    console.log(`${ok ? '✓' : '✗'} ${L}: "${m.title}" — set="${m.name}" slots=${m.slots} first="${m.firstChip}"${real.length ? ' ERRORS: ' + real.slice(0, 2).join(' | ') : ''}`);
  }
  await browser.close();
  server.close();
  console.log(fails ? `RESULT: FAIL (${fails})` : 'RESULT: PASS (11/11)');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
