/* =====================================================================
   ELEVEN-LOCALE SMOKE + REACHABILITY — TOOL #54
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

   Run: node scripts/smoke-doubling-mirror-locales.js
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
  if (!f) f = 'doubling-mirror.html';
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
      const orig = Object.getOwnPropertyDescriptor(window, 'DoublingMirror');
      Object.defineProperty(window, 'DoublingMirror', {
        configurable: true,
        set: function (tool) {
          const real = tool.strings;
          tool.strings = new Proxy(real, {
            get: function (t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
          });
          Object.defineProperty(window, 'DoublingMirror', { value: tool, writable: true, configurable: true });
        },
        get: function () { return undefined; }
      });
      if (orig) { /* keep lint quiet */ }
    });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/doubling-mirror.html?lang=${L}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 450));

    /* DRIVE THE STATES BY BUTTON. Every refusal string lives behind a
       state a lazy driver never enters — and on this tool an entire
       BRANCH was unreachable until it was fixed, which two gates missed
       because they reached the model directly. Nothing here uses
       page.evaluate to set state. */
    await p.evaluate(() => document.querySelector('.dbm-b-open').click());   /* already open */
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => document.querySelector('.dbm-b-low').click());   /* no odd one waiting */
    await new Promise(r => setTimeout(r, 250));
    for (let i = 0; i < 3; i++) {
      await p.evaluate(() => document.querySelector('.dbm-b-more').click());
      await new Promise(r => setTimeout(r, 150));
    }
    await p.evaluate(() => document.querySelector('.dbm-b-less').click());
    await new Promise(r => setTimeout(r, 200));
    await p.evaluate(() => document.querySelector('.dbm-b-close').click());   /* past the beat */
    await new Promise(r => setTimeout(r, 1100));
    await p.evaluate(() => document.querySelector('.dbm-b-close').click());   /* already closed */
    await new Promise(r => setTimeout(r, 250));
    /* the branch that was DEAD: one more on a CLOSED tray, then open */
    await p.evaluate(() => document.querySelector('.dbm-b-more').click());   /* the odd one */
    await new Promise(r => setTimeout(r, 300));
    await p.evaluate(() => document.querySelector('.dbm-b-more').click());   /* a SECOND outsider is refused */
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => document.querySelector('.dbm-b-open').click());
    await new Promise(r => setTimeout(r, 700));
    await p.evaluate(() => document.querySelector('.dbm-b-high').click());   /* the odd one gets the far leaf */
    await new Promise(r => setTimeout(r, 500));
    await p.evaluate(() => document.querySelector('.dbm-b-again').click());
    await new Promise(r => setTimeout(r, 300));
    await p.evaluate(() => document.querySelector('.dbm-b-close').click());
    await new Promise(r => setTimeout(r, 900));
    await p.evaluate(() => document.querySelector('.dbm-b-open').click());   /* an EVEN split */
    await new Promise(r => setTimeout(r, 600));
    await p.evaluate(() => document.querySelector('.dbm-b-again').click());
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => document.querySelector('.dbm-b-close').click());
    await new Promise(r => setTimeout(r, 900));
    await p.evaluate(() => document.querySelector('.dbm-b-more').click());
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => document.querySelector('.dbm-b-open').click());
    await new Promise(r => setTimeout(r, 700));
    await p.evaluate(() => document.querySelector('.dbm-b-low').click());   /* the odd one gets the near leaf */
    await new Promise(r => setTimeout(r, 400));
    await p.evaluate(() => document.querySelector('.dbm-b-again').click());
    await new Promise(r => setTimeout(r, 250));
    /* empty it, so saidEmpty is reached */
    for (let i = 0; i < 5; i++) {
      await p.evaluate(() => document.querySelector('.dbm-b-less').click());
      await new Promise(r => setTimeout(r, 130));
    }
    /* fill it to CAP, so saidFull is reached */
    for (let i = 0; i < 11; i++) {
      await p.evaluate(() => document.querySelector('.dbm-b-more').click());
      await new Promise(r => setTimeout(r, 110));
    }
    await p.evaluate(() => { const g = document.querySelector('.lcs-btn-settings, [aria-label*="etting"], .lcs-settings-btn'); if (g) g.click(); });
    await new Promise(r => setTimeout(r, 260));
    await p.evaluate(() => { const T = window.DoublingMirror; T.premium = true; T._paint(); });
    await p.evaluate(() => document.querySelector('.dbm-b-print').click());   /* the paid sheet */
    await new Promise(r => setTimeout(r, 250));
    await p.evaluate(() => { const T = window.DoublingMirror; T.premium = false; T._paint(); T._gate(); });
    await new Promise(r => setTimeout(r, 200));

    const got = await p.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      strings: window.DoublingMirror && window.DoublingMirror.strings
        ? Object.keys(window.DoublingMirror.strings).reduce((a, k) => {
          const v = window.DoublingMirror.strings[k]; a[k] = v && v[document.documentElement.lang] || (v && v.en); return a;
        }, {}) : null
    }));

    checks++;
    if (!got.asked.length) fails.push(`${L}: ⚠ the recorder saw NOTHING — it failed to attach`);
    got.asked.forEach(k => { asked[k] = (asked[k] || 0) + 1; });

    /* the tool must be speaking THIS locale, not English */
    const own = require(path.join(ROOT, 'doubling-mirror.js')).strings;
    const wantTitle = own.title[L] || own.title.en;
    const shown = await p.evaluate(() => {
      const n = [].slice.call(document.querySelectorAll('h1,h2,.lcs-title'))
        .map(x => x.textContent.trim()).filter(Boolean);
      return n.join(' | ');
    });
    if (L !== 'en' && shown.indexOf(wantTitle) < 0) {
      fails.push(`${L}: the heading reads "${shown}" — expected "${wantTitle}"`);
    }
    /* ⚠ and the KEY must never be what renders (the #54 dead-strings bug) */
    if (/\b(title|instruction|gateTitle|printBtn|ariaFrame)\b/.test(shown)) {
      fails.push(`${L}: ⚠⚠ a STRING KEY is rendering — the strings map is the wrong shape`);
    }
    console.log(`\n[${L}] heading: ${shown}`);
    console.log(`      ${Object.keys(own).map(k => k + '=' + JSON.stringify(own[k][L] || own[k].en)).join('\n      ')}`);
    await p.close();
  }

  /* ⭐ every authored key must have been ASKED FOR at least once */
  const own = require(path.join(ROOT, 'doubling-mirror.js')).strings;
  Object.keys(own).forEach(function (k) {
    checks++;
    if (!asked[k]) fails.push(`⚠ DEAD STRING: \`${k}\` is authored in eleven locales and never asked for`);
  });

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} checks, ${fails.length} failures`);
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
