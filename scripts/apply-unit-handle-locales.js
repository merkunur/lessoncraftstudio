/* =====================================================================
   apply-unit-handle-locales.js — the ten native panels' in-tool strings
   ---------------------------------------------------------------------
   Run:  node scripts/apply-unit-handle-locales.js [--dry-run]

   Rewrites the whole `strings: { ... }` block in mini tools/unit-handle.js from
   the table below. The EN column is authored; the other ten come from a
   three-person NATIVE panel per locale (§A.13.48) — a linguist, a K-3
   maths teacher on that country's own curriculum, and a B2C education
   marketer — who REBUILT the tool in their language rather than
   translating it. Do not hand-edit a locale in unit-handle.js; edit here.

   ⭐ WHAT THE PANELS CHANGED, AND WHY IT MATTERS
   Four of the ten rejected the obvious word, and every one of them was a
   collision I could not have seen:
     es  "Las tapas" -> "Las tapaderas". Across the whole Spanish-speaking
         world "tapas" reads first as bar food.
     fr  "la table" -> "le plateau". In a French maths lesson "table"
         reads instantly as *table de multiplication* — the exact concept
         this tool builds toward, so "Autre table" would have been read as
         "another times table".
     nl  "de tafel" -> "het blad", for the same reason: in groep 3/4 "de
         tafels" ARE the times tables. The tool was also renamed to
         "Onder de deksels" — the question, not the object, because "De
         deksels" alone reads as kitchenware.
     pt  rejected "tampinhas" for the counters: a tampinha is a bottle
         cap, which in Brazil is itself the classic improvised counter,
         so it would have collided head-on with the tampas covering them.
   Each locale also picked its own real classroom word for the counters —
   Wendeplättchen · jetons · fichas · gettoni · fiches · brickor ·
   brikker · brikker · nappulat — none of which is a translation of
   "counter" so much as the thing itself.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'mini tools', 'unit-handle.js');
const DRY = process.argv.indexOf('--dry-run') > -1;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/* the 22 keys, in the order they appear in the file */
const ORDER = [
  'title', 'instruction',
  'hintStretch', 'hintCompare', 'hintOver',
  'fitBtn', 'matchBtn', 'newObjBtn', 'printBtn',
  'gateLine', 'unlock',
  'benchLabel', 'objectAria', 'tapeAria', 'handleAria', 'countAria', 'overAria'
];
/* blank lines in the emitted block, so it stays readable */
const BREAK_BEFORE = { hintStretch: 1, fitBtn: 1, gateLine: 1, benchLabel: 1 };

const P = require('./_unit-handle-strings.js');

/* ---- checks before anything is written --------------------------- */
let ERR = 0;
const bad = (m) => { ERR++; console.error('  ERROR ' + m); };

LOCALES.forEach((loc) => {
  if (!P[loc]) { bad(`no panel output for "${loc}"`); return; }
  ORDER.forEach((k) => {
    const v = P[loc][k];
    if (typeof v !== 'string' || !v.trim()) { bad(`${loc}.${k} is missing`); return; }
    if (/\bsplat/i.test(v)) bad(`${loc}.${k} carries the brand word`);
    if (/[­​-‍⁠﻿]/.test(v)) bad(`${loc}.${k} carries an invisible character`);
  });
  /* the placeholders have to survive a rebuild — a panel that rewrote
     the sentence around them could easily drop one */
  ['tapeAria', 'handleAria', 'countAria'].forEach((k) => {
    if (P[loc][k].indexOf('{i}') === -1) bad(`${loc}.${k} lost its {i}`);
  });
  if (P[loc].countAria.indexOf('{n}') === -1) bad(`${loc}.countAria lost its {n}`);
  /* ⚠ refusal 1, enforced at the door: no locale may name a unit */
  const UNITWORD = /(centimet|millimet|inch|pouce|zoll|tuuma|tomme|senttimetri|cm|mm)/i;
  Object.keys(P[loc]).forEach((k) => { if (UNITWORD.test(P[loc][k])) bad(`${loc}.${k} names a unit`); });
  Object.keys(P[loc]).forEach((k) => { if (ORDER.indexOf(k) === -1) bad(`${loc} has an unexpected key "${k}"`); });
});
if (ERR) { console.error(`\nFAIL — ${ERR} problem(s); nothing written`); process.exit(1); }

/* ---- emit -------------------------------------------------------- */
const pad = Math.max.apply(null, ORDER.map((k) => k.length));
const lines = [];
ORDER.forEach((k) => {
  if (BREAK_BEFORE[k]) lines.push('');
  const cols = LOCALES.map((l) => `${l}: ${JSON.stringify(P[l][k])}`).join(', ');
  lines.push(`    ${(k + ':').padEnd(pad + 1)} { ${cols} }` + (k === ORDER[ORDER.length - 1] ? '' : ','));
});

let src = fs.readFileSync(FILE, 'utf8');
const START = src.indexOf('  strings: {');
if (START < 0) { console.error('FATAL: the strings block was not found'); process.exit(1); }
const END = src.indexOf('\n  },\n', START);
if (END < 0) { console.error('FATAL: the end of the strings block was not found'); process.exit(1); }
const next = src.slice(0, START) + '  strings: {\n' + lines.join('\n') + src.slice(END);

if (DRY) {
  console.log(lines.join('\n'));
  console.log(`\nDRY RUN — ${LOCALES.length} locales x ${ORDER.length} keys; nothing written`);
} else {
  fs.writeFileSync(FILE, next.replace(/\r\n/g, '\n'), 'utf8');
  console.log(`wrote ${LOCALES.length} locales x ${ORDER.length} keys into mini tools/unit-handle.js`);
  console.log('now re-run: verify-unit-handle, smoke-unit-handle-locales, audit-unit-handle-locale-layout');
}
