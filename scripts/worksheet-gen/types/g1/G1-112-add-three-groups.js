/** G1-112 — Add three picture groups. */
'use strict';
const { makePictureEquationType } = require('../_shared/picture-equation.js');
module.exports = makePictureEquationType({
  id: 'G1-112', slug: 'adding-three-groups', mode: 'add3', maxTotal: 10,
  i18n: { en: { title: 'Add Three Groups', instruction: 'Count all three groups. Write the total.' } },
});
