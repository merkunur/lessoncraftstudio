/** G1-586 — Long e: ee and ea (vowels-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelType } = require('../_shared/vowels-g1.js');
module.exports = makeVowelType({
  id: 'G1-586', slug: 'long-e-ee-and-ea', mode: 'team', pair: 'ee-ea',
  i18n: { en: { title: "Long e: ee and ea", instruction: "ee and ea both spell long e." } },
});
