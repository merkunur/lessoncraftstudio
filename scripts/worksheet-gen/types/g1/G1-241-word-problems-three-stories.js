/** G1-241 — Word Problem Practice. nt20-VAR variation of G1-213 (same family: word-problems). */
'use strict';
const base = require('./G1-213-word-problems.js');
module.exports = {
  ...base,
  id: 'G1-241',
  slug: 'word-problems-three-stories',
  difficulty: { 1: {"max":10,"problems":3,"iconMax":10,"thinkH":70,"iconPx":32}, 2: {"max":10,"problems":3,"iconMax":10,"thinkH":70,"iconPx":32}, 3: {"max":10,"problems":3,"iconMax":10,"thinkH":70,"iconPx":32} },
  i18n: { en: { title: "Word Problem Practice", instruction: "Read each story. Use the pictures to help you. Write the answer in the box." } },
};
