/**
 * Fraction words per locale (Fractions maker, 2026-11-01; types/_shared/fr-more.js):
 *   parts   "{n} equal parts" — the label on the partition cards
 *   words   the fraction words matched to pictures: 1/2, 1/3, 2/3, 1/4, 3/4 (2/4 is never used: it is also one half)
 * en = American English (CCSS "fourths"), es = Mexican Spanish, pt = Brazilian Portuguese. Native + pedagogy review:
 * BUILD-LOG.
 */
'use strict';
const FRACTION_WORDS = {
  en: { parts: '{n} equal parts', words: { '1/2': 'one half', '1/3': 'one third', '2/3': 'two thirds', '1/4': 'one fourth', '3/4': 'three fourths' } },
  de: { parts: '{n} gleich große Teile', words: { '1/2': 'ein Halbes', '1/3': 'ein Drittel', '2/3': 'zwei Drittel', '1/4': 'ein Viertel', '3/4': 'drei Viertel' } },
  fr: { parts: '{n} parts égales', words: { '1/2': 'un demi', '1/3': 'un tiers', '2/3': 'deux tiers', '1/4': 'un quart', '3/4': 'trois quarts' } },
  es: { parts: '{n} partes iguales', words: { '1/2': 'un medio', '1/3': 'un tercio', '2/3': 'dos tercios', '1/4': 'un cuarto', '3/4': 'tres cuartos' } },
  pt: { parts: '{n} partes iguais', words: { '1/2': 'um meio', '1/3': 'um terço', '2/3': 'dois terços', '1/4': 'um quarto', '3/4': 'três quartos' } },
  it: { parts: '{n} parti uguali', words: { '1/2': 'un mezzo', '1/3': 'un terzo', '2/3': 'due terzi', '1/4': 'un quarto', '3/4': 'tre quarti' } },
  nl: { parts: '{n} gelijke delen', words: { '1/2': 'een half', '1/3': 'een derde', '2/3': 'twee derde', '1/4': 'een kwart', '3/4': 'drie kwart' } },
  sv: { parts: '{n} lika stora delar', words: { '1/2': 'en halv', '1/3': 'en tredjedel', '2/3': 'två tredjedelar', '1/4': 'en fjärdedel', '3/4': 'tre fjärdedelar' } },
  da: { parts: '{n} lige store dele', words: { '1/2': 'en halv', '1/3': 'en tredjedel', '2/3': 'to tredjedele', '1/4': 'en fjerdedel', '3/4': 'tre fjerdedele' } },
  no: { parts: '{n} like store deler', words: { '1/2': 'en halv', '1/3': 'en tredjedel', '2/3': 'to tredjedeler', '1/4': 'en firedel', '3/4': 'tre firedeler' } },
  fi: { parts: '{n} yhtä suurta osaa', words: { '1/2': 'puolikas', '1/3': 'kolmasosa', '2/3': 'kaksi kolmasosaa', '1/4': 'neljäsosa', '3/4': 'kolme neljäsosaa' } },
};
module.exports = { FRACTION_WORDS };
