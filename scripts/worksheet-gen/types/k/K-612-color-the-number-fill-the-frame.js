/**
 * K-612 — Color the Number, Fill the Frame (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode frame). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-612", slug: "color-the-number-fill-the-frame", exerciseType: "counting-frames", gradeBand: "K", mode: "frame", unit: null,
  i18n: { en: { title: "Color the Number, Fill the Frame", instruction: "Color each number. Then color that many squares in its frame." } },
});
