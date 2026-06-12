/** K-020 — Fill the missing numbers (within 20). */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'K-020', slug: 'missing-numbers-to-20', step: 1, rangeMax: 20, len: 10,
  i18n: { en: { title: 'Missing Numbers to 20', instruction: 'Count along the strip. Write each missing number.' } },
});
