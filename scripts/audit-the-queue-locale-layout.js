/* =====================================================================
   LAYOUT AUDIT — TOOL #58, THE QUEUE — 11 locales × 6 viewports
   =====================================================================
   Buttons measured against the CARD (a flex-wrap scroller absorbs overflow
   into its own box, so measuring the wrapper hides it). Both an EMPTY and a
   fully-SWEPT state are driven (the wordiest locale in the wordiest state
   is where a wrap breaks). Poison mode QUE_AUDIT_POISON=overflow injects a
   wide element and every arm must fire.

   Run: node scripts/audit-the-queue-locale-layout.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.QUE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const PORT = Number(process.env.QUE_AUDIT_PORT) || 5696;
const POISON = process.env.QUE_AUDIT_POISON || '';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const VIEWPORTS = [320, 360, 412, 768, 1024, 1366];
const TAP = 44;

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-queue.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  let body = fs.readFileSync(fp);
  if (f === 'the-queue.js' && POISON === 'overflow') {
    let s = body.toString('utf8');
    s = s.replace(".que-wrap{display:flex;", ".que-wrap{display:flex;min-width:2000px;");
    body = Buffer.from(s, 'utf8');
  }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(body);
}).listen(PORT);

const base = 'http://localhost:' + PORT + '/the-queue.html';
const fails = [];
function ok(c, m) { if (!c) fails.push(m); }

async function measure(page, w, loc, state) {
  const card = await page.$eval('.lcs-app', el => el.getBoundingClientRect().right);
  const over = await page.$$eval('.que-wrap *', (els, cr) => { let x = 0; els.forEach(e => { const r = e.getBoundingClientRect(); if (r.width && r.right - cr > x) x = r.right - cr; }); return Math.round(x); }, card + 1);
  ok(over <= 2, w + '/' + loc + '/' + state + ': overflow +' + over + 'px past card');
  const docO = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(docO <= 1, w + '/' + loc + '/' + state + ': page h-overflow ' + docO + 'px');
  const small = await page.$$eval('.que-btn', (bs, tap) => bs.filter(b => { const r = b.getBoundingClientRect(); return r.height < tap || r.width < tap; }).length, TAP);
  ok(small === 0, w + '/' + loc + '/' + state + ': ' + small + ' sub-44px buttons');
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    for (const loc of LOCALES) {
      for (const w of VIEWPORTS) {
        await page.setViewport({ width: w, height: 900 });
        await page.goto(base + '?lang=' + loc, { waitUntil: 'networkidle0' });
        await page.waitForSelector('.que-wrap');
        await new Promise(r => setTimeout(r, 80));
        await measure(page, w, loc, 'empty');
        // swept state
        const rb = await page.$eval('.que-rail', el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, cy: r.y + r.height / 2 }; });
        const b = await page.$('.que-b-enda'); const bb = await b.boundingBox();
        await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
        await page.mouse.move(rb.x + rb.w * 0.03, rb.cy); await page.mouse.down();
        await page.mouse.move(rb.x + rb.w * 0.97, rb.cy); await page.mouse.up();
        await new Promise(r => setTimeout(r, 120));
        await measure(page, w, loc, 'swept');
      }
    }
  } catch (e) { fails.push('EXCEPTION: ' + (e && e.stack || e)); }
  finally { await browser.close(); srv.close(); }

  if (POISON) { console.log(fails.length + ' arms fired under poison=' + POISON + (fails.length ? ' (good)' : ' — POISON MATCHED NOTHING')); process.exit(fails.length ? 0 : 1); }
  if (fails.length) { console.log(fails.length + ' FAIL:'); fails.slice(0, 30).forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
  console.log('ALL PASS — ' + (LOCALES.length * VIEWPORTS.length * 2) + ' locale×viewport×state cells clean');
})();
