/** G1-227 — Write the Number Words. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
module.exports = {
  ...base,
  id: 'G1-227',
  slug: 'write-the-number-words',
  difficulty: { 1: {"mode":"write","min":3,"max":20,"cards":6,"cols":2,"rows":3}, 2: {"mode":"write","min":3,"max":20,"cards":6,"cols":2,"rows":3}, 3: {"mode":"write","min":3,"max":20,"cards":6,"cols":2,"rows":3} },
  i18n: { en: { title: "Write the Number Words", instruction: "Find the matching word in the word bank. Write it on the line." } },
};
