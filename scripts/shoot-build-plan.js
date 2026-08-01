/* =====================================================================
   shoot-build-plan.js — the renders I read MYSELF (§A.13.62 last step)
   ---------------------------------------------------------------------
   Run: node scripts/shoot-build-plan.js [--locale=en]

   The measured sweep can be green on a tool that is unreadable. #43's
   two-circles defect passed seven suites and was found in one 768px
   screenshot. DESKTOP IS FIRST-CLASS — the operator views at ~768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const R = path.join(__dirname, '..');
const ROOT = path.join(R, 'mini tools');
const OUT = path.join(R, 'docs', 'audit-results', 'build-plan');
const PORT = 5571;
const WIDTHS = [360, 768, 1024];
const loc = (process.argv.find((a) => a.indexOf('--locale=') === 0) || '--locale=en').split('=')[1];

fs.mkdirSync(OUT, { recursive: true });
const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'build-plan.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

/* the two states worth looking at: the opening flat one tells you
   nothing, so force a ragged building where front and side disagree,
   and a determined one where the payoff chip must be visibly dead */
const STATES = [
  { name: 'ragged', h: [1, 2, 3, 1, 2, 3, 1, 2, 3] },
  { name: 'determined', h: [4, 4, 4, 0, 0, 0, 0, 0, 0] }
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const errs = [];
  for (const W of WIDTHS) {
    for (const st of STATES) {
      const page = await browser.newPage();
      page.on('pageerror', (e) => errs.push(W + ' ' + String(e)));
      /* ⚠ /api/quota/status and /favicon.ico 404 on a local static
         server BY DESIGN — the entitlement fetch is meant to fail
         closed and stay pessimistic offline. Counting them as page
         errors made a correct tool report five failures. */
      page.on('console', (m) => {
        if (m.type() === 'error' && !/404|net::ERR|favicon|quota\/status/.test(m.text())) errs.push(W + ' ' + m.text());
      });
      await page.setViewport({ width: W, height: W < 500 ? 740 : 900, deviceScaleFactor: 2 });
      await page.goto(`http://127.0.0.1:${PORT}/build-plan.html?lang=${loc}&embed=1`,
        { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.bpl-bench', { timeout: 9000 });
      await new Promise((r) => setTimeout(r, 400));
      await page.evaluate((hh) => {
        const t = window.BuildPlan;
        t.st = t._st({ h: hh }); t._paint();
      }, st.h);
      await new Promise((r) => setTimeout(r, 250));
      const f = path.join(OUT, `${loc}-${W}-${st.name}.png`);
      await page.screenshot({ path: f, fullPage: false });
      console.log('  ' + path.relative(R, f));
      await page.close();
    }
  }
  await browser.close();
  srv.close();
  if (errs.length) { console.error('\nPAGE ERRORS:\n' + errs.slice(0, 5).join('\n')); process.exit(1); }
  console.log('\nno page errors');
})();
