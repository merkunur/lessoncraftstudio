/** K-078 — 2D shapes matching: every shape has a twin. */
'use strict';
const { withFixedTheme } = require('../_shared/fixed-theme.js');
const pairs = require('./K-058-match-identical-pairs.js');
module.exports = Object.assign(Object.create(withFixedTheme(pairs, 'shapes')), {
  id: 'K-078', slug: '2d-shapes-matching',
  i18n: { en: { title: 'Shape Twins', instruction: 'Every shape has a twin. Draw a line between each pair.' } },
});
