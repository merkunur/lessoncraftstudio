/** G2-268 — Mirror Below the Line (nt20-VAR): horizontal-axis symmetry.
 * The figures are rotated 90° by sym-grid's axis:'h' mode, so the child
 * mirrors DOWNWARD across a horizontal coral line — the second reflection
 * axis the curriculum asks for, on the four figures no other symmetry page
 * uses (robot, arrow, ice-cream, snowman). */
'use strict';
const base = require('./G2-253-symmetry-drawing.js');
const D = { cards: 4, cols: 2, rows: 2, cell: 24, axis: 'h', figures: ['rocket', 'arrow', 'ice-cream', 'robot'] };
module.exports = {
  ...base,
  id: 'G2-268',
  slug: 'symmetry-horizontal-mirror',
  difficulty: { 1: { ...D }, 2: { ...D }, 3: { ...D } },
  i18n: {
    en: {
      title: 'Mirror Below the Line',
      instruction: 'Each picture is only half done. Color the squares below the line to make it symmetrical.',
    },
  },
};
