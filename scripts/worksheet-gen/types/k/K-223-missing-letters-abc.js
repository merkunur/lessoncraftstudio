/** K-223 — Fill the missing letters to complete the alphabet. LITERACY letter-knowledge. */
'use strict';
const { makeLitLetterKnowledge } = require('../_shared/lit-letter-knowledge.js');
module.exports = makeLitLetterKnowledge({
  id: 'K-223', slug: 'missing-letters-alphabet', gradeBand: 'K', exerciseType: 'letter-knowledge', mode: 'missing-alphabet',
  data: require('../../data/literacy/letter-knowledge.json'),
  i18n: { en: { title: 'Missing Letters', instruction: 'Write the missing letters to finish the alphabet.' } },
});
