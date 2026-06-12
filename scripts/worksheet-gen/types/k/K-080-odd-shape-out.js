/** K-080 — Color/circle the shape that is different. */
'use strict';
const { makeOddOneOutType } = require('../_shared/odd-one-out.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
module.exports = withFixedTheme(makeOddOneOutType({
  id: 'K-080', slug: 'odd-shape-out', mode: 'category',
  i18n: { en: { title: 'Which Shape Is Different?', instruction: 'Look at each row. Circle the shape that does not belong.' } },
}), 'shapes');
