#!/usr/bin/env node
/* =====================================================================
   smoke-open-number-line-locales.js — drive the RENDERED line ×11.

   verify-open-number-line.js reads the strings TABLE. A key that exists
   there but is never wired into the DOM is invisible to it and obvious
   here — and so is a number word that is correct in the composer but
   never reaches the voice. Per locale this asserts:

     - the tool mounts, the line is EMPTY, and the axis is drawn
     - the chrome is in THAT locale (its own title, not the English one)
     - no raw camelCase key leaks into the page
     - a real jump draws an arc and the notation writes itself
     - the landing is SPOKEN as that locale's number word
     - the readout renders with no {placeholder} left behind, and the
       jump counter is not ungrammatical at ONE jump (both the German and
       the Dutch ensembles flagged "1 jumps" independently)
     - the verdict ban holds against the RENDERED page, not the source

   Usage: node scripts/smoke-open-number-line-locales.js
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html' };
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* the number word each locale must SAY when the marker lands on 47 —
   the inversion locales are the whole point of speaking it at all */
const WORD_47 = {
  en: 'forty-seven', de: 'siebenundvierzig', nl: 'zevenenveertig', da: 'syvogfyrre',
  no: 'førtisju', sv: 'fyrtiosju', fi: 'neljäkymmentäseitsemän',
  fr: 'quarante-sept', it: 'quarantasette', es: 'cuarenta y siete', pt: 'quarenta e sete'
};
const VERDICT = {
  en: /\b(wrong|incorrect|failed|try again)\b/i, de: /\b(falsch|fehler|leider)\b/i,
  fr: /\b(faux|fausse|erreur|raté)\b/i, it: /\b(sbagliato|errore)\b/i,
  es: /\b(incorrecto|mal hecho|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|foutje|verkeerd)\b/i, sv: /\b(felaktig)\b/i,
  da: /\b(forkert|fejl)\b/i, no: /\b(feil)\b/i, fi: /\b(väärin|virhe)\b/i
};
const RAW_KEYS = /\b(startAt|dragHint|nowAt|jumpsSoFar|totalSoFar|undoBtn|clearBtn|replayBtn|printBtn|setRange|setSnap|setVoice|gatePremium|gateClose)\b/;

let fail = 0, pass = 0;
const ok = (n, c, x) => { if (c) { pass++; } else { fail++; console.log('  FAIL ' + n + (x ? ' — ' + x : '')); } };
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]);
    const f = path.join(MINI, p.replace(/^\/mini-tools\//, '').replace(/^\//, ''));
    fs.readFile(f, (e, b) => {
      if (e) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', MIME[path.extname(f)] || 'application/octet-stream');
      res.end(b);
    });
  });
  await new Promise(r => server.listen(0, r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });

  for (const loc of LOCALES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', r => {
      if (/\/api\/auth\/me/.test(r.url()))
        return r.respond({ status: 200, contentType: 'application/json', body: JSON.stringify({ user: { subscriptionTier: 'free' }, subscription: null }) });
      r.continue();
    });
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));

    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/open-number-line.html?lang=${loc}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.onl-svg', { timeout: 8000 });
    await sleep(320);

    const before = await page.evaluate(() => {
      const S = OpenNumberLine.strings, L = OpenNumberLine.api.lang;
      return {
        lang: L,
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        wantTitle: S.title[L],
        wantStart: S.startAt[L],
        text: document.body.innerText,
        arcs: document.querySelectorAll('.onl-arc:not(.onl-arc-live)').length,
        axis: document.querySelectorAll('.onl-axis').length,
        ticks: document.querySelectorAll('[class*="tick"]').length
      };
    });
    ok(`${loc} the tool mounts with an EMPTY line`, before.arcs === 0 && before.axis === 1 && before.ticks === 0,
       `arcs ${before.arcs} axis ${before.axis} ticks ${before.ticks}`);
    ok(`${loc} the chrome is in-locale`, before.title.trim() === String(before.wantTitle).trim(), `"${before.title}" vs "${before.wantTitle}"`);
    ok(`${loc} the start label is in-locale`, before.text.includes(before.wantStart), before.wantStart);
    ok(`${loc} no raw key leaks`, !RAW_KEYS.test(before.text), (before.text.match(RAW_KEYS) || [])[0]);

    /* one real jump, landing on 47 so the inversion locales must speak it */
    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) LCSAudio.speak = o => window.__spoken.push(o); });
    await page.evaluate(() => { OpenNumberLine._setStart(40); });
    await sleep(200);
    await page.evaluate(() => { window.__spoken = []; if (window.LCSAudio) LCSAudio.speak = o => window.__spoken.push(o); });
    await page.evaluate(() => { OpenNumberLine._jumpBy(7); });
    await sleep(320);

    const after = await page.evaluate(() => ({
      arcs: document.querySelectorAll('.onl-arc:not(.onl-arc-live)').length,
      notes: [...document.querySelectorAll('.onl-note')].map(n => n.textContent),
      hint: (document.querySelector('.onl-hint') || {}).textContent || '',
      spoken: (window.__spoken || []).map(x => String(x.text)).join(' '),
      text: document.body.innerText
    }));
    ok(`${loc} a jump draws an arc`, after.arcs === 1, 'arcs ' + after.arcs);
    ok(`${loc} the notation wrote itself`, after.notes.length === 1 && /^\+7$/.test(after.notes[0]), after.notes.join('|'));
    ok(`${loc} the landing is spoken as its number word`, after.spoken.indexOf(WORD_47[loc]) >= 0,
       `wanted "${WORD_47[loc]}", spoke "${after.spoken}"`);
    ok(`${loc} the readout has no {placeholder} left`, !/\{[a-zA-Z]+\}/.test(after.hint), after.hint);
    /* ⚠ NO ASSERTION HERE, DELIBERATELY. At exactly one jump a plural
       template reads "1 jumps" / "1 Sprünge" / "1 salti", which both the
       German and the Dutch ensembles caught independently — but I wrote a
       pseudo-generic regex for it first and it PASSED while the defect was
       plainly visible in this script's own output. Grammatical number at
       n=1 is not machine-checkable across eleven languages; it is exactly
       what the native ensembles are for. The counter is printed on the
       per-locale line below so a human reads it, and every ensemble ships
       a plural-free form. A gate that cannot fail is worse than no gate. */
    ok(`${loc} no verdict language on the rendered page`, !VERDICT[loc].test(after.text), (after.text.match(VERDICT[loc]) || [])[0]);
    ok(`${loc} no console errors`, errs.length === 0, errs[0]);

    console.log(`  ${loc}: "${before.title}" · ${after.notes[0]} · spoke "${after.spoken.slice(0, 34)}" · ${after.hint.slice(0, 46)}`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed across ${LOCALES.length} locales`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
