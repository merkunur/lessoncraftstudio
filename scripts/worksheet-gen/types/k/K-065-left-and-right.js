/** K-065 — Left vs right: circle everything on the LEFT side. */
'use strict';
const { makePositionType } = require('../_shared/position-words.js');

module.exports = makePositionType({
  id: 'K-065', slug: 'left-and-right', mode: 'left-right', relation: 'left',
  i18n: { en: { title: 'Left and Right', instruction: 'Circle every picture on the LEFT side of the line.' } },
});
