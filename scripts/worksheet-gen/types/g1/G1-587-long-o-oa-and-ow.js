/** G1-587 — Long o: oa and ow (vowels-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelType } = require('../_shared/vowels-g1.js');
module.exports = makeVowelType({
  id: 'G1-587', slug: 'long-o-oa-and-ow', mode: 'team', pair: 'oa-ow',
  i18n: { en: { title: "Long o: oa and ow", instruction: "oa and ow both spell long o." } },
});
