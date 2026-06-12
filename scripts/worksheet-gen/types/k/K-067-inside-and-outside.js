/** K-067 — Inside vs outside: circle what is INSIDE the shape. */
'use strict';
const { makePositionType } = require('../_shared/position-words.js');

module.exports = makePositionType({
  id: 'K-067', slug: 'inside-and-outside', mode: 'inside-outside', relation: 'inside',
  i18n: { en: { title: 'Inside and Outside', instruction: 'Circle every picture INSIDE the big shape.' } },
});
