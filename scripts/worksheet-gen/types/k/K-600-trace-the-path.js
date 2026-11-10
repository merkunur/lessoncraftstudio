/**
 * K-600 — Trace the Path (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode trace-way). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-600", slug: "trace-the-path", exerciseType: "picture-tracing", gradeBand: "K", mode: "trace-way", unit: null,
  i18n: { en: { title: "Trace the Path", instruction: "In each row, start at the black dot. Trace the path to the other picture." } },
});
