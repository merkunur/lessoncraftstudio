/** G1-116 — Count on from a number (number-line hops). */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G1-116', slug: 'counting-on', mode: 'count-on',
  i18n: { en: { title: 'Count On!', instruction: 'Start at the dot. Hop forward and write where you land.' } },
});
