/* throwaway: measure the bench frame at several viewports, standalone.
   Proves Phase 1 grew the stage instead of assuming it did. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', '..', '..', '..', '..', '..', 'lessoncraftstudio');
const MT = path.join('C:', 'Users', 'rkgen', 'lessoncraftstudio', 'mini tools');
const IMG = path.join('C:', 'Users', 'rkgen', 'lessoncraftstudio', 'frontend', 'public');
const PORT = 5732;
const TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png' };

const srv = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  let f = null;
  if (u.startsWith('/mini-tools/')) f = path.join(MT, u.slice('/mini-tools/'.length));
  else if (u.startsWith('/image-library-webp/')) f = path.join(IMG, u.slice(1));
  if (f && fs.existsSync(f) && fs.statSync(f).isFile()) {
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    return res.end(fs.readFileSync(f));
  }
  res.writeHead(404); res.end('nope');
});

const VPS = [[320, 568], [360, 740], [768, 1024], [1024, 768], [1366, 768], [1600, 900], [1920, 1080], [2560, 1440]];

(async () => {
  await new Promise((r) => srv.listen(PORT, r));
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  console.log('vw x vh      appH   stageOuterW  scale   stageDevW  hintPx  sayPx  docBottom  vpH  clipped?');
  for (const [w, h] of VPS) {
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e.message)));
    p.on('console', (c) => {
      if (c.type() === 'error') errs.push('console: ' + c.text());
      if (c.text().startsWith('DBG ')) errs.push(c.text());
    });
    await p.setViewport({ width: w, height: h });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/measurement-bench.html`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 700));
    const m = await p.evaluate(() => {
      const app = document.querySelector('.lcs-app');
      const outer = document.querySelector('.mb-stage-outer');
      const st = document.querySelector('.mb-stage');
      const wrap = document.querySelector('.mb-wrap');
      const dock = document.querySelector('.mb-dock');
      const hint = document.querySelector('.mb-hint');
      const s = parseFloat(getComputedStyle(wrap).getPropertyValue('--mb-s')) || 0;
      const r = st.getBoundingClientRect();
      const T = window.MeasurementBench;
      console.log('DBG _scale=' + (T && T._scale) + ' outerClientW=' + (T && T._stageOuter && T._stageOuter.clientWidth)
        + ' chromeH=' + (T && T._chromeH ? T._chromeH() : 'no-fn') + ' inlineTransform=' + st.style.transform);
      return {
        appH: Math.round(app.getBoundingClientRect().height),
        outerW: Math.round(outer.getBoundingClientRect().width),
        s: +s.toFixed(3),
        stageDevW: Math.round(r.width),
        hintPx: hint && getComputedStyle(hint).display !== 'none' ? Math.round(parseFloat(getComputedStyle(hint).fontSize)) : 0,
        docBottom: Math.round(dock.getBoundingClientRect().bottom),
        docH: Math.round(document.documentElement.scrollHeight)
      };
    });
    const clipped = m.docBottom > h + 1;
    console.log(
      `${String(w).padStart(4)}x${String(h).padEnd(5)} ${String(m.appH).padStart(5)} ${String(m.outerW).padStart(10)} ${String(m.s).padStart(7)} ${String(m.stageDevW).padStart(10)} ${String(m.hintPx).padStart(6)} ${String(m.docBottom).padStart(10)} ${String(h).padStart(5)}  ${clipped ? 'DOCK BELOW FOLD (scrollH ' + m.docH + ')' : 'ok'}`
    );
    if (errs.length) console.log('      !! ' + errs.slice(0, 3).join(' | '));
    await p.close();
  }
  await b.close();
  srv.close();
})();
