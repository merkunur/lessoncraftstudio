/**
 * K-571 — Letter Sound Bingo (Bingo maker 2026-11-03, NEW-TEMPLATES §60; types/_shared/bingo.js): the letters that have a reviewed first-sound picture on the card; the caller card shows the picture and its word, the child listens for the first sound (RF.K.3.a). Levels (3×3 — a language keeps 17-21 letters once letters with the same first sound are left to one): 1 capitals · 2 small letters · 3 both, mixed on one card.
 */
'use strict';
const { makeBingo } = require('../_shared/bingo.js');

module.exports = makeBingo({
  id: 'K-571', slug: 'letter-sound-bingo', gradeBand: 'K', content: 'letters',
  D: { 1: { g: 3, perPage: 4 }, 2: { g: 3, perPage: 4, lower: true }, 3: { g: 3, perPage: 4, mixed: true } },
  i18n: { en: { title: "Letter Sound Bingo", instruction: "Listen to each word and its first sound. If the letter for that sound is on your card, mark it. Mark a whole line across, down or corner to corner, then shout \"Bingo!\"" } },
});
