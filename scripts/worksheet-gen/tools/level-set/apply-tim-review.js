#!/usr/bin/env node
/**
 * apply-tim-review.js — the native + pedagogy review of Telling Time (walk #64, 2026-10-14) applied at the source:
 * i18n/strings.<loc>.json and the drafts that hold the same literal (.draft-nt20-<loc>.json, .draft-var-<loc>.json).
 *  - instructions: exact escaped-literal replacement (the files do not round-trip through JSON.stringify)
 *  - printed headings: a `printTitle` beside the title (the page, the key and the deck's <h1>; the deck <title> and
 *    the SEO metadata keep the live wording — metadata is not touched)
 * MUST-FIX: es-MX "aguja" (Spain) → "manecilla"; es-MX "Rodea" → "Encierra"; pt "Na hora certa" (= punctually) →
 * "Horas em ponto"; pt "Meia hora" (= a 30-minute span) → "Horas e meia"; fr G3-344 title without a verb; nl
 * "verstreek" (literary). SHOULD (printed heading only): es / it G1-149, no G1-148; fi "digiaika" (colloquial).
 * Idempotent: an edit already in place is reported as done; a needle found neither old nor new throws.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const I18N = path.join(__dirname, '..', '..', 'i18n');

const INSTR = [
  ['es', ['G1-148', 'G1-149', 'G2-249', 'G2-250', 'G3-354'], 'Lee cada reloj. Rodea la hora correcta.', 'Lee cada reloj. Encierra la hora correcta.'],
  ['es', ['G3-355'], 'Convierte cada hora. Rodea la forma correcta.', 'Convierte cada hora. Encierra la forma correcta.'],
  ['es', ['G1-212', 'G1-233', 'G1-234', 'G1-235', 'G1-236', 'G1-237'], 'Lee la hora. Dibuja la aguja de las horas y la de los minutos en el reloj.', 'Lee la hora. Dibuja la manecilla de las horas y la de los minutos en el reloj.'],
  ['nl', ['G3-344'], 'Vergelijk de twee klokken. Schrijf op hoeveel uur er verstreek.', 'Vergelijk de twee klokken. Schrijf op hoeveel uur er voorbij is.'],
  ['fi', ['G1-150'], 'Piirrä viiva jokaisesta kellosta sen digiaikaan.', 'Piirrä viiva jokaisesta kellosta oikeaan digitaaliseen aikaan.'],
];
const PRINT = [
  ['es', 'G1-212', 'Dibuja las manecillas del reloj'],
  ['es', 'G1-233', 'Dibuja las manecillas: la hora en punto'],
  ['es', 'G1-234', 'Dibuja las manecillas: y media'],
  ['es', 'G1-235', 'Dibuja las manecillas: cuartos de hora'],
  ['es', 'G1-236', 'Dibuja las manecillas: de 5 en 5 minutos'],
  ['es', 'G1-237', 'Dibuja las manecillas: repaso de horas'],
  ['es', 'G1-149', 'Horas y media'],
  ['pt', 'G1-148', 'Horas em ponto'],
  ['pt', 'G1-149', 'Horas e meia'],
  ['it', 'G1-149', 'Le ore e mezza'],
  ['no', 'G1-148', 'Hele timer'],
  ['fr', 'G3-344', "Combien de temps s'est écoulé ?"],
  ['nl', 'G3-344', 'Hoeveel tijd is er voorbij?'],
];
const q = (s) => JSON.stringify(s);
const files = (loc) => ['strings.' + loc + '.json', '.draft-nt20-' + loc + '.json', '.draft-var-' + loc + '.json'].map((f) => path.join(I18N, f)).filter((f) => fs.existsSync(f));
let done = 0, already = 0;
for (const [loc, ids, from, to] of INSTR) {
  for (const f of files(loc)) {
    let s = fs.readFileSync(f, 'utf8');
    const n = s.split(q(from)).length - 1;
    if (n) { s = s.split(q(from)).join(q(to)); fs.writeFileSync(f, s); done += n; }
  }
  const S = JSON.parse(fs.readFileSync(path.join(I18N, 'strings.' + loc + '.json'), 'utf8'));
  for (const id of ids) {
    if (S[id].instruction !== to) throw new Error(`${loc} ${id}: instruction is «${S[id].instruction}», neither the old nor the new sentence`);
    already++;
  }
}
for (const [loc, id, pt] of PRINT) {
  const f = path.join(I18N, 'strings.' + loc + '.json');
  let s = fs.readFileSync(f, 'utf8');
  const S = JSON.parse(s);
  if (S[id].printTitle === pt) continue;
  if (S[id].printTitle) throw new Error(`${loc} ${id} already has another printTitle «${S[id].printTitle}»`);
  const anchor = q(id) + ': {\n    "title": ' + q(S[id].title) + ',';
  if (s.split(anchor).length !== 2) throw new Error(`${loc} ${id}: title anchor not found once`);
  s = s.replace(anchor, anchor + '\n    "printTitle": ' + q(pt) + ',');
  fs.writeFileSync(f, s);
  if (JSON.parse(s)[id].printTitle !== pt) throw new Error(`${loc} ${id}: printTitle did not land`);
  done++;
}
console.log(`apply-tim-review: ${done} edits written, ${already} instructions verified`);
