/** K-222 — Match each capital letter to its small letter. LITERACY letter-knowledge. */
'use strict';
const { makeLitLetterKnowledge } = require('../_shared/lit-letter-knowledge.js');
module.exports = makeLitLetterKnowledge({
  id: 'K-222', slug: 'uppercase-and-lowercase', gradeBand: 'K', exerciseType: 'letter-knowledge', mode: 'upper-lower',
  data: require('../../data/literacy/letter-knowledge.json'),
  i18n: { en: { title: 'Capital and Small Letters', instruction: 'Draw a line from each capital letter to its small letter.' } },
});
