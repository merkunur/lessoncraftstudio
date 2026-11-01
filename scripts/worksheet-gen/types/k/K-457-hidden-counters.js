/** K-457 — how many hide under the cup? (T4, K.OA.A.4 / 1.OA.D.8). Number Bonds maker, 2026-11-01. See types/_shared/number-bond-more.js. */
'use strict';
const { makeBondMoreType } = require('../_shared/number-bond-more.js');

module.exports = makeBondMoreType({
  id: 'K-457', slug: 'hidden-counters', mode: 'hidden', gradeBand: 'K',
  i18n: { en: { title: "How Many Are Hiding?", instruction: "The circle shows how many there are in all. The rest are hiding under the cup. Write how many are hiding." } },
});
