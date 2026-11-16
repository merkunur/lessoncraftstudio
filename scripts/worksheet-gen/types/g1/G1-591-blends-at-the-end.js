/** G1-591 — Blends at the End (blends-g1 factory; English literacy year 2026-11-16) */
'use strict';
const { makeBlendType } = require('../_shared/blends-g1.js');
module.exports = makeBlendType({
  id: 'G1-591', slug: 'blends-at-the-end', mode: 'end',
  i18n: { en: { title: "Blends at the End", instruction: "Read each word and draw a line to its picture. Two words have no picture. Then write each word under its ending, and cross it out." } },
});
