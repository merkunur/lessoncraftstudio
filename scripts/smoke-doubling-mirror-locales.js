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
       because they reached the model directly. Nothing here sets state
       through page.evaluate.

       ⚠⚠ THIS DRIVER WAS STALE AGAINST ITS OWN TOOL. It clicked
       `.dbm-b-low` and `.dbm-b-high` — the side-choice buttons this
       rebuild DELETED, because 5-and-4 versus 4-and-5 is one fact with
       the addends swapped. It threw on a null, which is the correct
       behaviour and the only reason the staleness was visible: a helper
       that shrugged at a missing element would have quietly driven a
       shorter sequence and reported the untouched keys as dead.

       ⚠ SO `click` THROWS. A scripted interaction that does not
       happen must fail loudly, never silently no-op. */
    const click = async (sel, ms) => {
      const found = await p.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return false;
        el.click();
        return true;
      }, sel);
      if (!found) throw new Error('smoke: no element matches ' + sel + ' (locale ' + L + ')');
      await new Promise(r => setTimeout(r, ms || 200));
    };
    /* a chip by INDEX, never by its text — the text is localised */
    const chip = async (n, ms) => {
      const hit = await p.evaluate((i) => {
        const c = document.querySelectorAll('.dbm-chips .dbm-btn');
        if (!c.length) return false;
        c[Math.min(i, c.length - 1)].click();
        return true;
      }, n || 0);
      if (!hit) throw new Error('smoke: the chip strip is empty (locale ' + L + ')');
      await new Promise(r => setTimeout(r, ms || 160));
    };

    /* --- refusals that need no claim ----------------------------- */
    await click('.dbm-b-open');                 /* already open  -> saidAlreadyOpen */
    await click('.dbm-b-give');                 /* nothing waits -> saidNoOdd */
    await click('.dbm-b-close');                /* no claim yet  -> saidPredictFirst */

    /* --- the chip strip, including both of its refusals ---------- */
    await chip(0);                              /* a claim       -> saidPredict */
    await chip(0);                              /* the same one  -> saidSameTwice OR claimIn */
    await chip(1);                              /* a second      -> saidClaimIsIn */

    /* --- close, through the beat and the deal -------------------- */
    await click('.dbm-b-close', 2400);          /* -> saidClosed */
    await click('.dbm-b-close');                /* already shut  -> saidAlreadyClosed */

    /* --- the SPLIT question, which is a different chip strip -----
       ⚠ the double question latches at ONE chip (predMode goes null),
       so a repeat press there resolves to claimIn and the split-only
       strings stay unreached. Three keys were reported dead purely
       because the driver never entered split mode. */
    await chip(0);                              /* -> saidPredictLeaf */
    await chip(0);                              /* the same one  -> saidSameTwice */
    await chip(1);                              /* a second      -> saidPredictTwo */
    await click('.dbm-b-open', 1300);

    /* --- GATHERING: closing a tray that already has both leaves -- */
    await click('.dbm-b-close', 2200);          /* -> saidGathered */
    await click('.dbm-b-open', 1200);

    /* --- the shut tray's own ceiling and floor ------------------- */
    for (let i = 0; i < 22; i++) await click('.dbm-b-more', 70);  /* -> saidTrayFull */
    for (let i = 0; i < 24; i++) await click('.dbm-b-less', 70);  /* -> saidTrayFloor */

    /* --- open onto an ODD total, then both settle moves ---------- */
    await click('.dbm-b-more', 90);             /* 3 */
    await chip(0);
    await click('.dbm-b-open', 1300);           /* -> saidOpened, maybe an odd one */
    await click('.dbm-b-more', 90);             /* refused while one waits -> saidSettleFirst */
    await click('.dbm-b-give', 700);            /* -> saidGave */
    await click('.dbm-b-again', 400);

    /* build an odd total again and take the OTHER branch */
    await click('.dbm-b-more', 90);
    await chip(0);
    await click('.dbm-b-close', 2200);
    await click('.dbm-b-more', 160);            /* one more on the shut tray */
    await chip(0);
    await click('.dbm-b-open', 1300);
    await click('.dbm-b-fetch', 700);           /* -> saidFetched */

    /* --- the near leaf's own floor and ceiling ------------------- */
    await click('.dbm-b-again', 400);
    for (let i = 0; i < 5; i++) await click('.dbm-b-less', 90);   /* -> saidEmpty */
    for (let i = 0; i < 12; i++) await click('.dbm-b-more', 80);  /* -> saidFull */
    /* a gathered tray refuses a near leaf out of step -> saidOnlyDoubles */
    await click('.dbm-b-again', 300);
    await chip(0);
    await click('.dbm-b-close', 2200);
    await chip(0);
    await click('.dbm-b-open', 1200);
    for (let i = 0; i < 4; i++) await click('.dbm-b-more', 90);

    /* --- the settings, the gate and the paid sheet --------------- */
    await p.evaluate(() => {
      const g = document.querySelector('.lcs-btn-settings, [aria-label*="etting"], .lcs-settings-btn');
      if (g) g.click();
    });
    await new Promise(r => setTimeout(r, 300));
    await p.evaluate(() => { const T = window.DoublingMirror; T.premium = true; T._paint(); });
    await click('.dbm-b-print', 300);           /* the paid sheet */
    await p.evaluate(() => { const T = window.DoublingMirror; T.premium = false; T._paint(); T._gate(); });
    await new Promise(r => setTimeout(r, 250));

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
  /* ⭐ `saidNothingToDo` IS THE DEFAULT OF LAST RESORT, AND THE CLAIM
     ABOUT IT IS THE OPPOSITE ONE — the same inversion `verify`'s L5b
     makes. `_refuse` falls back to it for a cause with no key, so if it
     is ever ASKED FOR, some resolver has fallen through to "nothing can
     change just now" in a state where something can. Framing it as an
     exemption would have hidden that; asserting it tests it. */
  const NEVER = 'saidNothingToDo';
  Object.keys(own).forEach(function (k) {
    checks++;
    if (k === NEVER) {
      if (asked[k]) fails.push(`⚠⚠ \`${NEVER}\` WAS ASKED FOR — a resolver fell through to the ` +
        `state-independent default, so the tool said nothing can change while something could`);
      return;
    }
    if (!asked[k]) fails.push(`⚠ DEAD STRING: \`${k}\` is authored in eleven locales and never asked for`);
  });

  await b.close(); srv.close();
  console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + `  ${checks} checks, ${fails.length} failures`);
  fails.slice(0, 40).forEach(f => console.log('  ✗ ' + f));
  if (fails.length) process.exit(1);
})();
