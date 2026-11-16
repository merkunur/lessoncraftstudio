/** G3-511 — Read the Text and Diagram (info-text-g3d factory; English literacy year 2026-11-16) */
'use strict';
const { makeInfoText3dType } = require('../_shared/info-text-g3d.js');
module.exports = makeInfoText3dType({
  id: 'G3-511', slug: 'read-the-text-and-diagram', mode: 'diagram',
  i18n: { en: { title: "Read the Text and Diagram", instruction: "Read the text and look at the diagram. Write each answer. Then put a check mark next to where you found it." } },
});
