/** G2-532 — Vowel Sounds: oo, ou, ow, oi, and oy (vowels-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2Type } = require('../_shared/vowels-g2.js');
module.exports = makeVowelG2Type({
  id: 'G2-532', slug: 'vowel-sounds-oo-ou-ow-oi-and-oy', mode: 'diph',
  i18n: { en: { title: "Vowel Sounds: oo, ou, ow, oi, and oy", instruction: "Vowel teams can say the sounds in moon, book, cow, and boy." } },
});
