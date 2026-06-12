/** K-079 — Big shape / small shape. */
'use strict';
const { makeSizeCompareType } = require('../_shared/size-compare.js');
const { withFixedTheme } = require('../_shared/fixed-theme.js');
module.exports = withFixedTheme(makeSizeCompareType({
  id: 'K-079', slug: 'big-and-small-shapes', mode: 'circle', target: 'largest', rows: 3, itemsPerRow: [3, 4, 4],
  i18n: { en: { title: 'Big Shapes, Small Shapes', instruction: 'Circle the BIGGEST shape in each row.' } },
}), 'shapes');
