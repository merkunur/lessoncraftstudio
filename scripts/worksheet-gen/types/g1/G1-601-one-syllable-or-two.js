/** G1-601 — One Syllable or Two? (syllables-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeSyllG1Type } = require('../_shared/syllables-g1.js');
module.exports = makeSyllG1Type({
  id: 'G1-601', slug: 'one-syllable-or-two', mode: 'sort', exerciseType: 'syllable-split',
  i18n: { en: { title: "One Syllable or Two?", instruction: "One vowel sound, one syllable: fish. Two vowel sounds, two syllables: nap | kin." } },
});
