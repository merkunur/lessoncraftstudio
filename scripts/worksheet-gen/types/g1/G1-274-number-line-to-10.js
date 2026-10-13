/** G1-274 — Where on the Number Line? 0 to 10. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[1], ...{} };
module.exports = {
  ...base,
  id: 'G1-274',
  slug: 'number-line-to-10',
  difficulty: base.pointerLevels(D, { l3Label: 10 }),   // level 3: only the two ends printed
  i18n: { en: { title: "Where on the Number Line? 0 to 10", instruction: "Write the number each arrow points to, from 0 to 10." } },
};
