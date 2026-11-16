/** G2-545 — Reading Words with er, ir, and ur (vowels-g2b factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2bType } = require('../_shared/vowels-g2b.js');
module.exports = makeVowelG2bType({
  id: 'G2-545', slug: 'reading-words-with-er-ir-and-ur', mode: 'erirur', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Reading Words with er, ir, and ur", instruction: "er, ir, and ur say the same sound: her, first, turn." } },
});
