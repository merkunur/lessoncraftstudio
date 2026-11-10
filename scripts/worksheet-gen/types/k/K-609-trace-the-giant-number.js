/**
 * K-609 — Trace the Giant Number: {U} (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode giant-number). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-609", slug: "trace-the-giant-number", exerciseType: "picture-tracing", gradeBand: "K", mode: "giant-number", unit: "numbers",
  i18n: { en: { title: "Trace the Giant Number: {U}", instruction: "Start at the black dot. Trace the outline. Then color the number." } },
});
