/** G2-310 — Where on the Number Line? 60 to 100. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('../g1/G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[2], ...{"min":60,"max":100,"lines":3,"tick":1,"label":5,"pointers":2,"gap":3} };
module.exports = {
  ...base,
  id: 'G2-310',
  slug: 'number-line-between-60-and-100',
  difficulty: base.pointerLevels(D),
  i18n: { en: { title: "Where on the Number Line? 60 to 100", instruction: "The line starts at sixty. Count on from the nearest printed number." } },
};
