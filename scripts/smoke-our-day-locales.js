#!/usr/bin/env node
/* =====================================================================
   smoke-our-day-locales.js — ×11 mount smoke for Our Day: each locale
   mounts clean, chrome renders IN THAT LOCALE, and the PER-LOCALE CARD
   SET holds live (de shows Frühstückspause + Hofpause, fr hides the
   religion card, es shows honores a la bandera, pt shows escovação,
   Nordics show aftercare, en-only show & tell) — plus no en leak.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html' };
const LOCS = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const sandbox = { window: {}, document: { createElement: () => ({ style: {} }), getElementById: () => null, head: { appendChild: () => {} }, addEventListener: () => {}, body: { classList: { add: () => {} } } }, navigator: {}, location: { search: '', hostname: 'x' }, localStorage: { getItem: () => null, setItem: () => {} }, URLSearchParams, setInterval: () => 0, Intl, Date };
sandbox.global = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'our-day.js'), 'utf8'), sandbox);
const T = sandbox.OurDay;
const S = T.strings;

/* per-locale card-set expectations (id, present?) */
const EXPECT = {
  en: { has: ['showtell'], not: ['honores', 'breakfast', 'brushing', 'aftercare', 'italiano'] },
  de: { has: ['breakfast', 'recess', 'religion', 'brushing', 'aftercare'], not: ['showtell', 'honores'] },
  fr: { has: ['recess', 'aftercare'], not: ['religion', 'showtell', 'breakfast'] },
  it: { has: ['religion', 'italiano'], not: ['showtell', 'honores', 'breakfast'] },
  es: { has: ['honores', 'breakfast'], not: ['showtell', 'aftercare'] },
  pt: { has: ['brushing', 'honores', 'aftercare'], not: ['showtell', 'breakfast'] },
  nl: { has: ['aftercare'], not: ['showtell', 'honores', 'breakfast'] },
  sv: { has: ['aftercare'], not: ['showtell', 'breakfast'] },
  da: { has: ['aftercare'], not: ['showtell', 'breakfast'] },
  no: { has: ['aftercare'], not: ['showtell', 'breakfast'] },
  fi: { has: ['recess', 'breakfast', 'aftercare'], not: ['showtell', 'honores'] }
};

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
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/our-day.html?lang=${L}`);
    try { await page.waitForSelector('.od-palette', { timeout: 8000 }); } catch (_) {}
    await new Promise((r) => setTimeout(r, 250));
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      body: document.body.textContent,
      palNames: Array.prototype.map.call(document.querySelectorAll('.od-pal-card span'), (e) => e.textContent),
      start: (document.querySelector('.od-start') || {}).textContent || ''
    }));
    const problems = [];
    if (errs.length) problems.push('js: ' + errs[0]);
    if (!m.title.includes(S.title[L])) problems.push(`title not "${S.title[L]}"`);
    if (!m.body.includes(S.instruction[L])) problems.push('instruction missing');
    if (m.start !== S.startDay[L]) problems.push(`Start reads "${m.start}"`);
    const exp = EXPECT[L];
    for (const id of exp.has) {
      const name = T.cardName(id, L);
      if (!m.palNames.includes(name)) problems.push(`card "${name}" (${id}) missing from the ${L} palette`);
    }
    for (const id of exp.not) {
      const name = T.cardName(id, 'en');
      if (m.palNames.includes(name)) problems.push(`en-card "${name}" (${id}) leaked into the ${L} palette`);
    }
    if (m.palNames.some((n) => n === '—')) problems.push('placeholder "—" card name rendered');
    if (L !== 'en' && S.startDay[L] !== S.startDay.en && m.body.includes(S.startDay.en)) problems.push('en Start leak');
    if (problems.length) { fail++; console.log(`  ✗ ${L}: ${problems.join('; ')}`); }
    else console.log(`  ✓ ${L}`);
    await page.close();
  }
  await browser.close();
  server.close();
  if (fail) { console.log(`FAIL — ${fail} locale(s)`); process.exit(1); }
  console.log('smoke-our-day-locales: 11/11 GREEN');
})();
