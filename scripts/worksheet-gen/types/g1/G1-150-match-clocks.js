/** G1-150 — Match analog clocks to digital times. */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G1-150', slug: 'matching-clocks', mode: 'match', stepM: 30,
  i18n: { en: { title: 'Clock Partners', instruction: 'Draw a line from each clock to its digital time.' } },
});
