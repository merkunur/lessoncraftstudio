/* =====================================================================
   poison-part-whole-frame-reachability.js — is every authored string
   actually ASKED FOR?
   ---------------------------------------------------------------------
   Run:  node scripts/poison-part-whole-frame-reachability.js

   ⭐⭐ "THE STRING EXISTS" IS NOT "THE STRING IS REACHED", AND A SOURCE
   SCAN CANNOT TELL THEM APART. The Lids tool authored `hintMark` in all
   eleven locales and never referenced it; the first check for that class
   was a regex over the source, and mutation showed it is defeated by
   making the BRANCH unreachable while the `t('key')` call still sits in
   the file. verify-part-whole-frame.js P9 is exactly that regex, and it
   is exactly that defeatable. This is the real check.

   ⚠ THE RECORDING POINT IS A PROXY OVER THE TOOL'S OWN `strings` OBJECT,
   not a wrapper around `api.t`. `lcs-shell.js` builds the api with
   `Object.freeze` and `t` is non-writable, so wrapping it silently no-ops
   in sloppy mode — a gate that could not attach its own instrument and
   would have reported "0 keys asked for" while every string rendered.
   The shell resolves `i18n.t(tool.strings, key)` at CALL time, so a Proxy
   on `tool.strings` needs nothing writable.

   ⚠ AND IT IS INSTALLED BEFORE MOUNT. A recorder attached afterwards
   cannot see what was read AT mount, and several keys are read exactly
   once, there.

   ⚠ REACHABILITY IS PROVED BY ENUMERATION OVER A NAMED STATE SET, never
   by a count. "More than N keys were asked for" is an invented threshold;
   the claim here is that EVERY authored key is asked for somewhere in the
   matrix, and that the matrix covers every branch by name.

   Exit 1 if any authored key is never asked for.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

/* Keys the SHELL consumes rather than the tool — it reads them off
   `tool.strings` too, so the Proxy sees them, but they are listed here so
   that a genuine tool-side regression cannot hide behind them.
   Each entry cites where it is consumed. */
const SHELL_OWNED = {
  title: 'lcs-shell.js:448 — the card heading',
  instruction: 'lcs-shell.js:449 — the one line under the heading'
};

let PASS = 0, FAIL = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const ASKED = {};
let KEYS = [];

(async () => {
  const server = http.createServer((rq, rs) => {
    const f = path.join(MINI, path.basename(rq.url.split('?')[0]));
    fs.readFile(f, (e, b) => {
      if (e) { rs.writeHead(404); rs.end('404'); return; }
      rs.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      rs.end(b);
    });
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const tier of ['free', 'premium']) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (r) => r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify(tier === 'premium'
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null }) })
      : r.continue());

    /* ⚠ BEFORE MOUNT. LCS.mount runs from an inline <script> at the end of
       the document, so the hook has to be planted on the tool object the
       moment it is defined — a `defineProperty` trap on `window` is the
       only point that is reliably earlier than that. */
    await page.evaluateOnNewDocument((premium) => {
      try { localStorage.clear(); if (premium) localStorage.setItem('accessToken', 'harness'); } catch (_) {}
      window.__asked = {};
      let real = undefined;
      Object.defineProperty(window, 'PartWholeFrame', {
        configurable: true,
        get() { return real; },
        set(v) {
          if (v && v.strings && !v.__wrapped) {
            /* a Proxy over the tool's OWN strings object: the shell calls
               i18n.t(tool.strings, key) at call time, so nothing writable
               is needed and nothing frozen is touched */
            const raw = v.strings;
            v.strings = new Proxy(raw, {
              get(t, k) { if (typeof k === 'string') window.__asked[k] = (window.__asked[k] || 0) + 1; return t[k]; },
              has(t, k) { return k in t; },
              ownKeys(t) { return Reflect.ownKeys(t); },
              getOwnPropertyDescriptor(t, k) { return Reflect.getOwnPropertyDescriptor(t, k); }
            });
            Object.defineProperty(v, '__rawStrings', { value: raw, enumerable: false });
            v.__wrapped = true;
          }
          real = v;
        }
      });
    }, tier === 'premium');

    await page.goto(BASE + '/part-whole-frame.html?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.pwf-wrap', { timeout: 8000 });
    await new Promise((r) => setTimeout(r, 400));

    /* proof the instrument attached at all — the recorded failure mode is
       a gate that cannot install its own probe and reports the tool as
       broken instead of itself */
    const attached = await page.evaluate(() => !!(window.PartWholeFrame && window.PartWholeFrame.__wrapped));
    if (!attached) { bad(`${tier}: the recorder never attached — this run measured nothing`); await page.close(); continue; }

    /* ⭐ THE NAMED MATRIX. Every branch that can render a string, driven
       explicitly. A key reached in NONE of these is dead. */
    const states = await page.evaluate(() => {
      const T = window.PartWholeFrame;
      const names = [];
      const run = (name, fn) => { fn(); T.render(); names.push(name); };
      run('opening', () => {});
      run('notation-sum', () => { T.api.settings.notation = 'sum'; });
      run('notation-family', () => { T.api.settings.notation = 'family'; });
      run('notation-off', () => { T.api.settings.notation = 'off'; });
      run('numerals-off', () => { T.api.settings.numerals = false; });
      run('numerals-on', () => { T.api.settings.numerals = true; });
      run('tone-two', () => { T.api.settings.tone = 'two'; });
      run('tone-one', () => { T.api.settings.tone = 'one'; });
      run('shape-heart', () => { T.api.settings.shape = 'heart'; });
      run('shape-disc', () => { T.api.settings.shape = 'disc'; });
      run('cover-whole', () => { T.covers = { whole: true, a: false, b: false }; });
      run('cover-a', () => { T.covers = { whole: false, a: true, b: false }; });
      run('cover-b', () => { T.covers = { whole: false, a: false, b: true }; });
      run('uncovered', () => { T.covers = { whole: false, a: false, b: false }; });
      run('ways-ordered', () => { T.waysOrdered = true; });
      run('ways-found', () => { T.waysOrdered = false; T._carry('toB'); T._carry('toB'); });
      run('print-pages', () => {});
      /* the three gate strips, each reachable only from its own control */
      T._gateInline(T._wrap.querySelector('.pwf-head'), 'gateBand');
      T._gateInline(T._wrap.querySelector('.pwf-head'), 'gateWays');
      T._gateInline(T._wrap.querySelector('.pwf-head'), 'gatePrint');
      names.push('gate-band', 'gate-ways', 'gate-print');
      /* the stepper's own two phrases and the quick-set name */
      T._setWhole(T.frame.whole + 1);
      T._setWhole(T.frame.whole - 1);
      names.push('stepper');
      return names;
    });
    /* ⚠ THE DRAWER IS BUILT LAZILY. `lcs-shell.js` does
       `if (!drawer) buildDrawer()` inside openDrawer, so every settings
       label and every option label is unread until a teacher opens it —
       and a matrix that never opens it reports sixteen live strings dead.
       The first run of this gate did exactly that: a NEW gate condemning
       correct code before it caught anything, for the third time in this
       programme. */
    const opened = await page.evaluate(() => {
      const b = document.querySelector('.lcs-ctrl');
      if (!b) return false;
      b.click();
      return !!document.querySelector('.lcs-field');
    });
    if (!opened) { bad(`${tier}: could not open the settings drawer — the drawer half of this run measured nothing`); await page.close(); continue; }
    states.push('settings-drawer');
    await new Promise((r) => setTimeout(r, 300));

    const res = await page.evaluate(() => ({
      asked: window.__asked,
      keys: Object.keys(window.PartWholeFrame.__rawStrings)
    }));
    ASKED[tier] = res.asked;
    KEYS = res.keys;
    ok(`${tier}: drove ${states.length} named states, ${Object.keys(res.asked).length} of ${res.keys.length} keys asked for`);
    await page.close();
  }

  /* ⚠ A STRING IS DEAD ONLY IF NO TIER REACHES IT. The record, the order
     control and both printed pages do not EXIST for a free visitor — that
     is the entitlement working, not a dead string — and judging each tier
     in isolation condemns sixteen correct keys. Union the runs. */
  {
    const SHELL_OWNED_KEYS = Object.keys(SHELL_OWNED);
    const reached = new Set();
    Object.keys(ASKED).forEach((t) => Object.keys(ASKED[t]).forEach((k) => reached.add(k)));
    if (!KEYS.length) { bad('no keys were collected — this gate measured nothing'); }
    else {
      const never = KEYS.filter((k) => !reached.has(k));
      const exempt = never.filter((k) => SHELL_OWNED_KEYS.indexOf(k) !== -1);
      const dead = never.filter((k) => SHELL_OWNED_KEYS.indexOf(k) === -1);
      if (dead.length) bad(`DEAD STRINGS — never asked for in ANY tier: ${dead.join(', ')}`);
      else ok(`all ${KEYS.length} authored keys are reached across both entitlement states`);
      if (exempt.length) console.log(`        (shell-owned, read by lcs-shell not the tool: ${exempt.join(', ')})`);
      /* and name which keys only ONE tier reaches, so an entitlement
         regression that silently orphans the premium half is visible */
      const freeOnly = KEYS.filter((k) => ASKED.free && ASKED.free[k] && !(ASKED.premium && ASKED.premium[k]));
      const paidOnly = KEYS.filter((k) => ASKED.premium && ASKED.premium[k] && !(ASKED.free && ASKED.free[k]));
      if (paidOnly.length) console.log(`        premium-only (expected — the record and the printed pages): ${paidOnly.join(', ')}`);
      if (freeOnly.length) console.log(`        free-only (expected — the three upsell strips): ${freeOnly.join(', ')}`);
    }
  }

  /* ⚠ POISON: a probe that has only ever come back empty is
     indistinguishable from one that cannot come back at all. The right
     poison is the #39 shape — a live `t()` call left in a DEAD BRANCH,
     which a source scan passes and this gate must name. */
  {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: '{}' }) : r.continue());
    await page.evaluateOnNewDocument(() => {
      window.__asked = {};
      let real;
      Object.defineProperty(window, 'PartWholeFrame', {
        configurable: true,
        get() { return real; },
        set(v) {
          if (v && v.strings && !v.__wrapped) {
            const raw = v.strings;
            /* the poison: an authored key nothing will ever ask for */
            raw.__poisonDeadKey = { en: 'never rendered' };
            v.strings = new Proxy(raw, {
              get(t, k) { if (typeof k === 'string') window.__asked[k] = 1; return t[k]; }
            });
            Object.defineProperty(v, '__rawStrings', { value: raw, enumerable: false });
            v.__wrapped = true;
          }
          real = v;
        }
      });
    });
    await page.goto(BASE + '/part-whole-frame.html?lang=en', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.pwf-wrap', { timeout: 8000 });
    await new Promise((r) => setTimeout(r, 400));
    const caught = await page.evaluate(() => {
      const keys = Object.keys(window.PartWholeFrame.__rawStrings);
      return keys.filter((k) => !window.__asked[k]).indexOf('__poisonDeadKey') !== -1;
    });
    if (caught) ok('poison: a key nothing asks for IS reported dead');
    else bad('poison: the probe did NOT see a deliberately dead key — it cannot fail');
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('');
  console.log(FAIL ? `FAIL — ${FAIL} problem(s)` : `PASS — ${PASS} checks, every authored string is reached`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
