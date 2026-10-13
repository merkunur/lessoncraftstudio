/** G1-224 — Tens in Words: 10 to 100. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
module.exports = {
  ...base,
  id: 'G1-224',
  slug: 'tens-in-words',
  // Level Set 2026-10-13: real levels from the base table (level 2 = the published config). ⚠ a re-run of
  // tools/gen-var-specs.js would flatten them back to one config — keep this line.
  difficulty: base.levelsFor('G1-224'),
  i18n: { en: { title: "Tens in Words: 10 to 100", instruction: "Read the number. Circle the word that matches it." } },
};
