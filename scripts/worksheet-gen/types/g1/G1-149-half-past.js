/** G1-149 — Telling time: half past. */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G1-149', slug: 'telling-time-half-past', mode: 'read-circle', stepM: 30,
  i18n: { en: { title: 'Half Past What?', instruction: 'Read each clock. Circle the matching time.' } },
});
