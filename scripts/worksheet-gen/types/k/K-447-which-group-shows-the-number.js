/** K-447 — Which Group Has That Many? (Counting maker, 2026-10-31). T6: numeral -> quantity, the inverse of count and circle (K.CC.B.5). See types/_shared/counting-more.js. */
'use strict';
const { makeCountingMoreType } = require('../_shared/counting-more.js');

module.exports = makeCountingMoreType({
  id: 'K-447', slug: 'which-group-shows-the-number', mode: 'which-group',
  i18n: { en: { title: "Which Group Has That Many?", instruction: "Read the number. Circle the group that has exactly that many." } },
});
