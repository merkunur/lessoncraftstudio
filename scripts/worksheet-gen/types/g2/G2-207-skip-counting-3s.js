/** G2-207 — Skip count by 3s. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G2-207', slug: 'skip-counting-by-3', step: 3, rangeMax: 60, len: 8, gradeBand: 'G23',
  i18n: { en: { title: 'Count by Threes', instruction: 'Skip count by 3. Write each missing number.' } },
});
