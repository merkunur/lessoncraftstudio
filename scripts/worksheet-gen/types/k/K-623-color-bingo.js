/**
 * K-623 — Color Bingo (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode bingo-color). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-623", slug: "color-bingo", exerciseType: "bingo", gradeBand: "K", mode: "bingo-color", unit: null,
  i18n: { en: { title: "Color Bingo", instruction: "Take one card. Listen to the numbers from 1 to {N}. Color each number you hear. Three in a row wins." } },
});
