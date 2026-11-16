/** K-657 — Say More: Make the Sentence Longer (sentences-k factory; English literacy year 2026-11-16) */
'use strict';
const { makeSentencesKType } = require('../_shared/sentences-k.js');
module.exports = makeSentencesKType({
  id: 'K-657', slug: 'say-more-make-the-sentence-longer', mode: 'longer', exerciseType: 'sentence-building',
  i18n: { en: { title: "Say More: Make the Sentence Longer", instruction: "Read each sentence and look at the picture. Circle the words that fit the picture. Write them on the line." } },
});
