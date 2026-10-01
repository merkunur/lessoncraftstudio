/** K-303 — One and Many: Longer Words. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// D = the published level-2 config (unchanged); levels 1 and 3 below are the Level Set's own (2026-10-01).
// Spreading the base entry (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'K-303',
  slug: 'singular-plural-longer-words',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  difficulty: { 1: { ...base.difficulty[1], minLetters: 5, maxLetters: 9 }, 2: D, 3: { ...base.difficulty[3], minLetters: 7 } },
  i18n: { en: { title: "One and Many: Longer Words", instruction: "These words are longer. Trace the word that names many." } },
};
