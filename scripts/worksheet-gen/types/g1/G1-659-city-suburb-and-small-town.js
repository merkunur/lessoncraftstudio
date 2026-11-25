/** G1-659 — City, Suburb and Small Town (Batch S1, Daily Teaching System Stage D-5, 2026-11-24; social en-1-027). dk-social-1.js mode 's1-communities'. English only. */
'use strict';
const { makeS1Type } = require('../_shared/dk-social-1.js');
module.exports = makeS1Type({
  id: 'G1-659', slug: 'city-suburb-and-small-town', mode: 's1-communities', exerciseType: 'maps',
  difficulty: {"1":{"comms":2,"sentences":3},"2":{"comms":3,"sentences":6},"3":{"comms":3,"sentences":6,"frame":true}},
  i18n: { en: { title: "City, Suburb and Small Town", instruction: "Look at the places. Read each sentence. Write the letter of the place it tells about." } },
});
