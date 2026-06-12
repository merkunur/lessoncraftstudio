/** G2-212 — Pick the Array (array-tasks factory, mode build-array) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G2-212', slug: 'building-arrays', mode: 'build-array',  gradeBand: 'G23',
  i18n: { en: { title: 'Pick the Array', instruction: 'Circle the array that matches the multiplication.' } },
});
