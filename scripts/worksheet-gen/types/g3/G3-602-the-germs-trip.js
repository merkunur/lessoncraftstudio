/** G3-602 — The Germ’s Trip (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; health en-3-026). dk-g3-health.js mode 'g3-germ-trip'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3-health.js');
module.exports = makeG3Type({
  id: 'G3-602', slug: 'the-germs-trip', mode: 'g3-germ-trip', exerciseType: 'healthy-habits',
  difficulty: {"1":{"frames":3},"2":{"frames":6},"3":{"frames":6,"ending":true}},
  i18n: { en: { title: "The Germ’s Trip", instruction: "Follow the germ. Circle each picture where a habit would stop it, and write the habit." } },
});
