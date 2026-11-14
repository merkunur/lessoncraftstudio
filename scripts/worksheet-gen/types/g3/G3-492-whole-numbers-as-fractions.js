/** G3-492 — Whole Numbers as Fractions (tens-wholes-grids factory, mode whole-fractions; Year pages W, 2026-11-14) */
'use strict';
const { makeTensWholesGridsType } = require('../_shared/tens-wholes-grids.js');
module.exports = makeTensWholesGridsType({
  id: 'G3-492', slug: 'whole-numbers-as-fractions', mode: 'whole-fractions', gradeBand: 'G3',
  i18n: { en: { title: 'Whole Numbers as Fractions', instruction: 'The whole numbers are shown above each number line. Count the equal parts. Complete the fraction under each whole number.' } },
});
