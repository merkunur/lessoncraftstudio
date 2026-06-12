/** G2-247 — Mirror Line? (geometry-tasks factory, mode symmetry-yn) */
'use strict';
const { makeGeometryType } = require('../_shared/geometry-tasks.js');
module.exports = makeGeometryType({
  id: 'G2-247', slug: 'line-of-symmetry', mode: 'symmetry-yn', 
  i18n: { en: { title: 'Mirror Line?', instruction: 'Is the dashed line a mirror line? Circle the check or the cross.' } },
});
