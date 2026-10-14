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
  // Level Set 2026-10-14: level 2 = the published config D; levels 1 / 3 from G3-370 FACE_LEVELS (⚠ never regenerate this line)
  difficulty: base.levelsFor('G3-371', D),
  i18n: { en: { title: "Multiplication Word Problems", instruction: "The picture shows the equal groups. Write each answer in the box." } },
};
