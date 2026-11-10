/**
 * K-584 — Letter Dot-to-Dot: {U} (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode letter-dots). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-584", slug: "letter-dot-to-dot", exerciseType: "dot-to-dot", gradeBand: "K", mode: "letter-dots", unit: "letters",
  i18n: { en: { title: "Letter Dot-to-Dot: {U}", instruction: "Start at the orange dot. Connect the dots in number order to make the letter. Then color it." } },
});
