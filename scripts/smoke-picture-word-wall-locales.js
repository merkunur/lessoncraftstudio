#!/usr/bin/env node
/* All-11-locale mount smoke for picture-word-wall: open `animals` and
   assert the `cat` card shows its ARTICLE + noun exactly as that locale
   teaches it. The per-locale article IS the moat, so this line is the
   smoke: a dative leak (der Katze), a cross-applied gender code (ett
   katt), or a silent article drop all fail here. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const PUB = path.join(REPO, 'frontend', 'public');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

/* the cat card per locale — the form each locale's classroom teaches */
const CAT = {
  en: 'Cat', de: 'die Katze', fr: 'un Chat', it: 'un Gatto', es: 'el Gato',
  pt: 'o Gato', nl: 'de Kat', sv: 'en Katt', da: 'en Kat', no: 'en Katt', fi: 'Kissa',
};

function serve() {
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let f;
    if (p.startsWith('/image-library-webp/')) f = path.join(REPO, p);
    else if (p.startsWith('/mini-tools/')) {
      const rest = p.slice('/mini-tools/'.length);
      f = fs.existsSync(path.join(MINI, rest)) ? path.join(MINI, rest) : path.join(PUB, 'mini-tools', rest);
    } else f = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; res.end(); return; }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
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

  for (const L of Object.keys(CAT)) {
    errs.length = 0;
    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/picture-word-wall.html?lang=${L}`, { waitUntil: 'networkidle0' });
    const got = await page.waitForSelector('.pww-card', { timeout: 8000 }).then(() => true).catch(() => false);
    await new Promise((r) => setTimeout(r, 300));
    const m = await page.evaluate(() => {
      const el = document.querySelector('.pww-card[data-key="cat"]');
      return {
        title: (document.querySelector('.lcs-title') || {}).textContent,
        cat: el ? el.getAttribute('aria-label') : null,
        rail: el ? (el.className.match(/rail-(\w+)/) || [])[1] || null : null,
        cards: document.querySelectorAll('.pww-card').length,
        frameless: !!document.querySelector('.pww-wrap.frameless'),
      };
    });
    const real = errs.filter((e) => !/404|Failed to load resource|net::ERR/i.test(e));
    const ok = got && m.title && m.cat === CAT[L] && m.cards > 0 && real.length === 0;
    if (!ok) fails++;
    console.log(`${ok ? '✓' : '✗'} ${L}: "${m.title}" — cat = "${m.cat}"${m.cat !== CAT[L] ? ' (want "' + CAT[L] + '")' : ''}` +
      `${m.rail ? ' [rail-' + m.rail + ']' : m.frameless ? ' [frameless]' : ''}` +
      `${real.length ? ' ERRORS: ' + real.slice(0, 2).join(' | ') : ''}`);
  }
  await browser.close();
  server.close();
  console.log(fails ? `RESULT: FAIL (${fails})` : 'RESULT: PASS (11/11)');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
