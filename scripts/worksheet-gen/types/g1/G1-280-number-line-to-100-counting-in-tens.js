/** G1-280 — Number Line to 100: Counting in Tens. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[3], ...{"lines":3,"max":100,"tick":10,"label":5,"pointers":2,"gap":2} };
module.exports = {
  ...base,
  id: 'G1-280',
  slug: 'number-line-to-100-counting-in-tens',
  difficulty: base.pointerLevels(D, { l3Label: 10 }),   // level 3: only the two ends printed
  i18n: { en: { title: "Number Line to 100: Counting in Tens", instruction: "Each tick is ten. Count on in tens to reach each arrow." } },
};
