/**
 * K-592 — Number Grid: Find the Differences (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode number-grid). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-592", slug: "number-grid-differences", exerciseType: "find-the-differences", gradeBand: "K", mode: "number-grid", unit: null,
  i18n: { en: { title: "Number Grid: Find the Differences", instruction: "Look at the top grid. Find the {N} numbers that changed in the bottom grid. Color them." } },
});
