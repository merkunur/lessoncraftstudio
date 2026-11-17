/** K-678 — My Small Moment (draw-and-write-k factory; English literacy year 2026-11-17) */
'use strict';
const { makeDrawWriteKType } = require('../_shared/draw-and-write-k.js');
module.exports = makeDrawWriteKType({
  id: 'K-678', slug: 'my-small-moment', mode: 'moment', exerciseType: 'sentence-building',
  i18n: { en: { title: "My Small Moment", instruction: "Draw and write what happened to you. Tell how you felt." } },
});
