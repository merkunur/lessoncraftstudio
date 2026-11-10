/**
 * K-617 — Color and Trace: {U} (flagship makers, docs/makers/FLAGSHIP.md; glyph-tasks.js, mode letter-trace). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeGlyphTask } = require('../_shared/glyph-tasks.js');

module.exports = makeGlyphTask({
  id: "K-617", slug: "color-and-trace-the-letter", exerciseType: "letter-tracing", gradeBand: "K", mode: "letter-trace", unit: "letters",
  i18n: { en: { title: "Color and Trace: {U}", instruction: "Color the big letters. Then trace the letters on the lines." } },
});
