/**
 * verb-forms-hunt-avoid.js — Verb Forms "find the verb" (G2-338), native review 2026-10-06.
 *
 * frame: a word that IS a verb form in its sentence ("I går" = går, goes; "antes de dormir"; "fatigués"). A sentence
 *        holding one has two verbs, so it is never used on a find-the-verb page, printed or on screen (the gap faces
 *        keep it: there the extra word is harmless).
 * word:  a word that is a noun / preposition in its sentence but reads as a verb when offered ALONE ("park", "ferme",
 *        "fiets", "sig"). The screen never offers it as a wrong option. Every frame word is listed here too.
 * Words are compared lower-cased.
 */
'use strict';
const frame = {
  en: ['practice'],
  es: ['dormir', 'comer'],
  fr: ['mortes', 'fatigués'],
  pt: ['dadas', 'gelada'],
  sv: ['går', 'åt'],
  da: ['går'],
  no: ['går'],
  fi: ['kävellen', 'uimaan'],
};
const word = {
  en: ['park', 'box', 'bike', 'party', 'picnic'],
  es: ['cuento', 'recreo', 'cuidado', 'cerca'],
  fr: ['ferme'],
  it: ['porta', 'passeggiata'],
  pt: ['livro', 'casa', 'lanche', 'força', 'bebê'],
  nl: ['fiets', 'keer', 'melk', 'stil'],
  sv: ['hela'],
  da: ['sig', 'ved', 'for', 'kram'],
  no: ['klem', 'nå'],
  fi: ['kuvaa'],
};
for (const loc of Object.keys(frame)) word[loc] = [...new Set([...(word[loc] || []), ...frame[loc]])];
module.exports = { frame, word };
