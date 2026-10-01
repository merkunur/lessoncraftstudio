/** K-302 — One and Many: First Words. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// D = the published level-2 config (unchanged); levels 1 and 3 below are the Level Set's own (2026-10-01).
// Spreading the base entry (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'K-302',
  slug: 'singular-plural-first-words',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  difficulty: { 1: { ...base.difficulty[1], maxLetters: 6 }, 2: D, 3: { ...base.difficulty[2], maxLetters: 7 } },
  i18n: { en: { title: "One and Many: First Words", instruction: "One or many? Trace the word that names more than one." } },
};
