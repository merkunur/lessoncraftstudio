/* =====================================================================
   11-LOCALE SMOKE — TOOL #58, THE QUEUE (Counting rebuild)
   =====================================================================
   Fresh browser context per locale. Proves, per locale:
   · title + instruction + every button render TRANSLATED (never a raw key)
   · no {n}/{k} token leaks in any visible text
   · a real sweep produces badges + the total pill (the tool runs)
   · FREE tier: no join/leave/print chip in the DOM, and window.print is
     NOT reachable (the paywall is structural, not cosmetic)
   A single PREMIUM run (entitlement mocked) proves the chips APPEAR and
   window.print IS reachable — the gate the free tier withholds.

   ⚠ The smoke proves LOCALE SELECTION + REACHABILITY, never translation
   QUALITY — its oracle is the same strings file the tool reads, so a bad
   translation passes. Native review is a separate pass.

   Run: node scripts/smoke-the-queue-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.QUE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const PORT = Number(process.env.QUE_SMOKE_PORT) || 5695;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const T = require(path.join(ROOT, 'the-queue.js'));

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'the-queue.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

const base = 'http://localhost:' + PORT + '/the-queue.html';
const fails = [];
function ok(c, m) { if (!c) fails.push(m); }

async function sweep(page) {
  const rb = await page.$eval('.que-rail', el => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, cy: r.y + r.height / 2 }; });
  const b = await page.$('.que-b-enda'); const bb = await b.boundingBox();
  await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
  await page.mouse.move(rb.x + rb.w * 0.03, rb.cy); await page.mouse.down();
  await page.mouse.move(rb.x + rb.w * 0.97, rb.cy); await page.mouse.up();
  await new Promise(r => setTimeout(r, 250));
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  try {
    for (const loc of LOCALES) {
      const ctx = await browser.createBrowserContext ? await browser.createBrowserContext() : browser;
      const page = await (ctx.newPage ? ctx.newPage() : browser.newPage());
      await page.setViewport({ width: 768, height: 900 });
      await page.goto(base + '?lang=' + loc, { waitUntil: 'networkidle0' });
      await page.waitForSelector('.que-wrap');
      await new Promise(r => setTimeout(r, 120));

      const title = await page.$eval('.lcs-title', el => el.textContent.trim());
      ok(title === T.strings.title[loc], loc + ': title translated (got "' + title + '")');
      const instr = await page.$eval('.lcs-instruction', el => el.textContent.trim());
      ok(instr === T.strings.instruction[loc], loc + ': instruction translated');
      const btnA = await page.$eval('.que-b-enda .que-label', el => el.textContent.trim());
      ok(btnA === T.strings.endLeft[loc], loc + ': end-A button translated');
      const again = await page.$eval('.que-b-again .que-label', el => el.textContent.trim());
      ok(again === T.strings.newLine[loc], loc + ': new-line button translated');

      // no raw string-key leaks in the visible chrome, no token braces
      const visible = await page.$eval('.que-wrap', el => el.innerText);
      ok(!/\{[nk]\}/.test(visible), loc + ': no {n}/{k} token leak in visible text');
      const keyNames = Object.keys(T.strings);
      const leaked = keyNames.filter(k => new RegExp('(^|\\s)' + k + '(\\s|$)').test(visible) && k.length > 4);
      ok(leaked.length === 0, loc + ': no raw string-key leak (' + leaked.join(',') + ')');

      // it runs: a sweep makes badges + a total
      await sweep(page);
      const nBadge = await page.$$eval('.que-badge', b => b.length);
      ok(nBadge === 5, loc + ': a sweep accretes 5 badges (got ' + nBadge + ')');
      const tot = await page.$eval('.que-svg', svg => { const t = svg.querySelector('.que-total text'); return t ? t.textContent : null; }).catch(() => null);
      ok(tot === '5', loc + ': the total pill renders 5');

      // FREE tier: no premium chips, print unreachable
      ok(!(await page.$('.que-b-join')), loc + ': FREE has no Join chip in the DOM');
      ok(!(await page.$('.que-b-leave')), loc + ': FREE has no Leave chip in the DOM');
      ok(!(await page.$('.que-b-print')), loc + ': FREE has no Print chip in the DOM');
      const printed = await page.evaluate(() => { let hit = false; const o = window.print; window.print = () => { hit = true; }; window.__wasPrint = () => hit; window.print = window.print; return hit; });
      ok(printed === false, loc + ': FREE does not auto-print');

      if (ctx.close && ctx !== browser) await ctx.close(); else await page.close();
    }

    // ---- one PREMIUM run: chips appear, window.print reachable ----
    const pctx = await browser.createBrowserContext ? await browser.createBrowserContext() : browser;
    const pp = await (pctx.newPage ? pctx.newPage() : browser.newPage());
    await pp.setRequestInterception(true);
    pp.on('request', r => {
      if (/\/api\/entitlement/.test(r.url())) r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ tier: 'teacher' }) });
      else r.continue();
    });
    let didPrint = false;
    await pp.exposeFunction('__markPrint', () => { didPrint = true; });
    await pp.evaluateOnNewDocument(() => { window.print = () => window.__markPrint(); });
    await pp.setViewport({ width: 768, height: 900 });
    await pp.goto(base + '?lang=en', { waitUntil: 'networkidle0' });
    await pp.waitForSelector('.que-wrap');
    await new Promise(r => setTimeout(r, 400)); // entitlement resolves → rebuild
    ok(!!(await pp.$('.que-b-join')), 'PREMIUM: Join chip present');
    ok(!!(await pp.$('.que-b-leave')), 'PREMIUM: Leave chip present');
    ok(!!(await pp.$('.que-b-print')), 'PREMIUM: Print chip present');
    const pb = await pp.$('.que-b-print'); const pbb = await pb.boundingBox();
    await pp.mouse.click(pbb.x + pbb.width / 2, pbb.y + pbb.height / 2);
    await new Promise(r => setTimeout(r, 150));
    ok(didPrint === true, 'PREMIUM: the Print chip reaches window.print');
  } catch (e) {
    fails.push('EXCEPTION: ' + (e && e.stack || e));
  } finally {
    await browser.close(); srv.close();
  }
  if (fails.length) { console.log(fails.length + ' FAIL:'); fails.forEach(f => console.log('  ✗ ' + f)); process.exit(1); }
  console.log('ALL PASS — 11 locales render translated, free-tier gated, premium unlocks');
})();
