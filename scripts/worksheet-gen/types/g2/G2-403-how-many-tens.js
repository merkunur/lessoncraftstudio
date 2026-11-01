/** G2-403 — rename a number by its tens or hundreds (T3, 2.NBT.A.1a). Place Value & Rounding maker, 2026-11-01. See types/_shared/pv-more.js. */
'use strict';
const { makePvMoreType } = require('../_shared/pv-more.js');

module.exports = makePvMoreType({
  id: 'G2-403', slug: 'how-many-tens', mode: 'rename', gradeBand: 'G2',
  i18n: { en: { title: "How Many Tens?", instruction: "Write how many tens, or write the number." } },
});
