/** G1-224 — Tens in Words: 10 to 100. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
module.exports = {
  ...base,
  id: 'G1-224',
  slug: 'tens-in-words',
  difficulty: { 1: {"mode":"circle","pool":"tens","min":10,"max":100,"cards":6,"cols":2,"rows":3}, 2: {"mode":"circle","pool":"tens","min":10,"max":100,"cards":6,"cols":2,"rows":3}, 3: {"mode":"circle","pool":"tens","min":10,"max":100,"cards":6,"cols":2,"rows":3} },
  i18n: { en: { title: "Tens in Words: 10 to 100", instruction: "Read the number. Circle the word that matches it." } },
};
