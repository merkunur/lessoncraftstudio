/** G3-491 — Multiply by Multiples of 10 (tens-wholes-grids factory, mode times-tens; Year pages W, 2026-11-14) */
'use strict';
const { makeTensWholesGridsType } = require('../_shared/tens-wholes-grids.js');
module.exports = makeTensWholesGridsType({
  id: 'G3-491', slug: 'multiply-by-tens', mode: 'times-tens', gradeBand: 'G3',
  i18n: { en: { title: 'Multiply by Multiples of 10', instruction: 'Solve the basic fact. Then think of tens: write how many tens that is. Then write the product.' } },
});
