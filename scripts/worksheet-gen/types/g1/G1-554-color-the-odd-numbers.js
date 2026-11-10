/**
 * G1-554 — Color the Odd Numbers (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode parity). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "G1-554", slug: "color-the-odd-numbers", exerciseType: "odd-and-even", gradeBand: "G1", mode: "parity", unit: null,
  i18n: { en: { title: "Color the Odd Numbers", instruction: "Color every odd number. Leave the even numbers white." } },
});
