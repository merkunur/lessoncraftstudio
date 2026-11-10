/**
 * G1-551 — Color the Tens Digit (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode tens). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "G1-551", slug: "color-the-tens-digit", exerciseType: "base-ten", gradeBand: "G1", mode: "tens", unit: null,
  i18n: { en: { title: "Color the Tens Digit", instruction: "Color the digit in the tens place of each number." } },
});
