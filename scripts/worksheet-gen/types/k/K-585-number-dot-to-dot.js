/**
 * K-585 — Number Dot-to-Dot: {U} (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode number-dots). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-585", slug: "number-dot-to-dot", exerciseType: "dot-to-dot", gradeBand: "K", mode: "number-dots", unit: "numbers", unitMax: 9,
  i18n: { en: { title: "Number Dot-to-Dot: {U}", instruction: "Start at the orange dot. Connect the dots in number order to make the number. Then color it." } },
});
