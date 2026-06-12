/** G1-115 — Picture equation: which number is missing? */
'use strict';
const { makePictureEquationType } = require('../_shared/picture-equation.js');
module.exports = makePictureEquationType({
  id: 'G1-115', slug: 'missing-addend-pictures', mode: 'missing', maxTotal: 10,
  i18n: { en: { title: 'What Is Missing?', instruction: 'Count the group. Write the missing number to reach the total.' } },
});
