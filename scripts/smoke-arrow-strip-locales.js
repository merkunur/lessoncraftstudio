/* =====================================================================
   smoke-arrow-strip-locales.js — eleven locales, one fresh browser each
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-arrow-strip-locales.js

   ⚠ A FRESH BROWSER PER LOCALE. Reusing one leaks the first locale's
   cached module and every later locale passes on English.
   ⚠ IT PRINTS THE WHOLE AUTHORED STRING SET with seen/unseen marks. That
   is not decoration: a soft hyphen hidden in a Danish string survived
   every assertion on a previous tool and was caught only because the
   digest showed the string to a human.
   ⚠ Controls are reached by INDEX, never by an English aria-label.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const PORT = 5505;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const serve = () => http.createServer((req, res) => {
  const f = path.join(MINI, path.basename(req.url.split('?')[0]));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }), head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} },
  fetch: () => Promise.resolve({ ok: false }), setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(MINI, 'arrow-strip.js'), 'utf8') + '\n;this.__T = ArrowStrip;', sandbox);
const T = sandbox.__T;

/* the strings that must be VISIBLE somewhere in a normal session */
const VISIBLE = ['title', 'buildHint', 'predictHint', 'againHint', 'runBtn', 'clearBtn', 'eyeBtn', 'eyeOffBtn', 'matBook', 'printBtn', 'gateLine', 'unlock'];
/* the strings that live in aria only */
const ARIA = ['matLabel', 'cardFwd', 'cardBack', 'cardTurnL', 'cardTurnR', 'railSlotAria', 'bodyAria'];

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const server = serve();
  await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

  for (const loc of LOCALES) {
    /* ⚠ one browser per locale */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (r) => (r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
      : r.continue()));
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.setViewport({ width: 1024, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/arrow-strip.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.arw-card', { timeout: 9000 });
    await wait(350);

    /* The placeholder strings need a PATTERN, not a substring: matching
       them literally can never succeed once {i}/{r}/{c} are substituted,
       so they sat permanently unmarked in the digest and a broken
       interpolation would have been invisible.
       ⚠ THE NUMERIC PLACEHOLDERS ARE [0-9]+, NOT A WILDCARD. The first
       cut used `.{1,60}?` for all of them, which matches ANY prose — so
       every locale's cellAria "matched" against unrelated body text and
       reported as rendered. It was a dead string in all eleven, and only
       Finnish (whose panel restructured the sentence into a distinctive
       "Ruutu: rivi …, sarake …" shape) failed to false-positive and
       exposed it. A wildcard in a coverage check manufactures coverage. */
    const pat = (x) => new RegExp(
      x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\\\{(?:i|r|c)\\\}/g, '[0-9]+')
        .replace(/\\\{card\\\}/g, '.{1,60}?')
    );
    const seen = new Set();
    const sweep = async () => {
      const txt = await page.evaluate(() => document.body.innerText + String.fromCharCode(10) + document.documentElement.outerHTML);
      VISIBLE.concat(ARIA).forEach((k) => {
        const v = T.strings[k][loc];
        if (/[{][a-z]+[}]/.test(v) ? pat(v).test(txt) : txt.indexOf(v) > -1) seen.add(k);
      });
    };
    await sweep();
    /* build a rail, run it, toggle the eye, then trip the gate — the
       whole authored surface in one pass, all by INDEX */
    await page.evaluate(() => { const c = document.querySelectorAll('.arw-card'); c[0].click(); });
    await wait(120); await sweep();
    await page.evaluate(() => { const c = document.querySelectorAll('.arw-card'); c[3].click(); c[0].click(); });
    await wait(120);
    await page.evaluate(() => document.querySelectorAll('.arw-foot .arw-chip')[0].click());
    await wait(320); await sweep();
    await page.evaluate(() => { const b = document.querySelectorAll('.arw-bar .arw-chip'); b[3].click(); });
    await wait(320); await sweep();
    await page.evaluate(() => { const b = document.querySelectorAll('.arw-bar .arw-chip'); b[3].click(); });
    await wait(320); await sweep();
    /* the locked print control shows gateLine + unlock for a free account */
    await page.evaluate(() => { const f = document.querySelectorAll('.arw-foot .arw-chip'); f[f.length - 1].click(); });
    await wait(320); await sweep();

    console.log(`\n[${loc}]  ${T.strings.title[loc]}`);
    let missing = 0;
    VISIBLE.concat(ARIA).forEach((k) => {
      const ok = seen.has(k);
      if (!ok && VISIBLE.indexOf(k) > -1) missing++;
      console.log(`   ${ok ? 'x' : ' '} ${k.padEnd(13)} ${JSON.stringify(T.strings[k][loc])}`);
    });
    is(missing === 0, `${loc}: ${missing} visible string(s) never appeared`);

    /* no other locale's copy leaked in */
    const body = await page.evaluate(() => document.body.innerText);
    let leaked = null;
    LOCALES.forEach((other) => {
      if (other === loc) return;
      const t = T.strings.title[other];
      if (t !== T.strings.title[loc] && body.indexOf(t) > -1) leaked = other;
    });
    is(!leaked, `${loc}: ${leaked} copy leaked onto the page`);
    is(errs.length === 0, `${loc}: console errors — ${errs[0] || ''}`);

    /* the two nodes of the gate, never a concatenation */
    const gate = await page.evaluate(() => {
      const g = document.querySelector('.arw-gate');
      return g ? { kids: g.children.length, link: !!g.querySelector('a[href]') } : null;
    });
    is(gate && gate.kids === 2 && gate.link, `${loc}: the gate is two nodes with a real link`);

    await browser.close();
  }

  server.close();
  console.log('');
  console.log(FAIL ? `FAIL — ${PASS} passed, ${FAIL} failed` : `PASS — ${PASS} assertions across ${LOCALES.length} locales`);
  process.exit(FAIL ? 1 : 0);
})();
