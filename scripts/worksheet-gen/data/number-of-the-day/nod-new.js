/**
 * data/number-of-the-day/nod-new.js — the Number of the Day maker's new templates' own words (2026-11-02,
 * NEW-TEMPLATES §51), literals per locale, read by a native + pedagogy review.
 *   NOD1000  the card labels of G2-490 Number of the Day to 1000 (the three-digit routine page): the place-value chart
 *            (its column heads: hundreds here, tens / ones from data/b2/labels.js — the head form, fi sadat, never the
 *            after-a-number form «satasta»), expanded form,
 *            100 / 10 more and less, before and after, even or odd (data/parity-words.json), the neighbour tens and
 *            hundreds ("Nachbarzehner", "encadrer"), the number in words; numberWord / beforeAfter (when set) replace
 *            the shared G1-243 label on this page (es "con letra", pt antecessor / sucessor, it precedente / successivo)
 * en = American English, es = Mexican Spanish, pt = Brazilian Portuguese.
 */
'use strict';
const NN = ' ';
const NOD1000 = {
  en: { hundreds: 'hundreds', placeValue: 'Hundreds, tens, and ones', expanded: 'Expanded form', more100: '100 more, 100 less', more10: '10 more, 10 less', parity: 'Even or odd? Circle one.', between: 'Between which tens and hundreds?' },
  de: { hundreds: 'Hunderter', placeValue: 'Hunderter, Zehner und Einer', expanded: 'Zerlege die Zahl', more100: '100 mehr, 100 weniger', more10: '10 mehr, 10 weniger', parity: 'Gerade oder ungerade? Kreise ein.', between: 'Nachbarzehner und Nachbarhunderter' },
  fr: { hundreds: 'centaines', placeValue: 'Centaines, dizaines et unités', expanded: 'Décompose le nombre', more100: '100 de plus, 100 de moins', more10: '10 de plus, 10 de moins', parity: `Pair ou impair${NN}? Entoure.`, between: 'Encadre entre deux dizaines, puis entre deux centaines' },
  es: { numberWord: 'Escribe el número con letra', hundreds: 'centenas', placeValue: 'Centenas, decenas y unidades', expanded: 'Descompón el número', more100: '100 más, 100 menos', more10: '10 más, 10 menos', parity: '¿Par o impar? Encierra la respuesta.', between: '¿Entre qué decenas y centenas está?' },
  pt: { beforeAfter: 'Antecessor e sucessor', hundreds: 'centenas', placeValue: 'Centenas, dezenas e unidades', expanded: 'Decomponha o número', more100: '100 a mais, 100 a menos', more10: '10 a mais, 10 a menos', parity: 'Par ou ímpar? Circule.', between: 'Entre quais dezenas e centenas ele está?' },
  it: { beforeAfter: 'Precedente e successivo', hundreds: 'centinaia', placeValue: 'Centinaia, decine e unità', expanded: 'Scomponi il numero', more100: '100 in più, 100 in meno', more10: '10 in più, 10 in meno', parity: 'Pari o dispari? Cerchia.', between: 'Tra quali decine e centinaia si trova?' },
  nl: { hundreds: 'honderdtallen', placeValue: 'Honderdtallen, tientallen en eenheden', expanded: 'Splits het getal', more100: '100 meer, 100 minder', more10: '10 meer, 10 minder', parity: 'Even of oneven? Omcirkel.', between: 'Tussen welke tientallen en honderdtallen?' },
  sv: { hundreds: 'hundratal', placeValue: 'Hundratal, tiotal och ental', expanded: 'Dela upp talet', more100: '100 mer, 100 mindre', more10: '10 mer, 10 mindre', parity: 'Jämnt eller udda? Ringa in.', between: 'Mellan vilka tiotal och hundratal?' },
  da: { hundreds: 'hundreder', placeValue: 'Hundreder, tiere og enere', expanded: 'Del tallet op', more100: '100 mere, 100 mindre', more10: '10 mere, 10 mindre', parity: 'Lige eller ulige? Sæt ring om.', between: 'Mellem hvilke tiere og hundreder?' },
  no: { hundreds: 'hundrere', placeValue: 'Hundrere, tiere og enere', expanded: 'Del opp tallet', more100: '100 mer, 100 mindre', more10: '10 mer, 10 mindre', parity: 'Partall eller oddetall? Sett ring rundt.', between: 'Mellom hvilke tiere og hundrere?' },
  fi: { hundreds: 'sadat', placeValue: 'Sadat, kympit ja ykköset', expanded: 'Jaa luku osiin', more100: '100 enemmän, 100 vähemmän', more10: '10 enemmän, 10 vähemmän', parity: 'Parillinen vai pariton? Ympyröi.', between: 'Minkä kymppien ja satojen välissä luku on?' },
};
module.exports = { NOD1000 };
