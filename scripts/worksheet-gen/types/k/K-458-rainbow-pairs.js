/** K-458 — rainbow pairs: join the pairs that make N (T5, K.OA.A.4 / 1.OA.C.6). Number Bonds maker, 2026-11-01. See types/_shared/number-bond-more.js. */
'use strict';
const { makeBondMoreType } = require('../_shared/number-bond-more.js');

module.exports = makeBondMoreType({
  id: 'K-458', slug: 'rainbow-pairs', mode: 'rainbow', gradeBand: 'K',
  i18n: { en: { title: "Rainbow Pairs", instruction: "Join two numbers that make the number in the circle with an arc. Draw a ring around a number that makes it with itself." } },
});
