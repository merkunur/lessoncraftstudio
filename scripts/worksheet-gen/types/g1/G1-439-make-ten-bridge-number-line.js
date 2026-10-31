/** G1-439 — jump to the ten first, then the rest (T3, 1.OA.C.6, 2.NBT.B.5). Number Lines maker, 2026-11-01. See types/_shared/number-line-more.js. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G1-439', slug: 'make-ten-bridge-number-line', mode: 'bridge', gradeBand: 'G1',
  i18n: { en: { title: "Jump to the Ten First", instruction: "Jump to the next ten, then jump the rest. Fill in the boxes." } },
});
