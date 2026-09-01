/** G1-223 — Number Words to 20. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
module.exports = {
  ...base,
  id: 'G1-223',
  slug: 'number-words-to-20',
  difficulty: { 1: {"mode":"circle","min":3,"max":20,"cards":6,"cols":2,"rows":3}, 2: {"mode":"circle","min":3,"max":20,"cards":6,"cols":2,"rows":3}, 3: {"mode":"circle","min":3,"max":20,"cards":6,"cols":2,"rows":3} },
  i18n: { en: { title: "Number Words to 20", instruction: "Read the number. Circle the word that matches it." } },
};
