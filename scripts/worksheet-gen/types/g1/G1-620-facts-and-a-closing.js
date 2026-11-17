/** G1-620 — Facts and a Closing (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-620', slug: 'facts-and-a-closing', mode: 'factread', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Facts and a Closing", instruction: "Every fact tells about the topic. A closing sentence ends the piece." } },
});
