/** K-229 — Find and circle every instance of a target letter in a grid. LITERACY letter-knowledge. */
'use strict';
const { makeLitLetterKnowledge } = require('../_shared/lit-letter-knowledge.js');
module.exports = makeLitLetterKnowledge({
  id: 'K-229', slug: 'find-the-letter', gradeBand: 'K', exerciseType: 'letter-knowledge', mode: 'find-letter-grid',
  data: require('../../data/literacy/letter-knowledge.json'),
  i18n: { en: { title: 'Find the Letter', instruction: 'Circle every letter that matches the one in the box.' } },
});
