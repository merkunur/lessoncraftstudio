/** G3-411 — times table cards for a key ring (T7, material). Multiplication & Division maker, 2026-11-01. See types/_shared/md-more.js. */
'use strict';
const { makeMdMoreType } = require('../_shared/md-more.js');

module.exports = makeMdMoreType({
  id: 'G3-411', slug: 'times-table-keyring-cards', mode: 'ring', gradeBand: 'G3',
  i18n: { en: { title: "Times Table Keyring Cards", instruction: "Cut out the cards and punch a hole in each circle. Keep them on a ring and practice your tables." } },
});
