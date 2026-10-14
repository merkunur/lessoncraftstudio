#!/usr/bin/env node
/**
 * apply-grc-review.js — the Grid Coordinates native/pedagogy review fixes (2026-10-14). Instructions that never said
 * what to do (es G2-303/308, fi G2-302/308, en G2-303) or that the new easier level made false ("long list", "many
 * more codes": de/fr G2-303), plus the awkward en G2-308. Exact-literal replacement in every file that carries the
 * string (built strings, the locale drafts, the en type file + generator); every replacement must hit at least once
 * across the files of its locale, and a second run reports everything as already done.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', '..');
const FIX = [
  ['en', 'A bigger grid with more squares. Work through the list carefully.', 'Find each square on the big grid by its letter and number. Color it to reveal the picture.'],
  ['en', 'The picture is colored in. Write each square in the list for its color.', 'The picture is colored in. Write the code of each square in the list for its color.'],
  ['es', 'Cuadrícula de 10 por 10 y muchas más casillas.', 'Busca cada casilla por su letra y su número, como B2, y coloréala con el color de su grupo.'],
  ['es', 'Cada casilla va en la lista de su color.', 'El dibujo ya está coloreado. Escribe el código de cada casilla en la lista de su color.'],
  ['de', '100 Felder: arbeite die lange Liste von oben nach unten ab.', '100 Felder: Suche jedes Feld wie B2 und male es in seiner Farbe an.'],
  ['fr', 'Plus grand : 10 sur 10, et bien plus de codes.', 'Quadrillage 10 x 10 : repère chaque case par son code, comme B2, et colorie-la.'],
  ['fi', 'Etsi jokainen ruutu kirjaimen ja numeron avulla.', 'Etsi jokainen ruutu kirjaimen ja numeron avulla ja väritä se oikealla värillä.'],
  ['fi', 'Kuva on jo väritetty. Kirjoita värin ruudut listaan.', 'Kuva on jo väritetty. Kirjoita jokaisen ruudun tunnus sen värin listaan.'],
];
const filesFor = (loc) => [
  `i18n/strings.${loc}.json`, `i18n/.draft-b2var-${loc}.json`,
  ...(loc === 'en' ? ['types/g2/G2-303-grid-coordinates-10x10.js', 'types/g2/G2-308-grid-coordinates-write-the-codes.js', 'tools/gen-b2var-specs.js'] : []),
].map((f) => path.join(R, f)).filter((f) => fs.existsSync(f));
const forms = (s) => [s, JSON.stringify(s).slice(1, -1)];   // the raw text and its JSON-escaped form
let bad = 0;
for (const [loc, oldS, newS] of FIX) {
  let hit = 0, done = 0;
  for (const f of filesFor(loc)) {
    let t = fs.readFileSync(f, 'utf8');
    const before = t;
    for (const [o, n] of forms(oldS).map((o, i) => [o, forms(newS)[i]])) {
      // the old sentence may be a prefix of the new one (fi): never re-apply onto already-fixed text
      if (t.includes(n)) { done++; continue; }
      const k = t.split(o).length - 1;
      if (k) { t = t.split(o).join(n); hit += k; }
    }
    if (t !== before) fs.writeFileSync(f, t);
  }
  if (!hit && !done) { bad++; console.log(`MISS ${loc}: "${oldS}" found nowhere`); }
  else console.log(`${loc}: ${hit ? hit + ' replaced' : 'already done'} — ${newS}`);
}
if (bad) process.exit(1);
