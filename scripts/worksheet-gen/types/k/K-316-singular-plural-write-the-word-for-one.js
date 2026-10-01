/** K-316 — Write the Word for One. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// D = the published level-2 config (unchanged); levels 1 and 3 below are the Level Set's own (2026-10-01).
// Spreading the base entry (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"direction":"toSingular","plurModel":false,"rowH":166} };
module.exports = {
  ...base,
  id: 'K-316',
  slug: 'singular-plural-write-the-word-for-one',
  // Level Set 2026-10-01: real easier / harder levels; level 2 = the published config
  difficulty: { 1: { ...base.difficulty[1], direction: 'toSingular', plurModel: false, rowH: 222, maxLetters: 6 }, 2: D, 3: { ...base.difficulty[3], direction: 'toSingular', plurModel: false, rowH: 166, minLetters: 7 } },
  interactive: require('../../lib/singular-plural-screen.js').interactiveFor('one'),
  i18n: { en: { title: "Write the Word for One", instruction: "No dashed letters this time. Write the word for one yourself." } },
};
