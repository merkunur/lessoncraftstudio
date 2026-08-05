#!/usr/bin/env node
/* =====================================================================
   smoke-part-whole-frame-locales.js — the RENDERED page, once per locale.

   verify- reads the strings TABLE; a key that exists there but is never
   wired into the DOM is invisible to it. This drives the real page in all
   eleven locales and asserts what a teacher would actually see.

   Per locale:
     - the frame mounts, the nest holds the whole, the parts sum to it
     - .lcs-title EQUALS strings.title[loc] — the chrome is in THAT
       language, not English
     - no raw camelCase key leaks into the rendered text
     - a real carry moves exactly one and leaves the whole alone
     - the split is spoken with THAT locale's number words
     - no {placeholder} survives
     - the locale's verdict vocabulary does not appear in rendered text
     - zero console errors

   Usage: node scripts/smoke-part-whole-frame-locales.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* the whole spoken at 7, per locale — hard-coded so a table swap in the
   tool cannot quietly agree with itself */
const WORD_7 = {
  en: 'seven', de: 'sieben', fr: 'sept', it: 'sette', es: 'siete', pt: 'sete',
  nl: 'zeven', sv: 'sju', da: 'syv', no: 'sju', fi: 'seitsemän'
};
const VERDICT = {
  en: /\b(wrong|incorrect|try again)\b/i, de: /\b(falsch|fehler)\b/i,
  fr: /\b(faux|erreur)\b/i, it: /\b(sbagliato|errore)\b/i,
  es: /\b(incorrecto|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|verkeerd)\b/i, sv: /\b(fel)\b/i, da: /\b(forkert|fejl)\b/i,
  no: /\b(feil)\b/i, fi: /\b(väärin|virhe)\b/i
};

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log('  ok    ' + m); };
const bad = (m) => { fail++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);

const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };

(async () => {
  const server = http.createServer((req, res) => {
    const f = path.join(MINI, path.basename(req.url.split('?')[0]));
    fs.readFile(f, (e, b) => {
      if (e) { res.writeHead(404); res.end('404'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      res.end(b);
    });
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = 'http://127.0.0.1:' + server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  /* the string keys, read from the tool itself, for the raw-key-leak scan */
  const KEYS = Object.keys(JSON.parse(await (async () => {
    const src = fs.readFileSync(path.join(MINI, 'part-whole-frame.js'), 'utf8');
    const m = src.match(/^\s{4}([a-zA-Z]+):\s*\{en:/gm) || [];
    return JSON.stringify(m.reduce((a, l) => { a[l.trim().split(':')[0]] = 1; return a; }, {}));
  })()));
  const KEY_RE = new RegExp('\\b(' + KEYS.join('|') + ')\\b');

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (r) => r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) })
      : r.continue());
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.setViewport({ width: 1000, height: 900 });
    await page.goto(`${BASE}/part-whole-frame.html?lang=${loc}&embed=1`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.pwf-wrap', { timeout: 8000 });
    await new Promise(r => setTimeout(r, 260));

    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) LCSAudio.speak = (o) => window.__spoken.push(o); });
    await page.evaluate(() => { window.PartWholeFrame._setWhole(7); });
    await new Promise(r => setTimeout(r, 140));

    const before = await page.evaluate(() => ({
      a: document.querySelectorAll('.pwf-box-a .pwf-dot').length,
      b: document.querySelectorAll('.pwf-box-b .pwf-dot').length,
      w: document.querySelectorAll('.pwf-box-whole .pwf-dot').length
    }));
    await page.evaluate(() => { window.PartWholeFrame._carry('toB'); });
    /* the spoken split is DEBOUNCED by 380ms — a class carries twenty
       times in a minute and each utterance is a whole sentence, so the
       tool waits for the hand to settle before it speaks. A 200ms wait
       measured silence and reported it as a missing voice in all eleven
       locales; the tool was correct and the probe was early. */
    await new Promise(r => setTimeout(r, 900));

    const s = await page.evaluate(() => ({
      title: (document.querySelector('.lcs-title') || {}).textContent,
      a: document.querySelectorAll('.pwf-box-a .pwf-dot').length,
      b: document.querySelectorAll('.pwf-box-b .pwf-dot').length,
      w: document.querySelectorAll('.pwf-box-whole .pwf-dot').length,
      text: document.body.innerText,
      spoken: (window.__spoken || []).map(x => ({ t: x.text, lang: x.lang }))
    }));
    const expTitle = await page.evaluate((l) => window.PartWholeFrame.strings.title[l], loc);

    is(before.w === 7 && before.a + before.b === 7, `${loc}: the frame holds 7 and the parts sum to it`);
    is((s.title || '').trim() === expTitle, `${loc}: the title renders in ${loc} ("${(s.title || '').trim()}")`);
    is(s.a === before.a - 1 && s.b === before.b + 1, `${loc}: a carry moves exactly one`);
    is(s.w === 7, `${loc}: the whole is untouched by the carry`);
    is(!KEY_RE.test(s.text), `${loc}: no raw string key leaked into the page`);
    is(!/\{[a-z]+\}/.test(s.text), `${loc}: no unresolved placeholder`);
    is(!VERDICT[loc].test(s.text), `${loc}: no verdict vocabulary on the rendered page`);
    const said = s.spoken.map(x => x.t).join(' | ');
    is(s.spoken.length > 0 && s.spoken.every(x => x.lang === loc), `${loc}: speech is tagged ${loc}`);
    is(said.toLowerCase().includes(WORD_7[loc].toLowerCase()), `${loc}: 7 is spoken as "${WORD_7[loc]}"`);
    is(errs.length === 0, `${loc}: console clean${errs.length ? ' — ' + errs[0] : ''}`);

    console.log(`  · ${loc}  "${(s.title || '').trim()}"  ${s.a}+${s.b}=${s.w}  spoke: ${said}`);
    await page.close();
  }

  /* ⚠ NO GRAMMATICAL-NUMBER ASSERTION HERE, DELIBERATELY. This tool has
     no counter phrase ("3 ways so far") for exactly the reason the
     open-number-line smoke records: agreement at n=1 is not machine-
     checkable across eleven languages, and a regex that pretends
     otherwise passes while the defect is visible in this script's own
     output. The per-locale split frame is PRINTED above for a human. */

  await browser.close();
  server.close();
  console.log('');
  console.log(`${pass} passed, ${fail} failed across ${LOCALES.length} locales`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
