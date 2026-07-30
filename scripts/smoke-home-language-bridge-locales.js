#!/usr/bin/env node
/* =====================================================================
   smoke-home-language-bridge-locales.js — the RENDERED Say It Board,
   once per locale.

   verify- reads the strings TABLE; a key that exists there but is never
   wired into the DOM is invisible to it. This drives the real page in all
   eleven locales.

   Per locale:
     - mounts, 12 cards, each with a drawn icon
     - .lcs-title EQUALS strings.title[loc]
     - no raw camelCase key leaks, no surviving {placeholder}
     - the twelve phrases render in THAT locale and are distinct
     - the classroom line is tagged with that locale
     - paired against a German home line: two lines, home first
     - no verdict vocabulary in that language
     - zero console errors

   ⚠ And it PRINTS every phrase. A gate cannot catch a grammar error — the
   Finnish "2 tavut" defect passed every assertion and was caught by
   reading the output. Read the digest.

   Usage: node scripts/smoke-home-language-bridge-locales.js [--quiet]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const QUIET = process.argv.includes('--quiet');

const VERDICT = {
  en: /\b(wrong|incorrect|score|level)\b/i, de: /\b(falsch|fehler|punkte|stufe)\b/i,
  fr: /\b(faux|erreur|score|niveau)\b/i, it: /\b(sbagliato|errore|punteggio|livello)\b/i,
  es: /\b(incorrecto|error|puntuación|nivel)\b/i, pt: /\b(errado|erro|pontuação|nível)\b/i,
  nl: /\b(fout|verkeerd|score|niveau)\b/i, sv: /\b(fel|poäng|nivå)\b/i,
  da: /\b(forkert|fejl|point|niveau)\b/i, no: /\b(feil|poeng|nivå)\b/i,
  fi: /\b(väärin|virhe|pisteet|taso)\b/i
};

let pass = 0, fail = 0;
const ok = (m) => { pass++; if (!QUIET) console.log('  ok    ' + m); };
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

  const digest = [];

  for (const loc of LOCALES) {
    console.log(`[${loc}]`);
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    /* ⚠ same origin for all eleven, so the home language chosen on the
       previous locale's page persists into this one and every board boots
       already paired. Each locale must be a fresh child's first visit. */
    await page.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch (_) {} });
    await page.setViewport({ width: 1024, height: 900, deviceScaleFactor: 1 });
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(`${BASE}/home-language-bridge.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.hlb-wrap', { timeout: 8000 });
    await wait(350);

    const solo = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.hlb-card'));
      return {
        n: cards.length,
        icons: cards.filter(c => {
          const d = c.querySelector('svg.hlb-icon path.hlb-ipath');
          return !!(d && (d.getAttribute('d') || '').length > 12);
        }).length,
        lines: cards.map(c => Array.from(c.querySelectorAll('.hlb-text')).map(t => t.textContent.trim())),
        langs: cards.map(c => (c.querySelector('.hlb-text') || {}).getAttribute
          ? c.querySelector('.hlb-text').getAttribute('lang') : null),
        title: (document.querySelector('.lcs-title') || {}).textContent || '',
        want: window.HomeLanguageBridge.strings.title[document.documentElement.lang]
          || window.HomeLanguageBridge.strings.title[window.HomeLanguageBridge.classroom],
        text: (document.querySelector('.lcs-app') || document.body).innerText
      };
    });

    is(solo.n === 12, `12 cards (got ${solo.n})`);
    is(solo.icons === 12, `12 drawn icons (got ${solo.icons})`);
    is(solo.lines.every(l => l.length === 1), 'one line per card with no home language');
    is(solo.title.trim() === String(solo.want).trim(), `title is the locale's own ("${solo.title.trim()}")`);
    is(solo.langs.every(l => l === loc), `every line tagged lang="${loc}"`);
    const phrases = solo.lines.map(l => l[0]);
    is(new Set(phrases).size === 12, `all twelve phrases are distinct (${new Set(phrases).size}/12)`);
    is(!phrases.some(p => /\{[a-z]/i.test(p)), 'no surviving {placeholder}');
    is(!/\b[a-z]+[A-Z][a-zA-Z]*\b/.test(solo.text.replace(/LessonCraft\w*/g, '')),
      'no raw camelCase key leaked into the page');
    is(!VERDICT[loc].test(solo.text), 'no verdict or level vocabulary in the rendered text');

    /* paired with a German home line (English home line for the de page) */
    const other = loc === 'de' ? 'en' : 'de';
    await page.evaluate((h) => { window.HomeLanguageBridge._setHome(h); }, other);
    await wait(250);
    const pair = await page.evaluate(() => Array.from(document.querySelectorAll('.hlb-card')).map(c => {
      const t = Array.from(c.querySelectorAll('.hlb-text'));
      return t.map(x => ({ txt: x.textContent.trim(), lang: x.getAttribute('lang') }));
    }));
    is(pair.every(l => l.length === 2), 'paired: two lines per card');
    is(pair.every(l => l[0].lang === other && l[1].lang === loc), `paired: the home line (${other}) comes first`);

    is(errs.length === 0, `zero console errors${errs.length ? ' — ' + errs[0] : ''}`);
    digest.push({ loc, title: solo.title.trim(), phrases });
    await page.close();
  }

  await browser.close();
  server.close();

  /* ⚠ READ THIS. No gate catches a grammar error. */
  console.log('\n================ READ THE PHRASES ================');
  for (const d of digest) {
    console.log(`\n${d.loc}  —  ${d.title}`);
    d.phrases.forEach((p, i) => console.log(`   ${String(i + 1).padStart(2)}. ${p}`));
  }
  console.log('\n==================================================');
  console.log(`${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
