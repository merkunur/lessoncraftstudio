/** G1-438 — solve a sum on an empty number line (T1, 1.NBT.C.4 / 2.NBT.B.5 / 2.NBT.B.7). Number Lines maker, 2026-11-01. See types/_shared/number-line-more.js. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G1-438', slug: 'open-number-line', mode: 'open', gradeBand: 'G1',
  i18n: { en: { title: "The Open Number Line", instruction: "Draw your jumps on the empty line. Write the answer." } },
});
