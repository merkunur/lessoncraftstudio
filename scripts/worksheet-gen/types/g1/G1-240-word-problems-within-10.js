/** G1-240 — Word Problems Within 10. nt20-VAR variation of G1-213 (same family: word-problems). */
'use strict';
const base = require('./G1-213-word-problems.js');
module.exports = {
  ...base,
  id: 'G1-240',
  slug: 'word-problems-within-10',
  // Level Set 2026-10-14: level 2 = the published config; levels 1 / 3 from G1-213 FACE_LEVELS (⚠ never regenerate this line)
  difficulty: base.levelsFor('G1-240', {"max":10,"problems":2,"iconMax":10}),
  i18n: { en: { title: "Word Problems Within 10", instruction: "Read each story. Use the pictures to help you. Write the answer in the box." } },
};
