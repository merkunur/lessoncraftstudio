/** G1-114 — Compare the sets: circle <, =, or >. */
'use strict';
const { makePictureEquationType } = require('../_shared/picture-equation.js');
module.exports = makePictureEquationType({
  id: 'G1-114', slug: 'comparing-groups-symbols', mode: 'compare', maxTotal: 10,
  i18n: { en: { title: 'Greater, Less, or Equal?', instruction: 'Compare the two groups. Circle the right symbol.' } },
});
