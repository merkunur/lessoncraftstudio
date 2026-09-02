/** G3-371 — Multiplication Word Problems. nt20-B-VAR variation of G3-370. */
'use strict';
const base = require('./G3-370-muldiv-word-problems.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[1], ...{} };
module.exports = {
  ...base,
  id: 'G3-371',
  slug: 'multiplication-word-problems',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Multiplication Word Problems", instruction: "Read each story. The picture shows the equal groups. Write the answer in the box." } },
};
