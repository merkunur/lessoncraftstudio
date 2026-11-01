/** G2-405 — who am I? place-value riddles, one proven answer (T5, 2.NBT.A.1 / 2.NBT.A.3). Place Value & Rounding maker, 2026-11-01. See types/_shared/pv-more.js. */
'use strict';
const { makePvMoreType } = require('../_shared/pv-more.js');

module.exports = makePvMoreType({
  id: 'G2-405', slug: 'who-am-i-number-riddles', mode: 'riddle', gradeBand: 'G2',
  i18n: { en: { title: "Who Am I? Number Riddles", instruction: "Read the clues. Write the one number that fits them all." } },
});
