/** G1-617 — Write a True Story (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-617', slug: 'write-a-true-story', mode: 'storydraft', exerciseType: 'sentence-building',
  i18n: { en: { title: "Write a True Story", instruction: "Use your plan and the time words to write your true story." } },
});
