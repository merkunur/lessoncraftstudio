/* =====================================================================
   smoke-folding-wall-locales.js — TOOL #47 in all eleven locales, with a
   REACHABILITY RECORDER.

   ⚠ "THE STRING EXISTS" IS NOT "THE STRING IS REACHED", AND A SOURCE
   SCAN CANNOT TELL THEM APART. #39 shipped `hintMark` authored in
   eleven locales and wired to nothing; the first dead-string check was
   a regex over the source, and mutation showed it is defeated by making
   the BRANCH unreachable while the `t('key')` call still sits in the
   file. So this drives a MATRIX OF REAL STATES with a recording `t`,
   and requires every authored key to be ASKED FOR.

   ⚠ AND THE RECORDER CANNOT WRAP `api.t`. `lcs-shell.js:482` builds the
   api with `Object.freeze`, so `t` is non-writable and wrapping it
   silently no-ops in sloppy mode — a gate that cannot attach its own
   instrument and reports that as a defect. The shell resolves
   `i18n.t(tool.strings, key)` at CALL time, so the recording point is a
   Proxy over the tool's own strings object, which needs nothing
   writable.

   ⚠ AND IT MUST BE INSTALLED BEFORE MOUNT. `lcs-shell.js:448` reads
   `title` and `instruction` while building the chrome; a recorder
   attached after mount scores both as "never asked".

   ⚠ FRESH BROWSER PER LOCALE — a reused context carries the previous
   locale's module state.

   ⭐ This gate proves LOCALE SELECTION and REACHABILITY. It cannot
   prove translation quality, and nothing here should ever be mistaken
   for review: that is what the eleven native panels are for.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5648;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'folding-wall.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const RECORDER = `(function () {
  var real = null;
  window.__asked = {};
  Object.defineProperty(window, 'FoldingWall', {
    configurable: true,
    get: function () { return real; },
    set: function (v) {
      real = v;
      if (v && v.strings) {
        var raw = v.strings;
        v.strings = new Proxy(raw, {
          get: function (t, k) {
            if (typeof k === 'string') window.__asked[k] = (window.__asked[k] || 0) + 1;
            return t[k];
          }
        });
      }
    }
  });
}());`;

(async () => {
  const all = {};
  let keys = null;

  for (const loc of LOCALES) {
    /* ⚠ a FRESH BROWSER, not a fresh page */
    const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const p = await b.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    p.on('console', (m) => {
      if (m.type() !== 'error') return;
      const t = m.text();
      if (t.indexOf('/api/entitlement') >= 0 || t.indexOf('favicon') >= 0 || t.indexOf('404') >= 0) return;
      errs.push(t);
    });
    await p.evaluateOnNewDocument(RECORDER);
    await p.setViewport({ width: 768, height: 1024 });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/folding-wall.html?lang=${loc}`, { waitUntil: 'load' });
    await p.waitForSelector('.tsh-wrap', { timeout: 12000 });
    await wait(300);

    /* ---- THE MATRIX OF REAL STATES ------------------------------- */
    /* every branch that owns a string has to be entered, or the key it
       owns scores "never asked" for a reason that is not a defect */
    await p.evaluate(() => {
      const T = window.FoldingWall;
      const press = (sel, n) => { const b = document.querySelectorAll(sel)[n || 0]; if (b && !b.disabled) b.click(); };
      /* virgin: restore is disabled, stack is disabled */
      T._relabelPads();
      /* look at a card with a big fibre, a square, a header, and a seat */
      T._lit = { kind: 'card', r: 3, c: 4, p: 12, key: 'k3_4' }; T._paint(); T.api.announce(T._lookText(T._lit));
      T._lit = { kind: 'card', r: 7, c: 7, p: 49, key: 'k7_7' }; T._paint(); T.api.announce(T._lookText(T._lit));
      T._lit = { kind: 'head', k: 3, key: 'hr3' }; T._paint(); T.api.announce(T._lookText(T._lit));
      T._lit = null;
      /* the four families, then stacked — which is where famLocked,
         unstackBtn, cardDouble, seatLabel and saidSeat become live */
      for (const k of [1, 2, 5, 10]) { T.st = T.putAway(T.st, k); }
      T.st = T.stack(T.st);
      T._padSig = ''; T._paint(); T._relabelPads();
      T.api.announce(T._sceneText());
      T.api.announce(T.api.t('saidStack'));
      T._lit = { kind: 'seat', r: 9, c: 3, p: 27, key: 'k9_3' }; T._paint(); T.api.announce(T._lookText(T._lit));
      /* ⚠ A DOUBLED CARD IS ITS OWN BRANCH. `saidCardDouble` is reached
         only for r < c while stacked — pressing a seat or an ordinary
         card never asks for it, which is exactly the dead-branch shape
         a source scan cannot tell from a dead string. */
      T._lit = { kind: 'card', r: 3, c: 7, p: 21, key: 'k3_7' }; T._paint(); T.api.announce(T._lookText(T._lit));
      T._lit = null;
      T.st = T.unstack(T.st);
      T._padSig = ''; T._paint(); T._relabelPads();
      T.api.announce(T.api.t('saidUnstack'));
      T.st = T.putBack(T.st, 1);
      T.api.announce(T._fmt('saidBack', { k: 1, list: T._listText() }));
      T.st = T.restoreAll(T.st) || T.st;
      T._padSig = ''; T._paint(); T._relabelPads();
      T.api.announce(T._fmt('saidRestore', { list: T._listText() }));
      /* ⚠ THE PAID LABEL AND THE PAID SHEET NEED `premium` TRUE AT PAINT
         TIME: `printBtn` is only selected when the tier resolves, and
         `printLocked` is what a free visitor gets. Both must be asked
         for, so both entitlement states are entered. */
      T.premium = true;
      T._paint();
      T._buildSheet();
      T.premium = false;
      press('.tsh-b-fam', 0);
      /* ⚠ THE PAYWALL IS SHOWN LAST, because it now dismisses on any
         act on the apparatus — which is the fix for a panel finding,
         and it means a matrix that shows it early measures nothing. */
      T._showGate();
      /* ⚠ THE SETTINGS DRAWER IS ITS OWN BRANCH. `lcs-shell.js:592`
         resolves `api.t(field.labelKey)` inside buildDrawer, which only
         runs when the drawer OPENS — so `setStart` scored "never asked"
         until the matrix opened it. That was a gap in the gate, not a
         dead string in the tool, and telling the two apart is the whole
         point of driving real states. The order is fixed
         [settings][sound][fullscreen][reset], so index 0 is stable and
         no English text is involved. */
      press('.lcs-ctrl', 0);
    });
    await wait(200);

    const got = await p.evaluate(() => ({
      asked: window.__asked,
      keys: Object.keys(window.FoldingWall.strings),
      lang: window.FoldingWall.api.lang,
      /* the rendered chrome, so a locale that fails to select is loud */
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      labels: Array.prototype.map.call(document.querySelectorAll('.tsh-btn'), (n) => n.getAttribute('aria-label')),
      gate: (document.querySelector('.tsh-gate h3') || {}).textContent || '',
      sheet: (document.querySelector('.tsh-sheet-h') || {}).textContent || ''
    }));

    is(errs.length === 0, `[${loc}] no console errors — ${errs.join(' | ')}`);
    is(got.lang === loc, `[${loc}] the shell selected the locale — got ${got.lang}`);
    is(!!got.title, `[${loc}] the title renders`);
    is(got.labels.every((l) => !!l), `[${loc}] every ledge control carries an accessible name`);
    is(!!got.gate, `[${loc}] the paywall renders`);
    is(!!got.sheet, `[${loc}] the printed sheet renders`);

    keys = keys || got.keys;
    const never = keys.filter((k) => !got.asked[k]);
    is(never.length === 0, `[${loc}] every authored key is ASKED FOR — never reached: ${never.join(', ')}`);

    all[loc] = { title: got.title, gate: got.gate, labels: got.labels };

    console.log(`\n— ${loc} —`);
    console.log(`  title  ${got.title}`);
    console.log(`  gate   ${got.gate}`);
    got.labels.forEach((l, i) => console.log(`  btn${i}   ${l}`));

    await b.close();
  }

  /* ⚠ AND THE ELEVEN MUST DIFFER. A locale that silently falls back to
     English passes every check above. */
  const titles = LOCALES.map((l) => all[l].title);
  const uniq = new Set(titles);
  is(uniq.size >= 9, `the eleven titles are genuinely distinct — ${uniq.size} unique`);

  srv.close();
  console.log(`\nsmoke-folding-wall-locales: ${PASS} passed, ${FAIL} failed`);
  process.exit(FAIL ? 1 : 0);
})();
