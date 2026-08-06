#!/usr/bin/env node
/* =====================================================================
   shoot-pattern-bench.js — render the bench locally at every viewport
   and in every costume, so I can READ the renders myself.

   Not a gate. The gate is local-test-pattern-bench.js; this is the
   "I read the 360 / 768 / 1024 / 1920 renders myself" step of §23.4,
   which is a step precisely because no measurement replaces looking.

   Usage: node scripts/shoot-pattern-bench.js [--lang=de]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMGLIB = path.join(ROOT, 'frontend', 'public', 'image-library-webp');
const OUT = path.join(ROOT, 'docs', 'audit-results', 'pattern-bench', 'qa');
fs.mkdirSync(OUT, { recursive: true });

const arg = (k, d) => {
  const h = process.argv.find((a) => a.indexOf('--' + k + '=') === 0);
  return h ? h.split('=').slice(1).join('=') : d;
};
const LANG = arg('lang', 'en');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const SHOTS = [
  { id: 'sweep-320', w: 320, h: 640 },
  { id: 'sweep-360', w: 360, h: 740 },
  { id: 'sweep-412', w: 412, h: 820 },
  { id: 'sweep-768', w: 768, h: 1000 },
  { id: 'sweep-1024', w: 1024, h: 900 },
  { id: 'sweep-1366', w: 1366, h: 900 },
  { id: 'wide-1920', w: 1920, h: 1080 },
  { id: 'wide-2560', w: 2560, h: 1440 },
  /* the costumes + the states that carry the ideas */
  { id: 'shapes-1024', w: 1024, h: 900, js: "T.st=T.setMedium(T.st,'shape');T.render();" },
  { id: 'pictures-1024', w: 1024, h: 900, premium: true, js: "T.st=T.setMedium(T.st,'picture');T.render();" },
  { id: 'abcd-1024', w: 1024, h: 900, js: "T.st=T.setUnitLength(T.st,4);T.render();" },
  { id: 'covered-1024', w: 1024, h: 900, js: "T.st=T.toggleCover(T.st,6);T.st=T.toggleCover(T.st,9);T.render();" },
  { id: 'slid-1024', w: 1024, h: 900, js: "T.st=T.setUnitLength(T.st,3);T.st=T.slideBracket(T.st,1);T.render();" },
  { id: 'hidden-1024', w: 1024, h: 900, js: "T.st._x=0;T.st.unitHidden=true;T.render();" },
  { id: 'letters-1024', w: 1024, h: 900, js: "T.api.settings.letters=true;T.render();" },
  { id: 'armed-360', w: 360, h: 740, js: "T.st=T.setArmed(T.st,true);T.render();" },
  /* all four glyphs of each costume, so no slot ships unlooked-at */
  { id: 'shapes4-1366', w: 1366, h: 900, js: "T.st=T.setUnitLength(T.st,4);T.st=T.setMedium(T.st,'shape');T.render();" },
  { id: 'pictures4-1366', w: 1366, h: 900, premium: true, js: "T.st=T.setUnitLength(T.st,4);T.st=T.setMedium(T.st,'picture');T.render();" }
];

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    const f = u.indexOf('/image-library-webp/') === 0
      ? path.join(IMGLIB, u.slice('/image-library-webp/'.length))
      : path.join(MINI, path.basename(u));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const s of SHOTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: s.w, height: s.h });
    await page.evaluateOnNewDocument((prem) => {
      try { localStorage.clear(); } catch (_) {}
      if (prem) {
        localStorage.setItem('accessToken', 'harness');
        localStorage.setItem('lcs:pattern-bench:v1', JSON.stringify({
          v: 1, ent: { tier: 'full', checkedAt: new Date().toISOString() } }));
      }
    }, !!s.premium);
    if (s.premium) {
      await page.setRequestInterception(true);
      page.on('request', (r) => (r.url().indexOf('/api/auth/me') > -1
        ? r.respond({ status: 200, contentType: 'application/json',
            body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
        : r.continue()));
    }
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });

    await page.goto(`http://127.0.0.1:${port}/pattern-bench.html?lang=${LANG}&embed=1`, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.ptn-wrap', { timeout: 9000 });
    await wait(600);
    if (s.js) { await page.evaluate('(function(){var T=window.PatternBench;' + s.js + '}())'); await wait(400); }
    await wait(400);

    const box = await page.evaluate(() => {
      const a = document.querySelector('.lcs-app');
      const b = document.querySelector('.ptn-bench');
      const u = document.querySelector('.ptn-slot');
      const c = document.querySelector('.ptn-cell');
      const r = (n) => (n ? Math.round(n.getBoundingClientRect().width) + 'x' + Math.round(n.getBoundingClientRect().height) : 'none');
      return { app: r(a), bench: r(b), socket: r(u), bead: r(c),
        ratio: (u && c) ? (u.getBoundingClientRect().width / c.getBoundingClientRect().width).toFixed(2) : '-' };
    });
    await page.screenshot({ path: path.join(OUT, s.id + '.png'), fullPage: false });
    console.log('  ' + s.id.padEnd(16) + ' app ' + box.app.padEnd(10) + ' bench ' + box.bench.padEnd(10) +
      ' socket ' + box.socket.padEnd(9) + ' bead ' + box.bead.padEnd(9) + ' unit/bead ' + box.ratio +
      (errs.length ? '   CONSOLE: ' + errs[0].slice(0, 60) : ''));
    await page.close();
  }
  await browser.close();
  server.close();
  console.log('\nwrote ' + SHOTS.length + ' renders to docs/audit-results/pattern-bench/qa/');
})();
