/** K-393 — Color by Number: Scenes (2026-10-04). 100 complete illustrated scenes (data/cbn/designs.js kind 'scene'). */
'use strict';
const { makeCbnType } = require('../../lib/cbn-type.js');
module.exports = makeCbnType({
  id: 'K-393', slug: 'color-by-number-scenes', kind: 'scene',
  i18n: { en: { title: 'Color by Number: {UNIT}', instruction: 'Color each part with the color of its number.' } },
});
