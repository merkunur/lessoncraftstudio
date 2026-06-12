/** G1-119 — Number-line subtraction. */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G1-119', slug: 'number-line-subtraction', mode: 'jump-sub',
  i18n: { en: { title: 'Hop Back and Subtract', instruction: 'Follow the hops backward. Write the subtraction answer.' } },
});
