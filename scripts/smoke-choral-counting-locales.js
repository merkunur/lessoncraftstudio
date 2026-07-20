#!/usr/bin/env node
/* =====================================================================
   smoke-choral-counting-locales.js — ×11 mount smoke for Choral
   Counting: each locale mounts clean (no js errors), title/instruction/
   NEXT render IN THAT LOCALE, the preset shelf opens with the locale's
   curriculum grade labels, the showcase group is present, and there is
   no en leak.
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

const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), getElementById: () => null, head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } }, navigator: {}, location: { search: '', hostname: 'x' }, localStorage: { getItem: () => null, setItem: () => {} }, URLSearchParams };
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'choral-counting.js'), 'utf8'), sandbox);
const T = sandbox.ChoralCounting;
const S = T.strings;

let fail = 0;
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
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/choral-counting.html?lang=${L}`);
    try { await page.waitForSelector('.cc-grid', { timeout: 8000 }); } catch (_) {}
    await new Promise((r) => setTimeout(r, 250));
    /* open the preset shelf so the grade labels render */
    await page.evaluate(() => { document.querySelector('.cc-shelf-head').click(); });
    await new Promise((r) => setTimeout(r, 200));
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      body: document.body.textContent,
      next: (document.querySelector('.cc-next') || {}).textContent || '',
      groups: Array.prototype.map.call(document.querySelectorAll('.cc-pgroup-label'), (el) => el.textContent),
      cells: document.querySelectorAll('.cc-cell').length
    }));
    const problems = [];
    if (errs.length) problems.push('js: ' + errs[0]);
    if (!m.title.includes(S.title[L])) problems.push(`title not "${S.title[L]}"`);
    if (!m.body.includes(S.instruction[L])) problems.push('instruction missing');
    if (m.next !== S.next[L]) problems.push(`NEXT reads "${m.next}"`);
    if (m.groups.length !== 4) problems.push(`${m.groups.length} preset groups (want 4)`);
    if (m.groups[1] !== S.grade1[L]) problems.push(`grade-1 label "${m.groups[1]}" not the curriculum term "${S.grade1[L]}"`);
    if (m.groups[3] !== S.gradeListen[L]) problems.push('showcase group missing');
    if (m.cells < 30) problems.push('grid did not render');
    if (L !== 'en' && S.instruction[L] !== S.instruction.en && m.body.includes(S.instruction.en)) problems.push('en instruction leak');
    if (L !== 'en' && S.next[L] !== S.next.en && m.next === S.next.en) problems.push('en NEXT leak');
    if (problems.length) { fail++; console.log(`  ✗ ${L}: ${problems.join('; ')}`); }
    else console.log(`  ✓ ${L}`);
    await page.close();
  }
  await browser.close();
  server.close();
  if (fail) { console.log(`FAIL — ${fail} locale(s)`); process.exit(1); }
  console.log('smoke-choral-counting-locales: 11/11 GREEN');
})();
