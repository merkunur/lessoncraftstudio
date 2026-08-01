/* =====================================================================
   apply-unroll-tape-locales.js — write the strings block from its SoT
   ---------------------------------------------------------------------
   Run:  node scripts/apply-unroll-tape-locales.js

   Rewrites the entire `strings: { … }` block in
   `mini tools/unroll-tape.js` from `scripts/_unroll-tape-strings.js`.
   Idempotent: a second run reports no change.

   ⚠ It REFUSES to write on any of these, rather than shipping a defect:
     · a missing or empty key in any locale
     · a key present in one locale and absent in another
     · a non-EN string identical to the English (an untranslated leak)
     · a string naming a UNIT — poison-tested in both directions first
     · a digit, an exclamation mark, or an invisible character
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const SoT = require('./_unroll-tape-strings.js');
const TOOL = path.join(__dirname, '..', 'mini tools', 'unroll-tape.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* the key ORDER is fixed here, so a re-run never reshuffles the block and
   a diff shows only what actually changed */
const ORDER = [
  'title', 'instruction', 'benchLabel',
  'hintGuess', 'hintUnroll', 'hintLanded',
  'unrollBtn', 'rollBackBtn', 'nextShapeBtn', 'printBtn',
  'sizeAria', 'strandAria', 'flagAria',
  'gateTitle', 'gateBody', 'gateCta'
];

/* ⚠ POISON-TESTED IN BOTH DIRECTIONS BEFORE IT IS USED ON REAL COPY.
   This program has bought the ban-too-wide defect four times now; a ban
   that has only been shown to fire has not been tested. */
const NAMED_UNIT = /(\bcm\b|\bmm\b|centimet|centimèt|zentimet|centímetr|sentti|senttimetr|\bmeter\b|\bmetre\b|\bmetro\b|\bmètre\b|\binch(es)?\b|\btum(mar)?\b|\btomme[rn]?\b|paperclip|büroklammer|trombone|graffett)/i;
const MUST_FIRE = ['in cm', 'in Zentimetern', 'en centímetros', 'i centimeter', 'senttimetreinä', 'three inches', 'i tum', 'to tommer', 'met paperclips'];
const MUST_PASS = [
  'Die Schnur rundherum', 'La ficelle qui se couche', 'La vuelta a la figura',
  'O Barbante do Contorno', 'Lo spago del contorno', 'Helemaal rondom',
  'Snöret runt', 'Tråden om figuren', 'Hyssingsporet', 'Ympäri ja suoraksi',
  'Mät med tummen.', 'the parameter is immaterial'
];

let bad = 0;
const fail = (m) => { console.error('  REFUSED: ' + m); bad++; };

(function poison() {
  const missed = MUST_FIRE.filter((s) => !NAMED_UNIT.test(s));
  const condemned = MUST_PASS.filter((s) => NAMED_UNIT.test(s));
  if (missed.length) fail(`the unit ban MISSED a violation: "${missed[0]}"`);
  if (condemned.length) fail(`the unit ban WRONGLY CONDEMNED: "${condemned[0]}"`);
  if (!bad) console.log(`  poison: the unit ban fires on ${MUST_FIRE.length}/${MUST_FIRE.length} violations and clears ${MUST_PASS.length}/${MUST_PASS.length} innocents`);
}());

/* ---- validate the SoT before touching the tool --------------------- */
for (const loc of LOCALES) {
  const L = SoT[loc];
  if (!L) { fail(`locale ${loc} is missing entirely`); continue; }
  for (const k of ORDER) {
    const v = L[k];
    if (typeof v !== 'string' || !v.trim()) { fail(`${loc}.${k} is missing or empty`); continue; }
    if (NAMED_UNIT.test(v)) fail(`${loc}.${k} NAMES A UNIT — "${v}"`);
    if (/\d/.test(v)) fail(`${loc}.${k} contains a digit — "${v}"`);
    if (/!/.test(v)) fail(`${loc}.${k} contains an exclamation mark`);
    if (/[​­﻿]/.test(v)) fail(`${loc}.${k} contains an invisible character`);
    if (loc !== 'en' && v === SoT.en[k]) fail(`${loc}.${k} is identical to English — an untranslated leak`);
  }
  const extra = Object.keys(L).filter((k) => ORDER.indexOf(k) < 0);
  if (extra.length) fail(`${loc} has keys not in ORDER: ${extra.join(', ')}`);
}
/* the titles must be eleven distinct strings */
const titles = {};
for (const loc of LOCALES) {
  const t = SoT[loc] && SoT[loc].title;
  if (t && titles[t]) fail(`${loc} and ${titles[t]} share the title "${t}"`);
  else if (t) titles[t] = loc;
}

if (bad) { console.error(`\nFAIL — ${bad} problem(s); the tool was NOT written`); process.exit(1); }
console.log(`  validated ${LOCALES.length} locales × ${ORDER.length} keys`);

/* ---- render the block ---------------------------------------------- */
const q = (s) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const pad = Math.max.apply(null, ORDER.map((k) => k.length));
const lines = ORDER.map((k) => {
  const per = LOCALES.map((loc) => `${loc}: ${q(SoT[loc][k])}`).join(', ');
  return `      ${(k + ':').padEnd(pad + 1)} { ${per} }`;
});
const block = 'strings: {\n' + lines.join(',\n') + '\n    },';

const src = fs.readFileSync(TOOL, 'utf8');
const start = src.indexOf('strings: {');
if (start < 0) { console.error('FAIL — no strings block found'); process.exit(1); }
/* find the matching close: the first `\n    },` after the start */
const endMark = '\n    },';
const end = src.indexOf(endMark, start);
if (end < 0) { console.error('FAIL — the strings block is not closed as expected'); process.exit(1); }
const next = src.slice(0, start) + block + src.slice(end + endMark.length);

if (next === src) { console.log('\n  .. no change — already applied'); process.exit(0); }
fs.writeFileSync(TOOL, next, 'utf8');
console.log(`\n  wrote the strings block (${ORDER.length} keys × ${LOCALES.length} locales) into mini tools/unroll-tape.js`);
