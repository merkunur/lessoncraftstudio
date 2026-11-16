/** G2-534 — er, ir, and ur: One Sound, Three Spellings (vowels-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2Type } = require('../_shared/vowels-g2.js');
module.exports = makeVowelG2Type({
  id: 'G2-534', slug: 'er-ir-and-ur-one-sound-three-spellings', mode: 'erirur',
  i18n: { en: { title: "er, ir, and ur: One Sound, Three Spellings", instruction: "er, ir, and ur say the same sound: her, first, turn." } },
});
