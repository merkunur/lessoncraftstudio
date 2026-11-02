/** K-475 — Color by First Sound (Color by Number maker, 2026-11-02): a picture in every shape, the code the letter its name
 *  starts with — the reviewed first-sound bins of data/literacy/sort-by-beginning-sound.json (three letters × six pictures
 *  per language). K-241's engine, mode 'sounds'. */
'use strict';
const base = require('./K-241-color-by-code.js');
module.exports = {
  ...base,
  id: 'K-475',
  slug: 'color-by-first-sound',
  difficulty: {
    1: { mode: 'sounds', codes: 2, items: 8, size: 112 },
    2: { mode: 'sounds', codes: 3, items: 9, size: 106 },
    3: { mode: 'sounds', codes: 3, items: 12, size: 100 },
  },
  i18n: { en: { title: "Color by First Sound", instruction: "Say the name of each picture. Color the shape with the color of the letter it starts with." } },
};
