/** G1-621 — Write an All About Page (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-621', slug: 'write-an-all-about-page', mode: 'factwrite', exerciseType: 'sentence-building',
  i18n: { en: { title: "Write an All About Page", instruction: "Name your topic, write facts about it, and end with a closing." } },
});
