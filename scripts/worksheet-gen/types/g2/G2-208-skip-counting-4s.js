/** G2-208 — Skip count by 4s. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G2-208', slug: 'skip-counting-by-4', step: 4, rangeMax: 80, len: 8, gradeBand: 'G23',
  i18n: { en: { title: 'Count by Fours', instruction: 'Skip count by 4. Write each missing number.' } },
});
