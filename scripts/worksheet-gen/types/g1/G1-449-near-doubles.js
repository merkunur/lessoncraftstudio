/** G1-449 — near doubles: a double plus one (T1, 1.OA.C.6). Doubles & Halves maker, 2026-11-01. See types/_shared/doubles-more.js. */
'use strict';
const { makeDoublesMoreType } = require('../_shared/doubles-more.js');

module.exports = makeDoublesMoreType({
  id: 'G1-449', slug: 'near-doubles', mode: 'near', gradeBand: 'G1',
  i18n: { en: { title: "Near Doubles", instruction: "Use a double you know. Write the double, then add one to find the sum." } },
});
