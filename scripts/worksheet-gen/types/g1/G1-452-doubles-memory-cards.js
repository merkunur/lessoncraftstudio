/** G1-452 — doubles memory cards to cut out (T5, 1.OA.C.6 fluency; material, no key). Doubles & Halves maker, 2026-11-01. See types/_shared/doubles-more.js. */
'use strict';
const { makeDoublesMoreType } = require('../_shared/doubles-more.js');

module.exports = makeDoublesMoreType({
  id: 'G1-452', slug: 'doubles-memory-cards', mode: 'memory', gradeBand: 'G1',
  i18n: { en: { title: "Doubles Memory Cards", instruction: "Cut out the cards. Find the pairs: a number and its double." } },
});
