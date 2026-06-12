/** G3-327 — Shrinking number pattern (descending rule). */
'use strict';
const { makeNumberStripType } = require('../_shared/number-strip.js');
module.exports = makeNumberStripType({
  id: 'G3-327', slug: 'shrinking-number-patterns', step: { 1: 4, 2: 7, 3: 11 }, rangeMax: 130, len: 7, gradeBand: 'G23', descending: true,
  i18n: { en: { title: 'Going Down!', instruction: 'The numbers shrink by the same amount. Write the missing ones.' } },
});
