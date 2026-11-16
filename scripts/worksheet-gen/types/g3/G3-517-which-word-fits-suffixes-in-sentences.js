/** G3-517 — Which Word Fits? Suffixes in Sentences (long-words-g3 factory; English literacy year 2026-11-18) */
'use strict';
const { makeLongWordsG3Type } = require('../_shared/long-words-g3.js');
module.exports = makeLongWordsG3Type({
  id: 'G3-517', slug: 'which-word-fits-suffixes-in-sentences', mode: 'suffix2', exerciseType: 'word-parts',
  i18n: { en: { title: "Which Word Fits? Suffixes in Sentences", instruction: "-ness and -ment make nouns: soft, softness; move, movement." } },
});
