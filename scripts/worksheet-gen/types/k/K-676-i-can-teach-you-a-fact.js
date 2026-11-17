/** K-676 — I Can Teach You a Fact (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-676', slug: 'i-can-teach-you-a-fact', mode: 'teach', exerciseType: 'sentence-building',
  i18n: { en: { title: "I Can Teach You a Fact", instruction: "Teach a reader: name your topic, label it, and tell facts." } },
});
