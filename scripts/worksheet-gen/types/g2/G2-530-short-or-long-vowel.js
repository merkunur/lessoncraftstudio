/** G2-530 — Short or Long Vowel? (vowels-g2 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2Type } = require('../_shared/vowels-g2.js');
module.exports = makeVowelG2Type({
  id: 'G2-530', slug: 'short-or-long-vowel', mode: 'shortlong',
  i18n: { en: { title: "Short or Long Vowel?", instruction: "A short vowel says its sound: hop. A long vowel says its name: hope." } },
});
