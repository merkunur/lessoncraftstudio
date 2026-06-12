/** G1-120 — Count tens and ones (blocks → number). */
'use strict';
const { makeBaseTenType } = require('../_shared/base-ten-tasks.js');
module.exports = makeBaseTenType({
  id: 'G1-120', slug: 'tens-and-ones', mode: 'read',
  i18n: { en: { title: 'Tens and Ones', instruction: 'Count the tens and ones. Write the number.' } },
});
