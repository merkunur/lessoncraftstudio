/** G2-210 — From Adding to Times (array-tasks factory, mode groups-mult) */
'use strict';
const { makeArrayType } = require('../_shared/array-tasks.js');
module.exports = makeArrayType({
  id: 'G2-210', slug: 'repeated-addition-multiplication', mode: 'groups-mult',  gradeBand: 'G23',
  i18n: { en: { title: 'From Adding to Times', instruction: 'Count the equal groups. Finish the multiplication.' } },
});
