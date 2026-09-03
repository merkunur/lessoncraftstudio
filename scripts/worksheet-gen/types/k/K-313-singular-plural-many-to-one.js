/** K-313 — Many and One. nt20-B-VAR variation of K-287. */
'use strict';
const base = require('./K-287-singular-plural.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{"direction":"toSingular"} };
module.exports = {
  ...base,
  id: 'K-313',
  slug: 'singular-plural-many-to-one',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Many and One", instruction: "This time the word for many is given. Write the word for just one." } },
};
