/** G1-624 — First, Middle, or Last? (sound-position-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeSoundPositionG1Type } = require('../_shared/sound-position-g1.js');
module.exports = makeSoundPositionG1Type({
  id: 'G1-624', slug: 'first-middle-or-last', mode: 'where', exerciseType: 'phonological-awareness',
  i18n: { en: { title: "First, Middle, or Last?", instruction: "A sound can come first, in the middle, or last in a word." } },
});
