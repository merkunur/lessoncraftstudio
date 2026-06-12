/** G1-155 — Complete the pattern (2 blanks): draw lines from the chips. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');

module.exports = makePatternType({
  id: 'G1-155', slug: 'complete-the-pattern-2', unit: ['A', 'B', 'C'], attribute: 'noun', variant: 'missing2', repeats: 3,
  i18n: { en: { title: 'Two Are Missing!', instruction: 'Two pictures are missing. Draw a line from each picture to its empty box.' } },
});
