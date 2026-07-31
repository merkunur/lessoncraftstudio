/* =====================================================================
   smoke-number-sieve-locales.js — the eleven-locale string digest
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-number-sieve-locales.js

   ⚠ THE DIGEST IS THE POINT. Read the output; do not just check the exit
   code. It prints the AUTHORED set — every key, marked seen or unseen —
   rather than whatever happened to render, because printing only what
   rendered leaves the unrendered strings unreviewed, which is exactly the
   set worth reviewing.

   ⚠ FRESH BROWSER PER LOCALE. A shared one gave a false negative on the
   eleventh page elsewhere in this suite, and localStorage is per-origin
   so a shared profile carries the previous locale's saved state over.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5509;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
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
vm.runInContext(fs.readFileSync(path.join(MINI, 'number-sieve.js'), 'utf8') + '\n;this.__T = NumberSieve;', sandbox);
const S = sandbox.__T.strings;

/* filled at render from a template — the digest marks these `a` and the
   assertion below checks the FILLED form instead */
const ARIA_KEYS = ['cellAria', 'cellOutAria', 'markerAria', 'cardAria'];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('    ok   ' + m); } else { FAIL++; console.error('    FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (t) => String(t).replace(/^[^\p{L}\p{N}]+/u, '').trim();

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

  for (const loc of LOCALES) {
    console.log(`\n── ${loc} ──`);
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width: 1024, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
      : r.continue()));
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });

    await page.goto(`http://127.0.0.1:${PORT}/number-sieve.html?lang=${loc}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.nsv-wrap', { timeout: 9000 });
    await page.waitForSelector('.nsv-card', { timeout: 9000 });
    await wait(300);

    const collect = () => page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.nsv-wrap *, .lcs-header h1, .lcs-title').forEach((e) => {
        const t = Array.from(e.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
        if (t) out.push(t);
        const a = e.getAttribute && e.getAttribute('aria-label');
        if (a) out.push(a.trim());
      });
      const h = document.querySelector('.lcs-app h1, .lcs-header h1');
      if (h) out.push(h.textContent.trim());
      return out;
    });

    /* ⚠ DRIVE EVERY STATE THE RESTING PAGE NEVER SHOWS, or a third of the
       strings never render and therefore never get READ. */
    let seen = await collect();                                    /* parkHint */
    await page.evaluate(() => { const c = document.querySelector('.nsv-cell[data-n="3"]'); if (c) c.click(); });
    await wait(180);
    seen = seen.concat(await collect());                           /* instruction + markerAria */
    await page.evaluate(() => { const b = document.querySelector('.nsv-card.nsv-next'); if (b) b.click(); });
    await wait(200);
    seen = seen.concat(await collect());                           /* cellOutAria */
    for (let i = 0; i < 8; i++) {
      const more = await page.evaluate(() => { const b = document.querySelector('.nsv-card.nsv-next'); if (!b) return false; b.click(); return true; });
      if (!more) break;
      await wait(140);
    }
    seen = seen.concat(await collect());                           /* tryAnother */
    await page.evaluate(() => { const c = Array.from(document.querySelectorAll('.nsv-foot .nsv-chip')); if (c[0]) c[0].click(); });
    await wait(200);
    seen = seen.concat(await collect());                           /* shuffleBtn state */
    await page.evaluate(() => { const c = Array.from(document.querySelectorAll('.nsv-bar .nsv-chip')); if (c[3]) c[3].click(); });
    await wait(180);
    seen = seen.concat(await collect());                           /* pickHint */
    await page.evaluate(() => { const c = Array.from(document.querySelectorAll('.nsv-bar .nsv-chip')); if (c[4]) c[4].click(); });
    await wait(220);
    seen = seen.concat(await collect());                           /* library */
    /* the print gate — free account, so this really is reachable here */
    await page.evaluate(() => {
      const c = Array.from(document.querySelectorAll('.nsv-foot .nsv-chip'));
      const pr = c[c.length - 1];
      if (pr) pr.click();
    });
    await wait(250);
    seen = seen.concat(await collect());                           /* gateLine + unlock */

    const rendered = new Set(seen.concat(seen.map(norm)));

    /* ---- THE DIGEST: every authored string, marked ---- */
    console.log('  ── every authored string ──');
    Object.keys(S).forEach((k) => {
      const v = S[k][loc];
      let mark = rendered.has(v) || rendered.has(norm(v)) ? ' ' : '·';
      if (ARIA_KEYS.indexOf(k) > -1) mark = 'a';
      console.log(`    ${mark} ${k.padEnd(13)} ${v}`);
    });

    const unseen = Object.keys(S).filter((k) => ARIA_KEYS.indexOf(k) === -1)
      .filter((k) => !(rendered.has(S[k][loc]) || rendered.has(norm(S[k][loc]))));
    is(unseen.length === 0, `every non-aria string rendered${unseen.length ? ' — missing ' + unseen.join(', ') : ''}`);

    /* the aria templates really were filled with a number of this field */
    const ariaOk = await page.evaluate(() => {
      const c = document.querySelector('.nsv-cell');
      const card = document.querySelector('.nsv-card');
      return { cell: c ? c.getAttribute('aria-label') : '', card: card ? card.getAttribute('aria-label') : '' };
    });
    const cellRe = new RegExp('^' + S.cellAria[loc].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{n\\}', '\\d+') + '$');
    const outRe = new RegExp('^' + S.cellOutAria[loc].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{n\\}', '\\d+') + '$');
    is(cellRe.test(ariaOk.cell) || outRe.test(ariaOk.cell), `the cell aria label is filled in this locale ("${ariaOk.cell}")`);
    const cardRe = new RegExp('^' + S.cardAria[loc].replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{i\\}', '\\d+') + '$');
    is(cardRe.test(ariaOk.card), `the card aria label is POSITIONAL and filled ("${ariaOk.card}")`);

    /* ⚠ full phrases only, and a length floor — a bare cognate is shared
       across the Nordics and a substring check on one would cry wolf */
    const mine = new Set(Object.keys(S).map((k) => S[k][loc]));
    const others = [];
    LOCALES.filter((l) => l !== loc).forEach((l) => {
      Object.keys(S).forEach((k) => {
        const v = S[k][l];
        if (v && v.length >= 14 && !mine.has(v) && rendered.has(v)) others.push(`${l}.${k}`);
      });
    });
    is(others.length === 0, `no other locale's wording leaked in${others.length ? ' — ' + others.join(', ') : ''}`);
    is(errs.length === 0, `zero console errors${errs.length ? ' — ' + errs[0] : ''}`);

    await browser.close();
  }

  server.close();
  console.log('');
  console.log(FAIL ? `FAIL — ${PASS} passed, ${FAIL} failed` : `PASS — ${PASS} assertions across ${LOCALES.length} locales, 0 failed`);
  process.exit(FAIL ? 1 : 0);
})();
