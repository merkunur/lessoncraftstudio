/**
 * data/spelling/look-cover.js — G1-519 Look, Cover, Write, Check (Spelling maker 2026-11-02, NEW-TEMPLATES §3 T3): the
 * column heads, literals per locale (the routine's school words: de Lernwörter "abdecken", nl woordpakket, sv veckans
 * ord, fr mots de la semaine). en = American English, es = Mexican Spanish, pt = Brazilian Portuguese.
 *   look  the word column · write  the first attempt (cover the word, write it) · again  the next attempts · check
 */
'use strict';
const LOOK_COVER = {
  en: { look: 'Look and say', write: 'Cover and write', again: 'Write it again', check: 'Check' },
  de: { look: 'Anschauen', write: 'Abdecken und schreiben', again: 'Noch einmal', check: 'Kontrolle' },
  fr: { look: 'Je regarde', write: "Je cache et j'écris", again: "J'écris encore", check: 'Je vérifie' },
  es: { look: 'Mira y lee', write: 'Tapa y escribe', again: 'Escribe otra vez', check: 'Revisa' },
  pt: { look: 'Olhe e leia', write: 'Cubra e escreva', again: 'Escreva de novo', check: 'Confira' },
  it: { look: 'Guarda e leggi', write: 'Copri e scrivi', again: 'Scrivi ancora', check: 'Controlla' },
  nl: { look: 'Kijk en lees', write: 'Dek af en schrijf', again: 'Schrijf nog eens', check: 'Controleer' },
  sv: { look: 'Titta och läs', write: 'Täck över och skriv', again: 'Skriv igen', check: 'Kontrollera' },
  da: { look: 'Se og læs', write: 'Dæk til og skriv', again: 'Skriv igen', check: 'Tjek' },
  no: { look: 'Se og les', write: 'Dekk til og skriv', again: 'Skriv igjen', check: 'Sjekk' },
  fi: { look: 'Katso ja lue', write: 'Peitä ja kirjoita', again: 'Kirjoita uudelleen', check: 'Tarkista' },
};
module.exports = { LOOK_COVER };
