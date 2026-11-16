/** G2-533 — Bossy r: ar and or (vowels-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2Type } = require('../_shared/vowels-g2.js');
module.exports = makeVowelG2Type({
  id: 'G2-533', slug: 'bossy-r-ar-and-or', mode: 'aror',
  i18n: { en: { title: "Bossy r: ar and or", instruction: "Bossy r changes the vowel sound: ar says the sound in park, and or says the sound in storm." } },
});
