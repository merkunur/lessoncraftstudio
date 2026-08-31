/**
 * number-words — cardinal number words 0..100 for all 11 locales (G1-210).
 * School-register conventions (each table is native-ensemble-verified at the
 * locale fan; the traps each engine encodes):
 *  - fr: soixante-dix / quatre-vingts (+ -s only when final) / et-un forms
 *  - da: vigesimal tens (halvtreds/tres/halvfjerds/firs/halvfems), unit-first
 *  - de/nl: unit-first inversion (einundzwanzig / eenentwintig, nl trema ë)
 *  - no: post-reform forms (tjueen, femtien)
 *  - it: tens elide final vowel before uno/otto (ventuno, ventotto); -tré accent
 *  - es: 16-29 fused forms with accents (dieciséis, veintidós)
 *  - pt: BR register (dezesseis, dezessete) + "e" joiner
 *  - fi: agglutinative -toista teens + kymmentä compounds
 *  - sv: counting form ett (tjugoett)
 * Pure functions; throw outside 0..100 (refuse-don't-guess).
 */
'use strict';

function guard(n) {
  if (!Number.isInteger(n) || n < 0 || n > 100) throw new Error(`number-words: ${n} outside 0..100`);
}

const en = (n) => {
  guard(n);
  const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  if (n < 20) return ones[n];
  if (n === 100) return 'one hundred';
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${tens[t]}-${ones[u]}` : tens[t];
};

const de = (n) => {
  guard(n);
  const ones = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn',
    'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  const unitsIn = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
  const tens = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
  if (n < 20) return ones[n];
  if (n === 100) return 'hundert';
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${unitsIn[u]}und${tens[t]}` : tens[t];
};

const fr = (n) => {
  guard(n);
  const ones = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix',
    'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  if (n < 20) return ones[n];
  if (n === 100) return 'cent';
  const tens = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
  const t = Math.floor(n / 10), u = n % 10;
  if (t <= 6) {
    if (u === 0) return tens[t];
    if (u === 1) return `${tens[t]} et un`;
    return `${tens[t]}-${ones[u]}`;
  }
  if (t === 7) { // 70-79: soixante + 10..19
    if (n === 71) return 'soixante et onze';
    return `soixante-${ones[n - 60]}`;
  }
  if (t === 8) { // 80-89
    if (n === 80) return 'quatre-vingts';
    return `quatre-vingt-${ones[u]}`;
  }
  // 90-99: quatre-vingt + 10..19
  return `quatre-vingt-${ones[n - 80]}`;
};

const es = (n) => {
  guard(n);
  const ones = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
    'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const twenties = ['veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco',
    'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];
  const tens = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  if (n < 20) return ones[n];
  if (n < 30) return twenties[n - 20];
  if (n === 100) return 'cien';
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${tens[t]} y ${ones[u]}` : tens[t];
};

const pt = (n) => { // Brazilian register
  guard(n);
  const ones = ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez',
    'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  if (n < 20) return ones[n];
  if (n === 100) return 'cem';
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${tens[t]} e ${ones[u]}` : tens[t];
};

const it = (n) => {
  guard(n);
  const ones = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci',
    'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove'];
  const tens = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta'];
  if (n < 20) return ones[n];
  if (n === 100) return 'cento';
  const t = Math.floor(n / 10), u = n % 10;
  if (u === 0) return tens[t];
  const base = (u === 1 || u === 8) ? tens[t].slice(0, -1) : tens[t]; // elision before uno/otto
  if (u === 3) return `${base}tré`;
  return `${base}${ones[u]}`;
};

const nl = (n) => {
  guard(n);
  const ones = ['nul', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien',
    'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
  const tens = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];
  if (n < 20) return ones[n];
  if (n === 100) return 'honderd';
  const t = Math.floor(n / 10), u = n % 10;
  if (u === 0) return tens[t];
  const unit = ones[u];
  const joiner = /[ei]$/.test(unit) ? 'ën' : 'en'; // twee+en→tweeën, drie+en→drieën
  return `${unit}${joiner}${tens[t]}`;
};

const sv = (n) => {
  guard(n);
  const ones = ['noll', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio',
    'elva', 'tolv', 'tretton', 'fjorton', 'femton', 'sexton', 'sjutton', 'arton', 'nitton'];
  const tens = ['', '', 'tjugo', 'trettio', 'fyrtio', 'femtio', 'sextio', 'sjuttio', 'åttio', 'nittio'];
  if (n < 20) return ones[n];
  if (n === 100) return 'hundra';
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${tens[t]}${ones[u]}` : tens[t];
};

const da = (n) => {
  guard(n);
  const ones = ['nul', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti',
    'elleve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'sytten', 'atten', 'nitten'];
  const tens = ['', '', 'tyve', 'tredive', 'fyrre', 'halvtreds', 'tres', 'halvfjerds', 'firs', 'halvfems'];
  if (n < 20) return ones[n];
  if (n === 100) return 'hundrede';
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${ones[u]}og${tens[t]}` : tens[t];
};

const no = (n) => { // bokmål, post-reform tens-first forms (school standard)
  guard(n);
  const ones = ['null', 'en', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti',
    'elleve', 'tolv', 'tretten', 'fjorten', 'femten', 'seksten', 'sytten', 'atten', 'nitten'];
  const tens = ['', '', 'tjue', 'tretti', 'førti', 'femti', 'seksti', 'sytti', 'åtti', 'nitti'];
  if (n < 20) return ones[n];
  if (n === 100) return 'hundre';
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${tens[t]}${ones[u]}` : tens[t];
};

const fi = (n) => {
  guard(n);
  const ones = ['nolla', 'yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän', 'kymmenen'];
  if (n <= 10) return ones[n];
  if (n < 20) return `${ones[n - 10]}toista`;
  if (n === 100) return 'sata';
  const t = Math.floor(n / 10), u = n % 10;
  const tensWord = `${ones[t]}kymmentä`;
  return u ? `${tensWord}${ones[u]}` : tensWord;
};

const ENGINES = { en, de, fr, es, pt, it, nl, sv, da, no, fi };

function numberWord(n, locale) {
  const eng = ENGINES[locale];
  if (!eng) throw new Error(`number-words: no engine for locale ${locale}`);
  return eng(n);
}

module.exports = { numberWord, ENGINES };
