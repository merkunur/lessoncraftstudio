/**
 * data/ordinal-numbers/ordinals-31.js — ordinal numbers 11-31 for the Ordinal Numbers maker's new templates (2026-11-02,
 * NEW-TEMPLATES §52 T1 / T3 / T4), literals per locale, read by a native + pedagogy review. 1-10 stay the reviewed bank
 * (data/b3/ordinals.js, lib/b3-common.js bank('ordinals')); this file EXTENDS it to 31 (the days of a month).
 *   words      { k: citation form } — masculine / the position form, as the bank (es/pt/it the masculine, fr no gender
 *              past premier); en = American English, es = Mexican Spanish, pt = Brazilian Portuguese
 *   wordAlts   { k: [other accepted spellings] } — es undécimo / decimoprimero / décimo primero, fr the traditional
 *              "vingt et unième", fi kahdeskymmenesyhdes, no tjuesyvende …
 *   notation   (k) → the written form: en 21st, de / da / no / fi 21., fr 21e, es 21.º, pt / it 21º, nl 21e, sv 21:a
 *   notationAlts (k) → other accepted written forms (es 21º, pt 21.º, nl 21ste)
 */
'use strict';

const W = {
  en: ['eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth',
    'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth', 'thirty-first'],
  de: ['elfte', 'zwölfte', 'dreizehnte', 'vierzehnte', 'fünfzehnte', 'sechzehnte', 'siebzehnte', 'achtzehnte', 'neunzehnte', 'zwanzigste',
    'einundzwanzigste', 'zweiundzwanzigste', 'dreiundzwanzigste', 'vierundzwanzigste', 'fünfundzwanzigste', 'sechsundzwanzigste', 'siebenundzwanzigste', 'achtundzwanzigste', 'neunundzwanzigste', 'dreißigste', 'einunddreißigste'],
  fr: ['onzième', 'douzième', 'treizième', 'quatorzième', 'quinzième', 'seizième', 'dix-septième', 'dix-huitième', 'dix-neuvième', 'vingtième',
    'vingt-et-unième', 'vingt-deuxième', 'vingt-troisième', 'vingt-quatrième', 'vingt-cinquième', 'vingt-sixième', 'vingt-septième', 'vingt-huitième', 'vingt-neuvième', 'trentième', 'trente-et-unième'],
  es: ['décimo primero', 'décimo segundo', 'decimotercero', 'decimocuarto', 'decimoquinto', 'decimosexto', 'decimoséptimo', 'decimoctavo', 'decimonoveno', 'vigésimo',
    'vigésimo primero', 'vigésimo segundo', 'vigésimo tercero', 'vigésimo cuarto', 'vigésimo quinto', 'vigésimo sexto', 'vigésimo séptimo', 'vigésimo octavo', 'vigésimo noveno', 'trigésimo', 'trigésimo primero'],
  pt: ['décimo primeiro', 'décimo segundo', 'décimo terceiro', 'décimo quarto', 'décimo quinto', 'décimo sexto', 'décimo sétimo', 'décimo oitavo', 'décimo nono', 'vigésimo',
    'vigésimo primeiro', 'vigésimo segundo', 'vigésimo terceiro', 'vigésimo quarto', 'vigésimo quinto', 'vigésimo sexto', 'vigésimo sétimo', 'vigésimo oitavo', 'vigésimo nono', 'trigésimo', 'trigésimo primeiro'],
  it: ['undicesimo', 'dodicesimo', 'tredicesimo', 'quattordicesimo', 'quindicesimo', 'sedicesimo', 'diciassettesimo', 'diciottesimo', 'diciannovesimo', 'ventesimo',
    'ventunesimo', 'ventiduesimo', 'ventitreesimo', 'ventiquattresimo', 'venticinquesimo', 'ventiseiesimo', 'ventisettesimo', 'ventottesimo', 'ventinovesimo', 'trentesimo', 'trentunesimo'],
  nl: ['elfde', 'twaalfde', 'dertiende', 'veertiende', 'vijftiende', 'zestiende', 'zeventiende', 'achttiende', 'negentiende', 'twintigste',
    'eenentwintigste', 'tweeëntwintigste', 'drieëntwintigste', 'vierentwintigste', 'vijfentwintigste', 'zesentwintigste', 'zevenentwintigste', 'achtentwintigste', 'negenentwintigste', 'dertigste', 'eenendertigste'],
  sv: ['elfte', 'tolfte', 'trettonde', 'fjortonde', 'femtonde', 'sextonde', 'sjuttonde', 'artonde', 'nittonde', 'tjugonde',
    'tjugoförsta', 'tjugoandra', 'tjugotredje', 'tjugofjärde', 'tjugofemte', 'tjugosjätte', 'tjugosjunde', 'tjugoåttonde', 'tjugonionde', 'trettionde', 'trettioförsta'],
  da: ['ellevte', 'tolvte', 'trettende', 'fjortende', 'femtende', 'sekstende', 'syttende', 'attende', 'nittende', 'tyvende',
    'enogtyvende', 'toogtyvende', 'treogtyvende', 'fireogtyvende', 'femogtyvende', 'seksogtyvende', 'syvogtyvende', 'otteogtyvende', 'niogtyvende', 'tredivte', 'enogtredivte'],
  no: ['ellevte', 'tolvte', 'trettende', 'fjortende', 'femtende', 'sekstende', 'syttende', 'attende', 'nittende', 'tjuende',
    'tjueførste', 'tjueandre', 'tjuetredje', 'tjuefjerde', 'tjuefemte', 'tjuesjette', 'tjuesjuende', 'tjueåttende', 'tjueniende', 'trettiende', 'trettiførste'],
  fi: ['yhdestoista', 'kahdestoista', 'kolmastoista', 'neljästoista', 'viidestoista', 'kuudestoista', 'seitsemästoista', 'kahdeksastoista', 'yhdeksästoista', 'kahdeskymmenes',
    'kahdeskymmenesensimmäinen', 'kahdeskymmenestoinen', 'kahdeskymmeneskolmas', 'kahdeskymmenesneljäs', 'kahdeskymmenesviides', 'kahdeskymmeneskuudes', 'kahdeskymmenesseitsemäs', 'kahdeskymmeneskahdeksas', 'kahdeskymmenesyhdeksäs', 'kolmaskymmenes', 'kolmaskymmenesensimmäinen'],
};
const words = (L) => Object.fromEntries(W[L].map((w, i) => [i + 11, w]));

const ALTS = {
  // es-MX: children say décimo primero / décimo segundo; undécimo / duodécimo are the formal register (native review)
  es: { 11: ['undécimo', 'decimoprimero'], 12: ['duodécimo', 'decimosegundo'], 13: ['décimo tercero'], 14: ['décimo cuarto'], 15: ['décimo quinto'],
    16: ['décimo sexto'], 17: ['décimo séptimo'], 18: ['décimo octavo'], 19: ['décimo noveno'], 21: ['vigesimoprimero'], 22: ['vigesimosegundo'],
    23: ['vigesimotercero'], 24: ['vigesimocuarto'], 25: ['vigesimoquinto'], 26: ['vigesimosexto'], 27: ['vigesimoséptimo'], 28: ['vigesimoctavo'],
    29: ['vigesimonoveno'], 31: ['trigesimoprimero'] },
  fr: { 21: ['vingt et unième'], 31: ['trente et unième'] },
  fi: { 21: ['kahdeskymmenesyhdes'], 22: ['kahdeskymmeneskahdes'], 31: ['kolmaskymmenesyhdes'] },
  no: { 27: ['tjuesyvende'] },
};

const EN_SUFFIX = (k) => (k % 100 >= 11 && k % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' })[k % 10] || 'th');
function notation(k, L) {
  switch (L) {
    case 'en': return k + EN_SUFFIX(k);
    case 'de': case 'da': case 'no': case 'fi': return k + '.';
    case 'fr': return k + 'e';
    case 'es': return k + '.º';
    case 'pt': case 'it': return k + 'º';
    case 'nl': return k + 'e';
    case 'sv': return k + ((k % 10 === 1 || k % 10 === 2) && k % 100 !== 11 && k % 100 !== 12 ? ':a' : ':e');
    default: throw new Error('ordinals-31: no notation for ' + L);
  }
}
function notationAlts(k, L) {
  if (L === 'es') return [k + 'º'];
  if (L === 'pt') return [k + '.º'];
  if (L === 'nl') return [k + (/ste$/.test(W.nl[k - 11] || '') ? 'ste' : 'de')];
  return [];
}

module.exports = { words, wordAlts: (L) => ALTS[L] || {}, notation, notationAlts, LOCALES: Object.keys(W) };
