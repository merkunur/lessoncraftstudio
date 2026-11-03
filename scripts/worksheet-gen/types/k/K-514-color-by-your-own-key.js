/** K-514 — Color by Your Own Key (Color by Number maker, 2026-11-02, NEW-TEMPLATES §26 T6): numbered shapes and an OPEN key
 *  — an empty crayon square and a line beside every number. The teacher types the colours (a slot each) or leaves them
 *  blank, and the child chooses: colours the square, writes the colour, then colours every shape of that number. Nothing
 *  is graded: no answer key, no screen. K-241's engine, mode 'own'. Level 1 three numbers · 2 four · 3 five. */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-514',
  slug: 'color-by-your-own-key',
  difficulty: {
    1: { mode: 'own', codes: 3, items: 9, size: 100 },
    2: { mode: 'own', codes: 4, items: 12, size: 100 },
    3: { mode: 'own', codes: 5, items: 12, size: 100 },
  },
  i18n: { en: { title: "Color by Your Own Key", instruction: "Choose a color for each number. Color its square in the key and write the color's name. Then color the shapes." } },
};
