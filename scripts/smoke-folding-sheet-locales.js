#!/usr/bin/env node
/* =====================================================================
   smoke-folding-sheet-locales.js — mount TOOL #34 in all eleven locales
   and PRINT EVERY STRING IT RENDERS.

   ⚠ The digest is the point. Read the output; do not just check the exit
   code. A printed digest has caught a locale authored in the wrong
   variety and state leaking between locales, which no assertion did.

   ⚠ Class Graph never speaks — it is a visual discussion instrument —
   so there is no voice path to drive here. What the digest must instead
   reach is the SETUP panel and the REVEALED board, or a third of the
   strings never render and never get read.

   Usage: node scripts/smoke-folding-sheet-locales.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
/* shown only to a NON-subscriber, so absent from this run by design */
/* nothing is hidden from a subscriber here: the print gate is driven
   below, so every authored string must render */
/* ⚠ shown only to a NON-subscriber at the moment they press print.
   This run spoofs a full subscription, so print simply prints and
   these two cannot appear — marking them "g" in the digest is honest,
   asserting they rendered would be a lie the harness tells itself. */
const GATE_KEYS = ['gatePrint', 'unlock'];

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
    createElementNS: () => ({ setAttribute() {}, appendChild() {} }), head: { appendChild() {} },
    body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'folding-sheet.js'), 'utf8') + '\n;this.__T = FoldingSheet;', sandbox);
const S = sandbox.__T.strings;


const server = http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

const PORT = 5479;

(async () => {
  await new Promise((r) => server.listen(PORT, r));

  for (const loc of LOCALES) {
    console.log(`\n[${loc}]`);
    /* ⚠ a FRESH browser per locale: a shared one gave a false negative on
       the eleventh page, and localStorage is per-origin so a shared
       profile carries the previous locale's saved state over */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setRequestInterception(true);
      page.on('request', (r) => r.url().includes('/api/auth/me')
        ? r.respond({ status: 200, contentType: 'application/json',
            body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
        : r.continue());
      await page.evaluateOnNewDocument(() => {
        try { localStorage.clear(); localStorage.setItem('accessToken', 'harness'); } catch (_) {}
        window.__spoken = [];
        const install = () => {
          if (!window.LCSAudio) return false;
          window.LCSAudio.speak = function (o) { window.__spoken.push(o); };
          window.LCSAudio.cancel = function () {};
          window.LCSAudio._loadInventory = function () { return Promise.resolve({}); };
          return true;
        };
        if (!install()) {
          const iv = setInterval(() => { if (install()) clearInterval(iv); }, 10);
          setTimeout(() => clearInterval(iv), 5000);
        }

      });
      const errs = [];
      page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push(String(e)));

      await page.setViewport({ width: 1024, height: 900 });
      await page.goto(`http://127.0.0.1:${PORT}/folding-sheet.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.fsh-wrap', { timeout: 8000 });
      await wait(700);

      const collect = () => page.evaluate(() => {
        const out = [];
        document.querySelectorAll('.fsh-wrap *, .lcs-field label, .lcs-header h1, .lcs-instruction').forEach((e) => {
          const t = Array.from(e.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
          if (t) out.push(t);
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) out.push(a.trim());
        });
        return out;
      });

      const mount = await page.evaluate(() => ({
        cells: document.querySelectorAll('.fsh-cell').length,
        gaps: document.querySelectorAll('.fsh-gap').length
      }));
      let seen = await collect();

      /* the settings drawer — [settings] is always the first control
         (lcs-shell.js:516), which is the only locale-independent handle */
      await page.evaluate(() => { const c = document.querySelectorAll('.lcs-ctrl'); if (c.length) c[0].click(); });
      await wait(300);
      seen = seen.concat(await collect());
      await page.evaluate(() => { const x = document.querySelector('.lcs-drawer .lcs-ctrl'); if (x) x.click(); });
      await wait(250);

      /* ⚠ DRIVE EVERY STATE THE RESTING PAGE NEVER SHOWS, or a third of
         the strings never render and therefore never get READ. The
         legend only exists once folded; hangsOff only once the crease
         is off-centre; the ghost chip changes its own label. */
      const chip = (label) => page.evaluate((t) => {
        const b = Array.from(document.querySelectorAll('.fsh-chip')).find((x) => x.textContent === t);
        if (!b) return false;
        b.click();
        return true;
      }, label);

      /* paint a lopsided figure so the fold has all three things to say */
      await page.evaluate(() => {
        [9, 10, 17, 18, 19, 25, 33, 34, 42].forEach((i) => {
          const c = document.querySelector('.fsh-cell[data-i="' + i + '"]'); if (c) c.click();
        });
      });
      await wait(250);
      seen = seen.concat(await collect());

      is(await chip(S.ghostBtn[loc]), `the mirror chip is clickable ("${S.ghostBtn[loc]}")`);
      await wait(320);
      seen = seen.concat(await collect());
      is(await chip(S.ghostHide[loc]), `and it changes its own label ("${S.ghostHide[loc]}")`);
      await wait(250);

      /* an off-centre crease, so the overhang line has something to say */
      await page.evaluate(() => { const g = document.querySelectorAll('.fsh-gap'); if (g[0]) g[0].click(); });
      await wait(280);
      seen = seen.concat(await collect());

      is(await chip(S.foldBtn[loc]), `the fold chip is clickable ("${S.foldBtn[loc]}")`);
      await wait(650);
      seen = seen.concat(await collect());
      /* capture the legend WHILE FOLDED — it does not exist once opened,
         and asserting it at the end measured the wrong moment */
      const legend = await page.evaluate(() => document.querySelectorAll('.fsh-leg').length);
      is(await chip(S.openBtn[loc]), `and it opens out again ("${S.openBtn[loc]}")`);
      await wait(400);
      seen = seen.concat(await collect());

      /* the print gate, the only paid surface here */
      await page.evaluate(() => {
        const b = Array.from(document.querySelectorAll('.fsh-chip')).pop();
        if (b) b.click();
      });
      await wait(320);
      seen = seen.concat(await collect());

      const norm = (t) => String(t).replace(/^[^\p{L}\p{N}]+/u, '').trim();
      const rendered = new Set(seen.concat(seen.map(norm)));
      /* ---- THE DIGEST: every authored string, marked seen or not ---- */
      console.log('  ── every authored string ──');
      Object.keys(S).forEach((k) => {
        const v = S[k][loc];
        let mark = rendered.has(v) ? ' ' : '·';
        if (GATE_KEYS.indexOf(k) > -1) mark = 'g';
        if (k === 'cellAria') mark = 'a';   /* an aria template, filled at render */
        console.log(`    ${mark} ${k.padEnd(13)} ${v}`);
      });


      /* ---- assertions ---- */
      is(mount.cells === 64, `mounted (${mount.cells} squares)`);
      is(mount.gaps === 7, `${mount.gaps} gap handles`);
      const unseen = Object.keys(S)
        .filter((k) => GATE_KEYS.indexOf(k) === -1 && k !== 'cellAria')
        .filter((k) => !rendered.has(S[k][loc]));
      is(unseen.length === 0, `every non-gate string rendered${unseen.length ? ' — missing ' + unseen.join(', ') : ''}`);
      /* the aria template really was filled with two words of THIS line */
      const tmpl = S.cellAria[loc];
      const re = new RegExp('^' + tmpl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace('\\{r\\}', '\\d+').replace('\\{c\\}', '\\d+') + '$');
      is(seen.some((t) => re.test(t)), `the cell aria label is filled in this locale ("${tmpl}")`);
      /* the reveal really happened, in this locale */
      is(legend === 3, `the fold legend named all three states (${legend})`);

      /* no OTHER locale's phrasing leaked in */
      const mine = new Set(Object.keys(S).map((k) => S[k][loc]).filter(Boolean));
      const others = [];
      LOCALES.filter((l) => l !== loc).forEach((l) => Object.keys(S).forEach((k) => {
        const v = S[k][l];
        /* full phrases only — a bare cognate is shared across the Nordics
           and a substring check on it would be a false alarm */
        if (v && v.length >= 14 && !mine.has(v)) others.push(v);
      }));
      const leak = seen.filter((t) => t.length >= 14 && others.indexOf(t) > -1);
      is(leak.length === 0, `no other locale leaked in${leak.length ? ' — ' + leak[0] : ''}`);
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
