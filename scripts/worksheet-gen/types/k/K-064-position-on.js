/** K-064 — Position words: each card asks ON, UNDER or BESIDE the box (2026-11-15; it asked ON on every card). */
'use strict';
const { makePositionType } = require('../_shared/position-words.js');

module.exports = makePositionType({
  id: 'K-064', slug: 'positional-words-on', mode: 'on-under', relation: 'on',
  i18n: { en: { title: 'On, Under, Beside', instruction: 'Each card names a place: ON, UNDER, or BESIDE the box. Circle the picture that is there.' } },
});
