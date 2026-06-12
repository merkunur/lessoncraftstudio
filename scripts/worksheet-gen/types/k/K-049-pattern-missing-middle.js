/** K-049 — Pattern: fill the missing middle. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'K-049', slug: 'complete-the-pattern', unit: ['A', 'B'], attribute: 'noun', variant: 'missing', repeats: 3,
  i18n: { en: { title: 'Complete the Pattern', instruction: 'A picture is missing. Circle what belongs in the empty box.' } },
});
