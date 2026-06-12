/** G1-148 — Telling time: o'clock. */
'use strict';
const { makeClockType } = require('../_shared/clock-tasks.js');
module.exports = makeClockType({
  id: 'G1-148', slug: 'telling-time-oclock', mode: 'read-circle', stepM: 60,
  i18n: { en: { title: 'On the Hour', instruction: 'Read each clock. Circle the matching time.' } },
});
