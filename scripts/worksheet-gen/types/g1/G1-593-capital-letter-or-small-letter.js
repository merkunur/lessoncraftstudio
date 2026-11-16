/** G1-593 — Capital Letter or Small Letter? (grammar-g1 factory; English literacy year 2026-11-17) */
'use strict';
const { makeGrammarG1Type } = require('../_shared/grammar-g1.js');
module.exports = makeGrammarG1Type({
  id: 'G1-593', slug: 'capital-letter-or-small-letter', mode: 'capchoose', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Capital Letter or Small Letter?", instruction: "Names and the days of the week start with a capital letter. Other words do not, unless they start the sentence." } },
});
