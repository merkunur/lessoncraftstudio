/* Quick render probe for TOOL #48 — mounts it, drives one scoop with a
   real pointer, and shoots the three viewports I read myself.
   Run: node scripts/probe-counting-cups.js                            */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'counting-cups', 'qa');
const PORT = 5661;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'counting-cups.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const errs = [];
  for (const c of [{ w: 360, h: 800 }, { w: 768, h: 1024 }, { w: 1024, h: 900 }]) {
    const p = await b.newPage();
    p.on('console', m => { if (m.type() === 'error') errs.push(c.w + ': ' + m.text()); });
    p.on('pageerror', e => errs.push(c.w + ': ' + e.message));
    await p.setViewport({ width: c.w, height: c.h });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/counting-cups.html?lang=en`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 400));

    const info = await p.evaluate(() => {
      const a = document.querySelector('.ccp-arena');
      const st = window.CountingCups && window.CountingCups.st;
      return {
        arena: a ? Math.round(a.getBoundingClientRect().width) : null,
        n: st ? st.n : null,
        chips: document.querySelectorAll('.ccp-body').length,
        digits: [].map.call(document.querySelectorAll('.ccp-digit'), t => t.textContent).join(' '),
        cups: document.querySelectorAll('.ccp-cup').length,
        btns: document.querySelectorAll('.ccp-btn').length,
        pads: document.querySelectorAll('.ccp-pad').length
      };
    });
    console.log(`[${c.w}] arena=${info.arena}px n=${info.n} heapPathNodes=${info.chips} ` +
      `readout="${info.digits}" cups=${info.cups} btns=${info.btns} pads=${info.pads}`);

    await p.screenshot({ path: path.join(OUT, `open-${c.w}.png`) });

    /* one real scoop with a pointer */
    const box = await p.evaluate(() => {
      const r = document.querySelector('.ccp-arena').getBoundingClientRect();
      return { x: r.left + r.width * 0.4, y: r.top + r.height * 0.45 };
    });
    await p.mouse.move(box.x, box.y);
    await p.mouse.down();
    await new Promise(r => setTimeout(r, 160));
    await p.screenshot({ path: path.join(OUT, `aim-${c.w}.png`) });
    await p.mouse.up();
    await new Promise(r => setTimeout(r, 1400));
    const after = await p.evaluate(() => {
      const st = window.CountingCups.st;
      return { mat: st.mat.length, open: st.open, closed: st.closed,
        digits: [].map.call(document.querySelectorAll('.ccp-digit'), t => t.textContent).join(' ') };
    });
    console.log(`      after one scoop: mat=${after.mat} open=${after.open} closed=${after.closed} readout="${after.digits}"`);
    await p.screenshot({ path: path.join(OUT, `scooped-${c.w}.png`) });
    await p.close();
  }
  await b.close(); srv.close();
  if (errs.length) { console.log('\nCONSOLE ERRORS:'); errs.forEach(e => console.log('  ' + e)); }
  else console.log('\nno console errors');
})();
