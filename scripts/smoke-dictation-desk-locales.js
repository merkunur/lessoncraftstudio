#!/usr/bin/env node
/* =====================================================================
   smoke-dictation-desk-locales.js — the RENDERED page, once per locale.

   verify- reads the strings TABLE; a key that exists there but is never
   wired into the DOM is invisible to it. This drives the real page in all
   eleven locales.

   Per locale:
     - mounts, the slate is covered, and the word is NOT in the page text
     - .lcs-title EQUALS strings.title[loc]
     - no raw camelCase key leaks
     - the bank for THAT locale loaded (not the English fallback)
     - ⚠ the UNIT RULING is honoured: a stage declaring type:'syllables'
       (es/pt/it/fi) reveals syllables and the readout says "syllables" in
       that language; everywhere else it says "sounds"
     - a full reveal spells the word exactly
     - the word — and only the whole word — is spoken, tagged that locale
     - zero console errors

   Usage: node scripts/smoke-dictation-desk-locales.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const SYLLABLE_LOCALES = ['es', 'pt', 'it', 'fi'];   /* declare a type:'syllables' stage */

const VERDICT = {
  en: /\b(wrong|incorrect|try again)\b/i, de: /\b(falsch|fehler)\b/i, fr: /\b(faux|erreur)\b/i,
  it: /\b(sbagliato|errore)\b/i, es: /\b(incorrecto|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|verkeerd)\b/i, sv: /\b(fel)\b/i, da: /\b(forkert|fejl)\b/i,
  no: /\b(feil)\b/i, fi: /\b(väärin|virhe)\b/i
};

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log('  ok    ' + m); };
const bad = (m) => { fail++; console.error('  FAIL  ' + m); };
const is = (c, m) => c ? ok(m) : bad(m);
const wait = (ms) => new Promise(r => setTimeout(r, ms));
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

  const src = fs.readFileSync(path.join(MINI, 'dictation-desk.js'), 'utf8');
  const KEYS = (src.match(/^\s{4}([a-zA-Z]+):\s*\{en:/gm) || []).map(l => l.trim().split(':')[0]);
  const KEY_RE = new RegExp('\\b(' + KEYS.join('|') + ')\\b');

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setRequestInterception(true);
    page.on('request', (r) => r.url().includes('/api/auth/me')
      ? r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }) })
      : r.continue());
    await page.evaluateOnNewDocument(() => { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} });
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.setViewport({ width: 1100, height: 900 });
    await page.goto(`${BASE}/dictation-desk.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.dd-wrap', { timeout: 8000 });
    await wait(500);

    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) LCSAudio.speak = (o) => window.__spoken.push(o); });

    const info = await page.evaluate(() => {
      const T = window.DictationDesk;
      const w = T._word();
      return {
        bankLocale: T.bank && T.bank.locale,
        title: (document.querySelector('.lcs-title') || {}).textContent,
        expTitle: T.strings.title[T.api.lang],
        word: w ? w.display : null,
        unitKind: T.unitKindFor(T.bank, T.stageId),
        covered: document.querySelectorAll('.dd-cell.dd-open').length,
        meta: (document.querySelector('.dd-meta') || {}).textContent || '',
        sylWord: T.strings.unitSyllable[T.api.lang],
        sndWord: T.strings.unitSound[T.api.lang],
        text: document.body.innerText
      };
    });

    is(info.bankLocale === loc, `${loc}: the ${loc} bank loaded (not a fallback)`);
    is((info.title || '').trim() === info.expTitle, `${loc}: the title renders in ${loc} ("${(info.title || '').trim()}")`);
    is(info.covered === 0, `${loc}: the slate starts covered`);
    is(!!info.word && !info.text.toLowerCase().includes(String(info.word).toLowerCase()),
      `${loc}: the word "${info.word}" is not in the page text before the reveal`);
    is(!KEY_RE.test(info.text), `${loc}: no raw string key leaked`);
    is(!/\{[a-z]+\}/.test(info.text), `${loc}: no unresolved placeholder`);
    is(!VERDICT[loc].test(info.text), `${loc}: no verdict vocabulary`);

    /* ⚠ THE PER-LOCALE UNIT RULING */
    const wantSyl = SYLLABLE_LOCALES.indexOf(loc) !== -1;
    const declares = await page.evaluate(() => (window.DictationDesk.bank.stages || []).some(s => s.type === 'syllables'));
    is(declares === wantSyl, `${loc}: bank ${wantSyl ? 'declares' : 'declares no'} syllable stage — as expected`);
    const usedWord = info.unitKind === 'syllable' ? info.sylWord : info.sndWord;
    is(info.meta.indexOf(usedWord) !== -1, `${loc}: the readout says "${usedWord}" for a ${info.unitKind} stage`);

    /* full reveal spells the word */
    await page.evaluate(() => { const T = window.DictationDesk; T.revealed = T.unitsFor(T._word()).length; T.render(); });
    await wait(250);
    const done = await page.evaluate(() => Array.from(document.querySelectorAll('.dd-cell.dd-open')).map(c => c.textContent).join(''));
    is(done.toLowerCase() === String(info.word).toLowerCase(), `${loc}: the finished slate spells "${info.word}" (got "${done}")`);

    /* only whole words are spoken, and in this locale */
    await page.evaluate(() => window.DictationDesk._sayWord());
    await wait(200);
    const spoken = await page.evaluate(() => window.__spoken || []);
    is(spoken.length > 0 && spoken.every(x => x.lang === loc && x.type === 'word'),
      `${loc}: speech is whole-word and tagged ${loc}`);
    is(errs.length === 0, `${loc}: console clean${errs.length ? ' — ' + errs[0] : ''}`);

    console.log(`  · ${loc}  "${(info.title || '').trim()}"  word "${info.word}" -> "${done}"  unit=${info.unitKind}  ${info.meta}`);
    await page.close();
  }

  /* ⚠ NO ASSERTION ON THE READOUT'S GRAMMATICAL NUMBER. "1 sounds" would
     be wrong in every language and a pseudo-generic regex for it passes
     while the defect is visible in this script's own output — the
     open-number-line lesson. The readout is PRINTED above for a human.
     (Words with a single unit do not occur in these banks: the validator
     enforces 2-5 boxes.) */

  await browser.close();
  server.close();
  console.log('');
  console.log(`${pass} passed, ${fail} failed across ${LOCALES.length} locales`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
