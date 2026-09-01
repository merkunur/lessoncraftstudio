/** G2-266 — Mirror Pictures: Heart and Butterfly. nt20-VAR variation of G2-253 (same family: symmetry). */
'use strict';
const base = require('./G2-253-symmetry-drawing.js');
module.exports = {
  ...base,
  id: 'G2-266',
  slug: 'symmetry-hearts-butterflies',
  difficulty: { 1: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["heart","butterfly","snowman","tree"]}, 2: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["heart","butterfly","snowman","tree"]}, 3: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["heart","butterfly","snowman","tree"]} },
  i18n: { en: { title: "Mirror Pictures: Heart and Butterfly", instruction: "Each picture is only half done. Color the squares on the other side of the line to make it symmetrical." } },
};
