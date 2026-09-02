/** K-303 — One and Many: Longer Words. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{} };
module.exports = {
  ...base,
  id: 'K-303',
  slug: 'singular-plural-longer-words',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "One and Many: Longer Words", instruction: "Look at how the word changes when there is more than one. Trace the word for many." } },
};
