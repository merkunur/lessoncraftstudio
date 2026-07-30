#!/usr/bin/env node
/* =====================================================================
   smoke-reading-easel-locales.js — mount TOOL #33 in all eleven locales
   and PRINT EVERY STRING IT RENDERS.

   ⚠ The digest is the point. Read the output; do not just check the exit
   code. A printed digest has caught a locale authored in the wrong
   variety and state leaking between locales, which no assertion did.

   ⚠ It runs with the device reporting a voice this page cannot use, so
   the voiceMissing line renders and gets reviewed too. Nine of eleven
   locales have no voice on a normal English Windows anyway.

   Usage: node scripts/smoke-reading-easel-locales.js
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
const GATE_KEYS = ['gateLibrary', 'gatePrint', 'unlock'];

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
vm.runInContext(fs.readFileSync(path.join(MINI, 'reading-easel.js'), 'utf8') + '\n;this.__T = ReadingEasel;', sandbox);
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
        /* a device with voices, none of them this page's language */
        try {
          Object.defineProperty(window.speechSynthesis, 'getVoices',
            { value: () => [{ lang: 'zz-ZZ', name: 'Nowhere' }], configurable: true });
        } catch (_) {}
      });
      const errs = [];
      page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push(String(e)));

      await page.setViewport({ width: 1024, height: 900 });
      await page.goto(`http://127.0.0.1:${PORT}/reading-easel.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.rde-wrap', { timeout: 8000 });
      await wait(700);

      const collect = () => page.evaluate(() => {
        const out = [];
        document.querySelectorAll('.rde-wrap *, .lcs-field label, .lcs-header h1, .lcs-instruction').forEach((e) => {
          const t = Array.from(e.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
          if (t) out.push(t);
          const a = e.getAttribute && e.getAttribute('aria-label');
          if (a) out.push(a.trim());
        });
        return out;
      });

      const mount = await page.evaluate(() => ({
        words: document.querySelectorAll('.rde-word').length,
        gaps: document.querySelectorAll('.rde-gap').length
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
      await page.evaluate(() => document.querySelectorAll('.rde-gap')[1].click());   /* a scoop */
      await wait(250);
      seen = seen.concat(await collect());
      /* ⚠ click chips by their LOCALIZED text, not by index: adding a
         scoop inserts a chip, so any positional guess silently opens the
         wrong thing and the digest quietly loses four strings. */
      const chip = (label) => page.evaluate((t) => {
        const b = Array.from(document.querySelectorAll('.rde-chip')).find((x) => x.textContent === t);
        if (!b) return false;
        b.click();
        return true;
      }, label);
      is(await chip(S.stepScoop[loc]), `the step-through chip is clickable ("${S.stepScoop[loc]}")`);
      await wait(250);
      seen = seen.concat(await collect());
      is(await chip(S.changeLine[loc]), `the editor chip is clickable ("${S.changeLine[loc]}")`);
      await wait(350);
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
        if (k === 'scoopHere') mark = 'a';   /* an aria template, filled at render */
        console.log(`    ${mark} ${k.padEnd(13)} ${v}`);
      });
      console.log('  ── the eight starter lines ──');
      (STARTERS[loc] || []).forEach((l) => console.log(`      ${l}`));

      /* ---- assertions ---- */
      is(mount.words >= 4, `mounted (${mount.words} words, ${mount.gaps} gaps)`);
      is(mount.gaps === mount.words - 1, 'a gap between every pair of words');
      const unseen = Object.keys(S)
        .filter((k) => GATE_KEYS.indexOf(k) === -1 && k !== 'scoopHere')
        .filter((k) => !rendered.has(S[k][loc]));
      is(unseen.length === 0, `every non-gate string rendered${unseen.length ? ' — missing ' + unseen.join(', ') : ''}`);
      /* the aria template really was filled with two words of THIS line */
      const tmpl = S.scoopHere[loc];
      const re = new RegExp('^' + tmpl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace('\\{a\\}', '.+').replace('\\{b\\}', '.+') + '$');
      is(seen.some((t) => re.test(t)), `the gap aria label is filled in this locale ("${tmpl}")`);
      /* the voiceMissing line is showing, since this device has no voice */
      is(rendered.has(S.voiceMissing[loc]), 'the no-voice line is shown and readable');

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
