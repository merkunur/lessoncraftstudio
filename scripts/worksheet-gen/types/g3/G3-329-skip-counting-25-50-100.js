/** G3-329 — Skip count by 25 / 50 / 100 (per difficulty). */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G3-329', slug: 'skip-counting-by-25-50-100', step: { 1: 25, 2: 50, 3: 100 }, rangeMax: 1000, len: 7, gradeBand: 'G23',
  i18n: { en: { title: 'Big Skip Counting', instruction: 'Find the counting rule. Write each missing number.' } },
});
