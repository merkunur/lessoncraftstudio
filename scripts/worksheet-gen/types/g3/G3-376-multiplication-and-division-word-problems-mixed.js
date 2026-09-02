/** G3-376 — Multiplication and Division: Mixed Problems. nt20-B-VAR variation of G3-370. */
'use strict';
const base = require('./G3-370-muldiv-word-problems.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[3], ...{"icon":13,"font":14,"dots":20,"slotH":26} };
module.exports = {
  ...base,
  id: 'G3-376',
  slug: 'multiplication-and-division-word-problems-mixed',
  difficulty: { 1: D, 2: D, 3: D },
  i18n: { en: { title: "Multiplication and Division: Mixed Problems", instruction: "Three stories. Decide what each one asks before you answer." } },
};
