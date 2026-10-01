/** K-314 — One and Many: Write It Yourself. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// D = the published level-2 config (unchanged); levels 1 and 3 below are the Level Set's own (2026-10-01).
// Spreading the base entry (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"plurModel":false,"rowH":166} };
module.exports = {
  ...base,
  id: 'K-314',
  slug: 'singular-plural-write-it-yourself',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  difficulty: { 1: { ...base.difficulty[1], plurModel: false, rowH: 222, maxLetters: 6 }, 2: D, 3: { ...base.difficulty[3], plurModel: false, rowH: 166, minLetters: 7 } },
  i18n: { en: { title: "One and Many: Write It Yourself", instruction: "No dashed letters. Write the word that means more than one." } },
};
