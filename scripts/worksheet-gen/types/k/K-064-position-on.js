/** K-064 — Position words: circle the picture ON the box. */
'use strict';
const { makePositionType } = require('../_shared/position-words.js');

module.exports = makePositionType({
  id: 'K-064', slug: 'positional-words-on', mode: 'on-under', relation: 'on',
  i18n: { en: { title: 'On, Under, Beside', instruction: 'Circle the picture that is ON the box.' } },
});
