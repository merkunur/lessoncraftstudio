/** G2-213 — Easy Groups (array-tasks factory, mode groups-mult) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G2-213', slug: 'multiplication-groups', mode: 'groups-mult', ks: [2, 5, 10], gradeBand: 'G23',
  i18n: { en: { title: 'Easy Groups', instruction: 'Count the equal groups. Finish the multiplication.' } },
});
