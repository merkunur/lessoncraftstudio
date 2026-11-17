/** G1-619 — Write My Opinion (writing-g1 factory; English literacy year 2026-11-18) */
'use strict';
const { makeWritingG1Type } = require('../_shared/writing-g1.js');
module.exports = makeWritingG1Type({
  id: 'G1-619', slug: 'write-my-opinion', mode: 'opwrite', exerciseType: 'sentence-building',
  i18n: { en: { title: "Write My Opinion", instruction: "Name your topic, tell what you think and why, and end your piece." } },
});
