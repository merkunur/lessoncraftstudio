/** G1-278 — Number Line to 50: Counting in Fives. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[2], ...{"max":50,"tick":5,"label":5,"lines":3,"pointers":2,"gap":2} };
module.exports = {
  ...base,
  id: 'G1-278',
  slug: 'number-line-to-50-counting-in-fives',
  difficulty: base.pointerLevels(D),
  i18n: { en: { title: "Number Line to 50: Counting in Fives", instruction: "Count on in fives from 0, 25 or 50 to reach each arrow." } },
};
