/** G1-635 — My Moon Journal (Batch 1, Daily Teaching System Stage D-5, 2026-11-23; science en-1-044). dk-g1.js mode 'g1-moon-journal'. English only. */
'use strict';
const { makeG1Type } = require('../_shared/dk-g1.js');
module.exports = makeG1Type({
  id: 'G1-635', slug: 'my-moon-journal', mode: 'g1-moon-journal', exerciseType: 'earth-and-space',
  difficulty: {"1":{"cells":8,"key":true},"2":{"cells":31},"3":{"cells":31,"predict":true}},
  i18n: { en: { title: "My Moon Journal", instruction: "Each day, color the bright part of the Moon, like the shapes at the top. Write X if clouds hid it, or a dash if it was not in the sky." } },
});
