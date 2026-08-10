/* =====================================================================
   ELEVEN-LOCALE SMOKE + REACHABILITY — TOOL #50
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

   Run: node scripts/smoke-number-drum-locales.js
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
  if (!f) f = 'number-drum.html';
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
      const orig = Object.getOwnPropertyDescriptor(window, 'NumberDrum');
      Object.defineProperty(window, 'NumberDrum', {
        configurable: true,
        set: function (tool) {
          const real = tool.strings;
          tool.strings = new Proxy(real, {
            get: function (t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
          });
          Object.defineProperty(window, 'NumberDrum', { value: tool, writable: true, configurable: true });
        },
        get: function () { return undefined; }
      });
      if (orig) { /* keep lint quiet */ }
    });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/number-drum.html?lang=${L}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 450));

    /* drive every control so every branch's strings get asked for */
    for (const sel of ['.ndr-b-fwd', '.ndr-b-up10', '.ndr-b-slow', '.ndr-b-back', '.ndr-b-down10', '.ndr-b-print']) {
      const hit = await p.evaluate(s => { const n = document.querySelector(s); if (!n) return false; n.click(); return true; }, sel);
      if (!hit) fails.push(`${L}: control ${sel} is absent`);
      await new Promise(r => setTimeout(r, 240));
    }
    /* ⭐ DRIVE THE STATES, do not exempt the keys. Seven strings first
       reported "dead" were each reachable only somewhere this driver had
       never been: the settings drawer, the three-ring build, a carry,
       and the paid sheet. Exempting them would have been the #44
       "a gate you help past is not a gate" defect. */
    await p.evaluate(() => {                      /* the settings drawer */
      const g = document.querySelector('.lcs-btn-settings, [aria-label*="etting"], .lcs-settings-btn');
      if (g) g.click();
    });
    await new Promise(r => setTimeout(r, 260));
    await p.evaluate(() => {                      /* three rings + a carry */
      const T = window.NumberDrum;
      T.api.settings.top = '999';
      T.premium = true;
      T.onSettings();
      T.st = { half: 99 * 2, top: 999 };
      T.render();
    });
    await new Promise(r => setTimeout(r, 200));
    await p.evaluate(() => document.querySelector('.ndr-b-fwd').click());   /* 99 -> 100 */
    await new Promise(r => setTimeout(r, 700));
    await p.evaluate(() => document.querySelector('.ndr-b-print').click()); /* the paid sheet */
    await new Promise(r => setTimeout(r, 200));

    /* both refusals, which carry their own strings */
    await p.evaluate(() => { const T = window.NumberDrum; T.st = { half: 0, top: T.st.top }; T.render(); });
    await p.evaluate(() => document.querySelector('.ndr-b-back').click());
    await new Promise(r => setTimeout(r, 200));
    await p.evaluate(() => { const T = window.NumberDrum; T.st = { half: T.st.top * 2, top: T.st.top }; T.render(); });
    await p.evaluate(() => document.querySelector('.ndr-b-fwd').click());
    await new Promise(r => setTimeout(r, 200));

    const got = await p.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      title: (document.querySelector('.lcs-title') || {}).textContent || '',
      strings: window.NumberDrum && window.NumberDrum.strings
        ? Object.keys(window.NumberDrum.strings).reduce((a, k) => {
          const v = window.NumberDrum.strings[k]; a[k] = v && v[document.documentElement.lang] || (v && v.en); return a;
        }, {}) : null
    }));

    checks++;
    if (!got.asked.length) fails.push(`${L}: ⚠ the recorder saw NOTHING — it failed to attach`);
    got.asked.forEach(k => { asked[k] = (asked[k] || 0) + 1; });

    /* the tool must be speaking THIS locale, not English */
    const own = require(path.join(ROOT, 'number-drum.js')).strings;
    const wantTitle = own.title[L] || own.title.en;
    const shown = await p.evaluate(() => {
      const n = [].slice.call(document.querySelectorAll('h1,h2,.lcs-title'))
        .map(x => x.textContent.trim()).filter(Boolean);
      return n.join(' | ');
    });
    if (L !== 'en' && shown.indexOf(wantTitle) < 0) {
      fails.push(`${L}: the heading reads "${shown}" — expected "${wantTitle}"`);
    }
    /* ⚠ and the KEY must never be what renders (the #50 dead-strings bug) */
    if (/\b(title|instruction|gateTitle|printBtn|ariaFrame)\b/.test(shown)) {
      fails.push(`${L}: ⚠⚠ a STRING KEY is rendering — the strings map is the wrong shape`);
    }
    console.log(`\n[${L}] heading: ${shown}`);
    console.log(`      ${Object.keys(own).map(k => k + '=' + JSON.stringify(own[k][L] || own[k].en)).join('\n      ')}`);
    await p.close();
  }

  /* ⭐ every authored key must have been ASKED FOR at least once */
  const own = require(path.join(ROOT, 'number-drum.js')).strings;
  Object.keys(own).forEach(function (k) {
    checks++;
    if (!asked[k]) fails.push(`⚠ DEAD STRING: \`${k}\` is authored in eleven locales and never asked for`);
  });

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} checks, ${fails.length} failures`);
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
