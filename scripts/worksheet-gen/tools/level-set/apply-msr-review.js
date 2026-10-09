#!/usr/bin/env node
/**
 * apply-msr-review.js — the native + pedagogical review of the Measurement Level Set (2026-10-09), PRINTED strings
 * (i18n/strings.<loc>.json): instructions and printed headings (printTitle — the SEO title is never touched). The
 * screen strings were corrected in tools/level-set/msr-instructions.js itself (not yet published). Every edit names
 * its OLD text: a string that no longer matches is refused (idempotent).
 * Rejected on checking: es "Rodea" → "Encierra" (87 Spanish strings site-wide say "Rodea"; one face alone would be
 * inconsistent); es title "liviano" (a search title, and understood across Latin America).
 */
'use strict';
const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
// [face, locale, field, old, new]
const PRINTED = [
  // the page draws a row of SQUARES (the instruction says so); the heading said cubes / blocks
  ['G1-139', 'en', 'printTitle', 'Cube by Cube', 'Square by Square'],
  ['G1-139', 'de', 'printTitle', 'Würfel für Würfel', 'Kästchen für Kästchen'],
  ['G1-139', 'no', 'printTitle', 'Kloss for kloss', 'Rute for rute'],
  // "one is longer" needs its comparison
  ['G2-236', 'it', 'instruction', 'Misura entrambi gli oggetti. Scrivi di quante unità è più lungo uno.', "Misura entrambi gli oggetti. Scrivi di quante unità uno è più lungo dell'altro."],
  ['G2-236', 'es', 'instruction', 'Mide los dos objetos. Escribe cuántas unidades más largo es uno.', 'Mide los dos objetos. Escribe cuántas unidades más largo es uno que el otro.'],
  ['G2-236', 'nl', 'instruction', 'Meet beide voorwerpen. Schrijf op hoeveel eenheden langer er één is.', 'Meet beide voorwerpen. Schrijf op hoeveel eenheden het ene voorwerp langer is dan het andere.'],
  // unfinished sentences
  ['G2-235', 'pt', 'instruction', 'Cada objeto começa no 0. Leia a régua e escreva quantas unidades de comprimento.', 'Cada objeto começa no 0. Leia a régua e escreva quantas unidades de comprimento ele tem.'],
  ['G2-235', 'sv', 'instruction', 'Varje sak börjar vid 0. Läs linjalen och skriv hur många enheter lång.', 'Varje sak börjar vid 0. Läs linjalen och skriv hur många enheter lång den är.'],
  // "aflezen" (read a scale), as the face's title says
  ['G2-235', 'nl', 'instruction', 'Elk voorwerp begint bij 0. Lees de liniaal en schrijf op hoeveel eenheden lang het is.', 'Elk voorwerp begint bij 0. Lees de liniaal af en schrijf op hoeveel eenheden lang het is.'],
  ['G1-140', 'pt', 'instruction', 'Meça cada objeto com seus quadradinhos. Numere de 1 (curto) a 3 (comprido).', 'Meça cada objeto com seus quadradinhos. Numere de 1 (o mais curto) a 3 (o mais comprido).'],
  ['K-038', 'pt', 'instruction', 'Pense na vida real! Circule o mais PESADO.', 'Pense na vida real! Circule o MAIS PESADO.'],
  // a counted total is not a "sum"
  ['G3-346', 'sv', 'instruction', 'Räkna alla kuber i varje torn. Skriv summan.', 'Räkna alla kuber i varje torn. Skriv hur många kuber det är.'],
  ['G3-346', 'no', 'instruction', 'Tell alle klossene i hvert tårn. Skriv summen.', 'Tell alle klossene i hvert tårn. Skriv hvor mange klosser det er.'],
  ['G3-346', 'fi', 'instruction', 'Laske kaikki kuutiot jokaisessa tornissa. Kirjoita summa.', 'Laske kaikki kuutiot jokaisessa tornissa. Kirjoita kuutioiden määrä.'],
];
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const bad = []; let n = 0;
for (const l of LOCS) {
  const f = path.join(ROOT, 'i18n', `strings.${l}.json`);
  const S = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [id, loc, field, oldT, newT] of PRINTED) {
    if (loc !== l) continue;
    const cur = field === 'printTitle' ? (S[id].printTitle || S[id].title) : S[id].instruction;
    if (cur === newT) continue;
    if (cur !== oldT) { bad.push(`${id} ${l} ${field}: is "${cur}"`); continue; }
    S[id][field] = newT; n++;
  }
  fs.writeFileSync(f, JSON.stringify(S, null, 2) + '\n');
}
if (bad.length) { console.error('REFUSED:\n' + bad.join('\n')); process.exit(1); }
console.log(`applied ${n} edits (${PRINTED.length} listed)`);
