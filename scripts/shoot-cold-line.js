/* =====================================================================
   shoot-cold-line.js — the renders I read MYSELF before shipping
   ---------------------------------------------------------------------
   Run:  node scripts/shoot-cold-line.js

   §A.13.62's last step is not a gate: it is me looking. The measured
   sweep can be green on a tool that is ugly, illegible or wrong, and
   three of this build's nine live defects (the minus abutting its tick,
   the two marks differing only in hue, the bulb lying about where the
   column ends) were found by LOOKING, not by measuring — the gates for
   them were written afterwards.

   DESKTOP IS FIRST-CLASS. The operator views at ~768; verifying only
   at phone 360 is the recorded root cause of defects reaching them.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const R = path.join(__dirname, '..');
const ROOT = path.join(R, 'mini tools');
const OUT = path.join(R, 'docs', 'audit-results', 'cold-line');
const PORT = 5563;
const WIDTHS = [360, 768, 1024];
const LOC = process.argv.find((a) => a.startsWith('--locale=')) || '--locale=en';
const loc = LOC.split('=')[1];

fs.mkdirSync(OUT, { recursive: true });
const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '').replace(/^\//, '') || 'cold-line.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const W of WIDTHS) {
    for (const tipped of [false, true]) {
      const page = await browser.newPage();
      await page.setViewport({ width: W, height: W < 500 ? 740 : 900, deviceScaleFactor: 2 });
      await page.goto(`http://127.0.0.1:${PORT}/cold-line.html?lang=${loc}&embed=1`,
        { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.cld-bench', { timeout: 9000 });
      await new Promise((r) => setTimeout(r, 400));
      /* marks on OPPOSITE SIDES OF ZERO — the state the tool exists for,
         and the one a default screenshot would not show */
      await page.evaluate((tp) => {
        const t = window.ColdLine;
        t.st = t._st({ lo: -12, a: -5, b: 3, tipped: tp });
        t._paint();
      }, tipped);
      await new Promise((r) => setTimeout(r, 250));
      const f = path.join(OUT, `${loc}-${W}-${tipped ? 'flat' : 'upright'}.png`);
      await page.screenshot({ path: f, fullPage: false });
      console.log('  ' + path.relative(R, f));
      await page.close();
    }
  }
  await browser.close();
  srv.close();
})();
