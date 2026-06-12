/** K-047 — ABC pattern: what comes next. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'K-047', slug: 'abc-pattern', unit: ['A', 'B', 'C'], attribute: 'noun', variant: 'next', repeats: 2,
  i18n: { en: { title: 'ABC Patterns', instruction: 'Look at the pattern. Circle what comes next.' } },
});
