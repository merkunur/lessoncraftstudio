#!/usr/bin/env node
/* =====================================================================
   smoke-pattern-bench-locales.js — mount TOOL #32 in all eleven locales
   and PRINT EVERY STRING IT RENDERS.

   ⚠ The digest is the point. On Say It Board a printed digest caught two
   defects that every assertion missed — localStorage leaking state
   between locales, and one locale authored in the wrong variety. Read
   the output; do not just check the exit code.

   Asserts per locale: the tool mounts, every visible string belongs to
   THAT locale (no English leak, no OTHER locale's phrases), the strip
   and unit are there, no console errors.

   Usage: node scripts/smoke-pattern-bench-locales.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PUBLIC = path.join(ROOT, 'frontend', 'public');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp' };

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* the authored strings, straight from the tool */
const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'pattern-bench.js'), 'utf8') + '\n;this.__T = PatternBench;', sandbox);
const S = sandbox.__T.strings;

const server = http.createServer((req, res) => {
  const u = req.url.split('?')[0];
  const f = u.indexOf('/image-library-webp/') === 0 ? path.join(PUBLIC, u.replace(/^\//, '')) : path.join(MINI, path.basename(u));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

const PORT = 5447;

(async () => {
  await new Promise((r) => server.listen(PORT, r));

  for (const loc of LOCALES) {
    console.log(`\n[${loc}]`);
    /* ⚠ a FRESH browser per locale: one shared browser gave a false
       negative on the eleventh page, and localStorage is per-origin so a
       shared profile carries the previous locale's saved state over */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setRequestInterception(true);
      page.on('request', (r) => r.url().includes('/api/auth/me')
        ? r.respond({ status: 200, contentType: 'application/json',
            body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
        : r.continue());
      await page.evaluateOnNewDocument(() => { try { localStorage.clear(); localStorage.setItem('accessToken', 'harness'); } catch (_) {} });
      const errs = [];
      page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push(String(e)));

      await page.setViewport({ width: 1024, height: 900 });
      await page.goto(`http://127.0.0.1:${PORT}/pattern-bench.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.ptn-wrap', { timeout: 8000 });
      await wait(700);

      const collect = () => page.evaluate(() => {
        const out = [];
        document.querySelectorAll('.ptn-wrap *, .lcs-field label, .lcs-header h1, .lcs-instruction').forEach((e) => {
          const t = Array.from(e.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
          if (t) out.push(t);
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) out.push(a.trim());
        });
        return out;
      });

      /* open the settings drawer + the unit-hidden state so EVERY string renders */
      await page.evaluate(() => {
        const c = document.querySelectorAll('.lcs-ctrl');
        if (c.length) c[0].click();          /* [settings] is always first */
      });
      await wait(300);
      const st = await page.evaluate(() => ({
        cells: document.querySelectorAll('.ptn-strip .ptn-cell').length,
        unit: document.querySelectorAll('.ptn-unit .ptn-slot').length
      }));
      const seenRest = await collect();

      /* drive the states the resting page never shows, so the digest is
         COMPLETE: a costume change (the moat line), and the hidden unit */
      await page.evaluate(() => {
        const chips = Array.from(document.querySelectorAll('.ptn-chip'));
        if (chips[1]) chips[1].click();      /* second costume */
      });
      await wait(300);
      const afterCostume = await page.evaluate(() => {
        const t = document.querySelector('.ptn-transfer');
        return t ? t.textContent : null;
      });
      await page.evaluate(() => {
        const h = document.querySelector('.ptn-unithead .ptn-chip');
        if (h) h.click();                    /* hide the unit */
      });
      await wait(300);

      const seen = seenRest.concat(await collect());
      /* THE DIGEST — every authored string for this locale, marked with
         whether it was seen on the page. Printing only what rendered is
         how eight strings went unreviewed on the first run. */
      console.log('  ── every authored string ──');
      const rendered = new Set(seen);
      Object.keys(S).forEach((k) => {
        const v = S[k][loc];
        const GATE = { gatePicture: 1, gatePrint: 1, unlock: 1 };
        const mark = v && (rendered.has(v) || v === afterCostume) ? ' ' : (GATE[k] ? 'g' : '·');
        console.log(`    ${mark} ${k.padEnd(15)} ${v}`);
      });
      is(afterCostume === S.sameAgain[loc], `the transfer line is this locale: "${afterCostume}"`);
      const hid = seen.indexOf(S.hiddenUnitNote[loc]) > -1;
      is(hid, `the hidden-unit question rendered: "${S.hiddenUnitNote[loc]}"`);

      const mine = new Set(Object.keys(S).map((k) => S[k][loc]).filter(Boolean));
      const others = new Set();
      LOCALES.filter((l) => l !== loc).forEach((l) => Object.keys(S).forEach((k) => {
        const v = S[k][l];
        /* full phrases only — a bare root like "Bilder" is shared across
           de/sv/no and a substring check on it would be a false alarm */
        if (v && v.length >= 12 && !mine.has(v)) others.add(l + ': ' + v);
      }));
      const leak = seen.filter((t) => t.length >= 12 && Array.from(others).some((o) => o.slice(o.indexOf(': ') + 2) === t));
      is(leak.length === 0, `no other locale leaked in${leak.length ? ' — ' + leak[0] : ''}`);

      is(st.cells === 12 && st.unit === 2, `mounted at rest (${st.cells} beads, ${st.unit} unit slots)`);
      is(seen.indexOf(S.unitLabel[loc]) > -1, `unit label rendered: "${S.unitLabel[loc]}"`);
      const GATEK = ['gatePicture', 'gatePrint', 'unlock'];
      const unseen = Object.keys(S).filter((k) => GATEK.indexOf(k) === -1)
        .filter((k) => { const v = S[k][loc]; return !(rendered.has(v) || v === afterCostume); });
      is(unseen.length === 0, `every non-gate string rendered${unseen.length ? ' — missing ' + unseen.join(', ') : ''}`);
      is(errs.length === 0, `zero console errors${errs.length ? ' — ' + errs[0] : ''}`);
    } catch (e) {
      bad(`${loc}: ${String(e).slice(0, 140)}`);
    }
    await browser.close();
  }

  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
