/** G1-625 — Two Words, One Sound (sound-position-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeSoundPositionG1Type } = require('../_shared/sound-position-g1.js');
module.exports = makeSoundPositionG1Type({
  id: 'G1-625', slug: 'two-words-one-sound', mode: 'share', exerciseType: 'phonological-awareness',
  i18n: { en: { title: "Two Words, One Sound", instruction: "Two words can share a sound in the same place." } },
});
