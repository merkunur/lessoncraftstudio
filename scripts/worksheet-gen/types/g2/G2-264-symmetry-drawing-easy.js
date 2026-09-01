/** G2-264 — Easy Symmetry Drawing. nt20-VAR variation of G2-253 (same family: symmetry). */
'use strict';
const base = require('./G2-253-symmetry-drawing.js');
module.exports = {
  ...base,
  id: 'G2-264',
  slug: 'symmetry-drawing-easy',
  difficulty: { 1: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["umbrella","tulip","sun","crab"]}, 2: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["umbrella","tulip","sun","crab"]}, 3: {"cards":4,"cols":2,"rows":2,"cell":26,"figures":["umbrella","tulip","sun","crab"]} },
  i18n: { en: { title: "Easy Symmetry Drawing", instruction: "Each picture is only half done. Color the squares on the other side of the line to make it symmetrical." } },
};
