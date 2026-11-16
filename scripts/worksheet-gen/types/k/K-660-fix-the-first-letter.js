/** K-660 — Fix the First Letter (sentences-k factory; English literacy year 2026-11-16) */
'use strict';
const { makeSentencesKType } = require('../_shared/sentences-k.js');
module.exports = makeSentencesKType({
  id: 'K-660', slug: 'fix-the-first-letter', mode: 'pair', exerciseType: 'capitals-punctuation',
  i18n: { en: { title: "Fix the First Letter", instruction: "Circle the sentence that starts with a capital letter. Then write that capital letter in the box." } },
});
