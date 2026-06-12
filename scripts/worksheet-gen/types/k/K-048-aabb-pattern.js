/** K-048 — AABB pattern: what comes next. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'K-048', slug: 'aabb-pattern', unit: ['A', 'A', 'B', 'B'], attribute: 'noun', variant: 'next', repeats: 2,
  i18n: { en: { title: 'AABB Patterns', instruction: 'Look at the pattern. Circle what comes next.' } },
});
