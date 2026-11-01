/** G1-451 — double and half machines, in and out (T4, 1.OA.C.6 / 2.NBT.B.5). Doubles & Halves maker, 2026-11-01. See types/_shared/doubles-more.js. */
'use strict';
const { makeDoublesMoreType } = require('../_shared/doubles-more.js');

module.exports = makeDoublesMoreType({
  id: 'G1-451', slug: 'double-and-half-machines', mode: 'machine', gradeBand: 'G1',
  i18n: { en: { title: "Double and Half Machines", instruction: "The double machine doubles every number. The half machine halves it. Fill in the empty boxes." } },
});
