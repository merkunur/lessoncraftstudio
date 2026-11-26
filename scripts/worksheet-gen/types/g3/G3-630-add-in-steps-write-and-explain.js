/** G3-630 — Halbschriftlich addieren: den Rechenweg aufschreiben und erklären (Batch E-1, Daily Teaching System Stage E, 2026-11-25; German only, new:halbschriftlich-plus-minus-bis-1000). e1-math.js mode 'e1-halb'. */
'use strict';
const { makeE1Type } = require('../_shared/e1-math.js');
module.exports = makeE1Type({
  id: 'G3-630', slug: 'add-in-steps-write-and-explain', mode: 'e1-halb', exerciseType: 'number-lines', gradeBand: 'G3',
  i18n: { en: { title: "Adding in Steps: Write and Explain Your Way", instruction: "Add in steps: first the hundreds, then the tens, then the ones. Draw the jumps on the empty number line and write each step as a sum. Explain below how you worked out the last task." } },
});
