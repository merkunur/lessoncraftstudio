#!/usr/bin/env node
/* =====================================================================
   smoke-class-graph-locales.js — mount TOOL #34 in all eleven locales
   and PRINT EVERY STRING IT RENDERS.

   ⚠ The digest is the point. Read the output; do not just check the exit
   code. A printed digest has caught a locale authored in the wrong
   variety and state leaking between locales, which no assertion did.

   ⚠ Class Graph never speaks — it is a visual discussion instrument —
   so there is no voice path to drive here. What the digest must instead
   reach is the SETUP panel and the REVEALED board, or a third of the
   strings never render and never get read.

   Usage: node scripts/smoke-class-graph-locales.js
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
const GATE_KEYS = ['gateCats', 'gatePrint', 'unlock'];

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
vm.runInContext(fs.readFileSync(path.join(MINI, 'class-graph.js'), 'utf8') + '\n;this.__T = ClassGraph;', sandbox);
const S = sandbox.__T.strings;
const STARTERS = sandbox.__T.starters;

const server = http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

const PORT = 5459;

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
      await page.goto(`http://127.0.0.1:${PORT}/class-graph.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.cgr-wrap', { timeout: 8000 });
      await wait(700);

      const collect = () => page.evaluate(() => {
        const out = [];
        document.querySelectorAll('.cgr-wrap *, .lcs-field label, .lcs-header h1, .lcs-instruction').forEach((e) => {
          const t = Array.from(e.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
          if (t) out.push(t);
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) out.push(a.trim());
        });
        return out;
      });

      const mount = await page.evaluate(() => ({
        cols: document.querySelectorAll('.cgr-col').length,
        votes: document.querySelectorAll('.cgr-vote').length
      }));
      let seen = await collect();

      /* the settings drawer — [settings] is always the first control
         (lcs-shell.js:516), which is the only locale-independent handle */
      await page.evaluate(() => { const c = document.querySelectorAll('.lcs-ctrl'); if (c.length) c[0].click(); });
      await wait(300);
      seen = seen.concat(await collect());
      await page.evaluate(() => { const x = document.querySelector('.lcs-drawer .lcs-ctrl'); if (x) x.click(); });
      await wait(250);

      /* drive every state the resting page never shows */
      /* ⚠ click chips by their LOCALIZED text, not by index: adding a
         scoop inserts a chip, so any positional guess silently opens the
         wrong thing and the digest quietly loses four strings. */
      const chip = (label) => page.evaluate((t) => {
        const b = Array.from(document.querySelectorAll('.cgr-chip')).find((x) => x.textContent === t);
        if (!b) return false;
        b.click();
        return true;
      }, label);
      /* a vote, so the undo chip exists at all */
      await page.evaluate(() => { document.querySelectorAll('.cgr-vote')[0].click(); });
      await wait(220);
      seen = seen.concat(await collect());
      is(await chip(S.asBars[loc]), `the bar chip is clickable ("${S.asBars[loc]}")`);
      await wait(300);
      is(await chip(S.showCounts[loc]), `the reveal chip is clickable ("${S.showCounts[loc]}")`);
      await wait(280);
      seen = seen.concat(await collect());
      is(await chip(S.editQuestion[loc]), `the setup chip is clickable ("${S.editQuestion[loc]}")`);
      await wait(380);
      seen = seen.concat(await collect());
      /* ⚠ some strings render behind a glyph (the 🔇 line), so an exact
         match silently reports them missing. Normalise a leading
         non-letter run away before comparing. */
      const norm = (t) => String(t).replace(/^[^\p{L}\p{N}]+/u, '').trim();
      const rendered = new Set(seen.concat(seen.map(norm)));

      /* ---- THE DIGEST: every authored string, marked seen or not ---- */
      console.log('  ── every authored string ──');
      Object.keys(S).forEach((k) => {
        const v = S[k][loc];
        let mark = rendered.has(v) ? ' ' : '·';
        if (GATE_KEYS.indexOf(k) > -1) mark = 'g';
        if (k === 'tapToVote') mark = 'a';   /* an aria template, filled at render */
        console.log(`    ${mark} ${k.padEnd(13)} ${v}`);
      });
      console.log('  ── the four starter surveys ──');
      (STARTERS[loc] || []).forEach((x) => console.log(`      ${x.q}   [${x.cats.join(' | ')}]`));

      /* ---- assertions ---- */
      is(mount.cols === 3, `mounted (${mount.cols} answers)`);
      is(mount.votes === mount.cols, 'a vote button per answer');
      const unseen = Object.keys(S)
        .filter((k) => GATE_KEYS.indexOf(k) === -1 && k !== 'tapToVote')
        .filter((k) => !rendered.has(S[k][loc]));
      is(unseen.length === 0, `every non-gate string rendered${unseen.length ? ' — missing ' + unseen.join(', ') : ''}`);
      /* the aria template really was filled with two words of THIS line */
      const tmpl = S.tapToVote[loc];
      const re = new RegExp('^' + tmpl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{label\\}', '.+') + '$');
      is(seen.some((t) => re.test(t)), `the gap aria label is filled in this locale ("${tmpl}")`);
      /* the reveal really happened, in this locale */
      const revealed = await page.evaluate(() => document.querySelectorAll('.cgr-count').length);
      is(revealed === 3, `the numbers revealed in all three columns (${revealed})`);

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
