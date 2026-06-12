/** K-019 — Fill the missing numbers in the 1-10 strip. */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'K-019', slug: 'missing-numbers-to-10', step: 1, rangeMax: 10, len: 10, startFixed: 1,
  i18n: { en: { title: 'Missing Numbers to 10', instruction: 'Count along the strip. Write each missing number.' } },
});
