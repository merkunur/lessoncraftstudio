/** K-313 — Many and One. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// D = the published level-2 config (unchanged); levels 1 and 3 below are the Level Set's own (2026-10-01).
// Spreading the base entry (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"direction":"toSingular"} };
module.exports = {
  ...base,
  id: 'K-313',
  slug: 'singular-plural-many-to-one',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  difficulty: { 1: { ...base.difficulty[1], direction: 'toSingular', maxLetters: 6 }, 2: D, 3: { ...base.difficulty[1], direction: 'toSingular', clones: [2, 3], minLetters: 6, maxLetters: 12 } },
  interactive: require('../../lib/singular-plural-screen.js').interactiveFor('one'),
  i18n: { en: { title: "Many and One", instruction: "The word for many is given. Trace the word for just one." } },
};
