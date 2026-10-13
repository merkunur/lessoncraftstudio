/** G1-281 — Where on the Number Line? 0 to 120. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[3], ...{"lines":3,"max":120,"tick":10,"label":5,"pointers":2,"gap":2} };
module.exports = {
  ...base,
  id: 'G1-281',
  slug: 'number-line-to-120',
  difficulty: base.pointerLevels(D),
  i18n: { en: { title: "Where on the Number Line? 0 to 120", instruction: "This line goes past 100. Count on in tens to each arrow." } },
};
