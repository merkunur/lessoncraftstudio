/** K-459 — draw the double, then write it (T2, K.OA.A.1 / 1.OA.C.6). Doubles & Halves maker, 2026-11-01. See types/_shared/doubles-more.js. */
'use strict';
const { makeDoublesMoreType } = require('../_shared/doubles-more.js');

module.exports = makeDoublesMoreType({
  id: 'K-459', slug: 'draw-the-double', mode: 'draw', gradeBand: 'K',
  i18n: { en: { title: "Draw the Double", instruction: "Draw the same group again in the empty box. Then write how many there are in all." } },
});
