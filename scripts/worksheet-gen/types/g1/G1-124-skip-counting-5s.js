/** G1-124 — Skip count by 5s. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G1-124', slug: 'skip-counting-by-5', step: 5, rangeMax: 100, len: 8, gradeBand: 'G1',
  i18n: { en: { title: 'Count by Fives', instruction: 'Skip count by 5. Write each missing number.' } },
});
