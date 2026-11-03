/**
 * data/ordinal-numbers/shelf.js — K-558 Which Shelf? (Ordinal Numbers maker 2026-11-02, NEW-TEMPLATES §52 T2): the
 * questions, literals per locale (the ordinal agrees with the shelf noun: de dative "im dritten Fach", fr / es / pt the
 * feminine "troisième étagère / tercera repisa / terceira prateleira", fi the adessive "kolmannella hyllyllä").
 * A bookcase, not the floors of a house: which floor is the "first" differs by country (en-US first floor = the ground
 * floor; de erster Stock = one up), a shelf has no such trap — the sheet says "count from the bottom".
 *   what[k]  "What is on the k-th shelf?" (k 1..6)   which  "Which shelf?" (a picture beside it)
 *   fem      the shelf noun is feminine: its written ordinals take the feminine form (fr 1re étagère, es 1.ª repisa,
 *            pt 1ª prateleira)
 * en = American English, es = Mexican Spanish, pt = Brazilian Portuguese.
 */
'use strict';
const NN = ' ';
const SHELF = {
  en: { what: ['', 'What is on the first shelf?', 'What is on the second shelf?', 'What is on the third shelf?', 'What is on the fourth shelf?', 'What is on the fifth shelf?', 'What is on the sixth shelf?'], which: 'Which shelf?' },
  de: { what: ['', 'Was steht im ersten Fach?', 'Was steht im zweiten Fach?', 'Was steht im dritten Fach?', 'Was steht im vierten Fach?', 'Was steht im fünften Fach?', 'Was steht im sechsten Fach?'], which: 'In welchem Fach?' },
  fr: { fem: true, what: ['', `Qu'y a-t-il sur la première étagère${NN}?`, `Qu'y a-t-il sur la deuxième étagère${NN}?`, `Qu'y a-t-il sur la troisième étagère${NN}?`, `Qu'y a-t-il sur la quatrième étagère${NN}?`, `Qu'y a-t-il sur la cinquième étagère${NN}?`, `Qu'y a-t-il sur la sixième étagère${NN}?`], which: `Sur quelle étagère${NN}?` },
  es: { fem: true, what: ['', '¿Qué hay en la primera repisa?', '¿Qué hay en la segunda repisa?', '¿Qué hay en la tercera repisa?', '¿Qué hay en la cuarta repisa?', '¿Qué hay en la quinta repisa?', '¿Qué hay en la sexta repisa?'], which: '¿En qué repisa?' },
  pt: { fem: true, what: ['', 'O que tem na primeira prateleira?', 'O que tem na segunda prateleira?', 'O que tem na terceira prateleira?', 'O que tem na quarta prateleira?', 'O que tem na quinta prateleira?', 'O que tem na sexta prateleira?'], which: 'Em qual prateleira?' },
  it: { what: ['', "Che cosa c'è sul primo ripiano?", "Che cosa c'è sul secondo ripiano?", "Che cosa c'è sul terzo ripiano?", "Che cosa c'è sul quarto ripiano?", "Che cosa c'è sul quinto ripiano?", "Che cosa c'è sul sesto ripiano?"], which: 'Su quale ripiano?' },
  nl: { what: ['', 'Wat staat er op de eerste plank?', 'Wat staat er op de tweede plank?', 'Wat staat er op de derde plank?', 'Wat staat er op de vierde plank?', 'Wat staat er op de vijfde plank?', 'Wat staat er op de zesde plank?'], which: 'Op welke plank?' },
  sv: { what: ['', 'Vad finns på första hyllan?', 'Vad finns på andra hyllan?', 'Vad finns på tredje hyllan?', 'Vad finns på fjärde hyllan?', 'Vad finns på femte hyllan?', 'Vad finns på sjätte hyllan?'], which: 'Vilken hylla?' },
  da: { what: ['', 'Hvad er der på første hylde?', 'Hvad er der på anden hylde?', 'Hvad er der på tredje hylde?', 'Hvad er der på fjerde hylde?', 'Hvad er der på femte hylde?', 'Hvad er der på sjette hylde?'], which: 'Hvilken hylde?' },
  no: { what: ['', 'Hva er på første hylle?', 'Hva er på andre hylle?', 'Hva er på tredje hylle?', 'Hva er på fjerde hylle?', 'Hva er på femte hylle?', 'Hva er på sjette hylle?'], which: 'Hvilken hylle?' },
  fi: { what: ['', 'Mitä on ensimmäisellä hyllyllä?', 'Mitä on toisella hyllyllä?', 'Mitä on kolmannella hyllyllä?', 'Mitä on neljännellä hyllyllä?', 'Mitä on viidennellä hyllyllä?', 'Mitä on kuudennella hyllyllä?'], which: 'Millä hyllyllä?' },
};
module.exports = { SHELF };
