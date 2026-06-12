/** K-077 — 2D shape pattern: what comes next. */
'use strict';
const { makePatternType } = require('../_shared/pattern-next.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
module.exports = withFixedTheme(makePatternType({
  id: 'K-077', slug: '2d-shape-patterns', unit: ['A', 'B'], attribute: 'noun', variant: 'next', repeats: 3,
  i18n: { en: { title: 'Shape Patterns', instruction: 'Look at the pattern. Circle the shape that comes next.' } },
}), 'shapes');
