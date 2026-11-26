/** Level Set config — Year pages, mathematics E-2 DE-A (Daily Teaching System, Stage E-2), 2026-11-26. PDF only.
 *  The six German page types of batch DE-A (types/_shared/e2-math.js, e2-math-art.js; the lessons and rulings:
 *  lcs-stage-d/batch-de-a/LINES.md, BATCH-DE-A-RESULT.md; a German Grundschule teacher read them in three rounds):
 *    de  G1-673 Rechnen mit der Null · G1-674 Rechenwege vergleichen: 7 + 8 · G1-675 Mit Handspanne, Fuß und Schritt
 *        messen · G2-634 Zum Zehner ergänzen, vom Zehner abziehen · G2-635 Rechenwege vergleichen: schrittweise oder mit
 *        Hilfsaufgabe? · G2-636 Meter und Zentimeter: erst schätzen, dann messen
 *  Themeless: a copy = a seed. Every face is NEW (noPublished). Noindex like every Level Set; the units link the pages. */
'use strict';
const LOC = { 'G1-673': 'de', 'G1-674': 'de', 'G1-675': 'de', 'G2-634': 'de', 'G2-635': 'de', 'G2-636': 'de' };
module.exports = {
  prefix: 'yeb',
  themeless: true,
  interactive: false,   // PDF only
  titleMax: 100,
  maxCopies: 5,
  maxShared: 99,
  shareFrac: 0.5,
  seeds: 60,
  allowFewer: true,
  note: 'Level Set 2026-11-26: Year pages, mathematics E-2 DE-A. Six German page types for lessons of the year design (calculating with zero, comparing ways to add, measuring with body units and in metres, making the next ten), three levels each, PDF only.',
  faces: Object.fromEntries(Object.keys(LOC).map((id) => [id, { levels: [2, 1, 3], noPublished: true }])),
  include: (loc, id) => LOC[id] === loc,
};
