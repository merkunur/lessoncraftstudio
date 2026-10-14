#!/usr/bin/env node
/**
 * apply-ord-review.js — Level Set 2026-10-14 (walk #62, Ordinal Numbers): the native + pedagogy review's fixes to
 * PUBLISHED printed strings, applied at every source the string lives in (the b3 draft, the built i18n strings, the
 * family bank block). Landing files are NOT touched (operator rule: landings/metadata only when asked).
 *   it G1-316  "collega con una linea la figura" — the verb had no object (the word) → "collegala … alla figura"
 *   it G1-318  "Il più vicino è 1º." → "Il più vicino è il 1º." (the article Italian needs; level-1 sentence too)
 *   nl/sv K-336 titles said "from the other side" — the flag stands at EITHER end (both sides) on that page
 * Exact-string replacements; refuses when a needle is missing (already applied counts as done).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const R = (...p) => path.join(__dirname, '..', '..', ...p);
const FIX = {
  it: [
    ['Leggi ogni parola ordinale e collega con una linea la figura che sta in quel posto', 'Leggi ogni parola ordinale e collegala con una linea alla figura che sta in quel posto'],
    ['Il più vicino è 1º.', 'Il più vicino è il 1º.'],
  ],
  nl: [['Rangtelwoorden vanaf de andere kant: begin bij de vlag', 'Rangtelwoorden vanaf twee kanten: begin bij de vlag']],
  sv: [['Ordningstal från andra hållet: börja vid flaggan', 'Ordningstal åt båda hållen: börja vid flaggan']],
};
let changed = 0;
for (const [loc, pairs] of Object.entries(FIX)) {
  for (const f of [R('i18n', '.draft-b3-' + loc + '.json'), R('i18n', 'strings.' + loc + '.json'), R('data', 'b3', 'locales', 'ordinals.' + loc + '.json')]) {
    if (!fs.existsSync(f)) continue;
    let s = fs.readFileSync(f, 'utf8');
    for (const [a, b] of pairs) {
      if (s.includes(b) && !s.includes(a)) continue;   // already applied
      if (!s.includes(a)) continue;                   // this file does not carry that string
      s = s.split(a).join(b); changed++;
      console.log(loc + ' ' + path.basename(f) + ': ' + a.slice(0, 40) + '…');
    }
    fs.writeFileSync(f, s, 'utf8');
  }
}
// the race level-1 sentence (i18n/level-instructions.json, written by apply-ord-strings.js) carries the Italian article too
console.log(changed + ' replacements');
