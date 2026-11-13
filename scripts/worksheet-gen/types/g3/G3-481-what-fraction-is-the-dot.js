/** G3-481 — What Fraction Is the Dot? (Year pages I, 2026-11-13; 3.NF.A.2a): a line from 0 to 1 cut into equal
 *  parts with a DOT on it; the child writes the fraction of the dot into two boxes, one over the other. Level 1 the unit
 *  fractions 1/2, 1/3, 1/4, 1/6 (four lines); level 2 the unit fractions 1/2 to 1/8 (five lines); level 3 any fraction
 *  with one name only (3/4, 5/6, never 2/4). A face of the number-line factory, mode fraction (G3-406 prints the
 *  fraction and the child puts the dot). Not published in German: fractions on the Zahlenstrahl are Klasse 5/6 there. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');
module.exports = makeLineMoreType({
  id: 'G3-481', slug: 'what-fraction-is-the-dot', mode: 'fraction', gradeBand: 'G3',
  levels: { 1: { lines: 4, dens: [2, 3, 4, 6], max: 1, write: true, unit: true }, 2: { lines: 5, dens: [2, 3, 4, 6, 8], max: 1, write: true, unit: true }, 3: { lines: 5, dens: [3, 4, 6, 8], max: 1, write: true } },
  i18n: { en: { title: 'What Fraction Is the Dot?', instruction: 'Each number line from 0 to 1 is cut into equal parts. Write the fraction that the dot shows.' } },
});
