/* =====================================================================
   ELEVEN-LOCALE SMOKE + REACHABILITY — TOOL #53
   =====================================================================
   ⚠ FRESH BROWSER PAGE PER LOCALE, and the whole authored string set is
   printed for each so a human can read it.

   ⚠⚠ REACHABILITY IS MEASURED WITH A PROXY OVER THE TOOL'S OWN STRINGS
   OBJECT, INSTALLED BEFORE MOUNT. Two recorded traps:
   - `lcs-shell.js:482` builds the api with Object.freeze and `t` is
     NON-WRITABLE, so wrapping api.t silently no-ops in sloppy mode and
     the gate reports "0 keys asked for" on a CORRECT tool. The shell
     resolves `i18n.t(tool.strings, key)` at CALL time, so a Proxy over
     `tool.strings` needs nothing writable.
   - A recorder installed AFTER mount cannot see what was read AT mount.
   ⚠ AND "the string exists" is not "the string is reached": a source
   scan is defeated by an unreachable branch that still contains the
   t() call (#39's `hintMark`, authored in eleven locales, wired to
   nothing).

   Run: node scripts/smoke-pair-gate-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.NUMBER_DRUM_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const PORT = 5674;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  let f = rq.url.split('?')[0].replace('/mini-tools/', '');
  while (f.charAt(0) === '/') f = f.slice(1);
  if (!f) f = 'pair-gate.html';
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  let checks = 0;
  const asked = {};

  for (const L of LOCALES) {
    const p = await b.newPage();                       /* fresh page per locale */
    p.on('pageerror', e => fails.push(`${L}: page error ${e.message}`));
    /* install the recorder BEFORE the tool script runs */
    await p.evaluateOnNewDocument(() => {
      window.__asked = {};
      const orig = Object.getOwnPropertyDescriptor(window, 'PairGate');
      Object.defineProperty(window, 'PairGate', {
        configurable: true,
        set: function (tool) {
          const real = tool.strings;
          tool.strings = new Proxy(real, {
            get: function (t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
          });
          Object.defineProperty(window, 'PairGate', { value: tool, writable: true, configurable: true });
        },
        get: function () { return undefined; }
      });
      if (orig) { /* keep lint quiet */ }
    });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/pair-gate.html?lang=${L}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 450));

    /* drive every control so every branch's strings get asked for */
    /* @@ DRIVE THE STATES, never exempt a key. Every refusal string here
       lives behind a state a lazy driver never enters. */
    await p.evaluate(() => document.querySelector('.pgt-b-call').click());   /* bar DOWN */
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => document.querySelector('.pgt-b-sill').click());   /* no second parade yet */
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => document.querySelector('.pgt-b-no').click());
    await new Promise(r => setTimeout(r, 400));
    await p.evaluate(() => document.querySelector('.pgt-b-yes').click());    /* predicted twice */
    await new Promise(r => setTimeout(r, 250));
    for (let i = 0; i < 12; i++) {
      await p.evaluate(() => document.querySelector('.pgt-b-call').click());
      await new Promise(r => setTimeout(r, 170));
    }
    await p.evaluate(() => document.querySelector('.pgt-b-call').click());   /* part-rank refused */
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => document.querySelector('.pgt-b-second').click());
    await new Promise(r => setTimeout(r, 450));
    await p.evaluate(() => document.querySelector('.pgt-b-sill').click());
    await new Promise(r => setTimeout(r, 1300));
    await p.evaluate(() => document.querySelector('.pgt-b-sill').click());   /* already on the sill */
    await new Promise(r => setTimeout(r, 250));
    /* a parade that CLEARS, so saidAllThrough is reached */
    await p.evaluate(() => { const T = window.PairGate; T.st = T.predict(T.newState('2', 12), true); T.render(); });
    for (let i = 0; i < 7; i++) {
      await p.evaluate(() => document.querySelector('.pgt-b-call').click());
      await new Promise(r => setTimeout(r, 150));
    }
    await new Promise(r => setTimeout(r, 250));
    /* a WIDE archway where the sill does NOT fill, so saidSillShort is reached */
    await p.evaluate(() => { const T = window.PairGate; let st = T.predict(T.newState('3', 8), false);
      while (T.sendRank(st)) st = T.sendRank(st); T.st = T.bringSecond(st, 8); T.render(); });
    await p.evaluate(() => document.querySelector('.pgt-b-sill').click());
    await new Promise(r => setTimeout(r, 1300));
    await p.evaluate(() => { const g = document.querySelector('.lcs-btn-settings, [aria-label*="etting"], .lcs-settings-btn'); if (g) g.click(); });
    await new Promise(r => setTimeout(r, 260));
    await p.evaluate(() => { const T = window.PairGate; T.premium = true; T._paint(); });
    await p.evaluate(() => document.querySelector('.pgt-b-print').click());
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => { const T = window.PairGate; T.premium = false; T._paint(); T._gate(); });
    await new Promise(r => setTimeout(r, 200));
    await p.evaluate(() => document.querySelector('.pgt-b-again').click());
    await new Promise(r => setTimeout(r, 300));
    /* @@ and the OTHER prediction, on a fresh parade — the driver had
       only ever said no, so the yes branch read as dead. */
    await p.evaluate(() => document.querySelector('.pgt-b-yes').click());
    await new Promise(r => setTimeout(r, 400));

    const got = await p.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      strings: window.PairGate && window.PairGate.strings
        ? Object.keys(window.PairGate.strings).reduce((a, k) => {
          const v = window.PairGate.strings[k]; a[k] = v && v[document.documentElement.lang] || (v && v.en); return a;
        }, {}) : null
    }));

    checks++;
    if (!got.asked.length) fails.push(`${L}: ⚠ the recorder saw NOTHING — it failed to attach`);
    got.asked.forEach(k => { asked[k] = (asked[k] || 0) + 1; });

    /* the tool must be speaking THIS locale, not English */
    const own = require(path.join(ROOT, 'pair-gate.js')).strings;
    const wantTitle = own.title[L] || own.title.en;
    const shown = await p.evaluate(() => {
      const n = [].slice.call(document.querySelectorAll('h1,h2,.lcs-title'))
        .map(x => x.textContent.trim()).filter(Boolean);
      return n.join(' | ');
    });
    if (L !== 'en' && shown.indexOf(wantTitle) < 0) {
      fails.push(`${L}: the heading reads "${shown}" — expected "${wantTitle}"`);
    }
    /* ⚠ and the KEY must never be what renders (the #53 dead-strings bug) */
    if (/\b(title|instruction|gateTitle|printBtn|ariaFrame)\b/.test(shown)) {
      fails.push(`${L}: ⚠⚠ a STRING KEY is rendering — the strings map is the wrong shape`);
    }
    console.log(`\n[${L}] heading: ${shown}`);
    console.log(`      ${Object.keys(own).map(k => k + '=' + JSON.stringify(own[k][L] || own[k].en)).join('\n      ')}`);
    await p.close();
  }

  /* ⭐ every authored key must have been ASKED FOR at least once */
  const own = require(path.join(ROOT, 'pair-gate.js')).strings;
  Object.keys(own).forEach(function (k) {
    checks++;
    if (!asked[k]) fails.push(`⚠ DEAD STRING: \`${k}\` is authored in eleven locales and never asked for`);
  });

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} checks, ${fails.length} failures`);
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
