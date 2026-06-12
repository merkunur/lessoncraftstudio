/** G3-314 — Flip It Around (array-tasks factory, mode commutative) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G3-314', slug: 'commutative-property', mode: 'commutative',  gradeBand: 'G23',
  i18n: { en: { title: 'Flip It Around', instruction: 'Both arrays show the same total. Finish both number sentences.' } },
});
