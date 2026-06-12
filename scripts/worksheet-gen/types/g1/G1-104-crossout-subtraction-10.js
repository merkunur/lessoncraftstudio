/** G1-104 — Cross-out subtraction within 10. */
'use strict';
const { makePictureEquationType } = require('../_shared/picture-equation.js');
module.exports = makePictureEquationType({
  id: 'G1-104', slug: 'cross-out-subtraction-within-10', mode: 'crossout', maxTotal: 10,
  i18n: { en: { title: 'Picture Subtraction', instruction: 'Some pictures are crossed out. Write how many are left.' } },
});
