/** G2-265 — Hard Symmetry Drawing. nt20-VAR variation of G2-253 (same family: symmetry). */
'use strict';
const base = require('./G2-253-symmetry-drawing.js');
module.exports = {
  ...base,
  id: 'G2-265',
  slug: 'symmetry-drawing-hard',
  difficulty: { 1: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["ladybug","owl","sailboat","cactus"]}, 2: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["ladybug","owl","sailboat","cactus"]}, 3: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["ladybug","owl","sailboat","cactus"]} },
  i18n: { en: { title: "Hard Symmetry Drawing", instruction: "Each picture is only half done. Color the squares on the other side of the line to make it symmetrical." } },
};
