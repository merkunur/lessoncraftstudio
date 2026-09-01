/** G2-267 — Mirror Pictures: House and Crown. nt20-VAR variation of G2-253 (same family: symmetry). */
'use strict';
const base = require('./G2-253-symmetry-drawing.js');
module.exports = {
  ...base,
  id: 'G2-267',
  slug: 'symmetry-house-crown',
  difficulty: { 1: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["house","crown","mushroom","apple"]}, 2: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["house","crown","mushroom","apple"]}, 3: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["house","crown","mushroom","apple"]} },
  i18n: { en: { title: "Mirror Pictures: House and Crown", instruction: "Each picture is only half done. Color the squares on the other side of the line to make it symmetrical." } },
};
