/**
 * K-610 — Color and Trace: {U} (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode num-trace). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-610", slug: "color-and-trace-the-number", exerciseType: "number-tracing", gradeBand: "K", mode: "num-trace", unit: "numbers",
  i18n: { en: { title: "Color and Trace: {U}", instruction: "Color the big number. Then trace the numbers on the lines." } },
});
