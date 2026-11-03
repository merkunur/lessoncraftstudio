/**
 * G2-491 — Write It Both Ways to 1000 (Number of the Day maker 2026-11-02, NEW-TEMPLATES §51 T2, the grade-2 face of
 * G1-514; 2.NBT.A.3 read and write numbers to 1000 using number names; es "números en letras del 1 al 1000", pt
 * "números por extenso até 1000"): three-digit number words to turn into numerals and numerals to write as words, no
 * bank. The words are lib/number-words-1000.js (signed by the native review 2026-11-02), the spellings a teacher also
 * accepts as alts on the screen.
 * Levels: 1 numbers 101-199 · 2 numbers 200-999 · 3 numbers with a zero digit (405, 670).
 */
'use strict';
const base = require('../g1/G1-514-write-numbers-and-words.js');

const zero = (n) => n % 10 === 0 || Math.floor(n / 10) % 10 === 0;
module.exports = {
  ...base,
  id: 'G2-491',
  slug: 'write-numbers-and-words-to-1000',
  gradeBand: 'G2',
  difficulty: {
    1: { lo: 101, hi: 199, n: 6, boxW: 500, font: 22 },
    2: { lo: 200, hi: 999, n: 6, boxW: 540, font: 21 },
    3: { lo: 101, hi: 999, n: 6, boxW: 540, font: 21, ok: (n) => zero(n) && n % 100 !== 0 },
  },
  i18n: { en: { title: 'Write It Both Ways to 1,000', instruction: 'Write each number word as a number. Write each number as a word.' } },
  build(o, ctx) { return base.build.call(this, o, ctx); },
};
