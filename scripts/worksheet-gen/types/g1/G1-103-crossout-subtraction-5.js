/** G1-103 — Cross-out subtraction within 5. */
'use strict';
const { makePictureEquationType } = require('../_shared/picture-equation.js');
module.exports = makePictureEquationType({
  id: 'G1-103', slug: 'cross-out-subtraction-within-5', mode: 'crossout', maxTotal: 5,
  i18n: { en: { title: 'Cross Out and Subtract', instruction: 'Some pictures are crossed out. Write how many are left.' } },
});
