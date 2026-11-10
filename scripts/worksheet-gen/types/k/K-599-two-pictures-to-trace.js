/**
 * K-599 — Two Pictures to Trace (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode two-trace). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-599", slug: "two-pictures-to-trace", exerciseType: "picture-tracing", gradeBand: "K", mode: "two-trace", unit: null,
  i18n: { en: { title: "Two Pictures to Trace", instruction: "Trace all the lines of both pictures. Start at the black dots." } },
});
