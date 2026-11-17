/** G1-618 — Opinion or Reason? (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-618', slug: 'opinion-or-reason', mode: 'opread', exerciseType: 'reading-comprehension',
  i18n: { en: { title: "Opinion or Reason?", instruction: "An opinion tells what you think. A reason tells why you think so." } },
});
