/** Level Set config — Year pages, mathematics E-2 DE-B (Daily Teaching System, Stage E-2), 2026-11-26. PDF only.
 *  The fourteen German Klasse 3 page types of batch DE-B (types/_shared/e2-math-b.js, e2-math-b-art.js; the lessons
 *  and rulings: lcs-stage-d/batch-de-b/LINES.md, BATCH-DE-B-RESULT.md; a German Grundschule teacher read them in two rounds):
 *    de  G3-633 to G3-646 (Hunderter- und Zehnerzahlen to Alle Möglichkeiten finden)
 *  Themeless: a copy = a seed. Every face is NEW (noPublished). Noindex like every Level Set; the units link the pages. */
'use strict';
const LOC = Object.fromEntries(Array.from({ length: 14 }, (_, i) => ["G3-" + (633 + i), "de"]));
module.exports = {
  prefix: 'yec',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-26: Year pages, mathematics E-2 DE-B. Fourteen German Klasse 3 page types for lessons of the year design (hundreds and tens, adding and subtracting in steps, multiplying and dividing in steps, millimetres and kilometres, comma notation, shopping estimates, tables, the compass, charts, all possibilities), three levels each, PDF only.',
  faces: Object.fromEntries(Object.keys(LOC).map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc, id) => LOC[id] === loc,
};
