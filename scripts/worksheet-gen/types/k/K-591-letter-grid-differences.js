/**
 * K-591 — Letter Grid: Find the Differences (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode letter-grid). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-591", slug: "letter-grid-differences", exerciseType: "find-the-differences", gradeBand: "K", mode: "letter-grid", unit: null,
  i18n: { en: { title: "Letter Grid: Find the Differences", instruction: "Look at the top grid. Find the {N} letters that changed in the bottom grid. Color them." } },
});
