/** G1-123 — Skip count by 10s to 100. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G1-123', slug: 'skip-counting-by-10', step: 10, rangeMax: 100, len: 8, gradeBand: 'G1',
  i18n: { en: { title: 'Count by Tens', instruction: 'Skip count by 10. Write each missing number.' } },
});
