/**
 * G1-547 — Dot-to-Dot, Then Write the Word (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode dots-word). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "G1-547", slug: "dot-to-dot-write-the-word", exerciseType: "dot-to-dot", gradeBand: "G1", mode: "dots-word", unit: null,
  i18n: { en: { title: "Dot-to-Dot, Then Write the Word", instruction: "Connect the dots in number order. Then write the name of the picture." } },
});
