/** K-050 — Size pattern (big-small-big-…): what comes next. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'K-050', slug: 'size-pattern', unit: ['A', 'B'], attribute: 'size', variant: 'next', repeats: 3,
  i18n: { en: { title: 'Big and Small Patterns', instruction: 'Look at the pattern. Circle what comes next.' } },
});
