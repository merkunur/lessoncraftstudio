/** G2-411 — colour a rectangle of dots for a product (T4, 2.OA.C.4 / 3.OA.A.1). Multiplication & Division maker, 2026-11-01. See types/_shared/md-more.js. */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');

module.exports = makeMdMoreType({
  id: 'G2-411', slug: 'draw-the-array', mode: 'draw', gradeBand: 'G2',
  i18n: { en: { title: "Draw the Array", instruction: "Color a rectangle of dots for each multiplication: the first number is the rows, the second is the dots in each row." } },
});
