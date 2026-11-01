/** G1-450 — is it a double? circle the numbers that split into two equal parts (T3, 1.OA.C.6 / 2.OA.C.3). Doubles & Halves maker, 2026-11-01. See types/_shared/doubles-more.js. */
'use strict';
const { makeDoublesMoreType } = require('../_shared/doubles-more.js');

module.exports = makeDoublesMoreType({
  id: 'G1-450', slug: 'is-it-a-double', mode: 'isdouble', gradeBand: 'G1',
  i18n: { en: { title: "Is It a Double?", instruction: "Circle each number that is a double: it splits into two equal parts." } },
});
