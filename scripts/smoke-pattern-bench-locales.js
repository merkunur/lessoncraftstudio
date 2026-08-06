#!/usr/bin/env node
/* =====================================================================
   smoke-pattern-bench-locales.js — eleven locales, one fresh browser each.

   ⚠ A WHOLE NEW BROWSER PER LOCALE, not a new page. A shared browser
   caches the module and every later locale passes on the first one's copy.

   ⚠ CONTROLS ARE REACHED BY INDEX, NEVER BY ENGLISH TEXT — the recorded
   "Another BLUEPRINT contains the word print" trap.

   ⭐⭐ AND IT RECORDS WHICH KEYS WERE ASKED FOR, not merely which strings
   appeared. A `t('key')` call sitting in a DEAD BRANCH reads identically
   to a live one in a source scan, and this tool has already shipped one
   string that was authored in eleven locales and reachable in exactly one
   state.
     · api.t CANNOT be wrapped: lcs-shell.js:482 builds the api with
       Object.freeze and `t` is non-writable, so a wrapper silently
       no-ops and reports "0 keys asked for" on a CORRECT tool.
     · So the recording point is a PROXY over the TOOL'S OWN strings
       object, which needs nothing writable — the shell resolves
       i18n.t(tool.strings, key) at CALL time.
     · A recorder installed after mount cannot see what was read AT
       mount, so the build is re-driven through the Proxy.

   Usage: node scripts/smoke-pattern-bench-locales.js [--locales=de,fi]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const IMGLIB = path.join(ROOT, 'frontend', 'public', 'image-library-webp');

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find((a) => a.indexOf('--locales=') === 0);
const LOCALES = arg ? arg.split('=')[1].split(',').filter((l) => ALL.indexOf(l) > -1) : ALL;

/* ⚠ NAMED EXEMPTIONS, each with a citation. */
/* read by the SHELL before mount (lcs-shell.js:448-449) and by its
   settings drawer (lcs-shell.js:592) — never by the tool itself */
const SHELL_CONSUMED = ['title', 'instruction', 'setSound', 'showLetters'];
/* reached only on the printed sheet, which is built for an entitled
   account and lives outside .ptn-wrap; the harness forces the tier so
   these ARE asked for, but they never appear in the on-screen harvest */
const PRINT_ONLY = ['printKey', 'printCarryOn'];
/* spoken through api.announce, never rendered */
const ANNOUNCE_ONLY = [];

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const is = (c, m) => (c ? ok(m) : bad(m));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };

function serve() {
  return http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    const f = u.indexOf('/image-library-webp/') === 0
      ? path.join(IMGLIB, u.slice('/image-library-webp/'.length))
      : path.join(MINI, path.basename(u));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('nf'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
}

/* the whole 11-locale table, read once out of the tool itself, so the
   cross-locale leak check has something real to compare against */
const ALL_STRINGS = (function () {
  const vm = require('vm');
  const stub = () => ({ style: { setProperty() {} }, setAttribute() {}, appendChild() {},
    append() {}, querySelector: () => null, querySelectorAll: () => [],
    classList: { add() {}, remove() {}, toggle() {} } });
  const sb = { document: { getElementById: () => null, createElement: stub, createElementNS: stub,
      head: { appendChild() {} }, body: { classList: { add() {}, toggle() {} }, appendChild() {} } },
    window: { matchMedia: () => ({ matches: false }) },
    localStorage: { getItem: () => null, setItem() {} },
    fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {},
    Promise, Math, Date, JSON, console, Object, Array, Number, String, Boolean };
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(path.join(MINI, 'pattern-bench.js'), 'utf8') + ';this.__T = PatternBench;', sb);
  return sb.__T.strings;
}());

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(0, r));
  const PORT = server.address().port;

  for (const loc of LOCALES) {
    console.log('\n[' + loc + ']');
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    try {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      await page.setRequestInterception(true);
      page.on('request', (r) => (r.url().indexOf('/api/auth/me') > -1
        ? r.respond({ status: 200, contentType: 'application/json',
            body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
        : r.continue()));
      await page.evaluateOnNewDocument(() => {
        try { localStorage.clear(); localStorage.setItem('accessToken', 'harness'); } catch (_) {}
      });
      const errs = [];
      page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push(String(e)));

      await page.setViewport({ width: 1024, height: 900 });
      await page.goto(`http://127.0.0.1:${PORT}/pattern-bench.html?lang=${loc}&embed=1`,
        { waitUntil: 'networkidle2' });
      await page.waitForSelector('.ptn-wrap', { timeout: 9000 });
      await wait(700);

      const got = await page.evaluate(async () => {
        const T = window.PatternBench;
        const asked = {}, seen = {};
        /* the Proxy — see the header for why this and not api.t */
        const real = T.strings;
        T.strings = new Proxy(real, {
          get: function (t, k) { if (typeof k === 'string') asked[k] = 1; return t[k]; }
        });
        const harvest = () => {
          document.querySelectorAll('body, body *').forEach((e) => {
            if (e.childElementCount === 0 && e.textContent.trim()) seen[e.textContent.trim()] = 1;
            const a = e.getAttribute && e.getAttribute('aria-label');
            if (a) seen[a.trim()] = 1;
          });
        };
        const step = (fn) => { try { fn(); } catch (_) {} T.render(); harvest(); };
        /* drive every state that owns a string */
        step(function () {});                                                   /* rest: hintTap */
        step(function () { T.st = T.cycleSlotAt(T.st, 0); T._everEdited = true; }); /* hintSlide */
        step(function () { T.st = T.setArmed(T.st, true); });                    /* coverNote */
        step(function () { T.st = T.setArmed(T.st, false); T.st = T.toggleCover(T.st, 3); });
        step(function () { T.st = T._clone(T.st); T.st.unitHidden = true; });    /* hiddenUnitNote, showUnit */
        step(function () { T.st = T._clone(T.st); T.st.unitHidden = false; });   /* hideUnit */
        step(function () { T.st = T.setMedium(T.st, 'shape'); });
        step(function () { T._flashCap(); });                                    /* sameAgain */
        step(function () { T.st = T.setLen(T.st, 25); });                        /* longerStrip */
        /* the gates, both of them */
        step(function () { T.premium = false; T.premiumKnown = true; });
        try { document.querySelectorAll('.ptn-segbtn')[2].click(); } catch (_) {}
        harvest();
        try { document.querySelectorAll('.ptn-foot .ptn-chip')[1].click(); } catch (_) {}
        harvest();
        /* and the printed sheet, which needs the tier */
        step(function () { T.premium = true; T.premiumKnown = true; });
        harvest();
        const strings = {};
        Object.keys(real).forEach((k) => { strings[k] = real[k][document.documentElement.lang] || real[k].en; });
        T.strings = real;
        return { asked: Object.keys(asked), seen: Object.keys(seen), strings: strings,
          keys: Object.keys(real), cells: document.querySelectorAll('.ptn-cell').length };
      });

      const declared = got.keys;
      /* A15 — every authored key must be ASKED FOR, not merely present */
      const never = declared.filter((k) =>
        got.asked.indexOf(k) < 0 && SHELL_CONSUMED.indexOf(k) < 0);
      is(never.length === 0, `every authored key is asked for ${never.length ? '— NEVER: ' + never.join(', ') : ''}`);

      /* and every non-shell, non-print key must actually RENDER */
      const want = declared.filter((k) =>
        SHELL_CONSUMED.indexOf(k) < 0 && PRINT_ONLY.indexOf(k) < 0 && ANNOUNCE_ONLY.indexOf(k) < 0);
      const missing = want.filter((k) => {
        const v = got.strings[k];
        return !v || !got.seen.some((s) => s.indexOf(v) > -1 || v.indexOf(s) > -1);
      });
      is(missing.length === 0, `every on-screen string rendered ${missing.length ? '— missing ' + missing.join(', ') : ''}`);

      /* ⚠ NO OTHER LOCALE LEAKED IN — and the first version of this check
         was an empty loop that could not fail, which is worse than no
         check because it certifies. Compare the harvest against every
         OTHER locale's value for the same key, and only where that value
         is genuinely distinctive (cognates and shared spellings would
         otherwise fire constantly: da/no "Tegnforklaring" is identical). */
      const foreign = [];
      Object.keys(ALL_STRINGS).forEach((k) => {
        const mine = (ALL_STRINGS[k][loc] || '').trim();
        ALL.forEach((l2) => {
          if (l2 === loc) return;
          const other = (ALL_STRINGS[k][l2] || '').trim();
          if (!other || other === mine || other.length < 8) return;
          if (got.seen.indexOf(other) > -1) foreign.push(`${k}=${l2}:"${other}"`);
        });
      });
      is(foreign.length === 0, `no other locale leaked in ${foreign.slice(0, 2).join(' ')}`);
      is(got.cells >= 7, `the strip mounted (${got.cells} beads)`);
      is(errs.length === 0, `zero console errors ${errs[0] || ''}`);

      console.log('       ── the ' + declared.length + ' authored strings ──');
      declared.forEach((k) => {
        const v = got.strings[k] || '(none)';
        const markAsked = got.asked.indexOf(k) > -1 ? '·' : (SHELL_CONSUMED.indexOf(k) > -1 ? 's' : '!');
        console.log('       ' + markAsked + ' ' + k.padEnd(15) + v);
      });
    } finally {
      await browser.close();
    }
  }

  server.close();
  console.log('\n' + (FAIL ? `FAILED — ${FAIL} failed, ${PASS} passed`
    : `ALL GREEN — ${PASS} assertions across ${LOCALES.length} locales`));
  process.exit(FAIL ? 1 : 0);
})();
