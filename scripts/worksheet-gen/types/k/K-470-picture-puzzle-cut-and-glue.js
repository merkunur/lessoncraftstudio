/** K-470 — Picture Puzzle (Same & Different maker, 2026-11-02): types/_shared/picture-pieces.js. */
'use strict';
const { makePicturePiecesType } = require('../_shared/picture-pieces.js');

module.exports = makePicturePiecesType({
  id: 'K-470', slug: 'picture-puzzle-cut-and-glue', mode: 'puzzle', gradeBand: 'K',
  i18n: { en: { title: "Picture Puzzle", instruction: "Cut out the pieces. Glue each piece in its place on the grid so the picture is whole again." } },
});
