/* =====================================================================
   apply-number-sieve-locales.js — merge the native panels' strings in
   ---------------------------------------------------------------------
   Run:  node scripts/apply-number-sieve-locales.js [--dry-run]

   Reads `scripts/_number-sieve-ensembles.json`, shaped
     { "<locale>": { "<stringKey>": "<native string>", ... }, ... }
   for the TEN non-en locales, and rewrites the `strings:` block of
   `mini tools/number-sieve.js` in canonical one-line-per-key shape.

   ⚠ EN IS NEVER TOUCHED. It is the authored source; the ten others are
   REBUILT by their own panels (§A.13.48), not translated, so this
   overwrites them wholesale rather than patching.

   ⚠ Idempotent: run it twice and the second run reports 0 changes.

   ⚠ WRITES LF. A CRLF rewrite silently un-anchors every multi-line
   mutation in scripts/mutate-number-sieve.js, which then reports ANCHOR
   NOT FOUND for no visible reason.

   ⚠ The canonical emitted shape is what scripts/mutate-number-sieve.js
   anchors its string mutations on (`^ {4}<key>:\s+\{ en: "..."`). Change
   the shape here and you un-anchor them there.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'number-sieve.js');
const ENS_PATH = path.join(__dirname, '_number-sieve-ensembles.json');
const DRY = process.argv.indexOf('--dry-run') > -1;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NON_EN = LOCALES.filter((l) => l !== 'en');

if (!fs.existsSync(ENS_PATH)) {
  console.error('  FATAL scripts/_number-sieve-ensembles.json not found — the panels have not landed yet');
  process.exit(1);
}
const ENS = JSON.parse(fs.readFileSync(ENS_PATH, 'utf8'));
let src = fs.readFileSync(SRC_PATH, 'utf8');

/* the placeholders the tool relies on, per key */
const PLACEHOLDERS = { cellAria: ['{n}'], cellOutAria: ['{n}'], markerAria: ['{n}'], cardAria: ['{i}'] };
/* the paid-plan name is the SUITE's — the panels each coin a different
   one if left to it, and then the subscription is called three things */
const FIXED_UNLOCK = {
  de: 'Lehrer-Paket ansehen', fr: 'Voir l’offre Enseignant', es: 'Ver el plan Docente',
  pt: 'Ver o plano Professor', it: 'Vedi il piano Insegnante', nl: 'Bekijk het Leerkracht-pakket',
  sv: 'Se Lärarpaketet', da: 'Se Lærerabonnementet', no: 'Se Lærerabonnementet', fi: 'Katso Opettaja-tilaus'
};

const lineRe = /^ {4}([A-Za-z0-9_]+):(\s+)\{ (.*) \},$/gm;
const keys = [];
let m;
while ((m = lineRe.exec(src)) !== null) keys.push({ key: m[1], pad: m[2], raw: m[0] });
if (!keys.length) { console.error('  FATAL could not find the strings block'); process.exit(1); }

let changed = 0, fatal = 0;
keys.forEach((k) => {
  const cur = {};
  /* pull the existing per-locale values out of the line */
  const inner = /^ {4}[A-Za-z0-9_]+:\s+\{ (.*) \},$/.exec(k.raw)[1];
  inner.split(/",\s*(?=[a-z]{2}: ")/).forEach((part) => {
    const p = /^([a-z]{2}):\s*"([\s\S]*?)"?$/.exec(part.trim());
    if (p) cur[p[1]] = p[2].replace(/"$/, '');
  });

  const next = { en: cur.en };
  NON_EN.forEach((loc) => {
    const panel = ENS[loc] || {};
    let v = Object.prototype.hasOwnProperty.call(panel, k.key) ? panel[k.key] : cur[loc];
    if (k.key === 'unlock' && FIXED_UNLOCK[loc] && v !== FIXED_UNLOCK[loc]) {
      console.log(`  ..   ${loc}.unlock normalised to the suite lexicon ("${v}" -> "${FIXED_UNLOCK[loc]}")`);
      v = FIXED_UNLOCK[loc];
    }
    if (v === undefined || v === null || v === '') { console.error(`  FATAL ${loc}.${k.key} is missing`); fatal++; v = cur[loc]; }
    (PLACEHOLDERS[k.key] || []).forEach((ph) => {
      if (String(v).indexOf(ph) === -1) { console.error(`  FATAL ${loc}.${k.key} lost the ${ph} placeholder: "${v}"`); fatal++; }
    });
    if (/[­​-‍⁠﻿]/.test(String(v))) { console.error(`  FATAL ${loc}.${k.key} carries an invisible character`); fatal++; }
    if (/"/.test(String(v))) { console.error(`  FATAL ${loc}.${k.key} contains a double quote, which would break the emitted line`); fatal++; }
    next[loc] = v;
  });

  const parts = LOCALES.map((l) => `${l}: "${next[l]}"`);
  const rebuilt = `    ${k.key}:${k.pad}{ ${parts.join(', ')} },`;
  if (rebuilt !== k.raw) { changed++; src = src.split(k.raw).join(rebuilt); }
});

if (fatal) { console.error(`\nFAIL — ${fatal} problem(s); nothing written`); process.exit(1); }
if (!DRY && changed) fs.writeFileSync(SRC_PATH, src.replace(/\r\n/g, '\n'), 'utf8');
console.log(`\n${DRY ? 'DRY RUN — ' : ''}${changed} of ${keys.length} string line(s) rebuilt${DRY ? ' (nothing written)' : ''}`);
