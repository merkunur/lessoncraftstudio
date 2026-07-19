#!/usr/bin/env node
/* =====================================================================
   smoke-money-mat-locales.js — ×11 mount smoke for Money Mat: each
   locale mounts clean (no js errors), title/instruction/chips render IN
   THAT LOCALE, the purse shows the locale's OWN currency (coin count +
   symbol + tag format), and there is no en leak.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMGLIB = path.join(REPO, 'frontend', 'public', 'image-library-webp');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };
const LOCS = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } }, navigator: {}, location: { search: '', hostname: 'gate' }, localStorage: { getItem: () => null, setItem: () => {} }, URLSearchParams };
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'money-mat.js'), 'utf8'), sandbox);
const T = sandbox.MoneyMat;
const S = T.strings;
/* expected purse coin count per locale (incl. the nl/fi 1c/2c veto) */
const EXPECT_COINS = { en: 4, de: 8, fr: 8, it: 8, es: 8, nl: 6, fi: 6, pt: 5, sv: 4, da: 5, no: 4 };

let fail = 0;
(async () => {
  const server = http.createServer((req, res) => {
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
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const L of LOCS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 768 });
    const errs = [];
    const benign = (t) => /404|Failed to load resource|net::ERR/i.test(t);
    page.on('pageerror', (e) => { if (!benign(e.message)) errs.push(e.message); });
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) errs.push(m.text()); });
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/money-mat.html?lang=${L}`);
    try { await page.waitForSelector('.mm-scene', { timeout: 8000 }); } catch (_) {}
    await new Promise((r) => setTimeout(r, 300));
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      body: document.body.textContent,
      coins: document.querySelectorAll('.mm-purse .mm-coinbtn').length,
      tag: (document.querySelector('.mm-tag-body') || {}).textContent || '',
      total: (document.querySelector('.mm-total') || {}).textContent || ''
    }));
    const problems = [];
    if (errs.length) problems.push('js: ' + errs[0]);
    if (!m.title.includes(S.title[L])) problems.push(`title not "${S.title[L]}"`);
    if (!m.body.includes(S.instruction[L])) problems.push('instruction missing');
    if (!m.body.includes(S.anotherItem[L])) problems.push('anotherItem chip not localized');
    if (m.coins !== EXPECT_COINS[L]) problems.push(`${m.coins} purse coins (want ${EXPECT_COINS[L]})`);
    if (!m.tag) problems.push('no price tag');
    const sym = { en: '$', de: '€', fr: '€', it: '€', es: '€', nl: '€', fi: '€', pt: 'R$', sv: 'kr', da: 'kr', no: 'kr' }[L];
    if (!m.total.includes(sym)) problems.push(`total lacks ${sym} ("${m.total}")`);
    if (L !== 'en' && S.instruction[L] !== S.instruction.en && m.body.includes(S.instruction.en)) problems.push('en instruction leak');
    if (problems.length) { fail++; console.log(`  ✗ ${L}: ${problems.join('; ')}`); }
    else console.log(`  ✓ ${L}`);
    await page.close();
  }
  await browser.close();
  server.close();
  if (fail) { console.log(`FAIL — ${fail} locale(s)`); process.exit(1); }
  console.log('smoke-money-mat-locales: 11/11 GREEN');
})();
