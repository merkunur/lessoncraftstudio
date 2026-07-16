#!/usr/bin/env node
/* All-11-locale mount smoke for name-sticks: the invite (fresh profile)
   renders localized, then with a seeded class the jar + cup + Pull
   render localized; zero non-404 console errors. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
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

  /* seed a premium class once (localStorage is origin-shared) */
  await page.goto(`http://127.0.0.1:${PORT}/mini-tools/name-sticks.html?lang=en`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('lcs:name-sticks:v1', JSON.stringify({ v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() } }));
    localStorage.setItem('accessToken', 'test-token');
    localStorage.setItem('lcs:my-classes:v1', JSON.stringify({
      v: 1, activeClassId: 'c_s', classes: [{ id: 'c_s', name: 'Smoke', students: [{ id: 's_1', name: 'Ana' }, { id: 's_2', name: 'Ben' }, { id: 's_3', name: 'Caz' }], createdAt: 1, updatedAt: 1 }],
      fairness: {}, groupings: {},
    }));
  });

  for (const L of LOCALES) {
    errs.length = 0;
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/name-sticks.html?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.nsk-jar', { timeout: 8000 }).then(() => true).catch(() => false);
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      instr: (document.querySelector('.lcs-instruction') || {}).textContent,
      pull: (document.querySelector('.nsk-big') || {}).textContent,
      cup: !!document.querySelector('.nsk-cup'),
      sticks: document.querySelectorAll('.nsk-jarstick').length,
    }));
    const real = errs.filter((e) => !/404|Failed to load resource|net::ERR/i.test(e));
    const ok = got && m.cup && m.sticks === 3 && m.title && m.instr && m.pull && real.length === 0;
    if (!ok) fails++;
    console.log(`${ok ? '✓' : '✗'} ${L}: "${m.title}" — Pull="${m.pull}"${real.length ? ' ERRORS: ' + real.slice(0, 2).join(' | ') : ''}`);
  }
  await browser.close();
  server.close();
  console.log(fails ? `RESULT: FAIL (${fails})` : 'RESULT: PASS (11/11)');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
