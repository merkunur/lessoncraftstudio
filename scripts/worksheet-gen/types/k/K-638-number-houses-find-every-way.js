/** K-638 — Number Houses: Find Every Way (Year pages E, 2026-11-13; K.OA.A.3): the house of K-456 with EMPTY floors: the
 *  child finds every way to split the roof number itself and writes one on each floor (the key shows them in order).
 *  Level 1 three houses of 4, 5 and 6 with dots; level 2 two houses from 6 to 8; level 3 two houses from 8 to 10. */
'use strict';
const { makeBondMoreType } = require('../_shared/number-bond-more.js');
module.exports = makeBondMoreType({
  id: 'K-638', slug: 'number-houses-find-every-way', mode: 'house', gradeBand: 'K',
  levels: { 1: { wholes: [4, 5, 6], houses: 3, dots: true, empty: true }, 2: { wholes: [6, 7, 8], houses: 2, empty: true }, 3: { wholes: [8, 9, 10], houses: 2, empty: true } },
  i18n: { en: { title: 'Number Houses: Find Every Way', instruction: 'The roof shows the number. Find every way to split it into two parts. Write one way on each floor.' } },
});
