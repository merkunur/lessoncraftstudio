/**
 * data/word-problems/two-step-frames.js — two-step stories (Word Problems maker 2026-11-02, NEW-TEMPLATES §50 T2;
 * 2.OA.A.1), literals per locale, read by a native + pedagogy review. Four step pairs: A + then − · B − then + · C + then +
 * · D − then −. Slots as the published frames (lib/word-problems-levelset.js fill): {name} {name2} {n1} {n2} {n3} {noun}
 * ({noun} = the bank's form after a number: the plural, fi the partitive), {Q} the "how many" that agrees with the noun
 * (es / pt / it); {name3} (D) a third child, filled by G2-489 before fill. A name is never inflected and never needs a
 * pronoun (no gender to guess).
 * Review 2026-11-02: C was "finds … in the morning, at lunch and in the evening" (32 rockets found; whole mangoes found)
 * — now "has some, gets more on Monday and more on Tuesday", true of any noun; D gave toys to Grandma — now to a third
 * child; fr "en remet" / it "ne rimette" (put BACK more than was taken out) → "en ajoute" / "ne aggiunge"; pt "dá" and
 * "coloca" without an object or a place.
 */
'use strict';
const NN = ' ';
const TWO_STEP = {
  en: {
    A: '{name} has {n1} {noun}. {name} gets {n2} more. Then {name} gives {n3} away. How many {noun} does {name} have now?',
    B: 'There are {n1} {noun} in a box. {name} takes out {n2}. Then {name} puts in {n3}. How many {noun} are in the box now?',
    C: '{name} has {n1} {noun}. On Monday {name} gets {n2} more, and on Tuesday {n3} more. How many {noun} does {name} have now?',
    D: '{name} has {n1} {noun}. {name} gives {n2} to {name2} and {n3} to {name3}. How many {noun} does {name} have left?',
  },
  de: {
    A: '{name} hat {n1} {noun}. {name} bekommt {n2} dazu. Dann verschenkt {name} {n3}. Wie viele {noun} hat {name} jetzt?',
    B: 'In einer Kiste sind {n1} {noun}. {name} nimmt {n2} heraus. Dann legt {name} {n3} hinein. Wie viele {noun} sind jetzt in der Kiste?',
    C: '{name} hat {n1} {noun}. Am Montag bekommt {name} {n2} dazu und am Dienstag noch {n3}. Wie viele {noun} hat {name} jetzt?',
    D: '{name} hat {n1} {noun}. {name} schenkt {name2} {n2} und {name3} {n3}. Wie viele {noun} hat {name} noch?',
  },
  fr: {
    A: `{name} a {n1} {noun}. {name} en reçoit {n2} de plus. Puis {name} en donne {n3}. Combien de {noun} a {name} maintenant${NN}?`,
    B: `Il y a {n1} {noun} dans une boîte. {name} en sort {n2}. Puis {name} en ajoute {n3}. Combien de {noun} y a-t-il maintenant dans la boîte${NN}?`,
    C: `{name} a {n1} {noun}. Lundi, {name} en reçoit {n2} de plus, et mardi, encore {n3}. Combien de {noun} a {name} maintenant${NN}?`,
    D: `{name} a {n1} {noun}. {name} en donne {n2} à {name2} et {n3} à {name3}. Combien de {noun} reste-t-il à {name}${NN}?`,
  },
  es: {
    A: '{name} tiene {n1} {noun}. Le dan {n2} más. Después regala {n3}. ¿{Q} {noun} tiene {name} ahora?',
    B: 'En una caja hay {n1} {noun}. {name} saca {n2}. Después mete {n3}. ¿{Q} {noun} hay ahora en la caja?',
    C: '{name} tiene {n1} {noun}. El lunes le dan {n2} más y el martes, {n3} más. ¿{Q} {noun} tiene {name} ahora?',
    D: '{name} tiene {n1} {noun}. Le da {n2} a {name2} y {n3} a {name3}. ¿{Q} {noun} le quedan a {name}?',
  },
  pt: {
    A: '{name} tem {n1} {noun}. Ganha mais {n2}. Depois dá {n3} para um amigo. {Q} {noun} {name} tem agora?',
    B: 'Em uma caixa há {n1} {noun}. {name} tira {n2}. Depois coloca {n3} na caixa. {Q} {noun} há agora na caixa?',
    C: '{name} tem {n1} {noun}. Na segunda-feira ganha mais {n2} e, na terça-feira, mais {n3}. {Q} {noun} {name} tem agora?',
    D: '{name} tem {n1} {noun}. Dá {n2} para {name2} e {n3} para {name3}. {Q} {noun} sobram para {name}?',
  },
  it: {
    A: '{name} ha {n1} {noun}. Poi riceve ancora {n2} {noun}. Dopo ne regala {n3}. {Q} {noun} ha adesso {name}?',
    B: 'In una scatola ci sono {n1} {noun}. {name} ne toglie {n2}. Poi ne aggiunge {n3}. {Q} {noun} ci sono adesso nella scatola?',
    C: '{name} ha {n1} {noun}. Lunedì ne riceve ancora {n2} e martedì ancora {n3}. {Q} {noun} ha adesso {name}?',
    D: '{name} ha {n1} {noun}. Ne regala {n2} a {name2} e {n3} a {name3}. {Q} {noun} restano a {name}?',
  },
  nl: {
    A: '{name} heeft {n1} {noun}. {name} krijgt er {n2} bij. Dan geeft {name} er {n3} weg. Hoeveel {noun} heeft {name} nu?',
    B: 'In een doos zitten {n1} {noun}. {name} haalt er {n2} uit. Dan doet {name} er {n3} in. Hoeveel {noun} zitten er nu in de doos?',
    C: '{name} heeft {n1} {noun}. Op maandag krijgt {name} er {n2} bij en op dinsdag nog {n3}. Hoeveel {noun} heeft {name} nu?',
    D: '{name} heeft {n1} {noun}. {name} geeft er {n2} aan {name2} en {n3} aan {name3}. Hoeveel {noun} heeft {name} nog over?',
  },
  sv: {
    A: '{name} har {n1} {noun}. {name} får {n2} till. Sedan ger {name} bort {n3}. Hur många {noun} har {name} nu?',
    B: 'I en låda finns det {n1} {noun}. {name} tar ut {n2}. Sedan lägger {name} i {n3}. Hur många {noun} finns det i lådan nu?',
    C: '{name} har {n1} {noun}. På måndagen får {name} {n2} till och på tisdagen {n3} till. Hur många {noun} har {name} nu?',
    D: '{name} har {n1} {noun}. {name} ger {n2} till {name2} och {n3} till {name3}. Hur många {noun} har {name} kvar?',
  },
  da: {
    A: '{name} har {n1} {noun}. {name} får {n2} mere. Så giver {name} {n3} væk. Hvor mange {noun} har {name} nu?',
    B: 'Der er {n1} {noun} i en kasse. {name} tager {n2} op. Så lægger {name} {n3} i. Hvor mange {noun} er der nu i kassen?',
    C: '{name} har {n1} {noun}. Mandag får {name} {n2} mere, og tirsdag får {name} {n3} mere. Hvor mange {noun} har {name} nu?',
    D: '{name} har {n1} {noun}. {name} giver {n2} til {name2} og {n3} til {name3}. Hvor mange {noun} har {name} tilbage?',
  },
  no: {
    A: '{name} har {n1} {noun}. {name} får {n2} til. Så gir {name} bort {n3}. Hvor mange {noun} har {name} nå?',
    B: 'Det er {n1} {noun} i en kasse. {name} tar ut {n2}. Så legger {name} oppi {n3}. Hvor mange {noun} er det i kassen nå?',
    C: '{name} har {n1} {noun}. På mandag får {name} {n2} til, og på tirsdag får {name} {n3} til. Hvor mange {noun} har {name} nå?',
    D: '{name} har {n1} {noun}. {name} gir {n2} til {name2} og {n3} til {name3}. Hvor mange {noun} har {name} igjen?',
  },
  fi: {
    A: '{name} saa ensin {n1} {noun} ja sitten vielä {n2} {noun}. Sen jälkeen {name} antaa pois {n3}. Kuinka monta {noun} jää jäljelle?',
    B: 'Laatikossa on {n1} {noun}. {name} ottaa pois {n2}. Sitten {name} laittaa laatikkoon {n3}. Kuinka monta {noun} laatikossa on nyt?',
    C: '{name} saa maanantaina {n1} {noun}, tiistaina {n2} ja keskiviikkona {n3}. Kuinka monta {noun} {name} saa yhteensä?',
    D: 'Pöydällä on {n1} {noun}. {name} vie niistä {n2} ja {name2} vie {n3}. Kuinka monta {noun} pöydälle jää?',
  },
};
// the operations of each step pair: [first, second]
const STEPS = { A: ['+', '−'], B: ['−', '+'], C: ['+', '+'], D: ['−', '−'] };

module.exports = { TWO_STEP, STEPS };
