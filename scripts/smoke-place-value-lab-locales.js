#!/usr/bin/env node
/* All-11-locale mount smoke for place-value-lab: mount the demo pose and
   assert (1) the word line text equals the composer output and (2) the
   span ORDER shows each locale's true structure — de/nl/da say the
   ones FIRST (the inversion moat), everyone else leads with tens. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const ONES_FIRST = { de: true, nl: true, da: true };

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

  for (const L of LOCALES) {
    errs.length = 0;
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/place-value-lab.html?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.pvl-mat', { timeout: 8000 }).then(() => true).catch(() => false);
    const m = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      spans: [...document.querySelectorAll('.pvl-span')].filter((e) => !e.className.includes('part-none')).map((e) => ({ t: e.textContent, p: e.className.match(/pvl-part-(\w+)/)[1] })),
      /* ⚠ was hardcoded to 24, the old demo pose. The check is 'does
         the rendered word equal what the composer says for what is ON
         THE MAT', so ask the mat — that survives any future pose. */
      n: PlaceValueLab.engineValue(PlaceValueLab.st),
      helper: PlaceValueLab.NUM_WORDS_HELPERS[PlaceValueLab.api.lang](PlaceValueLab.engineValue(PlaceValueLab.st), 'cardinal'),
    }));
    const text = m.spans.map((s) => s.t).join('');
    const parts = m.spans.map((s) => s.p).filter((p) => p === 'tens' || p === 'ones' || p === 'teen' || p === 'mixed');
    const wantFirst = ONES_FIRST[L] ? 'ones' : 'tens';
    const real = errs.filter((e) => !/404|Failed to load resource|net::ERR/i.test(e));
    const ok = got && m.title && text === m.helper && parts[0] === wantFirst && real.length === 0;
    if (!ok) fails++;
    console.log(`${ok ? '✓' : '✗'} ${L}: "${m.title}" — ${m.n} = "${text}" [${parts.join('→')}]${parts[0] !== wantFirst ? ' (want ' + wantFirst + ' first)' : ''}${text !== m.helper ? ' ≠ "' + m.helper + '"' : ''}${real.length ? ' ERRORS: ' + real.slice(0, 2).join(' | ') : ''}`);
  }
  await browser.close();
  server.close();
  console.log(fails ? `RESULT: FAIL (${fails})` : 'RESULT: PASS (11/11)');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
