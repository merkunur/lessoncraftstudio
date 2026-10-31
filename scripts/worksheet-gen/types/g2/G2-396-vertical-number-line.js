/** G2-396 — read a vertical, thermometer-style number line (T5, 2.MD.B.6). Number Lines maker, 2026-11-01. See types/_shared/number-line-more.js. */
'use strict';
const { makeLineMoreType } = require('../_shared/number-line-more.js');

module.exports = makeLineMoreType({
  id: 'G2-396', slug: 'vertical-number-line', mode: 'vertical', gradeBand: 'G2',
  i18n: { en: { title: "The Up-and-Down Number Line", instruction: "Write the number each arrow points to." } },
});
