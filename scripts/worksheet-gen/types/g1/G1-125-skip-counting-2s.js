/** G1-125 — Skip count by 2s. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G1-125', slug: 'skip-counting-by-2', step: 2, rangeMax: 40, len: 8, gradeBand: 'G1',
  i18n: { en: { title: 'Count by Twos', instruction: 'Skip count by 2. Write each missing number.' } },
});
