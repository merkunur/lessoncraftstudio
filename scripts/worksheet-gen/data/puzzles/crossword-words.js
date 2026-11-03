/**
 * data/puzzles/crossword-words.js — the Crossword maker's labels per language (2026-11-03): the clue list heads (across /
 * down, the words a school crossword uses), the word bank head, and «{n} letters» for the fill-in list.
 */
'use strict';
const CROSSWORD_WORDS = {
  en: { across: 'Across', down: 'Down', bank: 'Word bank', letters: '{n} letters' },
  de: { across: 'Waagerecht', down: 'Senkrecht', bank: 'Wörterliste', letters: '{n} Buchstaben' },
  fr: { across: 'Horizontalement', down: 'Verticalement', bank: 'Liste de mots', letters: '{n} lettres' },
  es: { across: 'Horizontales', down: 'Verticales', bank: 'Banco de palabras', letters: '{n} letras' },
  pt: { across: 'Horizontais', down: 'Verticais', bank: 'Banco de palavras', letters: '{n} letras' },
  it: { across: 'Orizzontali', down: 'Verticali', bank: 'Parole da usare', letters: '{n} lettere' },
  nl: { across: 'Horizontaal', down: 'Verticaal', bank: 'Woordenlijst', letters: '{n} letters' },
  sv: { across: 'Vågrätt', down: 'Lodrätt', bank: 'Ordlista', letters: '{n} bokstäver' },
  da: { across: 'Vandret', down: 'Lodret', bank: 'Ordliste', letters: '{n} bogstaver' },
  no: { across: 'Vannrett', down: 'Loddrett', bank: 'Ordliste', letters: '{n} bokstaver' },
  fi: { across: 'Vaakasuoraan', down: 'Pystysuoraan', bank: 'Sanalista', letters: '{n} kirjainta' },
};
module.exports = { CROSSWORD_WORDS };
