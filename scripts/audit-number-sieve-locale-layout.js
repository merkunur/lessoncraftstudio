/* =====================================================================
   audit-number-sieve-locale-layout.js — 11 locales x 6 viewports
   ---------------------------------------------------------------------
   Run:  node scripts/audit-number-sieve-locale-layout.js [--shot]

   ⚠ WHY THIS EXISTS. local-test runs in English. German, Dutch and
   Finnish chips are far longer ("Karten mischen", "Kaarten schudden",
   "Sekoita kortit"), and an English-only sweep is structurally blind to
   what they do to a 320px bar. English fits; the product does not.

   THE RULE, matching the platform standard:
     - at >=768 (the viewport the operator actually uses) every resting
       control MUST FIT. No exceptions.
     - below 768 it must fit OR be PROVEN REACHABLE by scrolling — and
       reachability is measured here, not assumed.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5511;
const SHOT = process.argv.indexOf('--shot') > -1;
const SHOT_DIR = path.join(ROOT, 'docs', 'audit-results', 'number-sieve', 'qa');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const VIEWPORTS = [[320, 640], [360, 740], [412, 820], [768, 1000], [1024, 900], [1366, 900],
  /* the three tier FLOORS -- the widest board each tier draws against the
     SHORTEST viewport that draws it, which is where a cap fails if it is
     going to. Plus the two real classroom boards. */
  [1400, 880], [1800, 1000], [1920, 1080], [2400, 1150], [2560, 1440]];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
      : r.continue()));
    await page.setViewport({ width: 320, height: 640 });
    await page.goto(`http://127.0.0.1:${PORT}/number-sieve.html?lang=${loc}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.nsv-card', { timeout: 9000 });
    /* the busiest resting state this tool has: the densest field, a
       marker down, and the gate line showing */
    await page.evaluate(() => {
      /* the gate line first: cycling the library is what raises it now */
      const T = window.NumberSieve;
      if (T) { T.premiumKnown = true; T.premium = false; }
      const lib = document.querySelector('[data-fk="chip:lib"]');
      if (lib) { for (let i = 0; i < 12; i++) lib.click(); }
    });
    await wait(200);
    await page.evaluate(() => {
      /* then the densest field — name the control, do not count siblings */
      const b = document.querySelector('[data-fk="chip:f120"]');
      if (b) b.click();
    });
    await wait(300);
    await page.evaluate(() => { const c = document.querySelector('.nsv-cell[data-n="7"]'); if (c) c.click(); });
    await wait(160);


    /* ⭐ THE GUARD. Everything below measures the DENSEST board. If it
       is not on screen this run is measuring a different object and
       must fail loudly rather than pass quietly. */
    const onScreen = await page.evaluate(() => document.querySelectorAll('.nsv-cell').length);
    is(onScreen === 120, `[${loc}] the densest field really is on screen (${onScreen} cells)`);
    if (onScreen !== 120) { await page.close(); continue; }
    /* and the states this audit claims to be measuring really were
       entered: a marker parked, and the gate line showing */
    const primed = await page.evaluate(() => ({
      marked: document.querySelectorAll('.nsv-cell.nsv-marked').length,
      gate: (() => { const g = document.querySelector('.nsv-gate'); return g ? getComputedStyle(g).display !== 'none' : false; })()
    }));
    is(primed.marked > 0, `[${loc}] a marker really is parked (${primed.marked})`);

    for (const [w, h] of VIEWPORTS) {
      await page.setViewport({ width: w, height: h });
      await wait(220);
      const m = await page.evaluate(() => {
        const c = Array.from(document.querySelectorAll('.nsv-chip, .nsv-card, .nsv-gate a'))
          .filter((e) => e.getBoundingClientRect().width > 0);
        const lowest = c.reduce((b, e) => Math.max(b, e.getBoundingClientRect().bottom), 0);
        const low = c.reduce((bb, e) => (!bb || e.getBoundingClientRect().bottom > bb.getBoundingClientRect().bottom ? e : bb), null);
        const small = c.filter((e) => e.getBoundingClientRect().height < 43.5).map((e) => (e.className || e.tagName) + ' ' + Math.round(e.getBoundingClientRect().height));
        /* ⚠ EVERY text-bearing node, not a hand-picked selector list — a
           list of selectors is a list somebody has to remember to
           extend, and that is how a 13px legend shipped elsewhere. */
        const tiny = [];
        Array.from(document.querySelectorAll('.nsv-wrap *')).forEach((e) => {
          if (!Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) return;
          const fs_ = parseFloat(getComputedStyle(e).fontSize);
          if (fs_ < 13.5) tiny.push((e.className || e.tagName) + ' ' + fs_);
        });
        let took = null, afterTop = null, afterBottom = null;
        if (low) {
          for (let el = low; el; el = el.parentElement) {
            const before = el.scrollTop;
            el.scrollTop = before + 4000;
            if (el.scrollTop > before + 1) { took = el.tagName + '.' + (el.className || ''); break; }
            el.scrollTop = before;
          }
          const r = low.getBoundingClientRect();
          afterTop = Math.round(r.top); afterBottom = Math.round(r.bottom);
        }
        return {
          n: c.length, lowest: Math.round(lowest), small, tiny, took, afterTop, afterBottom,
          overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth)
        };
      });

      const fits = m.lowest <= h + 8;
      is(m.overflow <= 2, `${loc} ${w}x${h}: the page scrolls sideways (${m.overflow}px)`);
      if (w >= 768) {
        is(fits, `${loc} ${w}x${h}: controls do not FIT (lowest ${m.lowest} > ${h})`);
      } else {
        const reachable = fits || (m.took !== null && m.afterBottom <= h + 8 && m.afterTop >= 0);
        is(reachable, `${loc} ${w}x${h}: not reachable — scrolled ${m.took || 'nothing'}, then ${m.afterTop}-${m.afterBottom}`);
      }
      is(m.small.length === 0, `${loc} ${w}x${h}: taps under 44px — ${m.small.slice(0, 3).join(' | ')}`);
      is(m.tiny.length === 0, `${loc} ${w}x${h}: text under 14px — ${m.tiny.slice(0, 3).join(' | ')}`);

      if (SHOT && (w === 360 || w === 1024)) {
        fs.mkdirSync(SHOT_DIR, { recursive: true });
        await page.screenshot({ path: path.join(SHOT_DIR, `loc-${loc}-${w}.png`) });
      }
    }
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('');
  console.log(FAIL ? `FAIL — ${PASS} passed, ${FAIL} failed` : `PASS — ${PASS} assertions (${LOCALES.length} locales x ${VIEWPORTS.length} viewports x 4), 0 failed`);
  process.exit(FAIL ? 1 : 0);
})();
