/** K-225 — Draw a line from each word to the picture it names. LITERACY vocab-match. */
'use strict';
const { makeLitVocabMatch } = require('../_shared/lit-vocab-match.js');
module.exports = makeLitVocabMatch({
  id: 'K-225', slug: 'match-word-to-picture', gradeBand: 'K', exerciseType: 'picture-vocabulary', mode: 'word-picture',
  data: require('../../data/literacy/vocab-match.json'),
  i18n: { en: { title: 'Match Word to Picture', instruction: 'Draw a line from each word to the picture it names.' } },
});
