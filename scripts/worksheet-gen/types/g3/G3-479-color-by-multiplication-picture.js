/** G3-479 — Color by Multiplication: {UNIT} (flagship makers, docs/makers/FLAGSHIP.md): the library's pictures with a coded key (lib/cbn-type.js code 'products'). */
'use strict';
const { makeCbnType } = require('../../lib/cbn-type.js');
module.exports = makeCbnType({
  id: 'G3-479', slug: 'color-by-multiplication-picture', kind: 'picture', code: 'products', gradeBand: 'G3',
  i18n: { en: { title: "Color by Multiplication: {UNIT}", instruction: "Solve each multiplication in the key. Color each part with the color of its answer." } },
});
