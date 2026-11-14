/** G2-515 — Rows and Columns of Squares (tens-wholes-grids factory, mode rows-columns; Year pages W, 2026-11-14) */
'use strict';
const { makeTensWholesGridsType } = require('../_shared/tens-wholes-grids.js');
module.exports = makeTensWholesGridsType({
  id: 'G2-515', slug: 'rows-and-columns-of-squares', mode: 'rows-columns', gradeBand: 'G2',
  i18n: { en: { title: 'Rows and Columns of Squares', instruction: 'Use a ruler. Draw lines from mark to mark to divide the rectangle into squares. Write how many rows and columns there are. Then add the squares row by row.' } },
});
