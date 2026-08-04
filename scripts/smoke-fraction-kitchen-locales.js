#!/usr/bin/env node
/* =====================================================================
   smoke-fraction-kitchen-locales.js — ×11 mount smoke for Fraction
   Kitchen: each locale mounts clean (no js errors), title + instruction
   + food chips render IN THAT LOCALE, the pizza + guides render, and
   the dock is localized (no en leak on a sampled non-en string).
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const LOCS = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* expected strings straight from the tool source */
const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } }, navigator: {}, location: { search: '', hostname: 'gate' }, localStorage: { getItem: () => null, setItem: () => {} } };
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'fraction-kitchen.js'), 'utf8'), sandbox);
const S = sandbox.FractionKitchen.strings;

let fail = 0;
let guideCount = null;
(async () => {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const file = p.startsWith('/mini-tools/') ? path.join(MINI, p.slice('/mini-tools/'.length)) : path.join(MINI, p.replace(/^\//, ''));
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
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/fraction-kitchen.html?lang=${L}`);
    try { await page.waitForSelector('.frk-board', { timeout: 8000 }); } catch (_) {}
    await new Promise((r) => setTimeout(r, 250));
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      body: document.body.textContent,
      guides: document.querySelectorAll('.frk-guide').length,
      pizza: !!document.querySelector('.frk-food circle'),
      chips: document.querySelectorAll('.frk-chip').length
    }));
    const problems = [];
    if (errs.length) problems.push('js: ' + errs[0]);
    if (!m.title.includes(S.title[L])) problems.push(`title not "${S.title[L]}"`);
    if (!m.body.includes(S.instruction[L])) problems.push('instruction missing');
    if (!m.body.includes(S.chipBar[L])) problems.push('chocolate chip not localized');
    if (!m.body.includes(S.shareChip[L])) problems.push('share chip not localized');
    /* ⚠ THIS FLOOR USED TO BE `< 2`, AND IT ENCODED THE DEFECT. Halves drew
       one true diameter PLUS one decoy, so 2 was the count of a CONTAMINATED
       pattern; once the decoy went, a correct tool started failing here. The
       floor is not simply lowered to 1 — that would pass a tool drawing a
       single line for sixths. This gate is about LOCALE, so it asserts what a
       locale can actually break: the pattern is drawn, and it is the SAME
       pattern in every language. Exact per-partition counts stay in local-test
       (halves 1, fourths 2, decoys 0), where the geometry belongs. */
    if (m.guides < 1) problems.push(`${m.guides} guides`);
    if (guideCount === null) guideCount = m.guides;
    else if (m.guides !== guideCount) problems.push(`${m.guides} guides against ${guideCount} in the first locale — the language changed the geometry`);
    if (!m.pizza) problems.push('no pizza svg');
    if (m.chips < 8) problems.push(`${m.chips} chips`);
    if (L !== 'en' && S.instruction[L] !== S.instruction.en && m.body.includes(S.instruction.en)) problems.push('en instruction leak');
    if (problems.length) { fail++; console.log(`  ✗ ${L}: ${problems.join('; ')}`); }
    else console.log(`  ✓ ${L}`);
    await page.close();
  }
  await browser.close();
  server.close();
  if (fail) { console.log(`FAIL — ${fail} locale(s)`); process.exit(1); }
  console.log('smoke-fraction-kitchen-locales: 11/11 GREEN');
})();
