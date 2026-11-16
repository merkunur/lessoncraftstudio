/** G3-510 — Read the Text and the Map (info-text-g3d factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3dType } = require('../_shared/info-text-g3d.js');
module.exports = makeInfoText3dType({
  id: 'G3-510', slug: 'read-the-text-and-the-map', mode: 'map',
  i18n: { en: { title: "Read the Text and the Map", instruction: "Read the text and look at the map. Write each answer. Then put a check mark next to where you found it." } },
});
