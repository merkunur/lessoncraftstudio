/** G1-275 — Number Line to 20: Fewer Labels. nt20-B-VAR variation of G1-248. */
'use strict';
const base = require('./G1-248-number-line-position.js');
// D = the published config. Level Set 2026-10-13: levels 1 and 3 come from base.pointerLevels(D) — ⚠ tools/gen-var-specs.js
// would flatten them back to one object.
const D = { ...base.legacy[2], ...{"label":10} };
module.exports = {
  ...base,
  id: 'G1-275',
  slug: 'number-line-to-20-fewer-labels',
  difficulty: base.pointerLevels(D),
  i18n: { en: { title: "Number Line to 20: Fewer Labels", instruction: "Only 0, 10 and 20 are printed. Count on to each arrow." } },
};
