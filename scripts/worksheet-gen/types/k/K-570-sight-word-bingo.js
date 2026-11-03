/**
 * K-570 — Sight Word Bingo (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the sight-word list (lib/sight-words-levelset.js). Levels: 1 words 1-20, 3×3 · 2 words 1-30, 4×4 · 3 words 11-34, 4×4, the caller card adds a sentence with the word.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-570', slug: 'sight-word-bingo', gradeBand: 'K', content: 'sight',
  D: { 1: { g: 3, perPage: 4, from: 1, to: 20 }, 2: { g: 4, perPage: 1, from: 1, to: 30 }, 3: { g: 4, perPage: 1, from: 11, to: 34, sentence: true } },
  i18n: { en: { title: "Sight Word Bingo", instruction: "Listen to each word. If the word is on your card, mark it. Mark a whole line across, down or corner to corner, then shout \"Bingo!\"" } },
});
