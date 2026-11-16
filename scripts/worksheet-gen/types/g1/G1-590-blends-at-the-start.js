/** G1-590 — Blends at the Start (blends-g1 factory; English literacy year 2026-11-16) */
'use strict';
const { makeBlendType } = require('../_shared/blends-g1.js');
module.exports = makeBlendType({
  id: 'G1-590', slug: 'blends-at-the-start', mode: 'start',
  i18n: { en: { title: "Blends at the Start", instruction: "Read each word and draw a line to its picture. Two words have no picture. Then write each word under its kind of blend, and cross it out." } },
});
