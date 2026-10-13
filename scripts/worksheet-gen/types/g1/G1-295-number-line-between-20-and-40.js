/** G1-295 — Where on the Number Line? 20 to 40. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[2], ...{"min":20,"max":40,"lines":4,"tick":1,"label":5,"pointers":3,"gap":3} };
module.exports = {
  ...base,
  id: 'G1-295',
  slug: 'number-line-between-20-and-40',
  difficulty: base.pointerLevels(D),
  i18n: { en: { title: "Where on the Number Line? 20 to 40", instruction: "The line starts at twenty. Count on from the nearest printed number." } },
};
