/** K-394 — Color by Number: Pictures (2026-10-04). 100 single pictures made of many parts (data/cbn/designs.js kind 'picture'). */
'use strict';
const { makeCbnType } = require('../../lib/cbn-type.js');
module.exports = makeCbnType({
  id: 'K-394', slug: 'color-by-number-pictures', kind: 'picture',
  i18n: { en: { title: 'Color by Number: {UNIT}', instruction: 'Color each part with the color of its number.' } },
});
