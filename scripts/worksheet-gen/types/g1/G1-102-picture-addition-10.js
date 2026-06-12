/** G1-102 — Picture addition within 10. */
'use strict';
const { makePictureEquationType } = require('../_shared/picture-equation.js');
module.exports = makePictureEquationType({
  id: 'G1-102', slug: 'picture-addition-within-10', mode: 'add', maxTotal: 10,
  i18n: { en: { title: 'Picture Addition', instruction: 'Count both groups. Write how many altogether.' } },
});
