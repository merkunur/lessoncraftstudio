/** G2-231 — Fraction Friends (fraction-tasks factory, mode match-equiv) */
'use strict';
const { makeFractionType } = require('../_shared/fraction-tasks.js');
module.exports = makeFractionType({
  id: 'G2-231', slug: 'fraction-matching', mode: 'match-equiv', ds: [2,3,4], dsLevels: { 1: [2, 3, 4], 2: [2, 3, 4], 3: [2, 3, 4, 6] },
  // Level Set 2026-10-08: level 1 halves, thirds and quarters on bars; level 3 thirds and quarters only, two of each
  // (no sixths in Grade 2 — native review); level 2 is the published page
  level: { 1: { values: ['1/2', '1/3', '2/3', '1/4', '3/4'], shapes: ['bar', 'square'] }, 3: { values: ['1/3', '2/3', '1/4', '2/4', '3/4'] } },
  i18n: { en: { title: 'Fraction Friends', instruction: 'Draw a line from each picture to its fraction.' } },
});
