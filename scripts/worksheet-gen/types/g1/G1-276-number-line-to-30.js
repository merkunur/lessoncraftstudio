/** G1-276 — Where on the Number Line? 0 to 30. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[2], ...{"max":30} };
module.exports = {
  ...base,
  id: 'G1-276',
  slug: 'number-line-to-30',
  difficulty: base.pointerLevels(D),
  i18n: { en: { title: "Where on the Number Line? 0 to 30", instruction: "Count on to 30. Write the number each arrow points to." } },
};
