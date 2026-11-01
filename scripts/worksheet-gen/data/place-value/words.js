/**
 * Place-value words per locale (Place Value maker, 2026-11-01; types/_shared/pv-more.js):
 *   units   the unit words after a count ≥ 2 (34 tens / 34 Zehner / 34 dizaines …)
 *   iam     the riddle's last line before the answer box ("I am [ ]")
 *   riddle  the clue frames; {t} tens, {o} ones, {h} hundreds, {k} a difference, {a}/{b} the bounds, {s} the digit sum.
 *           A frame a locale cannot say naturally is left out (the clue is then never drawn there), never approximated.
 * en = American English, es = Mexican Spanish, pt = Brazilian Portuguese. Native + pedagogy review: see BUILD-LOG.
 */
'use strict';
const PV_WORDS = {
  en: {
    units: { tens: 'tens', hundreds: 'hundreds' }, iam: 'I am',
    riddle: { tensDigit: "My tens digit is {t}.", onesDigit: "My ones digit is {o}.", tens: 'I have {t} tens.', ones: 'I have {o} ones.', hundreds: 'I have {h} hundreds.', onesMore: 'My ones digit is {k} more than my tens digit.', onesLess: 'My ones digit is {k} less than my tens digit.', between: 'I am between {a} and {b}.', even: 'I am even.', odd: 'I am odd.', digitSum: 'My digits add up to {s}.' },
  },
  de: {
    units: { tens: 'Zehner', hundreds: 'Hunderter' }, iam: 'Ich bin',
    riddle: { tensDigit: "Meine Zehnerziffer ist {t}.", onesDigit: "Meine Einerziffer ist {o}.", tens: 'Ich habe {t} Zehner.', ones: 'Ich habe {o} Einer.', hundreds: 'Ich habe {h} Hunderter.', onesMore: 'Meine Einerziffer ist um {k} größer als meine Zehnerziffer.', onesLess: 'Meine Einerziffer ist um {k} kleiner als meine Zehnerziffer.', between: 'Ich liege zwischen {a} und {b}.', even: 'Ich bin gerade.', odd: 'Ich bin ungerade.', digitSum: 'Meine Ziffern ergeben zusammen {s}.' },
  },
  fr: {
    units: { tens: 'dizaines', hundreds: 'centaines' }, iam: 'Je suis',
    riddle: { tensDigit: "Mon chiffre des dizaines est {t}.", onesDigit: "Mon chiffre des unités est {o}.", tens: "J'ai {t} dizaines.", ones: "J'ai {o} unités.", hundreds: "J'ai {h} centaines.", onesMore: 'Mon chiffre des unités a {k} de plus que mon chiffre des dizaines.', onesLess: 'Mon chiffre des unités a {k} de moins que mon chiffre des dizaines.', between: 'Je suis entre {a} et {b}.', even: 'Je suis pair.', odd: 'Je suis impair.', digitSum: 'La somme de mes chiffres est {s}.' },
  },
  es: {
    units: { tens: 'decenas', hundreds: 'centenas' }, iam: 'Soy el',
    riddle: { tensDigit: "Mi cifra de las decenas es {t}.", onesDigit: "Mi cifra de las unidades es {o}.", tens: 'Tengo {t} decenas.', ones: 'Tengo {o} unidades.', hundreds: 'Tengo {h} centenas.', onesMore: 'Mi cifra de las unidades es {k} más grande que mi cifra de las decenas.', onesLess: 'Mi cifra de las unidades es {k} más chica que mi cifra de las decenas.', between: 'Estoy entre el {a} y el {b}.', even: 'Soy par.', odd: 'Soy impar.', digitSum: 'Mis cifras suman {s}.' },
  },
  pt: {
    units: { tens: 'dezenas', hundreds: 'centenas' }, iam: 'Eu sou o',
    riddle: { tensDigit: "Meu algarismo das dezenas é {t}.", onesDigit: "Meu algarismo das unidades é {o}.", tens: 'Tenho {t} dezenas.', ones: 'Tenho {o} unidades.', hundreds: 'Tenho {h} centenas.', onesMore: 'Meu algarismo das unidades é {k} a mais que o das dezenas.', onesLess: 'Meu algarismo das unidades é {k} a menos que o das dezenas.', between: 'Estou entre {a} e {b}.', even: 'Sou par.', odd: 'Sou ímpar.', digitSum: 'A soma dos meus algarismos é {s}.' },
  },
  it: {
    units: { tens: 'decine', hundreds: 'centinaia' }, iam: 'Sono il',
    riddle: { tensDigit: "La mia cifra delle decine è {t}.", onesDigit: "La mia cifra delle unità è {o}.", tens: 'Ho {t} decine.', ones: 'Ho {o} unità.', hundreds: 'Ho {h} centinaia.', onesMore: 'La mia cifra delle unità supera di {k} quella delle decine.', onesLess: 'La mia cifra delle unità è di {k} minore di quella delle decine.', between: 'Sono tra {a} e {b}.', even: 'Sono pari.', odd: 'Sono dispari.', digitSum: 'La somma delle mie cifre è {s}.' },
  },
  nl: {
    units: { tens: 'tientallen', hundreds: 'honderdtallen' }, iam: 'Ik ben',
    riddle: { tensDigit: "Mijn tientallencijfer is {t}.", onesDigit: "Mijn eenhedencijfer is {o}.", tens: 'Ik heb {t} tientallen.', ones: 'Ik heb {o} eenheden.', hundreds: 'Ik heb {h} honderdtallen.', onesMore: 'Mijn eenhedencijfer is {k} meer dan mijn tientallencijfer.', onesLess: 'Mijn eenhedencijfer is {k} minder dan mijn tientallencijfer.', between: 'Ik zit tussen {a} en {b}.', even: 'Ik ben even.', odd: 'Ik ben oneven.', digitSum: 'Mijn cijfers zijn samen {s}.' },
  },
  sv: {
    units: { tens: 'tiotal', hundreds: 'hundratal' }, iam: 'Jag är',
    riddle: { tensDigit: "Min tiotalssiffra är {t}.", onesDigit: "Min entalssiffra är {o}.", tens: 'Jag har {t} tiotal.', ones: 'Jag har {o} ental.', hundreds: 'Jag har {h} hundratal.', onesMore: 'Min entalssiffra är {k} mer än min tiotalssiffra.', onesLess: 'Min entalssiffra är {k} mindre än min tiotalssiffra.', between: 'Jag ligger mellan {a} och {b}.', even: 'Jag är ett jämnt tal.', odd: 'Jag är ett udda tal.', digitSum: 'Mina siffror blir {s} tillsammans.' },
  },
  da: {
    units: { tens: 'tiere', hundreds: 'hundreder' }, iam: 'Jeg er',
    riddle: { tensDigit: "Mit tierciffer er {t}.", onesDigit: "Mit enerciffer er {o}.", tens: 'Jeg har {t} tiere.', ones: 'Jeg har {o} enere.', hundreds: 'Jeg har {h} hundreder.', onesMore: 'Mit enerciffer er {k} større end mit tierciffer.', onesLess: 'Mit enerciffer er {k} mindre end mit tierciffer.', between: 'Jeg ligger mellem {a} og {b}.', even: 'Jeg er et lige tal.', odd: 'Jeg er et ulige tal.', digitSum: 'Mine cifre giver {s} tilsammen.' },
  },
  no: {
    units: { tens: 'tiere', hundreds: 'hundrere' }, iam: 'Jeg er',
    riddle: { tensDigit: "Tiersifferet mitt er {t}.", onesDigit: "Enersifferet mitt er {o}.", tens: 'Jeg har {t} tiere.', ones: 'Jeg har {o} enere.', hundreds: 'Jeg har {h} hundrere.', onesMore: 'Enersifferet mitt er {k} større enn tiersifferet mitt.', onesLess: 'Enersifferet mitt er {k} mindre enn tiersifferet mitt.', between: 'Jeg ligger mellom {a} og {b}.', even: 'Jeg er et partall.', odd: 'Jeg er et oddetall.', digitSum: 'Sifrene mine blir {s} til sammen.' },
  },
  fi: {
    units: { tens: 'kymppiä', hundreds: 'satasta' }, iam: 'Olen',
    riddle: { tensDigit: "Kymppieni numero on {t}.", onesDigit: "Ykkösteni numero on {o}.", tens: 'Minulla on {t} kymppiä.', ones: 'Minulla on {o} ykköstä.', hundreds: 'Minulla on {h} satasta.', onesMore: 'Ykkösteni numero on {k} suurempi kuin kymppieni numero.', onesLess: 'Ykkösteni numero on {k} pienempi kuin kymppieni numero.', between: 'Olen lukujen {a} ja {b} välissä.', even: 'Olen parillinen.', odd: 'Olen pariton.', digitSum: 'Numeroideni summa on {s}.' },
  },
};
module.exports = { PV_WORDS };
