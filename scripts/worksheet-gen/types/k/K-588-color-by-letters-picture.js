/** K-588 — Color by Letters: {UNIT} (flagship makers, docs/makers/FLAGSHIP.md): the library's pictures with a coded key (lib/cbn-type.js code 'letters'). */
'use strict';
const { makeCbnType } = require('../../lib/cbn-type.js');
module.exports = makeCbnType({
  id: 'K-588', slug: 'color-by-letters-picture', kind: 'picture', code: 'letters',
  i18n: { en: { title: "Color by Letters: {UNIT}", instruction: "Color each part with the color of its letter." } },
});
