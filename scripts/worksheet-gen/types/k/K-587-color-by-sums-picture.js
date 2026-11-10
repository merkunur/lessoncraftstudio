/** K-587 — Color by Addition: {UNIT} (flagship makers, docs/makers/FLAGSHIP.md): the library's pictures with a coded key (lib/cbn-type.js code 'sums'). */
'use strict';
const { makeCbnType } = require('../../lib/cbn-type.js');
module.exports = makeCbnType({
  id: 'K-587', slug: 'color-by-sums-picture', kind: 'picture', code: 'sums',
  i18n: { en: { title: "Color by Addition: {UNIT}", instruction: "Solve each addition problem in the key. Color each part with the color of its answer." } },
});
