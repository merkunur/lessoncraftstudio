/**
 * K-602 — Trace the Giant Letter: {U} (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode giant-letter). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-602", slug: "trace-the-giant-letter", exerciseType: "picture-tracing", gradeBand: "K", mode: "giant-letter", unit: "letters",
  i18n: { en: { title: "Trace the Giant Letter: {U}", instruction: "Start at the black dot. Trace the outline. Then color the letter." } },
});
