#!/usr/bin/env node
/* =====================================================================
   smoke-letter-studio-locales.js — drive the RENDERED studio ×11.

   verify-letter-studio.js reads the strings TABLE. A key that exists in
   the table but is never wired into the DOM is invisible to it and
   obvious here, and so is a ruling that a locale declared but that the
   sheet never draws. Per locale this asserts:

     - the tool mounts and the sheet renders
     - the chrome is in THAT locale (its own title, not the English one)
     - no raw camelCase key leaks into the page
     - the locale's OWN ruling is drawn — the right number of lines, the
       right solid/dashed split, and its tint band when it has one
     - a letter can actually be traced, and the counter that appears
       carries real numbers with no {placeholder} left behind
     - the verdict ban holds against the RENDERED page, not the source

   Usage: node scripts/smoke-letter-studio-locales.js
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

/* Verdict vocabulary per language — the no-shame doctrine has to survive
   translation. Mirrors verify-letter-studio.js, on purpose. */
const VERDICT = {
  en: /\b(wrong|incorrect|bad|failed)\b/i, de: /\b(falsch|fehler|leider)\b/i,
  fr: /\b(faux|fausse|erreur|rat(é|e))\b/i, it: /\b(sbagliato|errore)\b/i,
  es: /\b(incorrecto|mal hecho|error)\b/i, pt: /\b(errado|erro)\b/i,
  nl: /\b(fout|foutje|verkeerd)\b/i, sv: /\b(fel|felaktig)\b/i,
  da: /\b(forkert|fejl)\b/i, no: /\b(feil)\b/i, fi: /\b(v(ä|a)(ä|a)rin|virhe)\b/i
};
const RAW_KEYS = /\b(modeLetters|modeNumbers|modeNames|caseLower|caseUpper|showMe|startDot|strokeOf|keepGoing|donePraise|nextOne|clearBtn|namesPick|letterOfName|nameDone|noClass|gateNames|gateClose|printBtn|setVoice|privacyLine)\b/;

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

    await page.goto(`http://127.0.0.1:${PORT}/mini-tools/letter-studio.html?lang=${loc}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.ls-svg', { timeout: 8000 });
    await sleep(350);

    const r = await page.evaluate(() => {
      const S = LetterStudio.strings, L = LetterStudio.api.lang;
      const ruling = LetterStudio.rulingFor(L);
      const rules = [...document.querySelectorAll('.ls-rule')];
      return {
        lang: L,
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        wantTitle: S.title[L],
        wantShowMe: S.showMe[L],
        text: document.body.innerText,
        system: ruling.system,
        wantZones: ruling.zones.length,
        wantSolid: ruling.zones.filter(z => z.kind === 'solid').length,
        gotRules: rules.length,
        gotSolid: rules.filter(e => !e.classList.contains('ls-dashed')).length,
        wantBand: !!ruling.band,
        gotBand: document.querySelectorAll('.ls-band').length,
        guides: document.querySelectorAll('.ls-guide').length,
        dot: document.querySelectorAll('.ls-startdot').length,
        modes: [...document.querySelectorAll('.ls-modebtn')].map(b => b.textContent).join('|')
      };
    });

    ok(`${loc} the sheet renders`, r.guides >= 1 && r.dot === 1, `guides ${r.guides} dot ${r.dot}`);
    ok(`${loc} the chrome is in-locale`, r.title.trim() === String(r.wantTitle).trim(), `"${r.title}" vs "${r.wantTitle}"`);
    ok(`${loc} the Show me button is in-locale`, r.text.includes(r.wantShowMe), r.wantShowMe);
    ok(`${loc} no raw key leaks`, !RAW_KEYS.test(r.text), (r.text.match(RAW_KEYS) || [])[0]);
    ok(`${loc} its OWN ruling is drawn (${r.system})`, r.gotRules === r.wantZones, `${r.gotRules} lines vs ${r.wantZones} zones`);
    ok(`${loc} the solid/dashed split is drawn`, r.gotSolid === r.wantSolid, `${r.gotSolid} solid vs ${r.wantSolid}`);
    ok(`${loc} the tint band matches the ruling`, r.wantBand ? r.gotBand === 1 : r.gotBand === 0, `want ${r.wantBand} got ${r.gotBand}`);

    /* trace stroke 0 so the counter has to render in this locale */
    const pts = await page.evaluate(() => AlphabetTraceCore.GLYPHS[LetterStudio._current()][0].map(q => ({ x: q.x, y: q.y })));
    const box = await page.evaluate(() => { const b = document.querySelector('.ls-svg').getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; });
    const at = (p) => ({ x: box.x + (p.x / 100) * box.w, y: box.y + (p.y / 110) * box.h });
    await page.mouse.move(at(pts[0]).x, at(pts[0]).y);
    await page.mouse.down();
    for (const p of pts.slice(1)) { const q = at(p); await page.mouse.move(q.x, q.y); }
    await page.mouse.up();
    await sleep(280);

    const after = await page.evaluate(() => ({
      hint: (document.querySelector('.ls-hint') || {}).textContent || '',
      ink: document.querySelectorAll('.ls-ink:not(.ls-ink-live)').length,
      text: document.body.innerText
    }));
    ok(`${loc} the trace inks`, after.ink >= 1, 'ink ' + after.ink);
    ok(`${loc} the hint has no {placeholder} left`, !/\{[a-zA-Z]+\}/.test(after.hint), after.hint);
    ok(`${loc} the hint is non-empty`, after.hint.trim().length > 3, after.hint);
    ok(`${loc} no verdict language on the rendered page`, !VERDICT[loc].test(after.text), (after.text.match(VERDICT[loc]) || [])[0]);
    ok(`${loc} no console errors`, errs.length === 0, errs[0]);

    console.log(`  ${loc}: ${r.system} · ${r.gotRules} lines (${r.gotSolid} solid)${r.wantBand ? ' + band' : ''} · "${r.title}"`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log(`\n${pass} passed, ${fail} failed across ${LOCALES.length} locales`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
