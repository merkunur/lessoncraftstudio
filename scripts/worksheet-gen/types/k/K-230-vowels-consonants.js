/** K-230 — Sort letters into vowels and consonants. LITERACY letter-knowledge. */
'use strict';
const { makeLitLetterKnowledge } = require('../_shared/lit-letter-knowledge.js');
module.exports = makeLitLetterKnowledge({
  id: 'K-230', slug: 'vowels-and-consonants', gradeBand: 'K', exerciseType: 'letter-knowledge', mode: 'vowel-consonant',
  data: require('../../data/literacy/letter-knowledge.json'),
  i18n: { en: { title: 'Vowels and Consonants', instruction: 'Sort each letter into the vowels or the consonants.' } },
});
