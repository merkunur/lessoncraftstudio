/** G1-111 — Roll and Add (array-tasks factory, mode dice-add) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G1-111', slug: 'dice-addition', mode: 'dice-add',  gradeBand: 'G1',
  i18n: { en: { title: 'Roll and Add', instruction: 'Count the dots on both dice. Write the sum.' } },
});
