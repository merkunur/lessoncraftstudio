/**
 * dh-instructions.js — PRINTED instructions (and, where the face title names a range the level passes, the title) of
 * the Doubles and Halves Level Set levels whose page differs from the face's published one (Level Set 2026-10-07).
 * Native + teaching review 2026-10-07 applied. Merged into i18n/level-instructions.json by apply-dh-instructions.js.
 *   level 3 (harder): think backwards — a double card shows ▢ + ▢ = 14 and the WHOLE group unsplit (find the number
 *   that was doubled), a half card shows ▢ = 7 + 7 and ONE half (find the number the halves came from)
 *   level 1 (easier): where the published line names a range or a card count the easier page does not reach
 * A value is a string (instruction) or { title, instruction }. Locales left out keep the face's published line.
 */
'use strict';
const HALVES_BACK = {
  en: 'The two halves are already written. Write the number they came from.',
  de: 'Die zwei Hälften stehen schon da. Schreibe die Zahl, aus der sie entstanden sind, ins Kästchen.',
  es: 'Ya están las dos mitades: escribe el número del que salen.',
  fr: 'Les deux moitiés sont déjà écrites : écris le nombre de départ.',
  it: 'Le due metà sono già scritte: scrivi il numero di partenza.',
  pt: 'As duas metades já estão escritas: escreva o número de onde vieram.',
  nl: 'De twee gelijke helften staan er al. Schrijf in het vakje hoeveel het samen is.',
  sv: 'De två lika delarna står redan där. Skriv talet de kommer från i rutan.',
  da: 'De to lige store halvdele står der allerede. Skriv det tal, de kommer fra, i feltet.',
  no: 'De to like halvpartene står der allerede. Skriv tallet de kommer fra, i ruten.',
  fi: 'Kaksi yhtä suurta puolikasta on jo valmiina. Kirjoita koko luku laatikkoon.',
};
const DOUBLES_BACK = {
  en: 'The double is already written. Write the number that was doubled in both boxes.',
  de: 'Das Doppelte steht schon da. Schreibe die Zahl, die verdoppelt wurde, in beide Kästchen.',
  es: 'Ya está el doble: escribe en las dos casillas el número que se dobló.',
  fr: 'Le double est déjà écrit : écris dans les deux cases le nombre qui a été doublé.',
  it: 'Il doppio è già scritto: scrivi in tutti e due i riquadri il numero che è stato raddoppiato.',
  pt: 'O dobro já está escrito: escreva nos dois quadradinhos o número que foi dobrado.',
  nl: 'Het dubbele staat er al. Schrijf het getal dat verdubbeld is in allebei de vakjes.',
  sv: 'Dubbelt står redan där. Skriv talet som dubblades i båda rutorna.',
  da: 'Det dobbelte står der allerede. Skriv det tal, der blev fordoblet, i begge felter.',
  no: 'Det dobbelte står der allerede. Skriv tallet som ble doblet, i begge rutene.',
  fi: 'Tupla on jo valmiina. Kirjoita kumpaankin laatikkoon luku, joka tuplattiin.',
};
const NO_PIC = { en: 'No pictures. ', de: 'Ohne Bilder: ', es: 'Sin dibujos: ', fr: 'Sans image : ', it: 'Solo numeri: ', pt: 'Sem figuras: ', nl: 'Geen plaatjes: ', sv: 'Inga bilder: ', da: 'Ingen billeder: ', no: 'Ingen bilder: ', fi: 'Ei kuvia. ' };
const lower = (loc, s) => (['en', 'fi'].includes(loc) ? s : s.charAt(0).toLocaleLowerCase(loc) + s.slice(1));
const noPic = (base) => Object.fromEntries(Object.entries(base).map(([l, s]) => [l, NO_PIC[l] + (NO_PIC[l].endsWith(': ') ? lower(l, s) : s)]));

module.exports = {
  'G1-270': {
    // pt published line names the published range (to 8); nl published line asked for both moves on each card (fixed
    // in strings.nl.json for every level, the published page republished); fr title names "jusqu'à 8"
    1: { pt: 'Conte as figuras: o dobro e a metade vão até 6.' },
    3: { pt: 'Conte as figuras: o dobro e a metade vão até 10.', fr: { title: "Doubles et moitiés jusqu'à 10", instruction: "Double ou partage les groupes d'images." } },
  },
  'G1-271': {
    1: {
      en: 'Numbers only this time. Work out each double and half up to 10.',
      de: 'Ohne Bilder: verdopple und halbiere bis 10.',
      pt: 'Sem figuras: dobros e metades até 10.',
      nl: 'Nu zonder plaatjes: verdubbel en halveer de getallen tot 10.',
      da: 'Nu er der kun tal. Find det dobbelte og det halve op til 10.',
      fi: 'Nyt vain luvut. Laske tuplat ja puolet 10:een asti.',
    },
    3: {
      en: 'Numbers only. Think backwards: find the number that was doubled, or the number that was halved.',
      de: 'Ohne Bilder, rückwärts gedacht: Welche Zahl wurde verdoppelt? Welche Zahl wurde halbiert?',
      es: 'Sin dibujos, piensa al revés: ¿qué número se dobló? ¿De qué número es la mitad?',
      fr: "Sans image, à l'envers : quel nombre a-t-on doublé ? De quel nombre est-ce la moitié ?",
      it: 'Senza immagini, al contrario: quale numero è stato raddoppiato? Di quale numero è la metà?',
      pt: 'Sem figuras, pense ao contrário: que número foi dobrado? De que número é a metade?',
      nl: 'Zonder plaatjes, andersom: welk getal is verdubbeld? Van welk getal is dit de helft?',
      sv: 'Inga bilder, tänk baklänges: vilket tal har dubblats? Vilket tal är det hälften av?',
      da: 'Kun tal, og tænk baglæns: Hvilket tal er fordoblet? Hvilket tal er halveret?',
      no: 'Bare tall, og tenk baklengs: Hvilket tall er doblet? Hvilket tall er det halvparten av?',
      fi: 'Vain lukuja. Ajattele toisin päin: mikä luku tuplattiin? Minkä luvun puolikas tämä on?',
    },
  },
  'G1-286': {
    1: { de: 'Zähle die Bilder: verdopple oder halbiere bis 12.', es: 'Algunas tarjetas piden el doble y otras, la mitad.' },
    3: {
      en: 'Think backwards: find the number that was doubled, or the whole group the two halves came from.',
      de: 'Rückwärts gedacht: Welche Zahl wurde verdoppelt? Wie groß war die ganze Menge vor dem Halbieren?',
      es: 'Piensa al revés: ¿qué número se dobló? ¿Cuántos había antes de partir el grupo?',
      fr: "À l'envers : quel nombre a-t-on doublé ? Combien y avait-il avant le partage ?",
      it: 'Al contrario: quale numero è stato raddoppiato? Quanti erano prima di dividere il gruppo?',
      pt: 'Pense ao contrário: que número foi dobrado? Quantos havia antes de dividir o grupo?',
      nl: 'Andersom: welk getal is verdubbeld? Hoe groot was de hele groep voor het halveren?',
      sv: 'Tänk baklänges: vilket tal har dubblats? Hur många var det innan gruppen delades?',
      da: 'Tænk baglæns: Hvilket tal er fordoblet? Hvor mange var der, før gruppen blev delt?',
      no: 'Tenk baklengs: Hvilket tall er doblet? Hvor mange var det før gruppen ble delt?',
      fi: 'Ajattele toisin päin: mikä luku tuplattiin? Montako kuvaa ryhmässä oli ennen puolittamista?',
    },
  },
  'G1-287': { 3: DOUBLES_BACK },
  'G1-288': { 3: HALVES_BACK },
  'G1-296': {
    1: {
      en: 'Groups of pictures to double, up to 12.', de: 'Mengen zum Verdoppeln bis 12.', es: 'Se doblan grupos de tres a seis.',
      it: 'Gruppi da raddoppiare: fino a 12.', nl: 'Groepen plaatjes om te verdubbelen, tot 12.', sv: 'Bildgrupper att dubbla, upp till 12.',
      da: 'Fordobl grupperne, op til 12.', no: 'Nå skal du doble grupper, opp til tolv.',
    },
    3: DOUBLES_BACK,
  },
  'G1-297': {
    1: {
      en: 'Groups of pictures to halve, up to twelve.', de: 'Mengen zum Halbieren bis 12.', es: 'Se parten grupos de seis a doce.',
      nl: 'Groepen plaatjes om te halveren, tot 12.', sv: 'Halvera bildgrupper, upp till 12.', da: 'Halvér grupperne, op til 12.',
      no: 'Grupper av bilder å halvere, opp til tolv.',
    },
    3: HALVES_BACK,
  },
  'G1-298': { 1: { es: 'Sin dibujos que contar: solo dobles hasta 12.' }, 3: noPic(DOUBLES_BACK) },
  'G1-299': { 3: noPic(HALVES_BACK) },
};
