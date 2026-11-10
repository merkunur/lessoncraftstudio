/** every B&W library picture as a hero for tools/d2d-build.js --designs (docs/makers/FLAGSHIP.md) */
'use strict';
const { LINEART: ALL } = require('./designs-all.js');
const LINEART = ALL.map((d) => ({ ...d, items: [{ src: d.items[0].src, x: 300, y: 515, h: 370 }] }));
module.exports = { LINEART };
