/** G1-227 — Write the Number Words. nt20-VAR variation of G1-210 (same family: number-words). */
'use strict';
const base = require('./G1-210-number-words.js');
const { numberWord } = base;   // the family's words (nl één)
const { letterPad } = require('../../lib/letter-pad.js');
module.exports = {
  ...base,
  id: 'G1-227',
  slug: 'write-the-number-words',
  // Level Set 2026-10-13: real levels from the base table (level 2 = the published config). ⚠ a re-run of
  // tools/gen-var-specs.js would flatten them back to one config — keep this line.
  difficulty: base.levelsFor('G1-227'),
  // the screen version: the printed page, the child TYPES each word on its line (letter pad + keyboard) — a page where the
  // child writes gets a screen where the child writes (operator 2026-10-13)
  interactive: {
    kind: 'type-word', item: '[data-lcs-wbox]', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-label',
    metaAttrs: ['data-lcs-n'], instructionKey: 'write', screenHeight: 3000,
    // the pad: the locale's whole alphabet + the characters its number words use; the length cap is the PAGE's
    // (the longest word of the level's range + 3), never the answer's
    wordPad: (d, locale) => {
      const loc = String(locale || 'en').slice(0, 2);
      return letterPad(loc, Array.from({ length: d.max + 1 }, (_, i) => numberWord(i, loc)));
    },
    // INDEPENDENT oracle: the word recomputed from the stamped number by the engine
    oracle: (items, locale) => items.map((it) => {
      const n = Number((it.meta || {})['data-lcs-n']);
      if (!Number.isInteger(n)) throw new Error('number-words oracle: no number on a write box');
      return numberWord(n, String(locale || 'en').slice(0, 2));
    }),
  },
  i18n: { en: { title: "Write the Number Words", instruction: "Find the matching word in the word bank. Write it on the line." } },
};
