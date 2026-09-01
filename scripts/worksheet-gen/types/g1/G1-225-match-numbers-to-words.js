/** G1-225 — Match Numbers to Words. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
module.exports = {
  ...base,
  id: 'G1-225',
  slug: 'match-numbers-to-words',
  difficulty: { 1: {"mode":"match","min":13,"max":100,"items":5}, 2: {"mode":"match","min":13,"max":100,"items":5}, 3: {"mode":"match","min":13,"max":100,"items":5} },
  i18n: { en: { title: "Match Numbers to Words", instruction: "Draw a line from each number to its word." } },
};
