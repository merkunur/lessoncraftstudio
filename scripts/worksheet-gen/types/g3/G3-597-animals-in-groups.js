/** G3-597 — Animals in Groups (Batch 3, Daily Teaching System Stage D-5, 2026-11-24; science en-3-108). dk-g3.js mode 'g3-group-living'. English only. */
'use strict';
const { makeG3Type } = require('../_shared/dk-g3.js');
module.exports = makeG3Type({
  id: 'G3-597', slug: 'animals-in-groups', mode: 'g3-group-living', exerciseType: 'habitats',
  difficulty: {"1":{"animals":2},"2":{"animals":4},"3":{"animals":4,"frame":true}},
  i18n: { en: { title: "Animals in Groups", instruction: "Read about four animal groups. Write how each group works and circle how it helps." } },
});
