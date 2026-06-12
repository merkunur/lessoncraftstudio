/** K-046 — AB pattern: circle what comes next. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'K-046', slug: 'ab-pattern', unit: ['A', 'B'], attribute: 'noun', variant: 'next', repeats: 3,
  i18n: { en: { title: 'What Comes Next?', instruction: 'Look at the pattern. Circle what comes next.' } },
});
