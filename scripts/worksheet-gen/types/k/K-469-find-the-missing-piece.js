/** K-469 — Find the Missing Piece (Same & Different maker, 2026-11-02): types/_shared/picture-pieces.js. */
'use strict';
const { makePicturePiecesType } = require('../_shared/picture-pieces.js');

module.exports = makePicturePiecesType({
  id: 'K-469', slug: 'find-the-missing-piece', mode: 'missing', gradeBand: 'K',
  i18n: { en: { title: "Find the Missing Piece", instruction: "A piece of each picture is missing. Circle the piece that fits." } },
});
