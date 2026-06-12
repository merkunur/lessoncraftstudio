/** G3-302 — Tricky Groups (array-tasks factory, mode groups-mult) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G3-302', slug: 'multiplication-groups-3-9', mode: 'groups-mult', ks: [3, 4, 6, 7, 8, 9], gradeBand: 'G23',
  i18n: { en: { title: 'Tricky Groups', instruction: 'Count the equal groups. Finish the multiplication.' } },
});
