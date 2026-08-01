/* =====================================================================
   smoke-unroll-tape-locales.js — TOOL #41 in all eleven languages
   ---------------------------------------------------------------------
   Run:  node scripts/smoke-unroll-tape-locales.js

   ⚠ A FRESH BROWSER PER LOCALE. A reused context carries a service
   worker, a cached module and a warm localStorage, and a locale that
   only works second is a locale that does not work.

   ⚠ AND IT PRINTS THE WHOLE AUTHORED STRING SET PER LOCALE, so a human
   reading the log sees exactly what ships. A gate that checks "a string
   is non-empty" has checked almost nothing.
   ===================================================================== */

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..', 'mini tools');
const PORT = 5534;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const srv = http.createServer((rq, rs) => {
  const f = rq.url.split('?')[0].replace('/mini-tools/', '');
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) { rs.writeHead(404); rs.end('x'); return; }
  const t = f.endsWith('.js') ? 'application/javascript' : f.endsWith('.json') ? 'application/json'
    : f.endsWith('.css') ? 'text/css' : 'text/html';
  rs.writeHead(200, { 'Content-Type': t }); rs.end(fs.readFileSync(fp));
}).listen(PORT);

let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) { PASS++; console.log('  ok   ' + m); } else { FAIL++; console.error('  FAIL ' + m); } };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ⚠ THE NAMED-UNIT BAN, POISON-TESTED IN BOTH DIRECTIONS BEFORE USE.
   This program has now bought the ban-too-wide defect three times: a
   likelihood ban that rejected the German panel's own correct name, a
   `\bright\b` that condemned a stage-edge constant, and a body scan that
   condemned the ruler's correct slug. So the probe is asserted against
   strings it MUST fire on AND strings it MUST NOT, every run. */
const NAMED_UNIT = /(\bcm\b|\bmm\b|centimet|centimèt|zentimet|centímetr|sentti|senttimetr|\bmeter\b|\bmetro\b|\bmètre\b|\binch(es)?\b|\btum(mar)?\b|\btomme[rn]?\b|paperclip|büroklammer|trombone|graffett)/i;
const MUST_FIRE = [
  'measure it in cm', 'Miss in Zentimetern', 'mide en centímetros', 'mesure en centimètres',
  'meça em centímetros', 'misura in centimetri', 'meet in centimeters', 'mät i centimeter',
  'mål i centimeter', 'mittaa senttimetreinä', 'three inches', 'mät i tum', 'to tommer',
  'lay paperclips end to end', 'lege Büroklammern', 'des trombones', 'con le graffette'
];
const MUST_PASS = [
  /* real prose these panels could plausibly write — none names a unit */
  'Wie weit ist es einmal rundherum?', 'Combien de fois la largeur de la forme ?',
  '¿Cuántas anchuras de la figura mide?', 'Quantas larguras da figura?',
  'Quante volte la larghezza della figura?', 'Hoe vaak past de breedte van de vorm?',
  'Hur många av formens egen bredd?', 'Hvor mange af figurens egen bredde?',
  'Hvor mange av figurens egen bredde?', 'Kuinka monta muodon omaa leveyttä?',
  /* words that merely contain the letters */
  'Mät med tummen.', 'the parameter is immaterial', 'Die Schnur liegt rundherum.'
];
(function poison() {
  const missed = MUST_FIRE.filter((s) => !NAMED_UNIT.test(s));
  const condemned = MUST_PASS.filter((s) => NAMED_UNIT.test(s));
  is(missed.length === 0, `the named-unit ban fires on all ${MUST_FIRE.length} violations` + (missed.length ? ` — MISSED: ${missed[0]}` : ''));
  is(condemned.length === 0, `and clears all ${MUST_PASS.length} innocent strings` + (condemned.length ? ` — WRONGLY CONDEMNED: ${condemned[0]}` : ''));
}());

(async () => {
  const seenTitles = {};
  for (const loc of LOCALES) {
    /* ⚠ a FRESH browser, not a fresh page */
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
    await page.setViewport({ width: 900, height: 900 });
    await page.goto(`http://127.0.0.1:${PORT}/unroll-tape.html?lang=${loc}&embed=1`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.urt-bench', { timeout: 9000 });
    await wait(500);

    const seen = await page.evaluate((L) => {
      const U = window.UnrollTape, out = {};
      for (const k of Object.keys(U.strings)) out[k] = U.strings[k][L] || U.strings[k].en;
      return {
        strings: out,
        chips: Array.from(document.querySelectorAll('.urt-chip')).map((c) => c.textContent.trim()),
        hint: (document.querySelector('.urt-hint') || {}).textContent || '',
        strandVerts: (document.querySelector('.urt-strand').getAttribute('points') || '').trim().split(/\s+/).length,
        nums: Array.from(document.querySelectorAll('.urt-num')).map((e) => e.textContent).join(',')
      };
    }, loc);

    console.log(`\n--- ${loc} ---`);
    for (const k of Object.keys(seen.strings)) console.log(`       ${k.padEnd(13)} ${seen.strings[k]}`);

    /* the apparatus itself must be identical in every language */
    is(seen.strandVerts > 100, `${loc}: the strand renders (${seen.strandVerts} vertices)`);
    is(seen.nums.length > 0, `${loc}: the runway is ruled (${seen.nums})`);
    is(errs.length === 0, `${loc}: no console errors` + (errs.length ? ' — ' + errs[0] : ''));

    /* every key present, non-empty, and NOT an English fallback (bar en) */
    const missing = Object.keys(seen.strings).filter((k) => !seen.strings[k] || !String(seen.strings[k]).trim());
    is(missing.length === 0, `${loc}: all 16 keys are authored` + (missing.length ? ` — empty: ${missing}` : ''));
    if (loc !== 'en') {
      const enFall = Object.keys(seen.strings).filter((k) => seen.strings[k] === (require(path.join(ROOT, 'unroll-tape.js')).strings[k].en));
      is(enFall.length === 0, `${loc}: no key falls back to English` + (enFall.length ? ` — ${enFall.join(', ')}` : ''));
    }

    /* ⭐ the refusals, per locale */
    const all = Object.values(seen.strings).join(' | ');
    is(!NAMED_UNIT.test(all), `${loc}: ⭐ no string names a unit`);
    is(!/\d/.test(all), `${loc}: no string contains a digit`);
    is(!/[!]/.test(all), `${loc}: no exclamation marks`);
    is(!/​|­|﻿/.test(all), `${loc}: no invisible characters pasted into a string`);

    /* the chips must fit a phone row */
    const longChip = seen.chips.filter((c) => c.length > 30);
    is(longChip.length === 0, `${loc}: every button is short enough for a phone row` + (longChip.length ? ` — ${longChip[0]}` : ''));

    /* ⭐ and the locales must be DISTINCT — a title reused is a locale
       that was translated by copying, or a fallback that slipped through */
    if (seenTitles[seen.strings.title] && seenTitles[seen.strings.title] !== loc) {
      is(false, `${loc}: title collides with ${seenTitles[seen.strings.title]} — "${seen.strings.title}"`);
    } else {
      seenTitles[seen.strings.title] = loc;
      is(true, `${loc}: the title is this locale's own — "${seen.strings.title}"`);
    }

    await browser.close();
  }
  srv.close();
  console.log('');
  if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL} assertions`); process.exit(1); }
  console.log(`PASS — ${PASS} assertions across ${LOCALES.length} locales`);
})();
