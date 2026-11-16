/** K-655 — A Sentence Starts with a Capital Letter (sentences-k factory; English literacy year 2026-11-16) */
'use strict';
const { makeSentencesKType } = require('../_shared/sentences-k.js');
module.exports = makeSentencesKType({
  id: 'K-655', slug: 'a-sentence-starts-with-a-capital-letter', mode: 'capital', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "A Sentence Starts with a Capital Letter", instruction: "Circle the first letter of each sentence. Circle each word I, too. If a sentence starts with a small letter, write its capital letter in the box." } },
});
