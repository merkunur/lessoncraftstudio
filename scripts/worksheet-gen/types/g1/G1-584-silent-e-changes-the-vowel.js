/** G1-584 — Silent e Changes the Vowel (vowels-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelType } = require('../_shared/vowels-g1.js');
module.exports = makeVowelType({
  id: 'G1-584', slug: 'silent-e-changes-the-vowel', mode: 'silente',
  i18n: { en: { title: "Silent e Changes the Vowel", instruction: "The e at the end is silent. It makes the vowel say its name." } },
});
