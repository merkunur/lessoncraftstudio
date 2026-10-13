/** G1-225 — Match Numbers to Words. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
module.exports = {
  ...base,
  id: 'G1-225',
  slug: 'match-numbers-to-words',
  // Level Set 2026-10-13: real levels from the base table (level 2 = the published config). ⚠ a re-run of
  // tools/gen-var-specs.js would flatten them back to one config — keep this line.
  difficulty: base.levelsFor('G1-225'),
  i18n: { en: { title: "Match Numbers to Words", instruction: "Draw a line from each number to its word." } },
};
