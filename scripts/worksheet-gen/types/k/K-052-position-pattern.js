/** K-052 — Position pattern (up-down-up-…): what comes next. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'K-052', slug: 'position-pattern', unit: ['A', 'B'], attribute: 'flip', variant: 'next', repeats: 3,
  i18n: { en: { title: 'Up and Down Patterns', instruction: 'Look at the pattern. Circle what comes next.' } },
});
