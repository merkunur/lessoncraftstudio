/**
 * K-601 — Trace the Frame (flagship makers, docs/makers/FLAGSHIP.md; flagship-new.js, mode frame). Written by tools/fl-new-templates.js from data/fl/new-templates.js.
 */
'use strict';
const { makeFlagship } = require('../_shared/flagship-new.js');

module.exports = makeFlagship({
  id: "K-601", slug: "trace-the-frame", exerciseType: "picture-tracing", gradeBand: "K", mode: "frame", unit: null,
  i18n: { en: { title: "Trace the Frame", instruction: "Start at the black dot and trace the frame. Then draw something you like inside it." } },
});
