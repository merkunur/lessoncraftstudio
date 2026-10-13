/** G1-279 — Number Line to 100: Counting in Fives. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[3], ...{} };
module.exports = {
  ...base,
  id: 'G1-279',
  slug: 'number-line-to-100-counting-in-fives',
  difficulty: base.pointerLevels(D),
  i18n: { en: { title: "Number Line to 100: Counting in Fives", instruction: "Each tick is five, up to 100. Which number is each arrow on?" } },
};
