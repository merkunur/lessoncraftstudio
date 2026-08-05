/* measure the rebuilt clock's content height per viewport, and the
   lowest control, against the shell's clip box (.lcs-app height:100%). */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const MINI = path.join(__dirname, '..', 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/learning-clock.html';
  if (p.startsWith('/mini-tools/')) p = p.slice('/mini-tools/'.length); else p = p.replace(/^\//, '');
  fs.readFile(path.join(MINI, p), (e, b) => {
    if (e) { res.statusCode = 404; res.end('nf'); return; }
    res.setHeader('Content-Type', MIME[path.extname(p)] || 'application/octet-stream');
    res.end(b);
  });
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
const W = [320, 360, 412, 768, 1024, 1366, 1920, 2560];
(async () => {
  await new Promise(r => srv.listen(0, r));
  const P = srv.address().port;
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const LANG = process.env.LANG_ || 'en';
  console.log('lang=' + LANG + '   (tall viewport, so nothing is clipped while measuring)');
  console.log('width  content  faceW  lowestCtrl  minTap');
  for (const w of W) {
    const page = await b.newPage();
    await page.setViewport({ width: w, height: 2000, hasTouch: true });
    await page.goto(`http://127.0.0.1:${P}/mini-tools/learning-clock.html?lang=${LANG}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.lck-svg');
    await page.evaluate(() => { const T = window.LearningClock; T.premium = true; T.premiumKnown = true; T.render(); });
    await sleep(350);
    const m = await page.evaluate(() => {
      const app = document.querySelector('.lcs-app');
      const stage = document.querySelector('.lcs-stage');
      const wrap = document.querySelector('.lck-wrap');
      const header = document.querySelector('.lcs-header');
      const face = document.querySelector('.lck-face').getBoundingClientRect();
      const ctrls = [...document.querySelectorAll('.lck-mode,.lck-step,.lck-chip,.lck-big,.lck-speak,.lck-why,.lck-half,.lck-grip,.lck-devariant')];
      let lowest = 0, minTap = 1e9, small = [];
      ctrls.forEach(c => {
        const r = c.getBoundingClientRect();
        if (!r.width) return;
        lowest = Math.max(lowest, r.bottom);
        const s = Math.min(r.width, r.height);
        if (s < minTap) minTap = s;
        if (s < 44) small.push((c.getAttribute('data-fk') || c.className) + ':' + Math.round(s));
      });
      const hb = header.getBoundingClientRect(), wb = wrap.getBoundingClientRect();
      return {
        content: Math.ceil(hb.height + wb.height + 40),
        faceW: Math.round(face.width),
        lowest: Math.round(lowest),
        minTap: Math.round(minTap),
        small: small.slice(0, 6),
        appW: Math.round(app.getBoundingClientRect().width)
      };
    });
    console.log(String(w).padEnd(7) + String(m.content).padEnd(9) + String(m.faceW).padEnd(7) +
      String(m.lowest).padEnd(12) + String(m.minTap) + (m.small.length ? '   SMALL: ' + m.small.join(' ') : ''));
    await page.close();
  }
  await b.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
