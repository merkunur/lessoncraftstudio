/**
 * K-586 — Two Mini Dot-to-Dots (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode two-dots). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-586", slug: "two-mini-dot-to-dots", exerciseType: "dot-to-dot", gradeBand: "K", mode: "two-dots", unit: null,
  i18n: { en: { title: "Two Mini Dot-to-Dots", instruction: "Start at the orange dot in each picture. Connect the dots in number order." } },
});
