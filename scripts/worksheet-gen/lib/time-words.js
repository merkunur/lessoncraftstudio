/**
 * time-words.js — a clock time in WORDS, the way each of our 11 languages says it to a 6-8-year-old (ENGINES
 * [telling-time-Q1], the Telling Time maker 2026-11-01). Every five-minute time of a 12-hour face, never assembled
 * outside this file: each locale has 12 minute frames (0, 5, … 55) that name the CURRENT hour {h} or the NEXT one {n},
 * and its own hour words. The idioms:
 *   - "half" toward the NEXT hour in de / nl / sv / da / no / fi (de "halb 4" = 3:30)
 *   - the half-relative minutes of nl / da / no / fi / de (nl "tien voor half vier" = 3:20, de "fünf vor halb vier" = 3:25)
 *   - subtractive / "para" forms in fr / it / pt-BR / es-MX after the half hour (es-MX "veinte para las cuatro")
 * hourForm: 'numeral' (the clock's own numerals, "halb 4") or 'word' ("halb vier"); a locale whose spoken form needs
 * the word (es "las tres", fr "trois heures") always uses its words.
 *
 * Regression fixtures: the 16 native-verified rows of mini tools/clock-core.js strings.timeExpr (activities) — the
 * gate reproduces each with that row's own hour form, except where the maker's native review (2026-11-02) decided
 * otherwise: es-MX "para" after the half hour (the rows said "menos", Spain — fixed in the activities too); a bare clock's
 * 12 is "doze horas" / "douze heures" / "le dodici" (the rows' meio-dia / midi / mezzogiorno assume daytime); sv / no
 * full hours say "klockan / klokka tre" on a worksheet (a bare "tre" reads as the number).
 */
'use strict';

const NUM_WORDS = {
  en: ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'],
  de: ['zwölf', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf'],
  nl: ['twaalf', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'],
  sv: ['tolv', 'ett', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'],
  da: ['tolv', 'et', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti', 'elleve', 'tolv'],
  no: ['tolv', 'ett', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'],
  fi: ['kaksitoista', 'yksi', 'kaksi', 'kolme', 'neljä', 'viisi', 'kuusi', 'seitsemän', 'kahdeksan', 'yhdeksän', 'kymmenen', 'yksitoista', 'kaksitoista'],
  // the Romance hours carry their article / gender in the frame's own words
  es: ['las doce', 'la una', 'las dos', 'las tres', 'las cuatro', 'las cinco', 'las seis', 'las siete', 'las ocho', 'las nueve', 'las diez', 'las once', 'las doce'],
  pt: ['doze', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze'],
  fr: ['douze heures', 'une heure', 'deux heures', 'trois heures', 'quatre heures', 'cinq heures', 'six heures', 'sept heures', 'huit heures', 'neuf heures', 'dix heures', 'onze heures', 'douze heures'],
  it: ['le dodici', "l'una", 'le due', 'le tre', 'le quattro', 'le cinque', 'le sei', 'le sette', 'le otto', 'le nove', 'le dieci', 'le undici', 'le dodici'],
};
/** locales whose hour is always the word (the article / "heures" belongs to it) */
const WORD_ONLY = new Set(['es', 'pt', 'fr', 'it']);

/**
 * frames[m/5]: {h} = the current hour, {n} = the next hour. Native-signed per locale (one reviewer) before a template
 * prints anything past the hour and the half hour.
 */
const FRAMES = {
  en: ["{h} o'clock", 'five past {h}', 'ten past {h}', 'quarter past {h}', 'twenty past {h}', 'twenty-five past {h}', 'half past {h}', 'twenty-five to {n}', 'twenty to {n}', 'quarter to {n}', 'ten to {n}', 'five to {n}'],
  de: ['{h} Uhr', 'fünf nach {h}', 'zehn nach {h}', 'Viertel nach {h}', 'zwanzig nach {h}', 'fünf vor halb {n}', 'halb {n}', 'fünf nach halb {n}', 'zwanzig vor {n}', 'Viertel vor {n}', 'zehn vor {n}', 'fünf vor {n}'],
  nl: ['{h} uur', 'vijf over {h}', 'tien over {h}', 'kwart over {h}', 'tien voor half {n}', 'vijf voor half {n}', 'half {n}', 'vijf over half {n}', 'tien over half {n}', 'kwart voor {n}', 'tien voor {n}', 'vijf voor {n}'],
  sv: ['klockan {h}', 'fem över {h}', 'tio över {h}', 'kvart över {h}', 'tjugo över {h}', 'fem i halv {n}', 'halv {n}', 'fem över halv {n}', 'tjugo i {n}', 'kvart i {n}', 'tio i {n}', 'fem i {n}'],
  da: ['klokken {h}', 'fem over {h}', 'ti minutter over {h}', 'kvart over {h}', 'ti i halv {n}', 'fem i halv {n}', 'halv {n}', 'fem over halv {n}', 'ti over halv {n}', 'kvart i {n}', 'ti i {n}', 'fem i {n}'],
  no: ['klokka {h}', 'fem over {h}', 'ti over {h}', 'kvart over {h}', 'ti på halv {n}', 'fem på halv {n}', 'halv {n}', 'fem over halv {n}', 'ti over halv {n}', 'kvart på {n}', 'ti på {n}', 'fem på {n}'],
  fi: ['kello {h}', 'viisi yli {h}', 'kymmenen yli {h}', 'vartti yli {h}', 'kymmentä vaille puoli {n}', 'viittä vaille puoli {n}', 'puoli {n}', 'viisi yli puoli {n}', 'kymmenen yli puoli {n}', 'varttia vaille {n}', 'kymmentä vaille {n}', 'viittä vaille {n}'],
  es: ['{h} en punto', '{h} y cinco', '{h} y diez', '{h} y cuarto', '{h} y veinte', '{h} y veinticinco', '{h} y media', 'veinticinco para {n}', 'veinte para {n}', 'un cuarto para {n}', 'diez para {n}', 'cinco para {n}'],
  pt: ['{h} horas', '{h} e cinco', '{h} e dez', '{h} e quinze', '{h} e vinte', '{h} e vinte e cinco', '{h} e meia', 'vinte e cinco para as {n}', 'vinte para as {n}', 'quinze para as {n}', 'dez para as {n}', 'cinco para as {n}'],
  fr: ['{h}', '{h} cinq', '{h} dix', '{h} et quart', '{h} vingt', '{h} vingt-cinq', '{h} et demie', '{n} moins vingt-cinq', '{n} moins vingt', '{n} moins le quart', '{n} moins dix', '{n} moins cinq'],
  it: ['{h}', '{h} e cinque', '{h} e dieci', '{h} e un quarto', '{h} e venti', '{h} e venticinque', '{h} e mezza', '{n} meno venticinque', '{n} meno venti', '{n} meno un quarto', '{n} meno dieci', '{n} meno cinque'],
};

/** the spoken hour */
function hourOf(h, locale, form) {
  const L = String(locale || 'en').slice(0, 2);
  const words = NUM_WORDS[L];
  if (!words) throw new Error('time-words: no hours for ' + locale);
  if (WORD_ONLY.has(L) || form === 'word') return words[h % 12 === 0 ? 12 : h % 12];
  return String(h % 12 === 0 ? 12 : h % 12);
}

/**
 * timeWords(h, m, locale, { hourForm }) — h 1..12 (or 0..23: the 12-hour face), m a multiple of 5.
 * pt-BR "uma hora" / "duas horas" at the hour (singular / feminine), "{h} horas" otherwise.
 */
function timeWords(h, m, locale, { hourForm = 'numeral' } = {}) {
  const L = String(locale || 'en').slice(0, 2);
  const frames = FRAMES[L];
  if (!frames) throw new Error('time-words: no frames for ' + locale);
  if (!(Number.isInteger(m) && m >= 0 && m < 60 && m % 5 === 0)) throw new Error('time-words: minutes ' + m + ' are not a multiple of 5');
  const H = ((h % 12) + 12) % 12 || 12, N = (H % 12) + 1;
  let frame = frames[m / 5];
  if (L === 'pt' && m === 0 && H === 1) frame = '{h} hora';
  // de "ein Uhr" (the -s drops before Uhr; "halb eins", "Viertel nach eins" keep it) · pt "para a uma" (one is singular)
  // — native review 2026-11-02
  let out = frame.replace('{h}', hourOf(H, L, hourForm)).replace('{n}', hourOf(N, L, hourForm));
  if (L === 'de' && m === 0 && H === 1 && hourForm === 'word') out = 'ein Uhr';
  if (L === 'pt') out = out.replace('para as uma', 'para a uma');
  // es / it / fr sentences start with the article or the number: a capital is the page's job, never this file's
  return out;
}

module.exports = { timeWords, FRAMES, NUM_WORDS, WORD_ONLY };
