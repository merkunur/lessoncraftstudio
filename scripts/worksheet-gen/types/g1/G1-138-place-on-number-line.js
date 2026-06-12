/** G1-138 — Place the number: circle the right mark on the line. */
'use strict';
const { makeNumberLineTaskType } = require('../_shared/number-line-tasks.js');
module.exports = makeNumberLineTaskType({
  id: 'G1-138', slug: 'number-line-placement', mode: 'place',
  i18n: { en: { title: 'Where Does It Live?', instruction: 'Find the number on the line. Circle its dot.' } },
});
