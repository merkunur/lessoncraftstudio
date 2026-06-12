/** G1-117 — Count back on a number line. */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G1-117', slug: 'counting-back', mode: 'count-back',
  i18n: { en: { title: 'Count Back!', instruction: 'Start at the dot. Hop backward and write where you land.' } },
});
