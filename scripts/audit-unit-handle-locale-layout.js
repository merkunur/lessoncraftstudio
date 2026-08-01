/* =====================================================================
   audit-unit-handle-locale-layout.js — TOOL #40, 11 locales x 6 widths
   ---------------------------------------------------------------------
   Run:  node scripts/audit-unit-handle-locale-layout.js

   The sweep in local-test-unit-handle.js measures ENGLISH at six widths. This
   measures the other ten, because German compounds and Finnish cases run
   long and a control that fits "Lift the unit-handle" need not fit "Deckel
   hochheben". 66 renders, every one measured — no sampling.

   ⚠ CONTAINMENT IS MEASURED AGAINST THE CARD, not the inner box: an
   inner strip with overflow-x absorbs the evidence and reports clean.
   ⚠ AND AGAINST A LOADED TABLE. The longest strings appear once the
   unit-handle are DOWN and the gate is showing, so this drives the tool into
   that state before it measures anything.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5532;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const WIDTHS = [320, 360, 412, 768, 1024, 1366];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(decodeURIComponent(req.url.split('?')[0])));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'unit-handle.js'), 'utf8') + '\n;this.__T = UnitHandle;', sandbox);
const T = sandbox.__T;

let PASS = 0, FAIL = 0;
const bad = (m) => { FAIL++; console.error('  FAIL ' + m); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = serve().listen(PORT);
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => (r.url().includes('/api/auth/me')
    ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
    : r.continue()));

  let worstCtrl = 999, worstFont = 999, checked = 0;
  const longest = {};

  for (const loc of LOCALES) {
    for (const w of WIDTHS) {
      await page.setViewport({ width: w, height: w >= 768 ? 900 : 780 });
      await page.goto(`http://127.0.0.1:${PORT}/unit-handle.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.unh-wrap', { timeout: 9000 });
      await wait(260);
      /* drive it into the state that carries the longest strings */
      await page.evaluate((labels) => {
        const hit = (l) => {
          const b = Array.from(document.querySelectorAll('.unh-foot .unh-chip')).find((x) => x.textContent === l);
          if (b && !b.disabled) { b.click(); return true; }
          return false;
        };
        hit(labels.print);            /* free tier -> the gate shows */
      }, { print: T.strings.printBtn[loc] });
      await wait(320);

      const m = await page.evaluate(() => {
        const card = document.querySelector('.lcs-app').getBoundingClientRect();
        const vis = (e) => e.offsetParent !== null;
        const ctrls = Array.from(document.querySelectorAll('.unh-chip,.unh-grip')).filter(vis);
        const minCtrl = ctrls.length ? Math.min(...ctrls.map((e) => { const r = e.getBoundingClientRect(); return Math.min(r.width, r.height); })) : null;
        const texts = Array.from(document.querySelectorAll('.unh-hint,.unh-chip,.unh-count,.unh-gate span,.unh-gate a')).filter((e) => vis(e) && (e.textContent || '').trim());
        const minFont = texts.length ? Math.min(...texts.map((e) => parseFloat(getComputedStyle(e).fontSize))) : 99;
        /* a label wider than its own box is a clipped label */
        const clipped = texts.filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent.trim());
        const outside = Array.from(document.querySelectorAll('.unh-bench,.unh-foot,.unh-hint,.unh-gate'))
          .filter(vis)
          .filter((e) => { const r = e.getBoundingClientRect(); return r.right > card.right + 1 || r.left < card.left - 1; })
          .map((e) => e.className);
        const foot = document.querySelector('.unh-foot').getBoundingClientRect();
        const widest = ctrls
          .filter((e) => e.className.indexOf('unh-chip') >= 0)
          .map((e) => ({ t: e.textContent.trim(), w: Math.round(e.getBoundingClientRect().width) }))
          .sort((a, b) => b.w - a.w)[0];
        return {
          minCtrl, minFont, clipped, outside, widest,
          gate: !!document.querySelector('.unh-gate'),
          doc: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          bottom: foot.bottom, cardBottom: card.bottom
        };
      });

      const tag = loc + '@' + w;
      if (!m.gate) bad(tag + ': the gate did not appear, so the longest strings were never measured');
      if (m.minCtrl !== null && m.minCtrl < 43.5) bad(tag + ': a control is ' + m.minCtrl.toFixed(1) + 'px, under the 44px floor');
      if (m.minCtrl !== null) worstCtrl = Math.min(worstCtrl, m.minCtrl);
      if (m.minFont < 14) bad(tag + ': text at ' + m.minFont + 'px, under the 14px legibility floor');
      worstFont = Math.min(worstFont, m.minFont);
      if (m.clipped.length) bad(tag + ': clipped label(s) — "' + m.clipped.join('", "') + '"');
      if (m.outside.length) bad(tag + ': outside THE CARD — ' + m.outside.join(', '));
      if (m.doc > 0) bad(tag + ': the page overflows sideways by ' + m.doc + 'px');
      if (w >= 768 && m.bottom > 900) bad(tag + ': does not FIT — the foot ends at ' + Math.round(m.bottom) + 'px');
      if (w < 768 && m.bottom > m.cardBottom + 1) bad(tag + ': the foot ends past the card the iframe is grown to');
      if (m.widest && (!longest[loc] || m.widest.w > longest[loc].w)) longest[loc] = m.widest;
      checked++;
      PASS++;
    }
    const L = longest[loc];
    console.log('  ' + loc + '  ' + WIDTHS.length + ' widths ok   longest control: "' + (L ? L.t : '?') + '" (' + (L ? L.w : 0) + 'px)');
  }

  await browser.close();
  server.close();
  console.log('');
  console.log('  ' + checked + ' renders (11 locales x 6 widths); smallest control ' + worstCtrl.toFixed(1) + 'px, smallest text ' + worstFont + 'px');
  if (FAIL) { console.error('FAIL — ' + FAIL + ' defect(s)'); process.exit(1); }
  console.log('PASS — no locale breaks the layout at any width');
})();
