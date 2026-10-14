/** G1-241 — Word Problem Practice. nt20-VAR variation of G1-213 (same family: word-problems). */
'use strict';
const base = require('./G1-213-word-problems.js');
module.exports = {
  ...base,
  id: 'G1-241',
  slug: 'word-problems-three-stories',
  // Level Set 2026-10-14: level 2 = the published config; levels 1 / 3 from G1-213 FACE_LEVELS (⚠ never regenerate this line)
  difficulty: base.levelsFor('G1-241', {"max":10,"problems":3,"iconMax":10,"thinkH":70,"iconPx":32}),
  i18n: { en: { title: "Word Problem Practice", instruction: "Read each story. Use the pictures to help you. Write the answer in the box." } },
};
