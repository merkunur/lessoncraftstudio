/** G2-548 — Heart Words: could, would, should (vowels-g2b factory; English literacy year 2026-11-17) */
'use strict';
const { makeVowelG2bType } = require('../_shared/vowels-g2b.js');
module.exports = makeVowelG2bType({
  id: 'G2-548', slug: 'heart-words-could-would-should', mode: 'heart', exerciseType: 'sight-words',
  i18n: { en: { title: "Heart Words: could, would, should", instruction: "Some words have a part that does not follow the rules. We learn that part by heart." } },
});
