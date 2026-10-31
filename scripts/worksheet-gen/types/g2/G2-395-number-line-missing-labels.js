/** G2-395 — write the missing labels; the ticks fix the step (T2, 2.MD.B.6, 2.NBT.A.2). Number Lines maker, 2026-11-01. See types/_shared/number-line-more.js. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G2-395', slug: 'number-line-missing-labels', mode: 'labels', gradeBand: 'G2',
  i18n: { en: { title: "Label the Number Line", instruction: "Find the step from the numbers you see. Write the missing numbers in the boxes." } },
});
