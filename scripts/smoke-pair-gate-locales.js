/* =====================================================================
   ELEVEN-LOCALE SMOKE + REACHABILITY — TOOL #53 (rebuilt 2026-08-11)
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
   nothing). So the driver ENTERS every state: every refusal, the
   fizzle, the short sill at k=3, the cleared parade, both entitlement
   faces of the print chip, and the paywall.

   Run: node scripts/smoke-pair-gate-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = process.env.PAIR_GATE_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
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

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  let checks = 0;
  const asked = {};

  for (const L of LOCALES) {
    const p = await b.newPage();                       /* fresh page per locale */
    p.on('pageerror', e => fails.push(`${L}: page error ${e.message}`));
    /* install the recorder BEFORE the tool script runs; stub print */
    await p.evaluateOnNewDocument(() => {
      window.__asked = {};
      window.print = function () { window.__printed = (window.__printed || 0) + 1; };
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
    });
    await p.goto(`http://127.0.0.1:${PORT}/mini-tools/pair-gate.html?lang=${L}`, { waitUntil: 'domcontentloaded' });
    await sleep(450);
    const click = sel => p.evaluate(s => { const e = document.querySelector(s); if (e) e.click(); return !!e; }, sel);

    /* drive every control so every branch's strings get asked for.
       @@ DRIVE THE STATES, never exempt a key. */
    await click('.pgt-b-call'); await sleep(250);        /* choose first (empty road) */
    await click('.pgt-b-no'); await sleep(250);          /* choose first, via a chip  */
    await click('.pgt-b-sill'); await sleep(250);        /* no second parade yet      */
    await click('.pgt-b-size-13'); await sleep(300);     /* the parade is chosen      */
    await click('.pgt-b-second'); await sleep(250);      /* still marching (marchOn)  */
    await click('.pgt-b-call'); await sleep(250);        /* bar still down            */
    await click('.pgt-b-yes'); await sleep(400);         /* commit 0 (saidPredYes)    */
    await click('.pgt-b-no'); await sleep(250);          /* predicted twice (busy)    */
    for (let i = 0; i < 7; i++) {                        /* march 13 to a standstill  */
      await click('.pgt-b-call'); await sleep(720);
    }
    await click('.pgt-b-call'); await sleep(300);        /* part-rank refused (stand) */
    await click('.pgt-b-size-9'); await sleep(300);      /* the second parade chosen  */
    await click('.pgt-b-no'); await sleep(300);          /* commit its standing count */
    await click('.pgt-b-second'); await sleep(3600);     /* it marches itself in      */
    await click('.pgt-b-second'); await sleep(250);      /* already here              */
    await click('.pgt-b-yes'); await sleep(300);         /* the sill commit (passes)  */
    await click('.pgt-b-sill'); await sleep(600);        /* Beat A: both step on      */
    await click('.pgt-b-sill'); await sleep(250);        /* already on the sill       */
    await sleep(2200);                                   /* hold + recolour + march   */
    await click('.pgt-b-sill'); await sleep(250);        /* after it passed (clear)   */

    /* a parade that CLEARS, so saidClear + saidAllThrough are reached */
    await p.evaluate(() => {
      const T = window.PairGate;
      T._stopMotion(); T.st = T.predict(T.setTotal(T.newState('2', 0), 6), 0); T.render();
    });
    for (let i = 0; i < 3; i++) { await click('.pgt-b-call'); await sleep(720); }
    await click('.pgt-b-call'); await sleep(250);        /* everybody already through */

    /* a WIDE archway where the sill does NOT fill (saidSillShort) */
    await p.evaluate(() => {
      const T = window.PairGate;
      T._stopMotion();
      let st = T.predict(T.setTotal(T.newState('3', 0), 8), 2);
      while (T.sendRank(st)) st = T.sendRank(st);
      st = T.predict2(T.setSecond(st, 8), 2);
      while (T.sendRank2(st)) st = T.sendRank2(st);
      st = T.predictSill(st, 4);
      T.st = st; T.render();
    });
    await click('.pgt-b-sill'); await sleep(1900);

    /* the FIZZLE: a second parade that clears (saidSecondClear) */
    await p.evaluate(() => {
      const T = window.PairGate;
      T._stopMotion();
      let st = T.predict(T.setTotal(T.newState('2', 0), 13), 1);
      while (T.sendRank(st)) st = T.sendRank(st);
      st = T.predict2(T.setSecond(st, 8), 0);
      st = T.sendRank2(st); st = T.sendRank2(st); st = T.sendRank2(st);
      T.st = st; T.render();                 /* one rank of the second remains */
    });
    await click('.pgt-b-second'); await sleep(1300);

    /* the settings drawer (setN + the four width words) */
    await p.evaluate(() => { const g = document.querySelector('.lcs-btn-settings, [aria-label*="etting"], .lcs-settings-btn'); if (g) g.click(); });
    await sleep(300);

    /* both faces of the print chip + the paywall */
    await p.evaluate(() => { const T = window.PairGate; T.premium = true; T._paint(); });
    await click('.pgt-b-print'); await sleep(300);       /* the sheet builds          */
    await p.evaluate(() => { const T = window.PairGate; T.premium = false; T._paint(); });
    await click('.pgt-b-print'); await sleep(250);       /* the gate opens            */
    await sleep(200);

    /* the surprise parade — and the NONZERO commit on a FIRST parade,
       which no earlier step performs (the #58 "the yes branch read as
       dead" lesson, mirrored: here it was the N branch) */
    await click('.pgt-b-again'); await sleep(400);
    await click('.pgt-b-no'); await sleep(300);

    const got = await p.evaluate(() => ({
      asked: Object.keys(window.__asked || {}),
      printed: window.__printed || 0
    }));

    checks++;
    if (!got.asked.length) fails.push(`${L}: ⚠ the recorder saw NOTHING — it failed to attach`);
    if (!got.printed) fails.push(`${L}: the entitled print chip never reached window.print`);
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
    if (/\b(title|instruction|gateTitle|printBtn|sizeAsk|predAsk|ariaFrame)\b/.test(shown)) {
      fails.push(`${L}: ⚠⚠ a STRING KEY is rendering — the strings map is the wrong shape`);
    }
    console.log(`\n[${L}] heading: ${shown}  (asked for ${got.asked.length} keys)`);
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
