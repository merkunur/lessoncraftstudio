/** K-053 — Growing pattern: 1,2,3 — circle the next group. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'K-053', slug: 'growing-pattern', unit: ['A'], attribute: 'count', variant: 'next', repeats: 1,
  i18n: { en: { title: 'Growing Patterns', instruction: 'The pattern grows. Circle the group that comes next.' } },
});
