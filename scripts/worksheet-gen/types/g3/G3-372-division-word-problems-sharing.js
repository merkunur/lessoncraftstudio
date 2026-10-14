/** G3-372 — Division Word Problems: Sharing. nt20-B-VAR variation of G3-370. */
'use strict';
const base = require('./G3-370-muldiv-word-problems.js');
// One object for all three levels: the waves ship d2 only, so a face must
// render identically whichever level is asked for. Spreading the base entry
// (not a JSON literal) carries function-valued params through intact.
const D = { ...base.difficulty[2], ...{"ops":["share","share"]} };
module.exports = {
  ...base,
  id: 'G3-372',
  slug: 'division-word-problems-sharing',
  // Level Set 2026-10-14: level 2 = the published config D; levels 1 / 3 from G3-370 FACE_LEVELS (⚠ never regenerate this line)
  difficulty: base.levelsFor('G3-372', D),
  i18n: { en: { title: "Division Word Problems: Sharing", instruction: "Each story shares things out. Deal them into the boxes." } },
};
